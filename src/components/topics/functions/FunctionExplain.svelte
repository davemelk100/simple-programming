<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

  const examples = [
    { name: 'double', input: '5', output: '10', color: 'purple', desc: 'The double machine takes a number and multiplies it by 2.' },
    { name: 'greet', input: '"World"', output: '"Hello, World!"', color: 'violet', desc: 'The greet machine adds "Hello, " in front of your text.' },
    { name: 'isEven', input: '4', output: 'true', color: 'fuchsia', desc: 'The isEven machine checks if a number is even.' },
  ];

  let activeExample = $state(-1);

  onMount(() => {
    let i = 0;
    const interval = setInterval(() => {
      activeExample = i;
      i++;
      if (i >= examples.length) clearInterval(interval);
    }, 1200);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Functions are Machines</h2>
    <p class="max-w-lg text-slate-600">
      Think of a function like a machine in a factory. You put something <strong>in</strong>,
      the machine does its work, and something comes <strong>out</strong>.
    </p>
  </div>

  <div class="flex flex-col gap-6 lg:flex-row lg:items-start">
    <div class="flex-1 flex flex-col items-start gap-8">
      {#each examples as ex, i}
        <div
          class="flex w-full max-w-lg items-center gap-3 transition-all duration-700
            {i <= activeExample ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}"
        >
          <!-- Input -->
          <div class="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-sm font-bold text-purple-700 shadow transition-all duration-500
            {i === activeExample ? 'animate-bounce-subtle' : ''}">
            {ex.input}
          </div>

          <!-- Arrow in -->
          <svg class="h-6 w-8 shrink-0 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>

          <!-- Machine -->
          <div class="flex h-16 w-28 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-purple-400 bg-purple-50 shadow-md
            {i === activeExample ? 'machine-shake' : ''}">
            <span class="text-xs text-purple-500">function</span>
            <span class="text-sm font-bold text-purple-700">{ex.name}()</span>
          </div>

          <!-- Arrow out -->
          <svg class="h-6 w-8 shrink-0 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>

          <!-- Output -->
          <div class="flex h-14 w-28 shrink-0 items-center justify-center rounded-lg bg-green-100 text-sm font-bold text-green-700 shadow
            {i === activeExample ? 'animate-pop' : ''}">
            {ex.output}
          </div>
        </div>

        {#if i <= activeExample}
          <p class="max-w-md text-sm text-slate-500 -mt-4">{ex.desc}</p>
        {/if}
      {/each}
    </div>

    <div class="w-full shrink-0 rounded-xl bg-purple-50 p-5 lg:w-64 lg:self-start">
      <p class="text-sm text-purple-800">
        Every function has a <strong>name</strong>, takes some <strong>input</strong>,
        and produces an <strong>output</strong>. For simple functions like these, the same input always gives the same output!
      </p>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      I've read this
    </button>
  </div>
</div>

<style>
  @keyframes machineShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px) rotate(-1deg); }
    75% { transform: translateX(2px) rotate(1deg); }
  }
  @keyframes popIn {
    0% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
  .machine-shake {
    animation: machineShake 0.3s ease-in-out 3;
  }
  .animate-pop {
    animation: popIn 0.4s ease-out;
  }
  .animate-bounce-subtle {
    animation: popIn 0.3s ease-out;
  }
</style>
