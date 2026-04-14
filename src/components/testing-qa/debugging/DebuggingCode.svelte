<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Debugging in Code</h2>
    <p class="text-slate-600">Practical debugging techniques you'll use every day.</p>
  </div>

  <!-- console.log debugging patterns -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">console.log Debugging Patterns</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Label your values — never log bare variables</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"user:"</span>, <span class="var">user</span>);
<span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"cart total:"</span>, <span class="var">cart</span>.<span class="var">total</span>);

<span class="cmt">// Log before and after to see what changed</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"BEFORE filter:"</span>, <span class="var">items</span>.<span class="var">length</span>);
<span class="kw">const</span> <span class="var">filtered</span> <span class="op">=</span> <span class="var">items</span>.<span class="fn">filter</span>(<span class="arg">i</span> <span class="op">=></span> <span class="var">i</span>.<span class="var">active</span>);
<span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"AFTER filter:"</span>, <span class="var">filtered</span>.<span class="var">length</span>);

<span class="cmt">// Use console.table for arrays of objects</span>
<span class="fn">console</span>.<span class="fn">table</span>(<span class="var">users</span>);
<span class="cmt">//  (index) | name    | age</span>
<span class="cmt">//  0       | "Alice" | 30</span>
<span class="cmt">//  1       | "Bob"   | 25</span>

<span class="cmt">// Use console.error for important failures</span>
<span class="fn">console</span>.<span class="fn">error</span>(<span class="str">"Payment failed!"</span>, <span class="var">error</span>);

<span class="cmt">// Use console.warn for non-critical issues</span>
<span class="fn">console</span>.<span class="fn">warn</span>(<span class="str">"Deprecated: use newMethod()"</span>);`}</code></pre>
  </div>

  <!-- Reading error messages -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Reading Error Messages</h3>
    <p class="text-sm text-slate-600">Error messages are clues, not punishments. Every error tells you <strong>what went wrong</strong> and <strong>where it happened</strong>.</p>
    <pre class="code-block"><code>{@html `<span class="str">TypeError</span>: Cannot read properties of <span class="kw">null</span>
    (reading <span class="str">'email'</span>)

    at <span class="fn">sendEmail</span>     (<span class="var">email.js</span>:<span class="num">15</span>:<span class="num">22</span>)   <span class="cmt">// &lt;-- Error HERE</span>
    at <span class="fn">handleSubmit</span>  (<span class="var">form.js</span>:<span class="num">42</span>:<span class="num">5</span>)    <span class="cmt">// called by this</span>
    at <span class="fn">onClick</span>       (<span class="var">button.js</span>:<span class="num">8</span>:<span class="num">3</span>)   <span class="cmt">// called by this</span>

<span class="cmt">// How to read it:</span>
<span class="cmt">// 1. TypeError — the type of error</span>
<span class="cmt">// 2. "reading 'email'" — the property that failed</span>
<span class="cmt">// 3. email.js:15:22 — file, line, column</span>
<span class="cmt">// 4. Stack trace — chain of calls leading here</span>`}</code></pre>
  </div>

  <!-- Common bug patterns and fixes -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Common Bug Patterns &amp; Fixes</h3>
    <div class="space-y-3">
      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
        <p class="font-bold text-red-600 text-sm font-mono mb-1">TypeError: Cannot read properties of undefined</p>
        <pre class="code-block"><code>{@html `<span class="cmt">// Bug: user might be undefined</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">user</span>.<span class="var">name</span>);   <span class="cmt">// CRASH</span>

<span class="cmt">// Fix: use optional chaining</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">user</span><span class="op">?.</span><span class="var">name</span>);  <span class="cmt">// safe: returns undefined</span>`}</code></pre>
      </div>

      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
        <p class="font-bold text-red-600 text-sm font-mono mb-1">Off-by-one in loops</p>
        <pre class="code-block"><code>{@html `<span class="cmt">// Bug: <= goes one past the end</span>
<span class="kw">for</span> (<span class="kw">let</span> <span class="var">i</span> <span class="op">=</span> <span class="num">0</span>; <span class="var">i</span> <span class="op">&lt;=</span> <span class="var">arr</span>.<span class="var">length</span>; <span class="var">i</span><span class="op">++</span>) {
  <span class="fn">console</span>.<span class="fn">log</span>(<span class="var">arr</span>[<span class="var">i</span>]);  <span class="cmt">// undefined on last iteration</span>
}

<span class="cmt">// Fix: use < instead of <=</span>
<span class="kw">for</span> (<span class="kw">let</span> <span class="var">i</span> <span class="op">=</span> <span class="num">0</span>; <span class="var">i</span> <span class="op">&lt;</span> <span class="var">arr</span>.<span class="var">length</span>; <span class="var">i</span><span class="op">++</span>) {
  <span class="fn">console</span>.<span class="fn">log</span>(<span class="var">arr</span>[<span class="var">i</span>]);  <span class="cmt">// correct</span>
}`}</code></pre>
      </div>

      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
        <p class="font-bold text-red-600 text-sm font-mono mb-1">Uninitialized accumulator</p>
        <pre class="code-block"><code>{@html `<span class="cmt">// Bug: total starts as undefined</span>
<span class="kw">let</span> <span class="var">total</span>;
<span class="kw">for</span> (<span class="kw">const</span> <span class="var">item</span> <span class="kw">of</span> <span class="var">items</span>) {
  <span class="var">total</span> <span class="op">+=</span> <span class="var">item</span>.<span class="var">price</span>;  <span class="cmt">// undefined + 10 = NaN</span>
}

<span class="cmt">// Fix: initialize to 0</span>
<span class="kw">let</span> <span class="var">total</span> <span class="op">=</span> <span class="num">0</span>;`}</code></pre>
      </div>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Debugging Techniques (Advanced)</h2>
    <p class="text-slate-600">Professional debugging tools and workflows for complex problems.</p>
  </div>

  <!-- Debugger statement -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">The debugger Statement</h3>
    <p class="text-sm text-slate-600">Drop a <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">debugger</code> statement anywhere in your code. When DevTools is open and execution hits that line, it pauses and lets you inspect everything.</p>
    <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">processOrder</span>(<span class="arg">order</span>) {
  <span class="kw">const</span> <span class="var">subtotal</span> <span class="op">=</span> <span class="var">order</span>.<span class="var">items</span>.<span class="fn">reduce</span>(
    (<span class="arg">sum</span>, <span class="arg">item</span>) <span class="op">=></span> <span class="var">sum</span> <span class="op">+</span> <span class="var">item</span>.<span class="var">price</span>, <span class="num">0</span>
  );

  <span class="kw">debugger</span>;  <span class="cmt">// Execution pauses here!</span>
  <span class="cmt">// Hover over any variable to see its value</span>
  <span class="cmt">// Use Step Over (F10) to go line by line</span>
  <span class="cmt">// Use Step Into (F11) to enter function calls</span>

  <span class="kw">const</span> <span class="var">tax</span> <span class="op">=</span> <span class="var">subtotal</span> <span class="op">*</span> <span class="num">0.1</span>;
  <span class="kw">const</span> <span class="var">total</span> <span class="op">=</span> <span class="var">subtotal</span> <span class="op">+</span> <span class="var">tax</span>;
  <span class="kw">return</span> { <span class="var">subtotal</span>, <span class="var">tax</span>, <span class="var">total</span> };
}`}</code></pre>
  </div>

  <!-- Chrome DevTools examples -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Chrome DevTools: Advanced Breakpoints</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Conditional breakpoint: only pause when condition is true</span>
<span class="cmt">// Right-click a line number > "Add conditional breakpoint"</span>
<span class="cmt">// Condition: user.role === "admin"</span>

<span class="cmt">// Logpoint: log without modifying code</span>
<span class="cmt">// Right-click a line > "Add logpoint"</span>
<span class="cmt">// Message: "Processing user:", user.name</span>

<span class="cmt">// DOM breakpoint: pause when a DOM element changes</span>
<span class="cmt">// Elements tab > right-click element > "Break on..."</span>
<span class="cmt">// Options: subtree modifications, attribute changes</span>

<span class="cmt">// XHR/Fetch breakpoint: pause on specific API calls</span>
<span class="cmt">// Sources tab > XHR/fetch Breakpoints > "+"</span>
<span class="cmt">// URL contains: "/api/users"</span>`}</code></pre>
  </div>

  <!-- Async debugging patterns -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Async Debugging Patterns</h3>
    <p class="text-sm text-slate-600">Async bugs are tricky because errors can be swallowed by unhandled promises and stack traces may be incomplete.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Always wrap await in try/catch</span>
<span class="kw">async function</span> <span class="fn">fetchUser</span>(<span class="arg">id</span>) {
  <span class="kw">try</span> {
    <span class="kw">const</span> <span class="var">res</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">\`/api/users/\${<span class="var">id</span>}\`</span>);
    <span class="kw">if</span> (<span class="op">!</span><span class="var">res</span>.<span class="var">ok</span>) <span class="kw">throw new</span> <span class="fn">Error</span>(<span class="str">\`HTTP \${<span class="var">res</span>.<span class="var">status</span>}\`</span>);
    <span class="kw">return await</span> <span class="var">res</span>.<span class="fn">json</span>();
  } <span class="kw">catch</span> (<span class="var">err</span>) {
    <span class="fn">console</span>.<span class="fn">error</span>(<span class="str">"fetchUser failed:"</span>, <span class="var">err</span>);
    <span class="kw">throw</span> <span class="var">err</span>;  <span class="cmt">// Re-throw so callers know</span>
  }
}

<span class="cmt">// Catch unhandled promise rejections globally</span>
<span class="var">window</span>.<span class="fn">addEventListener</span>(<span class="str">'unhandledrejection'</span>, (<span class="arg">e</span>) <span class="op">=></span> {
  <span class="fn">console</span>.<span class="fn">error</span>(<span class="str">"Unhandled rejection:"</span>, <span class="var">e</span>.<span class="var">reason</span>);
});

<span class="cmt">// Cancel stale requests with AbortController</span>
<span class="kw">let</span> <span class="var">controller</span> <span class="op">=</span> <span class="kw">null</span>;
<span class="kw">async function</span> <span class="fn">search</span>(<span class="arg">query</span>) {
  <span class="kw">if</span> (<span class="var">controller</span>) <span class="var">controller</span>.<span class="fn">abort</span>();
  <span class="var">controller</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">AbortController</span>();
  <span class="kw">const</span> <span class="var">res</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">fetch</span>(
    <span class="str">\`/api/search?q=\${<span class="var">query</span>}\`</span>,
    { <span class="var">signal</span>: <span class="var">controller</span>.<span class="var">signal</span> }
  );
}`}</code></pre>
  </div>

  <!-- Performance profiling -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Performance Profiling Snippets</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Measure how long something takes</span>
<span class="fn">console</span>.<span class="fn">time</span>(<span class="str">"render"</span>);
<span class="fn">renderDashboard</span>();
<span class="fn">console</span>.<span class="fn">timeEnd</span>(<span class="str">"render"</span>);  <span class="cmt">// render: 142.5ms</span>

<span class="cmt">// Use performance.mark for precise measurements</span>
<span class="var">performance</span>.<span class="fn">mark</span>(<span class="str">"start-process"</span>);
<span class="fn">processData</span>(<span class="var">bigArray</span>);
<span class="var">performance</span>.<span class="fn">mark</span>(<span class="str">"end-process"</span>);
<span class="var">performance</span>.<span class="fn">measure</span>(
  <span class="str">"data-processing"</span>,
  <span class="str">"start-process"</span>,
  <span class="str">"end-process"</span>
);

<span class="cmt">// Profile a section of code in DevTools</span>
<span class="fn">console</span>.<span class="fn">profile</span>(<span class="str">"MyFunction"</span>);
<span class="fn">myExpensiveFunction</span>();
<span class="fn">console</span>.<span class="fn">profileEnd</span>(<span class="str">"MyFunction"</span>);
<span class="cmt">// Open DevTools > Performance to see the flame chart</span>`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
    <h4 class="mb-2 font-bold text-slate-800">Pro Debugging Tips</h4>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span><strong>Conditional breakpoints</strong> let you pause only when a specific condition is true — invaluable in loops.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span><strong>Logpoints</strong> log to console without modifying your code — no more forgetting to remove console.log.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span>Enable <strong>"Async stack traces"</strong> in DevTools to see full call chains across async boundaries.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span>Use <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">console.time()</code> / <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">console.timeEnd()</code> to quickly measure performance without the full profiler.</span>
      </li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
      Got it
    </button>
  </div>
</div>
{/if}

<style>
  .code-block { background-color: #0f172a;
    color: #e2e8f0; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
