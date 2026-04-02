<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleSections = $state(0);
  onMount(() => {
    const interval = setInterval(() => {
      if (visibleSections < 4) visibleSections++;
      else clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div class="transition-all duration-700 {visibleSections >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
    <h2 class="mb-2 text-2xl font-bold text-slate-800">What Is Code Review?</h2>
    <p class="text-slate-600">
      Code review is having <strong>another developer read your code</strong> before it gets merged into the project. Think of it like <strong>having someone proofread your essay</strong> — you might read your own writing ten times and miss a typo, but a friend spots it immediately.
    </p>
  </div>

  <div class="transition-all duration-700 {visibleSections >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
    <h3 class="mb-3 text-lg font-bold text-slate-800">Why Code Review Matters</h3>
    <div class="grid gap-4 sm:grid-cols-3">
      <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5 text-center">
        <div class="mb-2 text-4xl">&#128027;</div>
        <h4 class="mb-1 font-bold text-slate-800">Catch Bugs</h4>
        <p class="text-sm text-slate-600">A fresh pair of eyes spots mistakes you overlooked after staring at the same code for hours.</p>
      </div>
      <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5 text-center">
        <div class="mb-2 text-4xl">&#129504;</div>
        <h4 class="mb-1 font-bold text-slate-800">Share Knowledge</h4>
        <p class="text-sm text-slate-600">Reviewers learn how a feature works. Authors learn better techniques from feedback. Everyone levels up.</p>
      </div>
      <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5 text-center">
        <div class="mb-2 text-4xl">&#9989;</div>
        <h4 class="mb-1 font-bold text-slate-800">Maintain Quality</h4>
        <p class="text-sm text-slate-600">Reviews enforce consistent style, patterns, and standards across the whole codebase.</p>
      </div>
    </div>
  </div>

  <div class="transition-all duration-700 {visibleSections >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
    <h3 class="mb-3 text-lg font-bold text-slate-800">The Code Review Process</h3>
    <p class="mb-3 text-slate-600">In Git-based workflows, code review happens through <strong>pull requests</strong> (PRs). Here is the typical flow:</p>
    <div class="flex flex-wrap items-center gap-2 text-sm">
      <span class="rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-slate-700">Open PR</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-indigo-100 px-3 py-1.5 font-mono text-indigo-700">Reviewer reads</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-yellow-100 px-3 py-1.5 font-mono text-yellow-700">Leaves comments</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-orange-100 px-3 py-1.5 font-mono text-orange-700">Author fixes</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-green-100 px-3 py-1.5 font-mono text-green-700">Approve &amp; merge</span>
    </div>
  </div>

  <div class="transition-all duration-700 {visibleSections >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
    <h3 class="mb-3 text-lg font-bold text-slate-800">What Reviewers Look For</h3>
    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Correctness:</strong> Does the code actually do what it claims? Are there logic errors or off-by-one mistakes?</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Readability:</strong> Can you understand the code without the author explaining it?</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Edge cases:</strong> What happens with empty input, null values, or very large data?</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Naming:</strong> Are variables, functions, and classes named in a way that explains their purpose?</span>
        </li>
      </ul>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
    >
      I understand code review
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Code Review (Advanced)</h2>
      <p class="text-slate-600">Best practices, automated tooling, metrics, and anti-patterns for professional code review.</p>
    </div>

    <div class="transition-all duration-700 {visibleSections >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
      <h3 class="mb-3 text-lg font-bold text-slate-800">Best Practices for PR Authors</h3>
      <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
            <span><strong>Keep PRs small:</strong> Small, focused PRs are easier to review, faster to merge, and less likely to introduce bugs. Aim for under 400 lines changed.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
            <span><strong>Write good descriptions:</strong> Explain what changed, why it changed, and how to test it. Link to the issue or ticket.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
            <span><strong>Self-review first:</strong> Read your own diff before requesting review. You will catch obvious mistakes and save the reviewer time.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
            <span><strong>Add context to tricky sections:</strong> If a piece of code is non-obvious, leave inline comments explaining the reasoning.</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="transition-all duration-700 {visibleSections >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
      <h3 class="mb-3 text-lg font-bold text-slate-800">Best Practices for Reviewers</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-2 font-bold text-green-700">Do This</h4>
          <ul class="space-y-1.5 text-sm text-slate-600">
            <li>Be kind and constructive in your tone</li>
            <li>Explain <em>why</em> something should change, not just <em>what</em></li>
            <li>Suggest alternatives: "Consider using X because..."</li>
            <li>Praise good patterns when you see them</li>
            <li>Respond promptly so authors are not blocked</li>
          </ul>
        </div>
        <div class="rounded-xl border-2 border-red-200 bg-red-50 p-4">
          <h4 class="mb-2 font-bold text-red-700">Avoid This</h4>
          <ul class="space-y-1.5 text-sm text-slate-600">
            <li>"This is wrong" (vague, no alternative offered)</li>
            <li>"Why did you do it this way?" (sounds accusatory)</li>
            <li>Nitpicking style that a linter should enforce</li>
            <li>Gatekeeping: blocking PRs for subjective preferences</li>
            <li>"You always do this" (making it personal)</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="transition-all duration-700 {visibleSections >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
      <h3 class="mb-3 text-lg font-bold text-slate-800">Automated Code Review Tools</h3>
      <p class="mb-3 text-slate-600">Machines handle the tedious stuff so humans can focus on logic and design:</p>
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Linters</h4>
          <p class="text-sm text-slate-600">ESLint, Pylint, and similar tools catch unused variables, style violations, and potential errors automatically.</p>
        </div>
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Formatters</h4>
          <p class="text-sm text-slate-600">Prettier, Black, and gofmt enforce consistent formatting so reviewers never argue about semicolons or indentation.</p>
        </div>
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">CI Checks</h4>
          <p class="text-sm text-slate-600">GitHub Actions, Jenkins, and similar tools run tests, type checking, and linting on every pull request automatically.</p>
        </div>
      </div>
    </div>

    <div class="transition-all duration-700 {visibleSections >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
      <h3 class="mb-3 text-lg font-bold text-slate-800">Metrics and Anti-Patterns</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-2 font-bold text-slate-800">Useful Metrics</h4>
          <ul class="space-y-1.5 text-sm text-slate-600">
            <li><strong>Review turnaround time:</strong> Hours from PR opened to first review</li>
            <li><strong>PR size:</strong> Lines changed per PR (smaller is better)</li>
            <li><strong>Review depth:</strong> Comments per review (quality over quantity)</li>
            <li><strong>Rework rate:</strong> How often code needs changes after review</li>
          </ul>
        </div>
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-2 font-bold text-slate-800">Common Anti-Patterns</h4>
          <ul class="space-y-1.5 text-sm text-slate-600">
            <li><strong>Rubber-stamping:</strong> Approving without actually reading the code</li>
            <li><strong>Mega-PRs:</strong> 1000+ line PRs that nobody can effectively review</li>
            <li><strong>Bike-shedding:</strong> Spending 20 comments on naming while ignoring a security bug</li>
            <li><strong>Review bottlenecks:</strong> Only one person can approve, creating a queue</li>
          </ul>
        </div>
      </div>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
      >
        I understand code review
      </button>
    </div>
  </div>
  {/if}
</div>
