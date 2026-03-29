<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Step through an agent task ===
  interface AgentStep {
    type: 'think' | 'tool' | 'observe' | 'result';
    text: string;
    toolName?: string;
  }

  const agentSteps: AgentStep[] = [
    { type: 'think', text: 'The user wants to know the weather in Tokyo. I need to search for current weather data.' },
    { type: 'tool', text: 'search("current weather Tokyo")', toolName: 'Web Search' },
    { type: 'observe', text: 'Results: Tokyo is currently 22C (72F), partly cloudy, humidity 65%, wind 12 km/h NE.' },
    { type: 'think', text: 'I have the weather data. Let me also check the forecast since the user might want to plan ahead.' },
    { type: 'tool', text: 'search("Tokyo 3-day weather forecast")', toolName: 'Web Search' },
    { type: 'observe', text: 'Forecast: Tomorrow 24C sunny, Day 3: 19C rain expected, Day 4: 21C partly cloudy.' },
    { type: 'think', text: 'I now have current conditions and a forecast. I can give a comprehensive answer.' },
    { type: 'result', text: 'Right now in Tokyo it is 22C (72F) and partly cloudy. Tomorrow looks sunny and warmer at 24C. Heads up: rain is expected in two days, so bring an umbrella if you are heading out then!' },
  ];

  let visibleSteps = $state(0);
  let isPlaying = $state(false);

  function playSteps() {
    if (isPlaying) return;
    isPlaying = true;
    visibleSteps = 0;
    const interval = setInterval(() => {
      visibleSteps++;
      if (visibleSteps >= agentSteps.length) {
        clearInterval(interval);
        isPlaying = false;
      }
    }, 1200);
  }

  function showAll() {
    visibleSteps = agentSteps.length;
    isPlaying = false;
  }

  // === Advanced mode: Build an agent tool chain ===
  const availableTools = [
    { id: 'search', name: 'Web Search', icon: '\u{1F50D}', desc: 'Search the internet for information' },
    { id: 'read', name: 'Read File', icon: '\u{1F4C4}', desc: 'Read contents of a file' },
    { id: 'write', name: 'Write File', icon: '\u{270F}\u{FE0F}', desc: 'Create or modify a file' },
    { id: 'run', name: 'Run Code', icon: '\u{25B6}\u{FE0F}', desc: 'Execute code and return output' },
    { id: 'api', name: 'API Call', icon: '\u{1F310}', desc: 'Make an HTTP request to an API' },
  ];

  let selectedTools = $state<string[]>([]);
  let task = $state('');

  const taskExamples = [
    { task: 'Find the current Bitcoin price and save it to a file', tools: ['search', 'write'] },
    { task: 'Read a CSV, calculate averages, and create a report', tools: ['read', 'run', 'write'] },
    { task: 'Fetch data from an API and write a summary', tools: ['api', 'run', 'write'] },
  ];

  function toggleTool(id: string) {
    if (selectedTools.includes(id)) {
      selectedTools = selectedTools.filter(t => t !== id);
    } else {
      selectedTools = [...selectedTools, id];
    }
  }

  function loadExample(ex: { task: string; tools: string[] }) {
    task = ex.task;
    selectedTools = [...ex.tools];
  }
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Watch an Agent Work</h2>
    <p class="text-slate-600">
      Watch an AI agent break down a task step by step. See how it thinks, uses tools, observes results, and arrives at an answer.
    </p>
  </div>

  <div class="rounded-xl border-2 border-green-200 bg-green-50 p-6 space-y-4">
    <div class="rounded-lg bg-white p-3 border border-green-200">
      <p class="text-sm text-slate-500">User asks:</p>
      <p class="font-semibold text-slate-800">"What is the weather like in Tokyo right now?"</p>
    </div>

    <div class="flex gap-2">
      <button onclick={playSteps} disabled={isPlaying}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50">
        Play Step by Step
      </button>
      <button onclick={showAll}
        class="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-300 active:scale-95">
        Show All
      </button>
    </div>

    <div class="space-y-2">
      {#each agentSteps as step, i}
        {#if i < visibleSteps}
          <div class="flex items-start gap-3 rounded-lg p-3 transition-all duration-500
            {step.type === 'think' ? 'bg-purple-50 border border-purple-200' :
             step.type === 'tool' ? 'bg-blue-50 border border-blue-200' :
             step.type === 'observe' ? 'bg-yellow-50 border border-yellow-200' :
             'bg-green-100 border border-green-300'}">
            <span class="text-lg">
              {step.type === 'think' ? '\u{1F4AD}' : step.type === 'tool' ? '\u{1F527}' : step.type === 'observe' ? '\u{1F440}' : '\u{2705}'}
            </span>
            <div>
              <p class="text-xs font-bold uppercase tracking-wider
                {step.type === 'think' ? 'text-purple-600' :
                 step.type === 'tool' ? 'text-blue-600' :
                 step.type === 'observe' ? 'text-yellow-700' :
                 'text-green-700'}">
                {step.type === 'tool' ? `Tool: ${step.toolName}` : step.type}
              </p>
              <p class="text-sm text-slate-700 {step.type === 'tool' ? 'font-mono' : ''}">{step.text}</p>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      I've seen an agent in action
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Design an Agent Toolchain</h2>
      <p class="text-slate-600">Select which tools an agent would need to accomplish a given task.</p>
    </div>

    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-6 space-y-6">
      <div>
        <p class="text-sm font-semibold text-slate-700 mb-2">Example tasks (click to load):</p>
        <div class="flex flex-wrap gap-2">
          {#each taskExamples as ex}
            <button onclick={() => loadExample(ex)}
              class="rounded-lg bg-white border border-green-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-green-100 active:scale-95">
              {ex.task}
            </button>
          {/each}
        </div>
      </div>

      {#if task}
        <div class="rounded-lg bg-white p-3 border border-green-200">
          <p class="text-sm text-slate-500">Task:</p>
          <p class="font-semibold text-slate-800">{task}</p>
        </div>
      {/if}

      <div>
        <p class="text-sm font-semibold text-slate-700 mb-2">Available tools (select what the agent needs):</p>
        <div class="grid gap-2 sm:grid-cols-3">
          {#each availableTools as tool}
            <button
              onclick={() => toggleTool(tool.id)}
              class="rounded-lg border-2 p-3 text-left transition-all {selectedTools.includes(tool.id) ? 'border-green-500 bg-green-100' : 'border-slate-200 bg-white hover:bg-green-50'}"
            >
              <div class="flex items-center gap-2">
                <span class="text-xl">{tool.icon}</span>
                <span class="text-sm font-semibold text-slate-800">{tool.name}</span>
              </div>
              <p class="text-xs text-slate-500 mt-1">{tool.desc}</p>
            </button>
          {/each}
        </div>
      </div>

      {#if selectedTools.length > 0}
        <div class="rounded-lg bg-white p-4 border border-green-200">
          <p class="text-sm font-semibold text-slate-700 mb-2">Agent execution plan:</p>
          <div class="flex flex-wrap items-center gap-2 text-sm">
            {#each selectedTools as toolId, i}
              {@const tool = availableTools.find(t => t.id === toolId)}
              <span class="rounded-lg bg-green-100 px-3 py-1.5 font-mono text-green-800">{tool?.icon} {tool?.name}</span>
              {#if i < selectedTools.length - 1}
                <span class="text-slate-400">&#8594;</span>
              {/if}
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
        I've designed agent toolchains
      </button>
    </div>
  </div>
  {/if}
</div>
