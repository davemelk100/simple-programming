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
    c1Result = advanced
      ? c1Answer.trim() === '25'
        ? 'correct'
        : 'wrong'
      : c1Answer.trim() === '14'
        ? 'correct'
        : 'wrong';
  }
  function checkC2() {
    c2Result = advanced
      ? c2Answer.trim() === '3'
        ? 'correct'
        : 'wrong'
      : c2Answer.trim() === '8'
        ? 'correct'
        : 'wrong';
  }
  function checkC3() {
    c3Result = advanced
      ? c3Answer.trim().toLowerCase() === 'number'
        ? 'correct'
        : 'wrong'
      : c3Answer.trim().toLowerCase() === 'uppercase'
        ? 'correct'
        : 'wrong';
  }

  $effect(() => {
    if (allDone) {
      const score = [c1Result, c2Result, c3Result].filter((r) => r === 'correct').length;
      oncomplete?.(score);
    }
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Functions</h2>
    <p class="text-slate-600">Predict what each machine will output!</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. If the machine <strong>doubles</strong> its input, what comes out when you put in <strong>7</strong>?
    </p>
    <div class="mb-2 flex items-center justify-center gap-2 text-sm text-purple-600">
      <span class="rounded bg-purple-100 px-2 py-1 font-bold">7</span>
      <span>&rarr;</span>
      <span class="rounded border border-purple-300 bg-purple-50 px-3 py-1 font-bold">double()</span>
      <span>&rarr;</span>
      <span class="rounded bg-slate-100 px-2 py-1 font-bold">?</span>
    </div>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c1Answer} disabled={c1Result === 'correct'} placeholder="Answer" class="w-24 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50" />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! 7 x 2 = 14</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Not quite. Double means multiply by 2!</p>{/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What does the <strong>"add 5"</strong> machine give when the input is <strong>3</strong>?
    </p>
    <div class="mb-2 flex items-center justify-center gap-2 text-sm text-purple-600">
      <span class="rounded bg-purple-100 px-2 py-1 font-bold">3</span>
      <span>&rarr;</span>
      <span class="rounded border border-purple-300 bg-purple-50 px-3 py-1 font-bold">add5()</span>
      <span>&rarr;</span>
      <span class="rounded bg-slate-100 px-2 py-1 font-bold">?</span>
    </div>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c2Answer} disabled={c2Result === 'correct'} placeholder="Answer" class="w-24 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50" />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! 3 + 5 = 8</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Try again. Add 5 to the input!</p>{/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. Which function turns <code class="rounded bg-slate-100 px-1.5 py-0.5">"cat"</code> into <code class="rounded bg-slate-100 px-1.5 py-0.5">"CAT"</code>?
    </p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each ['double', 'uppercase', 'reverse', 'add10'] as opt}
        <button
          onclick={() => { c3Answer = opt; }}
          disabled={c3Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-sm font-medium transition-all
            {c3Answer === opt ? 'border-purple-500 bg-purple-100 text-purple-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Uppercase turns all letters to capitals.</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Think about which function changes letter case.</p>{/if}
  </div>

  {#if allDone}
    <div>
      <p class="text-lg font-bold text-green-600">All challenges complete!</p>
    </div>
  {/if}
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Functions (Advanced)</h2>
    <p class="text-slate-600">Predict the output of higher-order functions, closures, and composition.</p>
  </div>

  <!-- Challenge 1: Higher-order function -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. A function returns another function. What is the final output?
    </p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-3 text-sm leading-relaxed text-slate-100"><code>function multiplier(x) &#123;
  return function(y) &#123;
    return x * y;
  &#125;;
&#125;
const timesFive = multiplier(5);
console.log(timesFive(5));</code></pre>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c1Answer} disabled={c1Result === 'correct'} placeholder="Answer" class="w-24 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50" />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! multiplier(5) returns a function that multiplies by 5, so timesFive(5) = 25.</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Hint: multiplier(5) returns a function where x is 5. Then that function is called with y = 5.</p>{/if}
  </div>

  <!-- Challenge 2: Closure bug -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. Classic closure gotcha. What does <code class="rounded bg-slate-100 px-1.5 py-0.5">fns[0]()</code> return?
    </p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-3 text-sm leading-relaxed text-slate-100"><code>const fns = [];
for (var i = 0; i &lt; 3; i++) &#123;
  fns.push(function() &#123; return i; &#125;);
&#125;
console.log(fns[0]());</code></pre>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c2Answer} disabled={c2Result === 'correct'} placeholder="Answer" class="w-24 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50" />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Because <code>var</code> is function-scoped, all closures share the same <code>i</code>, which is 3 after the loop ends.</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Hint: <code>var</code> does not create a new scope per iteration. What is <code>i</code> after the loop finishes?</p>{/if}
  </div>

  <!-- Challenge 3: Composed function return type -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What is the return <em>type</em> of calling <code class="rounded bg-slate-100 px-1.5 py-0.5">compose(double, addOne)(3)</code>?
    </p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-3 text-sm leading-relaxed text-slate-100"><code>function double(x: number): number &#123;
  return x * 2;
&#125;
function addOne(x: number): number &#123;
  return x + 1;
&#125;
function compose(f, g) &#123;
  return (x) =&gt; f(g(x));
&#125;</code></pre>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each ['string', 'number', 'boolean', 'function'] as opt}
        <button
          onclick={() => { c3Answer = opt; }}
          disabled={c3Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-sm font-medium transition-all
            {c3Answer === opt ? 'border-purple-500 bg-purple-100 text-purple-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! compose(double, addOne)(3) calls addOne(3) = 4, then double(4) = 8. Both return number.</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Trace the types: g(x) returns number, f takes number and returns number.</p>{/if}
  </div>

  {#if allDone}
    <div>
      <p class="text-lg font-bold text-green-600">All challenges complete!</p>
    </div>
  {/if}
</div>

{/if}
