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

  // --- Basic mode state ---
  interface Box {
    id: number;
    label: string;
    value: string;
    highlighted: boolean;
    animating: boolean;
  }

  let boxes = $state<Box[]>([]);
  let newLabel = $state('');
  let newValue = $state('');
  let nextId = $state(0);
  let editingId = $state<number | null>(null);
  let editValue = $state('');
  let errorMsg = $state('');

  function addBox() {
    if (!newLabel.trim() || !newValue.trim()) {
      errorMsg = 'Please enter both a label and a value!';
      return;
    }
    if (boxes.some((b) => b.label === newLabel.trim())) {
      errorMsg = 'A box with that label already exists!';
      return;
    }
    errorMsg = '';
    boxes.push({ id: nextId++, label: newLabel.trim(), value: newValue.trim(), highlighted: false, animating: true });
    newLabel = '';
    newValue = '';
    setTimeout(() => {
      const last = boxes[boxes.length - 1];
      if (last) last.animating = false;
    }, 50);
  }

  function readBox(id: number) {
    for (const b of boxes) {
      b.highlighted = b.id === id;
    }
  }

  function startEdit(id: number) {
    editingId = id;
    const box = boxes.find((b) => b.id === id);
    editValue = box?.value ?? '';
  }

  function saveEdit(id: number) {
    const box = boxes.find((b) => b.id === id);
    if (box && editValue.trim()) {
      box.animating = true;
      setTimeout(() => {
        box.value = editValue.trim();
        box.animating = false;
      }, 300);
    }
    editingId = null;
    editValue = '';
  }

  // --- Advanced mode state ---
  type VarType = 'string' | 'number' | 'boolean';
  type VarKind = 'let' | 'const';

  interface AdvBox {
    id: number;
    label: string;
    value: string;
    type: VarType;
    kind: VarKind;
    highlighted: boolean;
    animating: boolean;
  }

  let advBoxes = $state<AdvBox[]>([]);
  let advLabel = $state('');
  let advValue = $state('');
  let advType = $state<VarType>('string');
  let advKind = $state<VarKind>('let');
  let advNextId = $state(0);
  let advEditingId = $state<number | null>(null);
  let advEditValue = $state('');
  let advErrorMsg = $state('');

  const typeColors: Record<VarType, { bg: string; border: string; text: string; badge: string }> = {
    string: { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-700', badge: 'bg-blue-200 text-blue-800' },
    number: { bg: 'bg-purple-50', border: 'border-purple-400', text: 'text-purple-700', badge: 'bg-purple-200 text-purple-800' },
    boolean: { bg: 'bg-emerald-50', border: 'border-emerald-400', text: 'text-emerald-700', badge: 'bg-emerald-200 text-emerald-800' },
  };

  function validateValue(val: string, type: VarType): boolean {
    if (!val.trim()) return false;
    if (type === 'number') return !isNaN(Number(val.trim()));
    if (type === 'boolean') return val.trim() === 'true' || val.trim() === 'false';
    return true;
  }

  function formatValue(val: string, type: VarType): string {
    if (type === 'string') return `"${val.trim()}"`;
    return val.trim();
  }

  function addAdvBox() {
    if (!advLabel.trim() || !advValue.trim()) {
      advErrorMsg = 'Please enter both a name and a value!';
      return;
    }
    if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(advLabel.trim())) {
      advErrorMsg = 'Variable name must be a valid identifier (letters, digits, _, $).';
      return;
    }
    if (advBoxes.some((b) => b.label === advLabel.trim())) {
      advErrorMsg = 'A variable with that name already exists!';
      return;
    }
    if (!validateValue(advValue, advType)) {
      advErrorMsg = `Invalid value for type "${advType}".`;
      return;
    }
    advErrorMsg = '';
    advBoxes.push({
      id: advNextId++,
      label: advLabel.trim(),
      value: advValue.trim(),
      type: advType,
      kind: advKind,
      highlighted: false,
      animating: true,
    });
    advLabel = '';
    advValue = '';
    setTimeout(() => {
      const last = advBoxes[advBoxes.length - 1];
      if (last) last.animating = false;
    }, 50);
  }

  function readAdvBox(id: number) {
    for (const b of advBoxes) {
      b.highlighted = b.id === id;
    }
  }

  function startAdvEdit(id: number) {
    const box = advBoxes.find((b) => b.id === id);
    if (!box || box.kind === 'const') return;
    advEditingId = id;
    advEditValue = box.value;
  }

  function saveAdvEdit(id: number) {
    const box = advBoxes.find((b) => b.id === id);
    if (box && validateValue(advEditValue, box.type)) {
      box.animating = true;
      setTimeout(() => {
        box.value = advEditValue.trim();
        box.animating = false;
      }, 300);
    }
    advEditingId = null;
    advEditValue = '';
  }

  let codePreview = $derived(
    advBoxes.length === 0
      ? '// Declare some variables above!'
      : advBoxes
          .map((b) => {
            const val = b.type === 'string' ? `"${b.value}"` : b.value;
            return `${b.kind} ${b.label}: ${b.type} = ${val};`;
          })
          .join('\n')
  );
</script>

{#if !advanced}
<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Storage Boxes</h2>
    <p class="text-slate-600">Create your own labeled boxes, read their values, and update them!</p>
  </div>

  <!-- Create new box -->
  <div class="flex max-w-md flex-col items-center gap-3 rounded-xl bg-blue-50 p-5">
    <div class="flex w-full flex-col gap-2 sm:flex-row">
      <input
        type="text"
        bind:value={newLabel}
        placeholder="Label (e.g. name)"
        class="min-w-0 flex-1 rounded-lg border border-blue-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      />
      <input
        type="text"
        bind:value={newValue}
        placeholder="Value (e.g. Alice)"
        class="min-w-0 flex-1 rounded-lg border border-blue-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      />
    </div>
    <button
      onclick={addBox}
      class="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow transition-all hover:bg-blue-700 active:scale-95"
    >
      Store
    </button>
    {#if errorMsg}
      <p class="text-xs text-red-500">{errorMsg}</p>
    {/if}
  </div>

  <!-- Boxes display -->
  <div class="flex flex-wrap justify-center gap-4">
    {#each boxes as box (box.id)}
      <div
        class="relative flex h-32 w-36 flex-col items-center justify-center rounded-xl border-2 border-dashed shadow-md transition-all duration-500 cursor-pointer hover:scale-105
          {box.highlighted ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-300' : 'border-blue-300 bg-white'}
          {box.animating ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}"
        onclick={() => readBox(box.id)}
        ondblclick={() => startEdit(box.id)}
        role="button"
        tabindex="0"
      >
        <div class="absolute -top-3 rounded-full border border-blue-300 bg-white px-3 py-0.5 text-xs font-bold text-blue-700 shadow-sm">
          {box.label}
        </div>

        {#if editingId === box.id}
          <input
            type="text"
            bind:value={editValue}
            onkeydown={(e) => e.key === 'Enter' && saveEdit(box.id)}
            class="w-24 rounded border border-blue-400 px-2 py-1 text-center text-sm focus:outline-none"
            autofocus
          />
          <button
            onclick={(e) => { e.stopPropagation(); saveEdit(box.id); }}
            class="mt-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            Save
          </button>
        {:else}
          <span class="text-lg font-bold text-blue-700 transition-all duration-300">{box.value}</span>
        {/if}

        {#if box.highlighted && editingId !== box.id}
          <span class="mt-1 text-xs text-yellow-600 font-medium">Reading...</span>
        {/if}
      </div>
    {/each}

    {#if boxes.length === 0}
      <div class="flex h-32 w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-500">
        No boxes yet! Create one above.
      </div>
    {/if}
  </div>

  {#if boxes.length > 0}
    <p class="text-xs text-slate-500">Click a box to read its value. Double-click to edit.</p>
  {/if}

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      I've tried this
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Typed Variables</h2>
    <p class="text-slate-600">Declare variables with types and mutability. Use <code class="rounded bg-slate-100 px-1 font-mono text-sm">let</code> for mutable and <code class="rounded bg-slate-100 px-1 font-mono text-sm">const</code> for immutable.</p>
  </div>

  <!-- Create new variable -->
  <div class="flex max-w-xl flex-col items-center gap-3 rounded-xl bg-blue-50 p-5">
    <div class="flex w-full flex-wrap gap-2">
      <select
        bind:value={advKind}
        class="rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm font-mono font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      >
        <option value="let">let</option>
        <option value="const">const</option>
      </select>
      <input
        type="text"
        bind:value={advLabel}
        placeholder="name (e.g. score)"
        class="flex-1 rounded-lg border border-blue-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      />
      <select
        bind:value={advType}
        class="rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      >
        <option value="string">string</option>
        <option value="number">number</option>
        <option value="boolean">boolean</option>
      </select>
      <input
        type="text"
        bind:value={advValue}
        placeholder={advType === 'boolean' ? 'true or false' : advType === 'number' ? '42' : 'hello'}
        class="flex-1 rounded-lg border border-blue-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      />
    </div>
    <button
      onclick={addAdvBox}
      class="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow transition-all hover:bg-blue-700 active:scale-95"
    >
      Declare
    </button>
    {#if advErrorMsg}
      <p class="text-xs text-red-500">{advErrorMsg}</p>
    {/if}
  </div>

  <!-- Two-column layout: boxes + code preview -->
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <!-- Boxes display -->
    <div>
      <div class="flex flex-wrap justify-center gap-4">
        {#each advBoxes as box (box.id)}
          {@const colors = typeColors[box.type]}
          <div
            class="relative flex h-36 w-40 flex-col items-center justify-center rounded-xl border-2 shadow-md transition-all duration-500 cursor-pointer hover:scale-105
              {box.kind === 'const' ? 'border-solid' : 'border-dashed'}
              {box.highlighted ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-300' : `${colors.border} ${colors.bg}`}
              {box.animating ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}"
            onclick={() => readAdvBox(box.id)}
            ondblclick={() => startAdvEdit(box.id)}
            role="button"
            tabindex="0"
          >
            <!-- Variable name label -->
            <div class="absolute -top-3 rounded-full border {colors.border} bg-white px-3 py-0.5 text-xs font-bold {colors.text} shadow-sm font-mono">
              {box.label}
            </div>

            <!-- Type badge -->
            <div class="absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[10px] font-bold {colors.badge}">
              {box.type}
            </div>

            <!-- Kind indicator -->
            <div class="absolute top-1 right-1.5 text-[10px] font-bold {box.kind === 'const' ? 'text-red-500' : 'text-green-600'} font-mono">
              {box.kind}
            </div>

            {#if advEditingId === box.id}
              <input
                type="text"
                bind:value={advEditValue}
                onkeydown={(e) => e.key === 'Enter' && saveAdvEdit(box.id)}
                class="w-24 rounded border {colors.border} px-2 py-1 text-center text-sm focus:outline-none"
                autofocus
              />
              <button
                onclick={(e) => { e.stopPropagation(); saveAdvEdit(box.id); }}
                class="mt-1 text-xs font-semibold {colors.text}"
              >
                Save
              </button>
            {:else}
              <span class="text-lg font-bold {colors.text} transition-all duration-300 font-mono">
                {box.type === 'string' ? `"${box.value}"` : box.value}
              </span>
            {/if}

            {#if box.highlighted && advEditingId !== box.id}
              <span class="mt-1 text-xs text-yellow-600 font-medium">Reading...</span>
            {/if}

            {#if box.kind === 'const'}
              <span class="absolute bottom-5 text-[9px] text-red-400">immutable</span>
            {/if}
          </div>
        {/each}

        {#if advBoxes.length === 0}
          <div class="flex h-36 w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-500">
            No variables yet! Declare one above.
          </div>
        {/if}
      </div>

      {#if advBoxes.length > 0}
        <p class="mt-3 text-xs text-slate-500">Click to read. Double-click to reassign (<code class="font-mono">let</code> only). <code class="font-mono">const</code> boxes cannot be changed.</p>
      {/if}
    </div>

    <!-- Code preview -->
    <div class="rounded-xl border border-slate-200 bg-slate-900 p-4 shadow-inner">
      <div class="mb-2 flex items-center gap-2">
        <span class="inline-block h-3 w-3 rounded-full bg-red-400"></span>
        <span class="inline-block h-3 w-3 rounded-full bg-yellow-400"></span>
        <span class="inline-block h-3 w-3 rounded-full bg-green-400"></span>
        <span class="ml-2 text-xs text-slate-400">Code Preview</span>
      </div>
      <pre class="overflow-x-auto font-mono text-sm leading-relaxed text-slate-100 whitespace-pre-wrap">{codePreview}</pre>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      I've tried this
    </button>
  </div>
</div>
{/if}
