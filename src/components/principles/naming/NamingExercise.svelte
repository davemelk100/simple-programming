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

  // === Basic mode state ===
  // Challenge 1: multiple choice
  let c1Answer = $state<string | null>(null);
  let c1Result = $state<'correct' | 'wrong' | null>(null);

  // Challenge 2: free text
  let c2Answer = $state('');
  let c2Result = $state<'correct' | 'wrong' | null>(null);

  // Challenge 3: multiple choice
  let c3Answer = $state<string | null>(null);
  let c3Result = $state<'correct' | 'wrong' | null>(null);

  function checkC1() {
    c1Result = c1Answer === 'age' ? 'correct' : 'wrong';
  }

  function checkC2() {
    const answer = c2Answer.trim().toLowerCase().replace(/\s+/g, '');
    const accepted = ['calculatetax', 'calculate_tax', 'computetax', 'gettax', 'calctax'];
    c2Result = accepted.includes(answer) ? 'correct' : 'wrong';
  }

  function checkC3() {
    c3Result = c3Answer === 'descriptive' ? 'correct' : 'wrong';
  }

  let allDone = $derived(c1Result === 'correct' && c2Result === 'correct' && c3Result === 'correct');

  function handleComplete() {
    const score = [c1Result, c2Result, c3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (allDone) {
      handleComplete();
    }
  });

  // === Advanced mode state ===
  let adv1Answer = $state('');
  let adv1Result = $state<'correct' | 'wrong' | null>(null);

  let adv2Answer = $state('');
  let adv2Result = $state<'correct' | 'wrong' | null>(null);

  let adv3Answer = $state('');
  let adv3Result = $state<'correct' | 'wrong' | null>(null);

  function checkAdv1() {
    const answer = adv1Answer.trim().toLowerCase().replace(/[\s-]/g, '');
    const accepted = ['camelcase'];
    adv1Result = accepted.includes(answer) ? 'correct' : 'wrong';
  }

  function checkAdv2() {
    const answer = adv2Answer.trim().toLowerCase().replace(/[\/\s]/g, '');
    const accepted = ['is', 'has', 'ishas', 'hasis'];
    adv2Result = accepted.includes(answer) ? 'correct' : 'wrong';
  }

  function checkAdv3() {
    const answer = adv3Answer.trim().toLowerCase();
    const accepted = ['constants', 'const', 'constant'];
    adv3Result = accepted.includes(answer) ? 'correct' : 'wrong';
  }

  let advAllDone = $derived(adv1Result === 'correct' && adv2Result === 'correct' && adv3Result === 'correct');

  function handleAdvComplete() {
    const score = [adv1Result, adv2Result, adv3Result].filter((r) => r === 'correct').length;
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Naming Things</h2>
    <p class="text-slate-600">Test your understanding of good naming practices. Get all three correct to complete this section.</p>
  </div>

  <!-- Challenge 1: Multiple choice -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-4 font-medium text-slate-800">
      1. Which is a better variable name for storing someone's age?
    </p>
    <div class="flex flex-wrap gap-3">
      <button
        onclick={() => { c1Answer = 'a'; if (c1Result === 'wrong') c1Result = null; }}
        disabled={c1Result === 'correct'}
        class="rounded-lg border-2 px-5 py-2.5 font-mono text-sm font-semibold transition-colors
          {c1Answer === 'a' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}
          disabled:opacity-50"
      >
        a
      </button>
      <button
        onclick={() => { c1Answer = 'age'; if (c1Result === 'wrong') c1Result = null; }}
        disabled={c1Result === 'correct'}
        class="rounded-lg border-2 px-5 py-2.5 font-mono text-sm font-semibold transition-colors
          {c1Answer === 'age' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}
          disabled:opacity-50"
      >
        age
      </button>
    </div>
    {#if c1Answer && c1Result !== 'correct'}
      <button onclick={checkC1} class="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
        Check
      </button>
    {/if}
    {#if c1Result === 'correct'}
      <p class="mt-3 text-sm font-medium text-green-600">Correct! <code class="rounded bg-slate-100 px-1 text-sm text-green-700">age</code> tells you exactly what the variable stores. <code class="rounded bg-slate-100 px-1 text-sm text-red-500">a</code> could mean anything.</p>
    {:else if c1Result === 'wrong'}
      <p class="mt-3 text-sm text-red-600">Not quite. Think about which name tells you what value is stored inside without any extra context.</p>
    {/if}
  </div>

  <!-- Challenge 2: Free text -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-4 font-medium text-slate-800">
      2. What should a function that calculates tax be named? Write a good function name.
    </p>
    <div class="flex flex-wrap items-center gap-3">
      <input
        type="text"
        bind:value={c2Answer}
        placeholder="Type a function name..."
        disabled={c2Result === 'correct'}
        class="w-56 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
        onkeydown={(e) => { if (e.key === 'Enter' && c2Answer.trim() && c2Result !== 'correct') checkC2(); }}
      />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} disabled={!c2Answer.trim()} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-40">
          Check
        </button>
      {/if}
    </div>
    {#if c2Result === 'correct'}
      <p class="mt-3 text-sm font-medium text-green-600">Correct! A clear verb-based name like <code class="rounded bg-slate-100 px-1 text-sm text-green-700">calculateTax</code> immediately communicates what the function does.</p>
    {:else if c2Result === 'wrong'}
      <p class="mt-3 text-sm text-red-600">Try a name that starts with a verb like "calculate" or "compute" followed by what it calculates. Accepted: calculateTax, calculate_tax, computeTax, getTax.</p>
    {/if}
  </div>

  <!-- Challenge 3: Multiple choice -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-4 font-medium text-slate-800">
      3. Should variable names generally be short or descriptive?
    </p>
    <div class="flex flex-wrap gap-3">
      <button
        onclick={() => { c3Answer = 'short'; if (c3Result === 'wrong') c3Result = null; }}
        disabled={c3Result === 'correct'}
        class="rounded-lg border-2 px-5 py-2.5 text-sm font-semibold transition-colors
          {c3Answer === 'short' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}
          disabled:opacity-50"
      >
        Short
      </button>
      <button
        onclick={() => { c3Answer = 'descriptive'; if (c3Result === 'wrong') c3Result = null; }}
        disabled={c3Result === 'correct'}
        class="rounded-lg border-2 px-5 py-2.5 text-sm font-semibold transition-colors
          {c3Answer === 'descriptive' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}
          disabled:opacity-50"
      >
        Descriptive
      </button>
    </div>
    {#if c3Answer && c3Result !== 'correct'}
      <button onclick={checkC3} class="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
        Check
      </button>
    {/if}
    {#if c3Result === 'correct'}
      <p class="mt-3 text-sm font-medium text-green-600">Correct! Descriptive names make code self-documenting. The few extra characters you type are worth the hours of clarity they provide to every reader.</p>
    {:else if c3Result === 'wrong'}
      <p class="mt-3 text-sm text-red-600">Not quite. Remember: code is read far more often than it is written. Which approach helps readers understand your code?</p>
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Naming Things (Advanced)</h2>
    <p class="text-slate-600">Test your knowledge of naming conventions and patterns used by professional developers.</p>
  </div>

  <!-- Advanced Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {adv1Result === 'correct' ? 'border-green-300 bg-green-50' : adv1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">
      1. In JavaScript, what naming convention is standard for variables and functions?
    </p>
    <p class="mb-3 text-sm text-slate-500">Example: <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">getUserName</code>, <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">totalPrice</code></p>
    <div class="flex items-center gap-3">
      <input
        type="text"
        bind:value={adv1Answer}
        placeholder="Type the convention name..."
        disabled={adv1Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
        onkeydown={(e) => { if (e.key === 'Enter' && adv1Answer.trim() && adv1Result !== 'correct') checkAdv1(); }}
      />
      {#if adv1Result !== 'correct'}
        <button onclick={checkAdv1} disabled={!adv1Answer.trim()} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-40">
          Check
        </button>
      {/if}
    </div>
    {#if adv1Result === 'correct'}
      <p class="mt-3 text-sm font-medium text-green-600">Correct! <strong>camelCase</strong> is the standard JavaScript convention: first word lowercase, subsequent words capitalized. It is used for variables, functions, and object properties.</p>
    {:else if adv1Result === 'wrong'}
      <p class="mt-3 text-sm text-red-600">Look at the examples. The first word starts with a lowercase letter, and each subsequent word starts with an uppercase letter. What is that convention called?</p>
    {/if}
  </div>

  <!-- Advanced Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {adv2Result === 'correct' ? 'border-green-300 bg-green-50' : adv2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">
      2. What prefix is commonly used for boolean variables?
    </p>
    <p class="mb-3 text-sm text-slate-500">Think about: <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">isActive</code>, <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">hasPermission</code>, <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">isVisible</code></p>
    <div class="flex items-center gap-3">
      <input
        type="text"
        bind:value={adv2Answer}
        placeholder="Type the prefix..."
        disabled={adv2Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
        onkeydown={(e) => { if (e.key === 'Enter' && adv2Answer.trim() && adv2Result !== 'correct') checkAdv2(); }}
      />
      {#if adv2Result !== 'correct'}
        <button onclick={checkAdv2} disabled={!adv2Answer.trim()} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-40">
          Check
        </button>
      {/if}
    </div>
    {#if adv2Result === 'correct'}
      <p class="mt-3 text-sm font-medium text-green-600">Correct! Prefixes like <strong>is</strong> and <strong>has</strong> make booleans read like yes/no questions: "Is it active?", "Has permission?". This is one of the most widely followed naming conventions.</p>
    {:else if adv2Result === 'wrong'}
      <p class="mt-3 text-sm text-red-600">Look at the examples above. What short word appears at the beginning of each boolean name? Accepted answers: is, has, or is/has.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {adv3Result === 'correct' ? 'border-green-300 bg-green-50' : adv3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">
      3. What kind of value uses the UPPER_SNAKE_CASE naming convention?
    </p>
    <p class="mb-3 text-sm text-slate-500">Example: <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">MAX_RETRIES</code>, <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">API_BASE_URL</code>, <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">DEFAULT_TIMEOUT</code></p>
    <div class="flex items-center gap-3">
      <input
        type="text"
        bind:value={adv3Answer}
        placeholder="Type the answer..."
        disabled={adv3Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
        onkeydown={(e) => { if (e.key === 'Enter' && adv3Answer.trim() && adv3Result !== 'correct') checkAdv3(); }}
      />
      {#if adv3Result !== 'correct'}
        <button onclick={checkAdv3} disabled={!adv3Answer.trim()} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-40">
          Check
        </button>
      {/if}
    </div>
    {#if adv3Result === 'correct'}
      <p class="mt-3 text-sm font-medium text-green-600">Correct! <strong>Constants</strong> use UPPER_SNAKE_CASE to signal that these values never change and are typically defined at the module level. The all-caps format makes them visually distinct from regular variables.</p>
    {:else if adv3Result === 'wrong'}
      <p class="mt-3 text-sm text-red-600">These are values that are set once and never change throughout the program. What do programmers call values that do not change?</p>
    {/if}
  </div>

  {#if advAllDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All advanced challenges complete!</p>
    </div>
  {/if}
</div>

{/if}
