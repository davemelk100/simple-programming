<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Token prediction simulator ===
  const sentences: Record<string, string[]> = {
    'The cat sat on the': ['mat', 'roof', 'chair', 'table', 'floor'],
    'She went to the': ['store', 'park', 'school', 'office', 'beach'],
    'The best way to learn programming is': ['practice', 'building', 'reading', 'experimenting', 'teaching'],
    'In the morning I like to': ['exercise', 'read', 'code', 'walk', 'cook'],
  };
  const prompts = Object.keys(sentences);
  let currentPrompt = $state(prompts[0]);
  let selectedToken = $state('');
  let generatedTokens = $state<string[]>([]);
  let predictions = $derived(sentences[currentPrompt] ?? []);

  function selectToken(token: string) {
    selectedToken = token;
    generatedTokens = [...generatedTokens, token];
  }

  function resetDemo() {
    selectedToken = '';
    generatedTokens = [];
  }

  function changePrompt(p: string) {
    currentPrompt = p;
    resetDemo();
  }

  // === Advanced mode: Temperature simulator ===
  let temperature = $state(0.7);
  let advPrompt = $state('The future of AI is');
  const tokenOptions = [
    { token: 'bright', baseProb: 0.3 },
    { token: 'uncertain', baseProb: 0.25 },
    { token: 'exciting', baseProb: 0.2 },
    { token: 'complex', baseProb: 0.15 },
    { token: 'revolutionary', baseProb: 0.1 },
  ];

  let adjustedProbs = $derived.by(() => {
    const logits = tokenOptions.map(t => Math.log(t.baseProb));
    const scaled = logits.map(l => l / Math.max(temperature, 0.01));
    const maxScaled = Math.max(...scaled);
    const exps = scaled.map(s => Math.exp(s - maxScaled));
    const sum = exps.reduce((a, b) => a + b, 0);
    return tokenOptions.map((t, i) => ({
      token: t.token,
      prob: exps[i] / sum,
    }));
  });

  let advGenerated = $state<string[]>([]);

  function sampleToken() {
    const r = Math.random();
    let cumulative = 0;
    for (const tp of adjustedProbs) {
      cumulative += tp.prob;
      if (r <= cumulative) {
        advGenerated = [...advGenerated, tp.token];
        return;
      }
    }
    advGenerated = [...advGenerated, adjustedProbs[adjustedProbs.length - 1].token];
  }
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Next Token Prediction</h2>
    <p class="text-slate-600">
      LLMs generate text by predicting the next token. Choose a starting prompt, then pick which token comes next — just like the model does.
    </p>
  </div>

  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-6 space-y-6">
    <div class="flex flex-wrap gap-2">
      {#each prompts as p}
        <button
          onclick={() => changePrompt(p)}
          class="rounded-lg px-3 py-1.5 text-sm font-medium transition-all {currentPrompt === p ? 'bg-purple-600 text-white' : 'bg-white text-slate-600 border border-purple-200 hover:bg-purple-100'}"
        >
          "{p}..."
        </button>
      {/each}
    </div>

    <div class="rounded-lg bg-white p-4 border border-purple-200">
      <p class="text-slate-800 font-mono">
        {currentPrompt}{#each generatedTokens as token}&nbsp;{token}{/each}<span class="animate-pulse text-purple-500">|</span>
      </p>
    </div>

    <div>
      <p class="text-sm font-semibold text-slate-700 mb-2">Predicted next tokens (pick one):</p>
      <div class="flex flex-wrap gap-2">
        {#each predictions as token}
          <button
            onclick={() => selectToken(token)}
            class="rounded-lg bg-white border-2 border-purple-300 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100 active:scale-95 transition-all"
          >
            {token}
          </button>
        {/each}
      </div>
    </div>

    {#if generatedTokens.length > 0}
      <div class="flex items-center gap-3">
        <p class="text-sm text-slate-500">You have selected {generatedTokens.length} token(s). In a real LLM, this process repeats hundreds of times to form full responses.</p>
        <button onclick={resetDemo} class="text-sm text-purple-600 hover:underline">Reset</button>
      </div>
    {/if}
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      I've explored token prediction
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Temperature & Sampling</h2>
      <p class="text-slate-600">
        Adjust the temperature parameter to see how it affects token probabilities. Low temperature makes the model more deterministic; high temperature makes it more creative and random.
      </p>
    </div>

    <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-6 space-y-6">
      <div>
        <label class="text-sm font-semibold text-slate-700">Temperature: {temperature.toFixed(2)}</label>
        <input
          type="range"
          min="0.01"
          max="2.0"
          step="0.01"
          bind:value={temperature}
          class="w-full mt-1"
        />
        <div class="flex justify-between text-xs text-slate-400">
          <span>0.01 (deterministic)</span>
          <span>1.0 (default)</span>
          <span>2.0 (very random)</span>
        </div>
      </div>

      <div class="rounded-lg bg-white p-4 border border-purple-200">
        <p class="text-slate-800 font-mono text-sm">
          {advPrompt}{#each advGenerated as token}&nbsp;{token}{/each}<span class="animate-pulse text-purple-500">|</span>
        </p>
      </div>

      <div>
        <p class="text-sm font-semibold text-slate-700 mb-2">Token probabilities at temperature {temperature.toFixed(2)}:</p>
        <div class="space-y-2">
          {#each adjustedProbs as tp}
            <div class="flex items-center gap-3">
              <span class="w-28 text-sm font-mono text-slate-700">{tp.token}</span>
              <div class="flex-1 h-6 bg-white rounded border border-purple-200 overflow-hidden">
                <div
                  class="h-full bg-purple-400 transition-all duration-300"
                  style="width: {tp.prob * 100}%"
                ></div>
              </div>
              <span class="w-14 text-right text-sm text-slate-500">{(tp.prob * 100).toFixed(1)}%</span>
            </div>
          {/each}
        </div>
      </div>

      <div class="flex gap-3">
        <button
          onclick={sampleToken}
          class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95"
        >
          Sample Next Token
        </button>
        <button
          onclick={() => advGenerated = []}
          class="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-300 active:scale-95"
        >
          Reset
        </button>
      </div>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
      >
        I've explored temperature sampling
      </button>
    </div>
  </div>
  {/if}
</div>
