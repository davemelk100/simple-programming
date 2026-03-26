<script lang="ts">
  import { topics, oopTopics } from '../../lib/topics';

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
</script>

<nav class="flex h-full w-64 shrink-0 flex-col gap-0.5 overflow-y-auto border-r border-slate-200 bg-white px-3 py-4">
  <span class="mb-2 px-2 text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Permanent Marker', cursive;">Basics</span>
  {#each topics as topic}
    {@const active = isActive(topic.slug)}
    {@const colors = colorMap[topic.color]}
    <a
      href={`/topics/${topic.slug}`}
      class="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
      aria-current={active ? 'page' : undefined}
    >
      <span class="text-base">{topic.icon}</span>
      {topic.title}
    </a>
  {/each}

  <hr class="my-3 border-slate-200" />

  <span class="mb-2 px-2 text-sm font-semibold uppercase tracking-wider text-slate-500" style="font-family: 'Permanent Marker', cursive;">Object-Oriented</span>
  {#each oopTopics as topic}
    {@const active = isActive(topic.slug)}
    {@const colors = colorMap[topic.color]}
    <a
      href={`/topics/${topic.slug}`}
      class="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
      aria-current={active ? 'page' : undefined}
    >
      <span class="text-base">{topic.icon}</span>
      {topic.title}
    </a>
  {/each}
</nav>
