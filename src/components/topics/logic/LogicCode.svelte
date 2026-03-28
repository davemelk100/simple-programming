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
{:else}
<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Advanced Logic in Code</h2>
    <p class="text-sm text-slate-600">Short-circuit evaluation, bitwise operators, truthiness, and logical assignment.</p>
  </div>

  <!-- Short-circuit evaluation -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Short-circuit evaluation</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// && returns the first falsy value (or the last value)</span>
<span class="kw">let</span> <span class="var">a</span> <span class="op">=</span> <span class="str">""</span> <span class="kw">&amp;&amp;</span> <span class="str">"hello"</span>;      <span class="cmt">// → "" (empty string is falsy)</span>
<span class="kw">let</span> <span class="var">b</span> <span class="op">=</span> <span class="str">"hi"</span> <span class="kw">&amp;&amp;</span> <span class="str">"hello"</span>;    <span class="cmt">// → "hello" (both truthy, returns last)</span>

<span class="cmt">// || returns the first truthy value (or the last value)</span>
<span class="kw">let</span> <span class="var">c</span> <span class="op">=</span> <span class="str">""</span> <span class="kw">||</span> <span class="str">"fallback"</span>;   <span class="cmt">// → "fallback"</span>
<span class="kw">let</span> <span class="var">d</span> <span class="op">=</span> <span class="num">0</span> <span class="kw">||</span> <span class="num">42</span>;             <span class="cmt">// → 42</span>

<span class="cmt">// ?? (nullish coalescing) only checks null/undefined</span>
<span class="kw">let</span> <span class="var">e</span> <span class="op">=</span> <span class="num">0</span> <span class="kw">??</span> <span class="num">42</span>;             <span class="cmt">// → 0 (0 is not null/undefined)</span>
<span class="kw">let</span> <span class="var">f</span> <span class="op">=</span> <span class="kw">null</span> <span class="kw">??</span> <span class="num">42</span>;          <span class="cmt">// → 42</span>`}</code></pre>
  </div>

  <!-- Bitwise operators -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Bitwise operators</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Operate on 32-bit integer representations</span>
<span class="num">5</span> <span class="op">&amp;</span> <span class="num">3</span>;    <span class="cmt">// → 1   (AND:  0101 &amp; 0011 = 0001)</span>
<span class="num">5</span> <span class="op">|</span> <span class="num">3</span>;    <span class="cmt">// → 7   (OR:   0101 | 0011 = 0111)</span>
<span class="num">5</span> <span class="op">^</span> <span class="num">3</span>;    <span class="cmt">// → 6   (XOR:  0101 ^ 0011 = 0110)</span>
<span class="op">~</span><span class="num">5</span>;       <span class="cmt">// → -6  (NOT:  inverts all bits)</span>
<span class="num">5</span> <span class="op">&lt;&lt;</span> <span class="num">1</span>;   <span class="cmt">// → 10  (left shift, multiply by 2)</span>
<span class="num">5</span> <span class="op">&gt;&gt;</span> <span class="num">1</span>;   <span class="cmt">// → 2   (right shift, divide by 2)</span>

<span class="cmt">// Practical: permission flags</span>
<span class="kw">const</span> <span class="var">READ</span>  <span class="op">=</span> <span class="num">0b100</span>;  <span class="cmt">// 4</span>
<span class="kw">const</span> <span class="var">WRITE</span> <span class="op">=</span> <span class="num">0b010</span>;  <span class="cmt">// 2</span>
<span class="kw">const</span> <span class="var">EXEC</span>  <span class="op">=</span> <span class="num">0b001</span>;  <span class="cmt">// 1</span>
<span class="kw">let</span> <span class="var">perms</span> <span class="op">=</span> <span class="var">READ</span> <span class="op">|</span> <span class="var">WRITE</span>;  <span class="cmt">// combine: 6 (0b110)</span>
<span class="var">perms</span> <span class="op">&amp;</span> <span class="var">EXEC</span>;               <span class="cmt">// check: 0 (no exec)</span>`}</code></pre>
  </div>

  <!-- Truthiness and type coercion -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Truthiness and type coercion</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Falsy values (everything else is truthy)</span>
<span class="kw">if</span> (<span class="false">false</span>)      {}  <span class="cmt">// falsy</span>
<span class="kw">if</span> (<span class="num">0</span>)          {}  <span class="cmt">// falsy</span>
<span class="kw">if</span> (<span class="str">""</span>)         {}  <span class="cmt">// falsy (empty string)</span>
<span class="kw">if</span> (<span class="kw">null</span>)       {}  <span class="cmt">// falsy</span>
<span class="kw">if</span> (<span class="kw">undefined</span>)  {}  <span class="cmt">// falsy</span>
<span class="kw">if</span> (<span class="kw">NaN</span>)        {}  <span class="cmt">// falsy</span>

<span class="cmt">// Surprising truthy values</span>
<span class="kw">if</span> (<span class="str">"0"</span>)   {}  <span class="cmt">// truthy! (non-empty string)</span>
<span class="kw">if</span> ([])    {}  <span class="cmt">// truthy! (empty array)</span>
<span class="kw">if</span> ({})    {}  <span class="cmt">// truthy! (empty object)</span>

<span class="cmt">// == vs === with coercion</span>
<span class="num">0</span> <span class="op">==</span> <span class="str">""</span>;       <span class="cmt">// true  (type coercion)</span>
<span class="num">0</span> <span class="op">===</span> <span class="str">""</span>;      <span class="cmt">// false (strict equality)</span>`}</code></pre>
  </div>

  <!-- Logical assignment operators -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Logical assignment operators</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// &&= assigns only if the left side is truthy</span>
<span class="kw">let</span> <span class="var">x</span> <span class="op">=</span> <span class="num">1</span>;
<span class="var">x</span> <span class="op">&amp;&amp;=</span> <span class="num">2</span>;         <span class="cmt">// x is now 2 (1 is truthy)</span>

<span class="kw">let</span> <span class="var">y</span> <span class="op">=</span> <span class="num">0</span>;
<span class="var">y</span> <span class="op">&amp;&amp;=</span> <span class="num">2</span>;         <span class="cmt">// y is still 0 (0 is falsy)</span>

<span class="cmt">// ||= assigns only if the left side is falsy</span>
<span class="kw">let</span> <span class="var">opts</span> <span class="op">=</span> { <span class="var">color</span>: <span class="str">""</span> };
<span class="var">opts</span>.<span class="var">color</span> <span class="op">||=</span> <span class="str">"blue"</span>;  <span class="cmt">// "blue" ("" is falsy)</span>

<span class="cmt">// ??= assigns only if the left side is null/undefined</span>
<span class="kw">let</span> <span class="var">config</span> <span class="op">=</span> { <span class="var">retries</span>: <span class="num">0</span> };
<span class="var">config</span>.<span class="var">retries</span> <span class="op">??=</span> <span class="num">3</span>;  <span class="cmt">// still 0 (not null/undefined)</span>
<span class="var">config</span>.<span class="var">timeout</span> <span class="op">??=</span> <span class="num">5000</span>; <span class="cmt">// 5000 (undefined)</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-yellow-500 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-yellow-600 active:scale-95">
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
  .code-block :global(.kw)    { color: #c084fc; }
  .code-block :global(.var)   { color: #93c5fd; }
  .code-block :global(.str)   { color: #fcd34d; }
  .code-block :global(.num)   { color: #fcd34d; }
  .code-block :global(.cmt)   { color: #475569; }
  .code-block :global(.fn)    { color: #93c5fd; }
  .code-block :global(.op)    { color: #c084fc; }
  .code-block :global(.arg)   { color: #fca5a5; }
  .code-block :global(.true)  { color: #4ade80; }
  .code-block :global(.false) { color: #f87171; }
</style>
