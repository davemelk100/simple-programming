<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      Think of scaffolding like the <strong>skeleton of a building</strong> before the walls go up. When you scaffold a project, a CLI tool generates a starter set of files and folders so you do not have to create everything from scratch. It gives your project structure from day one.
    </p>
  </div>

  <!-- Visual metaphor -->
  <div class="mx-auto flex max-w-lg items-center gap-6 rounded-xl border-2 border-dashed border-purple-300 bg-purple-50 p-6">
    <div class="text-center">
      <div class="mx-auto mb-2 flex h-24 w-16 flex-col items-center justify-between rounded border-2 border-purple-400 bg-white p-1">
        <div class="h-1 w-full rounded bg-purple-300"></div>
        <div class="h-1 w-full rounded bg-purple-300"></div>
        <div class="h-1 w-full rounded bg-purple-300"></div>
        <div class="h-1 w-full rounded bg-purple-300"></div>
        <div class="h-1 w-full rounded bg-purple-300"></div>
      </div>
      <p class="text-xs font-bold text-purple-600">Skeleton</p>
    </div>
    <div class="text-3xl text-purple-400">&#8594;</div>
    <div class="text-center">
      <div class="mx-auto mb-2 flex h-24 w-16 flex-col items-center justify-between rounded border-2 border-purple-600 bg-purple-200 p-1">
        <div class="h-3 w-full rounded bg-purple-500"></div>
        <div class="h-3 w-full rounded bg-purple-400"></div>
        <div class="h-3 w-full rounded bg-purple-500"></div>
        <div class="h-3 w-full rounded bg-purple-400"></div>
      </div>
      <p class="text-xs font-bold text-purple-600">Your App</p>
    </div>
  </div>

  <!-- Folder structure -->
  <div class="rounded-xl border border-purple-200 bg-purple-50 p-5">
    <h3 class="mb-3 font-bold text-purple-800">Common Folder Conventions</h3>
    <div class="space-y-2 text-sm text-slate-700">
      <div class="flex items-start gap-3">
        <code class="shrink-0 rounded bg-white px-2 py-0.5 font-bold text-purple-700">src/</code>
        <span>Your source code lives here -- components, pages, utilities.</span>
      </div>
      <div class="flex items-start gap-3">
        <code class="shrink-0 rounded bg-white px-2 py-0.5 font-bold text-purple-700">public/</code>
        <span>Static files (images, fonts, favicon) served as-is to the browser.</span>
      </div>
      <div class="flex items-start gap-3">
        <code class="shrink-0 rounded bg-white px-2 py-0.5 font-bold text-purple-700">components/</code>
        <span>Reusable UI pieces -- buttons, cards, headers.</span>
      </div>
      <div class="flex items-start gap-3">
        <code class="shrink-0 rounded bg-white px-2 py-0.5 font-bold text-purple-700">lib/</code>
        <span>Shared utility functions and helpers.</span>
      </div>
    </div>
  </div>

  <!-- Key files -->
  <div class="rounded-xl border border-slate-200 bg-white p-5">
    <h3 class="mb-3 font-bold text-slate-800">Key Files Every Project Has</h3>
    <div class="space-y-2 text-sm text-slate-700">
      <div class="flex items-start gap-3">
        <code class="shrink-0 rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-700">package.json</code>
        <span>Lists dependencies, scripts, and project metadata. The most important file.</span>
      </div>
      <div class="flex items-start gap-3">
        <code class="shrink-0 rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-700">tsconfig.json</code>
        <span>TypeScript compiler settings -- tells TS how strict to be and where to find files.</span>
      </div>
      <div class="flex items-start gap-3">
        <code class="shrink-0 rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-700">.gitignore</code>
        <span>Tells Git which files to skip (node_modules, .env, build output).</span>
      </div>
      <div class="flex items-start gap-3">
        <code class="shrink-0 rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-700">README.md</code>
        <span>Documentation for humans -- what the project is, how to run it.</span>
      </div>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-purple-700 hover:shadow-lg active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-3 text-2xl font-bold text-slate-800">Scaffolding (Advanced)</h2>
      <p class="text-slate-600">
        Beyond basic file generation, professional projects need <strong>monorepo management</strong>, <strong>linting/formatting</strong>, <strong>pre-commit hooks</strong>, and <strong>CI pipelines</strong> from the start.
      </p>
    </div>

    <!-- Monorepo -->
    <div class="rounded-xl border border-purple-200 bg-purple-50 p-5">
      <h3 class="mb-2 font-bold text-purple-800">Monorepo Setup</h3>
      <p class="mb-3 text-sm text-slate-700">
        A <strong>monorepo</strong> keeps multiple packages (frontend, backend, shared libs) in one repository. Tools like <strong>Turborepo</strong> and <strong>Nx</strong> handle task orchestration, caching, and dependency management across packages.
      </p>
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-lg bg-white p-3 shadow-sm">
          <p class="font-bold text-slate-800">Turborepo</p>
          <p class="text-xs text-slate-500">By Vercel. Zero-config for most setups. Incremental builds, remote caching. Great for JS/TS monorepos.</p>
        </div>
        <div class="rounded-lg bg-white p-3 shadow-sm">
          <p class="font-bold text-slate-800">Nx</p>
          <p class="text-xs text-slate-500">Feature-rich with generators, dependency graph visualization, and plugins for many languages.</p>
        </div>
      </div>
    </div>

    <!-- Linting & Formatting -->
    <div class="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
      <h3 class="mb-2 font-bold text-indigo-800">Linting and Formatting</h3>
      <p class="mb-3 text-sm text-slate-700">
        Consistent code style across a team eliminates pointless debates and catches bugs early.
      </p>
      <div class="space-y-2">
        <div class="flex items-start gap-3">
          <span class="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span class="text-sm text-slate-700"><strong>ESLint</strong> analyzes your code for potential errors and enforces coding conventions (unused variables, missing return types, accessibility issues).</span>
        </div>
        <div class="flex items-start gap-3">
          <span class="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span class="text-sm text-slate-700"><strong>Prettier</strong> auto-formats your code (indentation, quotes, semicolons). It is opinionated by design -- no debates about style.</span>
        </div>
        <div class="flex items-start gap-3">
          <span class="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span class="text-sm text-slate-700">They work together: ESLint catches logic issues, Prettier handles formatting. Use <code class="rounded bg-white px-1 text-xs">eslint-config-prettier</code> to avoid conflicts.</span>
        </div>
      </div>
    </div>

    <!-- Pre-commit hooks -->
    <div class="rounded-xl border border-violet-200 bg-violet-50 p-5">
      <h3 class="mb-2 font-bold text-violet-800">Pre-commit Hooks</h3>
      <p class="mb-3 text-sm text-slate-700">
        <strong>Husky</strong> lets you run scripts before each git commit. Paired with <strong>lint-staged</strong>, it only lints and formats the files you are actually committing -- keeping commits fast and clean.
      </p>
      <div class="rounded-lg bg-white p-3 text-sm text-slate-600">
        <p><strong>Workflow:</strong> You run <code class="rounded bg-slate-100 px-1">git commit</code> &#8594; Husky triggers &#8594; lint-staged runs ESLint + Prettier on staged files &#8594; If everything passes, commit succeeds. If not, it stops you before bad code enters the repo.</p>
      </div>
    </div>

    <!-- CI Pipeline -->
    <div class="rounded-xl border border-slate-200 bg-white p-5">
      <h3 class="mb-2 font-bold text-slate-800">CI Pipeline Setup</h3>
      <p class="text-sm text-slate-700">
        Continuous Integration (CI) runs automated checks on every push: type checking, linting, tests, and builds. <strong>GitHub Actions</strong> is the most common choice for open source. Your pipeline runs in the cloud on every pull request, catching issues before they merge.
      </p>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>
