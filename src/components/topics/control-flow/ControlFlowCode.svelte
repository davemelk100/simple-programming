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
    <h2 class="mb-3 text-xl font-bold text-slate-800">Control Flow in Code</h2>
    <p class="text-sm text-slate-600">The decision tree and loop visuals translate to <strong>if/else</strong> and <strong>for</strong> statements.</p>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual: Decision Tree</h3>
      <div class="flex flex-col items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 p-4">
        <div class="rounded-lg border-2 border-orange-400 bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700">Is it raining?</div>
        <div class="flex gap-6 text-xs">
          <div class="flex flex-col items-center gap-1">
            <span class="font-bold text-green-600">Yes</span>
            <span class="rounded bg-green-100 px-2 py-1 text-green-700">Take umbrella ☂️</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <span class="font-bold text-blue-600">No</span>
            <span class="rounded bg-blue-100 px-2 py-1 text-blue-700">Wear sunglasses 😎</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code: if/else</h3>
      <pre class="code-block"><code>{@html `<span class="kw">if</span> (<span class="var">isRaining</span>) {
  <span class="fn">takeUmbrella</span>();
} <span class="kw">else</span> {
  <span class="fn">wearSunglasses</span>();
}`}</code></pre>
    </div>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual: Repeat 5 Times</h3>
      <div class="flex items-center gap-1 rounded-lg border border-orange-200 bg-orange-50 p-4">
        {#each [1, 2, 3, 4, 5] as n}
          <div class="flex flex-col items-center">
            <div class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-orange-400 bg-orange-100 text-xs font-bold text-orange-700">{n}</div>
            <span class="text-[10px] text-orange-600">Hello!</span>
          </div>
          {#if n < 5}<span class="text-orange-300">→</span>{/if}
        {/each}
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code: for loop</h3>
      <pre class="code-block"><code>{@html `<span class="kw">for</span> (<span class="kw">let</span> <span class="var">i</span> = <span class="num">1</span>; <span class="var">i</span> &lt;= <span class="num">5</span>; <span class="var">i</span>++) {
  <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"Hello!"</span>);
}
<span class="cmt">// prints "Hello!" five times</span>`}</code></pre>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
      Got it
    </button>
  </div>
</div>
{:else}
<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Advanced Control Flow</h2>
    <p class="text-sm text-slate-600">Beyond if/else: <strong>switch</strong>, <strong>ternary operators</strong>, <strong>optional chaining</strong>, and <strong>guard clauses</strong>.</p>
  </div>

  <!-- Switch with break and fall-through -->
  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-500">Switch Statements &amp; Fall-Through</h3>
    <pre class="code-block"><code>{@html `<span class="kw">switch</span> (<span class="var">status</span>) {
  <span class="kw">case</span> <span class="str">"loading"</span>:
    <span class="fn">showSpinner</span>();
    <span class="kw">break</span>;
  <span class="kw">case</span> <span class="str">"success"</span>:
    <span class="fn">showData</span>();
    <span class="kw">break</span>;
  <span class="kw">case</span> <span class="str">"error"</span>:       <span class="cmt">// fall-through!</span>
  <span class="kw">case</span> <span class="str">"timeout"</span>:
    <span class="fn">showError</span>();     <span class="cmt">// handles both error &amp; timeout</span>
    <span class="kw">break</span>;
  <span class="kw">default</span>:
    <span class="fn">showDefault</span>();
}`}</code></pre>
  </div>

  <!-- Ternary and nested ternary -->
  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-500">Ternary &amp; Nested Ternary Operators</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Simple ternary</span>
<span class="kw">const</span> <span class="var">access</span> <span class="op">=</span> <span class="var">age</span> <span class="op">>=</span> <span class="num">18</span> <span class="op">?</span> <span class="str">"allowed"</span> <span class="op">:</span> <span class="str">"denied"</span>;

<span class="cmt">// Nested ternary (use sparingly!)</span>
<span class="kw">const</span> <span class="var">tier</span> <span class="op">=</span> <span class="var">score</span> <span class="op">>=</span> <span class="num">90</span> <span class="op">?</span> <span class="str">"gold"</span>
            <span class="op">:</span> <span class="var">score</span> <span class="op">>=</span> <span class="num">70</span> <span class="op">?</span> <span class="str">"silver"</span>
            <span class="op">:</span> <span class="str">"bronze"</span>;`}</code></pre>
  </div>

  <!-- Optional chaining as control flow -->
  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-500">Optional Chaining as Control Flow</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Without optional chaining -- crashes if user is null</span>
<span class="kw">const</span> <span class="var">city</span> <span class="op">=</span> <span class="var">user</span>.<span class="var">address</span>.<span class="var">city</span>;

<span class="cmt">// With optional chaining -- safely returns undefined</span>
<span class="kw">const</span> <span class="var">city</span> <span class="op">=</span> <span class="var">user</span><span class="op">?.</span><span class="var">address</span><span class="op">?.</span><span class="var">city</span>;

<span class="cmt">// Combined with nullish coalescing for a default</span>
<span class="kw">const</span> <span class="var">city</span> <span class="op">=</span> <span class="var">user</span><span class="op">?.</span><span class="var">address</span><span class="op">?.</span><span class="var">city</span> <span class="op">??</span> <span class="str">"Unknown"</span>;

<span class="cmt">// Optional method calls</span>
<span class="var">user</span><span class="op">?.</span><span class="fn">getProfile</span><span class="op">?.</span>();`}</code></pre>
  </div>

  <!-- Guard clauses and early returns -->
  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-500">Guard Clauses &amp; Early Returns</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Deeply nested (hard to read)</span>
<span class="kw">function</span> <span class="fn">processOrder</span>(<span class="arg">order</span>) {
  <span class="kw">if</span> (<span class="var">order</span>) {
    <span class="kw">if</span> (<span class="var">order</span>.<span class="var">items</span>.<span class="var">length</span> <span class="op">></span> <span class="num">0</span>) {
      <span class="kw">if</span> (<span class="var">order</span>.<span class="var">isPaid</span>) {
        <span class="fn">ship</span>(<span class="var">order</span>);
      }
    }
  }
}

<span class="cmt">// Guard clauses (clean &amp; flat)</span>
<span class="kw">function</span> <span class="fn">processOrder</span>(<span class="arg">order</span>) {
  <span class="kw">if</span> (<span class="op">!</span><span class="var">order</span>) <span class="kw">return</span>;
  <span class="kw">if</span> (<span class="var">order</span>.<span class="var">items</span>.<span class="var">length</span> <span class="op">===</span> <span class="num">0</span>) <span class="kw">return</span>;
  <span class="kw">if</span> (<span class="op">!</span><span class="var">order</span>.<span class="var">isPaid</span>) <span class="kw">return</span>;

  <span class="fn">ship</span>(<span class="var">order</span>);
}`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
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
  .code-block :global(.arg) { color: #fdba74; }
  .code-block :global(.op)  { color: #67e8f9; }
</style>
