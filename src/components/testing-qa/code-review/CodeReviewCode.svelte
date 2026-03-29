<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Code Review in Practice</h2>
    <p class="text-slate-600">Real examples of PR descriptions, review comments, code diffs with annotations, and a review checklist you can use on any project.</p>
  </div>

  <!-- PR Description Template -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">PR Description Template</h3>
    <p class="text-sm text-slate-600">A good PR description helps reviewers understand <em>what</em> changed and <em>why</em>. Here is a template used by many teams:</p>
    <pre class="code-block"><code>{@html `<span class="cmt">## What</span>
<span class="str">Add email validation to the signup form.</span>

<span class="cmt">## Why</span>
<span class="str">Users were submitting invalid emails, causing bounced</span>
<span class="str">welcome messages and failed account activations.</span>

<span class="cmt">## How</span>
<span class="str">- Added a validateEmail() utility function</span>
<span class="str">- Integrated it into the form's onSubmit handler</span>
<span class="str">- Added unit tests for common edge cases</span>

<span class="cmt">## Testing</span>
<span class="str">- [x] Unit tests pass</span>
<span class="str">- [x] Manual test: invalid email shows error message</span>
<span class="str">- [x] Manual test: valid email submits successfully</span>

<span class="cmt">## Screenshots</span>
<span class="str">(attach before/after if UI changed)</span>`}</code></pre>
  </div>

  <!-- Good vs Bad Comments -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Good vs Bad Review Comments</h3>
    <p class="text-sm text-slate-600">The difference between helpful feedback and unhelpful feedback comes down to being specific and constructive.</p>

    <div class="grid gap-4 lg:grid-cols-2">
      <div class="rounded-xl border-2 border-red-200 bg-red-50 p-5">
        <h4 class="mb-3 font-bold text-red-700">Bad Comments</h4>
        <div class="space-y-3">
          <div class="rounded-lg bg-white p-3 text-sm">
            <p class="mb-1 font-mono text-xs text-slate-400">Line 12:</p>
            <p class="text-red-700">"This is wrong."</p>
            <p class="mt-1 text-xs text-slate-500">Problem: Vague. What's wrong? How should it be fixed?</p>
          </div>
          <div class="rounded-lg bg-white p-3 text-sm">
            <p class="mb-1 font-mono text-xs text-slate-400">Line 25:</p>
            <p class="text-red-700">"Why did you do it like this?"</p>
            <p class="mt-1 text-xs text-slate-500">Problem: Sounds accusatory. Doesn't suggest an alternative.</p>
          </div>
          <div class="rounded-lg bg-white p-3 text-sm">
            <p class="mb-1 font-mono text-xs text-slate-400">General:</p>
            <p class="text-red-700">"I would have done this completely differently."</p>
            <p class="mt-1 text-xs text-slate-500">Problem: Unhelpful without specifics. Dismissive of the author's approach.</p>
          </div>
        </div>
      </div>

      <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
        <h4 class="mb-3 font-bold text-green-700">Good Comments</h4>
        <div class="space-y-3">
          <div class="rounded-lg bg-white p-3 text-sm">
            <p class="mb-1 font-mono text-xs text-slate-400">Line 12:</p>
            <p class="text-green-700">"This will throw if <code class="rounded bg-slate-100 px-1 text-xs">user</code> is null. Consider adding a guard: <code class="rounded bg-slate-100 px-1 text-xs">if (!user) return null;</code>"</p>
            <p class="mt-1 text-xs text-slate-500">Specific problem + concrete fix suggestion.</p>
          </div>
          <div class="rounded-lg bg-white p-3 text-sm">
            <p class="mb-1 font-mono text-xs text-slate-400">Line 25:</p>
            <p class="text-green-700">"Nice approach! One thought: <code class="rounded bg-slate-100 px-1 text-xs">filter().map()</code> could replace this loop and might be easier to read."</p>
            <p class="mt-1 text-xs text-slate-500">Praise + suggestion with reasoning.</p>
          </div>
          <div class="rounded-lg bg-white p-3 text-sm">
            <p class="mb-1 font-mono text-xs text-slate-400">Line 40:</p>
            <p class="text-green-700">"The name <code class="rounded bg-slate-100 px-1 text-xs">data</code> is pretty generic. Since this holds user profiles, maybe <code class="rounded bg-slate-100 px-1 text-xs">userProfiles</code> would be clearer?"</p>
            <p class="mt-1 text-xs text-slate-500">Explains the problem and offers a specific alternative.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Code Diff with Annotations -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Annotated Code Diff</h3>
    <p class="text-sm text-slate-600">Here is what a real review looks like on a code diff. Green lines are additions, red lines are removals.</p>

    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5 space-y-3">
      <p class="text-xs font-mono text-slate-500">src/utils/validate.ts</p>
      <pre class="code-block"><code>{@html `<span class="op">  function validateAge(age) {</span>
<span style="color:#f87171">-   if (age < 0) return false;</span>
<span style="color:#4ade80">+   if (age < 0 || age > 150) return false;</span>
<span style="color:#4ade80">+   if (typeof age !== "number") return false;</span>
<span class="op">    return true;</span>
<span class="op">  }</span>`}</code></pre>
      <div class="space-y-2">
        <div class="flex items-start gap-2 rounded-lg bg-white p-3 text-sm">
          <span class="mt-0.5 shrink-0 rounded bg-green-100 px-1.5 py-0.5 text-xs font-bold text-green-700">+</span>
          <p class="text-slate-700"><strong>Good:</strong> Adding an upper bound (150) catches unrealistic ages. The type check prevents strings from being treated as valid.</p>
        </div>
        <div class="flex items-start gap-2 rounded-lg bg-white p-3 text-sm">
          <span class="mt-0.5 shrink-0 rounded bg-yellow-100 px-1.5 py-0.5 text-xs font-bold text-yellow-700">?</span>
          <p class="text-slate-700"><strong>Suggestion:</strong> Consider also checking for <code class="rounded bg-slate-100 px-1 text-xs">NaN</code> and non-integer values: <code class="rounded bg-slate-100 px-1 text-xs">Number.isInteger(age)</code></p>
        </div>
      </div>
    </div>
  </div>

  <!-- Review Checklist -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Review Checklist</h3>
    <p class="text-sm text-slate-600">Use this checklist whenever you review someone's code:</p>
    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
      <ul class="space-y-2 text-sm text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Does it work?</strong> Does the code do what the PR description says it does?</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Can I understand it?</strong> Could a new team member read this and know what it does?</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Edge cases?</strong> What happens with empty input, null, zero, or very large values?</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Are there tests?</strong> New behavior should have tests. Modified behavior should update tests.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Any duplication?</strong> Is the same logic repeated? Could it be extracted to a shared function?</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Good names?</strong> Are variables, functions, and files named clearly and consistently?</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Error handling?</strong> Are errors caught and reported in a way that helps debugging?</span>
        </li>
      </ul>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Code Review Tooling (Advanced)</h2>
    <p class="text-slate-600">Configuration files, automated review bots, and professional review conventions used in production codebases.</p>
  </div>

  <!-- CODEOWNERS Syntax -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">GitHub CODEOWNERS Syntax</h3>
    <p class="text-sm text-slate-600">Place this file at <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">.github/CODEOWNERS</code> to auto-assign reviewers by file path. The last matching pattern wins.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># .github/CODEOWNERS</span>
<span class="cmt"># Default: engineering team reviews everything</span>
<span class="str">*</span>                         <span class="var">@acme/engineering</span>

<span class="cmt"># Frontend team owns UI code</span>
<span class="str">/src/components/**</span>        <span class="var">@acme/frontend</span>
<span class="str">/src/styles/**</span>            <span class="var">@acme/frontend</span>

<span class="cmt"># Security team must approve auth changes</span>
<span class="str">/src/auth/**</span>              <span class="var">@acme/security</span> <span class="var">@security-lead</span>

<span class="cmt"># DevOps owns infrastructure</span>
<span class="str">Dockerfile</span>                <span class="var">@acme/devops</span>
<span class="str">docker-compose*.yml</span>       <span class="var">@acme/devops</span>
<span class="str">/.github/workflows/**</span>     <span class="var">@acme/devops</span>

<span class="cmt"># Database migrations need DBA review</span>
<span class="str">/migrations/**</span>            <span class="var">@acme/dba</span>
<span class="str">*.sql</span>                     <span class="var">@acme/dba</span>`}</code></pre>
  </div>

  <!-- Danger.js Config -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Danger.js Configuration</h3>
    <p class="text-sm text-slate-600">Danger.js runs in CI and posts automated review comments. It enforces conventions without human effort.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// dangerfile.ts</span>
<span class="kw">import</span> { danger, warn, fail, message } <span class="kw">from</span> <span class="str">"danger"</span>;

<span class="cmt">// Warn if PR is too large</span>
<span class="kw">const</span> <span class="var">bigPRThreshold</span> <span class="op">=</span> <span class="num">500</span>;
<span class="kw">if</span> (<span class="var">danger</span>.<span class="var">github</span>.<span class="var">pr</span>.<span class="var">additions</span> <span class="op">+</span> <span class="var">danger</span>.<span class="var">github</span>.<span class="var">pr</span>.<span class="var">deletions</span> <span class="op">></span> <span class="var">bigPRThreshold</span>) {
  <span class="fn">warn</span>(<span class="str">"This PR is quite large. Consider splitting into smaller PRs."</span>);
}

<span class="cmt">// Require PR description</span>
<span class="kw">if</span> (<span class="op">!</span><span class="var">danger</span>.<span class="var">github</span>.<span class="var">pr</span>.<span class="var">body</span> <span class="op">||</span> <span class="var">danger</span>.<span class="var">github</span>.<span class="var">pr</span>.<span class="var">body</span>.<span class="var">length</span> <span class="op"><</span> <span class="num">10</span>) {
  <span class="fn">fail</span>(<span class="str">"Please add a description to your PR."</span>);
}

<span class="cmt">// Check for test files when source changes</span>
<span class="kw">const</span> <span class="var">srcChanges</span> <span class="op">=</span> <span class="var">danger</span>.<span class="var">git</span>.<span class="var">modified_files</span>.<span class="fn">filter</span>(<span class="arg">f</span> <span class="op">=></span> <span class="var">f</span>.<span class="fn">startsWith</span>(<span class="str">"src/"</span>));
<span class="kw">const</span> <span class="var">testChanges</span> <span class="op">=</span> <span class="var">danger</span>.<span class="var">git</span>.<span class="var">modified_files</span>.<span class="fn">filter</span>(<span class="arg">f</span> <span class="op">=></span> <span class="var">f</span>.<span class="fn">includes</span>(<span class="str">".test."</span>));
<span class="kw">if</span> (<span class="var">srcChanges</span>.<span class="var">length</span> <span class="op">></span> <span class="num">0</span> <span class="op">&&</span> <span class="var">testChanges</span>.<span class="var">length</span> <span class="op">===</span> <span class="num">0</span>) {
  <span class="fn">warn</span>(<span class="str">"Source files changed but no tests were updated."</span>);
}

<span class="cmt">// Celebrate first-time contributors</span>
<span class="kw">if</span> (<span class="var">danger</span>.<span class="var">github</span>.<span class="var">pr</span>.<span class="var">author_association</span> <span class="op">===</span> <span class="str">"FIRST_TIME_CONTRIBUTOR"</span>) {
  <span class="fn">message</span>(<span class="str">"Welcome! Thanks for your first contribution! 🎉"</span>);
}`}</code></pre>
  </div>

  <!-- ESLint Rules -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">ESLint Rule Examples</h3>
    <p class="text-sm text-slate-600">Linters automate the tedious parts of review. Here are rules that catch common issues:</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// eslint.config.js (flat config)</span>
<span class="kw">export default</span> [
  {
    <span class="var">rules</span>: {
      <span class="cmt">// Prevent unused variables from cluttering code</span>
      <span class="str">"no-unused-vars"</span>: <span class="str">"error"</span>,

      <span class="cmt">// Require === instead of == to avoid type coercion bugs</span>
      <span class="str">"eqeqeq"</span>: [<span class="str">"error"</span>, <span class="str">"always"</span>],

      <span class="cmt">// Disallow console.log in production code</span>
      <span class="str">"no-console"</span>: [<span class="str">"warn"</span>, { <span class="var">allow</span>: [<span class="str">"warn"</span>, <span class="str">"error"</span>] }],

      <span class="cmt">// Enforce consistent return in functions</span>
      <span class="str">"consistent-return"</span>: <span class="str">"error"</span>,

      <span class="cmt">// Limit function complexity</span>
      <span class="str">"complexity"</span>: [<span class="str">"warn"</span>, <span class="num">10</span>],

      <span class="cmt">// Prevent reassigning function parameters</span>
      <span class="str">"no-param-reassign"</span>: <span class="str">"error"</span>,
    },
  },
];`}</code></pre>
  </div>

  <!-- PR Template -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">PR Templates in .github/</h3>
    <p class="text-sm text-slate-600">Place a template at <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">.github/pull_request_template.md</code> and it auto-fills every new PR:</p>
    <pre class="code-block"><code>{@html `<span class="cmt">## What does this PR do?</span>
<span class="var">&lt;!-- Describe the change in 1-2 sentences --&gt;</span>

<span class="cmt">## Why is this change needed?</span>
<span class="var">&lt;!-- Link to the issue or explain the motivation --&gt;</span>

<span class="cmt">## How was this tested?</span>
<span class="str">- [ ] Unit tests added/updated</span>
<span class="str">- [ ] Manual testing performed</span>
<span class="str">- [ ] E2E tests pass</span>

<span class="cmt">## Checklist</span>
<span class="str">- [ ] Code follows project style guidelines</span>
<span class="str">- [ ] Self-review completed</span>
<span class="str">- [ ] Documentation updated (if needed)</span>
<span class="str">- [ ] No new warnings introduced</span>

<span class="cmt">## Screenshots (if UI change)</span>
<span class="var">&lt;!-- Before/after screenshots --&gt;</span>`}</code></pre>
  </div>

  <!-- Conventional Comments -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Conventional Comments Format</h3>
    <p class="text-sm text-slate-600">
      Teams use prefixed labels so the author instantly knows the severity and intent of each comment. This avoids ambiguity about whether a comment is a blocking issue or just a thought.
    </p>
    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
      <div class="space-y-3 text-sm">
        <div class="flex items-start gap-3">
          <code class="shrink-0 rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">issue:</code>
          <span class="text-slate-600">A problem that must be fixed before merging. <em>"issue: This query is vulnerable to SQL injection."</em></span>
        </div>
        <div class="flex items-start gap-3">
          <code class="shrink-0 rounded bg-yellow-100 px-2 py-0.5 text-xs font-bold text-yellow-700">suggestion:</code>
          <span class="text-slate-600">A non-blocking improvement idea. <em>"suggestion: Using a Map here would be O(1) lookup instead of O(n)."</em></span>
        </div>
        <div class="flex items-start gap-3">
          <code class="shrink-0 rounded bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">question:</code>
          <span class="text-slate-600">A clarification request. <em>"question: Is this timeout value based on a specific requirement?"</em></span>
        </div>
        <div class="flex items-start gap-3">
          <code class="shrink-0 rounded bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-700">nitpick:</code>
          <span class="text-slate-600">A trivial style preference, not blocking. <em>"nitpick: I'd name this <code class="rounded bg-slate-100 px-1 text-xs">isActive</code> instead of <code class="rounded bg-slate-100 px-1 text-xs">active</code>."</em></span>
        </div>
        <div class="flex items-start gap-3">
          <code class="shrink-0 rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">praise:</code>
          <span class="text-slate-600">Positive feedback. <em>"praise: Really clean error handling here. Great use of Result types."</em></span>
        </div>
        <div class="flex items-start gap-3">
          <code class="shrink-0 rounded bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-700">thought:</code>
          <span class="text-slate-600">An observation, not actionable. <em>"thought: We might want to extract this into a shared utility someday."</em></span>
        </div>
      </div>
    </div>
  </div>

  <!-- Automated Review Bot Setup -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Automated Review Bot (GitHub Actions)</h3>
    <p class="text-sm text-slate-600">A CI workflow that runs linting and type checking on every PR, posting results as a status check:</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># .github/workflows/review.yml</span>
<span class="var">name</span>: <span class="str">Code Review Checks</span>
<span class="var">on</span>: [<span class="str">pull_request</span>]

<span class="var">jobs</span>:
  <span class="var">lint-and-check</span>:
    <span class="var">runs-on</span>: <span class="str">ubuntu-latest</span>
    <span class="var">steps</span>:
      - <span class="var">uses</span>: <span class="str">actions/checkout@v4</span>
      - <span class="var">uses</span>: <span class="str">actions/setup-node@v4</span>
        <span class="var">with</span>:
          <span class="var">node-version</span>: <span class="num">20</span>

      - <span class="var">run</span>: <span class="str">npm ci</span>
      - <span class="var">run</span>: <span class="str">npx eslint . --max-warnings 0</span>
      - <span class="var">run</span>: <span class="str">npx tsc --noEmit</span>
      - <span class="var">run</span>: <span class="str">npm test -- --coverage</span>`}</code></pre>
    <p class="text-sm text-slate-500">Combined with branch protection rules requiring this workflow to pass, no code can be merged without passing lint, type, and test checks.</p>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      Got it
    </button>
  </div>
</div>
{/if}

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
