<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleSteps = $state(0);

  const steps = [
    { emoji: '🔍', title: 'Reproduce', desc: 'Make the bug happen again, reliably. If you can\'t reproduce it, you can\'t fix it.' },
    { emoji: '🎯', title: 'Isolate', desc: 'Narrow down where the problem is. Which file? Which function? Which line?' },
    { emoji: '🔧', title: 'Fix', desc: 'Change the code to correct the behavior. Keep the fix as small and focused as possible.' },
    { emoji: '✅', title: 'Verify', desc: 'Confirm the bug is gone and you haven\'t broken anything else.' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleSteps < steps.length) {
        visibleSteps++;
      } else {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">What Is Debugging?</h2>
    <p class="text-slate-600">
      Debugging is the process of <strong>finding and fixing bugs</strong> in your code. Think of it like being a <strong>detective</strong>: you gather clues (error messages, logs, unexpected behavior), form hypotheses about what went wrong, and test them until you find the culprit.
    </p>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">The Debugging Process</h3>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {#each steps as step, i}
        <div
          class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5 text-center transition-all duration-700
            {i < visibleSteps ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
        >
          <div class="mb-2 text-4xl">{step.emoji}</div>
          <h3 class="mb-1 font-bold text-slate-800">{step.title}</h3>
          <p class="text-sm text-slate-600">{step.desc}</p>
        </div>
      {/each}
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">console.log vs debugger</h3>
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
        <h4 class="mb-1 font-bold text-orange-700">console.log</h4>
        <p class="text-sm text-slate-600 mb-2">The simplest debugging tool. Add a line to print a value, run the code, check the output. Quick and easy, but you have to remove the logs when done.</p>
        <pre class="code-block"><code>{@html `<span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"user:"</span>, <span class="var">user</span>);
<span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"total:"</span>, <span class="var">total</span>);`}</code></pre>
      </div>
      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
        <h4 class="mb-1 font-bold text-orange-700">debugger</h4>
        <p class="text-sm text-slate-600 mb-2">Pauses your code and opens DevTools, letting you inspect every variable, step through code line by line, and explore the call stack.</p>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">calculate</span>(<span class="arg">items</span>) {
  <span class="kw">debugger</span>; <span class="cmt">// Pauses here!</span>
  <span class="kw">return</span> <span class="var">items</span>.<span class="fn">reduce</span>(...);
}`}</code></pre>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Reading Error Messages</h3>
    <p class="text-slate-600">
      Error messages are <strong>not punishments</strong> — they're <strong>clues</strong>. Every error tells you two things: <strong>what went wrong</strong> and <strong>where it happened</strong>.
    </p>
    <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
      <pre class="code-block"><code>{@html `<span class="str">TypeError</span>: Cannot read properties of <span class="kw">undefined</span>
    (reading <span class="str">'name'</span>)
    at <span class="fn">getUser</span> (<span class="var">app.js</span>:<span class="num">42</span>:<span class="num">15</span>)
    at <span class="fn">handleClick</span> (<span class="var">app.js</span>:<span class="num">28</span>:<span class="num">7</span>)`}</code></pre>
      <ul class="mt-3 space-y-2 text-sm text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>TypeError:</strong> The type of error — you tried to use something that doesn't have the property you asked for.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>Cannot read 'name':</strong> The specific property that failed.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>app.js:42:15:</strong> The file, line number, and column where it happened.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>Stack trace:</strong> Shows the chain of function calls that led to the error.</span>
        </li>
      </ul>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
    >
      I understand debugging
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Debugging (Advanced)</h2>
      <p class="text-slate-600">Professional debugging techniques, tools, and strategies for complex problems.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Browser DevTools</h3>
      <p class="text-slate-600">
        Chrome DevTools is a powerful debugging environment built into your browser. Key tabs:
      </p>
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="font-bold text-orange-700">Sources (Breakpoints)</h4>
          <p class="text-sm text-slate-600">Set breakpoints by clicking a line number. When code hits that line, execution pauses and you can inspect every variable. Step through code one line at a time.</p>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="font-bold text-orange-700">Network Tab</h4>
          <p class="text-sm text-slate-600">See every HTTP request your app makes: status codes, headers, request/response bodies, timing. Essential for debugging API issues.</p>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="font-bold text-orange-700">Performance Profiler</h4>
          <p class="text-sm text-slate-600">Record a timeline of everything the browser does: JavaScript execution, rendering, layout. Find bottlenecks causing slow pages.</p>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="font-bold text-orange-700">Console</h4>
          <p class="text-sm text-slate-600">Run JavaScript live, inspect objects, see errors and warnings. Use console.table() for structured data and console.trace() for call stacks.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Node.js Debugging</h3>
      <p class="text-slate-600">
        Debug server-side code using the <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">--inspect</code> flag, which lets Chrome DevTools connect to your Node process.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt"># Start Node with debugging enabled</span>
<span class="var">node</span> <span class="op">--</span>inspect <span class="var">server.js</span>

<span class="cmt"># Or break on the first line</span>
<span class="var">node</span> <span class="op">--</span>inspect-brk <span class="var">server.js</span>

<span class="cmt"># Then open chrome://inspect in Chrome</span>
<span class="cmt"># and click "inspect" on your Node process</span>`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Source Maps</h3>
      <p class="text-slate-600">
        When you use TypeScript, bundlers, or minifiers, the code in the browser is different from your source code. <strong>Source maps</strong> translate compiled code back to the original, so you can debug your actual source files in DevTools.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// In your bundler config (e.g., vite.config.ts)</span>
<span class="kw">export default</span> {
  <span class="var">build</span>: {
    <span class="var">sourcemap</span>: <span class="kw">true</span>  <span class="cmt">// Generates .map files</span>
  }
}`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Debugging Async Code</h3>
      <p class="text-slate-600">
        Async bugs are tricky because errors can get swallowed by unhandled promises, and stack traces may be incomplete. Tips:
      </p>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span>Always use <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">try/catch</code> around <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">await</code> calls.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span>Enable "Pause on caught exceptions" in DevTools to catch swallowed errors.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span>Use <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">window.addEventListener('unhandledrejection', ...)</code> to catch missed promise rejections.</span>
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Rubber Duck Debugging</h3>
      <p class="text-slate-600">
        Explain the problem out loud, line by line, to a rubber duck (or any inanimate object). The act of <strong>articulating the problem</strong> often reveals the solution. This works because it forces you to slow down and think through your assumptions.
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">git bisect</h3>
      <p class="text-slate-600">
        When you know a bug didn't exist before but does now, <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">git bisect</code> performs a binary search through your commit history to find the exact commit that introduced the bug.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt"># Start the bisect process</span>
<span class="var">git</span> bisect start

<span class="cmt"># Mark the current (broken) commit as bad</span>
<span class="var">git</span> bisect bad

<span class="cmt"># Mark a known good commit (e.g., from last week)</span>
<span class="var">git</span> bisect good <span class="var">abc1234</span>

<span class="cmt"># Git checks out a commit in the middle</span>
<span class="cmt"># Test it, then mark it good or bad:</span>
<span class="var">git</span> bisect good  <span class="cmt"># or: git bisect bad</span>

<span class="cmt"># Repeat until Git finds the first bad commit</span>
<span class="cmt"># When done:</span>
<span class="var">git</span> bisect reset`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Debugging Memory Leaks</h3>
      <p class="text-slate-600">
        Memory leaks happen when your app holds references to objects it no longer needs. Use the <strong>Memory tab</strong> in DevTools to take heap snapshots and compare them over time. Look for objects that keep growing.
      </p>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>Common causes:</strong> Event listeners not cleaned up, timers not cleared, closures holding references, DOM nodes detached but still referenced.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>Detection:</strong> Take a heap snapshot, perform an action, take another snapshot, compare. Leaked objects show up as retained objects.</span>
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Production Debugging</h3>
      <p class="text-slate-600">
        You can't open DevTools on a user's browser. Instead, use <strong>structured logging</strong> and <strong>error tracking</strong> services like Sentry to capture errors, stack traces, and context from real users in production.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Sentry captures errors automatically</span>
<span class="kw">import</span> <span class="op">*</span> <span class="kw">as</span> <span class="var">Sentry</span> <span class="kw">from</span> <span class="str">'@sentry/browser'</span>;

<span class="var">Sentry</span>.<span class="fn">init</span>({
  <span class="var">dsn</span>: <span class="str">'https://your-dsn@sentry.io/123'</span>,
  <span class="var">tracesSampleRate</span>: <span class="num">0.1</span>,  <span class="cmt">// Sample 10% of transactions</span>
});

<span class="cmt">// Errors are captured with full context:</span>
<span class="cmt">// - Stack trace with source maps</span>
<span class="cmt">// - Browser, OS, device info</span>
<span class="cmt">// - Breadcrumbs (user actions before the error)</span>`}</code></pre>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
      >
        I understand debugging
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
