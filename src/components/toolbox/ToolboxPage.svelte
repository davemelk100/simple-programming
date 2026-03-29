<script lang="ts">
  import { onMount } from 'svelte';
  import type { SectionType } from '../../lib/types';
  import { getToolboxBySlug, getNextToolbox, getPrevToolbox } from '../../lib/toolbox';
  import { loadProgress, markSectionComplete } from '../../lib/progress';
  import { getUser } from '../../lib/auth';
  import SectionTabs from '../ui/SectionTabs.svelte';
  import Modal from '../ui/Modal.svelte';
  import CompletionModal from '../ui/CompletionModal.svelte';

  import VersionControlExplain from './version-control/VersionControlExplain.svelte';
  import VersionControlDemo from './version-control/VersionControlDemo.svelte';
  import VersionControlExercise from './version-control/VersionControlExercise.svelte';
  import VersionControlCode from './version-control/VersionControlCode.svelte';

  import CommandLineExplain from './command-line/CommandLineExplain.svelte';
  import CommandLineDemo from './command-line/CommandLineDemo.svelte';
  import CommandLineExercise from './command-line/CommandLineExercise.svelte';
  import CommandLineCode from './command-line/CommandLineCode.svelte';

  import LocalServersExplain from './local-servers/LocalServersExplain.svelte';
  import LocalServersDemo from './local-servers/LocalServersDemo.svelte';
  import LocalServersExercise from './local-servers/LocalServersExercise.svelte';
  import LocalServersCode from './local-servers/LocalServersCode.svelte';

  import AdminAccessExplain from './admin-access/AdminAccessExplain.svelte';
  import AdminAccessDemo from './admin-access/AdminAccessDemo.svelte';
  import AdminAccessExercise from './admin-access/AdminAccessExercise.svelte';
  import AdminAccessCode from './admin-access/AdminAccessCode.svelte';

  interface Props {
    toolboxSlug: string;
  }

  let { toolboxSlug }: Props = $props();

  let tool = $derived(getToolboxBySlug(toolboxSlug));
  let prevTool = $derived(getPrevToolbox(toolboxSlug));
  let nextTool = $derived(getNextToolbox(toolboxSlug));

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
  };

  onMount(async () => {
    try {
      const user = await getUser();
      if (user) {
        userId = user.id;
        const progress = await loadProgress(user.id);
        const toolProgress = progress[`toolbox-${toolboxSlug}`];
        if (toolProgress) {
          completedSections = {
            explain: toolProgress.explain?.completed ?? false,
            demo: toolProgress.demo?.completed ?? false,
            exercise: toolProgress.exercise?.completed ?? false,
            code: toolProgress.code?.completed ?? false,
          };
        }
      }
    } catch {
      // Not logged in
    }
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
      await markSectionComplete(userId, `toolbox-${toolboxSlug}`, section, score);
    }
  }

  const components: Record<string, Record<SectionType, any>> = {
    'version-control': { explain: VersionControlExplain, demo: VersionControlDemo, exercise: VersionControlExercise, code: VersionControlCode },
    'command-line': { explain: CommandLineExplain, demo: CommandLineDemo, exercise: CommandLineExercise, code: CommandLineCode },
    'local-servers': { explain: LocalServersExplain, demo: LocalServersDemo, exercise: LocalServersExercise, code: LocalServersCode },
    'admin-access': { explain: AdminAccessExplain, demo: AdminAccessDemo, exercise: AdminAccessExercise, code: AdminAccessCode },
  };
</script>

{#if tool}
  <div class="space-y-6">
    <div class="flex flex-col gap-4">
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span class="text-2xl">{tool.icon}</span>
        <h1 class="text-2xl font-black {colorMap[tool.color] ?? 'text-slate-800'}">{tool.title}</h1>
      </div>

      <SectionTabs
        {activeSection}
        {completedSections}
        onchange={handleTabChange}
      />
    </div>

    <div class="min-h-[300px] rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-100">
      {#if components[toolboxSlug]}
        {#if activeSection === 'explain'}
          <svelte:component
            this={components[toolboxSlug].explain}
            oncomplete={() => handleSectionComplete('explain')}
          />
        {:else if activeSection === 'demo'}
          <svelte:component
            this={components[toolboxSlug].demo}
            oncomplete={() => handleSectionComplete('demo')}
          />
        {:else if activeSection === 'exercise'}
          <svelte:component
            this={components[toolboxSlug].exercise}
            oncomplete={(score) => handleSectionComplete('exercise', score)}
          />
        {:else if activeSection === 'code'}
          <svelte:component
            this={components[toolboxSlug].code}
            oncomplete={() => handleSectionComplete('code')}
          />
        {/if}
      {:else}
        <p class="text-center text-slate-500">Content coming soon!</p>
      {/if}
    </div>

    <div class="flex items-center justify-between pt-2">
      {#if prevTool}
        <a
          href={`/toolbox/${prevTool.slug}`}
          class="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          {prevTool.title}
        </a>
      {:else}
        <div></div>
      {/if}

      <a href="/" class="text-sm text-slate-500 hover:text-slate-600">All Topics</a>

      {#if nextTool}
        <a
          href={`/toolbox/${nextTool.slug}`}
          class="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200"
        >
          {nextTool.title}
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
      topicTitle={tool.title}
      topicIcon={tool.icon}
      sectionType={completedSectionType}
      topicSlug={`toolbox-${toolboxSlug}`}
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
