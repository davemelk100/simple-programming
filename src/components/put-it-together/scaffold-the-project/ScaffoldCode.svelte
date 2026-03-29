<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();
</script>

{#if !advanced}
<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Scaffolding in Code</h2>
    <p class="text-sm text-slate-600">CLI commands to scaffold popular frameworks, plus the folder structures they generate.</p>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Scaffolding commands</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Next.js (React)</span>
<span class="kw">npx</span> create-next-app@latest my-app
<span class="cmt"># Prompts: TypeScript? ESLint? Tailwind? src/ dir? App Router?</span>

<span class="cmt"># SvelteKit</span>
<span class="kw">npm</span> create svelte@latest my-app
<span class="cmt"># Prompts: Skeleton or demo? TypeScript? ESLint? Prettier?</span>

<span class="cmt"># Vite (React, Vue, Svelte, etc.)</span>
<span class="kw">npm</span> create vite@latest my-app -- --template react-ts

<span class="cmt"># Astro (content-focused)</span>
<span class="kw">npm</span> create astro@latest my-app`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Typical folder structure (Next.js App Router)</p>
    <pre class="code-block"><code>{@html `<span class="var">my-app/</span>
├── <span class="var">src/</span>
│   ├── <span class="var">app/</span>                    <span class="cmt"># Pages &amp; routes</span>
│   │   ├── <span class="str">layout.tsx</span>          <span class="cmt"># Root layout (wraps all pages)</span>
│   │   ├── <span class="str">page.tsx</span>            <span class="cmt"># Home page (/)</span>
│   │   ├── <span class="var">about/</span>
│   │   │   └── <span class="str">page.tsx</span>        <span class="cmt"># About page (/about)</span>
│   │   └── <span class="var">api/</span>
│   │       └── <span class="var">hello/</span>
│   │           └── <span class="str">route.ts</span>    <span class="cmt"># API endpoint (/api/hello)</span>
│   ├── <span class="var">components/</span>             <span class="cmt"># Reusable UI components</span>
│   └── <span class="var">lib/</span>                    <span class="cmt"># Shared utilities</span>
├── <span class="var">public/</span>                     <span class="cmt"># Static assets (images, fonts)</span>
├── <span class="str">package.json</span>                <span class="cmt"># Dependencies &amp; scripts</span>
├── <span class="str">tsconfig.json</span>               <span class="cmt"># TypeScript config</span>
├── <span class="str">next.config.js</span>              <span class="cmt"># Next.js settings</span>
├── <span class="str">tailwind.config.ts</span>          <span class="cmt"># Tailwind CSS config</span>
└── <span class="str">.gitignore</span>                  <span class="cmt"># Files Git should ignore</span>`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Key config files explained</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// package.json -- the most important file</span>
{
  <span class="str">"name"</span>: <span class="str">"my-app"</span>,
  <span class="str">"scripts"</span>: {
    <span class="str">"dev"</span>: <span class="str">"next dev"</span>,         <span class="cmt">// npm run dev → starts dev server</span>
    <span class="str">"build"</span>: <span class="str">"next build"</span>,     <span class="cmt">// npm run build → production build</span>
    <span class="str">"start"</span>: <span class="str">"next start"</span>,     <span class="cmt">// npm start → run production</span>
    <span class="str">"lint"</span>: <span class="str">"next lint"</span>        <span class="cmt">// npm run lint → check for issues</span>
  }
}

<span class="cmt">// .gitignore -- files to exclude from Git</span>
<span class="var">node_modules/</span>    <span class="cmt"># installed packages (huge, reinstallable)</span>
<span class="var">.next/</span>           <span class="cmt"># build output (regenerated on build)</span>
<span class="str">.env.local</span>       <span class="cmt"># secrets (API keys, passwords)</span>
<span class="str">.env*.local</span>      <span class="cmt"># all local env files</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Scaffolding in Code (Advanced)</h2>
    <p class="text-sm text-slate-600">Monorepo setup, linting configs, pre-commit hooks, and CI workflows.</p>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Turborepo monorepo structure</p>
    <pre class="code-block"><code>{@html `<span class="var">my-monorepo/</span>
├── <span class="var">apps/</span>
│   ├── <span class="var">web/</span>                <span class="cmt"># Next.js frontend</span>
│   │   └── <span class="str">package.json</span>
│   └── <span class="var">api/</span>                <span class="cmt"># Express backend</span>
│       └── <span class="str">package.json</span>
├── <span class="var">packages/</span>
│   ├── <span class="var">ui/</span>                 <span class="cmt"># Shared component library</span>
│   │   └── <span class="str">package.json</span>
│   ├── <span class="var">config-eslint/</span>      <span class="cmt"># Shared ESLint config</span>
│   └── <span class="var">config-typescript/</span>  <span class="cmt"># Shared tsconfig</span>
├── <span class="str">turbo.json</span>              <span class="cmt"># Turborepo pipeline config</span>
├── <span class="str">package.json</span>            <span class="cmt"># Root workspace config</span>
└── <span class="str">pnpm-workspace.yaml</span>     <span class="cmt"># Workspace package paths</span>

<span class="cmt"># turbo.json</span>
{
  <span class="str">"pipeline"</span>: {
    <span class="str">"build"</span>: {
      <span class="str">"dependsOn"</span>: [<span class="str">"^build"</span>],
      <span class="str">"outputs"</span>: [<span class="str">".next/**"</span>, <span class="str">"dist/**"</span>]
    },
    <span class="str">"dev"</span>: { <span class="str">"cache"</span>: <span class="kw">false</span> },
    <span class="str">"lint"</span>: {}
  }
}`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">ESLint + Prettier configuration</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// eslint.config.js (flat config format)</span>
<span class="kw">import</span> <span class="var">js</span> <span class="kw">from</span> <span class="str">"@eslint/js"</span>;
<span class="kw">import</span> <span class="var">tsPlugin</span> <span class="kw">from</span> <span class="str">"@typescript-eslint/eslint-plugin"</span>;
<span class="kw">import</span> <span class="var">tsParser</span> <span class="kw">from</span> <span class="str">"@typescript-eslint/parser"</span>;
<span class="kw">import</span> <span class="var">prettier</span> <span class="kw">from</span> <span class="str">"eslint-config-prettier"</span>;

<span class="kw">export default</span> [
  <span class="var">js</span>.<span class="var">configs</span>.<span class="var">recommended</span>,
  {
    <span class="var">files</span>: [<span class="str">"**/*.ts"</span>, <span class="str">"**/*.tsx"</span>],
    <span class="var">plugins</span>: { <span class="str">"@typescript-eslint"</span>: <span class="var">tsPlugin</span> },
    <span class="var">languageOptions</span>: { <span class="var">parser</span>: <span class="var">tsParser</span> },
    <span class="var">rules</span>: {
      <span class="str">"@typescript-eslint/no-unused-vars"</span>: <span class="str">"error"</span>,
      <span class="str">"@typescript-eslint/no-explicit-any"</span>: <span class="str">"warn"</span>,
    },
  },
  <span class="var">prettier</span>, <span class="cmt">// must be last to disable formatting rules</span>
];

<span class="cmt">// .prettierrc</span>
{
  <span class="str">"semi"</span>: <span class="kw">true</span>,
  <span class="str">"singleQuote"</span>: <span class="kw">true</span>,
  <span class="str">"tabWidth"</span>: <span class="num">2</span>,
  <span class="str">"trailingComma"</span>: <span class="str">"all"</span>,
  <span class="str">"printWidth"</span>: <span class="num">100</span>,
  <span class="str">"plugins"</span>: [<span class="str">"prettier-plugin-tailwindcss"</span>]
}`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Husky + lint-staged setup</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Install husky and lint-staged</span>
<span class="kw">npm</span> install -D husky lint-staged
<span class="kw">npx</span> husky init

<span class="cmt"># .husky/pre-commit</span>
<span class="kw">npx</span> lint-staged

<span class="cmt"># package.json (add lint-staged config)</span>
{
  <span class="str">"lint-staged"</span>: {
    <span class="str">"*.{ts,tsx}"</span>: [
      <span class="str">"eslint --fix"</span>,         <span class="cmt">// fix lint issues</span>
      <span class="str">"prettier --write"</span>       <span class="cmt">// format code</span>
    ],
    <span class="str">"*.{json,md,css}"</span>: [
      <span class="str">"prettier --write"</span>       <span class="cmt">// format non-JS files too</span>
    ]
  }
}

<span class="cmt"># Now every commit auto-lints and formats staged files!</span>`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">GitHub Actions CI workflow</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># .github/workflows/ci.yml</span>
<span class="kw">name</span>: <span class="str">CI</span>

<span class="kw">on</span>:
  <span class="var">push</span>:
    <span class="var">branches</span>: [<span class="str">main</span>]
  <span class="var">pull_request</span>:
    <span class="var">branches</span>: [<span class="str">main</span>]

<span class="kw">jobs</span>:
  <span class="var">check</span>:
    <span class="kw">runs-on</span>: <span class="str">ubuntu-latest</span>
    <span class="kw">steps</span>:
      - <span class="kw">uses</span>: <span class="str">actions/checkout@v4</span>
      - <span class="kw">uses</span>: <span class="str">actions/setup-node@v4</span>
        <span class="kw">with</span>:
          <span class="var">node-version</span>: <span class="num">20</span>
          <span class="var">cache</span>: <span class="str">"pnpm"</span>

      - <span class="kw">run</span>: <span class="str">pnpm install --frozen-lockfile</span>
      - <span class="kw">run</span>: <span class="str">pnpm lint</span>         <span class="cmt"># ESLint check</span>
      - <span class="kw">run</span>: <span class="str">pnpm type-check</span>   <span class="cmt"># tsc --noEmit</span>
      - <span class="kw">run</span>: <span class="str">pnpm test</span>         <span class="cmt"># Vitest</span>
      - <span class="kw">run</span>: <span class="str">pnpm build</span>        <span class="cmt"># Ensure it compiles</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
      Got it
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
