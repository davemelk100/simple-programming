<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });
</script>

{#if !advanced}
<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Classes & Objects in Code</h2>
    <p class="text-sm text-slate-600">Here's how the blueprints and objects from the visual map to real JavaScript code.</p>
  </div>

  <!-- Blueprint → class definition -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual</h3>
      <div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div class="flex flex-col items-center gap-1">
          <span class="text-[10px] font-semibold uppercase text-blue-500">Blueprint</span>
          <div class="w-full rounded-xl border-2 border-dashed border-blue-400 bg-white p-3 text-center">
            <span class="text-sm font-bold text-blue-700">Dog</span>
            <div class="mt-1 text-xs text-blue-600">&#8226; name &nbsp; &#8226; breed</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="keyword">class</span> <span class="variable">Dog</span> {
  <span class="keyword">constructor</span>(<span class="variable">name</span>, <span class="variable">breed</span>) {
    <span class="keyword">this</span>.<span class="variable">name</span> <span class="punctuation">=</span> <span class="variable">name</span>;
    <span class="keyword">this</span>.<span class="variable">breed</span> <span class="punctuation">=</span> <span class="variable">breed</span>;
  }
}`}</code></pre>
    </div>
  </div>

  <!-- Object cards → new ClassName() -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual</h3>
      <div class="flex gap-2 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div class="w-32 rounded-xl border-2 border-blue-300 bg-blue-100 p-2">
          <span class="text-[10px] font-semibold text-blue-500">Object 1</span>
          <div class="text-xs text-blue-800"><span class="font-semibold">name:</span> Buddy</div>
          <div class="text-xs text-blue-800"><span class="font-semibold">breed:</span> Lab</div>
        </div>
        <div class="w-32 rounded-xl border-2 border-blue-300 bg-blue-100 p-2">
          <span class="text-[10px] font-semibold text-blue-500">Object 2</span>
          <div class="text-xs text-blue-800"><span class="font-semibold">name:</span> Max</div>
          <div class="text-xs text-blue-800"><span class="font-semibold">breed:</span> Poodle</div>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="keyword">let</span> <span class="variable">dog1</span> <span class="punctuation">=</span> <span class="keyword">new</span> <span class="variable">Dog</span>(<span class="string">"Buddy"</span>, <span class="string">"Lab"</span>);
<span class="keyword">let</span> <span class="variable">dog2</span> <span class="punctuation">=</span> <span class="keyword">new</span> <span class="variable">Dog</span>(<span class="string">"Max"</span>, <span class="string">"Poodle"</span>);`}</code></pre>
    </div>
  </div>

  <!-- Reading properties → dot notation -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual</h3>
      <div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div class="flex items-center gap-2">
          <div class="rounded-xl border-2 border-blue-300 bg-blue-100 px-3 py-2">
            <span class="text-xs font-bold text-blue-700">dog1</span>
          </div>
          <span class="text-blue-400">.</span>
          <div class="rounded bg-blue-200 px-2 py-1 text-xs font-semibold text-blue-800">name</div>
          <span class="text-blue-400">=</span>
          <span class="rounded bg-white px-2 py-1 text-xs font-bold text-blue-700 shadow-sm">"Buddy"</span>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="variable">dog1</span>.<span class="variable">name</span>;   <span class="comment">// → "Buddy"</span>
<span class="variable">dog1</span>.<span class="variable">breed</span>;  <span class="comment">// → "Lab"</span>
<span class="variable">dog2</span>.<span class="variable">name</span>;   <span class="comment">// → "Max"</span>`}</code></pre>
    </div>
  </div>

  <!-- Full example -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Putting it all together</p>
    <pre class="code-block"><code>{@html `<span class="comment">// 1. Define the blueprint</span>
<span class="keyword">class</span> <span class="variable">Dog</span> {
  <span class="keyword">constructor</span>(<span class="variable">name</span>, <span class="variable">breed</span>) {
    <span class="keyword">this</span>.<span class="variable">name</span> <span class="punctuation">=</span> <span class="variable">name</span>;
    <span class="keyword">this</span>.<span class="variable">breed</span> <span class="punctuation">=</span> <span class="variable">breed</span>;
  }
}

<span class="comment">// 2. Create objects from the blueprint</span>
<span class="keyword">let</span> <span class="variable">dog1</span> <span class="punctuation">=</span> <span class="keyword">new</span> <span class="variable">Dog</span>(<span class="string">"Buddy"</span>, <span class="string">"Lab"</span>);
<span class="keyword">let</span> <span class="variable">dog2</span> <span class="punctuation">=</span> <span class="keyword">new</span> <span class="variable">Dog</span>(<span class="string">"Max"</span>, <span class="string">"Poodle"</span>);

<span class="comment">// 3. Access properties with dot notation</span>
<span class="variable">dog1</span>.<span class="variable">name</span>;   <span class="comment">// → "Buddy"</span>
<span class="variable">dog2</span>.<span class="variable">breed</span>;  <span class="comment">// → "Poodle"</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Classes in Code (Advanced)</h2>
    <p class="text-sm text-slate-600">TypeScript classes with constructors, static members, getters/setters, and abstract patterns.</p>
  </div>

  <!-- Full TypeScript class with constructor, properties, methods -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Typed class with constructor &amp; methods</p>
    <pre class="code-block"><code>{@html `<span class="kw">class</span> <span class="var">User</span> {
  <span class="kw">private</span> <span class="var">name</span>: <span class="var">string</span>;
  <span class="kw">private</span> <span class="var">age</span>: <span class="num">number</span>;

  <span class="fn">constructor</span>(<span class="arg">name</span>: <span class="var">string</span>, <span class="arg">age</span>: <span class="num">number</span>) {
    <span class="kw">this</span>.<span class="var">name</span> <span class="op">=</span> <span class="arg">name</span>;
    <span class="kw">this</span>.<span class="var">age</span> <span class="op">=</span> <span class="arg">age</span>;
  }

  <span class="fn">greet</span>(): <span class="var">string</span> {
    <span class="kw">return</span> <span class="str">\`Hello, I'm \${<span class="kw">this</span>.<span class="var">name</span>}\`</span>;
  }

  <span class="fn">isAdult</span>(): <span class="var">boolean</span> {
    <span class="kw">return</span> <span class="kw">this</span>.<span class="var">age</span> <span class="op">>=</span> <span class="num">18</span>;
  }
}

<span class="kw">const</span> <span class="var">u</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">User</span>(<span class="str">"Alice"</span>, <span class="num">30</span>);
<span class="var">u</span>.<span class="fn">greet</span>();   <span class="cmt">// → "Hello, I'm Alice"</span>
<span class="var">u</span>.<span class="fn">isAdult</span>(); <span class="cmt">// → true</span>`}</code></pre>
  </div>

  <!-- Static members and class-level state -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Static members &amp; class-level state</p>
    <pre class="code-block"><code>{@html `<span class="kw">class</span> <span class="var">Counter</span> {
  <span class="kw">static</span> <span class="var">total</span> <span class="op">=</span> <span class="num">0</span>;           <span class="cmt">// shared across all instances</span>
  <span class="kw">private</span> <span class="var">count</span> <span class="op">=</span> <span class="num">0</span>;          <span class="cmt">// per-instance state</span>

  <span class="fn">increment</span>(): <span class="var">void</span> {
    <span class="kw">this</span>.<span class="var">count</span><span class="op">++</span>;
    <span class="var">Counter</span>.<span class="var">total</span><span class="op">++</span>;           <span class="cmt">// update class-level counter</span>
  }

  <span class="kw">static</span> <span class="fn">getTotal</span>(): <span class="num">number</span> {
    <span class="kw">return</span> <span class="var">Counter</span>.<span class="var">total</span>;
  }

  <span class="kw">static</span> <span class="fn">resetAll</span>(): <span class="var">void</span> {
    <span class="var">Counter</span>.<span class="var">total</span> <span class="op">=</span> <span class="num">0</span>;
  }
}

<span class="kw">const</span> <span class="var">a</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">Counter</span>();
<span class="kw">const</span> <span class="var">b</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">Counter</span>();
<span class="var">a</span>.<span class="fn">increment</span>();
<span class="var">b</span>.<span class="fn">increment</span>();
<span class="var">Counter</span>.<span class="fn">getTotal</span>(); <span class="cmt">// → 2</span>`}</code></pre>
  </div>

  <!-- Getters, setters, and computed properties -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Getters, setters &amp; computed properties</p>
    <pre class="code-block"><code>{@html `<span class="kw">class</span> <span class="var">Temperature</span> {
  <span class="kw">private</span> <span class="var">_celsius</span>: <span class="num">number</span>;

  <span class="fn">constructor</span>(<span class="arg">celsius</span>: <span class="num">number</span>) {
    <span class="kw">this</span>.<span class="var">_celsius</span> <span class="op">=</span> <span class="arg">celsius</span>;
  }

  <span class="cmt">// Getter: computed property (read)</span>
  <span class="kw">get</span> <span class="fn">fahrenheit</span>(): <span class="num">number</span> {
    <span class="kw">return</span> <span class="kw">this</span>.<span class="var">_celsius</span> <span class="op">*</span> <span class="num">9</span> <span class="op">/</span> <span class="num">5</span> <span class="op">+</span> <span class="num">32</span>;
  }

  <span class="cmt">// Setter: validates on write</span>
  <span class="kw">set</span> <span class="fn">celsius</span>(<span class="arg">value</span>: <span class="num">number</span>) {
    <span class="kw">if</span> (<span class="arg">value</span> <span class="op">&lt;</span> <span class="op">-</span><span class="num">273.15</span>) <span class="kw">throw</span> <span class="kw">new</span> <span class="fn">Error</span>(<span class="str">"Below absolute zero"</span>);
    <span class="kw">this</span>.<span class="var">_celsius</span> <span class="op">=</span> <span class="arg">value</span>;
  }

  <span class="kw">get</span> <span class="fn">celsius</span>(): <span class="num">number</span> {
    <span class="kw">return</span> <span class="kw">this</span>.<span class="var">_celsius</span>;
  }
}

<span class="kw">const</span> <span class="var">t</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">Temperature</span>(<span class="num">100</span>);
<span class="var">t</span>.<span class="var">fahrenheit</span>;  <span class="cmt">// → 212 (computed on access)</span>
<span class="var">t</span>.<span class="var">celsius</span> <span class="op">=</span> <span class="num">0</span>;
<span class="var">t</span>.<span class="var">fahrenheit</span>;  <span class="cmt">// → 32  (recomputed)</span>`}</code></pre>
  </div>

  <!-- Abstract classes and implementation patterns -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Abstract classes &amp; implementation</p>
    <pre class="code-block"><code>{@html `<span class="kw">abstract class</span> <span class="var">Shape</span> {
  <span class="kw">abstract</span> <span class="fn">area</span>(): <span class="num">number</span>;      <span class="cmt">// subclasses must implement</span>
  <span class="kw">abstract</span> <span class="fn">perimeter</span>(): <span class="num">number</span>;

  <span class="cmt">// Concrete method shared by all shapes</span>
  <span class="fn">describe</span>(): <span class="var">string</span> {
    <span class="kw">return</span> <span class="str">\`Area: \${<span class="kw">this</span>.<span class="fn">area</span>()}, Perimeter: \${<span class="kw">this</span>.<span class="fn">perimeter</span>()}\`</span>;
  }
}

<span class="kw">class</span> <span class="var">Circle</span> <span class="kw">extends</span> <span class="var">Shape</span> {
  <span class="fn">constructor</span>(<span class="kw">private</span> <span class="arg">radius</span>: <span class="num">number</span>) {
    <span class="kw">super</span>();
  }

  <span class="fn">area</span>(): <span class="num">number</span> {
    <span class="kw">return</span> <span class="var">Math</span>.<span class="var">PI</span> <span class="op">*</span> <span class="kw">this</span>.<span class="var">radius</span> <span class="op">**</span> <span class="num">2</span>;
  }

  <span class="fn">perimeter</span>(): <span class="num">number</span> {
    <span class="kw">return</span> <span class="num">2</span> <span class="op">*</span> <span class="var">Math</span>.<span class="var">PI</span> <span class="op">*</span> <span class="kw">this</span>.<span class="var">radius</span>;
  }
}

<span class="kw">class</span> <span class="var">Rect</span> <span class="kw">extends</span> <span class="var">Shape</span> {
  <span class="fn">constructor</span>(
    <span class="kw">private</span> <span class="arg">w</span>: <span class="num">number</span>,
    <span class="kw">private</span> <span class="arg">h</span>: <span class="num">number</span>
  ) {
    <span class="kw">super</span>();
  }

  <span class="fn">area</span>(): <span class="num">number</span> { <span class="kw">return</span> <span class="kw">this</span>.<span class="var">w</span> <span class="op">*</span> <span class="kw">this</span>.<span class="var">h</span>; }
  <span class="fn">perimeter</span>(): <span class="num">number</span> { <span class="kw">return</span> <span class="num">2</span> <span class="op">*</span> (<span class="kw">this</span>.<span class="var">w</span> <span class="op">+</span> <span class="kw">this</span>.<span class="var">h</span>); }
}

<span class="cmt">// new Shape();        // Error: cannot instantiate abstract class</span>
<span class="kw">const</span> <span class="var">c</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">Circle</span>(<span class="num">5</span>);
<span class="var">c</span>.<span class="fn">describe</span>(); <span class="cmt">// → "Area: 78.54, Perimeter: 31.42"</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{/if}

<style>
  .code-block {
    background-color: #0f172a;
    color: #e2e8f0;
    border: 1px solid #334155;
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    font-size: 0.875rem;
    line-height: 1.7;
    overflow-x: auto;
  }
  .code-block :global(.keyword)     { color: #60a5fa; }
  .code-block :global(.variable)    { color: #67e8f9; }
  .code-block :global(.string)      { color: #4ade80; }
  .code-block :global(.comment)     { color: #475569; }
  .code-block :global(.punctuation) { color: #fcd34d; }
  .code-block :global(.kw)  { color: #60a5fa; }
  .code-block :global(.var) { color: #67e8f9; }
  .code-block :global(.str) { color: #4ade80; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #67e8f9; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
