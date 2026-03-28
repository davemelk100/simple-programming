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

  // === Basic mode: classify snippets ===
  const snippets = [
    {
      code: `&lt;div class="card"&gt;\n  &lt;h2&gt;Hello&lt;/h2&gt;\n  &lt;p&gt;Welcome!&lt;/p&gt;\n&lt;/div&gt;`,
      label: 'HTML',
      answer: 'declarative' as const,
      explanation: 'HTML describes the structure of a page — you say WHAT elements you want, not HOW to render them.',
    },
    {
      code: `total = 0\nfor item in cart:\n    total += item.price\nprint(total)`,
      label: 'Python',
      answer: 'imperative' as const,
      explanation: 'This Python code uses a loop to step through items one by one — classic imperative, step-by-step instructions.',
    },
    {
      code: `.button {\n  background: blue;\n  border-radius: 8px;\n  font-size: 16px;\n}`,
      label: 'CSS',
      answer: 'declarative' as const,
      explanation: 'CSS declares what styles to apply. The browser figures out HOW to paint pixels on screen.',
    },
    {
      code: `SELECT name, email\nFROM users\nWHERE active = true\nORDER BY name;`,
      label: 'SQL',
      answer: 'declarative' as const,
      explanation: 'SQL describes WHAT data you want. The database engine decides HOW to retrieve it (indexes, scans, joins).',
    },
    {
      code: `let max = arr[0];\nfor (let i = 1; i < arr.length; i++) {\n  if (arr[i] > max) {\n    max = arr[i];\n  }\n}`,
      label: 'JavaScript',
      answer: 'imperative' as const,
      explanation: 'This JS code walks through an array step by step, comparing and updating — imperative control flow.',
    },
    {
      code: `services:\n  web:\n    image: nginx:latest\n    ports:\n      - "80:80"\n  db:\n    image: postgres:15`,
      label: 'YAML (Docker Compose)',
      answer: 'declarative' as const,
      explanation: 'This YAML config declares WHAT services should exist. Docker figures out HOW to create and network them.',
    },
  ];

  let currentSnippet = $state(0);
  let basicResults = $state<(boolean | null)[]>(Array(snippets.length).fill(null));
  let basicFeedback = $state<string | null>(null);
  let basicScore = $derived(basicResults.filter((r) => r === true).length);
  let basicDone = $derived(currentSnippet >= snippets.length);

  function classifyBasic(choice: 'declarative' | 'imperative') {
    const correct = choice === snippets[currentSnippet].answer;
    basicResults[currentSnippet] = correct;
    basicFeedback = correct
      ? `Correct! ${snippets[currentSnippet].explanation}`
      : `Not quite. ${snippets[currentSnippet].explanation}`;

    setTimeout(() => {
      basicFeedback = null;
      currentSnippet++;
    }, 2200);
  }

  // === Advanced mode: rewrite challenges ===
  const challenges = [
    {
      title: 'Filter even numbers and double them',
      imperative: `<span class="kw">const</span> <span class="var">nums</span> <span class="op">=</span> [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>, <span class="num">6</span>];\n<span class="kw">const</span> <span class="var">result</span> <span class="op">=</span> [];\n<span class="kw">for</span> (<span class="kw">let</span> <span class="var">i</span> <span class="op">=</span> <span class="num">0</span>; <span class="var">i</span> <span class="op">&lt;</span> <span class="var">nums</span>.<span class="var">length</span>; <span class="var">i</span><span class="op">++</span>) {\n  <span class="kw">if</span> (<span class="var">nums</span>[<span class="var">i</span>] <span class="op">%</span> <span class="num">2</span> <span class="op">===</span> <span class="num">0</span>) {\n    <span class="var">result</span>.<span class="fn">push</span>(<span class="var">nums</span>[<span class="var">i</span>] <span class="op">*</span> <span class="num">2</span>);\n  }\n}`,
      options: [
        'nums.filter(n => n % 2 === 0).map(n => n * 2)',
        'nums.map(n => n * 2).filter(n => n % 2 === 0)',
        'nums.reduce((acc, n) => n % 2 === 0 ? [...acc, n] : acc, [])',
      ],
      correct: 0,
      declarative: `<span class="kw">const</span> <span class="var">result</span> <span class="op">=</span> <span class="var">nums</span>\n  .<span class="fn">filter</span>(<span class="arg">n</span> <span class="op">=&gt;</span> <span class="arg">n</span> <span class="op">%</span> <span class="num">2</span> <span class="op">===</span> <span class="num">0</span>)\n  .<span class="fn">map</span>(<span class="arg">n</span> <span class="op">=&gt;</span> <span class="arg">n</span> <span class="op">*</span> <span class="num">2</span>);`,
    },
    {
      title: 'Sum all prices in an array of objects',
      imperative: `<span class="kw">const</span> <span class="var">items</span> <span class="op">=</span> [\n  { <span class="var">name</span>: <span class="str">"A"</span>, <span class="var">price</span>: <span class="num">10</span> },\n  { <span class="var">name</span>: <span class="str">"B"</span>, <span class="var">price</span>: <span class="num">25</span> },\n  { <span class="var">name</span>: <span class="str">"C"</span>, <span class="var">price</span>: <span class="num">15</span> },\n];\n<span class="kw">let</span> <span class="var">total</span> <span class="op">=</span> <span class="num">0</span>;\n<span class="kw">for</span> (<span class="kw">const</span> <span class="var">item</span> <span class="kw">of</span> <span class="var">items</span>) {\n  <span class="var">total</span> <span class="op">+=</span> <span class="var">item</span>.<span class="var">price</span>;\n}`,
      options: [
        'items.map(item => item.price)',
        'items.reduce((sum, item) => sum + item.price, 0)',
        'items.filter(item => item.price > 0).length',
      ],
      correct: 1,
      declarative: `<span class="kw">const</span> <span class="var">total</span> <span class="op">=</span> <span class="var">items</span>\n  .<span class="fn">reduce</span>((<span class="arg">sum</span>, <span class="arg">item</span>) <span class="op">=&gt;</span> <span class="arg">sum</span> <span class="op">+</span> <span class="arg">item</span>.<span class="var">price</span>, <span class="num">0</span>);`,
    },
    {
      title: 'Get names of users who are active',
      imperative: `<span class="kw">const</span> <span class="var">users</span> <span class="op">=</span> [\n  { <span class="var">name</span>: <span class="str">"Alice"</span>, <span class="var">active</span>: <span class="num">true</span> },\n  { <span class="var">name</span>: <span class="str">"Bob"</span>, <span class="var">active</span>: <span class="num">false</span> },\n  { <span class="var">name</span>: <span class="str">"Carol"</span>, <span class="var">active</span>: <span class="num">true</span> },\n];\n<span class="kw">const</span> <span class="var">names</span> <span class="op">=</span> [];\n<span class="kw">for</span> (<span class="kw">const</span> <span class="var">u</span> <span class="kw">of</span> <span class="var">users</span>) {\n  <span class="kw">if</span> (<span class="var">u</span>.<span class="var">active</span>) {\n    <span class="var">names</span>.<span class="fn">push</span>(<span class="var">u</span>.<span class="var">name</span>);\n  }\n}`,
      options: [
        'users.filter(u => u.active).map(u => u.name)',
        'users.map(u => u.name).filter(u => u.active)',
        'users.find(u => u.active).name',
      ],
      correct: 0,
      declarative: `<span class="kw">const</span> <span class="var">names</span> <span class="op">=</span> <span class="var">users</span>\n  .<span class="fn">filter</span>(<span class="arg">u</span> <span class="op">=&gt;</span> <span class="arg">u</span>.<span class="var">active</span>)\n  .<span class="fn">map</span>(<span class="arg">u</span> <span class="op">=&gt;</span> <span class="arg">u</span>.<span class="var">name</span>);`,
    },
  ];

  let advCurrent = $state(0);
  let advResults = $state<(boolean | null)[]>(Array(challenges.length).fill(null));
  let advShowSideBySide = $state(false);
  let advDone = $derived(advCurrent >= challenges.length);
  let advScore = $derived(advResults.filter((r) => r === true).length);

  function pickAdvOption(idx: number) {
    const correct = idx === challenges[advCurrent].correct;
    advResults[advCurrent] = correct;
    advShowSideBySide = true;

    setTimeout(() => {
      advShowSideBySide = false;
      advCurrent++;
    }, 3500);
  }
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Which Style?</h2>
    <p class="text-slate-600">
      Read each code snippet and decide: is it <strong>declarative</strong> (describes WHAT) or <strong>imperative</strong> (describes HOW)?
    </p>
  </div>

  {#if !basicDone}
    <div class="text-sm text-slate-500">
      Snippet {currentSnippet + 1} of {snippets.length} — Score: {basicScore}/{snippets.length}
    </div>

    <div class="rounded-xl border p-5 transition-colors {basicResults[currentSnippet] === true ? 'border-green-300 bg-green-50' : basicResults[currentSnippet] === false ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
      <div class="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">{snippets[currentSnippet].label}</div>
      <pre class="code-block"><code>{@html snippets[currentSnippet].code}</code></pre>

      {#if basicFeedback}
        <p class="mt-4 text-sm font-medium {basicResults[currentSnippet] ? 'text-green-600' : 'text-red-600'}">
          {basicFeedback}
        </p>
      {:else}
        <div class="mt-4 flex gap-3">
          <button
            onclick={() => classifyBasic('declarative')}
            class="rounded-lg border-2 border-indigo-300 bg-indigo-50 px-5 py-2.5 text-sm font-semibold text-indigo-700 transition-all hover:bg-indigo-100 active:scale-95"
          >
            Declarative (WHAT)
          </button>
          <button
            onclick={() => classifyBasic('imperative')}
            class="rounded-lg border-2 border-amber-300 bg-amber-50 px-5 py-2.5 text-sm font-semibold text-amber-700 transition-all hover:bg-amber-100 active:scale-95"
          >
            Imperative (HOW)
          </button>
        </div>
      {/if}
    </div>
  {:else}
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center">
      <p class="mb-2 text-xl font-bold text-green-700">Done! Score: {basicScore}/{snippets.length}</p>
      <p class="text-sm text-slate-600">
        {#if basicScore === snippets.length}
          Perfect! You can tell declarative from imperative code every time.
        {:else if basicScore >= 4}
          Great job! You have a strong sense for the two paradigms.
        {:else}
          Good effort! Remember: declarative says WHAT you want, imperative says HOW to do it.
        {/if}
      </p>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
        I've tried this
      </button>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Rewrite Challenge</h2>
    <p class="text-slate-600">
      Each imperative code snippet can be rewritten declaratively. Pick the correct declarative equivalent from the options below.
    </p>
  </div>

  {#if !advDone}
    <div class="text-sm text-slate-500">
      Challenge {advCurrent + 1} of {challenges.length} — Score: {advScore}/{challenges.length}
    </div>

    <div class="rounded-xl border p-5 transition-colors {advResults[advCurrent] === true ? 'border-green-300 bg-green-50' : advResults[advCurrent] === false ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
      <h3 class="mb-3 font-medium text-slate-800">{challenges[advCurrent].title}</h3>

      <p class="mb-2 text-xs font-bold uppercase tracking-wider text-amber-500">Imperative version</p>
      <pre class="code-block"><code>{@html challenges[advCurrent].imperative}</code></pre>

      {#if advShowSideBySide}
        <div class="mt-4">
          <p class="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-500">Declarative equivalent</p>
          <pre class="code-block"><code>{@html challenges[advCurrent].declarative}</code></pre>
          <p class="mt-3 text-sm font-medium {advResults[advCurrent] ? 'text-green-600' : 'text-red-600'}">
            {advResults[advCurrent] ? 'Correct!' : 'Not quite. The correct declarative version is shown above.'}
          </p>
        </div>
      {:else}
        <div class="mt-4 space-y-2">
          <p class="text-sm font-semibold text-slate-700">Which is the correct declarative equivalent?</p>
          {#each challenges[advCurrent].options as option, i}
            <button
              onclick={() => pickAdvOption(i)}
              class="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-left font-mono text-sm text-slate-700 transition-all hover:border-indigo-400 hover:bg-indigo-50 active:scale-[0.99]"
            >
              {option}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  {:else}
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center">
      <p class="mb-2 text-xl font-bold text-green-700">Done! Score: {advScore}/{challenges.length}</p>
      <p class="text-sm text-slate-600">
        {#if advScore === challenges.length}
          Excellent! You can fluently translate between imperative and declarative styles.
        {:else if advScore >= 2}
          Nice work! Practice converting loops to functional chains and it becomes second nature.
        {:else}
          Keep practicing! The key pattern is: filter first, then map to transform.
        {/if}
      </p>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
        I've tried this
      </button>
    </div>
  {/if}

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
