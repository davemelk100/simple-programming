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
    const a = c1Answer.trim().toLowerCase();
    c1Result = (a === 'print' || a === 'print()') ? 'correct' : 'wrong';
  }

  function checkC2() {
    const a = c2Answer.trim().toLowerCase();
    c2Result = ['indentation', 'indent', 'whitespace', 'spaces', 'tabs'].includes(a) ? 'correct' : 'wrong';
  }

  function checkC3() {
    const a = c3Answer.trim().toLowerCase();
    c3Result = a === 'def' ? 'correct' : 'wrong';
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
    const a = adv1Answer.trim();
    adv1Result = a === '[0, 1, 4, 9]' ? 'correct' : 'wrong';
  }

  function checkAdv2() {
    const a = adv2Answer.trim();
    adv2Result = a === '@' ? 'correct' : 'wrong';
  }

  function checkAdv3() {
    const a = adv3Answer.trim().toLowerCase();
    adv3Result = (a === "<class 'list'>" || a === 'list') ? 'correct' : 'wrong';
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Python Basics</h2>
    <p class="text-slate-600">Test what you've learned about Python fundamentals!</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What do you use to print text in Python?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It's the most common function you'll use as a beginner.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c1Answer}
        placeholder="Type the function name"
        disabled={c1Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
      />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-slate-100 px-1 text-sm text-green-700">print()</code> outputs text to the console.</p>
    {:else if c1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about what function displays output in Python.</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. Python uses ___ instead of curly braces to define code blocks.
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: This is what makes Python look so clean and readable.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c2Answer}
        placeholder="Fill in the blank"
        disabled={c2Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
      />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Python uses indentation (whitespace) to define code blocks, making structure visible at a glance.</p>
    {:else if c2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about what you use to "nest" code inside an if-statement or function in Python.</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What keyword defines a function in Python?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It's a short, three-letter keyword.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c3Answer}
        placeholder="Type the keyword"
        disabled={c3Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
      />
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-slate-100 px-1 text-sm text-green-700">def</code> is short for "define" and creates a function.</p>
    {:else if c3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. It's short for "define" -- what three letters would that be?</p>
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Python (Advanced)</h2>
    <p class="text-slate-600">Test your knowledge of Python's more powerful features.</p>
  </div>

  <!-- Advanced Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {adv1Result === 'correct' ? 'border-green-300 bg-green-50' : adv1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What is the output of <code class="rounded bg-slate-100 px-1 text-sm text-green-700">[x**2 for x in range(4)]</code>?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: <code class="rounded bg-slate-100 px-1 text-sm text-green-700">range(4)</code> produces 0, 1, 2, 3.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv1Answer}
        placeholder="Type the resulting list"
        disabled={adv1Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv1Result !== 'correct'}
        <button onclick={checkAdv1} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! 0**2=0, 1**2=1, 2**2=4, 3**2=9, giving <code class="rounded bg-slate-100 px-1 text-sm text-green-700">[0, 1, 4, 9]</code>.</p>
    {:else if adv1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Square each number from 0 to 3 and write the result as a Python list, e.g. [a, b, c, d].</p>
    {/if}
  </div>

  <!-- Advanced Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {adv2Result === 'correct' ? 'border-green-300 bg-green-50' : adv2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What symbol decorates a function in Python?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It goes on the line above the function definition.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv2Answer}
        placeholder="Type the symbol"
        disabled={adv2Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv2Result !== 'correct'}
        <button onclick={checkAdv2} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The <code class="rounded bg-slate-100 px-1 text-sm text-green-700">@</code> symbol is used for decorator syntax, e.g. <code class="rounded bg-slate-100 px-1 text-sm text-green-700">@property</code>.</p>
    {:else if adv2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about the "at" symbol and how decorators look in Python code.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {adv3Result === 'correct' ? 'border-green-300 bg-green-50' : adv3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What does <code class="rounded bg-slate-100 px-1 text-sm text-green-700">type([])</code> return?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: <code class="rounded bg-slate-100 px-1 text-sm text-green-700">[]</code> is an empty list literal.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv3Answer}
        placeholder="Type the return value"
        disabled={adv3Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv3Result !== 'correct'}
        <button onclick={checkAdv3} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-slate-100 px-1 text-sm text-green-700">type([])</code> returns <code class="rounded bg-slate-100 px-1 text-sm text-green-700">&lt;class 'list'&gt;</code>.</p>
    {:else if adv3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. An empty <code class="rounded bg-slate-100 px-1 text-sm text-green-700">[]</code> is still a list. What type would Python report?</p>
    {/if}
  </div>

  {#if advAllDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All advanced challenges complete!</p>
    </div>
  {/if}
</div>
{/if}
