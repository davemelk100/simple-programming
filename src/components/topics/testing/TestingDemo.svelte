<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

  interface TestCase {
    id: string;
    label: string;
    input: string;
    expected: string;
    fn: (input: string) => string;
  }

  const testCases: TestCase[] = [
    { id: 'upper', label: 'uppercase("hello")', input: 'hello', expected: 'HELLO', fn: (s) => s.toUpperCase() },
    { id: 'reverse', label: 'reverse("abc")', input: 'abc', expected: 'cba', fn: (s) => s.split('').reverse().join('') },
    { id: 'first', label: 'firstChar("world")', input: 'world', expected: 'w', fn: (s) => s[0] },
  ];

  let results = $state<Record<string, 'pass' | 'fail' | null>>({
    upper: null,
    reverse: null,
    first: null,
  });

  let isRunning = $state(false);
  let currentTest = $state(-1);

  function runTests() {
    if (isRunning) return;
    isRunning = true;
    currentTest = -1;
    results = { upper: null, reverse: null, first: null };

    let step = 0;
    const interval = setInterval(() => {
      if (step < testCases.length) {
        const tc = testCases[step];
        currentTest = step;
        const actual = tc.fn(tc.input);
        results[tc.id] = actual === tc.expected ? 'pass' : 'fail';
        step++;
      } else {
        clearInterval(interval);
        isRunning = false;
      }
    }, 800);
  }

  let allPassed = $derived(Object.values(results).every((r) => r === 'pass'));
</script>

<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Test Runner</h2>
    <p class="text-slate-600">Watch tests run one by one and see if they pass or fail!</p>
  </div>

  <!-- Test list -->
  <div class="space-y-3">
    {#each testCases as tc, i}
      <div class="flex items-center gap-3 rounded-xl border-2 px-5 py-4 transition-all duration-300
        {results[tc.id] === 'pass' ? 'border-green-300 bg-green-50' : results[tc.id] === 'fail' ? 'border-red-300 bg-red-50' : currentTest === i ? 'border-teal-400 bg-teal-50 test-pulse' : 'border-slate-200 bg-white'}">
        <!-- Status icon -->
        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg
          {results[tc.id] === 'pass' ? 'bg-green-200' : results[tc.id] === 'fail' ? 'bg-red-200' : 'bg-slate-100'}">
          {#if results[tc.id] === 'pass'}
            <span class="icon-pop">&#10003;</span>
          {:else if results[tc.id] === 'fail'}
            <span class="icon-pop">&#10007;</span>
          {:else}
            <span class="text-slate-400">&#8226;</span>
          {/if}
        </div>

        <div class="flex-1">
          <div class="font-mono text-sm font-bold text-slate-800">{tc.label}</div>
          <div class="text-xs text-slate-500">expected: <span class="font-mono font-bold text-teal-600">"{tc.expected}"</span></div>
        </div>

        {#if results[tc.id] === 'pass'}
          <span class="text-sm font-bold text-green-600">PASS</span>
        {:else if results[tc.id] === 'fail'}
          <span class="text-sm font-bold text-red-600">FAIL</span>
        {/if}
      </div>
    {/each}
  </div>

  <!-- Run button -->
  <div class="flex items-center gap-4">
    <button
      onclick={runTests}
      disabled={isRunning}
      class="rounded-full bg-teal-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-teal-700 active:scale-95 disabled:opacity-40"
    >
      {isRunning ? 'Running...' : 'Run Tests'}
    </button>

    {#if allPassed && !isRunning}
      <span class="text-sm font-bold text-green-600">All tests passed!</span>
    {/if}
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-teal-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-teal-700 active:scale-95">
      I've tried this
    </button>
  </div>
</div>

<style>
  @keyframes testPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.4); }
    50% { box-shadow: 0 0 0 6px rgba(20, 184, 166, 0); }
  }
  @keyframes iconPop {
    from { transform: scale(0); }
    to { transform: scale(1); }
  }
  .test-pulse { animation: testPulse 0.6s ease-out; }
  .icon-pop { animation: iconPop 0.3s ease-out; display: inline-block; }
</style>
