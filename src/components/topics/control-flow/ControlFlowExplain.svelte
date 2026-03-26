<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

  let showDecision = $state(false);
  let decisionPath = $state<'yes' | 'no' | null>(null);
  let showLoop = $state(false);
  let loopStep = $state(0);

  onMount(() => {
    setTimeout(() => { showDecision = true; }, 400);
    setTimeout(() => {
      decisionPath = 'yes';
      setTimeout(() => { decisionPath = 'no'; }, 2000);
    }, 1200);
    setTimeout(() => { showLoop = true; }, 3500);
    let step = 0;
    const loopInterval = setInterval(() => {
      step++;
      loopStep = step;
      if (step >= 5) clearInterval(loopInterval);
    }, 600);
    setTimeout(() => loopInterval, 4000);
    return () => clearInterval(loopInterval);
  });
</script>

<div class="space-y-8">
  <div>
    <p class="text-slate-600">
      Programs need to <strong>choose</strong> what to do and sometimes <strong>repeat</strong> actions. <strong>If/else</strong> lets your program pick a path, while <strong>loops</strong> let it repeat steps without writing the same code over and over!
    </p>
  </div>

  <div class="space-y-8">
    <!-- Decision tree -->
    <div class="transition-all duration-700 {showDecision ? 'opacity-100' : 'opacity-0'}">
      <h3 class="mb-4 text-lg font-bold text-orange-700">If / Else: Making Choices</h3>

      <div class="flex flex-col items-center gap-3">
        <!-- Question -->
        <div class="rounded-xl border-2 border-orange-400 bg-orange-50 px-6 py-3 text-center font-bold text-orange-700 shadow-md">
          Is it raining?
        </div>

        <!-- Branches -->
        <div class="flex items-start gap-8">
          <!-- Yes branch -->
          <div class="flex flex-col items-center gap-2">
            <div class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300
              {decisionPath === 'yes' ? 'bg-green-500 text-white scale-110' : 'bg-slate-200 text-slate-500'}">
              Yes
            </div>
            <div class="h-8 w-0.5 transition-colors duration-300 {decisionPath === 'yes' ? 'bg-green-400' : 'bg-slate-200'}"></div>
            <div class="rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300
              {decisionPath === 'yes' ? 'bg-green-100 text-green-700 border-2 border-green-400 scale-105' : 'bg-slate-50 text-slate-500 border border-slate-200'}">
              Take umbrella ☂️
            </div>
          </div>

          <!-- No branch -->
          <div class="flex flex-col items-center gap-2">
            <div class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300
              {decisionPath === 'no' ? 'bg-blue-500 text-white scale-110' : 'bg-slate-200 text-slate-500'}">
              No
            </div>
            <div class="h-8 w-0.5 transition-colors duration-300 {decisionPath === 'no' ? 'bg-blue-400' : 'bg-slate-200'}"></div>
            <div class="rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300
              {decisionPath === 'no' ? 'bg-blue-100 text-blue-700 border-2 border-blue-400 scale-105' : 'bg-slate-50 text-slate-500 border border-slate-200'}">
              Wear sunglasses 😎
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loop visual -->
    <div class="transition-all duration-700 {showLoop ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}">
      <h3 class="mb-4 text-lg font-bold text-orange-700">Loops: Repeating Actions</h3>
      <p class="mb-3 text-slate-600">"Say hello 5 times"</p>

      <div class="flex items-center justify-center gap-2">
        {#each [1, 2, 3, 4, 5] as step}
          <div class="flex flex-col items-center gap-1 transition-all duration-400
            {step <= loopStep ? 'scale-100 opacity-100' : 'scale-75 opacity-30'}">
            <div class="flex h-12 w-12 items-center justify-center rounded-full border-2 font-bold transition-all duration-300
              {step <= loopStep ? 'border-orange-400 bg-orange-100 text-orange-700' : 'border-slate-200 bg-slate-50 text-slate-500'}">
              {step}
            </div>
            <span class="text-xs {step <= loopStep ? 'text-orange-600' : 'text-slate-300'}">Hello!</span>
          </div>
          {#if step < 5}
            <svg class="h-4 w-6 mt-[-8px] {step < loopStep ? 'text-orange-400' : 'text-slate-200'} transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          {/if}
        {/each}
      </div>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
      I've read this
    </button>
  </div>
</div>
