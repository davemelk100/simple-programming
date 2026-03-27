<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);

  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });


  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();


  const steps = [
    { before: '---', action: 'Start', after: 'count = 0' },
    { before: 'count = 0', action: '+ 1', after: 'count = 1' },
    { before: 'count = 1', action: '+ 1', after: 'count = 2' },
  ];

  let visibleSteps = $state(0);

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleSteps < steps.length) {
        visibleSteps++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      <strong>State</strong> is the current snapshot of your data — a value that changes over time. Think of a counter: it starts at 0, and each time you click +1, the state updates. Understanding state means understanding how your program <strong>evolves</strong> over time.
    </p>
  </div>

  <!-- Timeline -->
  <div class="">
    <h3 class="mb-4 text-sm font-bold text-pink-600">Timeline of a Counter</h3>

    <div class="space-y-4">
      {#each steps as step, i}
        <div class="flex items-center gap-3 transition-all duration-700
          {i < visibleSteps ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}">
          <!-- Step number -->
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white shadow-md">
            {i + 1}
          </div>

          <!-- Before -->
          <div class="rounded-lg bg-slate-100 px-3 py-2 text-xs">
            <span class="text-slate-500">Before:</span>
            <span class="ml-1 font-mono font-bold text-slate-600">{step.before}</span>
          </div>

          <!-- Action -->
          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-xs font-bold text-pink-700">
            {step.action}
          </div>

          <!-- Arrow -->
          <svg class="h-4 w-6 shrink-0 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>

          <!-- After -->
          <div class="rounded-lg bg-pink-100 px-3 py-2 text-xs">
            <span class="text-pink-500">After:</span>
            <span class="ml-1 font-mono font-bold text-pink-700">{step.after}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-pink-500 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-600 active:scale-95">
      I've read this
    </button>
  </div>

  {:else}
  <div class="space-y-8">
    <div>
      <p class="text-slate-600">
        State management is one of the hardest problems in software. Beyond simple variables, real applications use <strong>state machines</strong> to model valid transitions, <strong>immutability</strong> to prevent accidental mutations, <strong>reactive state</strong> that automatically updates the UI, and established <strong>patterns</strong> for organizing complex state.
      </p>
    </div>

    <!-- Code example -->
    <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm">
      <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">TypeScript</div>
      <pre class="text-green-400">// State machine - only valid transitions
type State = "idle" | "loading" | "success" | "error";
type Event = "FETCH" | "RESOLVE" | "REJECT" | "RESET";

function transition(state: State, event: Event): State {'{'}
  switch (state) {'{'}
    case "idle":
      if (event === "FETCH") return "loading";
      break;
    case "loading":
      if (event === "RESOLVE") return "success";
      if (event === "REJECT") return "error";
      break;
    case "success":
    case "error":
      if (event === "RESET") return "idle";
      break;
  {'}'}
  return state; // invalid transition, stay put
{'}'}

// Immutability - never mutate, always create new
const addTodo = (todos: Todo[], text: string): Todo[] =&gt;
  [...todos, {'{'} id: Date.now(), text, done: false {'}'}];

const toggleTodo = (todos: Todo[], id: number): Todo[] =&gt;
  todos.map(t =&gt; t.id === id ? {'{'} ...t, done: !t.done {'}'} : t);

// Reactive state (Svelte 5 runes)
let count = $state(0);
let doubled = $derived(count * 2);
// UI updates automatically when count changes</pre>
    </div>

    <!-- State machine diagram -->
    <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-pink-600">State Machine Flow</h3>
      <div class="flex items-center justify-between gap-2">
        <div class="rounded-lg bg-slate-200 px-3 py-2 text-center text-xs font-bold text-slate-700">idle</div>
        <div class="flex flex-col items-center">
          <span class="text-xs text-pink-500">FETCH</span>
          <svg class="h-4 w-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </div>
        <div class="rounded-lg bg-yellow-200 px-3 py-2 text-center text-xs font-bold text-yellow-700">loading</div>
        <div class="flex flex-col items-center gap-1">
          <div class="flex flex-col items-center">
            <span class="text-xs text-green-500">RESOLVE</span>
            <svg class="h-4 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="rounded-lg bg-green-200 px-3 py-2 text-center text-xs font-bold text-green-700">success</div>
          <div class="rounded-lg bg-red-200 px-3 py-2 text-center text-xs font-bold text-red-700">error</div>
        </div>
      </div>
    </div>

    <!-- Key concepts list -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <strong>State machines</strong> model all valid states and transitions, making it impossible to reach an "impossible" state (e.g., loading and error at the same time).
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <strong>Immutability</strong>: instead of mutating objects/arrays, create new copies with changes. This makes state changes predictable and enables undo, time-travel debugging, and efficient change detection.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <strong>Reactive state</strong> (like Svelte's <code class="text-sm">$state</code> and <code class="text-sm">$derived</code>) automatically propagates changes to the UI without manual DOM updates.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <strong>Single source of truth</strong>: keep each piece of state in exactly one place. Derived values should be computed, not stored separately.
        </li>
      </ul>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-pink-500 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-600 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>
