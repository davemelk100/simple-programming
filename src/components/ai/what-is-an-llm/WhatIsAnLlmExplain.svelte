<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);

  const cards = [
    { emoji: '\u{1F4DA}', title: 'Trained on Text', desc: 'LLMs learn patterns from billions of pages of books, articles, code, and conversations.' },
    { emoji: '\u{1F500}', title: 'Predict Next Token', desc: 'At their core, LLMs work by predicting the most likely next word (or token) in a sequence.' },
    { emoji: '\u{1F4AC}', title: 'Understand Context', desc: 'They can follow instructions, answer questions, write code, and hold conversations.' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < cards.length) {
        visibleCards++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">What Is a Large Language Model?</h2>
    <p class="text-slate-600">
      A <strong>Large Language Model (LLM)</strong> is a type of artificial intelligence that has been trained to understand and generate human language. Think of it like an incredibly well-read assistant that has studied billions of pages of text and learned the patterns of how language works.
    </p>
    <p class="mt-3 text-slate-600">
      Popular LLMs include <strong>Claude</strong> (by Anthropic), <strong>GPT-4</strong> (by OpenAI), <strong>Llama</strong> (by Meta), and <strong>Gemini</strong> (by Google). They power chatbots, coding assistants, writing tools, and much more.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    {#each cards as card, i}
      <div
        class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5 text-center transition-all duration-700
          {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
      >
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>

    <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5 space-y-4">
      <div>
        <h4 class="font-bold text-slate-800">Tokens</h4>
        <p class="text-sm text-slate-600">LLMs do not read words the way we do. They break text into <strong>tokens</strong> — small pieces that might be a whole word, part of a word, or even a single character. For example, "programming" might become ["program", "ming"]. The model processes these tokens as numbers.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Transformers</h4>
        <p class="text-sm text-slate-600">The architecture behind modern LLMs is called a <strong>Transformer</strong>, introduced in the famous 2017 paper "Attention Is All You Need." Transformers use a mechanism called <strong>attention</strong> to understand which parts of a sentence relate to each other, no matter how far apart they are.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Training</h4>
        <p class="text-sm text-slate-600">Training an LLM means feeding it enormous amounts of text and having it learn to predict the next token. This process takes weeks on thousands of specialized chips (GPUs or TPUs) and costs millions of dollars. The "large" in LLM refers to billions of <strong>parameters</strong> — the adjustable numbers the model uses to make predictions.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Prompts</h4>
        <p class="text-sm text-slate-600">When you type a question or instruction to an LLM, that is called a <strong>prompt</strong>. The quality of the output depends heavily on how you phrase your prompt. This has led to the practice of <strong>prompt engineering</strong> — crafting prompts to get better results.</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">How It Works (Simplified)</h3>
    <div class="flex flex-wrap items-center gap-2 text-sm">
      <span class="rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-slate-700">You type a prompt</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-purple-100 px-3 py-1.5 font-mono text-purple-700">Tokenize input</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-purple-200 px-3 py-1.5 font-mono text-purple-800">Predict next token</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-green-100 px-3 py-1.5 font-mono text-green-700">Repeat until done</span>
    </div>
    <p class="text-sm text-slate-500">
      The model generates its response one token at a time, each time considering all previous tokens to decide what comes next. This is why you sometimes see text appearing word by word in chat interfaces.
    </p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      I understand what an LLM is
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">LLMs (Advanced)</h2>
      <p class="text-slate-600">Transformer internals, scaling laws, inference optimization, and the science behind modern language models.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">The Transformer Architecture</h3>
      <p class="text-slate-600">
        A Transformer consists of stacked layers of <strong>self-attention</strong> and <strong>feed-forward networks</strong>. Self-attention computes a weighted sum of all token representations, where the weights (attention scores) are learned dynamically based on the content. This allows the model to capture long-range dependencies that older architectures (RNNs, LSTMs) struggled with.
      </p>
      <p class="text-slate-600">
        The attention mechanism uses three learned projections — <strong>Query (Q)</strong>, <strong>Key (K)</strong>, and <strong>Value (V)</strong>. Attention scores are computed as <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">softmax(QK^T / sqrt(d_k)) * V</code>. Multi-head attention runs this in parallel across multiple "heads," each learning different relationship patterns.
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Scaling Laws</h3>
      <p class="text-slate-600">
        Research has shown that LLM performance follows predictable <strong>scaling laws</strong>: as you increase model size (parameters), dataset size (tokens), and compute (FLOPs), performance improves in a smooth, power-law relationship. This means we can predict how well a larger model will perform before training it.
      </p>
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4 text-center">
          <h4 class="mb-1 font-bold text-slate-800">Parameters</h4>
          <p class="text-sm text-slate-600">GPT-3: 175B. GPT-4: rumored 1.8T (MoE). Llama 3: 8B to 405B. More parameters = more capacity to learn patterns.</p>
        </div>
        <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4 text-center">
          <h4 class="mb-1 font-bold text-slate-800">Training Data</h4>
          <p class="text-sm text-slate-600">Modern LLMs train on trillions of tokens from the internet, books, code, and curated datasets. Data quality matters as much as quantity.</p>
        </div>
        <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4 text-center">
          <h4 class="mb-1 font-bold text-slate-800">Compute</h4>
          <p class="text-sm text-slate-600">Training GPT-4 class models requires tens of thousands of GPUs running for months. The cost can exceed $100M.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Inference Optimization</h3>
      <p class="text-slate-600">
        Running a trained LLM (inference) also requires significant optimization:
      </p>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>KV Cache:</strong> Stores previously computed key-value pairs so the model does not recompute them for each new token. Essential for efficient autoregressive generation.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>Quantization:</strong> Reducing the precision of model weights (e.g., from 16-bit to 4-bit floats) to use less memory and compute, with minimal quality loss.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>Speculative Decoding:</strong> Using a small, fast "draft" model to predict multiple tokens ahead, then verifying them with the large model in parallel.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>Mixture of Experts (MoE):</strong> Only activating a subset of the model's parameters for each token, allowing much larger models without proportional compute costs.</span>
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Context Windows and Limitations</h3>
      <p class="text-slate-600">
        Every LLM has a <strong>context window</strong> — the maximum number of tokens it can process at once (input + output). Early models had 2K-4K tokens; modern models support 128K-1M+ tokens. However, performance on long contexts can degrade (the "lost in the middle" problem), and longer contexts require more memory and compute.
      </p>
      <p class="text-slate-600">
        LLMs also <strong>hallucinate</strong> — they can generate confident-sounding but factually incorrect text. They have no real "understanding" or access to truth; they are sophisticated pattern matchers. Techniques like Retrieval-Augmented Generation (RAG) and grounding help mitigate this.
      </p>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
      >
        I understand LLMs in depth
      </button>
    </div>
  </div>
  {/if}
</div>
