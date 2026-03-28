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
    b1Result = b1Answer.trim().toLowerCase() === "don't repeat yourself" || b1Answer.trim().toLowerCase() === "dont repeat yourself"
      ? 'correct' : 'wrong';
  }

  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    const accepted = ['extract a function', 'make a function', 'create a function', 'function', 'extract'];
    b2Result = accepted.some((v) => a.includes(v)) ? 'correct' : 'wrong';
  }

  function checkB3() {
    const a = b3Answer.trim().toLowerCase();
    const accepted = ['all', 'all of them', 'every copy', 'multiple', 'every one', 'each one', 'all copies'];
    b3Result = accepted.some((v) => a.includes(v)) ? 'correct' : 'wrong';
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
    a1Result = a.includes('pragmatic programmer') ? 'correct' : 'wrong';
  }

  function checkA2() {
    const a = a2Answer.trim().toLowerCase();
    const accepted = ['three', '3', 'refactor after three', 'third time', 'refactor on the third copy', 'third', 'refactor on third'];
    a2Result = accepted.some((v) => a.includes(v)) ? 'correct' : 'wrong';
  }

  function checkA3() {
    const a = a3Answer.trim().toLowerCase();
    a3Result = a.includes('avoid hasty abstractions') ? 'correct' : 'wrong';
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: DRY Principle</h2>
    <p class="text-slate-600">Answer these questions to test your understanding of Don't Repeat Yourself.</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What does DRY stand for?
    </p>
    <div class="flex flex-wrap items-center gap-2">
      <input
        type="text"
        bind:value={b1Answer}
        placeholder="Type the full phrase"
        disabled={b1Result === 'correct'}
        class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none disabled:opacity-50"
      />
      {#if b1Result !== 'correct'}
        <button onclick={checkB1} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if b1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! DRY stands for "Don't Repeat Yourself."</p>
    {:else if b1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about what you should avoid doing with code. Hint: it is three words starting with D, R, Y.</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. If you find yourself copy-pasting code, what should you do instead?
    </p>
    <div class="flex flex-wrap items-center gap-2">
      <input
        type="text"
        bind:value={b2Answer}
        placeholder="Your answer"
        disabled={b2Result === 'correct'}
        class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none disabled:opacity-50"
      />
      {#if b2Result !== 'correct'}
        <button onclick={checkB2} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if b2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Extract the repeated logic into a reusable function.</p>
    {:else if b2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think about how you can write the logic once and reuse it. What do you create to hold reusable code?</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. If a bug exists in code that was copy-pasted to 5 places, how many places need fixing?
    </p>
    <div class="flex flex-wrap items-center gap-2">
      <input
        type="text"
        bind:value={b3Answer}
        placeholder="Your answer"
        disabled={b3Result === 'correct'}
        class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none disabled:opacity-50"
      />
      {#if b3Result !== 'correct'}
        <button onclick={checkB3} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if b3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! All 5 copies need fixing -- that is exactly why DRY matters. Miss one and the bug persists.</p>
    {:else if b3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">If the same buggy code exists in 5 places, you can not fix just one. Think about what that means.</p>
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: DRY (Advanced)</h2>
    <p class="text-slate-600">Test your deeper knowledge of DRY principles and their nuances.</p>
  </div>

  <!-- Advanced Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What book first introduced the DRY principle?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It was published in 1999 and is a classic software engineering text.</p>
    <div class="flex flex-wrap items-center gap-2">
      <input
        type="text"
        bind:value={a1Answer}
        placeholder="Book title"
        disabled={a1Result === 'correct'}
        class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none disabled:opacity-50"
      />
      {#if a1Result !== 'correct'}
        <button onclick={checkA1} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if a1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! "The Pragmatic Programmer" by Andy Hunt and Dave Thomas introduced DRY.</p>
    {:else if a1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think of a well-known book about practical software development advice. The authors are Andy Hunt and Dave Thomas.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What is the "Rule of Three" for duplication? When should you refactor?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: How many times should you see a pattern before extracting it?</p>
    <div class="flex flex-wrap items-center gap-2">
      <input
        type="text"
        bind:value={a2Answer}
        placeholder="Your answer"
        disabled={a2Result === 'correct'}
        class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none disabled:opacity-50"
      />
      {#if a2Result !== 'correct'}
        <button onclick={checkA2} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if a2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Refactor on the third occurrence. The first two times help you see the real pattern before abstracting.</p>
    {:else if a2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">The rule says to wait until you see the duplication a specific number of times. What number is in the name?</p>
    {/if}
  </div>

  <!-- Advanced Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What does AHA stand for in programming?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It is a counterpoint to overly zealous DRY, coined by Kent C. Dodds.</p>
    <div class="flex flex-wrap items-center gap-2">
      <input
        type="text"
        bind:value={a3Answer}
        placeholder="Full phrase"
        disabled={a3Result === 'correct'}
        class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none disabled:opacity-50"
      />
      {#if a3Result !== 'correct'}
        <button onclick={checkA3} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if a3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! AHA stands for "Avoid Hasty Abstractions" -- prefer duplication over the wrong abstraction.</p>
    {:else if a3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">It is about not creating abstractions too early. Each word starts with A, H, A respectively.</p>
    {/if}
  </div>

  {#if advAllDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All advanced challenges complete!</p>
    </div>
  {/if}
</div>
{/if}
