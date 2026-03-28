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
    <h2 class="mb-3 text-xl font-bold text-slate-800">Abstraction in Code</h2>
    <p class="text-sm text-slate-600">The simple interfaces from the visual map to abstract classes and method signatures in code.</p>
  </div>

  <!-- Visual-to-Code 1: Simple button → abstract class -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual: Simple Button</h3>
      <div class="flex flex-col items-center gap-3 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
        <div class="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md">Make Coffee</div>
        <p class="text-xs text-indigo-600">User sees only one action — the interface</p>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code: Abstract Class</h3>
      <pre class="code-block"><code>{@html `<span class="keyword">abstract class</span> <span class="variable">CoffeeMachine</span> <span class="punctuation">{</span>
  <span class="comment">// What it does (not how)</span>
  <span class="keyword">abstract</span> <span class="variable">makeCoffee</span>()<span class="punctuation">:</span> <span class="variable">Coffee</span><span class="punctuation">;</span>
  <span class="keyword">abstract</span> <span class="variable">addMilk</span>()<span class="punctuation">:</span> <span class="keyword">void</span><span class="punctuation">;</span>
<span class="punctuation">}</span>`}</code></pre>
    </div>
  </div>

  <!-- Visual-to-Code 2: Hidden complexity → concrete class -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual: Hidden Complexity</h3>
      <div class="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-slate-500">
            <span>🫘</span><span>Grind beans</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-slate-500">
            <span>🔥</span><span>Heat water to 96°C</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-slate-500">
            <span>💧</span><span>Brew under pressure</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-slate-500">
            <span>☕</span><span>Pour into cup</span>
          </div>
        </div>
        <p class="mt-2 text-xs text-slate-500">The messy details — hidden from the user</p>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code: Concrete Implementation</h3>
      <pre class="code-block"><code>{@html `<span class="keyword">class</span> <span class="variable">Lattemaker</span> <span class="keyword">extends</span> <span class="variable">CoffeeMachine</span> <span class="punctuation">{</span>
  <span class="variable">makeCoffee</span>() <span class="punctuation">{</span>
    <span class="keyword">this</span>.<span class="variable">grindBeans</span>()<span class="punctuation">;</span>
    <span class="keyword">this</span>.<span class="variable">heatWater</span>(<span class="string">96</span>)<span class="punctuation">;</span>
    <span class="keyword">this</span>.<span class="variable">brew</span>()<span class="punctuation">;</span>
    <span class="keyword">return this</span>.<span class="variable">pour</span>()<span class="punctuation">;</span>
  <span class="punctuation">}</span>

  <span class="variable">addMilk</span>() <span class="punctuation">{</span>
    <span class="keyword">this</span>.<span class="variable">steamMilk</span>()<span class="punctuation">;</span>
    <span class="keyword">this</span>.<span class="variable">froth</span>()<span class="punctuation">;</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span>`}</code></pre>
    </div>
  </div>

  <!-- Visual-to-Code 3: User pressing button → calling the abstract interface -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual: User Presses Button</h3>
      <div class="flex items-center gap-3 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-200 text-lg">👤</div>
        <svg class="h-5 w-6 shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <div class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white">Make Coffee</div>
        <svg class="h-5 w-6 shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="text-2xl">☕</span>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code: Calling the Interface</h3>
      <pre class="code-block"><code>{@html `<span class="comment">// User only knows the abstract type</span>
<span class="keyword">const</span> <span class="variable">machine</span><span class="punctuation">:</span> <span class="variable">CoffeeMachine</span> =
  <span class="keyword">new</span> <span class="variable">Lattemaker</span>()<span class="punctuation">;</span>

<span class="comment">// Simple call — complexity hidden</span>
<span class="keyword">const</span> <span class="variable">coffee</span> = <span class="variable">machine</span>.<span class="variable">makeCoffee</span>()<span class="punctuation">;</span>
<span class="comment">// ☕ Done! No need to know internals.</span>`}</code></pre>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      Got it
    </button>
  </div>
</div>
{:else}
<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Advanced Abstraction Patterns</h2>
    <p class="text-sm text-slate-600">Interfaces as contracts, dependency injection, facade pattern, and the repository pattern.</p>
  </div>

  <!-- 1: Abstract classes and interfaces as contracts -->
  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-500">Interfaces as Contracts</h3>
    <pre class="code-block"><code>{@html `<span class="kw">interface</span> <span class="var">Logger</span> {
  <span class="fn">info</span>(<span class="arg">msg</span>: <span class="var">string</span>): <span class="kw">void</span>;
  <span class="fn">error</span>(<span class="arg">msg</span>: <span class="var">string</span>, <span class="arg">err</span>?: <span class="var">Error</span>): <span class="kw">void</span>;
}

<span class="cmt">// Any class that implements Logger must provide info() and error()</span>
<span class="kw">class</span> <span class="var">ConsoleLogger</span> <span class="kw">implements</span> <span class="var">Logger</span> {
  <span class="fn">info</span>(<span class="arg">msg</span>: <span class="var">string</span>) { <span class="var">console</span>.<span class="fn">log</span>(<span class="str">"[INFO]"</span>, <span class="arg">msg</span>); }
  <span class="fn">error</span>(<span class="arg">msg</span>: <span class="var">string</span>, <span class="arg">err</span>?: <span class="var">Error</span>) { <span class="var">console</span>.<span class="fn">error</span>(<span class="str">"[ERR]"</span>, <span class="arg">msg</span>, <span class="arg">err</span>); }
}

<span class="kw">class</span> <span class="var">FileLogger</span> <span class="kw">implements</span> <span class="var">Logger</span> {
  <span class="fn">info</span>(<span class="arg">msg</span>: <span class="var">string</span>) { <span class="var">fs</span>.<span class="fn">appendFileSync</span>(<span class="str">"app.log"</span>, <span class="arg">msg</span>); }
  <span class="fn">error</span>(<span class="arg">msg</span>: <span class="var">string</span>, <span class="arg">err</span>?: <span class="var">Error</span>) { <span class="var">fs</span>.<span class="fn">appendFileSync</span>(<span class="str">"err.log"</span>, <span class="arg">msg</span>); }
}`}</code></pre>
    <p class="mt-2 text-xs text-slate-500">The interface defines <em>what</em> a logger does. Each class decides <em>how</em>. Callers depend only on the contract.</p>
  </div>

  <!-- 2: Dependency injection -->
  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-500">Dependency Injection</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// The service depends on an abstraction, not a concrete class</span>
<span class="kw">class</span> <span class="var">OrderService</span> {
  <span class="kw">private</span> <span class="var">logger</span>: <span class="var">Logger</span>;

  <span class="fn">constructor</span>(<span class="arg">logger</span>: <span class="var">Logger</span>) {
    <span class="kw">this</span>.<span class="var">logger</span> <span class="op">=</span> <span class="arg">logger</span>;
  }

  <span class="fn">placeOrder</span>(<span class="arg">order</span>: <span class="var">Order</span>) {
    <span class="cmt">// ... business logic ...</span>
    <span class="kw">this</span>.<span class="var">logger</span>.<span class="fn">info</span>(<span class="str">\`Order \${<span class="arg">order</span>.id} placed\`</span>);
  }
}

<span class="cmt">// Swap implementations without changing OrderService</span>
<span class="kw">const</span> <span class="var">svc</span> <span class="op">=</span> <span class="kw">new</span> <span class="var">OrderService</span>(<span class="kw">new</span> <span class="var">ConsoleLogger</span>());
<span class="kw">const</span> <span class="var">svc2</span> <span class="op">=</span> <span class="kw">new</span> <span class="var">OrderService</span>(<span class="kw">new</span> <span class="var">FileLogger</span>());`}</code></pre>
    <p class="mt-2 text-xs text-slate-500">Dependencies are injected from the outside. The class never creates its own dependencies, making it testable and flexible.</p>
  </div>

  <!-- 3: Facade pattern -->
  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-500">Facade Pattern</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Complex subsystems hidden behind a simple interface</span>
<span class="kw">class</span> <span class="var">MediaPlayerFacade</span> {
  <span class="kw">private</span> <span class="var">decoder</span> <span class="op">=</span> <span class="kw">new</span> <span class="var">AudioDecoder</span>();
  <span class="kw">private</span> <span class="var">buffer</span> <span class="op">=</span> <span class="kw">new</span> <span class="var">StreamBuffer</span>();
  <span class="kw">private</span> <span class="var">output</span> <span class="op">=</span> <span class="kw">new</span> <span class="var">AudioOutput</span>();
  <span class="kw">private</span> <span class="var">equalizer</span> <span class="op">=</span> <span class="kw">new</span> <span class="var">Equalizer</span>();

  <span class="cmt">// One simple method hides four complex subsystems</span>
  <span class="fn">play</span>(<span class="arg">file</span>: <span class="var">string</span>) {
    <span class="kw">const</span> <span class="var">raw</span> <span class="op">=</span> <span class="kw">this</span>.<span class="var">decoder</span>.<span class="fn">decode</span>(<span class="arg">file</span>);
    <span class="kw">const</span> <span class="var">stream</span> <span class="op">=</span> <span class="kw">this</span>.<span class="var">buffer</span>.<span class="fn">fill</span>(<span class="var">raw</span>);
    <span class="kw">const</span> <span class="var">audio</span> <span class="op">=</span> <span class="kw">this</span>.<span class="var">equalizer</span>.<span class="fn">process</span>(<span class="var">stream</span>);
    <span class="kw">this</span>.<span class="var">output</span>.<span class="fn">send</span>(<span class="var">audio</span>);
  }
}

<span class="cmt">// Caller only sees the facade</span>
<span class="kw">const</span> <span class="var">player</span> <span class="op">=</span> <span class="kw">new</span> <span class="var">MediaPlayerFacade</span>();
<span class="var">player</span>.<span class="fn">play</span>(<span class="str">"song.mp3"</span>); <span class="cmt">// simple!</span>`}</code></pre>
    <p class="mt-2 text-xs text-slate-500">The facade wraps multiple subsystems behind a single, clean interface. Callers never interact with decoders, buffers, or equalizers directly.</p>
  </div>

  <!-- 4: Repository pattern -->
  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-500">Repository Pattern</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Abstract data access behind a clean interface</span>
<span class="kw">interface</span> <span class="var">UserRepository</span> {
  <span class="fn">findById</span>(<span class="arg">id</span>: <span class="var">number</span>): <span class="var">Promise</span><span class="op">&lt;</span><span class="var">User</span> <span class="op">|</span> <span class="kw">null</span><span class="op">&gt;</span>;
  <span class="fn">save</span>(<span class="arg">user</span>: <span class="var">User</span>): <span class="var">Promise</span><span class="op">&lt;</span><span class="kw">void</span><span class="op">&gt;</span>;
  <span class="fn">findByEmail</span>(<span class="arg">email</span>: <span class="var">string</span>): <span class="var">Promise</span><span class="op">&lt;</span><span class="var">User</span> <span class="op">|</span> <span class="kw">null</span><span class="op">&gt;</span>;
}

<span class="cmt">// SQL implementation</span>
<span class="kw">class</span> <span class="var">SqlUserRepo</span> <span class="kw">implements</span> <span class="var">UserRepository</span> {
  <span class="kw">async</span> <span class="fn">findById</span>(<span class="arg">id</span>: <span class="var">number</span>) {
    <span class="kw">return</span> <span class="var">db</span>.<span class="fn">query</span>(<span class="str">"SELECT * FROM users WHERE id = ?"</span>, [<span class="arg">id</span>]);
  }
  <span class="cmt">// ... save, findByEmail ...</span>
}

<span class="cmt">// In-memory implementation (for tests)</span>
<span class="kw">class</span> <span class="var">InMemoryUserRepo</span> <span class="kw">implements</span> <span class="var">UserRepository</span> {
  <span class="kw">private</span> <span class="var">users</span>: <span class="var">User</span>[] <span class="op">=</span> [];
  <span class="kw">async</span> <span class="fn">findById</span>(<span class="arg">id</span>: <span class="var">number</span>) {
    <span class="kw">return</span> <span class="kw">this</span>.<span class="var">users</span>.<span class="fn">find</span>(<span class="arg">u</span> <span class="op">=&gt;</span> <span class="arg">u</span>.<span class="var">id</span> <span class="op">===</span> <span class="arg">id</span>) <span class="op">??</span> <span class="kw">null</span>;
  }
  <span class="cmt">// ... save, findByEmail ...</span>
}`}</code></pre>
    <p class="mt-2 text-xs text-slate-500">Business logic depends on UserRepository, not on SQL or any specific database. Swap SqlUserRepo for InMemoryUserRepo in tests with zero code changes.</p>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
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
  .code-block :global(.keyword)     { color: #818cf8; }
  .code-block :global(.variable)    { color: #67e8f9; }
  .code-block :global(.string)      { color: #4ade80; }
  .code-block :global(.comment)     { color: #475569; }
  .code-block :global(.punctuation) { color: #fcd34d; }
  .code-block :global(.kw)    { color: #c084fc; }
  .code-block :global(.var)   { color: #93c5fd; }
  .code-block :global(.str)   { color: #fcd34d; }
  .code-block :global(.num)   { color: #fcd34d; }
  .code-block :global(.cmt)   { color: #475569; }
  .code-block :global(.fn)    { color: #93c5fd; }
  .code-block :global(.op)    { color: #c084fc; }
  .code-block :global(.arg)   { color: #fca5a5; }
</style>
