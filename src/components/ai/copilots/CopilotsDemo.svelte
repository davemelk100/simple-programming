<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Simulate inline completion ===
  let userCode = $state('function calculateTotal(items) {\n  ');
  let suggestion = $state('return items.reduce((sum, item) => sum + item.price * item.quantity, 0);');
  let accepted = $state(false);
  let showSuggestion = $state(true);

  const scenarios = [
    { code: 'function calculateTotal(items) {\n  ', suggestion: 'return items.reduce((sum, item) => sum + item.price * item.quantity, 0);' },
    { code: '// Fetch user data from API\nasync function getUser(id) {\n  ', suggestion: 'const response = await fetch(`/api/users/${id}`);\n  if (!response.ok) throw new Error("User not found");\n  return response.json();' },
    { code: '// Validate email address\nfunction isValidEmail(email) {\n  ', suggestion: 'const pattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return pattern.test(email);' },
  ];
  let scenarioIndex = $state(0);

  function acceptSuggestion() {
    accepted = true;
    userCode = userCode + suggestion;
  }

  function nextScenario() {
    scenarioIndex = (scenarioIndex + 1) % scenarios.length;
    userCode = scenarios[scenarioIndex].code;
    suggestion = scenarios[scenarioIndex].suggestion;
    accepted = false;
    showSuggestion = true;
  }

  // === Advanced mode: Chat-based copilot simulation ===
  interface ChatMsg { role: 'user' | 'assistant'; text: string; }
  const chatExamples: { question: string; answer: string }[] = [
    { question: 'What does this reduce() do?', answer: 'This reduce() iterates over the items array, accumulating a sum. For each item, it multiplies price by quantity and adds it to the running total. The 0 at the end is the initial value of the accumulator. It is equivalent to a for loop that sums up item totals.' },
    { question: 'Write a test for calculateTotal', answer: '```\ntest("calculates total for multiple items", () => {\n  const items = [\n    { price: 10, quantity: 2 },\n    { price: 5, quantity: 3 },\n  ];\n  expect(calculateTotal(items)).toBe(35);\n});\n\ntest("returns 0 for empty array", () => {\n  expect(calculateTotal([])).toBe(0);\n});\n```' },
    { question: 'How can I add tax calculation?', answer: 'You can add a tax parameter with a default value:\n\n```\nfunction calculateTotal(items, taxRate = 0) {\n  const subtotal = items.reduce(\n    (sum, item) => sum + item.price * item.quantity, 0\n  );\n  return subtotal * (1 + taxRate);\n}\n// Usage: calculateTotal(items, 0.08) for 8% tax\n```' },
  ];
  let chatMessages = $state<ChatMsg[]>([]);
  let chatIndex = $state(0);

  function askQuestion() {
    if (chatIndex >= chatExamples.length) return;
    const ex = chatExamples[chatIndex];
    chatMessages = [...chatMessages, { role: 'user', text: ex.question }, { role: 'assistant', text: ex.answer }];
    chatIndex++;
  }
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Inline Code Completion</h2>
    <p class="text-slate-600">
      See how a copilot suggests code as you type. The gray text is the AI suggestion — press "Accept" to add it to your code.
    </p>
  </div>

  <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-6 space-y-4">
    <div class="rounded-lg bg-slate-900 p-4 font-mono text-sm overflow-x-auto">
      <pre class="text-slate-100 whitespace-pre-wrap">{userCode}{#if showSuggestion && !accepted}<span class="text-slate-500 italic">{suggestion}</span>{/if}</pre>
      {#if !accepted}
        <span class="text-slate-100">{'}'}</span>
      {:else}
        <span class="text-slate-100">{'\n}'}</span>
      {/if}
    </div>

    <div class="flex gap-2">
      {#if !accepted}
        <button onclick={acceptSuggestion}
          class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">
          Accept (Tab)
        </button>
        <button onclick={() => showSuggestion = false}
          class="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-300 active:scale-95">
          Dismiss (Esc)
        </button>
      {:else}
        <button onclick={nextScenario}
          class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">
          Try Another Example
        </button>
      {/if}
    </div>

    <p class="text-xs text-slate-500">
      In a real editor, suggestions appear automatically as you type. The copilot uses your code context, comments, and function names to predict what you want.
    </p>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
      I've tried inline completion
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Chat-Based Copilot</h2>
      <p class="text-slate-600">Ask questions about code and get contextual answers, just like chatting with a copilot in your editor.</p>
    </div>

    <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-6 space-y-4">
      <div class="rounded-lg bg-slate-900 p-3 font-mono text-sm text-slate-100">
        <pre>function calculateTotal(items) {'{\n'}  return items.reduce((sum, item) =&gt; sum + item.price * item.quantity, 0);{'\n}'}</pre>
      </div>

      <div class="space-y-3 max-h-80 overflow-y-auto">
        {#each chatMessages as msg}
          <div class="rounded-lg p-3 {msg.role === 'user' ? 'bg-orange-100 border border-orange-200 ml-8' : 'bg-white border border-slate-200 mr-8'}">
            <p class="text-xs font-bold uppercase text-slate-500 mb-1">{msg.role === 'user' ? 'You' : 'Copilot'}</p>
            <p class="text-sm text-slate-700 whitespace-pre-wrap">{msg.text}</p>
          </div>
        {/each}
      </div>

      {#if chatIndex < chatExamples.length}
        <button onclick={askQuestion}
          class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95">
          Ask: "{chatExamples[chatIndex].question}"
        </button>
      {:else}
        <p class="text-sm text-slate-500">You have explored all the example questions.</p>
      {/if}
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
        I've explored chat copilot
      </button>
    </div>
  </div>
  {/if}
</div>
