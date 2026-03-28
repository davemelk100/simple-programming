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

  // === Basic mode: Indent It Right ===
  interface IndentLine {
    text: string;
    correctIndent: number;
    currentIndent: number;
  }

  interface IndentSnippet {
    title: string;
    lines: IndentLine[];
    solved: boolean;
  }

  let snippets = $state<IndentSnippet[]>([
    {
      title: '1. Simple If Statement',
      lines: [
        { text: 'if temperature > 100:', correctIndent: 0, currentIndent: 0 },
        { text: 'print("Too hot!")', correctIndent: 1, currentIndent: 0 },
        { text: 'print("Be careful")', correctIndent: 1, currentIndent: 0 },
      ],
      solved: false,
    },
    {
      title: '2. If / Else',
      lines: [
        { text: 'if age >= 18:', correctIndent: 0, currentIndent: 0 },
        { text: 'print("Adult")', correctIndent: 1, currentIndent: 0 },
        { text: 'can_vote = True', correctIndent: 1, currentIndent: 0 },
        { text: 'else:', correctIndent: 0, currentIndent: 0 },
        { text: 'print("Minor")', correctIndent: 1, currentIndent: 0 },
        { text: 'can_vote = False', correctIndent: 1, currentIndent: 0 },
      ],
      solved: false,
    },
    {
      title: '3. Nested Loop with If',
      lines: [
        { text: 'for row in range(3):', correctIndent: 0, currentIndent: 0 },
        { text: 'for col in range(3):', correctIndent: 1, currentIndent: 0 },
        { text: 'if row == col:', correctIndent: 2, currentIndent: 0 },
        { text: 'print("diagonal")', correctIndent: 3, currentIndent: 0 },
        { text: 'else:', correctIndent: 2, currentIndent: 0 },
        { text: 'print("off")', correctIndent: 3, currentIndent: 0 },
        { text: 'print("row done")', correctIndent: 1, currentIndent: 0 },
      ],
      solved: false,
    },
  ]);

  function addIndent(snippetIdx: number, lineIdx: number) {
    if (snippets[snippetIdx].solved) return;
    if (snippets[snippetIdx].lines[lineIdx].currentIndent < 4) {
      snippets[snippetIdx].lines[lineIdx].currentIndent++;
      checkSnippet(snippetIdx);
    }
  }

  function removeIndent(snippetIdx: number, lineIdx: number) {
    if (snippets[snippetIdx].solved) return;
    if (snippets[snippetIdx].lines[lineIdx].currentIndent > 0) {
      snippets[snippetIdx].lines[lineIdx].currentIndent--;
      checkSnippet(snippetIdx);
    }
  }

  function checkSnippet(idx: number) {
    const allCorrect = snippets[idx].lines.every(
      (line) => line.currentIndent === line.correctIndent
    );
    snippets[idx].solved = allCorrect;
  }

  let allSnippetsSolved = $derived(snippets.every((s) => s.solved));

  // === Advanced mode: Format Translator ===
  interface KVPair {
    key: string;
    value: string;
    type: 'string' | 'number' | 'boolean';
  }

  let pairs = $state<KVPair[]>([
    { key: 'name', value: 'My App', type: 'string' },
    { key: 'version', value: '2.1', type: 'number' },
    { key: 'debug', value: 'true', type: 'boolean' },
  ]);

  let nestedKey = $state('database');
  let nestedPairs = $state<KVPair[]>([
    { key: 'host', value: 'localhost', type: 'string' },
    { key: 'port', value: '5432', type: 'number' },
  ]);

  function addPair() {
    pairs = [...pairs, { key: '', value: '', type: 'string' }];
  }

  function removePair(idx: number) {
    pairs = pairs.filter((_, i) => i !== idx);
  }

  function formatValue(val: string, type: 'string' | 'number' | 'boolean'): string {
    if (type === 'number') return val;
    if (type === 'boolean') return val;
    return `"${val}"`;
  }

  function yamlValue(val: string, type: 'string' | 'number' | 'boolean'): string {
    if (type === 'number') return val;
    if (type === 'boolean') return val;
    return val;
  }

  let yamlOutput = $derived(() => {
    let lines: string[] = [];
    for (const p of pairs) {
      if (!p.key) continue;
      lines.push(`${p.key}: ${yamlValue(p.value, p.type)}`);
    }
    if (nestedKey) {
      lines.push(`${nestedKey}:`);
      for (const p of nestedPairs) {
        if (!p.key) continue;
        lines.push(`  ${p.key}: ${yamlValue(p.value, p.type)}`);
      }
    }
    return lines.join('\n');
  });

  let jsonOutput = $derived(() => {
    const obj: Record<string, unknown> = {};
    for (const p of pairs) {
      if (!p.key) continue;
      if (p.type === 'number') obj[p.key] = Number(p.value) || 0;
      else if (p.type === 'boolean') obj[p.key] = p.value === 'true';
      else obj[p.key] = p.value;
    }
    if (nestedKey) {
      const nested: Record<string, unknown> = {};
      for (const p of nestedPairs) {
        if (!p.key) continue;
        if (p.type === 'number') nested[p.key] = Number(p.value) || 0;
        else if (p.type === 'boolean') nested[p.key] = p.value === 'true';
        else nested[p.key] = p.value;
      }
      obj[nestedKey] = nested;
    }
    return JSON.stringify(obj, null, 2);
  });

  let pythonOutput = $derived(() => {
    let lines: string[] = ['{'];
    for (const p of pairs) {
      if (!p.key) continue;
      lines.push(`    "${p.key}": ${formatValue(p.value, p.type)},`);
    }
    if (nestedKey) {
      lines.push(`    "${nestedKey}": {`);
      for (const p of nestedPairs) {
        if (!p.key) continue;
        lines.push(`        "${p.key}": ${formatValue(p.value, p.type)},`);
      }
      lines.push('    },');
    }
    lines.push('}');
    return lines.join('\n');
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Indent It Right</h2>
    <p class="text-slate-600">
      These Python snippets have lost their indentation! Use the <strong>+</strong> and <strong>-</strong> buttons to add or remove indent levels for each line. When the indentation is correct, the snippet turns green.
    </p>
  </div>

  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <p class="text-sm text-slate-600">
      Each <strong>+</strong> adds one level of indentation (4 spaces). In Python, code inside an <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">if</code>, <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">for</code>, or <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">else</code> block must be indented one level deeper than the line with the colon.
    </p>
  </div>

  {#each snippets as snippet, si}
    <div class="space-y-3">
      <h3 class="text-lg font-bold text-slate-800">{snippet.title}</h3>
      <div class="rounded-xl border-2 p-4 transition-colors {snippet.solved ? 'border-green-300 bg-green-50' : 'border-slate-200 bg-white'}">
        {#each snippet.lines as line, li}
          <div class="flex items-center gap-2 py-1">
            <button
              onclick={() => removeIndent(si, li)}
              disabled={snippet.solved || line.currentIndent === 0}
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-slate-200 font-bold text-slate-600 hover:bg-slate-300 disabled:opacity-30"
            >-</button>
            <button
              onclick={() => addIndent(si, li)}
              disabled={snippet.solved || line.currentIndent >= 4}
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-slate-200 font-bold text-slate-600 hover:bg-slate-300 disabled:opacity-30"
            >+</button>
            <div class="flex items-center font-mono text-sm">
              {#each Array(line.currentIndent) as _, indentIdx}
                <span
                  class="inline-block h-6 w-8 rounded-sm {line.currentIndent === line.correctIndent ? 'bg-green-200' : 'bg-purple-200'}"
                ></span>
              {/each}
              <span class="{snippet.solved ? 'text-green-700' : 'text-slate-700'}">{line.text}</span>
            </div>
          </div>
        {/each}
        {#if snippet.solved}
          <p class="mt-2 text-sm font-semibold text-green-600">Correct! The indentation is right.</p>
        {/if}
      </div>
    </div>
  {/each}

  {#if allSnippetsSolved}
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center">
      <p class="mb-3 text-lg font-bold text-green-700">All snippets correctly indented!</p>
      <p class="text-slate-600">You have a feel for how Python uses indentation to define code blocks.</p>
    </div>
  {/if}

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
      {allSnippetsSolved ? 'Continue' : "I've tried this"}
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Format Translator</h2>
    <p class="text-slate-600">
      Enter key-value pairs below and see the same data represented in YAML (indentation-based), JSON (braces-based), and as a Python dict literal. Notice how YAML uses <strong>indentation alone</strong> to express the nested structure that JSON and Python express with braces.
    </p>
  </div>

  <!-- Input form -->
  <div class="space-y-4 rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 class="font-bold text-slate-800">Top-level pairs</h3>
    {#each pairs as pair, i}
      <div class="flex flex-wrap items-center gap-2">
        <input
          type="text"
          bind:value={pair.key}
          placeholder="key"
          class="w-32 rounded-lg border border-purple-300 bg-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        />
        <input
          type="text"
          bind:value={pair.value}
          placeholder="value"
          class="w-40 rounded-lg border border-purple-300 bg-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        />
        <select
          bind:value={pair.type}
          class="rounded-lg border border-purple-300 bg-white px-2 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        >
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="boolean">boolean</option>
        </select>
        <button onclick={() => removePair(i)} class="text-sm text-red-500 hover:text-red-700">remove</button>
      </div>
    {/each}
    <button onclick={addPair} class="text-sm font-semibold text-purple-600 hover:text-purple-800">+ Add pair</button>

    <h3 class="mt-4 font-bold text-slate-800">Nested group</h3>
    <input
      type="text"
      bind:value={nestedKey}
      placeholder="group name"
      class="w-40 rounded-lg border border-purple-300 bg-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
    />
    {#each nestedPairs as np, i}
      <div class="ml-6 flex flex-wrap items-center gap-2">
        <input
          type="text"
          bind:value={np.key}
          placeholder="key"
          class="w-32 rounded-lg border border-purple-300 bg-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        />
        <input
          type="text"
          bind:value={np.value}
          placeholder="value"
          class="w-40 rounded-lg border border-purple-300 bg-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        />
        <select
          bind:value={np.type}
          class="rounded-lg border border-purple-300 bg-white px-2 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        >
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="boolean">boolean</option>
        </select>
      </div>
    {/each}
  </div>

  <!-- Outputs side by side -->
  <div class="grid gap-4 lg:grid-cols-3">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-purple-600">YAML (indentation-based)</h3>
      <div class="relative">
        <pre class="code-block h-full"><code>{@html (() => {
          const y = yamlOutput();
          return y.split('\n').map(line => {
            const leadingSpaces = line.match(/^(\s*)/)?.[1] || '';
            const rest = line.slice(leadingSpaces.length);
            const highlighted = leadingSpaces ? `<span style="background:rgba(168,85,247,0.15)">${leadingSpaces}</span>` : '';
            const parts = rest.split(': ');
            if (parts.length >= 2) {
              return `${highlighted}<span class="var">${parts[0]}</span><span class="op">:</span> <span class="str">${parts.slice(1).join(': ')}</span>`;
            }
            return `${highlighted}<span class="var">${rest}</span>`;
          }).join('\n');
        })()}</code></pre>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">JSON (braces)</h3>
      <pre class="code-block h-full"><code>{@html (() => {
        return jsonOutput()
          .replace(/(".*?"):/g, '<span class="var">$1</span><span class="op">:</span>')
          .replace(/: (".*?")/g, ': <span class="str">$1</span>')
          .replace(/: (\d+)/g, ': <span class="num">$1</span>')
          .replace(/: (true|false)/g, ': <span class="kw">$1</span>')
          .replace(/[{}]/g, '<span class="op">$&</span>');
      })()}</code></pre>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Python dict</h3>
      <pre class="code-block h-full"><code>{@html (() => {
        return pythonOutput()
          .replace(/(".*?"):/g, '<span class="var">$1</span><span class="op">:</span>')
          .replace(/: (".*?")/g, ': <span class="str">$1</span>')
          .replace(/: (\d[\d.]*)/g, ': <span class="num">$1</span>')
          .replace(/: (True|False)/g, ': <span class="kw">$1</span>')
          .replace(/[{}]/g, '<span class="op">$&</span>');
      })()}</code></pre>
    </div>
  </div>

  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <p class="text-sm text-slate-600">
      Notice how the YAML version uses <strong>no braces at all</strong>. The nested group is expressed purely through indentation (the highlighted purple spaces). JSON and Python need opening and closing braces to achieve the same nesting. All three represent identical data -- the only difference is how structure is communicated.
    </p>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
      I've explored the formats
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
