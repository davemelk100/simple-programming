<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Run unit tests on simple functions ===
  interface TestCase {
    id: number;
    description: string;
    functionName: string;
    functionCall: string;
    expected: string;
    actual: string;
    result: 'pass' | 'fail' | null;
    animating: boolean;
  }

  function add(a: number, b: number): number { return a + b; }
  function isEven(n: number): boolean { return n % 2 === 0; }
  function capitalize(str: string): string {
    if (str.length === 0) return '';
    return str[0].toUpperCase() + str.slice(1);
  }

  let testCases: TestCase[] = $state([
    { id: 1, description: 'adds two positive numbers', functionName: 'add', functionCall: 'add(2, 3)', expected: '5', actual: '', result: null, animating: false },
    { id: 2, description: 'adds a negative number', functionName: 'add', functionCall: 'add(10, -4)', expected: '6', actual: '', result: null, animating: false },
    { id: 3, description: 'returns true for even numbers', functionName: 'isEven', functionCall: 'isEven(4)', expected: 'true', actual: '', result: null, animating: false },
    { id: 4, description: 'returns false for odd numbers', functionName: 'isEven', functionCall: 'isEven(7)', expected: 'false', actual: '', result: null, animating: false },
    { id: 5, description: 'capitalizes the first letter', functionName: 'capitalize', functionCall: 'capitalize("hello")', expected: 'Hello', actual: '', result: null, animating: false },
    { id: 6, description: 'handles empty string', functionName: 'capitalize', functionCall: 'capitalize("")', expected: '', actual: '', result: null, animating: false },
  ]);

  let passingCount = $derived(testCases.filter(t => t.result === 'pass').length);
  let totalTests = $derived(testCases.length);
  let allRun = $derived(testCases.every(t => t.result !== null));

  function evaluateTest(tc: TestCase): { actual: string; pass: boolean } {
    let actual: string;
    switch (tc.functionCall) {
      case 'add(2, 3)': actual = String(add(2, 3)); break;
      case 'add(10, -4)': actual = String(add(10, -4)); break;
      case 'isEven(4)': actual = String(isEven(4)); break;
      case 'isEven(7)': actual = String(isEven(7)); break;
      case 'capitalize("hello")': actual = capitalize('hello'); break;
      case 'capitalize("")': actual = capitalize(''); break;
      default: actual = 'error';
    }
    return { actual, pass: actual === tc.expected };
  }

  function runSingleTest(index: number) {
    const tc = testCases[index];
    if (tc.result !== null) return;
    tc.animating = true;
    setTimeout(() => {
      const { actual, pass } = evaluateTest(tc);
      tc.actual = actual;
      tc.result = pass ? 'pass' : 'fail';
      tc.animating = false;
    }, 400);
  }

  function runAllTests() {
    testCases.forEach((tc, i) => {
      if (tc.result !== null) return;
      setTimeout(() => runSingleTest(i), i * 250);
    });
  }

  function resetTests() {
    testCases.forEach(tc => {
      tc.result = null;
      tc.actual = '';
      tc.animating = false;
    });
  }

  // === Advanced mode: Mock-based testing ===
  interface MockTestCase {
    id: number;
    description: string;
    functionCall: string;
    mockSetup: string;
    expected: string;
    actual: string;
    result: 'pass' | 'fail' | null;
    animating: boolean;
  }

  let mockTests: MockTestCase[] = $state([
    {
      id: 1,
      description: 'fetchUser returns mocked user data',
      functionCall: 'fetchUser(1)',
      mockSetup: 'vi.spyOn(global, "fetch").mockResolvedValue({ json: () => ({ name: "Alice" }) })',
      expected: '{"name":"Alice"}',
      actual: '',
      result: null,
      animating: false,
    },
    {
      id: 2,
      description: 'fetchUser throws on network error',
      functionCall: 'fetchUser(999)',
      mockSetup: 'vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network failure"))',
      expected: 'Error: Network failure',
      actual: '',
      result: null,
      animating: false,
    },
    {
      id: 3,
      description: 'saveUser calls the database mock',
      functionCall: 'saveUser({ name: "Bob" })',
      mockSetup: 'const mockDb = { save: vi.fn().mockResolvedValue({ id: 42 }) }',
      expected: '{"id":42}',
      actual: '',
      result: null,
      animating: false,
    },
  ]);

  let mockPassingCount = $derived(mockTests.filter(t => t.result === 'pass').length);
  let mockTotalTests = $derived(mockTests.length);
  let mockAllRun = $derived(mockTests.every(t => t.result !== null));

  function runMockTest(index: number) {
    const tc = mockTests[index];
    if (tc.result !== null) return;
    tc.animating = true;
    setTimeout(() => {
      tc.actual = tc.expected;
      tc.result = 'pass';
      tc.animating = false;
    }, 500);
  }

  function runAllMockTests() {
    mockTests.forEach((_, i) => {
      if (mockTests[i].result !== null) return;
      setTimeout(() => runMockTest(i), i * 300);
    });
  }

  function resetMockTests() {
    mockTests.forEach(tc => {
      tc.result = null;
      tc.actual = '';
      tc.animating = false;
    });
  }
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Run Unit Tests</h2>
    <p class="text-slate-600">
      Below are three simple functions. Click each test to run it, or use <strong>Run All</strong> to execute them all and watch the results animate in.
    </p>
  </div>

  <!-- Functions panel -->
  <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
    <h4 class="mb-3 text-sm font-bold uppercase tracking-wider text-green-600">Functions Under Test</h4>
    <div class="grid gap-3 sm:grid-cols-3">
      <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">add</span>(<span class="arg">a</span>, <span class="arg">b</span>) {
  <span class="kw">return</span> <span class="arg">a</span> <span class="op">+</span> <span class="arg">b</span>;
}`}</code></pre>
      <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">isEven</span>(<span class="arg">n</span>) {
  <span class="kw">return</span> <span class="arg">n</span> <span class="op">%</span> <span class="num">2</span> <span class="op">===</span> <span class="num">0</span>;
}`}</code></pre>
      <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">capitalize</span>(<span class="arg">str</span>) {
  <span class="kw">if</span> (!<span class="arg">str</span>) <span class="kw">return</span> <span class="str">''</span>;
  <span class="kw">return</span> <span class="arg">str</span>[<span class="num">0</span>].<span class="fn">toUpperCase</span>()
    <span class="op">+</span> <span class="arg">str</span>.<span class="fn">slice</span>(<span class="num">1</span>);
}`}</code></pre>
    </div>
  </div>

  <!-- Progress counter -->
  <div class="flex items-center justify-between rounded-xl border-2 border-green-200 bg-white px-5 py-3">
    <span class="text-sm font-bold text-slate-700">Test Results</span>
    <span class="rounded-full px-4 py-1 text-sm font-bold {passingCount === totalTests && allRun ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}">
      {passingCount} of {totalTests} tests passing
    </span>
  </div>

  <!-- Test cases -->
  <div class="space-y-2">
    {#each testCases as tc, i}
      <button
        onclick={() => runSingleTest(i)}
        disabled={tc.result !== null}
        class="flex w-full items-center gap-3 rounded-lg border-2 p-3 text-left transition-all
          {tc.result === 'pass' ? 'border-green-400 bg-green-50' : tc.result === 'fail' ? 'border-red-400 bg-red-50' : 'border-green-200 bg-white hover:shadow-md active:scale-[0.99]'}
          {tc.result !== null ? 'cursor-default' : 'cursor-pointer'}
          {tc.animating ? 'animate-pulse' : ''}"
      >
        <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg font-bold
          {tc.result === 'pass' ? 'bg-green-500 text-white' : tc.result === 'fail' ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-500'}">
          {#if tc.result === 'pass'}
            &#10003;
          {:else if tc.result === 'fail'}
            &#10007;
          {:else}
            &#8226;
          {/if}
        </span>
        <div class="flex-1">
          <p class="text-sm font-semibold text-slate-700">
            <span class="text-green-600">{tc.functionName}</span> -- {tc.description}
          </p>
          <p class="font-mono text-xs text-slate-500">
            {tc.functionCall} &#8594; expects <strong>{tc.expected === '' ? '""' : tc.expected}</strong>
            {#if tc.result !== null}
              <span class="ml-2 {tc.result === 'pass' ? 'text-green-600' : 'text-red-600'}">got {tc.actual === '' ? '""' : tc.actual}</span>
            {/if}
          </p>
        </div>
      </button>
    {/each}
  </div>

  <div class="flex gap-3">
    <button
      onclick={runAllTests}
      disabled={allRun}
      class="rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50"
    >
      Run All Tests
    </button>
    {#if allRun}
      <button
        onclick={resetTests}
        class="rounded-lg border-2 border-green-300 bg-white px-6 py-2 text-sm font-semibold text-green-700 hover:bg-green-50 active:scale-95"
      >
        Reset
      </button>
    {/if}
  </div>

  {#if allRun && passingCount === totalTests}
    <div class="rounded-xl border-2 border-green-400 bg-green-100 p-4 text-center">
      <p class="font-bold text-green-700">All {totalTests} tests pass! Great work.</p>
    </div>
  {/if}

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      I've run the tests
    </button>
  </div>

  {:else}

  <!-- Advanced mode: Testing with mocks -->
  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Testing with Mocks</h2>
      <p class="text-slate-600">
        These tests use <strong>mock functions</strong> to simulate API calls and database operations. Each test shows the mock setup and the expected behavior. Run them to see how mocking works in practice.
      </p>
    </div>

    <!-- Function under test -->
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
      <h4 class="mb-3 text-sm font-bold uppercase tracking-wider text-green-600">Function Under Test</h4>
      <pre class="code-block"><code>{@html `<span class="kw">async function</span> <span class="fn">fetchUser</span>(<span class="arg">id</span>) {
  <span class="kw">const</span> <span class="var">response</span> = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">\`/api/users/\${<span class="arg">id</span>}\`</span>);
  <span class="kw">return</span> <span class="var">response</span>.<span class="fn">json</span>();
}

<span class="kw">async function</span> <span class="fn">saveUser</span>(<span class="arg">user</span>, <span class="arg">db</span>) {
  <span class="kw">return</span> <span class="arg">db</span>.<span class="fn">save</span>(<span class="arg">user</span>);
}`}</code></pre>
    </div>

    <!-- Progress counter -->
    <div class="flex items-center justify-between rounded-xl border-2 border-green-200 bg-white px-5 py-3">
      <span class="text-sm font-bold text-slate-700">Mock Test Results</span>
      <span class="rounded-full px-4 py-1 text-sm font-bold {mockPassingCount === mockTotalTests && mockAllRun ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}">
        {mockPassingCount} of {mockTotalTests} tests passing
      </span>
    </div>

    <!-- Mock test cases -->
    <div class="space-y-3">
      {#each mockTests as tc, i}
        <div class="rounded-xl border-2 p-4 transition-all
          {tc.result === 'pass' ? 'border-green-400 bg-green-50' : tc.result === 'fail' ? 'border-red-400 bg-red-50' : 'border-green-200 bg-white'}">
          <div class="mb-2 flex items-center gap-3">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg font-bold
              {tc.result === 'pass' ? 'bg-green-500 text-white' : tc.result === 'fail' ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-500'}
              {tc.animating ? 'animate-pulse' : ''}">
              {#if tc.result === 'pass'}
                &#10003;
              {:else if tc.result === 'fail'}
                &#10007;
              {:else}
                &#8226;
              {/if}
            </span>
            <p class="font-semibold text-slate-700">{tc.description}</p>
          </div>
          <div class="mb-2 rounded-lg bg-slate-800 p-3 font-mono text-xs text-slate-300">
            <div class="text-slate-500">// Mock setup:</div>
            <div class="text-green-300">{tc.mockSetup}</div>
            <div class="mt-2 text-slate-500">// Call:</div>
            <div class="text-green-300">{tc.functionCall}</div>
          </div>
          {#if tc.result !== null}
            <p class="text-sm font-mono {tc.result === 'pass' ? 'text-green-600' : 'text-red-600'}">
              Result: {tc.actual}
            </p>
          {/if}
          {#if tc.result === null}
            <button
              onclick={() => runMockTest(i)}
              class="mt-1 rounded-lg bg-green-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-green-700 active:scale-95"
            >
              Run Test
            </button>
          {/if}
        </div>
      {/each}
    </div>

    <div class="flex gap-3">
      <button
        onclick={runAllMockTests}
        disabled={mockAllRun}
        class="rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50"
      >
        Run All Tests
      </button>
      {#if mockAllRun}
        <button
          onclick={resetMockTests}
          class="rounded-lg border-2 border-green-300 bg-white px-6 py-2 text-sm font-semibold text-green-700 hover:bg-green-50 active:scale-95"
        >
          Reset
        </button>
      {/if}
    </div>

    {#if mockAllRun && mockPassingCount === mockTotalTests}
      <div class="rounded-xl border-2 border-green-400 bg-green-100 p-4 text-center">
        <p class="font-bold text-green-700">All mock tests pass! You can see how mocks let you test code that depends on external services without actually calling them.</p>
      </div>
    {/if}

    <div>
      <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
        I've run the tests
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a;
    color: #e2e8f0; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw) { color: #c084fc; } .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; } .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; } .code-block :global(.fn) { color: #93c5fd; }
  .code-block :global(.op) { color: #94a3b8; } .code-block :global(.arg) { color: #fdba74; }
</style>
