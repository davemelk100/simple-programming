<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Setup Checklist ===
  interface SetupStep {
    label: string;
    command: string;
    explanation: string;
  }

  const steps: SetupStep[] = [
    {
      label: 'Install Node.js',
      command: 'node --version\n# v20.11.0',
      explanation: 'Node.js is the runtime that lets you run JavaScript outside the browser. It also comes with npm (Node Package Manager). You download it from nodejs.org — the LTS (Long Term Support) version is recommended for stability.'
    },
    {
      label: 'Clone the repository',
      command: 'git clone https://github.com/user/my-project.git\ncd my-project',
      explanation: 'Cloning downloads a copy of the project from a remote server (like GitHub) to your machine. The cd command moves you into the project folder. Now you have all the source code, but none of the dependencies yet.'
    },
    {
      label: 'Install dependencies',
      command: 'npm install\n# added 847 packages in 12s',
      explanation: 'This reads the package.json file and downloads every library the project needs into a node_modules folder. The number of packages can seem huge — that\'s because each library may depend on other libraries (dependencies of dependencies). A lock file (package-lock.json) ensures everyone gets the exact same versions.'
    },
    {
      label: 'Create your .env file',
      command: 'cp .env.example .env\n# Then edit .env with your values',
      explanation: 'Most projects include a .env.example file showing what environment variables are needed, but with placeholder values. You copy it to .env and fill in your actual secrets (API keys, database URLs). The .env file is listed in .gitignore so it never gets committed.'
    },
    {
      label: 'Start the dev server',
      command: 'npm run dev\n# Local: http://localhost:3000\n# Ready in 1.2s',
      explanation: 'This runs the "dev" script defined in package.json. It starts a local web server that watches your files for changes. When you edit code and save, the server automatically reloads so you see changes instantly in your browser. Visit the localhost URL to see your running app!'
    },
  ];

  let checked = $state<boolean[]>(Array(steps.length).fill(false));
  let allChecked = $derived(checked.every(Boolean));

  function toggle(index: number) {
    checked[index] = !checked[index];
    checked = [...checked];
  }

  // === Advanced mode: Docker Compose Builder ===
  interface DockerService {
    id: string;
    name: string;
    image: string;
    port: string;
    volume: string;
    envVars: string;
    enabled: boolean;
  }

  let services = $state<DockerService[]>([
    { id: 'web', name: 'Web App (Node.js)', image: 'node:20-alpine', port: '3000:3000', volume: './src:/app/src', envVars: 'NODE_ENV=development', enabled: true },
    { id: 'db', name: 'Database (PostgreSQL)', image: 'postgres:16-alpine', port: '5432:5432', volume: 'pgdata:/var/lib/postgresql/data', envVars: 'POSTGRES_PASSWORD=devpass\n      POSTGRES_DB=myapp', enabled: false },
    { id: 'cache', name: 'Cache (Redis)', image: 'redis:7-alpine', port: '6379:6379', volume: 'redisdata:/data', envVars: '', enabled: false },
  ]);

  let showPorts = $state(true);
  let showVolumes = $state(true);
  let showEnv = $state(true);

  function toggleService(index: number) {
    services[index].enabled = !services[index].enabled;
    services = [...services];
  }

  let composeYml = $derived.by(() => {
    const enabledServices = services.filter(s => s.enabled);
    if (enabledServices.length === 0) return '# Enable at least one service above';

    let yml = 'version: "3.8"\n\nservices:';

    for (const svc of enabledServices) {
      yml += `\n  ${svc.id}:`;
      yml += `\n    image: ${svc.image}`;

      if (svc.id === 'web') {
        yml += `\n    working_dir: /app`;
        yml += `\n    command: npm run dev`;
      }

      if (showPorts && svc.port) {
        yml += `\n    ports:`;
        yml += `\n      - "${svc.port}"`;
      }

      if (showVolumes && svc.volume) {
        yml += `\n    volumes:`;
        yml += `\n      - ${svc.volume}`;
      }

      if (showEnv && svc.envVars) {
        yml += `\n    environment:`;
        for (const line of svc.envVars.split('\n')) {
          yml += `\n      - ${line.trim()}`;
        }
      }

      // Add depends_on for web if db or cache is enabled
      if (svc.id === 'web') {
        const deps = enabledServices.filter(s => s.id !== 'web').map(s => s.id);
        if (deps.length > 0) {
          yml += `\n    depends_on:`;
          for (const dep of deps) {
            yml += `\n      - ${dep}`;
          }
        }
      }
    }

    // Add named volumes if needed
    const namedVolumes = enabledServices
      .filter(s => showVolumes && s.volume && !s.volume.startsWith('./'))
      .map(s => s.volume.split(':')[0]);

    if (namedVolumes.length > 0) {
      yml += `\n\nvolumes:`;
      for (const v of namedVolumes) {
        yml += `\n  ${v}:`;
      }
    }

    return yml;
  });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Setup Checklist</h2>
    <p class="text-slate-600">
      Walk through the steps of setting up a project from scratch. Check each step to reveal what happens behind the scenes.
    </p>
  </div>

  <div class="space-y-4">
    {#each steps as step, i}
      <div class="rounded-xl border-2 transition-colors {checked[i] ? 'border-blue-400 bg-blue-50' : 'border-slate-200 bg-white'}">
        <button
          onclick={() => toggle(i)}
          class="flex w-full items-center gap-3 p-4 text-left"
        >
          <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors {checked[i] ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}">
            {#if checked[i]}
              <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            {/if}
          </div>
          <span class="text-sm font-bold text-blue-600">Step {i + 1}</span>
          <span class="font-semibold text-slate-800">{step.label}</span>
        </button>

        {#if checked[i]}
          <div class="border-t border-blue-200 px-4 pb-4 pt-3 space-y-3">
            <pre class="code-block"><code>{step.command}</code></pre>
            <p class="text-sm text-slate-600">{step.explanation}</p>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  {#if allChecked}
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">Your project is running! Open <code class="rounded bg-green-100 px-2 text-sm text-green-800">http://localhost:3000</code> in your browser.</p>
    </div>
  {/if}

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      Done exploring
    </button>
  </div>

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Docker Compose Builder</h2>
    <p class="text-slate-600">
      Pick the services your app needs and watch a <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">docker-compose.yml</code> build up in real time. Toggle options to see how the configuration changes.
    </p>
  </div>

  <div class="grid gap-6 lg:grid-cols-2">
    <!-- Controls -->
    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Services</h3>
      {#each services as svc, i}
        <button
          onclick={() => toggleService(i)}
          class="flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors {svc.enabled ? 'border-blue-400 bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'}"
        >
          <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors {svc.enabled ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}">
            {#if svc.enabled}
              <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            {/if}
          </div>
          <div>
            <p class="font-semibold text-slate-800">{svc.name}</p>
            <p class="text-xs text-slate-500">{svc.image}</p>
          </div>
        </button>
      {/each}

      <h3 class="mt-6 text-lg font-bold text-slate-800">Options</h3>
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" bind:checked={showPorts} class="h-4 w-4 rounded border-slate-300 text-blue-600" />
          Show port mappings
        </label>
        <label class="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" bind:checked={showVolumes} class="h-4 w-4 rounded border-slate-300 text-blue-600" />
          Show volumes (data persistence)
        </label>
        <label class="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" bind:checked={showEnv} class="h-4 w-4 rounded border-slate-300 text-blue-600" />
          Show environment variables
        </label>
      </div>
    </div>

    <!-- Generated YAML -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">docker-compose.yml</h3>
      <pre class="code-block" style="min-height: 300px;"><code>{composeYml}</code></pre>
      <p class="mt-2 text-xs text-slate-500">This file goes in your project root. Run <code class="rounded bg-slate-100 px-1 text-blue-700">docker-compose up</code> to start everything.</p>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      Done exploring
    </button>
  </div>

  {/if}
</div>

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
