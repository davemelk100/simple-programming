<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();
</script>

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Data Structures in Code</h2>
    <p class="text-sm text-slate-600">The visual arrays and objects map directly to JavaScript syntax.</p>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual: Ordered List</h3>
      <div class="flex items-center gap-1 rounded-lg border border-green-200 bg-green-50 p-4">
        <span class="text-slate-500">[</span>
        <div class="flex flex-col items-center">
          <span class="text-[10px] text-green-500">[0]</span>
          <span class="rounded border border-green-400 bg-green-100 px-2 py-1 text-xs font-bold text-green-700">"apple"</span>
        </div>
        <span class="text-slate-300">,</span>
        <div class="flex flex-col items-center">
          <span class="text-[10px] text-green-500">[1]</span>
          <span class="rounded border border-green-400 bg-green-100 px-2 py-1 text-xs font-bold text-green-700">"banana"</span>
        </div>
        <span class="text-slate-300">,</span>
        <div class="flex flex-col items-center">
          <span class="text-[10px] text-green-500">[2]</span>
          <span class="rounded border border-green-400 bg-green-100 px-2 py-1 text-xs font-bold text-green-700">"cherry"</span>
        </div>
        <span class="text-slate-500">]</span>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code: Array</h3>
      <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">fruits</span> = [<span class="str">"apple"</span>, <span class="str">"banana"</span>, <span class="str">"cherry"</span>];

<span class="var">fruits</span>[<span class="num">0</span>]; <span class="cmt">// → "apple"</span>
<span class="var">fruits</span>[<span class="num">2</span>]; <span class="cmt">// → "cherry"</span>`}</code></pre>
    </div>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual: Labeled Container</h3>
      <div class="rounded-lg border border-green-200 bg-green-50 p-4">
        <div class="mb-1 text-xs font-bold text-green-600">Person</div>
        <div class="space-y-1 text-sm">
          <div><span class="font-semibold text-green-700">name:</span> <span class="text-slate-600">"Alice"</span></div>
          <div><span class="font-semibold text-green-700">age:</span> <span class="text-slate-600">25</span></div>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code: Object</h3>
      <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">person</span> = {
  <span class="prop">name</span>: <span class="str">"Alice"</span>,
  <span class="prop">age</span>:  <span class="num">25</span>
};

<span class="var">person</span>.<span class="prop">name</span>; <span class="cmt">// → "Alice"</span>
<span class="var">person</span>.<span class="prop">age</span>;  <span class="cmt">// → 25</span>`}</code></pre>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
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
  .code-block :global(.kw)   { color: #c084fc; }
  .code-block :global(.var)  { color: #93c5fd; }
  .code-block :global(.str)  { color: #fcd34d; }
  .code-block :global(.num)  { color: #fcd34d; }
  .code-block :global(.cmt)  { color: #475569; }
  .code-block :global(.fn)   { color: #93c5fd; }
  .code-block :global(.prop) { color: #6ee7b7; }
  .code-block :global(.arg)  { color: #fdba74; }
</style>
