<script lang="ts">
  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();
</script>

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Polymorphism in Code</h2>
    <p class="text-sm text-slate-600">The same method name in different classes, each with its own implementation.</p>
  </div>

  <!-- Mapping 1: shared method name -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual</h3>
      <div class="flex flex-col gap-2 rounded-lg border border-orange-200 bg-orange-50 p-4">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-orange-400 bg-white">
            <span class="text-xs font-bold text-orange-700">C</span>
          </div>
          <span class="text-sm text-orange-600">.area()</span>
          <span class="text-orange-400">&rarr;</span>
          <span class="rounded bg-green-100 px-2 py-1 text-sm font-bold text-green-700">78.54</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-12 items-center justify-center rounded border-2 border-orange-400 bg-white">
            <span class="text-xs font-bold text-orange-700">R</span>
          </div>
          <span class="text-sm text-orange-600">.area()</span>
          <span class="text-orange-400">&rarr;</span>
          <span class="rounded bg-green-100 px-2 py-1 text-sm font-bold text-green-700">48</span>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="keyword">class</span> <span class="variable">Circle</span> <span class="punctuation">{</span>
  <span class="keyword">constructor</span><span class="punctuation">(</span><span class="variable">radius</span><span class="punctuation">)</span> <span class="punctuation">{</span>
    <span class="keyword">this</span><span class="punctuation">.</span><span class="variable">radius</span> <span class="punctuation">=</span> <span class="variable">radius</span><span class="punctuation">;</span>
  <span class="punctuation">}</span>
  <span class="variable">area</span><span class="punctuation">()</span> <span class="punctuation">{</span>
    <span class="keyword">return</span> Math<span class="punctuation">.</span>PI <span class="punctuation">*</span> <span class="keyword">this</span><span class="punctuation">.</span><span class="variable">radius</span> <span class="punctuation">**</span> <span class="string">2</span><span class="punctuation">;</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span>

<span class="keyword">class</span> <span class="variable">Rectangle</span> <span class="punctuation">{</span>
  <span class="keyword">constructor</span><span class="punctuation">(</span><span class="variable">w</span><span class="punctuation">,</span> <span class="variable">h</span><span class="punctuation">)</span> <span class="punctuation">{</span>
    <span class="keyword">this</span><span class="punctuation">.</span><span class="variable">w</span> <span class="punctuation">=</span> <span class="variable">w</span><span class="punctuation">;</span>
    <span class="keyword">this</span><span class="punctuation">.</span><span class="variable">h</span> <span class="punctuation">=</span> <span class="variable">h</span><span class="punctuation">;</span>
  <span class="punctuation">}</span>
  <span class="variable">area</span><span class="punctuation">()</span> <span class="punctuation">{</span>
    <span class="keyword">return</span> <span class="keyword">this</span><span class="punctuation">.</span><span class="variable">w</span> <span class="punctuation">*</span> <span class="keyword">this</span><span class="punctuation">.</span><span class="variable">h</span><span class="punctuation">;</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span>`}</code></pre>
    </div>
  </div>

  <!-- Mapping 2: loop over shapes -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual</h3>
      <div class="rounded-lg border border-orange-200 bg-orange-50 p-4">
        <p class="mb-2 text-xs font-bold text-orange-600">Loop over shapes:</p>
        <div class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-full border border-orange-300 bg-white text-xs font-bold text-orange-700">C</div>
          <div class="flex h-8 w-8 items-center justify-center rounded border border-orange-300 bg-white text-xs font-bold text-orange-700">R</div>
          <svg class="h-4 w-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="rounded bg-orange-200 px-2 py-1 text-xs font-bold text-orange-700">.area()</span>
          <svg class="h-4 w-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="rounded bg-green-100 px-2 py-1 text-xs font-bold text-green-700">78.54, 48</span>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="keyword">const</span> <span class="variable">shapes</span> <span class="punctuation">=</span> <span class="punctuation">[</span>
  <span class="keyword">new</span> <span class="variable">Circle</span><span class="punctuation">(</span><span class="string">5</span><span class="punctuation">),</span>
  <span class="keyword">new</span> <span class="variable">Rectangle</span><span class="punctuation">(</span><span class="string">6</span><span class="punctuation">,</span> <span class="string">8</span><span class="punctuation">)</span>
<span class="punctuation">];</span>

<span class="keyword">for</span> <span class="punctuation">(</span><span class="keyword">const</span> <span class="variable">shape</span> <span class="keyword">of</span> <span class="variable">shapes</span><span class="punctuation">)</span> <span class="punctuation">{</span>
  console<span class="punctuation">.</span>log<span class="punctuation">(</span><span class="variable">shape</span><span class="punctuation">.</span><span class="variable">area</span><span class="punctuation">());</span>
<span class="punctuation">}</span>
<span class="comment">// → 78.54</span>
<span class="comment">// → 48</span>`}</code></pre>
    </div>
  </div>

  <!-- Mapping 3: different results -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual</h3>
      <div class="rounded-lg border border-orange-200 bg-orange-50 p-4">
        <p class="mb-2 text-xs font-bold text-orange-600">Each class has its own implementation:</p>
        <div class="space-y-1">
          <div class="flex items-center gap-2 text-xs">
            <span class="font-bold text-orange-700">Circle</span>
            <span class="text-slate-500">&rarr;</span>
            <span class="text-slate-600">pi x r x r</span>
          </div>
          <div class="flex items-center gap-2 text-xs">
            <span class="font-bold text-orange-700">Rectangle</span>
            <span class="text-slate-500">&rarr;</span>
            <span class="text-slate-600">w x h</span>
          </div>
          <div class="flex items-center gap-2 text-xs">
            <span class="font-bold text-orange-700">Triangle</span>
            <span class="text-slate-500">&rarr;</span>
            <span class="text-slate-600">(b x h) / 2</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="comment">// Each class defines area() differently</span>

<span class="keyword">class</span> <span class="variable">Circle</span>    <span class="punctuation">{</span> <span class="variable">area</span><span class="punctuation">()</span> <span class="punctuation">{</span> <span class="keyword">return</span> Math<span class="punctuation">.</span>PI <span class="punctuation">*</span> <span class="keyword">this</span><span class="punctuation">.</span><span class="variable">r</span> <span class="punctuation">**</span> <span class="string">2</span><span class="punctuation">;</span> <span class="punctuation">}</span> <span class="punctuation">}</span>
<span class="keyword">class</span> <span class="variable">Rectangle</span> <span class="punctuation">{</span> <span class="variable">area</span><span class="punctuation">()</span> <span class="punctuation">{</span> <span class="keyword">return</span> <span class="keyword">this</span><span class="punctuation">.</span><span class="variable">w</span> <span class="punctuation">*</span> <span class="keyword">this</span><span class="punctuation">.</span><span class="variable">h</span><span class="punctuation">;</span> <span class="punctuation">}</span> <span class="punctuation">}</span>
<span class="keyword">class</span> <span class="variable">Triangle</span>  <span class="punctuation">{</span> <span class="variable">area</span><span class="punctuation">()</span> <span class="punctuation">{</span> <span class="keyword">return</span> <span class="keyword">this</span><span class="punctuation">.</span><span class="variable">b</span> <span class="punctuation">*</span> <span class="keyword">this</span><span class="punctuation">.</span><span class="variable">h</span> <span class="punctuation">/</span> <span class="string">2</span><span class="punctuation">;</span> <span class="punctuation">}</span> <span class="punctuation">}</span>

<span class="comment">// The caller doesn't care which type!</span>
<span class="keyword">function</span> <span class="variable">printArea</span><span class="punctuation">(</span><span class="variable">shape</span><span class="punctuation">)</span> <span class="punctuation">{</span>
  console<span class="punctuation">.</span>log<span class="punctuation">(</span><span class="variable">shape</span><span class="punctuation">.</span><span class="variable">area</span><span class="punctuation">());</span>
<span class="punctuation">}</span>`}</code></pre>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
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
  .code-block :global(.keyword)     { color: #60a5fa; }
  .code-block :global(.variable)    { color: #67e8f9; }
  .code-block :global(.string)      { color: #4ade80; }
  .code-block :global(.comment)     { color: #64748b; }
  .code-block :global(.punctuation) { color: #facc15; }
</style>
