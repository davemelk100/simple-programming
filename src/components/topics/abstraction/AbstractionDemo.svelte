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

  // --- Basic mode state ---
  const steps = [
    { label: 'Grind beans', icon: '🫘', detail: 'Burr grinder pulverizes beans to medium-fine' },
    { label: 'Heat water', icon: '🔥', detail: 'Heater raises water to 96°C' },
    { label: 'Brew coffee', icon: '💧', detail: 'Hot water passes through grounds under pressure' },
    { label: 'Pour into cup', icon: '☕', detail: 'Brewed coffee dispensed through nozzle' },
  ];

  let brewing = $state(false);
  let currentStep = $state(-1);
  let done = $state(false);
  let showComplexity = $state(false);

  function makeCoffee() {
    brewing = true;
    currentStep = -1;
    done = false;

    let i = 0;
    const interval = setInterval(() => {
      currentStep = i;
      i++;
      if (i >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          done = true;
          brewing = false;
        }, 800);
      }
    }, 1000);
  }

  function reset() {
    brewing = false;
    currentStep = -1;
    done = false;
  }

  // --- Advanced mode state ---

  interface Layer {
    name: string;
    color: string;
    publicApi: string;
    privateImpl: string;
    expanded: boolean;
  }

  let layers: Layer[] = $state([
    {
      name: 'UI Layer',
      color: 'bg-indigo-600',
      publicApi: `// Public API
<UserList />
<OrderForm onSubmit={handler} />
<PaymentButton amount={total} />`,
      privateImpl: `// Private implementation
function renderUsers(data: User[]) {
  // Virtual DOM diffing
  // Event delegation setup
  // CSS-in-JS style injection
  // Accessibility tree updates
}`,
      expanded: false,
    },
    {
      name: 'API Layer',
      color: 'bg-indigo-500',
      publicApi: `// Public API
interface OrderAPI {
  getOrders(): Promise<Order[]>;
  placeOrder(o: NewOrder): Promise<Order>;
  cancelOrder(id: string): Promise<void>;
}`,
      privateImpl: `// Private implementation
class OrderAPIImpl implements OrderAPI {
  private cache = new Map<string, Order>();
  private retryQueue: Request[] = [];

  async getOrders() {
    if (this.cache.size) return [...this.cache.values()];
    const res = await fetch('/api/orders', {
      headers: this.authHeaders(),
    });
    // retry logic, error mapping, caching...
  }
}`,
      expanded: false,
    },
    {
      name: 'Service Layer',
      color: 'bg-indigo-400',
      publicApi: `// Public API
interface OrderService {
  validate(o: NewOrder): ValidationResult;
  calculateTotal(items: Item[]): Money;
  process(o: Order): Promise<Receipt>;
}`,
      privateImpl: `// Private implementation
class OrderServiceImpl implements OrderService {
  constructor(
    private tax: TaxCalculator,
    private inventory: InventoryChecker,
    private fraud: FraudDetector,
  ) {}

  async process(o: Order) {
    await this.fraud.check(o);
    await this.inventory.reserve(o.items);
    const tax = this.tax.compute(o);
    // orchestrate 5+ sub-systems...
  }
}`,
      expanded: false,
    },
    {
      name: 'Database Layer',
      color: 'bg-slate-500',
      publicApi: `// Public API (Repository pattern)
interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  save(order: Order): Promise<void>;
  delete(id: string): Promise<void>;
}`,
      privateImpl: `// Private implementation
class PostgresOrderRepo implements OrderRepository {
  async findById(id: string) {
    const row = await this.pool.query(
      'SELECT * FROM orders WHERE id = $1', [id]
    );
    // connection pooling, query planning,
    // ORM mapping, transaction management,
    // read replica routing...
  }
}`,
      expanded: false,
    },
  ]);

  function toggleLayer(index: number) {
    layers[index].expanded = !layers[index].expanded;
  }

  // --- Dependency injection demo ---
  type ImplKey = 'production' | 'testing' | 'development';
  let activeImpl: ImplKey = $state('production');

  const implementations: Record<ImplKey, { logger: string; payment: string; database: string }> = {
    production: {
      logger: 'CloudWatchLogger  ->  AWS CloudWatch',
      payment: 'StripeGateway     ->  Stripe API',
      database: 'PostgresRepo      ->  PostgreSQL',
    },
    testing: {
      logger: 'MockLogger        ->  In-memory array',
      payment: 'FakePayment       ->  Always succeeds',
      database: 'InMemoryRepo      ->  Map<string, T>',
    },
    development: {
      logger: 'ConsoleLogger     ->  console.log',
      payment: 'SandboxPayment    ->  Stripe test mode',
      database: 'SQLiteRepo        ->  Local SQLite file',
    },
  };

  // --- Leaky abstraction demo ---
  let leakyStep = $state(0);

  const leakyExamples = [
    {
      title: 'SQL through an ORM',
      abstraction: 'user.posts  // looks like a simple property',
      leak: `// But it fires a SELECT query each time (N+1 problem)
users.forEach(u => console.log(u.posts.length));
// 1 query for users + N queries for posts = slow!
// Fix: user.posts.eager_load() to batch the query`,
    },
    {
      title: 'TCP over unreliable networks',
      abstraction: `socket.send(data)  // "reliable" delivery`,
      leak: `// But TCP can't hide network partitions forever
// After retries exhaust, your "reliable" stream
// throws: ConnectionResetError
// The network unreliability leaks through!`,
    },
    {
      title: 'Array-like API over linked list',
      abstraction: `list.get(index)  // O(1)? Looks like an array`,
      leak: `// LinkedList.get(i) is actually O(n)!
for (let i = 0; i < list.size(); i++) {
  list.get(i); // Each call traverses from head
}
// O(n^2) - the linked list nature leaks through`,
    },
  ];
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Coffee Machine: Layers of Abstraction</h2>
    <p class="max-w-lg text-slate-600">
      To the user, it's one button. Underneath, many steps happen in sequence.
    </p>
  </div>

  <!-- Coffee machine -->
  <div class="max-w-md rounded-2xl border-2 border-indigo-300 bg-gradient-to-b from-indigo-50 to-white p-6 shadow-lg">
    <div class="mb-4 text-center">
      <span class="text-sm font-bold uppercase tracking-wider text-indigo-500">Coffee Machine</span>
    </div>

    <!-- Simple interface -->
    <div class="mb-6 flex flex-col items-center gap-3">
      {#if !done}
        <button
          onclick={makeCoffee}
          disabled={brewing}
          class="rounded-xl bg-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
            {brewing ? 'animate-pulse' : ''}"
        >
          {brewing ? 'Brewing...' : 'Make Coffee'}
        </button>
      {:else}
        <div class="flex flex-col items-center gap-2">
          <span class="text-5xl drop-shadow-md">☕</span>
          <p class="text-lg font-bold text-indigo-700">Your coffee is ready!</p>
          <button
            onclick={reset}
            class="mt-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300 active:scale-95"
          >
            Make another
          </button>
        </div>
      {/if}
    </div>

    <!-- Toggle complexity -->
    <div class="mb-4 flex items-center justify-center gap-3">
      <span class="text-sm text-slate-600">Show what happens underneath</span>
      <button
        onclick={() => showComplexity = !showComplexity}
        class="relative h-6 w-11 rounded-full transition-colors {showComplexity ? 'bg-indigo-600' : 'bg-slate-300'}"
      >
        <span
          class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform {showComplexity ? 'translate-x-5' : 'translate-x-0'}"
        ></span>
      </button>
    </div>

    <!-- Hidden complexity -->
    {#if showComplexity}
      <div class="rounded-xl border border-dashed border-indigo-300 bg-indigo-50/50 p-4 transition-all">
        <p class="mb-3 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Hidden Implementation</p>
        <div class="space-y-3">
          {#each steps as step, i}
            <div class="flex items-center gap-3 transition-all duration-500
              {i <= currentStep ? 'opacity-100' : 'opacity-40'}">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300
                {i <= currentStep ? 'border-indigo-400 bg-indigo-100' : 'border-slate-200 bg-slate-50'}">
                <span class="text-lg">{step.icon}</span>
              </div>
              <div>
                <p class="text-sm font-bold {i <= currentStep ? 'text-indigo-700' : 'text-slate-500'}">{step.label}</p>
                <p class="text-xs {i <= currentStep ? 'text-slate-500' : 'text-slate-300'}">{step.detail}</p>
              </div>
              {#if i <= currentStep}
                <span class="ml-auto text-sm text-green-500">✓</span>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <div class="rounded-xl bg-indigo-50 p-5">
    <p class="text-sm text-indigo-800">
      <strong>The point:</strong> the user only needs to know "press button, get coffee."
      All the grinding, heating, brewing, and pouring is <strong>abstracted away</strong>.
    </p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
    >
      Done exploring
    </button>
  </div>

  {:else}

  <!-- ADVANCED MODE -->
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Abstraction Layers: Interactive Explorer</h2>
    <p class="max-w-2xl text-slate-600">
      Click each layer to expand it and see the <strong>public API</strong> vs. the <strong>private implementation</strong> hiding underneath.
    </p>
  </div>

  <!-- Multi-layer architecture -->
  <div class="space-y-2">
    {#each layers as layer, i}
      <div>
        <!-- Layer header (clickable) -->
        <button
          onclick={() => toggleLayer(i)}
          class="w-full rounded-lg {layer.color} px-5 py-3 text-left font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.99] flex items-center justify-between"
        >
          <span>{layer.name}</span>
          <span class="text-sm opacity-75">{layer.expanded ? 'Click to collapse' : 'Click to expand'}</span>
        </button>

        <!-- Expanded: public API vs private implementation -->
        {#if layer.expanded}
          <div class="mt-1 grid grid-cols-1 gap-3 rounded-b-lg border border-t-0 border-slate-200 bg-white p-4 md:grid-cols-2">
            <div>
              <h4 class="mb-2 text-xs font-bold uppercase tracking-wider text-green-600">Public API (what callers see)</h4>
              <pre class="overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-green-400">{layer.publicApi}</pre>
            </div>
            <div>
              <h4 class="mb-2 text-xs font-bold uppercase tracking-wider text-amber-600">Private Implementation (hidden)</h4>
              <pre class="overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-amber-400">{layer.privateImpl}</pre>
            </div>
          </div>
        {/if}

        <!-- Arrow between layers -->
        {#if i < layers.length - 1}
          <div class="flex justify-center py-1">
            <svg class="h-4 w-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <!-- Dependency Injection visualization -->
  <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-indigo-600">Dependency Injection: Swap Implementations</h3>
    <p class="mb-4 text-sm text-slate-600">
      The <code class="rounded bg-white px-1 py-0.5 text-xs font-mono text-indigo-600">OrderService</code> depends on abstractions. Click a profile to swap all concrete implementations at once.
    </p>

    <!-- Profile buttons -->
    <div class="mb-4 flex gap-2">
      {#each ['production', 'testing', 'development'] as profile}
        <button
          onclick={() => activeImpl = profile as ImplKey}
          class="rounded-lg px-4 py-2 text-sm font-bold transition-all active:scale-95
            {activeImpl === profile
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-300 hover:border-indigo-300'}"
        >
          {profile.charAt(0).toUpperCase() + profile.slice(1)}
        </button>
      {/each}
    </div>

    <!-- Current bindings -->
    <div class="rounded-lg bg-slate-800 p-4 font-mono text-sm">
      <div class="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Active Bindings</div>
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="text-slate-400">Logger:</span>
          <span class="text-green-400">{implementations[activeImpl].logger}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-slate-400">Payment:</span>
          <span class="text-green-400">{implementations[activeImpl].payment}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-slate-400">Database:</span>
          <span class="text-green-400">{implementations[activeImpl].database}</span>
        </div>
      </div>
      <div class="mt-3 border-t border-slate-700 pt-2 text-xs text-slate-500">
        // OrderService code is identical -- only the injected implementations change
      </div>
    </div>
  </div>

  <!-- TypeScript Abstract Class / Interface code -->
  <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm">
    <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">TypeScript -- Abstract Class vs Interface</div>
    <pre class="text-green-400">// Abstract class: partial implementation + contract
abstract class DataStore {'{'}
  private cache = new Map&lt;string, unknown&gt;();  // shared logic

  async get(key: string): Promise&lt;unknown&gt; {'{'}
    if (this.cache.has(key)) return this.cache.get(key);
    const val = await this.fetchFromSource(key); // abstract!
    this.cache.set(key, val);
    return val;
  {'}'}

  // Subclasses MUST implement these:
  protected abstract fetchFromSource(key: string): Promise&lt;unknown&gt;;
  protected abstract writeToSource(key: string, val: unknown): Promise&lt;void&gt;;
{'}'}

// Interface: pure contract, no implementation
interface Serializable {'{'}
  serialize(): string;
  deserialize(data: string): void;
{'}'}

// A class can extend ONE abstract class, implement MANY interfaces
class RedisStore extends DataStore implements Serializable {'{'}
  protected async fetchFromSource(key: string) {'{'}
    return await redis.get(key);
  {'}'}
  protected async writeToSource(key: string, val: unknown) {'{'}
    await redis.set(key, JSON.stringify(val));
  {'}'}
  serialize() {'{'} return JSON.stringify([...this.entries()]); {'}'}
  deserialize(data: string) {'{'} /* restore state */ {'}'}
{'}'}</pre>
  </div>

  <!-- Leaky Abstractions -->
  <div class="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
    <h3 class="mb-1 text-sm font-bold uppercase tracking-wider text-amber-700">Leaky Abstractions</h3>
    <p class="mb-4 text-sm text-slate-600">
      Sometimes implementation details <strong>surface through</strong> the abstraction. Click through real examples.
    </p>

    <!-- Navigation -->
    <div class="mb-4 flex gap-2">
      {#each leakyExamples as ex, i}
        <button
          onclick={() => leakyStep = i}
          class="rounded-lg px-3 py-1.5 text-xs font-bold transition-all active:scale-95
            {leakyStep === i
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-300 hover:border-amber-300'}"
        >
          {ex.title}
        </button>
      {/each}
    </div>

    <!-- Current example -->
    <div class="space-y-3">
      <div>
        <h4 class="mb-1 text-xs font-bold uppercase tracking-wider text-green-600">The abstraction promises:</h4>
        <pre class="overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-green-400">{leakyExamples[leakyStep].abstraction}</pre>
      </div>
      <div>
        <h4 class="mb-1 text-xs font-bold uppercase tracking-wider text-red-600">But the implementation leaks:</h4>
        <pre class="overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-red-400">{leakyExamples[leakyStep].leak}</pre>
      </div>
    </div>

    <p class="mt-3 text-xs text-slate-500">
      Joel Spolsky's Law: "All non-trivial abstractions, to some degree, are leaky."
      Good engineers understand what's behind the abstraction so they can debug when it leaks.
    </p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
    >
      Done exploring
    </button>
  </div>

  {/if}
</div>
