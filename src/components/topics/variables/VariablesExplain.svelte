<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

  let visibleBoxes = $state(0);

  const boxes = [
    { label: 'name', value: '"Alice"', color: 'bg-blue-100 border-blue-400', textColor: 'text-blue-700', desc: 'This box is labeled "name" and stores the text Alice.' },
    { label: 'age', value: '25', color: 'bg-purple-100 border-purple-400', textColor: 'text-purple-700', desc: 'This box is labeled "age" and stores the number 25.' },
    { label: 'color', value: '"blue"', color: 'bg-sky-100 border-sky-400', textColor: 'text-sky-700', desc: 'This box is labeled "color" and stores the text blue.' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleBoxes < boxes.length) {
        visibleBoxes++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  <div class="text-center">
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Variables are Labeled Boxes</h2>
    <p class="mx-auto max-w-lg text-slate-600">
      Imagine you have a bunch of storage boxes. Each box has a <strong>label</strong> on the outside
      and a <strong>value</strong> inside. Each box holds exactly one value at a time. That's exactly what a variable is!
    </p>
  </div>

  <div class="flex flex-col items-center gap-6">
    {#each boxes as box, i}
      <div
        class="flex w-full max-w-md items-center gap-4 transition-all duration-700
          {i < visibleBoxes ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}"
      >
        <!-- The box visual -->
        <div class="relative flex h-28 w-36 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-dashed {box.color} shadow-md transition-transform duration-300 hover:scale-105">
          <!-- Label tag -->
          <div class="absolute -top-3 rounded-full bg-white px-3 py-0.5 text-xs font-bold {box.textColor} shadow-sm border {box.color}">
            {box.label}
          </div>
          <!-- Value inside -->
          <span class="text-xl font-bold {box.textColor}">{box.value}</span>
        </div>

        <!-- Description -->
        <p class="text-sm text-slate-600">{box.desc}</p>
      </div>
    {/each}
  </div>

  <div class="rounded-xl bg-blue-50 p-5 text-center">
    <p class="text-sm text-blue-800">
      In programming, we create variables to <strong>remember</strong> information.
      The label is the variable's <strong>name</strong>, and the contents are its <strong>value</strong>.
      You can change what's inside a box anytime!
    </p>
  </div>

  <div class="text-center">
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95"
    >
      I've read this
    </button>
  </div>
</div>
