<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Working with Copilots in Practice</h2>
    <p class="text-slate-600">Tips and patterns for getting the best results from your AI coding assistant.</p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Comment-Driven Development</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Write a comment first, then let the copilot generate the code</span>

<span class="cmt">// Validate that an email has a valid format,</span>
<span class="cmt">// contains exactly one @, and has a domain with a dot</span>
<span class="kw">function</span> <span class="fn">isValidEmail</span>(<span class="arg">email</span>: <span class="var">string</span>): <span class="var">boolean</span> {
  <span class="cmt">// The copilot generates this based on your comment:</span>
  <span class="kw">const</span> <span class="var">parts</span> <span class="op">=</span> <span class="var">email</span>.<span class="fn">split</span>(<span class="str">'@'</span>);
  <span class="kw">if</span> (<span class="var">parts</span>.<span class="var">length</span> <span class="op">!==</span> <span class="num">2</span>) <span class="kw">return</span> <span class="num">false</span>;
  <span class="kw">const</span> [<span class="var">local</span>, <span class="var">domain</span>] <span class="op">=</span> <span class="var">parts</span>;
  <span class="kw">return</span> <span class="var">local</span>.<span class="var">length</span> <span class="op">></span> <span class="num">0</span> <span class="op">&&</span> <span class="var">domain</span>.<span class="fn">includes</span>(<span class="str">'.'</span>);
}`}</code></pre>
    <p class="text-sm text-slate-500">Write detailed comments describing what you want. The copilot uses them as instructions.</p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Example-Driven Suggestions</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Give the copilot an example, and it will follow the pattern</span>

<span class="cmt">// Convert snake_case to camelCase</span>
<span class="cmt">// "hello_world" -> "helloWorld"</span>
<span class="cmt">// "user_first_name" -> "userFirstName"</span>
<span class="kw">function</span> <span class="fn">toCamelCase</span>(<span class="arg">str</span>: <span class="var">string</span>): <span class="var">string</span> {
  <span class="kw">return</span> <span class="var">str</span>.<span class="fn">replace</span>(<span class="str">/_([a-z])/g</span>, (<span class="var">_</span>, <span class="var">c</span>) <span class="op">=></span> <span class="var">c</span>.<span class="fn">toUpperCase</span>());
}`}</code></pre>
    <p class="text-sm text-slate-500">Including input/output examples dramatically improves suggestion accuracy.</p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Using Chat for Debugging</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// In the chat panel, you might ask:</span>
<span class="cmt">//</span>
<span class="cmt">// "Why does this function return undefined</span>
<span class="cmt">//  when the input array is empty?"</span>
<span class="cmt">//</span>
<span class="cmt">// The copilot will analyze your code and explain:</span>
<span class="cmt">// "The function uses array[0] without checking</span>
<span class="cmt">//  if the array is empty first. Add a guard clause:</span>
<span class="cmt">//  if (array.length === 0) return defaultValue;"</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
      I know copilot best practices
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Advanced Copilot Workflows</h2>
      <p class="text-slate-600">Using terminal copilots for complex multi-file tasks and project-wide changes.</p>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Terminal Copilot: Multi-File Changes</h3>
      <pre class="code-block"><code>{@html `<span class="cmt"># With a terminal copilot like Claude Code, you can</span>
<span class="cmt"># describe complex tasks in natural language:</span>

<span class="var">$</span> <span class="str">"Add error handling to all API routes in src/routes/.</span>
<span class="str">   Each route should catch errors, log them with</span>
<span class="str">   the request ID, and return a proper JSON error</span>
<span class="str">   response with the correct HTTP status code."</span>

<span class="cmt"># The agent will:</span>
<span class="cmt"># 1. Read all files in src/routes/</span>
<span class="cmt"># 2. Analyze each route's error handling</span>
<span class="cmt"># 3. Add consistent try/catch blocks</span>
<span class="cmt"># 4. Import the logger if needed</span>
<span class="cmt"># 5. Run tests to verify nothing broke</span>`}</code></pre>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Refactoring at Scale</h3>
      <pre class="code-block"><code>{@html `<span class="cmt"># Terminal copilots excel at project-wide refactors:</span>

<span class="var">$</span> <span class="str">"Migrate all class components in src/components/</span>
<span class="str">   to functional components with hooks. Preserve all</span>
<span class="str">   existing behavior and update the tests."</span>

<span class="cmt"># Or dependency upgrades:</span>

<span class="var">$</span> <span class="str">"Upgrade from React Router v5 to v6. Update all</span>
<span class="str">   routes, fix the Switch-to-Routes migration, and</span>
<span class="str">   update useHistory to useNavigate everywhere."</span>`}</code></pre>
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
        I know advanced copilot workflows
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
