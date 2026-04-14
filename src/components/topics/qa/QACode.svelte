<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();
</script>

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">QA in Code</h2>
    <p class="text-sm text-slate-600">The bug tracker demo showed triage visually &mdash; here's how QA thinking translates into actual test code.</p>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual: Bug Severity</h3>
      <div class="flex flex-col gap-2 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm">
        <div class="flex items-center gap-2">
          <span class="rounded-full bg-red-200 px-2 py-0.5 text-xs font-bold text-red-700">critical</span>
          <span class="text-slate-700">App crashes on launch</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="rounded-full bg-orange-200 px-2 py-0.5 text-xs font-bold text-orange-700">major</span>
          <span class="text-slate-700">Search gives wrong results</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="rounded-full bg-yellow-200 px-2 py-0.5 text-xs font-bold text-yellow-700">minor</span>
          <span class="text-slate-700">Typo in footer text</span>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code: Testing Edge Cases</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">// QA mindset: test the edges!</span>
<span class="fn">describe</span>(<span class="str">"validateName"</span>, () => {
  <span class="fn">it</span>(<span class="str">"accepts normal input"</span>, () => {
    <span class="fn">expect</span>(<span class="fn">validate</span>(<span class="str">"Alice"</span>))
      .<span class="fn">toBe</span>(<span class="kw">true</span>);
  });
  <span class="fn">it</span>(<span class="str">"rejects empty string"</span>, () => {
    <span class="fn">expect</span>(<span class="fn">validate</span>(<span class="str">""</span>))
      .<span class="fn">toBe</span>(<span class="kw">false</span>);
  });
});`}</code></pre>
    </div>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Boundary value testing</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Test the boundaries of valid input</span>
<span class="fn">describe</span>(<span class="str">"setAge"</span>, () => {
  <span class="cmt">// Just below the minimum</span>
  <span class="fn">it</span>(<span class="str">"rejects -1"</span>, () => {
    <span class="fn">expect</span>(<span class="fn">setAge</span>(<span class="num">-1</span>)).<span class="fn">toThrow</span>();
  });

  <span class="cmt">// At the minimum boundary</span>
  <span class="fn">it</span>(<span class="str">"accepts 0"</span>, () => {
    <span class="fn">expect</span>(<span class="fn">setAge</span>(<span class="num">0</span>)).<span class="fn">toBe</span>(<span class="num">0</span>);
  });

  <span class="cmt">// At the maximum boundary</span>
  <span class="fn">it</span>(<span class="str">"accepts 120"</span>, () => {
    <span class="fn">expect</span>(<span class="fn">setAge</span>(<span class="num">120</span>)).<span class="fn">toBe</span>(<span class="num">120</span>);
  });

  <span class="cmt">// Just above the maximum</span>
  <span class="fn">it</span>(<span class="str">"rejects 121"</span>, () => {
    <span class="fn">expect</span>(<span class="fn">setAge</span>(<span class="num">121</span>)).<span class="fn">toThrow</span>();
  });
});`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Regression test</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// This test prevents bug #42 from coming back</span>
<span class="fn">it</span>(<span class="str">"handles special characters in search"</span>, () => {
  <span class="kw">const</span> <span class="var">results</span> = <span class="fn">search</span>(<span class="str">"hello & world"</span>);
  <span class="fn">expect</span>(<span class="var">results</span>).<span class="fn">not</span>.<span class="fn">toThrow</span>();
  <span class="fn">expect</span>(<span class="var">results</span>.<span class="var">length</span>)
    .<span class="fn">toBeGreaterThanOrEqual</span>(<span class="num">0</span>);
});`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-rose-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-rose-700 active:scale-95">
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
