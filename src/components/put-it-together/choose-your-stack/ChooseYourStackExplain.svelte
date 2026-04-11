<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleLayers = $state(0);

  const layers = [
    { name: 'Hosting', examples: 'Vercel, Netlify, AWS', color: 'bg-sky-100 border-sky-400 text-sky-700', icon: '☁️' },
    { name: 'Frontend', examples: 'React, Svelte, Vue', color: 'bg-blue-100 border-blue-400 text-blue-700', icon: '🖼️' },
    { name: 'Backend', examples: 'Node.js, Python, Go', color: 'bg-indigo-100 border-indigo-400 text-indigo-700', icon: '⚙️' },
    { name: 'Database', examples: 'PostgreSQL, MongoDB', color: 'bg-violet-100 border-violet-400 text-violet-700', icon: '💾' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleLayers < layers.length) {
        visibleLayers++;
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
      A <strong>stack</strong> is the combination of technologies you use to build an app. Think of it like a layer cake: each layer handles a different job. Together, they form everything your app needs to work.
    </p>
  </div>

  <!-- Stack Layer Cake -->
  <div class="mx-auto flex max-w-md flex-col-reverse gap-0">
    {#each layers as layer, i}
      <div
        class="flex items-center gap-3 border-2 border-dashed px-5 py-4 transition-all duration-700
          {layer.color}
          {i < visibleLayers ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          {i === 0 ? 'rounded-b-xl' : ''} {i === layers.length - 1 ? 'rounded-t-xl' : ''}"
      >
        <span class="text-2xl">{layer.icon}</span>
        <div>
          <p class="font-bold">{layer.name}</p>
          <p class="text-sm opacity-75">{layer.examples}</p>
        </div>
      </div>
    {/each}
  </div>

  <div class="space-y-4">
    <div class="rounded-xl border border-blue-200 bg-blue-50 p-5">
      <h3 class="mb-2 font-bold text-blue-800">The Four Layers</h3>
      <ul class="space-y-2 text-sm text-slate-700">
        <li class="flex items-start gap-2">
          <span class="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <span><strong>Frontend</strong> -- what the user sees and interacts with. Frameworks like React, Svelte, and Vue help you build interactive UIs.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Backend</strong> -- the server-side logic. Node.js lets you use JavaScript, but Python (Django/Flask) and Go are popular too.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-violet-500"></span>
          <span><strong>Database</strong> -- where your data lives permanently. PostgreSQL is a powerful relational database; MongoDB stores flexible JSON-like documents.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
          <span><strong>Hosting</strong> -- where your app runs on the internet. Vercel and Netlify are great for frontend apps; AWS gives you full control.</span>
        </li>
      </ul>
    </div>

    <div class="rounded-xl border border-amber-200 bg-amber-50 p-5">
      <h3 class="mb-2 font-bold text-amber-800">How Do You Pick?</h3>
      <p class="text-sm text-slate-700">
        Start with what you are learning, not what is trendy. If you know JavaScript, a stack like <strong>React + Node.js + PostgreSQL + Vercel</strong> is a great first choice. You can always swap pieces later -- that is the beauty of thinking in layers.
      </p>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-3 text-2xl font-bold text-slate-800">Choosing a Stack (Advanced)</h2>
      <p class="text-slate-600">
        Beyond picking individual technologies, modern development offers <strong>full-stack frameworks</strong>, architectural patterns, and deployment paradigms that bundle decisions together.
      </p>
    </div>

    <!-- Full-stack frameworks -->
    <div class="rounded-xl border border-blue-200 bg-blue-50 p-5">
      <h3 class="mb-3 font-bold text-blue-800">Full-Stack Frameworks</h3>
      <p class="mb-3 text-sm text-slate-700">
        These frameworks handle both frontend and backend, so you write one codebase instead of two:
      </p>
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-lg bg-white p-3 shadow-sm">
          <p class="font-bold text-slate-800">Next.js</p>
          <p class="text-xs text-slate-500">React-based. SSR, SSG, API routes, App Router. Huge ecosystem.</p>
        </div>
        <div class="rounded-lg bg-white p-3 shadow-sm">
          <p class="font-bold text-slate-800">SvelteKit</p>
          <p class="text-xs text-slate-500">Svelte-based. File-based routing, server functions, minimal JS shipped.</p>
        </div>
        <div class="rounded-lg bg-white p-3 shadow-sm">
          <p class="font-bold text-slate-800">Nuxt</p>
          <p class="text-xs text-slate-500">Vue-based. Auto-imports, server routes, great DX with Vue ecosystem.</p>
        </div>
        <div class="rounded-lg bg-white p-3 shadow-sm">
          <p class="font-bold text-slate-800">Remix</p>
          <p class="text-xs text-slate-500">React-based. Nested routes, progressive enhancement, web standards focus.</p>
        </div>
      </div>
    </div>

    <!-- JAMstack -->
    <div class="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
      <h3 class="mb-2 font-bold text-indigo-800">JAMstack Architecture</h3>
      <p class="text-sm text-slate-700">
        <strong>J</strong>avaScript + <strong>A</strong>PIs + <strong>M</strong>arkup. The idea is to pre-render as much as possible at build time, serve static files from a CDN, and use APIs for dynamic data. Benefits: speed, security, scalability. Tools like Astro, Gatsby, and 11ty excel here.
      </p>
    </div>

    <!-- Serverless vs Traditional -->
    <div class="rounded-xl border border-purple-200 bg-purple-50 p-5">
      <h3 class="mb-3 font-bold text-purple-800">Serverless vs. Traditional Servers</h3>
      <div class="space-y-3">
        <div class="flex items-start gap-3">
          <div class="w-24 shrink-0 rounded bg-purple-600 px-2 py-1 text-center text-xs font-bold text-white">Serverless</div>
          <p class="text-sm text-slate-700">Code runs only when triggered (AWS Lambda, Vercel Functions, Cloudflare Workers). You pay per invocation, not for idle time. Great for variable traffic. Cold starts can add latency.</p>
        </div>
        <div class="flex items-start gap-3">
          <div class="w-24 shrink-0 rounded bg-purple-500 px-2 py-1 text-center text-xs font-bold text-white">Traditional</div>
          <p class="text-sm text-slate-700">A long-running server process (Express, Django, Go). You manage scaling yourself (or use containers/Kubernetes). Predictable latency, better for WebSocket connections and long-running tasks.</p>
        </div>
      </div>
    </div>

    <!-- Monolith vs Microservices -->
    <div class="rounded-xl border border-slate-200 bg-white p-5">
      <h3 class="mb-3 font-bold text-slate-800">Monolith vs. Microservices</h3>
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-lg border-2 border-blue-200 p-4">
          <p class="mb-1 font-bold text-blue-700">Monolith</p>
          <p class="text-sm text-slate-600">One codebase, one deployment. Simpler to develop, test, and deploy. Start here for most projects.</p>
        </div>
        <div class="rounded-lg border-2 border-blue-200 p-4">
          <p class="mb-1 font-bold text-blue-700">Microservices</p>
          <p class="text-sm text-slate-600">Many small services, each with its own deploy. Allows independent scaling and different tech per service. High operational complexity.</p>
        </div>
      </div>
    </div>

    <!-- Trade-offs -->
    <div class="rounded-xl border border-amber-200 bg-amber-50 p-5">
      <h3 class="mb-2 font-bold text-amber-800">Evaluating Trade-offs</h3>
      <ul class="space-y-1 text-sm text-slate-700">
        <li><strong>Performance:</strong> How fast does it render? What is the bundle size?</li>
        <li><strong>Developer Experience (DX):</strong> How productive are you? Is the tooling mature?</li>
        <li><strong>Ecosystem:</strong> Are there libraries, plugins, and community support?</li>
        <li><strong>Hiring:</strong> Can you find developers who know this stack?</li>
        <li><strong>Lock-in:</strong> How easy is it to migrate away if needed?</li>
      </ul>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>
