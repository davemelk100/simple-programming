<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);

  const cards = [
    { emoji: '🏠', title: 'Your Computer = Mini Internet', desc: 'Running locally means your machine pretends to be a web server. Only you can see what it serves.' },
    { emoji: '🔧', title: 'IDE = Your Workshop', desc: 'VS Code, WebStorm, or any editor is where you write, debug, and explore your code.' },
    { emoji: '📦', title: 'Package Manager = App Store', desc: 'npm, yarn, or pnpm fetch code libraries other people wrote so you don\'t have to build everything from scratch.' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < cards.length) {
        visibleCards++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      Imagine you want to build a house. You wouldn't construct it in the middle of a busy street for everyone to see while it's half-finished. Instead, you'd build it in a <strong>private workshop</strong> first, test everything, then move it to its final location. That's exactly what "running locally" means for software: <strong>your computer becomes a mini version of the internet</strong>, running your project in private so only you can see it.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    {#each cards as card, i}
      <div
        class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5 text-center transition-all duration-700
          {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
      >
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">The Dev Server: Your Private Website</h3>
    <p class="text-slate-600">
      When you run a <strong>dev server</strong>, your computer starts hosting a website at a special address called <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">localhost</code>. This is a private URL that only exists on your machine. Nobody else on the internet can see it. You open your browser, go to <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">http://localhost:3000</code>, and there's your project running live.
    </p>
    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
      <p class="mb-2 text-sm font-semibold text-slate-500">Typical setup flow</p>
      <pre class="code-block"><code>{@html `<span class="cmt"># Step 1: Install project dependencies</span>
<span class="var">npm</span> install

<span class="cmt"># Step 2: Start the dev server</span>
<span class="var">npm</span> run dev

<span class="cmt"># Output:</span>
<span class="cmt">#   Local: http://localhost:3000</span>
<span class="cmt">#   Ready in 1.2s</span>`}</code></pre>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">What Is a Package Manager?</h3>
    <p class="text-slate-600">
      A <strong>package manager</strong> is like an app store for code. Instead of writing every feature yourself, you can install <strong>packages</strong> (also called libraries or dependencies) that other developers have already built and tested. Need to format dates? There's a package for that. Need a web framework? There's a package for that too.
    </p>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <span><strong>npm install</strong> reads your <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">package.json</code> file and downloads everything your project needs into a <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">node_modules</code> folder.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <span><strong>package.json</strong> is the recipe book. It lists every dependency, their versions, and scripts you can run (like <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">npm run dev</code>).</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <span><strong>node_modules</strong> is where all the downloaded packages live. It can get huge — thousands of files — but you never commit it to git.</span>
      </li>
    </ul>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Config Files: Your Project's Settings</h3>
    <p class="text-slate-600">
      Most projects have special files at the root that configure how things work. The most important one for beginners is the <strong>.env</strong> file (short for "environment"). It stores secrets like API keys and database passwords that you don't want to share publicly.
    </p>
    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
      <p class="mb-2 text-sm font-semibold text-slate-500">Example .env file</p>
      <pre class="code-block"><code>{@html `<span class="cmt"># These values are private to your machine</span>
<span class="var">DATABASE_URL</span><span class="op">=</span><span class="str">postgresql://localhost:5432/myapp</span>
<span class="var">API_KEY</span><span class="op">=</span><span class="str">sk-abc123secret</span>
<span class="var">PORT</span><span class="op">=</span><span class="num">3000</span>`}</code></pre>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      I understand local development
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <p class="text-slate-600">Docker containers, environment management, reverse proxies, and professional development workflows.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Docker: Isolated Environments</h3>
      <p class="text-slate-600">
        Docker solves the classic "it works on my machine" problem. A <strong>container</strong> is a lightweight, isolated environment that packages your app with everything it needs — the right operating system, language version, and dependencies. Every developer on the team runs the exact same environment, regardless of their host OS.
      </p>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Images vs Containers</h4>
          <p class="text-sm text-slate-600">
            An <strong>image</strong> is a blueprint (like a class). A <strong>container</strong> is a running instance of that image (like an object). You can run multiple containers from the same image.
          </p>
        </div>
        <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Volumes</h4>
          <p class="text-sm text-slate-600">
            Containers are ephemeral — when they stop, data is lost. <strong>Volumes</strong> persist data by mapping a folder inside the container to a folder on your host machine.
          </p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Docker Compose: Multi-Container Setups</h3>
      <p class="text-slate-600">
        Real applications need more than one service. A web app might need a Node server, a PostgreSQL database, and a Redis cache. <strong>docker-compose</strong> lets you define all these services in a single <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">docker-compose.yml</code> file and start them all with one command.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt"># Start all services defined in docker-compose.yml</span>
<span class="var">docker-compose</span> up

<span class="cmt"># Start in background (detached)</span>
<span class="var">docker-compose</span> up <span class="op">-</span>d

<span class="cmt"># Stop everything</span>
<span class="var">docker-compose</span> down

<span class="cmt"># View logs from all services</span>
<span class="var">docker-compose</span> logs <span class="op">-</span>f`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Port Mapping</h3>
      <p class="text-slate-600">
        Containers run in isolation, so their internal ports aren't accessible by default. <strong>Port mapping</strong> connects a port on your host machine to a port inside the container. The syntax is <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">host:container</code>.
      </p>
      <div class="flex flex-wrap items-center gap-2 text-sm">
        <span class="rounded-lg bg-blue-100 px-3 py-1.5 font-mono text-blue-700">localhost:3000</span>
        <span class="text-slate-400">&#8594;</span>
        <span class="rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-slate-700">container:3000</span>
        <span class="ml-2 text-slate-500">(mapped with <code class="rounded bg-slate-100 px-1 text-blue-700">3000:3000</code>)</span>
      </div>
      <p class="text-sm text-slate-500">
        You can map different ports too: <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">8080:3000</code> means visiting <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">localhost:8080</code> on your host reaches port 3000 inside the container.
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Hot Module Replacement (HMR)</h3>
      <p class="text-slate-600">
        Modern dev servers like Vite and webpack support <strong>HMR</strong>: when you save a file, only the changed module is replaced in the browser — without a full page reload. This preserves your application state (form inputs, scroll position, etc.) while instantly reflecting code changes.
      </p>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <span><strong>Full reload:</strong> Browser refreshes the entire page. All state is lost.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <span><strong>HMR:</strong> Only the changed module is swapped. State is preserved. Happens in milliseconds.</span>
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Environment Variables: Local vs Production</h3>
      <p class="text-slate-600">
        Different environments need different configuration. Your local database URL is not the same as production. Environment variables solve this by externalizing configuration.
      </p>
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4 text-center">
          <h4 class="font-bold text-green-700">Development</h4>
          <p class="text-xs text-slate-600 mt-1">localhost database, verbose logging, debug tools enabled</p>
        </div>
        <div class="rounded-xl border-2 border-yellow-200 bg-yellow-50 p-4 text-center">
          <h4 class="font-bold text-yellow-700">Staging</h4>
          <p class="text-xs text-slate-600 mt-1">Production-like setup, test data, internal access only</p>
        </div>
        <div class="rounded-xl border-2 border-red-200 bg-red-50 p-4 text-center">
          <h4 class="font-bold text-red-700">Production</h4>
          <p class="text-xs text-slate-600 mt-1">Real database, minimal logging, optimized builds, SSL</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Reverse Proxies and Local SSL</h3>
      <p class="text-slate-600">
        A <strong>reverse proxy</strong> like nginx sits in front of your application and routes requests. In local development, it can serve multiple services under one domain, handle SSL termination, and mimic your production setup.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt"># Local reverse proxy setup</span>
<span class="var">https://myapp.localhost</span>  <span class="op">-></span>  <span class="var">nginx</span>  <span class="op">-></span>  <span class="var">node:3000</span>
<span class="var">https://api.localhost</span>   <span class="op">-></span>  <span class="var">nginx</span>  <span class="op">-></span>  <span class="var">node:4000</span>

<span class="cmt"># Tools for local SSL:</span>
<span class="cmt"># - mkcert: generates locally-trusted certificates</span>
<span class="cmt"># - caddy: auto-HTTPS reverse proxy</span>`}</code></pre>
      <p class="text-sm text-slate-500">
        Some APIs (like geolocation, service workers, and WebAuthn) require HTTPS even locally. Tools like <strong>mkcert</strong> create trusted certificates for localhost development.
      </p>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
      >
        I understand local development
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a;
    color: #e2e8f0; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; color: #e2e8f0; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
