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


  let visibleBoxes = $state(0);

  const boxes = [
    { label: 'name', value: '"Alice"', color: 'bg-blue-100 border-blue-400', textColor: 'text-blue-700', desc: 'This box is labeled "name" and stores the text Alice.' },
    { label: 'age', value: '25', color: 'bg-purple-100 border-purple-400', textColor: 'text-purple-700', desc: 'This box is labeled "age" and stores the number 25.' },
    { label: 'color', value: '"blue"', color: 'bg-sky-100 border-sky-400', textColor: 'text-sky-700', desc: 'This box is labeled "color" and stores the text blue.' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleBoxes < boxes.length) {
        visibleBoxes++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      Imagine you have a bunch of storage boxes. Each box has a <strong>label</strong> on the outside and a <strong>value</strong> inside. That's exactly what a variable is — we create them to <strong>remember</strong> information. The label is the variable's <strong>name</strong>, and the contents are its <strong>value</strong>. You can change what's inside a box anytime!
    </p>
  </div>

  <div class="flex flex-wrap items-start justify-center gap-6 sm:justify-evenly sm:gap-0">
    {#each boxes as box, i}
      <div
        class="flex flex-col items-center gap-2 transition-all duration-700
          {i < visibleBoxes ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}"
      >
        <!-- The box visual -->
        <div class="relative flex h-28 w-36 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-dashed {box.color} shadow-md transition-transform duration-300 hover:scale-105">
          <!-- Label tag -->
          <div class="absolute -top-3 rounded-full bg-white px-3 py-0.5 text-xs font-bold {box.textColor} shadow-sm border {box.color}">
            {box.label}
          </div>
          <!-- Value inside -->
          <span class="text-xl font-bold {box.textColor}">{box.value}</span>
        </div>

        <!-- Description -->
        <p class="w-36 text-center text-sm text-slate-600">{box.desc}</p>
      </div>
    {/each}
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}
  <div class="space-y-8">
    <div>
      <p class="text-slate-600">
        Variables are <strong>named references to values stored in memory</strong>. In JavaScript/TypeScript, how you declare a variable determines its <strong>mutability</strong> and <strong>scope</strong>. Understanding the difference between <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">const</code>, <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">let</code>, and <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">var</code> is fundamental to writing predictable code.
      </p>
    </div>

    <!-- Code example -->
    <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm">
      <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">TypeScript</div>
      <pre class="text-green-400">// const - immutable binding (block-scoped)
const PI: number = 3.14159;
const user: string = "Alice";

// let - mutable binding (block-scoped)
let count: number = 0;
count = count + 1; // OK

// var - mutable binding (function-scoped) - avoid!
var legacy = "hoisted to function scope";

// Type annotations
let name: string = "Bob";
let age: number = 25;
let active: boolean = true;
let items: number[] = [1, 2, 3];</pre>
    </div>

    <!-- Scope illustration -->
    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">Scope &amp; Memory</h3>
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <div class="w-16 rounded bg-blue-600 px-2 py-1 text-center text-xs font-bold text-white">const</div>
          <div class="flex-1 rounded bg-white px-3 py-2 text-sm text-slate-600">Block-scoped. Cannot be reassigned. The binding is immutable, but object properties can still change.</div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-16 rounded bg-blue-500 px-2 py-1 text-center text-xs font-bold text-white">let</div>
          <div class="flex-1 rounded bg-white px-3 py-2 text-sm text-slate-600">Block-scoped. Can be reassigned. Not hoisted to the top of the function.</div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-16 rounded bg-slate-400 px-2 py-1 text-center text-xs font-bold text-white">var</div>
          <div class="flex-1 rounded bg-white px-3 py-2 text-sm text-slate-600">Function-scoped. Hoisted. Can lead to bugs due to unexpected scoping. Avoid in modern code.</div>
        </div>
      </div>
    </div>

    <!-- Key concepts list -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <strong>Type annotations</strong> declare what kind of data a variable holds (<code class="text-sm">string</code>, <code class="text-sm">number</code>, <code class="text-sm">boolean</code>), catching errors at compile time.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <strong>Scope</strong> determines where a variable is accessible. Block scope (<code class="text-sm">let</code>/<code class="text-sm">const</code>) is limited to the nearest <code class="text-sm">{'{}'}</code> block.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <strong>Memory allocation</strong>: primitives (numbers, strings, booleans) are stored on the stack; objects and arrays are stored on the heap with a reference on the stack.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <strong>Shadowing</strong> occurs when a variable in an inner scope has the same name as one in an outer scope, hiding the outer variable.
        </li>
      </ul>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>
