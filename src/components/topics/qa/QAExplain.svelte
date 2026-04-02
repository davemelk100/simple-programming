<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);

  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

  let activePhase = $state(-1);

  const phases = [
    { label: 'Plan', icon: '📋', detail: 'What should the software do?' },
    { label: 'Build', icon: '🔨', detail: 'Developers write the code' },
    { label: 'Test', icon: '🔍', detail: 'QA checks if it works correctly' },
    { label: 'Ship', icon: '🚀', detail: 'Release to users with confidence' },
  ];

  onMount(() => {
    let step = 0;
    const interval = setInterval(() => {
      activePhase = step;
      step++;
      if (step >= phases.length) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      <strong>Quality Assurance (QA)</strong> is about making sure software works the way it's supposed to. While testing checks individual pieces of code, QA looks at the <strong>bigger picture</strong> &mdash; does the whole product work well for real people? QA catches bugs, confusing designs, and missing features <strong>before</strong> users ever see them.
    </p>
  </div>

  <!-- QA cycle visual -->
  <div>
    <h3 class="mb-4 text-sm font-bold text-rose-600">The QA Process</h3>

    <div class="flex flex-wrap items-center justify-center gap-3">
      {#each phases as phase, i}
        <div class="flex items-center gap-3">
          <div class="flex flex-col items-center gap-1 rounded-xl border-2 px-5 py-4 shadow-sm transition-all duration-500
            {i <= activePhase ? 'border-rose-400 bg-rose-50 scale-105' : 'border-slate-200 bg-white opacity-40'}
            {i === activePhase ? 'phase-pulse' : ''}">
            <span class="text-2xl">{phase.icon}</span>
            <div class="font-bold text-slate-800">{phase.label}</div>
            <div class="text-xs text-slate-500">{phase.detail}</div>
          </div>
          {#if i < phases.length - 1}
            <svg class="h-5 w-5 shrink-0 text-rose-300 transition-opacity duration-500 {i < activePhase ? 'opacity-100' : 'opacity-30'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Bug types -->
  <div>
    <h3 class="mb-3 text-sm font-bold text-rose-600">What QA Catches</h3>
    <div class="grid gap-3 sm:grid-cols-3">
      <div class="rounded-xl border border-rose-200 bg-rose-50 p-4 text-center">
        <div class="mb-1 text-2xl">🐛</div>
        <div class="text-sm font-bold text-slate-800">Bugs</div>
        <div class="text-xs text-slate-500">Things that crash or give wrong results</div>
      </div>
      <div class="rounded-xl border border-rose-200 bg-rose-50 p-4 text-center">
        <div class="mb-1 text-2xl">😕</div>
        <div class="text-sm font-bold text-slate-800">Usability Issues</div>
        <div class="text-xs text-slate-500">Confusing or hard-to-use features</div>
      </div>
      <div class="rounded-xl border border-rose-200 bg-rose-50 p-4 text-center">
        <div class="mb-1 text-2xl">🐌</div>
        <div class="text-sm font-bold text-slate-800">Performance</div>
        <div class="text-xs text-slate-500">Things that are too slow</div>
      </div>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-rose-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-rose-700 active:scale-95">
      I've read this
    </button>
  </div>

  {:else}
  <div class="space-y-8">
    <div>
      <p class="text-slate-600">
        QA engineering goes beyond manual clicking. Modern QA involves <strong>test plans</strong>, <strong>automated regression suites</strong>, <strong>CI/CD pipelines</strong>, and structured approaches like <strong>boundary value analysis</strong> and <strong>equivalence partitioning</strong> to find bugs efficiently. A good QA process is built into every stage of development, not bolted on at the end.
      </p>
    </div>

    <!-- Code example -->
    <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm">
      <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">QA Test Plan (Pseudocode)</div>
      <pre class="text-green-400">// Boundary value analysis for age input
// Valid range: 0-120
testCases = [
  {'{'} input: -1,  expected: "invalid" {'}'}, // below min
  {'{'} input: 0,   expected: "valid"   {'}'}, // min boundary
  {'{'} input: 1,   expected: "valid"   {'}'}, // just above min
  {'{'} input: 119, expected: "valid"   {'}'}, // just below max
  {'{'} input: 120, expected: "valid"   {'}'}, // max boundary
  {'{'} input: 121, expected: "invalid" {'}'}, // above max
  {'{'} input: "", expected: "invalid"  {'}'}, // empty input
  {'{'} input: "abc", expected: "invalid" {'}'}, // non-numeric
];

// Equivalence partitioning
// Instead of testing every number 0-120,
// test ONE value from each class:
// - Invalid low: -5
// - Valid: 25
// - Invalid high: 200
// - Invalid type: "hello"</pre>
    </div>

    <!-- QA types grid -->
    <div class="grid gap-3 sm:grid-cols-2">
      <div class="rounded-xl border-2 border-rose-200 bg-rose-50 p-4">
        <h4 class="mb-1 text-sm font-bold text-rose-700">Manual Testing</h4>
        <p class="text-xs text-slate-600">Exploratory testing, usability review, edge case discovery. Humans find UX issues that automation misses.</p>
      </div>
      <div class="rounded-xl border-2 border-rose-200 bg-rose-50 p-4">
        <h4 class="mb-1 text-sm font-bold text-rose-700">Automated Testing</h4>
        <p class="text-xs text-slate-600">Regression suites, CI/CD checks, screenshot comparisons. Machines catch regressions instantly.</p>
      </div>
      <div class="rounded-xl border-2 border-rose-200 bg-rose-50 p-4">
        <h4 class="mb-1 text-sm font-bold text-rose-700">Performance Testing</h4>
        <p class="text-xs text-slate-600">Load tests, stress tests, profiling. How does the system behave under heavy traffic?</p>
      </div>
      <div class="rounded-xl border-2 border-rose-200 bg-rose-50 p-4">
        <h4 class="mb-1 text-sm font-bold text-rose-700">Security Testing</h4>
        <p class="text-xs text-slate-600">Penetration testing, vulnerability scanning, input sanitization. Protect against attacks.</p>
      </div>
    </div>

    <!-- Key concepts -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500"></span>
          <strong>Regression testing</strong> &mdash; re-running existing tests after changes to make sure nothing that worked before is now broken.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500"></span>
          <strong>Edge cases</strong> &mdash; unusual inputs or conditions (empty strings, very large numbers, special characters) that often reveal bugs.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500"></span>
          <strong>CI/CD</strong> &mdash; Continuous Integration / Continuous Deployment. Tests run automatically every time code is pushed, blocking broken code from being deployed.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500"></span>
          <strong>Bug severity vs priority</strong> &mdash; severity is how bad the bug is; priority is how soon it should be fixed. A typo in the CEO's name might be low severity but high priority.
        </li>
      </ul>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-rose-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-rose-700 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  @keyframes phasePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.4); }
    50% { box-shadow: 0 0 0 8px rgba(244, 63, 94, 0); }
  }
  .phase-pulse { animation: phasePulse 1s ease-in-out 2; }
</style>
