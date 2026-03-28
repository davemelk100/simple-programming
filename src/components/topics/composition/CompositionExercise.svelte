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

  // --- Simple mode checks ---
  // Pipeline: 3 -> double -> add1 = 7
  function checkC1() {
    c1Result = c1Answer.trim() === '7' ? 'correct' : 'wrong';
  }
  // Pipeline: 2 -> square -> double = 8
  function checkC2() {
    c2Result = c2Answer.trim() === '8' ? 'correct' : 'wrong';
  }
  // Which pipeline turns 5 into 11? double then add1
  function checkC3() {
    c3Result = c3Answer === 'double-add1' ? 'correct' : 'wrong';
  }

  // --- Advanced mode state & checks ---
  let a1Answer = $state('');
  let a1Result = $state<'correct' | 'wrong' | null>(null);

  let a2Answer = $state('');
  let a2Result = $state<'correct' | 'wrong' | null>(null);

  let a3Answer = $state('');
  let a3Result = $state<'correct' | 'wrong' | null>(null);

  let allDoneAdv = $derived(a1Result === 'correct' && a2Result === 'correct' && a3Result === 'correct');

  // pipe(toString, reverse, toNumber)(1234) => 4321
  function checkA1() {
    a1Result = a1Answer.trim() === '4321' ? 'correct' : 'wrong';
  }

  // Which pattern avoids intermediate variables? pipe/compose
  function checkA2() {
    a2Result = a2Answer === 'pipe-compose' ? 'correct' : 'wrong';
  }

  // Fix: pipe(parseFloat, Math.round, toString) on "3.7" => "4"
  function checkA3() {
    a3Result = a3Answer.trim().replace(/['"]/g, '') === '4' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (allDone) {
      oncomplete?.([c1Result, c2Result, c3Result].filter((r) => r === 'correct').length);
    }
  });

  $effect(() => {
    if (allDoneAdv) {
      oncomplete?.([a1Result, a2Result, a3Result].filter((r) => r === 'correct').length);
    }
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Composition</h2>
    <p class="text-slate-600">Predict what comes out of these pipelines!</p>
  </div>

  <!-- C1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">1. What comes out of this pipeline?</p>
    <div class="mb-3 flex items-center justify-center gap-2 text-sm">
      <span class="rounded bg-indigo-100 px-3 py-1 font-bold text-indigo-700">3</span>
      <span class="text-indigo-400">&rarr;</span>
      <span class="rounded border border-indigo-300 bg-indigo-50 px-3 py-1 font-bold text-indigo-700">Double</span>
      <span class="text-indigo-400">&rarr;</span>
      <span class="rounded border border-indigo-300 bg-indigo-50 px-3 py-1 font-bold text-indigo-700">Add 1</span>
      <span class="text-indigo-400">&rarr;</span>
      <span class="rounded bg-slate-100 px-3 py-1 font-bold text-slate-500">?</span>
    </div>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c1Answer} disabled={c1Result === 'correct'} placeholder="?" class="w-16 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-indigo-500 focus:outline-none disabled:opacity-50" />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! 3 * 2 = 6, then 6 + 1 = 7</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">First double 3 to get 6, then add 1.</p>{/if}
  </div>

  <!-- C2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">2. What comes out?</p>
    <div class="mb-3 flex items-center justify-center gap-2 text-sm">
      <span class="rounded bg-indigo-100 px-3 py-1 font-bold text-indigo-700">2</span>
      <span class="text-indigo-400">&rarr;</span>
      <span class="rounded border border-indigo-300 bg-indigo-50 px-3 py-1 font-bold text-indigo-700">Square</span>
      <span class="text-indigo-400">&rarr;</span>
      <span class="rounded border border-indigo-300 bg-indigo-50 px-3 py-1 font-bold text-indigo-700">Double</span>
      <span class="text-indigo-400">&rarr;</span>
      <span class="rounded bg-slate-100 px-3 py-1 font-bold text-slate-500">?</span>
    </div>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c2Answer} disabled={c2Result === 'correct'} placeholder="?" class="w-16 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-indigo-500 focus:outline-none disabled:opacity-50" />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! 2 squared = 4, then 4 * 2 = 8</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">First square 2 (= 4), then double it.</p>{/if}
  </div>

  <!-- C3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">3. Which pipeline turns <strong>5</strong> into <strong>11</strong>?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each [
        { id: 'add1-double', label: 'Add 1 → Double' },
        { id: 'double-add1', label: 'Double → Add 1' },
        { id: 'square-add1', label: 'Square → Add 1' },
      ] as opt}
        <button
          onclick={() => { c3Answer = opt.id; }}
          disabled={c3Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-sm font-medium transition-all
            {c3Answer === opt.id ? 'border-indigo-500 bg-indigo-100 text-indigo-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      {#if c3Result !== 'correct' && c3Answer}
        <button onclick={checkC3} class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! 5 * 2 = 10, then 10 + 1 = 11</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Try each pipeline with input 5 and see which gives 11.</p>{/if}
  </div>

  {#if allDone}
    <div><p class="text-lg font-bold text-green-600">All challenges complete!</p></div>
  {/if}
</div>
{:else}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Composition</h2>
    <p class="text-slate-600">Trace type transformations, identify patterns, and debug composition chains.</p>
  </div>

  <!-- A1: pipe/compose with type transformations -->
  <div class="rounded-xl border p-5 transition-colors {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">1. Predict the output of this pipe chain:</p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-4 text-sm leading-relaxed text-slate-100"><code>pipe(
  String,          <span class="text-slate-500">// Number → String</span>
  s => s.split('').reverse().join(''),
  Number           <span class="text-slate-500">// String → Number</span>
)(1234)</code></pre>
    <p class="mb-3 text-sm text-slate-500">The value flows: <strong>Number</strong> &rarr; <strong>String</strong> &rarr; <strong>String</strong> &rarr; <strong>Number</strong></p>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={a1Answer} disabled={a1Result === 'correct'} placeholder="?" class="w-24 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-indigo-500 focus:outline-none disabled:opacity-50" />
      {#if a1Result !== 'correct'}
        <button onclick={checkA1} class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if a1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! 1234 &rarr; "1234" &rarr; "4321" &rarr; 4321</p>{:else if a1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Trace each step: convert to string, reverse the characters, convert back to number.</p>{/if}
  </div>

  <!-- A2: Which pattern avoids intermediate variables -->
  <div class="rounded-xl border p-5 transition-colors {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">2. Which composition pattern avoids creating intermediate variables?</p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-4 text-sm leading-relaxed text-slate-100"><code><span class="text-slate-500">// Pattern A</span>
const step1 = toUpper(input);
const step2 = trim(step1);
const step3 = exclaim(step2);

<span class="text-slate-500">// Pattern B</span>
const transform = pipe(toUpper, trim, exclaim);
const result = transform(input);

<span class="text-slate-500">// Pattern C</span>
const result = exclaim(trim(toUpper(input)));</code></pre>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each [
        { id: 'step-vars', label: 'A: Step-by-step variables' },
        { id: 'pipe-compose', label: 'B & C: pipe/compose & nesting' },
        { id: 'nesting-only', label: 'C only: Nesting' },
      ] as opt}
        <button
          onclick={() => { a2Answer = opt.id; }}
          disabled={a2Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-sm font-medium transition-all
            {a2Answer === opt.id ? 'border-indigo-500 bg-indigo-100 text-indigo-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      {#if a2Result !== 'correct' && a2Answer}
        <button onclick={checkA2} class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if a2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Both pipe/compose (B) and direct nesting (C) avoid intermediate variables. Pattern A stores each step explicitly.</p>{:else if a2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Look at which patterns declare step1, step2, step3 variables vs. composing directly.</p>{/if}
  </div>

  <!-- A3: Fix a type mismatch in composition -->
  <div class="rounded-xl border p-5 transition-colors {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">3. This composition has a type mismatch. What is the correct final output once fixed?</p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-4 text-sm leading-relaxed text-slate-100"><code><span class="text-slate-500">// Bug: Math.round returns Number, but toString expects to be called on a value</span>
const process = pipe(
  parseFloat,    <span class="text-slate-500">// String → Number</span>
  Math.round,    <span class="text-slate-500">// Number → Number</span>
  String         <span class="text-slate-500">// Number → String (fix: use String() instead of .toString)</span>
);
process("3.7")  <span class="text-slate-500">// What does this return?</span></code></pre>
    <p class="mb-3 text-sm text-slate-500">Once the chain types align correctly, <code>parseFloat("3.7")</code> &rarr; <code>Math.round(3.7)</code> &rarr; <code>String(4)</code></p>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={a3Answer} disabled={a3Result === 'correct'} placeholder="?" class="w-24 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-indigo-500 focus:outline-none disabled:opacity-50" />
      {#if a3Result !== 'correct'}
        <button onclick={checkA3} class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if a3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! parseFloat("3.7") = 3.7, Math.round(3.7) = 4, String(4) = "4"</p>{:else if a3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Trace the types: String &rarr; Number &rarr; Number &rarr; String. What is the final string value?</p>{/if}
  </div>

  {#if allDoneAdv}
    <div><p class="text-lg font-bold text-green-600">All advanced challenges complete!</p></div>
  {/if}
</div>
{/if}
