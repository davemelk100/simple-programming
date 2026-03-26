<script lang="ts">
  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();
</script>

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
          <div class="flex items-center gap-2 text-xs text-slate-400">
            <span>🫘</span><span>Grind beans</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-slate-400">
            <span>🔥</span><span>Heat water to 96°C</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-slate-400">
            <span>💧</span><span>Brew under pressure</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-slate-400">
            <span>☕</span><span>Pour into cup</span>
          </div>
        </div>
        <p class="mt-2 text-xs text-slate-400">The messy details — hidden from the user</p>
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
</style>
