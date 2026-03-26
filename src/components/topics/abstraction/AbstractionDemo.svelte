<script lang="ts">
  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

  const steps = [
    { label: 'Grind beans', icon: '🫘', detail: 'Burr grinder pulverizes beans to medium-fine' },
    { label: 'Heat water', icon: '🔥', detail: 'Heater raises water to 96°C' },
    { label: 'Brew coffee', icon: '💧', detail: 'Hot water passes through grounds under pressure' },
    { label: 'Pour into cup', icon: '☕', detail: 'Brewed coffee dispensed through nozzle' },
  ];

  let brewing = $state(false);
  let currentStep = $state(-1);
  let done = $state(false);
  let showComplexity = $state(false);

  function makeCoffee() {
    brewing = true;
    currentStep = -1;
    done = false;

    let i = 0;
    const interval = setInterval(() => {
      currentStep = i;
      i++;
      if (i >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          done = true;
          brewing = false;
        }, 800);
      }
    }, 1000);
  }

  function reset() {
    brewing = false;
    currentStep = -1;
    done = false;
  }
</script>

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Coffee Machine: Layers of Abstraction</h2>
    <p class="max-w-lg text-slate-600">
      To the user, it's one button. Underneath, many steps happen in sequence.
    </p>
  </div>

  <!-- Coffee machine -->
  <div class="max-w-md rounded-2xl border-2 border-indigo-300 bg-gradient-to-b from-indigo-50 to-white p-6 shadow-lg">
    <div class="mb-4 text-center">
      <span class="text-sm font-bold uppercase tracking-wider text-indigo-500">Coffee Machine</span>
    </div>

    <!-- Simple interface -->
    <div class="mb-6 flex flex-col items-center gap-3">
      {#if !done}
        <button
          onclick={makeCoffee}
          disabled={brewing}
          class="rounded-xl bg-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
            {brewing ? 'animate-pulse' : ''}"
        >
          {brewing ? 'Brewing...' : 'Make Coffee'}
        </button>
      {:else}
        <div class="flex flex-col items-center gap-2">
          <span class="text-5xl drop-shadow-md">☕</span>
          <p class="text-lg font-bold text-indigo-700">Your coffee is ready!</p>
          <button
            onclick={reset}
            class="mt-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300 active:scale-95"
          >
            Make another
          </button>
        </div>
      {/if}
    </div>

    <!-- Toggle complexity -->
    <div class="mb-4 flex items-center justify-center gap-3">
      <span class="text-sm text-slate-600">Show what happens underneath</span>
      <button
        onclick={() => showComplexity = !showComplexity}
        class="relative h-6 w-11 rounded-full transition-colors {showComplexity ? 'bg-indigo-600' : 'bg-slate-300'}"
      >
        <span
          class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform {showComplexity ? 'translate-x-5' : 'translate-x-0'}"
        ></span>
      </button>
    </div>

    <!-- Hidden complexity -->
    {#if showComplexity}
      <div class="rounded-xl border border-dashed border-indigo-300 bg-indigo-50/50 p-4 transition-all">
        <p class="mb-3 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Hidden Implementation</p>
        <div class="space-y-3">
          {#each steps as step, i}
            <div class="flex items-center gap-3 transition-all duration-500
              {i <= currentStep ? 'opacity-100' : 'opacity-40'}">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300
                {i <= currentStep ? 'border-indigo-400 bg-indigo-100' : 'border-slate-200 bg-slate-50'}">
                <span class="text-lg">{step.icon}</span>
              </div>
              <div>
                <p class="text-sm font-bold {i <= currentStep ? 'text-indigo-700' : 'text-slate-500'}">{step.label}</p>
                <p class="text-xs {i <= currentStep ? 'text-slate-500' : 'text-slate-300'}">{step.detail}</p>
              </div>
              {#if i <= currentStep}
                <span class="ml-auto text-sm text-green-500">✓</span>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <div class="rounded-xl bg-indigo-50 p-5">
    <p class="text-sm text-indigo-800">
      <strong>The point:</strong> the user only needs to know "press button, get coffee."
      All the grinding, heating, brewing, and pouring is <strong>abstracted away</strong>.
    </p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
    >
      Done exploring
    </button>
  </div>
</div>
