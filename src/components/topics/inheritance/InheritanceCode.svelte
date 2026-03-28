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
    <h2 class="mb-3 text-xl font-bold text-slate-800">Inheritance in Code</h2>
    <p class="text-sm text-slate-600">Here's how the parent-child visuals map to real JavaScript classes.</p>
  </div>

  <!-- Mapping 1: Parent class -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual</h3>
      <div class="flex flex-col items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 p-4">
        <div class="w-40 rounded-xl border-2 border-purple-400 bg-purple-100 p-3 text-center shadow-sm">
          <span class="text-xs text-purple-500">parent class</span>
          <div class="text-sm font-bold text-purple-700">Animal</div>
          <div class="mt-1 text-xs text-purple-500">name, sound, speak()</div>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="keyword">class</span> <span class="variable">Animal</span> <span class="punctuation">{</span>
  <span class="keyword">constructor</span>(<span class="variable">name</span>, <span class="variable">sound</span>) <span class="punctuation">{</span>
    <span class="keyword">this</span>.<span class="variable">name</span> = <span class="variable">name</span>;
    <span class="keyword">this</span>.<span class="variable">sound</span> = <span class="variable">sound</span>;
  <span class="punctuation">}</span>
  <span class="variable">speak</span>() <span class="punctuation">{</span>
    <span class="keyword">return</span> <span class="keyword">this</span>.<span class="variable">sound</span>;
  <span class="punctuation">}</span>
<span class="punctuation">}</span>`}</code></pre>
    </div>
  </div>

  <!-- Mapping 2: Child class with extends -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual</h3>
      <div class="flex flex-col items-center gap-1 rounded-lg border border-purple-200 bg-purple-50 p-4">
        <div class="w-36 rounded-lg border-2 border-purple-400 bg-purple-100 p-2 text-center text-xs font-bold text-purple-700">Animal</div>
        <svg class="h-6 w-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <div class="w-36 rounded-lg border-2 border-purple-300 bg-purple-50 p-2 text-center">
          <span class="text-xs text-purple-400">child</span>
          <div class="text-xs font-bold text-purple-600">Dog</div>
          <div class="text-[10px] text-purple-400">+ fetch()</div>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="keyword">class</span> <span class="variable">Dog</span> <span class="keyword">extends</span> <span class="variable">Animal</span> <span class="punctuation">{</span>
  <span class="variable">fetch</span>() <span class="punctuation">{</span>
    <span class="keyword">return</span> <span class="string">"Fetches the ball!"</span>;
  <span class="punctuation">}</span>
<span class="punctuation">}</span>

<span class="comment">// Dog gets name, sound, speak() for free</span>
<span class="keyword">const</span> <span class="variable">buddy</span> = <span class="keyword">new</span> <span class="variable">Dog</span>(<span class="string">"Buddy"</span>, <span class="string">"Woof!"</span>);`}</code></pre>
    </div>
  </div>

  <!-- Mapping 3: Using parent method with super -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual</h3>
      <div class="flex flex-col items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 p-4">
        <div class="flex items-center gap-2">
          <div class="rounded-lg border border-purple-300 bg-purple-100 px-3 py-2 text-center">
            <span class="text-xs text-purple-400">child calls</span>
            <div class="text-xs font-bold text-purple-600">Dog.speak()</div>
          </div>
          <svg class="h-4 w-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <div class="rounded-lg border border-green-300 bg-green-50 px-3 py-2 text-center">
            <span class="text-xs text-green-500">uses parent's</span>
            <div class="text-xs font-bold text-green-700">Animal.speak()</div>
          </div>
        </div>
        <p class="text-xs text-purple-500">Child can call parent's version with <strong>super</strong></p>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="keyword">class</span> <span class="variable">Dog</span> <span class="keyword">extends</span> <span class="variable">Animal</span> <span class="punctuation">{</span>
  <span class="variable">speak</span>() <span class="punctuation">{</span>
    <span class="comment">// Call parent's speak first</span>
    <span class="keyword">const</span> <span class="variable">base</span> = <span class="keyword">super</span>.<span class="variable">speak</span>();
    <span class="keyword">return</span> <span class="variable">base</span> + <span class="string">" Wag wag!"</span>;
  <span class="punctuation">}</span>
<span class="punctuation">}</span>

<span class="variable">buddy</span>.<span class="variable">speak</span>(); <span class="comment">// "Woof! Wag wag!"</span>`}</code></pre>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Inheritance in Code (Advanced)</h2>
    <p class="text-sm text-slate-600">Method overriding, abstract classes, protected members, and mixins.</p>
  </div>

  <!-- Method overriding with super calls -->
  <div>
    <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Method Overriding with super</h3>
    <pre class="code-block"><code>{@html `<span class="kw">class</span> <span class="fn">Animal</span> {
  <span class="fn">constructor</span>(<span class="arg">name</span>) {
    <span class="kw">this</span>.<span class="var">name</span> <span class="op">=</span> <span class="arg">name</span>;
  }
  <span class="fn">describe</span>() {
    <span class="kw">return</span> <span class="str">\`I am \${<span class="kw">this</span>.<span class="var">name</span>}\`</span>;
  }
}

<span class="kw">class</span> <span class="fn">Dog</span> <span class="kw">extends</span> <span class="fn">Animal</span> {
  <span class="fn">constructor</span>(<span class="arg">name</span>, <span class="arg">breed</span>) {
    <span class="kw">super</span>(<span class="arg">name</span>);          <span class="cmt">// must call super() first</span>
    <span class="kw">this</span>.<span class="var">breed</span> <span class="op">=</span> <span class="arg">breed</span>;
  }
  <span class="fn">describe</span>() {
    <span class="kw">const</span> <span class="var">base</span> <span class="op">=</span> <span class="kw">super</span>.<span class="fn">describe</span>();  <span class="cmt">// "I am Buddy"</span>
    <span class="kw">return</span> <span class="str">\`\${<span class="var">base</span>}, a \${<span class="kw">this</span>.<span class="var">breed</span>}\`</span>;
  }
}

<span class="kw">const</span> <span class="var">dog</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">Dog</span>(<span class="str">"Buddy"</span>, <span class="str">"Labrador"</span>);
<span class="var">dog</span>.<span class="fn">describe</span>(); <span class="cmt">// "I am Buddy, a Labrador"</span>`}</code></pre>
  </div>

  <!-- Abstract classes and required implementations -->
  <div>
    <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Abstract Classes &amp; Required Implementations</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Simulate an abstract class in JavaScript</span>
<span class="kw">class</span> <span class="fn">Shape</span> {
  <span class="fn">constructor</span>(<span class="arg">color</span>) {
    <span class="kw">if</span> (<span class="kw">new</span>.<span class="var">target</span> <span class="op">===</span> <span class="fn">Shape</span>) {
      <span class="kw">throw new</span> <span class="fn">Error</span>(<span class="str">"Cannot instantiate Shape directly"</span>);
    }
    <span class="kw">this</span>.<span class="var">color</span> <span class="op">=</span> <span class="arg">color</span>;
  }
  <span class="fn">area</span>() {
    <span class="kw">throw new</span> <span class="fn">Error</span>(<span class="str">"Subclass must implement area()"</span>);
  }
}

<span class="kw">class</span> <span class="fn">Circle</span> <span class="kw">extends</span> <span class="fn">Shape</span> {
  <span class="fn">constructor</span>(<span class="arg">color</span>, <span class="arg">radius</span>) {
    <span class="kw">super</span>(<span class="arg">color</span>);
    <span class="kw">this</span>.<span class="var">radius</span> <span class="op">=</span> <span class="arg">radius</span>;
  }
  <span class="fn">area</span>() {
    <span class="kw">return</span> <span class="var">Math</span>.<span class="var">PI</span> <span class="op">*</span> <span class="kw">this</span>.<span class="var">radius</span> <span class="op">**</span> <span class="num">2</span>;
  }
}

<span class="kw">new</span> <span class="fn">Shape</span>(<span class="str">"red"</span>);       <span class="cmt">// Error!</span>
<span class="kw">new</span> <span class="fn">Circle</span>(<span class="str">"red"</span>, <span class="num">5</span>);  <span class="cmt">// OK &mdash; area() = 78.54</span>`}</code></pre>
  </div>

  <!-- Protected members and inheritance chains -->
  <div>
    <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Protected Members &amp; Inheritance Chains</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Convention: _prefix marks "protected" members</span>
<span class="kw">class</span> <span class="fn">Account</span> {
  <span class="var">_balance</span> <span class="op">=</span> <span class="num">0</span>;  <span class="cmt">// intended for subclasses only</span>

  <span class="fn">deposit</span>(<span class="arg">amount</span>) {
    <span class="kw">this</span>.<span class="var">_balance</span> <span class="op">+=</span> <span class="arg">amount</span>;
  }
  <span class="kw">get</span> <span class="fn">balance</span>() {
    <span class="kw">return</span> <span class="kw">this</span>.<span class="var">_balance</span>;
  }
}

<span class="kw">class</span> <span class="fn">SavingsAccount</span> <span class="kw">extends</span> <span class="fn">Account</span> {
  <span class="var">_interestRate</span>;

  <span class="fn">constructor</span>(<span class="arg">rate</span>) {
    <span class="kw">super</span>();
    <span class="kw">this</span>.<span class="var">_interestRate</span> <span class="op">=</span> <span class="arg">rate</span>;
  }
  <span class="fn">applyInterest</span>() {
    <span class="cmt">// Access parent's protected _balance</span>
    <span class="kw">this</span>.<span class="var">_balance</span> <span class="op">*=</span> <span class="num">1</span> <span class="op">+</span> <span class="kw">this</span>.<span class="var">_interestRate</span>;
  }
}

<span class="kw">class</span> <span class="fn">HighYieldSavings</span> <span class="kw">extends</span> <span class="fn">SavingsAccount</span> {
  <span class="fn">constructor</span>() { <span class="kw">super</span>(<span class="num">0.05</span>); }  <span class="cmt">// 5% rate</span>
  <span class="fn">applyInterest</span>() {
    <span class="kw">super</span>.<span class="fn">applyInterest</span>();         <span class="cmt">// chain up</span>
    <span class="kw">this</span>.<span class="var">_balance</span> <span class="op">+=</span> <span class="num">10</span>;           <span class="cmt">// bonus</span>
  }
}`}</code></pre>
  </div>

  <!-- Mixins as alternative to multiple inheritance -->
  <div>
    <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Mixins &mdash; Alternative to Multiple Inheritance</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// JS has single inheritance, but mixins add behavior</span>
<span class="kw">const</span> <span class="fn">Serializable</span> <span class="op">=</span> (<span class="arg">Base</span>) <span class="op">=></span> <span class="kw">class extends</span> <span class="arg">Base</span> {
  <span class="fn">toJSON</span>() {
    <span class="kw">return</span> <span class="var">JSON</span>.<span class="fn">stringify</span>(<span class="kw">this</span>);
  }
};

<span class="kw">const</span> <span class="fn">Loggable</span> <span class="op">=</span> (<span class="arg">Base</span>) <span class="op">=></span> <span class="kw">class extends</span> <span class="arg">Base</span> {
  <span class="fn">log</span>() {
    <span class="var">console</span>.<span class="fn">log</span>(<span class="str">\`[\${<span class="kw">this</span>.<span class="var">constructor</span>.<span class="var">name</span>}]\`</span>, <span class="kw">this</span>);
  }
};

<span class="cmt">// Compose multiple mixins onto a base class</span>
<span class="kw">class</span> <span class="fn">User</span> <span class="kw">extends</span> <span class="fn">Serializable</span>(<span class="fn">Loggable</span>(<span class="fn">Account</span>)) {
  <span class="fn">constructor</span>(<span class="arg">name</span>) {
    <span class="kw">super</span>();
    <span class="kw">this</span>.<span class="var">name</span> <span class="op">=</span> <span class="arg">name</span>;
  }
}

<span class="kw">const</span> <span class="var">u</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">User</span>(<span class="str">"Alice"</span>);
<span class="var">u</span>.<span class="fn">deposit</span>(<span class="num">100</span>);  <span class="cmt">// from Account</span>
<span class="var">u</span>.<span class="fn">log</span>();         <span class="cmt">// from Loggable</span>
<span class="var">u</span>.<span class="fn">toJSON</span>();      <span class="cmt">// from Serializable</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
      Got it
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
  .code-block :global(.keyword)     { color: #93bbfc; }
  .code-block :global(.variable)    { color: #67e8f9; }
  .code-block :global(.string)      { color: #86efac; }
  .code-block :global(.comment)     { color: #64748b; }
  .code-block :global(.punctuation) { color: #fde047; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #f472b6; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
