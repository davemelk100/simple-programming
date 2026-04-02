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

  // Which severity for "app crashes on launch"?
  function checkC1() {
    c1Result = c1Answer === 'critical' ? 'correct' : 'wrong';
  }

  // What is regression testing?
  function checkC2() {
    c2Result = c2Answer === 'retest-after-changes' ? 'correct' : 'wrong';
  }

  // Which is an edge case for a "name" input?
  function checkC3() {
    c3Result = c3Answer === 'empty-string' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (allDone) {
      oncomplete?.([c1Result, c2Result, c3Result].filter((r) => r === 'correct').length);
    }
  });
</script>

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Quality Assurance</h2>
    <p class="text-slate-600">Think like a QA engineer!</p>
  </div>

  <!-- C1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">1. A user reports: <em>"The app crashes as soon as I open it."</em> What severity is this bug?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each [
        { id: 'minor', label: 'Minor' },
        { id: 'major', label: 'Major' },
        { id: 'critical', label: 'Critical' },
      ] as opt}
        <button
          onclick={() => { c1Answer = opt.id; }}
          disabled={c1Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-sm font-medium transition-all
            {c1Answer === opt.id ? 'border-rose-500 bg-rose-100 text-rose-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      {#if c1Result !== 'correct' && c1Answer}
        <button onclick={checkC1} class="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! A crash on launch means nobody can use the app &mdash; that's critical.</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">If nobody can use the app at all, that's the highest severity.</p>{/if}
  </div>

  <!-- C2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">2. What is <strong>regression testing</strong>?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each [
        { id: 'test-new-features', label: 'Testing only new features' },
        { id: 'retest-after-changes', label: 'Re-testing existing features after changes' },
        { id: 'test-performance', label: 'Testing how fast the app runs' },
      ] as opt}
        <button
          onclick={() => { c2Answer = opt.id; }}
          disabled={c2Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-sm font-medium transition-all
            {c2Answer === opt.id ? 'border-rose-500 bg-rose-100 text-rose-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      {#if c2Result !== 'correct' && c2Answer}
        <button onclick={checkC2} class="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Regression testing makes sure changes didn't break things that used to work.</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">"Regression" means going backward &mdash; it checks that nothing went backward after a change.</p>{/if}
  </div>

  <!-- C3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">3. You're testing a "name" input field. Which of these is an <strong>edge case</strong>?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each [
        { id: 'normal-name', label: '"Alice"' },
        { id: 'empty-string', label: '"" (empty string)' },
        { id: 'another-name', label: '"Bob"' },
      ] as opt}
        <button
          onclick={() => { c3Answer = opt.id; }}
          disabled={c3Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-sm font-medium transition-all
            {c3Answer === opt.id ? 'border-rose-500 bg-rose-100 text-rose-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      {#if c3Result !== 'correct' && c3Answer}
        <button onclick={checkC3} class="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! An empty string is an edge case &mdash; it's an unusual input that might break things.</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Edge cases are unusual or extreme inputs. Which one is least "normal"?</p>{/if}
  </div>

  {#if allDone}
    <div><p class="text-lg font-bold text-green-600">All challenges complete!</p></div>
  {/if}
</div>
