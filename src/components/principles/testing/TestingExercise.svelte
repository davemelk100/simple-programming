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
    b1Result = (a === 'assertion' || a === 'an assertion' || a === 'assert') ? 'correct' : 'wrong';
  }

  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    b2Result = a === 'before' ? 'correct' : 'wrong';
  }

  function checkB3() {
    const a = b3Answer.trim().toLowerCase();
    b3Result = (a === 'unit test' || a === 'a unit test') ? 'correct' : 'wrong';
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
    a1Result = (a === 'test-driven development' || a === 'test driven development') ? 'correct' : 'wrong';
  }

  function checkA2() {
    const a = a2Answer.trim().toLowerCase().replace(/[,\-]/g, ' ').replace(/\s+/g, ' ').trim();
    a2Result = (a === 'red green refactor') ? 'correct' : 'wrong';
  }

  function checkA3() {
    const a = a3Answer.trim().toLowerCase();
    a3Result = (a === 'mock' || a === 'stub' || a === 'test double' || a === 'spy' || a === 'a mock' || a === 'a stub' || a === 'a test double' || a === 'a spy') ? 'correct' : 'wrong';
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Testing Your Code</h2>
    <p class="text-slate-600">Answer these questions to test what you've learned about testing!</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {b1Result === 'correct' ? 'border-green-400 bg-green-50' : b1Result === 'wrong' ? 'border-red-400 bg-red-50' : 'border-slate-200'}">
    <p class="mb-1 text-xs font-bold uppercase tracking-wider text-purple-600">Challenge 1</p>
    <p class="mb-3 font-semibold text-slate-800">What checks if a function's output matches what you expect?</p>
    <div class="flex items-center gap-3">
      <input
        type="text"
        bind:value={b1Answer}
        onkeydown={(e) => { if (e.key === 'Enter' && b1Answer.trim()) checkB1(); }}
        disabled={b1Result === 'correct'}
        class="w-48 rounded-lg border-2 border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none disabled:opacity-60"
        placeholder="Type your answer..."
      />
      <button
        onclick={checkB1}
        disabled={!b1Answer.trim() || b1Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-700 active:scale-95 disabled:opacity-40"
      >
        Check
      </button>
      {#if b1Result === 'correct'}
        <span class="text-lg text-green-600">&#10003;</span>
      {:else if b1Result === 'wrong'}
        <span class="text-lg text-red-600">&#10007;</span>
      {/if}
    </div>
    {#if b1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Hint: it starts with "assert..."</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {b2Result === 'correct' ? 'border-green-400 bg-green-50' : b2Result === 'wrong' ? 'border-red-400 bg-red-50' : 'border-slate-200'}">
    <p class="mb-1 text-xs font-bold uppercase tracking-wider text-purple-600">Challenge 2</p>
    <p class="mb-3 font-semibold text-slate-800">Should you test your code before or after shipping it?</p>
    <div class="flex items-center gap-3">
      <input
        type="text"
        bind:value={b2Answer}
        onkeydown={(e) => { if (e.key === 'Enter' && b2Answer.trim()) checkB2(); }}
        disabled={b2Result === 'correct'}
        class="w-48 rounded-lg border-2 border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none disabled:opacity-60"
        placeholder="before or after?"
      />
      <button
        onclick={checkB2}
        disabled={!b2Answer.trim() || b2Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-700 active:scale-95 disabled:opacity-40"
      >
        Check
      </button>
      {#if b2Result === 'correct'}
        <span class="text-lg text-green-600">&#10003;</span>
      {:else if b2Result === 'wrong'}
        <span class="text-lg text-red-600">&#10007;</span>
      {/if}
    </div>
    {#if b2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think about it: when is the best time to catch bugs?</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {b3Result === 'correct' ? 'border-green-400 bg-green-50' : b3Result === 'wrong' ? 'border-red-400 bg-red-50' : 'border-slate-200'}">
    <p class="mb-1 text-xs font-bold uppercase tracking-wider text-purple-600">Challenge 3</p>
    <p class="mb-3 font-semibold text-slate-800">What is a test that checks a single function called?</p>
    <div class="flex items-center gap-3">
      <input
        type="text"
        bind:value={b3Answer}
        onkeydown={(e) => { if (e.key === 'Enter' && b3Answer.trim()) checkB3(); }}
        disabled={b3Result === 'correct'}
        class="w-48 rounded-lg border-2 border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none disabled:opacity-60"
        placeholder="Type your answer..."
      />
      <button
        onclick={checkB3}
        disabled={!b3Answer.trim() || b3Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-700 active:scale-95 disabled:opacity-40"
      >
        Check
      </button>
      {#if b3Result === 'correct'}
        <span class="text-lg text-green-600">&#10003;</span>
      {:else if b3Result === 'wrong'}
        <span class="text-lg text-red-600">&#10007;</span>
      {/if}
    </div>
    {#if b3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Hint: it's a "_____ test" — testing one unit at a time.</p>
    {/if}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You know the basics of testing.</p>
    </div>
  {/if}
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Testing (Advanced)</h2>
    <p class="text-slate-600">Test your knowledge of professional testing concepts.</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {a1Result === 'correct' ? 'border-green-400 bg-green-50' : a1Result === 'wrong' ? 'border-red-400 bg-red-50' : 'border-slate-200'}">
    <p class="mb-1 text-xs font-bold uppercase tracking-wider text-purple-600">Challenge 1</p>
    <p class="mb-3 font-semibold text-slate-800">What does TDD stand for?</p>
    <div class="flex items-center gap-3">
      <input
        type="text"
        bind:value={a1Answer}
        onkeydown={(e) => { if (e.key === 'Enter' && a1Answer.trim()) checkA1(); }}
        disabled={a1Result === 'correct'}
        class="w-64 rounded-lg border-2 border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none disabled:opacity-60"
        placeholder="Type the full phrase..."
      />
      <button
        onclick={checkA1}
        disabled={!a1Answer.trim() || a1Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-700 active:scale-95 disabled:opacity-40"
      >
        Check
      </button>
      {#if a1Result === 'correct'}
        <span class="text-lg text-green-600">&#10003;</span>
      {:else if a1Result === 'wrong'}
        <span class="text-lg text-red-600">&#10007;</span>
      {/if}
    </div>
    {#if a1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Hint: T___-D_____ D___________</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {a2Result === 'correct' ? 'border-green-400 bg-green-50' : a2Result === 'wrong' ? 'border-red-400 bg-red-50' : 'border-slate-200'}">
    <p class="mb-1 text-xs font-bold uppercase tracking-wider text-purple-600">Challenge 2</p>
    <p class="mb-3 font-semibold text-slate-800">In TDD, what are the three steps?</p>
    <div class="flex items-center gap-3">
      <input
        type="text"
        bind:value={a2Answer}
        onkeydown={(e) => { if (e.key === 'Enter' && a2Answer.trim()) checkA2(); }}
        disabled={a2Result === 'correct'}
        class="w-64 rounded-lg border-2 border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none disabled:opacity-60"
        placeholder="step, step, step"
      />
      <button
        onclick={checkA2}
        disabled={!a2Answer.trim() || a2Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-700 active:scale-95 disabled:opacity-40"
      >
        Check
      </button>
      {#if a2Result === 'correct'}
        <span class="text-lg text-green-600">&#10003;</span>
      {:else if a2Result === 'wrong'}
        <span class="text-lg text-red-600">&#10007;</span>
      {/if}
    </div>
    {#if a2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Hint: Think of colors... then cleaning up.</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {a3Result === 'correct' ? 'border-green-400 bg-green-50' : a3Result === 'wrong' ? 'border-red-400 bg-red-50' : 'border-slate-200'}">
    <p class="mb-1 text-xs font-bold uppercase tracking-wider text-purple-600">Challenge 3</p>
    <p class="mb-3 font-semibold text-slate-800">What fake object replaces a real dependency in tests?</p>
    <div class="flex items-center gap-3">
      <input
        type="text"
        bind:value={a3Answer}
        onkeydown={(e) => { if (e.key === 'Enter' && a3Answer.trim()) checkA3(); }}
        disabled={a3Result === 'correct'}
        class="w-48 rounded-lg border-2 border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none disabled:opacity-60"
        placeholder="Type your answer..."
      />
      <button
        onclick={checkA3}
        disabled={!a3Answer.trim() || a3Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-700 active:scale-95 disabled:opacity-40"
      >
        Check
      </button>
      {#if a3Result === 'correct'}
        <span class="text-lg text-green-600">&#10003;</span>
      {:else if a3Result === 'wrong'}
        <span class="text-lg text-red-600">&#10007;</span>
      {/if}
    </div>
    {#if a3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Hint: It rhymes with "sock" or "tub"...</p>
    {/if}
  </div>

  {#if advAllDone}
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You've mastered advanced testing concepts.</p>
    </div>
  {/if}
</div>
{/if}
