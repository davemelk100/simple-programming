<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: (score: number) => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode ===
  let b1Answer = $state('');
  let b1Result = $state<'correct' | 'wrong' | null>(null);

  let b2Answer = $state('');
  let b2Result = $state<'correct' | 'wrong' | null>(null);

  let b3Answer = $state('');
  let b3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(b1Result === 'correct' && b2Result === 'correct' && b3Result === 'correct');

  function checkB1() {
    const a = b1Answer.trim().toLowerCase();
    b1Result = (a === 'commit' || a === 'git commit') ? 'correct' : 'wrong';
  }

  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    b2Result = (a === 'branch' || a === 'git branch' || a === 'a branch') ? 'correct' : 'wrong';
  }

  function checkB3() {
    const a = b3Answer.trim().toLowerCase();
    b3Result = (a === 'merge' || a === 'git merge' || a === 'a merge') ? 'correct' : 'wrong';
  }

  function handleComplete() {
    const score = [b1Result, b2Result, b3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (allDone) {
      handleComplete();
    }
  });

  // === Advanced mode ===
  let a1Answer = $state('');
  let a1Result = $state<'correct' | 'wrong' | null>(null);

  let a2Answer = $state('');
  let a2Result = $state<'correct' | 'wrong' | null>(null);

  let a3Answer = $state('');
  let a3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(a1Result === 'correct' && a2Result === 'correct' && a3Result === 'correct');

  function checkA1() {
    const a = a1Answer.trim().toLowerCase();
    a1Result = (a === 'rebase' || a === 'git rebase') ? 'correct' : 'wrong';
  }

  function checkA2() {
    const a = a2Answer.trim().toLowerCase();
    a2Result = (a === 'bisect' || a === 'git bisect') ? 'correct' : 'wrong';
  }

  function checkA3() {
    const a = a3Answer.trim().toLowerCase();
    a3Result = (a === 'reflog' || a === 'git reflog' || a === 'the reflog') ? 'correct' : 'wrong';
  }

  function handleAdvComplete() {
    const score = [a1Result, a2Result, a3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (advAllDone) {
      handleAdvComplete();
    }
  });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Version Control Basics</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section. Type a single word (the Git concept).</p>
  </div>

  <!-- Question 1 -->
  <div class="rounded-xl border-2 {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What Git command saves a snapshot of your changes?</p>
    <p class="text-sm text-slate-500">Hint: It's like a save point in a video game.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b1Answer}
        placeholder="Your answer..."
        disabled={b1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB1(); }}
      />
      <button
        onclick={checkB1}
        disabled={b1Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b1Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! A commit saves a snapshot of your staged changes with a descriptive message.</p>
    {:else if b1Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about what "saves" your changes in Git. Try again!</p>
    {/if}
  </div>

  <!-- Question 2 -->
  <div class="rounded-xl border-2 {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What creates a separate copy of your code to work on independently?</p>
    <p class="text-sm text-slate-500">Hint: It's named after part of a tree.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b2Answer}
        placeholder="Your answer..."
        disabled={b2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB2(); }}
      />
      <button
        onclick={checkB2}
        disabled={b2Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b2Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! A branch lets you diverge from the main line and work independently.</p>
    {:else if b2Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about what lets you work on a separate line of development. Try again!</p>
    {/if}
  </div>

  <!-- Question 3 -->
  <div class="rounded-xl border-2 {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What combines changes from one branch into another?</p>
    <p class="text-sm text-slate-500">Hint: It brings two streams of work together.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b3Answer}
        placeholder="Your answer..."
        disabled={b3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB3(); }}
      />
      <button
        onclick={checkB3}
        disabled={b3Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b3Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Merge combines the work from one branch into another, integrating all the changes.</p>
    {:else if b3Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about what "combines" two branches together. Try again!</p>
    {/if}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You know the fundamentals of version control.</p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Git</h2>
    <p class="text-slate-600">Answer all three questions correctly. Type the Git command or concept name.</p>
  </div>

  <!-- Advanced Question 1 -->
  <div class="rounded-xl border-2 {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What command rewrites commit history by moving commits onto a different base?</p>
    <p class="text-sm text-slate-500">Hint: It replays your commits on top of another branch, creating a linear history.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a1Answer}
        placeholder="Your answer..."
        disabled={a1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA1(); }}
      />
      <button
        onclick={checkA1}
        disabled={a1Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a1Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Rebase re-applies your commits on top of another branch, rewriting the history into a clean line.</p>
    {:else if a1Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. The command literally changes the "base" of your branch. Try again!</p>
    {/if}
  </div>

  <!-- Advanced Question 2 -->
  <div class="rounded-xl border-2 {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What Git command finds which commit introduced a bug using binary search?</p>
    <p class="text-sm text-slate-500">Hint: You mark commits as "good" or "bad" and Git narrows down the culprit.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a2Answer}
        placeholder="Your answer..."
        disabled={a2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA2(); }}
      />
      <button
        onclick={checkA2}
        disabled={a2Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a2Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Bisect performs a binary search through your commits to pinpoint exactly where a bug was introduced.</p>
    {:else if a2Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about cutting something in half repeatedly (binary search). Try again!</p>
    {/if}
  </div>

  <!-- Advanced Question 3 -->
  <div class="rounded-xl border-2 {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What stores Git's safety net of all ref changes, letting you recover lost commits?</p>
    <p class="text-sm text-slate-500">Hint: It's a "log" of all "ref" changes — put those two words together.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a3Answer}
        placeholder="Your answer..."
        disabled={a3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA3(); }}
      />
      <button
        onclick={checkA3}
        disabled={a3Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a3Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! The reflog records every time HEAD or a branch ref changes, making it possible to recover from almost any Git mistake.</p>
    {:else if a3Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. It's a combination of "ref" and "log." Try again!</p>
    {/if}
  </div>

  {#if advAllDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You have strong knowledge of advanced Git.</p>
    </div>
  {/if}

  {/if}
</div>
