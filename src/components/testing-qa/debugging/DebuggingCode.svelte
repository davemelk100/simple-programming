<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Debugging in Code</h2>
    <p class="text-slate-600">Practical debugging techniques you'll use every day. These are your most important tools for finding and fixing bugs.</p>
  </div>

  <!-- console.log, console.table, console.error -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Console Methods</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Basic: print a value</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"user:"</span>, <span class="var">user</span>);
<span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"cart total:"</span>, <span class="var">cart</span>.<span class="var">total</span>);

<span class="cmt">// Table: display arrays/objects as a table</span>
<span class="kw">const</span> <span class="var">users</span> <span class="op">=</span> [
  { <span class="var">name</span>: <span class="str">"Alice"</span>, <span class="var">age</span>: <span class="num">30</span> },
  { <span class="var">name</span>: <span class="str">"Bob"</span>, <span class="var">age</span>: <span class="num">25</span> },
];
<span class="fn">console</span>.<span class="fn">table</span>(<span class="var">users</span>);
<span class="cmt">// Displays a neat table in the console:</span>
<span class="cmt">//  (index) | name    | age</span>
<span class="cmt">//  0       | "Alice" | 30</span>
<span class="cmt">//  1       | "Bob"   | 25</span>

<span class="cmt">// Error: stands out in red in the console</span>
<span class="fn">console</span>.<span class="fn">error</span>(<span class="str">"Failed to load user!"</span>, <span class="var">error</span>);

<span class="cmt">// Warn: shows a yellow warning</span>
<span class="fn">console</span>.<span class="fn">warn</span>(<span class="str">"Deprecated: use newMethod() instead"</span>);`}</code></pre>
  </div>

  <!-- Reading stack traces -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Reading Stack Traces</h3>
    <p class="text-sm text-slate-600">A stack trace is like a trail of breadcrumbs. Read from top to bottom — the first line is where the error happened, and each line below shows what called it.</p>
    <pre class="code-block"><code>{@html `<span class="str">TypeError</span>: Cannot read properties of <span class="kw">null</span>
    (reading <span class="str">'email'</span>)

    at <span class="fn">sendEmail</span>     (<span class="var">email.js</span>:<span class="num">15</span>:<span class="num">22</span>)   <span class="cmt">// &lt;-- Error is HERE</span>
    at <span class="fn">handleSubmit</span>  (<span class="var">form.js</span>:<span class="num">42</span>:<span class="num">5</span>)    <span class="cmt">// called by this</span>
    at <span class="fn">onClick</span>       (<span class="var">button.js</span>:<span class="num">8</span>:<span class="num">3</span>)   <span class="cmt">// which was called by this</span>

<span class="cmt">// Translation: User clicked a button, which called</span>
<span class="cmt">// handleSubmit, which called sendEmail, which tried</span>
<span class="cmt">// to read .email on something that was null.</span>`}</code></pre>
  </div>

  <!-- Common errors and fixes -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Common Errors &amp; Fixes</h3>
    <div class="space-y-3">
      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
        <p class="font-bold text-red-600 text-sm font-mono mb-1">TypeError: Cannot read properties of undefined</p>
        <p class="text-sm text-slate-600 mb-2">You accessed a property on something that doesn't exist yet.</p>
        <pre class="code-block"><code>{@html `<span class="cmt">// Bug: user might be undefined</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">user</span>.<span class="var">name</span>);   <span class="cmt">// CRASH if user is undefined</span>

<span class="cmt">// Fix: check first, or use optional chaining</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">user</span><span class="op">?.</span><span class="var">name</span>);  <span class="cmt">// Returns undefined instead of crashing</span>`}</code></pre>
      </div>

      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
        <p class="font-bold text-red-600 text-sm font-mono mb-1">ReferenceError: x is not defined</p>
        <p class="text-sm text-slate-600 mb-2">You used a variable that doesn't exist. Usually a typo or scope issue.</p>
        <pre class="code-block"><code>{@html `<span class="cmt">// Bug: typo in variable name</span>
<span class="kw">const</span> <span class="var">userName</span> <span class="op">=</span> <span class="str">"Alice"</span>;
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">usrName</span>);  <span class="cmt">// ReferenceError! Typo.</span>

<span class="cmt">// Fix: correct the spelling</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">userName</span>);  <span class="cmt">// Works!</span>`}</code></pre>
      </div>

      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
        <p class="font-bold text-red-600 text-sm font-mono mb-1">SyntaxError: Unexpected token</p>
        <p class="text-sm text-slate-600 mb-2">The code structure is wrong — missing brackets, extra commas, or unclosed strings.</p>
        <pre class="code-block"><code>{@html `<span class="cmt">// Bug: missing closing bracket</span>
<span class="kw">function</span> <span class="fn">greet</span>(<span class="arg">name</span>) {
  <span class="kw">return</span> <span class="str">"Hello, "</span> <span class="op">+</span> <span class="var">name</span>;
<span class="cmt">// Missing } here — SyntaxError!</span>

<span class="cmt">// Fix: add the closing bracket</span>
<span class="kw">function</span> <span class="fn">greet</span>(<span class="arg">name</span>) {
  <span class="kw">return</span> <span class="str">"Hello, "</span> <span class="op">+</span> <span class="var">name</span>;
}`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Using the debugger keyword -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Using the debugger Keyword</h3>
    <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">processOrder</span>(<span class="arg">order</span>) {
  <span class="kw">const</span> <span class="var">subtotal</span> <span class="op">=</span> <span class="var">order</span>.<span class="var">items</span>.<span class="fn">reduce</span>(
    (<span class="arg">sum</span>, <span class="arg">item</span>) <span class="op">=></span> <span class="var">sum</span> <span class="op">+</span> <span class="var">item</span>.<span class="var">price</span>, <span class="num">0</span>
  );

  <span class="kw">debugger</span>;  <span class="cmt">// Execution pauses here!</span>
  <span class="cmt">// Open DevTools to inspect: order, subtotal, tax, total</span>

  <span class="kw">const</span> <span class="var">tax</span> <span class="op">=</span> <span class="var">subtotal</span> <span class="op">*</span> <span class="num">0.1</span>;
  <span class="kw">const</span> <span class="var">total</span> <span class="op">=</span> <span class="var">subtotal</span> <span class="op">+</span> <span class="var">tax</span>;
  <span class="kw">return</span> { <span class="var">subtotal</span>, <span class="var">tax</span>, <span class="var">total</span> };
}

<span class="cmt">// When the browser hits "debugger", it pauses and</span>
<span class="cmt">// you can hover over any variable to see its value,</span>
<span class="cmt">// step line-by-line, or continue running.</span>`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
    <h4 class="mb-2 font-bold text-slate-800">Debugging Checklist</h4>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span>Read the error message carefully — it tells you the type, the property, and the line number.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span>Add <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">console.log</code> before the error line to see what values you have.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span>Check for typos, missing brackets, and off-by-one errors.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span>Use <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">debugger</code> for complex logic where you need to step through line by line.</span>
      </li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Debugging Techniques (Advanced)</h2>
    <p class="text-slate-600">Professional debugging tools and workflows for complex problems.</p>
  </div>

  <!-- Chrome DevTools Breakpoints -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Chrome DevTools Breakpoints</h3>
    <p class="text-sm text-slate-600">Beyond clicking line numbers, DevTools offers specialized breakpoint types for precise debugging.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Conditional breakpoint: only pause when a condition is true</span>
<span class="cmt">// Right-click a line number > "Add conditional breakpoint"</span>
<span class="cmt">// Condition: user.role === "admin"</span>

<span class="cmt">// Logpoint: log without modifying code</span>
<span class="cmt">// Right-click a line > "Add logpoint"</span>
<span class="cmt">// Message: "Processing user:", user.name</span>

<span class="cmt">// DOM breakpoint: pause when a DOM node changes</span>
<span class="cmt">// Right-click element in Elements tab > "Break on..."</span>
<span class="cmt">// Options: subtree modifications, attribute changes, node removal</span>

<span class="cmt">// XHR/Fetch breakpoint: pause when a specific URL is requested</span>
<span class="cmt">// Sources tab > XHR/fetch Breakpoints > "+"</span>
<span class="cmt">// URL contains: "/api/users"</span>

<span class="cmt">// Event listener breakpoint: pause on any event type</span>
<span class="cmt">// Sources tab > Event Listener Breakpoints</span>
<span class="cmt">// Check: Mouse > click, Keyboard > keydown, etc.</span>`}</code></pre>
  </div>

  <!-- Network Tab Filtering -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Network Tab Filtering</h3>
    <p class="text-sm text-slate-600">Filter network requests to find exactly what you're looking for.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Filter by type (buttons at the top of Network tab)</span>
<span class="cmt">// XHR - API requests (fetch/XMLHttpRequest)</span>
<span class="cmt">// JS  - JavaScript files</span>
<span class="cmt">// CSS - Stylesheets</span>
<span class="cmt">// Img - Images</span>
<span class="cmt">// WS  - WebSocket connections</span>

<span class="cmt">// Filter by text: type in the filter bar</span>
<span class="cmt">// "api/users"        - URL contains this text</span>
<span class="cmt">// "status-code:404"  - only 404 responses</span>
<span class="cmt">// "method:POST"      - only POST requests</span>
<span class="cmt">// "-status-code:200" - exclude 200 (show only errors)</span>

<span class="cmt">// Throttling: simulate slow networks</span>
<span class="cmt">// No Throttling > Slow 3G / Fast 3G / Offline</span>

<span class="cmt">// Copy as cURL: right-click any request > Copy > Copy as cURL</span>
<span class="cmt">// Paste into terminal to replay the exact request</span>`}</code></pre>
  </div>

  <!-- Node.js --inspect -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Node.js --inspect Setup</h3>
    <p class="text-sm text-slate-600">Debug server-side Node.js code with Chrome DevTools or VS Code.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Terminal: start with debugger attached</span>
<span class="var">node</span> <span class="op">--</span>inspect <span class="var">server.js</span>
<span class="cmt"># Output: Debugger listening on ws://127.0.0.1:9229/...</span>

<span class="cmt"># Open chrome://inspect in Chrome</span>
<span class="cmt"># Click "inspect" under Remote Target</span>
<span class="cmt"># Full DevTools opens — set breakpoints, inspect variables</span>

<span class="cmt"># Break on first line (useful for startup bugs)</span>
<span class="var">node</span> <span class="op">--</span>inspect-brk <span class="var">server.js</span>

<span class="cmt"># With nodemon for auto-restart</span>
<span class="var">nodemon</span> <span class="op">--</span>inspect <span class="var">server.js</span>`}</code></pre>
  </div>

  <!-- Sentry Error Tracking -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Sentry Error Tracking</h3>
    <p class="text-sm text-slate-600">Capture errors from real users in production with full context and source maps.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Install: npm install @sentry/browser</span>
<span class="kw">import</span> <span class="op">*</span> <span class="kw">as</span> <span class="var">Sentry</span> <span class="kw">from</span> <span class="str">'@sentry/browser'</span>;

<span class="var">Sentry</span>.<span class="fn">init</span>({
  <span class="var">dsn</span>: <span class="str">'https://examplePublicKey@o0.ingest.sentry.io/0'</span>,
  <span class="var">environment</span>: <span class="str">'production'</span>,
  <span class="var">release</span>: <span class="str">'my-app@1.2.3'</span>,
  <span class="var">tracesSampleRate</span>: <span class="num">0.1</span>,  <span class="cmt">// 10% of transactions</span>
});

<span class="cmt">// Errors are captured automatically!</span>
<span class="cmt">// Sentry records:</span>
<span class="cmt">//   - Stack trace (with source maps)</span>
<span class="cmt">//   - Browser, OS, device</span>
<span class="cmt">//   - User actions before the error (breadcrumbs)</span>
<span class="cmt">//   - Custom context you add</span>

<span class="cmt">// Add custom context</span>
<span class="var">Sentry</span>.<span class="fn">setUser</span>({ <span class="var">id</span>: <span class="str">'user-123'</span>, <span class="var">email</span>: <span class="str">'alice@test.com'</span> });

<span class="cmt">// Capture a message (not an error)</span>
<span class="var">Sentry</span>.<span class="fn">captureMessage</span>(<span class="str">'Payment flow completed'</span>);

<span class="cmt">// Capture with extra data</span>
<span class="kw">try</span> {
  <span class="fn">processPayment</span>(<span class="var">order</span>);
} <span class="kw">catch</span> (<span class="var">error</span>) {
  <span class="var">Sentry</span>.<span class="fn">captureException</span>(<span class="var">error</span>, {
    <span class="var">extra</span>: { <span class="var">orderId</span>: <span class="var">order</span>.<span class="var">id</span>, <span class="var">amount</span>: <span class="var">order</span>.<span class="var">total</span> }
  });
}`}</code></pre>
  </div>

  <!-- VS Code launch.json -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Debugging with VS Code launch.json</h3>
    <p class="text-sm text-slate-600">Configure VS Code to debug Node.js, browser apps, and tests with one click.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// .vscode/launch.json</span>
{
  <span class="str">"version"</span>: <span class="str">"0.2.0"</span>,
  <span class="str">"configurations"</span>: [
    {
      <span class="cmt">// Debug a Node.js server</span>
      <span class="str">"name"</span>: <span class="str">"Debug Server"</span>,
      <span class="str">"type"</span>: <span class="str">"node"</span>,
      <span class="str">"request"</span>: <span class="str">"launch"</span>,
      <span class="str">"program"</span>: <span class="str">"\${workspaceFolder}/server.js"</span>,
      <span class="str">"skipFiles"</span>: [<span class="str">"&lt;node_internals&gt;/**"</span>]
    },
    {
      <span class="cmt">// Debug current test file</span>
      <span class="str">"name"</span>: <span class="str">"Debug Tests"</span>,
      <span class="str">"type"</span>: <span class="str">"node"</span>,
      <span class="str">"request"</span>: <span class="str">"launch"</span>,
      <span class="str">"program"</span>: <span class="str">"\${workspaceFolder}/node_modules/.bin/vitest"</span>,
      <span class="str">"args"</span>: [<span class="str">"run"</span>, <span class="str">"\${relativeFile}"</span>],
      <span class="str">"console"</span>: <span class="str">"integratedTerminal"</span>
    },
    {
      <span class="cmt">// Attach to a running process</span>
      <span class="str">"name"</span>: <span class="str">"Attach to Process"</span>,
      <span class="str">"type"</span>: <span class="str">"node"</span>,
      <span class="str">"request"</span>: <span class="str">"attach"</span>,
      <span class="str">"port"</span>: <span class="num">9229</span>
    }
  ]
}`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
    <h4 class="mb-2 font-bold text-slate-800">Pro Debugging Tips</h4>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span><strong>Conditional breakpoints</strong> let you pause only when a specific condition is true — invaluable in loops.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span><strong>Logpoints</strong> log to console without modifying your code — no more forgetting to remove console.log.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span>Use <strong>git bisect</strong> when you know "it worked before" but don't know which commit broke it.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span><strong>Rubber duck debugging</strong> works. Explaining the problem out loud often reveals the answer.</span>
      </li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
      Got it
    </button>
  </div>
</div>
{/if}

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
