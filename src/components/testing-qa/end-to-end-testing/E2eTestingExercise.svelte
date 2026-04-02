<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
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
    const a = b1Answer.trim().toLowerCase().replace(/[-_]/g, ' ');
    b1Result = (a === 'end to end' || a === 'end-to-end') ? 'correct' : 'wrong';
  }

  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    b2Result = (a === 'playwright') ? 'correct' : 'wrong';
  }

  function checkB3() {
    const a = b3Answer.trim().toLowerCase().replace(/[-_]/g, ' ');
    b3Result = (a === 'e2e' || a === 'end to end' || a === 'end-to-end' || a === 'e2e tests' || a === 'end to end tests') ? 'correct' : 'wrong';
  }

  function handleComplete() {
    oncomplete?.();
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
    const a = a1Answer.trim().toLowerCase().replace(/[-_]/g, ' ');
    a1Result = (a === 'page object' || a === 'page object model' || a === 'pom' || a === 'page object pattern') ? 'correct' : 'wrong';
  }

  function checkA2() {
    const a = a2Answer.trim().toLowerCase().replace(/[-_]/g, ' ');
    a2Result = (a === 'flaky' || a === 'flaky test' || a === 'flaky tests' || a === 'a flaky test') ? 'correct' : 'wrong';
  }

  function checkA3() {
    const a = a3Answer.trim().toLowerCase().replace(/[-_]/g, ' ');
    a3Result = (a === 'visual regression' || a === 'visual regression testing' || a === 'visual' || a === 'visual regression tests') ? 'correct' : 'wrong';
  }

  function handleAdvComplete() {
    oncomplete?.();
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: E2E Testing Basics</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section.</p>
  </div>

  <!-- Question 1 -->
  <div class="rounded-xl border-2 {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-purple-200 bg-purple-50'} p-5 space-y-3">
    <p class="mb-1 text-xs font-bold uppercase tracking-wider text-purple-600">Challenge 1</p>
    <p class="font-semibold text-slate-800">E2E stands for _____-to-_____.</p>
    <p class="text-sm text-slate-500">Hint: What does E2E stand for? Fill in the two words.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b1Answer}
        placeholder="Your answer..."
        disabled={b1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-purple-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB1(); }}
      />
      <button
        onclick={checkB1}
        disabled={b1Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b1Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! E2E stands for end-to-end -- testing the entire user journey from start to finish.</p>
    {:else if b1Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about what "E2E" abbreviates. What goes from one ___ to the other ___? Try again!</p>
    {/if}
  </div>

  <!-- Question 2 -->
  <div class="rounded-xl border-2 {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-purple-200 bg-purple-50'} p-5 space-y-3">
    <p class="mb-1 text-xs font-bold uppercase tracking-wider text-purple-600">Challenge 2</p>
    <p class="font-semibold text-slate-800">What popular testing tool was created by Microsoft for E2E testing?</p>
    <p class="text-sm text-slate-500">Hint: It supports Chrome, Firefox, and Safari, and is known for auto-waiting.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b2Answer}
        placeholder="Your answer..."
        disabled={b2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-purple-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB2(); }}
      />
      <button
        onclick={checkB2}
        disabled={b2Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b2Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Playwright was created by Microsoft and has become the go-to modern E2E testing tool.</p>
    {:else if b2Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. This tool was made by Microsoft and shares its name with a person who writes plays. Try again!</p>
    {/if}
  </div>

  <!-- Question 3 -->
  <div class="rounded-xl border-2 {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-purple-200 bg-purple-50'} p-5 space-y-3">
    <p class="mb-1 text-xs font-bold uppercase tracking-wider text-purple-600">Challenge 3</p>
    <p class="font-semibold text-slate-800">In the testing pyramid, which type of test is at the top (fewest tests)?</p>
    <p class="text-sm text-slate-500">Hint: The pyramid goes from many at the bottom to few at the top.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b3Answer}
        placeholder="Your answer..."
        disabled={b3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-purple-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB3(); }}
      />
      <button
        onclick={checkB3}
        disabled={b3Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b3Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! E2E tests are at the top of the pyramid -- you write the fewest of them because they are slowest and most expensive.</p>
    {:else if b3Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about which tests are the slowest and most expensive to run. Try again!</p>
    {/if}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You understand E2E testing fundamentals.</p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: E2E Testing (Advanced)</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section.</p>
  </div>

  <!-- Advanced Question 1 -->
  <div class="rounded-xl border-2 {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-purple-200 bg-purple-50'} p-5 space-y-3">
    <p class="mb-1 text-xs font-bold uppercase tracking-wider text-purple-600">Challenge 1</p>
    <p class="font-semibold text-slate-800">What design pattern encapsulates page interactions into reusable classes?</p>
    <p class="text-sm text-slate-500">Hint: Each page gets its own class with methods for user actions.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a1Answer}
        placeholder="Your answer..."
        disabled={a1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-purple-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA1(); }}
      />
      <button
        onclick={checkA1}
        disabled={a1Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a1Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! The Page Object Model (POM) pattern keeps selectors and actions organized in one place per page.</p>
    {:else if a1Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think: P___ O______ M_____. Each page gets its own object. Try again!</p>
    {/if}
  </div>

  <!-- Advanced Question 2 -->
  <div class="rounded-xl border-2 {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-purple-200 bg-purple-50'} p-5 space-y-3">
    <p class="mb-1 text-xs font-bold uppercase tracking-wider text-purple-600">Challenge 2</p>
    <p class="font-semibold text-slate-800">What do you call a test that sometimes passes and sometimes fails without code changes?</p>
    <p class="text-sm text-slate-500">Hint: These unreliable tests erode trust in your test suite.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a2Answer}
        placeholder="Your answer..."
        disabled={a2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-purple-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA2(); }}
      />
      <button
        onclick={checkA2}
        disabled={a2Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a2Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Flaky tests are the bane of E2E testing. Common causes include timing issues, shared state, and animations.</p>
    {:else if a2Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think of a word that means unreliable or inconsistent -- like a pastry that breaks apart. Try again!</p>
    {/if}
  </div>

  <!-- Advanced Question 3 -->
  <div class="rounded-xl border-2 {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-purple-200 bg-purple-50'} p-5 space-y-3">
    <p class="mb-1 text-xs font-bold uppercase tracking-wider text-purple-600">Challenge 3</p>
    <p class="font-semibold text-slate-800">What type of testing compares screenshots to detect UI changes?</p>
    <p class="text-sm text-slate-500">Hint: It catches pixel-level differences between test runs.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a3Answer}
        placeholder="Your answer..."
        disabled={a3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-purple-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA3(); }}
      />
      <button
        onclick={checkA3}
        disabled={a3Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a3Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Visual regression testing compares screenshots against a baseline to catch unintended UI changes.</p>
    {:else if a3Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. What kind of "regression" involves how something looks? Try again!</p>
    {/if}
  </div>

  {#if advAllDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You have mastered advanced E2E testing concepts.</p>
    </div>
  {/if}

  {/if}
</div>
