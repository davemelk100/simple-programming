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
    { emoji: '\uD83D\uDCCA', title: 'Data Science', desc: 'Analyze data, create visualizations, and uncover insights with pandas, NumPy, and matplotlib.' },
    { emoji: '\uD83E\uDD16', title: 'AI & Machine Learning', desc: 'Build intelligent systems with TensorFlow, PyTorch, and scikit-learn.' },
    { emoji: '\u2699\uFE0F', title: 'Automation', desc: 'Automate repetitive tasks, scrape websites, manage files, and streamline workflows.' },
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
      Python is a programming language designed with one guiding principle: <strong>code should read like English</strong>. Created by Guido van Rossum in 1991, Python strips away unnecessary punctuation and complex syntax so you can focus on <em>what</em> you want to do, not <em>how</em> to tell the computer to do it.
    </p>
  </div>

  <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
    <h3 class="mb-2 text-lg font-bold text-slate-800">Why Python?</h3>
    <p class="mb-3 text-slate-600">
      Python is often called the most beginner-friendly programming language. There are no semicolons, no curly braces, and no type declarations needed to get started. You write what you mean, and it just works.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt"># This is real Python code. That's it. That's the whole program.</span>
<span class="fn">print</span>(<span class="str">"Hello, World!"</span>)`}</code></pre>
  </div>

  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Where is Python used?</h3>
    <div class="grid gap-4 sm:grid-cols-3">
      {#each useCases as card, i}
        <div
          class="rounded-xl border-2 border-green-200 bg-white p-5 text-center shadow-sm transition-all duration-700
            {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
        >
          <div class="mb-2 text-4xl">{card.emoji}</div>
          <h4 class="mb-1 font-bold text-slate-800">{card.title}</h4>
          <p class="text-sm text-slate-600">{card.desc}</p>
        </div>
      {/each}
    </div>
  </div>

  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Batteries Included</h3>
    <p class="mb-3 text-slate-600">
      Python comes with a massive standard library out of the box. Need to work with JSON, send emails, handle dates, create web servers, or work with files? Python has a built-in module for that. No extra installation required.
    </p>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>Readable, clean syntax that enforces good habits</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>Huge ecosystem of third-party packages (pip install anything)</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>Works everywhere: web, desktop, data science, DevOps, embedded</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>Welcoming community and incredible documentation</li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      I understand what Python is
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Python: Under the Hood</h2>
    <p class="text-slate-600">
      Python is a dynamically-typed, garbage-collected language with a rich data model. Let's explore the concepts that make Python powerful for experienced developers.
    </p>
  </div>

  <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
    <h3 class="mb-2 text-lg font-bold text-slate-800">Everything is an Object</h3>
    <p class="text-slate-600">
      In Python, <strong>everything</strong> is an object: integers, strings, functions, classes, even modules. Every object has an identity (<code class="rounded bg-slate-100 px-1 text-sm text-green-700">id()</code>), a type (<code class="rounded bg-slate-100 px-1 text-sm text-green-700">type()</code>), and a value. This unified data model means you can inspect, pass around, and manipulate anything at runtime.
    </p>
  </div>

  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Duck Typing</h3>
    <p class="mb-3 text-slate-600">
      Python follows the principle: "If it walks like a duck and quacks like a duck, it's a duck." You don't check types explicitly; you rely on objects having the right methods and attributes. This makes Python code flexible and composable.
    </p>
  </div>

  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">The GIL (Global Interpreter Lock)</h3>
    <p class="mb-3 text-slate-600">
      CPython uses a Global Interpreter Lock that allows only one thread to execute Python bytecode at a time. This simplifies memory management but limits true parallelism for CPU-bound tasks. Use <code class="rounded bg-slate-100 px-1 text-sm text-green-700">multiprocessing</code> or <code class="rounded bg-slate-100 px-1 text-sm text-green-700">asyncio</code> to work around it.
    </p>
  </div>

  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Key Advanced Features</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span><strong>List comprehensions:</strong> concise syntax for transforming and filtering sequences</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span><strong>Generators:</strong> lazy evaluation with <code class="rounded bg-slate-100 px-1 text-sm text-green-700">yield</code> for memory-efficient iteration</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span><strong>Decorators:</strong> higher-order functions that modify behavior with <code class="rounded bg-slate-100 px-1 text-sm text-green-700">@decorator</code> syntax</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span><strong>Type hints:</strong> optional static typing for better tooling and documentation</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span><strong>Dataclasses:</strong> reduce boilerplate for data-holding classes</li>
    </ul>
  </div>

  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Modern Python in Action</h3>
    <pre class="code-block"><code>{@html `<span class="kw">from</span> <span class="var">dataclasses</span> <span class="kw">import</span> <span class="var">dataclass</span>
<span class="kw">from</span> <span class="var">typing</span> <span class="kw">import</span> <span class="var">Optional</span>

<span class="op">@</span><span class="fn">dataclass</span>
<span class="kw">class</span> <span class="fn">User</span>:
    <span class="var">name</span>: <span class="fn">str</span>
    <span class="var">age</span>: <span class="fn">int</span>
    <span class="var">email</span>: <span class="fn">Optional</span>[<span class="fn">str</span>] <span class="op">=</span> <span class="kw">None</span>

<span class="cmt"># List comprehension with type hints</span>
<span class="var">users</span>: <span class="fn">list</span>[<span class="fn">User</span>] <span class="op">=</span> [
    <span class="fn">User</span>(<span class="str">"Alice"</span>, <span class="num">30</span>, <span class="str">"alice@example.com"</span>),
    <span class="fn">User</span>(<span class="str">"Bob"</span>, <span class="num">25</span>),
    <span class="fn">User</span>(<span class="str">"Charlie"</span>, <span class="num">35</span>, <span class="str">"charlie@example.com"</span>),
]

<span class="cmt"># Comprehension: names of users with email</span>
<span class="var">contactable</span> <span class="op">=</span> [<span class="var">u</span>.<span class="var">name</span> <span class="kw">for</span> <span class="var">u</span> <span class="kw">in</span> <span class="var">users</span> <span class="kw">if</span> <span class="var">u</span>.<span class="var">email</span>]
<span class="cmt"># → ["Alice", "Charlie"]</span>

<span class="cmt"># Generator expression for lazy evaluation</span>
<span class="var">ages</span> <span class="op">=</span> (<span class="var">u</span>.<span class="var">age</span> <span class="kw">for</span> <span class="var">u</span> <span class="kw">in</span> <span class="var">users</span>)
<span class="fn">print</span>(<span class="fn">sum</span>(<span class="var">ages</span>))  <span class="cmt"># → 90</span>`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
    <h3 class="mb-2 text-lg font-bold text-slate-800">The Zen of Python (selected)</h3>
    <p class="mb-2 text-sm text-slate-500">Run <code class="rounded bg-slate-100 px-1 text-sm text-green-700">import this</code> in Python to see the full list.</p>
    <ul class="space-y-1 text-sm italic text-slate-600">
      <li>Beautiful is better than ugly.</li>
      <li>Explicit is better than implicit.</li>
      <li>Simple is better than complex.</li>
      <li>Readability counts.</li>
      <li>There should be one obvious way to do it.</li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      I understand Python's design
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
