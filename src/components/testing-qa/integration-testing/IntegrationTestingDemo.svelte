<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Spot the Integration ===
  interface Snippet {
    code: string;
    correctAnswer: 'unit' | 'integration';
    userAnswer: 'unit' | 'integration' | null;
    explanation: string;
  }

  let snippets: Snippet[] = $state([
    {
      code: 'expect(add(2, 3)).toBe(5)',
      correctAnswer: 'unit',
      userAnswer: null,
      explanation: 'This tests a pure function in isolation with no external dependencies -- a classic unit test.',
    },
    {
      code: 'const res = await request(app).get("/users").expect(200)',
      correctAnswer: 'integration',
      userAnswer: null,
      explanation: 'This sends an HTTP request to a real route handler, which likely connects to middleware and a database -- integration test.',
    },
    {
      code: 'expect(capitalize("hello")).toBe("Hello")',
      correctAnswer: 'unit',
      userAnswer: null,
      explanation: 'Testing a single string function with no dependencies. Pure unit test.',
    },
    {
      code: 'await db.insert(user); const found = await db.findById(user.id); expect(found.name).toBe("Alice")',
      correctAnswer: 'integration',
      userAnswer: null,
      explanation: 'This test writes to a real database and reads back. It is testing the integration between your code and the database.',
    },
    {
      code: 'const spy = vi.fn(); notifyUser(spy, "Hello"); expect(spy).toHaveBeenCalledWith("Hello")',
      correctAnswer: 'unit',
      userAnswer: null,
      explanation: 'The dependency is mocked with vi.fn(). No real external system is involved -- this is a unit test.',
    },
  ]);

  let basicScore = $derived(snippets.filter(s => s.userAnswer === s.correctAnswer).length);
  let basicComplete = $derived(snippets.every(s => s.userAnswer !== null));

  function selectAnswer(index: number, answer: 'unit' | 'integration') {
    if (snippets[index].userAnswer === null) {
      snippets[index].userAnswer = answer;
    }
  }

  // === Advanced mode: Test an API Endpoint ===
  interface Assertion {
    label: string;
    placeholder: string;
    correctAnswers: string[];
    userAnswer: string;
    result: 'correct' | 'wrong' | null;
    hint: string;
    explanation: string;
  }

  let assertions: Assertion[] = $state([
    {
      label: 'Expected status code for a successful creation',
      placeholder: 'e.g., 200',
      correctAnswers: ['201'],
      userAnswer: '',
      result: null,
      hint: 'What HTTP status code means "Created"?',
      explanation: '201 Created is the standard response for a successful POST that creates a new resource.',
    },
    {
      label: 'Property to check in the response body for the created user\'s name',
      placeholder: 'e.g., res.body.???',
      correctAnswers: ['name', 'res.body.name', 'body.name'],
      userAnswer: '',
      result: null,
      hint: 'What field holds the user\'s name in the response JSON?',
      explanation: 'res.body.name contains the name of the newly created user returned by the API.',
    },
    {
      label: 'What side effect should you verify in the database?',
      placeholder: 'Describe what to check...',
      correctAnswers: ['user exists', 'user was created', 'user saved', 'record exists', 'inserted', 'user inserted', 'created', 'saved'],
      userAnswer: '',
      result: null,
      hint: 'After creating a user via the API, what should be true in the database?',
      explanation: 'You should verify the user record actually exists in the database, not just trust the API response.',
    },
  ]);

  let advSubmitted = $state(false);
  let advScore = $derived(assertions.filter(a => a.result === 'correct').length);

  function checkAssertions() {
    advSubmitted = true;
    for (const a of assertions) {
      const answer = a.userAnswer.trim().toLowerCase();
      a.result = a.correctAnswers.some(c => answer.includes(c.toLowerCase())) ? 'correct' : 'wrong';
    }
  }
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Spot the Integration</h2>
    <p class="text-slate-600">
      Look at each code snippet and decide: is it a <strong>unit test</strong> or an <strong>integration test</strong>? Click the correct label for each.
    </p>
  </div>

  <div class="space-y-4">
    {#each snippets as snippet, i}
      <div class="rounded-xl border-2 {snippet.userAnswer === null ? 'border-blue-200 bg-blue-50' : snippet.userAnswer === snippet.correctAnswer ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'} p-5 space-y-3">
        <div class="rounded-lg bg-slate-800 px-4 py-3 font-mono text-sm text-slate-200">
          {snippet.code}
        </div>
        <div class="flex gap-3">
          <button
            onclick={() => selectAnswer(i, 'unit')}
            disabled={snippet.userAnswer !== null}
            class="rounded-lg px-5 py-2 text-sm font-semibold border-2 transition-all
              {snippet.userAnswer === 'unit'
                ? (snippet.correctAnswer === 'unit' ? 'bg-green-600 text-white border-green-600' : 'bg-red-600 text-white border-red-600')
                : 'bg-white text-green-700 border-green-300 hover:bg-green-50'}
              disabled:cursor-default"
          >
            Unit Test
          </button>
          <button
            onclick={() => selectAnswer(i, 'integration')}
            disabled={snippet.userAnswer !== null}
            class="rounded-lg px-5 py-2 text-sm font-semibold border-2 transition-all
              {snippet.userAnswer === 'integration'
                ? (snippet.correctAnswer === 'integration' ? 'bg-green-600 text-white border-green-600' : 'bg-red-600 text-white border-red-600')
                : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50'}
              disabled:cursor-default"
          >
            Integration Test
          </button>
        </div>
        {#if snippet.userAnswer !== null}
          <p class="text-sm {snippet.userAnswer === snippet.correctAnswer ? 'text-green-700' : 'text-red-700'} font-semibold">
            {snippet.userAnswer === snippet.correctAnswer ? 'Correct!' : 'Not quite.'} {snippet.explanation}
          </p>
        {/if}
      </div>
    {/each}
  </div>

  {#if basicComplete}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">{basicScore} / {snippets.length} correct! {basicScore === snippets.length ? 'Perfect score!' : 'Review the explanations to strengthen your understanding.'}</p>
    </div>
  {/if}

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      I've identified the test types
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Test an API Endpoint</h2>
      <p class="text-slate-600">
        Below is an Express route that creates a user. Write the assertions you would use to test it.
      </p>
    </div>

    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 space-y-6">
      <!-- Route handler -->
      <div>
        <h4 class="mb-2 text-sm font-bold text-slate-700">Route Under Test</h4>
        <pre class="code-block"><code>{@html `<span class="var">router</span>.<span class="fn">post</span>(<span class="str">'/users'</span>, <span class="kw">async</span> (<span class="arg">req</span>, <span class="arg">res</span>) => {
  <span class="kw">const</span> { <span class="var">name</span>, <span class="var">email</span> } = <span class="arg">req</span>.<span class="var">body</span>;
  <span class="kw">const</span> <span class="var">user</span> = <span class="kw">await</span> <span class="var">db</span>.<span class="fn">insert</span>(<span class="str">'users'</span>, { <span class="var">name</span>, <span class="var">email</span> });
  <span class="var">res</span>.<span class="fn">status</span>(<span class="num">201</span>).<span class="fn">json</span>(<span class="var">user</span>);
});`}</code></pre>
      </div>

      <!-- Assertion inputs -->
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-700">Write Your Assertions</h4>
        {#each assertions as assertion, i}
          <div class="rounded-lg border-2 {assertion.result === 'correct' ? 'border-green-400 bg-green-100' : assertion.result === 'wrong' ? 'border-red-400 bg-red-100' : 'border-blue-200 bg-white'} p-4 space-y-2">
            <p class="text-sm font-semibold text-slate-700">{i + 1}. {assertion.label}</p>
            <p class="text-xs text-slate-500">Hint: {assertion.hint}</p>
            <input
              type="text"
              bind:value={assertion.userAnswer}
              placeholder={assertion.placeholder}
              disabled={advSubmitted}
              class="w-full rounded-lg border-2 border-blue-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
            />
            {#if advSubmitted}
              <p class="text-sm font-semibold {assertion.result === 'correct' ? 'text-green-700' : 'text-red-700'}">
                {assertion.result === 'correct' ? 'Correct!' : 'Not quite.'} {assertion.explanation}
              </p>
            {/if}
          </div>
        {/each}
      </div>

      {#if !advSubmitted}
        <button
          onclick={checkAssertions}
          class="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95"
        >
          Check Assertions
        </button>
      {:else}
        <div class="rounded-xl border-2 {advScore === assertions.length ? 'border-green-400 bg-green-100' : 'border-yellow-400 bg-yellow-100'} p-4 text-center">
          <p class="font-bold {advScore === assertions.length ? 'text-green-700' : 'text-yellow-700'}">
            {advScore} / {assertions.length} correct. {advScore === assertions.length ? 'Excellent! You know how to test API endpoints thoroughly.' : 'Review the explanations -- integration tests should verify status, response body, AND side effects.'}
          </p>
        </div>
      {/if}
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
      >
        I've tested the API endpoint
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw) { color: #c084fc; } .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; } .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; } .code-block :global(.fn) { color: #93c5fd; }
  .code-block :global(.op) { color: #94a3b8; } .code-block :global(.arg) { color: #fdba74; }
</style>
