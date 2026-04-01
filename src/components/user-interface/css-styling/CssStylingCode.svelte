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
</script>

{#if !advanced}
<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">CSS Styling in Code</h2>
    <p class="text-sm text-slate-600">Here is how CSS styles are written, from basic selectors and properties to common layout and visual patterns.</p>
  </div>

  <!-- Basic selectors and properties -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">What it does</h3>
      <div class="rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm text-slate-600 space-y-2">
        <p>CSS rules start with a <strong>selector</strong> that picks which elements to style. Inside the curly braces, you write <strong>property: value</strong> pairs.</p>
        <p>Element selectors target tags directly. Class selectors use a dot, ID selectors use a hash.</p>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">/* Element selector */</span>
<span class="var">h1</span> {
  <span class="kw">color</span>: <span class="str">navy</span>;
  <span class="kw">font-size</span>: <span class="str">2rem</span>;
}

<span class="cmt">/* Class selector */</span>
<span class="var">.card</span> {
  <span class="kw">background-color</span>: <span class="str">white</span>;
  <span class="kw">border</span>: <span class="str">1px solid #ddd</span>;
  <span class="kw">border-radius</span>: <span class="str">8px</span>;
  <span class="kw">padding</span>: <span class="str">16px</span>;
}

<span class="cmt">/* ID selector */</span>
<span class="var">#header</span> {
  <span class="kw">background-color</span>: <span class="str">#1e293b</span>;
  <span class="kw">color</span>: <span class="str">white</span>;
}`}</code></pre>
    </div>
  </div>

  <!-- Box model -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Box model properties</p>
    <pre class="code-block"><code>{@html `<span class="var">.box</span> {
  <span class="cmt">/* Content size */</span>
  <span class="kw">width</span>: <span class="str">300px</span>;
  <span class="kw">height</span>: <span class="str">200px</span>;

  <span class="cmt">/* Space inside the border */</span>
  <span class="kw">padding</span>: <span class="str">20px</span>;

  <span class="cmt">/* The border itself */</span>
  <span class="kw">border</span>: <span class="str">2px solid #3b82f6</span>;

  <span class="cmt">/* Space outside the border */</span>
  <span class="kw">margin</span>: <span class="str">16px</span>;
}`}</code></pre>
  </div>

  <!-- Colors and typography -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Colors and typography</p>
    <pre class="code-block"><code>{@html `<span class="var">body</span> {
  <span class="cmt">/* Font family with fallbacks */</span>
  <span class="kw">font-family</span>: <span class="str">"Inter", Arial, sans-serif</span>;
  <span class="kw">font-size</span>: <span class="str">16px</span>;
  <span class="kw">line-height</span>: <span class="str">1.5</span>;
  <span class="kw">color</span>: <span class="str">#334155</span>;
}

<span class="var">a</span> {
  <span class="cmt">/* Named color */</span>
  <span class="kw">color</span>: <span class="str">royalblue</span>;
  <span class="kw">text-decoration</span>: <span class="str">none</span>;
}

<span class="var">a:hover</span> {
  <span class="cmt">/* RGB color */</span>
  <span class="kw">color</span>: <span class="str">rgb(59, 130, 246)</span>;
  <span class="kw">text-decoration</span>: <span class="str">underline</span>;
}`}</code></pre>
  </div>

  <!-- Backgrounds and shadows -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Backgrounds and shadows</p>
    <pre class="code-block"><code>{@html `<span class="var">.hero</span> {
  <span class="kw">background-color</span>: <span class="str">#0f172a</span>;
  <span class="kw">background-image</span>: <span class="str">url("bg.jpg")</span>;
  <span class="kw">background-size</span>: <span class="str">cover</span>;
  <span class="kw">background-position</span>: <span class="str">center</span>;
}

<span class="var">.card</span> {
  <span class="cmt">/* Box shadow: x y blur spread color */</span>
  <span class="kw">box-shadow</span>: <span class="str">0 4px 12px rgba(0, 0, 0, 0.1)</span>;
}`}</code></pre>
  </div>

  <!-- Quick reference -->
  <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-sky-600">Quick Reference</h3>
    <div class="grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-sky-700">color</code> - <span class="text-slate-600">Text color</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-sky-700">background</code> - <span class="text-slate-600">Background</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-sky-700">font-size</code> - <span class="text-slate-600">Text size</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-sky-700">padding</code> - <span class="text-slate-600">Inner space</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-sky-700">margin</code> - <span class="text-slate-600">Outer space</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-sky-700">border</code> - <span class="text-slate-600">Border line</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-sky-700">border-radius</code> - <span class="text-slate-600">Rounded corners</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-sky-700">box-shadow</code> - <span class="text-slate-600">Drop shadow</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-sky-700">display</code> - <span class="text-slate-600">Layout mode</span></div>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95">
      I've read this
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">CSS Styling in Code (Advanced)</h2>
    <p class="text-sm text-slate-600">Flexbox layout, CSS Grid, custom properties, transitions, animations, and modern selectors.</p>
  </div>

  <!-- Flexbox layout -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Flexbox layout</p>
    <pre class="code-block"><code>{@html `<span class="cmt">/* Flex container */</span>
<span class="var">.navbar</span> {
  <span class="kw">display</span>: <span class="str">flex</span>;
  <span class="kw">justify-content</span>: <span class="str">space-between</span>;
  <span class="kw">align-items</span>: <span class="str">center</span>;
  <span class="kw">gap</span>: <span class="str">1rem</span>;
  <span class="kw">padding</span>: <span class="str">0 2rem</span>;
  <span class="kw">height</span>: <span class="str">64px</span>;
}

<span class="cmt">/* Flex children */</span>
<span class="var">.navbar .logo</span> {
  <span class="kw">flex-shrink</span>: <span class="str">0</span>;       <span class="cmt">/* don't shrink */</span>
}

<span class="var">.navbar .links</span> {
  <span class="kw">display</span>: <span class="str">flex</span>;
  <span class="kw">gap</span>: <span class="str">1.5rem</span>;
}

<span class="var">.navbar .spacer</span> {
  <span class="kw">flex</span>: <span class="str">1</span>;              <span class="cmt">/* take remaining space */</span>
}`}</code></pre>
  </div>

  <!-- CSS Grid -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">CSS Grid layout</p>
    <pre class="code-block"><code>{@html `<span class="cmt">/* Two-dimensional grid */</span>
<span class="var">.dashboard</span> {
  <span class="kw">display</span>: <span class="str">grid</span>;
  <span class="kw">grid-template-columns</span>: <span class="str">250px 1fr</span>;
  <span class="kw">grid-template-rows</span>: <span class="str">64px 1fr auto</span>;
  <span class="kw">grid-template-areas</span>:
    <span class="str">"sidebar header"</span>
    <span class="str">"sidebar main"</span>
    <span class="str">"sidebar footer"</span>;
  <span class="kw">min-height</span>: <span class="str">100vh</span>;
}

<span class="var">.sidebar</span> { <span class="kw">grid-area</span>: <span class="str">sidebar</span>; }
<span class="var">.header</span>  { <span class="kw">grid-area</span>: <span class="str">header</span>; }
<span class="var">.main</span>    { <span class="kw">grid-area</span>: <span class="str">main</span>; }
<span class="var">.footer</span>  { <span class="kw">grid-area</span>: <span class="str">footer</span>; }

<span class="cmt">/* Responsive card grid */</span>
<span class="var">.card-grid</span> {
  <span class="kw">display</span>: <span class="str">grid</span>;
  <span class="kw">grid-template-columns</span>: <span class="str">repeat(auto-fill, minmax(280px, 1fr))</span>;
  <span class="kw">gap</span>: <span class="str">1.5rem</span>;
}`}</code></pre>
  </div>

  <!-- Custom properties -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">CSS custom properties (variables)</p>
    <pre class="code-block"><code>{@html `<span class="cmt">/* Define variables on :root */</span>
<span class="var">:root</span> {
  <span class="kw">--color-primary</span>: <span class="str">#3b82f6</span>;
  <span class="kw">--color-primary-dark</span>: <span class="str">#1d4ed8</span>;
  <span class="kw">--radius</span>: <span class="str">0.5rem</span>;
  <span class="kw">--shadow</span>: <span class="str">0 4px 12px rgba(0, 0, 0, 0.1)</span>;
}

<span class="cmt">/* Use variables with var() */</span>
<span class="var">.button</span> {
  <span class="kw">background</span>: <span class="str">var(--color-primary)</span>;
  <span class="kw">border-radius</span>: <span class="str">var(--radius)</span>;
  <span class="kw">box-shadow</span>: <span class="str">var(--shadow)</span>;
}

<span class="var">.button:hover</span> {
  <span class="kw">background</span>: <span class="str">var(--color-primary-dark)</span>;
}

<span class="cmt">/* Override per element */</span>
<span class="var">.button.danger</span> {
  <span class="kw">--color-primary</span>: <span class="str">#ef4444</span>;
  <span class="kw">--color-primary-dark</span>: <span class="str">#dc2626</span>;
}`}</code></pre>
  </div>

  <!-- Transitions -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Transitions</p>
    <pre class="code-block"><code>{@html `<span class="cmt">/* Smooth property changes */</span>
<span class="var">.card</span> {
  <span class="kw">transform</span>: <span class="str">translateY(0)</span>;
  <span class="kw">box-shadow</span>: <span class="str">0 2px 8px rgba(0, 0, 0, 0.08)</span>;
  <span class="kw">transition</span>: <span class="str">transform 0.2s ease, box-shadow 0.2s ease</span>;
}

<span class="var">.card:hover</span> {
  <span class="kw">transform</span>: <span class="str">translateY(-4px)</span>;
  <span class="kw">box-shadow</span>: <span class="str">0 8px 24px rgba(0, 0, 0, 0.15)</span>;
}`}</code></pre>
  </div>

  <!-- Keyframe animations -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Keyframe animations</p>
    <pre class="code-block"><code>{@html `<span class="cmt">/* Define the animation */</span>
<span class="var">@keyframes fadeInUp</span> {
  <span class="var">from</span> {
    <span class="kw">opacity</span>: <span class="str">0</span>;
    <span class="kw">transform</span>: <span class="str">translateY(20px)</span>;
  }
  <span class="var">to</span> {
    <span class="kw">opacity</span>: <span class="str">1</span>;
    <span class="kw">transform</span>: <span class="str">translateY(0)</span>;
  }
}

<span class="cmt">/* Apply the animation */</span>
<span class="var">.hero-title</span> {
  <span class="kw">animation</span>: <span class="str">fadeInUp 0.6s ease-out forwards</span>;
}

<span class="cmt">/* Spinning loader */</span>
<span class="var">@keyframes spin</span> {
  <span class="var">to</span> { <span class="kw">transform</span>: <span class="str">rotate(360deg)</span>; }
}

<span class="var">.spinner</span> {
  <span class="kw">width</span>: <span class="str">24px</span>;
  <span class="kw">height</span>: <span class="str">24px</span>;
  <span class="kw">border</span>: <span class="str">3px solid #e2e8f0</span>;
  <span class="kw">border-top-color</span>: <span class="str">#3b82f6</span>;
  <span class="kw">border-radius</span>: <span class="str">50%</span>;
  <span class="kw">animation</span>: <span class="str">spin 0.8s linear infinite</span>;
}`}</code></pre>
  </div>

  <!-- Modern selectors -->
  <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-sky-600">Advanced CSS Patterns</h3>
    <ul class="space-y-2 text-sm text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        <strong>Custom properties</strong> enable theming and reduce repetition across your stylesheet.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        <strong>Flexbox</strong> handles one-dimensional flow; <strong>Grid</strong> handles two-dimensional layouts with named areas.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        <strong>Transitions</strong> animate property changes on state change; <strong>@keyframes</strong> define multi-step animations.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        Use <strong>auto-fill</strong> and <strong>minmax()</strong> in Grid for responsive layouts without media queries.
      </li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95">
      I've read this
    </button>
  </div>
</div>

{/if}

<style>
  .code-block {
    background-color: #0f172a;
    border: 1px solid #334155;
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    font-size: 0.875rem;
    line-height: 1.7;
    overflow-x: auto;
  }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
