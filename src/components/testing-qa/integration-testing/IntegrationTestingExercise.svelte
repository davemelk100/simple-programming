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
    const a = b1Answer.trim().toLowerCase();
    b1Result = (a === 'together') ? 'correct' : 'wrong';
  }

  function checkB2() {
    const a = b2Answer.trim().toLowerCase().replace(/\s+/g, ' ');
    b2Result = (a === 'unit' || a === 'unit tests' || a === 'unit test') ? 'correct' : 'wrong';
  }

  function checkB3() {
    const a = b3Answer.trim().toLowerCase().replace(/\s+/g, ' ');
    b3Result = (a === 'pyramid' || a === 'testing pyramid' || a === 'test pyramid') ? 'correct' : 'wrong';
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
    a1Result = (a === 'supertest' || a === 'super test') ? 'correct' : 'wrong';
  }

  function checkA2() {
    const a = a2Answer.trim().toLowerCase().replace(/\s+/g, ' ');
    a2Result = (a === 'contract testing' || a === 'contract test' || a === 'contract tests' || a === 'pact') ? 'correct' : 'wrong';
  }

  function checkA3() {
    const a = a3Answer.trim().toLowerCase().replace(/\s+/g, ' ');
    a3Result = (a === 'fixtures' || a === 'factories' || a === 'test fixtures' || a === 'test factories' || a === 'fixture') ? 'correct' : 'wrong';
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Integration Testing Basics</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section.</p>
  </div>

  <!-- Question 1 -->
  <div class="rounded-xl border-2 {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-blue-200 bg-blue-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. Integration tests check how parts work ___.</p>
    <p class="text-sm text-slate-500">Hint: The opposite of "in isolation."</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b1Answer}
        placeholder="Your answer..."
        disabled={b1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-blue-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB1(); }}
      />
      <button
        onclick={checkB1}
        disabled={b1Result === 'correct'}
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b1Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Integration tests verify that multiple components work together as expected.</p>
    {:else if b1Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Integration means combining parts. What do they do when combined? Try again!</p>
    {/if}
  </div>

  <!-- Question 2 -->
  <div class="rounded-xl border-2 {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-blue-200 bg-blue-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. Should you have more unit tests or integration tests?</p>
    <p class="text-sm text-slate-500">Hint: Think about the testing pyramid -- which type forms the wide base?</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b2Answer}
        placeholder="Your answer..."
        disabled={b2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-blue-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB2(); }}
      />
      <button
        onclick={checkB2}
        disabled={b2Result === 'correct'}
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b2Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Unit tests are fast, cheap, and plentiful. They form the wide base of the testing pyramid.</p>
    {:else if b2Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Which type of test is faster and cheaper to write? You want more of those. Try again!</p>
    {/if}
  </div>

  <!-- Question 3 -->
  <div class="rounded-xl border-2 {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-blue-200 bg-blue-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What shape describes the ideal test distribution?</p>
    <p class="text-sm text-slate-500">Hint: Wider at the bottom (many unit tests), narrower at the top (few E2E tests).</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b3Answer}
        placeholder="Your answer..."
        disabled={b3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-blue-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB3(); }}
      />
      <button
        onclick={checkB3}
        disabled={b3Result === 'correct'}
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b3Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! The testing pyramid has many unit tests at the base, fewer integration tests in the middle, and even fewer E2E tests at the top.</p>
    {:else if b3Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think of a geometric shape that is wide at the bottom and narrow at the top. Try again!</p>
    {/if}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You understand the fundamentals of integration testing.</p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Integration Testing</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section.</p>
  </div>

  <!-- Advanced Question 1 -->
  <div class="rounded-xl border-2 {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-blue-200 bg-blue-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What library tests Express routes without starting a server?</p>
    <p class="text-sm text-slate-500">Hint: It is the most popular library for testing Node.js HTTP endpoints in-process.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a1Answer}
        placeholder="Your answer..."
        disabled={a1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-blue-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA1(); }}
      />
      <button
        onclick={checkA1}
        disabled={a1Result === 'correct'}
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a1Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Supertest creates an in-process HTTP server so you can test Express routes without binding to a port.</p>
    {:else if a1Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. It is a "super" way to "test" HTTP endpoints. Try again!</p>
    {/if}
  </div>

  <!-- Advanced Question 2 -->
  <div class="rounded-xl border-2 {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-blue-200 bg-blue-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What ensures two services agree on an API format?</p>
    <p class="text-sm text-slate-500">Hint: Both the consumer and provider verify against an agreed-upon specification.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a2Answer}
        placeholder="Your answer..."
        disabled={a2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-blue-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA2(); }}
      />
      <button
        onclick={checkA2}
        disabled={a2Result === 'correct'}
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a2Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Contract testing (with tools like Pact) ensures the consumer and provider both honor the agreed API contract.</p>
    {:else if a2Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think of a legal "contract" between two services. Try again!</p>
    {/if}
  </div>

  <!-- Advanced Question 3 -->
  <div class="rounded-xl border-2 {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-blue-200 bg-blue-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What provides consistent test data for tests?</p>
    <p class="text-sm text-slate-500">Hint: Pre-defined data sets loaded before tests run, or functions that generate test objects.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a3Answer}
        placeholder="Your answer..."
        disabled={a3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-blue-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA3(); }}
      />
      <button
        onclick={checkA3}
        disabled={a3Result === 'correct'}
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a3Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Fixtures (and factories) provide consistent, predictable test data so your integration tests are reliable and repeatable.</p>
    {:else if a3Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think of something "fixed" in place -- pre-set data for tests. Try again!</p>
    {/if}
  </div>

  {#if advAllDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You have strong knowledge of advanced integration testing concepts.</p>
    </div>
  {/if}

  {/if}
</div>
