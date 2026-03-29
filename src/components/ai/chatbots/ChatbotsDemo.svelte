<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Simulated chat ===
  interface Message { role: 'user' | 'bot'; text: string; }
  let messages = $state<Message[]>([]);
  let inputText = $state('');

  const responses: Record<string, string> = {
    'hello': 'Hello! I am a demo chatbot. Ask me about programming, and I will do my best to help!',
    'what is a variable': 'A variable is like a labeled box that holds a value. You give it a name (like `age` or `userName`) and store data in it. The value can change over time — that is why it is called a "variable."',
    'what is a function': 'A function is a reusable block of code that performs a specific task. You define it once, then call it whenever you need that task done. Functions can take inputs (parameters) and return outputs.',
    'what is an api': 'An API (Application Programming Interface) is a way for different software programs to communicate. Think of it like a restaurant menu — it lists what you can order (the available operations) and what you will get back (the response).',
    'help': 'Try asking me: "What is a variable?", "What is a function?", or "What is an API?" In a real chatbot, I could answer anything!',
  };

  function sendMessage() {
    const text = inputText.trim();
    if (!text) return;
    messages = [...messages, { role: 'user', text }];
    inputText = '';

    const key = text.toLowerCase().replace(/[?!.]/g, '').trim();
    const response = responses[key] ?? "I'm a simple demo bot, so I only know a few topics. Try asking \"help\" to see what I can answer! A real LLM-powered chatbot could answer anything.";
    setTimeout(() => {
      messages = [...messages, { role: 'bot', text: response }];
    }, 500);
  }

  // === Advanced mode: System prompt designer ===
  let systemPrompt = $state('You are a helpful programming tutor. Be encouraging and use simple language.');
  let testQuestion = $state('How do I center a div?');
  const personas: { name: string; prompt: string; response: string }[] = [
    { name: 'Friendly Tutor', prompt: 'You are a friendly programming tutor. Use simple language, analogies, and be encouraging.', response: 'Great question! Centering a div is one of those things every developer needs to learn. The easiest modern way is using Flexbox on the parent: set `display: flex`, `justify-content: center`, and `align-items: center`. Think of it like telling the parent container "put your child right in the middle!" You got this!' },
    { name: 'Senior Engineer', prompt: 'You are a senior software engineer. Be concise, precise, and technical. No fluff.', response: 'Use CSS Grid or Flexbox. Grid: `display: grid; place-items: center;` on the parent. Flexbox: `display: flex; justify-content: center; align-items: center;` on the parent. Both require the parent to have a defined height. Avoid legacy approaches like `margin: 0 auto` with `transform: translateY(-50%)` unless you need IE11 support.' },
    { name: 'Pirate Bot', prompt: 'You are a pirate who teaches programming. Use pirate language and nautical metaphors.', response: 'Arrr, ye want to center a div, do ye? Listen up, matey! Set yer parent container to `display: flex` — think of it as hoisting the Flexbox flag on yer ship. Then add `justify-content: center` to sail it to the middle horizontally, and `align-items: center` to center it vertically. Yer div will be anchored right in the center of the sea! Yo ho ho!' },
  ];
  let activePersona = $state(0);
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Chat with a Bot</h2>
    <p class="text-slate-600">
      Type a message to interact with this simple demo chatbot. Try asking about programming concepts!
    </p>
  </div>

  <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-6 space-y-4">
    <div class="h-64 overflow-y-auto space-y-3 rounded-lg bg-white p-4 border border-pink-200">
      {#if messages.length === 0}
        <p class="text-center text-sm text-slate-400">Start a conversation! Try "hello" or "help"</p>
      {/if}
      {#each messages as msg}
        <div class="{msg.role === 'user' ? 'ml-8 text-right' : 'mr-8'}">
          <div class="inline-block rounded-xl px-4 py-2 text-sm {msg.role === 'user' ? 'bg-pink-500 text-white' : 'bg-slate-100 text-slate-700'}">
            {msg.text}
          </div>
        </div>
      {/each}
    </div>

    <div class="flex gap-2">
      <input
        type="text"
        bind:value={inputText}
        placeholder="Type a message..."
        class="flex-1 rounded-lg border-2 border-pink-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-pink-500 focus:outline-none"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') sendMessage(); }}
      />
      <button onclick={sendMessage}
        class="rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 active:scale-95">
        Send
      </button>
    </div>
  </div>

  <div>
    <button onclick={oncomplete}
      class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95">
      I've chatted with the bot
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: System Prompt Design</h2>
      <p class="text-slate-600">See how different system prompts change a chatbot's personality and response style.</p>
    </div>

    <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-6 space-y-4">
      <div class="flex flex-wrap gap-2">
        {#each personas as persona, i}
          <button
            onclick={() => activePersona = i}
            class="rounded-lg px-3 py-1.5 text-sm font-medium transition-all {activePersona === i ? 'bg-pink-600 text-white' : 'bg-white text-slate-600 border border-pink-200 hover:bg-pink-100'}"
          >
            {persona.name}
          </button>
        {/each}
      </div>

      <div class="rounded-lg bg-white p-4 border border-pink-200">
        <p class="text-xs font-bold uppercase text-slate-500 mb-1">System Prompt</p>
        <p class="text-sm text-slate-700 italic">{personas[activePersona].prompt}</p>
      </div>

      <div class="rounded-lg bg-white p-4 border border-pink-200">
        <p class="text-xs font-bold uppercase text-slate-500 mb-1">User Question</p>
        <p class="text-sm text-slate-800">"{testQuestion}"</p>
      </div>

      <div class="rounded-lg bg-slate-50 p-4 border border-slate-200">
        <p class="text-xs font-bold uppercase text-slate-500 mb-1">Bot Response</p>
        <p class="text-sm text-slate-700">{personas[activePersona].response}</p>
      </div>

      <p class="text-xs text-slate-500">
        Same question, completely different responses. The system prompt is the most powerful lever for controlling chatbot behavior.
      </p>
    </div>

    <div>
      <button onclick={oncomplete}
        class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95">
        I've explored system prompts
      </button>
    </div>
  </div>
  {/if}
</div>
