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
    const a = b1Answer.trim().toLowerCase().replace(/\s+/g, ' ');
    b1Result = (a === 'arrange act assert' || a === 'arrange, act, assert') ? 'correct' : 'wrong';
  }

  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    b2Result = (a === 'expect') ? 'correct' : 'wrong';
  }

  function checkB3() {
    const a = b3Answer.trim().toLowerCase();
    b3Result = (a === 'one' || a === '1') ? 'correct' : 'wrong';
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
    const a = a1Answer.trim().toLowerCase().replace(/\s+/g, ' ');
    a1Result = (a === 'mock' || a === 'a mock' || a === 'mocks' || a === 'test double' || a === 'stub') ? 'correct' : 'wrong';
  }

  function checkA2() {
    const a = a2Answer.trim().toLowerCase().replace(/\s+/g, ' ');
    a2Result = (a === 'code coverage' || a === 'coverage' || a === 'test coverage') ? 'correct' : 'wrong';
  }

  function checkA3() {
    const a = a3Answer.trim().toLowerCase().replace(/\s+/g, ' ');
    a3Result = (a === 'mutation testing' || a === 'mutation') ? 'correct' : 'wrong';
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

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Unit Testing Basics</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section.</p>
  </div>

  <!-- Question 1 -->
  <div class="rounded-xl border-2 {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What does AAA stand for in testing?</p>
    <p class="text-sm text-slate-500">Hint: Three steps that structure every good test case.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b1Answer}
        placeholder="Your answer..."
        disabled={b1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB1(); }}
      />
      <button
        onclick={checkB1}
        disabled={b1Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b1Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Arrange sets up the data, Act calls the function, Assert checks the result.</p>
    {:else if b1Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think of three words starting with A: set up, do something, check the result. Try again!</p>
    {/if}
  </div>

  <!-- Question 2 -->
  <div class="rounded-xl border-2 {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What function checks if a value matches what you predicted?</p>
    <p class="text-sm text-slate-500">Hint: You call this function and then chain matchers like <code class="rounded bg-slate-100 px-1 text-green-700">.toBe()</code> on it.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b2Answer}
        placeholder="Your answer..."
        disabled={b2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB2(); }}
      />
      <button
        onclick={checkB2}
        disabled={b2Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b2Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! <code class="rounded bg-slate-100 px-1 text-green-700">expect(value)</code> returns an object with matchers like <code class="rounded bg-slate-100 px-1 text-green-700">.toBe()</code>, <code class="rounded bg-slate-100 px-1 text-green-700">.toEqual()</code>, and more.</p>
    {:else if b2Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. What do you "expect" to happen? Try again!</p>
    {/if}
  </div>

  <!-- Question 3 -->
  <div class="rounded-xl border-2 {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. Unit tests should test how many things at once?</p>
    <p class="text-sm text-slate-500">Hint: The "unit" in unit test means a single, isolated piece of functionality.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b3Answer}
        placeholder="Your answer..."
        disabled={b3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB3(); }}
      />
      <button
        onclick={checkB3}
        disabled={b3Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b3Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Each unit test should focus on one thing. If it fails, you know exactly what broke.</p>
    {:else if b3Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about what "unit" means -- the smallest possible piece. Try again!</p>
    {/if}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You understand the fundamentals of unit testing.</p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Unit Testing</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section.</p>
  </div>

  <!-- Advanced Question 1 -->
  <div class="rounded-xl border-2 {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What replaces a real dependency with a fake in testing?</p>
    <p class="text-sm text-slate-500">Hint: It is a test double that can record how it was called and return predetermined values.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a1Answer}
        placeholder="Your answer..."
        disabled={a1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA1(); }}
      />
      <button
        onclick={checkA1}
        disabled={a1Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a1Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Mocks (and stubs) replace real dependencies so you can test in isolation without network calls or database queries.</p>
    {:else if a1Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about what you "mock" in tests to avoid real side effects. Try again!</p>
    {/if}
  </div>

  <!-- Advanced Question 2 -->
  <div class="rounded-xl border-2 {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What measures how much code your tests cover?</p>
    <p class="text-sm text-slate-500">Hint: It is reported as a percentage of lines, branches, or functions exercised by tests.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a2Answer}
        placeholder="Your answer..."
        disabled={a2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA2(); }}
      />
      <button
        onclick={checkA2}
        disabled={a2Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a2Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Code coverage shows what percentage of your codebase is exercised during tests, though high coverage does not guarantee good tests.</p>
    {:else if a2Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. What "coverage" do tests provide over your code? Try again!</p>
    {/if}
  </div>

  <!-- Advanced Question 3 -->
  <div class="rounded-xl border-2 {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What testing technique changes code to check if tests catch it?</p>
    <p class="text-sm text-slate-500">Hint: Tools like Stryker "mutate" your source code and see if tests fail.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a3Answer}
        placeholder="Your answer..."
        disabled={a3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA3(); }}
      />
      <button
        onclick={checkA3}
        disabled={a3Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a3Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Mutation testing introduces small changes to your code to verify that your tests actually detect bugs.</p>
    {:else if a3Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. What kind of "mutations" does the tool introduce to test your tests? Try again!</p>
    {/if}
  </div>

  {#if advAllDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You have strong knowledge of advanced unit testing concepts.</p>
    </div>
  {/if}

  {/if}
</div>
