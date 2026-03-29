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
    <h2 class="mb-3 text-xl font-bold text-slate-800">Stack in Code</h2>
    <p class="text-sm text-slate-600">Here is what a typical stack looks like in practice -- starting with the package.json and CLI commands.</p>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">A typical package.json</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// package.json -- your project's identity card</span>
{
  <span class="str">"name"</span>: <span class="str">"my-fullstack-app"</span>,
  <span class="str">"version"</span>: <span class="str">"1.0.0"</span>,
  <span class="str">"scripts"</span>: {
    <span class="str">"dev"</span>: <span class="str">"next dev"</span>,        <span class="cmt">// start dev server</span>
    <span class="str">"build"</span>: <span class="str">"next build"</span>,    <span class="cmt">// build for production</span>
    <span class="str">"start"</span>: <span class="str">"next start"</span>     <span class="cmt">// run production server</span>
  },
  <span class="str">"dependencies"</span>: {
    <span class="str">"next"</span>: <span class="str">"^14.0.0"</span>,       <span class="cmt">// frontend framework</span>
    <span class="str">"react"</span>: <span class="str">"^18.0.0"</span>,      <span class="cmt">// UI library</span>
    <span class="str">"pg"</span>: <span class="str">"^8.11.0"</span>          <span class="cmt">// PostgreSQL client</span>
  },
  <span class="str">"devDependencies"</span>: {
    <span class="str">"typescript"</span>: <span class="str">"^5.0.0"</span>   <span class="cmt">// type checking</span>
  }
}`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Scaffolding CLI commands</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Create a Next.js app (React)</span>
<span class="kw">npx</span> create-next-app@latest my-app

<span class="cmt"># Create a SvelteKit app</span>
<span class="kw">npm</span> create svelte@latest my-app

<span class="cmt"># Create a Vue/Nuxt app</span>
<span class="kw">npx</span> nuxi init my-app

<span class="cmt"># Create a Remix app</span>
<span class="kw">npx</span> create-remix@latest my-app`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Running your app</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Install dependencies</span>
<span class="kw">npm</span> install

<span class="cmt"># Start development server (usually localhost:3000)</span>
<span class="kw">npm</span> run dev

<span class="cmt"># Build for production</span>
<span class="kw">npm</span> run build

<span class="cmt"># Deploy to Vercel (if using Vercel)</span>
<span class="kw">npx</span> vercel`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Stack in Code (Advanced)</h2>
    <p class="text-sm text-slate-600">Docker Compose for a full stack, comparing project structures, and environment configuration.</p>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">docker-compose.yml -- Full stack in containers</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># docker-compose.yml</span>
<span class="kw">version</span>: <span class="str">"3.8"</span>

<span class="kw">services</span>:
  <span class="var">frontend</span>:
    <span class="kw">build</span>: <span class="str">./frontend</span>
    <span class="kw">ports</span>:
      - <span class="str">"3000:3000"</span>
    <span class="kw">environment</span>:
      - <span class="var">NEXT_PUBLIC_API_URL</span>=<span class="str">http://localhost:4000</span>
    <span class="kw">depends_on</span>:
      - <span class="var">backend</span>

  <span class="var">backend</span>:
    <span class="kw">build</span>: <span class="str">./backend</span>
    <span class="kw">ports</span>:
      - <span class="str">"4000:4000"</span>
    <span class="kw">environment</span>:
      - <span class="var">DATABASE_URL</span>=<span class="str">postgres://user:pass@db:5432/myapp</span>
    <span class="kw">depends_on</span>:
      - <span class="var">db</span>

  <span class="var">db</span>:
    <span class="kw">image</span>: <span class="str">postgres:16</span>
    <span class="kw">ports</span>:
      - <span class="str">"5432:5432"</span>
    <span class="kw">environment</span>:
      - <span class="var">POSTGRES_USER</span>=<span class="str">user</span>
      - <span class="var">POSTGRES_PASSWORD</span>=<span class="str">pass</span>
      - <span class="var">POSTGRES_DB</span>=<span class="str">myapp</span>
    <span class="kw">volumes</span>:
      - <span class="str">pgdata:/var/lib/postgresql/data</span>

<span class="kw">volumes</span>:
  <span class="var">pgdata</span>:`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Comparing project structures</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Next.js (App Router)          # SvelteKit</span>
<span class="var">my-app/</span>                        <span class="var">my-app/</span>
├── <span class="var">app/</span>                       ├── <span class="var">src/</span>
│   ├── <span class="str">layout.tsx</span>             │   ├── <span class="var">routes/</span>
│   ├── <span class="str">page.tsx</span>               │   │   ├── <span class="str">+layout.svelte</span>
│   └── <span class="var">api/</span>                   │   │   ├── <span class="str">+page.svelte</span>
│       └── <span class="var">users/</span>             │   │   └── <span class="var">api/</span>
│           └── <span class="str">route.ts</span>       │   │       └── <span class="var">users/</span>
├── <span class="var">public/</span>                    │   │           └── <span class="str">+server.ts</span>
├── <span class="str">next.config.js</span>             │   └── <span class="var">lib/</span>
└── <span class="str">package.json</span>               ├── <span class="var">static/</span>
                               ├── <span class="str">svelte.config.js</span>
                               └── <span class="str">package.json</span>`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Environment-based configuration</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// .env.local (development -- never commit this!)</span>
<span class="var">DATABASE_URL</span>=<span class="str">postgres://localhost:5432/myapp_dev</span>
<span class="var">API_SECRET</span>=<span class="str">dev-secret-key</span>
<span class="var">NEXT_PUBLIC_APP_URL</span>=<span class="str">http://localhost:3000</span>

<span class="cmt">// .env.production (production values set in hosting dashboard)</span>
<span class="var">DATABASE_URL</span>=<span class="str">postgres://prod-db:5432/myapp</span>
<span class="var">API_SECRET</span>=<span class="str">$&#123;GENERATED_AT_DEPLOY&#125;</span>
<span class="var">NEXT_PUBLIC_APP_URL</span>=<span class="str">https://myapp.com</span>

<span class="cmt">// Accessing in code:</span>
<span class="kw">const</span> <span class="var">dbUrl</span> = <span class="var">process</span>.<span class="var">env</span>.<span class="var">DATABASE_URL</span>;
<span class="cmt">// NEXT_PUBLIC_ prefix = exposed to browser</span>
<span class="cmt">// Without prefix = server-only (safe for secrets)</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
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
