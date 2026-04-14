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

  const useCases = [
    { emoji: '\uD83C\uDFAE', title: 'Games', desc: 'Unity, the world\'s most popular game engine, uses C# as its primary scripting language. From indie hits to AAA titles.' },
    { emoji: '\uD83C\uDFE2', title: 'Enterprise', desc: 'Large-scale business applications, banking systems, and enterprise software are built with C# and .NET every day.' },
    { emoji: '\uD83C\uDF10', title: 'Web', desc: 'ASP.NET Core powers high-performance web APIs and full-stack web applications used by millions.' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < useCases.length) {
        visibleCards++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <p class="text-slate-600">
      C# (pronounced "C sharp") is a powerful, modern programming language created by <strong>Microsoft</strong> in 2000 as part of the <strong>.NET</strong> platform. It was designed by Anders Hejlsberg, the same brilliant mind behind Turbo Pascal and TypeScript. C# combines the power of C++ with the simplicity of modern languages, making it one of the most versatile tools in a programmer's toolkit.
    </p>
  </div>

  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 class="mb-2 text-lg font-bold text-purple-800">Why C#?</h3>
    <p class="text-slate-600">
      C# is a <strong>strongly typed</strong>, <strong>object-oriented</strong> language that runs on the .NET runtime. It's designed to be safe, efficient, and easy to read. Whether you want to build video games, enterprise software, or web applications, C# has you covered.
    </p>
  </div>

  <div>
    <h3 class="mb-4 text-lg font-bold text-slate-800">Where is C# used?</h3>
    <div class="grid gap-4 sm:grid-cols-3">
      {#each useCases as card, i}
        <div
          class="rounded-xl border-2 border-purple-200 bg-white p-5 text-center shadow-sm transition-all duration-700
            {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}"
        >
          <div class="mb-2 text-4xl">{card.emoji}</div>
          <h4 class="mb-2 text-lg font-bold text-purple-700">{card.title}</h4>
          <p class="text-sm text-slate-600">{card.desc}</p>
        </div>
      {/each}
    </div>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Key Takeaways</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        C# is a <strong>general-purpose</strong> language: games, web, desktop, mobile, cloud, and more.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        It has a <strong>massive ecosystem</strong> through NuGet packages and the .NET framework.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        C# is <strong>beginner-friendly</strong> yet powerful enough for the most demanding applications.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        It's <strong>cross-platform</strong>: .NET runs on Windows, macOS, and Linux.
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      I've read this
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">C# In Depth</h2>
    <p class="text-slate-600">
      C# is a <strong>statically typed</strong>, <strong>strongly typed</strong> language that compiles to <strong>Common Intermediate Language (CIL)</strong> and runs on the <strong>Common Language Runtime (CLR)</strong>. The CLR provides garbage collection, type safety, exception handling, and JIT compilation, making C# both safe and performant.
    </p>
  </div>

  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-purple-600">The .NET Ecosystem</h3>
    <div class="space-y-3">
      <div class="flex items-center gap-3">
        <div class="w-20 rounded bg-purple-600 px-2 py-1 text-center text-xs font-bold text-white">CLR</div>
        <div class="flex-1 rounded bg-white px-3 py-2 text-sm text-slate-600">The runtime that manages memory, handles exceptions, and JIT-compiles CIL to native code.</div>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-20 rounded bg-purple-500 px-2 py-1 text-center text-xs font-bold text-white">BCL</div>
        <div class="flex-1 rounded bg-white px-3 py-2 text-sm text-slate-600">Base Class Library: collections, IO, networking, serialization, and thousands of built-in types.</div>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-20 rounded bg-purple-400 px-2 py-1 text-center text-xs font-bold text-white">NuGet</div>
        <div class="flex-1 rounded bg-white px-3 py-2 text-sm text-slate-600">Package manager with over 350,000 packages for every imaginable use case.</div>
      </div>
    </div>
  </div>

  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Modern C# Features</h3>
    <p class="mb-3 text-slate-600">C# evolves rapidly. Here are some of the most impactful modern features:</p>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Records, Pattern Matching &amp; Nullable Reference Types</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Records - immutable reference types (C# 9+)</span>
<span class="kw">public record</span> <span class="fn">Person</span>(<span class="fn">string</span> <span class="var">Name</span>, <span class="fn">int</span> <span class="var">Age</span>);

<span class="kw">var</span> <span class="var">alice</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">Person</span>(<span class="str">"Alice"</span>, <span class="num">30</span>);
<span class="kw">var</span> <span class="var">bob</span> <span class="op">=</span> <span class="var">alice</span> <span class="kw">with</span> { <span class="var">Name</span> <span class="op">=</span> <span class="str">"Bob"</span> }; <span class="cmt">// non-destructive mutation</span>

<span class="cmt">// Pattern matching (C# 8+)</span>
<span class="fn">string</span> <span class="fn">Classify</span>(<span class="fn">object</span> <span class="var">obj</span>) <span class="op">=&gt;</span> <span class="var">obj</span> <span class="kw">switch</span>
{
    <span class="fn">int</span> <span class="var">n</span> <span class="kw">when</span> <span class="var">n</span> <span class="op">&gt;</span> <span class="num">0</span> <span class="op">=&gt;</span> <span class="str">"positive int"</span>,
    <span class="fn">string</span> <span class="var">s</span>             <span class="op">=&gt;</span> <span class="str">$"string: {<span class="var">s</span>}"</span>,
    <span class="kw">null</span>                  <span class="op">=&gt;</span> <span class="str">"nothing"</span>,
    <span class="var">_</span>                     <span class="op">=&gt;</span> <span class="str">"something else"</span>
};

<span class="cmt">// Nullable reference types (C# 8+)</span>
<span class="fn">string</span><span class="op">?</span> <span class="var">name</span> <span class="op">=</span> <span class="kw">null</span>;   <span class="cmt">// explicitly nullable</span>
<span class="fn">int</span> <span class="var">length</span> <span class="op">=</span> <span class="var">name</span><span class="op">?.</span><span class="var">Length</span> <span class="op">??</span> <span class="num">0</span>; <span class="cmt">// safe access with fallback</span>`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">LINQ &amp; Async/Await</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// LINQ - Language Integrated Query</span>
<span class="kw">var</span> <span class="var">adults</span> <span class="op">=</span> <span class="var">people</span>
    .<span class="fn">Where</span>(<span class="var">p</span> <span class="op">=&gt;</span> <span class="var">p</span>.<span class="var">Age</span> <span class="op">&gt;=</span> <span class="num">18</span>)
    .<span class="fn">OrderBy</span>(<span class="var">p</span> <span class="op">=&gt;</span> <span class="var">p</span>.<span class="var">Name</span>)
    .<span class="fn">Select</span>(<span class="var">p</span> <span class="op">=&gt;</span> <span class="var">p</span>.<span class="var">Name</span>)
    .<span class="fn">ToList</span>();

<span class="cmt">// Async/Await - non-blocking I/O</span>
<span class="kw">async</span> <span class="fn">Task</span><span class="op">&lt;</span><span class="fn">string</span><span class="op">&gt;</span> <span class="fn">FetchDataAsync</span>(<span class="fn">string</span> <span class="var">url</span>)
{
    <span class="kw">using var</span> <span class="var">client</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">HttpClient</span>();
    <span class="kw">var</span> <span class="var">response</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">client</span>.<span class="fn">GetStringAsync</span>(<span class="var">url</span>);
    <span class="kw">return</span> <span class="var">response</span>;
}`}</code></pre>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <strong>Type system</strong>: C# uses static typing with powerful type inference via <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">var</code>. Value types live on the stack; reference types on the heap.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <strong>LINQ</strong> unifies querying across collections, databases (EF Core), XML, and JSON with a single syntax.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <strong>Async/await</strong> enables non-blocking I/O without callback hell, built on the Task Parallel Library.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <strong>Records</strong> provide value equality, immutability, and concise syntax for data-carrying types.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <strong>Pattern matching</strong> makes complex conditional logic readable and type-safe with exhaustiveness checking.
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      I've read this
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
