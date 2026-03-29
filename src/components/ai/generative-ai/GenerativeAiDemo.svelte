<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Prompt-to-output matcher ===
  type OutputType = 'text' | 'image' | 'code' | 'audio';
  const prompts: { prompt: string; correctType: OutputType; output: string }[] = [
    { prompt: 'Write a haiku about programming', correctType: 'text', output: 'Lines of logic flow\nBugs hide in the semicolons\nCompile, debug, repeat' },
    { prompt: 'Generate a pixel art icon of a robot', correctType: 'image', output: '[A colorful pixel art robot with glowing eyes and antenna]' },
    { prompt: 'Write a function to reverse a string in Python', correctType: 'code', output: 'def reverse_string(s):\n    return s[::-1]' },
    { prompt: 'Create a jingle for a coffee shop', correctType: 'audio', output: '[Upbeat melody] "Fresh beans, warm dreams, your morning starts here..."' },
  ];

  let currentIndex = $state(0);
  let selectedType = $state<OutputType | null>(null);
  let showResult = $state(false);
  let score = $state(0);

  function selectType(t: OutputType) {
    selectedType = t;
    showResult = true;
    if (t === prompts[currentIndex].correctType) score++;
  }

  function nextPrompt() {
    if (currentIndex < prompts.length - 1) {
      currentIndex++;
      selectedType = null;
      showResult = false;
    }
  }

  // === Advanced mode: Prompt refinement ===
  const refinementSteps = [
    { label: 'Vague Prompt', prompt: 'Make me a website', quality: 20, output: 'Here is a basic HTML page with a heading that says "Hello World"...' },
    { label: 'Add Context', prompt: 'Make me a portfolio website for a photographer', quality: 50, output: 'Here is a portfolio site with a grid gallery layout, about section, and contact form...' },
    { label: 'Add Details', prompt: 'Make me a portfolio website for a photographer with a masonry grid gallery, dark theme, and smooth scroll animations', quality: 75, output: 'Here is a dark-themed portfolio with a masonry image grid using CSS columns, IntersectionObserver for scroll animations, a lightbox viewer...' },
    { label: 'Add Constraints', prompt: 'Make me a portfolio website for a photographer. Use HTML, Tailwind CSS, and vanilla JS only. Dark theme. Masonry grid. Smooth scroll. Responsive. Under 200 lines.', quality: 95, output: 'Here is a responsive, dark-themed portfolio in exactly 187 lines. Tailwind for styling, vanilla JS for the masonry layout and lightbox. Mobile-first grid that adapts from 1 to 3 columns...' },
  ];

  let activeStep = $state(0);
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Match the Output Type</h2>
    <p class="text-slate-600">
      For each prompt, identify what type of content a generative AI would produce.
    </p>
  </div>

  <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 space-y-6">
    <div class="text-center">
      <span class="text-sm text-slate-500">Prompt {currentIndex + 1} of {prompts.length}</span>
      <p class="mt-2 text-lg font-semibold text-slate-800">"{prompts[currentIndex].prompt}"</p>
    </div>

    <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {#each (['text', 'image', 'code', 'audio'] as const) as t}
        {@const isCorrect = t === prompts[currentIndex].correctType}
        <button
          onclick={() => selectType(t)}
          disabled={showResult}
          class="rounded-xl border-2 p-4 text-center transition-all {showResult && isCorrect ? 'border-green-400 bg-green-50' : showResult && selectedType === t && !isCorrect ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-white hover:bg-blue-100'} disabled:cursor-default"
        >
          <div class="text-2xl mb-1">{t === 'text' ? '\u{1F4DD}' : t === 'image' ? '\u{1F5BC}\u{FE0F}' : t === 'code' ? '\u{1F4BB}' : '\u{1F3B5}'}</div>
          <p class="text-sm font-medium capitalize text-slate-700">{t}</p>
        </button>
      {/each}
    </div>

    {#if showResult}
      <div class="rounded-lg bg-white p-4 border border-blue-200">
        <p class="text-sm font-semibold {selectedType === prompts[currentIndex].correctType ? 'text-green-700' : 'text-red-700'} mb-2">
          {selectedType === prompts[currentIndex].correctType ? 'Correct!' : `Not quite - this would produce ${prompts[currentIndex].correctType}.`}
        </p>
        <p class="text-sm text-slate-600 font-mono bg-slate-50 p-3 rounded">{prompts[currentIndex].output}</p>
      </div>
      {#if currentIndex < prompts.length - 1}
        <button onclick={nextPrompt} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95">
          Next Prompt
        </button>
      {:else}
        <p class="text-sm font-semibold text-blue-700">You scored {score}/{prompts.length}!</p>
      {/if}
    {/if}
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
      I've explored generative AI types
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Prompt Refinement</h2>
      <p class="text-slate-600">See how adding specificity to a prompt dramatically improves the output quality.</p>
    </div>

    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 space-y-6">
      <div class="flex flex-wrap gap-2">
        {#each refinementSteps as step, i}
          <button
            onclick={() => activeStep = i}
            class="rounded-lg px-3 py-1.5 text-sm font-medium transition-all {activeStep === i ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-blue-200 hover:bg-blue-100'}"
          >
            {step.label}
          </button>
        {/each}
      </div>

      <div class="rounded-lg bg-white p-4 border border-blue-200">
        <p class="text-sm font-semibold text-slate-700 mb-1">Prompt:</p>
        <p class="text-sm text-slate-800 font-mono">{refinementSteps[activeStep].prompt}</p>
      </div>

      <div>
        <p class="text-sm font-semibold text-slate-700 mb-1">Quality Score:</p>
        <div class="h-4 bg-white rounded-full border border-blue-200 overflow-hidden">
          <div class="h-full bg-blue-500 transition-all duration-500" style="width: {refinementSteps[activeStep].quality}%"></div>
        </div>
        <p class="text-xs text-slate-500 mt-1">{refinementSteps[activeStep].quality}%</p>
      </div>

      <div class="rounded-lg bg-slate-50 p-4 border border-slate-200">
        <p class="text-sm font-semibold text-slate-700 mb-1">Model Output:</p>
        <p class="text-sm text-slate-600">{refinementSteps[activeStep].output}</p>
      </div>
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
        I've explored prompt refinement
      </button>
    </div>
  </div>
  {/if}
</div>
