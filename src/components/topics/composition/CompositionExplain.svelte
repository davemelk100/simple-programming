<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

  let activeStep = $state(-1);

  const pipeline = [
    { input: '"hello"', fn: 'uppercase', output: '"HELLO"' },
    { input: '"HELLO"', fn: 'add "!"', output: '"HELLO!"' },
  ];

  onMount(() => {
    let step = 0;
    const interval = setInterval(() => {
      activeStep = step;
      step++;
      if (step >= pipeline.length) clearInterval(interval);
    }, 1500);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Building Bigger Things</h2>
    <p class="max-w-lg text-slate-600">
      The real power of programming comes from <strong>combining</strong> small pieces.
      Each piece does one thing well, and you connect them into a <strong>pipeline</strong>!
    </p>
  </div>

  <div class="flex flex-col gap-6 lg:flex-row lg:items-start">
    <!-- Pipeline visual -->
    <div class="flex-1 max-w-lg">
      <h3 class="mb-4 text-sm font-bold text-indigo-600">A Pipeline in Action</h3>

      <div class="flex flex-col items-center gap-2">
        <!-- Initial value -->
        <div class="rounded-lg bg-indigo-100 px-6 py-3 text-lg font-bold text-indigo-700 shadow-sm">
          "hello"
        </div>

        {#each pipeline as step, i}
          <!-- Arrow down -->
          <div class="flex flex-col items-center transition-all duration-500
            {i <= activeStep ? 'opacity-100' : 'opacity-30'}">
            <svg class="h-6 w-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>

            <!-- Function block -->
            <div class="my-1 rounded-xl border-2 border-indigo-400 bg-indigo-50 px-6 py-3 text-center shadow-md
              {i === activeStep ? 'pipeline-pulse' : ''}">
              <span class="text-xs text-indigo-400">function</span>
              <div class="text-sm font-bold text-indigo-700">{step.fn}</div>
            </div>

            <svg class="h-6 w-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>

            <!-- Output -->
            <div class="rounded-lg px-6 py-3 text-lg font-bold shadow-sm transition-all duration-500
              {i <= activeStep ? 'bg-green-100 text-green-700 scale-105' : 'bg-slate-100 text-slate-400'}
              {i === activeStep ? 'output-pop' : ''}">
              {step.output}
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="w-full shrink-0 rounded-xl bg-indigo-50 p-5 lg:w-64 lg:self-start">
      <p class="text-sm text-indigo-800">
        <strong>Composition</strong> means plugging the output of one function into the input of the next.
        Small, simple functions become powerful when chained together!
      </p>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      I've read this
    </button>
  </div>
</div>

<style>
  @keyframes pipelinePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
    50% { box-shadow: 0 0 0 8px rgba(99, 102, 241, 0); }
  }
  @keyframes outputPop {
    0% { transform: scale(0.9); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1.05); }
  }
  .pipeline-pulse { animation: pipelinePulse 1s ease-in-out 2; }
  .output-pop { animation: outputPop 0.4s ease-out; }
</style>
