<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: (score: number) => void; }
  let { oncomplete }: Props = $props();

  let b1Answer = $state('');
  let b1Result = $state<'correct' | 'wrong' | null>(null);
  let b2Answer = $state('');
  let b2Result = $state<'correct' | 'wrong' | null>(null);
  let b3Answer = $state('');
  let b3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(b1Result === 'correct' && b2Result === 'correct' && b3Result === 'correct');

  function checkB1() {
    const a = b1Answer.trim().toLowerCase();
    b1Result = (a === 'diffusion' || a === 'diffusion model' || a === 'diffusion models') ? 'correct' : 'wrong';
  }
  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    b2Result = (a === 'classification' || a === 'classify' || a === 'prediction') ? 'correct' : 'wrong';
  }
  function checkB3() {
    const a = b3Answer.trim().toLowerCase();
    b3Result = (a === 'prompt' || a === 'a prompt' || a === 'text prompt') ? 'correct' : 'wrong';
  }

  $effect(() => { if (allDone) oncomplete?.([b1Result, b2Result, b3Result].filter(r => r === 'correct').length); });

  let a1Answer = $state('');
  let a1Result = $state<'correct' | 'wrong' | null>(null);
  let a2Answer = $state('');
  let a2Result = $state<'correct' | 'wrong' | null>(null);
  let a3Answer = $state('');
  let a3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(a1Result === 'correct' && a2Result === 'correct' && a3Result === 'correct');

  function checkA1() {
    const a = a1Answer.trim().toLowerCase();
    a1Result = (a === 'gan' || a === 'gans' || a === 'generative adversarial network' || a === 'generative adversarial networks') ? 'correct' : 'wrong';
  }
  function checkA2() {
    const a = a2Answer.trim().toLowerCase();
    a2Result = (a === 'latent' || a === 'latent space' || a === 'latent diffusion') ? 'correct' : 'wrong';
  }
  function checkA3() {
    const a = a3Answer.trim().toLowerCase();
    a3Result = (a === 'multimodal' || a === 'multi-modal') ? 'correct' : 'wrong';
  }

  $effect(() => { if (advAllDone) oncomplete?.([a1Result, a2Result, a3Result].filter(r => r === 'correct').length); });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Generative AI Basics</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section.</p>
  </div>

  <div class="rounded-xl border-2 {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-blue-200 bg-blue-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What type of model powers modern AI image generation (like DALL-E and Stable Diffusion)?</p>
    <p class="text-sm text-slate-500">Hint: It starts with random noise and gradually refines it.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b1Answer} placeholder="Your answer..." disabled={b1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-blue-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB1(); }} />
      <button onclick={checkB1} disabled={b1Result === 'correct'}
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b1Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Diffusion models generate images by iteratively denoising random noise.</p>
    {:else if b1Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Think about the process of noise spreading and being reversed.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-blue-200 bg-blue-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. Traditional AI typically focuses on what task (e.g., "Is this a cat or dog?")?</p>
    <p class="text-sm text-slate-500">Hint: It puts things into categories.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b2Answer} placeholder="Your answer..." disabled={b2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-blue-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB2(); }} />
      <button onclick={checkB2} disabled={b2Result === 'correct'}
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b2Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Classification (and prediction) are the hallmarks of traditional AI.</p>
    {:else if b2Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Think about sorting things into groups or categories.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-blue-200 bg-blue-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What do you provide to a generative AI to tell it what to create?</p>
    <p class="text-sm text-slate-500">Hint: It is the instruction or description you type in.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={b3Answer} placeholder="Your answer..." disabled={b3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-blue-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB3(); }} />
      <button onclick={checkB3} disabled={b3Result === 'correct'}
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if b3Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! A prompt is the input that guides what the AI generates.</p>
    {:else if b3Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. It is the same word used in "prompt engineering."</p>{/if}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You understand generative AI fundamentals.</p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Generative AI</h2>
    <p class="text-slate-600">Answer all three questions correctly.</p>
  </div>

  <div class="rounded-xl border-2 {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-blue-200 bg-blue-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What architecture uses a generator and discriminator competing against each other?</p>
    <p class="text-sm text-slate-500">Hint: The acronym stands for Generative Adversarial Network.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a1Answer} placeholder="Your answer..." disabled={a1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-blue-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA1(); }} />
      <button onclick={checkA1} disabled={a1Result === 'correct'}
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a1Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! GANs pit a generator against a discriminator in an adversarial training setup.</p>
    {:else if a1Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Think about the initials: G___ A___ N___.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-blue-200 bg-blue-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. Stable Diffusion operates in a compressed ___ space rather than pixel space for efficiency.</p>
    <p class="text-sm text-slate-500">Hint: It is a lower-dimensional representation of the image.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a2Answer} placeholder="Your answer..." disabled={a2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-blue-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA2(); }} />
      <button onclick={checkA2} disabled={a2Result === 'correct'}
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a2Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Latent diffusion compresses images into a latent space for faster processing.</p>
    {:else if a2Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. The word describes something hidden or not directly observed.</p>{/if}
  </div>

  <div class="rounded-xl border-2 {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-blue-200 bg-blue-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What term describes AI models that work across multiple types of content (text, image, audio)?</p>
    <p class="text-sm text-slate-500">Hint: "Multi" + the word for different types/forms of media.</p>
    <div class="flex gap-2">
      <input type="text" bind:value={a3Answer} placeholder="Your answer..." disabled={a3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-blue-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA3(); }} />
      <button onclick={checkA3} disabled={a3Result === 'correct'}
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-50">Check</button>
    </div>
    {#if a3Result === 'correct'}<p class="text-sm font-semibold text-green-700">Correct! Multimodal models understand and generate across multiple content types.</p>
    {:else if a3Result === 'wrong'}<p class="text-sm font-semibold text-red-700">Not quite. Think: multiple + modalities (modes/types of content).</p>{/if}
  </div>

  {#if advAllDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You have advanced generative AI knowledge.</p>
    </div>
  {/if}

  {/if}
</div>
