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
  let b1Answer = $state('');
  let b1Result = $state<'correct' | 'wrong' | null>(null);

  let b2Answer = $state('');
  let b2Result = $state<'correct' | 'wrong' | null>(null);

  let b3Answer = $state('');
  let b3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(b1Result === 'correct' && b2Result === 'correct' && b3Result === 'correct');

  function checkB1() {
    const a = b1Answer.trim().toLowerCase();
    b1Result = a === 'declarative' ? 'correct' : 'wrong';
  }

  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    b2Result = a === 'imperative' ? 'correct' : 'wrong';
  }

  function checkB3() {
    const a = b3Answer.trim().toLowerCase();
    const accepted = ['what', 'what, how', 'what,how', 'what how'];
    b3Result = accepted.includes(a) ? 'correct' : 'wrong';
  }

  function handleComplete() {
    const score = [b1Result, b2Result, b3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (allDone) {
      handleComplete();
    }
  });

  // === Advanced mode ===
  let a1Answer = $state('');
  let a1Result = $state<'correct' | 'wrong' | null>(null);

  let a2Answer = $state('');
  let a2Result = $state<'correct' | 'wrong' | null>(null);

  let a3Answer = $state('');
  let a3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(a1Result === 'correct' && a2Result === 'correct' && a3Result === 'correct');

  function checkA1() {
    const a = a1Answer.trim().toLowerCase();
    const accepted = [
      'map', 'filter', 'reduce',
      'map/filter/reduce', 'map, filter, reduce', 'map,filter,reduce',
      'filter/map/reduce', 'filter, map, reduce',
      'map/filter', 'map, filter', 'filter/map', 'filter, map',
      'map and filter', 'map and filter and reduce',
    ];
    a1Result = accepted.includes(a) ? 'correct' : 'wrong';
  }

  function checkA2() {
    const a = a2Answer.trim().toLowerCase();
    const accepted = [
      'terraform', 'docker', 'kubernetes', 'k8s',
      'docker compose', 'ansible', 'pulumi', 'cloudformation',
    ];
    a2Result = accepted.includes(a) ? 'correct' : 'wrong';
  }

  function checkA3() {
    const a = a3Answer.trim().toLowerCase();
    const accepted = [
      'jsx', 'components', 'virtual dom', 'state',
      'virtual-dom', 'vdom', 'component', 'declarative ui',
    ];
    a3Result = accepted.includes(a) ? 'correct' : 'wrong';
  }

  function handleAdvComplete() {
    const score = [a1Result, a2Result, a3Result].filter((r) => r === 'correct').length;
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Declarative vs. Imperative</h2>
    <p class="text-slate-600">Answer these questions to test your understanding of the two paradigms.</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. Is CSS declarative or imperative?
    </p>
    <p class="mb-3 text-sm text-slate-500">CSS describes WHAT styles to apply, not HOW to render pixels.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={b1Answer}
        placeholder="declarative or imperative?"
        disabled={b1Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none disabled:opacity-50"
      />
      {#if b1Result !== 'correct'}
        <button onclick={checkB1} class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if b1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! CSS is declarative — you describe the desired appearance, and the browser handles the rendering.</p>
    {:else if b1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about whether CSS tells the browser WHAT to display or HOW to paint each pixel.</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. A <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">for</code> loop is an example of ___ programming.
    </p>
    <p class="mb-3 text-sm text-slate-500">A for loop gives explicit step-by-step instructions.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={b2Answer}
        placeholder="Type your answer"
        disabled={b2Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none disabled:opacity-50"
      />
      {#if b2Result !== 'correct'}
        <button onclick={checkB2} class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if b2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! A for loop is imperative — it spells out exactly HOW to iterate step by step.</p>
    {:else if b2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think about it: does a for loop describe WHAT you want, or does it spell out HOW to do it?</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. SQL tells the database ___ to get, not ___ to get it.
    </p>
    <p class="mb-3 text-sm text-slate-500">Fill in the first blank. SQL is a declarative query language.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={b3Answer}
        placeholder="Type the first word"
        disabled={b3Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none disabled:opacity-50"
      />
      {#if b3Result !== 'correct'}
        <button onclick={checkB3} class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if b3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! SQL tells the database WHAT to get, not HOW to get it. The query optimizer handles the execution plan.</p>
    {:else if b3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">The answer rhymes with "hat." Declarative languages describe ___  you want.</p>
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Declarative vs. Imperative (Advanced)</h2>
    <p class="text-slate-600">Test your deeper knowledge of declarative patterns across different domains.</p>
  </div>

  <!-- Advanced Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What JavaScript array methods represent declarative style?
    </p>
    <p class="mb-3 text-sm text-slate-500">These methods describe WHAT transformation to apply without explicit loops.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={a1Answer}
        placeholder="e.g. map, filter, reduce"
        disabled={a1Result === 'correct'}
        class="w-56 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none disabled:opacity-50"
      />
      {#if a1Result !== 'correct'}
        <button onclick={checkA1} class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if a1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-green-100 px-1 text-sm text-green-800">map</code>, <code class="rounded bg-green-100 px-1 text-sm text-green-800">filter</code>, and <code class="rounded bg-green-100 px-1 text-sm text-green-800">reduce</code> let you describe data transformations without spelling out loop mechanics.</p>
    {:else if a1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think about the functional array methods that replace for loops. You can name one or all three.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What infrastructure tool uses declarative configuration to define cloud resources?
    </p>
    <p class="mb-3 text-sm text-slate-500">You describe the desired state, and the tool figures out the steps to get there.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={a2Answer}
        placeholder="Tool name"
        disabled={a2Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none disabled:opacity-50"
      />
      {#if a2Result !== 'correct'}
        <button onclick={checkA2} class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if a2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Tools like Terraform, Docker, and Kubernetes all use declarative configuration to manage infrastructure.</p>
    {:else if a2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think about Infrastructure as Code tools. Common ones include Terraform, Docker, and Kubernetes.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What React concept makes UI declarative?
    </p>
    <p class="mb-3 text-sm text-slate-500">Instead of imperatively manipulating the DOM, React uses this to let you describe what the UI should look like.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={a3Answer}
        placeholder="React concept"
        disabled={a3Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none disabled:opacity-50"
      />
      {#if a3Result !== 'correct'}
        <button onclick={checkA3} class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if a3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! JSX, components, and the virtual DOM all work together to make React's UI model declarative — you describe the desired UI state and React handles the DOM updates.</p>
    {:else if a3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think about what lets you write HTML-like syntax in JavaScript, or how React represents UI as reusable pieces. Accepted answers: JSX, components, virtual DOM, state.</p>
    {/if}
  </div>

  {#if advAllDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All advanced challenges complete!</p>
    </div>
  {/if}
</div>

{/if}
