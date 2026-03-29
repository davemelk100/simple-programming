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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Calling an LLM from Code</h2>
    <p class="text-slate-600">Here is how you interact with an LLM programmatically using an API. Most LLM providers follow a similar pattern.</p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Basic API Call (Python)</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># Install the library: pip install anthropic</span>
<span class="kw">import</span> <span class="var">anthropic</span>

<span class="cmt"># Create a client</span>
<span class="var">client</span> <span class="op">=</span> <span class="var">anthropic</span>.<span class="fn">Anthropic</span>(<span class="arg">api_key</span><span class="op">=</span><span class="str">"your-api-key"</span>)

<span class="cmt"># Send a message to the model</span>
<span class="var">message</span> <span class="op">=</span> <span class="var">client</span>.<span class="var">messages</span>.<span class="fn">create</span>(
    <span class="arg">model</span><span class="op">=</span><span class="str">"claude-sonnet-4-20250514"</span>,
    <span class="arg">max_tokens</span><span class="op">=</span><span class="num">1024</span>,
    <span class="arg">messages</span><span class="op">=</span>[
        {<span class="str">"role"</span>: <span class="str">"user"</span>, <span class="str">"content"</span>: <span class="str">"What is a variable in programming?"</span>}
    ]
)

<span class="cmt"># Print the response</span>
<span class="fn">print</span>(<span class="var">message</span>.<span class="var">content</span>[<span class="num">0</span>].<span class="var">text</span>)`}</code></pre>
    <p class="text-sm text-slate-500">The model, max_tokens, and messages are the core parameters. The messages array holds the conversation history.</p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Multi-Turn Conversation</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># A conversation is just a list of messages</span>
<span class="var">messages</span> <span class="op">=</span> [
    {<span class="str">"role"</span>: <span class="str">"user"</span>, <span class="str">"content"</span>: <span class="str">"What is Python?"</span>},
    {<span class="str">"role"</span>: <span class="str">"assistant"</span>, <span class="str">"content"</span>: <span class="str">"Python is a popular programming language..."</span>},
    {<span class="str">"role"</span>: <span class="str">"user"</span>, <span class="str">"content"</span>: <span class="str">"What is it used for?"</span>},
]

<span class="cmt"># The model sees the full conversation and responds in context</span>
<span class="var">response</span> <span class="op">=</span> <span class="var">client</span>.<span class="var">messages</span>.<span class="fn">create</span>(
    <span class="arg">model</span><span class="op">=</span><span class="str">"claude-sonnet-4-20250514"</span>,
    <span class="arg">max_tokens</span><span class="op">=</span><span class="num">1024</span>,
    <span class="arg">messages</span><span class="op">=</span><span class="var">messages</span>
)`}</code></pre>
    <p class="text-sm text-slate-500">Each call sends the entire conversation. The model has no memory between calls — you must include previous messages for context.</p>
  </div>

  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h4 class="font-bold text-slate-800 mb-2">Key Takeaways</h4>
    <ul class="space-y-1 text-sm text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span>LLMs are stateless — you send the full conversation each time</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><strong>max_tokens</strong> controls how long the response can be</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span>Always handle errors — API calls can fail due to rate limits or network issues</span>
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      I understand LLM API basics
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Advanced LLM API Patterns</h2>
      <p class="text-slate-600">Streaming, system prompts, structured output, and production-ready patterns.</p>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">System Prompts</h3>
      <pre class="code-block"><code>{@html `<span class="cmt"># System prompts set the model's behavior and persona</span>
<span class="var">response</span> <span class="op">=</span> <span class="var">client</span>.<span class="var">messages</span>.<span class="fn">create</span>(
    <span class="arg">model</span><span class="op">=</span><span class="str">"claude-sonnet-4-20250514"</span>,
    <span class="arg">max_tokens</span><span class="op">=</span><span class="num">1024</span>,
    <span class="arg">system</span><span class="op">=</span><span class="str">"You are a Python tutor. Explain concepts simply. Use examples."</span>,
    <span class="arg">messages</span><span class="op">=</span>[
        {<span class="str">"role"</span>: <span class="str">"user"</span>, <span class="str">"content"</span>: <span class="str">"Explain list comprehensions"</span>}
    ]
)`}</code></pre>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Streaming Responses</h3>
      <pre class="code-block"><code>{@html `<span class="cmt"># Stream tokens as they are generated (much better UX)</span>
<span class="kw">with</span> <span class="var">client</span>.<span class="var">messages</span>.<span class="fn">stream</span>(
    <span class="arg">model</span><span class="op">=</span><span class="str">"claude-sonnet-4-20250514"</span>,
    <span class="arg">max_tokens</span><span class="op">=</span><span class="num">1024</span>,
    <span class="arg">messages</span><span class="op">=</span>[{<span class="str">"role"</span>: <span class="str">"user"</span>, <span class="str">"content"</span>: <span class="str">"Write a poem"</span>}]
) <span class="kw">as</span> <span class="var">stream</span>:
    <span class="kw">for</span> <span class="var">text</span> <span class="kw">in</span> <span class="var">stream</span>.<span class="fn">text_stream</span>:
        <span class="fn">print</span>(<span class="var">text</span>, <span class="arg">end</span><span class="op">=</span><span class="str">""</span>, <span class="arg">flush</span><span class="op">=</span><span class="num">True</span>)`}</code></pre>
      <p class="text-sm text-slate-500">Streaming shows text as it is generated instead of waiting for the full response. Essential for chat UIs.</p>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Error Handling & Retries</h3>
      <pre class="code-block"><code>{@html `<span class="kw">import</span> <span class="var">time</span>
<span class="kw">from</span> <span class="var">anthropic</span> <span class="kw">import</span> <span class="var">RateLimitError</span>, <span class="var">APIError</span>

<span class="kw">def</span> <span class="fn">call_with_retry</span>(<span class="arg">messages</span>, <span class="arg">retries</span><span class="op">=</span><span class="num">3</span>):
    <span class="kw">for</span> <span class="var">attempt</span> <span class="kw">in</span> <span class="fn">range</span>(<span class="var">retries</span>):
        <span class="kw">try</span>:
            <span class="kw">return</span> <span class="var">client</span>.<span class="var">messages</span>.<span class="fn">create</span>(
                <span class="arg">model</span><span class="op">=</span><span class="str">"claude-sonnet-4-20250514"</span>,
                <span class="arg">max_tokens</span><span class="op">=</span><span class="num">1024</span>,
                <span class="arg">messages</span><span class="op">=</span><span class="var">messages</span>
            )
        <span class="kw">except</span> <span class="var">RateLimitError</span>:
            <span class="var">time</span>.<span class="fn">sleep</span>(<span class="num">2</span> <span class="op">**</span> <span class="var">attempt</span>)  <span class="cmt"># Exponential backoff</span>
        <span class="kw">except</span> <span class="var">APIError</span> <span class="kw">as</span> <span class="var">e</span>:
            <span class="fn">print</span>(<span class="str">f"API error: </span><span class="var">{e}</span><span class="str">"</span>)
            <span class="kw">raise</span>`}</code></pre>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
      >
        I know the advanced API patterns
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
