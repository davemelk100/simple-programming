<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);

  const cards = [
    { emoji: '\uD83D\uDCE8', title: 'Request', desc: 'You (the frontend) send a request to the API — like telling a waiter what you want to order.' },
    { emoji: '\uD83D\uDC68\u200D\uD83C\uDF73', title: 'Process', desc: 'The API takes your request to the backend/database — like the waiter going to the kitchen.' },
    { emoji: '\uD83D\uDCE6', title: 'Response', desc: 'The API brings back the result — like the waiter returning with your food.' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < cards.length) {
        visibleCards++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">What Is an API?</h2>
    <p class="text-slate-600">
      Imagine you are at a restaurant. You do not walk into the kitchen and cook your own food. Instead, you tell the <strong>waiter</strong> what you want, the waiter takes your order to the kitchen, and then brings back your meal. An <strong>API</strong> (Application Programming Interface) works exactly the same way.
    </p>
    <p class="mt-3 text-slate-600">
      Your frontend (the customer) sends a <strong>request</strong> to the API (the waiter), which communicates with the backend or database (the kitchen), and returns a <strong>response</strong> with the data you asked for.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    {#each cards as card, i}
      <div
        class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5 text-center transition-all duration-700
          {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
      >
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">REST: The Most Common API Style</h3>
    <p class="text-slate-600">
      Most APIs follow a pattern called <strong>REST</strong> (Representational State Transfer). REST uses plain URLs to represent things (called <strong>resources</strong>) and standard HTTP methods to perform actions on them.
    </p>

    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5 space-y-4">
      <div>
        <h4 class="font-bold text-slate-800">URLs as Resources</h4>
        <p class="text-sm text-slate-600">Each URL represents a "thing" in your application. For example, <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">/users</code> represents all users, and <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">/users/42</code> represents the user with ID 42.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">HTTP Methods</h4>
        <div class="mt-2 grid gap-2 sm:grid-cols-2">
          <div class="flex items-center gap-2 rounded-lg bg-white p-2">
            <span class="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">GET</span>
            <span class="text-sm text-slate-600">Read data (fetch users)</span>
          </div>
          <div class="flex items-center gap-2 rounded-lg bg-white p-2">
            <span class="rounded bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">POST</span>
            <span class="text-sm text-slate-600">Create new data (add a user)</span>
          </div>
          <div class="flex items-center gap-2 rounded-lg bg-white p-2">
            <span class="rounded bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">PUT</span>
            <span class="text-sm text-slate-600">Update existing data (edit a user)</span>
          </div>
          <div class="flex items-center gap-2 rounded-lg bg-white p-2">
            <span class="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">DELETE</span>
            <span class="text-sm text-slate-600">Remove data (delete a user)</span>
          </div>
        </div>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Status Codes</h4>
        <p class="text-sm text-slate-600">Every response includes a number that tells you what happened:</p>
        <div class="mt-2 space-y-1">
          <div class="flex items-center gap-2 text-sm">
            <span class="rounded bg-green-600 px-2 py-0.5 text-xs font-bold text-white">200</span>
            <span class="text-slate-600">OK &mdash; everything worked</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="rounded bg-green-600 px-2 py-0.5 text-xs font-bold text-white">201</span>
            <span class="text-slate-600">Created &mdash; a new resource was made</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="rounded bg-amber-600 px-2 py-0.5 text-xs font-bold text-white">404</span>
            <span class="text-slate-600">Not Found &mdash; the resource does not exist</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">500</span>
            <span class="text-slate-600">Server Error &mdash; something broke on the server</span>
          </div>
        </div>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">JSON: The Language of APIs</h4>
        <p class="text-sm text-slate-600">APIs send and receive data as <strong>JSON</strong> (JavaScript Object Notation) &mdash; a lightweight text format that both humans and computers can read easily.</p>
        <pre class="code-block mt-2"><code>{@html `<span class="cmt">// A typical JSON response</span>
{
  <span class="str">"id"</span>: <span class="num">42</span>,
  <span class="str">"name"</span>: <span class="str">"Alice"</span>,
  <span class="str">"email"</span>: <span class="str">"alice@example.com"</span>
}`}</code></pre>
      </div>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
    >
      I understand APIs
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">APIs (Advanced)</h2>
      <p class="text-slate-600">REST alternatives, versioning strategies, rate limiting, pagination patterns, and professional API design.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">REST vs GraphQL vs tRPC</h3>
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">REST</h4>
          <p class="text-sm text-slate-600">Fixed endpoints, each returning a predetermined shape. Simple, cacheable, and widely understood. Can lead to over-fetching (getting more data than needed) or under-fetching (needing multiple requests).</p>
          <pre class="code-block mt-2"><code>{@html `<span class="kw">GET</span> <span class="str">/api/users/42</span>
<span class="kw">GET</span> <span class="str">/api/users/42/posts</span>`}</code></pre>
        </div>
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">GraphQL</h4>
          <p class="text-sm text-slate-600">Single endpoint, clients request exactly the fields they need. Eliminates over/under-fetching. More complex server-side, requires schema definition.</p>
          <pre class="code-block mt-2"><code>{@html `<span class="kw">query</span> {
  <span class="fn">user</span>(<span class="arg">id</span>: <span class="num">42</span>) {
    <span class="var">name</span>
    <span class="var">posts</span> { <span class="var">title</span> }
  }
}`}</code></pre>
        </div>
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">tRPC</h4>
          <p class="text-sm text-slate-600">End-to-end type safety between TypeScript frontend and backend. No schema or code generation needed. Types are inferred directly from your server code.</p>
          <pre class="code-block mt-2"><code>{@html `<span class="cmt">// Client call — fully typed</span>
<span class="kw">const</span> <span class="var">user</span> = <span class="kw">await</span>
  <span class="var">trpc</span>.<span class="fn">user</span>.<span class="fn">getById</span>
    .<span class="fn">query</span>({ <span class="arg">id</span>: <span class="num">42</span> });`}</code></pre>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">API Versioning</h3>
      <p class="text-slate-600">
        When you change your API, existing clients may break. Versioning lets you evolve your API while keeping old clients working.
      </p>
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-lg border border-slate-200 bg-white p-3">
          <span class="text-sm font-bold text-indigo-700">URL Path</span>
          <p class="text-xs text-slate-500 mt-1"><code class="rounded bg-slate-100 px-1 text-indigo-700">/api/v1/users</code> &mdash; most common, easy to understand</p>
        </div>
        <div class="rounded-lg border border-slate-200 bg-white p-3">
          <span class="text-sm font-bold text-indigo-700">Header</span>
          <p class="text-xs text-slate-500 mt-1"><code class="rounded bg-slate-100 px-1 text-indigo-700">Accept: application/vnd.api+json;version=2</code></p>
        </div>
        <div class="rounded-lg border border-slate-200 bg-white p-3">
          <span class="text-sm font-bold text-indigo-700">Query Param</span>
          <p class="text-xs text-slate-500 mt-1"><code class="rounded bg-slate-100 px-1 text-indigo-700">/api/users?version=2</code></p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Rate Limiting</h3>
      <p class="text-slate-600">
        Rate limiting protects your API from abuse by capping how many requests a client can make in a given time window. Common strategies include <strong>fixed window</strong> (e.g., 100 requests per minute), <strong>sliding window</strong>, and <strong>token bucket</strong>.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Response headers from a rate-limited API</span>
<span class="var">X-RateLimit-Limit</span>: <span class="num">100</span>        <span class="cmt">// max requests per window</span>
<span class="var">X-RateLimit-Remaining</span>: <span class="num">73</span>   <span class="cmt">// requests left</span>
<span class="var">X-RateLimit-Reset</span>: <span class="num">1672531200</span> <span class="cmt">// when the window resets (Unix timestamp)</span>
<span class="var">Retry-After</span>: <span class="num">30</span>              <span class="cmt">// seconds to wait if limit exceeded (429 status)</span>`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Pagination: Cursor vs Offset</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Offset Pagination</h4>
          <p class="text-sm text-slate-600">Simple: skip N items, take M. Familiar but can be slow on large datasets and unstable when items are added/removed during pagination.</p>
          <pre class="code-block mt-2"><code>{@html `<span class="kw">GET</span> <span class="str">/api/posts?offset=20&limit=10</span>`}</code></pre>
        </div>
        <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Cursor Pagination</h4>
          <p class="text-sm text-slate-600">Uses an opaque token (cursor) pointing to the last item seen. More performant on large datasets and stable during concurrent modifications.</p>
          <pre class="code-block mt-2"><code>{@html `<span class="kw">GET</span> <span class="str">/api/posts?cursor=abc123&limit=10</span>`}</code></pre>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">OpenAPI / Swagger</h3>
      <p class="text-slate-600">
        <strong>OpenAPI</strong> (formerly Swagger) is a specification for describing REST APIs in a machine-readable YAML or JSON file. It enables automatic documentation generation, client SDK generation, request validation, and interactive API explorers.
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Middleware Chains</h3>
      <p class="text-slate-600">
        Middleware functions sit between the incoming request and your route handler. Each middleware can inspect, modify, or reject the request before passing it to the next in the chain. Common middleware handles authentication, logging, rate limiting, CORS, and input validation.
      </p>
      <div class="flex flex-wrap items-center gap-2 text-sm">
        <span class="rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-slate-700">Request</span>
        <span class="text-slate-400">&#8594;</span>
        <span class="rounded-lg bg-indigo-100 px-3 py-1.5 font-mono text-indigo-700">Logger</span>
        <span class="text-slate-400">&#8594;</span>
        <span class="rounded-lg bg-indigo-100 px-3 py-1.5 font-mono text-indigo-700">Auth</span>
        <span class="text-slate-400">&#8594;</span>
        <span class="rounded-lg bg-indigo-100 px-3 py-1.5 font-mono text-indigo-700">Validate</span>
        <span class="text-slate-400">&#8594;</span>
        <span class="rounded-lg bg-indigo-200 px-3 py-1.5 font-mono text-indigo-800">Handler</span>
        <span class="text-slate-400">&#8594;</span>
        <span class="rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-slate-700">Response</span>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Error Handling Patterns &amp; CORS</h3>
      <p class="text-slate-600">
        Good APIs return consistent error responses with a status code, error type, and human-readable message. <strong>CORS</strong> (Cross-Origin Resource Sharing) controls which domains can call your API from a browser. The server sends <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">Access-Control-Allow-Origin</code> headers to grant or deny access.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Consistent error response format</span>
{
  <span class="str">"error"</span>: {
    <span class="str">"status"</span>: <span class="num">422</span>,
    <span class="str">"type"</span>: <span class="str">"VALIDATION_ERROR"</span>,
    <span class="str">"message"</span>: <span class="str">"Email is required"</span>,
    <span class="str">"details"</span>: [{ <span class="str">"field"</span>: <span class="str">"email"</span>, <span class="str">"rule"</span>: <span class="str">"required"</span> }]
  }
}`}</code></pre>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
      >
        I understand APIs
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
