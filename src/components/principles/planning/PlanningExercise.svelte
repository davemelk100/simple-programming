<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  interface Props {
    oncomplete?: (score: number) => void;
  }
  let { oncomplete }: Props = $props();

  // --- Basic challenges ---
  const basicChallenges = [
    {
      question: 'What should you do before writing code?',
      hint: 'Think about it...',
      accepts: ['plan', 'think', 'plan it', 'understand the problem', 'design', 'planning', 'think about it'],
    },
    {
      question: 'What is the simplest working version of a product called?',
      hint: 'Three letters...',
      accepts: ['mvp', 'minimum viable product'],
    },
    {
      question: 'Should you build everything at once or in small steps?',
      hint: 'One piece at a time...',
      accepts: ['small steps', 'steps', 'incrementally', 'iteratively', 'one at a time', 'in small steps', 'small step'],
    },
  ];

  // --- Advanced challenges ---
  const advancedChallenges = [
    {
      question: 'What type of requirements describe WHAT the system does?',
      hint: 'It describes features and behaviors...',
      accepts: ['functional', 'functional requirements', 'functional requirement'],
    },
    {
      question: 'What methodology delivers working software in short cycles?',
      hint: 'Think sprints and iterations...',
      accepts: ['agile', 'scrum', 'agile methodology'],
    },
    {
      question: 'What term describes shortcuts in code that need fixing later?',
      hint: 'A financial metaphor...',
      accepts: ['technical debt', 'tech debt'],
    },
  ];

  let challenges = $derived(advanced ? advancedChallenges : basicChallenges);

  let answers = $state(['', '', '']);
  let submitted = $state([false, false, false]);
  let results = $state([false, false, false]);

  // Reset when mode changes
  $effect(() => {
    // Access `advanced` to subscribe
    void advanced;
    answers = ['', '', ''];
    submitted = [false, false, false];
    results = [false, false, false];
  });

  function checkAnswer(index: number) {
    const newSubmitted = [...submitted];
    const newResults = [...results];
    newSubmitted[index] = true;
    const normalized = answers[index].trim().toLowerCase();
    newResults[index] = challenges[index].accepts.includes(normalized);
    submitted = newSubmitted;
    results = newResults;
  }

  let allDone = $derived(submitted.every(Boolean));
  let score = $derived(results.filter(Boolean).length);

  // Auto-complete when all done
  $effect(() => {
    if (allDone && oncomplete) {
      // Small delay so user sees the result
      const timeout = setTimeout(() => oncomplete(score), 1200);
      return () => clearTimeout(timeout);
    }
  });

  function getCardClass(index: number): string {
    if (!submitted[index]) return 'rounded-xl border-2 border-slate-200 bg-white p-5 transition-colors';
    if (results[index]) return 'rounded-xl border-2 border-green-300 bg-green-50 p-5 transition-colors';
    return 'rounded-xl border-2 border-red-300 bg-red-50 p-5 transition-colors';
  }
</script>

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">
      {advanced ? 'Practice: Advanced Planning Concepts' : 'Practice: Planning Basics'}
    </h2>
    <p class="text-slate-600">
      {advanced
        ? 'Answer these questions about professional planning and design practices.'
        : 'Answer these questions about planning before you code. Type your answer and press Check.'}
    </p>
  </div>

  <div class="space-y-6">
    {#each challenges as challenge, i}
      <div class={getCardClass(i)}>
        <h3 class="mb-1 font-bold text-slate-800">Challenge {i + 1}</h3>
        <p class="mb-3 text-slate-600">{challenge.question}</p>

        <div class="flex gap-2">
          <input
            type="text"
            bind:value={answers[i]}
            placeholder={challenge.hint}
            disabled={submitted[i]}
            onkeydown={(e) => { if (e.key === 'Enter' && !submitted[i] && answers[i].trim()) checkAnswer(i); }}
            class="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 disabled:bg-slate-50 disabled:text-slate-500"
          />
          {#if !submitted[i]}
            <button
              onclick={() => checkAnswer(i)}
              disabled={!answers[i].trim()}
              class="shrink-0 rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-pink-700 active:scale-95 disabled:opacity-40"
            >
              Check
            </button>
          {/if}
        </div>

        {#if submitted[i]}
          <p class="mt-2 text-sm {results[i] ? 'text-green-600' : 'text-red-600'}">
            {results[i]
              ? 'Correct!'
              : `Not quite. Accepted answers: ${challenge.accepts.join(', ')}`}
          </p>
        {/if}
      </div>
    {/each}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 {score === 3 ? 'border-green-200 bg-green-50' : score >= 2 ? 'border-amber-200 bg-amber-50' : 'border-red-200 bg-red-50'} p-5">
      <p class="text-lg font-bold {score === 3 ? 'text-green-700' : score >= 2 ? 'text-amber-700' : 'text-red-700'}">
        You got {score} out of {challenges.length} correct!
      </p>
      <p class="mt-1 text-sm text-slate-600">
        {score === 3
          ? 'Perfect score! You understand the importance of planning.'
          : score >= 2
            ? 'Almost there! Review the concepts you missed.'
            : 'Keep learning! Planning is a skill that improves with practice.'}
      </p>
    </div>
  {/if}
</div>
