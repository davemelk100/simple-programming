<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Code: Unit Test Examples</h2>
    <p class="text-slate-600">Real test files using Vitest/Jest patterns. Study the <code class="rounded bg-slate-100 px-1 text-green-700">describe</code> / <code class="rounded bg-slate-100 px-1 text-green-700">it</code> / <code class="rounded bg-slate-100 px-1 text-green-700">expect</code> structure and how each test follows the AAA pattern.</p>
  </div>

  <!-- Testing add -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Testing a Math Function</h3>
    <p class="text-sm text-slate-600">The simplest unit tests: pass inputs, check outputs.</p>
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

  <!-- Testing capitalize -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Testing a String Function</h3>
    <p class="text-sm text-slate-600">Test normal cases, edge cases (single char, empty string), and special characters.</p>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">describe</span>, <span class="var">it</span>, <span class="var">expect</span> } <span class="kw">from</span> <span class="str">'vitest'</span>;
<span class="kw">import</span> { <span class="var">capitalize</span> } <span class="kw">from</span> <span class="str">'./strings'</span>;

<span class="fn">describe</span>(<span class="str">'capitalize'</span>, () => {
  <span class="fn">it</span>(<span class="str">'capitalizes the first letter'</span>, () => {
    <span class="fn">expect</span>(<span class="fn">capitalize</span>(<span class="str">'hello'</span>)).<span class="fn">toBe</span>(<span class="str">'Hello'</span>);
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

  <!-- Testing isEven -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Testing a Boolean Function</h3>
    <p class="text-sm text-slate-600">Boolean functions are great for unit tests: the result is always <code class="rounded bg-slate-100 px-1 text-green-700">true</code> or <code class="rounded bg-slate-100 px-1 text-green-700">false</code>.</p>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">describe</span>, <span class="var">it</span>, <span class="var">expect</span> } <span class="kw">from</span> <span class="str">'vitest'</span>;
<span class="kw">import</span> { <span class="var">isEven</span> } <span class="kw">from</span> <span class="str">'./math'</span>;

<span class="fn">describe</span>(<span class="str">'isEven'</span>, () => {
  <span class="fn">it</span>(<span class="str">'returns true for even numbers'</span>, () => {
    <span class="fn">expect</span>(<span class="fn">isEven</span>(<span class="num">4</span>)).<span class="fn">toBe</span>(<span class="kw">true</span>);
  });

  <span class="fn">it</span>(<span class="str">'returns false for odd numbers'</span>, () => {
    <span class="fn">expect</span>(<span class="fn">isEven</span>(<span class="num">7</span>)).<span class="fn">toBe</span>(<span class="kw">false</span>);
  });

  <span class="fn">it</span>(<span class="str">'returns true for zero'</span>, () => {
    <span class="fn">expect</span>(<span class="fn">isEven</span>(<span class="num">0</span>)).<span class="fn">toBe</span>(<span class="kw">true</span>);
  });

  <span class="fn">it</span>(<span class="str">'handles negative even numbers'</span>, () => {
    <span class="fn">expect</span>(<span class="fn">isEven</span>(<span class="num">-2</span>)).<span class="fn">toBe</span>(<span class="kw">true</span>);
  });
});`}</code></pre>
  </div>

  <!-- Testing error cases -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Testing Error Cases</h3>
    <p class="text-sm text-slate-600">Good tests verify that functions throw errors when given bad input.</p>
    <pre class="code-block"><code>{@html `<span class="fn">describe</span>(<span class="str">'divide'</span>, () => {
  <span class="fn">it</span>(<span class="str">'divides two numbers'</span>, () => {
    <span class="fn">expect</span>(<span class="fn">divide</span>(<span class="num">10</span>, <span class="num">2</span>)).<span class="fn">toBe</span>(<span class="num">5</span>);
  });

  <span class="fn">it</span>(<span class="str">'throws when dividing by zero'</span>, () => {
    <span class="fn">expect</span>(() => <span class="fn">divide</span>(<span class="num">10</span>, <span class="num">0</span>)).<span class="fn">toThrow</span>(<span class="str">'Cannot divide by zero'</span>);
  });
});`}</code></pre>
    <p class="text-sm text-slate-500">Notice the arrow function wrapper: <code class="rounded bg-slate-100 px-1 text-green-700">expect(() => ...)</code>. You need this so Vitest can catch the error instead of it crashing your test.</p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      I've studied the code examples
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Code: Advanced Unit Testing</h2>
      <p class="text-slate-600">Mocking, async testing, snapshots, parameterized tests, and coverage configuration.</p>
    </div>

    <!-- Mocking with vi.fn() -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Mocking with vi.fn()</h3>
      <p class="text-sm text-slate-600">Create mock functions that track calls and return controlled values.</p>
      <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">describe</span>, <span class="var">it</span>, <span class="var">expect</span>, <span class="var">vi</span> } <span class="kw">from</span> <span class="str">'vitest'</span>;
<span class="kw">import</span> { <span class="var">sendEmail</span> } <span class="kw">from</span> <span class="str">'./notifications'</span>;

<span class="fn">describe</span>(<span class="str">'sendEmail'</span>, () => {
  <span class="fn">it</span>(<span class="str">'calls the mailer with correct args'</span>, <span class="kw">async</span> () => {
    <span class="cmt">// Arrange: create a mock mailer</span>
    <span class="kw">const</span> <span class="var">mockMailer</span> = {
      <span class="fn">send</span>: <span class="var">vi</span>.<span class="fn">fn</span>().<span class="fn">mockResolvedValue</span>({ <span class="var">success</span>: <span class="kw">true</span> }),
    };

    <span class="cmt">// Act: call the function with our mock</span>
    <span class="kw">await</span> <span class="fn">sendEmail</span>(<span class="var">mockMailer</span>, <span class="str">'hi@test.com'</span>, <span class="str">'Hello!'</span>);

    <span class="cmt">// Assert: the mock was called correctly</span>
    <span class="fn">expect</span>(<span class="var">mockMailer</span>.<span class="var">send</span>).<span class="fn">toHaveBeenCalledOnce</span>();
    <span class="fn">expect</span>(<span class="var">mockMailer</span>.<span class="var">send</span>).<span class="fn">toHaveBeenCalledWith</span>({
      <span class="var">to</span>: <span class="str">'hi@test.com'</span>,
      <span class="var">body</span>: <span class="str">'Hello!'</span>,
    });
  });
});`}</code></pre>
    </div>

    <!-- Spying on existing functions -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Spying on Existing Functions</h3>
      <p class="text-sm text-slate-600">Spies let the real code run but record the calls for inspection.</p>
      <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">vi</span> } <span class="kw">from</span> <span class="str">'vitest'</span>;
<span class="kw">import</span> <span class="op">*</span> <span class="kw">as</span> <span class="var">analytics</span> <span class="kw">from</span> <span class="str">'./analytics'</span>;

<span class="fn">it</span>(<span class="str">'tracks page views'</span>, () => {
  <span class="kw">const</span> <span class="var">spy</span> = <span class="var">vi</span>.<span class="fn">spyOn</span>(<span class="var">analytics</span>, <span class="str">'track'</span>);

  <span class="fn">visitPage</span>(<span class="str">'/home'</span>);

  <span class="fn">expect</span>(<span class="var">spy</span>).<span class="fn">toHaveBeenCalledWith</span>(<span class="str">'pageview'</span>, { <span class="var">path</span>: <span class="str">'/home'</span> });
  <span class="var">spy</span>.<span class="fn">mockRestore</span>();
});`}</code></pre>
    </div>

    <!-- Testing async functions -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Testing Async Functions</h3>
      <p class="text-sm text-slate-600">Use <code class="rounded bg-slate-100 px-1 text-green-700">async/await</code> and mock resolved/rejected values.</p>
      <pre class="code-block"><code>{@html `<span class="fn">describe</span>(<span class="str">'fetchUser'</span>, () => {
  <span class="fn">it</span>(<span class="str">'returns user data on success'</span>, <span class="kw">async</span> () => {
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

    <!-- Snapshot tests -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Snapshot Tests</h3>
      <p class="text-sm text-slate-600">Capture a value and compare it against a stored snapshot. Great for detecting unexpected changes in complex objects or rendered output.</p>
      <pre class="code-block"><code>{@html `<span class="fn">it</span>(<span class="str">'matches the user profile snapshot'</span>, () => {
  <span class="kw">const</span> <span class="var">profile</span> = <span class="fn">formatProfile</span>({
    <span class="var">name</span>: <span class="str">'Alice'</span>,
    <span class="var">role</span>: <span class="str">'admin'</span>,
    <span class="var">joined</span>: <span class="str">'2024-01-15'</span>,
  });

  <span class="fn">expect</span>(<span class="var">profile</span>).<span class="fn">toMatchSnapshot</span>();
  <span class="cmt">// First run: saves the snapshot</span>
  <span class="cmt">// Later runs: compares against saved snapshot</span>
  <span class="cmt">// Run \`vitest -u\` to update snapshots</span>
});`}</code></pre>
    </div>

    <!-- Parameterized tests -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Parameterized Tests with it.each</h3>
      <p class="text-sm text-slate-600">Run the same test logic with different data sets to avoid repetition.</p>
      <pre class="code-block"><code>{@html `<span class="fn">describe</span>(<span class="str">'isValidEmail'</span>, () => {
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
    </div>

    <!-- Coverage config -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Coverage Configuration</h3>
      <p class="text-sm text-slate-600">Configure Vitest to collect coverage reports and enforce thresholds.</p>
      <pre class="code-block"><code>{@html `<span class="cmt">// vitest.config.ts</span>
<span class="kw">import</span> { <span class="var">defineConfig</span> } <span class="kw">from</span> <span class="str">'vitest/config'</span>;

<span class="kw">export default</span> <span class="fn">defineConfig</span>({
  <span class="var">test</span>: {
    <span class="var">coverage</span>: {
      <span class="var">provider</span>: <span class="str">'v8'</span>,
      <span class="var">reporter</span>: [<span class="str">'text'</span>, <span class="str">'html'</span>, <span class="str">'lcov'</span>],
      <span class="var">include</span>: [<span class="str">'src/**/*.ts'</span>],
      <span class="var">exclude</span>: [<span class="str">'src/**/*.test.ts'</span>, <span class="str">'src/**/*.d.ts'</span>],
      <span class="var">thresholds</span>: {
        <span class="var">lines</span>: <span class="num">80</span>,
        <span class="var">branches</span>: <span class="num">75</span>,
        <span class="var">functions</span>: <span class="num">80</span>,
        <span class="var">statements</span>: <span class="num">80</span>,
      },
    },
  },
});`}</code></pre>
      <p class="text-sm text-slate-500">Run <code class="rounded bg-slate-100 px-1 text-green-700">vitest --coverage</code> to generate reports. The <code class="rounded bg-slate-100 px-1 text-green-700">html</code> reporter creates a browsable coverage report you can open in your browser.</p>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
      >
        I've studied the advanced examples
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
