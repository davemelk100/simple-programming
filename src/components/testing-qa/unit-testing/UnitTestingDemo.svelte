<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Write a Test ===
  interface TestCase {
    description: string;
    functionCall: string;
    correctAnswer: string;
    userAnswer: string;
    result: 'pass' | 'fail' | null;
  }

  let currentFunction = $state<'add' | 'capitalize'>('add');

  let addTests: TestCase[] = $state([
    { description: 'adds two positive numbers', functionCall: 'add(2, 3)', correctAnswer: '5', userAnswer: '', result: null },
    { description: 'adds a negative number', functionCall: 'add(10, -4)', correctAnswer: '6', userAnswer: '', result: null },
    { description: 'adds zeros', functionCall: 'add(0, 0)', correctAnswer: '0', userAnswer: '', result: null },
  ]);

  let capitalizeTests: TestCase[] = $state([
    { description: 'capitalizes a word', functionCall: 'capitalize("hello")', correctAnswer: 'Hello', userAnswer: '', result: null },
    { description: 'handles single character', functionCall: 'capitalize("a")', correctAnswer: 'A', userAnswer: '', result: null },
    { description: 'handles empty string', functionCall: 'capitalize("")', correctAnswer: '', userAnswer: '', result: null },
  ]);

  let activeTests = $derived(currentFunction === 'add' ? addTests : capitalizeTests);
  let allPassed = $derived(activeTests.every(t => t.result === 'pass'));

  function checkTest(index: number) {
    const tests = currentFunction === 'add' ? addTests : capitalizeTests;
    const test = tests[index];
    test.result = test.userAnswer.trim() === test.correctAnswer ? 'pass' : 'fail';
  }

  function runAllTests() {
    const tests = currentFunction === 'add' ? addTests : capitalizeTests;
    tests.forEach((_, i) => checkTest(i));
  }

  // === Advanced mode: Mock It Out ===
  interface MockOption {
    label: string;
    code: string;
    shouldMock: boolean;
    selected: boolean;
  }

  let mockOptions: MockOption[] = $state([
    { label: 'fetch (HTTP client)', code: 'global.fetch', shouldMock: true, selected: false },
    { label: 'JSON.parse', code: 'JSON.parse', shouldMock: false, selected: false },
    { label: 'Database connection', code: 'db.query', shouldMock: true, selected: false },
    { label: 'Math.round', code: 'Math.round', shouldMock: false, selected: false },
    { label: 'Logger service', code: 'logger.info', shouldMock: true, selected: false },
  ]);

  let mockSubmitted = $state(false);
  let mockScore = $derived(mockOptions.filter(o => o.selected === o.shouldMock).length);

  function toggleMock(index: number) {
    if (!mockSubmitted) mockOptions[index].selected = !mockOptions[index].selected;
  }

  function submitMocks() {
    mockSubmitted = true;
  }

  let generatedMockCode = $derived(generateMockTest());

  function generateMockTest(): string {
    if (!mockSubmitted) return '';
    const mocked = mockOptions.filter(o => o.selected);
    if (mocked.length === 0) return '<span class="cmt">// No mocks selected - the test would call real services!</span>';

    const lines: string[] = [];
    lines.push('<span class="cmt">// Generated test with mocks</span>');
    lines.push('<span class="fn">describe</span>(<span class="str">\'getUserData\'</span>, () => {');
    lines.push('  <span class="fn">beforeEach</span>(() => {');
    for (const m of mocked) {
      lines.push(`    <span class="var">vi</span>.<span class="fn">spyOn</span>(<span class="var">${m.code.split('.')[0]}</span>, <span class="str">\'${m.code.split('.')[1]}\'</span>).<span class="fn">mockResolvedValue</span>(<span class="var">fakeData</span>);`);
    }
    lines.push('  });');
    lines.push('');
    lines.push('  <span class="fn">it</span>(<span class="str">\'returns formatted user data\'</span>, <span class="kw">async</span> () => {');
    lines.push('    <span class="kw">const</span> <span class="var">result</span> = <span class="kw">await</span> <span class="fn">getUserData</span>(<span class="num">1</span>);');
    lines.push('    <span class="fn">expect</span>(<span class="var">result</span>.<span class="var">name</span>).<span class="fn">toBeDefined</span>();');
    lines.push('  });');
    lines.push('');
    lines.push('  <span class="fn">afterEach</span>(() => {');
    lines.push('    <span class="var">vi</span>.<span class="fn">restoreAllMocks</span>();');
    lines.push('  });');
    lines.push('});');
    return lines.join('\n');
  }
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Write a Test</h2>
    <p class="text-slate-600">
      Below is a function. For each test case, fill in the <strong>expected return value</strong>, then run the tests to see if they pass.
    </p>
  </div>

  <div class="rounded-xl border-2 border-green-200 bg-green-50 p-6 space-y-6">
    <!-- Function selector -->
    <div class="flex gap-2">
      <button
        onclick={() => currentFunction = 'add'}
        class="rounded-lg px-4 py-1.5 text-sm font-semibold border-2 transition-all {currentFunction === 'add' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-green-700 border-green-300'}"
      >
        add(a, b)
      </button>
      <button
        onclick={() => currentFunction = 'capitalize'}
        class="rounded-lg px-4 py-1.5 text-sm font-semibold border-2 transition-all {currentFunction === 'capitalize' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-green-700 border-green-300'}"
      >
        capitalize(str)
      </button>
    </div>

    <!-- Function definition -->
    <div>
      <h4 class="mb-2 text-sm font-bold text-slate-700">Function Under Test</h4>
      {#if currentFunction === 'add'}
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">add</span>(<span class="arg">a</span>, <span class="arg">b</span>) {
  <span class="kw">return</span> <span class="arg">a</span> <span class="op">+</span> <span class="arg">b</span>;
}`}</code></pre>
      {:else}
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">capitalize</span>(<span class="arg">str</span>) {
  <span class="kw">if</span> (<span class="arg">str</span>.<span class="var">length</span> <span class="op">===</span> <span class="num">0</span>) <span class="kw">return</span> <span class="str">''</span>;
  <span class="kw">return</span> <span class="arg">str</span>[<span class="num">0</span>].<span class="fn">toUpperCase</span>() <span class="op">+</span> <span class="arg">str</span>.<span class="fn">slice</span>(<span class="num">1</span>);
}`}</code></pre>
      {/if}
    </div>

    <!-- Test cases -->
    <div class="space-y-3">
      <h4 class="text-sm font-bold text-slate-700">Test Cases</h4>
      {#each activeTests as test, i}
        <div class="flex items-center gap-3 rounded-lg border-2 p-3
          {test.result === 'pass' ? 'border-green-400 bg-green-100' : test.result === 'fail' ? 'border-red-400 bg-red-100' : 'border-green-200 bg-white'}">
          <div class="flex-1">
            <p class="text-sm font-semibold text-slate-700">{test.description}</p>
            <p class="font-mono text-sm text-slate-500">{test.functionCall} =</p>
          </div>
          <input
            type="text"
            bind:value={test.userAnswer}
            placeholder="?"
            disabled={test.result === 'pass'}
            class="w-24 rounded-lg border-2 border-green-300 bg-white px-3 py-1.5 text-center text-sm font-mono text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
          />
          <span class="text-xl">
            {#if test.result === 'pass'}
              &#10003;
            {:else if test.result === 'fail'}
              &#10007;
            {:else}
              &#8226;
            {/if}
          </span>
        </div>
      {/each}
    </div>

    <button
      onclick={runAllTests}
      class="rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95"
    >
      Run Tests
    </button>

    {#if allPassed}
      <div class="rounded-xl border-2 border-green-400 bg-green-100 p-4 text-center">
        <p class="font-bold text-green-700">All tests pass! Great work.</p>
      </div>
    {/if}
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      I've written my tests
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Mock It Out</h2>
      <p class="text-slate-600">
        The function below calls external services. Pick which dependencies should be <strong>mocked</strong> in a unit test and see the generated test code.
      </p>
    </div>

    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-6 space-y-6">
      <!-- Function to test -->
      <div>
        <h4 class="mb-2 text-sm font-bold text-slate-700">Function Under Test</h4>
        <pre class="code-block"><code>{@html `<span class="kw">async function</span> <span class="fn">getUserData</span>(<span class="arg">userId</span>) {
  <span class="var">logger</span>.<span class="fn">info</span>(<span class="str">'Fetching user'</span>, <span class="arg">userId</span>);
  <span class="kw">const</span> <span class="var">response</span> = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">\`/api/users/\${<span class="arg">userId</span>}\`</span>);
  <span class="kw">const</span> <span class="var">raw</span> = <span class="kw">await</span> <span class="var">response</span>.<span class="fn">json</span>();
  <span class="kw">const</span> <span class="var">profile</span> = <span class="kw">await</span> <span class="var">db</span>.<span class="fn">query</span>(<span class="str">'SELECT * FROM profiles WHERE id = ?'</span>, <span class="arg">userId</span>);
  <span class="kw">return</span> {
    <span class="var">name</span>: <span class="var">raw</span>.<span class="var">name</span>,
    <span class="var">score</span>: <span class="var">Math</span>.<span class="fn">round</span>(<span class="var">profile</span>.<span class="var">score</span>),
    <span class="var">data</span>: <span class="var">JSON</span>.<span class="fn">parse</span>(<span class="var">profile</span>.<span class="var">rawData</span>),
  };
}`}</code></pre>
      </div>

      <!-- Mock selection -->
      <div>
        <h4 class="mb-3 text-sm font-bold text-slate-700">Which dependencies should be mocked?</h4>
        <div class="space-y-2">
          {#each mockOptions as option, i}
            <button
              onclick={() => toggleMock(i)}
              class="flex w-full items-center gap-3 rounded-lg border-2 p-3 text-left transition-all
                {mockSubmitted
                  ? (option.selected === option.shouldMock ? 'border-green-400 bg-green-100' : 'border-red-400 bg-red-100')
                  : (option.selected ? 'border-green-500 bg-green-100' : 'border-green-200 bg-white')}
                {mockSubmitted ? 'cursor-default' : 'hover:shadow-md active:scale-[0.98] cursor-pointer'}"
            >
              <span class="flex h-6 w-6 items-center justify-center rounded border-2 text-sm font-bold
                {option.selected ? 'border-green-500 bg-green-500 text-white' : 'border-green-300 bg-white text-transparent'}">
                &#10003;
              </span>
              <div class="flex-1">
                <p class="font-semibold text-slate-800">{option.label}</p>
                <p class="font-mono text-xs text-slate-500">{option.code}</p>
              </div>
              {#if mockSubmitted}
                <span class="text-sm font-semibold {option.shouldMock ? 'text-green-700' : 'text-slate-500'}">
                  {option.shouldMock ? 'Should mock' : 'No mock needed'}
                </span>
              {/if}
            </button>
          {/each}
        </div>
      </div>

      {#if !mockSubmitted}
        <button
          onclick={submitMocks}
          class="rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95"
        >
          Check Selections
        </button>
      {/if}

      {#if mockSubmitted}
        <div class="space-y-3">
          <div class="rounded-xl border-2 {mockScore >= 4 ? 'border-green-400 bg-green-100' : 'border-yellow-400 bg-yellow-100'} p-4">
            <p class="font-bold {mockScore >= 4 ? 'text-green-700' : 'text-yellow-700'}">
              {mockScore} / {mockOptions.length} correct.
              {#if mockScore === mockOptions.length}
                Perfect! You correctly identified all external dependencies.
              {:else if mockScore >= 4}
                Almost! Remember: mock external I/O (network, database, logging) but not pure built-in functions.
              {:else}
                Tip: Mock things that do I/O (network calls, database queries, logging). Pure functions like Math.round and JSON.parse are safe to use directly.
              {/if}
            </p>
          </div>
          <h4 class="text-sm font-bold text-slate-700">Generated Test Code</h4>
          <pre class="code-block"><code>{@html generatedMockCode}</code></pre>
        </div>
      {/if}
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
      >
        I've explored mocking
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw) { color: #c084fc; } .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; } .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; } .code-block :global(.fn) { color: #93c5fd; }
  .code-block :global(.op) { color: #94a3b8; } .code-block :global(.arg) { color: #fdba74; }
</style>
