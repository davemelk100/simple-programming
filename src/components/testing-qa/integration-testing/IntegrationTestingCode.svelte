<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Code: Integration Test Examples</h2>
    <p class="text-slate-600">Real integration test patterns for APIs, databases, and multi-module interactions.</p>
  </div>

  <!-- Testing an API endpoint with supertest -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Testing an API Endpoint</h3>
    <p class="text-sm text-slate-600">Use <code class="rounded bg-slate-100 px-1 text-blue-700">supertest</code> to send real HTTP requests to your Express app and verify the responses.</p>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">describe</span>, <span class="var">it</span>, <span class="var">expect</span> } <span class="kw">from</span> <span class="str">'vitest'</span>;
<span class="kw">import</span> <span class="var">request</span> <span class="kw">from</span> <span class="str">'supertest'</span>;
<span class="kw">import</span> <span class="var">app</span> <span class="kw">from</span> <span class="str">'./app'</span>;

<span class="fn">describe</span>(<span class="str">'GET /api/users'</span>, () => {
  <span class="fn">it</span>(<span class="str">'returns a list of users'</span>, <span class="kw">async</span> () => {
    <span class="kw">const</span> <span class="var">res</span> = <span class="kw">await</span> <span class="fn">request</span>(<span class="var">app</span>)
      .<span class="fn">get</span>(<span class="str">'/api/users'</span>)
      .<span class="fn">expect</span>(<span class="num">200</span>);

    <span class="fn">expect</span>(<span class="var">res</span>.<span class="var">body</span>).<span class="fn">toBeInstanceOf</span>(<span class="var">Array</span>);
    <span class="fn">expect</span>(<span class="var">res</span>.<span class="var">body</span>.<span class="var">length</span>).<span class="fn">toBeGreaterThan</span>(<span class="num">0</span>);
    <span class="fn">expect</span>(<span class="var">res</span>.<span class="var">body</span>[<span class="num">0</span>]).<span class="fn">toHaveProperty</span>(<span class="str">'name'</span>);
    <span class="fn">expect</span>(<span class="var">res</span>.<span class="var">body</span>[<span class="num">0</span>]).<span class="fn">toHaveProperty</span>(<span class="str">'email'</span>);
  });

  <span class="fn">it</span>(<span class="str">'returns 404 for non-existent user'</span>, <span class="kw">async</span> () => {
    <span class="kw">const</span> <span class="var">res</span> = <span class="kw">await</span> <span class="fn">request</span>(<span class="var">app</span>)
      .<span class="fn">get</span>(<span class="str">'/api/users/99999'</span>)
      .<span class="fn">expect</span>(<span class="num">404</span>);

    <span class="fn">expect</span>(<span class="var">res</span>.<span class="var">body</span>.<span class="var">error</span>).<span class="fn">toBe</span>(<span class="str">'User not found'</span>);
  });
});`}</code></pre>
  </div>

  <!-- Testing POST with body -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Testing a POST Endpoint</h3>
    <p class="text-sm text-slate-600">Send a request body and verify the resource was created correctly.</p>
    <pre class="code-block"><code>{@html `<span class="fn">describe</span>(<span class="str">'POST /api/users'</span>, () => {
  <span class="fn">it</span>(<span class="str">'creates a new user'</span>, <span class="kw">async</span> () => {
    <span class="kw">const</span> <span class="var">newUser</span> = {
      <span class="var">name</span>: <span class="str">'Alice'</span>,
      <span class="var">email</span>: <span class="str">'alice@example.com'</span>,
    };

    <span class="kw">const</span> <span class="var">res</span> = <span class="kw">await</span> <span class="fn">request</span>(<span class="var">app</span>)
      .<span class="fn">post</span>(<span class="str">'/api/users'</span>)
      .<span class="fn">send</span>(<span class="var">newUser</span>)
      .<span class="fn">expect</span>(<span class="num">201</span>);

    <span class="fn">expect</span>(<span class="var">res</span>.<span class="var">body</span>.<span class="var">name</span>).<span class="fn">toBe</span>(<span class="str">'Alice'</span>);
    <span class="fn">expect</span>(<span class="var">res</span>.<span class="var">body</span>.<span class="var">id</span>).<span class="fn">toBeDefined</span>();
  });

  <span class="fn">it</span>(<span class="str">'rejects invalid data'</span>, <span class="kw">async</span> () => {
    <span class="kw">const</span> <span class="var">res</span> = <span class="kw">await</span> <span class="fn">request</span>(<span class="var">app</span>)
      .<span class="fn">post</span>(<span class="str">'/api/users'</span>)
      .<span class="fn">send</span>({ <span class="var">name</span>: <span class="str">''</span> }) <span class="cmt">// missing email</span>
      .<span class="fn">expect</span>(<span class="num">400</span>);

    <span class="fn">expect</span>(<span class="var">res</span>.<span class="var">body</span>.<span class="var">error</span>).<span class="fn">toContain</span>(<span class="str">'email'</span>);
  });
});`}</code></pre>
  </div>

  <!-- Testing database operations -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Testing Database Operations</h3>
    <p class="text-sm text-slate-600">Verify that your data layer correctly reads and writes to the database.</p>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">db</span> } <span class="kw">from</span> <span class="str">'./database'</span>;

<span class="fn">describe</span>(<span class="str">'UserRepository'</span>, () => {
  <span class="fn">beforeEach</span>(<span class="kw">async</span> () => {
    <span class="kw">await</span> <span class="var">db</span>.<span class="fn">migrate</span>();   <span class="cmt">// set up tables</span>
    <span class="kw">await</span> <span class="var">db</span>.<span class="fn">seed</span>();      <span class="cmt">// insert test data</span>
  });

  <span class="fn">afterEach</span>(<span class="kw">async</span> () => {
    <span class="kw">await</span> <span class="var">db</span>.<span class="fn">cleanup</span>();   <span class="cmt">// remove test data</span>
  });

  <span class="fn">it</span>(<span class="str">'inserts and retrieves a user'</span>, <span class="kw">async</span> () => {
    <span class="kw">const</span> <span class="var">id</span> = <span class="kw">await</span> <span class="var">db</span>.<span class="fn">insert</span>(<span class="str">'users'</span>, {
      <span class="var">name</span>: <span class="str">'Bob'</span>,
      <span class="var">email</span>: <span class="str">'bob@test.com'</span>,
    });

    <span class="kw">const</span> <span class="var">user</span> = <span class="kw">await</span> <span class="var">db</span>.<span class="fn">findById</span>(<span class="str">'users'</span>, <span class="var">id</span>);
    <span class="fn">expect</span>(<span class="var">user</span>.<span class="var">name</span>).<span class="fn">toBe</span>(<span class="str">'Bob'</span>);
    <span class="fn">expect</span>(<span class="var">user</span>.<span class="var">email</span>).<span class="fn">toBe</span>(<span class="str">'bob@test.com'</span>);
  });

  <span class="fn">it</span>(<span class="str">'deletes a user from the database'</span>, <span class="kw">async</span> () => {
    <span class="kw">await</span> <span class="var">db</span>.<span class="fn">delete</span>(<span class="str">'users'</span>, <span class="num">1</span>);
    <span class="kw">const</span> <span class="var">user</span> = <span class="kw">await</span> <span class="var">db</span>.<span class="fn">findById</span>(<span class="str">'users'</span>, <span class="num">1</span>);
    <span class="fn">expect</span>(<span class="var">user</span>).<span class="fn">toBeNull</span>();
  });
});`}</code></pre>
  </div>

  <!-- Testing a service that uses multiple modules -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Testing a Multi-Module Service</h3>
    <p class="text-sm text-slate-600">Integration tests verify that validation, business logic, and data access work together.</p>
    <pre class="code-block"><code>{@html `<span class="fn">describe</span>(<span class="str">'OrderService'</span>, () => {
  <span class="fn">it</span>(<span class="str">'creates an order with validated items'</span>, <span class="kw">async</span> () => {
    <span class="cmt">// This test exercises: validation -> pricing -> database</span>
    <span class="kw">const</span> <span class="var">order</span> = <span class="kw">await</span> <span class="var">orderService</span>.<span class="fn">create</span>({
      <span class="var">userId</span>: <span class="num">1</span>,
      <span class="var">items</span>: [
        { <span class="var">productId</span>: <span class="num">101</span>, <span class="var">quantity</span>: <span class="num">2</span> },
        { <span class="var">productId</span>: <span class="num">102</span>, <span class="var">quantity</span>: <span class="num">1</span> },
      ],
    });

    <span class="fn">expect</span>(<span class="var">order</span>.<span class="var">id</span>).<span class="fn">toBeDefined</span>();
    <span class="fn">expect</span>(<span class="var">order</span>.<span class="var">total</span>).<span class="fn">toBeGreaterThan</span>(<span class="num">0</span>);
    <span class="fn">expect</span>(<span class="var">order</span>.<span class="var">items</span>).<span class="fn">toHaveLength</span>(<span class="num">2</span>);

    <span class="cmt">// Verify it was saved to the database</span>
    <span class="kw">const</span> <span class="var">saved</span> = <span class="kw">await</span> <span class="var">db</span>.<span class="fn">findById</span>(<span class="str">'orders'</span>, <span class="var">order</span>.<span class="var">id</span>);
    <span class="fn">expect</span>(<span class="var">saved</span>).<span class="fn">not</span>.<span class="fn">toBeNull</span>();
  });
});`}</code></pre>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      I've studied the code examples
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Code: Advanced Integration Testing</h2>
      <p class="text-slate-600">Docker test containers, contract testing, database seeding, middleware testing, and WebSocket tests.</p>
    </div>

    <!-- Docker test containers -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Docker Test Containers</h3>
      <p class="text-sm text-slate-600">Spin up real database instances in Docker for your tests. Libraries like <code class="rounded bg-slate-100 px-1 text-blue-700">testcontainers</code> handle the lifecycle automatically.</p>
      <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">PostgreSqlContainer</span> } <span class="kw">from</span> <span class="str">'@testcontainers/postgresql'</span>;

<span class="kw">let</span> <span class="var">container</span>;
<span class="kw">let</span> <span class="var">db</span>;

<span class="fn">beforeAll</span>(<span class="kw">async</span> () => {
  <span class="cmt">// Start a real PostgreSQL instance in Docker</span>
  <span class="var">container</span> = <span class="kw">await</span> <span class="kw">new</span> <span class="fn">PostgreSqlContainer</span>()
    .<span class="fn">withDatabase</span>(<span class="str">'test_db'</span>)
    .<span class="fn">start</span>();

  <span class="cmt">// Connect using the container's dynamic port</span>
  <span class="var">db</span> = <span class="kw">await</span> <span class="fn">createConnection</span>({
    <span class="var">host</span>: <span class="var">container</span>.<span class="fn">getHost</span>(),
    <span class="var">port</span>: <span class="var">container</span>.<span class="fn">getPort</span>(),
    <span class="var">database</span>: <span class="str">'test_db'</span>,
    <span class="var">user</span>: <span class="var">container</span>.<span class="fn">getUsername</span>(),
    <span class="var">password</span>: <span class="var">container</span>.<span class="fn">getPassword</span>(),
  });

  <span class="kw">await</span> <span class="var">db</span>.<span class="fn">runMigrations</span>();
}, <span class="num">60000</span>); <span class="cmt">// 60s timeout for container startup</span>

<span class="fn">afterAll</span>(<span class="kw">async</span> () => {
  <span class="kw">await</span> <span class="var">db</span>.<span class="fn">close</span>();
  <span class="kw">await</span> <span class="var">container</span>.<span class="fn">stop</span>();
});`}</code></pre>
    </div>

    <!-- Contract testing with Pact -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Contract Testing with Pact</h3>
      <p class="text-sm text-slate-600">Define what the consumer expects and verify the provider delivers it.</p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Consumer side: define expectations</span>
<span class="kw">import</span> { <span class="var">PactV3</span> } <span class="kw">from</span> <span class="str">'@pact-foundation/pact'</span>;

<span class="kw">const</span> <span class="var">provider</span> = <span class="kw">new</span> <span class="fn">PactV3</span>({
  <span class="var">consumer</span>: <span class="str">'frontend'</span>,
  <span class="var">provider</span>: <span class="str">'user-service'</span>,
});

<span class="fn">describe</span>(<span class="str">'User API Contract'</span>, () => {
  <span class="fn">it</span>(<span class="str">'returns user by id'</span>, <span class="kw">async</span> () => {
    <span class="var">provider</span>
      .<span class="fn">given</span>(<span class="str">'user 1 exists'</span>)
      .<span class="fn">uponReceiving</span>(<span class="str">'a request for user 1'</span>)
      .<span class="fn">withRequest</span>({ <span class="var">method</span>: <span class="str">'GET'</span>, <span class="var">path</span>: <span class="str">'/users/1'</span> })
      .<span class="fn">willRespondWith</span>({
        <span class="var">status</span>: <span class="num">200</span>,
        <span class="var">body</span>: { <span class="var">id</span>: <span class="num">1</span>, <span class="var">name</span>: <span class="str">'Alice'</span> },
      });

    <span class="kw">await</span> <span class="var">provider</span>.<span class="fn">executeTest</span>(<span class="kw">async</span> (<span class="arg">mockServer</span>) => {
      <span class="kw">const</span> <span class="var">user</span> = <span class="kw">await</span> <span class="fn">fetchUser</span>(<span class="num">1</span>, <span class="arg">mockServer</span>.<span class="var">url</span>);
      <span class="fn">expect</span>(<span class="var">user</span>.<span class="var">name</span>).<span class="fn">toBe</span>(<span class="str">'Alice'</span>);
    });
  });
});`}</code></pre>
    </div>

    <!-- Database seeding/teardown -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Database Seeding and Teardown</h3>
      <p class="text-sm text-slate-600">Use transaction rollback for fast, isolated test cleanup.</p>
      <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">db</span> } <span class="kw">from</span> <span class="str">'./database'</span>;

<span class="kw">let</span> <span class="var">trx</span>; <span class="cmt">// transaction handle</span>

<span class="fn">beforeEach</span>(<span class="kw">async</span> () => {
  <span class="cmt">// Start a transaction before each test</span>
  <span class="var">trx</span> = <span class="kw">await</span> <span class="var">db</span>.<span class="fn">transaction</span>();

  <span class="cmt">// Seed with test data inside the transaction</span>
  <span class="kw">await</span> <span class="var">trx</span>(<span class="str">'users'</span>).<span class="fn">insert</span>([
    { <span class="var">id</span>: <span class="num">1</span>, <span class="var">name</span>: <span class="str">'Alice'</span>, <span class="var">email</span>: <span class="str">'alice@test.com'</span> },
    { <span class="var">id</span>: <span class="num">2</span>, <span class="var">name</span>: <span class="str">'Bob'</span>, <span class="var">email</span>: <span class="str">'bob@test.com'</span> },
  ]);
});

<span class="fn">afterEach</span>(<span class="kw">async</span> () => {
  <span class="cmt">// Roll back -- all changes from the test disappear</span>
  <span class="kw">await</span> <span class="var">trx</span>.<span class="fn">rollback</span>();
});`}</code></pre>
    </div>

    <!-- Testing middleware -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Testing Middleware</h3>
      <p class="text-sm text-slate-600">Verify that middleware (auth, validation, rate limiting) works correctly in the request chain.</p>
      <pre class="code-block"><code>{@html `<span class="fn">describe</span>(<span class="str">'Auth Middleware'</span>, () => {
  <span class="fn">it</span>(<span class="str">'rejects requests without a token'</span>, <span class="kw">async</span> () => {
    <span class="kw">const</span> <span class="var">res</span> = <span class="kw">await</span> <span class="fn">request</span>(<span class="var">app</span>)
      .<span class="fn">get</span>(<span class="str">'/api/protected'</span>)
      .<span class="fn">expect</span>(<span class="num">401</span>);

    <span class="fn">expect</span>(<span class="var">res</span>.<span class="var">body</span>.<span class="var">error</span>).<span class="fn">toBe</span>(<span class="str">'Authentication required'</span>);
  });

  <span class="fn">it</span>(<span class="str">'allows requests with a valid token'</span>, <span class="kw">async</span> () => {
    <span class="kw">const</span> <span class="var">token</span> = <span class="fn">generateTestToken</span>({ <span class="var">userId</span>: <span class="num">1</span> });

    <span class="kw">const</span> <span class="var">res</span> = <span class="kw">await</span> <span class="fn">request</span>(<span class="var">app</span>)
      .<span class="fn">get</span>(<span class="str">'/api/protected'</span>)
      .<span class="fn">set</span>(<span class="str">'Authorization'</span>, <span class="str">\`Bearer \${<span class="var">token</span>}\`</span>)
      .<span class="fn">expect</span>(<span class="num">200</span>);

    <span class="fn">expect</span>(<span class="var">res</span>.<span class="var">body</span>.<span class="var">userId</span>).<span class="fn">toBe</span>(<span class="num">1</span>);
  });

  <span class="fn">it</span>(<span class="str">'rejects expired tokens'</span>, <span class="kw">async</span> () => {
    <span class="kw">const</span> <span class="var">expiredToken</span> = <span class="fn">generateTestToken</span>(
      { <span class="var">userId</span>: <span class="num">1</span> },
      { <span class="var">expiresIn</span>: <span class="str">'-1h'</span> }
    );

    <span class="kw">await</span> <span class="fn">request</span>(<span class="var">app</span>)
      .<span class="fn">get</span>(<span class="str">'/api/protected'</span>)
      .<span class="fn">set</span>(<span class="str">'Authorization'</span>, <span class="str">\`Bearer \${<span class="var">expiredToken</span>}\`</span>)
      .<span class="fn">expect</span>(<span class="num">401</span>);
  });
});`}</code></pre>
    </div>

    <!-- Testing WebSocket connections -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Testing WebSocket Connections</h3>
      <p class="text-sm text-slate-600">Verify real-time communication works correctly between client and server.</p>
      <pre class="code-block"><code>{@html `<span class="kw">import</span> <span class="var">WebSocket</span> <span class="kw">from</span> <span class="str">'ws'</span>;

<span class="fn">describe</span>(<span class="str">'WebSocket Server'</span>, () => {
  <span class="kw">let</span> <span class="var">server</span>;

  <span class="fn">beforeAll</span>(() => {
    <span class="var">server</span> = <span class="fn">createServer</span>();
    <span class="var">server</span>.<span class="fn">listen</span>(<span class="num">0</span>); <span class="cmt">// random port</span>
  });

  <span class="fn">afterAll</span>(() => <span class="var">server</span>.<span class="fn">close</span>());

  <span class="fn">it</span>(<span class="str">'echoes messages back'</span>, <span class="kw">async</span> () => {
    <span class="kw">const</span> <span class="var">port</span> = <span class="var">server</span>.<span class="var">address</span>().<span class="var">port</span>;
    <span class="kw">const</span> <span class="var">ws</span> = <span class="kw">new</span> <span class="fn">WebSocket</span>(<span class="str">\`ws://localhost:\${<span class="var">port</span>}\`</span>);

    <span class="kw">const</span> <span class="var">message</span> = <span class="kw">await new</span> <span class="fn">Promise</span>((<span class="arg">resolve</span>) => {
      <span class="var">ws</span>.<span class="fn">on</span>(<span class="str">'open'</span>, () => {
        <span class="var">ws</span>.<span class="fn">send</span>(<span class="str">'Hello'</span>);
      });
      <span class="var">ws</span>.<span class="fn">on</span>(<span class="str">'message'</span>, (<span class="arg">data</span>) => {
        <span class="arg">resolve</span>(<span class="arg">data</span>.<span class="fn">toString</span>());
      });
    });

    <span class="fn">expect</span>(<span class="var">message</span>).<span class="fn">toBe</span>(<span class="str">'Echo: Hello'</span>);
    <span class="var">ws</span>.<span class="fn">close</span>();
  });
});`}</code></pre>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
      >
        I've studied the advanced examples
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
