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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Building a Simple Agent</h2>
    <p class="text-slate-600">Here is the basic pattern for building an AI agent with tool use.</p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Define Tools</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># Define tools the agent can use</span>
<span class="var">tools</span> <span class="op">=</span> [
    {
        <span class="str">"name"</span>: <span class="str">"get_weather"</span>,
        <span class="str">"description"</span>: <span class="str">"Get current weather for a city"</span>,
        <span class="str">"input_schema"</span>: {
            <span class="str">"type"</span>: <span class="str">"object"</span>,
            <span class="str">"properties"</span>: {
                <span class="str">"city"</span>: {<span class="str">"type"</span>: <span class="str">"string"</span>}
            },
            <span class="str">"required"</span>: [<span class="str">"city"</span>]
        }
    }
]`}</code></pre>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">The Agent Loop</h3>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> <span class="var">anthropic</span>

<span class="var">client</span> <span class="op">=</span> <span class="var">anthropic</span>.<span class="fn">Anthropic</span>()

<span class="kw">def</span> <span class="fn">run_agent</span>(<span class="arg">user_message</span>):
    <span class="var">messages</span> <span class="op">=</span> [{<span class="str">"role"</span>: <span class="str">"user"</span>, <span class="str">"content"</span>: <span class="var">user_message</span>}]

    <span class="kw">while</span> <span class="num">True</span>:
        <span class="cmt"># Ask the model (with tools available)</span>
        <span class="var">response</span> <span class="op">=</span> <span class="var">client</span>.<span class="var">messages</span>.<span class="fn">create</span>(
            <span class="arg">model</span><span class="op">=</span><span class="str">"claude-sonnet-4-20250514"</span>,
            <span class="arg">max_tokens</span><span class="op">=</span><span class="num">1024</span>,
            <span class="arg">tools</span><span class="op">=</span><span class="var">tools</span>,
            <span class="arg">messages</span><span class="op">=</span><span class="var">messages</span>
        )

        <span class="cmt"># If the model wants to use a tool</span>
        <span class="kw">if</span> <span class="var">response</span>.<span class="var">stop_reason</span> <span class="op">==</span> <span class="str">"tool_use"</span>:
            <span class="cmt"># Execute the tool and feed result back</span>
            <span class="var">tool_call</span> <span class="op">=</span> <span class="var">response</span>.<span class="var">content</span>[<span class="num">-1</span>]
            <span class="var">result</span> <span class="op">=</span> <span class="fn">execute_tool</span>(<span class="var">tool_call</span>)
            <span class="var">messages</span>.<span class="fn">append</span>({<span class="str">"role"</span>: <span class="str">"assistant"</span>, <span class="str">"content"</span>: <span class="var">response</span>.<span class="var">content</span>})
            <span class="var">messages</span>.<span class="fn">append</span>({<span class="str">"role"</span>: <span class="str">"user"</span>, <span class="str">"content"</span>: [{
                <span class="str">"type"</span>: <span class="str">"tool_result"</span>,
                <span class="str">"tool_use_id"</span>: <span class="var">tool_call</span>.<span class="var">id</span>,
                <span class="str">"content"</span>: <span class="var">result</span>
            }]})
        <span class="kw">else</span>:
            <span class="cmt"># Model is done — return the final answer</span>
            <span class="kw">return</span> <span class="var">response</span>.<span class="var">content</span>[<span class="num">0</span>].<span class="var">text</span>`}</code></pre>
    <p class="text-sm text-slate-500">The loop continues until the model decides it has enough information and gives a final text response.</p>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      I understand the agent pattern
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Advanced Agent Patterns</h2>
      <p class="text-slate-600">Production-ready agent architecture with error handling, memory, and multi-tool orchestration.</p>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Agent with Memory and Error Handling</h3>
      <pre class="code-block"><code>{@html `<span class="kw">class</span> <span class="fn">Agent</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="var">self</span>, <span class="arg">tools</span>, <span class="arg">system_prompt</span><span class="op">=</span><span class="str">""</span>):
        <span class="var">self</span>.<span class="var">client</span> <span class="op">=</span> <span class="var">anthropic</span>.<span class="fn">Anthropic</span>()
        <span class="var">self</span>.<span class="var">tools</span> <span class="op">=</span> <span class="var">tools</span>
        <span class="var">self</span>.<span class="var">system</span> <span class="op">=</span> <span class="var">system_prompt</span>
        <span class="var">self</span>.<span class="var">messages</span> <span class="op">=</span> []
        <span class="var">self</span>.<span class="var">max_iterations</span> <span class="op">=</span> <span class="num">10</span>  <span class="cmt"># Safety limit</span>

    <span class="kw">def</span> <span class="fn">run</span>(<span class="var">self</span>, <span class="arg">task</span>):
        <span class="var">self</span>.<span class="var">messages</span>.<span class="fn">append</span>(
            {<span class="str">"role"</span>: <span class="str">"user"</span>, <span class="str">"content"</span>: <span class="var">task</span>})

        <span class="kw">for</span> <span class="var">i</span> <span class="kw">in</span> <span class="fn">range</span>(<span class="var">self</span>.<span class="var">max_iterations</span>):
            <span class="kw">try</span>:
                <span class="var">resp</span> <span class="op">=</span> <span class="var">self</span>.<span class="var">client</span>.<span class="var">messages</span>.<span class="fn">create</span>(
                    <span class="arg">model</span><span class="op">=</span><span class="str">"claude-sonnet-4-20250514"</span>,
                    <span class="arg">max_tokens</span><span class="op">=</span><span class="num">4096</span>,
                    <span class="arg">system</span><span class="op">=</span><span class="var">self</span>.<span class="var">system</span>,
                    <span class="arg">tools</span><span class="op">=</span><span class="var">self</span>.<span class="var">tools</span>,
                    <span class="arg">messages</span><span class="op">=</span><span class="var">self</span>.<span class="var">messages</span>)

                <span class="kw">if</span> <span class="var">resp</span>.<span class="var">stop_reason</span> <span class="op">!=</span> <span class="str">"tool_use"</span>:
                    <span class="kw">return</span> <span class="var">resp</span>.<span class="var">content</span>[<span class="num">0</span>].<span class="var">text</span>

                <span class="cmt"># Process tool calls...</span>
                <span class="var">self</span>.<span class="fn">_handle_tools</span>(<span class="var">resp</span>)
            <span class="kw">except</span> <span class="var">Exception</span> <span class="kw">as</span> <span class="var">e</span>:
                <span class="fn">print</span>(<span class="str">f"Error on iteration </span><span class="var">{i}</span><span class="str">: </span><span class="var">{e}</span><span class="str">"</span>)
        <span class="kw">return</span> <span class="str">"Max iterations reached."</span>`}</code></pre>
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
        I know advanced agent patterns
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
