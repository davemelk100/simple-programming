<script lang="ts">
  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();

  const scenarios = [
    {
      id: 'weather',
      question: 'Is it raining?',
      yesResult: 'Take an umbrella ☂️',
      noResult: 'Wear sunglasses 😎',
    },
    {
      id: 'age',
      question: 'Are you 18 or older?',
      yesResult: 'You can vote! 🗳️',
      noResult: 'Too young to vote yet 🧒',
    },
    {
      id: 'number',
      question: 'Is the number greater than 10?',
      yesResult: 'Big number! 🔢',
      noResult: 'Small number 🤏',
    },
  ];

  let activeScenario = $state(0);
  let conditionValue = $state(false);
  let pathAnimating = $state(false);

  let scenario = $derived(scenarios[activeScenario]);

  function toggleCondition() {
    pathAnimating = true;
    conditionValue = !conditionValue;
    setTimeout(() => { pathAnimating = false; }, 600);
  }

  function nextScenario() {
    activeScenario = (activeScenario + 1) % scenarios.length;
    conditionValue = false;
    pathAnimating = false;
  }
</script>

<div class="space-y-6">
  <div class="text-center">
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Decision Tree</h2>
    <p class="text-slate-600">Toggle the condition and watch the path change!</p>
  </div>

  <!-- Scenario selector -->
  <div class="flex items-center justify-center gap-2">
    {#each scenarios as s, i}
      <button
        onclick={() => { activeScenario = i; conditionValue = false; }}
        class="rounded-full px-4 py-1.5 text-sm font-medium transition-all
          {activeScenario === i ? 'bg-orange-500 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
      >
        {s.id}
      </button>
    {/each}
  </div>

  <!-- Flowchart -->
  <div class="flex flex-col items-center gap-4">
    <!-- Question box -->
    <div class="rounded-xl border-2 border-orange-400 bg-orange-50 px-8 py-4 text-center font-bold text-orange-700 shadow-md">
      {scenario.question}
    </div>

    <!-- Toggle -->
    <button
      onclick={toggleCondition}
      class="flex items-center gap-3 rounded-full border-2 px-6 py-2 font-semibold transition-all duration-300
        {conditionValue ? 'border-green-400 bg-green-100 text-green-700' : 'border-red-300 bg-red-50 text-red-600'}"
    >
      <span class="flex h-6 w-10 items-center rounded-full p-0.5 transition-colors duration-300
        {conditionValue ? 'bg-green-500 justify-end' : 'bg-red-400 justify-start'}">
        <span class="h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300"></span>
      </span>
      {conditionValue ? 'YES' : 'NO'}
    </button>

    <!-- Connecting line -->
    <div class="h-6 w-0.5 bg-orange-300"></div>

    <!-- Branches -->
    <div class="flex gap-8">
      <!-- Yes path -->
      <div class="flex flex-col items-center gap-2 transition-all duration-500
        {conditionValue ? 'scale-105 opacity-100' : 'scale-95 opacity-40'}">
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white shadow">
          ✓
        </div>
        <div class="h-6 w-0.5 bg-green-400"></div>
        <div class="rounded-xl border-2 border-green-400 bg-green-50 px-5 py-3 text-center text-sm font-medium text-green-700 shadow-sm
          {conditionValue && pathAnimating ? 'result-pop' : ''}">
          {scenario.yesResult}
        </div>
      </div>

      <!-- No path -->
      <div class="flex flex-col items-center gap-2 transition-all duration-500
        {!conditionValue ? 'scale-105 opacity-100' : 'scale-95 opacity-40'}">
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white shadow">
          ✗
        </div>
        <div class="h-6 w-0.5 bg-red-400"></div>
        <div class="rounded-xl border-2 border-red-300 bg-red-50 px-5 py-3 text-center text-sm font-medium text-red-700 shadow-sm
          {!conditionValue && pathAnimating ? 'result-pop' : ''}">
          {scenario.noResult}
        </div>
      </div>
    </div>
  </div>

  <div class="text-center">
    <button onclick={nextScenario} class="mr-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-300 active:scale-95">
      Next Scenario
    </button>
  </div>

  <div class="text-center">
    <button onclick={oncomplete} class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
      I've tried this
    </button>
  </div>
</div>

<style>
  @keyframes resultPop {
    0% { transform: scale(0.9); }
    50% { transform: scale(1.08); }
    100% { transform: scale(1); }
  }
  .result-pop { animation: resultPop 0.4s ease-out; }
</style>
