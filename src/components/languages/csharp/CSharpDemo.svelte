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
  let playerName = $state('');
  let playerClass = $state('Warrior');

  const classEmojis: Record<string, string> = {
    Warrior: '\u2694\uFE0F',
    Mage: '\uD83E\uDDD9',
    Archer: '\uD83C\uDFF9',
  };

  const classColors: Record<string, string> = {
    Warrior: 'border-red-400 bg-red-50',
    Mage: 'border-purple-400 bg-purple-50',
    Archer: 'border-green-400 bg-green-50',
  };

  const classTextColors: Record<string, string> = {
    Warrior: 'text-red-700',
    Mage: 'text-purple-700',
    Archer: 'text-green-700',
  };

  let displayName = $derived(playerName.trim() || 'Hero');

  // === Advanced mode state ===
  let numbersInput = $state('5, 12, 3, 8, 21, 7, 15, 2');
  let linqOp = $state('Where');
  let filterValue = $state('10');

  let parsedNumbers = $derived(() => {
    return numbersInput
      .split(',')
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));
  });

  let linqResult = $derived(() => {
    const nums = parsedNumbers();
    const threshold = parseFloat(filterValue) || 0;
    switch (linqOp) {
      case 'Where':
        return nums.filter((n) => n > threshold);
      case 'Select':
        return nums.map((n) => n * threshold);
      case 'OrderBy':
        return [...nums].sort((a, b) => a - b);
      case 'OrderByDescending':
        return [...nums].sort((a, b) => b - a);
      case 'Aggregate':
        return nums.length > 0 ? [nums.reduce((a, b) => a + b, 0)] : [0];
      default:
        return nums;
    }
  });

  let linqExpression = $derived(() => {
    const threshold = filterValue || '0';
    switch (linqOp) {
      case 'Where':
        return `numbers.Where(n => n > ${threshold})`;
      case 'Select':
        return `numbers.Select(n => n * ${threshold})`;
      case 'OrderBy':
        return `numbers.OrderBy(n => n)`;
      case 'OrderByDescending':
        return `numbers.OrderByDescending(n => n)`;
      case 'Aggregate':
        return `numbers.Aggregate((sum, n) => sum + n)`;
      default:
        return '';
    }
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Hello C#</h2>
    <p class="text-slate-600">
      Create your own game character! Type a name and pick a class to see how C# represents objects. This is similar to how Unity games create characters.
    </p>
  </div>

  <div class="space-y-4">
    <div class="flex flex-wrap gap-4">
      <div class="flex-1">
        <label for="player-name" class="mb-1 block text-sm font-medium text-slate-700">Character Name</label>
        <input
          id="player-name"
          type="text"
          bind:value={playerName}
          placeholder="Enter your character's name..."
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        />
      </div>
      <div>
        <label for="player-class" class="mb-1 block text-sm font-medium text-slate-700">Class</label>
        <select
          id="player-class"
          bind:value={playerClass}
          class="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        >
          <option value="Warrior">Warrior</option>
          <option value="Mage">Mage</option>
          <option value="Archer">Archer</option>
        </select>
      </div>
    </div>

    <!-- Character card -->
    <div class="rounded-xl border-2 {classColors[playerClass]} p-6 text-center shadow-sm transition-all duration-300">
      <div class="mb-2 text-5xl">{classEmojis[playerClass]}</div>
      <h3 class="text-xl font-bold {classTextColors[playerClass]}">{displayName}</h3>
      <p class="text-sm text-slate-500">{playerClass}</p>
      <div class="mt-3 flex justify-center gap-4 text-xs text-slate-500">
        {#if playerClass === 'Warrior'}
          <span>HP: 120</span><span>ATK: 15</span><span>DEF: 20</span>
        {:else if playerClass === 'Mage'}
          <span>HP: 80</span><span>ATK: 25</span><span>DEF: 8</span>
        {:else}
          <span>HP: 90</span><span>ATK: 20</span><span>DEF: 12</span>
        {/if}
      </div>
    </div>

    <!-- C# code representation -->
    <div>
      <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">C# Code That Creates This Character</p>
      <pre class="code-block"><code>{@html `<span class="kw">public class</span> <span class="fn">Character</span>
{
    <span class="kw">public</span> <span class="fn">string</span> <span class="var">Name</span> { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="fn">string</span> <span class="var">Class</span> { <span class="kw">get</span>; <span class="kw">set</span>; }
}

<span class="kw">var</span> <span class="var">player</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">Character</span>
{
    <span class="var">Name</span> <span class="op">=</span> <span class="str">"${displayName}"</span>,
    <span class="var">Class</span> <span class="op">=</span> <span class="str">"${playerClass}"</span>
};

<span class="fn">Console</span>.<span class="fn">WriteLine</span>(<span class="str">$"Welcome, {<span class="var">player</span>.<span class="var">Name</span>} the {<span class="var">player</span>.<span class="var">Class</span>}!"</span>);`}</code></pre>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: LINQ Explorer</h2>
    <p class="text-slate-600">
      Enter comma-separated numbers, pick a LINQ operation, and see the result update live. LINQ (Language Integrated Query) lets you query and transform collections with elegant, readable expressions.
    </p>
  </div>

  <div class="space-y-4">
    <div>
      <label for="numbers-input" class="mb-1 block text-sm font-medium text-slate-700">Numbers (comma-separated)</label>
      <input
        id="numbers-input"
        type="text"
        bind:value={numbersInput}
        placeholder="5, 12, 3, 8, 21, 7, 15, 2"
        class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
      />
    </div>

    <div class="flex flex-wrap gap-4">
      <div>
        <label for="linq-op" class="mb-1 block text-sm font-medium text-slate-700">LINQ Operation</label>
        <select
          id="linq-op"
          bind:value={linqOp}
          class="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        >
          <option value="Where">Where (filter)</option>
          <option value="Select">Select (transform)</option>
          <option value="OrderBy">OrderBy (ascending)</option>
          <option value="OrderByDescending">OrderByDescending</option>
          <option value="Aggregate">Aggregate (sum)</option>
        </select>
      </div>
      {#if linqOp === 'Where' || linqOp === 'Select'}
        <div>
          <label for="filter-val" class="mb-1 block text-sm font-medium text-slate-700">
            {linqOp === 'Where' ? 'Greater than' : 'Multiply by'}
          </label>
          <input
            id="filter-val"
            type="number"
            bind:value={filterValue}
            class="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
          />
        </div>
      {/if}
    </div>

    <!-- Input display -->
    <div class="rounded-xl border border-slate-200 bg-white p-4">
      <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Input</p>
      <div class="flex flex-wrap gap-2">
        {#each parsedNumbers() as num}
          <span class="rounded-lg bg-slate-100 px-3 py-1 text-sm font-mono font-medium text-slate-700">{num}</span>
        {/each}
      </div>
    </div>

    <!-- Result display -->
    <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
      <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-600">Result</p>
      <div class="flex flex-wrap gap-2">
        {#each linqResult() as num}
          <span class="rounded-lg bg-purple-200 px-3 py-1 text-sm font-mono font-bold text-purple-800">{num}</span>
        {/each}
        {#if linqResult().length === 0}
          <span class="text-sm italic text-purple-400">No results</span>
        {/if}
      </div>
    </div>

    <!-- LINQ expression -->
    <div>
      <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">C# LINQ Expression</p>
      <pre class="code-block"><code>{@html `<span class="fn">int</span>[] <span class="var">numbers</span> <span class="op">=</span> { ${parsedNumbers().join(', ')} };

<span class="kw">var</span> <span class="var">result</span> <span class="op">=</span> <span class="var">${linqExpression()}</span>;

<span class="kw">foreach</span> (<span class="kw">var</span> <span class="var">item</span> <span class="kw">in</span> <span class="var">result</span>)
    <span class="fn">Console</span>.<span class="fn">WriteLine</span>(<span class="var">item</span>);
<span class="cmt">// Output: ${linqResult().join(', ')}</span>`}</code></pre>
    </div>

    <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
      <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-purple-600">How LINQ Works</h3>
      <ul class="space-y-2 text-sm text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <strong>Where</strong> filters elements that match a condition (like SQL WHERE).
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <strong>Select</strong> transforms each element (like SQL SELECT or JavaScript map).
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <strong>OrderBy</strong> sorts elements (like SQL ORDER BY).
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <strong>Aggregate</strong> reduces a collection to a single value (like JavaScript reduce).
        </li>
      </ul>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      Got it
    </button>
  </div>
</div>
{/if}

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
