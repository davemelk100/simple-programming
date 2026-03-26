<script lang="ts">
  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

  // Challenge 1
  let c1Result = $state<'correct' | 'wrong' | null>(null);

  // Challenge 2
  let c2Result = $state<'correct' | 'wrong' | null>(null);

  // Challenge 3
  let c3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(c1Result !== null && c2Result !== null && c3Result !== null);

  function checkC1(answer: string) {
    c1Result = answer === 'details' ? 'correct' : 'wrong';
  }

  function checkC2(answer: string) {
    c2Result = answer === 'sendEmail' ? 'correct' : 'wrong';
  }

  function checkC3(answer: string) {
    c3Result = answer === 'easier' ? 'correct' : 'wrong';
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Abstraction</h2>
    <p class="text-slate-600">Test what you've learned about hiding complexity!</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-4 font-medium text-slate-800">1. What does abstraction hide?</p>
    <div class="flex flex-col gap-2">
      <button
        onclick={() => checkC1('details')}
        disabled={c1Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {c1Result === 'correct' ? 'border-green-400 bg-green-50 text-green-700' : c1Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        Unnecessary implementation details
      </button>
      <button
        onclick={() => checkC1('variables')}
        disabled={c1Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {c1Result === 'wrong' && c1Result !== null ? 'border-red-300 opacity-50' : c1Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        All variables in a program
      </button>
      <button
        onclick={() => checkC1('output')}
        disabled={c1Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {c1Result === 'wrong' && c1Result !== null ? 'border-red-300 opacity-50' : c1Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        The output of a function
      </button>
    </div>
    {#if c1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Abstraction hides the complex details you don't need to see.</p>
    {:else if c1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Abstraction hides unnecessary implementation details.</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-4 font-medium text-slate-800">2. Which is a good example of abstraction?</p>
    <div class="flex flex-col gap-2">
      <button
        onclick={() => checkC2('longVar')}
        disabled={c2Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {c2Result === 'wrong' && c2Result !== null ? 'border-red-300 opacity-50' : c2Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        A variable with a very long name
      </button>
      <button
        onclick={() => checkC2('sendEmail')}
        disabled={c2Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {c2Result === 'correct' ? 'border-green-400 bg-green-50 text-green-700' : c2Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        A function called sendEmail() that handles all the complex steps internally
      </button>
      <button
        onclick={() => checkC2('comments')}
        disabled={c2Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {c2Result === 'wrong' && c2Result !== null ? 'border-red-300 opacity-50' : c2Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        Writing comments on every line of code
      </button>
    </div>
    {#if c2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! sendEmail() abstracts away all the complex email delivery steps.</p>
    {:else if c2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. A function that hides complex steps behind a simple name is abstraction.</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-4 font-medium text-slate-800">3. Why is abstraction useful?</p>
    <div class="flex flex-col gap-2">
      <button
        onclick={() => checkC3('faster')}
        disabled={c3Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {c3Result === 'wrong' && c3Result !== null ? 'border-red-300 opacity-50' : c3Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        It makes programs run faster
      </button>
      <button
        onclick={() => checkC3('easier')}
        disabled={c3Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {c3Result === 'correct' ? 'border-green-400 bg-green-50 text-green-700' : c3Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        It makes complex systems easier to use and understand
      </button>
      <button
        onclick={() => checkC3('remove')}
        disabled={c3Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {c3Result === 'wrong' && c3Result !== null ? 'border-red-300 opacity-50' : c3Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        It removes the need for testing
      </button>
    </div>
    {#if c3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Abstraction simplifies complex systems so they're easier to work with.</p>
    {:else if c3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Abstraction makes complex systems easier to use and understand.</p>
    {/if}
  </div>

  {#if allDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All challenges complete!</p>
    </div>
  {/if}
</div>
