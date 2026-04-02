<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: (score: number) => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode ===
  let b1 = $state('');
  let b1Result = $state<'correct' | 'wrong' | null>(null);
  let b2 = $state('');
  let b2Result = $state<'correct' | 'wrong' | null>(null);
  let b3 = $state('');
  let b3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(b1Result === 'correct' && b2Result === 'correct' && b3Result === 'correct');

  function checkB1() {
    const a = b1.trim().toLowerCase();
    b1Result = (a === 'act') ? 'correct' : 'wrong';
  }
  function checkB2() {
    const a = b2.trim().toLowerCase();
    b2Result = (a === 'expected' || a === 'the expected value' || a === 'expected value') ? 'correct' : 'wrong';
  }
  function checkB3() {
    const a = b3.trim().toLowerCase();
    b3Result = (a === 'unit test' || a === 'unit' || a === 'a unit test') ? 'correct' : 'wrong';
  }

  function handleComplete() {
    const score = [b1Result, b2Result, b3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (allDone) handleComplete();
  });

  // === Advanced mode ===
  let a1 = $state('');
  let a1Result = $state<'correct' | 'wrong' | null>(null);
  let a2 = $state('');
  let a2Result = $state<'correct' | 'wrong' | null>(null);
  let a3 = $state('');
  let a3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(a1Result === 'correct' && a2Result === 'correct' && a3Result === 'correct');

  function checkA1() {
    const a = a1.trim().toLowerCase();
    a1Result = (a === 'spy' || a === 'a spy') ? 'correct' : 'wrong';
  }
  function checkA2() {
    const a = a2.trim().toLowerCase().replace(/[\s-]+/g, '');
    a2Result = (a === 'tdd' || a === 'testdrivendevelopment') ? 'correct' : 'wrong';
  }
  function checkA3() {
    const a = a3.trim().toLowerCase().replace(/\s+/g, ' ');
    a3Result = (a === 'coverage' || a === 'code coverage' || a === 'test coverage') ? 'correct' : 'wrong';
  }

  function handleAdvComplete() {
    const score = [a1Result, a2Result, a3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (advAllDone) handleAdvComplete();
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Unit Testing Basics</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section.</p>
  </div>

  <!-- Question 1 -->
  <div class="rounded-xl border-2 p-5 transition-colors {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'}">
    <p class="mb-1 font-semibold text-slate-800">
      1. In the Arrange-Act-Assert pattern, which step calls the function being tested?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: One of the three A's -- the step where you actually invoke the code.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={b1}
        placeholder="Type your answer..."
        disabled={b1Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB1(); }}
      />
      {#if b1Result !== 'correct'}
        <button onclick={checkB1} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if b1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The <strong>Act</strong> step is where you call the function under test. Arrange sets things up, and Assert checks the result.</p>
    {:else if b1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about the three steps: setting up, doing, and checking. Which one is the "doing" step?</p>
    {/if}
  </div>

  <!-- Question 2 -->
  <div class="rounded-xl border-2 p-5 transition-colors {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'}">
    <p class="mb-1 font-semibold text-slate-800">
      2. What do you call the value a test expects to get back?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It is the value you predict before running the test, the opposite of "actual".</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={b2}
        placeholder="Type your answer..."
        disabled={b2Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB2(); }}
      />
      {#if b2Result !== 'correct'}
        <button onclick={checkB2} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if b2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The <strong>expected</strong> value is what you predict the function will return. The test compares it against the actual result.</p>
    {:else if b2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. When you write a test, what do you "expect" to happen? The _____ value versus the actual value.</p>
    {/if}
  </div>

  <!-- Question 3 -->
  <div class="rounded-xl border-2 p-5 transition-colors {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'}">
    <p class="mb-1 font-semibold text-slate-800">
      3. What's the name for a test that checks just one function in isolation?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It is the topic of this entire section!</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={b3}
        placeholder="Type your answer..."
        disabled={b3Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB3(); }}
      />
      {#if b3Result !== 'correct'}
        <button onclick={checkB3} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if b3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! A <strong>unit test</strong> checks a single piece of code in isolation -- one function, one method, one component at a time.</p>
    {:else if b3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. The clue is in the name of what we have been studying. A _____ test checks a single "unit" of code.</p>
    {/if}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You understand the fundamentals of unit testing.</p>
    </div>
  {/if}
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Unit Testing</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section.</p>
  </div>

  <!-- Advanced Question 1 -->
  <div class="rounded-xl border-2 p-5 transition-colors {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'}">
    <p class="mb-1 font-semibold text-slate-800">
      1. What test double records how it was called but doesn't change behavior?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It watches the real function run and takes notes, like a secret agent observing from a distance.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={a1}
        placeholder="Type your answer..."
        disabled={a1Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA1(); }}
      />
      {#if a1Result !== 'correct'}
        <button onclick={checkA1} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if a1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! A <strong>spy</strong> wraps the real function, lets it run normally, but records all calls so you can inspect them afterward.</p>
    {:else if a1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about what a "secret agent" does -- they observe without interfering. What is another word for that?</p>
    {/if}
  </div>

  <!-- Advanced Question 2 -->
  <div class="rounded-xl border-2 p-5 transition-colors {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'}">
    <p class="mb-1 font-semibold text-slate-800">
      2. What development approach writes tests before writing code?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It follows a Red-Green-Refactor cycle and its name is a three-letter abbreviation.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={a2}
        placeholder="Type your answer..."
        disabled={a2Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA2(); }}
      />
      {#if a2Result !== 'correct'}
        <button onclick={checkA2} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if a2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <strong>TDD</strong> (Test-Driven Development) means writing a failing test first, then writing the minimum code to pass it, then refactoring.</p>
    {:else if a2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. It stands for Test-Driven Development. What is the abbreviation?</p>
    {/if}
  </div>

  <!-- Advanced Question 3 -->
  <div class="rounded-xl border-2 p-5 transition-colors {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'}">
    <p class="mb-1 font-semibold text-slate-800">
      3. What metric measures how much code is executed by tests?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It is reported as a percentage of lines, branches, or functions that tests exercise.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={a3}
        placeholder="Type your answer..."
        disabled={a3Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA3(); }}
      />
      {#if a3Result !== 'correct'}
        <button onclick={checkA3} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if a3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <strong>Coverage</strong> (or code coverage) measures what percentage of your codebase is exercised during tests. High coverage is good, but does not guarantee good assertions.</p>
    {:else if a3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. What "coverage" do your tests provide? How much of the code do they _____ ?</p>
    {/if}
  </div>

  {#if advAllDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You have strong knowledge of advanced unit testing concepts.</p>
    </div>
  {/if}
</div>
{/if}
