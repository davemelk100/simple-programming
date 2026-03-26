<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

  const examples = [
    {
      parent: 'Animal',
      children: ['Dog', 'Cat'],
      methods: ['speak()', 'move()'],
      desc: 'Dog and Cat inherit speak() and move() from Animal, but each makes a different sound.',
    },
    {
      parent: 'Vehicle',
      children: ['Car', 'Bicycle'],
      methods: ['wheels', 'speed'],
      desc: 'Car and Bicycle both have wheels and speed, but with different values.',
    },
  ];

  let activeExample = $state(-1);

  onMount(() => {
    let i = 0;
    const interval = setInterval(() => {
      activeExample = i;
      i++;
      if (i >= examples.length) clearInterval(interval);
    }, 1400);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  <div>
    <p class="text-slate-600">
      Think of a <strong>family tree</strong>. Children inherit traits from their parents &mdash; eye color, height, abilities. In programming, <strong>inheritance</strong> lets you build new things from existing ones. Instead of rewriting everything from scratch, a child class gets all the parent's abilities for free &mdash; and can add its own on top!
    </p>
  </div>

  <div class="flex flex-col items-start gap-8">
      {#each examples as ex, i}
        <div
          class="w-full transition-all duration-700
            {i <= activeExample ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}"
        >
          <!-- Parent -->
          <div class="flex flex-col items-center">
            <div class="flex h-16 w-40 items-center justify-center rounded-xl border-2 border-purple-400 bg-purple-100 shadow-md
              {i === activeExample ? 'animate-pop' : ''}">
              <div class="text-center">
                <span class="text-xs text-purple-500">parent</span>
                <div class="text-sm font-bold text-purple-700">{ex.parent}</div>
              </div>
            </div>

            <!-- Connector lines -->
            <div class="flex items-start">
              <div class="h-6 w-0.5 bg-purple-300"></div>
            </div>
            <div class="flex items-center gap-16">
              {#each ex.children as _, ci}
                <div class="h-0.5 w-12 bg-purple-300"></div>
                {#if ci < ex.children.length - 1}
                  <div class="h-0.5 w-8 bg-purple-300"></div>
                {/if}
              {/each}
            </div>

            <!-- Children -->
            <div class="mt-1 flex gap-6">
              {#each ex.children as child}
                <div class="flex flex-col items-center gap-1">
                  <div class="h-4 w-0.5 bg-purple-300"></div>
                  <div class="flex h-14 w-28 items-center justify-center rounded-lg border-2 border-purple-300 bg-purple-50 shadow-sm
                    {i === activeExample ? 'animate-bounce-subtle' : ''}">
                    <div class="text-center">
                      <span class="text-xs text-purple-400">child</span>
                      <div class="text-sm font-bold text-purple-600">{child}</div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>

            <!-- Inherited methods -->
            <div class="mt-2 flex flex-wrap justify-center gap-2">
              {#each ex.methods as method}
                <span class="rounded-full bg-purple-200 px-3 py-0.5 text-xs font-medium text-purple-700">{method}</span>
              {/each}
              <span class="text-xs text-purple-400 self-center">inherited</span>
            </div>
          </div>

          {#if i <= activeExample}
            <p class="mt-3 text-slate-500">{ex.desc}</p>
          {/if}
        </div>
      {/each}
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
  @keyframes popIn {
    0% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
  .animate-pop {
    animation: popIn 0.4s ease-out;
  }
  .animate-bounce-subtle {
    animation: popIn 0.3s ease-out;
  }
</style>
