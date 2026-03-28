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

  // Advanced mode state
  let ac1Result = $state<'correct' | 'wrong' | null>(null);
  let ac2Result = $state<'correct' | 'wrong' | null>(null);
  let ac3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(ac1Result !== null && ac2Result !== null && ac3Result !== null);

  function checkAC1(answer: string) {
    // Identify which layer: "SELECT * FROM users" is data access
    ac1Result = answer === 'data' ? 'correct' : 'wrong';
  }

  function checkAC2(answer: string) {
    // Constructor injection decouples modules by passing dependencies in
    ac2Result = answer === 'constructor' ? 'correct' : 'wrong';
  }

  function checkAC3(answer: string) {
    // ORM generating N+1 queries is a classic leaky abstraction
    ac3Result = answer === 'n1' ? 'correct' : 'wrong';
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
{:else}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Abstraction</h2>
    <p class="text-slate-600">Test your understanding of abstraction layers, dependency injection, and leaky abstractions.</p>
  </div>

  <!-- AC1: Identify abstraction layer -->
  <div class="rounded-xl border p-5 transition-colors {ac1Result === 'correct' ? 'border-green-300 bg-green-50' : ac1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">1. Which layer of abstraction does this code belong to?</p>
    <pre class="mb-4 rounded-lg bg-slate-900 px-4 py-3 text-sm text-slate-200"><code>const users = await db.query("SELECT * FROM users WHERE active = 1");</code></pre>
    <div class="flex flex-col gap-2">
      <button
        onclick={() => checkAC1('ui')}
        disabled={ac1Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {ac1Result === 'wrong' && ac1Result !== null ? 'border-red-300 opacity-50' : ac1Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        UI / Presentation layer
      </button>
      <button
        onclick={() => checkAC1('business')}
        disabled={ac1Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {ac1Result === 'wrong' && ac1Result !== null ? 'border-red-300 opacity-50' : ac1Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        Business logic layer
      </button>
      <button
        onclick={() => checkAC1('data')}
        disabled={ac1Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {ac1Result === 'correct' ? 'border-green-400 bg-green-50 text-green-700' : ac1Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        Data access layer
      </button>
    </div>
    {#if ac1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! Raw SQL queries belong to the data access layer -- the lowest abstraction level that talks directly to the database.</p>
    {:else if ac1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Code that executes SQL queries directly interacts with the database, placing it in the data access layer.</p>
    {/if}
  </div>

  <!-- AC2: Dependency injection pattern -->
  <div class="rounded-xl border p-5 transition-colors {ac2Result === 'correct' ? 'border-green-300 bg-green-50' : ac2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">2. Which dependency injection pattern decouples these two modules?</p>
    <pre class="mb-4 rounded-lg bg-slate-900 px-4 py-3 text-sm text-slate-200"><code>class OrderService &#123;
  constructor(private paymentGateway: PaymentGateway) &#123;&#125;
  checkout(order: Order) &#123;
    this.paymentGateway.charge(order.total);
  &#125;
&#125;</code></pre>
    <div class="flex flex-col gap-2">
      <button
        onclick={() => checkAC2('constructor')}
        disabled={ac2Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {ac2Result === 'correct' ? 'border-green-400 bg-green-50 text-green-700' : ac2Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        Constructor injection -- dependency passed via constructor parameter
      </button>
      <button
        onclick={() => checkAC2('service')}
        disabled={ac2Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {ac2Result === 'wrong' && ac2Result !== null ? 'border-red-300 opacity-50' : ac2Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        Service locator -- dependency fetched from a global registry
      </button>
      <button
        onclick={() => checkAC2('setter')}
        disabled={ac2Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {ac2Result === 'wrong' && ac2Result !== null ? 'border-red-300 opacity-50' : ac2Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        Setter injection -- dependency assigned after construction
      </button>
    </div>
    {#if ac2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The PaymentGateway is passed through the constructor, making the dependency explicit and easy to swap for testing.</p>
    {:else if ac2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Look at how PaymentGateway is provided -- it's a constructor parameter, not fetched from a registry or set after creation.</p>
    {/if}
  </div>

  <!-- AC3: Leaky abstraction -->
  <div class="rounded-xl border p-5 transition-colors {ac3Result === 'correct' ? 'border-green-300 bg-green-50' : ac3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">3. A developer uses an ORM to fetch users and their posts. The page loads slowly. What leaky abstraction problem is most likely occurring?</p>
    <pre class="mb-4 rounded-lg bg-slate-900 px-4 py-3 text-sm text-slate-200"><code>const users = await User.findAll();
for (const user of users) &#123;
  console.log(user.posts); // lazy-loaded
&#125;</code></pre>
    <div class="flex flex-col gap-2">
      <button
        onclick={() => checkAC3('n1')}
        disabled={ac3Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {ac3Result === 'correct' ? 'border-green-400 bg-green-50 text-green-700' : ac3Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        N+1 query problem -- each user triggers a separate query for posts
      </button>
      <button
        onclick={() => checkAC3('cache')}
        disabled={ac3Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {ac3Result === 'wrong' && ac3Result !== null ? 'border-red-300 opacity-50' : ac3Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        Cache invalidation -- stale data is being served
      </button>
      <button
        onclick={() => checkAC3('deadlock')}
        disabled={ac3Result !== null}
        class="rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all hover:bg-indigo-50 active:scale-[0.99] disabled:cursor-not-allowed
          {ac3Result === 'wrong' && ac3Result !== null ? 'border-red-300 opacity-50' : ac3Result !== null ? 'border-slate-200 opacity-50' : 'border-slate-200 text-slate-700'}"
      >
        Database deadlock -- two transactions are blocking each other
      </button>
    </div>
    {#if ac3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The ORM abstracts away SQL, but lazy loading in a loop generates N+1 queries -- one for users, then one per user for their posts. The abstraction leaks because you must understand the underlying SQL to fix performance.</p>
    {:else if ac3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think about what happens when you access <code>user.posts</code> inside a loop with lazy loading -- how many database queries are actually generated?</p>
    {/if}
  </div>

  {#if advAllDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All advanced challenges complete!</p>
    </div>
  {/if}
</div>
{/if}
