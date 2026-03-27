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
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      Sometimes you need to store <strong>many</strong> things together. Arrays and objects help you group related data. Use <strong>arrays</strong> when order matters (like a shopping list) and <strong>objects</strong> when you need named labels (like a contact card).
    </p>
  </div>

  <div class="space-y-8">
    <!-- Array section -->
    <div class="transition-all duration-700 {showArray ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}">
      <h3 class="mb-3 text-lg font-bold text-green-700">Arrays: Ordered Lists</h3>
      <p class="mb-4 text-slate-600">An array is a numbered list of items. Each item has an <strong>index</strong> (its position number, starting from 0).</p>

      <div class="flex items-center justify-start gap-1">
        <span class="mr-2 text-lg font-bold text-slate-500">[</span>
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
        <span class="ml-2 text-lg font-bold text-slate-500">]</span>
      </div>
    </div>

    <!-- Object section -->
    <div class="transition-all duration-700 {showObject ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}">
      <h3 class="mb-3 text-lg font-bold text-green-700">Objects: Labeled Containers</h3>
      <p class="mb-4 text-slate-600">An object stores data with <strong>labels</strong> (called keys) instead of numbers.</p>

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

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      I've read this
    </button>
  </div>

  {:else}
  <div class="space-y-8">
    <div>
      <p class="text-slate-600">
        Beyond basic arrays and objects, JavaScript provides <strong>Maps</strong>, <strong>Sets</strong>, and support for <strong>nested structures</strong>. Choosing the right data structure depends on your access patterns and <strong>time complexity</strong> requirements -- how fast operations run as data grows.
      </p>
    </div>

    <!-- Code example -->
    <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm">
      <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">TypeScript</div>
      <pre class="text-green-400">// Nested structures
interface User {'{'}
  name: string;
  address: {'{'} city: string; zip: string {'}'};
  scores: number[];
{'}'}

const user: User = {'{'}
  name: "Alice",
  address: {'{'} city: "Portland", zip: "97201" {'}'},
  scores: [95, 87, 92]
{'}'};

// Map - any key type, ordered, iterable
const cache = new Map&lt;string, number&gt;();
cache.set("users", 42);
cache.get("users"); // 42

// Set - unique values only
const tags = new Set&lt;string&gt;(["js", "ts", "js"]);
tags.size; // 2 (duplicates removed)

// WeakMap - keys are garbage-collected
const metadata = new WeakMap&lt;object, string&gt;();</pre>
    </div>

    <!-- Big O illustration -->
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-green-600">Time Complexity (Big O)</h3>
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <div class="w-20 rounded bg-green-600 px-2 py-1 text-center text-xs font-bold text-white">O(1)</div>
          <div class="flex-1 text-sm text-slate-600">Object/Map lookup, Set.has(), Array index access</div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-20 rounded bg-green-500 px-2 py-1 text-center text-xs font-bold text-white">O(log n)</div>
          <div class="flex-1 text-sm text-slate-600">Binary search on a sorted array</div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-20 rounded bg-yellow-500 px-2 py-1 text-center text-xs font-bold text-white">O(n)</div>
          <div class="flex-1 text-sm text-slate-600">Array.find(), Array.includes(), linear scan</div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-20 rounded bg-red-500 px-2 py-1 text-center text-xs font-bold text-white">O(n^2)</div>
          <div class="flex-1 text-sm text-slate-600">Nested loops, bubble sort, comparing every pair</div>
        </div>
      </div>
    </div>

    <!-- Key concepts list -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>Map vs Object</strong>: Maps allow any key type, maintain insertion order, and have a <code class="text-sm">.size</code> property. Use Maps for dynamic key-value stores.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>Set</strong> automatically deduplicates values and provides O(1) lookup with <code class="text-sm">.has()</code>, unlike arrays which require O(n) for <code class="text-sm">.includes()</code>.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>Nested structures</strong> model real-world data. Use TypeScript interfaces to enforce shape and catch errors early.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>Big O notation</strong> describes how performance scales. Always consider whether you need O(1) lookups (use Map/Set) vs O(n) scans (arrays).
        </li>
      </ul>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>
