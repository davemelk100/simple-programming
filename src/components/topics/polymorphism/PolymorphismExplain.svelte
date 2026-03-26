<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

  const examples = [
    {
      method: 'shape.area()',
      items: [
        { label: 'Circle', call: 'circle.area()', result: '3.14 x r x r', icon: 'circle' },
        { label: 'Rectangle', call: 'rect.area()', result: 'w x h', icon: 'rect' },
      ],
      desc: 'Same method name area(), but Circle uses pi * r * r while Rectangle uses width * height.',
    },
    {
      method: 'animal.speak()',
      items: [
        { label: 'Dog', call: 'dog.speak()', result: '"Woof!"', icon: 'dog' },
        { label: 'Cat', call: 'cat.speak()', result: '"Meow!"', icon: 'cat' },
      ],
      desc: 'Same method name speak(), but each animal produces a different sound.',
    },
  ];

  const remoteDevices = [
    { name: 'TV', action: 'Plays video', emoji: 'TV' },
    { name: 'Radio', action: 'Plays music', emoji: 'Radio' },
    { name: 'Phone', action: 'Plays podcast', emoji: 'Phone' },
  ];

  let activeRemote = $state(-1);
  let activeExample = $state(-1);

  onMount(() => {
    let r = 0;
    const remoteInterval = setInterval(() => {
      activeRemote = r;
      r++;
      if (r >= remoteDevices.length) {
        clearInterval(remoteInterval);
        let e = 0;
        const exInterval = setInterval(() => {
          activeExample = e;
          e++;
          if (e >= examples.length) clearInterval(exInterval);
        }, 1400);
      }
    }, 1000);
    return () => clearInterval(remoteInterval);
  });
</script>

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Same Interface, Different Behavior</h2>
    <p class="max-w-lg text-slate-600">
      Imagine a <strong>universal remote</strong>. You press the same &ldquo;Play&rdquo; button, but each device does something different. That's <strong>polymorphism</strong> &mdash; you can treat different objects the same way, call the same method on any of them, and each one knows how to respond in its own way.
    </p>
  </div>

  <div class="space-y-8">
      <!-- Remote metaphor -->
      <div class="flex flex-col items-start gap-4">
        <div class="flex h-14 w-32 items-center justify-center rounded-xl border-2 border-orange-400 bg-orange-100 font-bold text-orange-700 shadow-md">
          Play
        </div>
        <div class="flex items-center gap-6">
          {#each remoteDevices as device, i}
            <div class="flex flex-col items-center gap-2 transition-all duration-500
              {i <= activeRemote ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}">
              <svg class="h-5 w-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <div class="flex h-16 w-24 flex-col items-center justify-center rounded-lg border-2 shadow-sm transition-all duration-300
                {i === activeRemote ? 'border-orange-400 bg-orange-50 scale-110' : 'border-slate-200 bg-white'}">
                <span class="text-xs font-bold text-orange-700">{device.name}</span>
                <span class="text-xs text-slate-500">{device.action}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Code examples -->
      {#each examples as ex, i}
        <div class="transition-all duration-700
          {i <= activeExample ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}">
          <h3 class="mb-3 text-lg font-bold text-orange-700">{ex.method}</h3>
          <div class="flex flex-wrap items-start justify-start gap-4">
            {#each ex.items as item}
              <div class="flex w-48 flex-col items-center gap-2">
                <!-- Shape icon -->
                {#if item.icon === 'circle'}
                  <div class="flex h-14 w-14 items-center justify-center rounded-full border-2 border-orange-400 bg-orange-50">
                    <span class="text-xs font-bold text-orange-700">Circle</span>
                  </div>
                {:else if item.icon === 'rect'}
                  <div class="flex h-10 w-16 items-center justify-center rounded border-2 border-orange-400 bg-orange-50">
                    <span class="text-xs font-bold text-orange-700">Rect</span>
                  </div>
                {:else if item.icon === 'dog'}
                  <div class="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-orange-400 bg-orange-50">
                    <span class="text-lg">Dog</span>
                  </div>
                {:else}
                  <div class="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-orange-400 bg-orange-50">
                    <span class="text-lg">Cat</span>
                  </div>
                {/if}
                <code class="text-xs text-orange-600">{item.call}</code>
                <div class="rounded-lg bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                  {item.result}
                </div>
              </div>
            {/each}
          </div>
          {#if i <= activeExample}
            <p class="mt-2 text-slate-500">{ex.desc}</p>
          {/if}
        </div>
      {/each}
    </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
    >
      I've read this
    </button>
  </div>
</div>
