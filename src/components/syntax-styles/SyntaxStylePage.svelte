<script lang="ts">
  import { onMount } from 'svelte';
  import type { SectionType } from '../../lib/types';
  import { getSyntaxStyleBySlug, getNextSyntaxStyle, getPrevSyntaxStyle } from '../../lib/syntax-styles';
  import { loadProgress, markSectionComplete } from '../../lib/progress';
  import { getUser } from '../../lib/auth';
  import SectionTabs from '../ui/SectionTabs.svelte';
  import SubNav from '../ui/SubNav.svelte';
  import Modal from '../ui/Modal.svelte';
  import CompletionModal from '../ui/CompletionModal.svelte';
  import { syntaxStyles } from '../../lib/syntax-styles';

  // Markup components
  import MarkupExplain from './markup/MarkupExplain.svelte';
  import MarkupDemo from './markup/MarkupDemo.svelte';
  import MarkupExercise from './markup/MarkupExercise.svelte';
  import MarkupCode from './markup/MarkupCode.svelte';

  // Data Formats components
  import DataFormatsExplain from './data-formats/DataFormatsExplain.svelte';
  import DataFormatsDemo from './data-formats/DataFormatsDemo.svelte';
  import DataFormatsExercise from './data-formats/DataFormatsExercise.svelte';
  import DataFormatsCode from './data-formats/DataFormatsCode.svelte';

  // C-Style components
  import CStyleExplain from './c-style/CStyleExplain.svelte';
  import CStyleDemo from './c-style/CStyleDemo.svelte';
  import CStyleExercise from './c-style/CStyleExercise.svelte';
  import CStyleCode from './c-style/CStyleCode.svelte';

  // Whitespace components
  import WhitespaceExplain from './whitespace/WhitespaceExplain.svelte';
  import WhitespaceDemo from './whitespace/WhitespaceDemo.svelte';
  import WhitespaceExercise from './whitespace/WhitespaceExercise.svelte';
  import WhitespaceCode from './whitespace/WhitespaceCode.svelte';

  // Declarative vs Imperative components
  import DeclarativeImperativeExplain from './declarative-imperative/DeclarativeImperativeExplain.svelte';
  import DeclarativeImperativeDemo from './declarative-imperative/DeclarativeImperativeDemo.svelte';
  import DeclarativeImperativeExercise from './declarative-imperative/DeclarativeImperativeExercise.svelte';
  import DeclarativeImperativeCode from './declarative-imperative/DeclarativeImperativeCode.svelte';

  interface Props {
    styleSlug: string;
  }

  let { styleSlug }: Props = $props();

  let style = $derived(getSyntaxStyleBySlug(styleSlug));
  let prevStyle = $derived(getPrevSyntaxStyle(styleSlug));
  let nextStyle = $derived(getNextSyntaxStyle(styleSlug));

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
    yellow: 'text-yellow-700',
    pink: 'text-pink-700',
    indigo: 'text-indigo-700',
  };

  onMount(async () => {
    try {
      const user = await getUser();
      if (user) {
        userId = user.id;
        const progress = await loadProgress(user.id);
        const styleProgress = progress[`syntax-${styleSlug}`];
        if (styleProgress) {
          completedSections = {
            explain: styleProgress.explain?.completed ?? false,
            demo: styleProgress.demo?.completed ?? false,
            exercise: styleProgress.exercise?.completed ?? false,
            code: styleProgress.code?.completed ?? false,
          };
        }
      }
    } catch {
      // Not logged in, that's fine
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
      await markSectionComplete(userId, `syntax-${styleSlug}`, section, score);
    }
  }

  const components: Record<string, Record<SectionType, any>> = {
    markup: { explain: MarkupExplain, demo: MarkupDemo, exercise: MarkupExercise, code: MarkupCode },
    'data-formats': { explain: DataFormatsExplain, demo: DataFormatsDemo, exercise: DataFormatsExercise, code: DataFormatsCode },
    'c-style': { explain: CStyleExplain, demo: CStyleDemo, exercise: CStyleExercise, code: CStyleCode },
    whitespace: { explain: WhitespaceExplain, demo: WhitespaceDemo, exercise: WhitespaceExercise, code: WhitespaceCode },
    'declarative-imperative': { explain: DeclarativeImperativeExplain, demo: DeclarativeImperativeDemo, exercise: DeclarativeImperativeExercise, code: DeclarativeImperativeCode },
  };
</script>

{#if style}
  <div class="space-y-6">
    <!-- Header + Tabs -->
    <div class="flex flex-col gap-4">
      <p class="text-xs font-semibold uppercase tracking-wider text-slate-400 sm:hidden">2. Syntax & Principles</p>
      <SubNav items={syntaxStyles} currentSlug={styleSlug} basePath="/syntax-styles" label="2. Syntax & Principles" />
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span class="text-2xl">{style.icon}</span>
        <h1 class="text-2xl font-black break-words {colorMap[style.color] ?? 'text-slate-800'}">{style.title}</h1>
      </div>

      <SectionTabs
        {activeSection}
        {completedSections}
        onchange={handleTabChange}
      />
    </div>

    <!-- Content area -->
    <div class="min-h-[300px] rounded-2xl bg-white p-4 md:p-6 lg:p-8 shadow-sm border border-slate-100">
      {#if components[styleSlug]}
        {#if activeSection === 'explain'}
          <svelte:component
            this={components[styleSlug].explain}
            oncomplete={() => handleSectionComplete('explain')}
          />
        {:else if activeSection === 'demo'}
          <svelte:component
            this={components[styleSlug].demo}
            oncomplete={() => handleSectionComplete('demo')}
          />
        {:else if activeSection === 'exercise'}
          <svelte:component
            this={components[styleSlug].exercise}
            oncomplete={(score) => handleSectionComplete('exercise', score)}
          />
        {:else if activeSection === 'code'}
          <svelte:component
            this={components[styleSlug].code}
            oncomplete={() => handleSectionComplete('code')}
          />
        {/if}
      {:else}
        <p class="text-center text-slate-500">Content coming soon!</p>
      {/if}
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between pt-2">
      {#if prevStyle}
        <a
          href={`/syntax-styles/${prevStyle.slug}`}
          class="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          {prevStyle.title}
        </a>
      {:else}
        <div></div>
      {/if}

      <a href="/" class="text-sm text-slate-500 hover:text-slate-600">All Topics</a>

      {#if nextStyle}
        <a
          href={`/syntax-styles/${nextStyle.slug}`}
          class="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200"
        >
          {nextStyle.title}
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
      topicTitle={style.title}
      topicIcon={style.icon}
      sectionType={completedSectionType}
      topicSlug={`syntax-${styleSlug}`}
      score={completedScore}
      onclose={() => (showCompletionModal = false)}
    />
  </Modal>
{:else}
  <div class="text-center py-12">
    <p class="text-lg text-slate-500">Syntax style not found.</p>
    <a href="/" class="mt-4 inline-block text-blue-600 hover:underline">Back to home</a>
  </div>
{/if}
