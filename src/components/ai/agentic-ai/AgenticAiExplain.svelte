<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);
  const cards = [
    { emoji: '\u{1F9ED}', title: 'Planning', desc: 'Agents break complex tasks into steps, deciding what to do and in what order.' },
    { emoji: '\u{1F6E0}\u{FE0F}', title: 'Tool Use', desc: 'They can call APIs, search the web, run code, read files, and interact with external systems.' },
    { emoji: '\u{1F504}', title: 'Iterative Reasoning', desc: 'Agents observe results, adjust their approach, and retry when something goes wrong.' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < cards.length) visibleCards++;
      else clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">What Is Agentic AI?</h2>
    <p class="text-slate-600">
      <strong>Agentic AI</strong> refers to AI systems that can autonomously plan, make decisions, and take actions to accomplish goals. Unlike a simple chatbot that responds to one question at a time, an agent can break a complex task into steps, use tools, observe results, and adapt its approach.
    </p>
    <p class="mt-3 text-slate-600">
      Think of the difference like this: a regular LLM is like a very knowledgeable person locked in a room who can only talk. An <strong>agent</strong> is that same person, but now they have a computer, a phone, access to the internet, and the ability to go do things in the real world.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    {#each cards as card, i}
      <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center transition-all duration-700
        {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5 space-y-4">
      <div>
        <h4 class="font-bold text-slate-800">The Agent Loop</h4>
        <p class="text-sm text-slate-600">Agents follow a cycle: <strong>Think</strong> (reason about what to do next), <strong>Act</strong> (use a tool or take an action), <strong>Observe</strong> (see the result), and repeat until the task is done. This is sometimes called the ReAct (Reasoning + Acting) pattern.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Tools</h4>
        <p class="text-sm text-slate-600">Tools are functions the agent can call — web search, file operations, code execution, database queries, API calls, and more. The LLM decides <em>which</em> tool to use and <em>what arguments</em> to pass based on the current task.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Multi-Step Reasoning</h4>
        <p class="text-sm text-slate-600">Real-world tasks often require many steps. An agent might: (1) search the web for information, (2) read a document, (3) extract key facts, (4) write a summary, (5) save it to a file. Each step builds on the previous one.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Autonomy vs. Control</h4>
        <p class="text-sm text-slate-600">A key challenge is balancing how much freedom to give the agent. Too much autonomy risks errors; too little defeats the purpose. Most systems include guardrails, human-in-the-loop approval, and sandboxed execution.</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">The Agent Loop</h3>
    <div class="flex flex-wrap items-center gap-2 text-sm">
      <span class="rounded-lg bg-green-100 px-3 py-1.5 font-mono text-green-700">Receive task</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-green-200 px-3 py-1.5 font-mono text-green-800">Think & plan</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-green-300 px-3 py-1.5 font-mono text-green-900">Use a tool</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-green-200 px-3 py-1.5 font-mono text-green-800">Observe result</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-slate-700">Repeat or finish</span>
    </div>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      I understand agentic AI
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <p class="text-slate-600">Agent architectures, orchestration patterns, evaluation, and the frontier of autonomous AI systems.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Agent Architectures</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Single Agent</h4>
          <p class="text-sm text-slate-600">One LLM with tools in a loop. Simple, effective for focused tasks. Examples: Claude Code, a research assistant that searches and summarizes.</p>
        </div>
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Multi-Agent Systems</h4>
          <p class="text-sm text-slate-600">Multiple specialized agents collaborate. A "planner" agent delegates to "researcher," "coder," and "reviewer" agents. Each has its own system prompt and tools.</p>
        </div>
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Hierarchical Agents</h4>
          <p class="text-sm text-slate-600">A manager agent orchestrates sub-agents, breaking complex goals into sub-goals. Sub-agents can have their own sub-agents, creating a tree structure.</p>
        </div>
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Reflexion / Self-Correction</h4>
          <p class="text-sm text-slate-600">Agents that evaluate their own output, identify mistakes, and self-correct. They maintain a memory of past attempts and learn from failures within a single task.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Tool Design Principles</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <span><strong>Clear descriptions:</strong> The LLM chooses tools based on their descriptions. Well-written descriptions are critical for correct tool selection.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <span><strong>Minimal, composable tools:</strong> Many small, focused tools are better than a few complex ones. The agent can combine them flexibly.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <span><strong>Informative errors:</strong> When a tool fails, the error message should help the agent understand what went wrong and how to fix it.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <span><strong>Sandboxing:</strong> Tools that modify state (file writes, API calls, deployments) should run in controlled environments with rollback capabilities.</span>
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">MCP (Model Context Protocol)</h3>
      <p class="text-slate-600">
        <strong>MCP</strong> is an open standard for connecting AI agents to tools and data sources. It provides a universal protocol so that any agent can connect to any tool server without custom integration code. Think of it like USB for AI tools — a standardized way to plug capabilities into any agent.
      </p>
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
        I understand agentic AI deeply
      </button>
    </div>
  </div>
  {/if}
</div>
