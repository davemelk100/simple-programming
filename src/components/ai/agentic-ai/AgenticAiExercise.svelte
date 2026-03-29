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
    b1Result = (a === 'tool' || a === 'tools' || a === 'tool use') ? 'correct' : 'wrong';
  }
  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    b2Result = (a === 'react' || a === 'reasoning and acting' || a === 'reason and act') ? 'correct' : 'wrong';
  }
  function checkB3() {
    const a = b3Answer.trim().toLowerCase();
    b3Result = (a === 'observe' || a === 'observation' || a === 'observing') ? 'correct' : 'wrong';
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
    a1Result = (a === 'mcp' || a === 'model context protocol') ? 'correct' : 'wrong';
  }
  function checkA2() {
    const a = a2Answer.trim().toLowerCase();
    a2Result = (a === 'multi-agent' || a === 'multi agent' || a === 'multi-agent system' || a === 'multi-agent systems') ? 'correct' : 'wrong';
  }
  function checkA3() {
    const a = a3Answer.trim().toLowerCase();
    a3Result = (a === 'sandbox' || a === 'sandboxing' || a === 'sandboxed') ? 'correct' : 'wrong';
  }

  $effect(() => { if (advAllDone) oncomplete?.([a1Result, a2Result, a3Result].filter(r => r === 'correct').length); });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Agentic AI Basics</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section.</p>
  </div>

  <div class="rounded-xl border-2 {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What capability allows an agent to interact with external systems like APIs, files, and databases?</p>
    <p class="text-sm text-slate-500">Hint: They are functions the agent can call.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b1Answer} placeholder="Your answer..." disabled={b1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB1(); }} />
      <button onclick={checkB1} disabled={b1Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b1Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Tools let agents interact with the outside world.</p>
    {:else if b1Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Think about what you call the functions an agent can invoke.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What pattern combines Reasoning and Acting in an agent loop?</p>
    <p class="text-sm text-slate-500">Hint: Take the first two letters of each word.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b2Answer} placeholder="Your answer..." disabled={b2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB2(); }} />
      <button onclick={checkB2} disabled={b2Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b2Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! ReAct interleaves reasoning with actions for more effective agents.</p>
    {:else if b2Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Combine "Re" from Reasoning + "Act" from Acting.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. After an agent uses a tool, what does it do with the result before deciding the next step?</p>
    <p class="text-sm text-slate-500">Hint: Think &rarr; Act &rarr; ___ &rarr; Repeat</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b3Answer} placeholder="Your answer..." disabled={b3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB3(); }} />
      <button onclick={checkB3} disabled={b3Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b3Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! The agent observes the tool result to decide what to do next.</p>
    {:else if b3Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. The agent needs to see/examine the result of its action.</p>{/if}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You understand agentic AI fundamentals.</p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Agentic AI</h2>
    <p class="text-slate-600">Answer all three questions correctly.</p>
  </div>

  <div class="rounded-xl border-2 {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What open standard provides a universal protocol for connecting AI agents to tools?</p>
    <p class="text-sm text-slate-500">Hint: It is like USB for AI tools. Three letters.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a1Answer} placeholder="Your answer..." disabled={a1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA1(); }} />
      <button onclick={checkA1} disabled={a1Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a1Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! MCP (Model Context Protocol) standardizes how agents connect to tools.</p>
    {:else if a1Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Model Context Protocol — what is the abbreviation?</p>{/if}
  </div>

  <div class="rounded-xl border-2 {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What architecture uses multiple specialized agents that collaborate on a task?</p>
    <p class="text-sm text-slate-500">Hint: "Many agents working together" — two-word term with a hyphen.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a2Answer} placeholder="Your answer..." disabled={a2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA2(); }} />
      <button onclick={checkA2} disabled={a2Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a2Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Multi-agent systems have specialized agents that collaborate.</p>
    {:else if a2Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Think: multiple + agent.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What technique runs agent tools in a controlled, isolated environment to prevent damage?</p>
    <p class="text-sm text-slate-500">Hint: Kids play in one of these at the beach.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a3Answer} placeholder="Your answer..." disabled={a3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA3(); }} />
      <button onclick={checkA3} disabled={a3Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a3Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Sandboxing isolates agent actions to prevent unintended side effects.</p>
    {:else if a3Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. It is a container-like concept named after a children's play area.</p>{/if}
  </div>

  {#if advAllDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You have deep agentic AI knowledge.</p>
    </div>
  {/if}

  {/if}
</div>
