<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Responsive Design Code</h2>
    <p class="text-slate-600">Core CSS patterns for building responsive layouts: media queries, flexible grids, and the viewport meta tag.</p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">The Viewport Meta Tag</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- Required in every responsive page's &lt;head&gt; --&gt;</span>
<span class="kw">&lt;meta</span> <span class="var">name</span>=<span class="str">"viewport"</span>
      <span class="var">content</span>=<span class="str">"width=device-width, initial-scale=1"</span><span class="kw">&gt;</span>

<span class="cmt">&lt;!-- Without this tag, mobile browsers render at ~980px --&gt;</span>
<span class="cmt">&lt;!-- and zoom out, making everything tiny --&gt;</span>`}</code></pre>
    <p class="text-sm text-slate-500">This single line is the foundation of mobile-friendly design.</p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Media Queries (Mobile-First)</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">/* Base styles: mobile (default) */</span>
<span class="kw">.container</span> {
  <span class="var">display</span>: <span class="str">flex</span>;
  <span class="var">flex-direction</span>: <span class="str">column</span>;
  <span class="var">padding</span>: <span class="str">1rem</span>;
}

<span class="cmt">/* Tablet: 768px and wider */</span>
<span class="kw">@media</span> (<span class="var">min-width</span>: <span class="str">768px</span>) {
  <span class="kw">.container</span> {
    <span class="var">flex-direction</span>: <span class="str">row</span>;
    <span class="var">gap</span>: <span class="str">2rem</span>;
  }
}

<span class="cmt">/* Desktop: 1024px and wider */</span>
<span class="kw">@media</span> (<span class="var">min-width</span>: <span class="str">1024px</span>) {
  <span class="kw">.container</span> {
    <span class="var">max-width</span>: <span class="str">1200px</span>;
    <span class="var">margin</span>: <span class="str">0 auto</span>;
  }
}`}</code></pre>
    <p class="text-sm text-slate-500">Mobile-first: start with column layout, switch to row at 768px, constrain width at 1024px.</p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Responsive Flexbox Layout</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">/* Cards that wrap responsively */</span>
<span class="kw">.card-grid</span> {
  <span class="var">display</span>: <span class="str">flex</span>;
  <span class="var">flex-wrap</span>: <span class="str">wrap</span>;
  <span class="var">gap</span>: <span class="str">1rem</span>;
}

<span class="kw">.card</span> {
  <span class="var">flex</span>: <span class="str">1 1 300px</span>;  <span class="cmt">/* grow, shrink, min 300px */</span>
  <span class="var">padding</span>: <span class="str">1.5rem</span>;
  <span class="var">border-radius</span>: <span class="str">0.5rem</span>;
  <span class="var">background</span>: <span class="str">white</span>;
}

<span class="cmt">/* Cards automatically wrap when they cannot fit
   at 300px wide. No media queries needed! */</span>`}</code></pre>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Responsive CSS Grid</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">/* Auto-responsive grid: no breakpoints needed */</span>
<span class="kw">.grid</span> {
  <span class="var">display</span>: <span class="str">grid</span>;
  <span class="var">grid-template-columns</span>: <span class="str">repeat(auto-fit, minmax(250px, 1fr))</span>;
  <span class="var">gap</span>: <span class="str">1rem</span>;
}

<span class="cmt">/* Items fill available columns at 250px minimum.
   1 column on phones, 2 on tablets, 3+ on desktop. */</span>`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
    <h4 class="font-bold text-slate-800 mb-2">Key Pattern</h4>
    <p class="text-sm text-slate-600">
      Modern responsive design combines three approaches: (1) the viewport meta tag for mobile browsers, (2) media queries for layout shifts at specific widths, and (3) intrinsically flexible components with Flexbox/Grid that adapt without breakpoints.
    </p>
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
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Advanced Responsive Code</h2>
      <p class="text-slate-600">Container queries, fluid typography with clamp(), and responsive images.</p>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Container Queries</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">/* Enable container queries on a parent */</span>
<span class="kw">.card-wrapper</span> {
  <span class="var">container-type</span>: <span class="str">inline-size</span>;
  <span class="var">container-name</span>: <span class="str">card</span>;
}

<span class="cmt">/* Style children based on container width */</span>
<span class="kw">@container</span> card (<span class="var">min-width</span>: <span class="str">400px</span>) {
  <span class="kw">.card</span> {
    <span class="var">display</span>: <span class="str">grid</span>;
    <span class="var">grid-template-columns</span>: <span class="str">120px 1fr</span>;
    <span class="var">gap</span>: <span class="str">1rem</span>;
  }
}

<span class="kw">@container</span> card (<span class="var">min-width</span>: <span class="str">600px</span>) {
  <span class="kw">.card</span> {
    <span class="var">grid-template-columns</span>: <span class="str">200px 1fr auto</span>;
  }
}

<span class="cmt">/* The card adapts to WHERE it is placed,
   not just what DEVICE is being used. */</span>`}</code></pre>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Fluid Typography with clamp()</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">/* Smooth scaling: no breakpoints needed */</span>
<span class="kw">h1</span> {
  <span class="cmt">/* min: 1.5rem, preferred: 4vw, max: 3rem */</span>
  <span class="var">font-size</span>: <span class="str">clamp(1.5rem, 4vw, 3rem)</span>;
}

<span class="kw">p</span> {
  <span class="var">font-size</span>: <span class="str">clamp(0.875rem, 1.5vw, 1.125rem)</span>;
  <span class="var">line-height</span>: <span class="str">1.6</span>;
}

<span class="cmt">/* Fluid spacing too */</span>
<span class="kw">.section</span> {
  <span class="var">padding</span>: <span class="str">clamp(1rem, 5vw, 4rem)</span>;
}`}</code></pre>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Responsive Images</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- srcset: browser picks the best resolution --&gt;</span>
<span class="kw">&lt;img</span>
  <span class="var">src</span>=<span class="str">"photo-800.jpg"</span>
  <span class="var">srcset</span>=<span class="str">"photo-400.jpg 400w,
         photo-800.jpg 800w,
         photo-1200.jpg 1200w"</span>
  <span class="var">sizes</span>=<span class="str">"(max-width: 640px) 100vw,
        (max-width: 1024px) 50vw,
        33vw"</span>
  <span class="var">alt</span>=<span class="str">"A responsive photo"</span>
<span class="kw">/&gt;</span>

<span class="cmt">&lt;!-- picture: different images for different screens --&gt;</span>
<span class="kw">&lt;picture&gt;</span>
  <span class="kw">&lt;source</span> <span class="var">media</span>=<span class="str">"(min-width: 1024px)"</span>
          <span class="var">srcset</span>=<span class="str">"hero-wide.jpg"</span><span class="kw">/&gt;</span>
  <span class="kw">&lt;source</span> <span class="var">media</span>=<span class="str">"(min-width: 640px)"</span>
          <span class="var">srcset</span>=<span class="str">"hero-medium.jpg"</span><span class="kw">/&gt;</span>
  <span class="kw">&lt;img</span> <span class="var">src</span>=<span class="str">"hero-mobile.jpg"</span>
       <span class="var">alt</span>=<span class="str">"Hero image"</span><span class="kw">/&gt;</span>
<span class="kw">&lt;/picture&gt;</span>`}</code></pre>
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

<style>
  .code-block { background-color: #0f172a;
    color: #e2e8f0; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
