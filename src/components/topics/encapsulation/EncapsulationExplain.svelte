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
      name: 'BankAccount',
      icon: '🏦',
      hidden: ['balance: $5,000', 'transactionLog[]', 'accountId'],
      exposed: ['deposit(amount)', 'withdraw(amount)', 'getBalance()'],
      desc: 'The balance is hidden inside. You can only change it through deposit and withdraw -- never by reaching in directly.',
    },
    {
      name: 'Phone',
      icon: '📱',
      hidden: ['circuitBoard', 'signalProcessor', 'radioModule'],
      exposed: ['call(number)', 'sendText(msg)', 'takePicture()'],
      desc: 'You tap buttons on the screen. You never touch the circuits, radio module, or signal processor inside.',
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
      Think of a <strong>TV remote</strong>. You press buttons &mdash; power, volume, channel &mdash; without knowing how the circuits inside work. That's <strong>encapsulation</strong>: hiding the complex internals and only exposing a simple interface. It protects data from being changed in unexpected ways, preventing bugs and keeping your code safe and predictable.
    </p>
  </div>

  <!-- TV Remote visual -->
  <div class="flex max-w-sm items-center gap-6">
    <div class="flex flex-col items-center gap-2">
      <div class="rounded-2xl border-2 border-green-400 bg-green-50 px-5 py-4 shadow-md">
        <div class="mb-2 text-center text-xs font-semibold text-green-600 uppercase tracking-wide">Public buttons</div>
        <div class="flex flex-col gap-1.5">
          <div class="rounded-lg bg-green-200 px-4 py-1.5 text-center text-sm font-bold text-green-800">Power</div>
          <div class="rounded-lg bg-green-200 px-4 py-1.5 text-center text-sm font-bold text-green-800">Volume</div>
          <div class="rounded-lg bg-green-200 px-4 py-1.5 text-center text-sm font-bold text-green-800">Channel</div>
        </div>
      </div>
      <span class="text-xs text-green-600 font-medium">What you see</span>
    </div>

    <svg class="h-6 w-8 shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>

    <div class="flex flex-col items-center gap-2">
      <div class="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100 px-5 py-4 shadow-inner">
        <div class="mb-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">Hidden inside</div>
        <div class="flex flex-col gap-1.5">
          <div class="rounded-lg bg-slate-200 px-4 py-1.5 text-center text-sm text-slate-500 blur-[2px]">IR transmitter</div>
          <div class="rounded-lg bg-slate-200 px-4 py-1.5 text-center text-sm text-slate-500 blur-[2px]">Circuit board</div>
          <div class="rounded-lg bg-slate-200 px-4 py-1.5 text-center text-sm text-slate-500 blur-[2px]">Signal encoder</div>
        </div>
      </div>
      <span class="text-xs text-slate-500 font-medium">What's hidden</span>
    </div>
  </div>

  <!-- Animated examples -->
    <div class="flex flex-col items-start gap-6">
      {#each examples as ex, i}
        <div
          class="w-full rounded-xl border-2 p-5 transition-all duration-700
            {i <= activeExample ? 'translate-x-0 opacity-100 border-green-300 bg-green-50' : '-translate-x-8 opacity-0 border-slate-200 bg-white'}"
        >
          <div class="mb-3 flex items-center gap-2">
            <span class="text-2xl">{ex.icon}</span>
            <h3 class="text-lg font-bold text-green-800">{ex.name}</h3>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <!-- Hidden internals -->
            <div>
              <div class="mb-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Hidden (private)</div>
              {#each ex.hidden as field}
                <div class="mb-1 flex items-center gap-1.5 rounded bg-slate-100 px-2 py-1 text-xs text-slate-500">
                  <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span class="blur-[1.5px]">{field}</span>
                </div>
              {/each}
            </div>

            <!-- Exposed interface -->
            <div>
              <div class="mb-1.5 text-xs font-semibold text-green-600 uppercase tracking-wide">Exposed (public)</div>
              {#each ex.exposed as method}
                <div class="mb-1 rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">{method}</div>
              {/each}
            </div>
          </div>

          {#if i <= activeExample}
            <p class="mt-3 text-slate-600">{ex.desc}</p>
          {/if}
        </div>
      {/each}
    </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}
  <div class="space-y-8">
    <div>
      <p class="text-slate-600">
        Encapsulation is about <strong>controlling access</strong> to internal state. Through <strong>access modifiers</strong>, <strong>information hiding</strong>, well-designed <strong>APIs</strong>, and <strong>interface contracts</strong>, you create boundaries that make code safer, more maintainable, and easier to refactor without breaking consumers.
      </p>
    </div>

    <!-- Code example -->
    <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm">
      <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">TypeScript</div>
      <pre class="text-green-400">// Interface contract - defines the public API
interface ICache&lt;T&gt; {'{'}
  get(key: string): T | undefined;
  set(key: string, value: T): void;
  clear(): void;
{'}'}

// Implementation hides internal details
class LRUCache&lt;T&gt; implements ICache&lt;T&gt; {'{'}
  private map = new Map&lt;string, T&gt;();
  private readonly maxSize: number;

  constructor(maxSize: number = 100) {'{'}
    this.maxSize = maxSize;
  {'}'}

  // Public API - consumers use only these
  get(key: string): T | undefined {'{'}
    const value = this.map.get(key);
    if (value !== undefined) {'{'}
      // Move to end (most recently used)
      this.map.delete(key);
      this.map.set(key, value);
    {'}'}
    return value;
  {'}'}

  set(key: string, value: T): void {'{'}
    this.map.delete(key);
    this.map.set(key, value);
    this.evictIfNeeded(); // internal detail
  {'}'}

  clear(): void {'{'} this.map.clear(); {'}'}

  // Private - hidden implementation detail
  private evictIfNeeded(): void {'{'}
    while (this.map.size &gt; this.maxSize) {'{'}
      const oldest = this.map.keys().next().value;
      this.map.delete(oldest!);
    {'}'}
  {'}'}
{'}'}

// Consumer only sees ICache interface
function loadData(cache: ICache&lt;string&gt;) {'{'}
  cache.set("key", "value"); // OK
  // cache.evictIfNeeded();  // Error! Private
{'}'}</pre>
    </div>

    <!-- Access modifiers illustration -->
    <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-purple-600">Access Modifiers</h3>
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <div class="w-24 rounded bg-green-600 px-2 py-1 text-center text-xs font-bold text-white">public</div>
          <div class="flex-1 text-sm text-slate-600">Accessible from anywhere. The default in TypeScript classes.</div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-24 rounded bg-yellow-500 px-2 py-1 text-center text-xs font-bold text-white">protected</div>
          <div class="flex-1 text-sm text-slate-600">Accessible within the class and its subclasses only.</div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-24 rounded bg-red-500 px-2 py-1 text-center text-xs font-bold text-white">private</div>
          <div class="flex-1 text-sm text-slate-600">Accessible only within the class itself. Use <code class="text-sm">#field</code> for runtime enforcement.</div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-24 rounded bg-slate-500 px-2 py-1 text-center text-xs font-bold text-white">readonly</div>
          <div class="flex-1 text-sm text-slate-600">Can only be set in the constructor. Prevents mutation after initialization.</div>
        </div>
      </div>
    </div>

    <!-- Key concepts list -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <strong>Information hiding</strong> means exposing the minimum surface area. Internal data structures can change without breaking consumers.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <strong>Interface contracts</strong> define what a class promises to do, without specifying how. Consumers depend on the interface, not the implementation.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <strong>API design</strong>: a good public API is small, consistent, and hard to misuse. Validate inputs at the boundary and keep invariants private.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <strong>Encapsulation enables refactoring</strong>: if internals are hidden, you can change the implementation (e.g., swap a Map for a database) without any consumer knowing.
        </li>
      </ul>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>
