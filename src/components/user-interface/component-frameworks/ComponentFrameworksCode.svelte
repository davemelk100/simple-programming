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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Counter Component: Three Frameworks Compared</h2>
    <p class="text-slate-600">The same simple counter component — a button that tracks how many times it has been clicked — written in React, Svelte, and Vue. Notice how each framework approaches the same problem differently.</p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">React (JSX)</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Counter.jsx</span>
<span class="kw">import</span> { <span class="var">useState</span> } <span class="kw">from</span> <span class="str">'react'</span>;

<span class="kw">function</span> <span class="fn">Counter</span>({ <span class="var">label</span> }) {
  <span class="cmt">// State: a value that triggers re-render when changed</span>
  <span class="kw">const</span> [<span class="var">count</span>, <span class="fn">setCount</span>] = <span class="fn">useState</span>(<span class="var">0</span>);

  <span class="kw">return</span> (
    &lt;<span class="kw">div</span>&gt;
      &lt;<span class="kw">p</span>&gt;{<span class="var">label</span>}: {<span class="var">count</span>}&lt;/<span class="kw">p</span>&gt;
      &lt;<span class="kw">button</span> <span class="var">onClick</span>={() =&gt; <span class="fn">setCount</span>(<span class="var">count</span> + <span class="var">1</span>)}&gt;
        Click me
      &lt;/<span class="kw">button</span>&gt;
    &lt;/<span class="kw">div</span>&gt;
  );
}

<span class="cmt">// Usage: &lt;Counter label="Clicks" /&gt;</span>`}</code></pre>
    <p class="text-sm text-slate-500">React uses <code>useState</code> for state and JSX (HTML-in-JavaScript) for templates. The <code>label</code> prop is destructured from the function argument.</p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Svelte</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- Counter.svelte --&gt;</span>
&lt;<span class="kw">script</span>&gt;
  <span class="cmt">// Props: data passed in from the parent</span>
  <span class="kw">let</span> { <span class="var">label</span> } = <span class="fn">$props</span>();

  <span class="cmt">// State: reactive variable</span>
  <span class="kw">let</span> <span class="var">count</span> = <span class="fn">$state</span>(<span class="var">0</span>);
&lt;/<span class="kw">script</span>&gt;

&lt;<span class="kw">div</span>&gt;
  &lt;<span class="kw">p</span>&gt;{<span class="var">label</span>}: {<span class="var">count</span>}&lt;/<span class="kw">p</span>&gt;
  &lt;<span class="kw">button</span> <span class="var">onclick</span>={() =&gt; <span class="var">count</span>++}&gt;
    Click me
  &lt;/<span class="kw">button</span>&gt;
&lt;/<span class="kw">div</span>&gt;

<span class="cmt">&lt;!-- Usage: &lt;Counter label="Clicks" /&gt; --&gt;</span>`}</code></pre>
    <p class="text-sm text-slate-500">Svelte uses <code>$state</code> for reactivity and plain HTML for templates. No imports needed for basic features — the compiler handles everything.</p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Vue (Single-File Component)</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- Counter.vue --&gt;</span>
&lt;<span class="kw">script</span> <span class="var">setup</span>&gt;
<span class="kw">import</span> { <span class="var">ref</span> } <span class="kw">from</span> <span class="str">'vue'</span>;

<span class="cmt">// Props: declared with defineProps</span>
<span class="kw">const</span> <span class="var">props</span> = <span class="fn">defineProps</span>([<span class="str">'label'</span>]);

<span class="cmt">// State: reactive ref</span>
<span class="kw">const</span> <span class="var">count</span> = <span class="fn">ref</span>(<span class="var">0</span>);
&lt;/<span class="kw">script</span>&gt;

&lt;<span class="kw">template</span>&gt;
  &lt;<span class="kw">div</span>&gt;
    &lt;<span class="kw">p</span>&gt;{{ <span class="var">props</span>.<span class="var">label</span> }}: {{ <span class="var">count</span> }}&lt;/<span class="kw">p</span>&gt;
    &lt;<span class="kw">button</span> @<span class="var">click</span>=<span class="str">"count++"</span>&gt;
      Click me
    &lt;/<span class="kw">button</span>&gt;
  &lt;/<span class="kw">div</span>&gt;
&lt;/<span class="kw">template</span>&gt;

<span class="cmt">&lt;!-- Usage: &lt;Counter label="Clicks" /&gt; --&gt;</span>`}</code></pre>
    <p class="text-sm text-slate-500">Vue uses <code>ref</code> for reactivity, <code>defineProps</code> for props, and separates template from script. Double curly braces for interpolation.</p>
  </div>

  <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
    <h4 class="font-bold text-slate-800 mb-2">Key Takeaway</h4>
    <p class="text-sm text-slate-600">
      All three frameworks solve the same problems — components, props, and state — with different syntax. React mixes HTML into JavaScript (JSX). Svelte puts JavaScript into HTML. Vue separates them into sections. Pick the one that fits how you think.
    </p>
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
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Advanced Patterns: Component Composition</h2>
      <p class="text-slate-600">How each framework handles composition, children/slots, and lifecycle — the patterns that matter in real apps.</p>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">React: Children & Composition</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">// Layout.jsx — accepts children via props</span>
<span class="kw">function</span> <span class="fn">Card</span>({ <span class="var">title</span>, <span class="var">children</span> }) {
  <span class="kw">return</span> (
    &lt;<span class="kw">div</span> <span class="var">className</span>=<span class="str">"card"</span>&gt;
      &lt;<span class="kw">h2</span>&gt;{<span class="var">title</span>}&lt;/<span class="kw">h2</span>&gt;
      &lt;<span class="kw">div</span>&gt;{<span class="var">children</span>}&lt;/<span class="kw">div</span>&gt;
    &lt;/<span class="kw">div</span>&gt;
  );
}

<span class="cmt">// Usage — nest anything inside</span>
&lt;<span class="fn">Card</span> <span class="var">title</span>=<span class="str">"Profile"</span>&gt;
  &lt;<span class="fn">Avatar</span> <span class="var">src</span>=<span class="str">"/me.jpg"</span> /&gt;
  &lt;<span class="kw">p</span>&gt;Hello world&lt;/<span class="kw">p</span>&gt;
&lt;/<span class="fn">Card</span>&gt;`}</code></pre>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Svelte: Snippets & Slots</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- Card.svelte — uses @render for children --&gt;</span>
&lt;<span class="kw">script</span>&gt;
  <span class="kw">let</span> { <span class="var">title</span>, <span class="var">children</span> } = <span class="fn">$props</span>();
&lt;/<span class="kw">script</span>&gt;

&lt;<span class="kw">div</span> <span class="var">class</span>=<span class="str">"card"</span>&gt;
  &lt;<span class="kw">h2</span>&gt;{<span class="var">title</span>}&lt;/<span class="kw">h2</span>&gt;
  &lt;<span class="kw">div</span>&gt;{@render <span class="fn">children</span>()}&lt;/<span class="kw">div</span>&gt;
&lt;/<span class="kw">div</span>&gt;

<span class="cmt">&lt;!-- Usage --&gt;</span>
<span class="cmt">&lt;Card title="Profile"&gt;</span>
<span class="cmt">  &lt;Avatar src="/me.jpg" /&gt;</span>
<span class="cmt">  &lt;p&gt;Hello world&lt;/p&gt;</span>
<span class="cmt">&lt;/Card&gt;</span>`}</code></pre>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Vue: Slots</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- Card.vue — uses &lt;slot&gt; for children --&gt;</span>
&lt;<span class="kw">script</span> <span class="var">setup</span>&gt;
<span class="kw">const</span> <span class="var">props</span> = <span class="fn">defineProps</span>([<span class="str">'title'</span>]);
&lt;/<span class="kw">script</span>&gt;

&lt;<span class="kw">template</span>&gt;
  &lt;<span class="kw">div</span> <span class="var">class</span>=<span class="str">"card"</span>&gt;
    &lt;<span class="kw">h2</span>&gt;{{ <span class="var">props</span>.<span class="var">title</span> }}&lt;/<span class="kw">h2</span>&gt;
    &lt;<span class="kw">div</span>&gt;&lt;<span class="kw">slot</span> /&gt;&lt;/<span class="kw">div</span>&gt;
  &lt;/<span class="kw">div</span>&gt;
&lt;/<span class="kw">template</span>&gt;

<span class="cmt">&lt;!-- Usage --&gt;</span>
<span class="cmt">&lt;Card title="Profile"&gt;</span>
<span class="cmt">  &lt;Avatar src="/me.jpg" /&gt;</span>
<span class="cmt">  &lt;p&gt;Hello world&lt;/p&gt;</span>
<span class="cmt">&lt;/Card&gt;</span>`}</code></pre>
    </div>

    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
      <h4 class="font-bold text-slate-800 mb-2">Composition Pattern</h4>
      <p class="text-sm text-slate-600">
        All three frameworks let you nest components inside other components. React uses <code>children</code> props, Svelte uses snippets and <code>@render</code>, and Vue uses <code>&lt;slot&gt;</code>. This is how you build flexible, reusable layouts — the outer component controls structure while the inner content varies.
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
