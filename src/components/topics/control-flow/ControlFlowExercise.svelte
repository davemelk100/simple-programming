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
    c1Result = c1Answer.trim().toLowerCase() === 'umbrella' ? 'correct' : 'wrong';
  }
  function checkC2() {
    c2Result = c2Answer.trim() === '5' ? 'correct' : 'wrong';
  }
  function checkC3() {
    c3Result = c3Answer.trim().toLowerCase() === 'small' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (allDone) {
      oncomplete?.([c1Result, c2Result, c3Result].filter((r) => r === 'correct').length);
    }
  });
</script>

<div class="space-y-8">
  <div class="text-center">
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Control Flow</h2>
    <p class="text-slate-600">Predict what happens in these scenarios!</p>
  </div>

  <!-- C1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">1. It IS raining. Based on the rule "if raining, take umbrella; else wear sunglasses" -- what do you take?</p>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c1Answer} disabled={c1Result === 'correct'} placeholder="Answer" class="w-32 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-orange-500 focus:outline-none disabled:opacity-50" />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c1Result === 'correct'}<p class="mt-2 text-center text-sm font-medium text-green-600">Correct! It's raining, so grab that umbrella!</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-center text-sm text-red-600">Think about which branch happens when the condition is true.</p>{/if}
  </div>

  <!-- C2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">2. A loop says "repeat 5 times: say hello." How many times is "hello" said?</p>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c2Answer} disabled={c2Result === 'correct'} placeholder="Number" class="w-20 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-orange-500 focus:outline-none disabled:opacity-50" />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c2Result === 'correct'}<p class="mt-2 text-center text-sm font-medium text-green-600">Correct! The loop repeats exactly 5 times.</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-center text-sm text-red-600">The loop repeats the exact number of times it says!</p>{/if}
  </div>

  <!-- C3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">3. The number is 3. The rule is "if number > 10, say 'big'; else say 'small'." Which branch runs?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each ['big', 'small'] as opt}
        <button
          onclick={() => { c3Answer = opt; }}
          disabled={c3Result === 'correct'}
          class="rounded-lg border px-5 py-2 text-sm font-medium transition-all
            {c3Answer === opt ? 'border-orange-500 bg-orange-100 text-orange-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt}
        </button>
      {/each}
      {#if c3Result !== 'correct' && c3Answer}
        <button onclick={checkC3} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c3Result === 'correct'}<p class="mt-2 text-center text-sm font-medium text-green-600">Correct! 3 is not greater than 10, so we say "small".</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-center text-sm text-red-600">Is 3 greater than 10? Think again!</p>{/if}
  </div>

  {#if allDone}
    <div class="text-center"><p class="text-lg font-bold text-green-600">All challenges complete!</p></div>
  {/if}
</div>
