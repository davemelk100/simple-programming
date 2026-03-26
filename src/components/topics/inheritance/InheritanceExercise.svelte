<script lang="ts">
  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

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
</script>

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
