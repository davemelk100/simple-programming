<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

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
</script>

<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Storage Boxes</h2>
    <p class="text-slate-600">Create your own labeled boxes, read their values, and update them!</p>
  </div>

  <!-- Create new box -->
  <div class="flex max-w-md flex-col items-center gap-3 rounded-xl bg-blue-50 p-5">
    <div class="flex w-full gap-2">
      <input
        type="text"
        bind:value={newLabel}
        placeholder="Label (e.g. name)"
        class="flex-1 rounded-lg border border-blue-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      />
      <input
        type="text"
        bind:value={newValue}
        placeholder="Value (e.g. Alice)"
        class="flex-1 rounded-lg border border-blue-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
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
