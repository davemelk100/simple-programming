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

  // What does expect(add(2, 3)).toBe(?) check?
  function checkC1() {
    c1Result = c1Answer.trim() === '5' ? 'correct' : 'wrong';
  }

  // Which test would catch a bug where reverse("ab") returns "ab"?
  function checkC2() {
    c2Result = c2Answer === 'expect-ba' ? 'correct' : 'wrong';
  }

  // In Arrange-Act-Assert, what comes first?
  function checkC3() {
    c3Result = c3Answer === 'arrange' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (allDone) {
      oncomplete?.([c1Result, c2Result, c3Result].filter((r) => r === 'correct').length);
    }
  });
</script>

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Testing</h2>
    <p class="text-slate-600">Test your knowledge of testing!</p>
  </div>

  <!-- C1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">1. Fill in the blank:</p>
    <div class="mb-3 rounded-lg bg-slate-800 p-4 font-mono text-sm text-green-400">
      expect(add(2, 3)).toBe(<span class="text-yellow-300">?</span>);
    </div>
    <p class="mb-3 text-sm text-slate-600">If <code class="text-sm">add</code> adds two numbers, what value should go in place of <strong>?</strong></p>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c1Answer} disabled={c1Result === 'correct'} placeholder="?" class="w-16 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-teal-500 focus:outline-none disabled:opacity-50" />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! 2 + 3 = 5, so the test expects 5.</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Think about what add(2, 3) should return.</p>{/if}
  </div>

  <!-- C2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">2. A buggy <code>reverse</code> function returns <code>"ab"</code> instead of <code>"ba"</code>. Which test catches this?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each [
        { id: 'expect-ba', label: 'expect(reverse("ab")).toBe("ba")' },
        { id: 'expect-ab', label: 'expect(reverse("ab")).toBe("ab")' },
        { id: 'expect-len', label: 'expect(reverse("ab").length).toBe(2)' },
      ] as opt}
        <button
          onclick={() => { c2Answer = opt.id; }}
          disabled={c2Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-sm font-medium font-mono transition-all
            {c2Answer === opt.id ? 'border-teal-500 bg-teal-100 text-teal-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      {#if c2Result !== 'correct' && c2Answer}
        <button onclick={checkC2} class="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! This test expects "ba" so it would fail when the buggy function returns "ab".</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Which assertion would fail if reverse returns the input unchanged?</p>{/if}
  </div>

  <!-- C3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">3. In the <strong>Arrange-Act-Assert</strong> pattern, what do you do first?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each [
        { id: 'assert', label: 'Assert (check the result)' },
        { id: 'act', label: 'Act (do the thing)' },
        { id: 'arrange', label: 'Arrange (set up data)' },
      ] as opt}
        <button
          onclick={() => { c3Answer = opt.id; }}
          disabled={c3Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-sm font-medium transition-all
            {c3Answer === opt.id ? 'border-teal-500 bg-teal-100 text-teal-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      {#if c3Result !== 'correct' && c3Answer}
        <button onclick={checkC3} class="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! First you arrange (set up), then act (do), then assert (check).</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">The name gives the order: Arrange, Act, Assert. What comes first?</p>{/if}
  </div>

  {#if allDone}
    <div><p class="text-lg font-bold text-green-600">All challenges complete!</p></div>
  {/if}
</div>
