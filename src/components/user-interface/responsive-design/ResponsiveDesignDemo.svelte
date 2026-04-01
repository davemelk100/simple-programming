<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Resizable preview ===
  let previewWidth = $state(375);
  const presets = [
    { label: 'Phone', width: 375 },
    { label: 'Tablet', width: 768 },
    { label: 'Desktop', width: 1024 },
  ];

  let dragging = $state(false);
  let containerRef = $state<HTMLDivElement | null>(null);

  function onPointerDown() {
    dragging = true;
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragging || !containerRef) return;
    const rect = containerRef.getBoundingClientRect();
    const newWidth = Math.max(280, Math.min(1100, e.clientX - rect.left));
    previewWidth = Math.round(newWidth);
  }

  function onPointerUp() {
    dragging = false;
  }

  // === Advanced mode: Container query demo ===
  let advPreviewWidth = $state(400);
  const advPresets = [
    { label: 'Narrow', width: 300 },
    { label: 'Medium', width: 500 },
    { label: 'Wide', width: 800 },
  ];
</script>

<svelte:window onpointermove={onPointerMove} onpointerup={onPointerUp} />

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Responsive Preview</h2>
    <p class="text-slate-600">
      Resize the preview to see how a layout adapts to different screen widths. Use the preset buttons or drag the handle.
    </p>
  </div>

  <div class="flex flex-wrap gap-2 mb-4">
    {#each presets as preset}
      <button
        onclick={() => previewWidth = preset.width}
        class="rounded-lg px-3 py-1.5 text-sm font-medium transition-all {previewWidth === preset.width ? 'bg-sky-600 text-white' : 'bg-white text-slate-600 border border-sky-200 hover:bg-sky-100'}"
      >
        {preset.label} ({preset.width}px)
      </button>
    {/each}
  </div>

  <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-6" bind:this={containerRef}>
    <p class="mb-2 text-sm font-semibold text-slate-500">Width: {previewWidth}px</p>
    <div class="relative mx-auto" style="width: {Math.min(previewWidth, 1100)}px; max-width: 100%;">
      <div class="overflow-hidden rounded-lg border-2 border-sky-300 bg-white shadow-md">
        <!-- Simulated responsive page -->
        <div class="bg-sky-600 px-4 py-3">
          <div class="flex items-center justify-between">
            <span class="font-bold text-white text-sm">MySite</span>
            {#if previewWidth >= 640}
              <div class="flex gap-4 text-sm text-sky-100">
                <span>Home</span><span>About</span><span>Contact</span>
              </div>
            {:else}
              <div class="text-white text-lg">&#9776;</div>
            {/if}
          </div>
        </div>

        <div class="p-4">
          <div class="{previewWidth >= 768 ? 'flex gap-4' : 'space-y-4'}">
            <div class="{previewWidth >= 768 ? 'flex-1' : ''}">
              <div class="rounded-lg bg-sky-50 border border-sky-200 p-4">
                <div class="h-3 w-3/4 rounded bg-sky-300 mb-2"></div>
                <div class="h-2 w-full rounded bg-sky-200 mb-1"></div>
                <div class="h-2 w-5/6 rounded bg-sky-200 mb-1"></div>
                <div class="h-2 w-2/3 rounded bg-sky-200"></div>
              </div>
            </div>
            <div class="{previewWidth >= 768 ? 'flex-1' : ''}">
              <div class="rounded-lg bg-sky-50 border border-sky-200 p-4">
                <div class="h-3 w-2/3 rounded bg-sky-300 mb-2"></div>
                <div class="h-2 w-full rounded bg-sky-200 mb-1"></div>
                <div class="h-2 w-4/5 rounded bg-sky-200 mb-1"></div>
                <div class="h-2 w-3/4 rounded bg-sky-200"></div>
              </div>
            </div>
            {#if previewWidth >= 1024}
              <div class="flex-1">
                <div class="rounded-lg bg-sky-50 border border-sky-200 p-4">
                  <div class="h-3 w-1/2 rounded bg-sky-300 mb-2"></div>
                  <div class="h-2 w-full rounded bg-sky-200 mb-1"></div>
                  <div class="h-2 w-3/4 rounded bg-sky-200 mb-1"></div>
                  <div class="h-2 w-5/6 rounded bg-sky-200"></div>
                </div>
              </div>
            {/if}
          </div>

          <div class="mt-4 {previewWidth >= 640 ? 'grid grid-cols-3 gap-2' : 'space-y-2'}">
            <div class="h-16 rounded bg-sky-100 border border-sky-200"></div>
            <div class="h-16 rounded bg-sky-100 border border-sky-200"></div>
            <div class="h-16 rounded bg-sky-100 border border-sky-200"></div>
          </div>
        </div>

        <div class="bg-slate-100 px-4 py-2 text-center text-xs text-slate-500">
          {previewWidth < 640 ? 'Mobile' : previewWidth < 768 ? 'Large Phone' : previewWidth < 1024 ? 'Tablet' : 'Desktop'} Layout
        </div>
      </div>

      <!-- Drag handle -->
      <div
        class="absolute -right-3 top-0 bottom-0 flex w-6 cursor-col-resize items-center justify-center"
        onpointerdown={onPointerDown}
      >
        <div class="h-12 w-1.5 rounded-full bg-sky-400 hover:bg-sky-600 transition-colors"></div>
      </div>
    </div>
  </div>

  <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
    <h4 class="font-bold text-slate-800 mb-2">What to Notice</h4>
    <ul class="space-y-1 text-sm text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        <span>Below 640px: Navigation collapses to a hamburger icon, cards stack vertically</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        <span>At 768px: Content sections switch from stacked to side-by-side (two columns)</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        <span>At 1024px: A third column appears, making full use of the wider screen</span>
      </li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95">
      Done exploring
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Advanced Responsive Patterns</h2>
      <p class="text-slate-600">See how modern CSS techniques create responsive layouts without traditional breakpoints.</p>
    </div>

    <div class="flex flex-wrap gap-2 mb-4">
      {#each advPresets as preset}
        <button
          onclick={() => advPreviewWidth = preset.width}
          class="rounded-lg px-3 py-1.5 text-sm font-medium transition-all {advPreviewWidth === preset.width ? 'bg-sky-600 text-white' : 'bg-white text-slate-600 border border-sky-200 hover:bg-sky-100'}"
        >
          {preset.label} ({preset.width}px)
        </button>
      {/each}
    </div>

    <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-6">
      <p class="mb-2 text-sm font-semibold text-slate-500">Container Width: {advPreviewWidth}px</p>
      <div class="mx-auto overflow-hidden rounded-lg border-2 border-sky-300 bg-white shadow-md" style="width: {Math.min(advPreviewWidth, 800)}px; max-width: 100%;">
        <div class="p-4">
          <p class="text-xs font-bold uppercase text-slate-400 mb-3">Auto-fit Grid (no breakpoints)</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.5rem;">
            {#each Array(6) as _, i}
              <div class="rounded-lg bg-sky-100 border border-sky-200 p-3 text-center text-xs font-semibold text-sky-700">
                Item {i + 1}
              </div>
            {/each}
          </div>
        </div>

        <div class="p-4 border-t border-sky-100">
          <p class="text-xs font-bold uppercase text-slate-400 mb-3">Flexbox Wrap</p>
          <div class="flex flex-wrap gap-2">
            {#each Array(4) as _, i}
              <div class="flex-1 min-w-[100px] rounded-lg bg-sky-50 border border-sky-200 p-3 text-center text-xs font-semibold text-sky-700">
                Card {i + 1}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
      <h4 class="font-bold text-slate-800 mb-2">Intrinsic Responsiveness</h4>
      <p class="text-sm text-slate-600">
        The grid uses <code class="rounded bg-sky-100 px-1">repeat(auto-fit, minmax(120px, 1fr))</code> — no media queries needed. Items wrap naturally based on available space. This is called <strong>intrinsic design</strong>: the layout responds to its own content and container, not to the viewport.
      </p>
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95">
        Done exploring
      </button>
    </div>
  </div>
  {/if}
</div>
