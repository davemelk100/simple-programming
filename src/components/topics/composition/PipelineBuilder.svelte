<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);

  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

  // --- Basic mode state ---
  interface FnBlock {
    id: string;
    label: string;
    apply: (v: number) => number;
    rule: string;
  }

  const availableBlocks: FnBlock[] = [
    { id: 'double', label: 'Double', apply: (v) => v * 2, rule: 'x * 2' },
    { id: 'add1', label: 'Add 1', apply: (v) => v + 1, rule: 'x + 1' },
    { id: 'square', label: 'Square', apply: (v) => v * v, rule: 'x * x' },
    { id: 'negate', label: 'Negate', apply: (v) => -v, rule: '-x' },
  ];

  let pipeline = $state<FnBlock[]>([]);
  let inputValue = $state('5');
  let isRunning = $state(false);
  let animatingStep = $state(-1);
  let intermediates = $state<number[]>([]);

  function addBlock(block: FnBlock) {
    pipeline.push({ ...block });
    intermediates = [];
    animatingStep = -1;
  }

  function removeBlock(index: number) {
    pipeline.splice(index, 1);
    intermediates = [];
    animatingStep = -1;
  }

  function moveBlock(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= pipeline.length) return;
    const temp = pipeline[index];
    pipeline[index] = pipeline[newIndex];
    pipeline[newIndex] = temp;
    intermediates = [];
    animatingStep = -1;
  }

  function runPipeline() {
    const num = Number(inputValue);
    if (isNaN(num) || pipeline.length === 0 || isRunning) return;

    isRunning = true;
    intermediates = [num];
    animatingStep = -1;

    let current = num;
    let step = 0;

    const interval = setInterval(() => {
      if (step < pipeline.length) {
        current = pipeline[step].apply(current);
        intermediates.push(current);
        animatingStep = step;
        step++;
      } else {
        clearInterval(interval);
        isRunning = false;
      }
    }, 700);
  }

  // --- Advanced mode state ---
  interface AdvFnBlock {
    id: string;
    label: string;
    signature: string;
    inputType: string;
    outputType: string;
    apply: (v: number) => number | string;
    rule: string;
    canFail: boolean;
    failCondition?: string;
  }

  const advAvailableBlocks: AdvFnBlock[] = [
    { id: 'double', label: 'Double', signature: '(x: number) => number', inputType: 'number', outputType: 'number', apply: (v) => v * 2, rule: 'x * 2', canFail: false },
    { id: 'add1', label: 'Add 1', signature: '(x: number) => number', inputType: 'number', outputType: 'number', apply: (v) => v + 1, rule: 'x + 1', canFail: false },
    { id: 'square', label: 'Square', signature: '(x: number) => number', inputType: 'number', outputType: 'number', apply: (v) => v * v, rule: 'x * x', canFail: false },
    { id: 'negate', label: 'Negate', signature: '(x: number) => number', inputType: 'number', outputType: 'number', apply: (v) => -v, rule: '-x', canFail: false },
    { id: 'safeDivide10', label: 'Divide 10 by x', signature: '(x: number) => number | Error', inputType: 'number', outputType: 'number | Error', apply: (v) => v === 0 ? 'Error: Division by zero' as any : 10 / v, rule: '10 / x', canFail: true, failCondition: 'x === 0' },
    { id: 'sqrt', label: 'Square Root', signature: '(x: number) => number | Error', inputType: 'number', outputType: 'number | Error', apply: (v) => v < 0 ? 'Error: Negative input' as any : Math.sqrt(v), rule: 'Math.sqrt(x)', canFail: true, failCondition: 'x < 0' },
  ];

  let advPipeline = $state<AdvFnBlock[]>([]);
  let advInputValue = $state('5');
  let advIsRunning = $state(false);
  let advAnimatingStep = $state(-1);
  let advIntermediates = $state<(number | string)[]>([]);
  let advError = $state('');
  let advErrorStep = $state(-1);
  let codeStyle = $state<'pipe' | 'compose'>('pipe');
  let showHOF = $state(false);
  let hofMultiplier = $state('3');
  let hofOffset = $state('1');

  function advAddBlock(block: AdvFnBlock) {
    advPipeline.push({ ...block });
    advIntermediates = [];
    advAnimatingStep = -1;
    advError = '';
    advErrorStep = -1;
  }

  function advRemoveBlock(index: number) {
    advPipeline.splice(index, 1);
    advIntermediates = [];
    advAnimatingStep = -1;
    advError = '';
    advErrorStep = -1;
  }

  function advMoveBlock(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= advPipeline.length) return;
    const temp = advPipeline[index];
    advPipeline[index] = advPipeline[newIndex];
    advPipeline[newIndex] = temp;
    advIntermediates = [];
    advAnimatingStep = -1;
    advError = '';
    advErrorStep = -1;
  }

  function advRunPipeline() {
    const num = Number(advInputValue);
    if (isNaN(num) || advPipeline.length === 0 || advIsRunning) return;

    advIsRunning = true;
    advIntermediates = [num];
    advAnimatingStep = -1;
    advError = '';
    advErrorStep = -1;

    let current: number | string = num;
    let step = 0;

    const interval = setInterval(() => {
      if (step < advPipeline.length) {
        if (typeof current === 'string') {
          // Error propagation: skip remaining steps
          advIntermediates.push(current);
          advAnimatingStep = step;
          step++;
        } else {
          current = advPipeline[step].apply(current);
          advIntermediates.push(current);
          advAnimatingStep = step;
          if (typeof current === 'string') {
            advError = String(current);
            advErrorStep = step;
          }
          step++;
        }
      } else {
        clearInterval(interval);
        advIsRunning = false;
      }
    }, 700);
  }

  function addHOFBlock() {
    const m = Number(hofMultiplier);
    const o = Number(hofOffset);
    if (isNaN(m) || isNaN(o)) return;
    advPipeline.push({
      id: `hof_${m}_${o}`,
      label: `${m}x + ${o}`,
      signature: `(x: number) => number  /* created by makeLinear(${m}, ${o}) */`,
      inputType: 'number',
      outputType: 'number',
      apply: (v) => v * m + o,
      rule: `${m} * x + ${o}`,
      canFail: false,
    });
    advIntermediates = [];
    advAnimatingStep = -1;
    advError = '';
    advErrorStep = -1;
  }

  let advPipeCode = $derived.by(() => {
    if (advPipeline.length === 0) return '// Add functions to see code';
    const names = advPipeline.map((b) => b.id.startsWith('hof_') ? `makeLinear(/* ${b.rule} */)` : b.id);
    if (codeStyle === 'pipe') {
      const chain = names.join(',\n  ');
      return `const result = pipe(\n  ${advInputValue},\n  ${chain}\n);`;
    } else {
      const chain = names.join(',\n  ');
      return `const transform = compose(\n  ${[...names].reverse().join(',\n  ')}\n);\nconst result = transform(${advInputValue});`;
    }
  });

  let typeFlow = $derived.by(() => {
    if (advPipeline.length === 0) return [];
    const flow: { from: string; to: string; fn: string }[] = [];
    let currentType = 'number';
    for (const block of advPipeline) {
      const outType = block.outputType;
      flow.push({ from: currentType, to: outType, fn: block.label });
      currentType = outType;
    }
    return flow;
  });
</script>

{#if !advanced}
<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Pipeline Builder</h2>
    <p class="text-slate-600">Build a chain of functions and watch data flow through!</p>
  </div>

  <!-- Available blocks -->
  <div>
    <p class="mb-2 text-sm font-medium text-slate-600">Click to add a function block:</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each availableBlocks as block}
        <button
          onclick={() => addBlock(block)}
          class="rounded-lg border-2 border-indigo-300 bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 transition-all hover:bg-indigo-100 hover:scale-105 active:scale-95"
        >
          {block.label} <span class="text-xs text-indigo-400">({block.rule})</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Pipeline display -->
  <div class="max-w-lg">
    <div class="flex items-center gap-2 overflow-x-auto pb-2">
      <!-- Input -->
      <div class="shrink-0">
        <input
          type="text"
          bind:value={inputValue}
          class="w-16 rounded-lg border-2 border-indigo-300 bg-indigo-50 px-2 py-2 text-center text-lg font-bold text-indigo-700 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      {#each pipeline as block, i (i)}
        <svg class="h-4 w-5 shrink-0 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>

        <div class="group relative shrink-0 rounded-xl border-2 px-4 py-3 text-center shadow-sm transition-all duration-300
          {animatingStep === i ? 'border-green-400 bg-green-50 scale-110 step-pulse' : 'border-indigo-400 bg-indigo-50'}">
          <div class="text-xs text-indigo-400">{block.rule}</div>
          <div class="text-sm font-bold text-indigo-700">{block.label}</div>

          <!-- Controls on hover -->
          <div class="absolute -top-2 -right-2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {#if i > 0}
              <button onclick={() => moveBlock(i, -1)} class="flex h-5 w-5 items-center justify-center rounded-full bg-slate-300 text-xs text-white hover:bg-slate-400">&lt;</button>
            {/if}
            {#if i < pipeline.length - 1}
              <button onclick={() => moveBlock(i, 1)} class="flex h-5 w-5 items-center justify-center rounded-full bg-slate-300 text-xs text-white hover:bg-slate-400">&gt;</button>
            {/if}
            <button onclick={() => removeBlock(i)} class="flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-xs text-white hover:bg-red-500">x</button>
          </div>

          <!-- Intermediate value -->
          {#if intermediates.length > i + 1}
            <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-bold text-green-600 value-pop">
              {intermediates[i + 1]}
            </div>
          {/if}
        </div>
      {/each}

      {#if pipeline.length > 0}
        <svg class="h-4 w-5 shrink-0 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>

        <!-- Final output -->
        <div class="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg border-2 text-lg font-bold shadow-sm transition-all duration-300
          {intermediates.length > pipeline.length ? 'border-green-400 bg-green-50 text-green-700 output-pop' : 'border-slate-300 bg-slate-50 text-slate-500'}">
          {intermediates.length > pipeline.length ? intermediates[intermediates.length - 1] : '?'}
        </div>
      {/if}
    </div>

    {#if pipeline.length === 0}
      <div class="rounded-xl border-2 border-dashed border-indigo-200 py-8 text-center text-sm text-indigo-300">
        Add function blocks above to build your pipeline!
      </div>
    {/if}
  </div>

  <!-- Run button -->
  <div>
    <button
      onclick={runPipeline}
      disabled={pipeline.length === 0 || isRunning}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-40"
    >
      {isRunning ? 'Running...' : 'Run Pipeline'}
    </button>
  </div>

  <p class="text-xs text-slate-500">Hover over blocks to reorder or remove them.</p>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      I've tried this
    </button>
  </div>
</div>

{:else}

<!-- ===================== ADVANCED MODE ===================== -->
<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Advanced: Typed Pipeline Builder</h2>
    <p class="text-slate-600">Build pipelines with TypeScript signatures, error handling, higher-order functions, and compose vs pipe.</p>
  </div>

  <!-- Available blocks with signatures -->
  <div>
    <p class="mb-2 text-sm font-medium text-slate-600">Click to add a typed function block:</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each advAvailableBlocks as block}
        <button
          onclick={() => advAddBlock(block)}
          class="group/btn relative rounded-lg border-2 px-4 py-2 text-sm font-bold transition-all hover:scale-105 active:scale-95
            {block.canFail ? 'border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100' : 'border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}"
        >
          {block.label} <span class="text-xs opacity-60">({block.rule})</span>
          {#if block.canFail}
            <span class="ml-1 text-xs text-amber-500" title="Can fail">!</span>
          {/if}
          <!-- Tooltip with signature -->
          <span class="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs font-mono text-white opacity-0 transition-opacity group-hover/btn:opacity-100">
            {block.signature}
          </span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Higher-order function builder -->
  <div>
    <button
      onclick={() => (showHOF = !showHOF)}
      class="text-sm font-medium text-indigo-600 underline decoration-dotted hover:text-indigo-800"
    >
      {showHOF ? 'Hide' : 'Show'} Higher-Order Function Builder
    </button>

    {#if showHOF}
      <div class="mt-2 rounded-xl border-2 border-violet-300 bg-violet-50 p-4">
        <p class="mb-2 text-sm font-semibold text-violet-700">makeLinear(m, b) returns (x) =&gt; m * x + b</p>
        <p class="mb-3 text-xs text-violet-500">A function that creates a function -- this is a higher-order function.</p>
        <div class="flex items-center gap-3">
          <label class="text-sm text-violet-600">
            m: <input type="number" bind:value={hofMultiplier} class="w-16 rounded border border-violet-300 px-2 py-1 text-center text-sm" />
          </label>
          <label class="text-sm text-violet-600">
            b: <input type="number" bind:value={hofOffset} class="w-16 rounded border border-violet-300 px-2 py-1 text-center text-sm" />
          </label>
          <button
            onclick={addHOFBlock}
            class="rounded-lg bg-violet-600 px-4 py-1.5 text-sm font-semibold text-white transition-all hover:bg-violet-700 active:scale-95"
          >
            Add to Pipeline
          </button>
        </div>
        <pre class="mt-2 rounded bg-violet-900 p-2 text-xs text-violet-200"><code>const makeLinear = (m: number, b: number): (x: number) =&gt; number =&gt;
  (x) =&gt; m * x + b;

const fn = makeLinear({hofMultiplier}, {hofOffset}); // (x) =&gt; {hofMultiplier} * x + {hofOffset}</code></pre>
      </div>
    {/if}
  </div>

  <!-- Pipeline display with type annotations -->
  <div class="max-w-2xl">
    <div class="flex items-center gap-2 overflow-x-auto pb-6">
      <!-- Input -->
      <div class="shrink-0">
        <input
          type="text"
          bind:value={advInputValue}
          class="w-16 rounded-lg border-2 border-indigo-300 bg-indigo-50 px-2 py-2 text-center text-lg font-bold text-indigo-700 focus:border-indigo-500 focus:outline-none"
        />
        <div class="mt-0.5 text-center text-xs font-mono text-slate-400">number</div>
      </div>

      {#each advPipeline as block, i (i)}
        <svg class="h-4 w-5 shrink-0 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>

        <div class="group relative shrink-0 rounded-xl border-2 px-4 py-3 text-center shadow-sm transition-all duration-300
          {advErrorStep === i ? 'border-red-400 bg-red-50 scale-110 step-pulse-error' : advAnimatingStep === i ? 'border-green-400 bg-green-50 scale-110 step-pulse' : block.canFail ? 'border-amber-400 bg-amber-50' : 'border-indigo-400 bg-indigo-50'}">
          <div class="text-xs font-mono {block.canFail ? 'text-amber-400' : 'text-indigo-400'}">{block.signature.length > 30 ? block.rule : block.signature}</div>
          <div class="text-sm font-bold {block.canFail ? 'text-amber-700' : 'text-indigo-700'}">{block.label}</div>

          <!-- Controls on hover -->
          <div class="absolute -top-2 -right-2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {#if i > 0}
              <button onclick={() => advMoveBlock(i, -1)} class="flex h-5 w-5 items-center justify-center rounded-full bg-slate-300 text-xs text-white hover:bg-slate-400">&lt;</button>
            {/if}
            {#if i < advPipeline.length - 1}
              <button onclick={() => advMoveBlock(i, 1)} class="flex h-5 w-5 items-center justify-center rounded-full bg-slate-300 text-xs text-white hover:bg-slate-400">&gt;</button>
            {/if}
            <button onclick={() => advRemoveBlock(i)} class="flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-xs text-white hover:bg-red-500">x</button>
          </div>

          <!-- Intermediate value -->
          {#if advIntermediates.length > i + 1}
            <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold value-pop
              {typeof advIntermediates[i + 1] === 'string' ? 'text-red-600' : 'text-green-600'}">
              {advIntermediates[i + 1]}
            </div>
          {/if}
        </div>
      {/each}

      {#if advPipeline.length > 0}
        <svg class="h-4 w-5 shrink-0 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>

        <!-- Final output -->
        <div class="shrink-0 text-center">
          <div class="flex h-12 w-20 items-center justify-center rounded-lg border-2 text-lg font-bold shadow-sm transition-all duration-300
            {advIntermediates.length > advPipeline.length
              ? (typeof advIntermediates[advIntermediates.length - 1] === 'string'
                ? 'border-red-400 bg-red-50 text-red-700 output-pop'
                : 'border-green-400 bg-green-50 text-green-700 output-pop')
              : 'border-slate-300 bg-slate-50 text-slate-500'}">
            {#if advIntermediates.length > advPipeline.length}
              {typeof advIntermediates[advIntermediates.length - 1] === 'string' ? 'Err' : advIntermediates[advIntermediates.length - 1]}
            {:else}
              ?
            {/if}
          </div>
          <div class="mt-0.5 text-xs font-mono text-slate-400">
            {advPipeline.length > 0 ? advPipeline[advPipeline.length - 1].outputType : '?'}
          </div>
        </div>
      {/if}
    </div>

    {#if advPipeline.length === 0}
      <div class="rounded-xl border-2 border-dashed border-indigo-200 py-8 text-center text-sm text-indigo-300">
        Add typed function blocks above to build your pipeline!
      </div>
    {/if}
  </div>

  <!-- Error display -->
  {#if advError}
    <div class="rounded-lg border-2 border-red-300 bg-red-50 p-3">
      <p class="text-sm font-semibold text-red-700">Pipeline Error at step {advErrorStep + 1}:</p>
      <p class="text-sm text-red-600">{advError}</p>
      <p class="mt-1 text-xs text-red-400">Errors propagate through remaining steps -- no further computation occurs.</p>
    </div>
  {/if}

  <!-- Run button -->
  <div>
    <button
      onclick={advRunPipeline}
      disabled={advPipeline.length === 0 || advIsRunning}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-40"
    >
      {advIsRunning ? 'Running...' : 'Run Pipeline'}
    </button>
  </div>

  <!-- Type flow visualization -->
  {#if typeFlow.length > 0}
    <div class="rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
      <p class="mb-2 text-sm font-semibold text-slate-700">Type Flow Visualization</p>
      <div class="flex flex-wrap items-center gap-1 font-mono text-xs">
        <span class="rounded bg-blue-100 px-2 py-0.5 text-blue-700">number</span>
        {#each typeFlow as step}
          <span class="text-slate-400">--[{step.fn}]--&gt;</span>
          <span class="rounded px-2 py-0.5
            {step.to.includes('Error') ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}">
            {step.to}
          </span>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Compose vs Pipe comparison & code preview -->
  <div class="rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
    <div class="mb-3 flex items-center gap-4">
      <p class="text-sm font-semibold text-slate-700">Code Preview:</p>
      <div class="flex rounded-lg border border-slate-300 text-sm">
        <button
          onclick={() => (codeStyle = 'pipe')}
          class="rounded-l-lg px-3 py-1 transition-colors {codeStyle === 'pipe' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}"
        >
          pipe()
        </button>
        <button
          onclick={() => (codeStyle = 'compose')}
          class="rounded-r-lg px-3 py-1 transition-colors {codeStyle === 'compose' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}"
        >
          compose()
        </button>
      </div>
    </div>

    <pre class="rounded-lg bg-slate-800 p-3 text-sm text-slate-200 overflow-x-auto"><code>{advPipeCode}</code></pre>

    <div class="mt-3 grid grid-cols-2 gap-3 text-xs">
      <div class="rounded-lg border border-indigo-200 bg-white p-2">
        <p class="font-semibold text-indigo-700">pipe(value, f, g, h)</p>
        <p class="text-slate-500">Data flows left to right: h(g(f(value))). Reads in execution order. More intuitive.</p>
      </div>
      <div class="rounded-lg border border-violet-200 bg-white p-2">
        <p class="font-semibold text-violet-700">compose(h, g, f)(value)</p>
        <p class="text-slate-500">Functions listed right to left (math style). Returns a new function. More composable.</p>
      </div>
    </div>
  </div>

  <p class="text-xs text-slate-500">Hover over blocks to reorder or remove them. Amber blocks can throw errors -- try creating a pipeline that fails!</p>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      I've tried this
    </button>
  </div>
</div>
{/if}

<style>
  @keyframes stepPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
    50% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
  }
  @keyframes valuePop {
    from { transform: translateX(-50%) scale(0); }
    to { transform: translateX(-50%) scale(1); }
  }
  @keyframes outputPop {
    0% { transform: scale(0.8); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }
  @keyframes stepPulseError {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
    50% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
  }
  .step-pulse { animation: stepPulse 0.6s ease-out; }
  .step-pulse-error { animation: stepPulseError 0.6s ease-out; }
  .value-pop { animation: valuePop 0.3s ease-out; }
  .output-pop { animation: outputPop 0.4s ease-out; }
</style>
