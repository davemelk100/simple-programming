<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: 3-module chain ===
  interface Connection {
    from: string;
    to: string;
    label: string;
    status: 'untested' | 'testing' | 'pass' | 'fail';
    failMessage: string;
    shouldFail: boolean;
  }

  let basicModules = ['UserForm', 'API', 'Database'];

  let basicConnections: Connection[] = $state([
    {
      from: 'UserForm',
      to: 'API',
      label: 'Submit form data',
      status: 'untested',
      failMessage: '',
      shouldFail: false,
    },
    {
      from: 'API',
      to: 'Database',
      label: 'Save to database',
      status: 'untested',
      failMessage: '',
      shouldFail: false,
    },
    {
      from: 'Database',
      to: 'API',
      label: 'Return saved record',
      status: 'untested',
      failMessage: '',
      shouldFail: false,
    },
  ]);

  let basicRound = $state(0);
  let basicAllTested = $derived(basicConnections.every(c => c.status === 'pass' || c.status === 'fail'));

  function resetBasicConnections(failIndex: number) {
    basicConnections = [
      {
        from: 'UserForm',
        to: 'API',
        label: 'Submit form data',
        status: 'untested',
        failMessage: 'API received malformed JSON from the form',
        shouldFail: failIndex === 0,
      },
      {
        from: 'API',
        to: 'Database',
        label: 'Save to database',
        status: 'untested',
        failMessage: 'API returned wrong format -- expected { id, name } but got { user_id, full_name }',
        shouldFail: failIndex === 1,
      },
      {
        from: 'Database',
        to: 'API',
        label: 'Return saved record',
        status: 'untested',
        failMessage: 'Database returned null -- record was not actually saved',
        shouldFail: failIndex === 2,
      },
    ];
  }

  onMount(() => {
    const failIndex = Math.floor(Math.random() * 3);
    resetBasicConnections(failIndex);
  });

  function testBasicConnection(index: number) {
    if (basicConnections[index].status !== 'untested') return;
    basicConnections[index].status = 'testing';
    setTimeout(() => {
      basicConnections[index].status = basicConnections[index].shouldFail ? 'fail' : 'pass';
    }, 800);
  }

  function retryBasic() {
    basicRound++;
    const failIndex = Math.floor(Math.random() * 3);
    resetBasicConnections(failIndex);
  }

  // === Advanced mode: complex dependency graph ===
  interface AdvModule {
    name: string;
    x: number;
    y: number;
  }

  interface AdvConnection {
    fromIdx: number;
    toIdx: number;
    label: string;
    status: 'untested' | 'testing' | 'pass' | 'fail';
    failMessage: string;
    shouldFail: boolean;
  }

  let advModules: AdvModule[] = [
    { name: 'Web UI', x: 50, y: 0 },
    { name: 'Auth Service', x: 0, y: 1 },
    { name: 'API Gateway', x: 50, y: 1 },
    { name: 'User Service', x: 100, y: 1 },
    { name: 'Cache', x: 25, y: 2 },
    { name: 'Database', x: 75, y: 2 },
  ];

  let advConnections: AdvConnection[] = $state([]);

  function resetAdvConnections() {
    const failIdx = Math.floor(Math.random() * 6);
    advConnections = [
      { fromIdx: 0, toIdx: 2, label: 'HTTP request', status: 'untested', failMessage: 'CORS headers missing -- browser blocked the request', shouldFail: failIdx === 0 },
      { fromIdx: 2, toIdx: 1, label: 'Verify token', status: 'untested', failMessage: 'Auth service returned 503 -- service unavailable', shouldFail: failIdx === 1 },
      { fromIdx: 2, toIdx: 3, label: 'Fetch user', status: 'untested', failMessage: 'User service timeout after 30s -- no response', shouldFail: failIdx === 2 },
      { fromIdx: 3, toIdx: 4, label: 'Check cache', status: 'untested', failMessage: 'Cache key format mismatch -- expected user:1, got users/1', shouldFail: failIdx === 3 },
      { fromIdx: 3, toIdx: 5, label: 'Query DB', status: 'untested', failMessage: 'SQL error -- column "full_name" does not exist, expected "name"', shouldFail: failIdx === 4 },
      { fromIdx: 1, toIdx: 5, label: 'Load roles', status: 'untested', failMessage: 'Database connection pool exhausted -- too many concurrent connections', shouldFail: failIdx === 5 },
    ];
  }

  onMount(() => {
    resetAdvConnections();
  });

  let advAllTested = $derived(advConnections.length > 0 && advConnections.every(c => c.status === 'pass' || c.status === 'fail'));

  function testAdvConnection(index: number) {
    if (advConnections[index].status !== 'untested') return;
    advConnections[index].status = 'testing';
    setTimeout(() => {
      advConnections[index].status = advConnections[index].shouldFail ? 'fail' : 'pass';
    }, 800);
  }

  function testAllAdv() {
    advConnections.forEach((c, i) => {
      if (c.status === 'untested') {
        setTimeout(() => testAdvConnection(i), i * 400);
      }
    });
  }

  function retryAdv() {
    resetAdvConnections();
  }
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Test the Connections</h2>
    <p class="text-slate-600">
      Below are three modules connected in a chain. Click each connection to <strong>run an integration test</strong> on it. One connection has a bug -- find it!
    </p>
  </div>

  <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 space-y-6">
    <!-- Module diagram -->
    <div class="flex items-center justify-center gap-2 sm:gap-4">
      {#each basicModules as mod, i}
        <div class="rounded-xl border-2 border-blue-300 bg-white px-3 py-3 sm:px-5 text-center shadow-sm">
          <p class="text-sm font-bold text-blue-700">{mod}</p>
        </div>
        {#if i < basicModules.length - 1}
          <span class="text-blue-400 text-xl">&#8594;</span>
        {/if}
      {/each}
    </div>

    <!-- Connection tests -->
    <div class="space-y-3">
      {#each basicConnections as conn, i}
        <button
          onclick={() => testBasicConnection(i)}
          disabled={conn.status !== 'untested'}
          class="flex w-full items-center gap-3 rounded-lg border-2 p-4 text-left transition-all
            {conn.status === 'pass' ? 'border-green-400 bg-green-50' :
             conn.status === 'fail' ? 'border-red-400 bg-red-50' :
             conn.status === 'testing' ? 'border-yellow-400 bg-yellow-50' :
             'border-blue-200 bg-white hover:shadow-md active:scale-[0.98]'}
            {conn.status === 'untested' ? 'cursor-pointer' : 'cursor-default'}"
        >
          <span class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold
            {conn.status === 'pass' ? 'bg-green-500 text-white' :
             conn.status === 'fail' ? 'bg-red-500 text-white' :
             conn.status === 'testing' ? 'bg-yellow-500 text-white' :
             'bg-blue-100 text-blue-700'}">
            {#if conn.status === 'pass'}&#10003;{:else if conn.status === 'fail'}&#10007;{:else if conn.status === 'testing'}...{:else}{i + 1}{/if}
          </span>
          <div class="flex-1">
            <p class="font-semibold text-slate-800">{conn.from} &#8594; {conn.to}</p>
            <p class="text-sm text-slate-500">{conn.label}</p>
          </div>
          {#if conn.status === 'untested'}
            <span class="rounded-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Click to test</span>
          {:else if conn.status === 'testing'}
            <span class="rounded-lg bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">Testing...</span>
          {:else if conn.status === 'pass'}
            <span class="rounded-lg bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">PASS</span>
          {:else}
            <span class="rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">FAIL</span>
          {/if}
        </button>
        {#if conn.status === 'fail'}
          <div class="ml-11 rounded-lg border-2 border-red-300 bg-red-50 p-3">
            <p class="text-sm font-semibold text-red-700">Error: {conn.failMessage}</p>
            <p class="mt-1 text-xs text-red-600">This is an integration bug -- each module works alone, but they fail when connected.</p>
          </div>
        {/if}
      {/each}
    </div>

    {#if basicAllTested}
      <div class="flex items-center gap-3">
        <div class="rounded-xl border-2 border-blue-300 bg-blue-100 p-4 flex-1 text-center">
          <p class="font-bold text-blue-700">
            {basicConnections.filter(c => c.status === 'pass').length} / {basicConnections.length} connections passed.
            {basicConnections.some(c => c.status === 'fail') ? 'You found the broken connection!' : 'All connections work!'}
          </p>
        </div>
        <button
          onclick={retryBasic}
          class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95"
        >
          Try Again
        </button>
      </div>
    {/if}
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      I've tested the connections
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Complex Dependency Graph</h2>
      <p class="text-slate-600">
        Real systems have many integration points. Click each connection to test it, or use "Test All" to run them in sequence. One connection has a bug hiding in it.
      </p>
    </div>

    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 space-y-6">
      <!-- Advanced module diagram -->
      <div class="space-y-4">
        <!-- Row 0: Web UI -->
        <div class="flex justify-center">
          <div class="rounded-xl border-2 border-blue-300 bg-white px-5 py-3 text-center shadow-sm">
            <p class="text-sm font-bold text-blue-700">{advModules[0].name}</p>
          </div>
        </div>
        <!-- Arrows down -->
        <div class="flex justify-center">
          <span class="text-blue-400 text-xl">&#8595;</span>
        </div>
        <!-- Row 1: Auth, API Gateway, User Service -->
        <div class="flex items-center justify-center gap-4 sm:gap-8">
          <div class="rounded-xl border-2 border-blue-300 bg-white px-4 py-3 text-center shadow-sm">
            <p class="text-xs font-bold text-blue-700">{advModules[1].name}</p>
          </div>
          <div class="rounded-xl border-2 border-blue-300 bg-white px-4 py-3 text-center shadow-sm">
            <p class="text-xs font-bold text-blue-700">{advModules[2].name}</p>
          </div>
          <div class="rounded-xl border-2 border-blue-300 bg-white px-4 py-3 text-center shadow-sm">
            <p class="text-xs font-bold text-blue-700">{advModules[3].name}</p>
          </div>
        </div>
        <!-- Arrows down -->
        <div class="flex justify-center gap-16">
          <span class="text-blue-400 text-xl">&#8601;</span>
          <span class="text-blue-400 text-xl">&#8600;</span>
        </div>
        <!-- Row 2: Cache, Database -->
        <div class="flex items-center justify-center gap-8 sm:gap-16">
          <div class="rounded-xl border-2 border-blue-300 bg-white px-5 py-3 text-center shadow-sm">
            <p class="text-sm font-bold text-blue-700">{advModules[4].name}</p>
          </div>
          <div class="rounded-xl border-2 border-blue-300 bg-white px-5 py-3 text-center shadow-sm">
            <p class="text-sm font-bold text-blue-700">{advModules[5].name}</p>
          </div>
        </div>
      </div>

      <!-- Connection tests -->
      <div class="space-y-3">
        {#each advConnections as conn, i}
          <button
            onclick={() => testAdvConnection(i)}
            disabled={conn.status !== 'untested'}
            class="flex w-full items-center gap-3 rounded-lg border-2 p-3 text-left transition-all
              {conn.status === 'pass' ? 'border-green-400 bg-green-50' :
               conn.status === 'fail' ? 'border-red-400 bg-red-50' :
               conn.status === 'testing' ? 'border-yellow-400 bg-yellow-50' :
               'border-blue-200 bg-white hover:shadow-md active:scale-[0.98]'}
              {conn.status === 'untested' ? 'cursor-pointer' : 'cursor-default'}"
          >
            <span class="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold
              {conn.status === 'pass' ? 'bg-green-500 text-white' :
               conn.status === 'fail' ? 'bg-red-500 text-white' :
               conn.status === 'testing' ? 'bg-yellow-500 text-white' :
               'bg-blue-100 text-blue-700'}">
              {#if conn.status === 'pass'}&#10003;{:else if conn.status === 'fail'}&#10007;{:else if conn.status === 'testing'}...{:else}{i + 1}{/if}
            </span>
            <div class="flex-1">
              <p class="text-sm font-semibold text-slate-800">{advModules[conn.fromIdx].name} &#8594; {advModules[conn.toIdx].name}</p>
              <p class="text-xs text-slate-500">{conn.label}</p>
            </div>
            {#if conn.status === 'pass'}
              <span class="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">PASS</span>
            {:else if conn.status === 'fail'}
              <span class="rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">FAIL</span>
            {:else if conn.status === 'testing'}
              <span class="rounded bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700">Testing...</span>
            {/if}
          </button>
          {#if conn.status === 'fail'}
            <div class="ml-10 rounded-lg border-2 border-red-300 bg-red-50 p-3">
              <p class="text-sm font-semibold text-red-700">Error: {conn.failMessage}</p>
            </div>
          {/if}
        {/each}
      </div>

      <div class="flex gap-3">
        {#if !advAllTested}
          <button
            onclick={testAllAdv}
            class="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95"
          >
            Test All Connections
          </button>
        {/if}
        {#if advAllTested}
          <div class="rounded-xl border-2 border-blue-300 bg-blue-100 p-4 flex-1 text-center">
            <p class="font-bold text-blue-700">
              {advConnections.filter(c => c.status === 'pass').length} / {advConnections.length} connections passed.
              {advConnections.some(c => c.status === 'fail') ? 'You found the integration failure!' : 'All clear!'}
            </p>
          </div>
          <button
            onclick={retryAdv}
            class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95"
          >
            Try Again
          </button>
        {/if}
      </div>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
      >
        I've tested the connections
      </button>
    </div>
  </div>
  {/if}
</div>
