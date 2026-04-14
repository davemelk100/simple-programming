<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);
  const cards = [
    { emoji: '\u{1F4AC}', title: 'Conversation', desc: 'Chatbots communicate through natural language, making AI accessible to everyone.' },
    { emoji: '\u{1F9E0}', title: 'Context Memory', desc: 'They remember what was said earlier in the conversation to give relevant responses.' },
    { emoji: '\u{1F3AF}', title: 'Task-Oriented', desc: 'Modern chatbots can help with research, writing, coding, analysis, and more.' },
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">What Are Chatbots?</h2>
    <p class="text-slate-600">
      A <strong>chatbot</strong> is an AI system you interact with through conversation. You type messages (or speak), and it responds in natural language. Modern chatbots powered by LLMs are far more capable than the simple rule-based bots of the past — they can understand complex questions, maintain context across a conversation, and help with a wide range of tasks.
    </p>
    <p class="mt-3 text-slate-600">
      Examples include <strong>Claude</strong> (claude.ai), <strong>ChatGPT</strong>, <strong>Gemini</strong>, and countless custom chatbots built for customer support, education, healthcare, and more.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    {#each cards as card, i}
      <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5 text-center transition-all duration-700
        {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Types of Chatbots</h3>
    <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5 space-y-4">
      <div>
        <h4 class="font-bold text-slate-800">Rule-Based Chatbots (Old School)</h4>
        <p class="text-sm text-slate-600">Follow pre-programmed scripts with if/else logic. "If the user says X, respond with Y." Limited to specific scenarios and easily confused by unexpected input. Think of automated phone menus.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">LLM-Powered Chatbots (Modern)</h4>
        <p class="text-sm text-slate-600">Use large language models to understand and generate responses. They can handle open-ended conversations, follow instructions, and adapt to context. Claude and ChatGPT are examples.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Domain-Specific Chatbots</h4>
        <p class="text-sm text-slate-600">Built for specific use cases: customer support bots that know your product, healthcare bots that triage symptoms, educational tutors that adapt to your learning level. They combine LLM intelligence with specialized knowledge.</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Use Cases</h3>
    <div class="grid gap-3 sm:grid-cols-2">
      <div class="rounded-xl border border-pink-200 bg-white p-4">
        <p class="text-sm text-slate-600"><strong>Customer Support:</strong> Answer FAQs, troubleshoot issues, escalate to humans when needed</p>
      </div>
      <div class="rounded-xl border border-pink-200 bg-white p-4">
        <p class="text-sm text-slate-600"><strong>Education:</strong> Tutoring, explaining concepts, quizzing students, adapting to learning pace</p>
      </div>
      <div class="rounded-xl border border-pink-200 bg-white p-4">
        <p class="text-sm text-slate-600"><strong>Research:</strong> Summarizing papers, answering questions, brainstorming ideas</p>
      </div>
      <div class="rounded-xl border border-pink-200 bg-white p-4">
        <p class="text-sm text-slate-600"><strong>Productivity:</strong> Writing emails, scheduling, data analysis, report generation</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Limitations to Know</h3>
    <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5">
      <ul class="space-y-2 text-sm text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>Hallucination:</strong> Chatbots can state false information confidently. Always verify important facts.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>No real-time knowledge:</strong> LLM-based chatbots have a training cutoff date and do not know about very recent events (unless they have search tools).</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>Context limits:</strong> Very long conversations may lose track of earlier details due to context window limits.</span>
        </li>
      </ul>
    </div>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95">
      I understand chatbots
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <p class="text-slate-600">Conversation design, memory management, evaluation, and building production chatbots.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Conversation Design</h3>
      <p class="text-slate-600">
        Building a good chatbot is not just about the AI model — it is about <strong>conversation design</strong>. This includes defining the bot's persona, tone, boundaries, and how it handles edge cases. A well-designed system prompt sets the foundation:
      </p>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>Persona:</strong> Who is the bot? A friendly assistant? A formal advisor? The persona affects word choice and style.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>Guardrails:</strong> What should the bot refuse to do? Off-topic requests, harmful content, and scope boundaries.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>Escalation:</strong> When should the bot hand off to a human? Detecting frustration, complex issues, or high-stakes decisions.</span>
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Memory & State Management</h3>
      <p class="text-slate-600">
        LLMs are stateless — each API call is independent. To create the illusion of memory, chatbot systems must manage conversation state:
      </p>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Short-Term Memory</h4>
          <p class="text-sm text-slate-600">The conversation history sent with each request. Limited by the context window. Strategies include summarizing older messages and keeping only the most recent N turns.</p>
        </div>
        <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Long-Term Memory</h4>
          <p class="text-sm text-slate-600">Persisted user preferences, past interactions, and learned facts stored in a database. Injected into the system prompt or retrieved via RAG for each new conversation.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Evaluation Metrics</h3>
      <p class="text-slate-600">
        Measuring chatbot quality involves both automated metrics and human evaluation: response relevance, factual accuracy, helpfulness, safety, latency, and user satisfaction scores. <strong>LLM-as-judge</strong> is an emerging approach where another AI model evaluates the chatbot's responses.
      </p>
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95">
        I understand chatbots deeply
      </button>
    </div>
  </div>
  {/if}
</div>
