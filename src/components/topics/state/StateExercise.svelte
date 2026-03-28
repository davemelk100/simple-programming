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
    c1Result = c1Answer.trim() === '1' ? 'correct' : 'wrong';
  }
  function checkC2() {
    c2Result = c2Answer.trim() === '3' ? 'correct' : 'wrong';
  }
  function checkC3() {
    c3Result = c3Answer.trim() === '0' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (allDone) {
      oncomplete?.([c1Result, c2Result, c3Result].filter((r) => r === 'correct').length);
    }
  });

  // Advanced mode state
  let a1Answer = $state('');
  let a1Result = $state<'correct' | 'wrong' | null>(null);

  let a2Answer = $state('');
  let a2Result = $state<'correct' | 'wrong' | null>(null);

  let a3Answer = $state('');
  let a3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(a1Result === 'correct' && a2Result === 'correct' && a3Result === 'correct');

  function checkA1() {
    a1Result = a1Answer.trim() === '30' ? 'correct' : 'wrong';
  }
  function checkA2() {
    a2Result = a2Answer.trim().toLowerCase() === 'stale closure' ? 'correct' : 'wrong';
  }
  function checkA3() {
    a3Result = a3Answer.trim().toLowerCase() === 'derived' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (advAllDone) {
      oncomplete?.([a1Result, a2Result, a3Result].filter((r) => r === 'correct').length);
    }
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: State</h2>
    <p class="text-slate-600">Predict what the state will be after these operations!</p>
  </div>

  <!-- C1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">1. Starting at 0, after <strong>+1, +1, -1</strong>, what is the count?</p>
    <div class="mb-2 flex items-center justify-center gap-1 text-sm">
      {#each [{ v: 0, a: 'Start' }, { v: 1, a: '+1' }, { v: 2, a: '+1' }, { v: '?', a: '-1' }] as step}
        <div class="flex flex-col items-center">
          <div class="flex h-8 w-8 items-center justify-center rounded-full border border-pink-300 bg-pink-50 text-xs font-bold text-pink-700">{step.v}</div>
          <span class="text-xs text-pink-400">{step.a}</span>
        </div>
        {#if step.a !== '-1'}
          <svg class="h-3 w-4 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        {/if}
      {/each}
    </div>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c1Answer} disabled={c1Result === 'correct'} placeholder="?" class="w-16 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-pink-500 focus:outline-none disabled:opacity-50" />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! 0 +1 +1 -1 = 1</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Walk through each step: 0, then +1=1, then +1=2, then -1=?</p>{/if}
  </div>

  <!-- C2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">2. Starting at 5, after <strong>-1, -1</strong>, what is the count?</p>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c2Answer} disabled={c2Result === 'correct'} placeholder="?" class="w-16 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-pink-500 focus:outline-none disabled:opacity-50" />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! 5 -1 -1 = 3</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Start at 5, subtract 1 twice.</p>{/if}
  </div>

  <!-- C3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">3. Starting at 0, after <strong>+1, +1, +1, -1, -1, -1</strong>, what is the count?</p>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c3Answer} disabled={c3Result === 'correct'} placeholder="?" class="w-16 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-pink-500 focus:outline-none disabled:opacity-50" />
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Three ups and three downs cancel out: 0!</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Add 1 three times, then subtract 1 three times. Where do you end up?</p>{/if}
  </div>

  {#if allDone}
    <div><p class="text-lg font-bold text-green-600">All challenges complete!</p></div>
  {/if}
</div>
{:else}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: State (Advanced)</h2>
    <p class="text-slate-600">Tackle these harder state challenges involving immutability, closures, and derived state.</p>
  </div>

  <!-- A1: Immutable spread updates -->
  <div class="rounded-xl border p-5 transition-colors {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">1. What is <code>state.age</code> after these immutable updates?</p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-4 text-sm leading-relaxed text-slate-100"><code><span class="text-purple-400">let</span> <span class="text-blue-300">state</span> = {'{'} <span class="text-blue-300">name</span>: <span class="text-yellow-300">"Alice"</span>, <span class="text-blue-300">age</span>: <span class="text-yellow-300">25</span> {'}'};
<span class="text-blue-300">state</span> = {'{'} ...<span class="text-blue-300">state</span>, <span class="text-blue-300">age</span>: <span class="text-blue-300">state</span>.<span class="text-blue-300">age</span> + <span class="text-yellow-300">5</span> {'}'};
<span class="text-blue-300">state</span> = {'{'} ...<span class="text-blue-300">state</span>, <span class="text-blue-300">name</span>: <span class="text-yellow-300">"Bob"</span> {'}'};
<span class="text-slate-500">// state.age = ?</span></code></pre>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={a1Answer} disabled={a1Result === 'correct'} placeholder="?" class="w-16 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-pink-500 focus:outline-none disabled:opacity-50" />
      {#if a1Result !== 'correct'}
        <button onclick={checkA1} class="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if a1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! The spread copies age: 30, and the second spread only changes name, leaving age at 30.</p>{:else if a1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Trace each spread: first update sets age to 25+5=30. The second spread copies all properties and only overrides name.</p>{/if}
  </div>

  <!-- A2: Stale closure bug -->
  <div class="rounded-xl border p-5 transition-colors {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">2. What bug does this code have? (two words)</p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-4 text-sm leading-relaxed text-slate-100"><code><span class="text-purple-400">let</span> <span class="text-blue-300">count</span> = <span class="text-yellow-300">0</span>;

<span class="text-purple-400">function</span> <span class="text-blue-300">incrementAsync</span>() {'{'}
  <span class="text-blue-300">setTimeout</span>(() ={'>'} {'{'}
    <span class="text-blue-300">count</span> = <span class="text-blue-300">count</span> + <span class="text-yellow-300">1</span>;  <span class="text-slate-500">// uses count from when setTimeout was called</span>
  {'}'}, <span class="text-yellow-300">1000</span>);
{'}'}

<span class="text-blue-300">incrementAsync</span>();
<span class="text-blue-300">incrementAsync</span>();
<span class="text-blue-300">incrementAsync</span>();
<span class="text-slate-500">// Expected: 3, Actual: 1</span></code></pre>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={a2Answer} disabled={a2Result === 'correct'} placeholder="two words" class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-pink-500 focus:outline-none disabled:opacity-50" />
      {#if a2Result !== 'correct'}
        <button onclick={checkA2} class="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if a2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Each callback closes over the same value of count (0), so all three set count to 1 instead of incrementing sequentially.</p>{:else if a2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Hint: all three callbacks capture the same value of count at call time. What's this kind of bug called?</p>{/if}
  </div>

  <!-- A3: Derived state -->
  <div class="rounded-xl border p-5 transition-colors {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">3. You have <code>firstName</code> and <code>lastName</code> as state. You need <code>fullName</code> that always stays in sync. What kind of state is <code>fullName</code>?</p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-4 text-sm leading-relaxed text-slate-100"><code><span class="text-purple-400">let</span> <span class="text-blue-300">firstName</span> = <span class="text-yellow-300">"Ada"</span>;
<span class="text-purple-400">let</span> <span class="text-blue-300">lastName</span> = <span class="text-yellow-300">"Lovelace"</span>;

<span class="text-slate-500">// fullName should always equal firstName + " " + lastName</span>
<span class="text-slate-500">// What kind of state is fullName? (one word)</span></code></pre>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={a3Answer} disabled={a3Result === 'correct'} placeholder="one word" class="w-32 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-pink-500 focus:outline-none disabled:opacity-50" />
      {#if a3Result !== 'correct'}
        <button onclick={checkA3} class="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 active:scale-95">Check</button>
      {/if}
    </div>
    {#if a3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! fullName is derived state -- it's computed from other state values and updates automatically when they change.</p>{:else if a3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Hint: fullName is computed from other values. It's not independent state -- it's _____ from firstName and lastName.</p>{/if}
  </div>

  {#if advAllDone}
    <div><p class="text-lg font-bold text-green-600">All advanced challenges complete!</p></div>
  {/if}
</div>
{/if}
