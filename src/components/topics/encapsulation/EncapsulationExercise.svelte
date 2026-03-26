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
    c1Result = c1Answer === 'prevent' ? 'correct' : 'wrong';
  }
  function checkC2() {
    c2Result = c2Answer === 'private-public' ? 'correct' : 'wrong';
  }
  function checkC3() {
    c3Result = c3Answer === 'error' ? 'correct' : 'wrong';
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Encapsulation</h2>
    <p class="text-slate-600">Test your understanding of hiding data and exposing interfaces!</p>
  </div>

  <!-- C1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">1. Why do we hide data inside objects?</p>
    <div class="flex flex-col gap-2">
      {#each [
        { value: 'prevent', label: 'To prevent unexpected changes to the data' },
        { value: 'faster', label: 'To make the program run faster' },
        { value: 'less-memory', label: 'To use less memory' },
      ] as opt}
        <button
          onclick={() => { c1Answer = opt.value; }}
          disabled={c1Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-left text-sm font-medium transition-all
            {c1Answer === opt.value ? 'border-green-500 bg-green-100 text-green-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    {#if c1Answer && c1Result !== 'correct'}
      <div class="mt-3">
        <button onclick={checkC1} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">Check</button>
      </div>
    {/if}
    {#if c1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Encapsulation prevents data from being modified in unexpected ways.</p>{:else if c1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Not quite. Think about what "hiding" data protects against.</p>{/if}
  </div>

  <!-- C2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">2. Which is an example of encapsulation?</p>
    <div class="flex flex-col gap-2">
      {#each [
        { value: 'all-public', label: 'A class where every field is public' },
        { value: 'private-public', label: 'A class with private fields and public methods' },
        { value: 'global-vars', label: 'Using global variables everywhere' },
      ] as opt}
        <button
          onclick={() => { c2Answer = opt.value; }}
          disabled={c2Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-left text-sm font-medium transition-all
            {c2Answer === opt.value ? 'border-green-500 bg-green-100 text-green-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    {#if c2Answer && c2Result !== 'correct'}
      <div class="mt-3">
        <button onclick={checkC2} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">Check</button>
      </div>
    {/if}
    {#if c2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Private fields with public methods is the classic encapsulation pattern.</p>{:else if c2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Encapsulation means hiding the internals. Which option hides fields?</p>{/if}
  </div>

  <!-- C3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">3. What happens when you try to access a private field from outside the class?</p>
    <div class="flex flex-col gap-2">
      {#each [
        { value: 'returns-null', label: 'It returns null' },
        { value: 'error', label: 'You get an error -- it is not allowed' },
        { value: 'works-fine', label: 'It works fine, just like a public field' },
      ] as opt}
        <button
          onclick={() => { c3Answer = opt.value; }}
          disabled={c3Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-left text-sm font-medium transition-all
            {c3Answer === opt.value ? 'border-green-500 bg-green-100 text-green-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    {#if c3Answer && c3Result !== 'correct'}
      <div class="mt-3">
        <button onclick={checkC3} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">Check</button>
      </div>
    {/if}
    {#if c3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Private fields cannot be accessed from outside -- that's the whole point!</p>{:else if c3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Remember: "private" means no outside access. What would happen?</p>{/if}
  </div>

  {#if allDone}
    <div>
      <p class="text-lg font-bold text-green-600">
        All challenges complete! You got {[c1Result, c2Result, c3Result].filter((r) => r === 'correct').length}/3 correct.
      </p>
    </div>
  {/if}
</div>
