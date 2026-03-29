<script lang="ts">
  import { onMount } from 'svelte';
  import type { SectionType, UserProgress } from '../../lib/types';
  import { getTopicBySlug, getNextTopic, getPrevTopic } from '../../lib/topics';
  import { loadProgress, markSectionComplete } from '../../lib/progress';
  import { getUser } from '../../lib/auth';
  import SectionTabs from '../ui/SectionTabs.svelte';
  import Modal from '../ui/Modal.svelte';
  import CompletionModal from '../ui/CompletionModal.svelte';

  // Topic components
  import VariablesExplain from './variables/VariablesExplain.svelte';
  import StorageBoxes from './variables/StorageBoxes.svelte';
  import VariablesExercise from './variables/VariablesExercise.svelte';

  import FunctionExplain from './functions/FunctionExplain.svelte';
  import FunctionMachine from './functions/FunctionMachine.svelte';
  import FunctionExercise from './functions/FunctionExercise.svelte';

  import DataStructuresExplain from './data-structures/DataStructuresExplain.svelte';
  import ArrayVisualizer from './data-structures/ArrayVisualizer.svelte';
  import DataStructuresExercise from './data-structures/DataStructuresExercise.svelte';

  import ControlFlowExplain from './control-flow/ControlFlowExplain.svelte';
  import DecisionTree from './control-flow/DecisionTree.svelte';
  import ControlFlowExercise from './control-flow/ControlFlowExercise.svelte';

  import LogicExplain from './logic/LogicExplain.svelte';
  import TruthTableBuilder from './logic/TruthTableBuilder.svelte';
  import LogicExercise from './logic/LogicExercise.svelte';

  import StateExplain from './state/StateExplain.svelte';
  import StateTimeline from './state/StateTimeline.svelte';
  import StateExercise from './state/StateExercise.svelte';

  import CompositionExplain from './composition/CompositionExplain.svelte';
  import PipelineBuilder from './composition/PipelineBuilder.svelte';
  import CompositionExercise from './composition/CompositionExercise.svelte';

  import VariablesCode from './variables/VariablesCode.svelte';
  import FunctionsCode from './functions/FunctionsCode.svelte';
  import DataStructuresCode from './data-structures/DataStructuresCode.svelte';
  import ControlFlowCode from './control-flow/ControlFlowCode.svelte';
  import LogicCode from './logic/LogicCode.svelte';
  import StateCode from './state/StateCode.svelte';
  import CompositionCode from './composition/CompositionCode.svelte';

  // OOP topic components
  import ClassesExplain from './classes/ClassesExplain.svelte';
  import ClassesDemo from './classes/ClassesDemo.svelte';
  import ClassesExercise from './classes/ClassesExercise.svelte';
  import ClassesCode from './classes/ClassesCode.svelte';

  import EncapsulationExplain from './encapsulation/EncapsulationExplain.svelte';
  import EncapsulationDemo from './encapsulation/EncapsulationDemo.svelte';
  import EncapsulationExercise from './encapsulation/EncapsulationExercise.svelte';
  import EncapsulationCode from './encapsulation/EncapsulationCode.svelte';

  import InheritanceExplain from './inheritance/InheritanceExplain.svelte';
  import InheritanceDemo from './inheritance/InheritanceDemo.svelte';
  import InheritanceExercise from './inheritance/InheritanceExercise.svelte';
  import InheritanceCode from './inheritance/InheritanceCode.svelte';

  import PolymorphismExplain from './polymorphism/PolymorphismExplain.svelte';
  import PolymorphismDemo from './polymorphism/PolymorphismDemo.svelte';
  import PolymorphismExercise from './polymorphism/PolymorphismExercise.svelte';
  import PolymorphismCode from './polymorphism/PolymorphismCode.svelte';

  import AbstractionExplain from './abstraction/AbstractionExplain.svelte';
  import AbstractionDemo from './abstraction/AbstractionDemo.svelte';
  import AbstractionExercise from './abstraction/AbstractionExercise.svelte';
  import AbstractionCode from './abstraction/AbstractionCode.svelte';

  interface Props {
    topicSlug: string;
  }

  let { topicSlug }: Props = $props();

  let topic = $derived(getTopicBySlug(topicSlug));
  let prevTopic = $derived(getPrevTopic(topicSlug));
  let nextTopic = $derived(getNextTopic(topicSlug));

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
        const topicProgress = progress[topicSlug];
        if (topicProgress) {
          completedSections = {
            explain: topicProgress.explain?.completed ?? false,
            demo: topicProgress.demo?.completed ?? false,
            exercise: topicProgress.exercise?.completed ?? false,
            code: topicProgress.code?.completed ?? false,
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
      await markSectionComplete(userId, topicSlug, section, score);
    }
  }

  // Component map
  const components: Record<string, Record<SectionType, any>> = {
    variables: { explain: VariablesExplain, demo: StorageBoxes, exercise: VariablesExercise, code: VariablesCode },
    functions: { explain: FunctionExplain, demo: FunctionMachine, exercise: FunctionExercise, code: FunctionsCode },
    'data-structures': { explain: DataStructuresExplain, demo: ArrayVisualizer, exercise: DataStructuresExercise, code: DataStructuresCode },
    'control-flow': { explain: ControlFlowExplain, demo: DecisionTree, exercise: ControlFlowExercise, code: ControlFlowCode },
    logic: { explain: LogicExplain, demo: TruthTableBuilder, exercise: LogicExercise, code: LogicCode },
    state: { explain: StateExplain, demo: StateTimeline, exercise: StateExercise, code: StateCode },
    composition: { explain: CompositionExplain, demo: PipelineBuilder, exercise: CompositionExercise, code: CompositionCode },
    classes: { explain: ClassesExplain, demo: ClassesDemo, exercise: ClassesExercise, code: ClassesCode },
    encapsulation: { explain: EncapsulationExplain, demo: EncapsulationDemo, exercise: EncapsulationExercise, code: EncapsulationCode },
    inheritance: { explain: InheritanceExplain, demo: InheritanceDemo, exercise: InheritanceExercise, code: InheritanceCode },
    polymorphism: { explain: PolymorphismExplain, demo: PolymorphismDemo, exercise: PolymorphismExercise, code: PolymorphismCode },
    abstraction: { explain: AbstractionExplain, demo: AbstractionDemo, exercise: AbstractionExercise, code: AbstractionCode },
  };
</script>

{#if topic}
  <div class="space-y-6">
    <!-- Header + Tabs -->
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

    <!-- Content area -->
    <div class="min-h-[300px] rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-100">
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
        {/if}
      {:else}
        <p class="text-center text-slate-500">Content coming soon!</p>
      {/if}
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between pt-2">
      {#if prevTopic}
        <a
          href={`/topics/${prevTopic.slug}`}
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
          href={`/topics/${nextTopic.slug}`}
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
      {topicSlug}
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
