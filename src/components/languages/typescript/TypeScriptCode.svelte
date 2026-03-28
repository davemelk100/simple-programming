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
    <h2 class="mb-3 text-2xl font-bold text-slate-800">JavaScript in Code</h2>
    <p class="text-sm text-slate-600">Here are the building blocks of JavaScript. Each example shows a concept and the code that implements it.</p>
  </div>

  <!-- Variables -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">What it does</h3>
      <div class="flex min-h-[5rem] items-center rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
        <p class="text-sm text-slate-600">Create named containers to store data. Use <strong>let</strong> for values that change and <strong>const</strong> for values that stay the same.</p>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">score</span> = <span class="num">0</span>;            <span class="cmt">// can change</span>
<span class="kw">const</span> <span class="var">name</span> = <span class="str">"Alice"</span>;     <span class="cmt">// cannot change</span>
<span class="kw">let</span> <span class="var">isPlaying</span> = <span class="kw">true</span>;     <span class="cmt">// boolean</span>`}</code></pre>
    </div>
  </div>

  <!-- Functions -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Functions -- reusable blocks of code</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// A function that takes a name and returns a greeting</span>
<span class="kw">function</span> <span class="fn">greet</span>(<span class="arg">name</span>) {
  <span class="kw">return</span> <span class="str">"Hello, "</span> <span class="op">+</span> <span class="var">name</span> <span class="op">+</span> <span class="str">"!"</span>;
}

<span class="kw">let</span> <span class="var">message</span> = <span class="fn">greet</span>(<span class="str">"Alice"</span>);  <span class="cmt">// "Hello, Alice!"</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">message</span>);

<span class="cmt">// Arrow function (shorter way to write functions)</span>
<span class="kw">const</span> <span class="fn">double</span> = (<span class="arg">x</span>) <span class="op">=&gt;</span> <span class="var">x</span> <span class="op">*</span> <span class="num">2</span>;
<span class="fn">console</span>.<span class="fn">log</span>(<span class="fn">double</span>(<span class="num">5</span>));    <span class="cmt">// 10</span>`}</code></pre>
  </div>

  <!-- Arrays -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Arrays -- ordered lists of values</p>
    <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">fruits</span> = [<span class="str">"apple"</span>, <span class="str">"banana"</span>, <span class="str">"cherry"</span>];

<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">fruits</span>[<span class="num">0</span>]);        <span class="cmt">// "apple"  (first item)</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">fruits</span>.<span class="var">length</span>);    <span class="cmt">// 3</span>

<span class="var">fruits</span>.<span class="fn">push</span>(<span class="str">"date"</span>);           <span class="cmt">// add to the end</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">fruits</span>.<span class="var">length</span>);    <span class="cmt">// 4</span>`}</code></pre>
  </div>

  <!-- Objects -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Objects -- groups of related data</p>
    <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">person</span> = {
  <span class="var">name</span>: <span class="str">"Alice"</span>,
  <span class="var">age</span>: <span class="num">25</span>,
  <span class="var">hobby</span>: <span class="str">"painting"</span>,
};

<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">person</span>.<span class="var">name</span>);    <span class="cmt">// "Alice"</span>
<span class="var">person</span>.<span class="var">age</span> = <span class="num">26</span>;              <span class="cmt">// update a property</span>`}</code></pre>
  </div>

  <!-- If/Else -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">If / else -- making decisions</p>
    <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">temperature</span> = <span class="num">30</span>;

<span class="kw">if</span> (<span class="var">temperature</span> <span class="op">&gt;</span> <span class="num">25</span>) {
  <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"It's hot outside!"</span>);
} <span class="kw">else if</span> (<span class="var">temperature</span> <span class="op">&gt;</span> <span class="num">15</span>) {
  <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"It's nice out."</span>);
} <span class="kw">else</span> {
  <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"It's cold!"</span>);
}`}</code></pre>
  </div>

  <!-- Loops -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Loops -- repeating actions</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// for loop -- repeat a specific number of times</span>
<span class="kw">for</span> (<span class="kw">let</span> <span class="var">i</span> = <span class="num">0</span>; <span class="var">i</span> <span class="op">&lt;</span> <span class="num">5</span>; <span class="var">i</span><span class="op">++</span>) {
  <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"Count:"</span>, <span class="var">i</span>);  <span class="cmt">// 0, 1, 2, 3, 4</span>
}

<span class="cmt">// for...of -- loop through an array</span>
<span class="kw">let</span> <span class="var">colors</span> = [<span class="str">"red"</span>, <span class="str">"green"</span>, <span class="str">"blue"</span>];
<span class="kw">for</span> (<span class="kw">const</span> <span class="var">color</span> <span class="kw">of</span> <span class="var">colors</span>) {
  <span class="fn">console</span>.<span class="fn">log</span>(<span class="var">color</span>);
}`}</code></pre>
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
    <h2 class="mb-3 text-2xl font-bold text-slate-800">TypeScript in Code (Advanced)</h2>
    <p class="text-sm text-slate-600">TypeScript-specific features that add safety and expressiveness to your JavaScript.</p>
  </div>

  <!-- Interfaces -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Interfaces -- describing object shapes</p>
    <pre class="code-block"><code>{@html `<span class="kw">interface</span> <span class="fn">User</span> {
  <span class="var">id</span>: <span class="fn">number</span>;
  <span class="var">name</span>: <span class="fn">string</span>;
  <span class="var">email</span>: <span class="fn">string</span>;
  <span class="var">bio</span><span class="op">?</span>: <span class="fn">string</span>;         <span class="cmt">// optional property</span>
}

<span class="cmt">// Extending interfaces</span>
<span class="kw">interface</span> <span class="fn">Admin</span> <span class="kw">extends</span> <span class="fn">User</span> {
  <span class="var">permissions</span>: <span class="fn">string</span>[];
}

<span class="kw">const</span> <span class="var">admin</span>: <span class="fn">Admin</span> = {
  <span class="var">id</span>: <span class="num">1</span>,
  <span class="var">name</span>: <span class="str">"Alice"</span>,
  <span class="var">email</span>: <span class="str">"alice@example.com"</span>,
  <span class="var">permissions</span>: [<span class="str">"read"</span>, <span class="str">"write"</span>, <span class="str">"delete"</span>],
};`}</code></pre>
  </div>

  <!-- Generics -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Generics -- reusable typed components</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// A generic function that works with any type</span>
<span class="kw">function</span> <span class="fn">wrapInArray</span>&lt;<span class="fn">T</span>&gt;(<span class="arg">value</span>: <span class="fn">T</span>): <span class="fn">T</span>[] {
  <span class="kw">return</span> [<span class="var">value</span>];
}

<span class="kw">const</span> <span class="var">nums</span> = <span class="fn">wrapInArray</span>(<span class="num">42</span>);       <span class="cmt">// number[]</span>
<span class="kw">const</span> <span class="var">strs</span> = <span class="fn">wrapInArray</span>(<span class="str">"hello"</span>);  <span class="cmt">// string[]</span>

<span class="cmt">// Generic interface</span>
<span class="kw">interface</span> <span class="fn">ApiResponse</span>&lt;<span class="fn">T</span>&gt; {
  <span class="var">data</span>: <span class="fn">T</span>;
  <span class="var">status</span>: <span class="fn">number</span>;
  <span class="var">message</span>: <span class="fn">string</span>;
}

<span class="kw">const</span> <span class="var">response</span>: <span class="fn">ApiResponse</span>&lt;<span class="fn">User</span>&gt; = {
  <span class="var">data</span>: { <span class="var">id</span>: <span class="num">1</span>, <span class="var">name</span>: <span class="str">"Alice"</span>, <span class="var">email</span>: <span class="str">"a@b.com"</span> },
  <span class="var">status</span>: <span class="num">200</span>,
  <span class="var">message</span>: <span class="str">"OK"</span>,
};`}</code></pre>
  </div>

  <!-- Union types & type guards -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Union types and type guards</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// A value that can be one of several types</span>
<span class="kw">type</span> <span class="fn">StringOrNumber</span> = <span class="fn">string</span> <span class="op">|</span> <span class="fn">number</span>;

<span class="kw">function</span> <span class="fn">format</span>(<span class="arg">value</span>: <span class="fn">StringOrNumber</span>): <span class="fn">string</span> {
  <span class="cmt">// Type guard narrows the type inside the block</span>
  <span class="kw">if</span> (<span class="kw">typeof</span> <span class="var">value</span> <span class="op">===</span> <span class="str">"string"</span>) {
    <span class="kw">return</span> <span class="var">value</span>.<span class="fn">toUpperCase</span>();   <span class="cmt">// TS knows it's string here</span>
  }
  <span class="kw">return</span> <span class="var">value</span>.<span class="fn">toFixed</span>(<span class="num">2</span>);        <span class="cmt">// TS knows it's number here</span>
}

<span class="cmt">// Discriminated union -- powerful pattern</span>
<span class="kw">type</span> <span class="fn">Shape</span> =
  <span class="op">|</span> { <span class="var">kind</span>: <span class="str">"circle"</span>; <span class="var">radius</span>: <span class="fn">number</span> }
  <span class="op">|</span> { <span class="var">kind</span>: <span class="str">"rect"</span>; <span class="var">w</span>: <span class="fn">number</span>; <span class="var">h</span>: <span class="fn">number</span> };

<span class="kw">function</span> <span class="fn">area</span>(<span class="arg">s</span>: <span class="fn">Shape</span>): <span class="fn">number</span> {
  <span class="kw">switch</span> (<span class="var">s</span>.<span class="var">kind</span>) {
    <span class="kw">case</span> <span class="str">"circle"</span>: <span class="kw">return</span> Math.<span class="var">PI</span> <span class="op">*</span> <span class="var">s</span>.<span class="var">radius</span> <span class="op">**</span> <span class="num">2</span>;
    <span class="kw">case</span> <span class="str">"rect"</span>:   <span class="kw">return</span> <span class="var">s</span>.<span class="var">w</span> <span class="op">*</span> <span class="var">s</span>.<span class="var">h</span>;
  }
}`}</code></pre>
  </div>

  <!-- Enums -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Enums -- named constants</p>
    <pre class="code-block"><code>{@html `<span class="kw">enum</span> <span class="fn">Direction</span> {
  <span class="var">Up</span>,       <span class="cmt">// 0</span>
  <span class="var">Down</span>,     <span class="cmt">// 1</span>
  <span class="var">Left</span>,     <span class="cmt">// 2</span>
  <span class="var">Right</span>,    <span class="cmt">// 3</span>
}

<span class="kw">enum</span> <span class="fn">Status</span> {
  <span class="var">Active</span> = <span class="str">"ACTIVE"</span>,
  <span class="var">Inactive</span> = <span class="str">"INACTIVE"</span>,
  <span class="var">Pending</span> = <span class="str">"PENDING"</span>,
}

<span class="kw">let</span> <span class="var">dir</span>: <span class="fn">Direction</span> = <span class="fn">Direction</span>.<span class="var">Up</span>;
<span class="kw">let</span> <span class="var">status</span>: <span class="fn">Status</span> = <span class="fn">Status</span>.<span class="var">Active</span>;`}</code></pre>
  </div>

  <!-- Utility types -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Utility types -- transform existing types</p>
    <pre class="code-block"><code>{@html `<span class="kw">interface</span> <span class="fn">User</span> {
  <span class="var">id</span>: <span class="fn">number</span>;
  <span class="var">name</span>: <span class="fn">string</span>;
  <span class="var">email</span>: <span class="fn">string</span>;
  <span class="var">age</span>: <span class="fn">number</span>;
}

<span class="cmt">// Partial -- all properties become optional</span>
<span class="kw">type</span> <span class="fn">UserUpdate</span> = <span class="fn">Partial</span>&lt;<span class="fn">User</span>&gt;;
<span class="cmt">// { id?: number; name?: string; email?: string; age?: number }</span>

<span class="cmt">// Pick -- select specific properties</span>
<span class="kw">type</span> <span class="fn">UserPreview</span> = <span class="fn">Pick</span>&lt;<span class="fn">User</span>, <span class="str">"id"</span> <span class="op">|</span> <span class="str">"name"</span>&gt;;
<span class="cmt">// { id: number; name: string }</span>

<span class="cmt">// Omit -- exclude specific properties</span>
<span class="kw">type</span> <span class="fn">UserWithoutEmail</span> = <span class="fn">Omit</span>&lt;<span class="fn">User</span>, <span class="str">"email"</span>&gt;;
<span class="cmt">// { id: number; name: string; age: number }</span>

<span class="cmt">// Record -- define key-value shape</span>
<span class="kw">type</span> <span class="fn">Scores</span> = <span class="fn">Record</span>&lt;<span class="fn">string</span>, <span class="fn">number</span>&gt;;
<span class="kw">const</span> <span class="var">scores</span>: <span class="fn">Scores</span> = { <span class="var">alice</span>: <span class="num">95</span>, <span class="var">bob</span>: <span class="num">87</span> };`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">When to use what</h3>
    <ul class="space-y-2 text-sm text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        Use <code class="rounded bg-white px-1 text-sm text-blue-700">interface</code> for object shapes, especially when you want to extend them later.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        Use <code class="rounded bg-white px-1 text-sm text-blue-700">type</code> for unions, intersections, and mapped types.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        Use generics when a function or type needs to work with multiple data types.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        Prefer <code class="rounded bg-white px-1 text-sm text-blue-700">const</code> enums or string literal unions over regular enums for smaller bundle sizes.
      </li>
    </ul>
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
