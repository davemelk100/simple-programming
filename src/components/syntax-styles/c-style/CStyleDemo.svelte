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

  // === Basic mode: Brace Matcher ===
  interface Slot {
    id: number;
    correct: string;
    placed: string | null;
  }

  interface Snippet {
    title: string;
    description: string;
    parts: (string | Slot)[];
  }

  const basicSnippets: Snippet[] = [
    {
      title: 'A Simple Function',
      description: 'Place the missing braces and semicolon to complete this function.',
      parts: [
        'function greet(name) ',
        { id: 0, correct: '{', placed: null },
        '\n  console.log("Hello, " + name)',
        { id: 1, correct: ';', placed: null },
        '\n',
        { id: 2, correct: '}', placed: null },
      ],
    },
    {
      title: 'If / Else',
      description: 'Complete the conditional block with the right punctuation.',
      parts: [
        'if (score > 90) ',
        { id: 3, correct: '{', placed: null },
        '\n  grade = "A"',
        { id: 4, correct: ';', placed: null },
        '\n',
        { id: 5, correct: '}', placed: null },
        ' else ',
        { id: 6, correct: '{', placed: null },
        '\n  grade = "B"',
        { id: 7, correct: ';', placed: null },
        '\n',
        { id: 8, correct: '}', placed: null },
      ],
    },
    {
      title: 'Nested Loop',
      description: 'This nested loop needs braces and semicolons in the right spots.',
      parts: [
        'for (let i = 0; i < 3; i++) ',
        { id: 9, correct: '{', placed: null },
        '\n  for (let j = 0; j < 3; j++) ',
        { id: 10, correct: '{', placed: null },
        '\n    console.log(i, j)',
        { id: 11, correct: ';', placed: null },
        '\n  ',
        { id: 12, correct: '}', placed: null },
        '\n',
        { id: 13, correct: '}', placed: null },
      ],
    },
  ];

  let snippets = $state<Snippet[]>(JSON.parse(JSON.stringify(basicSnippets)));
  let currentSnippet = $state(0);
  let selectedSymbol = $state<string | null>(null);
  let feedbackSlot = $state<number | null>(null);
  let feedbackCorrect = $state(false);

  function selectSymbol(sym: string) {
    selectedSymbol = sym;
  }

  function placeSymbol(slot: Slot) {
    if (slot.placed !== null || selectedSymbol === null) return;

    if (selectedSymbol === slot.correct) {
      slot.placed = selectedSymbol;
      feedbackSlot = slot.id;
      feedbackCorrect = true;
    } else {
      feedbackSlot = slot.id;
      feedbackCorrect = false;
    }
    selectedSymbol = null;

    // Clear feedback after a moment
    const fid = slot.id;
    setTimeout(() => {
      if (feedbackSlot === fid) {
        feedbackSlot = null;
      }
    }, 800);
  }

  function snippetComplete(snippet: Snippet): boolean {
    for (const part of snippet.parts) {
      if (typeof part !== 'string' && part.placed === null) return false;
    }
    return true;
  }

  let currentDone = $derived(snippetComplete(snippets[currentSnippet]));

  function nextSnippet() {
    if (currentSnippet < snippets.length - 1) {
      currentSnippet++;
    }
  }

  let allBasicDone = $derived(snippets.every(snippetComplete));

  // === Advanced mode: Syntax Comparison ===
  let activeLang = $state<'js' | 'css' | 'java' | 'go'>('js');

  const langLabels = { js: 'JavaScript', css: 'CSS', java: 'Java', go: 'Go' };

  const comparisonCode: Record<string, string> = {
    js: `<span class="cmt">// JavaScript: filter even numbers</span>
<span class="kw">function</span> <span class="fn">getEvens</span>(<span class="arg">numbers</span>) <span class="op">{</span>
  <span class="kw">const</span> <span class="var">result</span> = []<span class="op">;</span>
  <span class="kw">for</span> (<span class="kw">const</span> <span class="var">n</span> <span class="kw">of</span> <span class="var">numbers</span>) <span class="op">{</span>
    <span class="kw">if</span> (<span class="var">n</span> % <span class="num">2</span> === <span class="num">0</span>) <span class="op">{</span>
      <span class="var">result</span>.<span class="fn">push</span>(<span class="var">n</span>)<span class="op">;</span>
    <span class="op">}</span>
  <span class="op">}</span>
  <span class="kw">return</span> <span class="var">result</span><span class="op">;</span>
<span class="op">}</span>

<span class="cmt">// Or concisely with an arrow function:</span>
<span class="kw">const</span> <span class="fn">getEvens2</span> = (<span class="arg">nums</span>) <span class="op">=></span>
  <span class="var">nums</span>.<span class="fn">filter</span>((<span class="arg">n</span>) <span class="op">=></span> <span class="var">n</span> % <span class="num">2</span> === <span class="num">0</span>)<span class="op">;</span>`,

    css: `<span class="cmt">/* CSS: style even-numbered list items */</span>
<span class="cmt">/* CSS uses braces { } and semicolons ; */</span>
<span class="cmt">/* just like programming languages */</span>

<span class="fn">ul</span> <span class="op">{</span>
  <span class="var">list-style</span>: none<span class="op">;</span>
  <span class="var">padding</span>: <span class="num">0</span><span class="op">;</span>
<span class="op">}</span>

<span class="fn">li</span>:<span class="fn">nth-child</span>(<span class="arg">even</span>) <span class="op">{</span>
  <span class="var">background-color</span>: <span class="str">#e0f2fe</span><span class="op">;</span>
  <span class="var">font-weight</span>: bold<span class="op">;</span>
  <span class="var">padding</span>: <span class="num">0.5rem</span> <span class="num">1rem</span><span class="op">;</span>
<span class="op">}</span>

<span class="fn">li</span>:<span class="fn">nth-child</span>(<span class="arg">odd</span>) <span class="op">{</span>
  <span class="var">background-color</span>: <span class="str">#ffffff</span><span class="op">;</span>
  <span class="var">padding</span>: <span class="num">0.5rem</span> <span class="num">1rem</span><span class="op">;</span>
<span class="op">}</span>`,

    java: `<span class="cmt">// Java: filter even numbers</span>
<span class="kw">import</span> java.util.*<span class="op">;</span>
<span class="kw">import</span> java.util.stream.*<span class="op">;</span>

<span class="kw">public class</span> <span class="fn">Filter</span> <span class="op">{</span>
  <span class="kw">public static</span> List&lt;Integer&gt; <span class="fn">getEvens</span>(<span class="arg">List&lt;Integer&gt; numbers</span>) <span class="op">{</span>
    List&lt;Integer&gt; <span class="var">result</span> = <span class="kw">new</span> ArrayList&lt;&gt;()<span class="op">;</span>
    <span class="kw">for</span> (<span class="kw">int</span> <span class="var">n</span> : <span class="var">numbers</span>) <span class="op">{</span>
      <span class="kw">if</span> (<span class="var">n</span> % <span class="num">2</span> == <span class="num">0</span>) <span class="op">{</span>
        <span class="var">result</span>.<span class="fn">add</span>(<span class="var">n</span>)<span class="op">;</span>
      <span class="op">}</span>
    <span class="op">}</span>
    <span class="kw">return</span> <span class="var">result</span><span class="op">;</span>
  <span class="op">}</span>
<span class="op">}</span>`,

    go: `<span class="cmt">// Go: filter even numbers</span>
<span class="kw">package</span> main

<span class="kw">func</span> <span class="fn">getEvens</span>(<span class="arg">numbers</span> []<span class="fn">int</span>) []<span class="fn">int</span> <span class="op">{</span>
  <span class="var">result</span> := []<span class="fn">int</span><span class="op">{}</span>
  <span class="kw">for</span> _, <span class="var">n</span> := <span class="kw">range</span> <span class="var">numbers</span> <span class="op">{</span>
    <span class="kw">if</span> <span class="var">n</span>%<span class="num">2</span> == <span class="num">0</span> <span class="op">{</span>
      <span class="var">result</span> = <span class="fn">append</span>(<span class="var">result</span>, <span class="var">n</span>)
    <span class="op">}</span>
  <span class="op">}</span>
  <span class="kw">return</span> <span class="var">result</span>
<span class="op">}</span>`,
  };

  const sharedElements: Record<string, string[]> = {
    js: ['Curly braces { } wrap the function body, loop body, and if block', 'Semicolons ; end each statement', 'Parentheses ( ) wrap the condition in the if statement'],
    css: ['Curly braces { } wrap each rule\'s declarations', 'Semicolons ; end each property declaration', 'Parentheses ( ) wrap pseudo-class arguments like nth-child(even)'],
    java: ['Curly braces { } wrap class, method, loop, and if blocks', 'Semicolons ; end every statement (no exceptions)', 'Parentheses ( ) wrap conditions, parameters, and type casts'],
    go: ['Curly braces { } wrap function bodies, loops, and conditions', 'No semicolons needed -- Go uses ASI (like JavaScript, but stricter)', 'Parentheses ( ) wrap function parameters but NOT if conditions'],
  };
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Brace Matcher</h2>
    <p class="text-slate-600">
      Select a symbol from the palette below, then click on the empty slots in the code to place it. Match the correct symbol to each slot -- <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">{"{"}</code> and <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">{"}"}</code> for blocks, <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">;</code> for statement endings.
    </p>
  </div>

  <!-- Symbol palette -->
  <div class="flex items-center gap-3">
    <span class="text-sm font-semibold text-slate-500">Pick a symbol:</span>
    {#each ['{', '}', ';'] as sym}
      <button
        onclick={() => selectSymbol(sym)}
        class="flex h-12 w-12 items-center justify-center rounded-lg border-2 font-mono text-xl font-bold transition-all active:scale-95
          {selectedSymbol === sym ? 'border-blue-500 bg-blue-100 text-blue-700 shadow-md' : 'border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50'}"
      >
        {sym}
      </button>
    {/each}
    {#if selectedSymbol}
      <span class="ml-2 text-sm text-blue-600">Selected: <strong class="font-mono text-lg">{selectedSymbol}</strong></span>
    {/if}
  </div>

  <!-- Snippet progress -->
  <div class="flex items-center gap-2">
    {#each snippets as _, i}
      <button
        onclick={() => { if (i <= currentSnippet) currentSnippet = i; }}
        class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors
          {i === currentSnippet ? 'bg-blue-600 text-white' : snippetComplete(snippets[i]) ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'}"
      >
        {i + 1}
      </button>
    {/each}
    <span class="ml-2 text-sm text-slate-500">{snippets[currentSnippet].title}</span>
  </div>

  <!-- Current snippet -->
  <div class="rounded-xl border-2 border-slate-200 bg-white p-5">
    <p class="mb-3 text-sm text-slate-600">{snippets[currentSnippet].description}</p>
    <pre class="code-block"><code>{#each snippets[currentSnippet].parts as part}{#if typeof part === 'string'}{part}{:else}<button
              onclick={() => placeSymbol(part)}
              disabled={part.placed !== null}
              class="inline-flex h-7 w-7 items-center justify-center rounded border-2 font-mono text-base font-bold transition-all
                {part.placed !== null
                  ? 'border-green-400 bg-green-900/30 text-green-400 cursor-default'
                  : feedbackSlot === part.id && !feedbackCorrect
                    ? 'border-red-400 bg-red-900/30 text-red-400'
                    : selectedSymbol
                      ? 'border-blue-400 bg-blue-900/20 text-blue-300 cursor-pointer hover:bg-blue-900/40'
                      : 'border-slate-500 bg-slate-800 text-slate-500 cursor-default'}"
            >{part.placed ?? ' '}</button>{/if}{/each}</code></pre>
  </div>

  {#if currentDone && currentSnippet < snippets.length - 1}
    <div>
      <button
        onclick={nextSnippet}
        class="rounded-lg bg-green-600 px-6 py-2 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
      >
        Next Snippet
      </button>
    </div>
  {/if}

  {#if allBasicDone}
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
      <p class="font-bold text-green-700">All snippets completed! You matched every brace and semicolon correctly.</p>
    </div>
  {/if}

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      I've tried this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Syntax Comparison</h2>
      <p class="text-slate-600">
        The same concept -- filtering even numbers -- written in four different C-style languages plus CSS. Toggle between them and notice how the same curly braces, semicolons, and parentheses appear across all of them.
      </p>
    </div>

    <!-- Language tabs -->
    <div class="flex flex-wrap gap-2">
      {#each (['js', 'css', 'java', 'go'] as const) as lang}
        <button
          onclick={() => activeLang = lang}
          class="rounded-lg px-4 py-2 text-sm font-semibold transition-all active:scale-95
            {activeLang === lang ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
        >
          {langLabels[lang]}
        </button>
      {/each}
    </div>

    <!-- Code display -->
    <div>
      <pre class="code-block"><code>{@html comparisonCode[activeLang]}</code></pre>
    </div>

    <!-- Shared elements highlight -->
    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
      <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">C-Style Elements in {langLabels[activeLang]}</h3>
      <ul class="space-y-2 text-sm text-slate-600">
        {#each sharedElements[activeLang] as element}
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
            {element}
          </li>
        {/each}
      </ul>
    </div>

    <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
      <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-purple-600">Notice the Pattern</h3>
      <p class="text-sm text-slate-600">
        Every language uses <code class="rounded bg-white px-1 text-sm text-blue-700">{"{ }"}</code> to group related code together. The <span class="font-semibold">highlighted operators</span> in the code above (<span class="font-mono text-slate-400">{"{ } ; ( )"}</span>) are the shared C-style elements. Despite different keywords and type systems, the structural punctuation is remarkably consistent across the entire family.
      </p>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
        I've tried this
      </button>
    </div>
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
