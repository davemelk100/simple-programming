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

  // Basic mode checks
  function checkC1() {
    c1Result = c1Answer.trim().toLowerCase() === 'umbrella' ? 'correct' : 'wrong';
  }
  function checkC2() {
    c2Result = c2Answer.trim() === '5' ? 'correct' : 'wrong';
  }
  function checkC3() {
    c3Result = c3Answer.trim().toLowerCase() === 'small' ? 'correct' : 'wrong';
  }

  // Advanced mode state
  let a1Answer = $state('');
  let a1Result = $state<'correct' | 'wrong' | null>(null);

  let a2Answer = $state('');
  let a2Result = $state<'correct' | 'wrong' | null>(null);

  let a3Answer = $state('');
  let a3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(a1Result === 'correct' && a2Result === 'correct' && a3Result === 'correct');

  // Advanced mode checks
  function checkA1() {
    a1Result = a1Answer.trim().toLowerCase() === 'c' ? 'correct' : 'wrong';
  }
  function checkA2() {
    a2Result = a2Answer.trim().toLowerCase() === 'banana cherry' ? 'correct' : 'wrong';
  }
  function checkA3() {
    a3Result = a3Answer.trim().toLowerCase() === 'adult' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (allDone && !advanced) {
      oncomplete?.([c1Result, c2Result, c3Result].filter((r) => r === 'correct').length);
    }
  });

  $effect(() => {
    if (advAllDone && advanced) {
      oncomplete?.([a1Result, a2Result, a3Result].filter((r) => r === 'correct').length);
    }
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Control Flow</h2>
    <p class="text-slate-600">Predict what happens in these scenarios!</p>
  </div>

  <!-- C1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">1. It IS raining. Based on the rule "if raining, take umbrella; else wear sunglasses" -- what do you take?</p>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c1Answer} disabled={c1Result === 'correct'} placeholder="Answer" class="w-32 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-orange-500 focus:outline-none disabled:opacity-50" />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! It's raining, so grab that umbrella!</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Think about which branch happens when the condition is true.</p>{/if}
  </div>

  <!-- C2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">2. A loop says "repeat 5 times: say hello." How many times is "hello" said?</p>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={c2Answer} disabled={c2Result === 'correct'} placeholder="Number" class="w-20 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-orange-500 focus:outline-none disabled:opacity-50" />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! The loop repeats exactly 5 times.</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">The loop repeats the exact number of times it says!</p>{/if}
  </div>

  <!-- C3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">3. The number is 3. The rule is "if number > 10, say 'big'; else say 'small'." Which branch runs?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each ['big', 'small'] as opt}
        <button
          onclick={() => { c3Answer = opt; }}
          disabled={c3Result === 'correct'}
          class="rounded-lg border px-5 py-2 text-sm font-medium transition-all
            {c3Answer === opt ? 'border-orange-500 bg-orange-100 text-orange-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt}
        </button>
      {/each}
      {#if c3Result !== 'correct' && c3Answer}
        <button onclick={checkC3} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! 3 is not greater than 10, so we say "small".</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Is 3 greater than 10? Think again!</p>{/if}
  </div>

  {#if allDone}
    <div><p class="text-lg font-bold text-green-600">All challenges complete!</p></div>
  {/if}
</div>
{:else}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Control Flow</h2>
    <p class="text-slate-600">Trace execution paths through complex conditionals.</p>
  </div>

  <!-- A1: Nested if/else-if chain -->
  <div class="rounded-xl border p-5 transition-colors {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">1. Predict which branch executes:</p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-3 text-sm leading-relaxed text-slate-200"><code>let temp = 25;
let humid = true;

if (temp &gt; 30) &#123;
  console.log("A"); // hot
&#125; else if (temp &gt; 20 &amp;&amp; humid) &#123;
  console.log("B"); // warm &amp; humid
&#125; else if (temp &gt; 20) &#123;
  console.log("C"); // warm &amp; dry
&#125; else &#123;
  console.log("D"); // cool
&#125;</code></pre>
    <p class="mb-2 text-sm text-slate-500">Which letter is logged: A, B, C, or D?</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each ['A', 'B', 'C', 'D'] as opt}
        <button
          onclick={() => { a1Answer = opt; }}
          disabled={a1Result === 'correct'}
          class="rounded-lg border px-5 py-2 text-sm font-medium transition-all
            {a1Answer === opt ? 'border-orange-500 bg-orange-100 text-orange-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt}
        </button>
      {/each}
      {#if a1Result !== 'correct' && a1Answer}
        <button onclick={checkA1} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if a1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! temp is not &gt; 30, but it is &gt; 20 AND humid is true, so "B" matches first.</p>{:else if a1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Check each condition top-to-bottom. The first true branch wins -- remember &amp;&amp; requires both sides to be true.</p>{/if}
  </div>

  <!-- A2: Switch fall-through -->
  <div class="rounded-xl border p-5 transition-colors {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">2. What does this switch statement output?</p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-3 text-sm leading-relaxed text-slate-200"><code>let fruit = "banana";
switch (fruit) &#123;
  case "apple":
    console.log("apple");
    break;
  case "banana":
    console.log("banana");
    // no break!
  case "cherry":
    console.log("cherry");
    break;
  default:
    console.log("unknown");
&#125;</code></pre>
    <p class="mb-2 text-sm text-slate-500">Type the exact output (space-separated if multiple words):</p>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={a2Answer} disabled={a2Result === 'correct'} placeholder="e.g. apple cherry" class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-orange-500 focus:outline-none disabled:opacity-50" />
      {#if a2Result !== 'correct'}
        <button onclick={checkA2} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if a2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Without a break, execution "falls through" from banana into the cherry case.</p>{:else if a2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Hint: when a case matches but has no break, execution continues into the next case.</p>{/if}
  </div>

  <!-- A3: Ternary simplification -->
  <div class="rounded-xl border p-5 transition-colors {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">3. Simplify this conditional using a ternary -- what value does <code>label</code> hold?</p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-3 text-sm leading-relaxed text-slate-200"><code>let age = 21;
let label;

// This can be written as:
// label = age &gt;= 18 ? "adult" : "minor";

if (age &gt;= 18) &#123;
  label = "adult";
&#125; else &#123;
  label = "minor";
&#125;</code></pre>
    <p class="mb-2 text-sm text-slate-500">What is the value of <code>label</code>?</p>
    <div class="flex items-center justify-center gap-2">
      <input type="text" bind:value={a3Answer} disabled={a3Result === 'correct'} placeholder="Answer" class="w-32 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm focus:border-orange-500 focus:outline-none disabled:opacity-50" />
      {#if a3Result !== 'correct'}
        <button onclick={checkA3} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if a3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! 21 &gt;= 18 is true, so the ternary evaluates to "adult".</p>{:else if a3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Is 21 &gt;= 18? The ternary returns the value before the colon if true, after the colon if false.</p>{/if}
  </div>

  {#if advAllDone}
    <div><p class="text-lg font-bold text-green-600">All advanced challenges complete!</p></div>
  {/if}
</div>
{/if}
