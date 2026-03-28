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
  let showQuote = $state(false);

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < 3) {
        visibleCards++;
      } else {
        clearInterval(interval);
        setTimeout(() => (showQuote = true), 400);
      }
    }, 700);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Keep It Simple (KISS)</h2>
    <p class="text-slate-600">
      KISS stands for <strong>"Keep It Simple, Stupid"</strong> — a reminder that most systems work best when they stay simple rather than getting complicated. In programming, this means writing code that is easy to read, easy to understand, and easy to change.
    </p>
  </div>

  <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
    <h3 class="mb-2 font-semibold text-green-800">Think of it like LEGO</h3>
    <p class="text-slate-600">
      Imagine building a house out of LEGO bricks. You <em>could</em> use hundreds of tiny specialized pieces with clever interlocking tricks — but it would be fragile and hard to modify. Or you could use a handful of standard bricks that snap together cleanly. The second house is just as good, easier to build, and much easier to fix. That's KISS applied to code.
    </p>
  </div>

  <div>
    <h3 class="mb-4 text-lg font-semibold text-slate-800">Clever vs. Simple</h3>
    <p class="mb-4 text-slate-600">Here are three examples showing "clever" code next to its simpler version:</p>

    <div class="space-y-4">
      <!-- Card 1 -->
      <div class="grid grid-cols-1 gap-4 transition-all duration-700 md:grid-cols-2 {visibleCards >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
        <div class="rounded-xl border border-red-200 bg-red-50 p-4">
          <span class="mb-1 inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">Clever</span>
          <pre class="code-block mt-2"><code>{@html `<span class="kw">const</span> <span class="var">s</span> <span class="op">=</span> <span class="var">x</span> <span class="op">?</span> <span class="var">x</span> <span class="op">&gt;</span> <span class="num">0</span> <span class="op">?</span> <span class="str">"pos"</span> <span class="op">:</span> <span class="str">"neg"</span> <span class="op">:</span> <span class="str">"zero"</span><span class="op">;</span>`}</code></pre>
        </div>
        <div class="rounded-xl border border-green-200 bg-green-50 p-4">
          <span class="mb-1 inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-600">Simple</span>
          <pre class="code-block mt-2"><code>{@html `<span class="kw">let</span> <span class="var">sign</span><span class="op">;</span>
<span class="kw">if</span> (<span class="var">x</span> <span class="op">===</span> <span class="num">0</span>) <span class="var">sign</span> <span class="op">=</span> <span class="str">"zero"</span><span class="op">;</span>
<span class="kw">else if</span> (<span class="var">x</span> <span class="op">&gt;</span> <span class="num">0</span>) <span class="var">sign</span> <span class="op">=</span> <span class="str">"pos"</span><span class="op">;</span>
<span class="kw">else</span> <span class="var">sign</span> <span class="op">=</span> <span class="str">"neg"</span><span class="op">;</span>`}</code></pre>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="grid grid-cols-1 gap-4 transition-all duration-700 md:grid-cols-2 {visibleCards >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
        <div class="rounded-xl border border-red-200 bg-red-50 p-4">
          <span class="mb-1 inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">Clever</span>
          <pre class="code-block mt-2"><code>{@html `<span class="kw">const</span> <span class="var">r</span> <span class="op">=</span> <span class="var">arr</span><span class="op">.</span><span class="fn">reduce</span>((<span class="arg">a</span>,<span class="arg">c</span>)<span class="op">=&gt;</span>(<span class="arg">a</span>[<span class="arg">c</span>]<span class="op">=</span>(<span class="arg">a</span>[<span class="arg">c</span>]<span class="op">||</span><span class="num">0</span>)<span class="op">+</span><span class="num">1</span>,<span class="arg">a</span>),{})<span class="op">;</span>`}</code></pre>
        </div>
        <div class="rounded-xl border border-green-200 bg-green-50 p-4">
          <span class="mb-1 inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-600">Simple</span>
          <pre class="code-block mt-2"><code>{@html `<span class="kw">const</span> <span class="var">counts</span> <span class="op">=</span> {}<span class="op">;</span>
<span class="kw">for</span> (<span class="kw">const</span> <span class="var">item</span> <span class="kw">of</span> <span class="var">arr</span>) {
  <span class="var">counts</span>[<span class="var">item</span>] <span class="op">=</span> (<span class="var">counts</span>[<span class="var">item</span>] <span class="op">||</span> <span class="num">0</span>) <span class="op">+</span> <span class="num">1</span><span class="op">;</span>
}`}</code></pre>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="grid grid-cols-1 gap-4 transition-all duration-700 md:grid-cols-2 {visibleCards >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
        <div class="rounded-xl border border-red-200 bg-red-50 p-4">
          <span class="mb-1 inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">Clever</span>
          <pre class="code-block mt-2"><code>{@html `<span class="kw">class</span> <span class="var">StringUtils</span> {
  <span class="kw">static</span> <span class="fn">capitalize</span>(<span class="arg">s</span>) {
    <span class="kw">return</span> <span class="arg">s</span>[<span class="num">0</span>]<span class="op">.</span><span class="fn">toUpperCase</span>() <span class="op">+</span> <span class="arg">s</span><span class="op">.</span><span class="fn">slice</span>(<span class="num">1</span>)<span class="op">;</span>
  }
}`}</code></pre>
        </div>
        <div class="rounded-xl border border-green-200 bg-green-50 p-4">
          <span class="mb-1 inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-600">Simple</span>
          <pre class="code-block mt-2"><code>{@html `<span class="kw">function</span> <span class="fn">capitalize</span>(<span class="arg">str</span>) {
  <span class="kw">return</span> <span class="arg">str</span>[<span class="num">0</span>]<span class="op">.</span><span class="fn">toUpperCase</span>() <span class="op">+</span> <span class="arg">str</span><span class="op">.</span><span class="fn">slice</span>(<span class="num">1</span>)<span class="op">;</span>
}`}</code></pre>
        </div>
      </div>
    </div>
  </div>

  <div class="transition-all duration-700 {showQuote ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
    <blockquote class="rounded-xl border-l-4 border-green-400 bg-slate-50 p-5 italic text-slate-600">
      "Any fool can write code a computer can understand. Good programmers write code that <strong>humans</strong> can understand."
      <span class="mt-1 block text-sm not-italic text-slate-400">— Martin Fowler</span>
    </blockquote>
  </div>

  <div>
    <h3 class="mb-3 text-lg font-semibold text-slate-800">Key Ideas</h3>
    <ul class="space-y-2">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
        <span class="text-slate-600"><strong>Fewer lines isn't always simpler.</strong> A compact one-liner that nobody can read is worse than five clear lines.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
        <span class="text-slate-600"><strong>Avoid premature optimization.</strong> Make it work correctly first, then make it fast — only if you need to.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
        <span class="text-slate-600"><strong>Write for readability first.</strong> You (and others) will read your code far more often than you write it.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
        <span class="text-slate-600"><strong>Code for the next person.</strong> Write as if the person maintaining your code is a slightly tired version of yourself.</span>
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Keep It Simple — In Depth</h2>
    <p class="text-slate-600">
      The KISS principle goes far beyond formatting preferences. It connects to fundamental ideas about how humans process information, how software evolves, and when complexity is (and isn't) justified.
    </p>
  </div>

  <div class="space-y-6">
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
      <h3 class="mb-2 font-semibold text-green-800">YAGNI — You Ain't Gonna Need It</h3>
      <p class="text-slate-600">
        One of the biggest sources of unnecessary complexity is building features "just in case." YAGNI, from Extreme Programming, says: <strong>don't build it until you actually need it.</strong> Every speculative feature adds code to maintain, tests to write, and cognitive load for future readers. Studies show that the majority of anticipated features never get used. Build the simplest thing that works today, and extend it tomorrow when requirements are real.
      </p>
    </div>

    <div>
      <h3 class="mb-2 text-lg font-semibold text-slate-800">Premature Abstraction</h3>
      <p class="text-slate-600">
        Abstraction is powerful, but <strong>premature abstraction</strong> is as dangerous as premature optimization. When you create an abstract interface before you have at least two or three concrete use cases, you often abstract the wrong thing. The "Rule of Three" suggests: write it once, copy it twice, <em>then</em> abstract. Sandi Metz puts it well: "Duplication is far cheaper than the wrong abstraction."
      </p>
    </div>

    <div>
      <h3 class="mb-2 text-lg font-semibold text-slate-800">Cyclomatic Complexity</h3>
      <p class="text-slate-600 mb-3">
        Cyclomatic complexity is a quantitative measure of the number of linearly independent paths through a function. Each <code class="rounded bg-slate-100 px-1 text-sm text-green-700">if</code>, <code class="rounded bg-slate-100 px-1 text-sm text-green-700">else</code>, <code class="rounded bg-slate-100 px-1 text-sm text-green-700">for</code>, <code class="rounded bg-slate-100 px-1 text-sm text-green-700">while</code>, <code class="rounded bg-slate-100 px-1 text-sm text-green-700">case</code>, <code class="rounded bg-slate-100 px-1 text-sm text-green-700">&&</code>, and <code class="rounded bg-slate-100 px-1 text-sm text-green-700">||</code> adds one to the count. A function with a complexity of 1-5 is easy to understand; 6-10 needs careful attention; above 10 should almost certainly be refactored.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Cyclomatic complexity: 1 (just one path)</span>
<span class="kw">function</span> <span class="fn">greet</span>(<span class="arg">name</span>) {
  <span class="kw">return</span> <span class="str">\`Hello, \${<span class="arg">name</span>}\`</span><span class="op">;</span>
}

<span class="cmt">// Cyclomatic complexity: 4 (four paths)</span>
<span class="kw">function</span> <span class="fn">describe</span>(<span class="arg">age</span>) {
  <span class="kw">if</span> (<span class="arg">age</span> <span class="op">&lt;</span> <span class="num">13</span>) <span class="kw">return</span> <span class="str">"child"</span><span class="op">;</span>
  <span class="kw">else if</span> (<span class="arg">age</span> <span class="op">&lt;</span> <span class="num">18</span>) <span class="kw">return</span> <span class="str">"teen"</span><span class="op">;</span>
  <span class="kw">else if</span> (<span class="arg">age</span> <span class="op">&lt;</span> <span class="num">65</span>) <span class="kw">return</span> <span class="str">"adult"</span><span class="op">;</span>
  <span class="kw">else</span> <span class="kw">return</span> <span class="str">"senior"</span><span class="op">;</span>
}`}</code></pre>
    </div>

    <div>
      <h3 class="mb-2 text-lg font-semibold text-slate-800">Cognitive Load Theory Applied to Code</h3>
      <p class="text-slate-600">
        Human working memory can hold roughly <strong>4 to 7 items</strong> at once. Every variable, branch, and abstraction layer in a function consumes a "slot." When a function exceeds this budget, readers lose track and make mistakes. This is why short functions, descriptive names, and flat control flow matter — they keep cognitive load within human limits. Simplicity is not about taste; it's about how brains work.
      </p>
    </div>

    <div>
      <h3 class="mb-2 text-lg font-semibold text-slate-800">When Complexity IS Justified</h3>
      <ul class="space-y-2">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <span class="text-slate-600"><strong>Performance-critical paths:</strong> Inner loops processing millions of items may need optimized (and less readable) code — but only after profiling proves it's necessary.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <span class="text-slate-600"><strong>Safety-critical systems:</strong> Medical devices, aviation, and financial systems may require redundant checks and formal verification that add complexity for correctness guarantees.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <span class="text-slate-600"><strong>Inherently complex domains:</strong> Some problems (parsers, cryptography, distributed consensus) are genuinely complex. The goal is to manage that complexity, not pretend it doesn't exist.</span>
        </li>
      </ul>
    </div>

    <div>
      <h3 class="mb-2 text-lg font-semibold text-slate-800">Code Smells That Signal Unnecessary Complexity</h3>
      <ul class="space-y-2">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <span class="text-slate-600"><strong>Speculative generality:</strong> Abstract classes or interfaces with only one implementation.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <span class="text-slate-600"><strong>Dead code:</strong> Commented-out blocks or unreachable branches kept "just in case."</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <span class="text-slate-600"><strong>Deeply nested callbacks or conditions:</strong> More than 3 levels of nesting usually means the function is doing too much.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <span class="text-slate-600"><strong>God objects:</strong> A single class that knows everything and does everything.</span>
        </li>
      </ul>
    </div>

    <div>
      <h3 class="mb-2 text-lg font-semibold text-slate-800">Refactoring Toward Simplicity</h3>
      <p class="text-slate-600">
        Refactoring is the practice of improving code structure without changing its behavior. Key refactoring moves that reduce complexity include: <strong>extract function</strong> (break a long function into named steps), <strong>inline function</strong> (remove unnecessary indirection), <strong>replace conditional with early return</strong> (flatten nesting), and <strong>rename</strong> (make intent obvious). The best time to simplify is right after you get something working — before you forget how it works.
      </p>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      I've read this
    </button>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
