<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();
</script>

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Testing in Code</h2>
    <p class="text-sm text-slate-600">The test runner demo showed tests passing and failing visually &mdash; here's how you write those tests in real code.</p>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual: Test Runner</h3>
      <div class="flex flex-col gap-2 rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm">
        <div class="flex items-center gap-2">
          <span class="text-green-600">&#10003;</span>
          <span class="font-mono text-slate-700">uppercase("hello") &rarr; "HELLO"</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-green-600">&#10003;</span>
          <span class="font-mono text-slate-700">reverse("abc") &rarr; "cba"</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-green-600">&#10003;</span>
          <span class="font-mono text-slate-700">firstChar("world") &rarr; "w"</span>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code: Writing Tests</h3>
      <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">add</span>(<span class="arg">a</span>, <span class="arg">b</span>) {
  <span class="kw">return</span> <span class="arg">a</span> + <span class="arg">b</span>;
}

<span class="cmt">// Test it!</span>
<span class="fn">expect</span>(<span class="fn">add</span>(<span class="num">2</span>, <span class="num">3</span>)).<span class="fn">toBe</span>(<span class="num">5</span>);`}</code></pre>
    </div>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">A complete test</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// describe groups related tests</span>
<span class="fn">describe</span>(<span class="str">"add"</span>, () => {
  <span class="cmt">// each "it" is one test case</span>
  <span class="fn">it</span>(<span class="str">"adds positive numbers"</span>, () => {
    <span class="fn">expect</span>(<span class="fn">add</span>(<span class="num">2</span>, <span class="num">3</span>)).<span class="fn">toBe</span>(<span class="num">5</span>);
  });

  <span class="fn">it</span>(<span class="str">"adds negative numbers"</span>, () => {
    <span class="fn">expect</span>(<span class="fn">add</span>(<span class="num">-1</span>, <span class="num">-2</span>)).<span class="fn">toBe</span>(<span class="num">-3</span>);
  });

  <span class="fn">it</span>(<span class="str">"adds zero"</span>, () => {
    <span class="fn">expect</span>(<span class="fn">add</span>(<span class="num">5</span>, <span class="num">0</span>)).<span class="fn">toBe</span>(<span class="num">5</span>);
  });
});`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Arrange &ndash; Act &ndash; Assert</p>
    <pre class="code-block"><code>{@html `<span class="fn">it</span>(<span class="str">"removes an item from the cart"</span>, () => {
  <span class="cmt">// Arrange: set things up</span>
  <span class="kw">const</span> <span class="var">cart</span> = <span class="kw">new</span> <span class="fn">Cart</span>();
  <span class="var">cart</span>.<span class="fn">add</span>(<span class="str">"apple"</span>);

  <span class="cmt">// Act: do the thing</span>
  <span class="var">cart</span>.<span class="fn">remove</span>(<span class="str">"apple"</span>);

  <span class="cmt">// Assert: check the result</span>
  <span class="fn">expect</span>(<span class="var">cart</span>.<span class="var">items</span>.<span class="var">length</span>).<span class="fn">toBe</span>(<span class="num">0</span>);
});`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-teal-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-teal-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

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
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
