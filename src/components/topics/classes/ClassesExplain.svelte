<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

  const examples = [
    {
      name: 'Dog',
      desc: 'The Dog blueprint creates dog objects with a name and breed.',
      properties: ['name', 'breed'],
      objects: [
        { name: 'Buddy', breed: 'Labrador' },
        { name: 'Max', breed: 'Poodle' },
      ],
    },
    {
      name: 'Car',
      desc: 'The Car blueprint creates car objects with a make and speed.',
      properties: ['make', 'speed'],
      objects: [
        { make: 'Toyota', speed: 120 },
        { make: 'Tesla', speed: 155 },
      ],
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
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Classes are Blueprints</h2>
    <p class="max-w-lg text-slate-600">
      Think of a class like a <strong>cookie cutter</strong>. The cookie cutter is the blueprint &mdash;
      it defines the <strong>shape</strong>. Each cookie you stamp out is an <strong>object</strong>,
      a real thing made from that blueprint.
    </p>
  </div>

  <div class="flex flex-col gap-6 lg:flex-row lg:items-start">
    <div class="flex-1 flex flex-col items-start gap-8">
      {#each examples as ex, i}
        <div
          class="w-full max-w-xl transition-all duration-700
            {i <= activeExample ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}"
        >
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
            <!-- Blueprint (cookie cutter) -->
            <div class="flex flex-col items-center gap-1
              {i === activeExample ? 'animate-pop' : ''}">
              <span class="text-xs font-semibold uppercase tracking-wider text-blue-500">Blueprint</span>
              <div class="flex w-40 flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-blue-50 p-3 shadow-md">
                <span class="text-sm font-bold text-blue-700">{ex.name}</span>
                <div class="mt-1 space-y-0.5">
                  {#each ex.properties as prop}
                    <div class="text-xs text-blue-600">&#8226; {prop}</div>
                  {/each}
                </div>
              </div>
            </div>

            <!-- Arrow -->
            <div class="hidden sm:flex sm:items-center sm:pt-6">
              <svg class="h-6 w-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <!-- Objects (cookies) -->
            <div class="flex flex-wrap gap-2">
              {#each ex.objects as obj, j}
                <div class="flex w-40 flex-col rounded-xl border-2 border-blue-300 bg-blue-100 p-3 shadow-sm transition-all duration-500
                  {i === activeExample ? 'animate-pop' : ''}">
                  <span class="mb-1 text-[10px] font-semibold uppercase text-blue-500">Object {j + 1}</span>
                  {#each Object.entries(obj) as [key, val]}
                    <div class="text-xs text-blue-800">
                      <span class="font-semibold">{key}:</span> {val}
                    </div>
                  {/each}
                </div>
              {/each}
            </div>
          </div>

          {#if i <= activeExample}
            <p class="mt-2 max-w-md text-sm text-slate-500">{ex.desc}</p>
          {/if}
        </div>
      {/each}
    </div>

    <div class="w-full shrink-0 rounded-xl bg-blue-50 p-5 lg:w-64 lg:self-start">
      <p class="text-sm text-blue-800">
        <strong>One class, many objects.</strong> Just like one cookie cutter can stamp out dozens of cookies,
        a single class can create as many objects as you need &mdash; each with its own unique values.
        Objects also have <strong>methods</strong> (behaviors) &mdash; things they can <em>do</em>, like <code>car.drive()</code> or <code>dog.bark()</code>.
      </p>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      I've read this
    </button>
  </div>
</div>

<style>
  @keyframes popIn {
    0% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }
  .animate-pop {
    animation: popIn 0.4s ease-out;
  }
</style>
