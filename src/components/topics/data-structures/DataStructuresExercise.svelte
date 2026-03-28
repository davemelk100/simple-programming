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

  // Challenge 1: add grape
  let c1Answer = $state('');
  let c1Result = $state<'correct' | 'wrong' | null>(null);

  // Challenge 2: what's at index 1
  let c2Answer = $state('');
  let c2Result = $state<'correct' | 'wrong' | null>(null);

  // Challenge 3: object value
  let c3Answer = $state('');
  let c3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(c1Result === 'correct' && c2Result === 'correct' && c3Result === 'correct');

  function checkC1() {
    if (advanced) {
      c1Result = c1Answer.trim() === '30, 40' ? 'correct' : 'wrong';
    } else {
      c1Result = c1Answer.trim().toLowerCase() === 'grape' ? 'correct' : 'wrong';
    }
  }
  function checkC2() {
    if (advanced) {
      c2Result = c2Answer.trim() === '10' ? 'correct' : 'wrong';
    } else {
      c2Result = c2Answer.trim().toLowerCase() === 'green' ? 'correct' : 'wrong';
    }
  }
  function checkC3() {
    if (advanced) {
      c3Result = c3Answer.trim().toLowerCase() === 'c' ? 'correct' : 'wrong';
    } else {
      c3Result = c3Answer.trim().toLowerCase() === 'bob' ? 'correct' : 'wrong';
    }
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Data Structures</h2>
    <p class="text-slate-600">Test your knowledge of arrays and objects!</p>
  </div>

  <!-- C1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">1. Add <strong>"grape"</strong> to the end of this array:</p>
    <div class="mb-3 flex items-center justify-center gap-1">
      <span class="text-lg font-bold text-slate-500">[</span>
      {#each ['apple', 'banana'] as item}
        <div class="flex h-10 items-center justify-center rounded-lg border border-green-400 bg-green-50 px-3 text-sm font-bold text-green-700">"{item}"</div>
        <span class="text-slate-300">,</span>
      {/each}
      <div class="flex h-10 items-center justify-center rounded-lg border-2 border-dashed border-green-300 bg-white px-2">
        <input type="text" bind:value={c1Answer} disabled={c1Result === 'correct'} placeholder="?" class="w-16 bg-transparent text-center text-sm font-bold text-green-700 focus:outline-none disabled:opacity-50" />
      </div>
      <span class="text-lg font-bold text-slate-500">]</span>
    </div>
    <div>
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct!</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Type "grape" in the empty box!</p>{/if}
  </div>

  <!-- C2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">2. What is at <strong>index 1</strong> in this array?</p>
    <div class="mb-3 flex items-center justify-center gap-1">
      {#each ['red', 'green', 'blue'] as item, i}
        <div class="flex flex-col items-center gap-1">
          <span class="text-xs text-green-500">[{i}]</span>
          <div class="flex h-10 items-center justify-center rounded-lg border border-green-400 bg-green-50 px-3 text-sm font-bold text-green-700
            {i === 1 ? 'ring-2 ring-yellow-300' : ''}">"{item}"</div>
        </div>
        {#if i < 2}<span class="mt-4 text-slate-300">,</span>{/if}
      {/each}
    </div>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c2Answer} disabled={c2Result === 'correct'} placeholder="Answer" class="w-24 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-green-500 focus:outline-none disabled:opacity-50" />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Index 1 is "green".</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Remember, index 1 is the second item!</p>{/if}
  </div>

  <!-- C3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">3. What is the value of <strong>"name"</strong> in this object?</p>
    <div class="mb-3 max-w-xs rounded-xl border-2 border-green-400 bg-green-50 p-3">
      <div class="space-y-1 text-sm">
        <div class="flex gap-2"><span class="font-semibold text-green-700">name:</span><span class="text-slate-700">"Bob"</span></div>
        <div class="flex gap-2"><span class="font-semibold text-green-700">age:</span><span class="text-slate-700">30</span></div>
      </div>
    </div>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c3Answer} disabled={c3Result === 'correct'} placeholder="Answer" class="w-24 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-green-500 focus:outline-none disabled:opacity-50" />
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! The name is "Bob".</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Look at the value next to "name"!</p>{/if}
  </div>

  {#if allDone}
    <div><p class="text-lg font-bold text-green-600">All challenges complete!</p></div>
  {/if}
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Data Structures (Advanced)</h2>
    <p class="text-slate-600">Test your knowledge of array methods and indexing!</p>
  </div>

  <!-- C1: Chained array methods -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">1. What does this expression produce?</p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-3 text-sm text-slate-100"><code>[1, 2, 3, 4].filter(x =&gt; x &gt; 2).map(x =&gt; x * 10)</code></pre>
    <p class="mb-3 text-sm text-slate-500">Enter the result as comma-separated values (e.g. <code class="text-xs">30, 40</code>)</p>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c1Answer} disabled={c1Result === 'correct'} placeholder="Answer" class="w-32 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-green-500 focus:outline-none disabled:opacity-50" />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! filter keeps [3, 4], then map produces [30, 40].</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">First filter keeps values greater than 2, then map multiplies each by 10.</p>{/if}
  </div>

  <!-- C2: Reduce -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">2. What does this reduce return?</p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-3 text-sm text-slate-100"><code>[1, 2, 3, 4].reduce((acc, x) =&gt; acc + x, 0)</code></pre>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c2Answer} disabled={c2Result === 'correct'} placeholder="Answer" class="w-24 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-green-500 focus:outline-none disabled:opacity-50" />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! 0 + 1 + 2 + 3 + 4 = 10.</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">The accumulator starts at 0 and adds each element: 0+1+2+3+4.</p>{/if}
  </div>

  <!-- C3: Off-by-one -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">3. This code has an off-by-one bug. What is the last element it actually prints?</p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-3 text-sm text-slate-100"><code>let arr = ["a", "b", "c", "d"];
for (let i = 0; i &lt; arr.length - 1; i++) &#123;
  console.log(arr[i]);
&#125;</code></pre>
    <p class="mb-3 text-sm text-slate-500">The loop stops one element too early. What is the last value printed?</p>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c3Answer} disabled={c3Result === 'correct'} placeholder="Answer" class="w-24 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-green-500 focus:outline-none disabled:opacity-50" />
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! The loop runs for i = 0, 1, 2 (stops before 3), so "c" is the last printed value. It never reaches "d".</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">arr.length is 4, so arr.length - 1 is 3. The loop runs while i &lt; 3, meaning i = 0, 1, 2.</p>{/if}
  </div>

  {#if allDone}
    <div><p class="text-lg font-bold text-green-600">All challenges complete!</p></div>
  {/if}
</div>
{/if}
