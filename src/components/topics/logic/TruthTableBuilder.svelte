<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

  let switchA = $state(false);
  let switchB = $state(false);
  let operator = $state<'AND' | 'OR' | 'NOT'>('AND');

  let result = $derived(
    operator === 'AND' ? switchA && switchB :
    operator === 'OR' ? switchA || switchB :
    !switchA
  );

  interface HistoryRow { a: boolean; b: boolean; op: string; result: boolean; }
  let history = $state<HistoryRow[]>([]);

  function recordRow() {
    const exists = history.some((r) => r.a === switchA && r.b === switchB && r.op === operator);
    if (!exists) {
      history.push({ a: switchA, b: switchB, op: operator, result });
    }
  }

  // Auto-record when values change
  $effect(() => {
    // Access reactive values
    const _a = switchA;
    const _b = switchB;
    const _op = operator;
    const _r = result;
    recordRow();
  });

  function clearHistory() {
    history = [];
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Truth Table Builder</h2>
    <p class="text-slate-600">Toggle switches and build the truth table row by row!</p>
  </div>

  <!-- Controls -->
  <div class="max-w-sm rounded-xl border-2 border-yellow-300 bg-yellow-50 p-5">
    <div class="mb-4 flex justify-center gap-2">
      {#each ['AND', 'OR', 'NOT'] as op}
        <button
          onclick={() => { operator = op as any; }}
          class="rounded-full px-4 py-1.5 text-sm font-bold transition-all
            {operator === op ? 'bg-yellow-500 text-white shadow' : 'bg-white text-yellow-700 border border-yellow-300'}"
        >
          {op}
        </button>
      {/each}
    </div>

    <div class="flex items-center justify-center gap-8">
      <!-- Switch A -->
      <div class="flex flex-col items-center gap-2">
        <span class="text-xs font-bold text-yellow-700">A</span>
        <button onclick={() => { switchA = !switchA; }} class="flex h-10 w-16 items-center rounded-full p-1 transition-colors duration-300 {switchA ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}">
          <span class="h-8 w-8 rounded-full bg-white shadow-md"></span>
        </button>
        <span class="text-sm font-bold {switchA ? 'text-green-600' : 'text-red-500'}">{switchA ? 'TRUE' : 'FALSE'}</span>
      </div>

      {#if operator !== 'NOT'}
        <div class="flex flex-col items-center gap-2">
          <span class="text-xs font-bold text-yellow-700">B</span>
          <button onclick={() => { switchB = !switchB; }} class="flex h-10 w-16 items-center rounded-full p-1 transition-colors duration-300 {switchB ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}">
            <span class="h-8 w-8 rounded-full bg-white shadow-md"></span>
          </button>
          <span class="text-sm font-bold {switchB ? 'text-green-600' : 'text-red-500'}">{switchB ? 'TRUE' : 'FALSE'}</span>
        </div>
      {/if}

      <!-- Result bulb -->
      <div class="flex flex-col items-center gap-1">
        <span class="text-xs font-bold text-yellow-700">Output</span>
        <div class="text-5xl transition-all duration-300 {result ? '' : 'opacity-30 grayscale'}">💡</div>
        <span class="text-sm font-bold {result ? 'text-yellow-600' : 'text-slate-500'}">{result ? 'TRUE' : 'FALSE'}</span>
      </div>
    </div>
  </div>

  <!-- Built truth table -->
  {#if history.length > 0}
    <div class="max-w-sm">
      <div class="mb-2 flex items-center justify-between">
        <h3 class="text-sm font-bold text-slate-700">Your Truth Table ({operator})</h3>
        <button onclick={clearHistory} class="text-xs text-slate-500 hover:text-slate-600">Clear</button>
      </div>
      <table class="w-full rounded-lg border border-yellow-200 bg-white text-sm">
        <thead>
          <tr class="bg-yellow-50 text-yellow-700">
            <th class="px-4 py-2">A</th>
            {#if operator !== 'NOT'}<th class="px-4 py-2">B</th>{/if}
            <th class="px-4 py-2">Result</th>
          </tr>
        </thead>
        <tbody>
          {#each history.filter(r => r.op === operator) as row, i}
            <tr class="border-t border-yellow-100 row-appear">
              <td class="px-4 py-2 text-center font-mono font-bold {row.a ? 'text-green-600' : 'text-red-500'}">{row.a ? 'T' : 'F'}</td>
              {#if operator !== 'NOT'}
                <td class="px-4 py-2 text-center font-mono font-bold {row.b ? 'text-green-600' : 'text-red-500'}">{row.b ? 'T' : 'F'}</td>
              {/if}
              <td class="px-4 py-2 text-center font-mono font-bold {row.result ? 'text-green-600' : 'text-red-500'}">{row.result ? 'T' : 'F'}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  <p class="text-xs text-slate-500">Toggle through all combinations to complete the truth table!</p>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-yellow-500 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-yellow-600 active:scale-95">
      I've tried this
    </button>
  </div>
</div>

<style>
  @keyframes rowAppear {
    from { background-color: rgba(250, 204, 21, 0.2); }
    to { background-color: transparent; }
  }
  .row-appear { animation: rowAppear 0.5s ease-out; }
</style>
