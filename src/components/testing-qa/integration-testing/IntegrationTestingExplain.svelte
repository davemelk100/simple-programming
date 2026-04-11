<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleSections = $state(0);
  onMount(() => {
    const interval = setInterval(() => {
      if (visibleSections < 4) visibleSections++;
      else clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div class="transition-all duration-700 {visibleSections >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
    <p class="text-slate-600">
      Integration testing checks how <strong>multiple pieces work together</strong>. Imagine you have a lock and a key. Each might look perfect on its own, but the real question is: <strong>does the key actually open the lock?</strong> That is what integration tests answer. They test the <em>connections</em> between parts, not the parts themselves.
    </p>
  </div>

  <div class="space-y-4 transition-all duration-700 {visibleSections >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
    <h3 class="text-lg font-bold text-slate-800">Unit vs. Integration: The Difference</h3>
    <p class="text-slate-600">
      A <strong>unit test</strong> checks one function in isolation, like testing that a single gear spins correctly. An <strong>integration test</strong> checks that the gears mesh together and the whole mechanism turns. Unit tests mock dependencies; integration tests use the real ones (or close to real).
    </p>
    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
      <div class="grid grid-cols-3 gap-2 text-sm">
        <div class="font-bold text-slate-700"></div>
        <div class="font-bold text-green-700">Unit Test</div>
        <div class="font-bold text-blue-700">Integration Test</div>

        <div class="text-slate-600">Scope</div>
        <div class="text-slate-600">One function/module</div>
        <div class="text-slate-600">Multiple components</div>

        <div class="text-slate-600">Dependencies</div>
        <div class="text-slate-600">Mocked</div>
        <div class="text-slate-600">Real (or close to real)</div>

        <div class="text-slate-600">Speed</div>
        <div class="text-slate-600">Milliseconds</div>
        <div class="text-slate-600">Seconds</div>

        <div class="text-slate-600">Failures tell you</div>
        <div class="text-slate-600">Which function broke</div>
        <div class="text-slate-600">Which connection broke</div>
      </div>
    </div>
  </div>

  <div class="space-y-4 transition-all duration-700 {visibleSections >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
    <h3 class="text-lg font-bold text-slate-800">Common Integration Points</h3>
    <p class="text-slate-600">
      Integration tests focus on the <strong>boundaries</strong> where things connect:
    </p>
    <div class="grid gap-4 sm:grid-cols-3">
      <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4 text-center">
        <div class="mb-2 text-3xl">&#128268;</div>
        <h4 class="mb-1 font-bold text-slate-800">API + Database</h4>
        <p class="text-sm text-slate-600">Does the route handler correctly read from and write to the database?</p>
      </div>
      <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4 text-center">
        <div class="mb-2 text-3xl">&#128421;</div>
        <h4 class="mb-1 font-bold text-slate-800">Frontend + Backend</h4>
        <p class="text-sm text-slate-600">Does the UI correctly send requests and display the responses?</p>
      </div>
      <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4 text-center">
        <div class="mb-2 text-3xl">&#128640;</div>
        <h4 class="mb-1 font-bold text-slate-800">Module + Module</h4>
        <p class="text-sm text-slate-600">When validation, logic, and data layers run together, do they produce correct results?</p>
      </div>
    </div>
  </div>

  <div class="space-y-4 transition-all duration-700 {visibleSections >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
    <h3 class="text-lg font-bold text-slate-800">Why It Matters: Bugs Hide in the Connections</h3>
    <p class="text-slate-600">
      You can have two perfectly working modules that <strong>fail when combined</strong>. Maybe the API returns dates as strings but the frontend expects Date objects. Maybe the database stores prices in cents but the UI displays dollars. These are <em>integration bugs</em> -- they only appear when parts talk to each other.
    </p>
    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
      <ul class="space-y-1.5 text-sm text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <span>Unit tests pass, but the app crashes when modules connect -- integration tests catch this.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <span>Data format mismatches between services are invisible to unit tests.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <span>Configuration issues (wrong database URL, missing env vars) only show up in integration tests.</span>
        </li>
      </ul>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Integration Testing (Advanced)</h2>
      <p class="text-slate-600">Testing strategies, environments, database patterns, and contract testing between services.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Testing Strategies: Big Bang vs. Incremental</h3>
      <p class="text-slate-600">
        There are different ways to approach integrating and testing modules:
      </p>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Big Bang</h4>
          <p class="text-sm text-slate-600">Combine all modules at once and test everything together. Simple to set up, but when something fails it is hard to know <em>which</em> connection is broken.</p>
        </div>
        <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Incremental</h4>
          <p class="text-sm text-slate-600">Add modules one at a time, testing each new connection as you go. Easier to isolate failures. Three flavors:</p>
        </div>
      </div>
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
          <h4 class="mb-1 font-bold text-blue-700">Top-Down</h4>
          <p class="text-sm text-slate-600">Start from the UI or controller layer and work down. Use stubs for lower modules not yet integrated.</p>
        </div>
        <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
          <h4 class="mb-1 font-bold text-blue-700">Bottom-Up</h4>
          <p class="text-sm text-slate-600">Start from the data layer and work up. Use test drivers to simulate higher-level callers.</p>
        </div>
        <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
          <h4 class="mb-1 font-bold text-blue-700">Sandwich</h4>
          <p class="text-sm text-slate-600">Combine top-down and bottom-up, meeting in the middle. Best of both worlds but more complex to manage.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Test Environments and Fixtures</h3>
      <p class="text-slate-600">
        Integration tests need an environment that closely mirrors production. <strong>Fixtures</strong> are pre-defined data sets loaded before tests. <strong>Factories</strong> generate test data with sensible defaults.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// A factory for creating test users</span>
<span class="kw">function</span> <span class="fn">createUser</span>(<span class="arg">overrides</span> = {}) {
  <span class="kw">return</span> {
    <span class="var">name</span>: <span class="str">'Test User'</span>,
    <span class="var">email</span>: <span class="str">\`user-\${<span class="fn">Date</span>.<span class="fn">now</span>()}@test.com\`</span>,
    <span class="var">role</span>: <span class="str">'member'</span>,
    ...<span class="arg">overrides</span>,
  };
}`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Database Testing Patterns</h3>
      <p class="text-slate-600">
        Every integration test should start with a known database state and clean up after itself:
      </p>
      <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
        <ul class="space-y-1.5 text-sm text-slate-600">
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
            <span><strong>Transaction rollback:</strong> Wrap each test in a transaction and roll it back afterward. Fast and clean -- no leftover data.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
            <span><strong>Seeding:</strong> Insert known data before each test suite so queries have something to work with.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
            <span><strong>Truncate tables:</strong> Clear all tables before each test suite. Slower but straightforward.</span>
          </li>
        </ul>
      </div>
      <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">trx</span>;
<span class="fn">beforeEach</span>(<span class="kw">async</span> () => {
  <span class="var">trx</span> = <span class="kw">await</span> <span class="var">db</span>.<span class="fn">transaction</span>();
  <span class="kw">await</span> <span class="var">trx</span>(<span class="str">'users'</span>).<span class="fn">insert</span>([
    { <span class="var">id</span>: <span class="num">1</span>, <span class="var">name</span>: <span class="str">'Alice'</span> },
  ]);
});
<span class="fn">afterEach</span>(<span class="kw">async</span> () => {
  <span class="kw">await</span> <span class="var">trx</span>.<span class="fn">rollback</span>(); <span class="cmt">// all changes vanish</span>
});`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Contract Testing Between Services</h3>
      <p class="text-slate-600">
        When two services communicate, they need to agree on the API format. <strong>Contract testing</strong> (using tools like <strong>Pact</strong>) lets each side independently verify it follows the agreed-upon contract. The consumer defines what it expects, and the provider verifies it can deliver.
      </p>
      <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
        <div class="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span class="rounded-lg bg-blue-100 px-3 py-1.5 font-mono text-blue-700">Consumer</span>
          <span class="text-slate-400">&#8596;</span>
          <span class="rounded-lg bg-yellow-100 px-3 py-1.5 font-mono text-yellow-700">Contract (Pact file)</span>
          <span class="text-slate-400">&#8596;</span>
          <span class="rounded-lg bg-green-100 px-3 py-1.5 font-mono text-green-700">Provider</span>
        </div>
        <p class="mt-3 text-sm text-slate-500 text-center">Both sides verify against the same contract independently, without needing to be deployed together.</p>
      </div>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
      >
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw) { color: #c084fc; } .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; } .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; } .code-block :global(.fn) { color: #93c5fd; }
  .code-block :global(.op) { color: #94a3b8; } .code-block :global(.arg) { color: #fdba74; }
</style>
