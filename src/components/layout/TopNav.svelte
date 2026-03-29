<script lang="ts">
  import { topics, oopTopics } from '../../lib/topics';
  import { syntaxStyles } from '../../lib/syntax-styles';
  import { principles } from '../../lib/principles';
  import { toolboxTopics } from '../../lib/toolbox';
  import { testingQaTopics } from '../../lib/testing-qa';
  import { putItTogetherTopics } from '../../lib/put-it-together';
  import { aiTopics } from '../../lib/ai';

  interface Props {
    currentPath?: string;
  }

  let { currentPath = '' }: Props = $props();

  const colorMap: Record<string, { hover: string; active: string }> = {
    blue: { hover: 'hover:bg-blue-50 hover:text-blue-700', active: 'bg-blue-50 text-blue-700' },
    purple: { hover: 'hover:bg-purple-50 hover:text-purple-700', active: 'bg-purple-50 text-purple-700' },
    green: { hover: 'hover:bg-green-50 hover:text-green-700', active: 'bg-green-50 text-green-700' },
    orange: { hover: 'hover:bg-orange-50 hover:text-orange-700', active: 'bg-orange-50 text-orange-700' },
    yellow: { hover: 'hover:bg-yellow-50 hover:text-yellow-700', active: 'bg-yellow-50 text-yellow-700' },
    pink: { hover: 'hover:bg-pink-50 hover:text-pink-700', active: 'bg-pink-50 text-pink-700' },
    indigo: { hover: 'hover:bg-indigo-50 hover:text-indigo-700', active: 'bg-indigo-50 text-indigo-700' },
  };

  let openMenu = $state<string | null>(null);

  const sections = [
    { key: 'basics', label: 'Basics', items: topics.map(t => ({ ...t, href: `/topics/${t.slug}` })) },
    { key: 'blocks', label: 'Building Blocks', items: oopTopics.map(t => ({ ...t, href: `/topics/${t.slug}` })) },
    { key: 'syntax', label: 'Syntax Styles', items: syntaxStyles.map(t => ({ ...t, href: `/syntax-styles/${t.slug}` })) },
    { key: 'principles', label: 'Principles', items: principles.map(t => ({ ...t, href: `/principles/${t.slug}` })) },
    { key: 'languages', label: 'Languages', items: [
      { slug: 'typescript', icon: '🟦', title: 'TypeScript / JavaScript', color: 'blue', href: '/languages/typescript' },
      { slug: 'python', icon: '🐍', title: 'Python', color: 'green', href: '/languages/python' },
      { slug: 'go', icon: '🐹', title: 'Go', color: 'blue', href: '/languages/go' },
      { slug: 'csharp', icon: '🟪', title: 'C#', color: 'purple', href: '/languages/csharp' },
    ] },
    { key: 'toolbox', label: 'Toolbox', items: toolboxTopics.map(t => ({ ...t, href: `/toolbox/${t.slug}` })) },
    { key: 'testingqa', label: 'Testing & QA', items: testingQaTopics.map(t => ({ ...t, href: `/testing-qa/${t.slug}` })) },
    { key: 'putittogether', label: 'Put It Together', items: putItTogetherTopics.map(t => ({ ...t, href: `/put-it-together/${t.slug}` })) },
    { key: 'ai', label: 'AI', items: aiTopics.map(t => ({ ...t, href: `/ai/${t.slug}` })) },
  ];

  function isItemActive(href: string): boolean {
    return currentPath.replace(/\/$/, '') === href;
  }

  function isSectionActive(section: typeof sections[0]): boolean {
    return section.items.some(item => isItemActive(item.href));
  }

  function handleToggle(key: string) {
    openMenu = openMenu === key ? null : key;
  }

  function handleClose() {
    openMenu = null;
  }
</script>

<svelte:window onclick={handleClose} />

<nav class="hidden border-b border-slate-200 bg-white lg:block">
  <div class="mx-auto flex flex-wrap items-center gap-1 px-4 py-2">
    {#each sections as section}
      <div class="relative">
        <button
          onclick={(e) => { e.stopPropagation(); handleToggle(section.key); }}
          class="rounded-md px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors
            {isSectionActive(section) ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
            {openMenu === section.key ? 'bg-slate-100 text-slate-800' : ''}"
        >
          {section.label}
          <svg class="ml-1 inline h-3 w-3 transition-transform {openMenu === section.key ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {#if openMenu === section.key}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            class="absolute left-0 top-full z-50 mt-1 min-w-52 rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
            onclick={(e) => e.stopPropagation()}
          >
            {#each section.items as item}
              {@const active = isItemActive(item.href)}
              {@const colors = colorMap[item.color]}
              <a
                href={item.href}
                onclick={handleClose}
                class="flex items-center gap-2 px-3 py-2 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
                aria-current={active ? 'page' : undefined}
              >
                <span class="text-base">{item.icon}</span>
                {item.title}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</nav>
