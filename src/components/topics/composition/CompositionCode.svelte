<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });
</script>

{#if !advanced}
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
{:else}
<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Advanced Composition Patterns</h2>
    <p class="text-sm text-slate-600">Utilities, point-free style, monadic composition, and efficient data processing with transducers.</p>
  </div>

  <!-- pipe() and compose() utilities -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">pipe() and compose() utilities</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// pipe: left-to-right composition</span>
<span class="kw">const</span> <span class="fn">pipe</span> = (<span class="op">...</span><span class="arg">fns</span>) <span class="op">=></span>
  (<span class="arg">x</span>) <span class="op">=></span> <span class="arg">fns</span>.<span class="fn">reduce</span>((<span class="arg">v</span>, <span class="arg">f</span>) <span class="op">=></span> <span class="fn">f</span>(<span class="arg">v</span>), <span class="arg">x</span>);

<span class="cmt">// compose: right-to-left composition</span>
<span class="kw">const</span> <span class="fn">compose</span> = (<span class="op">...</span><span class="arg">fns</span>) <span class="op">=></span>
  (<span class="arg">x</span>) <span class="op">=></span> <span class="arg">fns</span>.<span class="fn">reduceRight</span>((<span class="arg">v</span>, <span class="arg">f</span>) <span class="op">=></span> <span class="fn">f</span>(<span class="arg">v</span>), <span class="arg">x</span>);

<span class="cmt">// Usage</span>
<span class="kw">const</span> <span class="var">transform</span> = <span class="fn">pipe</span>(<span class="fn">trim</span>, <span class="fn">toUpper</span>, <span class="fn">exclaim</span>);
<span class="fn">transform</span>(<span class="str">"  hello  "</span>); <span class="cmt">// "HELLO!"</span>

<span class="cmt">// compose reads right-to-left (math-style)</span>
<span class="kw">const</span> <span class="var">same</span> = <span class="fn">compose</span>(<span class="fn">exclaim</span>, <span class="fn">toUpper</span>, <span class="fn">trim</span>);
<span class="fn">same</span>(<span class="str">"  hello  "</span>); <span class="cmt">// "HELLO!"</span>`}</code></pre>
  </div>

  <!-- Point-free style -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Point-free style programming</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// "Pointed" style — explicitly names the argument</span>
<span class="kw">const</span> <span class="fn">getTotal</span> = (<span class="arg">items</span>) <span class="op">=></span>
  <span class="arg">items</span>
    .<span class="fn">map</span>((<span class="arg">i</span>) <span class="op">=></span> <span class="arg">i</span>.<span class="var">price</span>)
    .<span class="fn">reduce</span>((<span class="arg">a</span>, <span class="arg">b</span>) <span class="op">=></span> <span class="arg">a</span> <span class="op">+</span> <span class="arg">b</span>, <span class="num">0</span>);

<span class="cmt">// "Point-free" — never mentions the data</span>
<span class="kw">const</span> <span class="fn">pluck</span> = (<span class="arg">k</span>) <span class="op">=></span> (<span class="arg">obj</span>) <span class="op">=></span> <span class="arg">obj</span>[<span class="arg">k</span>];
<span class="kw">const</span> <span class="fn">sum</span> = (<span class="arg">arr</span>) <span class="op">=></span> <span class="arg">arr</span>.<span class="fn">reduce</span>((<span class="arg">a</span>, <span class="arg">b</span>) <span class="op">=></span> <span class="arg">a</span> <span class="op">+</span> <span class="arg">b</span>, <span class="num">0</span>);

<span class="kw">const</span> <span class="var">getTotal</span> = <span class="fn">pipe</span>(
  (<span class="arg">items</span>) <span class="op">=></span> <span class="arg">items</span>.<span class="fn">map</span>(<span class="fn">pluck</span>(<span class="str">"price"</span>)),
  <span class="fn">sum</span>
); <span class="cmt">// data flows through without being named</span>`}</code></pre>
  </div>

  <!-- Monadic composition -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Monadic composition (Promise chains, Optional chaining)</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Promise chains — .then() is monadic composition</span>
<span class="fn">fetch</span>(<span class="str">"/api/user"</span>)
  .<span class="fn">then</span>(<span class="arg">res</span> <span class="op">=></span> <span class="arg">res</span>.<span class="fn">json</span>())        <span class="cmt">// Response → Promise&lt;JSON&gt;</span>
  .<span class="fn">then</span>(<span class="arg">user</span> <span class="op">=></span> <span class="arg">user</span>.<span class="var">name</span>)       <span class="cmt">// JSON → String</span>
  .<span class="fn">then</span>(<span class="arg">name</span> <span class="op">=></span> <span class="arg">name</span>.<span class="fn">toUpperCase</span>()); <span class="cmt">// String → String</span>

<span class="cmt">// Optional chaining — short-circuit on null</span>
<span class="kw">const</span> <span class="var">city</span> = <span class="var">user</span><span class="op">?.</span><span class="var">address</span><span class="op">?.</span><span class="var">city</span>;

<span class="cmt">// flatMap for arrays — monadic bind</span>
<span class="kw">const</span> <span class="var">allTags</span> = <span class="var">posts</span>
  .<span class="fn">flatMap</span>(<span class="arg">p</span> <span class="op">=></span> <span class="arg">p</span>.<span class="var">tags</span>)    <span class="cmt">// Post[] → String[]</span>
  .<span class="fn">filter</span>(<span class="arg">t</span> <span class="op">=></span> <span class="arg">t</span>.<span class="fn">startsWith</span>(<span class="str">"js"</span>));`}</code></pre>
  </div>

  <!-- Transducers -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Transducers / efficient composition patterns</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Problem: each .map/.filter creates an intermediate array</span>
<span class="kw">const</span> <span class="var">result</span> = <span class="var">bigArray</span>
  .<span class="fn">filter</span>(<span class="arg">x</span> <span class="op">=></span> <span class="arg">x</span> <span class="op">></span> <span class="num">10</span>)   <span class="cmt">// array #1</span>
  .<span class="fn">map</span>(<span class="arg">x</span> <span class="op">=></span> <span class="arg">x</span> <span class="op">*</span> <span class="num">2</span>)       <span class="cmt">// array #2</span>
  .<span class="fn">filter</span>(<span class="arg">x</span> <span class="op">=></span> <span class="arg">x</span> <span class="op"><</span> <span class="num">100</span>); <span class="cmt">// array #3</span>

<span class="cmt">// Transducer: compose the operations, single pass</span>
<span class="kw">const</span> <span class="fn">mapping</span> = (<span class="arg">f</span>) <span class="op">=></span> (<span class="arg">step</span>) <span class="op">=></span>
  (<span class="arg">acc</span>, <span class="arg">x</span>) <span class="op">=></span> <span class="fn">step</span>(<span class="arg">acc</span>, <span class="fn">f</span>(<span class="arg">x</span>));

<span class="kw">const</span> <span class="fn">filtering</span> = (<span class="arg">pred</span>) <span class="op">=></span> (<span class="arg">step</span>) <span class="op">=></span>
  (<span class="arg">acc</span>, <span class="arg">x</span>) <span class="op">=></span> <span class="fn">pred</span>(<span class="arg">x</span>) <span class="op">?</span> <span class="fn">step</span>(<span class="arg">acc</span>, <span class="arg">x</span>) <span class="op">:</span> <span class="arg">acc</span>;

<span class="cmt">// Compose transducers (single pass, no intermediate arrays)</span>
<span class="kw">const</span> <span class="var">xform</span> = <span class="fn">compose</span>(
  <span class="fn">filtering</span>(<span class="arg">x</span> <span class="op">=></span> <span class="arg">x</span> <span class="op">></span> <span class="num">10</span>),
  <span class="fn">mapping</span>(<span class="arg">x</span> <span class="op">=></span> <span class="arg">x</span> <span class="op">*</span> <span class="num">2</span>),
  <span class="fn">filtering</span>(<span class="arg">x</span> <span class="op">=></span> <span class="arg">x</span> <span class="op"><</span> <span class="num">100</span>)
);

<span class="kw">const</span> <span class="var">result</span> = <span class="var">bigArray</span>.<span class="fn">reduce</span>(
  <span class="fn">xform</span>((<span class="arg">acc</span>, <span class="arg">x</span>) <span class="op">=></span> (<span class="op">...</span><span class="arg">acc</span>, <span class="arg">x</span>)), []
); <span class="cmt">// one pass, zero intermediate arrays</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
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
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
