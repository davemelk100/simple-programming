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

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Functions in Code (Advanced)</h2>
    <p class="text-sm text-slate-600">Arrow functions, higher-order functions, generics, and closures.</p>
  </div>

  <!-- Arrow functions & implicit returns -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Arrow functions &amp; implicit returns</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Traditional function</span>
<span class="kw">function</span> <span class="fn">double</span>(<span class="arg">x</span>) {
  <span class="kw">return</span> <span class="arg">x</span> <span class="op">*</span> <span class="num">2</span>;
}

<span class="cmt">// Arrow function (explicit return)</span>
<span class="kw">const</span> <span class="var">triple</span> <span class="op">=</span> (<span class="arg">x</span>) <span class="op">=></span> {
  <span class="kw">return</span> <span class="arg">x</span> <span class="op">*</span> <span class="num">3</span>;
};

<span class="cmt">// Arrow function (implicit return)</span>
<span class="kw">const</span> <span class="var">square</span> <span class="op">=</span> (<span class="arg">x</span>) <span class="op">=></span> <span class="arg">x</span> <span class="op">*</span> <span class="arg">x</span>;

<span class="fn">square</span>(<span class="num">4</span>); <span class="cmt">// → 16</span>`}</code></pre>
  </div>

  <!-- Higher-order functions -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Higher-order functions: map, filter, reduce</p>
    <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">nums</span> <span class="op">=</span> [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>];

<span class="cmt">// map: transform each element</span>
<span class="kw">const</span> <span class="var">doubled</span> <span class="op">=</span> <span class="var">nums</span>.<span class="fn">map</span>((<span class="arg">n</span>) <span class="op">=></span> <span class="arg">n</span> <span class="op">*</span> <span class="num">2</span>);
<span class="cmt">// → [2, 4, 6, 8, 10]</span>

<span class="cmt">// filter: keep elements that pass a test</span>
<span class="kw">const</span> <span class="var">evens</span> <span class="op">=</span> <span class="var">nums</span>.<span class="fn">filter</span>((<span class="arg">n</span>) <span class="op">=></span> <span class="arg">n</span> <span class="op">%</span> <span class="num">2</span> <span class="op">===</span> <span class="num">0</span>);
<span class="cmt">// → [2, 4]</span>

<span class="cmt">// reduce: accumulate into a single value</span>
<span class="kw">const</span> <span class="var">sum</span> <span class="op">=</span> <span class="var">nums</span>.<span class="fn">reduce</span>((<span class="arg">acc</span>, <span class="arg">n</span>) <span class="op">=></span> <span class="arg">acc</span> <span class="op">+</span> <span class="arg">n</span>, <span class="num">0</span>);
<span class="cmt">// → 15</span>`}</code></pre>
  </div>

  <!-- Generic typed functions -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Generic typed functions</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// A generic function works with any type</span>
<span class="kw">function</span> <span class="fn">identity</span><span class="op">&lt;</span><span class="var">T</span><span class="op">&gt;</span>(<span class="arg">value</span>: <span class="var">T</span>): <span class="var">T</span> {
  <span class="kw">return</span> <span class="arg">value</span>;
}

<span class="fn">identity</span><span class="op">&lt;</span><span class="var">string</span><span class="op">&gt;</span>(<span class="str">"hello"</span>); <span class="cmt">// → "hello"</span>
<span class="fn">identity</span><span class="op">&lt;</span><span class="var">number</span><span class="op">&gt;</span>(<span class="num">42</span>);      <span class="cmt">// → 42</span>

<span class="cmt">// Generic with constraints</span>
<span class="kw">function</span> <span class="fn">first</span><span class="op">&lt;</span><span class="var">T</span><span class="op">&gt;</span>(<span class="arg">arr</span>: <span class="var">T</span>[]): <span class="var">T</span> <span class="op">|</span> <span class="var">undefined</span> {
  <span class="kw">return</span> <span class="arg">arr</span>[<span class="num">0</span>];
}

<span class="fn">first</span>([<span class="num">10</span>, <span class="num">20</span>]);       <span class="cmt">// → 10  (type: number)</span>
<span class="fn">first</span>([<span class="str">"a"</span>, <span class="str">"b"</span>]);    <span class="cmt">// → "a" (type: string)</span>`}</code></pre>
  </div>

  <!-- Closures & lexical scope -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Closures &amp; lexical scope</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// A closure captures variables from its outer scope</span>
<span class="kw">function</span> <span class="fn">makeCounter</span>() {
  <span class="kw">let</span> <span class="var">count</span> <span class="op">=</span> <span class="num">0</span>;
  <span class="kw">return</span> {
    <span class="fn">increment</span>: () <span class="op">=></span> <span class="op">++</span><span class="var">count</span>,
    <span class="fn">getCount</span>:  () <span class="op">=></span> <span class="var">count</span>,
  };
}

<span class="kw">const</span> <span class="var">counter</span> <span class="op">=</span> <span class="fn">makeCounter</span>();
<span class="var">counter</span>.<span class="fn">increment</span>(); <span class="cmt">// count is now 1</span>
<span class="var">counter</span>.<span class="fn">increment</span>(); <span class="cmt">// count is now 2</span>
<span class="var">counter</span>.<span class="fn">getCount</span>();  <span class="cmt">// → 2</span>

<span class="cmt">// Each call creates a new scope</span>
<span class="kw">const</span> <span class="var">other</span> <span class="op">=</span> <span class="fn">makeCounter</span>();
<span class="var">other</span>.<span class="fn">getCount</span>(); <span class="cmt">// → 0 (separate scope)</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
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
