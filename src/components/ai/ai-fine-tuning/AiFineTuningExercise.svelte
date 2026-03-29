<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: (score: number) => void; }
  let { oncomplete }: Props = $props();

  let b1Answer = $state('');
  let b1Result = $state<'correct' | 'wrong' | null>(null);
  let b2Answer = $state('');
  let b2Result = $state<'correct' | 'wrong' | null>(null);
  let b3Answer = $state('');
  let b3Result = $state<'correct' | 'wrong' | null>(null);
  let allDone = $derived(b1Result === 'correct' && b2Result === 'correct' && b3Result === 'correct');

  function checkB1() {
    const a = b1Answer.trim().toLowerCase();
    b1Result = (a === 'fine-tuning' || a === 'fine tuning' || a === 'finetuning') ? 'correct' : 'wrong';
  }
  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    b2Result = (a === 'prompting' || a === 'prompt engineering' || a === 'a prompt') ? 'correct' : 'wrong';
  }
  function checkB3() {
    const a = b3Answer.trim().toLowerCase();
    b3Result = (a === 'examples' || a === 'training examples' || a === 'training data' || a === 'data') ? 'correct' : 'wrong';
  }

  $effect(() => { if (allDone) oncomplete?.([b1Result, b2Result, b3Result].filter(r => r === 'correct').length); });

  let a1Answer = $state('');
  let a1Result = $state<'correct' | 'wrong' | null>(null);
  let a2Answer = $state('');
  let a2Result = $state<'correct' | 'wrong' | null>(null);
  let a3Answer = $state('');
  let a3Result = $state<'correct' | 'wrong' | null>(null);
  let advAllDone = $derived(a1Result === 'correct' && a2Result === 'correct' && a3Result === 'correct');

  function checkA1() {
    const a = a1Answer.trim().toLowerCase();
    a1Result = (a === 'lora' || a === 'low-rank adaptation' || a === 'low rank adaptation') ? 'correct' : 'wrong';
  }
  function checkA2() {
    const a = a2Answer.trim().toLowerCase();
    a2Result = (a === 'rlhf' || a === 'reinforcement learning from human feedback') ? 'correct' : 'wrong';
  }
  function checkA3() {
    const a = a3Answer.trim().toLowerCase();
    a3Result = (a === 'catastrophic forgetting' || a === 'forgetting') ? 'correct' : 'wrong';
  }

  $effect(() => { if (advAllDone) oncomplete?.([a1Result, a2Result, a3Result].filter(r => r === 'correct').length); });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Fine-Tuning Basics</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section.</p>
  </div>

  <div class="rounded-xl border-2 {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-indigo-200 bg-indigo-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What is the process of further training a pre-trained model on specialized data called?</p>
    <p class="text-sm text-slate-500">Hint: You are making "fine" adjustments to "tune" the model.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b1Answer} placeholder="Your answer..." disabled={b1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB1(); }} />
      <button onclick={checkB1} disabled={b1Result === 'correct'}
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b1Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Fine-tuning specializes a general model for specific tasks.</p>
    {:else if b1Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. It involves making fine adjustments to tune the model.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-indigo-200 bg-indigo-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What alternative to fine-tuning involves just telling the model what to do in the input text?</p>
    <p class="text-sm text-slate-500">Hint: You write instructions in the ___ each time you call the model.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b2Answer} placeholder="Your answer..." disabled={b2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB2(); }} />
      <button onclick={checkB2} disabled={b2Result === 'correct'}
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b2Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Prompting is the zero-training alternative to fine-tuning.</p>
    {:else if b2Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. It is the same word as in "prompt engineering."</p>{/if}
  </div>

  <div class="rounded-xl border-2 {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-indigo-200 bg-indigo-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What do you need to provide when fine-tuning a model?</p>
    <p class="text-sm text-slate-500">Hint: Input/output pairs that show the model what you want it to do.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b3Answer} placeholder="Your answer..." disabled={b3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB3(); }} />
      <button onclick={checkB3} disabled={b3Result === 'correct'}
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b3Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Training examples (data) teach the model the patterns you want.</p>
    {:else if b3Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Think about what the model learns from — input/output pairs.</p>{/if}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You understand fine-tuning fundamentals.</p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Fine-Tuning</h2>
    <p class="text-slate-600">Answer all three questions correctly.</p>
  </div>

  <div class="rounded-xl border-2 {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-indigo-200 bg-indigo-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What technique adds small trainable adapters to a frozen model, training only ~1% of parameters?</p>
    <p class="text-sm text-slate-500">Hint: Four letters. Low-Rank ___.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a1Answer} placeholder="Your answer..." disabled={a1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA1(); }} />
      <button onclick={checkA1} disabled={a1Result === 'correct'}
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a1Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! LoRA (Low-Rank Adaptation) is the most popular efficient fine-tuning method.</p>
    {:else if a1Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Low-Rank Adaptation — what is the abbreviation?</p>{/if}
  </div>

  <div class="rounded-xl border-2 {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-indigo-200 bg-indigo-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What training method uses human preferences to align model behavior? (Used by Claude and ChatGPT)</p>
    <p class="text-sm text-slate-500">Hint: Reinforcement Learning from Human ___. Four-letter acronym.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a2Answer} placeholder="Your answer..." disabled={a2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA2(); }} />
      <button onclick={checkA2} disabled={a2Result === 'correct'}
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a2Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! RLHF is how modern AI assistants are trained to be helpful and safe.</p>
    {:else if a2Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. R___ L___ from H___ F___ — what is the abbreviation?</p>{/if}
  </div>

  <div class="rounded-xl border-2 {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-indigo-200 bg-indigo-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What problem occurs when a model loses general knowledge while learning a new task?</p>
    <p class="text-sm text-slate-500">Hint: It is "catastrophic" and involves losing what was previously learned.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a3Answer} placeholder="Your answer..." disabled={a3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA3(); }} />
      <button onclick={checkA3} disabled={a3Result === 'correct'}
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a3Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Catastrophic forgetting is why techniques like LoRA (which freeze the base model) are so valuable.</p>
    {:else if a3Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. The model "catastrophically" does what to its old knowledge?</p>{/if}
  </div>

  {#if advAllDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You have advanced fine-tuning knowledge.</p>
    </div>
  {/if}

  {/if}
</div>
