<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

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
</script>

<div class="space-y-6">
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
        <span class="text-lg font-bold {showOutput ? 'text-green-700' : 'text-slate-400'}">
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
