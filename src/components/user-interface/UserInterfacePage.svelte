<script lang="ts">
  import { onMount } from 'svelte';
  import type { SectionType } from '../../lib/types';
  import { getUserInterfaceBySlug, getNextUserInterface, getPrevUserInterface } from '../../lib/user-interface';
  import { loadProgress, markSectionComplete } from '../../lib/progress';
  import { getUser } from '../../lib/auth';
  import SectionTabs from '../ui/SectionTabs.svelte';
  import SubNav from '../ui/SubNav.svelte';
  import Modal from '../ui/Modal.svelte';
  import CompletionModal from '../ui/CompletionModal.svelte';
  import { userInterfaceTopics } from '../../lib/user-interface';

  import HtmlStructureExplain from './html-structure/HtmlStructureExplain.svelte';
  import HtmlStructureDemo from './html-structure/HtmlStructureDemo.svelte';
  import HtmlStructureExercise from './html-structure/HtmlStructureExercise.svelte';
  import HtmlStructureCode from './html-structure/HtmlStructureCode.svelte';

  import CssStylingExplain from './css-styling/CssStylingExplain.svelte';
  import CssStylingDemo from './css-styling/CssStylingDemo.svelte';
  import CssStylingExercise from './css-styling/CssStylingExercise.svelte';
  import CssStylingCode from './css-styling/CssStylingCode.svelte';

  import ResponsiveDesignExplain from './responsive-design/ResponsiveDesignExplain.svelte';
  import ResponsiveDesignDemo from './responsive-design/ResponsiveDesignDemo.svelte';
  import ResponsiveDesignExercise from './responsive-design/ResponsiveDesignExercise.svelte';
  import ResponsiveDesignCode from './responsive-design/ResponsiveDesignCode.svelte';

  import ComponentFrameworksExplain from './component-frameworks/ComponentFrameworksExplain.svelte';
  import ComponentFrameworksDemo from './component-frameworks/ComponentFrameworksDemo.svelte';
  import ComponentFrameworksExercise from './component-frameworks/ComponentFrameworksExercise.svelte';
  import ComponentFrameworksCode from './component-frameworks/ComponentFrameworksCode.svelte';

  interface Props {
    topicSlug: string;
  }

  let { topicSlug }: Props = $props();

  let topic = $derived(getUserInterfaceBySlug(topicSlug));
  let prevTopic = $derived(getPrevUserInterface(topicSlug));
  let nextTopic = $derived(getNextUserInterface(topicSlug));

  let activeSection = $state<SectionType>('explain');
  let completedSections = $state({ explain: false, demo: false, exercise: false, code: false });
  let userId = $state<string | null>(null);
  let showCompletionModal = $state(false);
  let completedSectionType = $state<SectionType>('explain');
  let completedScore = $state<number | undefined>(undefined);

  const colorMap: Record<string, string> = {
    blue: 'text-blue-700',
    purple: 'text-purple-700',
    green: 'text-green-700',
    orange: 'text-orange-700',
    indigo: 'text-indigo-700',
    pink: 'text-pink-700',
  };

  onMount(async () => {
    try {
      const user = await getUser();
      if (user) {
        userId = user.id;
        const progress = await loadProgress(user.id);
        const p = progress[`ui-${topicSlug}`];
        if (p) {
          completedSections = {
            explain: p.explain?.completed ?? false,
            demo: p.demo?.completed ?? false,
            exercise: p.exercise?.completed ?? false,
            code: p.code?.completed ?? false,
          };
        }
      }
    } catch {}
  });

  function handleTabChange(section: SectionType) {
    activeSection = section;
  }

  async function handleSectionComplete(section: SectionType, score?: number) {
    completedSections[section] = true;
    completedSectionType = section;
    completedScore = score;
    showCompletionModal = true;
    if (userId) {
      await markSectionComplete(userId, `ui-${topicSlug}`, section, score);
    }
  }

  const components: Record<string, Record<SectionType, any>> = {
    'html-structure': { explain: HtmlStructureExplain, demo: HtmlStructureDemo, exercise: HtmlStructureExercise, code: HtmlStructureCode },
    'css-styling': { explain: CssStylingExplain, demo: CssStylingDemo, exercise: CssStylingExercise, code: CssStylingCode },
    'responsive-design': { explain: ResponsiveDesignExplain, demo: ResponsiveDesignDemo, exercise: ResponsiveDesignExercise, code: ResponsiveDesignCode },
    'component-frameworks': { explain: ComponentFrameworksExplain, demo: ComponentFrameworksDemo, exercise: ComponentFrameworksExercise, code: ComponentFrameworksCode },
  };
</script>

{#if topic}
  <div class="space-y-6">
    <div class="flex flex-col gap-4">
      <SubNav items={userInterfaceTopics} currentSlug={topicSlug} basePath="/user-interface" />
    </div>

    <div class="min-h-[300px] rounded-2xl bg-white shadow-sm border border-slate-100 p-4 md:p-6 lg:p-8 card-with-tabs">
      <div class="section-tabs-wrapper">
        <SectionTabs {activeSection} {completedSections} onchange={handleTabChange} />
      </div>
      {#if components[topicSlug]}
        {#if activeSection === 'explain'}
          <svelte:component this={components[topicSlug].explain} oncomplete={() => handleSectionComplete('explain')} />
        {:else if activeSection === 'demo'}
          <svelte:component this={components[topicSlug].demo} oncomplete={() => handleSectionComplete('demo')} />
        {:else if activeSection === 'exercise'}
          <svelte:component this={components[topicSlug].exercise} oncomplete={(score) => handleSectionComplete('exercise', score)} />
        {:else if activeSection === 'code'}
          <svelte:component this={components[topicSlug].code} oncomplete={() => handleSectionComplete('code')} />
        {/if}
      {:else}
        <p class="text-center text-slate-500">Content coming soon!</p>
      {/if}
    </div>

    <div class="flex items-center justify-between pt-2">
      {#if prevTopic}
        <a href={`/user-interface/${prevTopic.slug}`} class="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          {prevTopic.title}
        </a>
      {:else}<div></div>{/if}
      <a href="/" class="text-sm text-slate-500 hover:text-slate-600">All Topics</a>
      {#if nextTopic}
        <a href={`/user-interface/${nextTopic.slug}`} class="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200">
          {nextTopic.title}
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </a>
      {:else}<div></div>{/if}
    </div>
  </div>

  <Modal open={showCompletionModal} onclose={() => (showCompletionModal = false)}>
    <CompletionModal topicTitle={topic.title} topicIcon={topic.icon} sectionType={completedSectionType} topicSlug={`ui-${topicSlug}`} score={completedScore} onclose={() => (showCompletionModal = false)} />
  </Modal>
{:else}
  <div class="text-center py-12">
    <p class="text-lg text-slate-500">Topic not found.</p>
    <a href="/" class="mt-4 inline-block text-blue-600 hover:underline">Back to home</a>
  </div>
{/if}
