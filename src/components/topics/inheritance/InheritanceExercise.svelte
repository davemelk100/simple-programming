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

  // Challenge 1: What does Dog get from Animal?
  let c1Result = $state<'correct' | 'wrong' | null>(null);

  // Challenge 2: Can a child class add new methods?
  let c2Result = $state<'correct' | 'wrong' | null>(null);

  // Challenge 3: What keyword is used to inherit?
  let c3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(c1Result !== null && c2Result !== null && c3Result !== null);

  function answerC1(answer: string) {
    c1Result = answer === 'all' ? 'correct' : 'wrong';
  }

  function answerC2(answer: string) {
    c2Result = answer === 'yes' ? 'correct' : 'wrong';
  }

  function answerC3(answer: string) {
    c3Result = answer === 'extends' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (allDone) {
      const score = [c1Result, c2Result, c3Result].filter((r) => r === 'correct').length;
      oncomplete?.(score);
    }
  });

  // Advanced challenges
  let ac1Result = $state<'correct' | 'wrong' | null>(null);
  let ac2Result = $state<'correct' | 'wrong' | null>(null);
  let ac3Result = $state<'correct' | 'wrong' | null>(null);

  let advancedAllDone = $derived(ac1Result !== null && ac2Result !== null && ac3Result !== null);

  function answerAC1(answer: string) {
    ac1Result = answer === 'parent-then-child' ? 'correct' : 'wrong';
  }

  function answerAC2(answer: string) {
    ac2Result = answer === 'c-b-a' ? 'correct' : 'wrong';
  }

  function answerAC3(answer: string) {
    ac3Result = answer === 'violates-lsp' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (advancedAllDone) {
      const score = [ac1Result, ac2Result, ac3Result].filter((r) => r === 'correct').length;
      oncomplete?.(score);
    }
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Inheritance</h2>
    <p class="text-slate-600">Test what you've learned about building on existing classes!</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. If <code class="rounded bg-purple-100 px-1.5 py-0.5 text-purple-700">Dog extends Animal</code>, what does Dog automatically get?
    </p>
    <div class="flex flex-wrap gap-2">
      <button
        onclick={() => answerC1('all')}
        disabled={c1Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {c1Result === 'correct' ? 'border-green-400 bg-green-100 text-green-700' : 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100'}"
      >
        All of Animal's properties and methods
      </button>
      <button
        onclick={() => answerC1('nothing')}
        disabled={c1Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {c1Result === 'wrong' ? 'border-red-400 bg-red-100 text-red-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}"
      >
        Nothing, it starts empty
      </button>
      <button
        onclick={() => answerC1('name')}
        disabled={c1Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {c1Result === 'wrong' ? 'border-red-400 bg-red-100 text-red-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}"
      >
        Only the name property
      </button>
    </div>
    {#if c1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! A child inherits everything from its parent.</p>
    {:else if c1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Inheritance passes down all properties and methods from the parent.</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. Can a child class add new methods that the parent doesn't have?
    </p>
    <div class="flex flex-wrap gap-2">
      <button
        onclick={() => answerC2('yes')}
        disabled={c2Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {c2Result === 'correct' ? 'border-green-400 bg-green-100 text-green-700' : 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100'}"
      >
        Yes, children can add their own methods
      </button>
      <button
        onclick={() => answerC2('no')}
        disabled={c2Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {c2Result === 'wrong' ? 'border-red-400 bg-red-100 text-red-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}"
      >
        No, children can only use parent methods
      </button>
      <button
        onclick={() => answerC2('replace')}
        disabled={c2Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {c2Result === 'wrong' ? 'border-red-400 bg-red-100 text-red-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}"
      >
        Only if they remove a parent method first
      </button>
    </div>
    {#if c2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Child classes can add new methods on top of what they inherit.</p>
    {:else if c2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Children can absolutely add their own unique methods!</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What keyword is used to inherit from another class?
    </p>
    <div class="flex flex-wrap gap-2">
      <button
        onclick={() => answerC3('extends')}
        disabled={c3Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {c3Result === 'correct' ? 'border-green-400 bg-green-100 text-green-700' : 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100'}"
      >
        <code>extends</code>
      </button>
      <button
        onclick={() => answerC3('inherits')}
        disabled={c3Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {c3Result === 'wrong' ? 'border-red-400 bg-red-100 text-red-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}"
      >
        <code>inherits</code>
      </button>
      <button
        onclick={() => answerC3('copies')}
        disabled={c3Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {c3Result === 'wrong' ? 'border-red-400 bg-red-100 text-red-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}"
      >
        <code>copies</code>
      </button>
    </div>
    {#if c3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! "class Dog extends Animal" is the syntax.</p>
    {:else if c3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. The keyword is "extends" &mdash; as in "Dog extends Animal".</p>
    {/if}
  </div>

  {#if allDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All challenges complete!</p>
    </div>
  {/if}
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Inheritance (Advanced)</h2>
    <p class="text-slate-600">Harder challenges on method resolution, super calls, and design principles.</p>
  </div>

  <!-- Advanced Challenge 1: Predict output with super -->
  <div class="rounded-xl border p-5 transition-colors {ac1Result === 'correct' ? 'border-green-300 bg-green-50' : ac1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">1. What does this code print?</p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-3 text-sm leading-relaxed text-slate-200"><code>class Animal &#123;
  speak() &#123; return "..."; &#125;
&#125;
class Dog extends Animal &#123;
  speak() &#123;
    return super.speak() + " Woof!";
  &#125;
&#125;
console.log(new Dog().speak());</code></pre>
    <div class="flex flex-wrap gap-2">
      <button
        onclick={() => answerAC1('parent-then-child')}
        disabled={ac1Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {ac1Result === 'correct' ? 'border-green-400 bg-green-100 text-green-700' : 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100'}"
      >
        <code>"... Woof!"</code>
      </button>
      <button
        onclick={() => answerAC1('child-only')}
        disabled={ac1Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {ac1Result === 'wrong' ? 'border-red-400 bg-red-100 text-red-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}"
      >
        <code>"Woof!"</code>
      </button>
      <button
        onclick={() => answerAC1('parent-only')}
        disabled={ac1Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {ac1Result === 'wrong' ? 'border-red-400 bg-red-100 text-red-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}"
      >
        <code>"..."</code>
      </button>
      <button
        onclick={() => answerAC1('error')}
        disabled={ac1Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {ac1Result === 'wrong' ? 'border-red-400 bg-red-100 text-red-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}"
      >
        TypeError
      </button>
    </div>
    {#if ac1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! super.speak() calls the parent's version first, then the child concatenates " Woof!".</p>
    {:else if ac1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. super.speak() invokes Animal's speak(), which returns "...", then Dog appends " Woof!".</p>
    {/if}
  </div>

  <!-- Advanced Challenge 2: Method resolution order -->
  <div class="rounded-xl border p-5 transition-colors {ac2Result === 'correct' ? 'border-green-300 bg-green-50' : ac2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">2. Given this chain, what is the method resolution order when calling <code class="rounded bg-purple-100 px-1.5 py-0.5 text-purple-700">c.greet()</code>?</p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-3 text-sm leading-relaxed text-slate-200"><code>class A &#123; greet() &#123; return "A"; &#125; &#125;
class B extends A &#123; &#125;
class C extends B &#123; greet() &#123; return "C"; &#125; &#125;
const c = new C();</code></pre>
    <div class="flex flex-wrap gap-2">
      <button
        onclick={() => answerAC2('c-b-a')}
        disabled={ac2Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {ac2Result === 'correct' ? 'border-green-400 bg-green-100 text-green-700' : 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100'}"
      >
        C &rarr; B &rarr; A (returns "C")
      </button>
      <button
        onclick={() => answerAC2('a-b-c')}
        disabled={ac2Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {ac2Result === 'wrong' ? 'border-red-400 bg-red-100 text-red-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}"
      >
        A &rarr; B &rarr; C (returns "A")
      </button>
      <button
        onclick={() => answerAC2('b-only')}
        disabled={ac2Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {ac2Result === 'wrong' ? 'border-red-400 bg-red-100 text-red-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}"
      >
        B only (returns undefined)
      </button>
    </div>
    {#if ac2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! JavaScript looks at C first, then walks up the chain through B to A. Since C defines greet(), it returns "C" without reaching A.</p>
    {:else if ac2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Method resolution starts at the most-derived class (C) and walks up. C has greet(), so it stops there and returns "C".</p>
    {/if}
  </div>

  <!-- Advanced Challenge 3: LSP / Square-Rectangle problem -->
  <div class="rounded-xl border p-5 transition-colors {ac3Result === 'correct' ? 'border-green-300 bg-green-50' : ac3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-2 font-medium text-slate-800">3. A <code class="rounded bg-purple-100 px-1.5 py-0.5 text-purple-700">Square</code> extends <code class="rounded bg-purple-100 px-1.5 py-0.5 text-purple-700">Rectangle</code>. Setting width on the Square also forces height to match. Code that expects <code class="rounded bg-purple-100 px-1.5 py-0.5 text-purple-700">setWidth()</code> and <code class="rounded bg-purple-100 px-1.5 py-0.5 text-purple-700">setHeight()</code> to be independent breaks. What principle does this violate?</p>
    <div class="flex flex-wrap gap-2">
      <button
        onclick={() => answerAC3('violates-lsp')}
        disabled={ac3Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {ac3Result === 'correct' ? 'border-green-400 bg-green-100 text-green-700' : 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100'}"
      >
        Liskov Substitution Principle
      </button>
      <button
        onclick={() => answerAC3('srp')}
        disabled={ac3Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {ac3Result === 'wrong' ? 'border-red-400 bg-red-100 text-red-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}"
      >
        Single Responsibility Principle
      </button>
      <button
        onclick={() => answerAC3('ocp')}
        disabled={ac3Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {ac3Result === 'wrong' ? 'border-red-400 bg-red-100 text-red-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}"
      >
        Open/Closed Principle
      </button>
      <button
        onclick={() => answerAC3('dry')}
        disabled={ac3Result !== null}
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-60
          {ac3Result === 'wrong' ? 'border-red-400 bg-red-100 text-red-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}"
      >
        DRY (Don't Repeat Yourself)
      </button>
    </div>
    {#if ac3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The Liskov Substitution Principle states that a subclass should be usable anywhere its parent is expected without breaking behavior. Square violates this because it changes how setWidth/setHeight work.</p>
    {:else if ac3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. This is the classic Square-Rectangle problem. The principle that says "a subclass must be substitutable for its parent" is the Liskov Substitution Principle.</p>
    {/if}
  </div>

  {#if advancedAllDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All challenges complete!</p>
    </div>
  {/if}
</div>

{/if}
