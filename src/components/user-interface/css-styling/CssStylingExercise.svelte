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

  // === Basic mode ===
  let q1 = $state('');
  let q1Result = $state<'correct' | 'wrong' | null>(null);

  let q2 = $state('');
  let q2Result = $state<'correct' | 'wrong' | null>(null);

  let q3 = $state('');
  let q3Result = $state<'correct' | 'wrong' | null>(null);

  let q4 = $state('');
  let q4Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(q1Result === 'correct' && q2Result === 'correct' && q3Result === 'correct' && q4Result === 'correct');

  // Q1: Box model order (outside to inside)
  function checkQ1() {
    const a = q1.trim().toLowerCase().replace(/,/g, '').replace(/\s+/g, ' ');
    q1Result = (a === 'margin border padding content') ? 'correct' : 'wrong';
  }

  // Q2: How to change text color
  function checkQ2() {
    const a = q2.trim().toLowerCase().replace(/[;:{}]/g, '').trim();
    q2Result = (a === 'color' || a === 'the color property' || a === 'color property') ? 'correct' : 'wrong';
  }

  // Q3: What padding does
  function checkQ3() {
    const a = q3.trim().toLowerCase();
    q3Result = (a.includes('space') && (a.includes('inside') || a.includes('content') || a.includes('between') || a.includes('within') || a.includes('border'))) ? 'correct' : 'wrong';
  }

  // Q4: Class vs ID
  function checkQ4() {
    const a = q4.trim().toLowerCase();
    q4Result = (a.includes('multiple') || a.includes('many') || a.includes('reuse') || a.includes('several') || a.includes('more than one') || a.includes('any number')) ? 'correct' : 'wrong';
  }

  function handleComplete() {
    const score = [q1Result, q2Result, q3Result, q4Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (allDone) {
      handleComplete();
    }
  });

  // === Advanced mode ===
  let adv1 = $state('');
  let adv1Result = $state<'correct' | 'wrong' | null>(null);

  let adv2 = $state('');
  let adv2Result = $state<'correct' | 'wrong' | null>(null);

  let adv3 = $state('');
  let adv3Result = $state<'correct' | 'wrong' | null>(null);

  let adv4 = $state('');
  let adv4Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(adv1Result === 'correct' && adv2Result === 'correct' && adv3Result === 'correct' && adv4Result === 'correct');

  // Adv Q1: What does display: flex do?
  function checkAdv1() {
    const a = adv1.trim().toLowerCase();
    adv1Result = (a.includes('flex') && (a.includes('container') || a.includes('layout') || a.includes('row') || a.includes('column') || a.includes('one-dimensional') || a.includes('items'))) ? 'correct' : 'wrong';
  }

  // Adv Q2: Specificity - which wins: .card or #header?
  function checkAdv2() {
    const a = adv2.trim().toLowerCase().replace(/[#.]/g, '');
    adv2Result = (a === 'id' || a === 'header' || a.includes('id selector') || a.includes('#header') || a === '#header') ? 'correct' : 'wrong';
  }

  // Adv Q3: How to declare a CSS custom property
  function checkAdv3() {
    const a = adv3.trim().toLowerCase();
    adv3Result = (a.includes('--')) ? 'correct' : 'wrong';
  }

  // Adv Q4: What does z-index control?
  function checkAdv4() {
    const a = adv4.trim().toLowerCase();
    adv4Result = (a.includes('stack') || a.includes('layer') || a.includes('overlap') || a.includes('front') || a.includes('behind') || a.includes('order') || a.includes('depth')) ? 'correct' : 'wrong';
  }

  function handleAdvComplete() {
    const score = [adv1Result, adv2Result, adv3Result, adv4Result].filter((r) => r === 'correct').length;
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: CSS Styling</h2>
    <p class="text-slate-600">Test your understanding of CSS basics!</p>
  </div>

  <!-- Question 1: Box model order -->
  <div class="rounded-xl border p-5 transition-colors {q1Result === 'correct' ? 'border-green-300 bg-green-50' : q1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What is the correct order of the CSS box model layers, from outside to inside?
    </p>
    <p class="mb-3 text-sm text-slate-500">Write all four layers separated by spaces.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={q1}
        placeholder="outer ... ... inner"
        disabled={q1Result === 'correct'}
        class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:opacity-50"
      />
      {#if q1Result !== 'correct'}
        <button onclick={checkQ1} class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if q1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Margin, border, padding, content -- from outside to inside.</p>
    {:else if q1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about what is furthest from the content and what is closest.</p>
    {/if}
  </div>

  <!-- Question 2: Change text color -->
  <div class="rounded-xl border p-5 transition-colors {q2Result === 'correct' ? 'border-green-300 bg-green-50' : q2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. Which CSS property changes the text color of an element?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: it is not called "text-color" or "font-color".</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={q2}
        placeholder="Property name..."
        disabled={q2Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:opacity-50"
      />
      {#if q2Result !== 'correct'}
        <button onclick={checkQ2} class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if q2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The <code class="rounded bg-slate-100 px-1 text-sky-700">color</code> property sets the text color.</p>
    {:else if q2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. The property name is simpler than you might think -- just one word.</p>
    {/if}
  </div>

  <!-- Question 3: What padding does -->
  <div class="rounded-xl border p-5 transition-colors {q3Result === 'correct' ? 'border-green-300 bg-green-50' : q3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What does the CSS <code class="rounded bg-slate-100 px-1 text-sky-700">padding</code> property do?
    </p>
    <p class="mb-3 text-sm text-slate-500">Describe its effect in a short sentence.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={q3}
        placeholder="It adds..."
        disabled={q3Result === 'correct'}
        class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:opacity-50"
      />
      {#if q3Result !== 'correct'}
        <button onclick={checkQ3} class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if q3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Padding adds space inside the element, between the content and the border.</p>
    {:else if q3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about where padding sits in the box model -- between what two layers?</p>
    {/if}
  </div>

  <!-- Question 4: Class vs ID -->
  <div class="rounded-xl border p-5 transition-colors {q4Result === 'correct' ? 'border-green-300 bg-green-50' : q4Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      4. A class selector (<code class="rounded bg-slate-100 px-1 text-sky-700">.card</code>) can be applied to how many elements, compared to an ID selector (<code class="rounded bg-slate-100 px-1 text-sky-700">#header</code>)?
    </p>
    <p class="mb-3 text-sm text-slate-500">How is a class different from an ID in terms of how many elements can use it?</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={q4}
        placeholder="A class can be used on..."
        disabled={q4Result === 'correct'}
        class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:opacity-50"
      />
      {#if q4Result !== 'correct'}
        <button onclick={checkQ4} class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if q4Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! A class can be applied to multiple elements, while an ID must be unique -- only one element per page.</p>
    {:else if q4Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about reusability -- can many elements share the same class?</p>
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: CSS Styling (Advanced)</h2>
    <p class="text-slate-600">Test your deeper knowledge of CSS layout, specificity, and modern features.</p>
  </div>

  <!-- Advanced Q1 -->
  <div class="rounded-xl border p-5 transition-colors {adv1Result === 'correct' ? 'border-green-300 bg-green-50' : adv1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What does <code class="rounded bg-slate-100 px-1 text-sky-700">display: flex</code> do to an element?
    </p>
    <p class="mb-3 text-sm text-slate-500">Describe the effect in a short sentence.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv1}
        placeholder="It makes the element..."
        disabled={adv1Result === 'correct'}
        class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv1Result !== 'correct'}
        <button onclick={checkAdv1} class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! It makes the element a flex container, laying out its children in a row or column.</p>
    {:else if adv1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about what it does to the element's children and how they are arranged.</p>
    {/if}
  </div>

  <!-- Advanced Q2 -->
  <div class="rounded-xl border p-5 transition-colors {adv2Result === 'correct' ? 'border-green-300 bg-green-50' : adv2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. Which selector has higher specificity: <code class="rounded bg-slate-100 px-1 text-sky-700">.card</code> or <code class="rounded bg-slate-100 px-1 text-sky-700">#header</code>?
    </p>
    <p class="mb-3 text-sm text-slate-500">Which one wins when both target the same element?</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv2}
        placeholder="The winner is..."
        disabled={adv2Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv2Result !== 'correct'}
        <button onclick={checkAdv2} class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The ID selector (#header) has higher specificity than a class selector (.card).</p>
    {:else if adv2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Remember the specificity hierarchy: ID selectors rank higher than class selectors.</p>
    {/if}
  </div>

  <!-- Advanced Q3 -->
  <div class="rounded-xl border p-5 transition-colors {adv3Result === 'correct' ? 'border-green-300 bg-green-50' : adv3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. How do you declare a CSS custom property (variable)?
    </p>
    <p class="mb-3 text-sm text-slate-500">What prefix is used before the variable name?</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv3}
        placeholder="e.g. --my-color: blue"
        disabled={adv3Result === 'correct'}
        class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv3Result !== 'correct'}
        <button onclick={checkAdv3} class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! CSS custom properties are declared with a double-dash prefix, e.g. <code class="rounded bg-slate-100 px-1 text-sky-700">--my-color: blue</code>.</p>
    {:else if adv3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. The prefix is two dashes before the variable name.</p>
    {/if}
  </div>

  <!-- Advanced Q4 -->
  <div class="rounded-xl border p-5 transition-colors {adv4Result === 'correct' ? 'border-green-300 bg-green-50' : adv4Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      4. What does the <code class="rounded bg-slate-100 px-1 text-sky-700">z-index</code> property control?
    </p>
    <p class="mb-3 text-sm text-slate-500">Think about what happens when elements overlap.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv4}
        placeholder="It controls..."
        disabled={adv4Result === 'correct'}
        class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv4Result !== 'correct'}
        <button onclick={checkAdv4} class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv4Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! z-index controls the stacking order -- which element appears in front when they overlap.</p>
    {:else if adv4Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about layers and which element sits on top of another.</p>
    {/if}
  </div>

  {#if advAllDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All advanced challenges complete!</p>
    </div>
  {/if}
</div>

{/if}
