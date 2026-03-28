<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  interface Props {
    oncomplete?: (score: number) => void;
  }
  let { oncomplete }: Props = $props();

  // === Basic mode state ===
  let c1Answer = $state('');
  let c1Result = $state<'correct' | 'wrong' | null>(null);

  let c2Answer = $state('');
  let c2Result = $state<'correct' | 'wrong' | null>(null);

  let c3Answer = $state('');
  let c3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(c1Result === 'correct' && c2Result === 'correct' && c3Result === 'correct');

  function checkC1() {
    c1Result = c1Answer.trim().toLowerCase() === 'class' ? 'correct' : 'wrong';
  }

  function checkC2() {
    c2Result = ['unity'].includes(c2Answer.trim().toLowerCase()) ? 'correct' : 'wrong';
  }

  function checkC3() {
    c3Result = c3Answer.trim().toLowerCase() === 'new' ? 'correct' : 'wrong';
  }

  function handleComplete() {
    const score = [c1Result, c2Result, c3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (allDone) {
      handleComplete();
    }
  });

  // === Advanced mode state ===
  let adv1Answer = $state('');
  let adv1Result = $state<'correct' | 'wrong' | null>(null);

  let adv2Answer = $state('');
  let adv2Result = $state<'correct' | 'wrong' | null>(null);

  let adv3Answer = $state('');
  let adv3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(adv1Result === 'correct' && adv2Result === 'correct' && adv3Result === 'correct');

  function checkAdv1() {
    adv1Result = ['async', 'async/await'].includes(adv1Answer.trim().toLowerCase()) ? 'correct' : 'wrong';
  }

  function checkAdv2() {
    adv2Result = ['linq'].includes(adv2Answer.trim().toLowerCase()) ? 'correct' : 'wrong';
  }

  function checkAdv3() {
    adv3Result = ['record', 'records'].includes(adv3Answer.trim().toLowerCase()) ? 'correct' : 'wrong';
  }

  function handleAdvComplete() {
    const score = [adv1Result, adv2Result, adv3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (advAllDone) {
      handleAdvComplete();
    }
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: C# Basics</h2>
    <p class="text-slate-600">Test what you've learned about C# fundamentals!</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What keyword defines a class in C#?
    </p>
    <pre class="code-block mb-3"><code>{@html `<span class="kw">public</span> <span class="op">???</span> <span class="fn">Player</span>
{
    <span class="kw">public</span> <span class="fn">string</span> <span class="var">Name</span> { <span class="kw">get</span>; <span class="kw">set</span>; }
}`}</code></pre>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c1Answer}
        placeholder="Type the keyword..."
        disabled={c1Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">class</code> keyword defines a new class in C#.</p>
    {:else if c1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about the fundamental keyword for creating a blueprint for objects.</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What game engine uses C# as its primary scripting language?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It's the most popular game engine in the world and starts with "U".</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c2Answer}
        placeholder="Type the engine name..."
        disabled={c2Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Unity uses C# for game scripting, making C# one of the most popular languages in game development.</p>
    {:else if c2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. This engine's name starts with "U" and is used by millions of game developers worldwide.</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What keyword creates a new object from a class?
    </p>
    <pre class="code-block mb-3"><code>{@html `<span class="kw">var</span> <span class="var">player</span> <span class="op">=</span> <span class="op">???</span> <span class="fn">Player</span>();`}</code></pre>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c3Answer}
        placeholder="Type the keyword..."
        disabled={c3Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">new</code> keyword creates an instance of a class.</p>
    {:else if c3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. This keyword tells C# to allocate memory and create a fresh instance of the class.</p>
    {/if}
  </div>

  {#if allDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All challenges complete!</p>
    </div>
  {/if}
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: C# Advanced</h2>
    <p class="text-slate-600">Test your knowledge of modern C# features and concepts.</p>
  </div>

  <!-- Advanced Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {adv1Result === 'correct' ? 'border-green-300 bg-green-50' : adv1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What C# keyword makes a method run without blocking the calling thread?
    </p>
    <pre class="code-block mb-3"><code>{@html `<span class="kw">public</span> <span class="op">???</span> <span class="fn">Task</span><span class="op">&lt;</span><span class="fn">string</span><span class="op">&gt;</span> <span class="fn">GetDataAsync</span>()
{
    <span class="kw">var</span> <span class="var">data</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">httpClient</span>.<span class="fn">GetStringAsync</span>(<span class="var">url</span>);
    <span class="kw">return</span> <span class="var">data</span>;
}`}</code></pre>
    <p class="mb-3 text-sm text-slate-500">Hint: This keyword is paired with <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">await</code>.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv1Answer}
        placeholder="Type the keyword..."
        disabled={adv1Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv1Result !== 'correct'}
        <button onclick={checkAdv1} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">async</code> keyword enables asynchronous execution, allowing the method to use <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">await</code> for non-blocking operations.</p>
    {:else if adv1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. This keyword goes before the return type and enables the use of <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">await</code> inside the method.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {adv2Result === 'correct' ? 'border-green-300 bg-green-50' : adv2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What C# feature lets you query collections like a database?
    </p>
    <pre class="code-block mb-3"><code>{@html `<span class="kw">var</span> <span class="var">adults</span> <span class="op">=</span> <span class="var">people</span>.<span class="fn">Where</span>(<span class="var">p</span> <span class="op">=&gt;</span> <span class="var">p</span>.<span class="var">Age</span> <span class="op">&gt;=</span> <span class="num">18</span>)
                  .<span class="fn">OrderBy</span>(<span class="var">p</span> <span class="op">=&gt;</span> <span class="var">p</span>.<span class="var">Name</span>)
                  .<span class="fn">ToList</span>();`}</code></pre>
    <p class="mb-3 text-sm text-slate-500">Hint: It stands for "Language Integrated Query".</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv2Answer}
        placeholder="Type the feature name..."
        disabled={adv2Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv2Result !== 'correct'}
        <button onclick={checkAdv2} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! LINQ (Language Integrated Query) provides a unified syntax for querying any data source: arrays, lists, databases, XML, and more.</p>
    {:else if adv2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about the acronym for "Language Integrated Query".</p>
    {/if}
  </div>

  <!-- Advanced Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {adv3Result === 'correct' ? 'border-green-300 bg-green-50' : adv3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What C# type is an immutable reference type introduced in C# 9?
    </p>
    <pre class="code-block mb-3"><code>{@html `<span class="kw">public</span> <span class="op">???</span> <span class="fn">Person</span>(<span class="fn">string</span> <span class="var">Name</span>, <span class="fn">int</span> <span class="var">Age</span>);

<span class="kw">var</span> <span class="var">alice</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">Person</span>(<span class="str">"Alice"</span>, <span class="num">30</span>);
<span class="kw">var</span> <span class="var">bob</span> <span class="op">=</span> <span class="var">alice</span> <span class="kw">with</span> { <span class="var">Name</span> <span class="op">=</span> <span class="str">"Bob"</span> };`}</code></pre>
    <p class="mb-3 text-sm text-slate-500">Hint: It provides value-based equality and the <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">with</code> expression for non-destructive mutation.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv3Answer}
        placeholder="Type the keyword..."
        disabled={adv3Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv3Result !== 'correct'}
        <button onclick={checkAdv3} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">record</code> types are immutable reference types with value-based equality, perfect for representing data.</p>
    {:else if adv3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. This keyword declares a type that is immutable by default and uses value-based equality instead of reference equality.</p>
    {/if}
  </div>

  {#if advAllDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All advanced challenges complete!</p>
    </div>
  {/if}
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
