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
      name: 'Coffee Machine',
      icon: '☕',
      surface: 'Press button → get coffee',
      hidden: 'Grinding beans, heating water, brewing, filtering',
      desc: 'You press one button. The machine hides all the complex steps inside.',
    },
    {
      name: 'Email',
      icon: '✉️',
      surface: 'Click send → message delivered',
      hidden: 'DNS lookup, SMTP protocol, packet routing, server relay',
      desc: 'You click "Send." The system hides DNS, SMTP, routing, and delivery.',
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
      Think of driving a car. You use the <strong>steering wheel</strong> and <strong>pedals</strong> &mdash; the abstract interface &mdash; without knowing how the engine, transmission, or brakes work internally. That's <strong>abstraction</strong>: simplifying complex systems by hiding unnecessary details so you interact with a clean, simple interface.
    </p>
  </div>

  <div class="space-y-8">
      <!-- Car metaphor visual -->
      <div class="flex items-center gap-4 rounded-xl border-2 border-indigo-300 bg-indigo-50 p-5 shadow-md">
        <div class="flex flex-col items-center gap-1">
          <div class="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-200 text-2xl">🚗</div>
          <span class="text-xs font-bold text-indigo-700">Driver</span>
        </div>
        <svg class="h-6 w-8 shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <div class="flex flex-col items-center gap-1 rounded-lg border border-indigo-300 bg-white px-4 py-3 shadow-sm">
          <span class="text-xs font-semibold text-indigo-500">Abstract Interface</span>
          <span class="text-sm font-bold text-indigo-700">Steering wheel + Pedals</span>
        </div>
        <svg class="h-6 w-8 shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <div class="flex flex-col items-center gap-1 rounded-lg border border-dashed border-slate-300 bg-slate-100 px-4 py-3">
          <span class="text-xs font-semibold text-slate-500">Hidden</span>
          <span class="text-sm text-slate-500">Engine internals</span>
        </div>
      </div>

      <!-- Animated examples -->
      <div class="flex flex-col items-start gap-6">
        {#each examples as ex, i}
          <div
            class="w-full rounded-xl border p-5 transition-all duration-700
              {i <= activeExample ? 'translate-x-0 opacity-100 border-indigo-300 bg-indigo-50' : '-translate-x-8 opacity-0 border-slate-200 bg-white'}"
          >
            <div class="mb-3 flex items-center gap-3">
              <span class="text-2xl">{ex.icon}</span>
              <h3 class="text-lg font-bold text-indigo-700">{ex.name}</h3>
            </div>
            <div class="mb-2 flex items-center gap-2">
              <span class="rounded-lg bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700">{ex.surface}</span>
            </div>
            <div class="mb-2 flex items-center gap-2">
              <span class="text-xs font-semibold text-slate-500">Hidden complexity:</span>
              <span class="text-xs text-slate-500">{ex.hidden}</span>
            </div>
            <p class="text-slate-600">{ex.desc}</p>
          </div>
        {/each}
      </div>
    </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}
  <div class="space-y-8">
    <div>
      <p class="text-slate-600">
        Abstraction in OOP is formalized through <strong>abstract classes</strong> (partial implementations that can't be instantiated), <strong>interfaces</strong> (pure contracts with no implementation), the <strong>Dependency Inversion Principle</strong> (depend on abstractions, not concretions), and <strong>layers of abstraction</strong> that separate concerns in large systems.
      </p>
    </div>

    <!-- Code example -->
    <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm">
      <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">TypeScript</div>
      <pre class="text-green-400">// Abstract class - partial implementation
abstract class Shape {'{'}
  abstract area(): number;    // must be implemented
  abstract perimeter(): number;

  // Concrete method - shared by all shapes
  describe(): string {'{'}
    return `Area: ${'{'}this.area().toFixed(2){'}'}`;
  {'}'}
{'}'}

class Circle extends Shape {'{'}
  constructor(private radius: number) {'{'} super(); {'}'}
  area() {'{'} return Math.PI * this.radius ** 2; {'}'}
  perimeter() {'{'} return 2 * Math.PI * this.radius; {'}'}
{'}'}

// Interface - pure contract
interface Logger {'{'}
  info(msg: string): void;
  error(msg: string): void;
{'}'}

// Dependency Inversion - depend on abstraction
class OrderService {'{'}
  constructor(
    private logger: Logger,      // abstraction
    private payment: PaymentGateway // abstraction
  ) {'{'}{'}'}

  async placeOrder(order: Order) {'{'}
    this.logger.info("Processing order");
    await this.payment.charge(order.total);
  {'}'}
{'}'}

// Swap implementations without changing OrderService
const devService = new OrderService(
  new ConsoleLogger(),   // dev: logs to console
  new MockPayment()      // dev: fake payments
);

const prodService = new OrderService(
  new CloudLogger(),     // prod: logs to cloud
  new StripePayment()    // prod: real payments
);</pre>
    </div>

    <!-- Layers of abstraction illustration -->
    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-indigo-600">Layers of Abstraction</h3>
      <div class="space-y-2">
        <div class="rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-bold text-white">UI Components</div>
        <div class="flex justify-center"><div class="h-3 w-0.5 bg-indigo-300"></div></div>
        <div class="rounded-lg bg-indigo-500 px-4 py-2 text-center text-sm font-bold text-white">Application Services</div>
        <div class="flex justify-center"><div class="h-3 w-0.5 bg-indigo-300"></div></div>
        <div class="rounded-lg bg-indigo-400 px-4 py-2 text-center text-sm font-bold text-white">Domain Logic</div>
        <div class="flex justify-center"><div class="h-3 w-0.5 bg-indigo-300"></div></div>
        <div class="rounded-lg bg-slate-400 px-4 py-2 text-center text-sm font-bold text-white">Data Access / Infrastructure</div>
      </div>
      <p class="mt-3 text-center text-xs text-slate-500">Each layer only knows about the layer directly below it, via interfaces.</p>
    </div>

    <!-- Key concepts list -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <strong>Abstract classes</strong> provide a template with some shared logic and some methods that subclasses must implement. They cannot be instantiated directly.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <strong>Interfaces</strong> define a pure contract -- no implementation. Classes implement them, and consumers depend on the interface type, not the concrete class.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <strong>Dependency Inversion Principle</strong>: high-level modules should not depend on low-level modules. Both should depend on abstractions. This makes systems testable and swappable.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <strong>Layers of abstraction</strong> separate a system into levels (UI &rarr; Services &rarr; Domain &rarr; Infrastructure), with each layer communicating through well-defined interfaces.
        </li>
      </ul>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  @keyframes slideIn {
    0% { transform: translateX(-2rem); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
</style>
