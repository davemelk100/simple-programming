<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  interface Props {
    oncomplete?: (score: number) => void;
  }

  let { oncomplete }: Props = $props();

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  let c1Answer = $state('');
  let c1Result = $state<'correct' | 'wrong' | null>(null);

  let c2Answer = $state('');
  let c2Result = $state<'correct' | 'wrong' | null>(null);

  let c3Answer = $state('');
  let c3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(c1Result === 'correct' && c2Result === 'correct' && c3Result === 'correct');

  function checkC1() {
    c1Result = c1Answer.trim().toLowerCase() === 'false' ? 'correct' : 'wrong';
  }
  function checkC2() {
    c2Result = c2Answer.trim().toLowerCase() === 'false' ? 'correct' : 'wrong';
  }
  function checkC3() {
    c3Result = c3Answer.trim().toLowerCase() === 'true' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (allDone) {
      oncomplete?.([c1Result, c2Result, c3Result].filter((r) => r === 'correct').length);
    }
  });

  // Advanced mode state
  let ac1Answer = $state('');
  let ac1Result = $state<'correct' | 'wrong' | null>(null);

  let ac2Answer = $state('');
  let ac2Result = $state<'correct' | 'wrong' | null>(null);

  let ac3Answer = $state('');
  let ac3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(ac1Result === 'correct' && ac2Result === 'correct' && ac3Result === 'correct');

  function checkAC1() {
    // true || false && !true  →  true || (false && false)  →  true || false  →  true
    ac1Result = ac1Answer.trim().toLowerCase() === 'true' ? 'correct' : 'wrong';
  }
  function checkAC2() {
    // !(a && b) === !a || !b  →  answer is "!a || !b"
    ac2Result = ac2Answer.trim().replace(/\s+/g, '') === '!a||!b' ? 'correct' : 'wrong';
  }
  function checkAC3() {
    // false && sideEffect()  →  false (short-circuit, sideEffect never runs)
    ac3Result = ac3Answer.trim().toLowerCase() === 'false' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (advAllDone) {
      oncomplete?.([ac1Result, ac2Result, ac3Result].filter((r) => r === 'correct').length);
    }
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Logic</h2>
    <p class="text-slate-600">Predict the output of these logic expressions!</p>
  </div>

  <!-- C1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">1. What is <code class="rounded bg-yellow-100 px-2 py-0.5 font-bold text-yellow-800">true AND false</code>?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each ['true', 'false'] as opt}
        <button
          onclick={() => { c1Answer = opt; }}
          disabled={c1Result === 'correct'}
          class="rounded-lg border px-6 py-2 text-sm font-bold transition-all
            {c1Answer === opt ? 'border-yellow-500 bg-yellow-100 text-yellow-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >{opt}</button>
      {/each}
      {#if c1Result !== 'correct' && c1Answer}
        <button onclick={checkC1} class="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! AND needs BOTH to be true.</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">With AND, both sides must be true for the result to be true.</p>{/if}
  </div>

  <!-- C2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">2. What is <code class="rounded bg-yellow-100 px-2 py-0.5 font-bold text-yellow-800">NOT true</code>?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each ['true', 'false'] as opt}
        <button
          onclick={() => { c2Answer = opt; }}
          disabled={c2Result === 'correct'}
          class="rounded-lg border px-6 py-2 text-sm font-bold transition-all
            {c2Answer === opt ? 'border-yellow-500 bg-yellow-100 text-yellow-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >{opt}</button>
      {/each}
      {#if c2Result !== 'correct' && c2Answer}
        <button onclick={checkC2} class="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! NOT flips true to false.</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">NOT flips the value to its opposite!</p>{/if}
  </div>

  <!-- C3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">3. What is <code class="rounded bg-yellow-100 px-2 py-0.5 font-bold text-yellow-800">true OR false</code>?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each ['true', 'false'] as opt}
        <button
          onclick={() => { c3Answer = opt; }}
          disabled={c3Result === 'correct'}
          class="rounded-lg border px-6 py-2 text-sm font-bold transition-all
            {c3Answer === opt ? 'border-yellow-500 bg-yellow-100 text-yellow-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >{opt}</button>
      {/each}
      {#if c3Result !== 'correct' && c3Answer}
        <button onclick={checkC3} class="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! OR only needs ONE to be true.</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">With OR, the result is true if at least one side is true.</p>{/if}
  </div>

  {#if allDone}
    <div><p class="text-lg font-bold text-green-600">All challenges complete!</p></div>
  {/if}
</div>
{:else}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Logic</h2>
    <p class="text-slate-600">Test your understanding of operator precedence, De Morgan's law, and short-circuit evaluation.</p>
  </div>

  <!-- AC1: Compound boolean with operator precedence -->
  <div class="rounded-xl border p-5 transition-colors {ac1Result === 'correct' ? 'border-green-300 bg-green-50' : ac1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">1. What does <code class="rounded bg-yellow-100 px-2 py-0.5 font-bold text-yellow-800">true || false && !true</code> evaluate to?</p>
    <p class="mb-3 text-xs text-slate-500">Hint: <code>&&</code> has higher precedence than <code>||</code>.</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each ['true', 'false'] as opt}
        <button
          onclick={() => { ac1Answer = opt; }}
          disabled={ac1Result === 'correct'}
          class="rounded-lg border px-6 py-2 text-sm font-bold transition-all
            {ac1Answer === opt ? 'border-yellow-500 bg-yellow-100 text-yellow-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >{opt}</button>
      {/each}
      {#if ac1Result !== 'correct' && ac1Answer}
        <button onclick={checkAC1} class="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if ac1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! <code>&&</code> binds tighter: <code>true || (false && false)</code> → <code>true || false</code> → <code>true</code>.</p>{:else if ac1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Remember: <code>&&</code> is evaluated before <code>||</code>. First evaluate <code>false && !true</code>, then <code>||</code> with the left side.</p>{/if}
  </div>

  <!-- AC2: De Morgan's Law -->
  <div class="rounded-xl border p-5 transition-colors {ac2Result === 'correct' ? 'border-green-300 bg-green-50' : ac2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">2. Apply De Morgan's law: <code class="rounded bg-yellow-100 px-2 py-0.5 font-bold text-yellow-800">!(a && b)</code> is equivalent to what?</p>
    <p class="mb-3 text-xs text-slate-500">Type your answer using <code>!</code>, <code>||</code>, <code>a</code>, and <code>b</code>.</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      <input
        type="text"
        bind:value={ac2Answer}
        disabled={ac2Result === 'correct'}
        placeholder="e.g. !a || !b"
        class="rounded-lg border px-4 py-2 text-sm font-mono
          {ac2Result === 'correct' ? 'border-green-400 bg-green-50' : ac2Result === 'wrong' ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white'}
          disabled:opacity-50"
      />
      {#if ac2Result !== 'correct' && ac2Answer}
        <button onclick={checkAC2} class="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if ac2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! De Morgan's law: <code>!(a && b) === !a || !b</code>.</p>{:else if ac2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">De Morgan's law flips the operator and negates each operand: NOT(A AND B) = (NOT A) OR (NOT B).</p>{/if}
  </div>

  <!-- AC3: Short-circuit evaluation -->
  <div class="rounded-xl border p-5 transition-colors {ac3Result === 'correct' ? 'border-green-300 bg-green-50' : ac3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">3. What does <code class="rounded bg-yellow-100 px-2 py-0.5 font-bold text-yellow-800">false && sideEffect()</code> return?</p>
    <p class="mb-3 text-xs text-slate-500">Consider: does <code>sideEffect()</code> ever execute?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each ['true', 'false'] as opt}
        <button
          onclick={() => { ac3Answer = opt; }}
          disabled={ac3Result === 'correct'}
          class="rounded-lg border px-6 py-2 text-sm font-bold transition-all
            {ac3Answer === opt ? 'border-yellow-500 bg-yellow-100 text-yellow-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >{opt}</button>
      {/each}
      {#if ac3Result !== 'correct' && ac3Answer}
        <button onclick={checkAC3} class="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if ac3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! <code>&&</code> short-circuits on <code>false</code> -- the right side never runs, and the result is <code>false</code>.</p>{:else if ac3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">With <code>&&</code>, if the left side is <code>false</code>, the engine already knows the whole expression is <code>false</code> and skips the right side.</p>{/if}
  </div>

  {#if advAllDone}
    <div><p class="text-lg font-bold text-green-600">All advanced challenges complete!</p></div>
  {/if}
</div>
{/if}
