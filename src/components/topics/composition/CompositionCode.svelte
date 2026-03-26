<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();
</script>

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Composition in Code</h2>
    <p class="text-sm text-slate-600">The pipeline visual shows output flowing from one function to the next &mdash; here's how that looks in code.</p>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual: Pipeline</h3>
      <div class="flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm">
        <span class="rounded bg-indigo-100 px-2 py-1 font-bold text-indigo-700">"hello"</span>
        <span class="text-indigo-400">→</span>
        <span class="rounded-lg border-2 border-indigo-400 px-2 py-1 text-xs font-bold text-indigo-700">uppercase</span>
        <span class="text-indigo-400">→</span>
        <span class="rounded-lg border-2 border-indigo-400 px-2 py-1 text-xs font-bold text-indigo-700">add "!"</span>
        <span class="text-indigo-400">→</span>
        <span class="rounded bg-green-100 px-2 py-1 font-bold text-green-700">"HELLO!"</span>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code: Chaining Functions</h3>
      <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">uppercase</span>(<span class="arg">str</span>) {
  <span class="kw">return</span> <span class="arg">str</span>.<span class="fn">toUpperCase</span>();
}
<span class="kw">function</span> <span class="fn">addBang</span>(<span class="arg">str</span>) {
  <span class="kw">return</span> <span class="arg">str</span> + <span class="str">"!"</span>;
}`}</code></pre>
    </div>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Composing the pipeline</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Step by step (like the visual)</span>
<span class="kw">let</span> <span class="var">step1</span> = <span class="str">"hello"</span>;
<span class="kw">let</span> <span class="var">step2</span> = <span class="fn">uppercase</span>(<span class="var">step1</span>);  <span class="cmt">// "HELLO"</span>
<span class="kw">let</span> <span class="var">step3</span> = <span class="fn">addBang</span>(<span class="var">step2</span>);    <span class="cmt">// "HELLO!"</span>

<span class="cmt">// Or compose in one line</span>
<span class="kw">let</span> <span class="var">result</span> = <span class="fn">addBang</span>(<span class="fn">uppercase</span>(<span class="str">"hello"</span>));
<span class="cmt">// output of uppercase → input of addBang</span>`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Array method chaining</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Composition with arrays — same idea!</span>
<span class="kw">let</span> <span class="var">result</span> = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>]
  .<span class="fn">filter</span>(<span class="arg">n</span> => <span class="arg">n</span> > <span class="num">2</span>)      <span class="cmt">// [3, 4, 5]</span>
  .<span class="fn">map</span>(<span class="arg">n</span> => <span class="arg">n</span> * <span class="num">10</span>);       <span class="cmt">// [30, 40, 50]</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

<style>
  .code-block {
    background-color: #0f172a;
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
