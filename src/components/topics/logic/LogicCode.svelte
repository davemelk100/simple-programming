<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();
</script>

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Logic in Code</h2>
    <p class="text-sm text-slate-600">The switches and light bulb from the visual map to boolean operators.</p>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual: Switches + Bulb</h3>
      <div class="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">A: TRUE</span>
            <span class="font-bold text-yellow-700">AND</span>
            <span class="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">B: FALSE</span>
            <span class="text-slate-500">=</span>
            <span class="opacity-40">💡</span>
            <span class="text-xs font-bold text-slate-500">OFF</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">A: TRUE</span>
            <span class="font-bold text-yellow-700">OR</span>
            <span class="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">B: FALSE</span>
            <span class="text-slate-500">=</span>
            <span>💡</span>
            <span class="text-xs font-bold text-yellow-600">ON</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code: Boolean Operators</h3>
      <pre class="code-block"><code>{@html `<span class="true">true</span>  <span class="kw">&amp;&amp;</span> <span class="false">false</span>;  <span class="cmt">// → false (AND)</span>
<span class="true">true</span>  <span class="kw">||</span> <span class="false">false</span>;  <span class="cmt">// → true  (OR)</span>
<span class="kw">!</span><span class="true">true</span>;             <span class="cmt">// → false (NOT)</span>`}</code></pre>
    </div>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Using logic in decisions</p>
    <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">hasTicket</span>  = <span class="true">true</span>;
<span class="kw">let</span> <span class="var">hasPassport</span> = <span class="false">false</span>;

<span class="cmt">// AND: both must be true</span>
<span class="kw">if</span> (<span class="var">hasTicket</span> <span class="kw">&amp;&amp;</span> <span class="var">hasPassport</span>) {
  <span class="fn">boardPlane</span>();    <span class="cmt">// won't run</span>
}

<span class="cmt">// OR: at least one must be true</span>
<span class="kw">if</span> (<span class="var">hasTicket</span> <span class="kw">||</span> <span class="var">hasPassport</span>) {
  <span class="fn">goToAirport</span>();   <span class="cmt">// will run</span>
}`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-yellow-500 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-yellow-600 active:scale-95">
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
  .code-block :global(.kw)    { color: #c084fc; }
  .code-block :global(.var)   { color: #93c5fd; }
  .code-block :global(.str)   { color: #fcd34d; }
  .code-block :global(.num)   { color: #fcd34d; }
  .code-block :global(.cmt)   { color: #475569; }
  .code-block :global(.fn)    { color: #93c5fd; }
  .code-block :global(.true)  { color: #4ade80; }
  .code-block :global(.false) { color: #f87171; }
</style>
