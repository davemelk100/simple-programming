<script lang="ts">
  import type { Topic } from '../../lib/types';

  interface Props {
    items: Topic[];
    currentSlug: string;
    basePath: string;
    label?: string;
  }

  let { items, currentSlug, basePath, label }: Props = $props();

  let dropdownOpen = $state(false);
  let currentItem = $derived(items.find(i => i.slug === currentSlug));
</script>

<!-- Mobile: dropdown -->
<div class="relative sm:hidden">
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

<!-- Desktop: label + pills on one row -->
<nav class="hidden sm:flex sm:items-center gap-3">
  {#if label}
    <span class="shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
  {/if}
  <div class="flex flex-wrap gap-1.5">
    {#each items as item}
      {@const active = item.slug === currentSlug}
      <a
        href="{basePath}/{item.slug}"
        class="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium no-underline transition-colors {active ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
      >
        <span>{item.icon}</span>
        {item.title}
      </a>
    {/each}
  </div>
</nav>
