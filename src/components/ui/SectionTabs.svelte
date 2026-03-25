<script lang="ts">
  import type { SectionType } from '../../lib/types';

  interface Props {
    activeSection: SectionType;
    completedSections: { explain: boolean; demo: boolean; exercise: boolean };
    onchange?: (section: SectionType) => void;
  }

  let { activeSection, completedSections, onchange }: Props = $props();

  const tabs: { key: SectionType; label: string; icon: string }[] = [
    { key: 'explain', label: 'Learn', icon: '📖' },
    { key: 'demo', label: 'Try It', icon: '🎮' },
    { key: 'exercise', label: 'Practice', icon: '✏️' },
  ];

  function handleClick(section: SectionType) {
    onchange?.(section);
  }
</script>

<div class="flex border-b border-slate-200">
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
