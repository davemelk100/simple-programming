<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

  const examples = [
    {
      name: 'Coffee Machine',
      icon: '☕',
      surface: 'Press button → get coffee',
      hidden: 'Grinding beans, heating water, brewing, filtering',
      desc: 'You press one button. The machine hides all the complex steps inside.',
    },
    {
      name: 'Email',
      icon: '✉️',
      surface: 'Click send → message delivered',
      hidden: 'DNS lookup, SMTP protocol, packet routing, server relay',
      desc: 'You click "Send." The system hides DNS, SMTP, routing, and delivery.',
    },
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
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Abstraction: Focus on What, Not How</h2>
    <p class="max-w-lg text-slate-600">
      Think of driving a car. You use the <strong>steering wheel</strong> and <strong>pedals</strong> &mdash; the abstract interface &mdash; without knowing how the engine, transmission, or brakes work internally. That's <strong>abstraction</strong>: simplifying complex systems by hiding unnecessary details so you interact with a clean, simple interface.
    </p>
  </div>

  <div class="space-y-8">
      <!-- Car metaphor visual -->
      <div class="flex max-w-lg items-center gap-4 rounded-xl border-2 border-indigo-300 bg-indigo-50 p-5 shadow-md">
        <div class="flex flex-col items-center gap-1">
          <div class="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-200 text-2xl">🚗</div>
          <span class="text-xs font-bold text-indigo-700">Driver</span>
        </div>
        <svg class="h-6 w-8 shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <div class="flex flex-col items-center gap-1 rounded-lg border border-indigo-300 bg-white px-4 py-3 shadow-sm">
          <span class="text-xs font-semibold text-indigo-500">Abstract Interface</span>
          <span class="text-sm font-bold text-indigo-700">Steering wheel + Pedals</span>
        </div>
        <svg class="h-6 w-8 shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <div class="flex flex-col items-center gap-1 rounded-lg border border-dashed border-slate-300 bg-slate-100 px-4 py-3">
          <span class="text-xs font-semibold text-slate-500">Hidden</span>
          <span class="text-sm text-slate-500">Engine internals</span>
        </div>
      </div>

      <!-- Animated examples -->
      <div class="flex flex-col items-start gap-6">
        {#each examples as ex, i}
          <div
            class="w-full max-w-lg rounded-xl border p-5 transition-all duration-700
              {i <= activeExample ? 'translate-x-0 opacity-100 border-indigo-300 bg-indigo-50' : '-translate-x-8 opacity-0 border-slate-200 bg-white'}"
          >
            <div class="mb-3 flex items-center gap-3">
              <span class="text-2xl">{ex.icon}</span>
              <h3 class="text-lg font-bold text-indigo-700">{ex.name}</h3>
            </div>
            <div class="mb-2 flex items-center gap-2">
              <span class="rounded-lg bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700">{ex.surface}</span>
            </div>
            <div class="mb-2 flex items-center gap-2">
              <span class="text-xs font-semibold text-slate-500">Hidden complexity:</span>
              <span class="text-xs text-slate-500">{ex.hidden}</span>
            </div>
            <p class="text-slate-600">{ex.desc}</p>
          </div>
        {/each}
      </div>
    </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
    >
      I've read this
    </button>
  </div>
</div>

<style>
  @keyframes slideIn {
    0% { transform: translateX(-2rem); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
</style>
