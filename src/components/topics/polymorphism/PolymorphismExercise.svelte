<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();
  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  let c1Answer = $state('');
  let c1Result = $state<'correct' | 'wrong' | null>(null);

  let c2Answer = $state('');
  let c2Result = $state<'correct' | 'wrong' | null>(null);

  let c3Answer = $state('');
  let c3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(c1Result !== null && c2Result !== null && c3Result !== null);

  function checkC1() {
    c1Result = advanced
      ? c1Answer === 'dog-speak' ? 'correct' : 'wrong'
      : c1Answer === 'polymorphism' ? 'correct' : 'wrong';
  }
  function checkC2() {
    c2Result = advanced
      ? c2Answer === 'hello-number' ? 'correct' : 'wrong'
      : c2Answer === 'use-same-way' ? 'correct' : 'wrong';
  }
  function checkC3() {
    c3Result = advanced
      ? c3Answer === 'parametric' ? 'correct' : 'wrong'
      : c3Answer === 'each-draws-differently' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (allDone) {
      const score = [c1Result, c2Result, c3Result].filter((r) => r === 'correct').length;
      oncomplete?.(score);
    }
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Polymorphism</h2>
    <p class="text-slate-600">Test your understanding of polymorphism!</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. If <code class="rounded bg-slate-100 px-1.5 py-0.5">Dog</code> and <code class="rounded bg-slate-100 px-1.5 py-0.5">Cat</code> both have a <code class="rounded bg-slate-100 px-1.5 py-0.5">speak()</code> method that produces different outputs, what is this concept called?
    </p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each [
        { value: 'inheritance', label: 'Inheritance' },
        { value: 'polymorphism', label: 'Polymorphism' },
        { value: 'encapsulation', label: 'Encapsulation' },
        { value: 'abstraction', label: 'Abstraction' },
      ] as opt}
        <button
          onclick={() => { c1Answer = opt.value; }}
          disabled={c1Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-sm font-medium transition-all
            {c1Answer === opt.value ? 'border-orange-500 bg-orange-100 text-orange-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Same interface, different behavior is polymorphism.</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Not quite. Think about which concept means "many forms."</p>{/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What's the main benefit of polymorphism?
    </p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each [
        { value: 'runs-faster', label: 'Code runs faster' },
        { value: 'use-same-way', label: 'You can use different objects the same way' },
        { value: 'less-memory', label: 'Uses less memory' },
        { value: 'prevents-bugs', label: 'Prevents all bugs' },
      ] as opt}
        <button
          onclick={() => { c2Answer = opt.value; }}
          disabled={c2Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-sm font-medium transition-all
            {c2Answer === opt.value ? 'border-orange-500 bg-orange-100 text-orange-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Polymorphism lets you treat different objects uniformly.</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Think about what it means to call the same method on different objects.</p>{/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. A loop calls <code class="rounded bg-slate-100 px-1.5 py-0.5">shape.draw()</code> on a Circle, Square, and Triangle. What happens?
    </p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each [
        { value: 'error', label: 'It throws an error' },
        { value: 'same-shape', label: 'They all draw the same shape' },
        { value: 'each-draws-differently', label: 'Each shape draws itself differently' },
        { value: 'only-first', label: 'Only the first shape draws' },
      ] as opt}
        <button
          onclick={() => { c3Answer = opt.value; }}
          disabled={c3Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-sm font-medium transition-all
            {c3Answer === opt.value ? 'border-orange-500 bg-orange-100 text-orange-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Each object's draw() method knows how to draw its own shape.</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Remember: each class has its own implementation of draw().</p>{/if}
  </div>

  {#if allDone}
    <div>
      <p class="text-lg font-bold text-green-600">All challenges complete!</p>
    </div>
  {/if}
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Polymorphism (Advanced)</h2>
    <p class="text-slate-600">Test your deeper understanding of polymorphic dispatch and type systems.</p>
  </div>

  <!-- Challenge 1: Predict which implementation runs -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. Given <code class="rounded bg-slate-100 px-1.5 py-0.5">class Animal &#123; speak() &#123; return "..." &#125; &#125;</code> and
      <code class="rounded bg-slate-100 px-1.5 py-0.5">class Dog extends Animal &#123; speak() &#123; return "Woof" &#125; &#125;</code>,
      what does <code class="rounded bg-slate-100 px-1.5 py-0.5">let a: Animal = new Dog(); a.speak();</code> return?
    </p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each [
        { value: 'ellipsis', label: '"..."' },
        { value: 'dog-speak', label: '"Woof"' },
        { value: 'type-error', label: 'TypeError' },
        { value: 'undefined', label: 'undefined' },
      ] as opt}
        <button
          onclick={() => { c1Answer = opt.value; }}
          disabled={c1Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-sm font-medium transition-all
            {c1Answer === opt.value ? 'border-orange-500 bg-orange-100 text-orange-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Runtime dispatch uses the actual object type (Dog), not the declared type (Animal).</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Think about runtime vs compile-time types. The variable is typed as Animal, but the object is a Dog.</p>{/if}
  </div>

  <!-- Challenge 2: Generic function with type constraints -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. Given <code class="rounded bg-slate-100 px-1.5 py-0.5">function greet&lt;T extends &#123; name: string &#125;&gt;(obj: T): string &#123; return "Hello, " + obj.name; &#125;</code>,
      what is the output of <code class="rounded bg-slate-100 px-1.5 py-0.5">greet(42)</code>?
    </p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each [
        { value: 'hello-42', label: '"Hello, 42"' },
        { value: 'hello-undefined', label: '"Hello, undefined"' },
        { value: 'hello-number', label: 'Compile-time error' },
        { value: 'runtime-error', label: 'Runtime error' },
      ] as opt}
        <button
          onclick={() => { c2Answer = opt.value; }}
          disabled={c2Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-sm font-medium transition-all
            {c2Answer === opt.value ? 'border-orange-500 bg-orange-100 text-orange-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! The type constraint <code class="rounded bg-slate-100 px-1.5 py-0.5">T extends &#123; name: string &#125;</code> rejects <code class="rounded bg-slate-100 px-1.5 py-0.5">number</code> at compile time.</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Consider whether <code class="rounded bg-slate-100 px-1.5 py-0.5">42</code> satisfies the constraint <code class="rounded bg-slate-100 px-1.5 py-0.5">&#123; name: string &#125;</code>.</p>{/if}
  </div>

  <!-- Challenge 3: Parametric vs ad-hoc polymorphism -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. A function <code class="rounded bg-slate-100 px-1.5 py-0.5">identity&lt;T&gt;(x: T): T</code> works the same way for every type, while
      <code class="rounded bg-slate-100 px-1.5 py-0.5">toString(x: number)</code> and <code class="rounded bg-slate-100 px-1.5 py-0.5">toString(x: Date)</code> have different implementations. Which uses parametric polymorphism?
    </p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each [
        { value: 'parametric', label: 'identity<T>' },
        { value: 'ad-hoc', label: 'toString overloads' },
        { value: 'both', label: 'Both are parametric' },
        { value: 'neither', label: 'Neither is parametric' },
      ] as opt}
        <button
          onclick={() => { c3Answer = opt.value; }}
          disabled={c3Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-sm font-medium transition-all
            {c3Answer === opt.value ? 'border-orange-500 bg-orange-100 text-orange-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">Check</button>
      {/if}
    </div>
    {#if c3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Parametric polymorphism (generics) uses one implementation for all types. Overloading is ad-hoc polymorphism.</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Parametric means the same code works for any type parameter. Ad-hoc means different implementations per type.</p>{/if}
  </div>

  {#if allDone}
    <div>
      <p class="text-lg font-bold text-green-600">All challenges complete!</p>
    </div>
  {/if}
</div>
{/if}
