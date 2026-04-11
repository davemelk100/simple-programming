<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);
  const cards = [
    { emoji: '\u{1F9F1}', title: 'Components', desc: 'Self-contained building blocks with their own HTML, CSS, and logic — like LEGO bricks for your UI.' },
    { emoji: '\u{1F4E6}', title: 'Props', desc: 'Data passed into a component from its parent, like instructions on a LEGO box telling it how to look.' },
    { emoji: '\u{1F504}', title: 'State', desc: 'Data that lives inside a component and can change over time, triggering the UI to update automatically.' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < cards.length) visibleCards++;
      else clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      Imagine building a house entirely from raw lumber, nails, and concrete versus snapping together pre-made walls, windows, and doors. <strong>Component frameworks</strong> give you the pre-made parts. Instead of writing every line of HTML, CSS, and JavaScript from scratch, you build your UI from reusable <strong>components</strong> — self-contained pieces that each handle their own appearance and behavior.
    </p>
    <p class="mt-3 text-slate-600">
      A component might be a button, a navigation bar, a search form, or an entire page section. You build small components, then combine them into bigger ones — just like snapping LEGO bricks together to create something complex.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    {#each cards as card, i}
      <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5 text-center transition-all duration-700
        {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">The Big Three Frameworks</h3>
    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5 space-y-4">
      <div>
        <h4 class="font-bold text-slate-800">React</h4>
        <p class="text-sm text-slate-600">Created by Facebook. The most popular framework. Uses JSX (JavaScript + HTML together) and a virtual DOM. Huge ecosystem of libraries and tools. Powers Instagram, Netflix, Airbnb, and countless other apps.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Svelte</h4>
        <p class="text-sm text-slate-600">A compiler-based framework that shifts work from the browser to build time. No virtual DOM — it generates efficient vanilla JavaScript. Simpler syntax that feels closer to plain HTML. This very site is built with Svelte!</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Vue</h4>
        <p class="text-sm text-slate-600">Known for its gentle learning curve and excellent documentation. Uses single-file components that group template, script, and style together. Popular in Asia and growing worldwide. Powers Alibaba, GitLab, and Nintendo's website.</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Why Use a Component Framework?</h3>
    <div class="grid gap-3 sm:grid-cols-2">
      <div class="rounded-xl border border-indigo-200 bg-white p-4">
        <p class="text-sm text-slate-600"><strong>Reusability:</strong> Build a button component once, use it everywhere. Change it in one place, it updates everywhere.</p>
      </div>
      <div class="rounded-xl border border-indigo-200 bg-white p-4">
        <p class="text-sm text-slate-600"><strong>Organization:</strong> Each component is its own file with its own logic. No more thousand-line HTML files.</p>
      </div>
      <div class="rounded-xl border border-indigo-200 bg-white p-4">
        <p class="text-sm text-slate-600"><strong>Reactivity:</strong> When data changes, the UI updates automatically. No manual DOM manipulation needed.</p>
      </div>
      <div class="rounded-xl border border-indigo-200 bg-white p-4">
        <p class="text-sm text-slate-600"><strong>Ecosystem:</strong> Routing, state management, testing tools, and thousands of pre-built component libraries.</p>
      </div>
    </div>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Component Frameworks (Advanced)</h2>
      <p class="text-slate-600">Deeper patterns: component lifecycle, reactivity models, server-side rendering, and architecture decisions.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Component Lifecycle</h3>
      <p class="text-slate-600">
        Every component goes through a <strong>lifecycle</strong>: it is created (mounted), it updates when data changes, and eventually it is destroyed (unmounted). Frameworks provide hooks to run code at each stage:
      </p>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Mount:</strong> Component appears in the DOM. Fetch data, set up event listeners, start animations.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Update:</strong> Props or state change. The framework re-renders only what changed (diffing).</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Unmount:</strong> Component is removed. Clean up timers, event listeners, and subscriptions to prevent memory leaks.</span>
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Reactivity Models</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Virtual DOM (React)</h4>
          <p class="text-sm text-slate-600">Keeps an in-memory copy of the DOM. On state change, it diffs the virtual tree against the real DOM and applies minimal updates. Predictable but has overhead from diffing.</p>
        </div>
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Compiler-Based (Svelte)</h4>
          <p class="text-sm text-slate-600">Analyzes your code at build time and generates precise DOM update instructions. No runtime diffing needed. Smaller bundle sizes and faster updates at the cost of larger compiled output per component.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Server-Side Rendering (SSR)</h3>
      <p class="text-slate-600">
        Modern meta-frameworks like <strong>Next.js</strong> (React), <strong>SvelteKit</strong> (Svelte), and <strong>Nuxt</strong> (Vue) render components on the server first, sending fully-formed HTML to the browser. This improves initial load time and SEO. The page then <strong>hydrates</strong> — JavaScript takes over to make it interactive. Newer approaches like React Server Components and partial hydration further optimize what runs where.
      </p>
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>
