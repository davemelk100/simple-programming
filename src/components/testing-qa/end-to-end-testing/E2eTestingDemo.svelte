<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Login flow test runner ===
  interface TestStep {
    label: string;
    field: 'username' | 'password' | 'button' | 'dashboard';
    value?: string;
    logMessage: string;
  }

  const basicSteps: TestStep[] = [
    { label: 'Type username', field: 'username', value: 'alice', logMessage: 'Filling [data-testid="username"] with "alice"' },
    { label: 'Type password', field: 'password', value: 'secret123', logMessage: 'Filling [data-testid="password"] with "***"' },
    { label: 'Click login', field: 'button', logMessage: 'Clicking [data-testid="login-button"]' },
    { label: 'Verify dashboard', field: 'dashboard', logMessage: 'Expecting page to show "Welcome, Alice"' },
  ];

  // === Advanced mode: Multi-step flow ===
  interface AdvancedStep {
    label: string;
    field: string;
    value?: string;
    logMessage: string;
  }

  const advancedSteps: AdvancedStep[] = [
    { label: 'Type username', field: 'username', value: 'alice', logMessage: 'Filling [data-testid="username"] with "alice"' },
    { label: 'Type password', field: 'password', value: 'secret123', logMessage: 'Filling [data-testid="password"] with "***"' },
    { label: 'Click login', field: 'login-btn', logMessage: 'Clicking [data-testid="login-button"]' },
    { label: 'Navigate to products', field: 'nav-products', logMessage: 'Clicking link "Products"' },
    { label: 'Add item to cart', field: 'add-cart', logMessage: 'Clicking [data-testid="add-to-cart-1"]' },
    { label: 'Go to checkout', field: 'nav-checkout', logMessage: 'Clicking link "Checkout"' },
    { label: 'Verify cart total', field: 'verify-total', logMessage: 'Expecting text "$29.99" to be visible' },
  ];

  let currentStep = $state(-1);
  let running = $state(false);
  let finished = $state(false);
  let usernameValue = $state('');
  let passwordValue = $state('');
  let showDashboard = $state(false);
  let logEntries = $state<{ time: string; message: string; status: 'running' | 'pass' }[]>([]);

  // Advanced state
  let advCurrentStep = $state(-1);
  let advRunning = $state(false);
  let advFinished = $state(false);
  let advUsernameValue = $state('');
  let advPasswordValue = $state('');
  let advScreen = $state<'login' | 'dashboard' | 'products' | 'checkout'>('login');
  let advCartCount = $state(0);
  let advLogEntries = $state<{ time: string; message: string; status: 'running' | 'pass' }[]>([]);

  function getTimestamp(): string {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
  }

  function runBasicTest() {
    if (running) return;
    running = true;
    finished = false;
    currentStep = -1;
    usernameValue = '';
    passwordValue = '';
    showDashboard = false;
    logEntries = [];

    let step = 0;
    const interval = setInterval(() => {
      if (step >= basicSteps.length) {
        clearInterval(interval);
        running = false;
        finished = true;
        return;
      }

      const s = basicSteps[step];
      currentStep = step;
      logEntries = [...logEntries, { time: getTimestamp(), message: s.logMessage, status: 'running' }];

      setTimeout(() => {
        if (s.field === 'username') usernameValue = s.value ?? '';
        else if (s.field === 'password') passwordValue = s.value ?? '';
        else if (s.field === 'dashboard') showDashboard = true;

        logEntries = logEntries.map((e, i) => i === logEntries.length - 1 ? { ...e, status: 'pass' as const } : e);
      }, 400);

      step++;
    }, 900);
  }

  function runAdvancedTest() {
    if (advRunning) return;
    advRunning = true;
    advFinished = false;
    advCurrentStep = -1;
    advUsernameValue = '';
    advPasswordValue = '';
    advScreen = 'login';
    advCartCount = 0;
    advLogEntries = [];

    let step = 0;
    const interval = setInterval(() => {
      if (step >= advancedSteps.length) {
        clearInterval(interval);
        advRunning = false;
        advFinished = true;
        return;
      }

      const s = advancedSteps[step];
      advCurrentStep = step;
      advLogEntries = [...advLogEntries, { time: getTimestamp(), message: s.logMessage, status: 'running' }];

      setTimeout(() => {
        if (s.field === 'username') advUsernameValue = s.value ?? '';
        else if (s.field === 'password') advPasswordValue = s.value ?? '';
        else if (s.field === 'login-btn') advScreen = 'dashboard';
        else if (s.field === 'nav-products') advScreen = 'products';
        else if (s.field === 'add-cart') advCartCount = 1;
        else if (s.field === 'nav-checkout') advScreen = 'checkout';

        advLogEntries = advLogEntries.map((e, i) => i === advLogEntries.length - 1 ? { ...e, status: 'pass' as const } : e);
      }, 400);

      step++;
    }, 900);
  }

  function resetBasic() {
    currentStep = -1;
    running = false;
    finished = false;
    usernameValue = '';
    passwordValue = '';
    showDashboard = false;
    logEntries = [];
  }

  function resetAdvanced() {
    advCurrentStep = -1;
    advRunning = false;
    advFinished = false;
    advUsernameValue = '';
    advPasswordValue = '';
    advScreen = 'login';
    advCartCount = 0;
    advLogEntries = [];
  }
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: E2E Test Runner</h2>
    <p class="text-slate-600">
      Watch an E2E test automate a login flow. Click <strong>Run E2E Test</strong> to see the robot user in action.
    </p>
  </div>

  <div class="grid gap-6 lg:grid-cols-2">
    <!-- Mini web app -->
    <div class="space-y-4">
      <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500">Mini App</h3>
      <div class="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm">
        {#if !showDashboard}
          <div class="space-y-4">
            <h4 class="text-lg font-bold text-slate-800">Log In</h4>
            <div>
              <label class="mb-1 block text-sm font-medium text-slate-600">Username</label>
              <div class="rounded-lg border-2 px-3 py-2 text-sm transition-colors {currentStep === 0 ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' : 'border-slate-200'}">
                {usernameValue || '\u00A0'}
              </div>
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-slate-600">Password</label>
              <div class="rounded-lg border-2 px-3 py-2 text-sm transition-colors {currentStep === 1 ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' : 'border-slate-200'}">
                {passwordValue ? '********' : '\u00A0'}
              </div>
            </div>
            <div class="rounded-lg border-2 px-4 py-2 text-center text-sm font-semibold transition-colors {currentStep === 2 ? 'border-purple-500 bg-purple-600 text-white ring-2 ring-purple-200' : 'border-slate-200 bg-slate-50 text-slate-700'}">
              Log In
            </div>
          </div>
        {:else}
          <div class="space-y-3 transition-all duration-500 {currentStep === 3 ? 'ring-2 ring-purple-200 rounded-lg' : ''}">
            <div class="rounded-lg bg-green-50 border-2 border-green-200 p-4 text-center">
              <p class="text-lg font-bold text-green-700">Welcome, Alice</p>
              <p class="text-sm text-slate-500">Dashboard loaded successfully</p>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- Test steps indicator -->
    <div class="space-y-4">
      <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500">Test Steps</h3>
      <div class="space-y-2">
        {#each basicSteps as step, i}
          <div class="flex items-center gap-3 rounded-lg border-2 p-3 transition-all
            {i === currentStep ? 'border-purple-500 bg-purple-50' : i < currentStep ? 'border-green-300 bg-green-50' : 'border-slate-200 bg-white'}">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold
              {i < currentStep || (i === currentStep && logEntries[i]?.status === 'pass') ? 'bg-green-500 text-white' : i === currentStep ? 'bg-purple-500 text-white' : 'bg-slate-200 text-slate-500'}">
              {#if i < currentStep || (i === currentStep && logEntries[i]?.status === 'pass')}
                &#10003;
              {:else}
                {i + 1}
              {/if}
            </span>
            <span class="text-sm font-medium {i <= currentStep ? 'text-slate-800' : 'text-slate-400'}">{step.label}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Test log -->
  <div class="space-y-2">
    <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500">Test Log</h3>
    <div class="rounded-xl border bg-slate-900 p-4 font-mono text-sm min-h-[120px] max-h-[200px] overflow-y-auto">
      {#if logEntries.length === 0}
        <p class="text-slate-500">Waiting to run...</p>
      {/if}
      {#each logEntries as entry}
        <div class="flex gap-2">
          <span class="text-slate-500">[{entry.time}]</span>
          <span class="{entry.status === 'pass' ? 'text-green-400' : 'text-yellow-400'}">{entry.message}</span>
          {#if entry.status === 'pass'}
            <span class="text-green-400">PASS</span>
          {:else}
            <span class="text-yellow-400 animate-pulse">...</span>
          {/if}
        </div>
      {/each}
      {#if finished}
        <div class="mt-2 text-green-400 font-bold">All tests passed! (4/4)</div>
      {/if}
    </div>
  </div>

  <div class="flex gap-3">
    <button
      onclick={runBasicTest}
      disabled={running}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95 disabled:opacity-50"
    >
      {running ? 'Running...' : 'Run E2E Test'}
    </button>
    {#if finished}
      <button
        onclick={resetBasic}
        class="rounded-full border-2 border-purple-300 px-6 py-3 font-semibold text-purple-700 transition-all hover:bg-purple-50 active:scale-95"
      >
        Reset
      </button>
      <button
        onclick={oncomplete}
        class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
      >
        Continue
      </button>
    {/if}
  </div>

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Multi-Step E2E Flow</h2>
    <p class="text-slate-600">
      This advanced test simulates a full user journey: <strong>login, navigate, add to cart, and checkout</strong>.
    </p>
  </div>

  <div class="grid gap-6 lg:grid-cols-2">
    <!-- Mini web app (advanced) -->
    <div class="space-y-4">
      <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500">Mini App</h3>
      <div class="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm">
        {#if advScreen === 'login'}
          <div class="space-y-4">
            <h4 class="text-lg font-bold text-slate-800">Log In</h4>
            <div>
              <label class="mb-1 block text-sm font-medium text-slate-600">Username</label>
              <div class="rounded-lg border-2 px-3 py-2 text-sm transition-colors {advCurrentStep === 0 ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' : 'border-slate-200'}">
                {advUsernameValue || '\u00A0'}
              </div>
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-slate-600">Password</label>
              <div class="rounded-lg border-2 px-3 py-2 text-sm transition-colors {advCurrentStep === 1 ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' : 'border-slate-200'}">
                {advPasswordValue ? '********' : '\u00A0'}
              </div>
            </div>
            <div class="rounded-lg border-2 px-4 py-2 text-center text-sm font-semibold transition-colors {advCurrentStep === 2 ? 'border-purple-500 bg-purple-600 text-white ring-2 ring-purple-200' : 'border-slate-200 bg-slate-50 text-slate-700'}">
              Log In
            </div>
          </div>
        {:else if advScreen === 'dashboard'}
          <div class="space-y-3">
            <div class="rounded-lg bg-green-50 border-2 border-green-200 p-3 text-center">
              <p class="font-bold text-green-700">Welcome, Alice</p>
            </div>
            <div class="flex gap-2">
              <div class="rounded-lg border-2 px-3 py-1.5 text-xs font-semibold transition-colors {advCurrentStep === 3 ? 'border-purple-500 bg-purple-600 text-white ring-2 ring-purple-200' : 'border-slate-200 text-slate-600'}">Products</div>
              <div class="rounded-lg border-2 border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600">Settings</div>
            </div>
          </div>
        {:else if advScreen === 'products'}
          <div class="space-y-3">
            <h4 class="text-sm font-bold text-slate-800">Products</h4>
            <div class="rounded-lg border-2 border-slate-200 p-3 flex items-center justify-between">
              <div>
                <p class="font-semibold text-sm text-slate-800">Widget Pro</p>
                <p class="text-xs text-slate-500">$29.99</p>
              </div>
              <div class="rounded-lg border-2 px-3 py-1.5 text-xs font-semibold transition-colors {advCurrentStep === 4 ? 'border-purple-500 bg-purple-600 text-white ring-2 ring-purple-200' : 'border-slate-200 text-slate-600'}">
                {advCartCount > 0 ? 'Added' : 'Add to Cart'}
              </div>
            </div>
            <div class="flex gap-2 mt-2">
              <div class="rounded-lg border-2 px-3 py-1.5 text-xs font-semibold transition-colors {advCurrentStep === 5 ? 'border-purple-500 bg-purple-600 text-white ring-2 ring-purple-200' : 'border-slate-200 text-slate-600'}">
                Checkout ({advCartCount})
              </div>
            </div>
          </div>
        {:else}
          <div class="space-y-3">
            <h4 class="text-sm font-bold text-slate-800">Checkout</h4>
            <div class="rounded-lg border-2 p-3 transition-colors {advCurrentStep === 6 ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' : 'border-slate-200'}">
              <div class="flex justify-between text-sm">
                <span class="text-slate-600">Widget Pro x1</span>
                <span class="font-bold text-slate-800">$29.99</span>
              </div>
              <hr class="my-2 border-slate-200" />
              <div class="flex justify-between text-sm font-bold">
                <span class="text-slate-800">Total</span>
                <span class="text-purple-700">$29.99</span>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- Test steps indicator (advanced) -->
    <div class="space-y-4">
      <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500">Test Steps</h3>
      <div class="space-y-2">
        {#each advancedSteps as step, i}
          <div class="flex items-center gap-3 rounded-lg border-2 p-2.5 transition-all text-sm
            {i === advCurrentStep ? 'border-purple-500 bg-purple-50' : i < advCurrentStep ? 'border-green-300 bg-green-50' : 'border-slate-200 bg-white'}">
            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold
              {i < advCurrentStep || (i === advCurrentStep && advLogEntries[i]?.status === 'pass') ? 'bg-green-500 text-white' : i === advCurrentStep ? 'bg-purple-500 text-white' : 'bg-slate-200 text-slate-500'}">
              {#if i < advCurrentStep || (i === advCurrentStep && advLogEntries[i]?.status === 'pass')}
                &#10003;
              {:else}
                {i + 1}
              {/if}
            </span>
            <span class="font-medium {i <= advCurrentStep ? 'text-slate-800' : 'text-slate-400'}">{step.label}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Test log (advanced) -->
  <div class="space-y-2">
    <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500">Test Log</h3>
    <div class="rounded-xl border bg-slate-900 p-4 font-mono text-sm min-h-[120px] max-h-[240px] overflow-y-auto">
      {#if advLogEntries.length === 0}
        <p class="text-slate-500">Waiting to run...</p>
      {/if}
      {#each advLogEntries as entry}
        <div class="flex gap-2">
          <span class="text-slate-500">[{entry.time}]</span>
          <span class="{entry.status === 'pass' ? 'text-green-400' : 'text-yellow-400'}">{entry.message}</span>
          {#if entry.status === 'pass'}
            <span class="text-green-400">PASS</span>
          {:else}
            <span class="text-yellow-400 animate-pulse">...</span>
          {/if}
        </div>
      {/each}
      {#if advFinished}
        <div class="mt-2 text-green-400 font-bold">All tests passed! (7/7)</div>
      {/if}
    </div>
  </div>

  <div class="flex gap-3">
    <button
      onclick={runAdvancedTest}
      disabled={advRunning}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95 disabled:opacity-50"
    >
      {advRunning ? 'Running...' : 'Run E2E Test'}
    </button>
    {#if advFinished}
      <button
        onclick={resetAdvanced}
        class="rounded-full border-2 border-purple-300 px-6 py-3 font-semibold text-purple-700 transition-all hover:bg-purple-50 active:scale-95"
      >
        Reset
      </button>
      <button
        onclick={oncomplete}
        class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
      >
        Continue
      </button>
    {/if}
  </div>

  {/if}
</div>
