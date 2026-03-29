<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Local Setup in Code</h2>
    <p class="text-slate-600">Here are the real commands and files you'll work with when setting up a local development environment. These patterns apply to most JavaScript/TypeScript projects.</p>
  </div>

  <!-- Clone and setup -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Step 1: Clone and Enter the Project</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># Clone the repository from GitHub</span>
<span class="var">git</span> clone https://github.com/your-team/my-project.git

<span class="cmt"># Move into the project directory</span>
<span class="kw">cd</span> my-project

<span class="cmt"># See what's inside</span>
<span class="var">ls</span> <span class="op">-</span>la
<span class="cmt"># .env.example   .gitignore   package.json   src/   README.md</span>`}</code></pre>
  </div>

  <!-- npm install -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Step 2: Install Dependencies</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># Install everything listed in package.json</span>
<span class="var">npm</span> install

<span class="cmt"># What just happened?</span>
<span class="cmt"># - npm read package.json for the dependency list</span>
<span class="cmt"># - Downloaded all packages into node_modules/</span>
<span class="cmt"># - Created package-lock.json (exact versions)</span>
<span class="cmt"># - Ran any "postinstall" scripts</span>

<span class="cmt"># Alternative package managers:</span>
<span class="var">yarn</span> install        <span class="cmt"># Yarn</span>
<span class="var">pnpm</span> install       <span class="cmt"># pnpm (faster, disk-efficient)</span>`}</code></pre>
  </div>

  <!-- package.json -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Step 3: Understand package.json</h3>
    <p class="text-sm text-slate-600">This is the heart of any Node.js project. It defines your project's name, scripts, and dependencies.</p>
    <pre class="code-block"><code>{@html `{
  <span class="str">"name"</span>: <span class="str">"my-project"</span>,
  <span class="str">"version"</span>: <span class="str">"1.0.0"</span>,
  <span class="str">"scripts"</span>: {
    <span class="str">"dev"</span>: <span class="str">"vite"</span>,              <span class="cmt">// npm run dev</span>
    <span class="str">"build"</span>: <span class="str">"vite build"</span>,     <span class="cmt">// npm run build</span>
    <span class="str">"preview"</span>: <span class="str">"vite preview"</span>, <span class="cmt">// npm run preview</span>
    <span class="str">"lint"</span>: <span class="str">"eslint src/"</span>,     <span class="cmt">// npm run lint</span>
    <span class="str">"test"</span>: <span class="str">"vitest"</span>           <span class="cmt">// npm test</span>
  },
  <span class="str">"dependencies"</span>: {
    <span class="str">"svelte"</span>: <span class="str">"^5.0.0"</span>,       <span class="cmt">// production dependency</span>
    <span class="str">"express"</span>: <span class="str">"^4.18.0"</span>      <span class="cmt">// production dependency</span>
  },
  <span class="str">"devDependencies"</span>: {
    <span class="str">"vite"</span>: <span class="str">"^5.0.0"</span>,         <span class="cmt">// only needed during development</span>
    <span class="str">"eslint"</span>: <span class="str">"^8.0.0"</span>        <span class="cmt">// only needed during development</span>
  }
}`}</code></pre>
    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
      <p class="text-sm text-slate-600">
        <strong>dependencies</strong> are needed in production (your app won't run without them). <strong>devDependencies</strong> are only needed while developing (linters, test frameworks, build tools).
      </p>
    </div>
  </div>

  <!-- .env setup -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Step 4: Create Your .env File</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># Copy the example file</span>
<span class="var">cp</span> .env.example .env

<span class="cmt"># .env.example (committed to git — safe to share):</span>
<span class="var">DATABASE_URL</span><span class="op">=</span><span class="str">postgresql://localhost:5432/myapp</span>
<span class="var">API_KEY</span><span class="op">=</span><span class="str">your-api-key-here</span>
<span class="var">PORT</span><span class="op">=</span><span class="num">3000</span>

<span class="cmt"># .env (NOT committed — has your real secrets):</span>
<span class="var">DATABASE_URL</span><span class="op">=</span><span class="str">postgresql://localhost:5432/myapp</span>
<span class="var">API_KEY</span><span class="op">=</span><span class="str">sk-real-secret-key-abc123</span>
<span class="var">PORT</span><span class="op">=</span><span class="num">3000</span>`}</code></pre>
  </div>

  <!-- Start the server -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Step 5: Start the Dev Server</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># Start the development server</span>
<span class="var">npm</span> run dev

<span class="cmt"># Typical output:</span>
<span class="cmt">#</span>
<span class="cmt">#   VITE v5.0.0  ready in 312 ms</span>
<span class="cmt">#</span>
<span class="cmt">#   ➜  Local:   http://localhost:5173/</span>
<span class="cmt">#   ➜  Network: http://192.168.1.42:5173/</span>
<span class="cmt">#   ➜  press h + enter to show help</span>
<span class="cmt">#</span>
<span class="cmt"># Now open http://localhost:5173 in your browser!</span>
<span class="cmt"># Edit any file and save — changes appear instantly.</span>`}</code></pre>
  </div>

  <!-- Common commands reference -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Quick Reference: Common Commands</h3>
    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
      <ul class="space-y-2 text-sm text-slate-600">
        <li class="flex items-start gap-2">
          <code class="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-blue-700">npm install</code>
          <span>Install all dependencies from package.json</span>
        </li>
        <li class="flex items-start gap-2">
          <code class="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-blue-700">npm run dev</code>
          <span>Start the development server</span>
        </li>
        <li class="flex items-start gap-2">
          <code class="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-blue-700">npm run build</code>
          <span>Create a production-ready build</span>
        </li>
        <li class="flex items-start gap-2">
          <code class="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-blue-700">npm test</code>
          <span>Run the test suite</span>
        </li>
        <li class="flex items-start gap-2">
          <code class="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-blue-700">npm install axios</code>
          <span>Add a new package as a dependency</span>
        </li>
        <li class="flex items-start gap-2">
          <code class="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-blue-700">npm install -D vitest</code>
          <span>Add a new package as a dev dependency</span>
        </li>
      </ul>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Local Development Files (Advanced)</h2>
    <p class="text-slate-600">Professional configuration files for Docker, nginx, environment management, and IDE setup.</p>
  </div>

  <!-- Dockerfile -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Dockerfile Anatomy</h3>
    <p class="text-sm text-slate-600">A Dockerfile is a recipe for building a container image. Each instruction creates a layer.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Start from a base image (Node.js on Alpine Linux)</span>
<span class="kw">FROM</span> <span class="var">node</span>:<span class="num">20</span>-alpine <span class="kw">AS</span> <span class="var">base</span>

<span class="cmt"># Set the working directory inside the container</span>
<span class="kw">WORKDIR</span> <span class="str">/app</span>

<span class="cmt"># Copy dependency files first (better layer caching)</span>
<span class="kw">COPY</span> package.json package-lock.json <span class="str">./</span>

<span class="cmt"># Install dependencies</span>
<span class="kw">RUN</span> <span class="var">npm</span> ci <span class="op">--</span>production

<span class="cmt"># Copy the rest of the source code</span>
<span class="kw">COPY</span> . .

<span class="cmt"># Build the application</span>
<span class="kw">RUN</span> <span class="var">npm</span> run build

<span class="cmt"># Expose the port the app runs on</span>
<span class="kw">EXPOSE</span> <span class="num">3000</span>

<span class="cmt"># Command to run when the container starts</span>
<span class="kw">CMD</span> [<span class="str">"node"</span>, <span class="str">"dist/server.js"</span>]`}</code></pre>
    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
      <p class="text-sm text-slate-600">
        <strong>Why copy package.json first?</strong> Docker caches each layer. If your source code changes but dependencies don't, Docker reuses the cached <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">npm ci</code> layer instead of reinstalling everything. This makes builds much faster.
      </p>
    </div>
  </div>

  <!-- docker-compose.yml -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">docker-compose.yml</h3>
    <p class="text-sm text-slate-600">A complete multi-service setup with a web app, database, and cache.</p>
    <pre class="code-block"><code>{@html `<span class="var">version</span>: <span class="str">"3.8"</span>

<span class="var">services</span>:
  <span class="var">web</span>:
    <span class="var">build</span>: <span class="str">.</span>
    <span class="var">ports</span>:
      - <span class="str">"3000:3000"</span>
    <span class="var">volumes</span>:
      - <span class="str">./src:/app/src</span>        <span class="cmt"># Live reload: edit locally, see changes in container</span>
    <span class="var">environment</span>:
      - <span class="var">NODE_ENV</span>=<span class="str">development</span>
      - <span class="var">DATABASE_URL</span>=<span class="str">postgresql://postgres:devpass@db:5432/myapp</span>
      - <span class="var">REDIS_URL</span>=<span class="str">redis://cache:6379</span>
    <span class="var">depends_on</span>:
      - <span class="var">db</span>
      - <span class="var">cache</span>

  <span class="var">db</span>:
    <span class="var">image</span>: <span class="str">postgres:16-alpine</span>
    <span class="var">ports</span>:
      - <span class="str">"5432:5432"</span>
    <span class="var">environment</span>:
      - <span class="var">POSTGRES_PASSWORD</span>=<span class="str">devpass</span>
      - <span class="var">POSTGRES_DB</span>=<span class="str">myapp</span>
    <span class="var">volumes</span>:
      - <span class="var">pgdata</span>:<span class="str">/var/lib/postgresql/data</span>

  <span class="var">cache</span>:
    <span class="var">image</span>: <span class="str">redis:7-alpine</span>
    <span class="var">ports</span>:
      - <span class="str">"6379:6379"</span>

<span class="var">volumes</span>:
  <span class="var">pgdata</span>:  <span class="cmt"># Named volume persists data across container restarts</span>`}</code></pre>
  </div>

  <!-- nginx config -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">nginx Reverse Proxy Config</h3>
    <p class="text-sm text-slate-600">Route multiple services through a single entry point, with SSL and path-based routing.</p>
    <pre class="code-block"><code>{@html `<span class="kw">server</span> {
    <span class="var">listen</span> <span class="num">443</span> <span class="str">ssl</span>;
    <span class="var">server_name</span> <span class="str">myapp.localhost</span>;

    <span class="var">ssl_certificate</span>     <span class="str">/etc/ssl/certs/localhost.pem</span>;
    <span class="var">ssl_certificate_key</span> <span class="str">/etc/ssl/certs/localhost-key.pem</span>;

    <span class="cmt"># Frontend dev server</span>
    <span class="kw">location</span> <span class="str">/</span> {
        <span class="var">proxy_pass</span> <span class="str">http://web:3000</span>;
        <span class="var">proxy_http_version</span> <span class="num">1.1</span>;
        <span class="var">proxy_set_header</span> <span class="str">Upgrade</span> <span class="var">$http_upgrade</span>;
        <span class="var">proxy_set_header</span> <span class="str">Connection</span> <span class="str">"upgrade"</span>;
    }

    <span class="cmt"># API server</span>
    <span class="kw">location</span> <span class="str">/api/</span> {
        <span class="var">proxy_pass</span> <span class="str">http://api:4000</span>;
    }
}`}</code></pre>
  </div>

  <!-- Environment files -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">.env vs .env.local vs .env.production</h3>
    <p class="text-sm text-slate-600">Most frameworks support a hierarchy of environment files, loaded in a specific order.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Load order (later files override earlier ones):</span>
<span class="cmt"># 1. .env                 — shared defaults (committed)</span>
<span class="cmt"># 2. .env.local           — local overrides (NOT committed)</span>
<span class="cmt"># 3. .env.development     — dev-specific (committed)</span>
<span class="cmt"># 4. .env.development.local — dev local overrides (NOT committed)</span>

<span class="cmt"># .env (committed — safe defaults)</span>
<span class="var">APP_NAME</span><span class="op">=</span><span class="str">My Project</span>
<span class="var">PORT</span><span class="op">=</span><span class="num">3000</span>
<span class="var">LOG_LEVEL</span><span class="op">=</span><span class="str">info</span>

<span class="cmt"># .env.local (NOT committed — your secrets)</span>
<span class="var">API_KEY</span><span class="op">=</span><span class="str">sk-real-secret-key</span>
<span class="var">DATABASE_URL</span><span class="op">=</span><span class="str">postgresql://me:mypass@localhost:5432/myapp</span>

<span class="cmt"># .env.production (committed — production defaults)</span>
<span class="var">LOG_LEVEL</span><span class="op">=</span><span class="str">error</span>
<span class="var">NODE_ENV</span><span class="op">=</span><span class="str">production</span>`}</code></pre>
    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
      <p class="text-sm text-slate-600">
        <strong>Rule of thumb:</strong> files with <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">.local</code> in the name are never committed. They belong in <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">.gitignore</code>. Regular <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">.env</code> files with non-secret defaults can be committed.
      </p>
    </div>
  </div>

  <!-- Makefile -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Makefile for Dev Tasks</h3>
    <p class="text-sm text-slate-600">A Makefile provides short, memorable commands for common development tasks.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Makefile</span>

<span class="fn">setup</span>:   <span class="cmt">## First-time setup</span>
	<span class="var">cp</span> .env.example .env
	<span class="var">npm</span> install
	<span class="var">docker-compose</span> up <span class="op">-</span>d db cache
	<span class="var">npm</span> run db:migrate

<span class="fn">dev</span>:     <span class="cmt">## Start development</span>
	<span class="var">docker-compose</span> up <span class="op">-</span>d db cache
	<span class="var">npm</span> run dev

<span class="fn">test</span>:    <span class="cmt">## Run tests</span>
	<span class="var">npm</span> test

<span class="fn">lint</span>:    <span class="cmt">## Lint and format</span>
	<span class="var">npm</span> run lint
	<span class="var">npm</span> run format

<span class="fn">clean</span>:   <span class="cmt">## Stop everything and clean up</span>
	<span class="var">docker-compose</span> down <span class="op">-</span>v
	<span class="var">rm</span> <span class="op">-</span>rf node_modules dist

<span class="fn">help</span>:    <span class="cmt">## Show available commands</span>
	@<span class="var">grep</span> <span class="op">-</span>E <span class="str">'^[a-zA-Z_-]+:.*?## .*$$'</span> Makefile`}</code></pre>
    <p class="text-sm text-slate-500">Usage: <code class="rounded bg-slate-100 px-1 text-blue-700">make setup</code>, <code class="rounded bg-slate-100 px-1 text-blue-700">make dev</code>, <code class="rounded bg-slate-100 px-1 text-blue-700">make test</code>. Much easier to remember than long commands.</p>
  </div>

  <!-- VS Code config -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">VS Code Project Settings</h3>
    <p class="text-sm text-slate-600">Shared IDE configuration ensures the whole team uses the same formatting and tools.</p>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <p class="mb-2 text-sm font-semibold text-slate-500">.vscode/settings.json</p>
        <pre class="code-block"><code>{@html `{
  <span class="str">"editor.formatOnSave"</span>: <span class="kw">true</span>,
  <span class="str">"editor.defaultFormatter"</span>:
    <span class="str">"esbenp.prettier-vscode"</span>,
  <span class="str">"editor.codeActionsOnSave"</span>: {
    <span class="str">"source.fixAll.eslint"</span>: <span class="str">"explicit"</span>
  },
  <span class="str">"typescript.tsdk"</span>:
    <span class="str">"node_modules/typescript/lib"</span>,
  <span class="str">"files.exclude"</span>: {
    <span class="str">"node_modules"</span>: <span class="kw">true</span>,
    <span class="str">"dist"</span>: <span class="kw">true</span>
  }
}`}</code></pre>
      </div>
      <div>
        <p class="mb-2 text-sm font-semibold text-slate-500">.vscode/extensions.json</p>
        <pre class="code-block"><code>{@html `{
  <span class="str">"recommendations"</span>: [
    <span class="str">"esbenp.prettier-vscode"</span>,
    <span class="str">"dbaeumer.vscode-eslint"</span>,
    <span class="str">"svelte.svelte-vscode"</span>,
    <span class="str">"bradlc.vscode-tailwindcss"</span>,
    <span class="str">"ms-azuretools.vscode-docker"</span>
  ]
}

<span class="cmt">// VS Code will prompt teammates</span>
<span class="cmt">// to install these extensions</span>
<span class="cmt">// when they open the project.</span>`}</code></pre>
      </div>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
      Got it
    </button>
  </div>
</div>
{/if}

<style>
  .code-block { background-color: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; color: #e2e8f0; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
