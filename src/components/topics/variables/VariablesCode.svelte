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
        <span class="text-slate-500">=</span>
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

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Variables in Code (Advanced)</h2>
    <p class="text-sm text-slate-600">TypeScript annotations, destructuring, template literals, and modern operators.</p>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">TypeScript type annotations &amp; inference</p>
    <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">name</span>: <span class="fn">string</span> = <span class="str">"Alice"</span>;       <span class="cmt">// explicit annotation</span>
<span class="kw">let</span> <span class="var">age</span> = <span class="num">25</span>;                        <span class="cmt">// inferred as number</span>
<span class="kw">const</span> <span class="var">PI</span>: <span class="fn">number</span> = <span class="num">3.14159</span>;         <span class="cmt">// const with annotation</span>
<span class="kw">let</span> <span class="var">scores</span>: <span class="fn">number</span>[] = [<span class="num">90</span>, <span class="num">85</span>, <span class="num">92</span>]; <span class="cmt">// typed array</span>
<span class="kw">let</span> <span class="var">active</span>: <span class="fn">boolean</span> <span class="op">|</span> <span class="fn">null</span> = <span class="kw">null</span>;  <span class="cmt">// union type</span>`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Destructuring assignments</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Object destructuring</span>
<span class="kw">const</span> <span class="var">user</span> = { <span class="var">name</span>: <span class="str">"Alice"</span>, <span class="var">age</span>: <span class="num">25</span>, <span class="var">role</span>: <span class="str">"admin"</span> };
<span class="kw">const</span> { <span class="var">name</span>, <span class="var">age</span>, <span class="var">role</span> } = <span class="var">user</span>;

<span class="cmt">// With renaming and defaults</span>
<span class="kw">const</span> { <span class="var">name</span>: <span class="var">userName</span>, <span class="var">level</span> = <span class="num">1</span> } = <span class="var">user</span>;

<span class="cmt">// Array destructuring</span>
<span class="kw">const</span> [<span class="var">first</span>, <span class="var">second</span>, ...<span class="var">rest</span>] = [<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>, <span class="num">40</span>];
<span class="cmt">// first = 10, second = 20, rest = [30, 40]</span>`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Template literals</p>
    <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">name</span> = <span class="str">"Alice"</span>;
<span class="kw">const</span> <span class="var">age</span> = <span class="num">25</span>;

<span class="cmt">// Embed expressions with \${ }</span>
<span class="kw">const</span> <span class="var">greeting</span> = <span class="str">\`Hello, \${<span class="var">name</span>}!\`</span>;
<span class="kw">const</span> <span class="var">info</span> = <span class="str">\`\${<span class="var">name</span>} is \${<span class="var">age</span>} years old\`</span>;

<span class="cmt">// Multi-line strings</span>
<span class="kw">const</span> <span class="var">html</span> = <span class="str">\`
  &lt;div&gt;
    &lt;h1&gt;\${<span class="var">name</span>}&lt;/h1&gt;
  &lt;/div&gt;
\`</span>;`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Nullish coalescing &amp; optional chaining</p>
    <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">user</span> = { <span class="var">name</span>: <span class="str">"Alice"</span>, <span class="var">address</span>: <span class="kw">null</span> };

<span class="cmt">// Optional chaining (?.) — safe property access</span>
<span class="kw">const</span> <span class="var">city</span> = <span class="var">user</span><span class="op">?.</span><span class="var">address</span><span class="op">?.</span><span class="var">city</span>;  <span class="cmt">// undefined (no error)</span>

<span class="cmt">// Nullish coalescing (??) — default for null/undefined</span>
<span class="kw">const</span> <span class="var">score</span> = <span class="kw">null</span> <span class="op">??</span> <span class="num">100</span>;          <span class="cmt">// 100</span>
<span class="kw">const</span> <span class="var">zero</span> = <span class="num">0</span> <span class="op">??</span> <span class="num">100</span>;              <span class="cmt">// 0 (keeps falsy values!)</span>

<span class="cmt">// Compare with || which treats 0, "", false as falsy</span>
<span class="kw">const</span> <span class="var">oops</span> = <span class="num">0</span> <span class="op">||</span> <span class="num">100</span>;              <span class="cmt">// 100 (probably not what you want)</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
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
