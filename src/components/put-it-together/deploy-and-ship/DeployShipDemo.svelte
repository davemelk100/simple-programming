<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Deploy Checklist ===
  interface Step {
    label: string;
    detail: string;
    icon: string;
  }

  const steps: Step[] = [
    { label: 'Build passes', icon: '\uD83D\uDEE0\uFE0F', detail: 'Your source code is compiled, bundled, and minified into optimized files. Frameworks like Vite, Next.js, or Astro convert your components into static HTML, CSS, and JavaScript that browsers can understand.' },
    { label: 'Tests pass', icon: '\u2705', detail: 'Automated tests run against your code to catch bugs before they reach production. Unit tests check individual functions, integration tests verify components work together, and end-to-end tests simulate real user interactions.' },
    { label: 'Push to main', icon: '\uD83D\uDE80', detail: 'Your code is merged into the main branch via a pull request. This triggers the CI/CD pipeline. The merge signals that the code has been reviewed, approved, and is ready for production.' },
    { label: 'CI runs', icon: '\u2699\uFE0F', detail: 'The Continuous Integration server (GitHub Actions, GitLab CI, etc.) spins up a clean environment, installs dependencies, runs your build and test scripts, and reports the results. If anything fails, the pipeline stops.' },
    { label: 'Deploy to hosting', icon: '\uD83C\uDF10', detail: 'The built files are uploaded to your hosting provider (Vercel, Netlify, AWS, etc.). The platform distributes your files across its network, invalidates old caches, and makes the new version live.' },
    { label: 'Verify live site', icon: '\uD83C\uDF89', detail: 'Check that everything works on the live URL. Verify key pages load, forms submit, and no console errors appear. Monitoring tools automatically check uptime and performance after each deploy.' },
  ];

  let completedSteps = $state(0);
  let isAnimating = $state(false);

  function advanceStep() {
    if (completedSteps >= steps.length || isAnimating) return;
    isAnimating = true;
    completedSteps++;
    setTimeout(() => { isAnimating = false; }, 500);
  }

  function resetSteps() {
    completedSteps = 0;
  }

  // === Advanced mode: Pipeline Builder ===
  interface PipelineStage {
    id: string;
    label: string;
    icon: string;
  }

  const availableStages: PipelineStage[] = [
    { id: 'checkout', label: 'Checkout code', icon: '\uD83D\uDCE5' },
    { id: 'install', label: 'Install dependencies', icon: '\uD83D\uDCE6' },
    { id: 'lint', label: 'Lint code', icon: '\uD83D\uDD0D' },
    { id: 'test', label: 'Run tests', icon: '\uD83E\uDDEA' },
    { id: 'build', label: 'Build project', icon: '\uD83D\uDEE0\uFE0F' },
    { id: 'deploy', label: 'Deploy', icon: '\uD83D\uDE80' },
  ];

  let pipeline = $state<PipelineStage[]>([]);
  let draggedIdx = $state<number | null>(null);

  function addStage(stage: PipelineStage) {
    if (pipeline.find(s => s.id === stage.id)) return;
    pipeline = [...pipeline, stage];
  }

  function removeStage(idx: number) {
    pipeline = pipeline.filter((_, i) => i !== idx);
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    const arr = [...pipeline];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    pipeline = arr;
  }

  function moveDown(idx: number) {
    if (idx >= pipeline.length - 1) return;
    const arr = [...pipeline];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    pipeline = arr;
  }

  let generatedYaml = $derived(generateYaml());

  function generateYaml(): string {
    if (pipeline.length === 0) return '<span class="cmt"># Add stages above to generate a workflow</span>';

    const lines: string[] = [];
    lines.push(`<span class="var">name</span>: <span class="str">CI/CD Pipeline</span>`);
    lines.push('');
    lines.push(`<span class="kw">on</span>:`);
    lines.push(`  <span class="var">push</span>:`);
    lines.push(`    <span class="var">branches</span>: [<span class="str">main</span>]`);
    lines.push(`  <span class="var">pull_request</span>:`);
    lines.push(`    <span class="var">branches</span>: [<span class="str">main</span>]`);
    lines.push('');
    lines.push(`<span class="kw">jobs</span>:`);
    lines.push(`  <span class="var">build-and-deploy</span>:`);
    lines.push(`    <span class="var">runs-on</span>: <span class="str">ubuntu-latest</span>`);
    lines.push(`    <span class="var">steps</span>:`);

    for (const stage of pipeline) {
      switch (stage.id) {
        case 'checkout':
          lines.push(`      - <span class="var">name</span>: <span class="str">Checkout code</span>`);
          lines.push(`        <span class="kw">uses</span>: <span class="str">actions/checkout@v4</span>`);
          break;
        case 'install':
          lines.push(`      - <span class="var">name</span>: <span class="str">Install dependencies</span>`);
          lines.push(`        <span class="kw">run</span>: <span class="str">npm ci</span>`);
          break;
        case 'lint':
          lines.push(`      - <span class="var">name</span>: <span class="str">Lint code</span>`);
          lines.push(`        <span class="kw">run</span>: <span class="str">npm run lint</span>`);
          break;
        case 'test':
          lines.push(`      - <span class="var">name</span>: <span class="str">Run tests</span>`);
          lines.push(`        <span class="kw">run</span>: <span class="str">npm test</span>`);
          break;
        case 'build':
          lines.push(`      - <span class="var">name</span>: <span class="str">Build project</span>`);
          lines.push(`        <span class="kw">run</span>: <span class="str">npm run build</span>`);
          break;
        case 'deploy':
          lines.push(`      - <span class="var">name</span>: <span class="str">Deploy to production</span>`);
          lines.push(`        <span class="kw">uses</span>: <span class="str">actions/deploy@v1</span>`);
          lines.push(`        <span class="kw">with</span>:`);
          lines.push(`          <span class="var">token</span>: <span class="str">\${{ secrets.DEPLOY_TOKEN }}</span>`);
          break;
      }
    }

    return lines.join('\n');
  }
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Deploy Checklist</h2>
    <p class="text-slate-600">
      Walk through each step of a deployment. Click "Next Step" to reveal what happens behind the scenes at each stage.
    </p>
  </div>

  <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-6 space-y-4">
    {#each steps as step, i}
      <div class="flex items-start gap-4 rounded-lg px-3 py-3 transition-all duration-500
        {i < completedSteps ? 'bg-green-50 border border-green-200' : i === completedSteps ? 'bg-white border-2 border-pink-400 shadow-md' : 'bg-white/50 border border-slate-200 opacity-60'}">
        <div class="flex flex-col items-center">
          <div class="flex h-8 w-8 items-center justify-center rounded-full text-lg
            {i < completedSteps ? 'bg-green-500 text-white' : i === completedSteps ? 'bg-pink-500 text-white' : 'bg-slate-200 text-slate-500'}">
            {#if i < completedSteps}
              &#10003;
            {:else}
              {step.icon}
            {/if}
          </div>
          {#if i < steps.length - 1}
            <div class="h-4 w-0.5 {i < completedSteps ? 'bg-green-400' : 'bg-slate-200'}"></div>
          {/if}
        </div>
        <div class="flex-1">
          <p class="font-semibold text-slate-800">{i + 1}. {step.label}</p>
          {#if i < completedSteps || i === completedSteps}
            <p class="mt-1 text-sm text-slate-600 transition-all duration-500">{step.detail}</p>
          {/if}
        </div>
      </div>
    {/each}

    <div class="flex gap-3 pt-2">
      {#if completedSteps < steps.length}
        <button
          onclick={advanceStep}
          disabled={isAnimating}
          class="rounded-lg bg-pink-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-pink-700 active:scale-95 disabled:opacity-50"
        >
          Next Step
        </button>
      {:else}
        <div class="text-sm font-bold text-green-700">Your site is live! Deployment complete.</div>
      {/if}
      {#if completedSteps > 0}
        <button
          onclick={resetSteps}
          class="rounded-lg border-2 border-pink-300 bg-white px-5 py-2 text-sm font-semibold text-pink-700 transition-all hover:bg-pink-50 active:scale-95"
        >
          Reset
        </button>
      {/if}
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95"
    >
      I've explored the checklist
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Pipeline Builder</h2>
      <p class="text-slate-600">
        Assemble a CI/CD pipeline by adding stages in order. Watch a GitHub Actions YAML workflow generate in real time.
      </p>
    </div>

    <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-6 space-y-6">
      <!-- Available stages -->
      <div>
        <h4 class="mb-2 text-sm font-bold text-slate-700">Available Stages (click to add)</h4>
        <div class="flex flex-wrap gap-2">
          {#each availableStages as stage}
            <button
              onclick={() => addStage(stage)}
              disabled={!!pipeline.find(s => s.id === stage.id)}
              class="rounded-lg border-2 px-3 py-1.5 text-sm font-semibold transition-all active:scale-95
                {pipeline.find(s => s.id === stage.id) ? 'border-slate-200 bg-slate-100 text-slate-400' : 'border-pink-300 bg-white text-pink-700 hover:bg-pink-50'}"
            >
              {stage.icon} {stage.label}
            </button>
          {/each}
        </div>
      </div>

      <!-- Pipeline order -->
      <div>
        <h4 class="mb-2 text-sm font-bold text-slate-700">Your Pipeline</h4>
        {#if pipeline.length === 0}
          <p class="text-sm text-slate-500 py-4 text-center">Add stages above to build your pipeline.</p>
        {:else}
          <div class="space-y-2">
            {#each pipeline as stage, i (stage.id)}
              <div class="flex items-center gap-2 rounded-lg border border-pink-200 bg-white p-2">
                <span class="text-lg">{stage.icon}</span>
                <span class="flex-1 text-sm font-medium text-slate-800">{stage.label}</span>
                <div class="flex gap-1">
                  <button
                    onclick={() => moveUp(i)}
                    disabled={i === 0}
                    class="rounded px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                  >
                    &#9650;
                  </button>
                  <button
                    onclick={() => moveDown(i)}
                    disabled={i === pipeline.length - 1}
                    class="rounded px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                  >
                    &#9660;
                  </button>
                  <button
                    onclick={() => removeStage(i)}
                    class="rounded px-2 py-0.5 text-xs text-red-500 hover:bg-red-50"
                  >
                    &#10005;
                  </button>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Generated YAML -->
      <div>
        <h4 class="mb-2 text-sm font-bold text-slate-700">Generated GitHub Actions Workflow</h4>
        <pre class="code-block"><code>{@html generatedYaml}</code></pre>
      </div>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95"
      >
        I've built my pipeline
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a;
    color: #e2e8f0; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
