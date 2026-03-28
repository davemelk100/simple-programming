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
  let c1Answer = $state('');
  let c1Result = $state<'correct' | 'wrong' | null>(null);

  let c2Answer = $state('');
  let c2Result = $state<'correct' | 'wrong' | null>(null);

  let c3Answer = $state('');
  let c3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(c1Result === 'correct' && c2Result === 'correct' && c3Result === 'correct');

  function checkC1() {
    c1Result = c1Answer.trim().toLowerCase() === 'func' ? 'correct' : 'wrong';
  }

  function checkC2() {
    const answer = c2Answer.trim().toLowerCase();
    c2Result = ['binary', 'executable', 'file'].includes(answer) ? 'correct' : 'wrong';
  }

  function checkC3() {
    c3Result = c3Answer.trim() === ':=' ? 'correct' : 'wrong';
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
  let adv1Answer = $state('');
  let adv1Result = $state<'correct' | 'wrong' | null>(null);

  let adv2Answer = $state('');
  let adv2Result = $state<'correct' | 'wrong' | null>(null);

  let adv3Answer = $state('');
  let adv3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(adv1Result === 'correct' && adv2Result === 'correct' && adv3Result === 'correct');

  function checkAdv1() {
    adv1Result = adv1Answer.trim().toLowerCase() === 'go' ? 'correct' : 'wrong';
  }

  function checkAdv2() {
    const answer = adv2Answer.trim().toLowerCase();
    adv2Result = ['channel', 'chan'].includes(answer) ? 'correct' : 'wrong';
  }

  function checkAdv3() {
    const answer = adv3Answer.trim().toLowerCase();
    adv3Result = ['values', 'return values', 'a value'].includes(answer) ? 'correct' : 'wrong';
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Go Basics</h2>
    <p class="text-slate-600">Test what you've learned about Go's fundamentals!</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What keyword declares a function in Go?
    </p>
    <pre class="mb-3 code-block"><code>{@html `<span class="kw">???</span> <span class="fn">greet</span>(<span class="arg">name</span> <span class="var">string</span>) <span class="var">string</span> {
    <span class="kw">return</span> <span class="str">"Hello, "</span> <span class="op">+</span> <span class="var">name</span>
}`}</code></pre>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c1Answer}
        placeholder="Type the keyword"
        disabled={c1Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:opacity-50"
      />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">func</code> is the keyword to declare functions in Go.</p>
    {:else if c1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about what Go uses instead of "function" or "def".</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. Go compiles to a single ___
    </p>
    <p class="mb-3 text-sm text-slate-500">
      One of Go's biggest advantages is that it produces a single file you can deploy anywhere
      with no dependencies.
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c2Answer}
        placeholder="Type the answer"
        disabled={c2Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:opacity-50"
      />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Go compiles to a single binary -- no runtime or interpreter needed.</p>
    {:else if c2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think about the type of file you get when you compile a program.</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What operator creates a short variable declaration in Go?
    </p>
    <pre class="mb-3 code-block"><code>{@html `<span class="var">name</span> <span class="op">???</span> <span class="str">"Gopher"</span>  <span class="cmt">// short variable declaration</span>
<span class="kw">var</span> <span class="var">name</span> <span class="var">string</span> <span class="op">=</span> <span class="str">"Gopher"</span>  <span class="cmt">// long form (equivalent)</span>`}</code></pre>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c3Answer}
        placeholder="Type the operator"
        disabled={c3Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:opacity-50"
      />
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">:=</code> declares and assigns a variable in one step.</p>
    {:else if c3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Hint: it combines a colon and an equals sign.</p>
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Go Advanced</h2>
    <p class="text-slate-600">Test your knowledge of goroutines, channels, and Go's error philosophy.</p>
  </div>

  <!-- Advanced Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {adv1Result === 'correct' ? 'border-green-300 bg-green-50' : adv1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What keyword starts a concurrent function in Go?
    </p>
    <pre class="mb-3 code-block"><code>{@html `<span class="kw">???</span> <span class="fn">processData</span>(<span class="var">input</span>)  <span class="cmt">// runs concurrently</span>`}</code></pre>
    <p class="mb-3 text-sm text-slate-500">
      Hint: it's the same as the language name.
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv1Answer}
        placeholder="Type the keyword"
        disabled={adv1Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv1Result !== 'correct'}
        <button onclick={checkAdv1} class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">go</code> keyword launches a function as a goroutine.</p>
    {:else if adv1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">It's a very short keyword -- and it shares its name with the language.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {adv2Result === 'correct' ? 'border-green-300 bg-green-50' : adv2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What Go type allows goroutines to communicate?
    </p>
    <pre class="mb-3 code-block"><code>{@html `<span class="var">ch</span> <span class="op">:=</span> <span class="fn">make</span>(<span class="kw">chan</span> <span class="var">int</span>)  <span class="cmt">// create one</span>
<span class="var">ch</span> <span class="op"><-</span> <span class="num">42</span>              <span class="cmt">// send a value</span>
<span class="var">val</span> <span class="op">:=</span> <span class="op"><-</span><span class="var">ch</span>            <span class="cmt">// receive a value</span>`}</code></pre>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv2Answer}
        placeholder="Type the answer"
        disabled={adv2Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv2Result !== 'correct'}
        <button onclick={checkAdv2} class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Channels are Go's primary mechanism for goroutine communication.</p>
    {:else if adv2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Look at the keyword used with <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">make()</code> in the code above.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {adv3Result === 'correct' ? 'border-green-300 bg-green-50' : adv3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. In Go, errors are returned as ___
    </p>
    <pre class="mb-3 code-block"><code>{@html `<span class="var">file</span>, <span class="var">err</span> <span class="op">:=</span> <span class="fn">os.Open</span>(<span class="str">"config.json"</span>)
<span class="kw">if</span> <span class="var">err</span> <span class="op">!=</span> <span class="kw">nil</span> {
    <span class="cmt">// handle the error</span>
}`}</code></pre>
    <p class="mb-3 text-sm text-slate-500">
      Go doesn't use exceptions. Instead, errors are just regular ___ returned from functions.
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv3Answer}
        placeholder="Type the answer"
        disabled={adv3Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv3Result !== 'correct'}
        <button onclick={checkAdv3} class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Go treats errors as ordinary values, making error handling explicit and visible.</p>
    {:else if adv3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think about what <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">err</code> is in the code -- it's a regular return ___.</p>
    {/if}
  </div>

  {#if advAllDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All advanced challenges complete!</p>
    </div>
  {/if}
</div>

{/if}

<style>
  .code-block {
    background-color: #0f172a;
    border: 1px solid #334155;
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    font-size: 0.875rem;
    line-height: 1.7;
    overflow-x: auto;
  }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
