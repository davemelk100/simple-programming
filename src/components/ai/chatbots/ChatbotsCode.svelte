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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Building a Chatbot</h2>
    <p class="text-slate-600">Here is how to build a simple chatbot with conversation memory using an LLM API.</p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Basic Chatbot with Memory</h3>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> <span class="var">anthropic</span>

<span class="var">client</span> <span class="op">=</span> <span class="var">anthropic</span>.<span class="fn">Anthropic</span>()
<span class="var">conversation</span> <span class="op">=</span> []  <span class="cmt"># Stores the chat history</span>

<span class="kw">def</span> <span class="fn">chat</span>(<span class="arg">user_message</span>):
    <span class="cmt"># Add user message to history</span>
    <span class="var">conversation</span>.<span class="fn">append</span>({
        <span class="str">"role"</span>: <span class="str">"user"</span>,
        <span class="str">"content"</span>: <span class="var">user_message</span>
    })

    <span class="cmt"># Send full conversation to the model</span>
    <span class="var">response</span> <span class="op">=</span> <span class="var">client</span>.<span class="var">messages</span>.<span class="fn">create</span>(
        <span class="arg">model</span><span class="op">=</span><span class="str">"claude-sonnet-4-20250514"</span>,
        <span class="arg">max_tokens</span><span class="op">=</span><span class="num">1024</span>,
        <span class="arg">system</span><span class="op">=</span><span class="str">"You are a helpful assistant."</span>,
        <span class="arg">messages</span><span class="op">=</span><span class="var">conversation</span>
    )

    <span class="cmt"># Add bot response to history</span>
    <span class="var">bot_reply</span> <span class="op">=</span> <span class="var">response</span>.<span class="var">content</span>[<span class="num">0</span>].<span class="var">text</span>
    <span class="var">conversation</span>.<span class="fn">append</span>({
        <span class="str">"role"</span>: <span class="str">"assistant"</span>,
        <span class="str">"content"</span>: <span class="var">bot_reply</span>
    })

    <span class="kw">return</span> <span class="var">bot_reply</span>

<span class="cmt"># Usage</span>
<span class="fn">print</span>(<span class="fn">chat</span>(<span class="str">"Hi! My name is Alex."</span>))
<span class="fn">print</span>(<span class="fn">chat</span>(<span class="str">"What is my name?"</span>))
<span class="cmt"># The bot remembers: "Your name is Alex!"</span>`}</code></pre>
    <p class="text-sm text-slate-500">The key insight: by sending the full conversation history each time, the bot "remembers" earlier messages.</p>
  </div>

  <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5">
    <h4 class="font-bold text-slate-800 mb-2">Key Pattern</h4>
    <p class="text-sm text-slate-600">
      Every chatbot follows this loop: (1) User sends message, (2) Append to history, (3) Send full history to model, (4) Get response, (5) Append response to history, (6) Show to user. Repeat.
    </p>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95">
      I understand chatbot code
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Advanced Chatbot Architecture</h2>
      <p class="text-slate-600">Production patterns: conversation summarization, RAG integration, and streaming.</p>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Conversation Summarization</h3>
      <pre class="code-block"><code>{@html `<span class="cmt"># When conversation gets too long, summarize older messages</span>
<span class="kw">def</span> <span class="fn">manage_context</span>(<span class="arg">messages</span>, <span class="arg">max_messages</span><span class="op">=</span><span class="num">20</span>):
    <span class="kw">if</span> <span class="fn">len</span>(<span class="var">messages</span>) <span class="op">&lt;=</span> <span class="var">max_messages</span>:
        <span class="kw">return</span> <span class="var">messages</span>

    <span class="cmt"># Summarize older messages</span>
    <span class="var">old_messages</span> <span class="op">=</span> <span class="var">messages</span>[:<span class="op">-</span><span class="num">10</span>]
    <span class="var">recent_messages</span> <span class="op">=</span> <span class="var">messages</span>[<span class="op">-</span><span class="num">10</span>:]

    <span class="var">summary</span> <span class="op">=</span> <span class="var">client</span>.<span class="var">messages</span>.<span class="fn">create</span>(
        <span class="arg">model</span><span class="op">=</span><span class="str">"claude-sonnet-4-20250514"</span>,
        <span class="arg">max_tokens</span><span class="op">=</span><span class="num">256</span>,
        <span class="arg">messages</span><span class="op">=</span>[{<span class="str">"role"</span>: <span class="str">"user"</span>,
            <span class="str">"content"</span>: <span class="str">f"Summarize this conversation:\\n</span><span class="var">{old_messages}</span><span class="str">"</span>}]
    )

    <span class="cmt"># Return summary + recent messages</span>
    <span class="kw">return</span> [{<span class="str">"role"</span>: <span class="str">"user"</span>,
        <span class="str">"content"</span>: <span class="str">f"Previous conversation summary: </span><span class="var">{summary.content[0].text}</span><span class="str">"</span>},
        {<span class="str">"role"</span>: <span class="str">"assistant"</span>,
        <span class="str">"content"</span>: <span class="str">"Understood, I have the context."</span>}
    ] <span class="op">+</span> <span class="var">recent_messages</span>`}</code></pre>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">RAG-Enhanced Chatbot</h3>
      <pre class="code-block"><code>{@html `<span class="cmt"># Search a knowledge base before responding</span>
<span class="kw">def</span> <span class="fn">chat_with_rag</span>(<span class="arg">user_message</span>, <span class="arg">knowledge_base</span>):
    <span class="cmt"># Search for relevant documents</span>
    <span class="var">results</span> <span class="op">=</span> <span class="var">knowledge_base</span>.<span class="fn">search</span>(<span class="var">user_message</span>, <span class="arg">top_k</span><span class="op">=</span><span class="num">3</span>)
    <span class="var">context</span> <span class="op">=</span> <span class="str">"\\n"</span>.<span class="fn">join</span>([<span class="var">r</span>.<span class="var">text</span> <span class="kw">for</span> <span class="var">r</span> <span class="kw">in</span> <span class="var">results</span>])

    <span class="cmt"># Include retrieved context in the prompt</span>
    <span class="var">response</span> <span class="op">=</span> <span class="var">client</span>.<span class="var">messages</span>.<span class="fn">create</span>(
        <span class="arg">model</span><span class="op">=</span><span class="str">"claude-sonnet-4-20250514"</span>,
        <span class="arg">max_tokens</span><span class="op">=</span><span class="num">1024</span>,
        <span class="arg">system</span><span class="op">=</span><span class="str">f"""Answer using ONLY the provided context.
If the context doesn't contain the answer, say so.

Context:
</span><span class="var">{context}</span><span class="str">"""</span>,
        <span class="arg">messages</span><span class="op">=</span>[{<span class="str">"role"</span>: <span class="str">"user"</span>, <span class="str">"content"</span>: <span class="var">user_message</span>}]
    )
    <span class="kw">return</span> <span class="var">response</span>.<span class="var">content</span>[<span class="num">0</span>].<span class="var">text</span>`}</code></pre>
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95">
        I know advanced chatbot patterns
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
