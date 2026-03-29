<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Commit Timeline ===
  interface Commit {
    id: number;
    message: string;
    timestamp: string;
  }

  let commits = $state<Commit[]>([
    { id: 1, message: 'Initial commit: add README', timestamp: '10:00 AM' },
    { id: 2, message: 'Add homepage layout', timestamp: '10:15 AM' },
    { id: 3, message: 'Fix typo in title', timestamp: '10:22 AM' },
  ]);
  let checkedOutId = $state(3);
  let newMessage = $state('');
  let nextId = $state(4);
  let nextHour = $state(10);
  let nextMin = $state(30);

  function addCommit() {
    if (!newMessage.trim()) return;
    const time = `${nextHour}:${String(nextMin).padStart(2, '0')} AM`;
    commits = [...commits, { id: nextId, message: newMessage.trim(), timestamp: time }];
    checkedOutId = nextId;
    nextId++;
    nextMin += Math.floor(Math.random() * 10) + 3;
    if (nextMin >= 60) { nextHour++; nextMin -= 60; }
    newMessage = '';
  }

  function checkout(id: number) {
    checkedOutId = id;
  }

  // === Advanced mode: Branch Simulator ===
  interface BranchCommit {
    id: number;
    message: string;
    branch: string;
    parentId: number | null;
    merged?: boolean;
  }

  let branchCommits = $state<BranchCommit[]>([
    { id: 1, message: 'Initial commit', branch: 'main', parentId: null },
    { id: 2, message: 'Add homepage', branch: 'main', parentId: 1 },
    { id: 3, message: 'Add navigation', branch: 'main', parentId: 2 },
  ]);
  let branches = $state<string[]>(['main']);
  let activeBranch = $state('main');
  let branchNextId = $state(4);
  let newBranchName = $state('');
  let newBranchMessage = $state('');
  let mergeSource = $state('');
  let mergeMessage = $state('');

  function getLatestOnBranch(branch: string): BranchCommit | undefined {
    const onBranch = branchCommits.filter(c => c.branch === branch);
    return onBranch.length > 0 ? onBranch[onBranch.length - 1] : undefined;
  }

  function createBranch() {
    const name = newBranchName.trim().toLowerCase().replace(/\s+/g, '-');
    if (!name || branches.includes(name)) return;
    branches = [...branches, name];
    activeBranch = name;
    const parent = getLatestOnBranch('main');
    branchCommits = [...branchCommits, {
      id: branchNextId,
      message: `Branch '${name}' created from main`,
      branch: name,
      parentId: parent?.id ?? null,
    }];
    branchNextId++;
    newBranchName = '';
  }

  function addBranchCommit() {
    if (!newBranchMessage.trim()) return;
    const parent = getLatestOnBranch(activeBranch);
    branchCommits = [...branchCommits, {
      id: branchNextId,
      message: newBranchMessage.trim(),
      branch: activeBranch,
      parentId: parent?.id ?? null,
    }];
    branchNextId++;
    newBranchMessage = '';
  }

  function mergeBranch() {
    if (!mergeSource || mergeSource === 'main') return;
    const sourceLatest = getLatestOnBranch(mergeSource);
    const mainLatest = getLatestOnBranch('main');
    if (!sourceLatest) return;
    branchCommits = [...branchCommits, {
      id: branchNextId,
      message: mergeMessage.trim() || `Merge '${mergeSource}' into main`,
      branch: 'main',
      parentId: mainLatest?.id ?? null,
      merged: true,
    }];
    branchNextId++;
    activeBranch = 'main';
    mergeSource = '';
    mergeMessage = '';
  }

  const branchColors: Record<string, string> = {};
  const colorOptions = ['bg-orange-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400', 'bg-teal-400'];
  const borderColorOptions = ['border-orange-400', 'border-blue-400', 'border-green-400', 'border-purple-400', 'border-pink-400', 'border-teal-400'];
  const textColorOptions = ['text-orange-700', 'text-blue-700', 'text-green-700', 'text-purple-700', 'text-pink-700', 'text-teal-700'];
  let colorIdx = 0;

  function getBranchColor(branch: string): string {
    if (!branchColors[branch]) {
      branchColors[branch] = colorOptions[colorIdx % colorOptions.length];
      colorIdx++;
    }
    return branchColors[branch];
  }

  function getBranchBorderColor(branch: string): string {
    const idx = colorOptions.indexOf(getBranchColor(branch));
    return borderColorOptions[idx >= 0 ? idx : 0];
  }

  function getBranchTextColor(branch: string): string {
    const idx = colorOptions.indexOf(getBranchColor(branch));
    return textColorOptions[idx >= 0 ? idx : 0];
  }
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Commit Timeline</h2>
    <p class="text-slate-600">
      Add commits to build a project history. Click any past commit to "check it out" and see how you can travel through time.
    </p>
  </div>

  <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-6 space-y-6">
    <!-- Timeline -->
    <div class="space-y-0">
      {#each commits as commit, i (commit.id)}
        <button
          onclick={() => checkout(commit.id)}
          class="flex w-full items-start gap-4 text-left transition-all hover:bg-orange-100 rounded-lg px-3 py-2 {commit.id === checkedOutId ? 'ring-2 ring-orange-500 bg-orange-100' : ''}"
        >
          <!-- Timeline dot and line -->
          <div class="flex flex-col items-center">
            <div class="h-4 w-4 rounded-full border-2 {commit.id === checkedOutId ? 'border-orange-600 bg-orange-600' : 'border-orange-400 bg-white'}"></div>
            {#if i < commits.length - 1}
              <div class="h-8 w-0.5 bg-orange-300"></div>
            {/if}
          </div>
          <!-- Commit info -->
          <div class="flex-1 -mt-0.5">
            <p class="font-mono text-xs text-slate-400">#{String(commit.id).padStart(3, '0')} &middot; {commit.timestamp}</p>
            <p class="text-sm font-medium text-slate-700">{commit.message}</p>
            {#if commit.id === checkedOutId}
              <span class="mt-1 inline-block rounded bg-orange-600 px-2 py-0.5 text-xs font-bold text-white">HEAD</span>
            {/if}
          </div>
        </button>
      {/each}
    </div>

    <!-- Add commit -->
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={newMessage}
        placeholder="Describe your change..."
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') addCommit(); }}
      />
      <button
        onclick={addCommit}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-orange-700 active:scale-95"
      >
        Commit
      </button>
    </div>

    <p class="text-xs text-slate-500">
      {#if checkedOutId < commits.length}
        You are viewing commit #{String(checkedOutId).padStart(3, '0')} — the project looks like it did at this point in time. In real Git, this is called a "detached HEAD" state.
      {:else}
        You are at the latest commit. Add a new commit to extend the history.
      {/if}
    </p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
    >
      I've explored the timeline
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Branch Simulator</h2>
      <p class="text-slate-600">
        Create branches, add commits to different branches, and merge them back together. Watch the branching graph form in real time.
      </p>
    </div>

    <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-6 space-y-6">
      <!-- Branch tabs -->
      <div class="flex flex-wrap gap-2">
        {#each branches as branch}
          <button
            onclick={() => activeBranch = branch}
            class="rounded-full px-4 py-1.5 text-sm font-semibold transition-all border-2 {activeBranch === branch ? getBranchColor(branch) + ' text-white ' + getBranchBorderColor(branch) : 'bg-white ' + getBranchBorderColor(branch) + ' ' + getBranchTextColor(branch)}"
          >
            {branch}
          </button>
        {/each}
      </div>

      <!-- Branch graph -->
      <div class="space-y-1">
        {#each branchCommits as commit (commit.id)}
          <div class="flex items-center gap-3 rounded-lg px-3 py-1.5 {commit.branch === activeBranch ? 'bg-orange-100' : 'bg-white/50'}">
            <div class="h-3 w-3 rounded-full {getBranchColor(commit.branch)} {commit.merged ? 'ring-2 ring-offset-1 ring-green-500' : ''}"></div>
            <span class="rounded bg-slate-200 px-2 py-0.5 text-xs font-mono text-slate-600">{commit.branch}</span>
            <span class="text-sm text-slate-700">{commit.message}</span>
            {#if commit.merged}
              <span class="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">MERGE</span>
            {/if}
          </div>
        {/each}
      </div>

      <!-- Controls -->
      <div class="grid gap-4 sm:grid-cols-2">
        <!-- Create branch -->
        <div class="space-y-2 rounded-lg border border-orange-200 bg-white p-4">
          <h4 class="text-sm font-bold text-slate-700">Create a Branch</h4>
          <div class="flex gap-2">
            <input
              type="text"
              bind:value={newBranchName}
              placeholder="e.g. feature-login"
              class="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') createBranch(); }}
            />
            <button
              onclick={createBranch}
              class="rounded-lg bg-orange-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95"
            >
              Branch
            </button>
          </div>
        </div>

        <!-- Add commit to active branch -->
        <div class="space-y-2 rounded-lg border border-orange-200 bg-white p-4">
          <h4 class="text-sm font-bold text-slate-700">Commit to <span class="font-mono text-orange-700">{activeBranch}</span></h4>
          <div class="flex gap-2">
            <input
              type="text"
              bind:value={newBranchMessage}
              placeholder="Commit message..."
              class="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') addBranchCommit(); }}
            />
            <button
              onclick={addBranchCommit}
              class="rounded-lg bg-orange-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95"
            >
              Commit
            </button>
          </div>
        </div>
      </div>

      <!-- Merge -->
      {#if branches.length > 1}
        <div class="space-y-2 rounded-lg border border-green-200 bg-green-50 p-4">
          <h4 class="text-sm font-bold text-slate-700">Merge a Branch into Main</h4>
          <div class="flex flex-wrap gap-2">
            <select
              bind:value={mergeSource}
              class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 focus:border-orange-500 focus:outline-none"
            >
              <option value="">Select branch...</option>
              {#each branches.filter(b => b !== 'main') as branch}
                <option value={branch}>{branch}</option>
              {/each}
            </select>
            <input
              type="text"
              bind:value={mergeMessage}
              placeholder="Merge message (optional)"
              class="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none"
            />
            <button
              onclick={mergeBranch}
              class="rounded-lg bg-green-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-700 active:scale-95"
            >
              Merge into main
            </button>
          </div>
        </div>
      {/if}
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
      >
        I've explored branching
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
