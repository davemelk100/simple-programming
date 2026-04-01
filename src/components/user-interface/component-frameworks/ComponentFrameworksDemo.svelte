<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Component tree builder ===
  interface ChildComponent {
    id: number;
    color: string;
    text: string;
  }

  let nextId = $state(1);
  const colors = ['bg-red-200 border-red-400', 'bg-blue-200 border-blue-400', 'bg-green-200 border-green-400', 'bg-yellow-200 border-yellow-400', 'bg-purple-200 border-purple-400', 'bg-pink-200 border-pink-400'];
  const labels = ['Button', 'Card', 'Badge', 'Avatar', 'Alert', 'Tag'];
  let children = $state<ChildComponent[]>([
    { id: 0, color: colors[0], text: labels[0] },
  ]);

  function addChild() {
    const idx = nextId % colors.length;
    children = [...children, { id: nextId, color: colors[idx], text: labels[idx] }];
    nextId++;
  }

  function removeChild(id: number) {
    children = children.filter(c => c.id !== id);
  }

  function cycleColor(id: number) {
    children = children.map(c => {
      if (c.id !== id) return c;
      const idx = (colors.indexOf(c.color) + 1) % colors.length;
      return { ...c, color: colors[idx], text: labels[idx] };
    });
  }

  // === Advanced mode: Nested component tree with prop drilling ===
  interface TreeNode {
    id: number;
    label: string;
    color: string;
    children: TreeNode[];
  }

  let advNextId = $state(100);
  let tree = $state<TreeNode>({
    id: 0, label: 'App', color: 'bg-indigo-100 border-indigo-400',
    children: [
      { id: 1, label: 'Header', color: 'bg-blue-100 border-blue-400', children: [
        { id: 2, label: 'Logo', color: 'bg-blue-200 border-blue-400', children: [] },
        { id: 3, label: 'Nav', color: 'bg-blue-200 border-blue-400', children: [] },
      ]},
      { id: 4, label: 'Main', color: 'bg-green-100 border-green-400', children: [
        { id: 5, label: 'Sidebar', color: 'bg-green-200 border-green-400', children: [] },
        { id: 6, label: 'Content', color: 'bg-green-200 border-green-400', children: [] },
      ]},
    ],
  });

  let selectedTheme = $state('indigo');
  const themes: Record<string, { bg: string; border: string }> = {
    indigo: { bg: 'bg-indigo-100', border: 'border-indigo-400' },
    rose: { bg: 'bg-rose-100', border: 'border-rose-400' },
    emerald: { bg: 'bg-emerald-100', border: 'border-emerald-400' },
  };

  function addNodeChild(parentId: number) {
    function addTo(node: TreeNode): TreeNode {
      if (node.id === parentId) {
        return { ...node, children: [...node.children, { id: advNextId++, label: 'New', color: 'bg-gray-200 border-gray-400', children: [] }] };
      }
      return { ...node, children: node.children.map(addTo) };
    }
    tree = addTo(tree);
  }

  function removeNode(nodeId: number) {
    function removeFrom(node: TreeNode): TreeNode {
      return { ...node, children: node.children.filter(c => c.id !== nodeId).map(removeFrom) };
    }
    tree = removeFrom(tree);
  }
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Build a Component Tree</h2>
    <p class="text-slate-600">
      A real UI is a tree of components. Below is a parent component containing child components. Add, remove, and change their "props" (color and type) to see how components work together.
    </p>
  </div>

  <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-6 space-y-4">
    <div class="rounded-lg border-2 border-indigo-400 bg-indigo-100 p-4">
      <p class="text-xs font-bold uppercase text-indigo-600 mb-3">Parent Component: &lt;App /&gt;</p>

      <div class="flex flex-wrap gap-3 min-h-[60px]">
        {#each children as child (child.id)}
          <div class="rounded-lg border-2 {child.color} p-3 text-center transition-all duration-300">
            <p class="text-xs font-bold uppercase text-slate-600 mb-1">&lt;{child.text} /&gt;</p>
            <div class="flex gap-1 mt-2">
              <button onclick={() => cycleColor(child.id)}
                class="rounded bg-white/60 px-2 py-0.5 text-xs text-slate-600 hover:bg-white active:scale-95" title="Change prop">
                Change
              </button>
              <button onclick={() => removeChild(child.id)}
                class="rounded bg-white/60 px-2 py-0.5 text-xs text-red-600 hover:bg-white active:scale-95" title="Remove component">
                Remove
              </button>
            </div>
          </div>
        {/each}

        {#if children.length === 0}
          <p class="text-sm text-slate-400 italic">No child components. Click "Add Component" to start building!</p>
        {/if}
      </div>

      <button onclick={addChild}
        class="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95">
        + Add Component
      </button>
    </div>

    <div class="rounded-lg bg-white p-4 border border-indigo-200">
      <p class="text-xs font-bold uppercase text-slate-500 mb-1">What is happening</p>
      <p class="text-sm text-slate-600">
        The parent <code>&lt;App&gt;</code> manages a list of children in its <strong>state</strong>. Each child receives <strong>props</strong> (color and text) from the parent. When you click "Change," the parent updates the props and the child re-renders. This is the core pattern of every component framework.
      </p>
    </div>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      Done exploring
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Nested Component Tree & Prop Drilling</h2>
      <p class="text-slate-600">Real apps have deeply nested component trees. Click nodes to add children or remove them. The theme prop is passed from the root down to every descendant — this is called <strong>prop drilling</strong>.</p>
    </div>

    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-6 space-y-4">
      <div class="flex gap-2 mb-2">
        <p class="text-sm font-semibold text-slate-700 self-center">Theme prop:</p>
        {#each Object.keys(themes) as theme}
          <button onclick={() => selectedTheme = theme}
            class="rounded-lg px-3 py-1 text-sm font-medium transition-all {selectedTheme === theme ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-indigo-200 hover:bg-indigo-100'}">
            {theme}
          </button>
        {/each}
      </div>

      {#snippet renderNode(node: TreeNode, depth: number)}
        <div class="ml-{depth > 0 ? '4' : '0'} mt-2">
          <div class="rounded-lg border-2 {themes[selectedTheme].border} {themes[selectedTheme].bg} p-3 transition-all duration-300" style="margin-left: {depth * 16}px">
            <div class="flex items-center justify-between gap-2">
              <p class="text-xs font-bold uppercase text-slate-600">&lt;{node.label} theme="{selectedTheme}" /&gt;</p>
              <div class="flex gap-1">
                <button onclick={() => addNodeChild(node.id)}
                  class="rounded bg-white/60 px-2 py-0.5 text-xs text-slate-600 hover:bg-white active:scale-95">+ Child</button>
                {#if node.id !== 0}
                  <button onclick={() => removeNode(node.id)}
                    class="rounded bg-white/60 px-2 py-0.5 text-xs text-red-600 hover:bg-white active:scale-95">Remove</button>
                {/if}
              </div>
            </div>
            {#if node.children.length > 0}
              <div class="mt-2 space-y-1">
                {#each node.children as child (child.id)}
                  {@render renderNode(child, depth + 1)}
                {/each}
              </div>
            {/if}
          </div>
        </div>
      {/snippet}

      {@render renderNode(tree, 0)}

      <div class="rounded-lg bg-white p-4 border border-indigo-200">
        <p class="text-xs font-bold uppercase text-slate-500 mb-1">Prop Drilling</p>
        <p class="text-sm text-slate-600">
          Notice how changing the theme at the top updates every node. The theme prop is passed from parent to child at every level. In large apps, this gets tedious — which is why frameworks offer <strong>context</strong> (React), <strong>stores</strong> (Svelte), or <strong>provide/inject</strong> (Vue) to skip levels.
        </p>
      </div>
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
        Done exploring
      </button>
    </div>
  </div>
  {/if}
</div>
