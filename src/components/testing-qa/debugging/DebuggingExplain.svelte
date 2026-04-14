<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleSections = $state(0);
  onMount(() => {
    const interval = setInterval(() => {
      if (visibleSections < 4) visibleSections++;
      else clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <p class="text-slate-600">
      Debugging is the process of <strong>finding and fixing bugs</strong> in your code. Think of yourself as a <strong>detective for code</strong> — you gather clues from error messages, unexpected behavior, and logs, then track down the culprit and bring it to justice.
    </p>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">The Debugging Process</h3>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {#each [
        { emoji: '🔍', title: 'Reproduce', desc: 'Make the bug happen again, reliably. If you can\'t trigger it on demand, you can\'t study it.' },
        { emoji: '🎯', title: 'Isolate', desc: 'Narrow down where the problem lives. Which file? Which function? Which line?' },
        { emoji: '🔧', title: 'Fix', desc: 'Change the code to correct the behavior. Keep your fix small and focused.' },
        { emoji: '✅', title: 'Verify', desc: 'Confirm the bug is gone and you haven\'t broken anything else.' }
      ] as step, i}
        <div
          class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5 text-center transition-all duration-700
            {i < visibleSections ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
        >
          <div class="mb-2 text-4xl">{step.emoji}</div>
          <h3 class="mb-1 font-bold text-slate-800">{step.title}</h3>
          <p class="text-sm text-slate-600">{step.desc}</p>
        </div>
      {/each}
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Common Bug Types</h3>
    <div class="grid gap-3 sm:grid-cols-2">
      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
        <h4 class="mb-1 font-bold text-orange-700">Syntax Errors</h4>
        <p class="text-sm text-slate-600">Typos, missing brackets, or misplaced punctuation. The code won't even run. Your editor and the browser will usually point right to these.</p>
      </div>
      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
        <h4 class="mb-1 font-bold text-orange-700">Logic Errors</h4>
        <p class="text-sm text-slate-600">The code runs but produces wrong results. For example, using <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">+</code> instead of <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">-</code>, or checking the wrong condition in an if-statement.</p>
      </div>
      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
        <h4 class="mb-1 font-bold text-orange-700">Off-by-One Errors</h4>
        <p class="text-sm text-slate-600">A loop runs one too many or one too few times. Usually caused by using <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">&lt;=</code> instead of <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">&lt;</code> or starting at 1 instead of 0.</p>
      </div>
      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
        <h4 class="mb-1 font-bold text-orange-700">Null References</h4>
        <p class="text-sm text-slate-600">Trying to use a value that is <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">null</code> or <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">undefined</code>. The classic "Cannot read properties of undefined" error.</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">console.log: The Simplest Debugging Tool</h3>
    <p class="text-slate-600">
      When something goes wrong, the fastest way to understand what's happening is to <strong>print values</strong> to the console. Add a <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">console.log</code> before the line that fails, run the code, and see what you're working with.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Something is wrong with the total...</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"items:"</span>, <span class="var">items</span>);
<span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"price:"</span>, <span class="var">items</span>[<span class="num">0</span>].<span class="var">price</span>);
<span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"total:"</span>, <span class="var">total</span>);

<span class="cmt">// Label your logs so you know which is which!</span>
<span class="cmt">// Bad:  console.log(x);</span>
<span class="cmt">// Good: console.log("user age:", x);</span>`}</code></pre>
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
      <p class="text-slate-600">Professional debugging techniques, tools, and strategies for tracking down complex problems.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Browser DevTools</h3>
      <p class="text-slate-600">Chrome DevTools gives you far more power than console.log. Master these features:</p>
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="font-bold text-orange-700">Breakpoints</h4>
          <p class="text-sm text-slate-600">Click a line number in the Sources tab to set a breakpoint. When code reaches that line, execution pauses and you can inspect every variable in scope. Step through code one line at a time.</p>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="font-bold text-orange-700">Watch Expressions</h4>
          <p class="text-sm text-slate-600">Add expressions to the Watch panel to monitor specific values as you step through code. Watch <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">user.name</code>, <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">arr.length</code>, or any expression you want to track.</p>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="font-bold text-orange-700">Call Stack</h4>
          <p class="text-sm text-slate-600">When paused at a breakpoint, the Call Stack panel shows the chain of function calls that led to the current line. Click any frame to jump to that function's context.</p>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="font-bold text-orange-700">Network Tab</h4>
          <p class="text-sm text-slate-600">See every HTTP request your app makes: status codes, headers, request/response bodies, and timing. Filter by type, status, or URL to find exactly what you need.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Debugging Strategies</h3>
      <div class="space-y-3">
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-orange-700">Binary Search Debugging</h4>
          <p class="text-sm text-slate-600">Comment out half the code. Does the bug still happen? If yes, it's in the remaining half. Repeat until you find the exact line. Works great for narrowing down large files.</p>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-orange-700">Rubber Duck Debugging</h4>
          <p class="text-sm text-slate-600">Explain the problem out loud, line by line, to a rubber duck (or any object). The act of articulating the problem forces you to slow down and think through your assumptions — and often reveals the answer.</p>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-orange-700">git bisect</h4>
          <p class="text-sm text-slate-600">When you know a bug didn't exist before but does now, <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">git bisect</code> performs a binary search through your commit history to find the exact commit that introduced the bug.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Memory Leaks &amp; Performance Debugging</h3>
      <p class="text-slate-600">
        Memory leaks happen when your app holds references to objects it no longer needs. Use the <strong>Memory tab</strong> in DevTools to take heap snapshots and compare them over time.
      </p>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>Common causes:</strong> Event listeners not removed, timers not cleared, closures holding references, detached DOM nodes.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>Performance tab:</strong> Record a timeline to find long-running JavaScript, excessive re-renders, and layout thrashing.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>Detection:</strong> Take two heap snapshots, perform an action between them, then compare. Leaked objects show as "retained objects" that keep growing.</span>
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Reading Stack Traces Effectively</h3>
      <p class="text-slate-600">
        A stack trace reads <strong>top to bottom</strong>. The first line is where the error happened. Each line below shows what called it. Ignore frames from libraries and frameworks — focus on your own code.
      </p>
      <pre class="code-block"><code>{@html `<span class="str">TypeError</span>: Cannot read properties of <span class="kw">undefined</span>
    (reading <span class="str">'name'</span>)
    at <span class="fn">getUser</span>       (<span class="var">app.js</span>:<span class="num">42</span>:<span class="num">15</span>)   <span class="cmt">// &lt;-- Error is HERE</span>
    at <span class="fn">handleClick</span>   (<span class="var">app.js</span>:<span class="num">28</span>:<span class="num">7</span>)    <span class="cmt">// called by this</span>
    at <span class="fn">HTMLButton...</span>  (<span class="var">react-dom.js</span>)  <span class="cmt">// framework — ignore</span>

<span class="cmt">// Key info: file (app.js), line (42), column (15)</span>
<span class="cmt">// The chain: click -> handleClick -> getUser -> CRASH</span>`}</code></pre>
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
  .code-block { background-color: #0f172a;
    color: #e2e8f0; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
