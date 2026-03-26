<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

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
</script>

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
