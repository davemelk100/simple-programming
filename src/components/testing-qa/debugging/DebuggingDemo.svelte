<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  interface Bug {
    title: string;
    description: string;
    lines: { code: string; isBuggy: boolean; hint: string; inspectValue?: string }[];
    fixedLines: string[];
    explanation: string;
  }

  const basicBugs: Bug[] = [
    {
      title: 'Bug #1: Wrong Operator',
      description: 'This function should calculate the area of a rectangle, but it returns the wrong result. Click lines to inspect values, then click "Fix it" on the buggy line.',
      lines: [
        { code: 'function area(width, height) {', isBuggy: false, hint: 'Function declaration looks fine.', inspectValue: 'width = 5, height = 3' },
        { code: '  return width + height;', isBuggy: true, hint: 'Wait... area uses multiplication, not addition!', inspectValue: 'width + height = 8 (expected 15)' },
        { code: '}', isBuggy: false, hint: 'Closing bracket.' },
      ],
      fixedLines: ['function area(width, height) {', '  return width * height;', '}'],
      explanation: 'The bug was using + (addition) instead of * (multiplication). area(5, 3) returned 8 instead of 15.',
    },
    {
      title: 'Bug #2: Off-by-One',
      description: 'This function should return the last item of an array, but it crashes. Find the bug!',
      lines: [
        { code: 'function lastItem(arr) {', isBuggy: false, hint: 'Function signature is fine.', inspectValue: 'arr = ["a", "b", "c"]' },
        { code: '  return arr[arr.length];', isBuggy: true, hint: 'Arrays are 0-indexed... arr.length is 3 but the last index is 2!', inspectValue: 'arr.length = 3, arr[3] = undefined' },
        { code: '}', isBuggy: false, hint: 'Closing bracket.' },
      ],
      fixedLines: ['function lastItem(arr) {', '  return arr[arr.length - 1];', '}'],
      explanation: 'Classic off-by-one: arr.length gives 3, but the last valid index is 2. The fix is arr[arr.length - 1].',
    },
    {
      title: 'Bug #3: Typo',
      description: 'This function should greet a user by name, but it throws a ReferenceError. Find the typo!',
      lines: [
        { code: 'function greet(username) {', isBuggy: false, hint: 'Parameter is named "username".', inspectValue: 'username = "Alice"' },
        { code: '  const message = "Hello, " + usrname;', isBuggy: true, hint: '"usrname" is not the same as "username" — typo!', inspectValue: 'ReferenceError: usrname is not defined' },
        { code: '  return message;', isBuggy: false, hint: 'Return statement.', inspectValue: 'message = undefined (never reached)' },
        { code: '}', isBuggy: false, hint: 'Closing bracket.' },
      ],
      fixedLines: ['function greet(username) {', '  const message = "Hello, " + username;', '  return message;', '}'],
      explanation: 'The variable was misspelled as "usrname" instead of "username". Typos are one of the most common bugs!',
    },
  ];

  const advancedBugs: Bug[] = [
    {
      title: 'Bug #1: Closure Trap',
      description: 'This code creates 3 buttons that should alert 0, 1, 2 when clicked. But they all alert 3. Find why!',
      lines: [
        { code: 'for (var i = 0; i < 3; i++) {', isBuggy: true, hint: '"var" is function-scoped, not block-scoped! All closures share the same i.', inspectValue: 'var i — shared across all iterations' },
        { code: '  buttons[i].onclick = function() {', isBuggy: false, hint: 'Creates a closure over i.', inspectValue: 'closure captures reference to i, not value' },
        { code: '    alert(i);', isBuggy: false, hint: 'When clicked, reads the current value of i (which is 3).', inspectValue: 'i = 3 (loop already finished)' },
        { code: '  };', isBuggy: false, hint: 'End of handler.' },
        { code: '}', isBuggy: false, hint: 'After loop: i = 3.' },
      ],
      fixedLines: ['for (let i = 0; i < 3; i++) {', '  buttons[i].onclick = function() {', '    alert(i);', '  };', '}'],
      explanation: 'Using "var" means all closures share the same i variable. After the loop, i is 3. Changing to "let" creates a new i for each iteration.',
    },
    {
      title: 'Bug #2: Async Race Condition',
      description: 'This function fetches a user profile, but sometimes shows stale data when clicking quickly between users.',
      lines: [
        { code: 'let currentUser = null;', isBuggy: false, hint: 'State variable.', inspectValue: 'currentUser = null' },
        { code: 'async function showProfile(id) {', isBuggy: false, hint: 'Async function.', inspectValue: 'id = 5 (second click)' },
        { code: '  const data = await fetch("/api/user/" + id);', isBuggy: true, hint: 'If user clicks again before this resolves, a second request starts. The first response may arrive AFTER the second!', inspectValue: 'Request for id=3 still pending, request for id=5 starts' },
        { code: '  currentUser = await data.json();', isBuggy: false, hint: 'Whichever response arrives last wins — even if it was the earlier click.', inspectValue: 'Could be user 3 or user 5 — race!' },
        { code: '}', isBuggy: false, hint: 'End of function.' },
      ],
      fixedLines: ['let currentUser = null;', 'let controller = null;', 'async function showProfile(id) {', '  if (controller) controller.abort();', '  controller = new AbortController();', '  const data = await fetch("/api/user/" + id, { signal: controller.signal });', '  currentUser = await data.json();', '}'],
      explanation: 'Without canceling previous requests, two overlapping fetches race and the wrong data can win. The fix uses AbortController to cancel the stale request.',
    },
    {
      title: 'Bug #3: Reference vs Value',
      description: 'This function should create a settings object with defaults, but changes to the result also change the defaults!',
      lines: [
        { code: 'const defaults = { theme: "light", fontSize: 14 };', isBuggy: false, hint: 'Default settings object.', inspectValue: 'defaults = { theme: "light", fontSize: 14 }' },
        { code: 'function createSettings() {', isBuggy: false, hint: 'Function to create user settings.' },
        { code: '  const settings = defaults;', isBuggy: true, hint: 'This does NOT copy the object — it copies the REFERENCE. settings and defaults point to the same object!', inspectValue: 'settings === defaults // true (same reference!)' },
        { code: '  return settings;', isBuggy: false, hint: 'Returns the same reference.', inspectValue: 'Mutating settings also mutates defaults!' },
        { code: '}', isBuggy: false, hint: 'End of function.' },
      ],
      fixedLines: ['const defaults = { theme: "light", fontSize: 14 };', 'function createSettings() {', '  const settings = { ...defaults };', '  return settings;', '}'],
      explanation: 'Assigning an object creates a reference, not a copy. Using the spread operator { ...defaults } creates a shallow copy, so changes to settings won\'t affect defaults.',
    },
  ];

  let bugs = $derived(advanced ? advancedBugs : basicBugs);
  let currentBugIndex = $state(0);
  let inspectedLines = $state<Set<number>>(new Set());
  let foundBug = $state(false);
  let showFixed = $state(false);
  let bugsCompleted = $state(0);

  function inspectLine(lineIndex: number) {
    if (showFixed) return;
    const newSet = new Set(inspectedLines);
    newSet.add(lineIndex);
    inspectedLines = newSet;
  }

  function fixBug(lineIndex: number) {
    if (bugs[currentBugIndex].lines[lineIndex].isBuggy) {
      foundBug = true;
      showFixed = true;
    }
  }

  function nextBug() {
    bugsCompleted++;
    if (currentBugIndex < bugs.length - 1) {
      currentBugIndex++;
      inspectedLines = new Set();
      foundBug = false;
      showFixed = false;
    } else {
      oncomplete?.();
    }
  }

  // Reset when mode changes
  $effect(() => {
    // Access `advanced` to make this effect reactive to it
    const _ = advanced;
    currentBugIndex = 0;
    inspectedLines = new Set();
    foundBug = false;
    showFixed = false;
    bugsCompleted = 0;
  });
</script>

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">
      {#if !advanced}Try It: Bug Hunter{:else}Try It: Bug Hunter (Advanced){/if}
    </h2>
    <p class="text-slate-600">
      {#if !advanced}Find simple bugs in short code snippets. Click lines to inspect values, then fix the buggy line.
      {:else}Track down trickier bugs involving closures, async code, and references.{/if}
    </p>
  </div>

  <div class="flex gap-2">
    {#each bugs as _, i}
      <div class="h-3 w-3 rounded-full transition-colors {i < bugsCompleted ? 'bg-green-500' : i === currentBugIndex ? 'bg-orange-500' : 'bg-slate-200'}"></div>
    {/each}
  </div>

  {#if bugsCompleted < bugs.length}
    {@const bug = bugs[currentBugIndex]}
    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">{bug.title}</h3>
      <p class="text-sm text-slate-600">{bug.description}</p>

      {#if !showFixed}
        <div class="rounded-xl border-2 border-orange-200 bg-slate-900 p-5">
          <p class="mb-3 text-xs font-bold uppercase tracking-wider text-orange-400">Click a line to inspect it</p>
          {#each bug.lines as line, i}
            <div class="group flex items-start gap-2">
              <span class="w-5 shrink-0 text-right text-xs text-slate-500 leading-7">{i + 1}</span>
              <button
                onclick={() => inspectLine(i)}
                class="flex-1 rounded px-2 py-0.5 text-left font-mono text-sm leading-7 transition-colors
                  {inspectedLines.has(i) ? 'bg-slate-800' : 'hover:bg-slate-800'}"
              >
                <span class="text-slate-200">{line.code}</span>
              </button>
              {#if inspectedLines.has(i)}
                <button
                  onclick={() => fixBug(i)}
                  class="shrink-0 rounded bg-orange-600 px-2 py-0.5 text-xs font-bold text-white transition-all hover:bg-orange-700 active:scale-95"
                >
                  Fix it
                </button>
              {/if}
            </div>
            {#if inspectedLines.has(i)}
              <div class="ml-7 mb-1 rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs">
                {#if line.inspectValue}
                  <p class="font-mono text-orange-300">{line.inspectValue}</p>
                {/if}
                <p class="text-slate-400 mt-1">{line.hint}</p>
              </div>
            {/if}
          {/each}
        </div>
      {:else}
        <div class="rounded-xl border-2 border-green-300 bg-slate-900 p-5">
          <p class="mb-3 text-xs font-bold uppercase tracking-wider text-green-400">Fixed code</p>
          {#each bug.fixedLines as line, i}
            <div class="flex items-start gap-2">
              <span class="w-5 shrink-0 text-right text-xs text-slate-500 leading-7">{i + 1}</span>
              <span class="font-mono text-sm leading-7 text-green-300">{line}</span>
            </div>
          {/each}
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <p class="text-sm text-slate-700"><strong>Explanation:</strong> {bug.explanation}</p>
        </div>
        <button
          onclick={nextBug}
          class="rounded-lg bg-orange-600 px-6 py-2.5 font-semibold text-white transition-all hover:bg-orange-700 active:scale-95"
        >
          {currentBugIndex < bugs.length - 1 ? 'Next Bug' : 'Complete'}
        </button>
      {/if}
    </div>
  {:else}
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center">
      <p class="text-lg font-bold text-green-700">
        All bugs found and fixed! You squashed {bugs.length} out of {bugs.length} bugs.
      </p>
    </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a;
    color: #e2e8f0; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
