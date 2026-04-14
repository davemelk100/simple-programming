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
<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">C-Style Syntax in Code</h2>
    <p class="text-sm text-slate-600">See how the same three punctuation marks -- braces, semicolons, and parentheses -- appear in both JavaScript and CSS. The patterns are the same.</p>
  </div>

  <!-- Pattern 1: Blocks with braces -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">What it does</h3>
      <div class="flex min-h-[5rem] items-center rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
        <p class="text-sm text-slate-600">
          <strong>Curly braces</strong> group related code into a block. In JavaScript, a function body is a block. In CSS, a selector's styles are a block. Everything between <code class="rounded bg-white px-1 text-sm text-blue-700">{"{"}</code> and <code class="rounded bg-white px-1 text-sm text-blue-700">{"}"}</code> belongs together.
        </p>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">// JS: a function block</span>
<span class="kw">function</span> <span class="fn">greet</span>() <span class="op">{</span>
  <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"Hello!"</span>);
<span class="op">}</span>

<span class="cmt">/* CSS: a rule block */</span>
<span class="fn">.button</span> <span class="op">{</span>
  <span class="var">color</span>: white;
  <span class="var">background</span>: blue;
<span class="op">}</span>`}</code></pre>
    </div>
  </div>

  <!-- Pattern 2: Statements with semicolons -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Semicolons -- ending statements in JS and CSS</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// JavaScript: semicolons end each statement</span>
<span class="kw">let</span> <span class="var">name</span> = <span class="str">"Alice"</span><span class="op">;</span>
<span class="kw">let</span> <span class="var">age</span> = <span class="num">25</span><span class="op">;</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">name</span>)<span class="op">;</span>

<span class="cmt">/* CSS: semicolons end each declaration */</span>
<span class="fn">h1</span> {
  <span class="var">font-size</span>: <span class="num">2rem</span><span class="op">;</span>
  <span class="var">color</span>: <span class="str">#1e293b</span><span class="op">;</span>
  <span class="var">margin-bottom</span>: <span class="num">0.5rem</span><span class="op">;</span>
}`}</code></pre>
  </div>

  <!-- Pattern 3: Grouping with parentheses -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Parentheses -- grouping and calling</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// JS: parentheses in conditions</span>
<span class="kw">if</span> (<span class="var">age</span> <span class="op">>=</span> <span class="num">18</span>) {
  <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"Adult"</span>);
}

<span class="cmt">// JS: parentheses in function calls</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"Hello"</span>);
<span class="fn">Math</span>.<span class="fn">max</span>(<span class="num">10</span>, <span class="num">20</span>);

<span class="cmt">/* CSS: parentheses in functions */</span>
<span class="fn">.box</span> {
  <span class="var">background</span>: <span class="fn">rgb</span>(<span class="num">59</span>, <span class="num">130</span>, <span class="num">246</span>);
  <span class="var">width</span>: <span class="fn">calc</span>(<span class="num">100%</span> - <span class="num">2rem</span>);
  <span class="var">transform</span>: <span class="fn">rotate</span>(<span class="num">45deg</span>);
}`}</code></pre>
  </div>

  <!-- Shared patterns summary -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">A complete JavaScript function showing all three</p>
    <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">isEven</span>(<span class="arg">number</span>) <span class="op">{</span>       <span class="cmt">// { } = block</span>
  <span class="kw">if</span> (<span class="var">number</span> <span class="op">%</span> <span class="num">2</span> <span class="op">===</span> <span class="num">0</span>) <span class="op">{</span>       <span class="cmt">// ( ) = grouping</span>
    <span class="kw">return</span> <span class="kw">true</span><span class="op">;</span>               <span class="cmt">// ;   = end statement</span>
  <span class="op">}</span> <span class="kw">else</span> <span class="op">{</span>
    <span class="kw">return</span> <span class="kw">false</span><span class="op">;</span>
  <span class="op">}</span>
<span class="op">}</span>

<span class="kw">let</span> <span class="var">result</span> <span class="op">=</span> <span class="fn">isEven</span>(<span class="num">4</span>)<span class="op">;</span>           <span class="cmt">// true</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">result</span>)<span class="op">;</span>              <span class="cmt">// prints: true</span>`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">The Pattern to Remember</h3>
    <ul class="space-y-2 text-sm text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <code class="rounded bg-white px-1 text-sm text-blue-700">{"{ }"}</code> <strong>wraps blocks</strong> -- function bodies, if/else branches, CSS rules, loops.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <code class="rounded bg-white px-1 text-sm text-blue-700">;</code> <strong>ends statements</strong> -- variable assignments, function calls, CSS declarations.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <code class="rounded bg-white px-1 text-sm text-blue-700">( )</code> <strong>groups things</strong> -- conditions, function arguments, CSS functions, math.
      </li>
    </ul>
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
    <h2 class="mb-3 text-2xl font-bold text-slate-800">C-Style Syntax Deep Dive</h2>
    <p class="text-sm text-slate-600">Comparing how C-style syntax works across languages, including brace styles, semicolon rules, and expression bodies.</p>
  </div>

  <!-- Multi-language function comparison -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">The same function in four C-style languages</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// JavaScript / TypeScript</span>
<span class="kw">function</span> <span class="fn">max</span>(<span class="arg">a</span>: <span class="fn">number</span>, <span class="arg">b</span>: <span class="fn">number</span>): <span class="fn">number</span> {
  <span class="kw">return</span> <span class="var">a</span> <span class="op">></span> <span class="var">b</span> <span class="op">?</span> <span class="var">a</span> <span class="op">:</span> <span class="var">b</span>;
}

<span class="cmt">// Java</span>
<span class="kw">public static int</span> <span class="fn">max</span>(<span class="kw">int</span> <span class="arg">a</span>, <span class="kw">int</span> <span class="arg">b</span>) {
  <span class="kw">return</span> <span class="var">a</span> <span class="op">></span> <span class="var">b</span> <span class="op">?</span> <span class="var">a</span> <span class="op">:</span> <span class="var">b</span>;
}

<span class="cmt">// Go</span>
<span class="kw">func</span> <span class="fn">max</span>(<span class="arg">a</span> <span class="fn">int</span>, <span class="arg">b</span> <span class="fn">int</span>) <span class="fn">int</span> {
  <span class="kw">if</span> <span class="var">a</span> <span class="op">></span> <span class="var">b</span> {
    <span class="kw">return</span> <span class="var">a</span>
  }
  <span class="kw">return</span> <span class="var">b</span>
}`}</code></pre>
  </div>

  <!-- CSS rule vs JS function -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">CSS rules vs JS functions -- same shape, different meaning</p>
    <pre class="code-block"><code>{@html `<span class="cmt">/* CSS: selector { declarations } */</span>
<span class="fn">.card</span> {
  <span class="var">display</span>: flex;
  <span class="var">padding</span>: <span class="num">1rem</span>;
  <span class="var">border-radius</span>: <span class="num">0.5rem</span>;
  <span class="var">box-shadow</span>: <span class="num">0</span> <span class="num">1px</span> <span class="num">3px</span> <span class="fn">rgba</span>(<span class="num">0</span>, <span class="num">0</span>, <span class="num">0</span>, <span class="num">0.1</span>);
}

<span class="cmt">// JS: name(params) { statements }</span>
<span class="kw">function</span> <span class="fn">createCard</span>(<span class="arg">title</span>) {
  <span class="kw">const</span> <span class="var">el</span> = <span class="var">document</span>.<span class="fn">createElement</span>(<span class="str">"div"</span>);
  <span class="var">el</span>.<span class="var">className</span> = <span class="str">"card"</span>;
  <span class="var">el</span>.<span class="var">textContent</span> = <span class="var">title</span>;
  <span class="kw">return</span> <span class="var">el</span>;
}`}</code></pre>
  </div>

  <!-- Brace styles -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Brace placement styles: K&R vs Allman</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// K&R style (Kernighan & Ritchie) -- opening brace on same line</span>
<span class="cmt">// Used by: JavaScript, Java, Go (mandatory), most modern code</span>
<span class="kw">if</span> (<span class="var">x</span> <span class="op">></span> <span class="num">0</span>) {
  <span class="fn">doSomething</span>();
}

<span class="cmt">// Allman style -- opening brace on its own line</span>
<span class="cmt">// Used by: C#, some C/C++ projects</span>
<span class="kw">if</span> (<span class="var">x</span> <span class="op">></span> <span class="num">0</span>)
{
  <span class="fn">doSomething</span>();
}

<span class="cmt">// Go REQUIRES K&R style -- Allman causes a compile error!</span>
<span class="cmt">// This is because Go's ASI inserts a semicolon after the</span>
<span class="cmt">// closing ) if the { isn't on the same line.</span>`}</code></pre>
  </div>

  <!-- ASI gotchas -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">JavaScript ASI gotchas</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// DANGER: ASI inserts a semicolon after 'return'</span>
<span class="kw">function</span> <span class="fn">getData</span>() {
  <span class="kw">return</span>         <span class="cmt">// &lt;-- JS inserts ; here!</span>
  {
    <span class="var">name</span>: <span class="str">"Alice"</span>
  };
}
<span class="fn">getData</span>();  <span class="cmt">// returns undefined, not the object!</span>

<span class="cmt">// FIX: keep the brace on the same line as return</span>
<span class="kw">function</span> <span class="fn">getData2</span>() {
  <span class="kw">return</span> {
    <span class="var">name</span>: <span class="str">"Alice"</span>
  };
}
<span class="fn">getData2</span>();  <span class="cmt">// returns { name: "Alice" }</span>

<span class="cmt">// DANGER: ASI + line starting with (</span>
<span class="kw">const</span> <span class="var">x</span> = <span class="num">1</span>
(<span class="kw">function</span>() { })()  <span class="cmt">// Error! JS reads: const x = 1(function...)</span>

<span class="cmt">// This is why many style guides require semicolons.</span>`}</code></pre>
  </div>

  <!-- Expression bodies -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Expression bodies -- reducing brace usage</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// JavaScript: arrow functions can omit braces</span>
<span class="cmt">// Block body -- needs braces and return</span>
<span class="kw">const</span> <span class="fn">square</span> = (<span class="arg">x</span>) <span class="op">=></span> {
  <span class="kw">return</span> <span class="var">x</span> <span class="op">*</span> <span class="var">x</span>;
};

<span class="cmt">// Expression body -- no braces, implicit return</span>
<span class="kw">const</span> <span class="fn">square2</span> = (<span class="arg">x</span>) <span class="op">=></span> <span class="var">x</span> <span class="op">*</span> <span class="var">x</span>;

<span class="cmt">// Returning an object literal needs wrapping parens</span>
<span class="kw">const</span> <span class="fn">makeUser</span> = (<span class="arg">name</span>) <span class="op">=></span> ({ <span class="var">name</span>, <span class="var">id</span>: <span class="fn">Math</span>.<span class="fn">random</span>() });

<span class="cmt">// Java: lambda expressions (similar idea)</span>
<span class="cmt">// numbers.stream()</span>
<span class="cmt">//   .filter(n -> n % 2 == 0)     // expression body</span>
<span class="cmt">//   .map(n -> { ... })           // block body</span>

<span class="cmt">// Go: no shorthand -- braces always required</span>
<span class="cmt">// square := func(x int) int { return x * x }</span>`}</code></pre>
  </div>

  <!-- Semicolon rules comparison -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">When semicolons are required vs optional</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// JavaScript -- semicolons optional (ASI fills them in)</span>
<span class="kw">let</span> <span class="var">x</span> = <span class="num">5</span>       <span class="cmt">// works without ;</span>
<span class="kw">let</span> <span class="var">y</span> = <span class="num">10</span>;     <span class="cmt">// works with ;</span>

<span class="cmt">// CSS -- semicolons required between declarations</span>
<span class="fn">.box</span> {
  <span class="var">color</span>: red;           <span class="cmt">/* required */</span>
  <span class="var">background</span>: blue;     <span class="cmt">/* last one: technically optional */</span>
}

<span class="cmt">// Java -- semicolons always required</span>
<span class="cmt">// int x = 5    &lt;-- compile error!</span>
<span class="cmt">// int x = 5;   &lt;-- correct</span>

<span class="cmt">// Go -- no semicolons in source code</span>
<span class="cmt">// The compiler inserts them via strict ASI rules.</span>
<span class="cmt">// x := 5       &lt;-- no semicolons anywhere in Go source</span>`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">Key takeaways</h3>
    <ul class="space-y-2 text-sm text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <strong>K&R brace style</strong> (opening brace on same line) is dominant. Go and JavaScript strongly favor it; C# traditionally uses Allman style.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <strong>Semicolons</strong> range from mandatory (Java, C, CSS) to optional-but-recommended (JavaScript) to invisible (Go inserts them at compile time).
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <strong>Arrow/lambda syntax</strong> lets you skip braces for single-expression functions in JS, Java, and Kotlin, but Go always requires them.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <strong>CSS</strong> uses the same structural punctuation as C-style languages, even though it is a declarative stylesheet language, not a programming language.
      </li>
    </ul>
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
