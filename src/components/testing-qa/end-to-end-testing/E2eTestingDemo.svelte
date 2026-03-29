<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: (score: number) => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: User Flow Builder ===
  interface FlowStep {
    id: number;
    label: string;
    code: string;
  }

  const correctOrder: FlowStep[] = [
    { id: 1, label: 'Navigate to /login', code: "await page.goto('/login');" },
    { id: 2, label: 'Type email address', code: "await page.fill('[data-testid=\"email\"]', 'user@example.com');" },
    { id: 3, label: 'Type password', code: "await page.fill('[data-testid=\"password\"]', 'secret123');" },
    { id: 4, label: 'Click the submit button', code: "await page.click('[data-testid=\"submit\"]');" },
    { id: 5, label: 'Verify redirect to dashboard', code: "await expect(page).toHaveURL('/dashboard');" },
  ];

  // Shuffle for the user
  function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  let userOrder = $state<FlowStep[]>(shuffle(correctOrder));
  let selectedIndex = $state<number | null>(null);
  let basicChecked = $state(false);
  let basicCorrect = $state(false);

  function selectStep(index: number) {
    if (basicChecked) return;
    if (selectedIndex === null) {
      selectedIndex = index;
    } else {
      // Swap
      const newOrder = [...userOrder];
      [newOrder[selectedIndex], newOrder[index]] = [newOrder[index], newOrder[selectedIndex]];
      userOrder = newOrder;
      selectedIndex = null;
    }
  }

  function moveUp(index: number) {
    if (basicChecked || index === 0) return;
    const newOrder = [...userOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    userOrder = newOrder;
  }

  function moveDown(index: number) {
    if (basicChecked || index === userOrder.length - 1) return;
    const newOrder = [...userOrder];
    [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
    userOrder = newOrder;
  }

  function checkOrder() {
    basicChecked = true;
    basicCorrect = userOrder.every((step, i) => step.id === correctOrder[i].id);
    const score = basicCorrect ? correctOrder.length : userOrder.filter((step, i) => step.id === correctOrder[i].id).length;
    oncomplete?.(score);
  }

  function resetBasic() {
    userOrder = shuffle(correctOrder);
    selectedIndex = null;
    basicChecked = false;
    basicCorrect = false;
  }

  // === Advanced mode: Test Debugger ===
  interface TraceStep {
    stepNum: number;
    action: string;
    screenshot: string;
    passed: boolean;
  }

  interface DebugScenario {
    title: string;
    steps: TraceStep[];
    failedStep: number;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }

  const debugScenarios: DebugScenario[] = [
    {
      title: 'Login Flow Failure',
      steps: [
        { stepNum: 1, action: 'Navigate to /login', screenshot: 'Login page loads. Email and password fields visible. Submit button shows "Log In".', passed: true },
        { stepNum: 2, action: 'Fill email: user@test.com', screenshot: 'Email field now contains "user@test.com". Password field still empty.', passed: true },
        { stepNum: 3, action: 'Fill password: secret123', screenshot: 'Password field shows dots (masked). Both fields filled.', passed: true },
        { stepNum: 4, action: 'Click "Log In" button', screenshot: 'Red error banner appears: "Invalid credentials". Still on /login page.', passed: false },
        { stepNum: 5, action: 'Expect URL to be /dashboard', screenshot: 'URL is still /login. Assertion failed: expected "/dashboard", received "/login".', passed: false },
      ],
      failedStep: 4,
      question: 'Why did this test fail?',
      options: [
        'The email field selector was wrong',
        'The test credentials are invalid — the backend rejected them',
        'The submit button was not clickable',
        'The page took too long to load',
      ],
      correctIndex: 1,
      explanation: 'The screenshot at step 4 shows "Invalid credentials" — the backend rejected the login. The test needs valid test credentials, or the API should be mocked.',
    },
    {
      title: 'Search Feature Failure',
      steps: [
        { stepNum: 1, action: 'Navigate to /search', screenshot: 'Search page loads. Search input visible with placeholder "Search products...".', passed: true },
        { stepNum: 2, action: 'Fill search: "laptop"', screenshot: 'Search input shows "laptop". No results yet (need to submit).', passed: true },
        { stepNum: 3, action: 'Click search button', screenshot: 'Loading spinner appears briefly. Then page shows "0 results found" message.', passed: true },
        { stepNum: 4, action: 'Expect at least 1 result', screenshot: 'Page shows "0 results found for laptop". The results container is empty.', passed: false },
      ],
      failedStep: 4,
      question: 'What is the most likely cause?',
      options: [
        'The search input didn\'t accept the text',
        'The search button was never clicked',
        'The test database is empty or not seeded with test data',
        'The CSS is hiding the results',
      ],
      correctIndex: 2,
      explanation: 'The search executed successfully (we see "0 results found"), but returned no results. This strongly suggests the test database has no product data. E2E tests need seeded test data to work reliably.',
    },
  ];

  let advScenarioIndex = $state(0);
  let advSelected = $state<number | null>(null);
  let advResults = $state<('correct' | 'wrong' | null)[]>(Array(debugScenarios.length).fill(null));
  let advShowExplanation = $state(false);
  let advDone = $derived(advScenarioIndex >= debugScenarios.length);

  function checkAdvAnswer(optIndex: number) {
    if (advSelected !== null) return;
    advSelected = optIndex;
    const correct = optIndex === debugScenarios[advScenarioIndex].correctIndex;
    advResults[advScenarioIndex] = correct ? 'correct' : 'wrong';
    advResults = [...advResults];
    advShowExplanation = true;
  }

  function nextScenario() {
    advSelected = null;
    advShowExplanation = false;
    advScenarioIndex++;
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: User Flow Builder</h2>
    <p class="text-slate-600">
      Arrange these steps in the correct order to build a login E2E test. Click two steps to swap them, or use the arrows.
    </p>
  </div>

  <div class="space-y-2">
    {#each userOrder as step, i}
      <div class="flex items-center gap-2">
        <div class="flex flex-col gap-1">
          <button
            onclick={() => moveUp(i)}
            disabled={basicChecked || i === 0}
            class="rounded px-1.5 py-0.5 text-xs text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
            aria-label="Move up"
          >&#9650;</button>
          <button
            onclick={() => moveDown(i)}
            disabled={basicChecked || i === userOrder.length - 1}
            class="rounded px-1.5 py-0.5 text-xs text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
            aria-label="Move down"
          >&#9660;</button>
        </div>
        <button
          onclick={() => selectStep(i)}
          disabled={basicChecked}
          class="flex-1 rounded-xl border-2 p-4 text-left transition-all
            {selectedIndex === i ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-300' : 'border-slate-200 hover:border-purple-300'}
            {basicChecked && step.id === correctOrder[i].id ? 'border-green-400 bg-green-50' : ''}
            {basicChecked && step.id !== correctOrder[i].id ? 'border-red-400 bg-red-50' : ''}"
        >
          <div class="flex items-center gap-3">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">{i + 1}</span>
            <span class="font-medium text-slate-700">{step.label}</span>
          </div>
        </button>
      </div>
    {/each}
  </div>

  {#if !basicChecked}
    <button
      onclick={checkOrder}
      class="rounded-lg bg-purple-600 px-6 py-2.5 font-semibold text-white transition-all hover:bg-purple-700 active:scale-95"
    >
      Check Order
    </button>
  {:else}
    <div class="space-y-4">
      <div class="rounded-xl border-2 {basicCorrect ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'} p-5">
        <p class="font-bold {basicCorrect ? 'text-green-700' : 'text-yellow-700'}">
          {basicCorrect ? 'Perfect! You got the order exactly right.' : 'Not quite right. Here is the correct order and the Playwright code:'}
        </p>
      </div>

      <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
        <p class="mb-3 text-sm font-semibold text-slate-500">Generated Playwright Test</p>
        <pre class="code-block"><code>{@html `<span class="fn">test</span>(<span class="str">'user can log in'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
${correctOrder.map(s => `  <span class="cmt">// ${s.label}</span>\n  <span class="var">${s.code}</span>`).join('\n')}
});`}</code></pre>
      </div>

      <button
        onclick={resetBasic}
        class="rounded-lg bg-purple-600 px-6 py-2.5 font-semibold text-white transition-all hover:bg-purple-700 active:scale-95"
      >
        Try Again
      </button>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Test Debugger</h2>
    <p class="text-slate-600">
      Examine the test trace below. Each step shows what happened and what the page looked like. Find the failure and diagnose the root cause.
    </p>
  </div>

  <div class="flex gap-2">
    {#each debugScenarios as _, i}
      <div class="h-3 w-3 rounded-full transition-colors {advResults[i] === 'correct' ? 'bg-green-500' : advResults[i] === 'wrong' ? 'bg-red-500' : i === advScenarioIndex ? 'bg-purple-500' : 'bg-slate-200'}"></div>
    {/each}
  </div>

  {#if !advDone}
    {@const scenario = debugScenarios[advScenarioIndex]}
    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">{scenario.title}</h3>

      <div class="space-y-3">
        {#each scenario.steps as step}
          <div class="rounded-xl border-2 p-4 {step.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}">
            <div class="flex items-center gap-3 mb-2">
              <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold {step.passed ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}">{step.stepNum}</span>
              <span class="font-semibold text-slate-700">{step.action}</span>
              <span class="ml-auto text-sm font-bold {step.passed ? 'text-green-600' : 'text-red-600'}">{step.passed ? 'PASS' : 'FAIL'}</span>
            </div>
            <div class="ml-9 rounded-lg border bg-white p-3 text-sm text-slate-600 font-mono">
              {step.screenshot}
            </div>
          </div>
        {/each}
      </div>

      <div class="space-y-2">
        <p class="font-semibold text-slate-700">{scenario.question}</p>
        {#each scenario.options as option, i}
          <button
            onclick={() => checkAdvAnswer(i)}
            disabled={advSelected !== null}
            class="w-full rounded-xl border p-4 text-left text-sm transition-colors
              {advSelected === i && advResults[advScenarioIndex] === 'correct' ? 'border-green-500 bg-green-50 text-green-800' : ''}
              {advSelected === i && advResults[advScenarioIndex] === 'wrong' ? 'border-red-500 bg-red-50 text-red-800' : ''}
              {advSelected !== null && i === scenario.correctIndex && advResults[advScenarioIndex] === 'wrong' ? 'border-green-500 bg-green-50' : ''}
              {advSelected === null ? 'hover:border-purple-400 hover:bg-purple-50 cursor-pointer' : 'cursor-default'}
              {advSelected !== null && advSelected !== i && i !== scenario.correctIndex ? 'opacity-50' : ''}"
          >
            <span class="mr-2 font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span>{option}
          </button>
        {/each}
      </div>

      {#if advShowExplanation}
        <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
          <p class="text-sm text-slate-700"><strong>Explanation:</strong> {scenario.explanation}</p>
        </div>
        <button
          onclick={nextScenario}
          class="rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white transition-all hover:bg-purple-700 active:scale-95"
        >
          Next
        </button>
      {/if}
    </div>
  {:else}
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center">
      <p class="text-lg font-bold text-green-700">
        All done! You got {advResults.filter(r => r === 'correct').length} out of {debugScenarios.length} correct.
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
