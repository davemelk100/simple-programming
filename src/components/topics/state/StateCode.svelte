<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();
</script>

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">State in Code</h2>
    <p class="text-sm text-slate-600">The timeline from the visual shows how a variable's value changes over time &mdash; that's state.</p>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual: Counter Timeline</h3>
      <div class="flex items-center gap-2 rounded-lg border border-pink-200 bg-pink-50 p-4 text-xs">
        <div class="flex items-center gap-1">
          <span class="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500 font-bold text-white">1</span>
          <span class="font-mono text-pink-700">count = 0</span>
        </div>
        <span class="text-pink-300">→</span>
        <div class="flex items-center gap-1">
          <span class="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500 font-bold text-white">2</span>
          <span class="font-mono text-pink-700">count = 1</span>
        </div>
        <span class="text-pink-300">→</span>
        <div class="flex items-center gap-1">
          <span class="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500 font-bold text-white">3</span>
          <span class="font-mono text-pink-700">count = 2</span>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code: Updating State</h3>
      <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">count</span> = <span class="num">0</span>;     <span class="cmt">// Step 1: start</span>
<span class="var">count</span> = <span class="var">count</span> + <span class="num">1</span>; <span class="cmt">// Step 2: count is 1</span>
<span class="var">count</span> = <span class="var">count</span> + <span class="num">1</span>; <span class="cmt">// Step 3: count is 2</span>`}</code></pre>
    </div>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">A real counter with events</p>
    <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">count</span> = <span class="num">0</span>;

<span class="kw">function</span> <span class="fn">increment</span>() {
  <span class="var">count</span> = <span class="var">count</span> + <span class="num">1</span>;  <span class="cmt">// state changes here</span>
  <span class="fn">display</span>(<span class="var">count</span>);      <span class="cmt">// show the new value</span>
}

<span class="var">button</span>.<span class="var">onclick</span> = <span class="fn">increment</span>;
<span class="cmt">// each click: 0 → 1 → 2 → 3 ...</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-pink-500 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-600 active:scale-95">
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
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
