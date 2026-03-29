<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Essential Git Commands</h2>
    <p class="text-slate-600">These are the commands you will use every day as a developer. Each one is shown with a real-world example.</p>
  </div>

  <!-- git init -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Starting a Project</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># Create a new Git repository in the current folder</span>
<span class="kw">git init</span>

<span class="cmt"># Or clone an existing project from the internet</span>
<span class="kw">git clone</span> <span class="str">https://github.com/user/project.git</span>`}</code></pre>
    <p class="text-sm text-slate-500"><code class="rounded bg-slate-100 px-1 text-orange-700">git init</code> creates a new empty repository. <code class="rounded bg-slate-100 px-1 text-orange-700">git clone</code> downloads a full copy of an existing one.</p>
  </div>

  <!-- git status & add -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Checking and Staging Changes</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># See which files have been modified</span>
<span class="kw">git status</span>

<span class="cmt"># Stage a specific file for the next commit</span>
<span class="kw">git add</span> <span class="var">index.html</span>

<span class="cmt"># Stage ALL changed files</span>
<span class="kw">git add</span> <span class="op">.</span>`}</code></pre>
    <p class="text-sm text-slate-500">Staging is like putting items in a box before shipping. You choose exactly which changes to include in the next commit.</p>
  </div>

  <!-- git commit -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Saving a Snapshot</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># Commit staged changes with a message</span>
<span class="kw">git commit</span> <span class="op">-m</span> <span class="str">"Add login form to homepage"</span>

<span class="cmt"># See the history of commits</span>
<span class="kw">git log</span> <span class="op">--oneline</span>
<span class="cmt"># a1b2c3d Add login form to homepage</span>
<span class="cmt"># e4f5g6h Fix header alignment</span>
<span class="cmt"># i7j8k9l Initial commit</span>`}</code></pre>
    <p class="text-sm text-slate-500">Each commit gets a unique ID (hash). The message should describe <em>what</em> changed and <em>why</em>.</p>
  </div>

  <!-- git branch & checkout -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Working with Branches</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># List all branches (* marks the current one)</span>
<span class="kw">git branch</span>
<span class="cmt"># * main</span>
<span class="cmt">#   feature-login</span>

<span class="cmt"># Create a new branch</span>
<span class="kw">git branch</span> <span class="var">feature-login</span>

<span class="cmt"># Switch to it</span>
<span class="kw">git checkout</span> <span class="var">feature-login</span>

<span class="cmt"># Or create + switch in one step</span>
<span class="kw">git checkout</span> <span class="op">-b</span> <span class="var">feature-login</span>`}</code></pre>
    <p class="text-sm text-slate-500">Branches are cheap in Git. Create one for every feature or bugfix, then merge when done.</p>
  </div>

  <!-- git merge -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Merging Changes</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># First, switch to the branch you want to merge INTO</span>
<span class="kw">git checkout</span> <span class="var">main</span>

<span class="cmt"># Then merge the feature branch</span>
<span class="kw">git merge</span> <span class="var">feature-login</span>
<span class="cmt"># Merge made by the 'ort' strategy.</span>
<span class="cmt"># login.html | 45 ++++++++++++++++++</span>
<span class="cmt"># 1 file changed, 45 insertions(+)</span>`}</code></pre>
    <p class="text-sm text-slate-500">Git automatically combines the changes. If the same line was edited in both branches, you will get a <strong>merge conflict</strong> to resolve manually.</p>
  </div>

  <!-- git push & pull -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Sharing with Your Team</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># Upload your commits to the remote server</span>
<span class="kw">git push</span> <span class="var">origin</span> <span class="var">main</span>

<span class="cmt"># Download and merge new commits from the remote</span>
<span class="kw">git pull</span> <span class="var">origin</span> <span class="var">main</span>`}</code></pre>
    <p class="text-sm text-slate-500"><code class="rounded bg-slate-100 px-1 text-orange-700">origin</code> is the default name for the remote server (usually GitHub, GitLab, etc.). Push sends your work up; pull brings others' work down.</p>
  </div>

  <!-- Pull requests -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Pull Requests (PRs)</h3>
    <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
      <p class="text-sm text-slate-600">
        A <strong>Pull Request</strong> is not a Git command — it is a feature of platforms like GitHub, GitLab, and Bitbucket. Instead of merging directly, you open a PR to:
      </p>
      <ul class="mt-2 space-y-1 text-sm text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span>Let teammates <strong>review your code</strong> before it goes into main</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span>Run <strong>automated tests</strong> to catch bugs</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span>Have a <strong>discussion</strong> about the changes with comments</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span>Keep a <strong>record</strong> of why each change was made</span>
        </li>
      </ul>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
    >
      I know the essential commands
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Advanced Git Commands</h2>
      <p class="text-slate-600">Power tools for rewriting history, managing complex workflows, and automating your repository.</p>
    </div>

    <!-- Interactive rebase -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Interactive Rebase</h3>
      <p class="text-sm text-slate-600">Rewrite the last N commits: squash them together, reorder, edit messages, or drop commits entirely.</p>
      <pre class="code-block"><code>{@html `<span class="cmt"># Interactively rebase the last 4 commits</span>
<span class="kw">git rebase</span> <span class="op">-i</span> <span class="var">HEAD~4</span>

<span class="cmt"># The editor opens with something like:</span>
<span class="kw">pick</span> <span class="var">a1b2c3d</span> <span class="str">Add user model</span>
<span class="kw">pick</span> <span class="var">e4f5g6h</span> <span class="str">Fix typo in user model</span>
<span class="kw">pick</span> <span class="var">i7j8k9l</span> <span class="str">Add user validation</span>
<span class="kw">pick</span> <span class="var">m0n1o2p</span> <span class="str">Add user tests</span>

<span class="cmt"># Change "pick" to an action:</span>
<span class="kw">pick</span>   <span class="var">a1b2c3d</span> <span class="str">Add user model</span>
<span class="kw">squash</span> <span class="var">e4f5g6h</span> <span class="str">Fix typo in user model</span>    <span class="cmt"># merge into previous</span>
<span class="kw">pick</span>   <span class="var">i7j8k9l</span> <span class="str">Add user validation</span>
<span class="kw">pick</span>   <span class="var">m0n1o2p</span> <span class="str">Add user tests</span>`}</code></pre>
      <p class="text-sm text-slate-500">Actions: <code class="rounded bg-slate-100 px-1 text-orange-700">pick</code> (keep), <code class="rounded bg-slate-100 px-1 text-orange-700">squash</code> (merge with previous), <code class="rounded bg-slate-100 px-1 text-orange-700">reword</code> (edit message), <code class="rounded bg-slate-100 px-1 text-orange-700">drop</code> (delete), <code class="rounded bg-slate-100 px-1 text-orange-700">edit</code> (pause to amend).</p>
    </div>

    <!-- Stashing -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Stashing</h3>
      <p class="text-sm text-slate-600">Temporarily save uncommitted changes so you can switch branches without committing half-done work.</p>
      <pre class="code-block"><code>{@html `<span class="cmt"># Save current changes to the stash</span>
<span class="kw">git stash</span>

<span class="cmt"># Save with a description</span>
<span class="kw">git stash</span> <span class="var">push</span> <span class="op">-m</span> <span class="str">"WIP: login form styling"</span>

<span class="cmt"># List all stashes</span>
<span class="kw">git stash</span> <span class="var">list</span>
<span class="cmt"># stash@{0}: On main: WIP: login form styling</span>
<span class="cmt"># stash@{1}: WIP on feature: half-done refactor</span>

<span class="cmt"># Restore the most recent stash</span>
<span class="kw">git stash</span> <span class="var">pop</span>

<span class="cmt"># Restore a specific stash</span>
<span class="kw">git stash</span> <span class="var">pop</span> <span class="str">stash@{1}</span>`}</code></pre>
    </div>

    <!-- Cherry-pick -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Cherry-Pick</h3>
      <p class="text-sm text-slate-600">Apply a specific commit from any branch onto your current branch, without merging everything.</p>
      <pre class="code-block"><code>{@html `<span class="cmt"># Apply a single commit by its hash</span>
<span class="kw">git cherry-pick</span> <span class="var">a1b2c3d</span>

<span class="cmt"># Cherry-pick a range of commits</span>
<span class="kw">git cherry-pick</span> <span class="var">a1b2c3d</span><span class="op">..</span><span class="var">e4f5g6h</span>

<span class="cmt"># Cherry-pick without committing (stage only)</span>
<span class="kw">git cherry-pick</span> <span class="op">--no-commit</span> <span class="var">a1b2c3d</span>`}</code></pre>
      <p class="text-sm text-slate-500">Common use case: a bug fix on a feature branch needs to go into production immediately, without merging the whole feature.</p>
    </div>

    <!-- Reset vs Revert -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Reset vs. Revert</h3>
      <p class="text-sm text-slate-600">Two ways to undo changes, with very different consequences:</p>
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <pre class="code-block"><code>{@html `<span class="cmt"># RESET: Move HEAD backward</span>
<span class="cmt"># (rewrites history — dangerous on shared branches!)</span>

<span class="cmt"># Keep changes in working directory</span>
<span class="kw">git reset</span> <span class="op">--soft</span> <span class="var">HEAD~1</span>

<span class="cmt"># Unstage changes</span>
<span class="kw">git reset</span> <span class="op">--mixed</span> <span class="var">HEAD~1</span>

<span class="cmt"># Discard changes entirely</span>
<span class="kw">git reset</span> <span class="op">--hard</span> <span class="var">HEAD~1</span>`}</code></pre>
        </div>
        <div>
          <pre class="code-block"><code>{@html `<span class="cmt"># REVERT: Create a NEW commit that undoes</span>
<span class="cmt"># a previous one (safe for shared branches)</span>

<span class="kw">git revert</span> <span class="var">a1b2c3d</span>
<span class="cmt"># Creates a new commit that reverses</span>
<span class="cmt"># all changes from a1b2c3d</span>

<span class="cmt"># Revert without auto-committing</span>
<span class="kw">git revert</span> <span class="op">--no-commit</span> <span class="var">a1b2c3d</span>`}</code></pre>
        </div>
      </div>
      <p class="text-sm text-slate-500"><strong>Rule of thumb:</strong> Use <code class="rounded bg-slate-100 px-1 text-orange-700">revert</code> on shared branches (it preserves history). Use <code class="rounded bg-slate-100 px-1 text-orange-700">reset</code> only on your own local branches.</p>
    </div>

    <!-- .gitignore -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">.gitignore Patterns</h3>
      <p class="text-sm text-slate-600">Tell Git which files to never track. Essential for keeping secrets and build artifacts out of your repo.</p>
      <pre class="code-block"><code>{@html `<span class="cmt"># .gitignore file</span>

<span class="cmt"># Ignore all node_modules folders</span>
<span class="var">node_modules/</span>

<span class="cmt"># Ignore environment files (secrets!)</span>
<span class="var">.env</span>
<span class="var">.env.local</span>

<span class="cmt"># Ignore build output</span>
<span class="var">dist/</span>
<span class="var">build/</span>

<span class="cmt"># Ignore all .log files</span>
<span class="var">*.log</span>

<span class="cmt"># Ignore OS files</span>
<span class="var">.DS_Store</span>
<span class="var">Thumbs.db</span>

<span class="cmt"># But DO track this specific .env file</span>
<span class="op">!</span><span class="var">.env.example</span>`}</code></pre>
      <p class="text-sm text-slate-500">The <code class="rounded bg-slate-100 px-1 text-orange-700">!</code> prefix negates a pattern. Patterns support wildcards (<code class="rounded bg-slate-100 px-1 text-orange-700">*</code>), directories (<code class="rounded bg-slate-100 px-1 text-orange-700">/</code>), and double-star for recursive matching (<code class="rounded bg-slate-100 px-1 text-orange-700">**</code>).</p>
    </div>

    <!-- Hooks -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Git Hooks</h3>
      <p class="text-sm text-slate-600">Scripts that run automatically at specific points in the Git workflow. They live in <code class="rounded bg-slate-100 px-1 text-orange-700">.git/hooks/</code>.</p>
      <pre class="code-block"><code>{@html `<span class="cmt"># .git/hooks/pre-commit (runs before every commit)</span>
<span class="kw">#!/bin/sh</span>

<span class="cmt"># Run linter before allowing the commit</span>
<span class="var">npm</span> <span class="fn">run</span> <span class="str">lint</span>
<span class="kw">if</span> [ <span class="var">$?</span> <span class="op">-ne</span> <span class="num">0</span> ]; <span class="kw">then</span>
  <span class="fn">echo</span> <span class="str">"Lint failed. Fix errors before committing."</span>
  <span class="kw">exit</span> <span class="num">1</span>
<span class="kw">fi</span>`}</code></pre>
      <p class="text-sm text-slate-500">Common hooks: <code class="rounded bg-slate-100 px-1 text-orange-700">pre-commit</code> (lint/format), <code class="rounded bg-slate-100 px-1 text-orange-700">commit-msg</code> (enforce message format), <code class="rounded bg-slate-100 px-1 text-orange-700">pre-push</code> (run tests). Tools like <strong>Husky</strong> make hooks easy to share across a team.</p>
    </div>

    <!-- Submodules -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Submodules</h3>
      <p class="text-sm text-slate-600">Include one Git repository inside another. Useful for shared libraries or vendored dependencies.</p>
      <pre class="code-block"><code>{@html `<span class="cmt"># Add a submodule</span>
<span class="kw">git submodule</span> <span class="var">add</span> <span class="str">https://github.com/lib/utils.git</span> <span class="var">vendor/utils</span>

<span class="cmt"># Clone a repo that has submodules</span>
<span class="kw">git clone</span> <span class="op">--recurse-submodules</span> <span class="str">https://github.com/user/project.git</span>

<span class="cmt"># Update submodules to their latest commits</span>
<span class="kw">git submodule</span> <span class="var">update</span> <span class="op">--remote</span>`}</code></pre>
      <p class="text-sm text-slate-500">Submodules pin to a specific commit. They are powerful but can be tricky — many teams prefer package managers instead.</p>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
      >
        I know the advanced commands
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
