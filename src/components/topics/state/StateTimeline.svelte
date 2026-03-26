<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

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
</script>

<div class="space-y-6">
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
    <button onclick={resetAll} class="text-sm text-slate-400 hover:text-slate-600 underline">Reset</button>
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

  <p class="text-xs text-slate-400">
    {timeline.length} step{timeline.length !== 1 ? 's' : ''} recorded. Current state: <strong>{count}</strong>
  </p>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-pink-500 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-600 active:scale-95">
      I've tried this
    </button>
  </div>
</div>

<style>
  @keyframes nodeAppear {
    from { transform: scale(0.5); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  .node-appear { animation: nodeAppear 0.3s ease-out; }
</style>
