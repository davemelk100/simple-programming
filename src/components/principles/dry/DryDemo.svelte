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

  // === Basic mode: Spot the Repetition ===
  interface BasicExample {
    title: string;
    lines: { text: string; duplicated: boolean }[];
    extractedName: string;
    extractedCode: string;
    callCode: string;
  }

  const basicExamples: BasicExample[] = [
    {
      title: 'Greeting messages',
      lines: [
        { text: 'console.log("Hello, " + name + "!");', duplicated: true },
        { text: 'let age = getAge(name);', duplicated: false },
        { text: 'console.log("Hello, " + name + "!");', duplicated: true },
        { text: 'updateRecords(name);', duplicated: false },
        { text: 'console.log("Hello, " + name + "!");', duplicated: true },
      ],
      extractedName: 'greet',
      extractedCode: 'function greet(name) {\n  console.log("Hello, " + name + "!");\n}',
      callCode: 'greet(name);\nlet age = getAge(name);\ngreet(name);\nupdateRecords(name);\ngreet(name);',
    },
    {
      title: 'Tax calculation',
      lines: [
        { text: 'let tax = price * 0.08;', duplicated: true },
        { text: 'let total = price + tax;', duplicated: true },
        { text: 'showReceipt(total);', duplicated: false },
        { text: 'let tax2 = itemPrice * 0.08;', duplicated: true },
        { text: 'let total2 = itemPrice + tax2;', duplicated: true },
      ],
      extractedName: 'calcTotal',
      extractedCode: 'function calcTotal(price) {\n  let tax = price * 0.08;\n  return price + tax;\n}',
      callCode: 'let total = calcTotal(price);\nshowReceipt(total);\nlet total2 = calcTotal(itemPrice);',
    },
    {
      title: 'Validation checks',
      lines: [
        { text: 'if (email === "" || !email.includes("@")) {', duplicated: true },
        { text: '  showError("Invalid email");', duplicated: true },
        { text: '}', duplicated: true },
        { text: 'saveToDatabase(email);', duplicated: false },
        { text: 'if (email === "" || !email.includes("@")) {', duplicated: true },
        { text: '  showError("Invalid email");', duplicated: true },
        { text: '}', duplicated: true },
      ],
      extractedName: 'isValidEmail',
      extractedCode: 'function isValidEmail(email) {\n  return email !== "" && email.includes("@");\n}',
      callCode: 'if (!isValidEmail(email)) showError("Invalid email");\nsaveToDatabase(email);\nif (!isValidEmail(email)) showError("Invalid email");',
    },
  ];

  let basicStep = $state(0);
  let selectedLines = $state<Set<number>>(new Set());
  let basicRevealed = $state(false);
  let basicCompleted = $state<Set<number>>(new Set());

  function toggleLine(index: number) {
    if (basicRevealed) return;
    const next = new Set(selectedLines);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    selectedLines = next;
  }

  function checkBasicSelection() {
    const example = basicExamples[basicStep];
    const correctLines = new Set(
      example.lines.map((l, i) => (l.duplicated ? i : -1)).filter((i) => i >= 0)
    );
    const isCorrect =
      selectedLines.size === correctLines.size &&
      [...selectedLines].every((i) => correctLines.has(i));
    if (isCorrect) {
      basicRevealed = true;
      basicCompleted = new Set([...basicCompleted, basicStep]);
    }
  }

  function nextBasicExample() {
    if (basicStep < basicExamples.length - 1) {
      basicStep++;
      selectedLines = new Set();
      basicRevealed = false;
    }
  }

  function revealAnswer() {
    basicRevealed = true;
    basicCompleted = new Set([...basicCompleted, basicStep]);
  }

  // === Advanced mode: Extract a Function ===
  interface AdvExample {
    title: string;
    code: string;
    repeatedPattern: string;
    correctName: string[];
    params: { name: string; required: boolean }[];
    refactoredFn: string;
    refactoredUsage: string;
  }

  const advExamples: AdvExample[] = [
    {
      title: 'Format currency',
      code: 'let priceA = "$" + amountA.toFixed(2);\nlet label = "Total: ";\nlet priceB = "$" + amountB.toFixed(2);\nlet priceC = "$" + amountC.toFixed(2);',
      repeatedPattern: '"$" + amount.toFixed(2)',
      correctName: ['formatcurrency', 'formatprice', 'formatmoney', 'formatamount', 'todollars'],
      params: [
        { name: 'amount', required: true },
        { name: 'label', required: false },
        { name: 'currency', required: false },
        { name: 'index', required: false },
      ],
      refactoredFn: 'function formatCurrency(amount) {\n  return "$" + amount.toFixed(2);\n}',
      refactoredUsage: 'let priceA = formatCurrency(amountA);\nlet label = "Total: ";\nlet priceB = formatCurrency(amountB);\nlet priceC = formatCurrency(amountC);',
    },
    {
      title: 'Fetch user data',
      code: 'let res1 = await fetch(BASE + "/users/" + id1);\nlet data1 = await res1.json();\nvalidate(data1);\n\nlet res2 = await fetch(BASE + "/users/" + id2);\nlet data2 = await res2.json();\nvalidate(data2);',
      repeatedPattern: 'fetch + json + validate for a user ID',
      correctName: ['fetchuser', 'getuser', 'loaduser', 'fetchuserdata'],
      params: [
        { name: 'userId', required: true },
        { name: 'BASE', required: false },
        { name: 'response', required: false },
        { name: 'callback', required: false },
      ],
      refactoredFn: 'async function fetchUser(userId) {\n  let res = await fetch(BASE + "/users/" + userId);\n  let data = await res.json();\n  validate(data);\n  return data;\n}',
      refactoredUsage: 'let data1 = await fetchUser(id1);\nlet data2 = await fetchUser(id2);',
    },
    {
      title: 'DOM element creation',
      code: 'let el1 = document.createElement("div");\nel1.className = "card";\nel1.textContent = titles[0];\ncontainer.appendChild(el1);\n\nlet el2 = document.createElement("div");\nel2.className = "card";\nel2.textContent = titles[1];\ncontainer.appendChild(el2);\n\nlet el3 = document.createElement("div");\nel3.className = "card";\nel3.textContent = titles[2];\ncontainer.appendChild(el3);',
      repeatedPattern: 'create div, set class, set text, append',
      correctName: ['createcard', 'addcard', 'makecard', 'createcardelement'],
      params: [
        { name: 'title', required: true },
        { name: 'container', required: true },
        { name: 'className', required: false },
        { name: 'index', required: false },
      ],
      refactoredFn: 'function createCard(title, container) {\n  let el = document.createElement("div");\n  el.className = "card";\n  el.textContent = title;\n  container.appendChild(el);\n}',
      refactoredUsage: 'createCard(titles[0], container);\ncreateCard(titles[1], container);\ncreateCard(titles[2], container);',
    },
  ];

  let advStep = $state(0);
  let advFnName = $state('');
  let advSelectedParams = $state<Set<number>>(new Set());
  let advResult = $state<'correct' | 'wrong' | null>(null);
  let advCompleted = $state<Set<number>>(new Set());

  function toggleParam(index: number) {
    if (advResult === 'correct') return;
    const next = new Set(advSelectedParams);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    advSelectedParams = next;
  }

  function checkAdvAnswer() {
    const ex = advExamples[advStep];
    const nameMatch = ex.correctName.includes(advFnName.trim().toLowerCase().replace(/[\s_-]/g, ''));
    const requiredParams = new Set(
      ex.params.map((p, i) => (p.required ? i : -1)).filter((i) => i >= 0)
    );
    const paramsCorrect =
      [...requiredParams].every((i) => advSelectedParams.has(i)) &&
      [...advSelectedParams].every((i) => ex.params[i]?.required);

    if (nameMatch && paramsCorrect) {
      advResult = 'correct';
      advCompleted = new Set([...advCompleted, advStep]);
    } else {
      advResult = 'wrong';
    }
  }

  function nextAdvExample() {
    if (advStep < advExamples.length - 1) {
      advStep++;
      advFnName = '';
      advSelectedParams = new Set();
      advResult = null;
    }
  }
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Spot the Repetition</h2>
    <p class="text-slate-600">Click on the lines that are duplicated. Then see how to extract them into a function.</p>
  </div>

  <!-- Progress -->
  <div class="flex gap-2">
    {#each basicExamples as _, i}
      <div
        class="h-2 flex-1 rounded-full transition-colors
          {basicCompleted.has(i) ? 'bg-green-500' : i === basicStep ? 'bg-orange-400' : 'bg-slate-200'}"
      ></div>
    {/each}
  </div>

  <!-- Current example -->
  <div class="rounded-xl border border-slate-200 bg-white p-5">
    <h3 class="mb-3 font-semibold text-slate-800">
      {basicStep + 1}. {basicExamples[basicStep].title}
    </h3>
    <p class="mb-3 text-sm text-slate-500">Click the repeated lines to select them, then check your answer.</p>

    <div class="space-y-1">
      {#each basicExamples[basicStep].lines as line, i}
        <button
          onclick={() => toggleLine(i)}
          disabled={basicRevealed}
          class="block w-full rounded px-3 py-1.5 text-left font-mono text-sm transition-all
            {selectedLines.has(i) ? 'bg-orange-100 border-orange-400 border ring-1 ring-orange-300' :
             basicRevealed && line.duplicated ? 'bg-orange-100 border-orange-300 border' :
             'bg-slate-50 border border-slate-200 hover:bg-slate-100'}
            {basicRevealed && line.duplicated ? 'opacity-100' : ''}
            disabled:cursor-default"
        >
          {line.text}
        </button>
      {/each}
    </div>

    {#if !basicRevealed}
      <div class="mt-4 flex gap-3">
        <button
          onclick={checkBasicSelection}
          class="rounded-lg bg-orange-600 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95"
        >
          Check
        </button>
        <button
          onclick={revealAnswer}
          class="rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 active:scale-95"
        >
          Show answer
        </button>
      </div>
    {/if}

    {#if basicRevealed}
      <div class="mt-5 space-y-3">
        <p class="text-sm font-semibold text-green-600">Extracted function:</p>
        <pre class="code-block"><code>{basicExamples[basicStep].extractedCode}</code></pre>
        <p class="text-sm font-semibold text-green-600">Refactored code:</p>
        <pre class="code-block"><code>{basicExamples[basicStep].callCode}</code></pre>

        {#if basicStep < basicExamples.length - 1}
          <button
            onclick={nextBasicExample}
            class="rounded-lg bg-orange-600 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95"
          >
            Next example
          </button>
        {:else}
          <p class="text-sm font-bold text-green-600">All examples complete!</p>
        {/if}
      </div>
    {/if}
  </div>

  {#if basicCompleted.size === basicExamples.length}
    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
      >
        Continue
      </button>
    </div>
  {/if}

  {:else}

  <!-- Advanced: Extract a Function -->
  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Extract a Function</h2>
      <p class="text-slate-600">Read the duplicated code, name the new function, and pick which parameters it needs.</p>
    </div>

    <!-- Progress -->
    <div class="flex gap-2">
      {#each advExamples as _, i}
        <div
          class="h-2 flex-1 rounded-full transition-colors
            {advCompleted.has(i) ? 'bg-green-500' : i === advStep ? 'bg-orange-400' : 'bg-slate-200'}"
        ></div>
      {/each}
    </div>

    <!-- Current example -->
    <div class="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
      <h3 class="font-semibold text-slate-800">
        {advStep + 1}. {advExamples[advStep].title}
      </h3>

      <div>
        <p class="mb-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">Duplicated code</p>
        <pre class="code-block"><code>{advExamples[advStep].code}</code></pre>
      </div>

      <div class="rounded-lg border border-orange-200 bg-orange-50 p-4">
        <p class="text-sm text-slate-600 mb-1"><strong>Repeated pattern:</strong> {advExamples[advStep].repeatedPattern}</p>
      </div>

      <div>
        <label class="block text-sm font-semibold text-slate-700 mb-1" for="fn-name">
          Name your function:
        </label>
        <input
          id="fn-name"
          type="text"
          bind:value={advFnName}
          placeholder="e.g., formatCurrency"
          disabled={advResult === 'correct'}
          class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none disabled:opacity-50"
        />
      </div>

      <div>
        <p class="text-sm font-semibold text-slate-700 mb-2">Select the required parameters:</p>
        <div class="flex flex-wrap gap-2">
          {#each advExamples[advStep].params as param, i}
            <button
              onclick={() => toggleParam(i)}
              disabled={advResult === 'correct'}
              class="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all
                {advSelectedParams.has(i) ? 'border-orange-500 bg-orange-100 text-orange-800' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}
                disabled:cursor-default"
            >
              {param.name}
            </button>
          {/each}
        </div>
      </div>

      {#if advResult !== 'correct'}
        <button
          onclick={checkAdvAnswer}
          class="rounded-lg bg-orange-600 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95"
        >
          Check
        </button>
      {/if}

      {#if advResult === 'wrong'}
        <p class="text-sm text-red-600">Not quite. Think about what varies between each repeated block -- those become parameters. Try a descriptive function name.</p>
      {/if}

      {#if advResult === 'correct'}
        <div class="space-y-3">
          <p class="text-sm font-semibold text-green-600">Correct! Here is the refactored code:</p>
          <pre class="code-block"><code>{advExamples[advStep].refactoredFn}</code></pre>
          <p class="text-sm font-semibold text-green-600">Usage:</p>
          <pre class="code-block"><code>{advExamples[advStep].refactoredUsage}</code></pre>

          {#if advStep < advExamples.length - 1}
            <button
              onclick={nextAdvExample}
              class="rounded-lg bg-orange-600 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95"
            >
              Next example
            </button>
          {:else}
            <p class="text-sm font-bold text-green-600">All examples complete!</p>
          {/if}
        </div>
      {/if}
    </div>

    {#if advCompleted.size === advExamples.length}
      <div>
        <button
          onclick={oncomplete}
          class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
        >
          Continue
        </button>
      </div>
    {/if}
  </div>
  {/if}
</div>

<style>
  .code-block {
    background-color: #0f172a;
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
