<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);

  const cards = [
    { emoji: '\u{1F4DD}', title: 'Text Generation', desc: 'Write articles, stories, emails, summaries, and translations from simple instructions.' },
    { emoji: '\u{1F5BC}\u{FE0F}', title: 'Image Generation', desc: 'Create photos, illustrations, and art from text descriptions using models like DALL-E and Midjourney.' },
    { emoji: '\u{1F4BB}', title: 'Code Generation', desc: 'Write, debug, and explain code in any programming language from natural language descriptions.' },
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">What Is Generative AI?</h2>
    <p class="text-slate-600">
      <strong>Generative AI</strong> refers to artificial intelligence systems that can create new content — text, images, code, music, video, and more. Unlike traditional AI that classifies or analyzes existing data, generative AI produces something that did not exist before.
    </p>
    <p class="mt-3 text-slate-600">
      This is different from <strong>traditional AI</strong>, which typically answers questions like "Is this email spam?" (classification) or "What will sales be next month?" (prediction). Generative AI answers "Write me a marketing email" or "Create a logo for my startup."
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    {#each cards as card, i}
      <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5 text-center transition-all duration-700
        {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Types of Generative AI</h3>
    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5 space-y-4">
      <div>
        <h4 class="font-bold text-slate-800">Text Generation (LLMs)</h4>
        <p class="text-sm text-slate-600">Models like Claude, GPT-4, and Llama generate human-quality text. They power chatbots, writing assistants, summarizers, and translators. They work by predicting the next token based on context.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Image Generation (Diffusion Models)</h4>
        <p class="text-sm text-slate-600">Models like DALL-E 3, Midjourney, and Stable Diffusion create images from text prompts. They work by starting with random noise and gradually refining it into a coherent image guided by your description.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Audio & Music Generation</h4>
        <p class="text-sm text-slate-600">Models can generate speech (text-to-speech), clone voices, compose music, and create sound effects. Examples include ElevenLabs for voice and Suno for music.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Video Generation</h4>
        <p class="text-sm text-slate-600">The newest frontier — models like Sora and Runway can generate short video clips from text descriptions, though this technology is still rapidly evolving.</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">How It Differs from Traditional AI</h3>
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
        <h4 class="mb-1 font-bold text-slate-800">Traditional AI</h4>
        <p class="text-sm text-slate-600">Classifies, predicts, detects patterns. "Is this a cat or dog?" "Will this customer churn?" "Is this transaction fraudulent?"</p>
      </div>
      <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
        <h4 class="mb-1 font-bold text-slate-800">Generative AI</h4>
        <p class="text-sm text-slate-600">Creates new content from prompts. "Write a story about a cat." "Generate a product photo." "Compose a jingle for my brand."</p>
      </div>
    </div>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
      I understand generative AI
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Generative AI (Advanced)</h2>
      <p class="text-slate-600">Diffusion models, GANs, VAEs, multimodal architectures, and the technical foundations of content generation.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Diffusion Models</h3>
      <p class="text-slate-600">
        Modern image generation is powered by <strong>diffusion models</strong>. During training, they learn to reverse a gradual noising process: given an image corrupted with Gaussian noise, predict the original. At generation time, they start from pure noise and iteratively denoise it, guided by the text prompt through a mechanism called <strong>classifier-free guidance</strong>.
      </p>
      <p class="text-slate-600">
        <strong>Latent diffusion</strong> (used by Stable Diffusion) performs this process in a compressed latent space rather than pixel space, making it much more efficient. A VAE encoder compresses images; the diffusion process runs in latent space; a VAE decoder converts back to pixels.
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">GANs vs. Diffusion</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">GANs (Generative Adversarial Networks)</h4>
          <p class="text-sm text-slate-600">Two networks compete: a generator creates fake images, a discriminator tries to detect them. Training is notoriously unstable but can produce very sharp images. Largely superseded by diffusion for most tasks.</p>
        </div>
        <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Diffusion Models</h4>
          <p class="text-sm text-slate-600">More stable training, better diversity, easier to control with text conditioning. Slower inference (many denoising steps) but techniques like distillation and consistency models are closing the speed gap.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Multimodal Models</h3>
      <p class="text-slate-600">
        The latest frontier combines multiple modalities in a single model. <strong>Multimodal</strong> models can understand and generate across text, images, audio, and video. They use shared embedding spaces where different types of content are represented in compatible formats, allowing the model to reason across modalities — for example, describing an image, answering questions about a chart, or generating an image from text.
      </p>
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
        I understand generative AI deeply
      </button>
    </div>
  </div>
  {/if}
</div>
