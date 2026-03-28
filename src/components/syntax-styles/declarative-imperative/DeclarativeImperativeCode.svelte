<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  interface Props {
    oncomplete?: () => void;
  }
  let { oncomplete }: Props = $props();
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Side by Side: Same Task, Two Styles</h2>
    <p class="text-slate-600">
      See the same goals accomplished with declarative and imperative approaches. Notice how declarative code describes the <strong>end result</strong>, while imperative code spells out every <strong>step</strong>.
    </p>
  </div>

  <!-- Task 1: Get even numbers -->
  <div class="space-y-3">
    <h3 class="text-lg font-bold text-slate-800">Task: Get all even numbers from a list</h3>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">Imperative</span>
          <span class="text-xs text-slate-400">JavaScript</span>
        </div>
        <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">numbers</span> <span class="op">=</span> [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>, <span class="num">6</span>];
<span class="kw">const</span> <span class="var">evens</span> <span class="op">=</span> [];

<span class="kw">for</span> (<span class="kw">let</span> <span class="var">i</span> <span class="op">=</span> <span class="num">0</span>; <span class="var">i</span> <span class="op">&lt;</span> <span class="var">numbers</span>.<span class="var">length</span>; <span class="var">i</span><span class="op">++</span>) {
  <span class="kw">if</span> (<span class="var">numbers</span>[<span class="var">i</span>] <span class="op">%</span> <span class="num">2</span> <span class="op">===</span> <span class="num">0</span>) {
    <span class="var">evens</span>.<span class="fn">push</span>(<span class="var">numbers</span>[<span class="var">i</span>]);
  }
}
<span class="cmt">// evens: [2, 4, 6]</span>`}</code></pre>
      </div>
      <div>
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700">Declarative</span>
          <span class="text-xs text-slate-400">JavaScript</span>
        </div>
        <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">numbers</span> <span class="op">=</span> [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>, <span class="num">6</span>];

<span class="kw">const</span> <span class="var">evens</span> <span class="op">=</span> <span class="var">numbers</span>.<span class="fn">filter</span>(
  <span class="arg">n</span> <span class="op">=&gt;</span> <span class="arg">n</span> <span class="op">%</span> <span class="num">2</span> <span class="op">===</span> <span class="num">0</span>
);

<span class="cmt">// evens: [2, 4, 6]</span>`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Task 2: Describe a page structure -->
  <div class="space-y-3">
    <h3 class="text-lg font-bold text-slate-800">Task: Create a page with a heading and paragraph</h3>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700">Declarative</span>
          <span class="text-xs text-slate-400">HTML</span>
        </div>
        <pre class="code-block"><code>{@html `<span class="op">&lt;</span><span class="kw">h1</span><span class="op">&gt;</span><span class="var">Welcome</span><span class="op">&lt;/</span><span class="kw">h1</span><span class="op">&gt;</span>
<span class="op">&lt;</span><span class="kw">p</span><span class="op">&gt;</span><span class="var">This is my website.</span><span class="op">&lt;/</span><span class="kw">p</span><span class="op">&gt;</span>

<span class="cmt">&lt;!-- That's it. You declare the</span>
<span class="cmt">     structure. The browser renders it. --&gt;</span>`}</code></pre>
      </div>
      <div>
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">Imperative</span>
          <span class="text-xs text-slate-400">JavaScript DOM</span>
        </div>
        <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">h1</span> <span class="op">=</span> <span class="var">document</span>.<span class="fn">createElement</span>(<span class="str">"h1"</span>);
<span class="var">h1</span>.<span class="var">textContent</span> <span class="op">=</span> <span class="str">"Welcome"</span>;
<span class="var">document</span>.<span class="var">body</span>.<span class="fn">appendChild</span>(<span class="var">h1</span>);

<span class="kw">const</span> <span class="var">p</span> <span class="op">=</span> <span class="var">document</span>.<span class="fn">createElement</span>(<span class="str">"p"</span>);
<span class="var">p</span>.<span class="var">textContent</span> <span class="op">=</span> <span class="str">"This is my website."</span>;
<span class="var">document</span>.<span class="var">body</span>.<span class="fn">appendChild</span>(<span class="var">p</span>);`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Task 3: Query data -->
  <div class="space-y-3">
    <h3 class="text-lg font-bold text-slate-800">Task: Find all active users over 18</h3>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700">Declarative</span>
          <span class="text-xs text-slate-400">SQL</span>
        </div>
        <pre class="code-block"><code>{@html `<span class="kw">SELECT</span> <span class="var">name</span>, <span class="var">age</span>
<span class="kw">FROM</span> <span class="var">users</span>
<span class="kw">WHERE</span> <span class="var">active</span> <span class="op">=</span> <span class="num">true</span>
  <span class="kw">AND</span> <span class="var">age</span> <span class="op">&gt;</span> <span class="num">18</span>
<span class="kw">ORDER BY</span> <span class="var">name</span>;

<span class="cmt">-- You say WHAT data you want.</span>
<span class="cmt">-- The DB decides HOW to get it.</span>`}</code></pre>
      </div>
      <div>
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">Imperative</span>
          <span class="text-xs text-slate-400">Python</span>
        </div>
        <pre class="code-block"><code>{@html `<span class="var">result</span> <span class="op">=</span> []
<span class="kw">for</span> <span class="var">user</span> <span class="kw">in</span> <span class="var">users</span>:
    <span class="kw">if</span> <span class="var">user</span>.<span class="var">active</span> <span class="kw">and</span> <span class="var">user</span>.<span class="var">age</span> <span class="op">&gt;</span> <span class="num">18</span>:
        <span class="var">result</span>.<span class="fn">append</span>(<span class="var">user</span>)

<span class="var">result</span>.<span class="fn">sort</span>(<span class="arg">key</span><span class="op">=</span><span class="kw">lambda</span> <span class="arg">u</span>: <span class="arg">u</span>.<span class="var">name</span>)

<span class="cmt"># You spell out every step:</span>
<span class="cmt"># loop, check, append, sort.</span>`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Task 4: Style a button -->
  <div class="space-y-3">
    <h3 class="text-lg font-bold text-slate-800">Task: Style a button</h3>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700">Declarative</span>
          <span class="text-xs text-slate-400">CSS</span>
        </div>
        <pre class="code-block"><code>{@html `<span class="var">.btn</span> {
  <span class="var">background</span>: <span class="str">#4f46e5</span>;
  <span class="var">color</span>: <span class="str">white</span>;
  <span class="var">padding</span>: <span class="num">12px</span> <span class="num">24px</span>;
  <span class="var">border-radius</span>: <span class="num">8px</span>;
}

<span class="cmt">/* Declare the look. Done. */</span>`}</code></pre>
      </div>
      <div>
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">Imperative</span>
          <span class="text-xs text-slate-400">JavaScript DOM</span>
        </div>
        <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">btn</span> <span class="op">=</span> <span class="var">document</span>.<span class="fn">querySelector</span>(<span class="str">".btn"</span>);
<span class="var">btn</span>.<span class="var">style</span>.<span class="var">background</span> <span class="op">=</span> <span class="str">"#4f46e5"</span>;
<span class="var">btn</span>.<span class="var">style</span>.<span class="var">color</span> <span class="op">=</span> <span class="str">"white"</span>;
<span class="var">btn</span>.<span class="var">style</span>.<span class="var">padding</span> <span class="op">=</span> <span class="str">"12px 24px"</span>;
<span class="var">btn</span>.<span class="var">style</span>.<span class="var">borderRadius</span> <span class="op">=</span> <span class="str">"8px"</span>;

<span class="cmt">// Manually set each property.</span>`}</code></pre>
      </div>
    </div>
  </div>

  <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-indigo-600">Pattern</h3>
    <p class="text-sm text-slate-600">
      Notice how <strong>declarative</strong> code is almost always shorter and reads more like a description, while <strong>imperative</strong> code reads like a recipe with step-by-step instructions. Both produce the same result — the difference is in how you express your intent.
    </p>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Code Patterns: The Declarative Spectrum</h2>
    <p class="text-slate-600">
      Real-world code lives on a spectrum from purely imperative to purely declarative. Here are examples from across that range, showing how different languages and frameworks approach the same problems.
    </p>
  </div>

  <!-- Functional pipelines -->
  <div class="space-y-3">
    <h3 class="text-lg font-bold text-slate-800">Functional Pipelines in JavaScript/TypeScript</h3>
    <p class="text-sm text-slate-600">Chaining array methods creates a declarative "pipeline" that reads like a description of the transformation.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Transform a list of orders into a summary</span>
<span class="kw">const</span> <span class="var">summary</span> <span class="op">=</span> <span class="var">orders</span>
  .<span class="fn">filter</span>(<span class="arg">o</span> <span class="op">=&gt;</span> <span class="arg">o</span>.<span class="var">status</span> <span class="op">===</span> <span class="str">"completed"</span>)
  .<span class="fn">map</span>(<span class="arg">o</span> <span class="op">=&gt;</span> ({
    <span class="var">id</span>: <span class="arg">o</span>.<span class="var">id</span>,
    <span class="var">total</span>: <span class="arg">o</span>.<span class="var">items</span>.<span class="fn">reduce</span>((<span class="arg">s</span>, <span class="arg">i</span>) <span class="op">=&gt;</span> <span class="arg">s</span> <span class="op">+</span> <span class="arg">i</span>.<span class="var">price</span>, <span class="num">0</span>),
  }))
  .<span class="fn">sort</span>((<span class="arg">a</span>, <span class="arg">b</span>) <span class="op">=&gt;</span> <span class="arg">b</span>.<span class="var">total</span> <span class="op">-</span> <span class="arg">a</span>.<span class="var">total</span>)
  .<span class="fn">slice</span>(<span class="num">0</span>, <span class="num">10</span>);

<span class="cmt">// Read top to bottom: filter → transform → sort → take 10</span>`}</code></pre>
  </div>

  <!-- LINQ in C# -->
  <div class="space-y-3">
    <h3 class="text-lg font-bold text-slate-800">LINQ in C#: SQL-Like Queries in Code</h3>
    <p class="text-sm text-slate-600">C#'s LINQ brings declarative, SQL-like syntax directly into an imperative language.</p>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">Imperative</span>
          <span class="text-xs text-slate-400">C# loop</span>
        </div>
        <pre class="code-block"><code>{@html `<span class="kw">var</span> <span class="var">results</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">List</span><span class="op">&lt;</span><span class="fn">string</span><span class="op">&gt;</span>();
<span class="kw">foreach</span> (<span class="kw">var</span> <span class="var">s</span> <span class="kw">in</span> <span class="var">students</span>)
{
    <span class="kw">if</span> (<span class="var">s</span>.<span class="var">Grade</span> <span class="op">&gt;=</span> <span class="num">90</span>)
    {
        <span class="var">results</span>.<span class="fn">Add</span>(<span class="var">s</span>.<span class="var">Name</span>);
    }
}`}</code></pre>
      </div>
      <div>
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700">Declarative</span>
          <span class="text-xs text-slate-400">C# LINQ</span>
        </div>
        <pre class="code-block"><code>{@html `<span class="kw">var</span> <span class="var">results</span> <span class="op">=</span>
    <span class="kw">from</span> <span class="var">s</span> <span class="kw">in</span> <span class="var">students</span>
    <span class="kw">where</span> <span class="var">s</span>.<span class="var">Grade</span> <span class="op">&gt;=</span> <span class="num">90</span>
    <span class="kw">select</span> <span class="var">s</span>.<span class="var">Name</span>;

<span class="cmt">// Reads like SQL inside C#!</span>`}</code></pre>
      </div>
    </div>
  </div>

  <!-- React vs jQuery -->
  <div class="space-y-3">
    <h3 class="text-lg font-bold text-slate-800">React (Declarative) vs. jQuery (Imperative)</h3>
    <p class="text-sm text-slate-600">The evolution of web development is a shift from imperative DOM manipulation to declarative UI descriptions.</p>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">Imperative</span>
          <span class="text-xs text-slate-400">jQuery</span>
        </div>
        <pre class="code-block"><code>{@html `<span class="cmt">// Manually update every piece</span>
<span class="fn">$</span>(<span class="str">"#user-name"</span>).<span class="fn">text</span>(<span class="var">user</span>.<span class="var">name</span>);
<span class="fn">$</span>(<span class="str">"#user-email"</span>).<span class="fn">text</span>(<span class="var">user</span>.<span class="var">email</span>);
<span class="kw">if</span> (<span class="var">user</span>.<span class="var">admin</span>) {
  <span class="fn">$</span>(<span class="str">"#badge"</span>).<span class="fn">show</span>();
  <span class="fn">$</span>(<span class="str">"#badge"</span>).<span class="fn">addClass</span>(<span class="str">"admin"</span>);
} <span class="kw">else</span> {
  <span class="fn">$</span>(<span class="str">"#badge"</span>).<span class="fn">hide</span>();
}`}</code></pre>
      </div>
      <div>
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700">Declarative</span>
          <span class="text-xs text-slate-400">React JSX</span>
        </div>
        <pre class="code-block"><code>{@html `<span class="cmt">// Describe the UI for any state</span>
<span class="kw">return</span> (
  <span class="op">&lt;</span><span class="kw">div</span><span class="op">&gt;</span>
    <span class="op">&lt;</span><span class="kw">h2</span><span class="op">&gt;</span>{<span class="var">user</span>.<span class="var">name</span>}<span class="op">&lt;/</span><span class="kw">h2</span><span class="op">&gt;</span>
    <span class="op">&lt;</span><span class="kw">p</span><span class="op">&gt;</span>{<span class="var">user</span>.<span class="var">email</span>}<span class="op">&lt;/</span><span class="kw">p</span><span class="op">&gt;</span>
    {<span class="var">user</span>.<span class="var">admin</span> <span class="op">&amp;&amp;</span>
      <span class="op">&lt;</span><span class="fn">Badge</span> <span class="var">type</span><span class="op">=</span><span class="str">"admin"</span> <span class="op">/&gt;</span>}
  <span class="op">&lt;/</span><span class="kw">div</span><span class="op">&gt;</span>
);`}</code></pre>
      </div>
    </div>
  </div>

  <!-- CSS Grid as declarative layout -->
  <div class="space-y-3">
    <h3 class="text-lg font-bold text-slate-800">CSS Grid/Flexbox: Declarative Layout</h3>
    <p class="text-sm text-slate-600">CSS Grid and Flexbox are declarative layout systems — you describe the layout structure, and the browser calculates positions and sizes.</p>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700">Declarative</span>
          <span class="text-xs text-slate-400">CSS Grid</span>
        </div>
        <pre class="code-block"><code>{@html `<span class="var">.dashboard</span> {
  <span class="var">display</span>: <span class="str">grid</span>;
  <span class="var">grid-template-columns</span>: <span class="num">1fr</span> <span class="num">2fr</span> <span class="num">1fr</span>;
  <span class="var">gap</span>: <span class="num">1rem</span>;
}

<span class="cmt">/* Declare the grid shape.</span>
<span class="cmt">   Browser handles all sizing. */</span>`}</code></pre>
      </div>
      <div>
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">Imperative</span>
          <span class="text-xs text-slate-400">JavaScript layout</span>
        </div>
        <pre class="code-block"><code>{@html `<span class="cmt">// Manually calculate and set positions</span>
<span class="kw">const</span> <span class="var">colW</span> <span class="op">=</span> <span class="var">container</span>.<span class="var">width</span> <span class="op">/</span> <span class="num">4</span>;
<span class="var">sidebar</span>.<span class="var">style</span>.<span class="var">width</span> <span class="op">=</span> <span class="var">colW</span> <span class="op">+</span> <span class="str">"px"</span>;
<span class="var">main</span>.<span class="var">style</span>.<span class="var">width</span> <span class="op">=</span> <span class="var">colW</span> <span class="op">*</span> <span class="num">2</span> <span class="op">+</span> <span class="str">"px"</span>;
<span class="var">main</span>.<span class="var">style</span>.<span class="var">left</span> <span class="op">=</span> <span class="var">colW</span> <span class="op">+</span> <span class="str">"px"</span>;
<span class="var">aside</span>.<span class="var">style</span>.<span class="var">left</span> <span class="op">=</span> <span class="var">colW</span> <span class="op">*</span> <span class="num">3</span> <span class="op">+</span> <span class="str">"px"</span>;`}</code></pre>
      </div>
    </div>
  </div>

  <!-- The spectrum -->
  <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-indigo-600">The Spectrum: Most Code is a Blend</h3>
    <div class="mb-4 flex items-center gap-1">
      <div class="flex-1 rounded-l-full bg-gradient-to-r from-indigo-500 to-indigo-300 px-3 py-2 text-center text-xs font-bold text-white">Declarative</div>
      <div class="flex-1 bg-gradient-to-r from-indigo-200 to-amber-200 px-3 py-2 text-center text-xs font-bold text-slate-600">Mixed</div>
      <div class="flex-1 rounded-r-full bg-gradient-to-r from-amber-300 to-amber-500 px-3 py-2 text-center text-xs font-bold text-white">Imperative</div>
    </div>
    <ul class="space-y-2 text-sm text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        <strong>SQL, HTML, CSS, Regex</strong> are nearly pure declarative — you rarely describe steps.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-400"></span>
        <strong>React, Svelte, SwiftUI</strong> are declarative UI frameworks built on imperative languages.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400"></span>
        <strong>Python, JS, C#</strong> are imperative with strong declarative features (comprehensions, LINQ, array methods).
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500"></span>
        <strong>C, Assembly, Go</strong> are strongly imperative — you control every step.
      </li>
    </ul>
  </div>

  <!-- SQL optimization note -->
  <div class="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-amber-600">Declarative Does Not Mean Slow</h3>
    <p class="text-sm text-slate-600">
      A common misconception is that declarative code is slower because you don't control the execution. In practice, declarative systems like <strong>SQL query optimizers</strong> often outperform hand-written imperative code — they have deep knowledge of data layout, indexes, and statistics to find the fastest execution plan. Similarly, React's virtual DOM diffing is more efficient than most hand-written DOM manipulation. The abstraction layer often knows more about optimization than you do.
    </p>
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
