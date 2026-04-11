<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  interface Props {
    oncomplete?: () => void;
  }
  let { oncomplete }: Props = $props();

  let visibleLayers = $state(0);

  const boxLayers = [
    { label: 'Margin', desc: 'Space outside the border, pushing other elements away.', color: 'bg-amber-100 border-amber-300' },
    { label: 'Border', desc: 'A visible line around the element.', color: 'bg-yellow-200 border-yellow-400' },
    { label: 'Padding', desc: 'Space between the border and the content inside.', color: 'bg-emerald-100 border-emerald-300' },
    { label: 'Content', desc: 'The actual text, image, or child elements.', color: 'bg-sky-100 border-sky-300' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleLayers < boxLayers.length) {
        visibleLayers++;
      } else {
        clearInterval(interval);
      }
    }, 700);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      If HTML is the <strong>structure</strong> of a building -- the walls, floors, and rooms -- then CSS is the <strong>paint and decoration</strong>. CSS (Cascading Style Sheets) controls how things look: colors, sizes, spacing, fonts, and layout. Without CSS, every website would be plain black text on a white background.
    </p>
  </div>

  <!-- Selector / Property / Value -->
  <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-sky-600">How CSS Works</h3>
    <p class="mb-4 text-sm text-slate-600">Every CSS rule has three parts: a <strong>selector</strong> (what to style), a <strong>property</strong> (what aspect to change), and a <strong>value</strong> (what to change it to).</p>
    <div class="flex items-center justify-center gap-2 rounded-lg bg-white p-4 font-mono text-sm shadow-sm">
      <span class="rounded bg-blue-100 px-2 py-1 text-blue-700 font-bold">h1</span>
      <span class="text-slate-400">{'{'}</span>
      <span class="rounded bg-purple-100 px-2 py-1 text-purple-700">color</span>
      <span class="text-slate-400">:</span>
      <span class="rounded bg-yellow-100 px-2 py-1 text-yellow-700">red</span>
      <span class="text-slate-400">;</span>
      <span class="text-slate-400">{'}'}</span>
    </div>
    <div class="mt-3 flex justify-center gap-6 text-xs text-slate-500">
      <span><span class="inline-block h-2 w-2 rounded-full bg-blue-500"></span> Selector</span>
      <span><span class="inline-block h-2 w-2 rounded-full bg-purple-500"></span> Property</span>
      <span><span class="inline-block h-2 w-2 rounded-full bg-yellow-500"></span> Value</span>
    </div>
  </div>

  <!-- Common selectors -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Selectors: Picking What to Style</h3>
    <div class="grid gap-3 md:grid-cols-3">
      <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <code class="text-sm font-bold text-blue-600">h1</code>
        <p class="mt-1 text-xs text-slate-500">Element selector -- styles all h1 tags.</p>
      </div>
      <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <code class="text-sm font-bold text-blue-600">.card</code>
        <p class="mt-1 text-xs text-slate-500">Class selector -- styles elements with class="card".</p>
      </div>
      <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <code class="text-sm font-bold text-blue-600">#header</code>
        <p class="mt-1 text-xs text-slate-500">ID selector -- styles the single element with id="header".</p>
      </div>
    </div>
  </div>

  <!-- Common properties -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Common Properties</h3>
    <div class="grid gap-2 md:grid-cols-2">
      <div class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
        <code class="text-sm font-bold text-purple-600">color</code>
        <span class="text-sm text-slate-500">Changes text color</span>
      </div>
      <div class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
        <code class="text-sm font-bold text-purple-600">background-color</code>
        <span class="text-sm text-slate-500">Changes background color</span>
      </div>
      <div class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
        <code class="text-sm font-bold text-purple-600">font-size</code>
        <span class="text-sm text-slate-500">Changes how big text is</span>
      </div>
      <div class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
        <code class="text-sm font-bold text-purple-600">padding</code>
        <span class="text-sm text-slate-500">Adds space inside an element</span>
      </div>
      <div class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
        <code class="text-sm font-bold text-purple-600">margin</code>
        <span class="text-sm text-slate-500">Adds space outside an element</span>
      </div>
      <div class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
        <code class="text-sm font-bold text-purple-600">border</code>
        <span class="text-sm text-slate-500">Adds a border around an element</span>
      </div>
    </div>
  </div>

  <!-- Box Model Diagram -->
  <div>
    <h3 class="mb-4 text-lg font-bold text-slate-800">The Box Model</h3>
    <p class="mb-4 text-slate-600">Every element on a page is a box. The box model describes the layers around your content.</p>
    <div class="flex justify-center">
      <div class="relative flex items-center justify-center rounded-xl border-2 border-dashed border-amber-400 bg-amber-100 p-6 transition-all duration-700 {0 < visibleLayers ? 'opacity-100' : 'opacity-0'}">
        <span class="absolute top-1 left-2 text-[10px] font-bold uppercase text-amber-600">Margin</span>
        <div class="flex items-center justify-center rounded-lg border-2 border-yellow-500 bg-yellow-200 p-5 transition-all duration-700 {1 < visibleLayers ? 'opacity-100' : 'opacity-0'}">
          <span class="absolute top-8 left-8 text-[10px] font-bold uppercase text-yellow-700">Border</span>
          <div class="flex items-center justify-center rounded-md border-2 border-dashed border-emerald-400 bg-emerald-100 p-5 transition-all duration-700 {2 < visibleLayers ? 'opacity-100' : 'opacity-0'}">
            <span class="absolute top-[3.6rem] left-[3.6rem] text-[10px] font-bold uppercase text-emerald-600">Padding</span>
            <div class="flex h-16 w-28 items-center justify-center rounded bg-sky-200 text-sm font-bold text-sky-800 transition-all duration-700 {3 < visibleLayers ? 'opacity-100' : 'opacity-0'}">
              Content
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 space-y-2">
      {#each boxLayers as layer, i}
        <div class="flex items-start gap-2 transition-all duration-500 {i < visibleLayers ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
          <p class="text-sm text-slate-600"><strong>{layer.label}</strong> -- {layer.desc}</p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Colors and fonts -->
  <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-sky-600">Colors and Fonts</h3>
    <div class="grid gap-4 md:grid-cols-2">
      <div class="rounded-lg bg-white p-4 shadow-sm">
        <h4 class="mb-2 font-bold text-sky-700">Colors</h4>
        <p class="text-sm text-slate-600">
          CSS supports named colors (<code class="rounded bg-slate-100 px-1 text-sm text-sky-700">red</code>), hex codes (<code class="rounded bg-slate-100 px-1 text-sm text-sky-700">#ff0000</code>), and RGB values (<code class="rounded bg-slate-100 px-1 text-sm text-sky-700">rgb(255, 0, 0)</code>).
        </p>
      </div>
      <div class="rounded-lg bg-white p-4 shadow-sm">
        <h4 class="mb-2 font-bold text-sky-700">Fonts</h4>
        <p class="text-sm text-slate-600">
          Use <code class="rounded bg-slate-100 px-1 text-sm text-sky-700">font-family</code> to pick a typeface, <code class="rounded bg-slate-100 px-1 text-sm text-sky-700">font-size</code> for size, and <code class="rounded bg-slate-100 px-1 text-sm text-sky-700">font-weight</code> for boldness.
        </p>
      </div>
    </div>
  </div>

  <!-- Key ideas -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Key Ideas</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        CSS separates <strong>appearance</strong> from <strong>structure</strong> -- HTML says what it is, CSS says how it looks.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        Styles <strong>cascade</strong> -- more specific rules override general ones.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        The <strong>box model</strong> (margin, border, padding, content) controls spacing and size.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        You can target elements by <strong>tag name</strong>, <strong>class</strong>, or <strong>ID</strong>.
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-3 text-2xl font-bold text-slate-800">CSS Styling: Deep Dive</h2>
      <p class="text-slate-600">
        Beyond basic styling, CSS offers powerful layout systems, specificity rules, pseudo-classes, custom properties, and modern features like container queries and cascade layers.
      </p>
    </div>

    <!-- Specificity -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Specificity Hierarchy</h3>
      <p class="mb-3 text-slate-600">
        When multiple rules target the same element, <strong>specificity</strong> determines which one wins. Higher specificity overrides lower specificity.
      </p>
      <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
        <div class="space-y-2">
          <div class="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
            <span class="rounded bg-red-100 px-2 py-1 text-xs font-bold text-red-700">1-0-0-0</span>
            <code class="text-sm text-slate-700">!important</code>
            <span class="text-xs text-slate-400">(avoid if possible)</span>
          </div>
          <div class="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
            <span class="rounded bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700">0-1-0-0</span>
            <code class="text-sm text-slate-700">style=""</code>
            <span class="text-xs text-slate-400">Inline styles</span>
          </div>
          <div class="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
            <span class="rounded bg-yellow-100 px-2 py-1 text-xs font-bold text-yellow-700">0-0-1-0</span>
            <code class="text-sm text-slate-700">#id</code>
            <span class="text-xs text-slate-400">ID selectors</span>
          </div>
          <div class="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
            <span class="rounded bg-green-100 px-2 py-1 text-xs font-bold text-green-700">0-0-0-1</span>
            <code class="text-sm text-slate-700">.class, :pseudo-class, [attr]</code>
            <span class="text-xs text-slate-400">Classes, pseudo-classes, attributes</span>
          </div>
          <div class="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
            <span class="rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700">0-0-0-0</span>
            <code class="text-sm text-slate-700">element, ::pseudo-element</code>
            <span class="text-xs text-slate-400">Tag selectors</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Flexbox and Grid -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Modern Layout: Flexbox and Grid</h3>
      <p class="mb-3 text-slate-600">
        <strong>Flexbox</strong> is for one-dimensional layouts (rows or columns). <strong>CSS Grid</strong> is for two-dimensional layouts (rows and columns together). These replaced older float-based layouts.
      </p>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-lg bg-white p-4 shadow-sm border border-sky-200">
          <h4 class="mb-2 font-bold text-sky-700">Flexbox</h4>
          <div class="flex gap-2">
            <div class="flex-1 rounded bg-sky-100 p-2 text-center text-xs font-bold text-sky-700">1</div>
            <div class="flex-1 rounded bg-sky-200 p-2 text-center text-xs font-bold text-sky-700">2</div>
            <div class="flex-1 rounded bg-sky-300 p-2 text-center text-xs font-bold text-sky-700">3</div>
          </div>
          <p class="mt-2 text-xs text-slate-500">Items flow in one direction</p>
        </div>
        <div class="rounded-lg bg-white p-4 shadow-sm border border-sky-200">
          <h4 class="mb-2 font-bold text-sky-700">Grid</h4>
          <div class="grid grid-cols-3 gap-2">
            <div class="rounded bg-sky-100 p-2 text-center text-xs font-bold text-sky-700">1</div>
            <div class="rounded bg-sky-200 p-2 text-center text-xs font-bold text-sky-700">2</div>
            <div class="rounded bg-sky-300 p-2 text-center text-xs font-bold text-sky-700">3</div>
            <div class="col-span-2 rounded bg-sky-100 p-2 text-center text-xs font-bold text-sky-700">4</div>
            <div class="rounded bg-sky-200 p-2 text-center text-xs font-bold text-sky-700">5</div>
          </div>
          <p class="mt-2 text-xs text-slate-500">Items placed in a 2D grid</p>
        </div>
      </div>
    </div>

    <!-- Custom properties -->
    <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-sky-600">CSS Custom Properties (Variables)</h3>
      <p class="mb-3 text-sm text-slate-600">
        Custom properties let you define reusable values. They are declared with <code class="rounded bg-slate-100 px-1 text-sm text-sky-700">--name</code> and used with <code class="rounded bg-slate-100 px-1 text-sm text-sky-700">var(--name)</code>. They cascade and can be overridden per element.
      </p>
      <div class="rounded-lg bg-white p-3 font-mono text-sm shadow-sm">
        <div class="text-blue-600">:root</div>
        <div class="ml-4 text-purple-600">--primary: <span class="text-yellow-600">#3b82f6</span>;</div>
        <div class="ml-4 text-purple-600">--spacing: <span class="text-yellow-600">1rem</span>;</div>
        <div class="mt-2 text-blue-600">.button</div>
        <div class="ml-4 text-purple-600">background: <span class="text-yellow-600">var(--primary)</span>;</div>
        <div class="ml-4 text-purple-600">padding: <span class="text-yellow-600">var(--spacing)</span>;</div>
      </div>
    </div>

    <!-- Pseudo-classes and pseudo-elements -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Pseudo-classes and Pseudo-elements</h3>
      <div class="grid gap-3 md:grid-cols-2">
        <div class="rounded-lg bg-white p-4 shadow-sm border border-slate-200">
          <h4 class="mb-2 font-bold text-sky-700">Pseudo-classes (:)</h4>
          <ul class="space-y-1 text-sm text-slate-600">
            <li><code class="text-sky-700">:hover</code> -- when the mouse is over it</li>
            <li><code class="text-sky-700">:focus</code> -- when it is focused</li>
            <li><code class="text-sky-700">:first-child</code> -- first child element</li>
            <li><code class="text-sky-700">:nth-child(2n)</code> -- every even child</li>
          </ul>
        </div>
        <div class="rounded-lg bg-white p-4 shadow-sm border border-slate-200">
          <h4 class="mb-2 font-bold text-sky-700">Pseudo-elements (::)</h4>
          <ul class="space-y-1 text-sm text-slate-600">
            <li><code class="text-sky-700">::before</code> -- insert content before</li>
            <li><code class="text-sky-700">::after</code> -- insert content after</li>
            <li><code class="text-sky-700">::first-line</code> -- first line of text</li>
            <li><code class="text-sky-700">::placeholder</code> -- input placeholder text</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Advanced key ideas -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Advanced Key Ideas</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
          <strong>Specificity</strong> determines which conflicting rule wins. ID beats class beats element.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
          <strong>Flexbox</strong> handles one-dimensional layout; <strong>Grid</strong> handles two-dimensional layout.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
          <strong>Custom properties</strong> (CSS variables) reduce duplication and enable theming.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
          <strong>Transitions</strong> and <strong>animations</strong> let you animate property changes smoothly.
        </li>
      </ul>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95"
      >
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>
