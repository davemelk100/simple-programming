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

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Advanced Data Structures</h2>
    <p class="text-sm text-slate-600">Maps, Sets, typed arrays, destructuring, and common patterns.</p>
  </div>

  <!-- Map & Set -->
  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-500">Map &amp; Set</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Map — key-value pairs with any key type</span>
<span class="kw">const</span> <span class="var">cache</span> = <span class="kw">new</span> <span class="fn">Map</span>&lt;<span class="arg">string</span>, <span class="arg">number</span>&gt;();
<span class="var">cache</span>.<span class="fn">set</span>(<span class="str">"a"</span>, <span class="num">1</span>);
<span class="var">cache</span>.<span class="fn">get</span>(<span class="str">"a"</span>);      <span class="cmt">// → 1</span>
<span class="var">cache</span>.<span class="fn">has</span>(<span class="str">"b"</span>);      <span class="cmt">// → false</span>

<span class="cmt">// Set — unique values only</span>
<span class="kw">const</span> <span class="var">tags</span> = <span class="kw">new</span> <span class="fn">Set</span>&lt;<span class="arg">string</span>&gt;([<span class="str">"ts"</span>, <span class="str">"js"</span>, <span class="str">"ts"</span>]);
<span class="var">tags</span>.<span class="var">size</span>;            <span class="cmt">// → 2</span>

<span class="cmt">// WeakMap &amp; WeakSet — garbage-collectible keys</span>
<span class="kw">const</span> <span class="var">meta</span> = <span class="kw">new</span> <span class="fn">WeakMap</span>&lt;<span class="arg">object</span>, <span class="arg">string</span>&gt;();`}</code></pre>
  </div>

  <!-- Destructuring & Spread -->
  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-500">Array Destructuring &amp; Spread</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Destructuring</span>
<span class="kw">const</span> [<span class="var">first</span>, <span class="var">second</span>, ...<span class="var">rest</span>] <span class="op">=</span> [<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>, <span class="num">40</span>];
<span class="var">first</span>;  <span class="cmt">// → 10</span>
<span class="var">rest</span>;   <span class="cmt">// → [30, 40]</span>

<span class="cmt">// Swap without temp variable</span>
<span class="kw">let</span> <span class="var">a</span> <span class="op">=</span> <span class="num">1</span>, <span class="var">b</span> <span class="op">=</span> <span class="num">2</span>;
[<span class="var">a</span>, <span class="var">b</span>] <span class="op">=</span> [<span class="var">b</span>, <span class="var">a</span>];

<span class="cmt">// Spread — merge arrays</span>
<span class="kw">const</span> <span class="var">merged</span> <span class="op">=</span> [...<span class="var">arrA</span>, ...<span class="var">arrB</span>];

<span class="cmt">// Spread — shallow-clone an object</span>
<span class="kw">const</span> <span class="var">copy</span> <span class="op">=</span> { ...<span class="var">original</span>, <span class="var">name</span>: <span class="str">"new"</span> };`}</code></pre>
  </div>

  <!-- Typed Arrays & Tuples -->
  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-500">Typed Arrays &amp; Tuples (TypeScript)</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Typed array</span>
<span class="kw">const</span> <span class="var">scores</span>: <span class="arg">number</span>[] <span class="op">=</span> [<span class="num">95</span>, <span class="num">87</span>, <span class="num">72</span>];
<span class="kw">const</span> <span class="var">names</span>: <span class="fn">Array</span>&lt;<span class="arg">string</span>&gt; <span class="op">=</span> [<span class="str">"Alice"</span>, <span class="str">"Bob"</span>];

<span class="cmt">// Tuple — fixed length &amp; types</span>
<span class="kw">type</span> <span class="fn">Point</span> <span class="op">=</span> [<span class="arg">number</span>, <span class="arg">number</span>];
<span class="kw">const</span> <span class="var">origin</span>: <span class="fn">Point</span> <span class="op">=</span> [<span class="num">0</span>, <span class="num">0</span>];

<span class="cmt">// Readonly tuple</span>
<span class="kw">type</span> <span class="fn">RGB</span> <span class="op">=</span> <span class="kw">readonly</span> [<span class="arg">number</span>, <span class="arg">number</span>, <span class="arg">number</span>];
<span class="kw">const</span> <span class="var">red</span>: <span class="fn">RGB</span> <span class="op">=</span> [<span class="num">255</span>, <span class="num">0</span>, <span class="num">0</span>];`}</code></pre>
  </div>

  <!-- Common Array Patterns -->
  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-500">Common Array Patterns</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Unique values</span>
<span class="kw">const</span> <span class="var">unique</span> <span class="op">=</span> [...<span class="kw">new</span> <span class="fn">Set</span>(<span class="var">arr</span>)];

<span class="cmt">// Flatten nested arrays</span>
<span class="kw">const</span> <span class="var">flat</span> <span class="op">=</span> <span class="var">nested</span>.<span class="fn">flat</span>(<span class="num">Infinity</span>);

<span class="cmt">// Group by key (ES2024 / polyfill)</span>
<span class="kw">const</span> <span class="var">grouped</span> <span class="op">=</span> <span class="fn">Object</span>.<span class="fn">groupBy</span>(<span class="var">users</span>, <span class="arg">u</span> <span class="op">=&gt;</span> <span class="var">u</span>.<span class="var">role</span>);
<span class="cmt">// → { admin: [...], viewer: [...] }</span>

<span class="cmt">// Partition into two groups</span>
<span class="kw">const</span> <span class="var">partition</span> <span class="op">=</span> &lt;<span class="arg">T</span>&gt;(<span class="arg">arr</span>: <span class="arg">T</span>[], <span class="arg">fn</span>: (<span class="arg">x</span>: <span class="arg">T</span>) <span class="op">=&gt;</span> <span class="arg">boolean</span>): [<span class="arg">T</span>[], <span class="arg">T</span>[]] <span class="op">=&gt;</span>
  <span class="var">arr</span>.<span class="fn">reduce</span>(([<span class="var">t</span>, <span class="var">f</span>], <span class="var">x</span>) <span class="op">=&gt;</span>
    <span class="fn">fn</span>(<span class="var">x</span>) ? [[...<span class="var">t</span>, <span class="var">x</span>], <span class="var">f</span>] : [<span class="var">t</span>, [...<span class="var">f</span>, <span class="var">x</span>]],
    [[], []] <span class="kw">as</span> [<span class="arg">T</span>[], <span class="arg">T</span>[]]
  );`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
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
  .code-block :global(.kw)   { color: #c084fc; }
  .code-block :global(.var)  { color: #93c5fd; }
  .code-block :global(.str)  { color: #fcd34d; }
  .code-block :global(.num)  { color: #fcd34d; }
  .code-block :global(.cmt)  { color: #475569; }
  .code-block :global(.fn)   { color: #93c5fd; }
  .code-block :global(.prop) { color: #6ee7b7; }
  .code-block :global(.arg)  { color: #fdba74; }
  .code-block :global(.op)   { color: #94a3b8; }
</style>
