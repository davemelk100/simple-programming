<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

  let switchA = $state(true);
  let switchB = $state(false);
  let activeOp = $state<'AND' | 'OR' | 'NOT'>('AND');
  let showTables = $state(false);

  let result = $derived(
    activeOp === 'AND' ? switchA && switchB :
    activeOp === 'OR' ? switchA || switchB :
    !switchA
  );

  onMount(() => {
    setTimeout(() => { showTables = true; }, 600);
  });
</script>

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">True or False: Logic</h2>
    <p class="max-w-lg text-slate-600">
      Computers make decisions using <strong>boolean logic</strong> -- everything is either <strong>true</strong> or <strong>false</strong>.
      Think of it like light switches and a light bulb!
    </p>
  </div>

  <!-- Interactive switches and bulb -->
  <div class="max-w-md rounded-xl border-2 border-yellow-300 bg-yellow-50 p-6 shadow-md">
    <!-- Operator selector -->
    <div class="mb-4 flex items-center justify-center gap-2">
      {#each ['AND', 'OR', 'NOT'] as op}
        <button
          onclick={() => { activeOp = op as any; }}
          class="rounded-full px-4 py-1.5 text-sm font-bold transition-all
            {activeOp === op ? 'bg-yellow-500 text-white shadow' : 'bg-white text-yellow-700 border border-yellow-300 hover:bg-yellow-100'}"
        >
          {op}
        </button>
      {/each}
    </div>

    <div class="flex items-center justify-center gap-6">
      <!-- Switch A -->
      <div class="flex flex-col items-center gap-2">
        <span class="text-xs font-bold text-yellow-700">Switch A</span>
        <button onclick={() => { switchA = !switchA; }} class="flex h-8 w-14 items-center rounded-full p-1 transition-colors duration-300 {switchA ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}">
          <span class="h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300"></span>
        </button>
        <span class="text-xs font-semibold {switchA ? 'text-green-600' : 'text-slate-500'}">{switchA ? 'TRUE' : 'FALSE'}</span>
      </div>

      {#if activeOp !== 'NOT'}
        <!-- Switch B -->
        <div class="flex flex-col items-center gap-2">
          <span class="text-xs font-bold text-yellow-700">Switch B</span>
          <button onclick={() => { switchB = !switchB; }} class="flex h-8 w-14 items-center rounded-full p-1 transition-colors duration-300 {switchB ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}">
            <span class="h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300"></span>
          </button>
          <span class="text-xs font-semibold {switchB ? 'text-green-600' : 'text-slate-500'}">{switchB ? 'TRUE' : 'FALSE'}</span>
        </div>
      {/if}

      <!-- Operator -->
      <div class="text-lg font-black text-yellow-700">{activeOp}</div>

      <!-- Equals -->
      <div class="text-lg font-bold text-slate-500">=</div>

      <!-- Light bulb -->
      <div class="flex flex-col items-center gap-1">
        <div class="text-4xl transition-all duration-300 {result ? 'bulb-glow' : 'opacity-40 grayscale'}">
          💡
        </div>
        <span class="text-xs font-bold {result ? 'text-yellow-600' : 'text-slate-500'}">{result ? 'TRUE' : 'FALSE'}</span>
      </div>
    </div>
  </div>

  <!-- Truth tables -->
  <div class="transition-all duration-700 {showTables ? 'opacity-100' : 'opacity-0'}">
    <div class="grid gap-4 sm:grid-cols-3">
      {#each [
        { op: 'AND', rows: [[true,true,true],[true,false,false],[false,true,false],[false,false,false]] },
        { op: 'OR', rows: [[true,true,true],[true,false,true],[false,true,true],[false,false,false]] },
        { op: 'NOT', rows: [[true,false],[false,true]] },
      ] as table}
        <div class="rounded-lg border border-yellow-200 bg-white p-3">
          <h4 class="mb-2 text-center text-sm font-bold text-yellow-700">{table.op}</h4>
          <table class="w-full text-xs">
            <thead>
              <tr class="text-slate-500">
                <th class="py-1">A</th>
                {#if table.op !== 'NOT'}<th class="py-1">B</th>{/if}
                <th class="py-1">Result</th>
              </tr>
            </thead>
            <tbody>
              {#each table.rows as row}
                <tr class="border-t border-slate-100">
                  <td class="py-1 text-center font-mono {row[0] ? 'text-green-600' : 'text-red-500'}">{row[0] ? 'T' : 'F'}</td>
                  {#if table.op !== 'NOT'}
                    <td class="py-1 text-center font-mono {row[1] ? 'text-green-600' : 'text-red-500'}">{row[1] ? 'T' : 'F'}</td>
                  {/if}
                  <td class="py-1 text-center font-mono font-bold {row[row.length - 1] ? 'text-green-600' : 'text-red-500'}">{row[row.length - 1] ? 'T' : 'F'}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/each}
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-yellow-500 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-yellow-600 active:scale-95">
      I've read this
    </button>
  </div>
</div>

<style>
  @keyframes glow {
    0%, 100% { filter: drop-shadow(0 0 6px rgba(250, 204, 21, 0.8)); }
    50% { filter: drop-shadow(0 0 12px rgba(250, 204, 21, 1)); }
  }
  .bulb-glow { animation: glow 1.5s ease-in-out infinite; }
</style>
