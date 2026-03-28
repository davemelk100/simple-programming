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
    const _a = switchA;
    const _b = switchB;
    const _op = operator;
    const _r = result;
    recordRow();
  });

  function clearHistory() {
    history = [];
  }

  // --- Advanced mode state ---
  type AdvOp = 'AND' | 'OR' | 'NOT' | 'XOR' | 'NAND' | 'NOR';
  let advA = $state(false);
  let advB = $state(false);
  let advC = $state(false);
  let advOp = $state<AdvOp>('AND');
  let compoundMode = $state(false);
  let compoundOp1 = $state<AdvOp>('AND');
  let compoundOp2 = $state<AdvOp>('OR');
  let showDeMorgan = $state(false);

  function evalOp(op: AdvOp, a: boolean, b: boolean): boolean {
    switch (op) {
      case 'AND': return a && b;
      case 'OR': return a || b;
      case 'XOR': return a !== b;
      case 'NAND': return !(a && b);
      case 'NOR': return !(a || b);
      case 'NOT': return !a;
    }
  }

  let advResult = $derived(
    compoundMode
      ? evalOp(compoundOp2, evalOp(compoundOp1, advA, advB), advC)
      : advOp === 'NOT' ? !advA : evalOp(advOp, advA, advB)
  );

  function codeSyntax(op: AdvOp): string {
    switch (op) {
      case 'AND': return '&&';
      case 'OR': return '||';
      case 'XOR': return '^';
      case 'NAND': return 'NAND';
      case 'NOR': return 'NOR';
      case 'NOT': return '!';
    }
  }

  let advCodeExpr = $derived.by(() => {
    if (compoundMode) {
      const left = codeSyntax(compoundOp1) === 'NAND'
        ? `!(A ${codeSyntax('AND')} B)`
        : codeSyntax(compoundOp1) === 'NOR'
          ? `!(A ${codeSyntax('OR')} B)`
          : `A ${codeSyntax(compoundOp1)} B`;
      const sym2 = codeSyntax(compoundOp2);
      if (sym2 === 'NAND') return `!((${left}) ${codeSyntax('AND')} C)`;
      if (sym2 === 'NOR') return `!((${left}) ${codeSyntax('OR')} C)`;
      return `(${left}) ${sym2} C`;
    }
    if (advOp === 'NOT') return '!A';
    if (advOp === 'NAND') return `!(A ${codeSyntax('AND')} B)`;
    if (advOp === 'NOR') return `!(A ${codeSyntax('OR')} B)`;
    return `A ${codeSyntax(advOp)} B`;
  });

  // Full truth table for current operator
  let advTruthTable = $derived.by(() => {
    if (compoundMode) {
      const rows: { a: boolean; b: boolean; c: boolean; result: boolean }[] = [];
      for (const a of [false, true]) {
        for (const b of [false, true]) {
          for (const c of [false, true]) {
            rows.push({ a, b, c, result: evalOp(compoundOp2, evalOp(compoundOp1, a, b), c) });
          }
        }
      }
      return rows;
    }
    const rows: { a: boolean; b: boolean; c: boolean; result: boolean }[] = [];
    for (const a of [false, true]) {
      for (const b of [false, true]) {
        rows.push({ a, b, c: false, result: advOp === 'NOT' ? !a : evalOp(advOp, a, b) });
      }
    }
    return rows;
  });

  // De Morgan's Laws
  let deMorganRows = $derived.by(() => {
    const rows: { a: boolean; b: boolean; lhs1: boolean; rhs1: boolean; lhs2: boolean; rhs2: boolean }[] = [];
    for (const a of [false, true]) {
      for (const b of [false, true]) {
        rows.push({
          a, b,
          lhs1: !(a && b), rhs1: !a || !b,
          lhs2: !(a || b), rhs2: !a && !b,
        });
      }
    }
    return rows;
  });

  const advOps: AdvOp[] = ['AND', 'OR', 'NOT', 'XOR', 'NAND', 'NOR'];
</script>

{#if !advanced}
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

{:else}

<!-- ===== ADVANCED MODE ===== -->
<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Advanced: Truth Table Builder</h2>
    <p class="text-slate-600">Explore XOR, NAND, NOR, compound expressions, and De Morgan's Laws.</p>
  </div>

  <!-- Mode toggles -->
  <div class="flex flex-wrap gap-3">
    <button
      onclick={() => { compoundMode = false; showDeMorgan = false; }}
      class="rounded-full px-4 py-1.5 text-sm font-bold transition-all
        {!compoundMode && !showDeMorgan ? 'bg-yellow-500 text-white shadow' : 'bg-white text-yellow-700 border border-yellow-300'}"
    >
      Single Operator
    </button>
    <button
      onclick={() => { compoundMode = true; showDeMorgan = false; }}
      class="rounded-full px-4 py-1.5 text-sm font-bold transition-all
        {compoundMode && !showDeMorgan ? 'bg-yellow-500 text-white shadow' : 'bg-white text-yellow-700 border border-yellow-300'}"
    >
      Compound Expression
    </button>
    <button
      onclick={() => { showDeMorgan = true; compoundMode = false; }}
      class="rounded-full px-4 py-1.5 text-sm font-bold transition-all
        {showDeMorgan ? 'bg-yellow-500 text-white shadow' : 'bg-white text-yellow-700 border border-yellow-300'}"
    >
      De Morgan's Laws
    </button>
  </div>

  {#if showDeMorgan}
    <!-- De Morgan's Laws visualization -->
    <div class="space-y-4">
      <div class="rounded-xl border-2 border-purple-300 bg-purple-50 p-5">
        <h3 class="mb-3 text-lg font-bold text-purple-800">De Morgan's Laws</h3>
        <div class="mb-4 space-y-2">
          <div class="rounded-lg bg-white p-3 font-mono text-sm text-purple-900">
            <span class="font-bold text-purple-600">Law 1:</span> !(A && B) === !A || !B
          </div>
          <div class="rounded-lg bg-white p-3 font-mono text-sm text-purple-900">
            <span class="font-bold text-purple-600">Law 2:</span> !(A || B) === !A && !B
          </div>
        </div>

        <!-- Interactive switches for De Morgan -->
        <div class="mb-4 flex items-center justify-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <span class="text-xs font-bold text-purple-700">A</span>
            <button onclick={() => { advA = !advA; }} class="flex h-10 w-16 items-center rounded-full p-1 transition-colors duration-300 {advA ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}">
              <span class="h-8 w-8 rounded-full bg-white shadow-md"></span>
            </button>
            <span class="text-sm font-bold {advA ? 'text-green-600' : 'text-red-500'}">{advA ? 'TRUE' : 'FALSE'}</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <span class="text-xs font-bold text-purple-700">B</span>
            <button onclick={() => { advB = !advB; }} class="flex h-10 w-16 items-center rounded-full p-1 transition-colors duration-300 {advB ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}">
              <span class="h-8 w-8 rounded-full bg-white shadow-md"></span>
            </button>
            <span class="text-sm font-bold {advB ? 'text-green-600' : 'text-red-500'}">{advB ? 'TRUE' : 'FALSE'}</span>
          </div>
        </div>

        <!-- Live results -->
        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg border border-purple-200 bg-white p-3 text-center">
            <div class="mb-1 text-xs font-bold text-purple-600">!(A && B)</div>
            <div class="text-lg font-bold {!(advA && advB) ? 'text-green-600' : 'text-red-500'}">{!(advA && advB) ? 'TRUE' : 'FALSE'}</div>
          </div>
          <div class="rounded-lg border border-purple-200 bg-white p-3 text-center">
            <div class="mb-1 text-xs font-bold text-purple-600">!A || !B</div>
            <div class="text-lg font-bold {!advA || !advB ? 'text-green-600' : 'text-red-500'}">{!advA || !advB ? 'TRUE' : 'FALSE'}</div>
          </div>
          <div class="rounded-lg border border-purple-200 bg-white p-3 text-center">
            <div class="mb-1 text-xs font-bold text-purple-600">!(A || B)</div>
            <div class="text-lg font-bold {!(advA || advB) ? 'text-green-600' : 'text-red-500'}">{!(advA || advB) ? 'TRUE' : 'FALSE'}</div>
          </div>
          <div class="rounded-lg border border-purple-200 bg-white p-3 text-center">
            <div class="mb-1 text-xs font-bold text-purple-600">!A && !B</div>
            <div class="text-lg font-bold {!advA && !advB ? 'text-green-600' : 'text-red-500'}">{!advA && !advB ? 'TRUE' : 'FALSE'}</div>
          </div>
        </div>
      </div>

      <!-- Full De Morgan truth table -->
      <div class="max-w-lg">
        <h3 class="mb-2 text-sm font-bold text-slate-700">De Morgan's Laws -- Full Truth Table</h3>
        <div class="overflow-x-auto">
          <table class="w-full rounded-lg border border-purple-200 bg-white text-sm">
            <thead>
              <tr class="bg-purple-50 text-purple-700">
                <th class="px-3 py-2">A</th>
                <th class="px-3 py-2">B</th>
                <th class="px-3 py-2">!(A&&B)</th>
                <th class="px-3 py-2">!A||!B</th>
                <th class="px-3 py-2">!(A||B)</th>
                <th class="px-3 py-2">!A&&!B</th>
              </tr>
            </thead>
            <tbody>
              {#each deMorganRows as row}
                <tr class="border-t border-purple-100">
                  <td class="px-3 py-2 text-center font-mono font-bold {row.a ? 'text-green-600' : 'text-red-500'}">{row.a ? 'T' : 'F'}</td>
                  <td class="px-3 py-2 text-center font-mono font-bold {row.b ? 'text-green-600' : 'text-red-500'}">{row.b ? 'T' : 'F'}</td>
                  <td class="px-3 py-2 text-center font-mono font-bold {row.lhs1 ? 'text-green-600' : 'text-red-500'}">{row.lhs1 ? 'T' : 'F'}</td>
                  <td class="px-3 py-2 text-center font-mono font-bold {row.rhs1 ? 'text-green-600' : 'text-red-500'}">{row.rhs1 ? 'T' : 'F'}</td>
                  <td class="px-3 py-2 text-center font-mono font-bold {row.lhs2 ? 'text-green-600' : 'text-red-500'}">{row.lhs2 ? 'T' : 'F'}</td>
                  <td class="px-3 py-2 text-center font-mono font-bold {row.rhs2 ? 'text-green-600' : 'text-red-500'}">{row.rhs2 ? 'T' : 'F'}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <p class="mt-2 text-xs text-slate-500">Notice: columns 3=4 and columns 5=6 always match -- that is De Morgan's Laws!</p>
      </div>
    </div>

  {:else}
    <!-- Single operator or Compound expression -->
    <div class="rounded-xl border-2 border-yellow-300 bg-yellow-50 p-5">
      {#if !compoundMode}
        <!-- Operator selector (all 6) -->
        <div class="mb-4 flex flex-wrap justify-center gap-2">
          {#each advOps as op}
            <button
              onclick={() => { advOp = op; }}
              class="rounded-full px-4 py-1.5 text-sm font-bold transition-all
                {advOp === op ? 'bg-yellow-500 text-white shadow' : 'bg-white text-yellow-700 border border-yellow-300'}"
            >
              {op}
            </button>
          {/each}
        </div>
      {:else}
        <!-- Compound expression operator selectors -->
        <div class="mb-4 space-y-3">
          <div class="flex flex-wrap items-center justify-center gap-2">
            <span class="text-sm font-bold text-yellow-700">A</span>
            {#each advOps.filter(o => o !== 'NOT') as op}
              <button
                onclick={() => { compoundOp1 = op; }}
                class="rounded-full px-3 py-1 text-xs font-bold transition-all
                  {compoundOp1 === op ? 'bg-yellow-500 text-white shadow' : 'bg-white text-yellow-700 border border-yellow-300'}"
              >
                {op}
              </button>
            {/each}
            <span class="text-sm font-bold text-yellow-700">B</span>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-2">
            <span class="text-sm font-bold text-yellow-700">( result )</span>
            {#each advOps.filter(o => o !== 'NOT') as op}
              <button
                onclick={() => { compoundOp2 = op; }}
                class="rounded-full px-3 py-1 text-xs font-bold transition-all
                  {compoundOp2 === op ? 'bg-yellow-500 text-white shadow' : 'bg-white text-yellow-700 border border-yellow-300'}"
              >
                {op}
              </button>
            {/each}
            <span class="text-sm font-bold text-yellow-700">C</span>
          </div>
        </div>
      {/if}

      <!-- Code syntax display -->
      <div class="mb-4 rounded-lg bg-slate-800 px-4 py-2 font-mono text-sm text-green-400">
        <span class="text-slate-500">// Code: </span>{advCodeExpr}
        <span class="text-slate-500"> // =&gt; </span><span class="{advResult ? 'text-green-400' : 'text-red-400'}">{advResult}</span>
      </div>

      <!-- Switches -->
      <div class="flex items-center justify-center gap-8">
        <div class="flex flex-col items-center gap-2">
          <span class="text-xs font-bold text-yellow-700">A</span>
          <button onclick={() => { advA = !advA; }} class="flex h-10 w-16 items-center rounded-full p-1 transition-colors duration-300 {advA ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}">
            <span class="h-8 w-8 rounded-full bg-white shadow-md"></span>
          </button>
          <span class="text-sm font-bold {advA ? 'text-green-600' : 'text-red-500'}">{advA ? 'TRUE' : 'FALSE'}</span>
        </div>

        {#if !(!compoundMode && advOp === 'NOT')}
          <div class="flex flex-col items-center gap-2">
            <span class="text-xs font-bold text-yellow-700">B</span>
            <button onclick={() => { advB = !advB; }} class="flex h-10 w-16 items-center rounded-full p-1 transition-colors duration-300 {advB ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}">
              <span class="h-8 w-8 rounded-full bg-white shadow-md"></span>
            </button>
            <span class="text-sm font-bold {advB ? 'text-green-600' : 'text-red-500'}">{advB ? 'TRUE' : 'FALSE'}</span>
          </div>
        {/if}

        {#if compoundMode}
          <div class="flex flex-col items-center gap-2">
            <span class="text-xs font-bold text-yellow-700">C</span>
            <button onclick={() => { advC = !advC; }} class="flex h-10 w-16 items-center rounded-full p-1 transition-colors duration-300 {advC ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}">
              <span class="h-8 w-8 rounded-full bg-white shadow-md"></span>
            </button>
            <span class="text-sm font-bold {advC ? 'text-green-600' : 'text-red-500'}">{advC ? 'TRUE' : 'FALSE'}</span>
          </div>
        {/if}

        <!-- Result bulb -->
        <div class="flex flex-col items-center gap-1">
          <span class="text-xs font-bold text-yellow-700">Output</span>
          <div class="text-5xl transition-all duration-300 {advResult ? '' : 'opacity-30 grayscale'}">💡</div>
          <span class="text-sm font-bold {advResult ? 'text-yellow-600' : 'text-slate-500'}">{advResult ? 'TRUE' : 'FALSE'}</span>
        </div>
      </div>
    </div>

    <!-- Full truth table -->
    <div class="max-w-md">
      <h3 class="mb-2 text-sm font-bold text-slate-700">
        Full Truth Table: <span class="font-mono text-yellow-700">{advCodeExpr}</span>
      </h3>
      <div class="overflow-x-auto">
        <table class="w-full rounded-lg border border-yellow-200 bg-white text-sm">
          <thead>
            <tr class="bg-yellow-50 text-yellow-700">
              <th class="px-4 py-2">A</th>
              {#if !(!compoundMode && advOp === 'NOT')}<th class="px-4 py-2">B</th>{/if}
              {#if compoundMode}<th class="px-4 py-2">C</th>{/if}
              <th class="px-4 py-2">Result</th>
            </tr>
          </thead>
          <tbody>
            {#each advTruthTable as row}
              <tr class="border-t border-yellow-100 {row.a === advA && row.b === advB && (compoundMode ? row.c === advC : true) ? 'bg-yellow-100' : ''}">
                <td class="px-4 py-2 text-center font-mono font-bold {row.a ? 'text-green-600' : 'text-red-500'}">{row.a ? 'T' : 'F'}</td>
                {#if !(!compoundMode && advOp === 'NOT')}
                  <td class="px-4 py-2 text-center font-mono font-bold {row.b ? 'text-green-600' : 'text-red-500'}">{row.b ? 'T' : 'F'}</td>
                {/if}
                {#if compoundMode}
                  <td class="px-4 py-2 text-center font-mono font-bold {row.c ? 'text-green-600' : 'text-red-500'}">{row.c ? 'T' : 'F'}</td>
                {/if}
                <td class="px-4 py-2 text-center font-mono font-bold {row.result ? 'text-green-600' : 'text-red-500'}">{row.result ? 'T' : 'F'}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <p class="mt-2 text-xs text-slate-500">The highlighted row matches your current switch positions.</p>
    </div>
  {/if}

  <div>
    <button onclick={oncomplete} class="rounded-full bg-yellow-500 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-yellow-600 active:scale-95">
      I've explored this
    </button>
  </div>
</div>
{/if}

<style>
  @keyframes rowAppear {
    from { background-color: rgba(250, 204, 21, 0.2); }
    to { background-color: transparent; }
  }
  .row-appear { animation: rowAppear 0.5s ease-out; }
</style>
