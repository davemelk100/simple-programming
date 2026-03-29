<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic: Stack Builder ===
  const frontendOptions = ['React', 'Svelte', 'Vue', 'Angular'];
  const backendOptions = ['Node.js', 'Python', 'Go', 'Ruby'];
  const databaseOptions = ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite'];
  const hostingOptions = ['Vercel', 'Netlify', 'AWS', 'Railway'];

  let selectedFrontend = $state('');
  let selectedBackend = $state('');
  let selectedDatabase = $state('');
  let selectedHosting = $state('');

  let stackComplete = $derived(
    selectedFrontend !== '' && selectedBackend !== '' && selectedDatabase !== '' && selectedHosting !== ''
  );

  const templateNames: Record<string, string> = {
    'React+Node.js': 'MERN Stack',
    'React+Python': 'React + Django',
    'React+Go': 'React + Go API',
    'React+Ruby': 'React + Rails',
    'Svelte+Node.js': 'SvelteKit Full-Stack',
    'Svelte+Python': 'Svelte + FastAPI',
    'Svelte+Go': 'Svelte + Go API',
    'Svelte+Ruby': 'Svelte + Rails API',
    'Vue+Node.js': 'MEVN Stack',
    'Vue+Python': 'Vue + Django',
    'Vue+Go': 'Vue + Go API',
    'Vue+Ruby': 'Vue + Rails',
    'Angular+Node.js': 'MEAN Stack',
    'Angular+Python': 'Angular + Django',
    'Angular+Go': 'Angular + Go API',
    'Angular+Ruby': 'Angular + Rails',
  };

  let templateName = $derived(
    templateNames[`${selectedFrontend}+${selectedBackend}`] || 'Custom Stack'
  );

  // === Advanced: Trade-off Matrix ===
  interface StackProfile {
    name: string;
    learningCurve: number;
    performance: number;
    ecosystem: number;
    deployment: number;
    community: number;
  }

  const stackProfiles: StackProfile[] = [
    { name: 'Next.js + Vercel', learningCurve: 7, performance: 8, ecosystem: 9, deployment: 10, community: 9 },
    { name: 'SvelteKit + Netlify', learningCurve: 8, performance: 9, ecosystem: 6, deployment: 9, community: 7 },
    { name: 'Django + AWS', learningCurve: 6, performance: 7, ecosystem: 8, deployment: 5, community: 8 },
  ];

  const criteria = ['learningCurve', 'performance', 'ecosystem', 'deployment', 'community'] as const;
  const criteriaLabels: Record<string, string> = {
    learningCurve: 'Learning Curve',
    performance: 'Performance',
    ecosystem: 'Ecosystem',
    deployment: 'Deploy Ease',
    community: 'Community',
  };
  const barColors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500'];
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Stack Builder</h2>
    <p class="text-slate-600">Pick one technology from each layer to build your stack.</p>
  </div>

  <!-- Layer selectors -->
  <div class="space-y-5">
    <!-- Frontend -->
    <div>
      <p class="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">Frontend</p>
      <div class="flex flex-wrap gap-2">
        {#each frontendOptions as opt}
          <button
            onclick={() => selectedFrontend = opt}
            class="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all
              {selectedFrontend === opt ? 'border-blue-500 bg-blue-500 text-white shadow-md' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'}"
          >
            {opt}
          </button>
        {/each}
      </div>
    </div>

    <!-- Backend -->
    <div>
      <p class="mb-2 text-sm font-bold uppercase tracking-wider text-indigo-600">Backend</p>
      <div class="flex flex-wrap gap-2">
        {#each backendOptions as opt}
          <button
            onclick={() => selectedBackend = opt}
            class="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all
              {selectedBackend === opt ? 'border-indigo-500 bg-indigo-500 text-white shadow-md' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300'}"
          >
            {opt}
          </button>
        {/each}
      </div>
    </div>

    <!-- Database -->
    <div>
      <p class="mb-2 text-sm font-bold uppercase tracking-wider text-violet-600">Database</p>
      <div class="flex flex-wrap gap-2">
        {#each databaseOptions as opt}
          <button
            onclick={() => selectedDatabase = opt}
            class="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all
              {selectedDatabase === opt ? 'border-violet-500 bg-violet-500 text-white shadow-md' : 'border-slate-200 bg-white text-slate-700 hover:border-violet-300'}"
          >
            {opt}
          </button>
        {/each}
      </div>
    </div>

    <!-- Hosting -->
    <div>
      <p class="mb-2 text-sm font-bold uppercase tracking-wider text-sky-600">Hosting</p>
      <div class="flex flex-wrap gap-2">
        {#each hostingOptions as opt}
          <button
            onclick={() => selectedHosting = opt}
            class="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all
              {selectedHosting === opt ? 'border-sky-500 bg-sky-500 text-white shadow-md' : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300'}"
          >
            {opt}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Result card -->
  {#if stackComplete}
    <div class="rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-lg transition-all duration-500">
      <p class="mb-1 text-xs font-bold uppercase tracking-wider text-blue-500">Your Stack</p>
      <h3 class="mb-4 text-xl font-bold text-slate-800">{templateName}</h3>
      <div class="flex flex-col gap-0">
        <div class="flex items-center gap-3 rounded-t-lg border border-sky-300 bg-sky-100 px-4 py-2">
          <span class="w-20 text-xs font-bold text-sky-600">Hosting</span>
          <span class="font-medium text-sky-800">{selectedHosting}</span>
        </div>
        <div class="flex items-center gap-3 border-x border-blue-300 bg-blue-100 px-4 py-2">
          <span class="w-20 text-xs font-bold text-blue-600">Frontend</span>
          <span class="font-medium text-blue-800">{selectedFrontend}</span>
        </div>
        <div class="flex items-center gap-3 border-x border-indigo-300 bg-indigo-100 px-4 py-2">
          <span class="w-20 text-xs font-bold text-indigo-600">Backend</span>
          <span class="font-medium text-indigo-800">{selectedBackend}</span>
        </div>
        <div class="flex items-center gap-3 rounded-b-lg border border-violet-300 bg-violet-100 px-4 py-2">
          <span class="w-20 text-xs font-bold text-violet-600">Database</span>
          <span class="font-medium text-violet-800">{selectedDatabase}</span>
        </div>
      </div>
      <p class="mt-3 text-sm text-slate-500">Starter template: <strong>{templateName}</strong></p>
    </div>
  {/if}

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95"
    >
      Done
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Trade-off Matrix</h2>
      <p class="text-slate-600">Compare three popular stacks across key criteria. Each score is out of 10.</p>
    </div>

    <!-- Legend -->
    <div class="flex flex-wrap gap-4">
      {#each stackProfiles as profile, i}
        <div class="flex items-center gap-2">
          <div class="h-3 w-3 rounded-full {barColors[i]}"></div>
          <span class="text-sm font-medium text-slate-700">{profile.name}</span>
        </div>
      {/each}
    </div>

    <!-- Bar chart comparison -->
    <div class="space-y-6">
      {#each criteria as criterion}
        <div>
          <p class="mb-2 text-sm font-bold text-slate-600">{criteriaLabels[criterion]}</p>
          <div class="space-y-1.5">
            {#each stackProfiles as profile, i}
              <div class="flex items-center gap-2">
                <span class="w-36 truncate text-xs text-slate-500">{profile.name}</span>
                <div class="flex-1">
                  <div
                    class="h-5 rounded-full {barColors[i]} flex items-center justify-end pr-2 text-xs font-bold text-white transition-all duration-700"
                    style="width: {profile[criterion] * 10}%"
                  >
                    {profile[criterion]}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <!-- Summary cards -->
    <div class="grid gap-3 sm:grid-cols-3">
      {#each stackProfiles as profile, i}
        {@const avg = ((profile.learningCurve + profile.performance + profile.ecosystem + profile.deployment + profile.community) / 5).toFixed(1)}
        <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div class="mb-2 flex items-center gap-2">
            <div class="h-3 w-3 rounded-full {barColors[i]}"></div>
            <p class="font-bold text-slate-800">{profile.name}</p>
          </div>
          <p class="text-2xl font-bold text-slate-700">{avg}<span class="text-sm font-normal text-slate-400"> / 10 avg</span></p>
          <p class="mt-1 text-xs text-slate-500">
            {#if i === 0}Best for: rapid deployment, large teams{/if}
            {#if i === 1}Best for: performance, small bundles{/if}
            {#if i === 2}Best for: data-heavy apps, ML integration{/if}
          </p>
        </div>
      {/each}
    </div>

    <div class="rounded-xl border border-blue-200 bg-blue-50 p-4">
      <p class="text-sm text-slate-700">
        <strong>Key takeaway:</strong> There is no universally "best" stack. The right choice depends on your project requirements, team skills, and constraints. A stack that scores lower on deployment ease might be perfect if you have strong DevOps expertise.
      </p>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
        Done
      </button>
    </div>
  </div>
  {/if}
</div>
