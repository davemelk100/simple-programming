<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

  let showArray = $state(false);
  let showObject = $state(false);
  let arrayItems = $state(0);

  const fruits = ['apple', 'banana', 'cherry'];

  onMount(() => {
    setTimeout(() => { showArray = true; }, 400);
    const interval = setInterval(() => {
      if (arrayItems < fruits.length) {
        arrayItems++;
      } else {
        clearInterval(interval);
        setTimeout(() => { showObject = true; }, 600);
      }
    }, 600);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Organizing Information</h2>
    <p class="max-w-lg text-slate-600">
      Sometimes you need to store <strong>many</strong> things together. Arrays and objects help you group related data!
    </p>
  </div>

  <div class="flex flex-col gap-6 lg:flex-row lg:items-start">
    <div class="flex-1 space-y-8">
      <!-- Array section -->
      <div class="transition-all duration-700 {showArray ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}">
        <h3 class="mb-3 text-lg font-bold text-green-700">Arrays: Ordered Lists</h3>
        <p class="mb-4 text-sm text-slate-600">An array is a numbered list of items. Each item has an <strong>index</strong> (its position number, starting from 0).</p>

        <div class="flex items-center justify-center gap-1">
          <span class="mr-2 text-lg font-bold text-slate-400">[</span>
          {#each fruits as fruit, i}
            <div class="flex flex-col items-center gap-1 transition-all duration-500
              {i < arrayItems ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}">
              <span class="text-xs font-medium text-green-500">[{i}]</span>
              <div class="flex h-14 w-24 items-center justify-center rounded-lg border-2 border-green-400 bg-green-50 text-sm font-bold text-green-700 shadow-sm">
                "{fruit}"
              </div>
            </div>
            {#if i < fruits.length - 1}
              <span class="text-slate-300 {i < arrayItems - 1 ? 'opacity-100' : 'opacity-0'} transition-opacity">,</span>
            {/if}
          {/each}
          <span class="ml-2 text-lg font-bold text-slate-400">]</span>
        </div>
      </div>

      <!-- Object section -->
      <div class="transition-all duration-700 {showObject ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}">
        <h3 class="mb-3 text-lg font-bold text-green-700">Objects: Labeled Containers</h3>
        <p class="mb-4 text-sm text-slate-600">An object stores data with <strong>labels</strong> (called keys) instead of numbers.</p>

        <div class="max-w-xs rounded-xl border-2 border-green-400 bg-green-50 p-4 shadow-md">
          <div class="mb-2 text-xs font-bold text-green-600">Person</div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-16 text-right text-sm font-semibold text-green-700">name:</span>
              <span class="rounded bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm">"Alice"</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-16 text-right text-sm font-semibold text-green-700">age:</span>
              <span class="rounded bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm">25</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full shrink-0 rounded-xl bg-green-50 p-5 lg:w-64 lg:self-start">
      <p class="text-sm text-green-800">
        Use <strong>arrays</strong> when order matters (like a shopping list).
        Use <strong>objects</strong> when you need named labels (like a contact card).
      </p>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      I've read this
    </button>
  </div>
</div>
