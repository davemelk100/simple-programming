<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);

  const cards = [
    { emoji: '\u23EA', title: 'Undo Mistakes', desc: 'Every change is saved as a snapshot. Made a mess? Jump back to any previous version instantly.' },
    { emoji: '\uD83C\uDF33', title: 'Work in Parallel', desc: 'Create branches to experiment freely without affecting the main codebase. Merge when ready.' },
    { emoji: '\uD83E\uDD1D', title: 'Collaborate Safely', desc: 'Multiple people can work on the same project simultaneously without overwriting each other\'s work.' },
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
    <p class="text-slate-600">
      Imagine you are writing a school essay in Google Docs. Every few minutes, Google saves a version of your document. If you accidentally delete a paragraph, you can open the version history and restore it. <strong>Version control</strong> is the same idea, but for code — and much more powerful.
    </p>
    <p class="mt-3 text-slate-600">
      The most popular version control system is called <strong>Git</strong>. Almost every software team in the world uses it. Git tracks every change you make, who made it, and when — creating a complete history of your project.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    {#each cards as card, i}
      <div
        class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5 text-center transition-all duration-700
          {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
      >
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>

    <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5 space-y-4">
      <div>
        <h4 class="font-bold text-slate-800">Repository (Repo)</h4>
        <p class="text-sm text-slate-600">A folder that Git is tracking. It contains all your project files plus a hidden <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">.git</code> folder where Git stores the entire history.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Commit</h4>
        <p class="text-sm text-slate-600">A snapshot of your project at a specific moment. Each commit has a message describing what changed, like a save point in a video game. You decide when to commit — usually after completing a small, logical piece of work.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Branch</h4>
        <p class="text-sm text-slate-600">A separate line of development. Think of it like making a copy of your essay to try a different ending. The original stays safe on the <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">main</code> branch while you experiment on a new one.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Merge</h4>
        <p class="text-sm text-slate-600">Combining changes from one branch into another. When your experiment works out, you merge it back into <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">main</code> so everyone benefits from your work.</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">The Basic Workflow</h3>
    <div class="flex flex-wrap items-center gap-2 text-sm">
      <span class="rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-slate-700">Edit files</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-orange-100 px-3 py-1.5 font-mono text-orange-700">Stage changes</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-orange-200 px-3 py-1.5 font-mono text-orange-800">Commit</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-green-100 px-3 py-1.5 font-mono text-green-700">Push to remote</span>
    </div>
    <p class="text-sm text-slate-500">
      You edit code, tell Git which changes to include (stage), save a snapshot (commit), and then share it with your team (push).
    </p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
    >
      I understand version control
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Version Control (Advanced)</h2>
      <p class="text-slate-600">Git internals, advanced workflows, and professional branching strategies.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Git Internals: The Directed Acyclic Graph</h3>
      <p class="text-slate-600">
        Under the hood, Git stores your project history as a <strong>Directed Acyclic Graph (DAG)</strong>. Every commit is a node that points to its parent commit(s). Branches are simply pointers to specific commits — they are not copies of your code.
      </p>
      <p class="text-slate-600">
        Git identifies everything using <strong>SHA-1 hashes</strong> — 40-character strings like <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">a1b2c3d...</code>. These are computed from the content itself, so identical content always produces the same hash. Git stores three types of objects:
      </p>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>Blob:</strong> The contents of a single file (no filename, just raw data).</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>Tree:</strong> A directory listing that maps filenames to blob hashes (and sub-trees).</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>Commit:</strong> Points to a tree (the project snapshot), its parent commit(s), and metadata (author, message, timestamp).</span>
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Rebase vs. Merge</h3>
      <p class="text-slate-600">
        Both integrate changes from one branch into another, but they do it differently:
      </p>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Merge</h4>
          <p class="text-sm text-slate-600">Creates a new <strong>merge commit</strong> with two parents. Preserves the complete history including when branches diverged and converged. Safer for shared branches.</p>
          <pre class="code-block mt-2"><code>{@html `<span class="cmt"># Merge feature into main</span>
<span class="kw">git checkout</span> <span class="var">main</span>
<span class="kw">git merge</span> <span class="var">feature</span>`}</code></pre>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Rebase</h4>
          <p class="text-sm text-slate-600">Re-applies your commits on top of another branch, rewriting history into a straight line. Creates cleaner history but <strong>never rebase shared branches</strong> — it changes commit hashes.</p>
          <pre class="code-block mt-2"><code>{@html `<span class="cmt"># Rebase feature onto main</span>
<span class="kw">git checkout</span> <span class="var">feature</span>
<span class="kw">git rebase</span> <span class="var">main</span>`}</code></pre>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Power Tools</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Cherry-Pick</h4>
          <p class="text-sm text-slate-600">Apply a single commit from one branch onto another without merging the entire branch. Useful for hotfixes.</p>
          <pre class="code-block mt-2"><code>{@html `<span class="kw">git cherry-pick</span> <span class="var">a1b2c3d</span>`}</code></pre>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Bisect</h4>
          <p class="text-sm text-slate-600">Binary search through commits to find exactly which one introduced a bug. Git automates the process — you just say "good" or "bad."</p>
          <pre class="code-block mt-2"><code>{@html `<span class="kw">git bisect</span> <span class="var">start</span>
<span class="kw">git bisect</span> <span class="var">bad</span>    <span class="cmt"># current is broken</span>
<span class="kw">git bisect</span> <span class="var">good</span> <span class="str">v1.0</span> <span class="cmt"># this was fine</span>`}</code></pre>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Reflog</h4>
          <p class="text-sm text-slate-600">Git's safety net. Records every time a ref (like HEAD) changes. Even if you accidentally delete a branch or reset too far, reflog lets you find and recover lost commits.</p>
          <pre class="code-block mt-2"><code>{@html `<span class="kw">git reflog</span>
<span class="cmt"># Find the lost commit, then:</span>
<span class="kw">git reset</span> <span class="op">--hard</span> <span class="var">HEAD@{3}</span>`}</code></pre>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Interactive Rebase</h4>
          <p class="text-sm text-slate-600">Rewrite recent history: squash commits together, reorder them, edit messages, or drop commits entirely. Essential for cleaning up before a pull request.</p>
          <pre class="code-block mt-2"><code>{@html `<span class="kw">git rebase</span> <span class="op">-i</span> <span class="var">HEAD~5</span>
<span class="cmt"># Opens editor to pick/squash/edit</span>`}</code></pre>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Branching Strategies</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Git Flow</h4>
          <p class="text-sm text-slate-600">
            Uses long-lived branches: <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">main</code>, <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">develop</code>, <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">feature/*</code>, <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">release/*</code>, and <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">hotfix/*</code>. Good for versioned releases (mobile apps, libraries).
          </p>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Trunk-Based Development</h4>
          <p class="text-sm text-slate-600">
            Everyone commits to <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">main</code> (the "trunk") frequently, using short-lived feature branches (hours, not weeks). Paired with CI/CD and feature flags. Favored by high-velocity teams.
          </p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Monorepos</h3>
      <p class="text-slate-600">
        A <strong>monorepo</strong> stores multiple projects (frontend, backend, shared libraries) in a single repository. Companies like Google and Meta use monorepos with thousands of developers. Benefits include atomic cross-project changes and shared tooling. Challenges include scaling Git performance and managing build times — tools like <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">nx</code>, <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">turborepo</code>, and <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">bazel</code> help address these.
      </p>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
      >
        I understand version control
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
