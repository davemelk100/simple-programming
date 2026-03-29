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
    b1Result = (a === 'tab' || a === 'press tab' || a === 'the tab key') ? 'correct' : 'wrong';
  }
  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    b2Result = (a === 'context' || a === 'code context' || a === 'the context') ? 'correct' : 'wrong';
  }
  function checkB3() {
    const a = b3Answer.trim().toLowerCase();
    b3Result = (a === 'review' || a === 'review it' || a === 'code review' || a === 'always review') ? 'correct' : 'wrong';
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
    a1Result = (a === 'fim' || a === 'fill-in-the-middle' || a === 'fill in the middle') ? 'correct' : 'wrong';
  }
  function checkA2() {
    const a = a2Answer.trim().toLowerCase();
    a2Result = (a === 'rag' || a === 'retrieval-augmented generation' || a === 'retrieval augmented generation') ? 'correct' : 'wrong';
  }
  function checkA3() {
    const a = a3Answer.trim().toLowerCase();
    a3Result = (a === 'license' || a === 'licensing' || a === 'licenses' || a === 'licence') ? 'correct' : 'wrong';
  }

  $effect(() => { if (advAllDone) oncomplete?.([a1Result, a2Result, a3Result].filter(r => r === 'correct').length); });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Copilot Basics</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section.</p>
  </div>

  <div class="rounded-xl border-2 {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What key do you typically press to accept a copilot's inline suggestion?</p>
    <p class="text-sm text-slate-500">Hint: It is the same key used for indentation.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b1Answer} placeholder="Your answer..." disabled={b1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB1(); }} />
      <button onclick={checkB1} disabled={b1Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b1Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Tab accepts the suggestion, Esc dismisses it.</p>
    {:else if b1Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Think about which key is on the left side of your keyboard, used for indentation.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What does a copilot use from your project to make better suggestions?</p>
    <p class="text-sm text-slate-500">Hint: Your open files, function names, comments, and project structure are all part of this.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b2Answer} placeholder="Your answer..." disabled={b2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB2(); }} />
      <button onclick={checkB2} disabled={b2Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b2Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Context from your code gives the copilot the information it needs.</p>
    {:else if b2Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. It is the surrounding information that helps the AI understand your intent.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What should you always do with copilot-generated code before committing it?</p>
    <p class="text-sm text-slate-500">Hint: Do not blindly accept suggestions.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b3Answer} placeholder="Your answer..." disabled={b3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB3(); }} />
      <button onclick={checkB3} disabled={b3Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b3Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Always review and understand generated code before using it.</p>
    {:else if b3Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. You need to carefully examine what the copilot wrote.</p>{/if}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You know how to use copilots effectively.</p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Copilot Concepts</h2>
    <p class="text-slate-600">Answer all three questions correctly.</p>
  </div>

  <div class="rounded-xl border-2 {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What training technique lets copilot models fill in code given both prefix and suffix?</p>
    <p class="text-sm text-slate-500">Hint: The acronym is three letters and describes filling in the ___ of something.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a1Answer} placeholder="Your answer..." disabled={a1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA1(); }} />
      <button onclick={checkA1} disabled={a1Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a1Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Fill-in-the-Middle (FIM) models see both prefix and suffix for better completions.</p>
    {:else if a1Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Fill in the ___. What goes in the blank?</p>{/if}
  </div>

  <div class="rounded-xl border-2 {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What technique searches your codebase for relevant code before generating suggestions?</p>
    <p class="text-sm text-slate-500">Hint: It retrieves relevant information to augment the generation. Three-letter acronym.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a2Answer} placeholder="Your answer..." disabled={a2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA2(); }} />
      <button onclick={checkA2} disabled={a2Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a2Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! RAG retrieves relevant code from your project to improve generation quality.</p>
    {:else if a2Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Retrieval-Augmented Generation — what is the abbreviation?</p>{/if}
  </div>

  <div class="rounded-xl border-2 {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What legal concern arises when copilot-generated code resembles open-source training data?</p>
    <p class="text-sm text-slate-500">Hint: Open-source software has rules about how it can be used and shared.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a3Answer} placeholder="Your answer..." disabled={a3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA3(); }} />
      <button onclick={checkA3} disabled={a3Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a3Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! License compliance is important when using AI-generated code.</p>
    {:else if a3Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Think about the legal terms attached to open-source software (MIT, GPL, etc.).</p>{/if}
  </div>

  {#if advAllDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You have advanced copilot knowledge.</p>
    </div>
  {/if}

  {/if}
</div>
