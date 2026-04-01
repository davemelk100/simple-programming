<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: (score: number) => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode questions ===
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
    b1Result = (a === 'breakpoint' || a === 'a breakpoint' || a === 'css breakpoint') ? 'correct' : 'wrong';
  }
  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    b2Result = (a === 'mobile-first' || a === 'mobile first' || a === 'design for mobile first') ? 'correct' : 'wrong';
  }
  function checkB3() {
    const a = b3Answer.trim().toLowerCase();
    b3Result = (a === '%' || a === 'percent' || a === 'percentage' || a === 'em' || a === 'rem' || a === 'vw' || a === 'vh') ? 'correct' : 'wrong';
  }
  function checkB4() {
    const a = b4Answer.trim().toLowerCase();
    b4Result = (a === 'viewport' || a === 'meta viewport' || a === 'the viewport meta tag' || a === 'viewport meta tag' || a === 'viewport meta') ? 'correct' : 'wrong';
  }

  $effect(() => { if (allDone) oncomplete?.([b1Result, b2Result, b3Result, b4Result].filter(r => r === 'correct').length); });

  // === Advanced mode questions ===
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
    a1Result = (a === 'container query' || a === 'container queries' || a === '@container') ? 'correct' : 'wrong';
  }
  function checkA2() {
    const a = a2Answer.trim().toLowerCase();
    a2Result = (a === 'clamp' || a === 'clamp()' || a === 'css clamp' || a === 'css clamp()') ? 'correct' : 'wrong';
  }
  function checkA3() {
    const a = a3Answer.trim().toLowerCase();
    a3Result = (a === 'srcset' || a === 'the srcset attribute') ? 'correct' : 'wrong';
  }
  function checkA4() {
    const a = a4Answer.trim().toLowerCase();
    a4Result = (a === 'auto-fit' || a === 'auto-fill' || a === 'auto fit' || a === 'auto fill') ? 'correct' : 'wrong';
  }

  $effect(() => { if (advAllDone) oncomplete?.([a1Result, a2Result, a3Result, a4Result].filter(r => r === 'correct').length); });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Responsive Design Basics</h2>
    <p class="text-slate-600">Answer all four questions correctly to complete this section.</p>
  </div>

  <div class="rounded-xl border-2 {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-sky-200 bg-sky-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What is a specific screen width where your layout changes called?</p>
    <p class="text-sm text-slate-500">Hint: The point where CSS rules "break" into a different layout.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b1Answer} placeholder="Your answer..." disabled={b1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-sky-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB1(); }} />
      <button onclick={checkB1} disabled={b1Result === 'correct'}
        class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b1Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! A breakpoint is the screen width where your layout shifts to a different configuration.</p>
    {:else if b1Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Think about the "point" where your layout "breaks" into a new arrangement.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-sky-200 bg-sky-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What design approach means starting with the smallest screen and adding complexity for larger ones?</p>
    <p class="text-sm text-slate-500">Hint: You design for ___-___ and scale up.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b2Answer} placeholder="Your answer..." disabled={b2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-sky-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB2(); }} />
      <button onclick={checkB2} disabled={b2Result === 'correct'}
        class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b2Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Mobile-first means your default styles target small screens, then media queries enhance for larger ones.</p>
    {:else if b2Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. The smallest common device is a ___. You design for it first.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-sky-200 bg-sky-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. Name a CSS unit that is relative (not fixed like px).</p>
    <p class="text-sm text-slate-500">Hint: Units like %, em, rem, vw, or vh are all relative.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b3Answer} placeholder="Your answer..." disabled={b3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-sky-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB3(); }} />
      <button onclick={checkB3} disabled={b3Result === 'correct'}
        class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b3Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Relative units scale with their context, making layouts flexible and responsive.</p>
    {:else if b3Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Try one of: %, em, rem, vw, or vh.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {b4Result === 'correct' ? 'border-green-300 bg-green-50' : b4Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-sky-200 bg-sky-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">4. What meta tag tells mobile browsers to use the device's actual screen width?</p>
    <p class="text-sm text-slate-500">Hint: The ___ meta tag sets width=device-width.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b4Answer} placeholder="Your answer..." disabled={b4Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-sky-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB4(); }} />
      <button onclick={checkB4} disabled={b4Result === 'correct'}
        class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b4Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! The viewport meta tag is essential for responsive design on mobile devices.</p>
    {:else if b4Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. It is the ___ meta tag, controlling how the browser renders the page width.</p>{/if}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You understand responsive design fundamentals.</p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Responsive Concepts</h2>
    <p class="text-slate-600">Answer all four questions correctly.</p>
  </div>

  <div class="rounded-xl border-2 {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-sky-200 bg-sky-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What CSS feature lets a component respond to its parent's size instead of the viewport?</p>
    <p class="text-sm text-slate-500">Hint: Like media queries, but scoped to a ___ element.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a1Answer} placeholder="Your answer..." disabled={a1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-sky-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA1(); }} />
      <button onclick={checkA1} disabled={a1Result === 'correct'}
        class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a1Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Container queries let components adapt based on their container's size.</p>
    {:else if a1Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. ___ queries respond to the parent element, not the viewport.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-sky-200 bg-sky-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What CSS function sets a minimum, preferred, and maximum value for fluid sizing?</p>
    <p class="text-sm text-slate-500">Hint: ___(min, preferred, max) — often used for fluid typography.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a2Answer} placeholder="Your answer..." disabled={a2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-sky-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA2(); }} />
      <button onclick={checkA2} disabled={a2Result === 'correct'}
        class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a2Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! clamp() provides fluid scaling between a minimum and maximum value.</p>
    {:else if a2Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. It "clamps" a value between a min and max. What function name is that?</p>{/if}
  </div>

  <div class="rounded-xl border-2 {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-sky-200 bg-sky-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What HTML attribute on an &lt;img&gt; tag provides multiple image sources at different resolutions?</p>
    <p class="text-sm text-slate-500">Hint: It lists a "set" of image "sources."</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a3Answer} placeholder="Your answer..." disabled={a3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-sky-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA3(); }} />
      <button onclick={checkA3} disabled={a3Result === 'correct'}
        class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a3Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! The srcset attribute lets the browser pick the best image for the device.</p>
    {:else if a3Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. "src" + "set" = a set of sources. What is the attribute name?</p>{/if}
  </div>

  <div class="rounded-xl border-2 {a4Result === 'correct' ? 'border-green-300 bg-green-50' : a4Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-sky-200 bg-sky-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">4. What CSS Grid keyword automatically wraps items into as many columns as will fit?</p>
    <p class="text-sm text-slate-500">Hint: repeat(___-___, minmax(...))</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a4Answer} placeholder="Your answer..." disabled={a4Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-sky-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA4(); }} />
      <button onclick={checkA4} disabled={a4Result === 'correct'}
        class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a4Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! auto-fit (and auto-fill) create responsive grids without media queries.</p>
    {:else if a4Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. It automatically "fits" items: auto-___.</p>{/if}
  </div>

  {#if advAllDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You have advanced responsive design knowledge.</p>
    </div>
  {/if}

  {/if}
</div>
