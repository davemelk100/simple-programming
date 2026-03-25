<script lang="ts">
  interface Props {
    oncomplete?: (score: number) => void;
  }

  let { oncomplete }: Props = $props();

  let c1Answer = $state('');
  let c1Result = $state<'correct' | 'wrong' | null>(null);

  let c2Answer = $state('');
  let c2Result = $state<'correct' | 'wrong' | null>(null);

  let c3Answer = $state('');
  let c3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(c1Result === 'correct' && c2Result === 'correct' && c3Result === 'correct');

  // Pipeline: 3 -> double -> add1 = 7
  function checkC1() {
    c1Result = c1Answer.trim() === '7' ? 'correct' : 'wrong';
  }
  // Pipeline: 2 -> square -> double = 8
  function checkC2() {
    c2Result = c2Answer.trim() === '8' ? 'correct' : 'wrong';
  }
  // Which pipeline turns 5 into 11? double then add1
  function checkC3() {
    c3Result = c3Answer === 'double-add1' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (allDone) {
      oncomplete?.([c1Result, c2Result, c3Result].filter((r) => r === 'correct').length);
    }
  });
</script>

<div class="space-y-8">
  <div class="text-center">
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Composition</h2>
    <p class="text-slate-600">Predict what comes out of these pipelines!</p>
  </div>

  <!-- C1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">1. What comes out of this pipeline?</p>
    <div class="mb-3 flex items-center justify-center gap-2 text-sm">
      <span class="rounded bg-indigo-100 px-3 py-1 font-bold text-indigo-700">3</span>
      <span class="text-indigo-400">&rarr;</span>
      <span class="rounded border border-indigo-300 bg-indigo-50 px-3 py-1 font-bold text-indigo-700">Double</span>
      <span class="text-indigo-400">&rarr;</span>
      <span class="rounded border border-indigo-300 bg-indigo-50 px-3 py-1 font-bold text-indigo-700">Add 1</span>
      <span class="text-indigo-400">&rarr;</span>
      <span class="rounded bg-slate-100 px-3 py-1 font-bold text-slate-400">?</span>
    </div>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c1Answer} disabled={c1Result === 'correct'} placeholder="?" class="w-16 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-indigo-500 focus:outline-none disabled:opacity-50" />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c1Result === 'correct'}<p class="mt-2 text-center text-sm font-medium text-green-600">Correct! 3 * 2 = 6, then 6 + 1 = 7</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-center text-sm text-red-600">First double 3 to get 6, then add 1.</p>{/if}
  </div>

  <!-- C2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">2. What comes out?</p>
    <div class="mb-3 flex items-center justify-center gap-2 text-sm">
      <span class="rounded bg-indigo-100 px-3 py-1 font-bold text-indigo-700">2</span>
      <span class="text-indigo-400">&rarr;</span>
      <span class="rounded border border-indigo-300 bg-indigo-50 px-3 py-1 font-bold text-indigo-700">Square</span>
      <span class="text-indigo-400">&rarr;</span>
      <span class="rounded border border-indigo-300 bg-indigo-50 px-3 py-1 font-bold text-indigo-700">Double</span>
      <span class="text-indigo-400">&rarr;</span>
      <span class="rounded bg-slate-100 px-3 py-1 font-bold text-slate-400">?</span>
    </div>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c2Answer} disabled={c2Result === 'correct'} placeholder="?" class="w-16 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-indigo-500 focus:outline-none disabled:opacity-50" />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c2Result === 'correct'}<p class="mt-2 text-center text-sm font-medium text-green-600">Correct! 2 squared = 4, then 4 * 2 = 8</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-center text-sm text-red-600">First square 2 (= 4), then double it.</p>{/if}
  </div>

  <!-- C3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">3. Which pipeline turns <strong>5</strong> into <strong>11</strong>?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each [
        { id: 'add1-double', label: 'Add 1 → Double' },
        { id: 'double-add1', label: 'Double → Add 1' },
        { id: 'square-add1', label: 'Square → Add 1' },
      ] as opt}
        <button
          onclick={() => { c3Answer = opt.id; }}
          disabled={c3Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-sm font-medium transition-all
            {c3Answer === opt.id ? 'border-indigo-500 bg-indigo-100 text-indigo-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    <div class="mt-3 text-center">
      {#if c3Result !== 'correct' && c3Answer}
        <button onclick={checkC3} class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c3Result === 'correct'}<p class="mt-2 text-center text-sm font-medium text-green-600">Correct! 5 * 2 = 10, then 10 + 1 = 11</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-center text-sm text-red-600">Try each pipeline with input 5 and see which gives 11.</p>{/if}
  </div>

  {#if allDone}
    <div class="text-center"><p class="text-lg font-bold text-green-600">All challenges complete!</p></div>
  {/if}
</div>
