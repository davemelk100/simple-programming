<script lang="ts">
  import { onMount } from 'svelte';
  import type { SectionType } from '../../lib/types';
  import { getLanguageBySlug, getNextLanguage, getPrevLanguage } from '../../lib/languages';
  import { loadProgress, markSectionComplete } from '../../lib/progress';
  import { getUser } from '../../lib/auth';
  import { setAdvanced } from '../../lib/mode';
  import AiSection from '../ui/AiSection.svelte';
  import SectionTabs from '../ui/SectionTabs.svelte';
  import SubNav from '../ui/SubNav.svelte';
  import Modal from '../ui/Modal.svelte';
  import CompletionModal from '../ui/CompletionModal.svelte';
  import { languages } from '../../lib/languages';

  // TypeScript components
  import TypeScriptExplain from './typescript/TypeScriptExplain.svelte';
  import TypeScriptDemo from './typescript/TypeScriptDemo.svelte';
  import TypeScriptExercise from './typescript/TypeScriptExercise.svelte';
  import TypeScriptCode from './typescript/TypeScriptCode.svelte';

  // Python components
  import PythonExplain from './python/PythonExplain.svelte';
  import PythonDemo from './python/PythonDemo.svelte';
  import PythonExercise from './python/PythonExercise.svelte';
  import PythonCode from './python/PythonCode.svelte';

  // Go components
  import GoExplain from './go/GoExplain.svelte';
  import GoDemo from './go/GoDemo.svelte';
  import GoExercise from './go/GoExercise.svelte';
  import GoCode from './go/GoCode.svelte';

  // C# components
  import CSharpExplain from './csharp/CSharpExplain.svelte';
  import CSharpDemo from './csharp/CSharpDemo.svelte';
  import CSharpExercise from './csharp/CSharpExercise.svelte';
  import CSharpCode from './csharp/CSharpCode.svelte';

  interface Props {
    languageSlug: string;
  }

  let { languageSlug }: Props = $props();

  let language = $derived(getLanguageBySlug(languageSlug));
  let prevLanguage = $derived(getPrevLanguage(languageSlug));
  let nextLanguage = $derived(getNextLanguage(languageSlug));

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
    sky: 'text-sky-700',
  };

  onMount(() => setAdvanced(false));

  onMount(async () => {
    try {
      const user = await getUser();
      if (user) {
        userId = user.id;
        const progress = await loadProgress(user.id);
        const langProgress = progress[`lang-${languageSlug}`];
        if (langProgress) {
          completedSections = {
            explain: langProgress.explain?.completed ?? false,
            demo: langProgress.demo?.completed ?? false,
            exercise: langProgress.exercise?.completed ?? false,
            code: langProgress.code?.completed ?? false,
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
      await markSectionComplete(userId, `lang-${languageSlug}`, section, score);
    }
  }

  const components: Record<string, Record<SectionType, any>> = {
    typescript: { explain: TypeScriptExplain, demo: TypeScriptDemo, exercise: TypeScriptExercise, code: TypeScriptCode },
    python: { explain: PythonExplain, demo: PythonDemo, exercise: PythonExercise, code: PythonCode },
    go: { explain: GoExplain, demo: GoDemo, exercise: GoExercise, code: GoCode },
    csharp: { explain: CSharpExplain, demo: CSharpDemo, exercise: CSharpExercise, code: CSharpCode },
  };
</script>

{#if language}
  <div class="space-y-6">
    <!-- Header + Tabs -->
    <div class="flex flex-col gap-4">
      <SubNav items={languages} currentSlug={languageSlug} basePath="/languages" />
    </div>

    <!-- Content area -->
    <div class="min-h-[300px] rounded-2xl bg-white shadow-sm border border-slate-100 p-4 md:p-6 lg:p-8 card-with-tabs">
      <div class="title-row">
        <h2 class="text-2xl font-bold text-slate-800" style="font-family: 'Permanent Marker', sans-serif;">{language.title}</h2>
        <SectionTabs
          {activeSection}
          {completedSections}
          onchange={handleTabChange}
        />
      </div>
      <div class="content-row">
      {#if components[languageSlug]}
        {#if activeSection === 'explain'}
          <svelte:component
            this={components[languageSlug].explain}
            oncomplete={() => handleSectionComplete('explain')}
          />
        {:else if activeSection === 'demo'}
          <svelte:component
            this={components[languageSlug].demo}
            oncomplete={() => handleSectionComplete('demo')}
          />
        {:else if activeSection === 'exercise'}
          <svelte:component
            this={components[languageSlug].exercise}
            oncomplete={(score) => handleSectionComplete('exercise', score)}
          />
        {:else if activeSection === 'code'}
          <svelte:component
            this={components[languageSlug].code}
            oncomplete={() => handleSectionComplete('code')}
          />
        {:else if activeSection === 'advanced'}
          <svelte:component
            this={components[languageSlug].explain}
            oncomplete={() => handleSectionComplete('advanced')}
          />
        {:else if activeSection === 'ai'}
          <AiSection topicTitle={language.title} topicSlug={languageSlug} oncomplete={() => handleSectionComplete('ai')} />
        {/if}
      {:else}
        <p class="text-center text-slate-500">Content coming soon!</p>
      {/if}
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between pt-2">
      {#if prevLanguage}
        <a
          href={`/languages/${prevLanguage.slug}`}
          class="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          {prevLanguage.title}
        </a>
      {:else}
        <div></div>
      {/if}

      <a href="/" class="text-sm text-slate-500 hover:text-slate-600">All Topics</a>

      {#if nextLanguage}
        <a
          href={`/languages/${nextLanguage.slug}`}
          class="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200"
        >
          {nextLanguage.title}
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
      topicTitle={language.title}
      topicIcon={language.icon}
      sectionType={completedSectionType}
      topicSlug={`lang-${languageSlug}`}
      score={completedScore}
      onclose={() => (showCompletionModal = false)}
    />
  </Modal>
{:else}
  <div class="text-center py-12">
    <p class="text-lg text-slate-500">Language not found.</p>
    <a href="/" class="mt-4 inline-block text-blue-600 hover:underline">Back to home</a>
  </div>
{/if}
