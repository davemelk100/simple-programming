<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);
  const cards = [
    { emoji: '\u{1F3EB}', title: 'Specialized Knowledge', desc: 'Fine-tuning teaches a general model your specific domain, terminology, and style.' },
    { emoji: '\u{2699}\u{FE0F}', title: 'Custom Behavior', desc: 'Make the model follow specific output formats, tone, or decision-making patterns.' },
    { emoji: '\u{1F4C9}', title: 'Better Performance', desc: 'A fine-tuned model can outperform a general model on your specific tasks with fewer tokens.' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < cards.length) visibleCards++;
      else clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">What Is AI Fine-Tuning?</h2>
    <p class="text-slate-600">
      <strong>Fine-tuning</strong> is the process of taking a pre-trained AI model (like an LLM) and further training it on your own data to specialize it for a specific task or domain. Think of it like this: the base model went to "general school" and learned about everything. Fine-tuning is like sending it to "specialist training" for your particular field.
    </p>
    <p class="mt-3 text-slate-600">
      For example, a general LLM knows about medicine in general terms. A fine-tuned model trained on your hospital's medical records, procedures, and terminology would be much better at helping your specific doctors and nurses.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    {#each cards as card, i}
      <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5 text-center transition-all duration-700
        {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Fine-Tuning vs. Prompting</h3>
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
        <h4 class="mb-1 font-bold text-slate-800">Prompting (No Training)</h4>
        <p class="text-sm text-slate-600">You tell the model what to do in the prompt each time. Quick to set up, no training needed. Works well for many tasks but uses more tokens and may not match specialized behavior perfectly.</p>
      </div>
      <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
        <h4 class="mb-1 font-bold text-slate-800">Fine-Tuning (Additional Training)</h4>
        <p class="text-sm text-slate-600">You train the model on examples of the behavior you want. More effort upfront, but the model learns the pattern deeply. Uses fewer tokens at inference time and can be more consistent.</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">When to Fine-Tune</h3>
    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
      <ul class="space-y-2 text-sm text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Consistent formatting:</strong> When you need the model to always output in a specific structure (like JSON with exact fields).</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Domain expertise:</strong> When the model needs to know specialized terminology or procedures (legal, medical, financial).</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Brand voice:</strong> When responses must match a specific tone, style, or personality consistently.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Cost reduction:</strong> When prompt engineering requires many tokens of instruction every time. Fine-tuning bakes the knowledge in.</span>
        </li>
      </ul>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">The Fine-Tuning Process</h3>
    <div class="flex flex-wrap items-center gap-2 text-sm">
      <span class="rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-slate-700">Collect examples</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-indigo-100 px-3 py-1.5 font-mono text-indigo-700">Format as pairs</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-indigo-200 px-3 py-1.5 font-mono text-indigo-800">Train the model</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-green-100 px-3 py-1.5 font-mono text-green-700">Evaluate & deploy</span>
    </div>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      I understand fine-tuning basics
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Fine-Tuning (Advanced)</h2>
      <p class="text-slate-600">LoRA, RLHF, DPO, quantized training, and the science behind model customization.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Fine-Tuning Techniques</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Full Fine-Tuning</h4>
          <p class="text-sm text-slate-600">Updates all model parameters. Most expressive but requires enormous compute and memory. Risk of <strong>catastrophic forgetting</strong> — the model loses general knowledge while learning the new task.</p>
        </div>
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">LoRA (Low-Rank Adaptation)</h4>
          <p class="text-sm text-slate-600">Freezes the original model and adds small trainable matrices (adapters) to each layer. Only trains ~0.1-1% of parameters. Fast, cheap, and produces small adapter files that can be swapped in and out.</p>
        </div>
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">RLHF (Reinforcement Learning from Human Feedback)</h4>
          <p class="text-sm text-slate-600">Trains a reward model from human preferences (which response is better?), then uses reinforcement learning (PPO) to optimize the LLM to produce responses humans prefer. How Claude and ChatGPT are aligned.</p>
        </div>
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">DPO (Direct Preference Optimization)</h4>
          <p class="text-sm text-slate-600">A simpler alternative to RLHF that skips the reward model. Directly optimizes the LLM using preference pairs (chosen vs. rejected responses). More stable training, fewer hyperparameters.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">QLoRA: Quantized LoRA</h3>
      <p class="text-slate-600">
        <strong>QLoRA</strong> combines quantization (reducing model precision to 4-bit) with LoRA adapters. This allows fine-tuning very large models (65B+ parameters) on a single consumer GPU. The base model is loaded in 4-bit, and only the small LoRA adapters are trained in full precision. This democratized fine-tuning — you can fine-tune a 70B model on a single GPU with 24GB of VRAM.
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Training Data Best Practices</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Quality over quantity:</strong> 1,000 high-quality examples often outperform 100,000 noisy ones.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Diversity:</strong> Cover the full range of inputs the model will see in production, including edge cases.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Evaluation set:</strong> Always hold out 10-20% of data for testing. Never train on your eval set.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Synthetic data:</strong> Use a stronger model to generate training examples, then human-review them. Effective when real data is scarce.</span>
        </li>
      </ul>
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
        I understand fine-tuning deeply
      </button>
    </div>
  </div>
  {/if}
</div>
