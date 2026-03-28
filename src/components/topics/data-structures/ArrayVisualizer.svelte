<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);

  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

  // --- Basic mode state ---
  let items = $state<string[]>(['apple', 'banana']);
  let newItem = $state('');
  let highlightedIndex = $state<number | null>(null);
  let animatingIndex = $state<number | null>(null);

  function addItem() {
    if (!newItem.trim()) return;
    items.push(newItem.trim());
    animatingIndex = items.length - 1;
    newItem = '';
    setTimeout(() => { animatingIndex = null; }, 400);
  }

  function removeItem() {
    if (items.length === 0) return;
    items.pop();
    highlightedIndex = null;
  }

  function selectItem(index: number) {
    highlightedIndex = highlightedIndex === index ? null : index;
  }

  // --- Advanced mode state ---
  type ArrayType = 'number' | 'string';
  let arrayType = $state<ArrayType>('number');
  let advItems = $state<(string | number)[]>([10, 20, 30, 40, 50]);
  let advInput = $state('');
  let advIndexInput = $state('');
  let advHighlight = $state<number | null>(null);
  let advAnimating = $state<number | null>(null);
  let advRemoving = $state<number | null>(null);
  let codeLog = $state<string[]>(['const arr = [10, 20, 30, 40, 50];']);
  let mapFilterResult = $state<(string | number)[] | null>(null);

  function logCode(line: string) {
    codeLog = [...codeLog.slice(-7), line];
  }

  function resetAdvanced(type: ArrayType) {
    arrayType = type;
    if (type === 'number') {
      advItems = [10, 20, 30, 40, 50];
      codeLog = ['const arr: number[] = [10, 20, 30, 40, 50];'];
    } else {
      advItems = ['hello', 'world', 'foo'];
      codeLog = ['const arr: string[] = ["hello", "world", "foo"];'];
    }
    advHighlight = null;
    advAnimating = null;
    advRemoving = null;
    mapFilterResult = null;
    advInput = '';
    advIndexInput = '';
  }

  function parseValue(raw: string): string | number {
    if (arrayType === 'number') {
      const n = Number(raw);
      return isNaN(n) ? 0 : n;
    }
    return raw;
  }

  function formatVal(v: string | number): string {
    return typeof v === 'string' ? `"${v}"` : String(v);
  }

  function advPush() {
    if (!advInput.trim()) return;
    const val = parseValue(advInput.trim());
    advItems = [...advItems, val];
    advAnimating = advItems.length - 1;
    logCode(`arr.push(${formatVal(val)}); // length = ${advItems.length}`);
    advInput = '';
    mapFilterResult = null;
    setTimeout(() => { advAnimating = null; }, 400);
  }

  function advPop() {
    if (advItems.length === 0) return;
    const removed = advItems[advItems.length - 1];
    advRemoving = advItems.length - 1;
    logCode(`arr.pop(); // removed ${formatVal(removed)}`);
    mapFilterResult = null;
    setTimeout(() => {
      advItems = advItems.slice(0, -1);
      advRemoving = null;
      advHighlight = null;
    }, 300);
  }

  function advUnshift() {
    if (!advInput.trim()) return;
    const val = parseValue(advInput.trim());
    advItems = [val, ...advItems];
    advAnimating = 0;
    logCode(`arr.unshift(${formatVal(val)}); // length = ${advItems.length}`);
    advInput = '';
    mapFilterResult = null;
    setTimeout(() => { advAnimating = null; }, 400);
  }

  function advShift() {
    if (advItems.length === 0) return;
    const removed = advItems[0];
    advRemoving = 0;
    logCode(`arr.shift(); // removed ${formatVal(removed)}`);
    mapFilterResult = null;
    setTimeout(() => {
      advItems = advItems.slice(1);
      advRemoving = null;
      advHighlight = null;
    }, 300);
  }

  function advInsertAt() {
    const idx = parseInt(advIndexInput);
    if (isNaN(idx) || idx < 0 || idx > advItems.length) return;
    if (!advInput.trim()) return;
    const val = parseValue(advInput.trim());
    const copy = [...advItems];
    copy.splice(idx, 0, val);
    advItems = copy;
    advAnimating = idx;
    logCode(`arr.splice(${idx}, 0, ${formatVal(val)}); // insert at [${idx}]`);
    advInput = '';
    advIndexInput = '';
    mapFilterResult = null;
    setTimeout(() => { advAnimating = null; }, 400);
  }

  function advRemoveAt() {
    const idx = parseInt(advIndexInput);
    if (isNaN(idx) || idx < 0 || idx >= advItems.length) return;
    const removed = advItems[idx];
    advRemoving = idx;
    logCode(`arr.splice(${idx}, 1); // removed ${formatVal(removed)} from [${idx}]`);
    advIndexInput = '';
    mapFilterResult = null;
    setTimeout(() => {
      const copy = [...advItems];
      copy.splice(idx, 1);
      advItems = copy;
      advRemoving = null;
      advHighlight = null;
    }, 300);
  }

  function advAccessIndex() {
    const idx = parseInt(advIndexInput);
    if (isNaN(idx) || idx < 0 || idx >= advItems.length) {
      logCode(`arr[${advIndexInput}]; // undefined (out of bounds)`);
      advHighlight = null;
      return;
    }
    advHighlight = idx;
    logCode(`arr[${idx}]; // ${formatVal(advItems[idx])}`);
    advIndexInput = '';
  }

  function advMap() {
    if (arrayType === 'number') {
      const result = (advItems as number[]).map((x) => x * 2);
      mapFilterResult = result;
      logCode(`arr.map(x => x * 2); // [${result.join(', ')}]`);
    } else {
      const result = (advItems as string[]).map((s) => s.toUpperCase());
      mapFilterResult = result;
      logCode(`arr.map(s => s.toUpperCase()); // [${result.map((s) => `"${s}"`).join(', ')}]`);
    }
  }

  function advFilter() {
    if (arrayType === 'number') {
      const result = (advItems as number[]).filter((x) => x > 20);
      mapFilterResult = result;
      logCode(`arr.filter(x => x > 20); // [${result.join(', ')}]`);
    } else {
      const result = (advItems as string[]).filter((s) => s.length > 3);
      mapFilterResult = result;
      logCode(`arr.filter(s => s.length > 3); // [${result.map((s) => `"${s}"`).join(', ')}]`);
    }
  }

  function advSelectItem(index: number) {
    advHighlight = advHighlight === index ? null : index;
    if (advHighlight !== null) {
      logCode(`arr[${index}]; // ${formatVal(advItems[index])}`);
    }
  }
</script>

{#if !advanced}
<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Array Visualizer</h2>
    <p class="text-slate-600">Add, remove, and inspect items in an array!</p>
  </div>

  <!-- Controls -->
  <div class="flex max-w-md items-center justify-center gap-2">
    <input
      type="text"
      bind:value={newItem}
      placeholder="Type an item..."
      onkeydown={(e) => e.key === 'Enter' && addItem()}
      class="flex-1 rounded-lg border border-green-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
    />
    <button onclick={addItem} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
      Add Item
    </button>
    <button onclick={removeItem} disabled={items.length === 0} class="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 active:scale-95 disabled:opacity-40">
      Remove Last
    </button>
  </div>

  <!-- Length -->
  <p class="text-sm text-slate-500">
    Length: <span class="font-bold text-green-700">{items.length}</span>
  </p>

  <!-- Array visual -->
  <div class="flex flex-wrap items-center justify-center gap-2">
    <span class="text-2xl font-bold text-slate-300">[</span>
    {#each items as item, i (i)}
      <button
        onclick={() => selectItem(i)}
        class="flex flex-col items-center gap-1 transition-all duration-300
          {animatingIndex === i ? 'scale-110' : 'scale-100'}
          {highlightedIndex === i ? 'scale-105' : ''}"
      >
        <span class="text-xs font-medium text-green-500">[{i}]</span>
        <div class="flex h-12 min-w-[4rem] items-center justify-center rounded-lg border-2 px-3 text-sm font-bold shadow-sm transition-all duration-300
          {highlightedIndex === i ? 'border-yellow-400 bg-yellow-50 text-yellow-700 ring-2 ring-yellow-300' : 'border-green-400 bg-green-50 text-green-700'}">
          "{item}"
        </div>
      </button>
      {#if i < items.length - 1}
        <span class="text-slate-300">,</span>
      {/if}
    {/each}
    <span class="text-2xl font-bold text-slate-300">]</span>

    {#if items.length === 0}
      <span class="py-4 text-sm text-slate-500 italic">Empty array</span>
    {/if}
  </div>

  {#if highlightedIndex !== null}
    <div class="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
      <p class="text-sm text-yellow-800">
        Index <strong>[{highlightedIndex}]</strong> contains: <strong>"{items[highlightedIndex]}"</strong>
      </p>
    </div>
  {/if}

  <p class="text-xs text-slate-500">Click any box to read its value.</p>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      I've tried this
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Array Methods Lab</h2>
    <p class="text-slate-600">Explore typed arrays, bracket notation, and common array methods with live code preview.</p>
  </div>

  <!-- Type selector -->
  <div class="flex items-center gap-3">
    <span class="text-sm font-semibold text-slate-600">Array type:</span>
    <button
      onclick={() => resetAdvanced('number')}
      class="rounded-lg px-4 py-1.5 text-sm font-semibold transition-all {arrayType === 'number' ? 'bg-green-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
    >
      number[]
    </button>
    <button
      onclick={() => resetAdvanced('string')}
      class="rounded-lg px-4 py-1.5 text-sm font-semibold transition-all {arrayType === 'string' ? 'bg-green-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
    >
      string[]
    </button>
  </div>

  <!-- Array visual -->
  <div>
    <p class="mb-1 text-sm text-slate-500">
      <span class="font-mono text-green-700">arr</span>: {arrayType}[] &mdash; length: <span class="font-bold text-green-700">{advItems.length}</span>
    </p>
    <div class="flex flex-wrap items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-4">
      <span class="text-2xl font-bold text-slate-300">[</span>
      {#each advItems as item, i (i)}
        <button
          onclick={() => advSelectItem(i)}
          class="flex flex-col items-center gap-1 transition-all duration-300
            {advAnimating === i ? 'scale-110 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]' : 'scale-100'}
            {advRemoving === i ? 'scale-75 opacity-0' : ''}
            {advHighlight === i ? 'scale-105' : ''}"
        >
          <span class="text-xs font-medium text-green-500">[{i}]</span>
          <div class="flex h-12 min-w-[3.5rem] items-center justify-center rounded-lg border-2 px-3 text-sm font-bold shadow-sm transition-all duration-300
            {advHighlight === i ? 'border-yellow-400 bg-yellow-50 text-yellow-700 ring-2 ring-yellow-300' : 'border-green-400 bg-green-50 text-green-700'}">
            {formatVal(item)}
          </div>
        </button>
        {#if i < advItems.length - 1}
          <span class="text-slate-300">,</span>
        {/if}
      {/each}
      <span class="text-2xl font-bold text-slate-300">]</span>

      {#if advItems.length === 0}
        <span class="py-4 text-sm text-slate-500 italic">Empty array</span>
      {/if}
    </div>
  </div>

  <!-- Index access -->
  {#if advHighlight !== null}
    <div class="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
      <p class="text-sm font-mono text-yellow-800">
        arr[{advHighlight}] <span class="text-slate-400">=&gt;</span> <strong>{formatVal(advItems[advHighlight])}</strong>
      </p>
    </div>
  {/if}

  <!-- map/filter result -->
  {#if mapFilterResult !== null}
    <div class="rounded-lg bg-blue-50 border border-blue-200 p-3">
      <p class="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-500">Result (new array)</p>
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-lg font-bold text-slate-300">[</span>
        {#each mapFilterResult as item, i}
          <div class="flex h-10 min-w-[3rem] items-center justify-center rounded-lg border-2 border-blue-300 bg-blue-50 px-2 text-sm font-bold text-blue-700">
            {formatVal(item)}
          </div>
          {#if i < mapFilterResult.length - 1}
            <span class="text-slate-300">,</span>
          {/if}
        {/each}
        <span class="text-lg font-bold text-slate-300">]</span>
        {#if mapFilterResult.length === 0}
          <span class="text-sm text-slate-500 italic">Empty</span>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Controls -->
  <div class="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
    <div class="flex flex-wrap items-center gap-2">
      <input
        type="text"
        bind:value={advInput}
        placeholder={arrayType === 'number' ? 'Value (number)...' : 'Value (string)...'}
        onkeydown={(e) => e.key === 'Enter' && advPush()}
        class="w-40 rounded-lg border border-green-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
      />
      <input
        type="text"
        bind:value={advIndexInput}
        placeholder="Index..."
        class="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
      />
    </div>

    <div class="flex flex-wrap gap-2">
      <button onclick={advPush} class="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 active:scale-95">
        push()
      </button>
      <button onclick={advPop} disabled={advItems.length === 0} class="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 active:scale-95 disabled:opacity-40">
        pop()
      </button>
      <button onclick={advUnshift} class="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 active:scale-95">
        unshift()
      </button>
      <button onclick={advShift} disabled={advItems.length === 0} class="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 active:scale-95 disabled:opacity-40">
        shift()
      </button>
      <span class="mx-1 w-px self-stretch bg-slate-300"></span>
      <button onclick={advInsertAt} class="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 active:scale-95">
        splice(i, 0, val)
      </button>
      <button onclick={advRemoveAt} class="rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-600 active:scale-95">
        splice(i, 1)
      </button>
      <button onclick={advAccessIndex} class="rounded-lg bg-yellow-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-yellow-600 active:scale-95">
        arr[i]
      </button>
      <span class="mx-1 w-px self-stretch bg-slate-300"></span>
      <button onclick={advMap} disabled={advItems.length === 0} class="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600 active:scale-95 disabled:opacity-40">
        map()
      </button>
      <button onclick={advFilter} disabled={advItems.length === 0} class="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600 active:scale-95 disabled:opacity-40">
        filter()
      </button>
    </div>

    <p class="text-xs text-slate-500">
      {#if arrayType === 'number'}
        map: x =&gt; x * 2 &nbsp;|&nbsp; filter: x =&gt; x &gt; 20
      {:else}
        map: s =&gt; s.toUpperCase() &nbsp;|&nbsp; filter: s =&gt; s.length &gt; 3
      {/if}
    </p>
  </div>

  <!-- Code preview -->
  <div class="rounded-xl bg-slate-800 p-4 font-mono text-sm">
    <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Code Preview</div>
    <div class="space-y-0.5">
      {#each codeLog as line}
        <pre class="text-green-400">{line}</pre>
      {/each}
    </div>
  </div>

  <p class="text-xs text-slate-500">Click any element for bracket-notation access. Use the buttons to call array methods and watch the code preview update.</p>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      I've tried this
    </button>
  </div>
</div>
{/if}

<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
</style>
