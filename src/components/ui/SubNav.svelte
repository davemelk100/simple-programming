<script lang="ts">
  import type { Topic } from '../../lib/types';

  interface Props {
    items: Topic[];
    currentSlug: string;
    basePath: string;
  }

  let { items, currentSlug, basePath }: Props = $props();

  let dropdownOpen = $state(false);
  let currentItem = $derived(items.find(i => i.slug === currentSlug));
</script>

<!-- Mobile: dropdown -->
<div class="relative lg:hidden px-5">
  <button
    onclick={() => (dropdownOpen = !dropdownOpen)}
    class="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
  >
    <span class="flex items-center gap-2">
      {#if currentItem}
        <span class="text-lg">{currentItem.icon}</span>
        <span>{currentItem.title}</span>
      {/if}
    </span>
    <svg class="h-5 w-5 text-slate-500 transition-transform {dropdownOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {#if dropdownOpen}
    <button
      class="fixed inset-0 z-10"
      onclick={() => (dropdownOpen = false)}
      aria-label="Close dropdown"
      tabindex="-1"
    ></button>
    <div class="absolute left-0 right-0 z-20 mt-1 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
      {#each items as item}
        {@const active = item.slug === currentSlug}
        <a
          href="{basePath}/{item.slug}"
          class="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium no-underline transition-colors
            {active ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}"
        >
          <span class="text-lg">{item.icon}</span>
          <span>{item.title}</span>
        </a>
      {/each}
    </div>
  {/if}
</div>

<!-- Desktop: label + tabs on one row -->
<nav class="hidden lg:flex lg:items-center relative px-4" style="background-color: #edf5fe; width: 100vw; left: 50%; margin-left: -50vw;">
  <div class="flex">
    {#each items as item}
      {@const active = item.slug === currentSlug}
      <a
        href="{basePath}/{item.slug}"
        style="font-family: 'Roboto', sans-serif; {active ? 'color: #085899;' : ''}"
        class="relative flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap no-underline transition-colors duration-200 {active ? '' : 'text-slate-400 hover:text-slate-600'}"
      >
        <span>{item.title}</span>
        {#if active}
          <div class="absolute bottom-0 left-0 h-1 w-full transition-all duration-300" style="background-color: #085899;"></div>
        {/if}
      </a>
    {/each}
  </div>
</nav>
