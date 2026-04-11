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

  let visibleCards = $state(0);

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < 2) {
        visibleCards++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <p class="text-slate-600">
      There are two fundamentally different ways to tell a computer what to do. The difference is simple:
      <strong>declarative</strong> code describes <em>what</em> you want, while <strong>imperative</strong> code describes <em>how</em> to do it.
    </p>
  </div>

  <!-- Restaurant vs Kitchen metaphor cards -->
  <div class="grid gap-6 sm:grid-cols-2">
    <!-- Declarative card -->
    <div
      class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5 transition-all duration-700
        {visibleCards >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}"
    >
      <div class="mb-3 flex items-center gap-3">
        <span class="text-3xl">🍽️</span>
        <h3 class="text-lg font-bold text-indigo-700">Declarative</h3>
      </div>
      <p class="mb-3 text-sm font-medium text-indigo-600">"I'd like a margherita pizza, please."</p>
      <p class="text-sm text-slate-600">
        You walk into a restaurant and tell the waiter <strong>what</strong> you want. You don't explain how to make the dough, what temperature the oven should be, or how long to bake it. You describe the <strong>end result</strong> and let someone else figure out the steps.
      </p>
      <div class="mt-4 space-y-1">
        <p class="text-xs font-bold uppercase tracking-wider text-indigo-500">Examples</p>
        <p class="text-sm text-slate-600">HTML, CSS, SQL, YAML, Regex</p>
      </div>
    </div>

    <!-- Imperative card -->
    <div
      class="rounded-xl border-2 border-amber-200 bg-amber-50 p-5 transition-all duration-700
        {visibleCards >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}"
    >
      <div class="mb-3 flex items-center gap-3">
        <span class="text-3xl">👨‍🍳</span>
        <h3 class="text-lg font-bold text-amber-700">Imperative</h3>
      </div>
      <p class="mb-3 text-sm font-medium text-amber-600">"Heat oven to 400. Roll dough. Spread sauce. Add cheese. Bake 12 min."</p>
      <p class="text-sm text-slate-600">
        You're in the kitchen cooking it yourself. You write out every <strong>step</strong> in order: do this, then do that, then check this condition. You control the <strong>process</strong> from start to finish.
      </p>
      <div class="mt-4 space-y-1">
        <p class="text-xs font-bold uppercase tracking-wider text-amber-500">Examples</p>
        <p class="text-sm text-slate-600">Python, JavaScript, Go, C, Java</p>
      </div>
    </div>
  </div>

  <!-- Concrete code examples -->
  <div class="space-y-6">
    <h3 class="text-lg font-bold text-slate-800">See It in Real Languages</h3>

    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <p class="mb-2 text-sm font-semibold text-indigo-600">Declarative: HTML</p>
        <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- "I want a heading and a list" --&gt;</span>
<span class="op">&lt;</span><span class="kw">h1</span><span class="op">&gt;</span><span class="var">My Groceries</span><span class="op">&lt;/</span><span class="kw">h1</span><span class="op">&gt;</span>
<span class="op">&lt;</span><span class="kw">ul</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="kw">li</span><span class="op">&gt;</span><span class="var">Apples</span><span class="op">&lt;/</span><span class="kw">li</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="kw">li</span><span class="op">&gt;</span><span class="var">Bread</span><span class="op">&lt;/</span><span class="kw">li</span><span class="op">&gt;</span>
<span class="op">&lt;/</span><span class="kw">ul</span><span class="op">&gt;</span>`}</code></pre>
      </div>
      <div>
        <p class="mb-2 text-sm font-semibold text-amber-600">Imperative: JavaScript</p>
        <pre class="code-block"><code>{@html `<span class="cmt">// "Here's HOW to build a heading and list"</span>
<span class="kw">const</span> <span class="var">h1</span> <span class="op">=</span> <span class="var">document</span>.<span class="fn">createElement</span>(<span class="str">"h1"</span>);
<span class="var">h1</span>.<span class="var">textContent</span> <span class="op">=</span> <span class="str">"My Groceries"</span>;
<span class="var">document</span>.<span class="var">body</span>.<span class="fn">appendChild</span>(<span class="var">h1</span>);
<span class="kw">const</span> <span class="var">ul</span> <span class="op">=</span> <span class="var">document</span>.<span class="fn">createElement</span>(<span class="str">"ul"</span>);
<span class="cmt">// ... add each li one by one</span>`}</code></pre>
      </div>
    </div>

    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <p class="mb-2 text-sm font-semibold text-indigo-600">Declarative: SQL</p>
        <pre class="code-block"><code>{@html `<span class="cmt">-- "Give me all users over 18"</span>
<span class="kw">SELECT</span> <span class="var">name</span>, <span class="var">age</span>
<span class="kw">FROM</span> <span class="var">users</span>
<span class="kw">WHERE</span> <span class="var">age</span> <span class="op">&gt;</span> <span class="num">18</span>;`}</code></pre>
      </div>
      <div>
        <p class="mb-2 text-sm font-semibold text-indigo-600">Declarative: CSS</p>
        <pre class="code-block"><code>{@html `<span class="cmt">/* "Make the button blue and rounded" */</span>
<span class="var">.button</span> {
  <span class="var">background</span>: <span class="str">blue</span>;
  <span class="var">border-radius</span>: <span class="num">8px</span>;
  <span class="var">padding</span>: <span class="num">12px</span> <span class="num">24px</span>;
}`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Key insight -->
  <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-indigo-600">Key Insight</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        Most real-world programming <strong>blends both styles</strong>. A Python script (imperative) might use SQL (declarative) to query a database.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        Declarative code is often <strong>shorter and easier to read</strong>, but imperative code gives you <strong>fine-grained control</strong>.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        Under the hood, declarative code is always executed by imperative instructions — the computer still follows steps; you just don't have to write them.
      </li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-3 text-2xl font-bold text-slate-800">Declarative vs. Imperative: The Full Picture</h2>
      <p class="text-slate-600">
        The declarative/imperative divide isn't binary — it's a <strong>spectrum</strong>. Many modern languages and frameworks let you write declaratively within an imperative host language. Understanding where different tools sit on this spectrum is key to choosing the right approach.
      </p>
    </div>

    <!-- Functional programming as declarative -->
    <div>
      <h3 class="mb-2 text-lg font-bold text-slate-800">Functional Programming: Declarative Inside Imperative</h3>
      <p class="mb-3 text-slate-600">
        Languages like JavaScript and Python are imperative at their core, but they support <strong>functional patterns</strong> like <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">map</code>, <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">filter</code>, and <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">reduce</code> that let you write declaratively. Instead of telling the computer <em>how</em> to loop, you describe <em>what transformation</em> to apply.
      </p>

      <div class="grid gap-4 lg:grid-cols-2">
        <div>
          <p class="mb-2 text-sm font-semibold text-amber-600">Imperative: For Loop</p>
          <pre class="code-block"><code>{@html `<span class="cmt">// Filter even numbers, then double them</span>
<span class="kw">const</span> <span class="var">nums</span> <span class="op">=</span> [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>, <span class="num">6</span>];
<span class="kw">const</span> <span class="var">result</span> <span class="op">=</span> [];
<span class="kw">for</span> (<span class="kw">let</span> <span class="var">i</span> <span class="op">=</span> <span class="num">0</span>; <span class="var">i</span> <span class="op">&lt;</span> <span class="var">nums</span>.<span class="var">length</span>; <span class="var">i</span><span class="op">++</span>) {
  <span class="kw">if</span> (<span class="var">nums</span>[<span class="var">i</span>] <span class="op">%</span> <span class="num">2</span> <span class="op">===</span> <span class="num">0</span>) {
    <span class="var">result</span>.<span class="fn">push</span>(<span class="var">nums</span>[<span class="var">i</span>] <span class="op">*</span> <span class="num">2</span>);
  }
}
<span class="cmt">// result: [4, 8, 12]</span>`}</code></pre>
        </div>
        <div>
          <p class="mb-2 text-sm font-semibold text-indigo-600">Declarative: map/filter</p>
          <pre class="code-block"><code>{@html `<span class="cmt">// Same result, declarative style</span>
<span class="kw">const</span> <span class="var">nums</span> <span class="op">=</span> [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>, <span class="num">6</span>];

<span class="kw">const</span> <span class="var">result</span> <span class="op">=</span> <span class="var">nums</span>
  .<span class="fn">filter</span>(<span class="arg">n</span> <span class="op">=&gt;</span> <span class="arg">n</span> <span class="op">%</span> <span class="num">2</span> <span class="op">===</span> <span class="num">0</span>)
  .<span class="fn">map</span>(<span class="arg">n</span> <span class="op">=&gt;</span> <span class="arg">n</span> <span class="op">*</span> <span class="num">2</span>);

<span class="cmt">// result: [4, 8, 12]</span>`}</code></pre>
        </div>
      </div>
    </div>

    <!-- Declarative UI: React -->
    <div>
      <h3 class="mb-2 text-lg font-bold text-slate-800">React's Declarative UI Model</h3>
      <p class="mb-3 text-slate-600">
        React pioneered the idea of <strong>declarative UI</strong> in web development. Instead of imperatively manipulating the DOM (like jQuery), you describe <em>what</em> the UI should look like for a given state, and React figures out <em>how</em> to update the DOM efficiently.
      </p>
      <div class="grid gap-4 lg:grid-cols-2">
        <div>
          <p class="mb-2 text-sm font-semibold text-amber-600">Imperative: jQuery</p>
          <pre class="code-block"><code>{@html `<span class="cmt">// Manually find and update DOM nodes</span>
<span class="fn">$</span>(<span class="str">"#count"</span>).<span class="fn">text</span>(<span class="var">newCount</span>);
<span class="kw">if</span> (<span class="var">newCount</span> <span class="op">&gt;</span> <span class="num">10</span>) {
  <span class="fn">$</span>(<span class="str">"#warning"</span>).<span class="fn">show</span>();
} <span class="kw">else</span> {
  <span class="fn">$</span>(<span class="str">"#warning"</span>).<span class="fn">hide</span>();
}`}</code></pre>
        </div>
        <div>
          <p class="mb-2 text-sm font-semibold text-indigo-600">Declarative: React JSX</p>
          <pre class="code-block"><code>{@html `<span class="cmt">// Describe the UI as a function of state</span>
<span class="kw">return</span> (
  <span class="op">&lt;</span><span class="kw">div</span><span class="op">&gt;</span>
    <span class="op">&lt;</span><span class="kw">p</span><span class="op">&gt;</span>Count: {<span class="var">count</span>}<span class="op">&lt;/</span><span class="kw">p</span><span class="op">&gt;</span>
    {<span class="var">count</span> <span class="op">&gt;</span> <span class="num">10</span> <span class="op">&amp;&amp;</span> <span class="op">&lt;</span><span class="kw">p</span><span class="op">&gt;</span><span class="str">Warning!</span><span class="op">&lt;/</span><span class="kw">p</span><span class="op">&gt;</span>}
  <span class="op">&lt;/</span><span class="kw">div</span><span class="op">&gt;</span>
);`}</code></pre>
        </div>
      </div>
    </div>

    <!-- Declarative Infrastructure -->
    <div>
      <h3 class="mb-2 text-lg font-bold text-slate-800">Declarative Infrastructure</h3>
      <p class="mb-3 text-slate-600">
        The declarative approach extends beyond application code. Tools like <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">Terraform</code>, <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">Docker Compose</code>, and <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">Kubernetes</code> use declarative configuration: you describe the desired state, and the tool figures out the steps to get there.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt"># Terraform: "I want a server with these specs"</span>
<span class="kw">resource</span> <span class="str">"aws_instance"</span> <span class="str">"web"</span> {
  <span class="var">ami</span>           <span class="op">=</span> <span class="str">"ami-0c55b159cbfafe1f0"</span>
  <span class="var">instance_type</span> <span class="op">=</span> <span class="str">"t2.micro"</span>
  <span class="var">tags</span> <span class="op">=</span> {
    <span class="var">Name</span> <span class="op">=</span> <span class="str">"my-web-server"</span>
  }
}`}</code></pre>
    </div>

    <!-- Purely declarative languages -->
    <div>
      <h3 class="mb-2 text-lg font-bold text-slate-800">Purely Declarative Languages</h3>
      <p class="mb-3 text-slate-600">
        Some languages are declarative by design. <strong>Haskell</strong> uses pure functions and lazy evaluation — you describe <em>what</em> a value is, not the steps to compute it. <strong>Prolog</strong> lets you state facts and rules, and the runtime figures out the answers. <strong>SQL</strong> is almost purely declarative — you never tell the database engine how to scan or join tables.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">-- Haskell: describe WHAT even numbers are</span>
<span class="fn">evens</span> <span class="op">=</span> <span class="fn">filter</span> <span class="fn">even</span> [<span class="num">1</span>..<span class="num">100</span>]

<span class="cmt">-- Prolog: state facts and query them</span>
<span class="fn">parent</span>(<span class="var">tom</span>, <span class="var">bob</span>).
<span class="fn">parent</span>(<span class="var">bob</span>, <span class="var">ann</span>).
<span class="op">?-</span> <span class="fn">parent</span>(<span class="var">tom</span>, <span class="var">X</span>).  <span class="cmt">% X = bob</span>`}</code></pre>
    </div>

    <!-- CSS as declarative with imperative features -->
    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-indigo-600">The Spectrum in Practice</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <strong>CSS</strong> is declarative but gains imperative-like features: <code class="rounded bg-white px-1 text-sm text-indigo-700">calc()</code>, custom properties, and <code class="rounded bg-white px-1 text-sm text-indigo-700">@container</code> queries add logic-like behavior.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <strong>Python</strong> is imperative but list comprehensions (<code class="rounded bg-white px-1 text-sm text-indigo-700">[x*2 for x in nums if x % 2 == 0]</code>) are declarative in spirit.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <strong>Go</strong> is strongly imperative with no map/filter builtins, making the contrast with declarative languages especially clear.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          The trend in modern development is toward <strong>more declarative abstractions</strong>: React, SwiftUI, Jetpack Compose, Terraform, and GraphQL all embrace "describe what, not how."
        </li>
      </ul>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
        I've read this
      </button>
    </div>
  </div>

  {/if}
</div>

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
