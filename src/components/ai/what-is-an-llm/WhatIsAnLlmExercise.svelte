<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: (score: number) => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode ===
  let b1Answer = $state('');
  let b1Result = $state<'correct' | 'wrong' | null>(null);
  let b2Answer = $state('');
  let b2Result = $state<'correct' | 'wrong' | null>(null);
  let b3Answer = $state('');
  let b3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(b1Result === 'correct' && b2Result === 'correct' && b3Result === 'correct');

  function checkB1() {
    const a = b1Answer.trim().toLowerCase();
    b1Result = (a === 'token' || a === 'tokens' || a === 'a token') ? 'correct' : 'wrong';
  }
  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    b2Result = (a === 'transformer' || a === 'transformers' || a === 'the transformer') ? 'correct' : 'wrong';
  }
  function checkB3() {
    const a = b3Answer.trim().toLowerCase();
    b3Result = (a === 'prompt' || a === 'a prompt' || a === 'the prompt') ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (allDone) {
      const score = [b1Result, b2Result, b3Result].filter(r => r === 'correct').length;
      oncomplete?.(score);
    }
  });

  // === Advanced mode ===
  let a1Answer = $state('');
  let a1Result = $state<'correct' | 'wrong' | null>(null);
  let a2Answer = $state('');
  let a2Result = $state<'correct' | 'wrong' | null>(null);
  let a3Answer = $state('');
  let a3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(a1Result === 'correct' && a2Result === 'correct' && a3Result === 'correct');

  function checkA1() {
    const a = a1Answer.trim().toLowerCase();
    a1Result = (a === 'attention' || a === 'self-attention' || a === 'self attention') ? 'correct' : 'wrong';
  }
  function checkA2() {
    const a = a2Answer.trim().toLowerCase();
    a2Result = (a === 'quantization' || a === 'quantisation') ? 'correct' : 'wrong';
  }
  function checkA3() {
    const a = a3Answer.trim().toLowerCase();
    a3Result = (a === 'hallucination' || a === 'hallucinations' || a === 'hallucinate') ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (advAllDone) {
      const score = [a1Result, a2Result, a3Result].filter(r => r === 'correct').length;
      oncomplete?.(score);
    }
  });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: LLM Basics</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section.</p>
  </div>

  <div class="rounded-xl border-2 {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-purple-200 bg-purple-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What is the smallest unit of text that an LLM processes?</p>
    <p class="text-sm text-slate-500">Hint: It might be a word, part of a word, or a single character.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b1Answer} placeholder="Your answer..." disabled={b1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-purple-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB1(); }} />
      <button onclick={checkB1} disabled={b1Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b1Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Tokens are the basic units that LLMs read and generate.</p>
    {:else if b1Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about the pieces text gets broken into before the model processes it.</p>
    {/if}
  </div>

  <div class="rounded-xl border-2 {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-purple-200 bg-purple-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What neural network architecture powers modern LLMs?</p>
    <p class="text-sm text-slate-500">Hint: It was introduced in "Attention Is All You Need."</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b2Answer} placeholder="Your answer..." disabled={b2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-purple-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB2(); }} />
      <button onclick={checkB2} disabled={b2Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b2Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! The Transformer architecture revolutionized natural language processing.</p>
    {:else if b2Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. The paper title is a big hint about the architecture name.</p>
    {/if}
  </div>

  <div class="rounded-xl border-2 {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-purple-200 bg-purple-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What do you call the text you type to instruct an LLM?</p>
    <p class="text-sm text-slate-500">Hint: Engineering this is now a valued skill.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b3Answer} placeholder="Your answer..." disabled={b3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-purple-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB3(); }} />
      <button onclick={checkB3} disabled={b3Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b3Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! A prompt is your instruction or question to the model.</p>
    {:else if b3Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about what "prompt engineering" is named after.</p>
    {/if}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You understand LLM fundamentals.</p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced LLM Concepts</h2>
    <p class="text-slate-600">Answer all three questions correctly.</p>
  </div>

  <div class="rounded-xl border-2 {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-purple-200 bg-purple-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What mechanism allows Transformers to weigh relationships between all tokens in a sequence?</p>
    <p class="text-sm text-slate-500">Hint: It uses Query, Key, and Value projections.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a1Answer} placeholder="Your answer..." disabled={a1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-purple-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA1(); }} />
      <button onclick={checkA1} disabled={a1Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a1Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Attention (specifically self-attention) is the core innovation of the Transformer.</p>
    {:else if a1Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. "... Is All You Need" — what fills in the blank?</p>
    {/if}
  </div>

  <div class="rounded-xl border-2 {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-purple-200 bg-purple-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What technique reduces model weight precision (e.g., 16-bit to 4-bit) to make inference faster and cheaper?</p>
    <p class="text-sm text-slate-500">Hint: It is about reducing the "quantity" of bits per number.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a2Answer} placeholder="Your answer..." disabled={a2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-purple-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA2(); }} />
      <button onclick={checkA2} disabled={a2Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a2Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Quantization trades a small amount of accuracy for significant speed and memory savings.</p>
    {:else if a2Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about the word for converting continuous values to discrete, lower-precision ones.</p>
    {/if}
  </div>

  <div class="rounded-xl border-2 {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-purple-200 bg-purple-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What is it called when an LLM generates confident but factually incorrect information?</p>
    <p class="text-sm text-slate-500">Hint: The term comes from perceiving things that are not really there.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a3Answer} placeholder="Your answer..." disabled={a3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-purple-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA3(); }} />
      <button onclick={checkA3} disabled={a3Result === 'correct'}
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a3Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Hallucination is a major challenge that techniques like RAG help mitigate.</p>
    {:else if a3Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. It is the same word used when people see or hear things that are not there.</p>
    {/if}
  </div>

  {#if advAllDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You have deep knowledge of LLM internals.</p>
    </div>
  {/if}

  {/if}
</div>
