<script lang="ts">
  import { onMount } from 'svelte';
  import type { SectionType } from '../../lib/types';
  import { getPrincipleBySlug, getNextPrinciple, getPrevPrinciple } from '../../lib/principles';
  import { loadProgress, markSectionComplete } from '../../lib/progress';
  import { getUser } from '../../lib/auth';
  import { setAdvanced } from '../../lib/mode';
  import AiSection from '../ui/AiSection.svelte';
  import SectionTabs from '../ui/SectionTabs.svelte';
  import SubNav from '../ui/SubNav.svelte';
  import Modal from '../ui/Modal.svelte';
  import CompletionModal from '../ui/CompletionModal.svelte';
  import { principles } from '../../lib/principles';

  // Naming components
  import NamingExplain from './naming/NamingExplain.svelte';
  import NamingDemo from './naming/NamingDemo.svelte';
  import NamingExercise from './naming/NamingExercise.svelte';
  import NamingCode from './naming/NamingCode.svelte';

  // Keep It Simple components
  import KeepItSimpleExplain from './keep-it-simple/KeepItSimpleExplain.svelte';
  import KeepItSimpleDemo from './keep-it-simple/KeepItSimpleDemo.svelte';
  import KeepItSimpleExercise from './keep-it-simple/KeepItSimpleExercise.svelte';
  import KeepItSimpleCode from './keep-it-simple/KeepItSimpleCode.svelte';

  // DRY components
  import DryExplain from './dry/DryExplain.svelte';
  import DryDemo from './dry/DryDemo.svelte';
  import DryExercise from './dry/DryExercise.svelte';
  import DryCode from './dry/DryCode.svelte';

  // Testing components
  import TestingExplain from './testing/TestingExplain.svelte';
  import TestingDemo from './testing/TestingDemo.svelte';
  import TestingExercise from './testing/TestingExercise.svelte';
  import TestingCode from './testing/TestingCode.svelte';

  // Code Organization components
  import CodeOrganizationExplain from './code-organization/CodeOrganizationExplain.svelte';
  import CodeOrganizationDemo from './code-organization/CodeOrganizationDemo.svelte';
  import CodeOrganizationExercise from './code-organization/CodeOrganizationExercise.svelte';
  import CodeOrganizationCode from './code-organization/CodeOrganizationCode.svelte';

  // Planning components
  import PlanningExplain from './planning/PlanningExplain.svelte';
  import PlanningDemo from './planning/PlanningDemo.svelte';
  import PlanningExercise from './planning/PlanningExercise.svelte';
  import PlanningCode from './planning/PlanningCode.svelte';

  interface Props {
    principleSlug: string;
  }

  let { principleSlug }: Props = $props();

  let principle = $derived(getPrincipleBySlug(principleSlug));
  let prevPrinciple = $derived(getPrevPrinciple(principleSlug));
  let nextPrinciple = $derived(getNextPrinciple(principleSlug));

  let activeSection = $state<SectionType>('explain');
  let completedSections = $state({ explain: false, demo: false, exercise: false, code: false, advanced: false, ai: false });
  let userId = $state<string | null>(null);
  let showCompletionModal = $state(false);
  let completedSectionType = $state<SectionType>('explain');
  let completedScore = $state<number | undefined>(undefined);

  const colorMap: Record<string, string> = {
    blue: 'text-blue-700',
    purple: 'text-purple-700',
    green: 'text-green-700',
    orange: 'text-orange-700',
    yellow: 'text-yellow-700',
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
        const princProgress = progress[`principle-${principleSlug}`];
        if (princProgress) {
          completedSections = {
            explain: princProgress.explain?.completed ?? false,
            demo: princProgress.demo?.completed ?? false,
            exercise: princProgress.exercise?.completed ?? false,
            code: princProgress.code?.completed ?? false,
            advanced: false,
            ai: false,
          };
        }
      }
    } catch {
      // Not logged in, that's fine
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
      await markSectionComplete(userId, `principle-${principleSlug}`, section, score);
    }
  }

  const components: Record<string, Record<SectionType, any>> = {
    naming: { explain: NamingExplain, demo: NamingDemo, exercise: NamingExercise, code: NamingCode },
    'keep-it-simple': { explain: KeepItSimpleExplain, demo: KeepItSimpleDemo, exercise: KeepItSimpleExercise, code: KeepItSimpleCode },
    dry: { explain: DryExplain, demo: DryDemo, exercise: DryExercise, code: DryCode },
    testing: { explain: TestingExplain, demo: TestingDemo, exercise: TestingExercise, code: TestingCode },
    'code-organization': { explain: CodeOrganizationExplain, demo: CodeOrganizationDemo, exercise: CodeOrganizationExercise, code: CodeOrganizationCode },
    planning: { explain: PlanningExplain, demo: PlanningDemo, exercise: PlanningExercise, code: PlanningCode },
  };
</script>

{#if principle}
  <div class="space-y-6">
    <!-- Header + Tabs -->
    <div class="flex flex-col gap-4">
      <SubNav items={principles} currentSlug={principleSlug} basePath="/principles" />
    </div>

    <!-- Content area -->
    <div class="min-h-[300px] rounded-2xl bg-white shadow-sm border border-slate-100 p-4 md:p-6 lg:p-8 card-with-tabs">
      <div class="title-row">
        <h2 class="text-2xl font-bold text-slate-800" style="font-family: 'Permanent Marker', sans-serif;">{principle.title}</h2>
        <SectionTabs
          {activeSection}
          {completedSections}
          onchange={handleTabChange}
        />
      </div>
      <div class="content-row">
      {#if components[principleSlug]}
        {#if activeSection === 'explain'}
          <svelte:component
            this={components[principleSlug].explain}
            oncomplete={() => handleSectionComplete('explain')}
          />
        {:else if activeSection === 'demo'}
          <svelte:component
            this={components[principleSlug].demo}
            oncomplete={() => handleSectionComplete('demo')}
          />
        {:else if activeSection === 'exercise'}
          <svelte:component
            this={components[principleSlug].exercise}
            oncomplete={(score) => handleSectionComplete('exercise', score)}
          />
        {:else if activeSection === 'code'}
          <svelte:component
            this={components[principleSlug].code}
            oncomplete={() => handleSectionComplete('code')}
          />
        {:else if activeSection === 'advanced'}
          <svelte:component
            this={components[principleSlug].explain}
            oncomplete={() => handleSectionComplete('advanced')}
          />
        {:else if activeSection === 'ai'}
          <AiSection topicTitle={principle.title} topicSlug={principleSlug} oncomplete={() => handleSectionComplete('ai')} />
        {/if}
      {:else}
        <p class="text-center text-slate-500">Content coming soon!</p>
      {/if}
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between pt-2">
      {#if prevPrinciple}
        <a
          href={`/principles/${prevPrinciple.slug}`}
          class="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          {prevPrinciple.title}
        </a>
      {:else}
        <div></div>
      {/if}

      <a href="/" class="text-sm text-slate-500 hover:text-slate-600">All Topics</a>

      {#if nextPrinciple}
        <a
          href={`/principles/${nextPrinciple.slug}`}
          class="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200"
        >
          {nextPrinciple.title}
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
      topicTitle={principle.title}
      topicIcon={principle.icon}
      sectionType={completedSectionType}
      topicSlug={`principle-${principleSlug}`}
      score={completedScore}
      onclose={() => (showCompletionModal = false)}
    />
  </Modal>
{:else}
  <div class="text-center py-12">
    <p class="text-lg text-slate-500">Principle not found.</p>
    <a href="/" class="mt-4 inline-block text-blue-600 hover:underline">Back to home</a>
  </div>
{/if}
