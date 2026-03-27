<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);

  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });


  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();


  const examples = [
    {
      name: 'Dog',
      desc: 'The Dog blueprint creates dog objects with a name and breed.',
      properties: ['name', 'breed'],
      objects: [
        { name: 'Buddy', breed: 'Labrador' },
        { name: 'Max', breed: 'Poodle' },
      ],
    },
    {
      name: 'Car',
      desc: 'The Car blueprint creates car objects with a make and speed.',
      properties: ['make', 'speed'],
      objects: [
        { make: 'Toyota', speed: 120 },
        { make: 'Tesla', speed: 155 },
      ],
    },
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
      Think of a class like a <strong>cookie cutter</strong>. The cookie cutter is the blueprint &mdash; it defines the <strong>shape</strong>. Each cookie you stamp out is an <strong>object</strong>, a real thing made from that blueprint. One class can create as many objects as you need &mdash; each with its own unique values. Objects also have <strong>methods</strong> (behaviors) &mdash; things they can <em>do</em>, like <code>car.drive()</code> or <code>dog.bark()</code>.
    </p>
  </div>

  <div class="flex flex-col items-start gap-8">
      {#each examples as ex, i}
        <div
          class="w-full max-w-xl transition-all duration-700
            {i <= activeExample ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}"
        >
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
            <!-- Blueprint (cookie cutter) -->
            <div class="flex flex-col items-center gap-1
              {i === activeExample ? 'animate-pop' : ''}">
              <span class="text-xs font-semibold uppercase tracking-wider text-blue-500">Blueprint</span>
              <div class="flex w-40 flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-blue-50 p-3 shadow-md">
                <span class="text-sm font-bold text-blue-700">{ex.name}</span>
                <div class="mt-1 space-y-0.5">
                  {#each ex.properties as prop}
                    <div class="text-xs text-blue-600">&#8226; {prop}</div>
                  {/each}
                </div>
              </div>
            </div>

            <!-- Arrow -->
            <div class="hidden sm:flex sm:items-center sm:pt-6">
              <svg class="h-6 w-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <!-- Objects (cookies) -->
            <div class="flex flex-wrap gap-2">
              {#each ex.objects as obj, j}
                <div class="flex w-40 flex-col rounded-xl border-2 border-blue-300 bg-blue-100 p-3 shadow-sm transition-all duration-500
                  {i === activeExample ? 'animate-pop' : ''}">
                  <span class="mb-1 text-[10px] font-semibold uppercase text-blue-500">Object {j + 1}</span>
                  {#each Object.entries(obj) as [key, val]}
                    <div class="text-xs text-blue-800">
                      <span class="font-semibold">{key}:</span> {val}
                    </div>
                  {/each}
                </div>
              {/each}
            </div>
          </div>

          {#if i <= activeExample}
            <p class="mt-2 text-slate-500">{ex.desc}</p>
          {/if}
        </div>
      {/each}
    </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}
  <div class="space-y-8">
    <div>
      <p class="text-slate-600">
        Classes in JavaScript/TypeScript are syntactic sugar over prototypal inheritance. They support <strong>constructors</strong> for initialization, <strong>static methods</strong> that belong to the class itself, <strong>private fields</strong> for true encapsulation, and <strong>getters/setters</strong> for computed or validated properties.
      </p>
    </div>

    <!-- Code example -->
    <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm">
      <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">TypeScript</div>
      <pre class="text-green-400">class BankAccount {'{'}
  // Private fields (true encapsulation)
  #balance: number;
  #owner: string;

  // Constructor - called with `new`
  constructor(owner: string, initial: number = 0) {'{'}
    this.#owner = owner;
    this.#balance = initial;
  {'}'}

  // Getter - computed property
  get balance(): number {'{'}
    return this.#balance;
  {'}'}

  // Setter with validation
  set owner(name: string) {'{'}
    if (name.length === 0) throw new Error("Invalid");
    this.#owner = name;
  {'}'}

  // Instance method
  deposit(amount: number): void {'{'}
    if (amount &lt;= 0) throw new Error("Invalid");
    this.#balance += amount;
  {'}'}

  // Static method - belongs to the class, not instances
  static fromJSON(json: string): BankAccount {'{'}
    const {'{'} owner, balance {'}'} = JSON.parse(json);
    return new BankAccount(owner, balance);
  {'}'}
{'}'}

const acct = new BankAccount("Alice", 1000);
acct.balance;     // 1000 (getter)
acct.deposit(50); // OK
// acct.#balance;  // Error! Private field</pre>
    </div>

    <!-- Class anatomy illustration -->
    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">Anatomy of a Class</h3>
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <div class="w-24 rounded bg-blue-600 px-2 py-1 text-center text-xs font-bold text-white">constructor</div>
          <div class="flex-1 text-sm text-slate-600">Initializes new instances. Called automatically with <code class="text-sm">new</code>.</div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-24 rounded bg-blue-500 px-2 py-1 text-center text-xs font-bold text-white">#private</div>
          <div class="flex-1 text-sm text-slate-600">Truly private fields. Not accessible outside the class, even by subclasses.</div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-24 rounded bg-blue-400 px-2 py-1 text-center text-xs font-bold text-white">get / set</div>
          <div class="flex-1 text-sm text-slate-600">Computed properties. Run code when reading or writing a value.</div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-24 rounded bg-indigo-500 px-2 py-1 text-center text-xs font-bold text-white">static</div>
          <div class="flex-1 text-sm text-slate-600">Belongs to the class itself. Called as <code class="text-sm">ClassName.method()</code>. Useful for factories.</div>
        </div>
      </div>
    </div>

    <!-- Key concepts list -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <strong>Constructors</strong> set up initial state. Use parameter defaults and validation to ensure objects start in a valid state.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <strong>Static methods</strong> are utility functions tied to the class (like factory methods) that don't need an instance.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <strong>Private fields</strong> (<code class="text-sm">#field</code>) provide true runtime encapsulation in JS. TypeScript's <code class="text-sm">private</code> keyword is compile-time only.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <strong>Getters/setters</strong> let you add validation, computation, or logging when properties are accessed -- without changing the caller's syntax.
        </li>
      </ul>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  @keyframes popIn {
    0% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }
  .animate-pop {
    animation: popIn 0.4s ease-out;
  }
</style>
