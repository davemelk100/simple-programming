<script lang="ts">
  import { onMount } from 'svelte';
  import type { SectionType } from '../../lib/types';
  import { getPutItTogetherBySlug, getNextPutItTogether, getPrevPutItTogether } from '../../lib/put-it-together';
  import { loadProgress, markSectionComplete } from '../../lib/progress';
  import { getUser } from '../../lib/auth';
  import { setAdvanced } from '../../lib/mode';
  import AiSection from '../ui/AiSection.svelte';
  import SectionTabs from '../ui/SectionTabs.svelte';
  import SubNav from '../ui/SubNav.svelte';
  import Modal from '../ui/Modal.svelte';
  import CompletionModal from '../ui/CompletionModal.svelte';
  import { putItTogetherTopics } from '../../lib/put-it-together';

  import ChooseYourStackExplain from './choose-your-stack/ChooseYourStackExplain.svelte';
  import ChooseYourStackDemo from './choose-your-stack/ChooseYourStackDemo.svelte';
  import ChooseYourStackExercise from './choose-your-stack/ChooseYourStackExercise.svelte';
  import ChooseYourStackCode from './choose-your-stack/ChooseYourStackCode.svelte';

  import ScaffoldExplain from './scaffold-the-project/ScaffoldExplain.svelte';
  import ScaffoldDemo from './scaffold-the-project/ScaffoldDemo.svelte';
  import ScaffoldExercise from './scaffold-the-project/ScaffoldExercise.svelte';
  import ScaffoldCode from './scaffold-the-project/ScaffoldCode.svelte';

  import ConnectDatabaseExplain from './connect-a-database/ConnectDatabaseExplain.svelte';
  import ConnectDatabaseDemo from './connect-a-database/ConnectDatabaseDemo.svelte';
  import ConnectDatabaseExercise from './connect-a-database/ConnectDatabaseExercise.svelte';
  import ConnectDatabaseCode from './connect-a-database/ConnectDatabaseCode.svelte';

  import AddAuthExplain from './add-authentication/AddAuthExplain.svelte';
  import AddAuthDemo from './add-authentication/AddAuthDemo.svelte';
  import AddAuthExercise from './add-authentication/AddAuthExercise.svelte';
  import AddAuthCode from './add-authentication/AddAuthCode.svelte';

  import BuildApiExplain from './build-an-api/BuildApiExplain.svelte';
  import BuildApiDemo from './build-an-api/BuildApiDemo.svelte';
  import BuildApiExercise from './build-an-api/BuildApiExercise.svelte';
  import BuildApiCode from './build-an-api/BuildApiCode.svelte';

  import DeployShipExplain from './deploy-and-ship/DeployShipExplain.svelte';
  import DeployShipDemo from './deploy-and-ship/DeployShipDemo.svelte';
  import DeployShipExercise from './deploy-and-ship/DeployShipExercise.svelte';
  import DeployShipCode from './deploy-and-ship/DeployShipCode.svelte';

  interface Props {
    topicSlug: string;
  }

  let { topicSlug }: Props = $props();

  let topic = $derived(getPutItTogetherBySlug(topicSlug));
  let prevTopic = $derived(getPrevPutItTogether(topicSlug));
  let nextTopic = $derived(getNextPutItTogether(topicSlug));

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
    indigo: 'text-indigo-700',
    pink: 'text-pink-700',
  };

  onMount(() => setAdvanced(false));

  onMount(async () => {
    try {
      const user = await getUser();
      if (user) {
        userId = user.id;
        const progress = await loadProgress(user.id);
        const p = progress[`pit-${topicSlug}`];
        if (p) {
          completedSections = {
            explain: p.explain?.completed ?? false,
            demo: p.demo?.completed ?? false,
            exercise: p.exercise?.completed ?? false,
            code: p.code?.completed ?? false,
            advanced: false,
            ai: false,
          };
        }
      }
    } catch {}
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
      await markSectionComplete(userId, `pit-${topicSlug}`, section, score);
    }
  }

  const components: Record<string, Record<SectionType, any>> = {
    'choose-your-stack': { explain: ChooseYourStackExplain, demo: ChooseYourStackDemo, exercise: ChooseYourStackExercise, code: ChooseYourStackCode },
    'scaffold-the-project': { explain: ScaffoldExplain, demo: ScaffoldDemo, exercise: ScaffoldExercise, code: ScaffoldCode },
    'connect-a-database': { explain: ConnectDatabaseExplain, demo: ConnectDatabaseDemo, exercise: ConnectDatabaseExercise, code: ConnectDatabaseCode },
    'add-authentication': { explain: AddAuthExplain, demo: AddAuthDemo, exercise: AddAuthExercise, code: AddAuthCode },
    'build-an-api': { explain: BuildApiExplain, demo: BuildApiDemo, exercise: BuildApiExercise, code: BuildApiCode },
    'deploy-and-ship': { explain: DeployShipExplain, demo: DeployShipDemo, exercise: DeployShipExercise, code: DeployShipCode },
  };
</script>

{#if topic}
  <div class="space-y-6">
    <div class="flex flex-col gap-4">
      <SubNav items={putItTogetherTopics} currentSlug={topicSlug} basePath="/put-it-together" />
    </div>

    <div class="min-h-[300px] rounded-2xl bg-white shadow-sm border border-slate-100 p-4 md:p-6 lg:p-8 card-with-tabs">
      <div class="title-row">
        <h2 class="text-2xl font-bold text-slate-800" style="font-family: 'Permanent Marker', sans-serif;">{topic.title}</h2>
        <SectionTabs {activeSection} {completedSections} onchange={handleTabChange} />
      </div>
      <div class="content-row">
      {#if components[topicSlug]}
        {#if activeSection === 'explain'}
          <svelte:component this={components[topicSlug].explain} oncomplete={() => handleSectionComplete('explain')} />
        {:else if activeSection === 'demo'}
          <svelte:component this={components[topicSlug].demo} oncomplete={() => handleSectionComplete('demo')} />
        {:else if activeSection === 'exercise'}
          <svelte:component this={components[topicSlug].exercise} oncomplete={(score) => handleSectionComplete('exercise', score)} />
        {:else if activeSection === 'code'}
          <svelte:component this={components[topicSlug].code} oncomplete={() => handleSectionComplete('code')} />
        {:else if activeSection === 'advanced'}
          <svelte:component this={components[topicSlug].explain} oncomplete={() => handleSectionComplete('advanced')} />
        {:else if activeSection === 'ai'}
          <AiSection topicTitle={topic.title} {topicSlug} oncomplete={() => handleSectionComplete('ai')} />
        {/if}
      {:else}
        <p class="text-center text-slate-500">Content coming soon!</p>
      {/if}
      </div>
    </div>

    <div class="flex items-center justify-between pt-2">
      {#if prevTopic}
        <a href={`/put-it-together/${prevTopic.slug}`} class="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          {prevTopic.title}
        </a>
      {:else}<div></div>{/if}
      <a href="/" class="text-sm text-slate-500 hover:text-slate-600">All Topics</a>
      {#if nextTopic}
        <a href={`/put-it-together/${nextTopic.slug}`} class="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200">
          {nextTopic.title}
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </a>
      {:else}<div></div>{/if}
    </div>
  </div>

  <Modal open={showCompletionModal} onclose={() => (showCompletionModal = false)}>
    <CompletionModal topicTitle={topic.title} topicIcon={topic.icon} sectionType={completedSectionType} topicSlug={`pit-${topicSlug}`} score={completedScore} onclose={() => (showCompletionModal = false)} />
  </Modal>
{:else}
  <div class="text-center py-12">
    <p class="text-lg text-slate-500">Topic not found.</p>
    <a href="/" class="mt-4 inline-block text-blue-600 hover:underline">Back to home</a>
  </div>
{/if}
