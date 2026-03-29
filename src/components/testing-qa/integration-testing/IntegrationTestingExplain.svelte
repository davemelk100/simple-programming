<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let pyramidVisible = $state(false);

  onMount(() => {
    setTimeout(() => { pyramidVisible = true; }, 400);
  });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">What Is Integration Testing?</h2>
    <p class="text-slate-600">
      Integration testing checks how <strong>multiple parts work together</strong>. While unit tests verify that each LEGO brick is the right shape, integration tests verify that <strong>the bricks click together correctly</strong>. A function might work perfectly on its own, but when it talks to a database or calls another service, things can break at the seams.
    </p>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">What Gets Integrated?</h3>
    <p class="text-slate-600">
      Integration tests focus on the <strong>boundaries</strong> between components. Here are common things you test together:
    </p>
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
        <h4 class="mb-1 font-bold text-slate-800">API + Database</h4>
        <p class="text-sm text-slate-600">Does your route handler correctly read from and write to the database? Do SQL queries return the right shape of data?</p>
      </div>
      <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
        <h4 class="mb-1 font-bold text-slate-800">Frontend + Backend</h4>
        <p class="text-sm text-slate-600">Does the UI correctly send requests and display the responses? Do form submissions actually create records?</p>
      </div>
      <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
        <h4 class="mb-1 font-bold text-slate-800">Service + Service</h4>
        <p class="text-sm text-slate-600">When your auth service calls your user service, do they agree on the data format? Do error codes propagate correctly?</p>
      </div>
      <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
        <h4 class="mb-1 font-bold text-slate-800">Modules Together</h4>
        <p class="text-sm text-slate-600">When your validation module, business logic, and data layer all run together, does the full pipeline produce correct results?</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">The Testing Pyramid</h3>
    <p class="text-slate-600">
      The testing pyramid shows the <strong>ideal distribution</strong> of test types. You want many fast unit tests at the base, fewer integration tests in the middle, and even fewer slow end-to-end tests at the top.
    </p>
    <div class="flex justify-center transition-all duration-700 {pyramidVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
      <div class="space-y-1 text-center">
        <div class="mx-auto w-32 rounded-lg bg-red-100 px-4 py-3 border-2 border-red-200">
          <p class="text-xs font-bold text-red-700">E2E Tests</p>
          <p class="text-xs text-red-600">Few, slow</p>
        </div>
        <div class="mx-auto w-52 rounded-lg bg-blue-100 px-4 py-3 border-2 border-blue-200">
          <p class="text-xs font-bold text-blue-700">Integration Tests</p>
          <p class="text-xs text-blue-600">Some, medium speed</p>
        </div>
        <div class="mx-auto w-72 rounded-lg bg-green-100 px-4 py-3 border-2 border-green-200">
          <p class="text-xs font-bold text-green-700">Unit Tests</p>
          <p class="text-xs text-green-600">Many, fast</p>
        </div>
      </div>
    </div>
    <p class="text-sm text-slate-500 text-center">
      Unit tests run in milliseconds. Integration tests may take seconds (spinning up databases, making HTTP calls). E2E tests can take minutes.
    </p>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Unit vs. Integration: A Quick Comparison</h3>
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

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      I understand integration testing
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Integration Testing (Advanced)</h2>
      <p class="text-slate-600">Test databases, API testing, contract testing, and strategies for managing test data.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Test Databases</h3>
      <p class="text-slate-600">
        Integration tests need a real database, but not your production one. Common strategies:
      </p>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">In-Memory Databases</h4>
          <p class="text-sm text-slate-600">SQLite in-memory mode or similar. Lightning fast, no setup, but may behave differently than your production database (Postgres, MySQL).</p>
        </div>
        <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Docker Test Containers</h4>
          <p class="text-sm text-slate-600">Spin up a real Postgres/MySQL instance in Docker for each test run. Slower to start but gives you exact production parity. Libraries like <strong>Testcontainers</strong> automate this.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">API Testing with Supertest</h3>
      <p class="text-slate-600">
        <strong>Supertest</strong> lets you test Express/Koa/Fastify routes by sending HTTP requests without starting a real server. It spins up an in-process server, sends the request, and gives you the response to assert on.
      </p>
      <pre class="code-block"><code>{@html `<span class="kw">import</span> <span class="var">request</span> <span class="kw">from</span> <span class="str">'supertest'</span>;
<span class="kw">import</span> <span class="var">app</span> <span class="kw">from</span> <span class="str">'./app'</span>;

<span class="fn">it</span>(<span class="str">'GET /users returns a list'</span>, <span class="kw">async</span> () => {
  <span class="kw">const</span> <span class="var">res</span> = <span class="kw">await</span> <span class="fn">request</span>(<span class="var">app</span>)
    .<span class="fn">get</span>(<span class="str">'/users'</span>)
    .<span class="fn">expect</span>(<span class="num">200</span>);

  <span class="fn">expect</span>(<span class="var">res</span>.<span class="var">body</span>).<span class="fn">toBeInstanceOf</span>(<span class="var">Array</span>);
});`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Testing Middleware Chains</h3>
      <p class="text-slate-600">
        Middleware functions (authentication, validation, logging) run in sequence before your route handler. Integration tests verify the full chain works: does the auth middleware reject bad tokens? Does the validation middleware reject missing fields before the handler runs?
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Contract Testing</h3>
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

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Test Fixtures and Factories</h3>
      <p class="text-slate-600">
        <strong>Fixtures</strong> are pre-defined data sets loaded before tests. <strong>Factories</strong> are functions that generate test data with sensible defaults. Both solve the problem of needing consistent, predictable data for your integration tests.
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
      <h3 class="text-lg font-bold text-slate-800">Database Seeding and Cleanup</h3>
      <p class="text-slate-600">
        Every integration test should start with a known database state and clean up after itself. Common strategies:
      </p>
      <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
        <ul class="space-y-1.5 text-sm text-slate-600">
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
            <span><strong>Transaction rollback:</strong> Wrap each test in a transaction and roll it back after. Fast and clean.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
            <span><strong>Truncate tables:</strong> Clear all tables before each test suite. Slower but simpler.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
            <span><strong>Fresh database:</strong> Create and destroy a database per test run. Slowest but guarantees isolation.</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Testing Webhooks</h3>
      <p class="text-slate-600">
        Webhooks are HTTP callbacks from external services (e.g., Stripe payment events). To test them, you simulate the incoming request with the expected payload and signature, and verify your handler processes it correctly.
      </p>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
      >
        I understand integration testing
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
