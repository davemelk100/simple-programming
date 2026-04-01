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

  // === Basic mode ===
  let c1Answer = $state('');
  let c1Result = $state<'correct' | 'wrong' | null>(null);

  let c2Answer = $state('');
  let c2Result = $state<'correct' | 'wrong' | null>(null);

  let c3Answer = $state('');
  let c3Result = $state<'correct' | 'wrong' | null>(null);

  let c4Answer = $state('');
  let c4Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(c1Result === 'correct' && c2Result === 'correct' && c3Result === 'correct' && c4Result === 'correct');

  function checkC1() {
    const a = c1Answer.trim().toLowerCase().replace(/[<>/]/g, '');
    c1Result = (a === 'p') ? 'correct' : 'wrong';
  }

  function checkC2() {
    const a = c2Answer.trim().toLowerCase();
    c2Result = (a === 'nesting' || a === 'nested' || a === 'putting tags inside other tags' || a === 'tags inside tags' || a === 'elements inside elements') ? 'correct' : 'wrong';
  }

  function checkC3() {
    const a = c3Answer.trim().toLowerCase().replace(/[<>/]/g, '');
    c3Result = (a === 'body') ? 'correct' : 'wrong';
  }

  function checkC4() {
    const a = c4Answer.trim().toLowerCase().replace(/[<>/]/g, '');
    c4Result = (a === 'head') ? 'correct' : 'wrong';
  }

  function handleComplete() {
    const score = [c1Result, c2Result, c3Result, c4Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (allDone) {
      handleComplete();
    }
  });

  // === Advanced mode ===
  let adv1Answer = $state('');
  let adv1Result = $state<'correct' | 'wrong' | null>(null);

  let adv2Answer = $state('');
  let adv2Result = $state<'correct' | 'wrong' | null>(null);

  let adv3Answer = $state('');
  let adv3Result = $state<'correct' | 'wrong' | null>(null);

  let adv4Answer = $state('');
  let adv4Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(adv1Result === 'correct' && adv2Result === 'correct' && adv3Result === 'correct' && adv4Result === 'correct');

  function checkAdv1() {
    const a = adv1Answer.trim().toLowerCase().replace(/[<>/]/g, '');
    adv1Result = (a === 'main') ? 'correct' : 'wrong';
  }

  function checkAdv2() {
    const a = adv2Answer.trim().toLowerCase();
    adv2Result = (a === 'dom' || a === 'document object model') ? 'correct' : 'wrong';
  }

  function checkAdv3() {
    const a = adv3Answer.trim().toLowerCase().replace(/[<>/]/g, '');
    adv3Result = (a === 'article') ? 'correct' : 'wrong';
  }

  function checkAdv4() {
    const a = adv4Answer.trim().toLowerCase().replace(/[<>/!]/g, '').trim();
    adv4Result = (a === 'doctype html' || a === '!doctype html' || a === 'doctype') ? 'correct' : 'wrong';
  }

  function handleAdvComplete() {
    const score = [adv1Result, adv2Result, adv3Result, adv4Result].filter((r) => r === 'correct').length;
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: HTML Structure</h2>
    <p class="text-slate-600">Test your understanding of how HTML pages are built!</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What HTML tag creates a paragraph?
    </p>
    <p class="mb-3 text-sm text-slate-500">Just the tag name — no angle brackets needed.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c1Answer}
        placeholder="Tag name..."
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
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The &lt;p&gt; tag creates a paragraph.</p>
    {:else if c1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. It is a single letter — think "p" for paragraph.</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What is it called when you place HTML elements inside other elements?
    </p>
    <p class="mb-3 text-sm text-slate-500">Like boxes within boxes — this concept has a specific name.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c2Answer}
        placeholder="The term is..."
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
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Nesting is when you place elements inside other elements.</p>
    {:else if c2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think of a bird's nest — things placed inside something else.</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. Which section of an HTML page holds the visible content?
    </p>
    <p class="mb-3 text-sm text-slate-500">Everything the user sees — headings, text, images — lives inside this element.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c3Answer}
        placeholder="Element name..."
        disabled={c3Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The &lt;body&gt; contains everything visible on the page.</p>
    {:else if c3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. It is the counterpart to &lt;head&gt; — think about what part of you is visible.</p>
    {/if}
  </div>

  <!-- Challenge 4 -->
  <div class="rounded-xl border p-5 transition-colors {c4Result === 'correct' ? 'border-green-300 bg-green-50' : c4Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      4. Which section of an HTML page holds metadata like the title and character encoding?
    </p>
    <p class="mb-3 text-sm text-slate-500">This invisible section is not displayed in the browser window.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c4Answer}
        placeholder="Element name..."
        disabled={c4Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if c4Result !== 'correct'}
        <button onclick={checkC4} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c4Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The &lt;head&gt; holds metadata — title, charset, stylesheets, and more.</p>
    {:else if c4Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. It is the counterpart to &lt;body&gt; — the "thinking" part of the page.</p>
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: HTML Structure (Advanced)</h2>
    <p class="text-slate-600">Test your deeper knowledge of semantic HTML and document structure.</p>
  </div>

  <!-- Advanced Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {adv1Result === 'correct' ? 'border-green-300 bg-green-50' : adv1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What semantic HTML5 element wraps the primary content of a page?
    </p>
    <p class="mb-3 text-sm text-slate-500">There should only be one of these per page, and it excludes headers, footers, and sidebars.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv1Answer}
        placeholder="Element name..."
        disabled={adv1Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv1Result !== 'correct'}
        <button onclick={checkAdv1} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The &lt;main&gt; element wraps the dominant content of the page.</p>
    {:else if adv1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about the word for the most important or central thing.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {adv2Result === 'correct' ? 'border-green-300 bg-green-50' : adv2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What is the tree structure called that the browser builds from your HTML?
    </p>
    <p class="mb-3 text-sm text-slate-500">JavaScript uses this tree to read and modify the page. It is a three-letter abbreviation.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv2Answer}
        placeholder="Abbreviation or full name..."
        disabled={adv2Result === 'correct'}
        class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv2Result !== 'correct'}
        <button onclick={checkAdv2} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The DOM (Document Object Model) is the browser's tree representation of your HTML.</p>
    {:else if adv2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. It stands for Document Object Model.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {adv3Result === 'correct' ? 'border-green-300 bg-green-50' : adv3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What semantic element represents a self-contained piece of content, like a blog post?
    </p>
    <p class="mb-3 text-sm text-slate-500">It could be syndicated or reused independently from the rest of the page.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv3Answer}
        placeholder="Element name..."
        disabled={adv3Result === 'correct'}
        class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv3Result !== 'correct'}
        <button onclick={checkAdv3} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The &lt;article&gt; element represents self-contained, distributable content.</p>
    {:else if adv3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about what you call a blog post or news story.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 4 -->
  <div class="rounded-xl border p-5 transition-colors {adv4Result === 'correct' ? 'border-green-300 bg-green-50' : adv4Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      4. What declaration must appear on the very first line of an HTML5 document?
    </p>
    <p class="mb-3 text-sm text-slate-500">It tells the browser which version of HTML to use.</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv4Answer}
        placeholder="The declaration..."
        disabled={adv4Result === 'correct'}
        class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv4Result !== 'correct'}
        <button onclick={checkAdv4} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv4Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! &lt;!DOCTYPE html&gt; tells the browser this is an HTML5 document.</p>
    {:else if adv4Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. It starts with &lt;! and includes the word DOCTYPE.</p>
    {/if}
  </div>

  {#if advAllDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All advanced challenges complete!</p>
    </div>
  {/if}
</div>

{/if}
