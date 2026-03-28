<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  interface Props {
    oncomplete?: (score: number) => void;
  }
  let { oncomplete }: Props = $props();

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

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
    c1Result = ['browser', 'browsers', 'a browser', 'the browser'].includes(a) ? 'correct' : 'wrong';
  }

  function checkC2() {
    c2Result = c2Answer.trim() === ';' ? 'correct' : 'wrong';
  }

  function checkC3() {
    c3Result = c3Answer.trim().toLowerCase() === 'let' ? 'correct' : 'wrong';
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
    adv1Result = adv1Answer.trim().toLowerCase() === 'interface' ? 'correct' : 'wrong';
  }

  function checkAdv2() {
    const a = adv2Answer.trim().toLowerCase().replace(/['"]/g, '');
    adv2Result = a === 'object' ? 'correct' : 'wrong';
  }

  function checkAdv3() {
    adv3Result = adv3Answer.trim() === '?' ? 'correct' : 'wrong';
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: JavaScript Basics</h2>
    <p class="text-slate-600">Answer these three questions to test what you've learned!</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What does JavaScript run in?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: JavaScript was originally created for this application.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c1Answer}
        placeholder="Type your answer..."
        disabled={c1Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! JavaScript was built to run in web browsers.</p>
    {:else if c1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about where you view websites -- what application do you use?</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What symbol is used to end most statements in JavaScript?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It's a punctuation mark you see at the end of most lines of code.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c2Answer}
        placeholder="Type the symbol..."
        disabled={c2Result === 'correct'}
        class="w-24 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The semicolon <code class="rounded bg-green-100 px-1 text-sm text-green-800">;</code> marks the end of a statement.</p>
    {:else if c2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Look at the end of a line like <code class="rounded bg-red-100 px-1 text-sm">let x = 5;</code> -- what comes last?</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What keyword creates a variable that can be changed later?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It's not <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">const</code> (which is for values that stay the same).</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c3Answer}
        placeholder="Type the keyword..."
        disabled={c3Result === 'correct'}
        class="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-green-100 px-1 text-sm text-green-800">let</code> creates a variable you can reassign.</p>
    {:else if c3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. There are three ways to declare variables: <code class="text-sm">var</code>, <code class="text-sm">let</code>, and <code class="text-sm">const</code>. Which modern one allows changes?</p>
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: TypeScript (Advanced)</h2>
    <p class="text-slate-600">Test your knowledge of TypeScript's type system and JavaScript quirks.</p>
  </div>

  <!-- Advanced Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {adv1Result === 'correct' ? 'border-green-300 bg-green-50' : adv1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What TypeScript keyword defines the shape of an object?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It describes which properties an object must have, and their types.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv1Answer}
        placeholder="Type the keyword..."
        disabled={adv1Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv1Result !== 'correct'}
        <button onclick={checkAdv1} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-green-100 px-1 text-sm text-green-800">interface</code> defines the contract an object must satisfy.</p>
    {:else if adv1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about the keyword used in <code class="text-sm">___ User {'{'} name: string {'}'}</code>.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {adv2Result === 'correct' ? 'border-green-300 bg-green-50' : adv2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What does <code class="rounded bg-slate-100 px-1.5 py-0.5 text-blue-600">typeof null</code> return in JavaScript?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: This is one of JavaScript's most famous bugs, dating back to its very first implementation.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv2Answer}
        placeholder="Type the result..."
        disabled={adv2Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv2Result !== 'correct'}
        <button onclick={checkAdv2} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-green-100 px-1 text-sm text-green-800">typeof null</code> returns <code class="text-sm">"object"</code> -- a historical bug that can never be fixed because too much code depends on it.</p>
    {:else if adv2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not what you'd expect! <code class="text-sm">null</code> isn't categorized the way you might think. Try a different type name.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {adv3Result === 'correct' ? 'border-green-300 bg-green-50' : adv3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What symbol makes a TypeScript property optional?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: In <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">{'{ name: string; email_: string }'}</code>, what goes where the underscore is?</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv3Answer}
        placeholder="Type the symbol..."
        disabled={adv3Result === 'correct'}
        class="w-24 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv3Result !== 'correct'}
        <button onclick={checkAdv3} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The <code class="rounded bg-green-100 px-1 text-sm text-green-800">?</code> after a property name makes it optional: <code class="text-sm">email?: string</code>.</p>
    {:else if adv3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. It's a single character placed right after the property name, before the colon.</p>
    {/if}
  </div>

  {#if advAllDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All advanced challenges complete!</p>
    </div>
  {/if}
</div>

{/if}
