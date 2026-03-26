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

  function checkC1() {
    c1Result = c1Answer.trim().toLowerCase() === 'false' ? 'correct' : 'wrong';
  }
  function checkC2() {
    c2Result = c2Answer.trim().toLowerCase() === 'false' ? 'correct' : 'wrong';
  }
  function checkC3() {
    c3Result = c3Answer.trim().toLowerCase() === 'true' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (allDone) {
      oncomplete?.([c1Result, c2Result, c3Result].filter((r) => r === 'correct').length);
    }
  });
</script>

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Logic</h2>
    <p class="text-slate-600">Predict the output of these logic expressions!</p>
  </div>

  <!-- C1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">1. What is <code class="rounded bg-yellow-100 px-2 py-0.5 font-bold text-yellow-800">true AND false</code>?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each ['true', 'false'] as opt}
        <button
          onclick={() => { c1Answer = opt; }}
          disabled={c1Result === 'correct'}
          class="rounded-lg border px-6 py-2 text-sm font-bold transition-all
            {c1Answer === opt ? 'border-yellow-500 bg-yellow-100 text-yellow-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >{opt}</button>
      {/each}
      {#if c1Result !== 'correct' && c1Answer}
        <button onclick={checkC1} class="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! AND needs BOTH to be true.</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">With AND, both sides must be true for the result to be true.</p>{/if}
  </div>

  <!-- C2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">2. What is <code class="rounded bg-yellow-100 px-2 py-0.5 font-bold text-yellow-800">NOT true</code>?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each ['true', 'false'] as opt}
        <button
          onclick={() => { c2Answer = opt; }}
          disabled={c2Result === 'correct'}
          class="rounded-lg border px-6 py-2 text-sm font-bold transition-all
            {c2Answer === opt ? 'border-yellow-500 bg-yellow-100 text-yellow-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >{opt}</button>
      {/each}
      {#if c2Result !== 'correct' && c2Answer}
        <button onclick={checkC2} class="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! NOT flips true to false.</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">NOT flips the value to its opposite!</p>{/if}
  </div>

  <!-- C3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">3. What is <code class="rounded bg-yellow-100 px-2 py-0.5 font-bold text-yellow-800">true OR false</code>?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each ['true', 'false'] as opt}
        <button
          onclick={() => { c3Answer = opt; }}
          disabled={c3Result === 'correct'}
          class="rounded-lg border px-6 py-2 text-sm font-bold transition-all
            {c3Answer === opt ? 'border-yellow-500 bg-yellow-100 text-yellow-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >{opt}</button>
      {/each}
      {#if c3Result !== 'correct' && c3Answer}
        <button onclick={checkC3} class="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! OR only needs ONE to be true.</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">With OR, the result is true if at least one side is true.</p>{/if}
  </div>

  {#if allDone}
    <div><p class="text-lg font-bold text-green-600">All challenges complete!</p></div>
  {/if}
</div>
