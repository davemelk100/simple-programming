<script lang="ts">
  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();
</script>

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
  .code-block :global(.comment)     { color: #475569; }
  .code-block :global(.punctuation) { color: #fcd34d; }
</style>
