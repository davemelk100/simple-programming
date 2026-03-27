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


  const examples = [
    { name: 'double', input: '5', output: '10', color: 'purple', desc: 'The double machine takes a number and multiplies it by 2.' },
    { name: 'greet', input: '"World"', output: '"Hello, World!"', color: 'violet', desc: 'The greet machine adds "Hello, " in front of your text.' },
    { name: 'isEven', input: '4', output: 'true', color: 'fuchsia', desc: 'The isEven machine checks if a number is even.' },
  ];

  let activeExample = $state(-1);

  onMount(() => {
    let i = 0;
    const interval = setInterval(() => {
      activeExample = i;
      i++;
      if (i >= examples.length) clearInterval(interval);
    }, 1200);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      Think of a function like a machine in a factory. You put something <strong>in</strong>, the machine does its work, and something comes <strong>out</strong>. Every function has a <strong>name</strong>, takes some <strong>input</strong>, and produces an <strong>output</strong>. For simple functions like these, the same input always gives the same output!
    </p>
  </div>

  <div class="flex-1 flex flex-col items-start gap-8">
    {#each examples as ex, i}
      <div
        class="flex w-full items-center gap-3 transition-all duration-700
          {i <= activeExample ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}"
      >
        <!-- Input -->
        <div class="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-sm font-bold text-purple-700 shadow transition-all duration-500
          {i === activeExample ? 'animate-bounce-subtle' : ''}">
          {ex.input}
        </div>

        <!-- Arrow in -->
        <svg class="h-6 w-8 shrink-0 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>

        <!-- Machine -->
        <div class="flex h-16 w-28 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-purple-400 bg-purple-50 shadow-md
          {i === activeExample ? 'machine-shake' : ''}">
          <span class="text-xs text-purple-500">function</span>
          <span class="text-sm font-bold text-purple-700">{ex.name}()</span>
        </div>

        <!-- Arrow out -->
        <svg class="h-6 w-8 shrink-0 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>

        <!-- Output -->
        <div class="flex h-14 w-28 shrink-0 items-center justify-center rounded-lg bg-green-100 text-sm font-bold text-green-700 shadow
          {i === activeExample ? 'animate-pop' : ''}">
          {ex.output}
        </div>
      </div>

      {#if i <= activeExample}
        <p class="text-slate-500 -mt-4">{ex.desc}</p>
      {/if}
    {/each}
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}
  <div class="space-y-8">
    <div>
      <p class="text-slate-600">
        Functions are <strong>reusable blocks of code</strong> that accept <strong>parameters</strong> (the declared inputs) and receive <strong>arguments</strong> (the actual values passed in). They can specify <strong>return types</strong>, be <strong>pure</strong> (no side effects, same input always yields same output), or be <strong>higher-order</strong> (accept or return other functions).
      </p>
    </div>

    <!-- Code example -->
    <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm">
      <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">TypeScript</div>
      <pre class="text-green-400">// Parameters vs arguments
function greet(name: string): string {'{'} // "name" is a parameter
  return `Hello, ${'{'} name {'}'}!`;
{'}'}
greet("Alice"); // "Alice" is an argument

// Pure function - no side effects, deterministic
function add(a: number, b: number): number {'{'}
  return a + b;
{'}'}

// Higher-order function - takes a function as input
function map&lt;T, U&gt;(
  arr: T[],
  transform: (item: T) =&gt; U
): U[] {'{'}
  return arr.map(transform);
{'}'}

const doubled = map([1, 2, 3], (n) =&gt; n * 2);
// [2, 4, 6]

// Arrow functions &amp; closures
const multiplier = (factor: number) =&gt;
  (n: number) =&gt; n * factor;

const triple = multiplier(3);
triple(5); // 15</pre>
    </div>

    <!-- Function types illustration -->
    <div class="grid grid-cols-2 gap-4">
      <div class="rounded-xl border-2 border-green-300 bg-green-50 p-4">
        <h4 class="mb-2 text-sm font-bold text-green-700">Pure Function</h4>
        <div class="space-y-1 text-xs text-slate-600">
          <p>Same input &rarr; same output</p>
          <p>No side effects</p>
          <p>Easy to test &amp; reason about</p>
        </div>
      </div>
      <div class="rounded-xl border-2 border-purple-300 bg-purple-50 p-4">
        <h4 class="mb-2 text-sm font-bold text-purple-700">Higher-Order Function</h4>
        <div class="space-y-1 text-xs text-slate-600">
          <p>Takes functions as arguments</p>
          <p>Or returns a function</p>
          <p>Enables composition &amp; abstraction</p>
        </div>
      </div>
    </div>

    <!-- Key concepts list -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>Parameters vs arguments</strong>: parameters are the variable names in the function definition; arguments are the actual values you pass when calling it.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>Return types</strong> declare what a function gives back. TypeScript infers them, but explicit annotations improve readability and catch bugs.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>Closures</strong> allow inner functions to capture variables from their enclosing scope, enabling patterns like factories and private state.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>Higher-order functions</strong> like <code class="text-sm">map</code>, <code class="text-sm">filter</code>, and <code class="text-sm">reduce</code> are the foundation of functional programming in JavaScript.
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

<style>
  @keyframes machineShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px) rotate(-1deg); }
    75% { transform: translateX(2px) rotate(1deg); }
  }
  @keyframes popIn {
    0% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
  .machine-shake {
    animation: machineShake 0.3s ease-in-out 3;
  }
  .animate-pop {
    animation: popIn 0.4s ease-out;
  }
  .animate-bounce-subtle {
    animation: popIn 0.3s ease-out;
  }
</style>
