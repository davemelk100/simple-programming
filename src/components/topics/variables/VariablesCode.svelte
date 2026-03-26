<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();
</script>

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Variables in Code</h2>
    <p class="text-sm text-slate-600">Here's how the labeled boxes from the visual map to real JavaScript code.</p>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual</h3>
      <div class="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div class="flex h-16 w-24 flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-400 bg-blue-100">
          <span class="text-[10px] font-bold text-blue-500">name</span>
          <span class="text-sm font-bold text-blue-700">"Alice"</span>
        </div>
        <span class="text-slate-400">=</span>
        <span class="text-sm text-slate-600">A box labeled <strong>name</strong> holding <strong>"Alice"</strong></span>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">name</span> = <span class="str">"Alice"</span>;`}</code></pre>
    </div>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">All three boxes as code</p>
    <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">name</span>  = <span class="str">"Alice"</span>;   <span class="cmt">// box labeled "name" → holds "Alice"</span>
<span class="kw">let</span> <span class="var">age</span>   = <span class="num">25</span>;        <span class="cmt">// box labeled "age"  → holds 25</span>
<span class="kw">let</span> <span class="var">color</span> = <span class="str">"blue"</span>;    <span class="cmt">// box labeled "color" → holds "blue"</span>`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Changing what's inside a box</p>
    <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">age</span> = <span class="num">25</span>;       <span class="cmt">// starts at 25</span>
<span class="var">age</span> = <span class="num">26</span>;            <span class="cmt">// now the box holds 26</span>

<span class="kw">const</span> <span class="var">name</span> = <span class="str">"Alice"</span>; <span class="cmt">// const = sealed box, can't change</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
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
