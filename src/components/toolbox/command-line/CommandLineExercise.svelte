<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: (score: number) => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode ===
  let b1 = $state('');
  let b1Result = $state<'correct' | 'wrong' | null>(null);
  let b2 = $state('');
  let b2Result = $state<'correct' | 'wrong' | null>(null);
  let b3 = $state('');
  let b3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(b1Result === 'correct' && b2Result === 'correct' && b3Result === 'correct');

  function checkB1() {
    b1Result = b1.trim().toLowerCase() === 'ls' ? 'correct' : 'wrong';
  }
  function checkB2() {
    b2Result = b2.trim().toLowerCase() === 'cd' ? 'correct' : 'wrong';
  }
  function checkB3() {
    b3Result = b3.trim().toLowerCase() === 'pwd' ? 'correct' : 'wrong';
  }

  function handleComplete() {
    const score = [b1Result, b2Result, b3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (allDone) handleComplete();
  });

  // === Advanced mode ===
  let a1 = $state('');
  let a1Result = $state<'correct' | 'wrong' | null>(null);
  let a2 = $state('');
  let a2Result = $state<'correct' | 'wrong' | null>(null);
  let a3 = $state('');
  let a3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(a1Result === 'correct' && a2Result === 'correct' && a3Result === 'correct');

  function checkA1() {
    a1Result = a1.trim() === '|' ? 'correct' : 'wrong';
  }
  function checkA2() {
    a2Result = a2.trim().toLowerCase() === 'grep' ? 'correct' : 'wrong';
  }
  function checkA3() {
    a3Result = a3.trim() === 'PATH' ? 'correct' : 'wrong';
  }

  function handleAdvComplete() {
    const score = [a1Result, a2Result, a3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (advAllDone) handleAdvComplete();
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Command Line Basics</h2>
    <p class="text-slate-600">Answer these questions about essential terminal commands.</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What command <strong>lists files</strong> in a directory?
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={b1}
        placeholder="Type the command..."
        disabled={b1Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
      />
      {#if b1Result !== 'correct'}
        <button onclick={checkB1} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if b1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-green-100 px-1 text-green-800">ls</code> stands for "list" and shows the contents of a directory.</p>
    {:else if b1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think of a short word that means "list". Hint: it's just two letters.</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What command <strong>changes your current directory</strong>?
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={b2}
        placeholder="Type the command..."
        disabled={b2Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
      />
      {#if b2Result !== 'correct'}
        <button onclick={checkB2} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if b2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-green-100 px-1 text-green-800">cd</code> stands for "change directory".</p>
    {:else if b2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. It stands for "change directory" — just the initials.</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What command <strong>prints the current directory path</strong>?
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={b3}
        placeholder="Type the command..."
        disabled={b3Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
      />
      {#if b3Result !== 'correct'}
        <button onclick={checkB3} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if b3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-green-100 px-1 text-green-800">pwd</code> stands for "print working directory".</p>
    {:else if b3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. It stands for "print working directory" — three letters.</p>
    {/if}
  </div>

  {#if allDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All challenges complete!</p>
    </div>
  {/if}
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Command Line (Advanced)</h2>
    <p class="text-slate-600">Test your knowledge of pipes, tools, and shell internals.</p>
  </div>

  <!-- Advanced Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What symbol <strong>pipes</strong> one command's output to another command's input?
    </p>
    <p class="mb-3 text-sm text-slate-500">Example: <code class="rounded bg-slate-100 px-1.5 py-0.5 text-green-700">cat file.txt <strong>?</strong> grep "error"</code></p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={a1}
        placeholder="Type the symbol..."
        disabled={a1Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
      />
      {#if a1Result !== 'correct'}
        <button onclick={checkA1} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if a1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The <code class="rounded bg-green-100 px-1 text-green-800">|</code> (pipe) symbol connects stdout of one command to stdin of the next.</p>
    {:else if a1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. It's a vertical bar character, often found above the backslash key on your keyboard.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What command <strong>searches file contents</strong> for a pattern?
    </p>
    <p class="mb-3 text-sm text-slate-500">Example: <code class="rounded bg-slate-100 px-1.5 py-0.5 text-green-700"><strong>???</strong> "error" log.txt</code></p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={a2}
        placeholder="Type the command..."
        disabled={a2Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
      />
      {#if a2Result !== 'correct'}
        <button onclick={checkA2} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if a2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-green-100 px-1 text-green-800">grep</code> searches for text patterns in files or piped input.</p>
    {:else if a2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. It stands for "Global Regular Expression Print" — a 4-letter command.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What environment variable tells the shell <strong>where to find programs</strong>?
    </p>
    <p class="mb-3 text-sm text-slate-500">Hint: You can see it with <code class="rounded bg-slate-100 px-1.5 py-0.5 text-green-700">echo $???</code></p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={a3}
        placeholder="Type the variable name..."
        disabled={a3Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
      />
      {#if a3Result !== 'correct'}
        <button onclick={checkA3} class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if a3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-green-100 px-1 text-green-800">PATH</code> is a colon-separated list of directories the shell searches for executables.</p>
    {:else if a3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. It's a 4-letter uppercase word that describes a route or way to get somewhere.</p>
    {/if}
  </div>

  {#if advAllDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All advanced challenges complete!</p>
    </div>
  {/if}
</div>
{/if}
