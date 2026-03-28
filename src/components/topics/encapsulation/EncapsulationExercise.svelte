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

  // Advanced mode state
  let ac1Answer = $state('');
  let ac1Result = $state<'correct' | 'wrong' | null>(null);

  let ac2Answer = $state('');
  let ac2Result = $state<'correct' | 'wrong' | null>(null);

  let ac3Answer = $state('');
  let ac3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(ac1Result !== null && ac2Result !== null && ac3Result !== null);

  function checkAC1() {
    ac1Result = ac1Answer === 'protected' ? 'correct' : 'wrong';
  }
  function checkAC2() {
    ac2Result = ac2Answer === 'direct-field' ? 'correct' : 'wrong';
  }
  function checkAC3() {
    ac3Result = ac3Answer === 'clamped' ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (advAllDone) {
      const score = [ac1Result, ac2Result, ac3Result].filter((r) => r === 'correct').length;
      oncomplete?.(score);
    }
  });
</script>

{#if !advanced}
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

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Encapsulation (Advanced)</h2>
    <p class="text-slate-600">Deeper challenges on access modifiers, encapsulation violations, and getter logic.</p>
  </div>

  <!-- AC1: Access modifier for subclass but not external -->
  <div class="rounded-xl border p-5 transition-colors {ac1Result === 'correct' ? 'border-green-300 bg-green-50' : ac1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">1. Which access modifier allows a subclass to access a member but prevents access from outside code?</p>
    <div class="flex flex-col gap-2">
      {#each [
        { value: 'private', label: 'private -- only the declaring class' },
        { value: 'protected', label: 'protected -- the declaring class and its subclasses' },
        { value: 'public', label: 'public -- any code can access it' },
      ] as opt}
        <button
          onclick={() => { ac1Answer = opt.value; }}
          disabled={ac1Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-left text-sm font-medium transition-all
            {ac1Answer === opt.value ? 'border-green-500 bg-green-100 text-green-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    {#if ac1Answer && ac1Result !== 'correct'}
      <div class="mt-3">
        <button onclick={checkAC1} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">Check</button>
      </div>
    {/if}
    {#if ac1Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Protected members are visible to subclasses but hidden from external code.</p>{:else if ac1Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Not quite. Think about what sits between private (fully hidden) and public (fully open).</p>{/if}
  </div>

  <!-- AC2: Identify encapsulation violation -->
  <div class="rounded-xl border p-5 transition-colors {ac2Result === 'correct' ? 'border-green-300 bg-green-50' : ac2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">2. Which of the following violates encapsulation?</p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-3 text-sm text-slate-100 overflow-x-auto"><code>class User &#123;
  public name: string;
  public email: string;
  public password: string;  // ???
&#125;</code></pre>
    <div class="flex flex-col gap-2">
      {#each [
        { value: 'direct-field', label: 'Making password a public field -- sensitive data is exposed' },
        { value: 'has-constructor', label: 'Having a constructor that sets fields' },
        { value: 'three-fields', label: 'Having three fields in one class' },
      ] as opt}
        <button
          onclick={() => { ac2Answer = opt.value; }}
          disabled={ac2Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-left text-sm font-medium transition-all
            {ac2Answer === opt.value ? 'border-green-500 bg-green-100 text-green-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    {#if ac2Answer && ac2Result !== 'correct'}
      <div class="mt-3">
        <button onclick={checkAC2} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">Check</button>
      </div>
    {/if}
    {#if ac2Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! Exposing sensitive data like a password as a public field is a classic encapsulation violation.</p>{:else if ac2Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Look for a field that should never be directly accessible from outside the class.</p>{/if}
  </div>

  <!-- AC3: Getter with validation/transform -->
  <div class="rounded-xl border p-5 transition-colors {ac3Result === 'correct' ? 'border-green-300 bg-green-50' : ac3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">3. Given this class, what does <code class="rounded bg-slate-100 px-1 text-sm">getTemperature()</code> return when the internal <code class="rounded bg-slate-100 px-1 text-sm">#temp</code> is <strong>-300</strong>?</p>
    <pre class="mb-3 rounded-lg bg-slate-900 p-3 text-sm text-slate-100 overflow-x-auto"><code>class Sensor &#123;
  #temp;
  getTemperature() &#123;
    return Math.max(this.#temp, -273.15);
  &#125;
&#125;</code></pre>
    <div class="flex flex-col gap-2">
      {#each [
        { value: 'raw', label: '-300 (returns the raw value)' },
        { value: 'clamped', label: '-273.15 (clamps to absolute zero)' },
        { value: 'error', label: 'An error (negative values are not allowed)' },
      ] as opt}
        <button
          onclick={() => { ac3Answer = opt.value; }}
          disabled={ac3Result === 'correct'}
          class="rounded-lg border px-4 py-2 text-left text-sm font-medium transition-all
            {ac3Answer === opt.value ? 'border-green-500 bg-green-100 text-green-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}
            disabled:opacity-50"
        >
          {opt.label}
        </button>
      {/each}
    </div>
    {#if ac3Answer && ac3Result !== 'correct'}
      <div class="mt-3">
        <button onclick={checkAC3} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">Check</button>
      </div>
    {/if}
    {#if ac3Result === 'correct'}<p class="mt-2 text-sm font-medium text-green-600">Correct! The getter validates the private field and clamps it to -273.15 (absolute zero). This is a key benefit of encapsulation -- getters can transform data.</p>{:else if ac3Result === 'wrong'}<p class="mt-2 text-sm text-red-600">Look at Math.max(-300, -273.15). Which value is larger?</p>{/if}
  </div>

  {#if advAllDone}
    <div>
      <p class="text-lg font-bold text-green-600">
        All challenges complete! You got {[ac1Result, ac2Result, ac3Result].filter((r) => r === 'correct').length}/3 correct.
      </p>
    </div>
  {/if}
</div>

{/if}
