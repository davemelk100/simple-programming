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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Fine-Tuning in Code</h2>
    <p class="text-slate-600">Here is how you prepare data and fine-tune a model in practice.</p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Prepare Training Data</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># Training data is a list of input/output examples</span>
<span class="cmt"># Format: JSONL (one JSON object per line)</span>

<span class="cmt"># training_data.jsonl</span>
{<span class="str">"messages"</span>: [
  {<span class="str">"role"</span>: <span class="str">"system"</span>, <span class="str">"content"</span>: <span class="str">"You are a customer support agent."</span>},
  {<span class="str">"role"</span>: <span class="str">"user"</span>, <span class="str">"content"</span>: <span class="str">"My order hasn't arrived."</span>},
  {<span class="str">"role"</span>: <span class="str">"assistant"</span>, <span class="str">"content"</span>: <span class="str">"I'm sorry to hear that! Let me look up your order. Could you share your order number?"</span>}
]}
{<span class="str">"messages"</span>: [
  {<span class="str">"role"</span>: <span class="str">"system"</span>, <span class="str">"content"</span>: <span class="str">"You are a customer support agent."</span>},
  {<span class="str">"role"</span>: <span class="str">"user"</span>, <span class="str">"content"</span>: <span class="str">"How do I return an item?"</span>},
  {<span class="str">"role"</span>: <span class="str">"assistant"</span>, <span class="str">"content"</span>: <span class="str">"Returns are easy! Go to Orders > select the item > click Return. You'll get a prepaid label within 24 hours."</span>}
]}`}</code></pre>
    <p class="text-sm text-slate-500">Each example shows the model exactly how you want it to respond. Quality and consistency matter more than quantity.</p>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Start Fine-Tuning (OpenAI API Example)</h3>
    <pre class="code-block"><code>{@html `<span class="kw">from</span> <span class="var">openai</span> <span class="kw">import</span> <span class="var">OpenAI</span>
<span class="var">client</span> <span class="op">=</span> <span class="fn">OpenAI</span>()

<span class="cmt"># Step 1: Upload training file</span>
<span class="var">file</span> <span class="op">=</span> <span class="var">client</span>.<span class="var">files</span>.<span class="fn">create</span>(
    <span class="arg">file</span><span class="op">=</span><span class="fn">open</span>(<span class="str">"training_data.jsonl"</span>, <span class="str">"rb"</span>),
    <span class="arg">purpose</span><span class="op">=</span><span class="str">"fine-tune"</span>
)

<span class="cmt"># Step 2: Create fine-tuning job</span>
<span class="var">job</span> <span class="op">=</span> <span class="var">client</span>.<span class="var">fine_tuning</span>.<span class="var">jobs</span>.<span class="fn">create</span>(
    <span class="arg">training_file</span><span class="op">=</span><span class="var">file</span>.<span class="var">id</span>,
    <span class="arg">model</span><span class="op">=</span><span class="str">"gpt-4o-mini-2024-07-18"</span>
)

<span class="cmt"># Step 3: Check status</span>
<span class="var">status</span> <span class="op">=</span> <span class="var">client</span>.<span class="var">fine_tuning</span>.<span class="var">jobs</span>.<span class="fn">retrieve</span>(<span class="var">job</span>.<span class="var">id</span>)
<span class="fn">print</span>(<span class="var">status</span>.<span class="var">status</span>)  <span class="cmt"># "running" -> "succeeded"</span>

<span class="cmt"># Step 4: Use the fine-tuned model</span>
<span class="var">response</span> <span class="op">=</span> <span class="var">client</span>.<span class="var">chat</span>.<span class="var">completions</span>.<span class="fn">create</span>(
    <span class="arg">model</span><span class="op">=</span><span class="str">"ft:gpt-4o-mini:my-org:custom:id"</span>,
    <span class="arg">messages</span><span class="op">=</span>[{<span class="str">"role"</span>: <span class="str">"user"</span>,
        <span class="str">"content"</span>: <span class="str">"Where is my package?"</span>}]
)`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      I understand fine-tuning code
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Advanced: LoRA Fine-Tuning</h2>
      <p class="text-slate-600">Efficient fine-tuning with LoRA using the Hugging Face ecosystem.</p>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">LoRA with Hugging Face PEFT</h3>
      <pre class="code-block"><code>{@html `<span class="kw">from</span> <span class="var">transformers</span> <span class="kw">import</span> <span class="var">AutoModelForCausalLM</span>, <span class="var">AutoTokenizer</span>
<span class="kw">from</span> <span class="var">peft</span> <span class="kw">import</span> <span class="var">LoraConfig</span>, <span class="fn">get_peft_model</span>
<span class="kw">from</span> <span class="var">trl</span> <span class="kw">import</span> <span class="var">SFTTrainer</span>

<span class="cmt"># Load base model</span>
<span class="var">model</span> <span class="op">=</span> <span class="var">AutoModelForCausalLM</span>.<span class="fn">from_pretrained</span>(
    <span class="str">"meta-llama/Llama-3-8b"</span>,
    <span class="arg">load_in_4bit</span><span class="op">=</span><span class="num">True</span>  <span class="cmt"># QLoRA: 4-bit quantization</span>
)

<span class="cmt"># Configure LoRA adapters</span>
<span class="var">lora_config</span> <span class="op">=</span> <span class="fn">LoraConfig</span>(
    <span class="arg">r</span><span class="op">=</span><span class="num">16</span>,                 <span class="cmt"># Rank of adapter matrices</span>
    <span class="arg">lora_alpha</span><span class="op">=</span><span class="num">32</span>,         <span class="cmt"># Scaling factor</span>
    <span class="arg">target_modules</span><span class="op">=</span>[<span class="str">"q_proj"</span>, <span class="str">"v_proj"</span>],  <span class="cmt"># Which layers</span>
    <span class="arg">lora_dropout</span><span class="op">=</span><span class="num">0.05</span>,
)

<span class="cmt"># Apply LoRA to the model</span>
<span class="var">model</span> <span class="op">=</span> <span class="fn">get_peft_model</span>(<span class="var">model</span>, <span class="var">lora_config</span>)
<span class="var">model</span>.<span class="fn">print_trainable_parameters</span>()
<span class="cmt"># "trainable params: 4,194,304 || all: 8,030,261,248"</span>
<span class="cmt"># Only 0.05% of parameters are trained!</span>

<span class="cmt"># Train with SFTTrainer</span>
<span class="var">trainer</span> <span class="op">=</span> <span class="fn">SFTTrainer</span>(
    <span class="arg">model</span><span class="op">=</span><span class="var">model</span>,
    <span class="arg">train_dataset</span><span class="op">=</span><span class="var">dataset</span>,
    <span class="arg">max_seq_length</span><span class="op">=</span><span class="num">2048</span>,
)
<span class="var">trainer</span>.<span class="fn">train</span>()`}</code></pre>
    </div>

    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
      <h4 class="font-bold text-slate-800 mb-2">Key LoRA Parameters</h4>
      <ul class="space-y-1 text-sm text-slate-600">
        <li><strong>r (rank):</strong> Size of adapter matrices. Higher = more capacity but more parameters. 8-64 is typical.</li>
        <li><strong>lora_alpha:</strong> Scaling factor. Often set to 2x the rank.</li>
        <li><strong>target_modules:</strong> Which attention layers to adapt. Usually query and value projections.</li>
      </ul>
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
        I know LoRA fine-tuning code
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
