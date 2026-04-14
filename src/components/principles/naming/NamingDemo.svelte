<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  interface Props {
    oncomplete?: () => void;
  }
  let { oncomplete }: Props = $props();

  // === Basic mode: Name That Variable ===
  const scenarios = [
    {
      prompt: 'A variable storing a user\'s email address',
      good: 'emailAddress',
      alternatives: ['userEmail', 'email', 'userEmailAddress'],
      hint: 'Think about what it holds: an email that belongs to a user.',
    },
    {
      prompt: 'A function that sends a notification to a user',
      good: 'sendNotification',
      alternatives: ['notifyUser', 'sendUserNotification', 'deliverNotification'],
      hint: 'Functions do things. Start with a verb.',
    },
    {
      prompt: 'A variable that tracks whether a user is logged in',
      good: 'isLoggedIn',
      alternatives: ['isAuthenticated', 'loggedIn', 'isSignedIn', 'hasSession'],
      hint: 'This is a true/false value. Boolean names often start with "is" or "has".',
    },
    {
      prompt: 'A variable storing the number of items in a shopping cart',
      good: 'cartItemCount',
      alternatives: ['itemCount', 'numberOfCartItems', 'cartSize', 'totalItems'],
      hint: 'Describe what is being counted and where.',
    },
    {
      prompt: 'A function that checks if a password meets security requirements',
      good: 'validatePassword',
      alternatives: ['checkPassword', 'isPasswordValid', 'verifyPassword', 'validatePasswordStrength'],
      hint: 'This function checks or validates something. Use a verb.',
    },
  ];

  let currentScenario = $state(0);
  let userAnswer = $state('');
  let submitted = $state(false);
  let showHint = $state(false);

  function submitAnswer() {
    submitted = true;
  }

  function nextScenario() {
    if (currentScenario < scenarios.length - 1) {
      currentScenario++;
      userAnswer = '';
      submitted = false;
      showHint = false;
    }
  }

  let isLastScenario = $derived(currentScenario === scenarios.length - 1);

  // === Advanced mode: Refactor Bad Names ===
  interface RefactorSnippet {
    title: string;
    description: string;
    originalCode: string;
    variables: { bad: string; placeholder: string; good: string }[];
  }

  const snippets: RefactorSnippet[] = [
    {
      title: 'Snippet 1: Data Processing',
      description: 'This code fetches users and filters those over a certain age. Rename the variables to make it readable.',
      originalCode: 'let a = getData();\nlet b = a.filter(c => c.d > 10);',
      variables: [
        { bad: 'a', placeholder: 'rename a', good: 'users' },
        { bad: 'b', placeholder: 'rename b', good: 'filteredUsers' },
        { bad: 'c', placeholder: 'rename c', good: 'user' },
        { bad: 'd', placeholder: 'rename d', good: 'age' },
      ],
    },
    {
      title: 'Snippet 2: Price Calculation',
      description: 'This code calculates a discounted price with tax. Give each variable a clear name.',
      originalCode: 'let x = 49.99;\nlet y = x * 0.1;\nlet z = (x - y) * 1.08;',
      variables: [
        { bad: 'x', placeholder: 'rename x', good: 'originalPrice' },
        { bad: 'y', placeholder: 'rename y', good: 'discountAmount' },
        { bad: 'z', placeholder: 'rename z', good: 'finalPrice' },
      ],
    },
    {
      title: 'Snippet 3: User Authentication',
      description: 'This code checks login credentials and tracks attempts. Refactor every name.',
      originalCode: 'let f = (s1, s2) => {\n  let n = getN();\n  if (n > 3) return false;\n  return chk(s1) && cmp(s1, s2);\n};',
      variables: [
        { bad: 'f', placeholder: 'rename f', good: 'authenticate' },
        { bad: 's1', placeholder: 'rename s1', good: 'username' },
        { bad: 's2', placeholder: 'rename s2', good: 'password' },
        { bad: 'n', placeholder: 'rename n', good: 'loginAttempts' },
        { bad: 'getN', placeholder: 'rename getN', good: 'getLoginAttempts' },
        { bad: 'chk', placeholder: 'rename chk', good: 'userExists' },
        { bad: 'cmp', placeholder: 'rename cmp', good: 'verifyPassword' },
      ],
    },
  ];

  let currentSnippet = $state(0);
  let refactorInputs = $state<string[][]>(snippets.map((s) => s.variables.map(() => '')));
  let snippetRevealed = $state<boolean[]>(snippets.map(() => false));

  function revealSnippet(index: number) {
    snippetRevealed[index] = true;
  }

  function nextSnippet() {
    if (currentSnippet < snippets.length - 1) {
      currentSnippet++;
    }
  }

  let isLastSnippet = $derived(currentSnippet === snippets.length - 1);

  function buildRefactoredCode(snippetIndex: number): string {
    const snippet = snippets[snippetIndex];
    const inputs = refactorInputs[snippetIndex];
    let code = snippet.originalCode;
    // Replace in reverse order of name length to avoid partial replacements
    const pairs = snippet.variables
      .map((v, i) => ({ bad: v.bad, replacement: inputs[i]?.trim() || v.bad }))
      .sort((a, b) => b.bad.length - a.bad.length);
    for (const { bad, replacement } of pairs) {
      code = code.replaceAll(bad, replacement || bad);
    }
    return code;
  }
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Name That Variable</h2>
    <p class="text-slate-600">
      For each scenario, think of a good name and type it in. There is no single right answer — this is about practicing the skill of choosing clear, descriptive names. After you submit, you will see a suggested good name.
    </p>
  </div>

  <!-- Progress indicator -->
  <div class="flex items-center gap-2">
    {#each scenarios as _, i}
      <div
        class="h-2 flex-1 rounded-full transition-colors {i < currentScenario ? 'bg-green-400' : i === currentScenario ? 'bg-blue-500' : 'bg-slate-200'}"
      ></div>
    {/each}
    <span class="ml-2 text-sm font-medium text-slate-500">{currentScenario + 1} / {scenarios.length}</span>
  </div>

  <!-- Current scenario -->
  <div class="rounded-xl border border-slate-200 bg-white p-6">
    <p class="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Scenario {currentScenario + 1}</p>
    <p class="mb-4 text-lg font-medium text-slate-800">
      {scenarios[currentScenario].prompt}
    </p>

    <div class="flex flex-wrap items-center gap-3">
      <input
        type="text"
        bind:value={userAnswer}
        placeholder="Type your name suggestion..."
        disabled={submitted}
        class="w-64 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
        onkeydown={(e) => { if (e.key === 'Enter' && !submitted && userAnswer.trim()) submitAnswer(); }}
      />
      {#if !submitted}
        <button
          onclick={submitAnswer}
          disabled={!userAnswer.trim()}
          class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 disabled:opacity-40"
        >
          Submit
        </button>
        <button
          onclick={() => (showHint = true)}
          class="text-sm text-blue-500 underline hover:text-blue-700"
        >
          Hint
        </button>
      {/if}
    </div>

    {#if showHint && !submitted}
      <p class="mt-3 text-sm text-amber-600">{scenarios[currentScenario].hint}</p>
    {/if}

    {#if submitted}
      <div class="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
        <p class="text-sm text-slate-600">
          You wrote: <code class="rounded bg-slate-100 px-1 text-sm font-bold text-blue-700">{userAnswer}</code>
        </p>
        <p class="mt-1 text-sm text-slate-600">
          A good name could be: <code class="rounded bg-slate-100 px-1 text-sm font-bold text-green-700">{scenarios[currentScenario].good}</code>
        </p>
        <p class="mt-1 text-xs text-slate-500">
          Other acceptable names: {scenarios[currentScenario].alternatives.map(a => `"${a}"`).join(', ')}
        </p>
      </div>

      <div class="mt-4">
        {#if !isLastScenario}
          <button
            onclick={nextScenario}
            class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95"
          >
            Next Scenario
          </button>
        {:else}
          <button
            onclick={oncomplete}
            class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
          >
            Complete
          </button>
        {/if}
      </div>
    {/if}
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Refactor Bad Names</h2>
      <p class="text-slate-600">
        Below are code snippets with terrible variable names. For each variable, type a better name in the input field. Watch the refactored code update live on the right. When you are satisfied, reveal the suggested solution to compare.
      </p>
    </div>

    <!-- Progress indicator -->
    <div class="flex items-center gap-2">
      {#each snippets as _, i}
        <div
          class="h-2 flex-1 rounded-full transition-colors {i < currentSnippet ? 'bg-green-400' : i === currentSnippet ? 'bg-blue-500' : 'bg-slate-200'}"
        ></div>
      {/each}
      <span class="ml-2 text-sm font-medium text-slate-500">{currentSnippet + 1} / {snippets.length}</span>
    </div>

    <!-- Current snippet -->
    {#each [snippets[currentSnippet]] as snippet}
    <div class="rounded-xl border border-slate-200 bg-white p-6">
      <h3 class="mb-1 text-lg font-bold text-slate-800">{snippet.title}</h3>
      <p class="mb-4 text-sm text-slate-600">{snippet.description}</p>

      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Left: rename inputs -->
        <div>
          <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Rename each variable</p>
          <div class="space-y-2">
            {#each snippet.variables as variable, vi}
              <div class="flex items-center gap-3">
                <code class="w-24 shrink-0 rounded bg-red-50 px-2 py-1 text-center text-sm font-bold text-red-600">{variable.bad}</code>
                <span class="text-slate-400">&#8594;</span>
                <input
                  type="text"
                  bind:value={refactorInputs[currentSnippet][vi]}
                  placeholder={variable.placeholder}
                  disabled={snippetRevealed[currentSnippet]}
                  class="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
                />
              </div>
            {/each}
          </div>
        </div>

        <!-- Right: live preview -->
        <div>
          <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Live preview</p>
          <pre class="code-block"><code>{buildRefactoredCode(currentSnippet)}</code></pre>
        </div>
      </div>

      {#if !snippetRevealed[currentSnippet]}
        <button
          onclick={() => revealSnippet(currentSnippet)}
          class="mt-4 rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-600 active:scale-95"
        >
          Reveal Suggested Names
        </button>
      {:else}
        <div class="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
          <p class="mb-2 text-sm font-semibold text-green-700">Suggested names:</p>
          <div class="flex flex-wrap gap-3">
            {#each snippet.variables as variable}
              <div class="text-sm">
                <code class="rounded bg-red-100 px-1 text-red-600">{variable.bad}</code>
                <span class="text-slate-400 mx-1">&#8594;</span>
                <code class="rounded bg-green-100 px-1 text-green-700">{variable.good}</code>
              </div>
            {/each}
          </div>
        </div>

        <div class="mt-4">
          {#if !isLastSnippet}
            <button
              onclick={nextSnippet}
              class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95"
            >
              Next Snippet
            </button>
          {:else}
            <button
              onclick={oncomplete}
              class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
            >
              Complete
            </button>
          {/if}
        </div>
      {/if}
    </div>
    {/each}
  </div>

  {/if}
</div>

<style>
  .code-block {
    background-color: #0f172a;
    color: #e2e8f0;
    border: 1px solid #334155;
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    font-size: 0.875rem;
    line-height: 1.7;
    overflow-x: auto;
  }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
