<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);
  const cards = [
    { emoji: '\u{1F4A7}', title: 'Fluid Like Water', desc: 'Responsive design makes your layout flow and adapt to any screen size, like water taking the shape of its container.' },
    { emoji: '\u{1F4F1}', title: 'Mobile-First', desc: 'Start designing for the smallest screen, then add complexity for larger ones. This keeps your base experience clean and fast.' },
    { emoji: '\u{1F4CF}', title: 'Breakpoints', desc: 'Specific screen widths where your layout shifts. Common ones: 640px (phone), 768px (tablet), 1024px (desktop).' },
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
      <strong>Responsive design</strong> is the practice of making your web app look and work great on any screen size — from a tiny phone to a widescreen monitor. Think of water: it takes the shape of whatever container you pour it into. A responsive layout does the same thing, reshaping itself to fit the available space.
    </p>
    <p class="mt-3 text-slate-600">
      Instead of building separate versions of your site for each device, you write one set of HTML and CSS that automatically adapts. This is achieved through <strong>media queries</strong>, <strong>flexible grids</strong>, and <strong>relative units</strong>.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    {#each cards as card, i}
      <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5 text-center transition-all duration-700
        {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
    <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5 space-y-4">
      <div>
        <h4 class="font-bold text-slate-800">Media Queries</h4>
        <p class="text-sm text-slate-600">CSS rules that only apply when the screen meets certain conditions (like being wider than 768px). They are the backbone of responsive design — you use them to change layouts, font sizes, and visibility at different screen widths.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Breakpoints</h4>
        <p class="text-sm text-slate-600">The specific screen widths where your layout changes. For example, a single-column layout on phones might become two columns on tablets and three columns on desktops. Common breakpoints: 640px, 768px, 1024px, 1280px.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Mobile-First Design</h4>
        <p class="text-sm text-slate-600">Start with the mobile layout as your default, then use media queries to add complexity for larger screens. This ensures the simplest devices get a clean experience and larger screens get enhancements.</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Fluid vs Fixed Layouts</h3>
    <div class="grid gap-3 sm:grid-cols-2">
      <div class="rounded-xl border border-sky-200 bg-white p-4">
        <p class="text-sm text-slate-600"><strong>Fixed Layout:</strong> Uses pixel widths (e.g., width: 960px). The page stays the same size regardless of the screen. Content gets cut off or requires horizontal scrolling on small screens.</p>
      </div>
      <div class="rounded-xl border border-sky-200 bg-white p-4">
        <p class="text-sm text-slate-600"><strong>Fluid Layout:</strong> Uses percentages and relative units (e.g., width: 80%, max-width: 1200px). The page stretches and shrinks with the browser window, naturally adapting to the available space.</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">The Viewport Meta Tag</h3>
    <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
      <p class="text-sm text-slate-600">
        Without the viewport meta tag, mobile browsers render pages at a desktop width (typically 980px) and then zoom out to fit. Adding <code class="rounded bg-sky-100 px-1">&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code> tells the browser to match the screen's actual width. This single tag is essential for any responsive site.
      </p>
    </div>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95">
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <p class="text-slate-600">Container queries, advanced fluid typography, responsive images, and modern layout strategies.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Container Queries</h3>
      <p class="text-slate-600">
        Media queries respond to the <strong>viewport</strong> size, but <strong>container queries</strong> respond to the size of a parent element. This is a game-changer for reusable components — a card component can adapt its layout based on where it is placed, not just what device is being used.
      </p>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
          <span><strong>@container:</strong> The CSS at-rule that queries a container's size, similar to @media but scoped to a parent element.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
          <span><strong>container-type:</strong> Set to <code class="rounded bg-sky-100 px-1">inline-size</code> on the parent to enable width-based container queries.</span>
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Fluid Typography</h3>
      <p class="text-slate-600">
        Instead of jumping between fixed font sizes at breakpoints, fluid typography scales smoothly using <code class="rounded bg-sky-100 px-1">clamp()</code>. For example, <code class="rounded bg-sky-100 px-1">font-size: clamp(1rem, 2.5vw, 2rem)</code> sets a minimum of 1rem, scales with the viewport, and caps at 2rem. No media queries needed.
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Responsive Images</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">srcset & sizes</h4>
          <p class="text-sm text-slate-600">The <code class="rounded bg-sky-100 px-1">srcset</code> attribute lets you provide multiple image files at different resolutions. The browser picks the best one based on screen size and pixel density, saving bandwidth on smaller devices.</p>
        </div>
        <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">&lt;picture&gt; Element</h4>
          <p class="text-sm text-slate-600">The <code class="rounded bg-sky-100 px-1">&lt;picture&gt;</code> element lets you serve entirely different images based on media queries — for example, a cropped portrait image on mobile and a wide landscape image on desktop.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Modern Layout Strategies</h3>
      <p class="text-slate-600">
        CSS Grid and Flexbox have largely replaced the need for complex media queries. Properties like <code class="rounded bg-sky-100 px-1">grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))</code> create responsive grids without a single breakpoint. Combined with <code class="rounded bg-sky-100 px-1">gap</code>, <code class="rounded bg-sky-100 px-1">min()</code>, and <code class="rounded bg-sky-100 px-1">clamp()</code>, you can build intrinsically responsive layouts.
      </p>
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>
