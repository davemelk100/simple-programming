<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  interface Props {
    oncomplete?: () => void;
  }
  let { oncomplete }: Props = $props();
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Testing in Code</h2>
    <p class="text-slate-600">Here is how real tests look. Each function is paired with its test using the <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">describe</code> / <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">it</code> / <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">expect</code> pattern used by Vitest and Jest.</p>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">The Pattern</h3>
    <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><code class="rounded bg-slate-100 px-1 text-sm text-purple-700">describe("name", ...)</code> groups related tests together under a label.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><code class="rounded bg-slate-100 px-1 text-sm text-purple-700">it("does something", ...)</code> defines a single test case with a human-readable description.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><code class="rounded bg-slate-100 px-1 text-sm text-purple-700">expect(value).toBe(expected)</code> is the assertion — the actual check.</span>
        </li>
      </ul>
    </div>
  </div>

  <!-- add function -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Example 1: add</h3>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <p class="mb-2 text-sm font-semibold text-slate-500">Function</p>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">add</span>(<span class="arg">a</span>, <span class="arg">b</span>) {
  <span class="kw">return</span> <span class="var">a</span> <span class="op">+</span> <span class="var">b</span>;
}`}</code></pre>
      </div>
      <div>
        <p class="mb-2 text-sm font-semibold text-slate-500">Test</p>
        <pre class="code-block"><code>{@html `<span class="fn">describe</span>(<span class="str">"add"</span>, () <span class="op">=></span> {
  <span class="fn">it</span>(<span class="str">"adds two positive numbers"</span>, () <span class="op">=></span> {
    <span class="fn">expect</span>(<span class="fn">add</span>(<span class="num">2</span>, <span class="num">3</span>)).<span class="fn">toBe</span>(<span class="num">5</span>);
  });

  <span class="fn">it</span>(<span class="str">"handles zero"</span>, () <span class="op">=></span> {
    <span class="fn">expect</span>(<span class="fn">add</span>(<span class="num">0</span>, <span class="num">7</span>)).<span class="fn">toBe</span>(<span class="num">7</span>);
  });

  <span class="fn">it</span>(<span class="str">"adds negative numbers"</span>, () <span class="op">=></span> {
    <span class="fn">expect</span>(<span class="fn">add</span>(<span class="op">-</span><span class="num">1</span>, <span class="op">-</span><span class="num">2</span>)).<span class="fn">toBe</span>(<span class="op">-</span><span class="num">3</span>);
  });
});`}</code></pre>
      </div>
    </div>
  </div>

  <!-- isEven function -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Example 2: isEven</h3>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <p class="mb-2 text-sm font-semibold text-slate-500">Function</p>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">isEven</span>(<span class="arg">n</span>) {
  <span class="kw">return</span> <span class="var">n</span> <span class="op">%</span> <span class="num">2</span> <span class="op">===</span> <span class="num">0</span>;
}`}</code></pre>
      </div>
      <div>
        <p class="mb-2 text-sm font-semibold text-slate-500">Test</p>
        <pre class="code-block"><code>{@html `<span class="fn">describe</span>(<span class="str">"isEven"</span>, () <span class="op">=></span> {
  <span class="fn">it</span>(<span class="str">"returns true for even numbers"</span>, () <span class="op">=></span> {
    <span class="fn">expect</span>(<span class="fn">isEven</span>(<span class="num">4</span>)).<span class="fn">toBe</span>(<span class="kw">true</span>);
    <span class="fn">expect</span>(<span class="fn">isEven</span>(<span class="num">0</span>)).<span class="fn">toBe</span>(<span class="kw">true</span>);
  });

  <span class="fn">it</span>(<span class="str">"returns false for odd numbers"</span>, () <span class="op">=></span> {
    <span class="fn">expect</span>(<span class="fn">isEven</span>(<span class="num">3</span>)).<span class="fn">toBe</span>(<span class="kw">false</span>);
    <span class="fn">expect</span>(<span class="fn">isEven</span>(<span class="num">7</span>)).<span class="fn">toBe</span>(<span class="kw">false</span>);
  });
});`}</code></pre>
      </div>
    </div>
  </div>

  <!-- greet function -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Example 3: greet</h3>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <p class="mb-2 text-sm font-semibold text-slate-500">Function</p>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">greet</span>(<span class="arg">name</span>) {
  <span class="kw">return</span> <span class="str">"Hello, "</span> <span class="op">+</span> <span class="var">name</span> <span class="op">+</span> <span class="str">"!"</span>;
}`}</code></pre>
      </div>
      <div>
        <p class="mb-2 text-sm font-semibold text-slate-500">Test</p>
        <pre class="code-block"><code>{@html `<span class="fn">describe</span>(<span class="str">"greet"</span>, () <span class="op">=></span> {
  <span class="fn">it</span>(<span class="str">"greets by name"</span>, () <span class="op">=></span> {
    <span class="fn">expect</span>(<span class="fn">greet</span>(<span class="str">"Alice"</span>)).<span class="fn">toBe</span>(<span class="str">"Hello, Alice!"</span>);
  });

  <span class="fn">it</span>(<span class="str">"works with any name"</span>, () <span class="op">=></span> {
    <span class="fn">expect</span>(<span class="fn">greet</span>(<span class="str">"Bob"</span>)).<span class="fn">toBe</span>(<span class="str">"Hello, Bob!"</span>);
  });
});`}</code></pre>
      </div>
    </div>
  </div>

  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h4 class="mb-2 font-bold text-slate-800">Reading Test Output</h4>
    <p class="text-sm text-slate-600 mb-3">When you run tests, you'll see output like this:</p>
    <pre class="code-block"><code>{@html `<span class="str"> ✓</span> add <span class="op">&gt;</span> adds two positive numbers
<span class="str"> ✓</span> add <span class="op">&gt;</span> handles zero
<span class="str"> ✓</span> add <span class="op">&gt;</span> adds negative numbers
<span class="str"> ✓</span> isEven <span class="op">&gt;</span> returns true for even numbers
<span class="str"> ✓</span> isEven <span class="op">&gt;</span> returns false for odd numbers
<span class="str"> ✓</span> greet <span class="op">&gt;</span> greets by name
<span class="str"> ✓</span> greet <span class="op">&gt;</span> works with any name

<span class="cmt">Tests:  7 passed, 0 failed</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Testing Patterns (Advanced)</h2>
    <p class="text-slate-600">Professional testing patterns you'll encounter in real codebases.</p>
  </div>

  <!-- Mocking dependencies -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Unit Test with Mocking</h3>
    <p class="text-sm text-slate-600">Replace external dependencies with controlled fakes so your test only checks <em>your</em> logic.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// The function under test</span>
<span class="kw">async function</span> <span class="fn">getUsername</span>(<span class="arg">userId</span>, <span class="arg">db</span>) {
  <span class="kw">const</span> <span class="var">user</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">db</span>.<span class="fn">findById</span>(<span class="var">userId</span>);
  <span class="kw">return</span> <span class="var">user</span>.<span class="var">name</span>;
}

<span class="cmt">// The test — mock the database</span>
<span class="fn">describe</span>(<span class="str">"getUsername"</span>, () <span class="op">=></span> {
  <span class="fn">it</span>(<span class="str">"returns the user's name"</span>, <span class="kw">async</span> () <span class="op">=></span> {
    <span class="kw">const</span> <span class="var">mockDb</span> <span class="op">=</span> {
      <span class="fn">findById</span>: <span class="var">vi</span>.<span class="fn">fn</span>().<span class="fn">mockResolvedValue</span>({ <span class="var">name</span>: <span class="str">"Alice"</span> })
    };

    <span class="kw">const</span> <span class="var">result</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">getUsername</span>(<span class="num">1</span>, <span class="var">mockDb</span>);

    <span class="fn">expect</span>(<span class="var">result</span>).<span class="fn">toBe</span>(<span class="str">"Alice"</span>);
    <span class="fn">expect</span>(<span class="var">mockDb</span>.<span class="var">findById</span>).<span class="fn">toHaveBeenCalledWith</span>(<span class="num">1</span>);
  });
});`}</code></pre>
  </div>

  <!-- Parameterized tests -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Parameterized Tests</h3>
    <p class="text-sm text-slate-600">Run the same test logic with many different inputs using <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">it.each</code>.</p>
    <pre class="code-block"><code>{@html `<span class="fn">describe</span>(<span class="str">"isEven"</span>, () <span class="op">=></span> {
  <span class="fn">it</span>.<span class="fn">each</span>([
    [<span class="num">2</span>, <span class="kw">true</span>],
    [<span class="num">3</span>, <span class="kw">false</span>],
    [<span class="num">0</span>, <span class="kw">true</span>],
    [<span class="op">-</span><span class="num">4</span>, <span class="kw">true</span>],
    [<span class="op">-</span><span class="num">7</span>, <span class="kw">false</span>],
  ])(<span class="str">"isEven(%i) returns %s"</span>, (<span class="arg">input</span>, <span class="arg">expected</span>) <span class="op">=></span> {
    <span class="fn">expect</span>(<span class="fn">isEven</span>(<span class="var">input</span>)).<span class="fn">toBe</span>(<span class="var">expected</span>);
  });
});`}</code></pre>
  </div>

  <!-- Testing async code -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Testing Async Code</h3>
    <p class="text-sm text-slate-600">Use <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">async/await</code> or <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">.resolves</code> / <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">.rejects</code> matchers for promises.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Async function</span>
<span class="kw">async function</span> <span class="fn">fetchData</span>(<span class="arg">url</span>) {
  <span class="kw">const</span> <span class="var">res</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">fetch</span>(<span class="var">url</span>);
  <span class="kw">if</span> (<span class="op">!</span><span class="var">res</span>.<span class="var">ok</span>) <span class="kw">throw new</span> <span class="fn">Error</span>(<span class="str">"Failed"</span>);
  <span class="kw">return</span> <span class="var">res</span>.<span class="fn">json</span>();
}

<span class="cmt">// Test with async/await</span>
<span class="fn">it</span>(<span class="str">"fetches data successfully"</span>, <span class="kw">async</span> () <span class="op">=></span> {
  <span class="var">global</span>.<span class="var">fetch</span> <span class="op">=</span> <span class="var">vi</span>.<span class="fn">fn</span>().<span class="fn">mockResolvedValue</span>({
    <span class="var">ok</span>: <span class="kw">true</span>,
    <span class="fn">json</span>: () <span class="op">=></span> <span class="fn">Promise</span>.<span class="fn">resolve</span>({ <span class="var">id</span>: <span class="num">1</span> })
  });

  <span class="kw">const</span> <span class="var">data</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">fetchData</span>(<span class="str">"/api/item"</span>);
  <span class="fn">expect</span>(<span class="var">data</span>).<span class="fn">toEqual</span>({ <span class="var">id</span>: <span class="num">1</span> });
});

<span class="cmt">// Test error case</span>
<span class="fn">it</span>(<span class="str">"throws on failure"</span>, <span class="kw">async</span> () <span class="op">=></span> {
  <span class="var">global</span>.<span class="var">fetch</span> <span class="op">=</span> <span class="var">vi</span>.<span class="fn">fn</span>().<span class="fn">mockResolvedValue</span>({ <span class="var">ok</span>: <span class="kw">false</span> });

  <span class="kw">await</span> <span class="fn">expect</span>(<span class="fn">fetchData</span>(<span class="str">"/bad"</span>)).<span class="var">rejects</span>.<span class="fn">toThrow</span>(<span class="str">"Failed"</span>);
});`}</code></pre>
  </div>

  <!-- Testing error cases -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Testing Error Cases</h3>
    <p class="text-sm text-slate-600">Verify that functions throw the right errors for invalid input.</p>
    <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">divide</span>(<span class="arg">a</span>, <span class="arg">b</span>) {
  <span class="kw">if</span> (<span class="var">b</span> <span class="op">===</span> <span class="num">0</span>) <span class="kw">throw new</span> <span class="fn">Error</span>(<span class="str">"Cannot divide by zero"</span>);
  <span class="kw">return</span> <span class="var">a</span> <span class="op">/</span> <span class="var">b</span>;
}

<span class="fn">describe</span>(<span class="str">"divide"</span>, () <span class="op">=></span> {
  <span class="fn">it</span>(<span class="str">"divides two numbers"</span>, () <span class="op">=></span> {
    <span class="fn">expect</span>(<span class="fn">divide</span>(<span class="num">10</span>, <span class="num">2</span>)).<span class="fn">toBe</span>(<span class="num">5</span>);
  });

  <span class="fn">it</span>(<span class="str">"throws on division by zero"</span>, () <span class="op">=></span> {
    <span class="fn">expect</span>(() <span class="op">=></span> <span class="fn">divide</span>(<span class="num">10</span>, <span class="num">0</span>)).<span class="fn">toThrow</span>(<span class="str">"Cannot divide by zero"</span>);
  });
});`}</code></pre>
  </div>

  <!-- Snapshot testing -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Snapshot Testing</h3>
    <p class="text-sm text-slate-600">Capture a "snapshot" of output and compare against it in future runs. Great for UI components and complex objects.</p>
    <pre class="code-block"><code>{@html `<span class="fn">it</span>(<span class="str">"matches the user card snapshot"</span>, () <span class="op">=></span> {
  <span class="kw">const</span> <span class="var">card</span> <span class="op">=</span> <span class="fn">renderUserCard</span>({
    <span class="var">name</span>: <span class="str">"Alice"</span>,
    <span class="var">role</span>: <span class="str">"Admin"</span>
  });

  <span class="fn">expect</span>(<span class="var">card</span>).<span class="fn">toMatchSnapshot</span>();
  <span class="cmt">// First run: saves the snapshot to a file</span>
  <span class="cmt">// Later runs: compares output against saved snapshot</span>
  <span class="cmt">// If it changed, the test fails — you decide if</span>
  <span class="cmt">// the change was intentional or a bug</span>
});`}</code></pre>
  </div>

  <!-- Coverage -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Coverage Reports</h3>
    <p class="text-sm text-slate-600">Run tests with coverage to see which lines are tested and which are not.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Run with coverage</span>
<span class="var">npx</span> vitest <span class="op">--</span>coverage

<span class="cmt"># Output:</span>
<span class="cmt">----------|---------|----------|---------|---------|</span>
<span class="cmt">File      | % Stmts | % Branch | % Funcs | % Lines |</span>
<span class="cmt">----------|---------|----------|---------|---------|</span>
<span class="cmt">math.ts   |   100   |    75    |   100   |   100   |</span>
<span class="cmt">user.ts   |    80   |    60    |    90   |    85   |</span>
<span class="cmt">----------|---------|----------|---------|---------|</span>`}</code></pre>
    <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
      <p class="text-sm text-slate-600">
        <strong>Remember:</strong> 100% coverage does not mean bug-free. Coverage measures that code was <em>executed</em>, not that it was <em>correctly verified</em>. A test with no assertions gets coverage but catches nothing.
      </p>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
      Got it
    </button>
  </div>
</div>
{/if}

<style>
  .code-block { background-color: #0f172a;
    color: #e2e8f0; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
