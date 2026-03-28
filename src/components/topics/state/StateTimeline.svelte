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

  // --- Basic mode state ---
  let count = $state(0);

  interface TimelineNode { value: number; action: string; }
  let timeline = $state<TimelineNode[]>([{ value: 0, action: 'Start' }]);

  function increment() {
    count++;
    timeline.push({ value: count, action: '+1' });
  }

  function decrement() {
    count--;
    timeline.push({ value: count, action: '-1' });
  }

  function resetAll() {
    count = 0;
    timeline = [{ value: 0, action: 'Start' }];
  }

  // --- Advanced mode state ---
  interface AdvancedSnapshot {
    counter: number;
    text: string;
    toggle: boolean;
    label: string;
    mutable: boolean;
  }

  let advCounter = $state(0);
  let advText = $state('');
  let advToggle = $state(false);

  let advHistory = $state<AdvancedSnapshot[]>([
    { counter: 0, text: '', toggle: false, label: 'Initial', mutable: false }
  ]);
  let advCursor = $state(0);

  // State machine
  type MachineState = 'idle' | 'editing' | 'dirty' | 'saved';
  let machineState = $state<MachineState>('idle');

  const machineTransitions: Record<MachineState, { event: string; next: MachineState }[]> = {
    idle: [{ event: 'EDIT', next: 'editing' }],
    editing: [{ event: 'CHANGE', next: 'dirty' }, { event: 'CANCEL', next: 'idle' }],
    dirty: [{ event: 'SAVE', next: 'saved' }, { event: 'CHANGE', next: 'dirty' }, { event: 'CANCEL', next: 'idle' }],
    saved: [{ event: 'EDIT', next: 'editing' }, { event: 'RESET', next: 'idle' }],
  };

  let codeTab = $state<'immutable' | 'mutable' | 'machine'>('immutable');

  function advPushSnapshot(label: string, mutable: boolean) {
    const snap: AdvancedSnapshot = {
      counter: advCounter,
      text: advText,
      toggle: advToggle,
      label,
      mutable,
    };
    // Truncate any future history beyond cursor
    advHistory = [...advHistory.slice(0, advCursor + 1), snap];
    advCursor = advHistory.length - 1;
  }

  function advJumpTo(index: number) {
    advCursor = index;
    const snap = advHistory[index];
    advCounter = snap.counter;
    advText = snap.text;
    advToggle = snap.toggle;
  }

  function advUndo() {
    if (advCursor > 0) advJumpTo(advCursor - 1);
  }

  function advRedo() {
    if (advCursor < advHistory.length - 1) advJumpTo(advCursor + 1);
  }

  function advIncrement() {
    advCounter++;
    advPushSnapshot('counter +1', false);
    if (machineState === 'editing' || machineState === 'dirty') machineState = 'dirty';
  }

  function advDecrement() {
    advCounter--;
    advPushSnapshot('counter -1', false);
    if (machineState === 'editing' || machineState === 'dirty') machineState = 'dirty';
  }

  function advSetText(value: string) {
    advText = value;
    advPushSnapshot(`text = "${value.slice(0, 12)}"`, false);
    if (machineState === 'editing' || machineState === 'dirty') machineState = 'dirty';
  }

  function advToggleFlag() {
    advToggle = !advToggle;
    advPushSnapshot(`toggle ${advToggle ? 'ON' : 'OFF'}`, false);
    if (machineState === 'editing' || machineState === 'dirty') machineState = 'dirty';
  }

  function advMutateInPlace() {
    advCounter += 10;
    advPushSnapshot('MUTATED +10', true);
  }

  function advImmutableUpdate() {
    advCounter += 10;
    advPushSnapshot('new state +10', false);
  }

  function advTransition(event: string) {
    const available = machineTransitions[machineState];
    const match = available.find(t => t.event === event);
    if (match) machineState = match.next;
  }

  function advResetAll() {
    advCounter = 0;
    advText = '';
    advToggle = false;
    advHistory = [{ counter: 0, text: '', toggle: false, label: 'Initial', mutable: false }];
    advCursor = 0;
    machineState = 'idle';
  }

  const machineStates: MachineState[] = ['idle', 'editing', 'dirty', 'saved'];
  const machineColors: Record<MachineState, string> = {
    idle: 'bg-slate-200 text-slate-700 border-slate-300',
    editing: 'bg-yellow-200 text-yellow-700 border-yellow-300',
    dirty: 'bg-orange-200 text-orange-700 border-orange-300',
    saved: 'bg-green-200 text-green-700 border-green-300',
  };
  const machineActiveColors: Record<MachineState, string> = {
    idle: 'bg-slate-500 text-white border-slate-600',
    editing: 'bg-yellow-500 text-white border-yellow-600',
    dirty: 'bg-orange-500 text-white border-orange-600',
    saved: 'bg-green-500 text-white border-green-600',
  };
</script>

<div class="space-y-6">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: State Timeline</h2>
    <p class="text-slate-600">Change the counter and watch the history build!</p>
  </div>

  <!-- Counter -->
  <div class="flex items-center justify-center gap-4">
    <button
      onclick={decrement}
      class="flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 text-xl font-bold text-white shadow-md transition-all hover:bg-pink-600 hover:scale-110 active:scale-95"
    >
      -
    </button>

    <div class="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-pink-400 bg-pink-50 shadow-lg">
      <span class="text-3xl font-black text-pink-700 transition-all duration-200">{count}</span>
    </div>

    <button
      onclick={increment}
      class="flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 text-xl font-bold text-white shadow-md transition-all hover:bg-pink-600 hover:scale-110 active:scale-95"
    >
      +
    </button>
  </div>

  <div>
    <button onclick={resetAll} class="text-sm text-slate-500 hover:text-slate-600 underline">Reset</button>
  </div>

  <!-- Timeline -->
  <div class="max-w-lg overflow-x-auto">
    <h3 class="mb-3 text-sm font-bold text-pink-600">History Timeline</h3>

    <div class="flex items-center gap-1 pb-2">
      {#each timeline as node, i (i)}
        <div class="flex items-center gap-1 node-appear">
          <div class="flex flex-col items-center gap-1">
            <div class="flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold shadow-sm transition-all
              {i === timeline.length - 1 ? 'border-pink-500 bg-pink-500 text-white scale-110' : 'border-pink-300 bg-pink-50 text-pink-700'}">
              {node.value}
            </div>
            <span class="text-xs text-pink-400">{node.action}</span>
          </div>

          {#if i < timeline.length - 1}
            <svg class="h-4 w-5 shrink-0 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <p class="text-xs text-slate-500">
    {timeline.length} step{timeline.length !== 1 ? 's' : ''} recorded. Current state: <strong>{count}</strong>
  </p>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-pink-500 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-600 active:scale-95">
      I've tried this
    </button>
  </div>

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Advanced: State Management Lab</h2>
    <p class="text-slate-600">Track multiple state variables, travel through time, and compare mutable vs immutable updates.</p>
  </div>

  <!-- Multiple State Variables -->
  <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5 space-y-4">
    <h3 class="text-sm font-bold uppercase tracking-wider text-pink-600">Live State Variables</h3>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <!-- Counter -->
      <div class="rounded-lg bg-white p-3 shadow-sm border border-pink-100">
        <div class="text-xs font-bold text-slate-500 mb-2">counter: number</div>
        <div class="flex items-center justify-center gap-2">
          <button onclick={advDecrement} class="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white hover:bg-pink-600 active:scale-95">-</button>
          <span class="text-2xl font-black text-pink-700 w-12 text-center">{advCounter}</span>
          <button onclick={advIncrement} class="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white hover:bg-pink-600 active:scale-95">+</button>
        </div>
      </div>

      <!-- Text -->
      <div class="rounded-lg bg-white p-3 shadow-sm border border-pink-100">
        <div class="text-xs font-bold text-slate-500 mb-2">text: string</div>
        <input
          type="text"
          value={advText}
          oninput={(e) => advSetText((e.target as HTMLInputElement).value)}
          placeholder="Type here..."
          class="w-full rounded-md border border-pink-200 px-2 py-1 text-sm focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-300"
        />
      </div>

      <!-- Toggle -->
      <div class="rounded-lg bg-white p-3 shadow-sm border border-pink-100">
        <div class="text-xs font-bold text-slate-500 mb-2">toggle: boolean</div>
        <button
          onclick={advToggleFlag}
          class="w-full rounded-md px-3 py-1 text-sm font-bold transition-all {advToggle ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-600'}"
        >
          {advToggle ? 'true' : 'false'}
        </button>
      </div>
    </div>
  </div>

  <!-- State Machine Diagram -->
  <div class="rounded-xl border-2 border-pink-200 bg-white p-5 space-y-3">
    <h3 class="text-sm font-bold uppercase tracking-wider text-pink-600">State Machine</h3>
    <p class="text-xs text-slate-500">Click events to trigger transitions. Only valid transitions from the current state are active.</p>

    <div class="flex flex-wrap items-center justify-center gap-3">
      {#each machineStates as ms}
        <div class="rounded-lg border-2 px-4 py-2 text-xs font-bold transition-all {machineState === ms ? machineActiveColors[ms] : machineColors[ms]}">
          {ms}
        </div>
        {#if ms !== 'saved'}
          <svg class="h-4 w-5 shrink-0 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        {/if}
      {/each}
    </div>

    <div class="flex flex-wrap justify-center gap-2 mt-2">
      {#each ['EDIT', 'CHANGE', 'SAVE', 'CANCEL', 'RESET'] as event}
        {@const available = machineTransitions[machineState]?.some(t => t.event === event)}
        <button
          onclick={() => advTransition(event)}
          disabled={!available}
          class="rounded-full px-3 py-1 text-xs font-bold transition-all
            {available ? 'bg-pink-500 text-white hover:bg-pink-600 active:scale-95 cursor-pointer' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}"
        >
          {event}
        </button>
      {/each}
    </div>

    <div class="text-center text-xs text-slate-500">
      Current: <strong class="text-pink-600">{machineState}</strong>
    </div>
  </div>

  <!-- Immutable vs Mutable -->
  <div class="rounded-xl border-2 border-pink-200 bg-white p-5 space-y-3">
    <h3 class="text-sm font-bold uppercase tracking-wider text-pink-600">Immutable vs Mutable Updates</h3>
    <p class="text-xs text-slate-500">Both add 10 to counter, but one mutates in place (bad) while the other creates a new state (good).</p>

    <div class="flex justify-center gap-4">
      <button
        onclick={advMutateInPlace}
        class="rounded-lg border-2 border-red-300 bg-red-50 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-100 active:scale-95 transition-all"
      >
        Mutate In Place
      </button>
      <button
        onclick={advImmutableUpdate}
        class="rounded-lg border-2 border-green-300 bg-green-50 px-4 py-2 text-sm font-bold text-green-700 hover:bg-green-100 active:scale-95 transition-all"
      >
        Immutable Update
      </button>
    </div>
  </div>

  <!-- Time-Travel Timeline -->
  <div class="rounded-xl border-2 border-pink-200 bg-white p-5 space-y-3">
    <h3 class="text-sm font-bold uppercase tracking-wider text-pink-600">Time-Travel Timeline</h3>

    <div class="flex items-center gap-2 mb-3">
      <button
        onclick={advUndo}
        disabled={advCursor <= 0}
        class="rounded-full px-3 py-1 text-xs font-bold transition-all {advCursor > 0 ? 'bg-pink-500 text-white hover:bg-pink-600' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}"
      >
        Undo
      </button>
      <button
        onclick={advRedo}
        disabled={advCursor >= advHistory.length - 1}
        class="rounded-full px-3 py-1 text-xs font-bold transition-all {advCursor < advHistory.length - 1 ? 'bg-pink-500 text-white hover:bg-pink-600' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}"
      >
        Redo
      </button>
      <button onclick={advResetAll} class="text-xs text-slate-500 hover:text-slate-600 underline ml-auto">Reset All</button>
    </div>

    <div class="max-h-48 overflow-y-auto space-y-1">
      {#each advHistory as snap, i (i)}
        <button
          onclick={() => advJumpTo(i)}
          class="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left text-xs transition-all node-appear
            {i === advCursor ? 'bg-pink-500 text-white shadow-md' : i > advCursor ? 'bg-slate-50 text-slate-400 opacity-50' : 'bg-pink-50 text-pink-700 hover:bg-pink-100'}"
        >
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-bold
            {i === advCursor ? 'bg-white text-pink-500' : 'bg-pink-200 text-pink-600'}">
            {i}
          </span>
          <span class="font-bold truncate">{snap.label}</span>
          {#if snap.mutable}
            <span class="ml-auto shrink-0 rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-600">MUTABLE</span>
          {:else}
            <span class="ml-auto shrink-0 rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-600">IMMUTABLE</span>
          {/if}
          <span class="shrink-0 font-mono text-[10px]">c={snap.counter} t="{snap.text.slice(0, 8)}" b={snap.toggle}</span>
        </button>
      {/each}
    </div>

    <p class="text-xs text-slate-500">
      {advHistory.length} snapshot{advHistory.length !== 1 ? 's' : ''} | Position {advCursor} of {advHistory.length - 1}
    </p>
  </div>

  <!-- Code Preview -->
  <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm space-y-3">
    <div class="flex gap-2 mb-2">
      {#each (['immutable', 'mutable', 'machine'] as const) as tab}
        <button
          onclick={() => codeTab = tab}
          class="rounded-full px-3 py-1 text-xs font-bold transition-all
            {codeTab === tab ? 'bg-pink-500 text-white' : 'bg-slate-700 text-slate-400 hover:text-slate-200'}"
        >
          {tab}
        </button>
      {/each}
    </div>

    {#if codeTab === 'immutable'}
      <pre class="text-green-400 text-xs leading-relaxed">// Immutable update: create a new state object
const prevState = {'{'} counter: {advHistory[advCursor].counter}, text: "{advHistory[advCursor].text}", toggle: {advHistory[advCursor].toggle} {'}'};

// Spread creates a shallow copy with changes
const nextState = {'{'} ...prevState, counter: prevState.counter + 1 {'}'};

// prevState is untouched - we can keep it for undo!
console.log(prevState.counter); // still {advHistory[advCursor].counter}
console.log(nextState.counter); // {advHistory[advCursor].counter + 1}</pre>
    {:else if codeTab === 'mutable'}
      <pre class="text-green-400 text-xs leading-relaxed"><span class="text-red-400">// Mutable update: modifies the original object</span>
const state = {'{'} counter: {advHistory[advCursor].counter}, text: "{advHistory[advCursor].text}" {'}'};

<span class="text-red-400">// Direct mutation - previous state is LOST</span>
state.counter += 10;

<span class="text-red-400">// No way to undo - the old value is gone
// This breaks: time-travel, change detection, React/Svelte rendering</span>

<span class="text-green-300">// Better: treat state as immutable</span>
const newState = {'{'} ...state, counter: state.counter + 10 {'}'};
<span class="text-green-300">// Both old and new states exist</span></pre>
    {:else}
      <pre class="text-green-400 text-xs leading-relaxed">// State machine: only valid transitions allowed
type State = "idle" | "editing" | "dirty" | "saved";

function transition(state: State, event: string): State {'{'}
  const transitions: Record&lt;State, Record&lt;string, State&gt;&gt; = {'{'}
    idle:    {'{'} EDIT: "editing" {'}'},
    editing: {'{'} CHANGE: "dirty", CANCEL: "idle" {'}'},
    dirty:   {'{'} SAVE: "saved", CHANGE: "dirty", CANCEL: "idle" {'}'},
    saved:   {'{'} EDIT: "editing", RESET: "idle" {'}'},
  {'}'};
  return transitions[state]?.[event] ?? state;
{'}'}

// Current: "{machineState}"
// Valid events: {machineTransitions[machineState].map(t => t.event).join(', ')}</pre>
    {/if}
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-pink-500 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-600 active:scale-95">
      I've tried this
    </button>
  </div>

  {/if}
</div>

<style>
  @keyframes nodeAppear {
    from { transform: scale(0.5); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  .node-appear { animation: nodeAppear 0.3s ease-out; }
</style>
