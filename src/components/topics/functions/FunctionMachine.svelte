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
  const functions: Record<string, { label: string; rule: string; apply: (v: string) => string }> = {
    double: { label: 'Double', rule: 'x * 2', apply: (v) => { const n = Number(v); return isNaN(n) ? 'NaN' : String(n * 2); } },
    add10: { label: 'Add 10', rule: 'x + 10', apply: (v) => { const n = Number(v); return isNaN(n) ? 'NaN' : String(n + 10); } },
    uppercase: { label: 'Uppercase', rule: 'UPPER(x)', apply: (v) => v.toUpperCase() },
    isEven: { label: 'Is Even?', rule: 'x % 2 == 0', apply: (v) => { const n = Number(v); return isNaN(n) ? 'false' : String(n % 2 === 0); } },
  };

  let selectedFn = $state('double');
  let inputValue = $state('');
  let outputValue = $state('');
  let isRunning = $state(false);
  let showOutput = $state(false);

  let currentFn = $derived(functions[selectedFn]);

  function run() {
    if (!inputValue.trim() || isRunning) return;
    isRunning = true;
    showOutput = false;
    outputValue = '';

    setTimeout(() => {
      outputValue = currentFn.apply(inputValue.trim());
      isRunning = false;
      showOutput = true;
    }, 1000);
  }

  // --- Advanced mode state ---
  type ParamType = 'number' | 'string' | 'boolean';
  type TypedFn = {
    label: string;
    signature: string;
    paramType: ParamType;
    returnType: string;
    pure: boolean;
    apply: (v: string) => string;
    description: string;
  };

  let callCount = $state(0);

  const typedFunctions: Record<string, TypedFn> = {
    double: {
      label: 'double',
      signature: 'function double(x: number): number',
      paramType: 'number',
      returnType: 'number',
      pure: true,
      apply: (v) => { const n = Number(v); return isNaN(n) ? 'NaN' : String(n * 2); },
      description: 'Pure: always returns x * 2 for the same input.',
    },
    toUpperCase: {
      label: 'toUpperCase',
      signature: 'function toUpperCase(s: string): string',
      paramType: 'string',
      returnType: 'string',
      pure: true,
      apply: (v) => v.toUpperCase(),
      description: 'Pure: deterministic string transformation.',
    },
    isPositive: {
      label: 'isPositive',
      signature: 'function isPositive(x: number): boolean',
      paramType: 'number',
      returnType: 'boolean',
      pure: true,
      apply: (v) => { const n = Number(v); return isNaN(n) ? 'false' : String(n > 0); },
      description: 'Pure: returns true if x > 0, false otherwise.',
    },
    trackCall: {
      label: 'trackCall',
      signature: 'function trackCall(x: number): string',
      paramType: 'number',
      returnType: 'string',
      pure: false,
      apply: (v) => { callCount++; const n = Number(v); return isNaN(n) ? `call #${callCount}: NaN` : `call #${callCount}: ${n * 2}`; },
      description: 'Impure: mutates external counter. Same input can give different output.',
    },
    randomAdd: {
      label: 'randomAdd',
      signature: 'function randomAdd(x: number): number',
      paramType: 'number',
      returnType: 'number',
      pure: false,
      apply: (v) => { const n = Number(v); const r = Math.floor(Math.random() * 10); return isNaN(n) ? 'NaN' : String(n + r); },
      description: 'Impure: adds a random number, so the same input gives different outputs.',
    },
  };

  let advSelectedFn = $state('double');
  let advInputValue = $state('');
  let advOutputValue = $state('');
  let advIsRunning = $state(false);
  let advShowOutput = $state(false);
  let advHistory: { input: string; output: string; fn: string; pure: boolean }[] = $state([]);

  let advCurrentFn = $derived(typedFunctions[advSelectedFn]);

  function advRun() {
    if (!advInputValue.trim() || advIsRunning) return;
    advIsRunning = true;
    advShowOutput = false;
    advOutputValue = '';

    setTimeout(() => {
      advOutputValue = advCurrentFn.apply(advInputValue.trim());
      advIsRunning = false;
      advShowOutput = true;
      advHistory = [...advHistory, { input: advInputValue.trim(), output: advOutputValue, fn: advCurrentFn.label, pure: advCurrentFn.pure }];
    }, 800);
  }

  // --- Custom function builder ---
  let customName = $state('myFunc');
  let customParamName = $state('x');
  let customParamType: ParamType = $state('number');
  let customReturnType: ParamType = $state('number');
  let customBody = $state('x * 3');
  let customInput = $state('');
  let customOutput = $state('');
  let customError = $state('');
  let customShowOutput = $state(false);

  let customSignature = $derived(
    `function ${customName}(${customParamName}: ${customParamType}): ${customReturnType}`
  );

  function runCustom() {
    customError = '';
    customShowOutput = false;
    const raw = customInput.trim();
    if (!raw) return;

    try {
      let val: unknown;
      if (customParamType === 'number') {
        val = Number(raw);
        if (isNaN(val as number)) throw new Error(`Expected a number, got "${raw}"`);
      } else if (customParamType === 'boolean') {
        if (raw !== 'true' && raw !== 'false') throw new Error(`Expected true or false, got "${raw}"`);
        val = raw === 'true';
      } else {
        val = raw;
      }

      const fn = new Function(customParamName, `return (${customBody})`);
      const result = fn(val);

      if (customReturnType === 'number' && typeof result !== 'number') {
        customOutput = String(result) + '  (type mismatch!)';
      } else if (customReturnType === 'boolean' && typeof result !== 'boolean') {
        customOutput = String(result) + '  (type mismatch!)';
      } else if (customReturnType === 'string' && typeof result !== 'string') {
        customOutput = String(result) + '  (type mismatch!)';
      } else {
        customOutput = String(result);
      }
      customShowOutput = true;
    } catch (e: any) {
      customError = e.message ?? 'Error evaluating function';
    }
  }
</script>

<div class="space-y-6">
{#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Function Machine</h2>
    <p class="text-slate-600">Pick a function, give it an input, and watch it work!</p>
  </div>

  <!-- Function selector -->
  <div class="flex max-w-sm flex-col items-center gap-3">
    <label class="text-sm font-medium text-slate-600">Choose a function:</label>
    <select
      bind:value={selectedFn}
      class="w-full rounded-lg border border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
    >
      {#each Object.entries(functions) as [key, fn]}
        <option value={key}>{fn.label}</option>
      {/each}
    </select>
  </div>

  <!-- Machine visual -->
  <div class="flex items-center justify-center gap-3">
    <!-- Input slot -->
    <div class="flex flex-col items-center gap-1">
      <span class="text-xs font-medium text-slate-500">Input</span>
      <div class="flex h-16 w-24 items-center justify-center rounded-lg border-2 border-purple-300 bg-purple-50 shadow
        {isRunning ? 'animate-pulse' : ''}">
        <input
          type="text"
          bind:value={inputValue}
          placeholder="..."
          class="w-full bg-transparent text-center text-lg font-bold text-purple-700 focus:outline-none"
        />
      </div>
    </div>

    <!-- Arrow in -->
    <div class="flex items-center {isRunning ? 'input-flow' : ''}">
      <svg class="h-6 w-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>

    <!-- Machine -->
    <div class="flex h-24 w-36 flex-col items-center justify-center rounded-2xl border-3 border-purple-500 bg-gradient-to-b from-purple-100 to-purple-200 shadow-lg
      {isRunning ? 'machine-working' : ''}">
      <span class="text-lg">&#9881;</span>
      <span class="text-xs font-semibold text-purple-700">{currentFn.label}</span>
      <span class="mt-0.5 rounded bg-purple-300/50 px-2 py-0.5 text-xs text-purple-800 font-mono">{currentFn.rule}</span>
    </div>

    <!-- Arrow out -->
    <div class="flex items-center">
      <svg class="h-6 w-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>

    <!-- Output slot -->
    <div class="flex flex-col items-center gap-1">
      <span class="text-xs font-medium text-slate-500">Output</span>
      <div class="flex h-16 w-28 items-center justify-center rounded-lg border-2 shadow
        {showOutput ? 'border-green-400 bg-green-50 output-pop' : 'border-slate-300 bg-slate-50'}">
        <span class="text-lg font-bold {showOutput ? 'text-green-700' : 'text-slate-500'}">
          {showOutput ? outputValue : '?'}
        </span>
      </div>
    </div>
  </div>

  <!-- Run button -->
  <div>
    <button
      onclick={run}
      disabled={isRunning}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95 disabled:opacity-50"
    >
      {isRunning ? 'Processing...' : 'Run'}
    </button>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      I've tried this
    </button>
  </div>

{:else}

  <!-- ADVANCED MODE -->
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Typed Function Machine</h2>
    <p class="text-slate-600">Explore typed functions, see pure vs impure behavior, and build your own.</p>
  </div>

  <!-- Section 1: Typed function runner with pure/impure examples -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-700">1. Run Typed Functions</h3>

    <!-- Function selector -->
    <div class="flex flex-wrap items-center gap-3">
      <label class="text-sm font-medium text-slate-600">Function:</label>
      <select
        bind:value={advSelectedFn}
        class="rounded-lg border border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
      >
        {#each Object.entries(typedFunctions) as [key, fn]}
          <option value={key}>
            {fn.label} {fn.pure ? '(pure)' : '(impure)'}
          </option>
        {/each}
      </select>
      <span class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold
        {advCurrentFn.pure ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}">
        {advCurrentFn.pure ? 'Pure' : 'Impure'}
      </span>
    </div>

    <!-- Signature display -->
    <div class="rounded-lg bg-slate-800 px-4 py-2 font-mono text-sm text-green-400">
      {advCurrentFn.signature}
    </div>
    <p class="text-sm text-slate-500">{advCurrentFn.description}</p>

    <!-- Machine visual (advanced) -->
    <div class="flex items-center justify-center gap-3">
      <!-- Input slot with type badge -->
      <div class="flex flex-col items-center gap-1">
        <span class="text-xs font-medium text-slate-500">Input <span class="rounded bg-slate-200 px-1 text-xs text-slate-600">{advCurrentFn.paramType}</span></span>
        <div class="flex h-16 w-28 items-center justify-center rounded-lg border-2 border-purple-300 bg-purple-50 shadow
          {advIsRunning ? 'animate-pulse' : ''}">
          <input
            type="text"
            bind:value={advInputValue}
            placeholder="..."
            class="w-full bg-transparent text-center text-lg font-bold text-purple-700 focus:outline-none"
          />
        </div>
      </div>

      <!-- Arrow in -->
      <div class="flex items-center {advIsRunning ? 'input-flow' : ''}">
        <svg class="h-6 w-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <!-- Machine -->
      <div class="flex h-24 w-40 flex-col items-center justify-center rounded-2xl border-3 shadow-lg
        {advCurrentFn.pure ? 'border-green-500 bg-gradient-to-b from-green-100 to-green-200' : 'border-amber-500 bg-gradient-to-b from-amber-100 to-amber-200'}
        {advIsRunning ? 'machine-working' : ''}">
        <span class="text-lg">&#9881;</span>
        <span class="text-xs font-semibold {advCurrentFn.pure ? 'text-green-700' : 'text-amber-700'}">{advCurrentFn.label}()</span>
        <span class="mt-0.5 rounded px-2 py-0.5 text-xs font-mono
          {advCurrentFn.pure ? 'bg-green-300/50 text-green-800' : 'bg-amber-300/50 text-amber-800'}">
          &rarr; {advCurrentFn.returnType}
        </span>
      </div>

      <!-- Arrow out -->
      <div class="flex items-center">
        <svg class="h-6 w-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <!-- Output slot with type badge -->
      <div class="flex flex-col items-center gap-1">
        <span class="text-xs font-medium text-slate-500">Output <span class="rounded bg-slate-200 px-1 text-xs text-slate-600">{advCurrentFn.returnType}</span></span>
        <div class="flex h-16 w-28 items-center justify-center rounded-lg border-2 shadow
          {advShowOutput ? 'border-green-400 bg-green-50 output-pop' : 'border-slate-300 bg-slate-50'}">
          <span class="text-lg font-bold {advShowOutput ? 'text-green-700' : 'text-slate-500'}">
            {advShowOutput ? advOutputValue : '?'}
          </span>
        </div>
      </div>
    </div>

    <div>
      <button
        onclick={advRun}
        disabled={advIsRunning}
        class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95 disabled:opacity-50"
      >
        {advIsRunning ? 'Processing...' : 'Run'}
      </button>
    </div>

    <!-- Call history -->
    {#if advHistory.length > 0}
      <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h4 class="mb-2 text-sm font-bold text-slate-700">Call History</h4>
        <div class="max-h-40 space-y-1 overflow-y-auto">
          {#each advHistory as entry, i}
            <div class="flex items-center gap-2 text-xs font-mono">
              <span class="text-slate-400">#{i + 1}</span>
              <span class="rounded px-1 {entry.pure ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}">{entry.fn}</span>
              <span class="text-slate-600">({entry.input})</span>
              <span class="text-slate-400">&rarr;</span>
              <span class="font-semibold text-slate-800">{entry.output}</span>
            </div>
          {/each}
        </div>
        <p class="mt-2 text-xs text-slate-500">
          {#if advHistory.filter(h => !h.pure).length > 0}
            Notice how impure functions can return different outputs for the same input!
          {:else}
            Try an impure function (trackCall or randomAdd) to see non-deterministic behavior.
          {/if}
        </p>
      </div>
    {/if}
  </div>

  <!-- Section 2: Pure vs Impure comparison -->
  <div class="grid grid-cols-2 gap-4">
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-4">
      <h4 class="mb-2 text-sm font-bold text-green-700">Pure Functions</h4>
      <ul class="space-y-1 text-xs text-slate-600">
        <li>Same input &rarr; same output, always</li>
        <li>No side effects (no mutations)</li>
        <li>Easy to test and cache</li>
        <li>e.g. <code class="rounded bg-green-100 px-1">double</code>, <code class="rounded bg-green-100 px-1">toUpperCase</code></li>
      </ul>
    </div>
    <div class="rounded-xl border-2 border-amber-300 bg-amber-50 p-4">
      <h4 class="mb-2 text-sm font-bold text-amber-700">Impure Functions</h4>
      <ul class="space-y-1 text-xs text-slate-600">
        <li>Output may vary for same input</li>
        <li>Uses or modifies external state</li>
        <li>Harder to test and predict</li>
        <li>e.g. <code class="rounded bg-amber-100 px-1">trackCall</code>, <code class="rounded bg-amber-100 px-1">randomAdd</code></li>
      </ul>
    </div>
  </div>

  <!-- Section 3: Custom function builder -->
  <div class="space-y-4 rounded-xl border-2 border-purple-200 bg-purple-50/50 p-5">
    <h3 class="text-lg font-bold text-slate-700">2. Build Your Own Function</h3>
    <p class="text-sm text-slate-500">Define a typed function signature and expression body, then test it.</p>

    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="mb-1 block text-xs font-medium text-slate-600">Function name</label>
        <input
          type="text"
          bind:value={customName}
          class="w-full rounded-lg border border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        />
      </div>
      <div>
        <label class="mb-1 block text-xs font-medium text-slate-600">Parameter name</label>
        <input
          type="text"
          bind:value={customParamName}
          class="w-full rounded-lg border border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        />
      </div>
      <div>
        <label class="mb-1 block text-xs font-medium text-slate-600">Parameter type</label>
        <select bind:value={customParamType} class="w-full rounded-lg border border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none">
          <option value="number">number</option>
          <option value="string">string</option>
          <option value="boolean">boolean</option>
        </select>
      </div>
      <div>
        <label class="mb-1 block text-xs font-medium text-slate-600">Return type</label>
        <select bind:value={customReturnType} class="w-full rounded-lg border border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none">
          <option value="number">number</option>
          <option value="string">string</option>
          <option value="boolean">boolean</option>
        </select>
      </div>
    </div>

    <div>
      <label class="mb-1 block text-xs font-medium text-slate-600">Function body (expression)</label>
      <input
        type="text"
        bind:value={customBody}
        placeholder="x * 3"
        class="w-full rounded-lg border border-purple-300 px-3 py-2 font-mono text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
      />
    </div>

    <!-- Live signature preview -->
    <div class="rounded-lg bg-slate-800 px-4 py-2 font-mono text-sm text-green-400">
      {customSignature} {'{'} return {customBody}; {'}'}
    </div>

    <!-- Test area -->
    <div class="flex items-center gap-3">
      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-slate-600">Test input</label>
        <input
          type="text"
          bind:value={customInput}
          placeholder="5"
          class="w-28 rounded-lg border border-purple-300 px-3 py-2 text-center text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        />
      </div>

      <button
        onclick={runCustom}
        class="mt-5 rounded-full bg-purple-600 px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
      >
        Test
      </button>

      {#if customShowOutput}
        <div class="mt-5 flex items-center gap-2">
          <span class="text-slate-400">&rarr;</span>
          <span class="rounded-lg border-2 border-green-400 bg-green-50 px-4 py-2 text-sm font-bold text-green-700 output-pop">{customOutput}</span>
        </div>
      {/if}
    </div>

    {#if customError}
      <div class="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
        {customError}
      </div>
    {/if}
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      I've tried this
    </button>
  </div>

{/if}
</div>

<style>
  @keyframes machineWork {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-2deg) scale(1.02); }
    75% { transform: rotate(2deg) scale(1.02); }
  }
  @keyframes outputPop {
    0% { transform: scale(0.8); opacity: 0; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes flowRight {
    0% { transform: translateX(0); opacity: 1; }
    50% { transform: translateX(8px); opacity: 0.5; }
    100% { transform: translateX(0); opacity: 1; }
  }
  .machine-working { animation: machineWork 0.2s ease-in-out infinite; }
  .output-pop { animation: outputPop 0.4s ease-out; }
  .input-flow { animation: flowRight 0.5s ease-in-out infinite; }
</style>
