<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();
</script>

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Functions in Code</h2>
    <p class="text-sm text-slate-600">Each "machine" from the visual is a function. Input goes in, output comes out.</p>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual</h3>
      <div class="flex items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 p-4">
        <span class="rounded bg-purple-100 px-3 py-1 text-sm font-bold text-purple-700">5</span>
        <span class="text-purple-400">→</span>
        <span class="rounded-lg border-2 border-purple-400 bg-purple-50 px-3 py-1 text-sm font-bold text-purple-700">double()</span>
        <span class="text-purple-400">→</span>
        <span class="rounded bg-green-100 px-3 py-1 text-sm font-bold text-green-700">10</span>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">double</span>(<span class="arg">x</span>) {
  <span class="kw">return</span> <span class="arg">x</span> * <span class="num">2</span>;
}
<span class="fn">double</span>(<span class="num">5</span>); <span class="cmt">// → 10</span>`}</code></pre>
    </div>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">All three machines as code</p>
    <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">double</span>(<span class="arg">x</span>) {
  <span class="kw">return</span> <span class="arg">x</span> * <span class="num">2</span>;
}

<span class="kw">function</span> <span class="fn">greet</span>(<span class="arg">name</span>) {
  <span class="kw">return</span> <span class="str">"Hello, "</span> + <span class="arg">name</span> + <span class="str">"!"</span>;
}

<span class="kw">function</span> <span class="fn">isEven</span>(<span class="arg">n</span>) {
  <span class="kw">return</span> <span class="arg">n</span> % <span class="num">2</span> === <span class="num">0</span>;
}

<span class="fn">double</span>(<span class="num">5</span>);        <span class="cmt">// → 10</span>
<span class="fn">greet</span>(<span class="str">"World"</span>);  <span class="cmt">// → "Hello, World!"</span>
<span class="fn">isEven</span>(<span class="num">4</span>);       <span class="cmt">// → true</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
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
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
