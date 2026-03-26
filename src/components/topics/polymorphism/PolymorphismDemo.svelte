<script lang="ts">
  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

  interface Shape {
    name: string;
    type: 'circle' | 'square' | 'triangle';
    color: string;
    params: Record<string, number>;
    area: () => number;
    formula: string;
  }

  const shapes: Shape[] = [
    {
      name: 'Circle',
      type: 'circle',
      color: 'orange',
      params: { radius: 5 },
      area: () => Math.round(Math.PI * 5 * 5 * 100) / 100,
      formula: 'pi x r x r = pi x 5 x 5',
    },
    {
      name: 'Square',
      type: 'square',
      color: 'orange',
      params: { side: 8 },
      area: () => 8 * 8,
      formula: 'side x side = 8 x 8',
    },
    {
      name: 'Triangle',
      type: 'triangle',
      color: 'orange',
      params: { base: 6, height: 10 },
      area: () => (6 * 10) / 2,
      formula: '(base x height) / 2 = (6 x 10) / 2',
    },
  ];

  let selectedShape = $state<number | null>(null);
  let showAllResults = $state(false);
  let animatingAll = $state(false);
  let allAnimatedIndex = $state(-1);

  function selectShape(index: number) {
    selectedShape = index;
    showAllResults = false;
    animatingAll = false;
    allAnimatedIndex = -1;
  }

  function calculateAll() {
    animatingAll = true;
    showAllResults = false;
    selectedShape = null;
    allAnimatedIndex = -1;

    let i = 0;
    const interval = setInterval(() => {
      allAnimatedIndex = i;
      i++;
      if (i >= shapes.length) {
        clearInterval(interval);
        showAllResults = true;
      }
    }, 600);
  }
</script>

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Polymorphism in Action</h2>
    <p class="max-w-lg text-slate-600">
      Click any shape to call <code class="rounded bg-orange-100 px-1.5 py-0.5 text-orange-700">.area()</code> on it,
      or press the button to call it on <strong>all</strong> of them at once.
    </p>
  </div>

  <!-- Shapes row -->
  <div class="flex items-end justify-center gap-8">
    {#each shapes as shape, i}
      <button
        onclick={() => selectShape(i)}
        class="group flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105"
      >
        <!-- Shape visual -->
        {#if shape.type === 'circle'}
          <div class="flex h-20 w-20 items-center justify-center rounded-full border-2 shadow-md transition-all duration-300
            {selectedShape === i || allAnimatedIndex >= i ? 'border-orange-500 bg-orange-200 scale-110 shape-pulse' : 'border-orange-300 bg-orange-50 group-hover:border-orange-400'}">
            <span class="text-xs font-bold text-orange-700">r=5</span>
          </div>
        {:else if shape.type === 'square'}
          <div class="flex h-20 w-20 items-center justify-center rounded border-2 shadow-md transition-all duration-300
            {selectedShape === i || allAnimatedIndex >= i ? 'border-orange-500 bg-orange-200 scale-110 shape-pulse' : 'border-orange-300 bg-orange-50 group-hover:border-orange-400'}">
            <span class="text-xs font-bold text-orange-700">s=8</span>
          </div>
        {:else}
          <svg viewBox="0 0 80 70" class="h-20 w-20 transition-all duration-300
            {selectedShape === i || allAnimatedIndex >= i ? 'scale-110 shape-pulse' : 'group-hover:scale-105'}">
            <polygon points="40,5 75,65 5,65"
              fill="{selectedShape === i || allAnimatedIndex >= i ? '#fed7aa' : '#fff7ed'}"
              stroke="{selectedShape === i || allAnimatedIndex >= i ? '#ea580c' : '#fdba74'}"
              stroke-width="2" />
            <text x="40" y="48" text-anchor="middle" fill="#c2410c" font-size="10" font-weight="bold">b=6,h=10</text>
          </svg>
        {/if}
        <span class="text-sm font-semibold text-orange-700">{shape.name}</span>
      </button>
    {/each}
  </div>

  <!-- Calculate All button -->
  <div>
    <button
      onclick={calculateAll}
      class="rounded-full border-2 border-orange-400 bg-orange-100 px-6 py-3 font-bold text-orange-700 shadow-md transition-all hover:bg-orange-200 active:scale-95"
    >
      Calculate Area on All Shapes
    </button>
  </div>

  <!-- Result display -->
  {#if selectedShape !== null}
    <div class="max-w-sm rounded-xl border-2 border-orange-300 bg-orange-50 p-5 shadow-md animate-pop">
      <p class="mb-1 text-sm font-semibold text-orange-600">{shapes[selectedShape].name}.area()</p>
      <p class="mb-2 text-xs text-slate-500">{shapes[selectedShape].formula}</p>
      <p class="text-2xl font-bold text-orange-700">{shapes[selectedShape].area()}</p>
    </div>
  {/if}

  {#if animatingAll}
    <div class="flex flex-wrap items-start justify-center gap-4">
      {#each shapes as shape, i}
        <div class="flex w-44 flex-col items-center gap-1 rounded-xl border p-4 transition-all duration-500
          {allAnimatedIndex >= i ? 'border-orange-300 bg-orange-50 opacity-100 translate-y-0' : 'border-slate-200 bg-white opacity-0 translate-y-4'}">
          <p class="text-sm font-semibold text-orange-600">{shape.name}.area()</p>
          <p class="text-xs text-slate-500">{shape.formula}</p>
          <p class="text-xl font-bold text-orange-700">{allAnimatedIndex >= i ? shape.area() : '...'}</p>
        </div>
      {/each}
    </div>

    {#if showAllResults}
      <p class="text-sm text-slate-500">
        Same method call, three different calculations. That's polymorphism!
      </p>
    {/if}
  {/if}

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
    >
      Done exploring
    </button>
  </div>
</div>

<style>
  @keyframes popIn {
    0% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  .animate-pop {
    animation: popIn 0.4s ease-out;
  }
  .shape-pulse {
    animation: pulse 0.6s ease-in-out;
  }
</style>
