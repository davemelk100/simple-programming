<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic: Project Explorer ===
  interface TreeNode {
    name: string;
    type: 'folder' | 'file';
    description: string;
    children?: TreeNode[];
    expanded?: boolean;
  }

  let projectTree = $state<TreeNode[]>([
    {
      name: 'my-app/',
      type: 'folder',
      description: 'The root of your project. Everything lives inside here.',
      expanded: true,
      children: [
        {
          name: 'src/',
          type: 'folder',
          description: 'Source code directory. All your application code goes here.',
          expanded: false,
          children: [
            {
              name: 'components/',
              type: 'folder',
              description: 'Reusable UI components like buttons, cards, and navigation bars.',
              expanded: false,
              children: [
                { name: 'Header.tsx', type: 'file', description: 'The top navigation bar component. Imported on every page.' },
                { name: 'Button.tsx', type: 'file', description: 'A reusable button component with variants (primary, secondary, danger).' },
              ],
            },
            {
              name: 'lib/',
              type: 'folder',
              description: 'Shared utility functions and helpers used across the app.',
              expanded: false,
              children: [
                { name: 'utils.ts', type: 'file', description: 'Helper functions like date formatting, string manipulation, etc.' },
                { name: 'db.ts', type: 'file', description: 'Database connection setup and query helpers.' },
              ],
            },
            { name: 'app/', type: 'folder', description: 'Pages and routes. Each folder becomes a URL path.', expanded: false, children: [
              { name: 'page.tsx', type: 'file', description: 'The home page component. Renders at the / URL.' },
              { name: 'layout.tsx', type: 'file', description: 'Shared layout wrapping all pages (header, footer, etc.).' },
            ]},
          ],
        },
        {
          name: 'public/',
          type: 'folder',
          description: 'Static assets served directly. Images, fonts, and favicons live here.',
          expanded: false,
          children: [
            { name: 'favicon.ico', type: 'file', description: 'The small icon shown in the browser tab.' },
            { name: 'logo.svg', type: 'file', description: 'Your app logo image file.' },
          ],
        },
        { name: 'package.json', type: 'file', description: 'Lists project dependencies, scripts (dev, build, start), and metadata. The heart of any Node.js project.' },
        { name: 'tsconfig.json', type: 'file', description: 'TypeScript configuration. Controls strict mode, path aliases, and which files to compile.' },
        { name: '.gitignore', type: 'file', description: 'Tells Git which files to ignore: node_modules, .env files, build output.' },
        { name: '.env.local', type: 'file', description: 'Environment variables for local development. Contains secrets like API keys. Never commit this!' },
        { name: 'README.md', type: 'file', description: 'Project documentation. Explains what the project does, how to set it up, and how to contribute.' },
      ],
    },
  ]);

  let selectedNode = $state<TreeNode | null>(null);

  function toggleFolder(node: TreeNode) {
    if (node.type === 'folder') {
      node.expanded = !node.expanded;
    }
    selectedNode = node;
  }

  // === Advanced: Config Generator ===
  let useTypeScript = $state(true);
  let useESLint = $state(true);
  let usePrettier = $state(true);
  let useTesting = $state(false);
  let useTailwind = $state(true);

  let generatedConfig = $derived(() => {
    const configs: { name: string; content: string }[] = [];

    if (useTypeScript) {
      configs.push({
        name: 'tsconfig.json',
        content: `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}`,
      });
    }

    if (useESLint) {
      configs.push({
        name: 'eslint.config.js',
        content: `import js from "@eslint/js";
${useTypeScript ? 'import tsPlugin from "@typescript-eslint/eslint-plugin";\nimport tsParser from "@typescript-eslint/parser";' : ''}
${usePrettier ? 'import prettier from "eslint-config-prettier";' : ''}

export default [
  js.configs.recommended,
${useTypeScript ? '  {\n    files: ["**/*.ts", "**/*.tsx"],\n    plugins: { "@typescript-eslint": tsPlugin },\n    languageOptions: { parser: tsParser },\n    rules: tsPlugin.configs.recommended.rules,\n  },' : ''}
${usePrettier ? '  prettier,' : ''}
];`,
      });
    }

    if (usePrettier) {
      configs.push({
        name: '.prettierrc',
        content: `{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100${useTailwind ? ',\n  "plugins": ["prettier-plugin-tailwindcss"]' : ''}
}`,
      });
    }

    if (useTesting) {
      configs.push({
        name: 'vitest.config.ts',
        content: `import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});`,
      });
    }

    if (useTailwind) {
      configs.push({
        name: 'tailwind.config.ts',
        content: `import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,svelte,astro}"],
  theme: {
    extend: {
      colors: {
        brand: { 500: "#0f89ec", 600: "#0a6fc0" },
      },
    },
  },
  plugins: [],
} satisfies Config;`,
      });
    }

    return configs;
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Project Explorer</h2>
    <p class="text-slate-600">Click on any folder or file to learn what it does.</p>
  </div>

  <div class="grid gap-6 lg:grid-cols-2">
    <!-- Tree view -->
    <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p class="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Project Structure</p>
      {#snippet treeItem(nodes: TreeNode[], depth: number)}
        {#each nodes as node}
          <button
            onclick={() => toggleFolder(node)}
            class="flex w-full items-center gap-1.5 rounded px-2 py-1 text-left text-sm transition-colors hover:bg-purple-100
              {selectedNode === node ? 'bg-purple-100 font-bold text-purple-700' : 'text-slate-700'}"
            style="padding-left: {depth * 16 + 8}px"
          >
            {#if node.type === 'folder'}
              <span class="text-xs">{node.expanded ? '&#9660;' : '&#9654;'}</span>
              <span class="text-purple-500">&#128193;</span>
            {:else}
              <span class="w-3"></span>
              <span class="text-slate-400">&#128196;</span>
            {/if}
            <span>{node.name}</span>
          </button>
          {#if node.type === 'folder' && node.expanded && node.children}
            {@render treeItem(node.children, depth + 1)}
          {/if}
        {/each}
      {/snippet}
      {@render treeItem(projectTree, 0)}
    </div>

    <!-- Description panel -->
    <div class="rounded-xl border border-purple-200 bg-purple-50 p-5">
      {#if selectedNode}
        <div class="flex items-center gap-2 mb-3">
          <span class="text-lg">{selectedNode.type === 'folder' ? '&#128193;' : '&#128196;'}</span>
          <h3 class="font-bold text-purple-800">{selectedNode.name}</h3>
        </div>
        <p class="text-sm text-slate-700">{selectedNode.description}</p>
        <div class="mt-3 rounded bg-white px-3 py-2 text-xs text-slate-500">
          <strong>Type:</strong> {selectedNode.type === 'folder' ? 'Directory' : 'File'}
        </div>
      {:else}
        <div class="flex h-full items-center justify-center">
          <p class="text-sm text-slate-400">Click a file or folder to see its description.</p>
        </div>
      {/if}
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-purple-700 hover:shadow-lg active:scale-95"
    >
      Done
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Config Generator</h2>
      <p class="text-slate-600">Toggle the tools you want and see the config files update live.</p>
    </div>

    <!-- Toggle switches -->
    <div class="flex flex-wrap gap-3">
      <label class="flex cursor-pointer items-center gap-2 rounded-lg border-2 px-4 py-2 transition-all {useTypeScript ? 'border-purple-400 bg-purple-50' : 'border-slate-200 bg-white'}">
        <input type="checkbox" bind:checked={useTypeScript} class="accent-purple-600" />
        <span class="text-sm font-medium text-slate-700">TypeScript</span>
      </label>
      <label class="flex cursor-pointer items-center gap-2 rounded-lg border-2 px-4 py-2 transition-all {useESLint ? 'border-purple-400 bg-purple-50' : 'border-slate-200 bg-white'}">
        <input type="checkbox" bind:checked={useESLint} class="accent-purple-600" />
        <span class="text-sm font-medium text-slate-700">ESLint</span>
      </label>
      <label class="flex cursor-pointer items-center gap-2 rounded-lg border-2 px-4 py-2 transition-all {usePrettier ? 'border-purple-400 bg-purple-50' : 'border-slate-200 bg-white'}">
        <input type="checkbox" bind:checked={usePrettier} class="accent-purple-600" />
        <span class="text-sm font-medium text-slate-700">Prettier</span>
      </label>
      <label class="flex cursor-pointer items-center gap-2 rounded-lg border-2 px-4 py-2 transition-all {useTesting ? 'border-purple-400 bg-purple-50' : 'border-slate-200 bg-white'}">
        <input type="checkbox" bind:checked={useTesting} class="accent-purple-600" />
        <span class="text-sm font-medium text-slate-700">Testing (Vitest)</span>
      </label>
      <label class="flex cursor-pointer items-center gap-2 rounded-lg border-2 px-4 py-2 transition-all {useTailwind ? 'border-purple-400 bg-purple-50' : 'border-slate-200 bg-white'}">
        <input type="checkbox" bind:checked={useTailwind} class="accent-purple-600" />
        <span class="text-sm font-medium text-slate-700">Tailwind CSS</span>
      </label>
    </div>

    <!-- Generated configs -->
    <div class="space-y-4">
      {#each generatedConfig() as config}
        <div class="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div class="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2">
            <span class="text-sm text-slate-400">&#128196;</span>
            <span class="text-sm font-bold text-purple-700">{config.name}</span>
          </div>
          <pre class="overflow-x-auto p-4 text-xs leading-relaxed text-slate-700">{config.content}</pre>
        </div>
      {/each}

      {#if generatedConfig().length === 0}
        <div class="rounded-xl border-2 border-dashed border-slate-200 p-8 text-center">
          <p class="text-sm text-slate-400">Toggle some options above to generate config files.</p>
        </div>
      {/if}
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
        Done
      </button>
    </div>
  </div>
  {/if}
</div>
