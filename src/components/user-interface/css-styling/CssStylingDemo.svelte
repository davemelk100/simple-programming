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

  // === Basic mode: Live CSS Playground ===
  let bgColor = $state('#3b82f6');
  let textColor = $state('#ffffff');
  let fontSize = $state(18);
  let padding = $state(20);
  let borderRadius = $state(8);

  let previewStyle = $derived(
    `background-color: ${bgColor}; color: ${textColor}; font-size: ${fontSize}px; padding: ${padding}px; border-radius: ${borderRadius}px;`
  );

  let generatedCss = $derived(
    `.my-box {\n  background-color: ${bgColor};\n  color: ${textColor};\n  font-size: ${fontSize}px;\n  padding: ${padding}px;\n  border-radius: ${borderRadius}px;\n}`
  );

  // === Advanced mode: Flexbox Layout Builder ===
  let flexDirection = $state('row');
  let justifyContent = $state('flex-start');
  let alignItems = $state('stretch');
  let flexWrap = $state('nowrap');
  let gap = $state(10);
  let itemCount = $state(4);

  let flexContainerStyle = $derived(
    `display: flex; flex-direction: ${flexDirection}; justify-content: ${justifyContent}; align-items: ${alignItems}; flex-wrap: ${flexWrap}; gap: ${gap}px; min-height: 200px; padding: 16px; background: #f1f5f9; border-radius: 12px; border: 2px dashed #94a3b8;`
  );

  let advGeneratedCss = $derived(
    `.flex-container {\n  display: flex;\n  flex-direction: ${flexDirection};\n  justify-content: ${justifyContent};\n  align-items: ${alignItems};\n  flex-wrap: ${flexWrap};\n  gap: ${gap}px;\n}`
  );

  const itemColors = ['bg-sky-400', 'bg-blue-400', 'bg-indigo-400', 'bg-violet-400', 'bg-purple-400', 'bg-fuchsia-400'];
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: CSS Playground</h2>
    <p class="text-slate-600">Adjust the sliders and color pickers below to see CSS properties update a live preview in real time.</p>
  </div>

  <!-- Controls -->
  <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
    <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-sky-600">CSS Controls</h3>
    <div class="grid gap-4 md:grid-cols-2">
      <!-- Background color -->
      <div>
        <label class="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500" for="bg-color">background-color</label>
        <div class="flex items-center gap-2">
          <input id="bg-color" type="color" bind:value={bgColor} class="h-8 w-10 cursor-pointer rounded border border-slate-300" />
          <code class="text-sm text-slate-600">{bgColor}</code>
        </div>
      </div>

      <!-- Text color -->
      <div>
        <label class="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500" for="text-color">color</label>
        <div class="flex items-center gap-2">
          <input id="text-color" type="color" bind:value={textColor} class="h-8 w-10 cursor-pointer rounded border border-slate-300" />
          <code class="text-sm text-slate-600">{textColor}</code>
        </div>
      </div>

      <!-- Font size -->
      <div>
        <label class="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500" for="font-size">font-size: {fontSize}px</label>
        <input id="font-size" type="range" min="10" max="48" bind:value={fontSize} class="w-full accent-sky-600" />
      </div>

      <!-- Padding -->
      <div>
        <label class="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500" for="padding">padding: {padding}px</label>
        <input id="padding" type="range" min="0" max="60" bind:value={padding} class="w-full accent-sky-600" />
      </div>

      <!-- Border radius -->
      <div class="md:col-span-2">
        <label class="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500" for="border-radius">border-radius: {borderRadius}px</label>
        <input id="border-radius" type="range" min="0" max="50" bind:value={borderRadius} class="w-full accent-sky-600" />
      </div>
    </div>
  </div>

  <!-- Preview and code side by side -->
  <div class="grid gap-4 md:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Live Preview</h3>
      <div class="flex min-h-[160px] items-center justify-center rounded-xl border-2 border-slate-200 bg-white p-4">
        <div style={previewStyle} class="text-center font-semibold shadow-lg transition-all duration-200">
          Hello, CSS!
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Generated CSS</h3>
      <pre class="code-block"><code>{generatedCss}</code></pre>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95"
    >
      Done exploring
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Flexbox Layout Builder</h2>
      <p class="text-slate-600">Experiment with flexbox properties to understand how items are positioned and distributed within a flex container.</p>
    </div>

    <!-- Controls -->
    <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
      <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-sky-600">Flexbox Controls</h3>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label class="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500" for="flex-dir">flex-direction</label>
          <select id="flex-dir" bind:value={flexDirection} class="w-full rounded-lg border border-sky-300 bg-white px-3 py-2 text-sm font-mono focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none">
            <option value="row">row</option>
            <option value="row-reverse">row-reverse</option>
            <option value="column">column</option>
            <option value="column-reverse">column-reverse</option>
          </select>
        </div>

        <div>
          <label class="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500" for="justify">justify-content</label>
          <select id="justify" bind:value={justifyContent} class="w-full rounded-lg border border-sky-300 bg-white px-3 py-2 text-sm font-mono focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none">
            <option value="flex-start">flex-start</option>
            <option value="flex-end">flex-end</option>
            <option value="center">center</option>
            <option value="space-between">space-between</option>
            <option value="space-around">space-around</option>
            <option value="space-evenly">space-evenly</option>
          </select>
        </div>

        <div>
          <label class="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500" for="align">align-items</label>
          <select id="align" bind:value={alignItems} class="w-full rounded-lg border border-sky-300 bg-white px-3 py-2 text-sm font-mono focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none">
            <option value="stretch">stretch</option>
            <option value="flex-start">flex-start</option>
            <option value="flex-end">flex-end</option>
            <option value="center">center</option>
            <option value="baseline">baseline</option>
          </select>
        </div>

        <div>
          <label class="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500" for="wrap">flex-wrap</label>
          <select id="wrap" bind:value={flexWrap} class="w-full rounded-lg border border-sky-300 bg-white px-3 py-2 text-sm font-mono focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none">
            <option value="nowrap">nowrap</option>
            <option value="wrap">wrap</option>
            <option value="wrap-reverse">wrap-reverse</option>
          </select>
        </div>

        <div>
          <label class="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500" for="adv-gap">gap: {gap}px</label>
          <input id="adv-gap" type="range" min="0" max="40" bind:value={gap} class="w-full accent-sky-600" />
        </div>

        <div>
          <label class="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500" for="items">items: {itemCount}</label>
          <input id="items" type="range" min="1" max="6" bind:value={itemCount} class="w-full accent-sky-600" />
        </div>
      </div>
    </div>

    <!-- Flex preview -->
    <div>
      <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Live Preview</h3>
      <div style={flexContainerStyle}>
        {#each Array(itemCount) as _, i}
          <div class="flex h-14 w-20 items-center justify-center rounded-lg text-sm font-bold text-white shadow {itemColors[i % itemColors.length]}">
            {i + 1}
          </div>
        {/each}
      </div>
    </div>

    <!-- Generated code -->
    <div>
      <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Generated CSS</h3>
      <pre class="code-block"><code>{advGeneratedCss}</code></pre>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95"
      >
        Done exploring
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
    color: #e2e8f0;
  }
</style>
