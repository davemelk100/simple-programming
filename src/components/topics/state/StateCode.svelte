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
    <h2 class="mb-3 text-xl font-bold text-slate-800">State in Code</h2>
    <p class="text-sm text-slate-600">The timeline from the visual shows how a variable's value changes over time &mdash; that's state.</p>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual: Counter Timeline</h3>
      <div class="flex items-center gap-2 rounded-lg border border-pink-200 bg-pink-50 p-4 text-xs">
        <div class="flex items-center gap-1">
          <span class="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500 font-bold text-white">1</span>
          <span class="font-mono text-pink-700">count = 0</span>
        </div>
        <span class="text-pink-300">→</span>
        <div class="flex items-center gap-1">
          <span class="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500 font-bold text-white">2</span>
          <span class="font-mono text-pink-700">count = 1</span>
        </div>
        <span class="text-pink-300">→</span>
        <div class="flex items-center gap-1">
          <span class="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500 font-bold text-white">3</span>
          <span class="font-mono text-pink-700">count = 2</span>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code: Updating State</h3>
      <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">count</span> = <span class="num">0</span>;     <span class="cmt">// Step 1: start</span>
<span class="var">count</span> = <span class="var">count</span> + <span class="num">1</span>; <span class="cmt">// Step 2: count is 1</span>
<span class="var">count</span> = <span class="var">count</span> + <span class="num">1</span>; <span class="cmt">// Step 3: count is 2</span>`}</code></pre>
    </div>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">A real counter with events</p>
    <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">count</span> = <span class="num">0</span>;

<span class="kw">function</span> <span class="fn">increment</span>() {
  <span class="var">count</span> = <span class="var">count</span> + <span class="num">1</span>;  <span class="cmt">// state changes here</span>
  <span class="fn">display</span>(<span class="var">count</span>);      <span class="cmt">// show the new value</span>
}

<span class="var">button</span>.<span class="var">onclick</span> = <span class="fn">increment</span>;
<span class="cmt">// each click: 0 → 1 → 2 → 3 ...</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-pink-500 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-600 active:scale-95">
      Got it
    </button>
  </div>
</div>
{:else}
<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">State in Code (Advanced)</h2>
    <p class="text-sm text-slate-600">Beyond simple assignments &mdash; immutable updates, state machines, derived state, and async patterns.</p>
  </div>

  <!-- Immutable state updates -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Immutable Updates with Spread / Object.assign</p>
    <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">user</span> = { <span class="var">name</span>: <span class="str">"Alice"</span>, <span class="var">age</span>: <span class="num">25</span> };

<span class="cmt">// Spread operator — creates a new object</span>
<span class="kw">const</span> <span class="var">updated</span> = { ...<span class="var">user</span>, <span class="var">age</span>: <span class="num">26</span> };

<span class="cmt">// Object.assign — also creates a new object</span>
<span class="kw">const</span> <span class="var">updated2</span> = <span class="fn">Object</span>.<span class="fn">assign</span>({}, <span class="var">user</span>, { <span class="var">age</span>: <span class="num">27</span> });

<span class="cmt">// Original is untouched:</span>
<span class="var">user</span>.<span class="var">age</span>;     <span class="cmt">// 25</span>
<span class="var">updated</span>.<span class="var">age</span>;  <span class="cmt">// 26</span>
<span class="var">updated2</span>.<span class="var">age</span>; <span class="cmt">// 27</span>`}</code></pre>
  </div>

  <!-- State machines -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">State Machines — Finite States and Transitions</p>
    <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">transitions</span> = {
  <span class="str">"idle"</span>:    { <span class="var">FETCH</span>: <span class="str">"loading"</span> },
  <span class="str">"loading"</span>: { <span class="var">SUCCESS</span>: <span class="str">"success"</span>, <span class="var">ERROR</span>: <span class="str">"error"</span> },
  <span class="str">"success"</span>: { <span class="var">RESET</span>: <span class="str">"idle"</span> },
  <span class="str">"error"</span>:   { <span class="var">RETRY</span>: <span class="str">"loading"</span>, <span class="var">RESET</span>: <span class="str">"idle"</span> }
};

<span class="kw">let</span> <span class="var">state</span> = <span class="str">"idle"</span>;

<span class="kw">function</span> <span class="fn">send</span>(<span class="arg">event</span>) {
  <span class="kw">const</span> <span class="var">next</span> = <span class="var">transitions</span>[<span class="var">state</span>]?.[<span class="arg">event</span>];
  <span class="kw">if</span> (<span class="var">next</span>) <span class="var">state</span> <span class="op">=</span> <span class="var">next</span>;
}

<span class="fn">send</span>(<span class="str">"FETCH"</span>);   <span class="cmt">// idle → loading</span>
<span class="fn">send</span>(<span class="str">"SUCCESS"</span>); <span class="cmt">// loading → success</span>`}</code></pre>
  </div>

  <!-- Derived / computed state -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Derived / Computed State</p>
    <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">items</span> = [
  { <span class="var">name</span>: <span class="str">"Apples"</span>,  <span class="var">price</span>: <span class="num">2</span>, <span class="var">qty</span>: <span class="num">3</span> },
  { <span class="var">name</span>: <span class="str">"Bread"</span>,   <span class="var">price</span>: <span class="num">4</span>, <span class="var">qty</span>: <span class="num">1</span> },
];

<span class="cmt">// Derived: computed from source state</span>
<span class="kw">const</span> <span class="var">total</span> = <span class="op">$derived</span>(
  <span class="var">items</span>.<span class="fn">reduce</span>((<span class="arg">sum</span>, <span class="arg">i</span>) <span class="op">=></span> <span class="arg">sum</span> + <span class="arg">i</span>.<span class="var">price</span> * <span class="arg">i</span>.<span class="var">qty</span>, <span class="num">0</span>)
);

<span class="cmt">// total is always 10 (2×3 + 4×1)</span>
<span class="cmt">// Change items → total auto-updates</span>`}</code></pre>
  </div>

  <!-- Async state patterns -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Async State — Loading / Error / Success</p>
    <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">state</span> = {
  <span class="var">data</span>: <span class="num">null</span>,
  <span class="var">loading</span>: <span class="num">false</span>,
  <span class="var">error</span>: <span class="num">null</span>,
};

<span class="kw">async function</span> <span class="fn">fetchUsers</span>() {
  <span class="var">state</span> = { ...<span class="var">state</span>, <span class="var">loading</span>: <span class="num">true</span>, <span class="var">error</span>: <span class="num">null</span> };
  <span class="kw">try</span> {
    <span class="kw">const</span> <span class="var">res</span> = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">"/api/users"</span>);
    <span class="kw">const</span> <span class="var">data</span> = <span class="kw">await</span> <span class="var">res</span>.<span class="fn">json</span>();
    <span class="var">state</span> = { <span class="var">data</span>, <span class="var">loading</span>: <span class="num">false</span>, <span class="var">error</span>: <span class="num">null</span> };
  } <span class="kw">catch</span> (<span class="arg">e</span>) {
    <span class="var">state</span> = { ...<span class="var">state</span>, <span class="var">loading</span>: <span class="num">false</span>, <span class="var">error</span>: <span class="arg">e</span> };
  }
}`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-pink-500 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-600 active:scale-95">
      Got it
    </button>
  </div>
</div>
{/if}

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
  .code-block :global(.op)  { color: #f472b6; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
