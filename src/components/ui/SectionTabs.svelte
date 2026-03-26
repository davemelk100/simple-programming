<script lang="ts">
  import type { SectionType } from '../../lib/types';

  interface Props {
    activeSection: SectionType;
    completedSections: { explain: boolean; demo: boolean; exercise: boolean; code: boolean };
    onchange?: (section: SectionType) => void;
  }

  let { activeSection, completedSections, onchange }: Props = $props();

  let dropdownOpen = $state(false);

  const tabs: { key: SectionType; label: string; icon: string }[] = [
    { key: 'explain', label: 'Learn', icon: '📖' },
    { key: 'demo', label: 'Try It', icon: '🎮' },
    { key: 'exercise', label: 'Practice', icon: '✏️' },
    { key: 'code', label: 'Code', icon: '💻' },
  ];

  let activeTab = $derived(tabs.find((t) => t.key === activeSection) ?? tabs[0]);

  function handleClick(section: SectionType) {
    dropdownOpen = false;
    onchange?.(section);
  }
</script>

<!-- Mobile: dropdown -->
<div class="relative lg:hidden">
  <button
    onclick={() => (dropdownOpen = !dropdownOpen)}
    class="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
  >
    <span class="flex items-center gap-2">
      <span class="text-lg">{activeTab.icon}</span>
      <span>{activeTab.label}</span>
      {#if completedSections[activeTab.key]}
        <span class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
          <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      {/if}
    </span>
    <svg class="h-5 w-5 text-slate-400 transition-transform {dropdownOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      {#each tabs as tab}
        <button
          onclick={() => handleClick(tab.key)}
          class="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors
            {activeSection === tab.key ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}"
        >
          <span class="text-lg">{tab.icon}</span>
          <span>{tab.label}</span>
          {#if completedSections[tab.key]}
            <span class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
              <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>

<!-- Desktop: horizontal tabs -->
<div class="hidden shrink-0 border-b border-slate-200 lg:flex lg:border-b-0">
  {#each tabs as tab}
    <button
      onclick={() => handleClick(tab.key)}
      class="relative flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors duration-200
        {activeSection === tab.key
          ? 'text-blue-600'
          : 'text-slate-500 hover:text-slate-700'}"
    >
      <span class="text-lg">{tab.icon}</span>
      <span>{tab.label}</span>

      {#if completedSections[tab.key]}
        <span class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
          <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      {/if}

      {#if activeSection === tab.key}
        <div class="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 transition-all duration-300"></div>
      {/if}
    </button>
  {/each}
</div>
