<script lang="ts">
  import { onMount } from 'svelte';
  import type { SectionType } from '../../lib/types';
  import { getTestingQaBySlug, getNextTestingQa, getPrevTestingQa } from '../../lib/testing-qa';
  import { loadProgress, markSectionComplete } from '../../lib/progress';
  import { getUser } from '../../lib/auth';
  import { setAdvanced } from '../../lib/mode';
  import SectionTabs from '../ui/SectionTabs.svelte';
  import SubNav from '../ui/SubNav.svelte';
  import Modal from '../ui/Modal.svelte';
  import CompletionModal from '../ui/CompletionModal.svelte';
  import { testingQaTopics } from '../../lib/testing-qa';

  import UnitTestingExplain from './unit-testing/UnitTestingExplain.svelte';
  import UnitTestingDemo from './unit-testing/UnitTestingDemo.svelte';
  import UnitTestingExercise from './unit-testing/UnitTestingExercise.svelte';
  import UnitTestingCode from './unit-testing/UnitTestingCode.svelte';

  import IntegrationTestingExplain from './integration-testing/IntegrationTestingExplain.svelte';
  import IntegrationTestingDemo from './integration-testing/IntegrationTestingDemo.svelte';
  import IntegrationTestingExercise from './integration-testing/IntegrationTestingExercise.svelte';
  import IntegrationTestingCode from './integration-testing/IntegrationTestingCode.svelte';

  import E2eTestingExplain from './end-to-end-testing/E2eTestingExplain.svelte';
  import E2eTestingDemo from './end-to-end-testing/E2eTestingDemo.svelte';
  import E2eTestingExercise from './end-to-end-testing/E2eTestingExercise.svelte';
  import E2eTestingCode from './end-to-end-testing/E2eTestingCode.svelte';

  import DebuggingExplain from './debugging/DebuggingExplain.svelte';
  import DebuggingDemo from './debugging/DebuggingDemo.svelte';
  import DebuggingExercise from './debugging/DebuggingExercise.svelte';
  import DebuggingCode from './debugging/DebuggingCode.svelte';

  import CodeReviewExplain from './code-review/CodeReviewExplain.svelte';
  import CodeReviewDemo from './code-review/CodeReviewDemo.svelte';
  import CodeReviewExercise from './code-review/CodeReviewExercise.svelte';
  import CodeReviewCode from './code-review/CodeReviewCode.svelte';

  interface Props {
    topicSlug: string;
  }

  let { topicSlug }: Props = $props();

  let topic = $derived(getTestingQaBySlug(topicSlug));
  let prevTopic = $derived(getPrevTestingQa(topicSlug));
  let nextTopic = $derived(getNextTestingQa(topicSlug));

  let activeSection = $state<SectionType>('explain');
  let completedSections = $state({ explain: false, demo: false, exercise: false, code: false, advanced: false });
  let userId = $state<string | null>(null);
  let showCompletionModal = $state(false);
  let completedSectionType = $state<SectionType>('explain');
  let completedScore = $state<number | undefined>(undefined);

  const colorMap: Record<string, string> = {
    green: 'text-green-700',
    blue: 'text-blue-700',
    purple: 'text-purple-700',
    orange: 'text-orange-700',
    indigo: 'text-indigo-700',
  };

  onMount(() => setAdvanced(false));

  onMount(async () => {
    try {
      const user = await getUser();
      if (user) {
        userId = user.id;
        const progress = await loadProgress(user.id);
        const topicProgress = progress[`testing-qa-${topicSlug}`];
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
      await markSectionComplete(userId, `testing-qa-${topicSlug}`, section, score);
    }
  }

  const components: Record<string, Record<SectionType, any>> = {
    'unit-testing': { explain: UnitTestingExplain, demo: UnitTestingDemo, exercise: UnitTestingExercise, code: UnitTestingCode },
    'integration-testing': { explain: IntegrationTestingExplain, demo: IntegrationTestingDemo, exercise: IntegrationTestingExercise, code: IntegrationTestingCode },
    'end-to-end-testing': { explain: E2eTestingExplain, demo: E2eTestingDemo, exercise: E2eTestingExercise, code: E2eTestingCode },
    'debugging': { explain: DebuggingExplain, demo: DebuggingDemo, exercise: DebuggingExercise, code: DebuggingCode },
    'code-review': { explain: CodeReviewExplain, demo: CodeReviewDemo, exercise: CodeReviewExercise, code: CodeReviewCode },
  };
</script>

{#if topic}
  <div class="space-y-6">
    <div class="flex flex-col gap-4">
      <SubNav items={testingQaTopics} currentSlug={topicSlug} basePath="/testing-qa" />
    </div>

    <div class="min-h-[300px] rounded-2xl bg-white shadow-sm border border-slate-100 p-4 md:p-6 lg:p-8 card-with-tabs">
      <div class="title-row">
        <h2 class="text-2xl font-bold text-slate-800" style="font-family: 'Permanent Marker', sans-serif;">{topic.title}</h2>
        <SectionTabs
          {activeSection}
          {completedSections}
          onchange={handleTabChange}
        />
      </div>
      <div class="content-row">
      {#if components[topicSlug]}
        {#if activeSection === 'explain'}
          <svelte:component
            this={components[topicSlug].explain}
            oncomplete={() => handleSectionComplete('explain')}
          />
        {:else if activeSection === 'demo'}
          <svelte:component
            this={components[topicSlug].demo}
            oncomplete={() => handleSectionComplete('demo')}
          />
        {:else if activeSection === 'exercise'}
          <svelte:component
            this={components[topicSlug].exercise}
            oncomplete={(score) => handleSectionComplete('exercise', score)}
          />
        {:else if activeSection === 'code'}
          <svelte:component
            this={components[topicSlug].code}
            oncomplete={() => handleSectionComplete('code')}
          />
        {:else if activeSection === 'advanced'}
          <svelte:component
            this={components[topicSlug].explain}
            oncomplete={() => handleSectionComplete('advanced')}
          />
        {/if}
      {:else}
        <p class="text-center text-slate-500">Content coming soon!</p>
      {/if}
      </div>
    </div>

    <div class="flex items-center justify-between pt-2">
      {#if prevTopic}
        <a
          href={`/testing-qa/${prevTopic.slug}`}
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
          href={`/testing-qa/${nextTopic.slug}`}
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
      topicSlug={`testing-qa-${topicSlug}`}
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
