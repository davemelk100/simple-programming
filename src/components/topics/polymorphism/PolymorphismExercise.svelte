<script lang="ts">
  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

  let c1Answer = $state('');
  let c1Result = $state<'correct' | 'wrong' | null>(null);

  let c2Answer = $state('');
  let c2Result = $state<'correct' | 'wrong' | null>(null);

  let c3Answer = $state('');
  let c3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(c1Result !== null && c2Result !== null && c3Result !== null);

  function checkC1() {
    c1Result = c1Answer === 'polymorphism' ? 'correct' : 'wrong';
  }
  function checkC2() {
    c2Result = c2Answer === 'use-same-way' ? 'correct' : 'wrong';
  }
  function checkC3() {
    c3Result = c3Answer === 'each-draws-differently' ? 'correct' : 'wrong';
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
