<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  interface Props {
    oncomplete?: () => void;
  }
  let { oncomplete }: Props = $props();

  // --- Basic mode: Break It Down (reorder steps) ---
  const correctOrder = [
    'List what it should do',
    'Design the data',
    'Build the simplest version',
    'Add features one at a time',
    'Test each feature',
  ];

  let steps = $state([...correctOrder].sort(() => Math.random() - 0.5));
  let selectedIndex = $state<number | null>(null);
  let isCorrect = $derived(steps.every((s, i) => s === correctOrder[i]));
  let hasInteracted = $state(false);

  function selectStep(index: number) {
    hasInteracted = true;
    if (selectedIndex === null) {
      selectedIndex = index;
    } else {
      // Swap the two
      const newSteps = [...steps];
      const temp = newSteps[selectedIndex];
      newSteps[selectedIndex] = newSteps[index];
      newSteps[index] = temp;
      steps = newSteps;
      selectedIndex = null;
    }
  }

  function getStepClass(index: number): string {
    const base = 'cursor-pointer rounded-xl border-2 p-4 transition-all select-none';
    if (selectedIndex === index) {
      return base + ' border-pink-400 bg-pink-50 ring-2 ring-pink-300';
    }
    if (hasInteracted && isCorrect) {
      return base + ' border-green-300 bg-green-50';
    }
    return base + ' border-slate-200 bg-white hover:border-pink-200 hover:bg-pink-50/50';
  }

  // --- Advanced mode: Requirements categorization ---
  interface Requirement {
    text: string;
    type: 'functional' | 'non-functional';
  }

  const allRequirements: Requirement[] = [
    { text: 'Users can add items to a shopping cart', type: 'functional' },
    { text: 'Pages load in under 2 seconds', type: 'non-functional' },
    { text: 'Users can search for products by name', type: 'functional' },
    { text: 'The site works on mobile devices', type: 'non-functional' },
    { text: 'Users can checkout with a credit card', type: 'functional' },
    { text: 'All data is encrypted in transit (HTTPS)', type: 'non-functional' },
    { text: 'Users can leave product reviews', type: 'functional' },
    { text: 'The system supports 10,000 concurrent users', type: 'non-functional' },
    { text: 'Users can filter products by category', type: 'functional' },
    { text: 'The site is accessible (WCAG 2.1 AA)', type: 'non-functional' },
  ];

  let uncategorized = $state<Requirement[]>([...allRequirements].sort(() => Math.random() - 0.5));
  let functionalCol = $state<Requirement[]>([]);
  let nonFunctionalCol = $state<Requirement[]>([]);

  let totalPlaced = $derived(functionalCol.length + nonFunctionalCol.length);
  let correctCount = $derived(
    functionalCol.filter((r) => r.type === 'functional').length +
    nonFunctionalCol.filter((r) => r.type === 'non-functional').length
  );
  let allPlaced = $derived(uncategorized.length === 0);
  let allCorrectAdv = $derived(allPlaced && correctCount === allRequirements.length);

  function categorize(req: Requirement, target: 'functional' | 'non-functional') {
    uncategorized = uncategorized.filter((r) => r.text !== req.text);
    if (target === 'functional') {
      functionalCol = [...functionalCol, req];
    } else {
      nonFunctionalCol = [...nonFunctionalCol, req];
    }
  }

  function resetAdvanced() {
    uncategorized = [...allRequirements].sort(() => Math.random() - 0.5);
    functionalCol = [];
    nonFunctionalCol = [];
  }

  function getReqClass(req: Requirement, column: 'functional' | 'non-functional'): string {
    if (!allPlaced) return 'rounded-lg border border-slate-200 bg-white p-3 text-sm';
    const correct = req.type === column;
    return correct
      ? 'rounded-lg border-2 border-green-300 bg-green-50 p-3 text-sm'
      : 'rounded-lg border-2 border-red-300 bg-red-50 p-3 text-sm';
  }
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Try It: Break It Down</h2>
    <p class="text-slate-600">
      Imagine you are building a <strong>to-do app</strong>. Below are five planning steps in random order. Click two steps to swap them and put them in the right order. The goal is to arrange them from first to last.
    </p>
  </div>

  <div class="space-y-3">
    {#each steps as step, i}
      <button
        onclick={() => selectStep(i)}
        class={getStepClass(i)}
        style="width: 100%; text-align: left;"
      >
        <div class="flex items-center gap-3">
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full {hasInteracted && isCorrect ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-600'} text-sm font-bold">
            {i + 1}
          </span>
          <span class="font-medium text-slate-700">{step}</span>
        </div>
      </button>
    {/each}
  </div>

  {#if hasInteracted && isCorrect}
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
      <p class="font-semibold text-green-700">Correct! This is a solid planning order:</p>
      <ol class="mt-2 list-inside list-decimal space-y-1 text-sm text-slate-600">
        <li><strong>List what it should do</strong> &mdash; understand the requirements</li>
        <li><strong>Design the data</strong> &mdash; decide what information you need to store</li>
        <li><strong>Build the simplest version</strong> &mdash; get an MVP working</li>
        <li><strong>Add features one at a time</strong> &mdash; iterate and improve</li>
        <li><strong>Test each feature</strong> &mdash; verify everything works before moving on</li>
      </ol>
    </div>
  {/if}

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95"
    >
      {isCorrect && hasInteracted ? 'Complete' : 'Skip'}
    </button>
  </div>

  {:else}

  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Try It: Requirements Gathering</h2>
    <p class="text-slate-600">
      A client says: <em>"I need an online store."</em> Below is a list of requirements. Categorize each one as either a <strong>Functional Requirement</strong> (what the system does) or a <strong>Non-Functional Requirement</strong> (how well it does it).
    </p>
  </div>

  <!-- Uncategorized items -->
  {#if uncategorized.length > 0}
    <div>
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Uncategorized ({uncategorized.length} remaining)</h3>
      <div class="space-y-2">
        {#each uncategorized as req}
          <div class="flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white p-4">
            <span class="flex-1 text-sm text-slate-700">{req.text}</span>
            <button
              onclick={() => categorize(req, 'functional')}
              class="shrink-0 rounded-lg border border-pink-300 bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-700 transition-colors hover:bg-pink-100"
            >
              Functional
            </button>
            <button
              onclick={() => categorize(req, 'non-functional')}
              class="shrink-0 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Non-Functional
            </button>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Two columns -->
  <div class="grid gap-4 sm:grid-cols-2">
    <div>
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-pink-600">
        Functional Requirements ({functionalCol.length})
      </h3>
      <div class="min-h-[80px] space-y-2 rounded-xl border-2 border-dashed border-pink-200 bg-pink-50/30 p-3">
        {#each functionalCol as req}
          <div class={getReqClass(req, 'functional')}>{req.text}</div>
        {/each}
        {#if functionalCol.length === 0}
          <p class="py-4 text-center text-sm text-slate-400">Drop functional requirements here</p>
        {/if}
      </div>
    </div>
    <div>
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
        Non-Functional Requirements ({nonFunctionalCol.length})
      </h3>
      <div class="min-h-[80px] space-y-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/30 p-3">
        {#each nonFunctionalCol as req}
          <div class={getReqClass(req, 'non-functional')}>{req.text}</div>
        {/each}
        {#if nonFunctionalCol.length === 0}
          <p class="py-4 text-center text-sm text-slate-400">Drop non-functional requirements here</p>
        {/if}
      </div>
    </div>
  </div>

  <!-- Results -->
  {#if allPlaced}
    <div class="rounded-xl border-2 {allCorrectAdv ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'} p-5">
      <p class="font-semibold {allCorrectAdv ? 'text-green-700' : 'text-amber-700'}">
        {allCorrectAdv
          ? 'Perfect! You correctly identified all functional and non-functional requirements.'
          : `You got ${correctCount} out of ${allRequirements.length} correct. The ones with red borders are in the wrong category.`}
      </p>
      {#if !allCorrectAdv}
        <button
          onclick={resetAdvanced}
          class="mt-3 rounded-lg border border-amber-300 bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-200"
        >
          Try Again
        </button>
      {/if}
    </div>
  {/if}

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95"
    >
      {allPlaced ? 'Complete' : 'Skip'}
    </button>
  </div>
  {/if}
</div>
