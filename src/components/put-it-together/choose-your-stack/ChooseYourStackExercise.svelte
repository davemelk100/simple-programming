<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: (score: number) => void; }
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
    b1Result = b1Answer.trim().toLowerCase() === 'frontend' ? 'correct' : 'wrong';
  }

  function checkB2() {
    const answer = b2Answer.trim().toLowerCase().replace(/\./g, '').replace(/\s/g, '');
    const valid = ['nextjs', 'nuxt', 'nuxtjs', 'sveltekit', 'remix'];
    b2Result = valid.includes(answer) ? 'correct' : 'wrong';
  }

  function checkB3() {
    b3Result = b3Answer.trim().toLowerCase() === 'database' ? 'correct' : 'wrong';
  }

  function handleComplete() {
    const score = [b1Result, b2Result, b3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => { if (allDone) handleComplete(); });

  // === Advanced mode ===
  let a1Answer = $state('');
  let a1Result = $state<'correct' | 'wrong' | null>(null);

  let a2Answer = $state('');
  let a2Result = $state<'correct' | 'wrong' | null>(null);

  let a3Answer = $state('');
  let a3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(a1Result === 'correct' && a2Result === 'correct' && a3Result === 'correct');

  function checkA1() {
    a1Result = a1Answer.trim().toLowerCase() === 'serverless' ? 'correct' : 'wrong';
  }

  function checkA2() {
    const answer = a2Answer.trim().toLowerCase().replace(/[^a-z ]/g, '');
    const valid = ['javascript api markup', 'javascript apis markup'];
    a2Result = valid.includes(answer) ? 'correct' : 'wrong';
  }

  function checkA3() {
    const answer = a3Answer.trim().toLowerCase();
    a3Result = (answer === 'vercel' || answer === 'netlify') ? 'correct' : 'wrong';
  }

  function handleAdvComplete() {
    const score = [a1Result, a2Result, a3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => { if (advAllDone) handleAdvComplete(); });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Choose Your Stack</h2>
    <p class="text-slate-600">Test your understanding of the four stack layers.</p>
  </div>

  <!-- Question 1 -->
  <div class="rounded-xl border p-5 transition-colors {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What layer handles what the user sees?
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={b1Answer}
        placeholder="Type the layer name"
        disabled={b1Result === 'correct'}
        class="w-44 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if b1Result !== 'correct'}
        <button onclick={checkB1} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if b1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The frontend is what users see and interact with.</p>
    {:else if b1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about which layer is responsible for the visual interface.</p>
    {/if}
  </div>

  <!-- Question 2 -->
  <div class="rounded-xl border p-5 transition-colors {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. Name a popular JavaScript full-stack framework.
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={b2Answer}
        placeholder="e.g., Next.js"
        disabled={b2Result === 'correct'}
        class="w-44 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if b2Result !== 'correct'}
        <button onclick={checkB2} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if b2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! That is a popular full-stack JavaScript framework.</p>
    {:else if b2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Try one of: Next.js, Nuxt, SvelteKit, or Remix.</p>
    {/if}
  </div>

  <!-- Question 3 -->
  <div class="rounded-xl border p-5 transition-colors {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What layer stores your data permanently?
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={b3Answer}
        placeholder="Type the layer name"
        disabled={b3Result === 'correct'}
        class="w-44 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if b3Result !== 'correct'}
        <button onclick={checkB3} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if b3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The database layer stores data permanently.</p>
    {:else if b3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think about where data is saved so it persists even after the app restarts.</p>
    {/if}
  </div>

  {#if allDone}
    <p class="text-lg font-bold text-green-600">All challenges complete!</p>
  {/if}
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Choose Your Stack (Advanced)</h2>
    <p class="text-slate-600">Test your knowledge of modern architectures and deployment.</p>
  </div>

  <!-- Question 1 -->
  <div class="rounded-xl border p-5 transition-colors {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What architecture runs code only when triggered by a request?
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={a1Answer}
        placeholder="Type the architecture name"
        disabled={a1Result === 'correct'}
        class="w-44 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if a1Result !== 'correct'}
        <button onclick={checkA1} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if a1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Serverless functions run only when triggered, then shut down.</p>
    {:else if a1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think about the model where there is no always-running server -- code executes on demand.</p>
    {/if}
  </div>

  <!-- Question 2 -->
  <div class="rounded-xl border p-5 transition-colors {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What does JAM stand for in JAMstack?
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={a2Answer}
        placeholder="JavaScript ..."
        disabled={a2Result === 'correct'}
        class="w-56 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if a2Result !== 'correct'}
        <button onclick={checkA2} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if a2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! JAM = JavaScript, API, Markup.</p>
    {:else if a2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Hint: J = JavaScript, A = API(s), M = ?</p>
    {/if}
  </div>

  <!-- Question 3 -->
  <div class="rounded-xl border p-5 transition-colors {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. Name a deployment platform built specifically for frontend frameworks.
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={a3Answer}
        placeholder="Platform name"
        disabled={a3Result === 'correct'}
        class="w-44 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if a3Result !== 'correct'}
        <button onclick={checkA3} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if a3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! That platform specializes in deploying frontend and full-stack JavaScript apps.</p>
    {:else if a3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think of platforms that integrate tightly with Next.js, Nuxt, or SvelteKit (e.g., Vercel or Netlify).</p>
    {/if}
  </div>

  {#if advAllDone}
    <p class="text-lg font-bold text-green-600">All advanced challenges complete!</p>
  {/if}
</div>
{/if}
