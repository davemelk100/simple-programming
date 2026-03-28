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

  // === Basic mode state ===
  let greeting = $state('Hello, Gopher!');

  let greetingLength = $derived(greeting.length);
  let containsHello = $derived(greeting.toLowerCase().includes('hello'));

  // === Advanced mode state ===
  interface Goroutine {
    id: number;
    label: string;
    progress: number;
    done: boolean;
    result: string;
  }

  let goroutines: Goroutine[] = $state([]);
  let channelOutput: string[] = $state([]);
  let nextId = $state(1);
  let intervals: number[] = [];

  const tasks = [
    { label: 'Fetch users', result: '[]User{alice, bob, charlie}' },
    { label: 'Process data', result: 'processed 1,024 records' },
    { label: 'Send emails', result: 'sent 3 notifications' },
    { label: 'Compress files', result: 'archive.tar.gz (2.4MB)' },
    { label: 'Query database', result: 'rows: 42' },
  ];

  function launchGoroutine() {
    const task = tasks[(nextId - 1) % tasks.length];
    const id = nextId++;
    const g: Goroutine = {
      id,
      label: task.label,
      progress: 0,
      done: false,
      result: task.result,
    };
    goroutines.push(g);

    const speed = 15 + Math.random() * 25;
    const interval = setInterval(() => {
      const found = goroutines.find((gr) => gr.id === id);
      if (!found) {
        clearInterval(interval);
        return;
      }
      found.progress = Math.min(100, found.progress + speed / 10);
      if (found.progress >= 100 && !found.done) {
        found.done = true;
        channelOutput = [...channelOutput, `goroutine #${id}: ${found.result}`];
        clearInterval(interval);
      }
    }, 50);
    intervals.push(interval);
  }

  function resetGoroutines() {
    intervals.forEach(clearInterval);
    intervals = [];
    goroutines = [];
    channelOutput = [];
    nextId = 1;
  }

  onMount(() => {
    return () => intervals.forEach(clearInterval);
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Hello Go</h2>
    <p class="text-slate-600">
      Type a greeting below and see how Go would process it. The code and output update live!
    </p>
  </div>

  <!-- Input -->
  <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
    <label class="mb-2 block text-sm font-semibold text-slate-700">Your greeting:</label>
    <input
      type="text"
      bind:value={greeting}
      class="w-full rounded-lg border border-sky-300 bg-white px-4 py-3 text-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
      placeholder="Type a greeting..."
    />
  </div>

  <!-- Output -->
  <div class="rounded-xl border-2 border-sky-200 bg-white p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Output</h3>
    <div class="space-y-2 rounded-lg bg-slate-900 p-4 font-mono text-sm text-slate-100">
      <div>
        <span class="text-slate-400">Greeting:</span>
        <span class="text-green-400">{greeting || '(empty)'}</span>
      </div>
      <div>
        <span class="text-slate-400">Length:</span>
        <span class="text-yellow-300">{greetingLength}</span>
        <span class="text-slate-500"> characters</span>
      </div>
      <div>
        <span class="text-slate-400">Contains "hello":</span>
        <span class="{containsHello ? 'text-green-400' : 'text-red-400'}">{containsHello}</span>
      </div>
    </div>
  </div>

  <!-- Live Go code -->
  <div>
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-slate-500">The Go code</h3>
    <pre class="code-block"><code>{@html `<span class="kw">package</span> <span class="var">main</span>

<span class="kw">import</span> (
    <span class="str">"fmt"</span>
    <span class="str">"strings"</span>
)

<span class="kw">func</span> <span class="fn">main</span>() {
    <span class="var">greeting</span> <span class="op">:=</span> <span class="str">"${greeting.replace(/"/g, '\\"')}"</span>

    <span class="fn">fmt.Println</span>(<span class="str">"Greeting:"</span>, <span class="var">greeting</span>)
    <span class="fn">fmt.Println</span>(<span class="str">"Length:"</span>, <span class="fn">len</span>(<span class="var">greeting</span>))
    <span class="fn">fmt.Println</span>(<span class="str">"Contains hello:"</span>, <span class="fn">strings.Contains</span>(
        <span class="fn">strings.ToLower</span>(<span class="var">greeting</span>), <span class="str">"hello"</span>,
    ))
}`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-cyan-200 bg-cyan-50 p-5">
    <p class="text-sm text-slate-700">
      Notice how Go uses <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">:=</code>
      for short variable declarations and <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">len()</code>
      as a built-in function rather than a method. Go's standard library (like
      <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">strings</code>) is extensive
      and well-documented.
    </p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95"
    >
      Done exploring
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Goroutine Visualizer</h2>
    <p class="text-slate-600">
      Launch goroutines and watch them execute concurrently. Results arrive through a channel
      as each goroutine completes.
    </p>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-3">
    <button
      onclick={launchGoroutine}
      class="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95"
    >
      Launch goroutine
    </button>
    <button
      onclick={resetGoroutines}
      class="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-95"
    >
      Reset
    </button>
  </div>

  <!-- Goroutine visualization -->
  <div class="grid gap-6 lg:grid-cols-2">
    <!-- Running goroutines -->
    <div>
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Goroutines</h3>
      {#if goroutines.length === 0}
        <div class="rounded-xl border-2 border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
          No goroutines running. Click "Launch goroutine" to start.
        </div>
      {:else}
        <div class="space-y-3">
          {#each goroutines as g (g.id)}
            <div class="rounded-lg border border-slate-200 bg-white p-3 transition-colors {g.done ? 'border-green-300 bg-green-50' : ''}">
              <div class="mb-1 flex items-center justify-between">
                <span class="text-sm font-semibold text-slate-700">
                  <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">go</code>
                  #{g.id}: {g.label}
                </span>
                <span class="text-xs {g.done ? 'text-green-600 font-semibold' : 'text-slate-400'}">
                  {g.done ? 'done' : `${Math.round(g.progress)}%`}
                </span>
              </div>
              <div class="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  class="h-full rounded-full transition-all duration-100 {g.done ? 'bg-green-500' : 'bg-sky-500'}"
                  style="width: {g.progress}%"
                ></div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Channel output -->
    <div>
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
        Channel Output
        <code class="ml-1 rounded bg-slate-100 px-1 text-xs text-blue-700">&lt;-ch</code>
      </h3>
      <div class="min-h-[200px] rounded-lg bg-slate-900 p-4 font-mono text-sm">
        {#if channelOutput.length === 0}
          <span class="text-slate-500">// waiting for results on channel...</span>
        {:else}
          {#each channelOutput as msg, i}
            <div class="text-green-400">{msg}</div>
          {/each}
        {/if}
      </div>
    </div>
  </div>

  <!-- Equivalent Go code -->
  <div>
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-slate-500">Equivalent Go Code</h3>
    <pre class="code-block"><code>{@html `<span class="kw">package</span> <span class="var">main</span>

<span class="kw">import</span> (
    <span class="str">"fmt"</span>
    <span class="str">"sync"</span>
)

<span class="kw">func</span> <span class="fn">worker</span>(<span class="arg">id</span> <span class="var">int</span>, <span class="arg">task</span> <span class="var">string</span>, <span class="arg">ch</span> <span class="kw">chan</span> <span class="var">string</span>) {
    <span class="cmt">// simulate work...</span>
    <span class="var">result</span> <span class="op">:=</span> <span class="fn">fmt.Sprintf</span>(<span class="str">"goroutine #%d: completed %s"</span>, <span class="var">id</span>, <span class="var">task</span>)
    <span class="var">ch</span> <span class="op"><-</span> <span class="var">result</span>  <span class="cmt">// send result to channel</span>
}

<span class="kw">func</span> <span class="fn">main</span>() {
    <span class="var">ch</span> <span class="op">:=</span> <span class="fn">make</span>(<span class="kw">chan</span> <span class="var">string</span>, <span class="num">5</span>)
    <span class="var">tasks</span> <span class="op">:=</span> []<span class="var">string</span>{<span class="str">"fetch"</span>, <span class="str">"process"</span>, <span class="str">"email"</span>}

    <span class="kw">for</span> <span class="var">i</span>, <span class="var">t</span> <span class="op">:=</span> <span class="kw">range</span> <span class="var">tasks</span> {
        <span class="kw">go</span> <span class="fn">worker</span>(<span class="var">i</span><span class="op">+</span><span class="num">1</span>, <span class="var">t</span>, <span class="var">ch</span>)  <span class="cmt">// launch goroutine</span>
    }

    <span class="kw">for</span> <span class="var">i</span> <span class="op">:=</span> <span class="num">0</span>; <span class="var">i</span> <span class="op"><</span> <span class="fn">len</span>(<span class="var">tasks</span>); <span class="var">i</span><span class="op">++</span> {
        <span class="fn">fmt.Println</span>(<span class="op"><-</span><span class="var">ch</span>)  <span class="cmt">// receive from channel</span>
    }
}`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-cyan-200 bg-cyan-50 p-5">
    <p class="text-sm text-slate-700">
      Each goroutine runs independently on its own timeline. The
      <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">chan</code> keyword creates
      a channel -- a typed conduit for passing data between goroutines. Sends
      (<code class="rounded bg-slate-100 px-1 text-sm text-blue-700">ch &lt;- val</code>) block
      until a receiver is ready, and receives
      (<code class="rounded bg-slate-100 px-1 text-sm text-blue-700">&lt;-ch</code>) block
      until a value is available. This makes concurrent code safe by design.
    </p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95"
    >
      Done exploring
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
