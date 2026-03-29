<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: (score: number) => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Read the Error ===
  interface ErrorMatch {
    error: string;
    meaning: string;
    fix: string;
  }

  const errors: ErrorMatch[] = [
    {
      error: 'TypeError: Cannot read properties of undefined (reading \'name\')',
      meaning: 'You tried to access .name on something that is undefined.',
      fix: 'Check that the variable is defined before accessing its properties.',
    },
    {
      error: 'ReferenceError: myVar is not defined',
      meaning: 'You used a variable that doesn\'t exist in the current scope.',
      fix: 'Make sure the variable is declared (let/const/var) or check for typos.',
    },
    {
      error: 'SyntaxError: Unexpected token \'}\'',
      meaning: 'The code has a syntax mistake — a misplaced bracket, comma, or keyword.',
      fix: 'Check for missing opening brackets, extra commas, or unclosed strings.',
    },
    {
      error: 'GET /api/users 404 (Not Found)',
      meaning: 'The URL you requested doesn\'t exist on the server.',
      fix: 'Check the API endpoint URL for typos and verify the server is running.',
    },
    {
      error: 'TypeError: undefined is not a function',
      meaning: 'You tried to call something as a function, but it\'s undefined.',
      fix: 'Check that the function exists and is imported correctly.',
    },
  ];

  const matchOptions = [
    'Variable doesn\'t exist in scope',
    'Tried to access property on undefined',
    'Server endpoint not found',
    'Invalid syntax in the code',
    'Tried to call a non-function',
  ];

  // Correct mapping: error index -> matchOptions index
  const correctMapping = [1, 0, 3, 2, 4];

  let userMatches = $state<(number | null)[]>(Array(errors.length).fill(null));
  let dragging = $state<number | null>(null);
  let basicChecked = $state(false);
  let basicScore = $state(0);

  function selectMatch(errorIndex: number, matchIndex: number) {
    if (basicChecked) return;
    const newMatches = [...userMatches];
    // Remove this match if it's already assigned elsewhere
    for (let i = 0; i < newMatches.length; i++) {
      if (newMatches[i] === matchIndex) {
        newMatches[i] = null;
      }
    }
    newMatches[errorIndex] = matchIndex;
    userMatches = newMatches;
  }

  function checkBasic() {
    basicChecked = true;
    basicScore = userMatches.filter((m, i) => m === correctMapping[i]).length;
    oncomplete?.(basicScore);
  }

  function resetBasic() {
    userMatches = Array(errors.length).fill(null);
    basicChecked = false;
    basicScore = 0;
  }

  // Track which error is being assigned
  let activeError = $state<number | null>(null);

  function toggleErrorSelect(errorIndex: number) {
    if (basicChecked) return;
    activeError = activeError === errorIndex ? null : errorIndex;
  }

  function assignMatch(matchIndex: number) {
    if (basicChecked || activeError === null) return;
    selectMatch(activeError, matchIndex);
    activeError = null;
  }

  // === Advanced mode: Breakpoint Challenge ===
  interface BreakpointChallenge {
    title: string;
    code: string;
    lines: { lineNum: number; vars: string }[];
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }

  const challenges: BreakpointChallenge[] = [
    {
      title: 'Off-by-One Bug',
      code: `function getNames(users) {\n  let names = [];\n  for (let i = 0; i <= users.length; i++) {\n    names.push(users[i].name);\n  }\n  return names;\n}`,
      lines: [
        { lineNum: 3, vars: 'i=0, users[0]={name:"Alice"} -- OK' },
        { lineNum: 3, vars: 'i=1, users[1]={name:"Bob"} -- OK' },
        { lineNum: 3, vars: 'i=2, users[2]={name:"Carol"} -- OK' },
        { lineNum: 3, vars: 'i=3, users[3]=undefined -- CRASH!' },
      ],
      question: 'Where does the bug occur and why?',
      options: [
        'Line 2: names should be initialized with null',
        'Line 3: i <= users.length should be i < users.length',
        'Line 4: .name should be ["name"]',
        'Line 6: return should be inside the loop',
      ],
      correctIndex: 1,
      explanation: 'The loop uses <= instead of <. When i equals users.length (3), users[3] is undefined because arrays are 0-indexed. The fix is to use i < users.length.',
    },
    {
      title: 'Accumulator Bug',
      code: `function sumPrices(items) {\n  let total;\n  for (const item of items) {\n    total += item.price;\n  }\n  return total;\n}`,
      lines: [
        { lineNum: 2, vars: 'total = undefined' },
        { lineNum: 4, vars: 'item.price = 10, total = undefined + 10 = NaN' },
        { lineNum: 4, vars: 'item.price = 20, total = NaN + 20 = NaN' },
        { lineNum: 6, vars: 'return NaN' },
      ],
      question: 'Why does this function return NaN?',
      options: [
        'item.price is not a number',
        'The for...of loop doesn\'t work with arrays',
        'total is never initialized to 0, so it starts as undefined',
        'The return statement is in the wrong place',
      ],
      correctIndex: 2,
      explanation: 'The variable total is declared but not initialized, so it\'s undefined. undefined + 10 = NaN, and NaN propagates through all subsequent additions. The fix: let total = 0.',
    },
    {
      title: 'Scope Bug',
      code: `function makeCounters() {\n  const counters = [];\n  for (var i = 0; i < 3; i++) {\n    counters.push(() => i);\n  }\n  return counters;\n}\n// counters[0]() = ? counters[1]() = ? counters[2]() = ?`,
      lines: [
        { lineNum: 3, vars: 'i=0, push arrow function' },
        { lineNum: 3, vars: 'i=1, push arrow function' },
        { lineNum: 3, vars: 'i=2, push arrow function' },
        { lineNum: 3, vars: 'Loop ends. i=3 (var is function-scoped!)' },
      ],
      question: 'What do counters[0](), counters[1](), and counters[2]() all return?',
      options: [
        '0, 1, 2 — each captures its own value',
        '3, 3, 3 — all closures share the same var i',
        '1, 2, 3 — off by one',
        'undefined, undefined, undefined',
      ],
      correctIndex: 1,
      explanation: 'Because var is function-scoped (not block-scoped), all three arrow functions share the same i variable. After the loop, i is 3. The fix: use let instead of var, which creates a new i for each iteration.',
    },
  ];

  let advIndex = $state(0);
  let advSelected = $state<number | null>(null);
  let advResults = $state<('correct' | 'wrong' | null)[]>(Array(challenges.length).fill(null));
  let advShowExplanation = $state(false);
  let advDone = $derived(advIndex >= challenges.length);

  function checkAdvAnswer(optIndex: number) {
    if (advSelected !== null) return;
    advSelected = optIndex;
    const correct = optIndex === challenges[advIndex].correctIndex;
    advResults[advIndex] = correct ? 'correct' : 'wrong';
    advResults = [...advResults];
    advShowExplanation = true;
  }

  function nextChallenge() {
    advSelected = null;
    advShowExplanation = false;
    advIndex++;
  }

  $effect(() => {
    if (advDone) {
      const score = advResults.filter((r) => r === 'correct').length;
      oncomplete?.(score);
    }
  });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Read the Error</h2>
    <p class="text-slate-600">
      Match each error message to what it means. Click an error, then click the matching meaning.
    </p>
  </div>

  <div class="grid gap-6 lg:grid-cols-2">
    <!-- Error messages -->
    <div class="space-y-3">
      <p class="text-sm font-bold uppercase tracking-wider text-orange-600">Error Messages</p>
      {#each errors as err, i}
        <button
          onclick={() => toggleErrorSelect(i)}
          disabled={basicChecked}
          class="w-full rounded-xl border-2 p-3 text-left text-sm font-mono transition-all
            {activeError === i ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-300' : 'border-slate-200'}
            {basicChecked && userMatches[i] === correctMapping[i] ? 'border-green-400 bg-green-50' : ''}
            {basicChecked && userMatches[i] !== correctMapping[i] ? 'border-red-400 bg-red-50' : ''}
            {!basicChecked ? 'hover:border-orange-300 cursor-pointer' : 'cursor-default'}"
        >
          <span class="text-red-600">{err.error}</span>
          {#if userMatches[i] !== null}
            <div class="mt-2 rounded bg-orange-100 px-2 py-1 text-xs text-orange-700">
              Matched: {matchOptions[userMatches[i]!]}
            </div>
          {/if}
        </button>
      {/each}
    </div>

    <!-- Meanings -->
    <div class="space-y-3">
      <p class="text-sm font-bold uppercase tracking-wider text-orange-600">What It Means</p>
      {#each matchOptions as option, i}
        <button
          onclick={() => assignMatch(i)}
          disabled={basicChecked || activeError === null}
          class="w-full rounded-xl border-2 p-3 text-left text-sm transition-all
            {activeError !== null && !basicChecked ? 'hover:border-orange-400 hover:bg-orange-50 cursor-pointer' : 'cursor-default'}
            {userMatches.includes(i) ? 'opacity-50 border-slate-200' : 'border-slate-200'}
            {activeError === null && !basicChecked ? 'opacity-70' : ''}"
        >
          <span class="mr-2 font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span>
          {option}
        </button>
      {/each}
    </div>
  </div>

  {#if !basicChecked}
    <button
      onclick={checkBasic}
      disabled={userMatches.some(m => m === null)}
      class="rounded-lg bg-orange-600 px-6 py-2.5 font-semibold text-white transition-all hover:bg-orange-700 active:scale-95 disabled:opacity-40"
    >
      Check Matches
    </button>
  {:else}
    <div class="space-y-4">
      <div class="rounded-xl border-2 {basicScore === errors.length ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'} p-5">
        <p class="font-bold {basicScore === errors.length ? 'text-green-700' : 'text-yellow-700'}">
          You got {basicScore} out of {errors.length} correct!
        </p>
      </div>

      {#each errors as err, i}
        {#if userMatches[i] !== correctMapping[i]}
          <div class="rounded-xl border border-orange-200 bg-orange-50 p-3 text-sm">
            <p class="text-slate-700"><strong>{err.error}</strong></p>
            <p class="text-slate-600 mt-1">{err.meaning}</p>
            <p class="text-orange-700 mt-1"><strong>Fix:</strong> {err.fix}</p>
          </div>
        {/if}
      {/each}

      <button
        onclick={resetBasic}
        class="rounded-lg bg-orange-600 px-6 py-2.5 font-semibold text-white transition-all hover:bg-orange-700 active:scale-95"
      >
        Try Again
      </button>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Breakpoint Challenge</h2>
    <p class="text-slate-600">
      Trace the execution of buggy code. Look at the variable values at each step and identify where things go wrong.
    </p>
  </div>

  <div class="flex gap-2">
    {#each challenges as _, i}
      <div class="h-3 w-3 rounded-full transition-colors {advResults[i] === 'correct' ? 'bg-green-500' : advResults[i] === 'wrong' ? 'bg-red-500' : i === advIndex ? 'bg-orange-500' : 'bg-slate-200'}"></div>
    {/each}
  </div>

  {#if !advDone}
    {@const challenge = challenges[advIndex]}
    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">{challenge.title}</h3>

      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
        <p class="mb-2 text-sm font-semibold text-slate-500">The Code</p>
        <pre class="code-block"><code>{challenge.code}</code></pre>
      </div>

      <div class="space-y-2">
        <p class="text-sm font-semibold text-slate-500">Execution Trace (Breakpoint on Line {challenge.lines[0].lineNum})</p>
        {#each challenge.lines as line, i}
          <div class="flex items-start gap-3 rounded-lg border p-3 text-sm {line.vars.includes('CRASH') || line.vars.includes('NaN') || line.vars.includes('function-scoped') ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">
              {i + 1}
            </span>
            <span class="font-mono text-slate-700">{line.vars}</span>
          </div>
        {/each}
      </div>

      <div class="space-y-2">
        <p class="font-semibold text-slate-700">{challenge.question}</p>
        {#each challenge.options as option, i}
          <button
            onclick={() => checkAdvAnswer(i)}
            disabled={advSelected !== null}
            class="w-full rounded-xl border p-4 text-left text-sm transition-colors
              {advSelected === i && advResults[advIndex] === 'correct' ? 'border-green-500 bg-green-50 text-green-800' : ''}
              {advSelected === i && advResults[advIndex] === 'wrong' ? 'border-red-500 bg-red-50 text-red-800' : ''}
              {advSelected !== null && i === challenge.correctIndex && advResults[advIndex] === 'wrong' ? 'border-green-500 bg-green-50' : ''}
              {advSelected === null ? 'hover:border-orange-400 hover:bg-orange-50 cursor-pointer' : 'cursor-default'}
              {advSelected !== null && advSelected !== i && i !== challenge.correctIndex ? 'opacity-50' : ''}"
          >
            <span class="mr-2 font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span>{option}
          </button>
        {/each}
      </div>

      {#if advShowExplanation}
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <p class="text-sm text-slate-700"><strong>Explanation:</strong> {challenge.explanation}</p>
        </div>
        <button
          onclick={nextChallenge}
          class="rounded-lg bg-orange-600 px-6 py-2 font-semibold text-white transition-all hover:bg-orange-700 active:scale-95"
        >
          Next
        </button>
      {/if}
    </div>
  {:else}
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center">
      <p class="text-lg font-bold text-green-700">
        All done! You got {advResults.filter(r => r === 'correct').length} out of {challenges.length} correct.
      </p>
    </div>
  {/if}

  {/if}
</div>

<style>
  .code-block { background-color: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; color: #e2e8f0; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
