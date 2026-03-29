<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);

  const cards = [
    { emoji: '👀', title: 'Catch Bugs', desc: 'A fresh pair of eyes spots mistakes you overlooked after staring at the same code for hours.' },
    { emoji: '🧠', title: 'Share Knowledge', desc: 'Reviewers learn how a feature works, and authors learn better techniques from feedback.' },
    { emoji: '📏', title: 'Maintain Quality', desc: 'Reviews enforce consistent style, patterns, and standards across the whole codebase.' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < cards.length) {
        visibleCards++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">What Is Code Review?</h2>
    <p class="text-slate-600">
      Code review is having <strong>someone else read your code</strong> before it gets merged into the project. Think of it like <strong>proofreading an essay</strong> — you might read your own writing ten times and miss a typo, but a friend spots it immediately. A fresh pair of eyes catches things you missed.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    {#each cards as card, i}
      <div
        class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5 text-center transition-all duration-700
          {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
      >
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Pull Requests: The Vehicle for Review</h3>
    <p class="text-slate-600">
      In Git-based workflows, code review happens through <strong>pull requests</strong> (PRs). When you finish a feature on a branch, you open a PR to propose merging it. Your teammates review the changes, leave comments, and either approve the PR or request changes before it can be merged.
    </p>
    <div class="flex flex-wrap items-center gap-2 text-sm">
      <span class="rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-slate-700">Write code</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-indigo-100 px-3 py-1.5 font-mono text-indigo-700">Open PR</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-yellow-100 px-3 py-1.5 font-mono text-yellow-700">Team reviews</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-green-100 px-3 py-1.5 font-mono text-green-700">Approved</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-blue-100 px-3 py-1.5 font-mono text-blue-700">Merge</span>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">What to Look For in a Review</h3>
    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Correctness:</strong> Does the code actually do what it claims? Are there logic errors or off-by-one mistakes?</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Readability:</strong> Can you understand the code without the author explaining it? Are the variable and function names clear?</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Edge cases:</strong> What happens with empty input, null values, or very large data? Are those handled?</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Naming:</strong> Are variables, functions, and classes named in a way that explains their purpose?</span>
        </li>
      </ul>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">How to Give Good Feedback</h3>
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
        <h4 class="mb-2 font-bold text-green-700">Do This</h4>
        <ul class="space-y-1.5 text-sm text-slate-600">
          <li>Be specific: "This variable name <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">d</code> could be <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">daysSinceLastLogin</code>"</li>
          <li>Suggest alternatives, not just problems</li>
          <li>Praise good work: "Nice use of early return here!"</li>
          <li>Focus on the code, not the person</li>
          <li>Explain the "why" behind your suggestion</li>
        </ul>
      </div>
      <div class="rounded-xl border-2 border-red-200 bg-red-50 p-4">
        <h4 class="mb-2 font-bold text-red-700">Avoid This</h4>
        <ul class="space-y-1.5 text-sm text-slate-600">
          <li>"This is wrong" (vague, no alternative)</li>
          <li>"Why did you do it this way?" (sounds accusatory)</li>
          <li>Nitpicking formatting that a linter should handle</li>
          <li>Rewriting the entire approach in a comment</li>
          <li>"You always make this mistake" (personal attack)</li>
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

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Code Review (Advanced)</h2>
      <p class="text-slate-600">Professional review workflows, automated tooling, and team culture practices.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Review Checklists</h3>
      <p class="text-slate-600">
        Teams often maintain a checklist that every reviewer works through. This prevents reviewers from forgetting important categories and ensures consistent quality across the team.
      </p>
      <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
        <p class="mb-3 text-sm font-semibold text-slate-500">Typical Review Checklist</p>
        <ul class="space-y-1.5 text-sm text-slate-600">
          <li class="flex items-start gap-2"><span class="mt-0.5">&#9744;</span> Does the code do what the ticket/issue describes?</li>
          <li class="flex items-start gap-2"><span class="mt-0.5">&#9744;</span> Are there tests for the new behavior?</li>
          <li class="flex items-start gap-2"><span class="mt-0.5">&#9744;</span> Are error cases handled gracefully?</li>
          <li class="flex items-start gap-2"><span class="mt-0.5">&#9744;</span> Is there any duplicated logic that could be extracted?</li>
          <li class="flex items-start gap-2"><span class="mt-0.5">&#9744;</span> Are there security concerns (SQL injection, XSS, exposed secrets)?</li>
          <li class="flex items-start gap-2"><span class="mt-0.5">&#9744;</span> Is the documentation updated if needed?</li>
          <li class="flex items-start gap-2"><span class="mt-0.5">&#9744;</span> Will this perform well at scale?</li>
        </ul>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Automated Code Review</h3>
      <p class="text-slate-600">
        Machines handle the tedious stuff so humans can focus on logic and design. Automated tools run on every PR as part of CI:
      </p>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Linters &amp; Formatters</h4>
          <p class="text-sm text-slate-600">ESLint, Prettier, and Stylelint catch style issues, unused variables, and formatting inconsistencies automatically. No human should argue about semicolons.</p>
        </div>
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Static Analysis</h4>
          <p class="text-sm text-slate-600">Tools like SonarQube and CodeClimate analyze complexity, detect code smells, and flag potential security vulnerabilities before a human reviews.</p>
        </div>
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Danger.js</h4>
          <p class="text-sm text-slate-600">A CI plugin that enforces PR conventions: warns if the PR is too large, checks for missing tests, verifies changelog updates, and posts automated comments.</p>
        </div>
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Type Checking</h4>
          <p class="text-sm text-slate-600">TypeScript's compiler and tools like mypy for Python catch type errors at build time, eliminating entire categories of bugs before review.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">CODEOWNERS &amp; Approval Workflows</h3>
      <p class="text-slate-600">
        A <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">CODEOWNERS</code> file in your repository defines who <em>must</em> approve changes to specific paths. When a PR touches files matching a pattern, GitHub automatically requests review from the designated owners.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt"># .github/CODEOWNERS</span>
<span class="cmt"># Each line: pattern    owner(s)</span>

<span class="str">*</span>                     <span class="var">@team/engineering</span>
<span class="str">/src/auth/**</span>          <span class="var">@security-team</span>
<span class="str">/infrastructure/**</span>    <span class="var">@devops</span>
<span class="str">*.sql</span>                 <span class="var">@dba-team</span>
<span class="str">/docs/**</span>              <span class="var">@tech-writers</span>`}</code></pre>
      <p class="text-sm text-slate-500">
        Combined with branch protection rules, this ensures sensitive areas like authentication and infrastructure always get reviewed by domain experts.
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Review Culture</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Blameless Reviews</h4>
          <p class="text-sm text-slate-600">The goal is improving the code, not criticizing the author. Everyone writes imperfect code. Reviews are a collaborative learning opportunity.</p>
        </div>
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Review Speed</h4>
          <p class="text-sm text-slate-600">In trunk-based development, reviews must be fast (hours, not days). Slow reviews block the whole team and encourage large, risky PRs.</p>
        </div>
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Pair Programming</h4>
          <p class="text-sm text-slate-600">Two developers working on the same code in real time is like continuous code review. It catches issues instantly and spreads knowledge without a PR.</p>
        </div>
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Architecture Decision Reviews</h4>
          <p class="text-sm text-slate-600">Major design changes deserve dedicated review through ADRs (Architecture Decision Records), not just inline PR comments.</p>
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

<style>
  .code-block { background-color: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
