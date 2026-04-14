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

  // === Basic mode: JSON Builder ===
  let personName = $state('Alice');
  let personAge = $state('28');
  let hobbies = $state<string[]>(['reading', 'hiking']);
  let newHobby = $state('');

  function addHobby() {
    const trimmed = newHobby.trim();
    if (trimmed && !hobbies.includes(trimmed)) {
      hobbies = [...hobbies, trimmed];
      newHobby = '';
    }
  }

  function removeHobby(index: number) {
    hobbies = hobbies.filter((_, i) => i !== index);
  }

  function handleHobbyKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addHobby();
    }
  }

  let basicJsonOutput = $derived(() => {
    const name = personName.trim() || 'Alice';
    const age = isNaN(Number(personAge)) ? 0 : Number(personAge);
    const obj = { name, age, hobbies };
    return JSON.stringify(obj, null, 2);
  });

  let basicJsonHighlighted = $derived(() => {
    const name = personName.trim() || 'Alice';
    const ageRaw = personAge.trim();
    const age = isNaN(Number(ageRaw)) ? '0' : ageRaw;
    const hobbyItems = hobbies
      .map((h) => `    <span class="str">"${h}"</span>`)
      .join('<span class="op">,</span>\n');
    return `<span class="op">{</span>
  <span class="str">"name"</span><span class="op">:</span> <span class="str">"${name}"</span><span class="op">,</span>
  <span class="str">"age"</span><span class="op">:</span> <span class="num">${age}</span><span class="op">,</span>
  <span class="str">"hobbies"</span><span class="op">:</span> <span class="op">[</span>
${hobbyItems}
  <span class="op">]</span>
<span class="op">}</span>`;
  });

  // === Advanced mode: Format Converter ===
  let jsonInput = $state(`{
  "name": "Alice",
  "age": 28,
  "hobbies": ["reading", "hiking"],
  "active": true
}`);

  let parseError = $state('');
  let parsedData = $derived<Record<string, unknown> | null>(() => {
    try {
      const result = JSON.parse(jsonInput);
      parseError = '';
      return result;
    } catch (e: any) {
      parseError = e.message || 'Invalid JSON';
      return null;
    }
  });

  function jsonToXml(obj: any, indent: string = '', rootTag: string = 'root'): string {
    if (obj === null || obj === undefined) return `${indent}<${rootTag} />\n`;
    if (typeof obj !== 'object') return `${indent}<${rootTag}>${escapeXml(String(obj))}</${rootTag}>\n`;
    if (Array.isArray(obj)) {
      const singularTag = rootTag.endsWith('s') ? rootTag.slice(0, -1) : 'item';
      return obj.map((item) => jsonToXml(item, indent, singularTag)).join('');
    }
    let result = `${indent}<${rootTag}>\n`;
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        result += `${indent}  <${key}>\n`;
        const singularKey = key.endsWith('s') ? key.slice(0, -1) : 'item';
        for (const item of value) {
          result += jsonToXml(item, indent + '    ', singularKey);
        }
        result += `${indent}  </${key}>\n`;
      } else if (typeof value === 'object' && value !== null) {
        result += jsonToXml(value, indent + '  ', key);
      } else {
        result += `${indent}  <${key}>${escapeXml(String(value))}</${key}>\n`;
      }
    }
    result += `${indent}</${rootTag}>\n`;
    return result;
  }

  function escapeXml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function jsonToYaml(obj: any, indent: string = ''): string {
    if (obj === null) return 'null\n';
    if (typeof obj === 'boolean') return obj ? 'true\n' : 'false\n';
    if (typeof obj === 'number') return `${obj}\n`;
    if (typeof obj === 'string') return `"${obj}"\n`;
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]\n';
      return obj
        .map((item) => {
          if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
            const entries = Object.entries(item);
            let result = `${indent}- ${entries[0][0]}: ${formatYamlValue(entries[0][1])}\n`;
            for (let i = 1; i < entries.length; i++) {
              result += `${indent}  ${entries[i][0]}: ${formatYamlValue(entries[i][1])}\n`;
            }
            return result;
          }
          return `${indent}- ${formatYamlValue(item)}\n`;
        })
        .join('');
    }
    if (typeof obj === 'object') {
      return Object.entries(obj)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${indent}${key}:\n${jsonToYaml(value, indent + '  ')}`;
          }
          if (typeof value === 'object' && value !== null) {
            return `${indent}${key}:\n${jsonToYaml(value, indent + '  ')}`;
          }
          return `${indent}${key}: ${formatYamlValue(value)}\n`;
        })
        .join('');
    }
    return String(obj) + '\n';
  }

  function formatYamlValue(v: unknown): string {
    if (v === null) return 'null';
    if (typeof v === 'boolean') return v ? 'true' : 'false';
    if (typeof v === 'number') return String(v);
    if (typeof v === 'string') return `"${v}"`;
    return String(v);
  }

  let xmlOutput = $derived(() => {
    const data = parsedData();
    if (!data) return '';
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + jsonToXml(data, '', 'root');
  });

  let yamlOutput = $derived(() => {
    const data = parsedData();
    if (!data) return '';
    return jsonToYaml(data);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: JSON Builder</h2>
    <p class="text-slate-600">
      Fill in the form fields below and watch the JSON output update in real time on the right. Add hobbies to see how arrays work in JSON.
    </p>
  </div>

  <div class="grid gap-6 lg:grid-cols-2">
    <!-- Form panel -->
    <div class="space-y-4">
      <h3 class="text-sm font-semibold text-slate-500">Your Data</h3>

      <div>
        <label for="person-name" class="mb-1 block text-sm font-semibold text-slate-700">Name</label>
        <input
          id="person-name"
          type="text"
          bind:value={personName}
          placeholder="Enter a name..."
          class="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
        />
      </div>

      <div>
        <label for="person-age" class="mb-1 block text-sm font-semibold text-slate-700">Age</label>
        <input
          id="person-age"
          type="number"
          bind:value={personAge}
          placeholder="Enter age..."
          class="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-semibold text-slate-700">Hobbies</label>
        <div class="flex flex-wrap gap-2 mb-2">
          {#each hobbies as hobby, i}
            <span class="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
              {hobby}
              <button
                onclick={() => removeHobby(i)}
                class="ml-1 text-green-500 hover:text-red-500 font-bold text-xs"
                aria-label="Remove {hobby}"
              >&times;</button>
            </span>
          {/each}
        </div>
        <div class="flex gap-2">
          <input
            type="text"
            bind:value={newHobby}
            onkeydown={handleHobbyKeydown}
            placeholder="Add a hobby..."
            class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
          />
          <button
            onclick={addHobby}
            class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95"
          >Add</button>
        </div>
      </div>
    </div>

    <!-- JSON output panel -->
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">JSON Output</h3>
      <pre class="code-block"><code>{@html basicJsonHighlighted()}</code></pre>
    </div>
  </div>

  <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-green-600">Notice the structure</h3>
    <ul class="space-y-1 text-sm text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
        The entire object is wrapped in <code class="rounded bg-slate-100 px-1 text-sm text-green-700">{"{ }"}</code> curly braces.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
        Keys are always in <code class="rounded bg-slate-100 px-1 text-sm text-green-700">"double quotes"</code>.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
        The hobbies list uses <code class="rounded bg-slate-100 px-1 text-sm text-green-700">{"[ ]"}</code> square brackets -- that is a JSON array.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
        Numbers like age have <strong>no quotes</strong> around them.
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      I've tried this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Format Converter</h2>
      <p class="text-slate-600">
        Edit the JSON on the left and see it converted to XML and YAML in real time. If the JSON is invalid, you will see an error message.
      </p>
    </div>

    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">JSON Input</h3>
      <textarea
        bind:value={jsonInput}
        rows={10}
        spellcheck={false}
        class="w-full rounded-lg border font-mono text-sm leading-relaxed p-4 focus:outline-none
          {parseError ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-slate-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200'}"
      ></textarea>
      {#if parseError}
        <p class="mt-1 text-sm font-medium text-red-600">Parse error: {parseError}</p>
      {/if}
    </div>

    {#if parsedData()}
    <div class="grid gap-6 lg:grid-cols-2">
      <!-- XML output -->
      <div>
        <h3 class="mb-2 text-sm font-semibold text-slate-500">XML Output</h3>
        <pre class="code-block text-xs"><code>{xmlOutput()}</code></pre>
      </div>

      <!-- YAML output -->
      <div>
        <h3 class="mb-2 text-sm font-semibold text-slate-500">YAML Output</h3>
        <pre class="code-block text-xs"><code>{yamlOutput()}</code></pre>
      </div>
    </div>
    {/if}

    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
      <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-green-600">Comparing the formats</h3>
      <ul class="space-y-1 text-sm text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>JSON</strong> is compact. Notice how few characters it uses compared to XML.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>XML</strong> is more verbose -- every value needs an opening and closing tag. But it is self-documenting and supports attributes.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>YAML</strong> is the most readable -- no braces, no tags, just indentation and colons.
        </li>
      </ul>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
      >
        I've tried this
      </button>
    </div>
  </div>
  {/if}
</div>

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
