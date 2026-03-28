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

  // === Basic mode state ===
  let message = $state('Hello, Python!');

  let fString = $derived(`f"Your message: {message}"`);
  let upperResult = $derived(message.toUpperCase());
  let lowerResult = $derived(message.toLowerCase());
  let reversedResult = $derived(message.split('').reverse().join(''));
  let lengthResult = $derived(message.length);

  // === Advanced mode state ===
  let numbersInput = $state('1, 2, 3, 4, 5, 6, 7, 8, 9, 10');
  let filter = $state<'all' | 'even' | 'odd' | 'positive'>('all');
  let transform = $state<'none' | 'square' | 'double' | 'negate'>('none');

  let parsedNumbers = $derived(
    numbersInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '' && !isNaN(Number(s)))
      .map(Number)
  );

  let filteredNumbers = $derived(
    parsedNumbers.filter((n) => {
      if (filter === 'even') return n % 2 === 0;
      if (filter === 'odd') return n % 2 !== 0;
      if (filter === 'positive') return n > 0;
      return true;
    })
  );

  let transformedNumbers = $derived(
    filteredNumbers.map((n) => {
      if (transform === 'square') return n * n;
      if (transform === 'double') return n * 2;
      if (transform === 'negate') return -n;
      return n;
    })
  );

  let comprehensionCode = $derived(() => {
    let varExpr = 'x';
    if (transform === 'square') varExpr = 'x**2';
    else if (transform === 'double') varExpr = 'x*2';
    else if (transform === 'negate') varExpr = '-x';

    let filterExpr = '';
    if (filter === 'even') filterExpr = ' if x % 2 == 0';
    else if (filter === 'odd') filterExpr = ' if x % 2 != 0';
    else if (filter === 'positive') filterExpr = ' if x > 0';

    const nums = parsedNumbers.join(', ');
    return `numbers = [${nums}]\nresult = [${varExpr} for x in numbers${filterExpr}]`;
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Hello Python</h2>
    <p class="text-slate-600">Type a message below and see how Python can transform strings in different ways. The code and results update live!</p>
  </div>

  <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
    <label class="mb-2 block text-sm font-semibold text-slate-700" for="message-input">Your message:</label>
    <input
      id="message-input"
      type="text"
      bind:value={message}
      placeholder="Type something..."
      class="w-full rounded-lg border border-green-300 bg-white px-4 py-3 text-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
    />
  </div>

  <div class="space-y-6">
    <!-- f-string -->
    <div class="rounded-xl border border-slate-200 bg-white p-5">
      <h3 class="mb-2 font-bold text-slate-800">F-String (formatted string)</h3>
      <div class="mb-2 rounded-lg bg-green-50 px-4 py-2 text-lg font-medium text-green-800">Your message: {message}</div>
      <pre class="code-block"><code>{@html `<span class="var">message</span> <span class="op">=</span> <span class="str">"${message}"</span>
<span class="fn">print</span>(<span class="str">f"Your message: {</span><span class="var">{message}</span><span class="str">}"</span>)`}</code></pre>
    </div>

    <!-- .upper() -->
    <div class="rounded-xl border border-slate-200 bg-white p-5">
      <h3 class="mb-2 font-bold text-slate-800">.upper() - Uppercase</h3>
      <div class="mb-2 rounded-lg bg-green-50 px-4 py-2 text-lg font-medium text-green-800">{upperResult}</div>
      <pre class="code-block"><code>{@html `<span class="str">"${message}"</span>.<span class="fn">upper</span>()  <span class="cmt"># → "${upperResult}"</span>`}</code></pre>
    </div>

    <!-- .lower() -->
    <div class="rounded-xl border border-slate-200 bg-white p-5">
      <h3 class="mb-2 font-bold text-slate-800">.lower() - Lowercase</h3>
      <div class="mb-2 rounded-lg bg-green-50 px-4 py-2 text-lg font-medium text-green-800">{lowerResult}</div>
      <pre class="code-block"><code>{@html `<span class="str">"${message}"</span>.<span class="fn">lower</span>()  <span class="cmt"># → "${lowerResult}"</span>`}</code></pre>
    </div>

    <!-- reversed -->
    <div class="rounded-xl border border-slate-200 bg-white p-5">
      <h3 class="mb-2 font-bold text-slate-800">Reversed</h3>
      <div class="mb-2 rounded-lg bg-green-50 px-4 py-2 text-lg font-medium text-green-800">{reversedResult}</div>
      <pre class="code-block"><code>{@html `<span class="str">"${message}"</span>[<span class="num">::-1</span>]  <span class="cmt"># → "${reversedResult}"</span>`}</code></pre>
    </div>

    <!-- len() -->
    <div class="rounded-xl border border-slate-200 bg-white p-5">
      <h3 class="mb-2 font-bold text-slate-800">len() - Length</h3>
      <div class="mb-2 rounded-lg bg-green-50 px-4 py-2 text-lg font-medium text-green-800">{lengthResult} characters</div>
      <pre class="code-block"><code>{@html `<span class="fn">len</span>(<span class="str">"${message}"</span>)  <span class="cmt"># → ${lengthResult}</span>`}</code></pre>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      I've tried this
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: List Comprehension Builder</h2>
    <p class="text-slate-600">Enter a list of numbers, choose a filter and transform, and see the Python list comprehension that produces the result.</p>
  </div>

  <div class="space-y-4 rounded-xl border-2 border-green-200 bg-green-50 p-5">
    <div>
      <label class="mb-1 block text-sm font-semibold text-slate-700" for="numbers-input">Numbers (comma-separated):</label>
      <input
        id="numbers-input"
        type="text"
        bind:value={numbersInput}
        placeholder="1, 2, 3, 4, 5"
        class="w-full rounded-lg border border-green-300 bg-white px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
      />
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label class="mb-1 block text-sm font-semibold text-slate-700" for="filter-select">Filter:</label>
        <select
          id="filter-select"
          bind:value={filter}
          class="w-full rounded-lg border border-green-300 bg-white px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
        >
          <option value="all">All numbers</option>
          <option value="even">Even only (x % 2 == 0)</option>
          <option value="odd">Odd only (x % 2 != 0)</option>
          <option value="positive">Positive only (x &gt; 0)</option>
        </select>
      </div>
      <div>
        <label class="mb-1 block text-sm font-semibold text-slate-700" for="transform-select">Transform:</label>
        <select
          id="transform-select"
          bind:value={transform}
          class="w-full rounded-lg border border-green-300 bg-white px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
        >
          <option value="none">No transform (x)</option>
          <option value="square">Square (x**2)</option>
          <option value="double">Double (x*2)</option>
          <option value="negate">Negate (-x)</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Result -->
  <div class="rounded-xl border border-slate-200 bg-white p-5">
    <h3 class="mb-3 font-bold text-slate-800">Result</h3>
    <div class="mb-3 rounded-lg bg-green-50 px-4 py-3">
      <span class="text-sm font-medium text-slate-500">Input:</span>
      <span class="ml-2 font-mono text-green-800">[{parsedNumbers.join(', ')}]</span>
    </div>
    <div class="mb-4 rounded-lg bg-green-50 px-4 py-3">
      <span class="text-sm font-medium text-slate-500">Output:</span>
      <span class="ml-2 font-mono text-green-800">[{transformedNumbers.join(', ')}]</span>
    </div>
    <h3 class="mb-2 font-bold text-slate-800">Python Code</h3>
    <pre class="code-block"><code>{@html (() => {
      const code = comprehensionCode();
      return code
        .replace(/numbers = /, '<span class="var">numbers</span> <span class="op">=</span> ')
        .replace(/result = /, '<span class="var">result</span> <span class="op">=</span> ')
        .replace(/\bfor\b/g, '<span class="kw">for</span>')
        .replace(/\bif\b/g, '<span class="kw">if</span>')
        .replace(/\bin\b/g, '<span class="kw">in</span>');
    })()}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
    <h3 class="mb-2 text-sm font-bold text-slate-800">How list comprehensions work</h3>
    <p class="text-sm text-slate-600">
      The syntax is <code class="rounded bg-slate-100 px-1 text-sm text-green-700">[expression for item in iterable if condition]</code>.
      The <strong>expression</strong> transforms each item, the <strong>for</strong> clause iterates, and the optional <strong>if</strong> clause filters.
      It's equivalent to a for loop with append, but more concise and Pythonic.
    </p>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      I've tried this
    </button>
  </div>
</div>
{/if}

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
