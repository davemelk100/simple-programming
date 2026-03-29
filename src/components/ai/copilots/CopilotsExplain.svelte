<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);
  const cards = [
    { emoji: '\u{26A1}', title: 'Code Completion', desc: 'Suggests the next line or block of code as you type, like autocomplete on steroids.' },
    { emoji: '\u{1F4AC}', title: 'Chat & Explain', desc: 'Ask questions about your codebase, get explanations, and discuss design decisions.' },
    { emoji: '\u{1F41B}', title: 'Debug & Fix', desc: 'Find bugs, suggest fixes, and help you understand error messages.' },
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">What Are AI Copilots?</h2>
    <p class="text-slate-600">
      An <strong>AI copilot</strong> is an AI assistant that works alongside you while you code. It lives inside your code editor or terminal and helps you write code faster, understand unfamiliar code, find bugs, and learn new technologies. Think of it as a very experienced pair programmer that is always available.
    </p>
    <p class="mt-3 text-slate-600">
      Popular copilots include <strong>GitHub Copilot</strong>, <strong>Claude Code</strong> (Anthropic's CLI coding agent), <strong>Cursor</strong>, and <strong>Codeium</strong>. They have fundamentally changed how developers work — not by replacing programmers, but by handling repetitive tasks and accelerating the creative parts of coding.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    {#each cards as card, i}
      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5 text-center transition-all duration-700
        {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">How Copilots Work</h3>
    <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5 space-y-4">
      <div>
        <h4 class="font-bold text-slate-800">Context Awareness</h4>
        <p class="text-sm text-slate-600">Copilots read your open files, project structure, and even your recent edits to understand what you are building. The more context they have, the better their suggestions.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Inline Suggestions</h4>
        <p class="text-sm text-slate-600">As you type, the copilot predicts what you want to write next and shows it as grayed-out text. Press Tab to accept, or keep typing to ignore. It can suggest entire functions, not just single lines.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Chat Interface</h4>
        <p class="text-sm text-slate-600">Most copilots also have a chat panel where you can ask questions like "How does this function work?" or "Write a test for this component." The AI can see your code and give contextual answers.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Terminal Copilots</h4>
        <p class="text-sm text-slate-600">Tools like Claude Code work directly in your terminal. You describe what you want in plain English, and the agent writes, edits, and runs code across your entire project — reading files, making changes, and running tests.</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Best Practices</h3>
    <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
      <ul class="space-y-2 text-sm text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>Always review suggestions</strong> — copilots can generate plausible but incorrect code. You are responsible for what gets committed.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>Write clear comments and function names</strong> — this gives the copilot better context to generate accurate code.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>Use it to learn, not just produce</strong> — ask "why" questions. Understand the code it generates rather than blindly accepting it.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>Start with a description</strong> — write a comment describing what you want before you start coding. The copilot will use it as a guide.</span>
        </li>
      </ul>
    </div>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
      I understand AI copilots
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Copilots (Advanced)</h2>
      <p class="text-slate-600">How copilots work under the hood, evaluation, security considerations, and maximizing productivity.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Under the Hood</h3>
      <p class="text-slate-600">
        Copilots use <strong>Fill-in-the-Middle (FIM)</strong> models trained specifically on code. Unlike standard LLMs that only predict the next token, FIM models can fill in code given both prefix (code before the cursor) and suffix (code after the cursor). This produces much better inline completions.
      </p>
      <p class="text-slate-600">
        The copilot client sends your current file, open tabs, and relevant project context to the model. Advanced systems use <strong>retrieval-augmented generation (RAG)</strong> to search your entire codebase for relevant functions, types, and patterns before generating suggestions.
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Editor vs. Terminal Copilots</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Editor-Based (Copilot, Cursor)</h4>
          <p class="text-sm text-slate-600">Inline completions as you type. Chat in a side panel. Great for writing new code, refactoring, and explaining. Limited to actions within the editor.</p>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Terminal-Based (Claude Code)</h4>
          <p class="text-sm text-slate-600">Full agentic capabilities: reads/writes files, runs commands, executes tests, manages git. Can handle complex multi-file tasks autonomously. Works on entire projects.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Security Considerations</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>Code confidentiality:</strong> Your code is sent to remote servers for processing. Ensure your organization's policies allow this, especially for proprietary code.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>Generated vulnerabilities:</strong> Copilots can suggest code with security flaws (SQL injection, hardcoded secrets, etc.). Always run security linting on generated code.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <span><strong>License compliance:</strong> Generated code may resemble open-source code from the training data. Be aware of licensing obligations.</span>
        </li>
      </ul>
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
        I understand copilots deeply
      </button>
    </div>
  </div>
  {/if}
</div>
