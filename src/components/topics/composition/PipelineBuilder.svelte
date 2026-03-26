<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

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
</script>

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
          {intermediates.length > pipeline.length ? 'border-green-400 bg-green-50 text-green-700 output-pop' : 'border-slate-300 bg-slate-50 text-slate-400'}">
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

  <p class="text-xs text-slate-400">Hover over blocks to reorder or remove them.</p>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      I've tried this
    </button>
  </div>
</div>

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
  .step-pulse { animation: stepPulse 0.6s ease-out; }
  .value-pop { animation: valuePop 0.3s ease-out; }
  .output-pop { animation: outputPop 0.4s ease-out; }
</style>
