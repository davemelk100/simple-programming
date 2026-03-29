<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Before/After fine-tuning comparison ===
  const comparisons = [
    {
      task: 'Customer support email',
      prompt: 'Write a response to a customer who received a damaged product.',
      before: 'Dear Customer, I am sorry to hear about the damaged product. Please contact our returns department for assistance. Thank you.',
      after: 'Hi there! I am so sorry your order arrived damaged -- that is definitely not the experience we want for you! I have already started a replacement order (#RP-4521) and it will ship today with express delivery at no extra charge. You do not need to return the damaged item. Is there anything else I can help with?',
    },
    {
      task: 'Medical note summary',
      prompt: 'Summarize this patient visit note.',
      before: 'The patient visited the doctor and discussed several health concerns. Various tests were ordered and medications were prescribed.',
      after: 'Dx: Type 2 DM, uncontrolled (A1c 8.2%). Plan: Increase metformin to 1000mg BID, add empagliflozin 10mg QD. Labs: CMP, lipid panel in 3mo. Referral: ophthalmology for annual diabetic eye exam. F/U: 3 months.',
    },
    {
      task: 'Code review comment',
      prompt: 'Review this pull request change.',
      before: 'This code looks good but could be improved in some areas. Consider refactoring for better readability.',
      after: 'nit: `processData()` on L42 mutates the input array. Consider using `Array.map()` to return a new array instead -- this avoids surprising side effects for callers. Also, the error handling on L58-62 silently swallows the exception; at minimum log it, or better yet, propagate it with a descriptive message.',
    },
  ];

  let activeComparison = $state(0);

  // === Advanced mode: Training data quality visualizer ===
  const dataExamples = [
    { quality: 'bad', input: 'Fix bug', output: 'OK I fixed it', issue: 'Too vague. No context about which bug or what was done.' },
    { quality: 'medium', input: 'Fix the login page error when password is empty', output: 'Added a validation check for empty password field that shows an error message', issue: 'Better, but missing the actual code changes and testing details.' },
    { quality: 'good', input: 'Fix the login page error when password is empty. The form submits and returns a 500 error from the API.', output: 'Added client-side validation in LoginForm.tsx: check password.length > 0 before calling /api/auth. Display inline error "Password is required" below the input. Added unit test for empty password case. Verified 500 error no longer occurs.', issue: 'Specific input, detailed output, mentions files and testing.' },
  ];
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Before vs. After Fine-Tuning</h2>
    <p class="text-slate-600">
      Compare how a general model responds versus one fine-tuned for a specific domain.
    </p>
  </div>

  <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-6 space-y-6">
    <div class="flex flex-wrap gap-2">
      {#each comparisons as comp, i}
        <button
          onclick={() => activeComparison = i}
          class="rounded-lg px-3 py-1.5 text-sm font-medium transition-all {activeComparison === i ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-indigo-200 hover:bg-indigo-100'}"
        >
          {comp.task}
        </button>
      {/each}
    </div>

    <div class="rounded-lg bg-white p-3 border border-indigo-200">
      <p class="text-xs font-bold uppercase text-slate-500">Task</p>
      <p class="text-sm text-slate-800">{comparisons[activeComparison].prompt}</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-lg border-2 border-slate-200 bg-white p-4">
        <p class="text-xs font-bold uppercase text-red-500 mb-2">Before Fine-Tuning (Generic)</p>
        <p class="text-sm text-slate-600">{comparisons[activeComparison].before}</p>
      </div>
      <div class="rounded-lg border-2 border-green-200 bg-green-50 p-4">
        <p class="text-xs font-bold uppercase text-green-600 mb-2">After Fine-Tuning (Specialized)</p>
        <p class="text-sm text-slate-700">{comparisons[activeComparison].after}</p>
      </div>
    </div>

    <p class="text-xs text-slate-500">
      The fine-tuned model learned the specific format, terminology, and level of detail expected in this domain.
    </p>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      I've explored fine-tuning differences
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Training Data Quality</h2>
      <p class="text-slate-600">See how training data quality dramatically affects fine-tuning results. Better data = better model.</p>
    </div>

    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-6 space-y-4">
      {#each dataExamples as example}
        <div class="rounded-lg border-2 {example.quality === 'good' ? 'border-green-300 bg-green-50' : example.quality === 'medium' ? 'border-yellow-300 bg-yellow-50' : 'border-red-300 bg-red-50'} p-4 space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-lg">{example.quality === 'good' ? '\u{2705}' : example.quality === 'medium' ? '\u{26A0}\u{FE0F}' : '\u{274C}'}</span>
            <span class="text-sm font-bold uppercase {example.quality === 'good' ? 'text-green-700' : example.quality === 'medium' ? 'text-yellow-700' : 'text-red-700'}">{example.quality} quality</span>
          </div>
          <div>
            <p class="text-xs font-bold text-slate-500">Input:</p>
            <p class="text-sm text-slate-700">{example.input}</p>
          </div>
          <div>
            <p class="text-xs font-bold text-slate-500">Output:</p>
            <p class="text-sm text-slate-700">{example.output}</p>
          </div>
          <p class="text-xs italic text-slate-500">{example.issue}</p>
        </div>
      {/each}
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
        I understand training data quality
      </button>
    </div>
  </div>
  {/if}
</div>
