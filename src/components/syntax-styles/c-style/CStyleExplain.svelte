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

  const symbols = [
    {
      symbol: '{ }',
      name: 'Curly Braces',
      desc: 'Define blocks -- everything between { and } belongs together, like rooms in a building.',
      color: 'bg-purple-100 border-purple-400',
      textColor: 'text-purple-700',
    },
    {
      symbol: ';',
      name: 'Semicolon',
      desc: 'Ends a statement -- like a period at the end of a sentence.',
      color: 'bg-blue-100 border-blue-400',
      textColor: 'text-blue-700',
    },
    {
      symbol: '( )',
      name: 'Parentheses',
      desc: 'Group expressions and pass arguments -- used in conditions, function calls, and math.',
      color: 'bg-green-100 border-green-400',
      textColor: 'text-green-700',
    },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < symbols.length) {
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
      A huge number of programming languages share the same basic punctuation style, inherited from the <strong>C language</strong> (created in 1972). If you learn to read one of them, you can read most of the others. This family includes JavaScript, TypeScript, Java, C#, Go, CSS, and many more.
    </p>
  </div>

  <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">The Big Three Punctuation Marks</h3>
    <p class="text-slate-600">
      Three symbols form the backbone of every C-style language. Think of them like the grammar rules of a written language -- once you know where the periods, paragraphs, and parentheses go, you can write in any C-style language.
    </p>
  </div>

  <div class="flex flex-wrap items-start justify-evenly gap-6">
    {#each symbols as card, i}
      <div
        class="flex flex-col items-center gap-2 transition-all duration-700
          {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}"
      >
        <div class="relative flex h-36 w-44 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-dashed {card.color} shadow-md transition-transform duration-300 hover:scale-105">
          <span class="font-mono text-4xl font-bold {card.textColor}">{card.symbol}</span>
          <span class="mt-2 text-sm font-bold {card.textColor}">{card.name}</span>
        </div>
        <p class="w-44 text-center text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">How it looks in practice</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// JavaScript -- a C-style language</span>
<span class="kw">function</span> <span class="fn">greet</span>(<span class="arg">name</span>) <span class="op">{</span>            <span class="cmt">// { opens a block</span>
  <span class="kw">if</span> (<span class="var">name</span>) <span class="op">{</span>                      <span class="cmt">// ( ) groups the condition</span>
    <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"Hello, "</span> <span class="op">+</span> <span class="var">name</span>)<span class="op">;</span>  <span class="cmt">// ; ends the statement</span>
  <span class="op">}</span>                                  <span class="cmt">// } closes the block</span>
<span class="op">}</span>`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-purple-600">The Building Metaphor</h3>
    <p class="text-slate-600">
      Think of curly braces as <strong>rooms in a building</strong>. The opening brace <code class="rounded bg-white px-1 text-sm text-blue-700">{"{"}</code> is the door in, and the closing brace <code class="rounded bg-white px-1 text-sm text-blue-700">{"}"}</code> is the door out. Everything between them belongs to that room. You can have rooms inside rooms (nested blocks), just like a building has closets inside bedrooms inside floors.
    </p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Languages in the Family</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <strong>JavaScript and TypeScript</strong> -- the languages of the web, used in browsers and servers everywhere.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <strong>CSS</strong> -- styles web pages using brace-delimited rule blocks (not a programming language, but same syntax style).
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <strong>Java and C#</strong> -- popular for enterprise software, mobile apps, and game development.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <strong>Go, Rust, Swift, Kotlin</strong> -- modern languages that carry the C-style tradition forward.
      </li>
    </ul>
    <p class="mt-3 text-slate-600">
      Once you learn one C-style language, the others feel remarkably familiar. The keywords change, but the <em>shape</em> of the code stays the same.
    </p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">History and Nuances</h2>
      <p class="text-slate-600">
        The curly-brace syntax convention is one of the most influential design decisions in programming history. It traces a direct lineage from C (1972) through nearly every mainstream language used today.
      </p>
    </div>

    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
      <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">The Lineage</h3>
      <p class="text-slate-600">
        <strong>C (1972)</strong> introduced curly braces for blocks and semicolons for statement terminators. <strong>C++ (1979)</strong> extended C with classes while keeping the syntax. <strong>Java (1995)</strong> borrowed C++ syntax but ran on a virtual machine. <strong>JavaScript (1995)</strong> was designed to "look like Java" for marketing reasons, inheriting C-style syntax for a completely different language. <strong>TypeScript (2012)</strong> added types on top of JavaScript. Even <strong>CSS (1996)</strong> adopted braces for its rule blocks, making it visually consistent with the languages it sits alongside.
      </p>
    </div>

    <div>
      <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">The family tree</p>
      <pre class="code-block"><code>{@html `<span class="cmt">// C (1972) -- the ancestor</span>
<span class="kw">int</span> <span class="fn">add</span>(<span class="kw">int</span> <span class="arg">a</span>, <span class="kw">int</span> <span class="arg">b</span>) {
  <span class="kw">return</span> <span class="var">a</span> <span class="op">+</span> <span class="var">b</span>;
}

<span class="cmt">// Java (1995) -- added classes, kept the syntax</span>
<span class="kw">public</span> <span class="kw">int</span> <span class="fn">add</span>(<span class="kw">int</span> <span class="arg">a</span>, <span class="kw">int</span> <span class="arg">b</span>) {
  <span class="kw">return</span> <span class="var">a</span> <span class="op">+</span> <span class="var">b</span>;
}

<span class="cmt">// JavaScript (1995) -- dynamic typing, same shape</span>
<span class="kw">function</span> <span class="fn">add</span>(<span class="arg">a</span>, <span class="arg">b</span>) {
  <span class="kw">return</span> <span class="var">a</span> <span class="op">+</span> <span class="var">b</span>;
}

<span class="cmt">// TypeScript (2012) -- types added back in</span>
<span class="kw">function</span> <span class="fn">add</span>(<span class="arg">a</span>: <span class="fn">number</span>, <span class="arg">b</span>: <span class="fn">number</span>): <span class="fn">number</span> {
  <span class="kw">return</span> <span class="var">a</span> <span class="op">+</span> <span class="var">b</span>;
}

<span class="cmt">// Go (2009) -- simplified, but still C-style</span>
<span class="kw">func</span> <span class="fn">add</span>(<span class="arg">a</span> <span class="fn">int</span>, <span class="arg">b</span> <span class="fn">int</span>) <span class="fn">int</span> {
  <span class="kw">return</span> <span class="var">a</span> <span class="op">+</span> <span class="var">b</span>
}`}</code></pre>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">How CSS Adopted Braces</h3>
      <p class="text-slate-600">
        CSS is not a programming language, but it adopted the same brace convention for its rule blocks. A CSS selector followed by <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">{"{ }"}</code> containing declarations mirrors a function name followed by a block body. This visual consistency is no accident -- it was designed to feel natural alongside HTML and JavaScript.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">/* CSS uses braces and semicolons too */</span>
<span class="fn">.card</span> {
  <span class="var">background</span>: <span class="str">#ffffff</span>;
  <span class="var">border-radius</span>: <span class="num">8px</span>;
  <span class="var">padding</span>: <span class="num">1rem</span>;
}`}</code></pre>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Differences Within the Family</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <strong>Optional semicolons (ASI)</strong>: JavaScript has Automatic Semicolon Insertion -- the parser adds semicolons where it thinks they belong. This mostly works, but creates subtle bugs (e.g., a <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">return</code> on its own line returns <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">undefined</code>). Go also has ASI but mandates a style that avoids the pitfalls.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <strong>Expression bodies</strong>: Arrow functions in JS/TS allow <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">{"(x) => x * 2"}</code> without braces. This is an expression body -- the result is implicitly returned. Add braces and you need an explicit <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">return</code>.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <strong>Block-bodied vs expression-bodied</strong>: C and Java require braces for all function bodies. Kotlin and Rust allow expression-bodied functions. JavaScript supports both styles through arrow functions.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <strong>CSS specificity within braces</strong>: In CSS, the braces don't create scope like in JS -- they group declarations for a selector. Nesting (now native in CSS) adds a scoping-like feel, but the cascade and specificity rules are fundamentally different from variable scoping.
        </li>
      </ul>
    </div>

    <div>
      <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Arrow functions reduce brace usage</p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Traditional function -- requires braces</span>
<span class="kw">function</span> <span class="fn">double</span>(<span class="arg">x</span>) {
  <span class="kw">return</span> <span class="var">x</span> <span class="op">*</span> <span class="num">2</span>;
}

<span class="cmt">// Arrow function with block body -- still needs braces + return</span>
<span class="kw">const</span> <span class="fn">double2</span> = (<span class="arg">x</span>) <span class="op">=></span> {
  <span class="kw">return</span> <span class="var">x</span> <span class="op">*</span> <span class="num">2</span>;
};

<span class="cmt">// Arrow function with expression body -- no braces needed!</span>
<span class="kw">const</span> <span class="fn">double3</span> = (<span class="arg">x</span>) <span class="op">=></span> <span class="var">x</span> <span class="op">*</span> <span class="num">2</span>;

<span class="cmt">// Chaining expression arrows -- concise functional style</span>
<span class="kw">const</span> <span class="var">result</span> = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>]
  .<span class="fn">filter</span>((<span class="arg">n</span>) <span class="op">=></span> <span class="var">n</span> <span class="op">%</span> <span class="num">2</span> <span class="op">===</span> <span class="num">0</span>)
  .<span class="fn">map</span>((<span class="arg">n</span>) <span class="op">=></span> <span class="var">n</span> <span class="op">*</span> <span class="num">10</span>);      <span class="cmt">// [20, 40]</span>`}</code></pre>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>

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
