<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

  const steps = [
    { before: '---', action: 'Start', after: 'count = 0' },
    { before: 'count = 0', action: '+ 1', after: 'count = 1' },
    { before: 'count = 1', action: '+ 1', after: 'count = 2' },
  ];

  let visibleSteps = $state(0);

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleSteps < steps.length) {
        visibleSteps++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  <div class="text-center">
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Things That Change: State</h2>
    <p class="mx-auto max-w-lg text-slate-600">
      <strong>State</strong> is just a value that changes over time. Think of a counter:
      it starts at 0, and each time you click +1, the state updates.
    </p>
  </div>

  <!-- Timeline -->
  <div class="mx-auto max-w-lg">
    <h3 class="mb-4 text-center text-sm font-bold text-pink-600">Timeline of a Counter</h3>

    <div class="space-y-4">
      {#each steps as step, i}
        <div class="flex items-center gap-3 transition-all duration-700
          {i < visibleSteps ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}">
          <!-- Step number -->
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white shadow-md">
            {i + 1}
          </div>

          <!-- Before -->
          <div class="rounded-lg bg-slate-100 px-3 py-2 text-xs">
            <span class="text-slate-400">Before:</span>
            <span class="ml-1 font-mono font-bold text-slate-600">{step.before}</span>
          </div>

          <!-- Action -->
          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-xs font-bold text-pink-700">
            {step.action}
          </div>

          <!-- Arrow -->
          <svg class="h-4 w-6 shrink-0 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>

          <!-- After -->
          <div class="rounded-lg bg-pink-100 px-3 py-2 text-xs">
            <span class="text-pink-500">After:</span>
            <span class="ml-1 font-mono font-bold text-pink-700">{step.after}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="rounded-xl bg-pink-50 p-5 text-center">
    <p class="text-sm text-pink-800">
      State is the <strong>current snapshot</strong> of your data. Every time an action happens,
      the state updates. Understanding state means understanding how your program <strong>evolves</strong> over time.
    </p>
  </div>

  <div class="text-center">
    <button onclick={oncomplete} class="rounded-full bg-pink-500 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-600 active:scale-95">
      I've read this
    </button>
  </div>
</div>
