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

  // === Basic mode state ===
  // Challenge 1: create a variable
  let c1Label = $state('');
  let c1Value = $state('');
  let c1Result = $state<'correct' | 'wrong' | null>(null);

  // Challenge 2: read a value
  let c2Answer = $state('');
  let c2Result = $state<'correct' | 'wrong' | null>(null);

  // Challenge 3: update a value
  let c3Value = $state('10');
  let c3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(c1Result === 'correct' && c2Result === 'correct' && c3Result === 'correct');

  function checkC1() {
    c1Result = c1Label.trim().toLowerCase() === 'greeting' && c1Value.trim().toLowerCase() === 'hello' ? 'correct' : 'wrong';
  }

  function checkC2() {
    c2Result = c2Answer.trim() === '25' ? 'correct' : 'wrong';
  }

  function checkC3() {
    c3Result = c3Value.trim() === '20' ? 'correct' : 'wrong';
  }

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
  // Challenge 1: predict type of expression
  let adv1Answer = $state('');
  let adv1Result = $state<'correct' | 'wrong' | null>(null);

  // Challenge 2: fix scoping bug
  let adv2Answer = $state('');
  let adv2Result = $state<'correct' | 'wrong' | null>(null);

  // Challenge 3: const object mutation
  let adv3Answer = $state('');
  let adv3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(adv1Result === 'correct' && adv2Result === 'correct' && adv3Result === 'correct');

  function checkAdv1() {
    adv1Result = adv1Answer.trim().toLowerCase() === 'string' ? 'correct' : 'wrong';
  }

  function checkAdv2() {
    adv2Result = adv2Answer.trim().toLowerCase() === 'let' ? 'correct' : 'wrong';
  }

  function checkAdv3() {
    adv3Result = adv3Answer.trim() === '42' ? 'correct' : 'wrong';
  }

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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Variables</h2>
    <p class="text-slate-600">Test what you've learned about labeled storage boxes!</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. Create a variable called <code class="rounded bg-slate-100 px-1.5 py-0.5 text-blue-600">greeting</code> with the value <code class="rounded bg-slate-100 px-1.5 py-0.5 text-blue-600">hello</code>
    </p>
    <div class="flex flex-wrap items-center gap-2">
      <input
        type="text"
        bind:value={c1Label}
        placeholder="Label"
        disabled={c1Result === 'correct'}
        class="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      <span class="text-slate-500">=</span>
      <input
        type="text"
        bind:value={c1Value}
        placeholder="Value"
        disabled={c1Result === 'correct'}
        class="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! You created a variable.</p>
    {:else if c1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. The label should be "greeting" and the value should be "hello".</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What value is stored in this box?
    </p>
    <div class="mb-3 flex justify-center">
      <div class="relative flex h-24 w-32 items-center justify-center rounded-xl border-2 border-dashed border-purple-400 bg-purple-50 shadow-md">
        <div class="absolute -top-3 rounded-full border border-purple-400 bg-white px-3 py-0.5 text-xs font-bold text-purple-700">age</div>
        <span class="text-xl font-bold text-purple-700">25</span>
      </div>
    </div>
    <div class="flex items-center justify-center gap-2">
      <input
        type="text"
        bind:value={c2Answer}
        placeholder="Type the value"
        disabled={c2Result === 'correct'}
        class="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm text-center focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The box labeled "age" holds 25.</p>
    {:else if c2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Look at what's inside the box and try again!</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. Update the variable <code class="rounded bg-slate-100 px-1.5 py-0.5 text-blue-600">score</code> from 10 to 20.
    </p>
    <div class="flex items-center justify-center gap-3">
      <div class="relative flex h-24 w-32 items-center justify-center rounded-xl border-2 border-dashed border-orange-400 bg-orange-50 shadow-md">
        <div class="absolute -top-3 rounded-full border border-orange-400 bg-white px-3 py-0.5 text-xs font-bold text-orange-700">score</div>
        <input
          type="text"
          bind:value={c3Value}
          disabled={c3Result === 'correct'}
          class="w-16 rounded border-none bg-transparent text-center text-xl font-bold text-orange-700 focus:outline-none disabled:opacity-70"
        />
      </div>
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! You updated the value to 20.</p>
    {:else if c3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Change the value inside the box to 20!</p>
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Variables (Advanced)</h2>
    <p class="text-slate-600">Test your deeper understanding of types, scoping, and mutability.</p>
  </div>

  <!-- Advanced Challenge 1: Type coercion -->
  <div class="rounded-xl border p-5 transition-colors {adv1Result === 'correct' ? 'border-green-300 bg-green-50' : adv1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What does <code class="rounded bg-slate-100 px-1.5 py-0.5 text-blue-600">typeof (5 + "3")</code> return?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: JavaScript coerces types when you mix numbers and strings with <code class="rounded bg-slate-100 px-1 py-0.5">+</code>.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv1Answer}
        placeholder="Type the result"
        disabled={adv1Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv1Result !== 'correct'}
        <button onclick={checkAdv1} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code>5 + "3"</code> becomes <code>"53"</code> (a string), so <code>typeof</code> returns <code>"string"</code>.</p>
    {:else if adv1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about what happens when you add a number to a string with <code>+</code>.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 2: var vs let scoping -->
  <div class="rounded-xl border p-5 transition-colors {adv2Result === 'correct' ? 'border-green-300 bg-green-50' : adv2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. Fix the scoping bug. Which keyword should replace <code class="rounded bg-slate-100 px-1.5 py-0.5 text-blue-600">var</code> so each timeout logs 0, 1, 2?
    </p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-4 text-sm leading-relaxed text-slate-100 overflow-x-auto"><code>for (<span class="text-red-400">var</span> <span class="text-blue-300">i</span> = <span class="text-yellow-300">0</span>; <span class="text-blue-300">i</span> &lt; <span class="text-yellow-300">3</span>; <span class="text-blue-300">i</span>++) &#123;
  <span class="text-blue-300">setTimeout</span>(() =&gt; <span class="text-blue-300">console</span>.<span class="text-blue-300">log</span>(<span class="text-blue-300">i</span>), <span class="text-yellow-300">100</span>);
&#125;
<span class="text-slate-500">// Currently logs: 3, 3, 3</span></code></pre>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv2Answer}
        placeholder="Replace var with..."
        disabled={adv2Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv2Result !== 'correct'}
        <button onclick={checkAdv2} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code>let</code> is block-scoped, so each iteration gets its own <code>i</code>.</p>
    {:else if adv2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think about which keyword creates a new binding per block/iteration.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 3: const object mutation -->
  <div class="rounded-xl border p-5 transition-colors {adv3Result === 'correct' ? 'border-green-300 bg-green-50' : adv3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What is <code class="rounded bg-slate-100 px-1.5 py-0.5 text-blue-600">obj.x</code> after this code runs?
    </p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-4 text-sm leading-relaxed text-slate-100 overflow-x-auto"><code><span class="text-purple-400">const</span> <span class="text-blue-300">obj</span> = &#123; <span class="text-blue-300">x</span>: <span class="text-yellow-300">10</span> &#125;;
<span class="text-blue-300">obj</span>.<span class="text-blue-300">x</span> = <span class="text-yellow-300">42</span>;
<span class="text-blue-300">console</span>.<span class="text-blue-300">log</span>(<span class="text-blue-300">obj</span>.<span class="text-blue-300">x</span>);</code></pre>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv3Answer}
        placeholder="Value of obj.x"
        disabled={adv3Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv3Result !== 'correct'}
        <button onclick={checkAdv3} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code>const</code> prevents reassigning the variable, but object properties can still be changed.</p>
    {:else if adv3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Remember: <code>const</code> locks the binding, not the object's contents. Properties can still be mutated.</p>
    {/if}
  </div>

  {#if advAllDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All advanced challenges complete!</p>
    </div>
  {/if}
</div>

{/if}
