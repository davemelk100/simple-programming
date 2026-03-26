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
    c1Result = c1Answer.trim() === '1' ? 'correct' : 'wrong';
  }
  function checkC2() {
    c2Result = c2Answer.trim() === '3' ? 'correct' : 'wrong';
  }
  function checkC3() {
    c3Result = c3Answer.trim() === '0' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (allDone) {
      oncomplete?.([c1Result, c2Result, c3Result].filter((r) => r === 'correct').length);
    }
  });
</script>

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: State</h2>
    <p class="text-slate-600">Predict what the state will be after these operations!</p>
  </div>

  <!-- C1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">1. Starting at 0, after <strong>+1, +1, -1</strong>, what is the count?</p>
    <div class="mb-2 flex items-center justify-center gap-1 text-sm">
      {#each [{ v: 0, a: 'Start' }, { v: 1, a: '+1' }, { v: 2, a: '+1' }, { v: '?', a: '-1' }] as step}
        <div class="flex flex-col items-center">
          <div class="flex h-8 w-8 items-center justify-center rounded-full border border-pink-300 bg-pink-50 text-xs font-bold text-pink-700">{step.v}</div>
          <span class="text-xs text-pink-400">{step.a}</span>
        </div>
        {#if step.a !== '-1'}
          <svg class="h-3 w-4 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        {/if}
      {/each}
    </div>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c1Answer} disabled={c1Result === 'correct'} placeholder="?" class="w-16 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-pink-500 focus:outline-none disabled:opacity-50" />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! 0 +1 +1 -1 = 1</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Walk through each step: 0, then +1=1, then +1=2, then -1=?</p>{/if}
  </div>

  <!-- C2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">2. Starting at 5, after <strong>-1, -1</strong>, what is the count?</p>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c2Answer} disabled={c2Result === 'correct'} placeholder="?" class="w-16 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-pink-500 focus:outline-none disabled:opacity-50" />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! 5 -1 -1 = 3</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Start at 5, subtract 1 twice.</p>{/if}
  </div>

  <!-- C3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">3. Starting at 0, after <strong>+1, +1, +1, -1, -1, -1</strong>, what is the count?</p>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c3Answer} disabled={c3Result === 'correct'} placeholder="?" class="w-16 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-pink-500 focus:outline-none disabled:opacity-50" />
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Three ups and three downs cancel out: 0!</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Add 1 three times, then subtract 1 three times. Where do you end up?</p>{/if}
  </div>

  {#if allDone}
    <div><p class="text-lg font-bold text-green-600">All challenges complete!</p></div>
  {/if}
</div>
