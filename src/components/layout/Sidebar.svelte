<script lang="ts">
  import { onMount } from 'svelte';
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

  function isActive(slug: string): boolean {
    return currentPath.replace(/\/$/, '') === `/topics/${slug}`;
  }

  const STORAGE_KEY = 'sidebar-collapsed';

  type SectionKey = 'basics' | 'blocks' | 'syntax' | 'principles' | 'languages' | 'toolbox' | 'testingqa' | 'putittogether' | 'ai';

  let collapsed = $state<Record<SectionKey, boolean>>({
    basics: false,
    blocks: false,
    syntax: false,
    principles: false,
    languages: false,
    toolbox: false,
    testingqa: false,
    putittogether: false,
    ai: false,
  });

  onMount(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) collapsed = { ...collapsed, ...JSON.parse(stored) };
    } catch {}

    // Auto-expand the section containing the active page
    const path = currentPath.replace(/\/$/, '');
    if (topics.some(t => path === `/topics/${t.slug}`)) collapsed.basics = false;
    if (oopTopics.some(t => path === `/topics/${t.slug}`)) collapsed.blocks = false;
    if (path.startsWith('/syntax-styles/')) collapsed.syntax = false;
    if (path.startsWith('/principles/')) collapsed.principles = false;
    if (path.startsWith('/languages/')) collapsed.languages = false;
    if (path.startsWith('/toolbox/')) collapsed.toolbox = false;
    if (path.startsWith('/testing-qa/')) collapsed.testingqa = false;
    if (path.startsWith('/put-it-together/')) collapsed.putittogether = false;
    if (path.startsWith('/ai/')) collapsed.ai = false;
  });

  function toggle(key: SectionKey) {
    collapsed[key] = !collapsed[key];
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(collapsed)); } catch {}
  }
</script>

<nav class="flex h-full w-64 shrink-0 flex-col gap-1 overflow-y-auto border-r border-slate-200 bg-white px-4 py-5">
  <!-- Basics -->
  <button
    onclick={() => toggle('basics')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Permanent Marker';">Basics</span>
    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 {collapsed.basics ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.basics}
    {#each topics as topic}
      {@const active = isActive(topic.slug)}
      {@const colors = colorMap[topic.color]}
      <a
        href={`/topics/${topic.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >
        <span class="text-base">{topic.icon}</span>
        {topic.title}
      </a>
    {/each}
  {/if}

  <hr class="my-3 border-slate-200" />

  <!-- Building Blocks -->
  <button
    onclick={() => toggle('blocks')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Permanent Marker';">Building Blocks</span>
    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 {collapsed.blocks ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.blocks}
    {#each oopTopics as topic}
      {@const active = isActive(topic.slug)}
      {@const colors = colorMap[topic.color]}
      <a
        href={`/topics/${topic.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >
        <span class="text-base">{topic.icon}</span>
        {topic.title}
      </a>
    {/each}
  {/if}

  <hr class="my-3 border-slate-200" />

  <!-- Syntax Styles -->
  <button
    onclick={() => toggle('syntax')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Permanent Marker';">Syntax Styles</span>
    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 {collapsed.syntax ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.syntax}
    {#each syntaxStyles as style}
      {@const active = currentPath.replace(/\/$/, '') === `/syntax-styles/${style.slug}`}
      {@const colors = colorMap[style.color]}
      <a
        href={`/syntax-styles/${style.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >
        <span class="text-base">{style.icon}</span>
        {style.title}
      </a>
    {/each}
  {/if}

  <hr class="my-3 border-slate-200" />

  <!-- Principles -->
  <button
    onclick={() => toggle('principles')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Permanent Marker';">Principles</span>
    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 {collapsed.principles ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.principles}
    {#each principles as principle}
      {@const active = currentPath.replace(/\/$/, '') === `/principles/${principle.slug}`}
      {@const colors = colorMap[principle.color]}
      <a
        href={`/principles/${principle.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >
        <span class="text-base">{principle.icon}</span>
        {principle.title}
      </a>
    {/each}
  {/if}

  <hr class="my-3 border-slate-200" />

  <!-- Languages -->
  <button
    onclick={() => toggle('languages')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Permanent Marker';">Languages</span>
    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 {collapsed.languages ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.languages}
    {#each [
      { slug: 'typescript', icon: '🟦', title: 'TypeScript / JavaScript', color: 'blue' },
      { slug: 'python', icon: '🐍', title: 'Python', color: 'green' },
      { slug: 'go', icon: '🐹', title: 'Go', color: 'blue' },
      { slug: 'csharp', icon: '🟪', title: 'C#', color: 'purple' },
    ] as lang}
      {@const active = currentPath.replace(/\/$/, '') === `/languages/${lang.slug}`}
      {@const colors = colorMap[lang.color]}
      <a
        href={`/languages/${lang.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >
        <span class="text-base">{lang.icon}</span>
        {lang.title}
      </a>
    {/each}
  {/if}

  <hr class="my-3 border-slate-200" />

  <!-- Toolbox -->
  <button
    onclick={() => toggle('toolbox')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Permanent Marker';">Toolbox</span>
    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 {collapsed.toolbox ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.toolbox}
    {#each toolboxTopics as tool}
      {@const active = currentPath.replace(/\/$/, '') === `/toolbox/${tool.slug}`}
      {@const colors = colorMap[tool.color]}
      <a
        href={`/toolbox/${tool.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >
        <span class="text-base">{tool.icon}</span>
        {tool.title}
      </a>
    {/each}
  {/if}

  <hr class="my-3 border-slate-200" />

  <!-- Testing & QA -->
  <button
    onclick={() => toggle('testingqa')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Permanent Marker';">Testing &amp; QA</span>
    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 {collapsed.testingqa ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.testingqa}
    {#each testingQaTopics as topic}
      {@const active = currentPath.replace(/\/$/, '') === `/testing-qa/${topic.slug}`}
      {@const colors = colorMap[topic.color]}
      <a
        href={`/testing-qa/${topic.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >
        <span class="text-base">{topic.icon}</span>
        {topic.title}
      </a>
    {/each}
  {/if}

  <hr class="my-3 border-slate-200" />

  <!-- Put It Together -->
  <button
    onclick={() => toggle('putittogether')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Permanent Marker';">Put It Together</span>
    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 {collapsed.putittogether ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.putittogether}
    {#each putItTogetherTopics as topic}
      {@const active = currentPath.replace(/\/$/, '') === `/put-it-together/${topic.slug}`}
      {@const colors = colorMap[topic.color]}
      <a
        href={`/put-it-together/${topic.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >
        <span class="text-base">{topic.icon}</span>
        {topic.title}
      </a>
    {/each}
  {/if}

  <hr class="my-3 border-slate-200" />

  <!-- AI -->
  <button
    onclick={() => toggle('ai')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Permanent Marker';">AI</span>
    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 {collapsed.ai ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.ai}
    {#each aiTopics as topic}
      {@const active = currentPath.replace(/\/$/, '') === `/ai/${topic.slug}`}
      {@const colors = colorMap[topic.color]}
      <a
        href={`/ai/${topic.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >
        <span class="text-base">{topic.icon}</span>
        {topic.title}
      </a>
    {/each}
  {/if}
</nav>
