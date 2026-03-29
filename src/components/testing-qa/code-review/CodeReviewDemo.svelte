<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: (score: number) => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Review This Code ===
  interface CodeSnippet {
    title: string;
    code: string;
    issues: { line: number; text: string; feedbackOptions: string[]; correctIndex: number; explanation: string }[];
  }

  const snippets: CodeSnippet[] = [
    {
      title: 'Snippet 1: Bad Naming',
      code: `function p(a, b) {
  const x = a * b;
  const y = x * 0.08;
  return x + y;
}`,
      issues: [
        {
          line: 1,
          text: 'function p(a, b)',
          feedbackOptions: [
            'The function name "p" and parameters "a", "b" are unclear — rename to something like calculateTotalWithTax(price, quantity)',
            'This function should be async',
            'The parameters need type annotations',
            'This function has too many lines',
          ],
          correctIndex: 0,
          explanation: 'Names like "p", "a", "b", "x", "y" tell the reader nothing. Descriptive names like calculateTotalWithTax(price, quantity) make the code self-documenting.',
        },
      ],
    },
    {
      title: 'Snippet 2: Missing Error Handling',
      code: `async function getUser(id) {
  const response = await fetch("/api/users/" + id);
  const data = await response.json();
  return data.name;
}`,
      issues: [
        {
          line: 2,
          text: 'const response = await fetch(...)',
          feedbackOptions: [
            'Should use XMLHttpRequest instead of fetch',
            'The URL should use template literals for style',
            'No check for failed responses — if the request fails or returns 404, response.json() or data.name will throw an unhelpful error',
            'The function should be synchronous',
          ],
          correctIndex: 2,
          explanation: 'Network requests can fail for many reasons. Without checking response.ok or wrapping in try/catch, this function will crash with a confusing error when the API is down or the user ID does not exist.',
        },
      ],
    },
    {
      title: 'Snippet 3: Duplicated Logic',
      code: `function formatUserCard(user) {
  let html = "<div class='card'>";
  html += "<h2>" + user.firstName + " " + user.lastName + "</h2>";
  html += "<p>" + user.firstName + " " + user.lastName + " joined on " + user.joinDate + "</p>";
  html += "<footer>Profile of " + user.firstName + " " + user.lastName + "</footer>";
  html += "</div>";
  return html;
}`,
      issues: [
        {
          line: 3,
          text: 'user.firstName + " " + user.lastName (repeated 3 times)',
          feedbackOptions: [
            'Should use innerHTML instead of string concatenation',
            'The function is too long and should be split into three functions',
            'The full name is computed 3 separate times — extract to a variable like const fullName = user.firstName + " " + user.lastName',
            'This code needs more comments',
          ],
          correctIndex: 2,
          explanation: 'When the same expression is repeated, extract it into a variable. If the name format ever changes (e.g., adding a middle name), you only update one place instead of three. This follows the DRY principle.',
        },
      ],
    },
  ];

  let currentSnippet = $state(0);
  let selectedOption = $state<number | null>(null);
  let showExplanation = $state(false);
  let results = $state<('correct' | 'wrong')[]>([]);
  let basicDone = $derived(results.length === snippets.length);

  function selectOption(index: number) {
    if (selectedOption !== null) return;
    selectedOption = index;
    const issue = snippets[currentSnippet].issues[0];
    results = [...results, index === issue.correctIndex ? 'correct' : 'wrong'];
    showExplanation = true;
  }

  function nextSnippet() {
    selectedOption = null;
    showExplanation = false;
    currentSnippet++;
  }

  $effect(() => {
    if (basicDone) {
      const score = results.filter((r) => r === 'correct').length;
      oncomplete?.(score);
    }
  });

  // === Advanced mode: Write Review Feedback ===
  interface DiffSection {
    title: string;
    filename: string;
    diff: string;
    highlightedArea: string;
    expertFeedback: string;
    feedbackKeywords: string[];
  }

  const diffSections: DiffSection[] = [
    {
      title: 'Change 1: Authentication handler',
      filename: 'src/auth.ts',
      diff: `  async function login(email, password) {
+   const user = await db.findByEmail(email);
+   if (user.password === password) {
+     return { token: generateToken(user) };
+   }
+   return null;
  }`,
      highlightedArea: 'if (user.password === password)',
      expertFeedback: 'Critical security issue: Passwords should never be compared as plain text. Use bcrypt.compare() or similar to compare against a hashed password. Also, if db.findByEmail returns null (user not found), accessing user.password will throw. Add a null check first.',
      feedbackKeywords: ['plain text', 'plaintext', 'hash', 'bcrypt', 'security', 'null', 'not found', 'undefined'],
    },
    {
      title: 'Change 2: API endpoint',
      filename: 'src/routes/items.ts',
      diff: `  app.get("/api/items", async (req, res) => {
+   const items = await db.query("SELECT * FROM items WHERE category = '" + req.query.category + "'");
+   res.json(items);
  });`,
      highlightedArea: `"SELECT * FROM items WHERE category = '" + req.query.category + "'"`,
      expertFeedback: 'SQL injection vulnerability: User input (req.query.category) is concatenated directly into the SQL query. An attacker could pass malicious SQL. Use parameterized queries instead: db.query("SELECT * FROM items WHERE category = $1", [req.query.category]).',
      feedbackKeywords: ['injection', 'sql injection', 'parameterized', 'prepared', 'sanitize', 'escape', 'security', 'user input'],
    },
    {
      title: 'Change 3: Utility function',
      filename: 'src/utils.ts',
      diff: `+ function processData(data) {
+   const result = [];
+   for (let i = 0; i < data.length; i++) {
+     if (data[i].active === true) {
+       result.push({
+         id: data[i].id,
+         name: data[i].name.toUpperCase(),
+         score: data[i].score * 100,
+       });
+     }
+   }
+   return result;
+ }`,
      highlightedArea: 'The entire function',
      expertFeedback: 'This imperative loop can be simplified using filter() and map(), which are more readable and declarative. Also, no type annotations or documentation. What does "processData" mean — consider a more descriptive name like getActiveUsersFormatted(). Finally, data[i].name.toUpperCase() will throw if name is null or undefined.',
      feedbackKeywords: ['filter', 'map', 'name', 'rename', 'descriptive', 'null', 'undefined', 'readable', 'declarative', 'simplify'],
    },
  ];

  let advIndex = $state(0);
  let advFeedback = $state('');
  let advSubmitted = $state(false);
  let advMatchedKeywords = $state<string[]>([]);
  let advResults = $state<number[]>([]);
  let advDone = $derived(advResults.length === diffSections.length);

  function submitAdvFeedback() {
    const section = diffSections[advIndex];
    const lowerFeedback = advFeedback.toLowerCase();
    const matched = section.feedbackKeywords.filter((kw) => lowerFeedback.includes(kw.toLowerCase()));
    advMatchedKeywords = matched;
    advResults = [...advResults, matched.length];
    advSubmitted = true;
  }

  function nextAdvSection() {
    advFeedback = '';
    advSubmitted = false;
    advMatchedKeywords = [];
    advIndex++;
  }

  $effect(() => {
    if (advDone) {
      const totalKeywords = diffSections.reduce((sum, s) => sum + s.feedbackKeywords.length, 0);
      const totalMatched = advResults.reduce((sum, n) => sum + n, 0);
      const score = Math.round((totalMatched / totalKeywords) * diffSections.length);
      oncomplete?.(score);
    }
  });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Review This Code</h2>
    <p class="text-slate-600">
      Each snippet has a problem. Read the code, identify the issue, and pick the best review feedback.
    </p>
  </div>

  <!-- Progress dots -->
  <div class="flex gap-2">
    {#each snippets as _, i}
      <div class="h-3 w-3 rounded-full transition-colors {i < results.length ? (results[i] === 'correct' ? 'bg-green-500' : 'bg-red-500') : i === currentSnippet ? 'bg-indigo-500' : 'bg-slate-200'}"></div>
    {/each}
  </div>

  {#if !basicDone}
    {@const snippet = snippets[currentSnippet]}
    {@const issue = snippet.issues[0]}
    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">{snippet.title}</h3>

      <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
        <pre class="code-block"><code>{snippet.code}</code></pre>
      </div>

      <div class="space-y-2">
        <p class="font-semibold text-slate-700">What feedback would you give?</p>
        {#each issue.feedbackOptions as option, i}
          <button
            onclick={() => selectOption(i)}
            disabled={selectedOption !== null}
            class="w-full rounded-xl border p-4 text-left text-sm transition-colors
              {selectedOption === i && i === issue.correctIndex ? 'border-green-500 bg-green-50 text-green-800' : ''}
              {selectedOption === i && i !== issue.correctIndex ? 'border-red-500 bg-red-50 text-red-800' : ''}
              {selectedOption !== null && i === issue.correctIndex && selectedOption !== i ? 'border-green-500 bg-green-50' : ''}
              {selectedOption === null ? 'hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer' : 'cursor-default'}
              {selectedOption !== null && selectedOption !== i && i !== issue.correctIndex ? 'opacity-50' : ''}"
          >
            <span class="mr-2 font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span>{option}
          </button>
        {/each}
      </div>

      {#if showExplanation}
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <p class="mb-2 text-sm font-semibold text-indigo-700">Model Review Comment:</p>
          <p class="text-sm text-slate-700">{issue.explanation}</p>
        </div>
        <button
          onclick={nextSnippet}
          class="rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white transition-all hover:bg-indigo-700 active:scale-95"
        >
          Next
        </button>
      {/if}
    </div>
  {:else}
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center">
      <p class="text-lg font-bold text-green-700">
        All done! You got {results.filter(r => r === 'correct').length} out of {snippets.length} correct.
      </p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Write Review Feedback</h2>
    <p class="text-slate-600">
      Read each PR diff and write your own review comment for the highlighted section. Then compare your feedback against an expert review.
    </p>
  </div>

  <!-- Progress dots -->
  <div class="flex gap-2">
    {#each diffSections as _, i}
      <div class="h-3 w-3 rounded-full transition-colors {i < advResults.length ? (advResults[i] > 0 ? 'bg-green-500' : 'bg-red-500') : i === advIndex ? 'bg-indigo-500' : 'bg-slate-200'}"></div>
    {/each}
  </div>

  {#if !advDone}
    {@const section = diffSections[advIndex]}
    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">{section.title}</h3>
      <p class="text-xs font-mono text-slate-500">{section.filename}</p>

      <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
        <pre class="code-block diff-block"><code>{section.diff}</code></pre>
      </div>

      <div class="rounded-xl border border-yellow-300 bg-yellow-50 p-3">
        <p class="text-sm text-yellow-800"><strong>Review this area:</strong> <code class="rounded bg-yellow-100 px-1 text-xs">{section.highlightedArea}</code></p>
      </div>

      <div>
        <label for="adv-feedback" class="mb-2 block font-semibold text-slate-700">Your review comment:</label>
        <textarea
          id="adv-feedback"
          bind:value={advFeedback}
          disabled={advSubmitted}
          rows={4}
          class="w-full rounded-xl border-2 border-indigo-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none disabled:opacity-60"
          placeholder="Write your review feedback here..."
        ></textarea>
      </div>

      {#if !advSubmitted}
        <button
          onclick={submitAdvFeedback}
          disabled={!advFeedback.trim()}
          class="rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-40"
        >
          Submit Review
        </button>
      {:else}
        <div class="space-y-3">
          <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
            <p class="mb-2 text-sm font-semibold text-indigo-700">Expert Review:</p>
            <p class="text-sm text-slate-700">{section.expertFeedback}</p>
          </div>

          <div class="rounded-xl border p-4 {advMatchedKeywords.length > 0 ? 'border-green-300 bg-green-50' : 'border-yellow-300 bg-yellow-50'}">
            <p class="text-sm text-slate-700">
              {#if advMatchedKeywords.length > 0}
                <strong class="text-green-700">Nice!</strong> Your feedback touched on: {advMatchedKeywords.join(', ')}.
              {:else}
                <strong class="text-yellow-700">Keep practicing!</strong> Compare your feedback with the expert review above. Key points to look for include: {section.feedbackKeywords.slice(0, 3).join(', ')}.
              {/if}
            </p>
          </div>

          {#if advIndex < diffSections.length - 1}
            <button
              onclick={nextAdvSection}
              class="rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white transition-all hover:bg-indigo-700 active:scale-95"
            >
              Next Diff
            </button>
          {/if}
        </div>
      {/if}
    </div>
  {:else}
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center">
      <p class="text-lg font-bold text-green-700">
        Review complete! You identified key issues in {advResults.filter(r => r > 0).length} out of {diffSections.length} diffs.
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
  .diff-block { white-space: pre; }
</style>
