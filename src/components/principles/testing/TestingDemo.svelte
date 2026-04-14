<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  interface Props {
    oncomplete?: (score: number) => void;
  }
  let { oncomplete }: Props = $props();

  // === Basic mode: Write an Assertion ===
  interface AssertionRound {
    funcCall: string;
    funcCode: string;
    expectedAnswer: string;
  }

  const basicRounds: AssertionRound[] = [
    { funcCall: 'add(2, 3)', funcCode: 'function add(a, b) { return a + b; }', expectedAnswer: '5' },
    { funcCall: 'isEven(4)', funcCode: 'function isEven(n) { return n % 2 === 0; }', expectedAnswer: 'true' },
    { funcCall: 'reverse("hello")', funcCode: 'function reverse(s) { return s.split("").reverse().join(""); }', expectedAnswer: 'olleh' },
    { funcCall: 'multiply(3, 4)', funcCode: 'function multiply(a, b) { return a * b; }', expectedAnswer: '12' },
    { funcCall: 'greeting("Alice")', funcCode: 'function greeting(name) { return "Hello, " + name + "!"; }', expectedAnswer: 'Hello, Alice!' },
  ];

  let basicIndex = $state(0);
  let basicInput = $state('');
  let basicResults = $state<('correct' | 'wrong' | null)[]>(Array(basicRounds.length).fill(null));
  let basicDone = $derived(basicIndex >= basicRounds.length);

  function checkBasic() {
    const round = basicRounds[basicIndex];
    const answer = basicInput.trim();
    const correct = answer === round.expectedAnswer;
    basicResults[basicIndex] = correct ? 'correct' : 'wrong';
    basicResults = [...basicResults];
    setTimeout(() => {
      basicInput = '';
      basicIndex++;
    }, 800);
  }

  $effect(() => {
    if (basicDone) {
      const score = basicResults.filter((r) => r === 'correct').length;
      oncomplete?.(score);
    }
  });

  // === Advanced mode: Find the Bug ===
  interface BugRound {
    title: string;
    funcCode: string;
    testCode: string;
    explanation: string;
    options: string[];
    correctIndex: number;
  }

  const advRounds: BugRound[] = [
    {
      title: 'Bug #1: Off by one',
      funcCode: `function getLastItem(arr) {\n  return arr[arr.length];\n}`,
      testCode: `test("returns last element", () => {\n  expect(getLastItem([10, 20, 30])).toBe(30);\n  // ❌ Received: undefined\n});`,
      explanation: 'Array indices start at 0, so the last item is at arr.length - 1, not arr.length.',
      options: [
        'Change arr.length to arr.length - 1',
        'Change arr.length to arr.length + 1',
        'Change return to return arr[0]',
        'The test is wrong, not the function',
      ],
      correctIndex: 0,
    },
    {
      title: 'Bug #2: Wrong comparison',
      funcCode: `function isAdult(age) {\n  return age > 18;\n}`,
      testCode: `test("18-year-old is an adult", () => {\n  expect(isAdult(18)).toBe(true);\n  // ❌ Received: false\n});`,
      explanation: 'An 18-year-old is an adult. The comparison should be >= 18, not > 18.',
      options: [
        'Change the test to expect false',
        'Change > 18 to >= 18',
        'Change > 18 to > 17',
        'Both B and C would fix it',
      ],
      correctIndex: 3,
    },
    {
      title: 'Bug #3: String concatenation',
      funcCode: `function formatPrice(dollars, cents) {\n  return "$" + dollars + "." + cents;\n}`,
      testCode: `test("formats single-digit cents with zero", () => {\n  expect(formatPrice(5, 3)).toBe("$5.03");\n  // ❌ Received: "$5.3"\n});`,
      explanation: 'Single-digit cents need a leading zero. The function should pad cents to 2 digits.',
      options: [
        'Change the test to expect "$5.3"',
        'Pad cents with String(cents).padStart(2, "0")',
        'Change cents to cents * 10',
        'Add a space before cents',
      ],
      correctIndex: 1,
    },
  ];

  let advIndex = $state(0);
  let advSelected = $state<number | null>(null);
  let advResults = $state<('correct' | 'wrong' | null)[]>(Array(advRounds.length).fill(null));
  let advShowExplanation = $state(false);
  let advDone = $derived(advIndex >= advRounds.length);

  function checkAdv(optIndex: number) {
    advSelected = optIndex;
    const correct = optIndex === advRounds[advIndex].correctIndex;
    advResults[advIndex] = correct ? 'correct' : 'wrong';
    advResults = [...advResults];
    advShowExplanation = true;
  }

  function nextAdvRound() {
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Write an Assertion</h2>
    <p class="text-slate-600">
      Look at each function and its call. Type what value you expect it to return.
    </p>
  </div>

  <!-- Progress dots -->
  <div class="flex gap-2">
    {#each basicRounds as _, i}
      <div class="h-3 w-3 rounded-full transition-colors {basicResults[i] === 'correct' ? 'bg-green-500' : basicResults[i] === 'wrong' ? 'bg-red-500' : i === basicIndex ? 'bg-purple-500' : 'bg-slate-200'}"></div>
    {/each}
  </div>

  {#if !basicDone}
    {@const round = basicRounds[basicIndex]}
    <div class="space-y-4">
      <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
        <p class="mb-2 text-sm font-semibold text-slate-500">Function</p>
        <pre class="code-block"><code>{round.funcCode}</code></pre>
      </div>

      <div class="rounded-xl border p-5">
        <p class="mb-3 text-slate-700">
          What does <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">{round.funcCall}</code> return?
        </p>
        <div class="flex items-center gap-3">
          <code class="text-sm text-slate-500">expect({round.funcCall}).toBe(</code>
          <input
            type="text"
            bind:value={basicInput}
            onkeydown={(e) => { if (e.key === 'Enter' && basicInput.trim()) checkBasic(); }}
            class="w-36 rounded-lg border-2 border-purple-300 bg-white px-3 py-2 text-center font-mono text-sm focus:border-purple-500 focus:outline-none"
            placeholder="your answer"
          />
          <code class="text-sm text-slate-500">)</code>
          <button
            onclick={checkBasic}
            disabled={!basicInput.trim()}
            class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-700 active:scale-95 disabled:opacity-40"
          >
            Check
          </button>
        </div>
        {#if basicResults[basicIndex] === 'correct'}
          <p class="mt-3 font-semibold text-green-600">Correct!</p>
        {:else if basicResults[basicIndex] === 'wrong'}
          <p class="mt-3 font-semibold text-red-600">Not quite. The answer was <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">{round.expectedAnswer}</code></p>
        {/if}
      </div>
    </div>
  {:else}
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center">
      <p class="text-lg font-bold text-green-700">
        All done! You got {basicResults.filter(r => r === 'correct').length} out of {basicRounds.length} correct.
      </p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Find the Bug</h2>
    <p class="text-slate-600">
      Each example has a function and a failing test. Read the test output, then pick which fix addresses the bug.
    </p>
  </div>

  <!-- Progress dots -->
  <div class="flex gap-2">
    {#each advRounds as _, i}
      <div class="h-3 w-3 rounded-full transition-colors {advResults[i] === 'correct' ? 'bg-green-500' : advResults[i] === 'wrong' ? 'bg-red-500' : i === advIndex ? 'bg-purple-500' : 'bg-slate-200'}"></div>
    {/each}
  </div>

  {#if !advDone}
    {@const round = advRounds[advIndex]}
    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">{round.title}</h3>

      <div class="grid gap-4 lg:grid-cols-2">
        <div>
          <p class="mb-2 text-sm font-semibold text-slate-500">The Function</p>
          <pre class="code-block"><code>{round.funcCode}</code></pre>
        </div>
        <div>
          <p class="mb-2 text-sm font-semibold text-red-500">Failing Test</p>
          <pre class="code-block"><code>{round.testCode}</code></pre>
        </div>
      </div>

      <div class="space-y-2">
        <p class="font-semibold text-slate-700">What's the fix?</p>
        {#each round.options as option, i}
          <button
            onclick={() => { if (advSelected === null) checkAdv(i); }}
            disabled={advSelected !== null}
            class="w-full rounded-xl border p-4 text-left text-sm transition-colors
              {advSelected === i && advResults[advIndex] === 'correct' ? 'border-green-500 bg-green-50 text-green-800' : ''}
              {advSelected === i && advResults[advIndex] === 'wrong' ? 'border-red-500 bg-red-50 text-red-800' : ''}
              {advSelected !== null && i === round.correctIndex && advResults[advIndex] === 'wrong' ? 'border-green-500 bg-green-50' : ''}
              {advSelected === null ? 'hover:border-purple-400 hover:bg-purple-50 cursor-pointer' : 'cursor-default'}
              {advSelected !== null && advSelected !== i && i !== round.correctIndex ? 'opacity-50' : ''}"
          >
            <span class="mr-2 font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span>{option}
          </button>
        {/each}
      </div>

      {#if advShowExplanation}
        <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
          <p class="text-sm text-slate-700"><strong>Explanation:</strong> {round.explanation}</p>
        </div>
        <button
          onclick={nextAdvRound}
          class="rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white transition-all hover:bg-purple-700 active:scale-95"
        >
          Next
        </button>
      {/if}
    </div>
  {:else}
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center">
      <p class="text-lg font-bold text-green-700">
        All done! You got {advResults.filter(r => r === 'correct').length} out of {advRounds.length} correct.
      </p>
    </div>
  {/if}

  {/if}
</div>

<style>
  .code-block { background-color: #0f172a;
    color: #e2e8f0; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; color: #e2e8f0; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
