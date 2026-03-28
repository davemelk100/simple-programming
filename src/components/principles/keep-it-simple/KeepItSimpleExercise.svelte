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
    b1Result = (a === 'keep it simple, stupid' || a === 'keep it simple stupid' || a === 'keep it simple') ? 'correct' : 'wrong';
  }

  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    b2Result = a === 'no' ? 'correct' : 'wrong';
  }

  function checkB3() {
    const a = b3Answer.trim().toLowerCase();
    const valid = ['you', 'humans', 'people', 'developers', 'programmers'];
    b3Result = valid.includes(a) ? 'correct' : 'wrong';
  }

  function handleComplete() {
    const score = [b1Result, b2Result, b3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (allDone) handleComplete();
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
    a1Result = (a === 'yagni' || a === "you ain't gonna need it" || a === "you aint gonna need it") ? 'correct' : 'wrong';
  }

  function checkA2() {
    const a = a2Answer.trim().toLowerCase();
    a2Result = (a === 'cyclomatic complexity' || a === 'cyclomatic') ? 'correct' : 'wrong';
  }

  function checkA3() {
    const a = a3Answer.trim().toLowerCase();
    a3Result = (a === 'refactoring' || a === 'refactor') ? 'correct' : 'wrong';
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Keep It Simple</h2>
    <p class="text-slate-600">Answer these three questions to test your understanding of the KISS principle.</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200'}">
    <h3 class="mb-2 font-semibold text-slate-800">Challenge 1</h3>
    <p class="mb-3 text-slate-600">What does KISS stand for?</p>
    <div class="flex gap-3">
      <input
        type="text"
        bind:value={b1Answer}
        placeholder="Type your answer..."
        disabled={b1Result === 'correct'}
        class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
        onkeydown={(e) => { if (e.key === 'Enter') checkB1(); }}
      />
      <button
        onclick={checkB1}
        disabled={b1Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b1Result === 'correct'}
      <p class="mt-2 text-sm text-green-700">Correct! KISS = "Keep It Simple, Stupid" — a reminder to avoid unnecessary complexity.</p>
    {:else if b1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Hint: it's a well-known acronym that starts with "Keep It..."</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200'}">
    <h3 class="mb-2 font-semibold text-slate-800">Challenge 2</h3>
    <p class="mb-3 text-slate-600">Should you optimize code before it works correctly?</p>
    <div class="flex gap-3">
      <input
        type="text"
        bind:value={b2Answer}
        placeholder="Yes or No..."
        disabled={b2Result === 'correct'}
        class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
        onkeydown={(e) => { if (e.key === 'Enter') checkB2(); }}
      />
      <button
        onclick={checkB2}
        disabled={b2Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b2Result === 'correct'}
      <p class="mt-2 text-sm text-green-700">Correct! Make it work first, then optimize only if needed. Premature optimization is the root of all evil.</p>
    {:else if b2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think about it: what's more important — fast code or correct code?</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200'}">
    <h3 class="mb-2 font-semibold text-slate-800">Challenge 3</h3>
    <p class="mb-3 text-slate-600">Who will read your code more: you or the computer?</p>
    <div class="flex gap-3">
      <input
        type="text"
        bind:value={b3Answer}
        placeholder="Type your answer..."
        disabled={b3Result === 'correct'}
        class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
        onkeydown={(e) => { if (e.key === 'Enter') checkB3(); }}
      />
      <button
        onclick={checkB3}
        disabled={b3Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b3Result === 'correct'}
      <p class="mt-2 text-sm text-green-700">Correct! You (and other humans) will read code many more times than the computer runs it. Write for people first.</p>
    {:else if b3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Hint: code is read far more often than it is written. Who does the reading?</p>
    {/if}
  </div>

  {#if allDone}
    <div class="text-center">
      <p class="mb-3 font-semibold text-green-700">All correct! You understand the KISS principle.</p>
    </div>
  {/if}
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Simplicity</h2>
    <p class="text-slate-600">Test your knowledge of the deeper concepts behind keeping code simple.</p>
  </div>

  <!-- Advanced Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200'}">
    <h3 class="mb-2 font-semibold text-slate-800">Challenge 1</h3>
    <p class="mb-3 text-slate-600">What principle says don't build features until they are actually needed?</p>
    <div class="flex gap-3">
      <input
        type="text"
        bind:value={a1Answer}
        placeholder="Type the principle name..."
        disabled={a1Result === 'correct'}
        class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
        onkeydown={(e) => { if (e.key === 'Enter') checkA1(); }}
      />
      <button
        onclick={checkA1}
        disabled={a1Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a1Result === 'correct'}
      <p class="mt-2 text-sm text-green-700">Correct! YAGNI — "You Ain't Gonna Need It" — from Extreme Programming. Build only what you need today.</p>
    {:else if a1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Hint: it's an acronym from Extreme Programming. "You Ain't Gonna..."</p>
    {/if}
  </div>

  <!-- Advanced Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200'}">
    <h3 class="mb-2 font-semibold text-slate-800">Challenge 2</h3>
    <p class="mb-3 text-slate-600">What metric measures the number of independent paths through code?</p>
    <div class="flex gap-3">
      <input
        type="text"
        bind:value={a2Answer}
        placeholder="Type the metric name..."
        disabled={a2Result === 'correct'}
        class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
        onkeydown={(e) => { if (e.key === 'Enter') checkA2(); }}
      />
      <button
        onclick={checkA2}
        disabled={a2Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a2Result === 'correct'}
      <p class="mt-2 text-sm text-green-700">Correct! Cyclomatic complexity counts the number of linearly independent paths through a function. Lower is simpler.</p>
    {:else if a2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Hint: it's a two-word term. The first word starts with "cyclo-" and relates to cycles/paths in a graph.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200'}">
    <h3 class="mb-2 font-semibold text-slate-800">Challenge 3</h3>
    <p class="mb-3 text-slate-600">What practice improves code structure without changing its external behavior?</p>
    <div class="flex gap-3">
      <input
        type="text"
        bind:value={a3Answer}
        placeholder="Type your answer..."
        disabled={a3Result === 'correct'}
        class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
        onkeydown={(e) => { if (e.key === 'Enter') checkA3(); }}
      />
      <button
        onclick={checkA3}
        disabled={a3Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a3Result === 'correct'}
      <p class="mt-2 text-sm text-green-700">Correct! Refactoring is the disciplined process of restructuring code while keeping its behavior identical.</p>
    {:else if a3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Hint: Martin Fowler wrote the definitive book on this practice. It starts with "re-".</p>
    {/if}
  </div>

  {#if advAllDone}
    <div class="text-center">
      <p class="mb-3 font-semibold text-green-700">All correct! You have a strong grasp of simplicity principles.</p>
    </div>
  {/if}
</div>
{/if}
