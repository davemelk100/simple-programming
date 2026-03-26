<script lang="ts">
  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

  // Challenge 1: What does new Person("Alice", 25) create?
  let c1Result = $state<'correct' | 'wrong' | null>(null);

  // Challenge 2: How many objects can one class create?
  let c2Result = $state<'correct' | 'wrong' | null>(null);

  // Challenge 3: Which is NOT a valid property access?
  let c3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(c1Result !== null && c2Result !== null && c3Result !== null);

  function checkC1(answer: string) {
    c1Result = answer === 'object-alice-25' ? 'correct' : 'wrong';
  }

  function checkC2(answer: string) {
    c2Result = answer === 'unlimited' ? 'correct' : 'wrong';
  }

  function checkC3(answer: string) {
    c3Result = answer === 'car-wheels' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (allDone) {
      const score = [c1Result, c2Result, c3Result].filter((r) => r === 'correct').length;
      oncomplete?.(score);
    }
  });
</script>

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Classes & Objects</h2>
    <p class="text-slate-600">Test what you've learned about blueprints and the objects they create!</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">
      1. Given this class:
    </p>
    <pre class="mb-3 rounded-lg bg-slate-800 p-3 text-sm text-slate-100"><code>class Person &#123;
  constructor(name, age) &#123;
    this.name = name;
    this.age = age;
  &#125;
&#125;</code></pre>
    <p class="mb-3 font-medium text-slate-800">
      What does <code class="rounded bg-slate-100 px-1.5 py-0.5 text-blue-600">new Person("Alice", 25)</code> create?
    </p>
    {#if c1Result === null}
      <div class="flex flex-col gap-2">
        <button onclick={() => checkC1('object-alice-25')} class="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-left text-sm text-blue-800 hover:bg-blue-100 active:scale-[0.98]">
          An object with name "Alice" and age 25
        </button>
        <button onclick={() => checkC1('class-copy')} class="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-left text-sm text-blue-800 hover:bg-blue-100 active:scale-[0.98]">
          A copy of the Person class
        </button>
        <button onclick={() => checkC1('string')} class="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-left text-sm text-blue-800 hover:bg-blue-100 active:scale-[0.98]">
          The string "Alice 25"
        </button>
        <button onclick={() => checkC1('error')} class="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-left text-sm text-blue-800 hover:bg-blue-100 active:scale-[0.98]">
          An error, because classes can't take arguments
        </button>
      </div>
    {/if}
    {#if c1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code>new</code> creates an object from the class blueprint with those values.</p>
    {:else if c1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. <code>new Person("Alice", 25)</code> creates an object with name "Alice" and age 25.</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. How many objects can be created from one class?
    </p>
    {#if c2Result === null}
      <div class="flex flex-col gap-2">
        <button onclick={() => checkC2('one')} class="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-left text-sm text-blue-800 hover:bg-blue-100 active:scale-[0.98]">
          Only one
        </button>
        <button onclick={() => checkC2('ten')} class="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-left text-sm text-blue-800 hover:bg-blue-100 active:scale-[0.98]">
          Up to 10
        </button>
        <button onclick={() => checkC2('hundred')} class="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-left text-sm text-blue-800 hover:bg-blue-100 active:scale-[0.98]">
          Up to 100
        </button>
        <button onclick={() => checkC2('unlimited')} class="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-left text-sm text-blue-800 hover:bg-blue-100 active:scale-[0.98]">
          Unlimited
        </button>
      </div>
    {/if}
    {#if c2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! One class can create as many objects as you need.</p>
    {:else if c2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. There's no limit &mdash; one class can create unlimited objects!</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">
      3. Given this class and object:
    </p>
    <pre class="mb-3 rounded-lg bg-slate-800 p-3 text-sm text-slate-100"><code>class Car &#123;
  constructor(make, speed) &#123;
    this.make = make;
    this.speed = speed;
  &#125;
&#125;
let myCar = new Car("Toyota", 120);</code></pre>
    <p class="mb-3 font-medium text-slate-800">
      Which is <strong>NOT</strong> a valid property access?
    </p>
    {#if c3Result === null}
      <div class="flex flex-col gap-2">
        <button onclick={() => checkC3('car-make')} class="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-left text-sm text-blue-800 hover:bg-blue-100 active:scale-[0.98]">
          <code>myCar.make</code>
        </button>
        <button onclick={() => checkC3('car-speed')} class="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-left text-sm text-blue-800 hover:bg-blue-100 active:scale-[0.98]">
          <code>myCar.speed</code>
        </button>
        <button onclick={() => checkC3('car-wheels')} class="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-left text-sm text-blue-800 hover:bg-blue-100 active:scale-[0.98]">
          <code>myCar.wheels</code>
        </button>
      </div>
    {/if}
    {#if c3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The Car class only defines <code>make</code> and <code>speed</code> &mdash; <code>wheels</code> was never defined.</p>
    {:else if c3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Look at which properties are defined in the constructor &mdash; <code>wheels</code> is not one of them!</p>
    {/if}
  </div>

  {#if allDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All challenges complete!</p>
    </div>
  {/if}
</div>
