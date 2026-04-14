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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Using Generative AI APIs</h2>
    <p class="text-slate-600">Here is how to call generative AI services for different content types from your code.</p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Text Generation</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># Generate text with Claude</span>
<span class="kw">import</span> <span class="var">anthropic</span>

<span class="var">client</span> <span class="op">=</span> <span class="var">anthropic</span>.<span class="fn">Anthropic</span>()

<span class="var">response</span> <span class="op">=</span> <span class="var">client</span>.<span class="var">messages</span>.<span class="fn">create</span>(
    <span class="arg">model</span><span class="op">=</span><span class="str">"claude-sonnet-4-20250514"</span>,
    <span class="arg">max_tokens</span><span class="op">=</span><span class="num">256</span>,
    <span class="arg">messages</span><span class="op">=</span>[{
        <span class="str">"role"</span>: <span class="str">"user"</span>,
        <span class="str">"content"</span>: <span class="str">"Write a product description for wireless earbuds"</span>
    }]
)

<span class="fn">print</span>(<span class="var">response</span>.<span class="var">content</span>[<span class="num">0</span>].<span class="var">text</span>)`}</code></pre>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Code Generation</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># Ask the model to generate code</span>
<span class="var">response</span> <span class="op">=</span> <span class="var">client</span>.<span class="var">messages</span>.<span class="fn">create</span>(
    <span class="arg">model</span><span class="op">=</span><span class="str">"claude-sonnet-4-20250514"</span>,
    <span class="arg">max_tokens</span><span class="op">=</span><span class="num">1024</span>,
    <span class="arg">system</span><span class="op">=</span><span class="str">"You are a Python expert. Return only code, no explanations."</span>,
    <span class="arg">messages</span><span class="op">=</span>[{
        <span class="str">"role"</span>: <span class="str">"user"</span>,
        <span class="str">"content"</span>: <span class="str">"Write a function that checks if a string is a palindrome"</span>
    }]
)

<span class="cmt"># The response contains the generated code</span>
<span class="var">code</span> <span class="op">=</span> <span class="var">response</span>.<span class="var">content</span>[<span class="num">0</span>].<span class="var">text</span>
<span class="fn">print</span>(<span class="var">code</span>)`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
    <h4 class="font-bold text-slate-800 mb-2">Tips for Better Generation</h4>
    <ul class="space-y-1 text-sm text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <span>Be specific in your prompts — "Write a REST API endpoint" is better than "Write some code"</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <span>Use system prompts to set the format and style of output</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <span>Always review and test generated code before using it in production</span>
      </li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
      I understand generative AI APIs
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Advanced: Structured Generation</h2>
      <p class="text-slate-600">Techniques for controlling output format and integrating generative AI into production systems.</p>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">JSON Mode / Structured Output</h3>
      <pre class="code-block"><code>{@html `<span class="cmt"># Force the model to output valid JSON</span>
<span class="var">response</span> <span class="op">=</span> <span class="var">client</span>.<span class="var">messages</span>.<span class="fn">create</span>(
    <span class="arg">model</span><span class="op">=</span><span class="str">"claude-sonnet-4-20250514"</span>,
    <span class="arg">max_tokens</span><span class="op">=</span><span class="num">1024</span>,
    <span class="arg">system</span><span class="op">=</span><span class="str">"""Extract product info as JSON with keys:
name, price, category, description.
Return ONLY valid JSON, no markdown."""</span>,
    <span class="arg">messages</span><span class="op">=</span>[{
        <span class="str">"role"</span>: <span class="str">"user"</span>,
        <span class="str">"content"</span>: <span class="str">"The Nike Air Max 90 retails for $130. It's a classic running shoe."</span>
    }]
)

<span class="kw">import</span> <span class="var">json</span>
<span class="var">product</span> <span class="op">=</span> <span class="var">json</span>.<span class="fn">loads</span>(<span class="var">response</span>.<span class="var">content</span>[<span class="num">0</span>].<span class="var">text</span>)
<span class="fn">print</span>(<span class="var">product</span>[<span class="str">"name"</span>])  <span class="cmt"># "Nike Air Max 90"</span>`}</code></pre>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Chaining Generations</h3>
      <pre class="code-block"><code>{@html `<span class="cmt"># Use output of one generation as input to another</span>
<span class="cmt"># Step 1: Generate an outline</span>
<span class="var">outline</span> <span class="op">=</span> <span class="var">client</span>.<span class="var">messages</span>.<span class="fn">create</span>(
    <span class="arg">model</span><span class="op">=</span><span class="str">"claude-sonnet-4-20250514"</span>,
    <span class="arg">max_tokens</span><span class="op">=</span><span class="num">512</span>,
    <span class="arg">messages</span><span class="op">=</span>[{<span class="str">"role"</span>: <span class="str">"user"</span>,
        <span class="str">"content"</span>: <span class="str">"Create a 3-point outline for a blog about AI safety"</span>}]
)

<span class="cmt"># Step 2: Expand each section using the outline</span>
<span class="var">article</span> <span class="op">=</span> <span class="var">client</span>.<span class="var">messages</span>.<span class="fn">create</span>(
    <span class="arg">model</span><span class="op">=</span><span class="str">"claude-sonnet-4-20250514"</span>,
    <span class="arg">max_tokens</span><span class="op">=</span><span class="num">2048</span>,
    <span class="arg">messages</span><span class="op">=</span>[{<span class="str">"role"</span>: <span class="str">"user"</span>,
        <span class="str">"content"</span>: <span class="str">f"Expand this outline into a full article:\\n</span><span class="var">{outline.content[0].text}</span><span class="str">"</span>}]
)`}</code></pre>
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
        I know advanced generation patterns
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
