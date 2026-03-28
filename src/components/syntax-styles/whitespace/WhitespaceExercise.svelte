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
    const a = c1Answer.trim().toLowerCase();
    c1Result = (a === '4' || a === 'four') ? 'correct' : 'wrong';
  }

  function checkC2() {
    const a = c2Answer.trim().toLowerCase();
    const accepted = ['error', 'an error', 'indentation error', 'indentationerror', 'syntax error', 'taberror', 'tab error'];
    c2Result = accepted.some((v) => a.includes(v) || v.includes(a)) && a.length > 0 ? 'correct' : 'wrong';
  }

  function checkC3() {
    const a = c3Answer.trim().toLowerCase();
    c3Result = (a === '-' || a === 'dash' || a === 'a dash' || a === 'hyphen' || a === 'a hyphen') ? 'correct' : 'wrong';
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
    adv1Result = (a === 'off-side rule' || a === 'offside rule' || a === 'off side rule' || a === 'the off-side rule' || a === 'the offside rule') ? 'correct' : 'wrong';
  }

  function checkAdv2() {
    const a = adv2Answer.trim().toLowerCase();
    adv2Result = (a === 'pep 8' || a === 'pep8' || a === '8') ? 'correct' : 'wrong';
  }

  function checkAdv3() {
    const a = adv3Answer.trim().toLowerCase();
    adv3Result = (a === '|' || a === 'pipe' || a === 'literal block scalar' || a === 'literal block' || a === 'the pipe character') ? 'correct' : 'wrong';
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Whitespace Basics</h2>
    <p class="text-slate-600">Test your knowledge of how whitespace-sensitive languages work!</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. In Python, how many spaces is the standard indentation per level?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: This is defined in Python's official style guide (PEP 8).</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c1Answer}
        placeholder="Type a number"
        disabled={c1Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Python's PEP 8 style guide recommends 4 spaces per indentation level.</p>
    {:else if c1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about Python's official style recommendation -- it's the most common indent size you'll see in Python code.</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What happens if you mix tabs and spaces for indentation in Python 3?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: Python 3 is strict about this. It won't silently guess what you meant.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c2Answer}
        placeholder="What does Python do?"
        disabled={c2Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Python 3 raises a <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">TabError</code> when tabs and spaces are mixed for indentation. No ambiguity allowed!</p>
    {:else if c2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Python 3 doesn't try to figure out mixed indentation -- it stops execution. What does a program do when something isn't allowed?</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. In YAML, what character starts a list item?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It's a single punctuation character, followed by a space, then the item value.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c3Answer}
        placeholder="Type the character"
        disabled={c3Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! In YAML, list items start with a dash (<code class="rounded bg-slate-100 px-1 text-sm text-purple-700">-</code>) followed by a space.</p>
    {:else if c3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about how bullet points look in plain text -- YAML uses a similar character.</p>
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Whitespace (Advanced)</h2>
    <p class="text-slate-600">Test your deeper knowledge of whitespace-sensitive language design and conventions.</p>
  </div>

  <!-- Advanced Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {adv1Result === 'correct' ? 'border-green-300 bg-green-50' : adv1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What is the formal name for the rule where indentation defines block structure?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It was named by Peter Landin in 1966 and is a play on a football term.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv1Answer}
        placeholder="Type the rule name"
        disabled={adv1Result === 'correct'}
        class="w-56 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv1Result !== 'correct'}
        <button onclick={checkAdv1} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The <strong>off-side rule</strong> states that tokens to the left of the current block's first token start a new declaration. Python, Haskell, and F# all use it.</p>
    {:else if adv1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about football -- when a player is past the line, they are "off ____." Now add "rule" to that.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {adv2Result === 'correct' ? 'border-green-300 bg-green-50' : adv2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What Python PEP defines the official style guide (including the 4-space indentation rule)?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It's one of the most well-known PEPs and has a single-digit number.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv2Answer}
        placeholder="PEP ___"
        disabled={adv2Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv2Result !== 'correct'}
        <button onclick={checkAdv2} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <strong>PEP 8</strong> is Python's style guide, written by Guido van Rossum. It covers indentation, naming conventions, line length, and much more.</p>
    {:else if adv2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. It's a very low number. The most famous Python PEP of all -- "PEP" followed by a single digit.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {adv3Result === 'correct' ? 'border-green-300 bg-green-50' : adv3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. In YAML, what character (block scalar indicator) do you use to write a multi-line string that preserves newlines?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: It's a single character. The "folded" version uses <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">&gt;</code>, but this one keeps each newline as-is.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv3Answer}
        placeholder="Type the character"
        disabled={adv3Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv3Result !== 'correct'}
        <button onclick={checkAdv3} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">|</code> (pipe) character is the literal block scalar indicator in YAML. It preserves newlines exactly as written.</p>
    {:else if adv3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. It's the vertical bar character on your keyboard, often called the "pipe." It looks like a straight vertical line.</p>
    {/if}
  </div>

  {#if advAllDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All advanced challenges complete!</p>
    </div>
  {/if}
</div>
{/if}
