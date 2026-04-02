<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

  interface BugReport {
    id: number;
    title: string;
    severity: 'critical' | 'major' | 'minor';
    area: string;
    resolved: boolean;
  }

  let bugs = $state<BugReport[]>([
    { id: 1, title: 'Login button does nothing on mobile', severity: 'critical', area: 'Auth', resolved: false },
    { id: 2, title: 'Typo in welcome message', severity: 'minor', area: 'UI', resolved: false },
    { id: 3, title: 'Search returns wrong results for special characters', severity: 'major', area: 'Search', resolved: false },
    { id: 4, title: 'Page loads slowly with 1000+ items', severity: 'major', area: 'Performance', resolved: false },
    { id: 5, title: 'Logo slightly misaligned on tablet', severity: 'minor', area: 'UI', resolved: false },
  ]);

  let sortedBugs = $derived(
    [...bugs].sort((a, b) => {
      const order = { critical: 0, major: 1, minor: 2 };
      return order[a.severity] - order[b.severity];
    })
  );

  let resolvedCount = $derived(bugs.filter((b) => b.resolved).length);
  let allResolved = $derived(resolvedCount === bugs.length);

  function toggleResolved(id: number) {
    const bug = bugs.find((b) => b.id === id);
    if (bug) bug.resolved = !bug.resolved;
  }

  const severityColors = {
    critical: 'bg-red-100 text-red-700 border-red-300',
    major: 'bg-orange-100 text-orange-700 border-orange-300',
    minor: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  };
</script>

<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Bug Tracker</h2>
    <p class="text-slate-600">Triage and resolve bugs by severity. Fix the critical ones first!</p>
  </div>

  <!-- Progress -->
  <div class="flex items-center gap-3">
    <div class="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
      <div
        class="h-full rounded-full bg-rose-500 transition-all duration-500"
        style="width: {(resolvedCount / bugs.length) * 100}%"
      ></div>
    </div>
    <span class="text-sm font-bold text-slate-600">{resolvedCount}/{bugs.length} resolved</span>
  </div>

  <!-- Bug list -->
  <div class="space-y-2">
    {#each sortedBugs as bug (bug.id)}
      <div class="flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-300
        {bug.resolved ? 'border-green-200 bg-green-50 opacity-60' : 'border-slate-200 bg-white'}">
        <button
          onclick={() => toggleResolved(bug.id)}
          class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors
            {bug.resolved ? 'border-green-500 bg-green-500 text-white' : 'border-slate-300 hover:border-rose-400'}"
        >
          {#if bug.resolved}<span class="text-xs">&#10003;</span>{/if}
        </button>

        <div class="flex-1">
          <div class="text-sm font-medium {bug.resolved ? 'text-slate-400 line-through' : 'text-slate-800'}">
            {bug.title}
          </div>
          <div class="text-xs text-slate-500">{bug.area}</div>
        </div>

        <span class="rounded-full border px-2 py-0.5 text-xs font-bold {severityColors[bug.severity]}">
          {bug.severity}
        </span>
      </div>
    {/each}
  </div>

  {#if allResolved}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-4 text-center">
      <p class="text-lg font-bold text-green-700">All bugs resolved! Ready to ship.</p>
    </div>
  {/if}

  <div>
    <button onclick={oncomplete} class="rounded-full bg-rose-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-rose-700 active:scale-95">
      I've tried this
    </button>
  </div>
</div>
