<script lang="ts">
  import type { Topic } from '../../lib/types';

  interface Props {
    topic: Topic;
    completed?: boolean;
  }

  let { topic, completed = false }: Props = $props();

  const colorMap: Record<string, { border: string; bg: string; text: string }> = {
    blue: { border: 'border-l-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
    purple: { border: 'border-l-purple-500', bg: 'bg-purple-50', text: 'text-purple-700' },
    green: { border: 'border-l-green-500', bg: 'bg-green-50', text: 'text-green-700' },
    orange: { border: 'border-l-orange-500', bg: 'bg-orange-50', text: 'text-orange-700' },
    yellow: { border: 'border-l-yellow-500', bg: 'bg-yellow-50', text: 'text-yellow-700' },
    pink: { border: 'border-l-pink-500', bg: 'bg-pink-50', text: 'text-pink-700' },
    indigo: { border: 'border-l-indigo-500', bg: 'bg-indigo-50', text: 'text-indigo-700' },
  };

  let colors = $derived(colorMap[topic.color] ?? colorMap.blue);
</script>

<a
  href={`/topics/${topic.slug}`}
  class="group relative block rounded-xl border-l-4 bg-white p-4 lg:p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg {colors.border}"
>
  {#if completed}
    <div class="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white shadow-sm">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  {/if}

  <div class="mb-2 text-3xl">{topic.icon}</div>

  <h3 class="mb-1 text-lg font-bold text-slate-800 group-hover:{colors.text} transition-colors duration-200">
    {topic.title}
  </h3>

  <p class="text-sm leading-relaxed text-slate-500">
    {topic.description}
  </p>

  <div class="mt-3 flex items-center text-sm font-medium {colors.text} opacity-0 transition-opacity duration-200 group-hover:opacity-100">
    Start learning
    <svg class="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </div>
</a>
