<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  interface ReviewIssue {
    lineIndex: number;
    label: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }

  interface CodeReview {
    title: string;
    filename: string;
    lines: string[];
    issues: ReviewIssue[];
  }

  const basicReviews: CodeReview[] = [
    {
      title: 'User Registration',
      filename: 'src/auth/register.ts',
      lines: [
        'function register(e, p) {',
        '  const user = createUser(e, p);',
        '  db.save(user);',
        '  sendEmail(e, "Welcome!");',
        '  return user;',
        '}',
      ],
      issues: [
        {
          lineIndex: 0,
          label: 'function register(e, p)',
          options: [
            'Parameter names "e" and "p" are unclear — should be "email" and "password"',
            'The function should be a class method',
            'The function needs a return type of void',
            'The function has too many lines',
          ],
          correctIndex: 0,
          explanation: 'Single-letter parameter names like "e" and "p" tell the reader nothing. Using "email" and "password" makes the code self-documenting.',
        },
        {
          lineIndex: 2,
          label: 'db.save(user)',
          options: [
            'Should use localStorage instead of a database',
            'No error handling — if the database save fails, the function continues and sends an email for a user that was not actually saved',
            'The save call should be synchronous',
            'The user object should be frozen before saving',
          ],
          correctIndex: 1,
          explanation: 'Database operations can fail for many reasons (connection issues, constraint violations). Without error handling, the code sends a welcome email even if the user was never saved.',
        },
        {
          lineIndex: 3,
          label: 'sendEmail(e, "Welcome!")',
          options: [
            'The email subject should be longer',
            'Should use SMS instead of email',
            'The hardcoded string "Welcome!" should be a constant or template, and the function uses the unclear parameter name "e" instead of "email"',
            'The function call has the wrong number of arguments',
          ],
          correctIndex: 2,
          explanation: 'Hardcoded strings scattered through code are hard to maintain. Extract them to constants or templates. Also, using the unclear parameter name "e" here makes it easy to confuse with an error object.',
        },
      ],
    },
  ];

  const advancedReviews: CodeReview[] = [
    {
      title: 'Data Processing Pipeline',
      filename: 'src/pipeline/process.ts',
      lines: [
        'async function processOrders(orders: any[]) {',
        '  const results = [];',
        '  for (const order of orders) {',
        '    const price = order.items.reduce((s, i) => s + i.price, 0);',
        '    const user = await fetchUser(order.userId);',
        '    await sendNotification(user.email, price);',
        '    results.push({ orderId: order.id, total: price });',
        '  }',
        '  return results;',
        '}',
      ],
      issues: [
        {
          lineIndex: 0,
          label: 'orders: any[]',
          options: [
            'The function name is too long',
            'Using "any" defeats TypeScript\'s type safety — define an Order interface with typed fields',
            'The function should not be async',
            'The parameter should be a Set, not an Array',
          ],
          correctIndex: 1,
          explanation: 'Using "any" disables all type checking. If an order is missing fields like "items" or "userId", TypeScript will not catch it at compile time. Define a proper interface.',
        },
        {
          lineIndex: 4,
          label: 'await fetchUser(order.userId)',
          options: [
            'fetchUser should be renamed to getUser',
            'The variable name "user" conflicts with a global',
            'Fetching users sequentially inside a loop causes N+1 performance issues — batch the user lookups or use Promise.all',
            'The await keyword is unnecessary here',
          ],
          correctIndex: 2,
          explanation: 'Each iteration awaits a network call sequentially. For 1000 orders, that is 1000 sequential HTTP requests. Batch the user IDs and fetch them all at once, or use Promise.all to parallelize.',
        },
        {
          lineIndex: 5,
          label: 'await sendNotification(user.email, price)',
          options: [
            'The notification text should be customizable',
            'If fetchUser returns null (deleted user), accessing user.email throws a runtime error — add a null check',
            'sendNotification should be synchronous',
            'The price should be formatted as currency first',
          ],
          correctIndex: 1,
          explanation: 'Users can be deleted between when the order was placed and when this code runs. If fetchUser returns null, the code crashes with "Cannot read property email of null". Always guard against missing data.',
        },
        {
          lineIndex: 3,
          label: 'order.items.reduce((s, i) => s + i.price, 0)',
          options: [
            'reduce is slower than a for loop',
            'The accumulator should start at 1 instead of 0',
            'If order.items is undefined or empty, reduce on undefined throws — and the single-letter parameter names "s" and "i" hurt readability',
            'The price calculation should use multiplication',
          ],
          correctIndex: 2,
          explanation: 'If an order has no "items" field, calling .reduce on undefined crashes. Add a guard like (order.items ?? []). The short names "s" and "i" should be "sum" and "item" for clarity.',
        },
      ],
    },
  ];

  let reviews = $derived(advanced ? advancedReviews : basicReviews);
  let currentReview = $state(0);
  let currentIssue = $state(0);
  let selectedOption = $state<number | null>(null);
  let showExplanation = $state(false);
  let correctCount = $state(0);
  let totalAnswered = $state(0);
  let done = $state(false);

  let activeIssueLines = $state<Set<number>>(new Set());

  $effect(() => {
    if (!done && currentReview < reviews.length) {
      const review = reviews[currentReview];
      activeIssueLines = new Set(review.issues.map((issue) => issue.lineIndex));
    }
  });

  function selectOption(index: number) {
    if (selectedOption !== null) return;
    selectedOption = index;
    showExplanation = true;
    totalAnswered++;
    const issue = reviews[currentReview].issues[currentIssue];
    if (index === issue.correctIndex) correctCount++;
  }

  function nextIssue() {
    selectedOption = null;
    showExplanation = false;
    const review = reviews[currentReview];
    if (currentIssue < review.issues.length - 1) {
      currentIssue++;
    } else if (currentReview < reviews.length - 1) {
      currentReview++;
      currentIssue = 0;
    } else {
      done = true;
    }
  }

  function highlightLine(lineIndex: number): string {
    const review = reviews[currentReview];
    if (!review) return '';
    const issue = review.issues[currentIssue];
    if (issue && lineIndex === issue.lineIndex) return 'bg-yellow-900/40 border-l-2 border-yellow-400';
    if (activeIssueLines.has(lineIndex)) return 'bg-indigo-900/20';
    return '';
  }
</script>

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">
      {#if !advanced}Try It: Review This Code{:else}Try It: Advanced Code Review{/if}
    </h2>
    <p class="text-slate-600">
      {#if !advanced}
        Read the code below. Click on highlighted issues and identify what is wrong.
      {:else}
        Find subtle issues including performance problems, security risks, and race conditions.
      {/if}
    </p>
  </div>

  <!-- Score bar -->
  <div class="flex items-center gap-4">
    <div class="text-sm font-semibold text-slate-600">
      Score: <span class="text-indigo-700">{correctCount}</span> / {totalAnswered}
    </div>
    <div class="h-2 flex-1 rounded-full bg-slate-200">
      <div
        class="h-2 rounded-full bg-indigo-500 transition-all"
        style="width: {totalAnswered > 0 ? (correctCount / totalAnswered) * 100 : 0}%"
      ></div>
    </div>
  </div>

  {#if !done}
    {@const review = reviews[currentReview]}
    {@const issue = review.issues[currentIssue]}

    <div class="space-y-4">
      <div class="flex items-center gap-3">
        <h3 class="text-lg font-bold text-slate-800">{review.title}</h3>
        <span class="text-xs font-mono text-slate-500">{review.filename}</span>
      </div>

      <!-- Code display -->
      <div class="code-block rounded-xl">
        {#each review.lines as line, i}
          <div class="flex rounded px-2 py-0.5 {highlightLine(i)}">
            <span class="mr-4 w-6 shrink-0 select-none text-right text-slate-500">{i + 1}</span>
            <code class="whitespace-pre">{line}</code>
          </div>
        {/each}
      </div>

      <!-- Current issue -->
      <div class="rounded-xl border-2 border-yellow-300 bg-yellow-50 p-3">
        <p class="text-sm text-yellow-800">
          <strong>Issue {currentIssue + 1} of {review.issues.length}:</strong> Look at <code class="rounded bg-yellow-100 px-1 text-xs">{issue.label}</code>
        </p>
      </div>

      <!-- Options -->
      <div class="space-y-2">
        <p class="font-semibold text-slate-700">What is the problem here?</p>
        {#each issue.options as option, i}
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
          <p class="mb-2 text-sm font-semibold text-indigo-700">Explanation:</p>
          <p class="text-sm text-slate-700">{issue.explanation}</p>
        </div>
        <button
          onclick={nextIssue}
          class="rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white transition-all hover:bg-indigo-700 active:scale-95"
        >
          {currentIssue < review.issues.length - 1 ? 'Next Issue' : currentReview < reviews.length - 1 ? 'Next Review' : 'See Results'}
        </button>
      {/if}
    </div>

  {:else}
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center space-y-4">
      <p class="text-lg font-bold text-green-700">
        Review complete! You found {correctCount} out of {totalAnswered} issues correctly.
      </p>
      <p class="text-sm text-slate-600">
        {#if correctCount === totalAnswered}
          Perfect score! You have a keen eye for code issues.
        {:else if correctCount >= totalAnswered * 0.7}
          Great job! You caught most of the important issues.
        {:else}
          Keep practicing! Code review is a skill that improves with experience.
        {/if}
      </p>
      <button
        onclick={oncomplete}
        class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
      >
        Continue
      </button>
    </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; padding: 0.75rem 0.5rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; color: #e2e8f0; }
</style>
