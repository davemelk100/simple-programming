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
    const answer = b1Answer.trim().toLowerCase();
    b1Result = (answer === 'package.json' || answer === 'package json') ? 'correct' : 'wrong';
  }

  function checkB2() {
    b2Result = b2Answer.trim().toLowerCase() === 'src' ? 'correct' : 'wrong';
  }

  function checkB3() {
    const answer = b3Answer.trim().toLowerCase().replace(/\s+/g, ' ');
    const valid = [
      'npx create-next-app',
      'npx create-next-app@latest',
      'npx create next app',
      'create-next-app',
    ];
    b3Result = valid.includes(answer) ? 'correct' : 'wrong';
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
    const answer = a1Answer.trim().toLowerCase();
    const valid = ['turborepo', 'nx', 'lerna'];
    a1Result = valid.includes(answer) ? 'correct' : 'wrong';
  }

  function checkA2() {
    const answer = a2Answer.trim().toLowerCase();
    a2Result = (answer === 'tsconfig.json' || answer === 'tsconfig json' || answer === 'tsconfig') ? 'correct' : 'wrong';
  }

  function checkA3() {
    const answer = a3Answer.trim().toLowerCase().replace(/-/g, '');
    const valid = ['husky', 'lintstaged', 'lint staged'];
    a3Result = valid.includes(answer) ? 'correct' : 'wrong';
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Scaffold the Project</h2>
    <p class="text-slate-600">Test your knowledge of project structure and key files.</p>
  </div>

  <!-- Question 1 -->
  <div class="rounded-xl border p-5 transition-colors {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What file lists your project's dependencies?
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={b1Answer}
        placeholder="Filename"
        disabled={b1Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if b1Result !== 'correct'}
        <button onclick={checkB1} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if b1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! package.json is the heart of every Node.js project.</p>
    {:else if b1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Hint: It is a JSON file that lists packages and scripts. Its name starts with "package".</p>
    {/if}
  </div>

  <!-- Question 2 -->
  <div class="rounded-xl border p-5 transition-colors {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What folder typically holds your source code?
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={b2Answer}
        placeholder="Folder name"
        disabled={b2Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if b2Result !== 'correct'}
        <button onclick={checkB2} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if b2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The src/ folder is the conventional home for source code.</p>
    {:else if b2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">It is a 3-letter abbreviation for "source".</p>
    {/if}
  </div>

  <!-- Question 3 -->
  <div class="rounded-xl border p-5 transition-colors {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What command creates a new Next.js project?
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={b3Answer}
        placeholder="npx ..."
        disabled={b3Result === 'correct'}
        class="w-56 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if b3Result !== 'correct'}
        <button onclick={checkB3} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if b3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! npx create-next-app scaffolds a new Next.js project.</p>
    {:else if b3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Hint: It starts with "npx create-" followed by the framework name.</p>
    {/if}
  </div>

  {#if allDone}
    <p class="text-lg font-bold text-green-600">All challenges complete!</p>
  {/if}
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Scaffold the Project (Advanced)</h2>
    <p class="text-slate-600">Test your knowledge of monorepos, configuration, and developer tooling.</p>
  </div>

  <!-- Question 1 -->
  <div class="rounded-xl border p-5 transition-colors {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What tool manages multiple packages in one repository?
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={a1Answer}
        placeholder="Tool name"
        disabled={a1Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if a1Result !== 'correct'}
        <button onclick={checkA1} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if a1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! That is a popular monorepo management tool.</p>
    {:else if a1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think of tools like Turborepo, Nx, or Lerna.</p>
    {/if}
  </div>

  <!-- Question 2 -->
  <div class="rounded-xl border p-5 transition-colors {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What config file defines TypeScript compiler settings?
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={a2Answer}
        placeholder="Filename"
        disabled={a2Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if a2Result !== 'correct'}
        <button onclick={checkA2} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if a2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! tsconfig.json controls TypeScript compilation options.</p>
    {:else if a2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Hint: It starts with "ts" (short for TypeScript) and ends with "config.json".</p>
    {/if}
  </div>

  <!-- Question 3 -->
  <div class="rounded-xl border p-5 transition-colors {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What tool runs scripts before each git commit?
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={a3Answer}
        placeholder="Tool name"
        disabled={a3Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if a3Result !== 'correct'}
        <button onclick={checkA3} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if a3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! That tool sets up Git hooks to run scripts automatically.</p>
    {:else if a3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think of the tool named after sled dogs, or its companion "lint-staged".</p>
    {/if}
  </div>

  {#if advAllDone}
    <p class="text-lg font-bold text-green-600">All advanced challenges complete!</p>
  {/if}
</div>
{/if}
