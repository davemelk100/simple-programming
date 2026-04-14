<script lang="ts">
  import { onMount } from 'svelte';
  import type { SectionType } from '../../lib/types';
  import { getAiBySlug, getNextAi, getPrevAi } from '../../lib/ai';
  import { loadProgress, markSectionComplete } from '../../lib/progress';
  import { getUser } from '../../lib/auth';
  import { setAdvanced } from '../../lib/mode';
  import SectionTabs from '../ui/SectionTabs.svelte';
  import Modal from '../ui/Modal.svelte';
  import CompletionModal from '../ui/CompletionModal.svelte';

  import WhatIsAnLlmExplain from './what-is-an-llm/WhatIsAnLlmExplain.svelte';
  import WhatIsAnLlmDemo from './what-is-an-llm/WhatIsAnLlmDemo.svelte';
  import WhatIsAnLlmExercise from './what-is-an-llm/WhatIsAnLlmExercise.svelte';
  import WhatIsAnLlmCode from './what-is-an-llm/WhatIsAnLlmCode.svelte';

  import GenerativeAiExplain from './generative-ai/GenerativeAiExplain.svelte';
  import GenerativeAiDemo from './generative-ai/GenerativeAiDemo.svelte';
  import GenerativeAiExercise from './generative-ai/GenerativeAiExercise.svelte';
  import GenerativeAiCode from './generative-ai/GenerativeAiCode.svelte';

  import AgenticAiExplain from './agentic-ai/AgenticAiExplain.svelte';
  import AgenticAiDemo from './agentic-ai/AgenticAiDemo.svelte';
  import AgenticAiExercise from './agentic-ai/AgenticAiExercise.svelte';
  import AgenticAiCode from './agentic-ai/AgenticAiCode.svelte';

  import CopilotsExplain from './copilots/CopilotsExplain.svelte';
  import CopilotsDemo from './copilots/CopilotsDemo.svelte';
  import CopilotsExercise from './copilots/CopilotsExercise.svelte';
  import CopilotsCode from './copilots/CopilotsCode.svelte';

  import ChatbotsExplain from './chatbots/ChatbotsExplain.svelte';
  import ChatbotsDemo from './chatbots/ChatbotsDemo.svelte';
  import ChatbotsExercise from './chatbots/ChatbotsExercise.svelte';
  import ChatbotsCode from './chatbots/ChatbotsCode.svelte';

  import AiFineTuningExplain from './ai-fine-tuning/AiFineTuningExplain.svelte';
  import AiFineTuningDemo from './ai-fine-tuning/AiFineTuningDemo.svelte';
  import AiFineTuningExercise from './ai-fine-tuning/AiFineTuningExercise.svelte';
  import AiFineTuningCode from './ai-fine-tuning/AiFineTuningCode.svelte';

  interface Props {
    aiSlug: string;
  }

  let { aiSlug }: Props = $props();

  let topic = $derived(getAiBySlug(aiSlug));
  let prevTopic = $derived(getPrevAi(aiSlug));
  let nextTopic = $derived(getNextAi(aiSlug));

  let activeSection = $state<SectionType>('explain');
  let completedSections = $state({ explain: false, demo: false, exercise: false, code: false, advanced: false });
  let userId = $state<string | null>(null);
  let showCompletionModal = $state(false);
  let completedSectionType = $state<SectionType>('explain');
  let completedScore = $state<number | undefined>(undefined);

  const colorMap: Record<string, string> = {
    blue: 'text-blue-700',
    purple: 'text-purple-700',
    green: 'text-green-700',
    orange: 'text-orange-700',
    pink: 'text-pink-700',
    indigo: 'text-indigo-700',
  };

  onMount(() => setAdvanced(false));

  onMount(async () => {
    try {
      const user = await getUser();
      if (user) {
        userId = user.id;
        const progress = await loadProgress(user.id);
        const topicProgress = progress[`ai-${aiSlug}`];
        if (topicProgress) {
          completedSections = {
            explain: topicProgress.explain?.completed ?? false,
            demo: topicProgress.demo?.completed ?? false,
            exercise: topicProgress.exercise?.completed ?? false,
            code: topicProgress.code?.completed ?? false,
            advanced: false,
          };
        }
      }
    } catch {
      // Not logged in
    }
  });

  function handleTabChange(section: SectionType) {
    setAdvanced(section === 'advanced');
    activeSection = section;
  }

  async function handleSectionComplete(section: SectionType, score?: number) {
    completedSections[section] = true;
    completedSectionType = section;
    completedScore = score;
    showCompletionModal = true;

    if (userId) {
      await markSectionComplete(userId, `ai-${aiSlug}`, section, score);
    }
  }

  const components: Record<string, Record<SectionType, any>> = {
    'what-is-an-llm': { explain: WhatIsAnLlmExplain, demo: WhatIsAnLlmDemo, exercise: WhatIsAnLlmExercise, code: WhatIsAnLlmCode },
    'generative-ai': { explain: GenerativeAiExplain, demo: GenerativeAiDemo, exercise: GenerativeAiExercise, code: GenerativeAiCode },
    'agentic-ai': { explain: AgenticAiExplain, demo: AgenticAiDemo, exercise: AgenticAiExercise, code: AgenticAiCode },
    'copilots': { explain: CopilotsExplain, demo: CopilotsDemo, exercise: CopilotsExercise, code: CopilotsCode },
    'chatbots': { explain: ChatbotsExplain, demo: ChatbotsDemo, exercise: ChatbotsExercise, code: ChatbotsCode },
    'ai-fine-tuning': { explain: AiFineTuningExplain, demo: AiFineTuningDemo, exercise: AiFineTuningExercise, code: AiFineTuningCode },
  };
</script>

{#if topic}
  <div class="space-y-6">
    <div class="flex flex-col gap-4">
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span class="text-2xl">{topic.icon}</span>
        <h1 class="text-2xl font-black {colorMap[topic.color] ?? 'text-slate-800'}">{topic.title}</h1>
      </div>

      <SectionTabs
        {activeSection}
        {completedSections}
        onchange={handleTabChange}
      />
    </div>

    <div class="min-h-[300px] rounded-2xl bg-white p-4 md:p-6 lg:p-8 shadow-sm border border-slate-100">
      {#if components[aiSlug]}
        {#if activeSection === 'explain'}
          <svelte:component
            this={components[aiSlug].explain}
            oncomplete={() => handleSectionComplete('explain')}
          />
        {:else if activeSection === 'demo'}
          <svelte:component
            this={components[aiSlug].demo}
            oncomplete={() => handleSectionComplete('demo')}
          />
        {:else if activeSection === 'exercise'}
          <svelte:component
            this={components[aiSlug].exercise}
            oncomplete={(score) => handleSectionComplete('exercise', score)}
          />
        {:else if activeSection === 'code'}
          <svelte:component
            this={components[aiSlug].code}
            oncomplete={() => handleSectionComplete('code')}
          />
        {:else if activeSection === 'advanced'}
          <svelte:component
            this={components[aiSlug].explain}
            oncomplete={() => handleSectionComplete('advanced')}
          />
        {/if}
      {:else}
        <p class="text-center text-slate-500">Content coming soon!</p>
      {/if}
    </div>

    <div class="flex items-center justify-between pt-2">
      {#if prevTopic}
        <a
          href={`/ai/${prevTopic.slug}`}
          class="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          {prevTopic.title}
        </a>
      {:else}
        <div></div>
      {/if}

      <a href="/" class="text-sm text-slate-500 hover:text-slate-600">All Topics</a>

      {#if nextTopic}
        <a
          href={`/ai/${nextTopic.slug}`}
          class="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200"
        >
          {nextTopic.title}
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      {:else}
        <div></div>
      {/if}
    </div>
  </div>

  <Modal open={showCompletionModal} onclose={() => (showCompletionModal = false)}>
    <CompletionModal
      topicTitle={topic.title}
      topicIcon={topic.icon}
      sectionType={completedSectionType}
      topicSlug={`ai-${aiSlug}`}
      score={completedScore}
      onclose={() => (showCompletionModal = false)}
    />
  </Modal>
{:else}
  <div class="text-center py-12">
    <p class="text-lg text-slate-500">Topic not found.</p>
    <a href="/" class="mt-4 inline-block text-blue-600 hover:underline">Back to home</a>
  </div>
{/if}
