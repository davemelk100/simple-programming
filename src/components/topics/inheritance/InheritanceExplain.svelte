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
      parent: 'Animal',
      children: ['Dog', 'Cat'],
      methods: ['speak()', 'move()'],
      desc: 'Dog and Cat inherit speak() and move() from Animal, but each makes a different sound.',
    },
    {
      parent: 'Vehicle',
      children: ['Car', 'Bicycle'],
      methods: ['wheels', 'speed'],
      desc: 'Car and Bicycle both have wheels and speed, but with different values.',
    },
  ];

  let activeExample = $state(-1);

  onMount(() => {
    let i = 0;
    const interval = setInterval(() => {
      activeExample = i;
      i++;
      if (i >= examples.length) clearInterval(interval);
    }, 1400);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      Think of a <strong>family tree</strong>. Children inherit traits from their parents &mdash; eye color, height, abilities. In programming, <strong>inheritance</strong> lets you build new things from existing ones. Instead of rewriting everything from scratch, a child class gets all the parent's abilities for free &mdash; and can add its own on top!
    </p>
  </div>

  <div class="flex flex-col items-start gap-8">
      {#each examples as ex, i}
        <div
          class="w-full transition-all duration-700
            {i <= activeExample ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}"
        >
          <!-- Parent -->
          <div class="flex flex-col items-center">
            <div class="flex h-16 w-40 items-center justify-center rounded-xl border-2 border-purple-400 bg-purple-100 shadow-md
              {i === activeExample ? 'animate-pop' : ''}">
              <div class="text-center">
                <span class="text-xs text-purple-500">parent</span>
                <div class="text-sm font-bold text-purple-700">{ex.parent}</div>
              </div>
            </div>

            <!-- Connector lines -->
            <div class="flex items-start">
              <div class="h-6 w-0.5 bg-purple-300"></div>
            </div>
            <div class="flex items-center gap-16">
              {#each ex.children as _, ci}
                <div class="h-0.5 w-12 bg-purple-300"></div>
                {#if ci < ex.children.length - 1}
                  <div class="h-0.5 w-8 bg-purple-300"></div>
                {/if}
              {/each}
            </div>

            <!-- Children -->
            <div class="mt-1 flex gap-6">
              {#each ex.children as child}
                <div class="flex flex-col items-center gap-1">
                  <div class="h-4 w-0.5 bg-purple-300"></div>
                  <div class="flex h-14 w-28 items-center justify-center rounded-lg border-2 border-purple-300 bg-purple-50 shadow-sm
                    {i === activeExample ? 'animate-bounce-subtle' : ''}">
                    <div class="text-center">
                      <span class="text-xs text-purple-400">child</span>
                      <div class="text-sm font-bold text-purple-600">{child}</div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>

            <!-- Inherited methods -->
            <div class="mt-2 flex flex-wrap justify-center gap-2">
              {#each ex.methods as method}
                <span class="rounded-full bg-purple-200 px-3 py-0.5 text-xs font-medium text-purple-700">{method}</span>
              {/each}
              <span class="text-xs text-purple-400 self-center">inherited</span>
            </div>
          </div>

          {#if i <= activeExample}
            <p class="mt-3 text-slate-500">{ex.desc}</p>
          {/if}
        </div>
      {/each}
    </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}
  <div class="space-y-8">
    <div>
      <p class="text-slate-600">
        Inheritance enables code reuse through <strong>method overriding</strong>, <strong>super calls</strong> to parent implementations, and JavaScript's <strong>prototype chain</strong>. However, deep inheritance hierarchies become brittle -- the industry often prefers <strong>composition over inheritance</strong> for greater flexibility.
      </p>
    </div>

    <!-- Code example -->
    <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm">
      <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">TypeScript</div>
      <pre class="text-green-400">class Animal {'{'}
  constructor(protected name: string) {'{'}{'}'}

  speak(): string {'{'}
    return `${'{'}this.name{'}'} makes a sound`;
  {'}'}
{'}'}

class Dog extends Animal {'{'}
  constructor(name: string, private breed: string) {'{'}
    super(name); // call parent constructor
  {'}'}

  // Method overriding
  speak(): string {'{'}
    return `${'{'}this.name{'}'} barks!`;
  {'}'}

  // New method
  fetch(): string {'{'}
    return `${'{'}this.name{'}'} fetches the ball`;
  {'}'}
{'}'}

// Prototype chain:
// dog -&gt; Dog.prototype -&gt; Animal.prototype -&gt; Object.prototype

// Composition over inheritance
interface CanSwim {'{'} swim(): void; {'}'}
interface CanFly  {'{'} fly(): void;  {'}'}

// Instead of complex inheritance trees:
class Duck implements CanSwim, CanFly {'{'}
  swim() {'{'} console.log("Swimming"); {'}'}
  fly()  {'{'} console.log("Flying");   {'}'}
{'}'}

// Or use mixins for reusable behaviors
type Constructor = new (...args: any[]) =&gt; {'{'} {'}'};

function Timestamped&lt;T extends Constructor&gt;(Base: T) {'{'}
  return class extends Base {'{'}
    createdAt = new Date();
  {'}'};
{'}'}</pre>
    </div>

    <!-- Composition vs Inheritance illustration -->
    <div class="grid grid-cols-2 gap-4">
      <div class="rounded-xl border-2 border-red-200 bg-red-50 p-4">
        <h4 class="mb-2 text-sm font-bold text-red-700">Deep Inheritance (fragile)</h4>
        <div class="space-y-1 text-xs text-slate-600">
          <div class="ml-0">Animal</div>
          <div class="ml-4">&rarr; Mammal</div>
          <div class="ml-8">&rarr; Pet</div>
          <div class="ml-12">&rarr; Dog</div>
        </div>
        <p class="mt-2 text-xs text-red-600">Changing Animal breaks everything below</p>
      </div>
      <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
        <h4 class="mb-2 text-sm font-bold text-green-700">Composition (flexible)</h4>
        <div class="space-y-1 text-xs text-slate-600">
          <div>Dog = Animal</div>
          <div class="ml-4">+ CanBark</div>
          <div class="ml-4">+ CanFetch</div>
          <div class="ml-4">+ IsPet</div>
        </div>
        <p class="mt-2 text-xs text-green-600">Mix and match behaviors freely</p>
      </div>
    </div>

    <!-- Key concepts list -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <strong>Method overriding</strong> lets subclasses replace parent behavior. Use <code class="text-sm">super.method()</code> to call the parent's version when extending rather than replacing.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <strong>Prototype chain</strong>: when you access a property, JS walks up the chain (instance &rarr; class &rarr; parent &rarr; Object). This is how inheritance actually works under the hood.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <strong>Liskov Substitution Principle</strong>: a subclass should be usable anywhere its parent is expected without breaking behavior.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <strong>Composition over inheritance</strong>: prefer composing objects from small, focused interfaces/mixins rather than building deep class hierarchies.
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

<style>
  @keyframes popIn {
    0% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
  .animate-pop {
    animation: popIn 0.4s ease-out;
  }
  .animate-bounce-subtle {
    animation: popIn 0.3s ease-out;
  }
</style>
