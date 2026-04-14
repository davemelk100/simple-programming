<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();
</script>

{#if !advanced}
<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Code: Unit Test Examples</h2>
    <p class="text-sm text-slate-600">Real test files using Vitest/Jest syntax. Study the <code class="rounded bg-slate-100 px-1 text-sm text-green-700">describe</code> / <code class="rounded bg-slate-100 px-1 text-sm text-green-700">it</code> / <code class="rounded bg-slate-100 px-1 text-sm text-green-700">expect</code> structure.</p>
  </div>

  <!-- describe / it / expect pattern -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">The describe / it / expect Pattern</p>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">describe</span>, <span class="var">it</span>, <span class="var">expect</span> } <span class="kw">from</span> <span class="str">'vitest'</span>;
<span class="kw">import</span> { <span class="var">add</span> } <span class="kw">from</span> <span class="str">'./math'</span>;

<span class="fn">describe</span>(<span class="str">'add'</span>, () => {
  <span class="fn">it</span>(<span class="str">'adds two positive numbers'</span>, () => {
    <span class="fn">expect</span>(<span class="fn">add</span>(<span class="num">2</span>, <span class="num">3</span>)).<span class="fn">toBe</span>(<span class="num">5</span>);
  });

  <span class="fn">it</span>(<span class="str">'handles negative numbers'</span>, () => {
    <span class="fn">expect</span>(<span class="fn">add</span>(<span class="num">-1</span>, <span class="num">-2</span>)).<span class="fn">toBe</span>(<span class="num">-3</span>);
  });

  <span class="fn">it</span>(<span class="str">'returns zero when both are zero'</span>, () => {
    <span class="fn">expect</span>(<span class="fn">add</span>(<span class="num">0</span>, <span class="num">0</span>)).<span class="fn">toBe</span>(<span class="num">0</span>);
  });
});`}</code></pre>
  </div>

  <!-- Testing a pure function -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Testing a Pure Function</p>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">describe</span>, <span class="var">it</span>, <span class="var">expect</span> } <span class="kw">from</span> <span class="str">'vitest'</span>;
<span class="kw">import</span> { <span class="var">capitalize</span> } <span class="kw">from</span> <span class="str">'./strings'</span>;

<span class="fn">describe</span>(<span class="str">'capitalize'</span>, () => {
  <span class="fn">it</span>(<span class="str">'capitalizes the first letter'</span>, () => {
    <span class="cmt">// Arrange</span>
    <span class="kw">const</span> <span class="var">input</span> = <span class="str">'hello'</span>;

    <span class="cmt">// Act</span>
    <span class="kw">const</span> <span class="var">result</span> = <span class="fn">capitalize</span>(<span class="var">input</span>);

    <span class="cmt">// Assert</span>
    <span class="fn">expect</span>(<span class="var">result</span>).<span class="fn">toBe</span>(<span class="str">'Hello'</span>);
  });

  <span class="fn">it</span>(<span class="str">'handles a single character'</span>, () => {
    <span class="fn">expect</span>(<span class="fn">capitalize</span>(<span class="str">'a'</span>)).<span class="fn">toBe</span>(<span class="str">'A'</span>);
  });

  <span class="fn">it</span>(<span class="str">'returns empty string for empty input'</span>, () => {
    <span class="fn">expect</span>(<span class="fn">capitalize</span>(<span class="str">''</span>)).<span class="fn">toBe</span>(<span class="str">''</span>);
  });

  <span class="fn">it</span>(<span class="str">'does not change already capitalized strings'</span>, () => {
    <span class="fn">expect</span>(<span class="fn">capitalize</span>(<span class="str">'Hello'</span>)).<span class="fn">toBe</span>(<span class="str">'Hello'</span>);
  });
});`}</code></pre>
  </div>

  <!-- Testing for errors -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Testing for Errors</p>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">describe</span>, <span class="var">it</span>, <span class="var">expect</span> } <span class="kw">from</span> <span class="str">'vitest'</span>;
<span class="kw">import</span> { <span class="var">divide</span> } <span class="kw">from</span> <span class="str">'./math'</span>;

<span class="fn">describe</span>(<span class="str">'divide'</span>, () => {
  <span class="fn">it</span>(<span class="str">'divides two numbers'</span>, () => {
    <span class="fn">expect</span>(<span class="fn">divide</span>(<span class="num">10</span>, <span class="num">2</span>)).<span class="fn">toBe</span>(<span class="num">5</span>);
  });

  <span class="fn">it</span>(<span class="str">'throws when dividing by zero'</span>, () => {
    <span class="cmt">// Wrap in arrow function so expect can catch the error</span>
    <span class="fn">expect</span>(() => <span class="fn">divide</span>(<span class="num">10</span>, <span class="num">0</span>)).<span class="fn">toThrow</span>(<span class="str">'Cannot divide by zero'</span>);
  });

  <span class="fn">it</span>(<span class="str">'returns a decimal result'</span>, () => {
    <span class="fn">expect</span>(<span class="fn">divide</span>(<span class="num">7</span>, <span class="num">2</span>)).<span class="fn">toBe</span>(<span class="num">3.5</span>);
  });
});`}</code></pre>
    <p class="mt-2 text-sm text-slate-500">Notice the arrow function wrapper: <code class="rounded bg-slate-100 px-1 text-sm text-green-700">expect(() => ...)</code>. You need this so the test runner can catch the error instead of it crashing your test.</p>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Code: Advanced Unit Testing</h2>
    <p class="text-sm text-slate-600">Mocking modules, async testing, parameterized tests, and setup/teardown patterns.</p>
  </div>

  <!-- Mocking modules -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Mocking Modules</p>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">describe</span>, <span class="var">it</span>, <span class="var">expect</span>, <span class="var">vi</span> } <span class="kw">from</span> <span class="str">'vitest'</span>;
<span class="kw">import</span> { <span class="var">sendEmail</span> } <span class="kw">from</span> <span class="str">'./notifications'</span>;

<span class="cmt">// Mock the entire mailer module</span>
<span class="var">vi</span>.<span class="fn">mock</span>(<span class="str">'./mailer'</span>, () => ({
  <span class="fn">send</span>: <span class="var">vi</span>.<span class="fn">fn</span>().<span class="fn">mockResolvedValue</span>({ <span class="var">success</span>: <span class="kw">true</span> }),
}));

<span class="fn">describe</span>(<span class="str">'sendEmail'</span>, () => {
  <span class="fn">it</span>(<span class="str">'calls mailer.send with correct args'</span>, <span class="kw">async</span> () => {
    <span class="cmt">// Arrange</span>
    <span class="kw">const</span> <span class="var">mockMailer</span> = {
      <span class="fn">send</span>: <span class="var">vi</span>.<span class="fn">fn</span>().<span class="fn">mockResolvedValue</span>({ <span class="var">success</span>: <span class="kw">true</span> }),
    };

    <span class="cmt">// Act</span>
    <span class="kw">await</span> <span class="fn">sendEmail</span>(<span class="var">mockMailer</span>, <span class="str">'hi@test.com'</span>, <span class="str">'Hello!'</span>);

    <span class="cmt">// Assert</span>
    <span class="fn">expect</span>(<span class="var">mockMailer</span>.<span class="var">send</span>).<span class="fn">toHaveBeenCalledOnce</span>();
    <span class="fn">expect</span>(<span class="var">mockMailer</span>.<span class="var">send</span>).<span class="fn">toHaveBeenCalledWith</span>({
      <span class="var">to</span>: <span class="str">'hi@test.com'</span>,
      <span class="var">body</span>: <span class="str">'Hello!'</span>,
    });
  });
});`}</code></pre>
  </div>

  <!-- Testing async functions -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Testing Async Functions</p>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">describe</span>, <span class="var">it</span>, <span class="var">expect</span>, <span class="var">vi</span> } <span class="kw">from</span> <span class="str">'vitest'</span>;

<span class="fn">describe</span>(<span class="str">'fetchUser'</span>, () => {
  <span class="fn">it</span>(<span class="str">'returns user data on success'</span>, <span class="kw">async</span> () => {
    <span class="cmt">// Mock the global fetch</span>
    <span class="var">vi</span>.<span class="fn">spyOn</span>(<span class="var">global</span>, <span class="str">'fetch'</span>).<span class="fn">mockResolvedValue</span>({
      <span class="var">ok</span>: <span class="kw">true</span>,
      <span class="fn">json</span>: () => <span class="var">Promise</span>.<span class="fn">resolve</span>({ <span class="var">name</span>: <span class="str">'Alice'</span> }),
    });

    <span class="kw">const</span> <span class="var">user</span> = <span class="kw">await</span> <span class="fn">fetchUser</span>(<span class="num">1</span>);
    <span class="fn">expect</span>(<span class="var">user</span>.<span class="var">name</span>).<span class="fn">toBe</span>(<span class="str">'Alice'</span>);
  });

  <span class="fn">it</span>(<span class="str">'throws on network error'</span>, <span class="kw">async</span> () => {
    <span class="var">vi</span>.<span class="fn">spyOn</span>(<span class="var">global</span>, <span class="str">'fetch'</span>).<span class="fn">mockRejectedValue</span>(
      <span class="kw">new</span> <span class="fn">Error</span>(<span class="str">'Network failure'</span>)
    );

    <span class="kw">await</span> <span class="fn">expect</span>(<span class="fn">fetchUser</span>(<span class="num">1</span>)).<span class="var">rejects</span>.<span class="fn">toThrow</span>(<span class="str">'Network failure'</span>);
  });
});`}</code></pre>
  </div>

  <!-- Parameterized tests -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Parameterized Tests (test.each)</p>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">describe</span>, <span class="var">it</span>, <span class="var">expect</span> } <span class="kw">from</span> <span class="str">'vitest'</span>;
<span class="kw">import</span> { <span class="var">isValidEmail</span> } <span class="kw">from</span> <span class="str">'./validation'</span>;

<span class="fn">describe</span>(<span class="str">'isValidEmail'</span>, () => {
  <span class="cmt">// Run the same test with many different inputs</span>
  <span class="fn">it</span>.<span class="fn">each</span>([
    { <span class="var">input</span>: <span class="str">'alice@test.com'</span>,  <span class="var">expected</span>: <span class="kw">true</span> },
    { <span class="var">input</span>: <span class="str">'bob@company.co'</span>,  <span class="var">expected</span>: <span class="kw">true</span> },
    { <span class="var">input</span>: <span class="str">'not-an-email'</span>,    <span class="var">expected</span>: <span class="kw">false</span> },
    { <span class="var">input</span>: <span class="str">'@no-user.com'</span>,    <span class="var">expected</span>: <span class="kw">false</span> },
    { <span class="var">input</span>: <span class="str">''</span>,                <span class="var">expected</span>: <span class="kw">false</span> },
  ])(<span class="str">'isValidEmail("$input") -> $expected'</span>, ({ <span class="arg">input</span>, <span class="arg">expected</span> }) => {
    <span class="fn">expect</span>(<span class="fn">isValidEmail</span>(<span class="arg">input</span>)).<span class="fn">toBe</span>(<span class="arg">expected</span>);
  });
});`}</code></pre>
    <p class="mt-2 text-sm text-slate-500"><code class="rounded bg-slate-100 px-1 text-sm text-green-700">it.each</code> eliminates repetitive test cases. Each entry in the array becomes its own test with a descriptive name.</p>
  </div>

  <!-- Setup and teardown -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Setup / Teardown (beforeEach / afterEach)</p>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">describe</span>, <span class="var">it</span>, <span class="var">expect</span>, <span class="var">vi</span>, <span class="var">beforeEach</span>, <span class="var">afterEach</span> } <span class="kw">from</span> <span class="str">'vitest'</span>;
<span class="kw">import</span> { <span class="var">createCart</span> } <span class="kw">from</span> <span class="str">'./cart'</span>;

<span class="fn">describe</span>(<span class="str">'ShoppingCart'</span>, () => {
  <span class="kw">let</span> <span class="var">cart</span>;

  <span class="cmt">// Runs before EACH test -- fresh cart every time</span>
  <span class="fn">beforeEach</span>(() => {
    <span class="var">cart</span> = <span class="fn">createCart</span>();
    <span class="var">vi</span>.<span class="fn">useFakeTimers</span>();  <span class="cmt">// control Date.now()</span>
  });

  <span class="cmt">// Runs after EACH test -- clean up side effects</span>
  <span class="fn">afterEach</span>(() => {
    <span class="var">vi</span>.<span class="fn">useRealTimers</span>();
    <span class="var">vi</span>.<span class="fn">restoreAllMocks</span>();
  });

  <span class="fn">it</span>(<span class="str">'starts empty'</span>, () => {
    <span class="fn">expect</span>(<span class="var">cart</span>.<span class="fn">getItems</span>()).<span class="fn">toEqual</span>([]);
    <span class="fn">expect</span>(<span class="var">cart</span>.<span class="fn">getTotal</span>()).<span class="fn">toBe</span>(<span class="num">0</span>);
  });

  <span class="fn">it</span>(<span class="str">'adds items and calculates total'</span>, () => {
    <span class="var">cart</span>.<span class="fn">addItem</span>({ <span class="var">name</span>: <span class="str">'Widget'</span>, <span class="var">price</span>: <span class="num">9.99</span> });
    <span class="var">cart</span>.<span class="fn">addItem</span>({ <span class="var">name</span>: <span class="str">'Gadget'</span>, <span class="var">price</span>: <span class="num">24.99</span> });

    <span class="fn">expect</span>(<span class="var">cart</span>.<span class="fn">getItems</span>()).<span class="fn">toHaveLength</span>(<span class="num">2</span>);
    <span class="fn">expect</span>(<span class="var">cart</span>.<span class="fn">getTotal</span>()).<span class="fn">toBe</span>(<span class="num">34.98</span>);
  });

  <span class="fn">it</span>(<span class="str">'removes an item'</span>, () => {
    <span class="var">cart</span>.<span class="fn">addItem</span>({ <span class="var">name</span>: <span class="str">'Widget'</span>, <span class="var">price</span>: <span class="num">9.99</span> });
    <span class="var">cart</span>.<span class="fn">removeItem</span>(<span class="str">'Widget'</span>);

    <span class="fn">expect</span>(<span class="var">cart</span>.<span class="fn">getItems</span>()).<span class="fn">toEqual</span>([]);
  });
});`}</code></pre>
    <p class="mt-2 text-sm text-slate-500"><code class="rounded bg-slate-100 px-1 text-sm text-green-700">beforeEach</code> creates a clean slate for every test. <code class="rounded bg-slate-100 px-1 text-sm text-green-700">afterEach</code> cleans up so tests do not affect each other. This prevents flaky tests caused by shared state.</p>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      Got it
    </button>
  </div>
</div>
{/if}

<style>
  .code-block {
    background-color: #0f172a;
    color: #e2e8f0;
    border: 1px solid #334155;
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    font-size: 0.875rem;
    line-height: 1.7;
    overflow-x: auto;
  }
  .code-block :global(.cmd) { color: #86efac; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.out) { color: #94a3b8; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
