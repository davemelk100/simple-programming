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
  let c1Answer = $state('');
  let c1Result = $state<'correct' | 'wrong' | null>(null);

  let c2Answer = $state('');
  let c2Result = $state<'correct' | 'wrong' | null>(null);

  let c3Answer = $state('');
  let c3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(c1Result === 'correct' && c2Result === 'correct' && c3Result === 'correct');

  function checkC1() {
    const a = c1Answer.trim().toLowerCase();
    c1Result = [';', 'semicolon', 'a semicolon', 'the semicolon'].includes(a) ? 'correct' : 'wrong';
  }

  function checkC2() {
    const a = c2Answer.trim().toLowerCase();
    c2Result = ['{}', '{ }', 'curly braces', 'braces', 'curly brackets'].includes(a) ? 'correct' : 'wrong';
  }

  function checkC3() {
    const a = c3Answer.trim().toLowerCase();
    c3Result = ['c', 'the c language', 'c language'].includes(a) ? 'correct' : 'wrong';
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
    const a = adv1Answer.trim().toLowerCase();
    adv1Result = ['asi', 'automatic semicolon insertion'].includes(a) ? 'correct' : 'wrong';
  }

  function checkAdv2() {
    const a = adv2Answer.trim().toLowerCase();
    adv2Result = ['declarations', 'rules', 'properties', 'declaration block', 'a declaration block', 'property declarations', 'css declarations'].includes(a) ? 'correct' : 'wrong';
  }

  function checkAdv3() {
    const a = adv3Answer.trim().toLowerCase();
    adv3Result = ['=>', 'arrow', 'arrow function', 'fat arrow', '=>>'].includes(a) ? 'correct' : 'wrong';
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: C-Style Syntax Basics</h2>
    <p class="text-slate-600">Answer these three questions to test what you've learned about the C-style syntax family!</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What punctuation mark ends most statements in C-style languages?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It looks like a period with a comma underneath it.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c1Answer}
        placeholder="Type your answer..."
        disabled={c1Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The semicolon <code class="rounded bg-green-100 px-1 text-sm text-green-800">;</code> ends most statements, just like a period ends a sentence.</p>
    {:else if c1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Look at the end of a line like <code class="rounded bg-red-100 px-1 text-sm">let x = 5;</code> -- what comes last?</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What characters define a code block in C-style languages?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: They come in pairs -- one opens the block and the other closes it. They look curly.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c2Answer}
        placeholder="Type your answer..."
        disabled={c2Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Curly braces <code class="rounded bg-green-100 px-1 text-sm text-green-800">{"{}"}</code> define code blocks -- everything inside them belongs together.</p>
    {:else if c2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about the characters that wrap function bodies and if/else blocks. They're sometimes called "curly" something.</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What language from 1972 started this syntax style?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It's a very short name -- just a single letter.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c3Answer}
        placeholder="Type your answer..."
        disabled={c3Result === 'correct'}
        class="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The <strong>C</strong> programming language, created by Dennis Ritchie in 1972, established the curly-brace syntax style that nearly every mainstream language uses today.</p>
    {:else if c3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. This language was created by Dennis Ritchie at Bell Labs and is named with just one letter of the alphabet.</p>
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: C-Style Syntax (Advanced)</h2>
    <p class="text-slate-600">Test your deeper knowledge of C-style syntax nuances across languages.</p>
  </div>

  <!-- Advanced Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {adv1Result === 'correct' ? 'border-green-300 bg-green-50' : adv1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What JavaScript feature automatically inserts semicolons when they're missing?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It's a three-letter abbreviation. The parser does this for you (sometimes incorrectly).</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv1Answer}
        placeholder="Type your answer..."
        disabled={adv1Result === 'correct'}
        class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv1Result !== 'correct'}
        <button onclick={checkAdv1} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <strong>ASI</strong> (Automatic Semicolon Insertion) is JavaScript's parser feature that inserts semicolons where it thinks they should go. It usually works but can cause subtle bugs, like returning <code class="rounded bg-green-100 px-1 text-sm text-green-800">undefined</code> from a return statement on its own line.</p>
    {:else if adv1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think: "Automatic Semicolon ___". What would the abbreviation be?</p>
    {/if}
  </div>

  <!-- Advanced Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {adv2Result === 'correct' ? 'border-green-300 bg-green-50' : adv2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. In CSS, what do curly braces <code class="rounded bg-slate-100 px-1.5 py-0.5 text-blue-600">{"{}"}</code> wrap around?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: In <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">{".card { color: red; }"}</code>, the part inside the braces is called a ___ block.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv2Answer}
        placeholder="Type your answer..."
        disabled={adv2Result === 'correct'}
        class="w-56 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv2Result !== 'correct'}
        <button onclick={checkAdv2} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! CSS curly braces wrap <strong>declarations</strong> (property-value pairs) that define styles for the matched selector.</p>
    {:else if adv2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. In CSS, each <code class="text-sm">property: value;</code> pair inside braces is called a ___. What is the term for these statements?</p>
    {/if}
  </div>

  <!-- Advanced Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {adv3Result === 'correct' ? 'border-green-300 bg-green-50' : adv3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What is the arrow function shorthand for a single expression in JavaScript?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: In <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">{"(x) ___ x * 2"}</code>, what goes in the blank?</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv3Answer}
        placeholder="Type the symbol..."
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
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The <code class="rounded bg-green-100 px-1 text-sm text-green-800">{"=>"}</code> arrow syntax allows you to write concise functions without curly braces: <code class="rounded bg-green-100 px-1 text-sm text-green-800">{"(x) => x * 2"}</code>. When there's a single expression, the return is implicit.</p>
    {:else if adv3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. It's a two-character symbol made from an equals sign and a greater-than sign.</p>
    {/if}
  </div>

  {#if advAllDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All advanced challenges complete!</p>
    </div>
  {/if}
</div>

{/if}
