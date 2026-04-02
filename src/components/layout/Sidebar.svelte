<script lang="ts">
  import { onMount } from 'svelte';
  import { topics, oopTopics } from '../../lib/topics';
  import { syntaxStyles } from '../../lib/syntax-styles';
  import { principles } from '../../lib/principles';
  import { toolboxTopics } from '../../lib/toolbox';
  import { testingQaTopics } from '../../lib/testing-qa';
  import { putItTogetherTopics } from '../../lib/put-it-together';
  import { aiUsingTopics, aiDevelopingTopics } from '../../lib/ai';
  import { userInterfaceTopics } from '../../lib/user-interface';

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

  const letters = 'abcdefghijklmnopqrstuvwxyz';

  type SectionKey = 'concepts' | 'syntaxprinciples' | 'execution' | 'builddeploy' | 'userinterface' | 'basics' | 'blocks' | 'syntax' | 'principles' | 'languages' | 'toolbox' | 'testingqa' | 'putittogether';

  let collapsed = $state<Record<SectionKey, boolean>>({
    concepts: false,
    syntaxprinciples: false,
    execution: false,
    builddeploy: false,
    userinterface: false,
    basics: false,
    blocks: false,
    syntax: false,
    principles: false,
    languages: false,
    toolbox: false,
    testingqa: false,
    putittogether: false,
  });

  function toggle(key: SectionKey) {
    collapsed[key] = !collapsed[key];
  }
</script>

<nav class="flex h-full w-64 shrink-0 flex-col gap-1 overflow-y-auto border-r border-slate-200 bg-white px-4 py-5">

  <a
    href="/"
    class="mb-2 flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium no-underline transition-colors {currentPath === '/' || currentPath === '' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}"
  >
    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"/></svg>
    Home
  </a>

  <hr class="my-1 border-slate-200" />

  <!-- ===== 1. CONCEPTS ===== -->
  <button
    onclick={() => toggle('concepts')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2"
  >
    <span class="text-sm font-bold uppercase tracking-wider text-slate-800 text-left" style="font-family: 'Roboto', sans-serif;">1. Concepts</span>
    <svg class="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 {collapsed.concepts ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.concepts}

  <!-- Basics -->
  <button
    onclick={() => toggle('basics')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2 pl-4"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Roboto', sans-serif;">Basics</span>
    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 {collapsed.basics ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.basics}
    {#each topics as topic, i}
      {@const active = isActive(topic.slug)}
      {@const colors = colorMap[topic.color]}
      <a
        href={`/topics/${topic.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 pl-6 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >

        <span class="text-base">{topic.icon}</span>
        {topic.title}
      </a>
    {/each}
  {/if}

  <!-- Building Blocks -->
  <button
    onclick={() => toggle('blocks')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2 pl-4"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Roboto', sans-serif;">Building Blocks</span>
    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 {collapsed.blocks ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.blocks}
    {#each oopTopics as topic, i}
      {@const active = isActive(topic.slug)}
      {@const colors = colorMap[topic.color]}
      <a
        href={`/topics/${topic.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 pl-6 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >

        <span class="text-base">{topic.icon}</span>
        {topic.title}
      </a>
    {/each}
  {/if}
  {/if}

  <hr class="my-3 border-slate-200" />

  <!-- ===== 2. SYNTAX & PRINCIPLES ===== -->
  <button
    onclick={() => toggle('syntaxprinciples')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2"
  >
    <span class="text-sm font-bold uppercase tracking-wider text-slate-800 text-left" style="font-family: 'Roboto', sans-serif;">2. Syntax & Principles</span>
    <svg class="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 {collapsed.syntaxprinciples ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.syntaxprinciples}

  <!-- Syntax Styles -->
  <button
    onclick={() => toggle('syntax')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2 pl-4"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Roboto', sans-serif;">Syntax Styles</span>
    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 {collapsed.syntax ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.syntax}
    {#each syntaxStyles as style, i}
      {@const active = currentPath.replace(/\/$/, '') === `/syntax-styles/${style.slug}`}
      {@const colors = colorMap[style.color]}
      <a
        href={`/syntax-styles/${style.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 pl-6 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >
        <span class="text-base">{style.icon}</span>
        {style.title}
      </a>
    {/each}
  {/if}

  <!-- Principles -->
  <button
    onclick={() => toggle('principles')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2 pl-4"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Roboto', sans-serif;">Principles</span>
    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 {collapsed.principles ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.principles}
    {#each principles as principle, i}
      {@const active = currentPath.replace(/\/$/, '') === `/principles/${principle.slug}`}
      {@const colors = colorMap[principle.color]}
      <a
        href={`/principles/${principle.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 pl-6 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >
        <span class="text-base">{principle.icon}</span>
        {principle.title}
      </a>
    {/each}
  {/if}
  {/if}

  <hr class="my-3 border-slate-200" />

  <!-- ===== 3. LANGUAGES & TOOLS ===== -->
  <button
    onclick={() => toggle('execution')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2"
  >
    <span class="text-sm font-bold uppercase tracking-wider text-slate-800 text-left" style="font-family: 'Roboto', sans-serif;">3. Languages & Tools</span>
    <svg class="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 {collapsed.execution ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.execution}

  <!-- Languages -->
  <button
    onclick={() => toggle('languages')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2 pl-4"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Roboto', sans-serif;">Languages</span>
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
    ] as lang, i}
      {@const active = currentPath.replace(/\/$/, '') === `/languages/${lang.slug}`}
      {@const colors = colorMap[lang.color]}
      <a
        href={`/languages/${lang.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 pl-6 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >

        <span class="text-base">{lang.icon}</span>
        {lang.title}
      </a>
    {/each}
  {/if}

  <!-- Toolbox -->
  <button
    onclick={() => toggle('toolbox')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2 pl-4"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Roboto', sans-serif;">Toolbox</span>
    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 {collapsed.toolbox ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.toolbox}
    {#each toolboxTopics as tool, i}
      {@const active = currentPath.replace(/\/$/, '') === `/toolbox/${tool.slug}`}
      {@const colors = colorMap[tool.color]}
      <a
        href={`/toolbox/${tool.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 pl-6 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >

        <span class="text-base">{tool.icon}</span>
        {tool.title}
      </a>
    {/each}
  {/if}

  {/if}

  <hr class="my-3 border-slate-200" />

  <!-- ===== 4. BUILD & SHIP ===== -->
  <button
    onclick={() => toggle('builddeploy')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2"
  >
    <span class="text-sm font-bold uppercase tracking-wider text-slate-800 text-left" style="font-family: 'Roboto', sans-serif;">4. Build & Ship</span>
    <svg class="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 {collapsed.builddeploy ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.builddeploy}

  <!-- Put It Together -->
  <button
    onclick={() => toggle('putittogether')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2 pl-4"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Roboto', sans-serif;">Put It Together</span>
    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 {collapsed.putittogether ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.putittogether}
    {#each putItTogetherTopics as topic, i}
      {@const active = currentPath.replace(/\/$/, '') === `/put-it-together/${topic.slug}`}
      {@const colors = colorMap[topic.color]}
      <a
        href={`/put-it-together/${topic.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 pl-6 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >
        <span class="text-base">{topic.icon}</span>
        {topic.title}
      </a>
    {/each}
  {/if}

  <!-- Testing & QA -->
  <button
    onclick={() => toggle('testingqa')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2 pl-4"
  >
    <span class="text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Roboto', sans-serif;">Testing &amp; QA</span>
    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 {collapsed.testingqa ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.testingqa}
    {#each testingQaTopics as topic, i}
      {@const active = currentPath.replace(/\/$/, '') === `/testing-qa/${topic.slug}`}
      {@const colors = colorMap[topic.color]}
      <a
        href={`/testing-qa/${topic.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 pl-6 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >
        <span class="text-base">{topic.icon}</span>
        {topic.title}
      </a>
    {/each}
  {/if}
  {/if}

  <hr class="my-3 border-slate-200" />

  <!-- ===== 5. USER INTERFACE ===== -->
  <button
    onclick={() => toggle('userinterface')}
    class="mb-1 flex w-full cursor-pointer items-center justify-between px-2"
  >
    <span class="text-sm font-bold uppercase tracking-wider text-slate-800 text-left" style="font-family: 'Roboto', sans-serif;">5. User Interface</span>
    <svg class="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 {collapsed.userinterface ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if !collapsed.userinterface}
    {#each userInterfaceTopics as topic}
      {@const active = currentPath.replace(/\/$/, '') === `/user-interface/${topic.slug}`}
      {@const colors = colorMap[topic.color]}
      <a
        href={`/user-interface/${topic.slug}`}
        class="flex items-center gap-2 rounded-lg px-3 py-2 pl-6 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
        aria-current={active ? 'page' : undefined}
      >
        <span class="text-base">{topic.icon}</span>
        {topic.title}
      </a>
    {/each}
  {/if}
</nav>
