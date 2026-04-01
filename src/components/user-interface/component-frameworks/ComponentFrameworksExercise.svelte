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
  let b4Answer = $state('');
  let b4Result = $state<'correct' | 'wrong' | null>(null);
  let allDone = $derived(b1Result === 'correct' && b2Result === 'correct' && b3Result === 'correct' && b4Result === 'correct');

  function checkB1() {
    const a = b1Answer.trim().toLowerCase();
    b1Result = (a.includes('reusable') || a.includes('piece') || a.includes('block') || a.includes('building block') || a.includes('self-contained') || a.includes('unit')) ? 'correct' : 'wrong';
  }
  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    b2Result = (a === 'props' || a === 'properties' || a === 'prop') ? 'correct' : 'wrong';
  }
  function checkB3() {
    const a = b3Answer.trim().toLowerCase();
    b3Result = (a === 'state' || a === 'component state' || a === 'local state') ? 'correct' : 'wrong';
  }
  function checkB4() {
    const a = b4Answer.trim().toLowerCase();
    b4Result = (a === 'react' || a === 'svelte' || a === 'vue' || a === 'angular' || a === 'vue.js' || a === 'react.js' || a === 'next.js' || a === 'nuxt' || a === 'sveltekit') ? 'correct' : 'wrong';
  }

  $effect(() => { if (allDone) oncomplete?.([b1Result, b2Result, b3Result, b4Result].filter(r => r === 'correct').length); });

  let a1Answer = $state('');
  let a1Result = $state<'correct' | 'wrong' | null>(null);
  let a2Answer = $state('');
  let a2Result = $state<'correct' | 'wrong' | null>(null);
  let a3Answer = $state('');
  let a3Result = $state<'correct' | 'wrong' | null>(null);
  let a4Answer = $state('');
  let a4Result = $state<'correct' | 'wrong' | null>(null);
  let advAllDone = $derived(a1Result === 'correct' && a2Result === 'correct' && a3Result === 'correct' && a4Result === 'correct');

  function checkA1() {
    const a = a1Answer.trim().toLowerCase();
    a1Result = (a === 'virtual dom' || a === 'the virtual dom' || a === 'vdom') ? 'correct' : 'wrong';
  }
  function checkA2() {
    const a = a2Answer.trim().toLowerCase();
    a2Result = (a === 'hydration' || a === 'hydrate') ? 'correct' : 'wrong';
  }
  function checkA3() {
    const a = a3Answer.trim().toLowerCase();
    a3Result = (a === 'prop drilling' || a === 'props drilling' || a === 'drilling') ? 'correct' : 'wrong';
  }
  function checkA4() {
    const a = a4Answer.trim().toLowerCase();
    a4Result = (a === 'compiler' || a === 'a compiler' || a === 'the compiler' || a === 'compile step' || a === 'build step') ? 'correct' : 'wrong';
  }

  $effect(() => { if (advAllDone) oncomplete?.([a1Result, a2Result, a3Result, a4Result].filter(r => r === 'correct').length); });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Component Framework Basics</h2>
    <p class="text-slate-600">Answer all four questions correctly to complete this section.</p>
  </div>

  <div class="rounded-xl border-2 {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-indigo-200 bg-indigo-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What is a component? Describe it in a few words.</p>
    <p class="text-sm text-slate-500">Hint: Think of a LEGO brick — it is a ___ ___ of UI with its own HTML, CSS, and logic.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b1Answer} placeholder="Your answer..." disabled={b1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB1(); }} />
      <button onclick={checkB1} disabled={b1Result === 'correct'}
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b1Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! A component is a reusable, self-contained piece of UI.</p>
    {:else if b1Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Think "reusable building block" or "self-contained piece."</p>{/if}
  </div>

  <div class="rounded-xl border-2 {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-indigo-200 bg-indigo-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What is the name for data passed from a parent component to a child component?</p>
    <p class="text-sm text-slate-500">Hint: Short for "properties." Starts with "p."</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b2Answer} placeholder="Your answer..." disabled={b2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB2(); }} />
      <button onclick={checkB2} disabled={b2Result === 'correct'}
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b2Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Props (properties) are how parent components pass data to their children.</p>
    {:else if b2Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. It is short for "properties" — p____.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-indigo-200 bg-indigo-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What is the name for data that lives inside a component and can change over time?</p>
    <p class="text-sm text-slate-500">Hint: It is the internal, mutable data of a component. Five letters.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b3Answer} placeholder="Your answer..." disabled={b3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB3(); }} />
      <button onclick={checkB3} disabled={b3Result === 'correct'}
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b3Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! State is the internal data that drives a component's behavior and rendering.</p>
    {:else if b3Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Think about the "current condition" of a component — its s____.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {b4Result === 'correct' ? 'border-green-300 bg-green-50' : b4Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-indigo-200 bg-indigo-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">4. Name one popular component framework.</p>
    <p class="text-sm text-slate-500">Hint: The three most popular ones are R___, S___, and V___.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b4Answer} placeholder="Your answer..." disabled={b4Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB4(); }} />
      <button onclick={checkB4} disabled={b4Result === 'correct'}
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b4Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! That is one of the major component frameworks used in production today.</p>
    {:else if b4Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Try: React, Svelte, or Vue.</p>{/if}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You understand the fundamentals of component frameworks.</p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Component Concepts</h2>
    <p class="text-slate-600">Answer all four questions correctly.</p>
  </div>

  <div class="rounded-xl border-2 {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-indigo-200 bg-indigo-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What in-memory representation does React use to efficiently update the real DOM?</p>
    <p class="text-sm text-slate-500">Hint: It is a lightweight copy of the DOM. Two words: v___ D___.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a1Answer} placeholder="Your answer..." disabled={a1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA1(); }} />
      <button onclick={checkA1} disabled={a1Result === 'correct'}
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a1Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! The virtual DOM lets React calculate minimal updates before touching the real DOM.</p>
    {:else if a1Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. It is the ___ DOM — a lightweight JavaScript representation.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-indigo-200 bg-indigo-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What is the process called when server-rendered HTML becomes interactive in the browser?</p>
    <p class="text-sm text-slate-500">Hint: Like adding water to something dry. Starts with "h."</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a2Answer} placeholder="Your answer..." disabled={a2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA2(); }} />
      <button onclick={checkA2} disabled={a2Result === 'correct'}
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a2Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Hydration attaches JavaScript event handlers to server-rendered HTML.</p>
    {:else if a2Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. The process of making static HTML interactive is called h_______.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-indigo-200 bg-indigo-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What is the problem called when you pass props through many levels of nested components?</p>
    <p class="text-sm text-slate-500">Hint: Props ___ — like drilling through layers. Two words.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a3Answer} placeholder="Your answer..." disabled={a3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA3(); }} />
      <button onclick={checkA3} disabled={a3Result === 'correct'}
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a3Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Prop drilling is solved by context, stores, or provide/inject patterns.</p>
    {:else if a3Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. It is called prop ___. Think about drilling down through layers.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {a4Result === 'correct' ? 'border-green-300 bg-green-50' : a4Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-indigo-200 bg-indigo-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">4. What does Svelte use instead of a virtual DOM to generate efficient updates?</p>
    <p class="text-sm text-slate-500">Hint: It analyzes your code at build time. It is a c_______.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a4Answer} placeholder="Your answer..." disabled={a4Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA4(); }} />
      <button onclick={checkA4} disabled={a4Result === 'correct'}
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a4Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Svelte's compiler generates precise DOM update instructions at build time.</p>
    {:else if a4Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Svelte is a c_______ — it transforms your code during the build step.</p>{/if}
  </div>

  {#if advAllDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You have advanced component framework knowledge.</p>
    </div>
  {/if}

  {/if}
</div>
