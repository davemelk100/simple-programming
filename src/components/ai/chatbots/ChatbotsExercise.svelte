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
    b1Result = (a === 'system prompt' || a === 'the system prompt' || a === 'system message') ? 'correct' : 'wrong';
  }
  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    b2Result = (a === 'hallucination' || a === 'hallucinations' || a === 'hallucinate') ? 'correct' : 'wrong';
  }
  function checkB3() {
    const a = b3Answer.trim().toLowerCase();
    b3Result = (a === 'context window' || a === 'the context window' || a === 'context limit') ? 'correct' : 'wrong';
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
    a1Result = (a === 'rag' || a === 'retrieval-augmented generation' || a === 'retrieval augmented generation') ? 'correct' : 'wrong';
  }
  function checkA2() {
    const a = a2Answer.trim().toLowerCase();
    a2Result = (a === 'escalation' || a === 'escalate' || a === 'handoff' || a === 'hand off') ? 'correct' : 'wrong';
  }
  function checkA3() {
    const a = a3Answer.trim().toLowerCase();
    a3Result = (a === 'llm-as-judge' || a === 'llm as judge' || a === 'llm as a judge') ? 'correct' : 'wrong';
  }

  $effect(() => { if (advAllDone) oncomplete?.([a1Result, a2Result, a3Result].filter(r => r === 'correct').length); });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Chatbot Basics</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section.</p>
  </div>

  <div class="rounded-xl border-2 {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-pink-200 bg-pink-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What sets a chatbot's personality, tone, and behavioral rules?</p>
    <p class="text-sm text-slate-500">Hint: It is an instruction given to the AI before the user's conversation begins.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b1Answer} placeholder="Your answer..." disabled={b1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-pink-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-pink-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB1(); }} />
      <button onclick={checkB1} disabled={b1Result === 'correct'}
        class="rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b1Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! The system prompt defines the chatbot's behavior and persona.</p>
    {:else if b1Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. It is a ___ prompt that sets up the AI's role. Two words.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-pink-200 bg-pink-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What is it called when a chatbot confidently states false information?</p>
    <p class="text-sm text-slate-500">Hint: The same term used for seeing things that are not there.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b2Answer} placeholder="Your answer..." disabled={b2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-pink-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-pink-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB2(); }} />
      <button onclick={checkB2} disabled={b2Result === 'correct'}
        class="rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b2Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Hallucination is when AI generates plausible but factually wrong content.</p>
    {:else if b2Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Think about perceiving something that is not real.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-pink-200 bg-pink-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What limits how much conversation history a chatbot can remember?</p>
    <p class="text-sm text-slate-500">Hint: It is the maximum number of tokens the model can process. Two words.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b3Answer} placeholder="Your answer..." disabled={b3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-pink-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-pink-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB3(); }} />
      <button onclick={checkB3} disabled={b3Result === 'correct'}
        class="rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b3Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! The context window is the maximum tokens (input + output) the model handles.</p>
    {:else if b3Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. It is the ___ ___ that defines how much text the model can see at once.</p>{/if}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You understand chatbot fundamentals.</p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Chatbot Concepts</h2>
    <p class="text-slate-600">Answer all three questions correctly.</p>
  </div>

  <div class="rounded-xl border-2 {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-pink-200 bg-pink-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What technique gives chatbots access to external knowledge by searching a database before responding?</p>
    <p class="text-sm text-slate-500">Hint: Retrieval-Augmented ___. Three-letter acronym.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a1Answer} placeholder="Your answer..." disabled={a1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-pink-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-pink-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA1(); }} />
      <button onclick={checkA1} disabled={a1Result === 'correct'}
        class="rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a1Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! RAG retrieves relevant documents to ground the chatbot's responses in facts.</p>
    {:else if a1Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. R___ A___ G___ — what is the abbreviation?</p>{/if}
  </div>

  <div class="rounded-xl border-2 {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-pink-200 bg-pink-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What is the process of transferring a customer from a bot to a human agent called?</p>
    <p class="text-sm text-slate-500">Hint: In customer support, issues get ___ to a higher level.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a2Answer} placeholder="Your answer..." disabled={a2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-pink-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-pink-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA2(); }} />
      <button onclick={checkA2} disabled={a2Result === 'correct'}
        class="rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a2Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Escalation (or handoff) transfers the conversation to a human agent.</p>
    {:else if a2Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Issues are ___ to a higher level of support.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-pink-200 bg-pink-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What evaluation approach uses another AI model to judge chatbot response quality?</p>
    <p class="text-sm text-slate-500">Hint: An LLM acts as a ___ to evaluate responses.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a3Answer} placeholder="Your answer..." disabled={a3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-pink-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-pink-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA3(); }} />
      <button onclick={checkA3} disabled={a3Result === 'correct'}
        class="rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a3Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! LLM-as-judge uses AI to evaluate other AI's responses at scale.</p>
    {:else if a3Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. The LLM acts as a ___ (like in a courtroom) to evaluate quality.</p>{/if}
  </div>

  {#if advAllDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You have advanced chatbot knowledge.</p>
    </div>
  {/if}

  {/if}
</div>
