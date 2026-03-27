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
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      Computers make decisions using <strong>boolean logic</strong> -- everything is either <strong>true</strong> or <strong>false</strong>.
      Think of it like light switches and a light bulb!
    </p>
  </div>

  <!-- Interactive switches and bulb -->
  <div class="rounded-xl border-2 border-yellow-300 bg-yellow-50 p-6 shadow-md">
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

  {:else}
  <div class="space-y-8">
    <div>
      <p class="text-slate-600">
        Boolean logic goes deeper than AND, OR, and NOT. JavaScript uses <strong>short-circuit evaluation</strong> to optimize boolean expressions, <strong>De Morgan's laws</strong> help simplify complex conditions, and <strong>bitwise operations</strong> manipulate individual bits for performance-critical code like flags and permissions.
      </p>
    </div>

    <!-- Code example -->
    <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm">
      <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">JavaScript</div>
      <pre class="text-green-400">// Short-circuit evaluation
const name = user?.name || "Anonymous";
const name2 = user?.name ?? "Anonymous"; // nullish coalescing

// && returns first falsy or last truthy
const result = a &amp;&amp; b &amp;&amp; c; // stops at first false

// || returns first truthy or last falsy
const fallback = null || undefined || "default"; // "default"

// De Morgan's Laws
// !(A &amp;&amp; B) === !A || !B
// !(A || B) === !A &amp;&amp; !B
if (!(isAdmin &amp;&amp; isActive)) {'{'} /* ... */ {'}'}
// equivalent to:
if (!isAdmin || !isActive) {'{'} /* ... */ {'}'}

// Bitwise operations for flags/permissions
const READ    = 0b001; // 1
const WRITE   = 0b010; // 2
const EXECUTE = 0b100; // 4

let perms = READ | WRITE;     // 0b011 = 3
perms &amp;  READ;                 // truthy - has read
perms &amp;  EXECUTE;              // 0 - no execute
perms |= EXECUTE;              // add execute
perms &amp;= ~WRITE;              // remove write</pre>
    </div>

    <!-- De Morgan's Laws illustration -->
    <div class="rounded-xl border-2 border-yellow-200 bg-yellow-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-yellow-600">De Morgan's Laws</h3>
      <div class="space-y-3">
        <div class="flex items-center gap-3 rounded-lg bg-white p-3">
          <code class="text-sm font-bold text-yellow-700">!(A &amp;&amp; B)</code>
          <span class="text-slate-400">=</span>
          <code class="text-sm font-bold text-yellow-700">!A || !B</code>
          <span class="text-xs text-slate-500 ml-2">"not both" = "either one missing"</span>
        </div>
        <div class="flex items-center gap-3 rounded-lg bg-white p-3">
          <code class="text-sm font-bold text-yellow-700">!(A || B)</code>
          <span class="text-slate-400">=</span>
          <code class="text-sm font-bold text-yellow-700">!A &amp;&amp; !B</code>
          <span class="text-xs text-slate-500 ml-2">"neither" = "both missing"</span>
        </div>
      </div>
    </div>

    <!-- Key concepts list -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500"></span>
          <strong>Short-circuit evaluation</strong>: <code class="text-sm">&amp;&amp;</code> stops at the first falsy value; <code class="text-sm">||</code> stops at the first truthy value. This enables patterns like default values and conditional execution.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500"></span>
          <strong>Nullish coalescing</strong> (<code class="text-sm">??</code>) only falls back on <code class="text-sm">null</code>/<code class="text-sm">undefined</code>, unlike <code class="text-sm">||</code> which treats <code class="text-sm">0</code>, <code class="text-sm">""</code>, and <code class="text-sm">false</code> as falsy.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500"></span>
          <strong>Bitwise flags</strong> use OR to combine, AND to check, AND-NOT to remove. Common in permissions systems, feature flags, and game engines.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500"></span>
          <strong>De Morgan's laws</strong> let you simplify negated compound conditions, making complex boolean expressions more readable.
        </li>
      </ul>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-yellow-500 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-yellow-600 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  @keyframes glow {
    0%, 100% { filter: drop-shadow(0 0 6px rgba(250, 204, 21, 0.8)); }
    50% { filter: drop-shadow(0 0 12px rgba(250, 204, 21, 1)); }
  }
  .bulb-glow { animation: glow 1.5s ease-in-out infinite; }
</style>
