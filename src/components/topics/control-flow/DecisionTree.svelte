<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  interface Props {
    oncomplete?: () => void;
  }

  let { oncomplete }: Props = $props();
  let advanced = $state(false);

  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  // --- Basic mode state ---
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

  // --- Advanced mode state ---
  let temperature = $state(72);
  let isWeekend = $state(false);
  let hasUmbrella = $state(true);

  type ViewTab = 'tree' | 'switch' | 'ternary';
  let activeView = $state<ViewTab>('tree');

  // Derived decision path for the nested tree
  let weatherCondition = $derived(
    temperature >= 90 ? 'hot' : temperature >= 70 ? 'warm' : temperature >= 50 ? 'cool' : 'cold'
  );

  let activity = $derived.by(() => {
    if (isWeekend) {
      if (weatherCondition === 'hot') return hasUmbrella ? 'Beach with shade' : 'Stay inside with AC';
      if (weatherCondition === 'warm') return hasUmbrella ? 'Park picnic' : 'Outdoor hike';
      if (weatherCondition === 'cool') return hasUmbrella ? 'Museum visit' : 'Cozy cafe';
      return hasUmbrella ? 'Indoor mall' : 'Movie marathon';
    } else {
      if (weatherCondition === 'hot') return hasUmbrella ? 'Work from home' : 'Office (AC)';
      if (weatherCondition === 'warm') return hasUmbrella ? 'Walk to work' : 'Bike to work';
      if (weatherCondition === 'cool') return hasUmbrella ? 'Drive to work' : 'Bus to work';
      return hasUmbrella ? 'Remote work' : 'Taxi to work';
    }
  });

  // Which if-branch indices are active (for highlighting code)
  let activeBranch = $derived.by(() => {
    const branches: string[] = [];
    branches.push(isWeekend ? 'weekend' : 'weekday');
    branches.push(weatherCondition);
    branches.push(hasUmbrella ? 'umbrella-yes' : 'umbrella-no');
    return branches;
  });

  // Switch-style day mapping
  let dayOfWeek = $state(3);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let dayType = $derived(
    dayOfWeek === 0 || dayOfWeek === 6 ? 'weekend' : dayOfWeek === 5 ? 'casual-friday' : 'workday'
  );
</script>

{#if !advanced}
<div class="space-y-6">
  <div>
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

  <div>
    <button onclick={nextScenario} class="mr-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-300 active:scale-95">
      Next Scenario
    </button>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
      I've tried this
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Advanced: Decision Trees</h2>
    <p class="text-slate-600">Explore nested conditions, switch statements, and ternary operators side by side.</p>
  </div>

  <!-- View tab selector -->
  <div class="flex items-center justify-center gap-2">
    <button
      onclick={() => { activeView = 'tree'; }}
      class="rounded-full px-4 py-1.5 text-sm font-medium transition-all
        {activeView === 'tree' ? 'bg-orange-500 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
    >
      if / else-if / else
    </button>
    <button
      onclick={() => { activeView = 'switch'; }}
      class="rounded-full px-4 py-1.5 text-sm font-medium transition-all
        {activeView === 'switch' ? 'bg-orange-500 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
    >
      switch
    </button>
    <button
      onclick={() => { activeView = 'ternary'; }}
      class="rounded-full px-4 py-1.5 text-sm font-medium transition-all
        {activeView === 'ternary' ? 'bg-orange-500 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
    >
      ternary
    </button>
  </div>

  <!-- ==================== IF / ELSE-IF / ELSE TAB ==================== -->
  {#if activeView === 'tree'}
  <div class="grid gap-6 lg:grid-cols-2">
    <!-- Controls panel -->
    <div class="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 class="text-sm font-bold uppercase tracking-wide text-slate-500">Controls</h3>

      <!-- Temperature slider -->
      <div>
        <label class="mb-1 flex items-center justify-between text-sm font-medium text-slate-700">
          <span>temperature</span>
          <span class="rounded bg-orange-100 px-2 py-0.5 font-mono text-orange-700">{temperature}&deg;F</span>
        </label>
        <input type="range" min="20" max="110" bind:value={temperature} class="w-full accent-orange-500" />
        <div class="mt-1 flex justify-between text-xs text-slate-400">
          <span>20&deg;</span><span>50&deg;</span><span>70&deg;</span><span>90&deg;</span><span>110&deg;</span>
        </div>
      </div>

      <!-- isWeekend toggle -->
      <button
        onclick={() => { isWeekend = !isWeekend; }}
        class="flex w-full items-center justify-between rounded-lg border px-4 py-2 text-sm font-medium transition-all
          {isWeekend ? 'border-green-400 bg-green-50 text-green-700' : 'border-slate-200 bg-slate-50 text-slate-600'}"
      >
        <span>isWeekend</span>
        <span class="flex h-6 w-10 items-center rounded-full p-0.5 transition-colors duration-300
          {isWeekend ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}">
          <span class="h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300"></span>
        </span>
      </button>

      <!-- hasUmbrella toggle -->
      <button
        onclick={() => { hasUmbrella = !hasUmbrella; }}
        class="flex w-full items-center justify-between rounded-lg border px-4 py-2 text-sm font-medium transition-all
          {hasUmbrella ? 'border-green-400 bg-green-50 text-green-700' : 'border-slate-200 bg-slate-50 text-slate-600'}"
      >
        <span>hasUmbrella</span>
        <span class="flex h-6 w-10 items-center rounded-full p-0.5 transition-colors duration-300
          {hasUmbrella ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}">
          <span class="h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300"></span>
        </span>
      </button>

      <!-- Result -->
      <div class="rounded-xl border-2 border-orange-400 bg-orange-50 p-4 text-center">
        <div class="mb-1 text-xs font-semibold uppercase tracking-wide text-orange-400">Result</div>
        <div class="text-lg font-bold text-orange-700 result-pop">{activity}</div>
      </div>
    </div>

    <!-- Code view with highlighting -->
    <div class="overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm">
      <div class="border-b border-slate-700 px-4 py-2 text-xs font-semibold text-slate-400">activity.js</div>
      <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code
>{#snippet codeLine(text, branch, indent)}<span
  class="block transition-all duration-300 {activeBranch.includes(branch) ? 'text-white bg-orange-500/20 -mx-4 px-4' : 'text-slate-500'}"
  style="padding-left: {indent}em">{text}</span>{/snippet}<!--
-->{@render codeLine('if (isWeekend) {', 'weekend', 0)}<!--
-->{@render codeLine('  if (temp >= 90) {', activeBranch.includes('weekend') ? 'hot' : '_', 1)}<!--
-->{@render codeLine('    // hot weekend', activeBranch.includes('weekend') && weatherCondition === 'hot' ? 'hot' : '_', 1)}<!--
-->{@render codeLine('  } else if (temp >= 70) {', activeBranch.includes('weekend') ? 'warm' : '_', 1)}<!--
-->{@render codeLine('    // warm weekend', activeBranch.includes('weekend') && weatherCondition === 'warm' ? 'warm' : '_', 1)}<!--
-->{@render codeLine('  } else if (temp >= 50) {', activeBranch.includes('weekend') ? 'cool' : '_', 1)}<!--
-->{@render codeLine('    // cool weekend', activeBranch.includes('weekend') && weatherCondition === 'cool' ? 'cool' : '_', 1)}<!--
-->{@render codeLine('  } else {', activeBranch.includes('weekend') ? 'cold' : '_', 1)}<!--
-->{@render codeLine('    // cold weekend', activeBranch.includes('weekend') && weatherCondition === 'cold' ? 'cold' : '_', 1)}<!--
-->{@render codeLine('  }', '_never', 1)}<!--
-->{@render codeLine('} else {', 'weekday', 0)}<!--
-->{@render codeLine('  if (temp >= 90) {', activeBranch.includes('weekday') ? 'hot' : '_', 1)}<!--
-->{@render codeLine('    // hot weekday', activeBranch.includes('weekday') && weatherCondition === 'hot' ? 'hot' : '_', 1)}<!--
-->{@render codeLine('  } else if (temp >= 70) {', activeBranch.includes('weekday') ? 'warm' : '_', 1)}<!--
-->{@render codeLine('    // warm weekday', activeBranch.includes('weekday') && weatherCondition === 'warm' ? 'warm' : '_', 1)}<!--
-->{@render codeLine('  } else if (temp >= 50) {', activeBranch.includes('weekday') ? 'cool' : '_', 1)}<!--
-->{@render codeLine('    // cool weekday', activeBranch.includes('weekday') && weatherCondition === 'cool' ? 'cool' : '_', 1)}<!--
-->{@render codeLine('  } else {', activeBranch.includes('weekday') ? 'cold' : '_', 1)}<!--
-->{@render codeLine('    // cold weekday', activeBranch.includes('weekday') && weatherCondition === 'cold' ? 'cold' : '_', 1)}<!--
-->{@render codeLine('  }', '_never', 1)}<!--
-->{@render codeLine('}', '_never', 0)}</code></pre>
    </div>
  </div>

  <!-- Visual tree -->
  <div class="flex flex-col items-center gap-3">
    <div class="rounded-xl border-2 border-orange-400 bg-orange-50 px-6 py-3 text-center font-bold text-orange-700 shadow-md">
      isWeekend?
    </div>
    <div class="h-4 w-0.5 bg-orange-300"></div>
    <div class="flex gap-12">
      <!-- Weekend branch -->
      <div class="flex flex-col items-center gap-2 transition-all duration-300 {isWeekend ? 'opacity-100' : 'opacity-30'}">
        <div class="rounded-lg border border-green-400 bg-green-50 px-3 py-1 text-xs font-bold text-green-700">YES</div>
        <div class="h-3 w-0.5 bg-green-400"></div>
        <div class="rounded-lg border border-orange-300 bg-orange-50 px-4 py-2 text-center text-sm font-semibold text-orange-700">
          temp check
        </div>
        <div class="flex gap-2">
          {#each ['hot', 'warm', 'cool', 'cold'] as w}
            <div class="rounded px-2 py-1 text-xs font-medium transition-all duration-300
              {isWeekend && weatherCondition === w ? 'bg-orange-500 text-white shadow scale-110' : 'bg-slate-100 text-slate-400'}">
              {w}
            </div>
          {/each}
        </div>
      </div>
      <!-- Weekday branch -->
      <div class="flex flex-col items-center gap-2 transition-all duration-300 {!isWeekend ? 'opacity-100' : 'opacity-30'}">
        <div class="rounded-lg border border-red-300 bg-red-50 px-3 py-1 text-xs font-bold text-red-600">NO</div>
        <div class="h-3 w-0.5 bg-red-400"></div>
        <div class="rounded-lg border border-orange-300 bg-orange-50 px-4 py-2 text-center text-sm font-semibold text-orange-700">
          temp check
        </div>
        <div class="flex gap-2">
          {#each ['hot', 'warm', 'cool', 'cold'] as w}
            <div class="rounded px-2 py-1 text-xs font-medium transition-all duration-300
              {!isWeekend && weatherCondition === w ? 'bg-orange-500 text-white shadow scale-110' : 'bg-slate-100 text-slate-400'}">
              {w}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== SWITCH TAB ==================== -->
  {:else if activeView === 'switch'}
  <div class="grid gap-6 lg:grid-cols-2">
    <!-- Day picker -->
    <div class="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 class="text-sm font-bold uppercase tracking-wide text-slate-500">Pick a day</h3>
      <div class="grid grid-cols-7 gap-1">
        {#each days as d, i}
          <button
            onclick={() => { dayOfWeek = i; }}
            class="rounded-lg py-2 text-center text-xs font-semibold transition-all
              {dayOfWeek === i ? 'bg-orange-500 text-white shadow' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}"
          >
            {d.slice(0, 3)}
          </button>
        {/each}
      </div>

      <div class="rounded-xl border-2 border-orange-400 bg-orange-50 p-4 text-center">
        <div class="mb-1 text-xs font-semibold uppercase tracking-wide text-orange-400">Dress code</div>
        <div class="text-lg font-bold text-orange-700">
          {dayType === 'weekend' ? 'Casual clothes' : dayType === 'casual-friday' ? 'Smart casual' : 'Business attire'}
        </div>
      </div>

      <p class="text-xs text-slate-500">
        A <code class="rounded bg-slate-100 px-1 py-0.5">switch</code> statement matches a value against multiple <code class="rounded bg-slate-100 px-1 py-0.5">case</code> labels. It is cleaner than long if/else-if chains when branching on a single value.
      </p>
    </div>

    <!-- Switch code view -->
    <div class="overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm">
      <div class="border-b border-slate-700 px-4 py-2 text-xs font-semibold text-slate-400">dressCode.js</div>
      <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code
><span class="text-slate-500">switch</span> <span class="text-orange-300">(day)</span> <span class="text-slate-500">{'{'}</span>
{#each [{ cases: ['case 0:', 'case 6:'], body: '  return "Casual clothes";', match: 'weekend' },
        { cases: ['case 5:'], body: '  return "Smart casual";', match: 'casual-friday' },
        { cases: ['default:'], body: '  return "Business attire";', match: 'workday' }] as branch}<!--
-->{#each branch.cases as c}
<span class="block transition-all duration-300 {dayType === branch.match ? 'text-white bg-orange-500/20 -mx-4 px-4' : 'text-slate-500'}">  {c}</span><!--
-->{/each}
<span class="block transition-all duration-300 {dayType === branch.match ? 'text-white bg-orange-500/20 -mx-4 px-4' : 'text-slate-500'}">{branch.body}</span><!--
-->{/each}
<span class="text-slate-500">{'}'}</span></code></pre>
    </div>
  </div>

  <!-- If/else equivalent -->
  <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">Equivalent if / else-if</h3>
    <pre class="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm leading-relaxed"><code
><span class="block transition-all duration-300 {dayType === 'weekend' ? 'text-white bg-orange-500/20 -mx-4 px-4' : 'text-slate-500'}">if (day === 0 || day === 6) {'{'}</span>
<span class="block transition-all duration-300 {dayType === 'weekend' ? 'text-white bg-orange-500/20 -mx-4 px-4' : 'text-slate-500'}">  return "Casual clothes";</span>
<span class="block transition-all duration-300 {dayType === 'weekend' ? 'text-white bg-orange-500/20 -mx-4 px-4' : 'text-slate-500'}">{'}'}</span>
<span class="block transition-all duration-300 {dayType === 'casual-friday' ? 'text-white bg-orange-500/20 -mx-4 px-4' : 'text-slate-500'}">else if (day === 5) {'{'}</span>
<span class="block transition-all duration-300 {dayType === 'casual-friday' ? 'text-white bg-orange-500/20 -mx-4 px-4' : 'text-slate-500'}">  return "Smart casual";</span>
<span class="block transition-all duration-300 {dayType === 'casual-friday' ? 'text-white bg-orange-500/20 -mx-4 px-4' : 'text-slate-500'}">{'}'}</span>
<span class="block transition-all duration-300 {dayType === 'workday' ? 'text-white bg-orange-500/20 -mx-4 px-4' : 'text-slate-500'}">else {'{'}</span>
<span class="block transition-all duration-300 {dayType === 'workday' ? 'text-white bg-orange-500/20 -mx-4 px-4' : 'text-slate-500'}">  return "Business attire";</span>
<span class="block transition-all duration-300 {dayType === 'workday' ? 'text-white bg-orange-500/20 -mx-4 px-4' : 'text-slate-500'}">{'}'}</span></code></pre>
  </div>

  <!-- ==================== TERNARY TAB ==================== -->
  {:else}
  <div class="grid gap-6 lg:grid-cols-2">
    <!-- Interactive controls -->
    <div class="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 class="text-sm font-bold uppercase tracking-wide text-slate-500">Ternary operator</h3>
      <p class="text-sm text-slate-600">
        The ternary operator <code class="rounded bg-slate-100 px-1.5 py-0.5 text-orange-600">condition ? valueA : valueB</code> is a compact inline if/else. Toggle the conditions to see how nested ternaries evaluate.
      </p>

      <!-- Temperature slider -->
      <div>
        <label class="mb-1 flex items-center justify-between text-sm font-medium text-slate-700">
          <span>temperature</span>
          <span class="rounded bg-orange-100 px-2 py-0.5 font-mono text-orange-700">{temperature}&deg;F</span>
        </label>
        <input type="range" min="20" max="110" bind:value={temperature} class="w-full accent-orange-500" />
      </div>

      <button
        onclick={() => { isWeekend = !isWeekend; }}
        class="flex w-full items-center justify-between rounded-lg border px-4 py-2 text-sm font-medium transition-all
          {isWeekend ? 'border-green-400 bg-green-50 text-green-700' : 'border-slate-200 bg-slate-50 text-slate-600'}"
      >
        <span>isWeekend</span>
        <span class="flex h-6 w-10 items-center rounded-full p-0.5 transition-colors duration-300
          {isWeekend ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}">
          <span class="h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300"></span>
        </span>
      </button>

      <!-- Evaluation chain -->
      <div class="space-y-2">
        <div class="text-xs font-bold uppercase tracking-wide text-slate-400">Evaluation</div>
        <div class="flex flex-wrap items-center gap-1 text-sm">
          <span class="rounded px-1.5 py-0.5 font-mono {isWeekend ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'}">isWeekend={String(isWeekend)}</span>
          <span class="text-slate-400">?</span>
          <span class="rounded px-1.5 py-0.5 font-mono {isWeekend ? 'bg-orange-100 text-orange-700 font-bold' : 'text-slate-400'}">"weekend"</span>
          <span class="text-slate-400">:</span>
          <span class="rounded px-1.5 py-0.5 font-mono {!isWeekend ? 'bg-orange-100 text-orange-700 font-bold' : 'text-slate-400'}">"weekday"</span>
        </div>
        <div class="flex flex-wrap items-center gap-1 text-sm">
          <span class="rounded px-1.5 py-0.5 font-mono bg-orange-100 text-orange-700">temp={temperature}</span>
          <span class="rounded px-1.5 py-0.5 font-mono {temperature >= 90 ? 'bg-red-100 text-red-700 font-bold' : 'text-slate-400'}">&gt;=90 ? "hot"</span>
          <span class="text-slate-400">:</span>
          <span class="rounded px-1.5 py-0.5 font-mono {temperature >= 70 && temperature < 90 ? 'bg-orange-100 text-orange-700 font-bold' : 'text-slate-400'}">&gt;=70 ? "warm"</span>
          <span class="text-slate-400">:</span>
          <span class="rounded px-1.5 py-0.5 font-mono {temperature >= 50 && temperature < 70 ? 'bg-yellow-100 text-yellow-700 font-bold' : 'text-slate-400'}">&gt;=50 ? "cool"</span>
          <span class="text-slate-400">:</span>
          <span class="rounded px-1.5 py-0.5 font-mono {temperature < 50 ? 'bg-blue-100 text-blue-700 font-bold' : 'text-slate-400'}">"cold"</span>
        </div>
      </div>

      <div class="rounded-xl border-2 border-orange-400 bg-orange-50 p-4 text-center">
        <div class="mb-1 text-xs font-semibold uppercase tracking-wide text-orange-400">Result</div>
        <div class="text-lg font-bold text-orange-700">{weatherCondition} {isWeekend ? 'weekend' : 'weekday'}</div>
      </div>
    </div>

    <!-- Ternary code view -->
    <div class="overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm">
      <div class="border-b border-slate-700 px-4 py-2 text-xs font-semibold text-slate-400">ternary.js</div>
      <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code
><span class="text-slate-400">// Simple ternary</span>
<span class="text-slate-300">const type = </span><span class="transition-all duration-300 {isWeekend ? 'text-green-400' : 'text-red-400'}">isWeekend</span>
  <span class="text-orange-300">?</span> <span class="transition-all duration-300 {isWeekend ? 'text-white font-bold' : 'text-slate-600'}">"weekend"</span>
  <span class="text-orange-300">:</span> <span class="transition-all duration-300 {!isWeekend ? 'text-white font-bold' : 'text-slate-600'}">"weekday"</span><span class="text-slate-500">;</span>

<span class="text-slate-400">// Nested ternary (chained)</span>
<span class="text-slate-300">const weather =</span>
  <span class="transition-all duration-300 {temperature >= 90 ? 'text-white font-bold' : 'text-slate-500'}">temp &gt;= 90 <span class="text-orange-300">?</span> "hot"</span>
  <span class="text-orange-300">:</span> <span class="transition-all duration-300 {temperature >= 70 && temperature < 90 ? 'text-white font-bold' : 'text-slate-500'}">temp &gt;= 70 <span class="text-orange-300">?</span> "warm"</span>
  <span class="text-orange-300">:</span> <span class="transition-all duration-300 {temperature >= 50 && temperature < 70 ? 'text-white font-bold' : 'text-slate-500'}">temp &gt;= 50 <span class="text-orange-300">?</span> "cool"</span>
  <span class="text-orange-300">:</span> <span class="transition-all duration-300 {temperature < 50 ? 'text-white font-bold' : 'text-slate-500'}">"cold"</span><span class="text-slate-500">;</span>

<span class="text-slate-400">// Equivalent if/else-if</span>
<span class="text-slate-500">let weather;</span>
<span class="transition-all duration-300 {temperature >= 90 ? 'text-white bg-orange-500/20 -mx-4 px-4 block' : 'text-slate-500 block'}">if (temp &gt;= 90) weather = "hot";</span>
<span class="transition-all duration-300 {temperature >= 70 && temperature < 90 ? 'text-white bg-orange-500/20 -mx-4 px-4 block' : 'text-slate-500 block'}">else if (temp &gt;= 70) weather = "warm";</span>
<span class="transition-all duration-300 {temperature >= 50 && temperature < 70 ? 'text-white bg-orange-500/20 -mx-4 px-4 block' : 'text-slate-500 block'}">else if (temp &gt;= 50) weather = "cool";</span>
<span class="transition-all duration-300 {temperature < 50 ? 'text-white bg-orange-500/20 -mx-4 px-4 block' : 'text-slate-500 block'}">else weather = "cold";</span></code></pre>
    </div>
  </div>
  {/if}

  <div>
    <button onclick={oncomplete} class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
      I've explored this
    </button>
  </div>
</div>
{/if}

<style>
  @keyframes resultPop {
    0% { transform: scale(0.9); }
    50% { transform: scale(1.08); }
    100% { transform: scale(1); }
  }
  .result-pop { animation: resultPop 0.4s ease-out; }
</style>
