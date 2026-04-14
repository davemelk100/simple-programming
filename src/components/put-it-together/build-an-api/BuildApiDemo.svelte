<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: API Tester ===
  interface Endpoint {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    body: string | null;
    status: number;
    statusText: string;
    response: string;
    description: string;
  }

  const endpoints: Endpoint[] = [
    {
      method: 'GET',
      url: '/api/users',
      body: null,
      status: 200,
      statusText: 'OK',
      description: 'Fetch all users',
      response: JSON.stringify([
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
        { id: 3, name: "Charlie", email: "charlie@example.com" },
      ], null, 2),
    },
    {
      method: 'POST',
      url: '/api/users',
      body: JSON.stringify({ name: "Diana", email: "diana@example.com" }, null, 2),
      status: 201,
      statusText: 'Created',
      description: 'Create a new user',
      response: JSON.stringify({ id: 4, name: "Diana", email: "diana@example.com", createdAt: "2026-03-28T10:00:00Z" }, null, 2),
    },
    {
      method: 'PUT',
      url: '/api/users/1',
      body: JSON.stringify({ name: "Alice Smith", email: "alice.smith@example.com" }, null, 2),
      status: 200,
      statusText: 'OK',
      description: 'Update user with ID 1',
      response: JSON.stringify({ id: 1, name: "Alice Smith", email: "alice.smith@example.com", updatedAt: "2026-03-28T10:05:00Z" }, null, 2),
    },
    {
      method: 'DELETE',
      url: '/api/users/1',
      body: null,
      status: 200,
      statusText: 'OK',
      description: 'Delete user with ID 1',
      response: JSON.stringify({ message: "User 1 deleted successfully" }, null, 2),
    },
  ];

  let selectedEndpoint = $state<Endpoint | null>(null);
  let showResponse = $state(false);

  function selectEndpoint(ep: Endpoint) {
    selectedEndpoint = ep;
    showResponse = false;
    setTimeout(() => { showResponse = true; }, 600);
  }

  function methodColor(method: string): string {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-700';
      case 'POST': return 'bg-blue-100 text-blue-700';
      case 'PUT': return 'bg-amber-100 text-amber-700';
      case 'DELETE': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  }

  function statusColor(status: number): string {
    if (status >= 200 && status < 300) return 'bg-green-600';
    if (status >= 400 && status < 500) return 'bg-amber-600';
    return 'bg-red-600';
  }

  // === Advanced mode: Endpoint Designer ===
  let resourceName = $state('posts');
  let enableCreate = $state(true);
  let enableRead = $state(true);
  let enableUpdate = $state(true);
  let enableDelete = $state(true);
  let framework = $state<'express' | 'fastify'>('express');

  let generatedCode = $derived(generateRoutes());

  function generateRoutes(): string {
    const r = resourceName.trim().toLowerCase() || 'items';
    const lines: string[] = [];

    if (framework === 'express') {
      lines.push(`<span class="kw">const</span> <span class="var">express</span> = <span class="fn">require</span>(<span class="str">'express'</span>);`);
      lines.push(`<span class="kw">const</span> <span class="var">router</span> = <span class="var">express</span>.<span class="fn">Router</span>();`);
      lines.push('');

      if (enableRead) {
        lines.push(`<span class="cmt">// GET all ${r}</span>`);
        lines.push(`<span class="var">router</span>.<span class="fn">get</span>(<span class="str">'/${r}'</span>, (<span class="arg">req</span>, <span class="arg">res</span>) => {`);
        lines.push(`  <span class="var">res</span>.<span class="fn">json</span>(<span class="var">${r}</span>);`);
        lines.push(`});`);
        lines.push('');
        lines.push(`<span class="cmt">// GET single ${r.slice(0, -1) || r} by ID</span>`);
        lines.push(`<span class="var">router</span>.<span class="fn">get</span>(<span class="str">'/${r}/:id'</span>, (<span class="arg">req</span>, <span class="arg">res</span>) => {`);
        lines.push(`  <span class="kw">const</span> <span class="var">item</span> = <span class="var">${r}</span>.<span class="fn">find</span>(<span class="arg">i</span> => <span class="var">i</span>.<span class="var">id</span> === <span class="arg">req</span>.<span class="var">params</span>.<span class="var">id</span>);`);
        lines.push(`  <span class="kw">if</span> (!<span class="var">item</span>) <span class="kw">return</span> <span class="var">res</span>.<span class="fn">status</span>(<span class="num">404</span>).<span class="fn">json</span>({ <span class="var">error</span>: <span class="str">'Not found'</span> });`);
        lines.push(`  <span class="var">res</span>.<span class="fn">json</span>(<span class="var">item</span>);`);
        lines.push(`});`);
        lines.push('');
      }

      if (enableCreate) {
        lines.push(`<span class="cmt">// POST create new ${r.slice(0, -1) || r}</span>`);
        lines.push(`<span class="var">router</span>.<span class="fn">post</span>(<span class="str">'/${r}'</span>, (<span class="arg">req</span>, <span class="arg">res</span>) => {`);
        lines.push(`  <span class="kw">const</span> <span class="var">newItem</span> = { <span class="var">id</span>: <span class="fn">generateId</span>(), ...<span class="arg">req</span>.<span class="var">body</span> };`);
        lines.push(`  <span class="var">${r}</span>.<span class="fn">push</span>(<span class="var">newItem</span>);`);
        lines.push(`  <span class="var">res</span>.<span class="fn">status</span>(<span class="num">201</span>).<span class="fn">json</span>(<span class="var">newItem</span>);`);
        lines.push(`});`);
        lines.push('');
      }

      if (enableUpdate) {
        lines.push(`<span class="cmt">// PUT update ${r.slice(0, -1) || r} by ID</span>`);
        lines.push(`<span class="var">router</span>.<span class="fn">put</span>(<span class="str">'/${r}/:id'</span>, (<span class="arg">req</span>, <span class="arg">res</span>) => {`);
        lines.push(`  <span class="kw">const</span> <span class="var">index</span> = <span class="var">${r}</span>.<span class="fn">findIndex</span>(<span class="arg">i</span> => <span class="var">i</span>.<span class="var">id</span> === <span class="arg">req</span>.<span class="var">params</span>.<span class="var">id</span>);`);
        lines.push(`  <span class="kw">if</span> (<span class="var">index</span> === <span class="num">-1</span>) <span class="kw">return</span> <span class="var">res</span>.<span class="fn">status</span>(<span class="num">404</span>).<span class="fn">json</span>({ <span class="var">error</span>: <span class="str">'Not found'</span> });`);
        lines.push(`  <span class="var">${r}</span>[<span class="var">index</span>] = { ...<span class="var">${r}</span>[<span class="var">index</span>], ...<span class="arg">req</span>.<span class="var">body</span> };`);
        lines.push(`  <span class="var">res</span>.<span class="fn">json</span>(<span class="var">${r}</span>[<span class="var">index</span>]);`);
        lines.push(`});`);
        lines.push('');
      }

      if (enableDelete) {
        lines.push(`<span class="cmt">// DELETE ${r.slice(0, -1) || r} by ID</span>`);
        lines.push(`<span class="var">router</span>.<span class="fn">delete</span>(<span class="str">'/${r}/:id'</span>, (<span class="arg">req</span>, <span class="arg">res</span>) => {`);
        lines.push(`  <span class="var">${r}</span> = <span class="var">${r}</span>.<span class="fn">filter</span>(<span class="arg">i</span> => <span class="var">i</span>.<span class="var">id</span> !== <span class="arg">req</span>.<span class="var">params</span>.<span class="var">id</span>);`);
        lines.push(`  <span class="var">res</span>.<span class="fn">json</span>({ <span class="var">message</span>: <span class="str">'Deleted'</span> });`);
        lines.push(`});`);
        lines.push('');
      }

      lines.push(`<span class="kw">module</span>.<span class="var">exports</span> = <span class="var">router</span>;`);
    } else {
      lines.push(`<span class="kw">const</span> <span class="var">fastify</span> = <span class="fn">require</span>(<span class="str">'fastify'</span>)();`);
      lines.push('');

      if (enableRead) {
        lines.push(`<span class="cmt">// GET all ${r}</span>`);
        lines.push(`<span class="var">fastify</span>.<span class="fn">get</span>(<span class="str">'/${r}'</span>, <span class="kw">async</span> (<span class="arg">request</span>, <span class="arg">reply</span>) => {`);
        lines.push(`  <span class="kw">return</span> <span class="var">${r}</span>;`);
        lines.push(`});`);
        lines.push('');
        lines.push(`<span class="cmt">// GET single ${r.slice(0, -1) || r} by ID</span>`);
        lines.push(`<span class="var">fastify</span>.<span class="fn">get</span>(<span class="str">'/${r}/:id'</span>, <span class="kw">async</span> (<span class="arg">request</span>, <span class="arg">reply</span>) => {`);
        lines.push(`  <span class="kw">const</span> <span class="var">item</span> = <span class="var">${r}</span>.<span class="fn">find</span>(<span class="arg">i</span> => <span class="var">i</span>.<span class="var">id</span> === <span class="arg">request</span>.<span class="var">params</span>.<span class="var">id</span>);`);
        lines.push(`  <span class="kw">if</span> (!<span class="var">item</span>) <span class="kw">return</span> <span class="arg">reply</span>.<span class="fn">code</span>(<span class="num">404</span>).<span class="fn">send</span>({ <span class="var">error</span>: <span class="str">'Not found'</span> });`);
        lines.push(`  <span class="kw">return</span> <span class="var">item</span>;`);
        lines.push(`});`);
        lines.push('');
      }

      if (enableCreate) {
        lines.push(`<span class="cmt">// POST create new ${r.slice(0, -1) || r}</span>`);
        lines.push(`<span class="var">fastify</span>.<span class="fn">post</span>(<span class="str">'/${r}'</span>, <span class="kw">async</span> (<span class="arg">request</span>, <span class="arg">reply</span>) => {`);
        lines.push(`  <span class="kw">const</span> <span class="var">newItem</span> = { <span class="var">id</span>: <span class="fn">generateId</span>(), ...<span class="arg">request</span>.<span class="var">body</span> };`);
        lines.push(`  <span class="var">${r}</span>.<span class="fn">push</span>(<span class="var">newItem</span>);`);
        lines.push(`  <span class="arg">reply</span>.<span class="fn">code</span>(<span class="num">201</span>);`);
        lines.push(`  <span class="kw">return</span> <span class="var">newItem</span>;`);
        lines.push(`});`);
        lines.push('');
      }

      if (enableUpdate) {
        lines.push(`<span class="cmt">// PUT update ${r.slice(0, -1) || r} by ID</span>`);
        lines.push(`<span class="var">fastify</span>.<span class="fn">put</span>(<span class="str">'/${r}/:id'</span>, <span class="kw">async</span> (<span class="arg">request</span>, <span class="arg">reply</span>) => {`);
        lines.push(`  <span class="kw">const</span> <span class="var">index</span> = <span class="var">${r}</span>.<span class="fn">findIndex</span>(<span class="arg">i</span> => <span class="var">i</span>.<span class="var">id</span> === <span class="arg">request</span>.<span class="var">params</span>.<span class="var">id</span>);`);
        lines.push(`  <span class="kw">if</span> (<span class="var">index</span> === <span class="num">-1</span>) <span class="kw">return</span> <span class="arg">reply</span>.<span class="fn">code</span>(<span class="num">404</span>).<span class="fn">send</span>({ <span class="var">error</span>: <span class="str">'Not found'</span> });`);
        lines.push(`  <span class="var">${r}</span>[<span class="var">index</span>] = { ...<span class="var">${r}</span>[<span class="var">index</span>], ...<span class="arg">request</span>.<span class="var">body</span> };`);
        lines.push(`  <span class="kw">return</span> <span class="var">${r}</span>[<span class="var">index</span>];`);
        lines.push(`});`);
        lines.push('');
      }

      if (enableDelete) {
        lines.push(`<span class="cmt">// DELETE ${r.slice(0, -1) || r} by ID</span>`);
        lines.push(`<span class="var">fastify</span>.<span class="fn">delete</span>(<span class="str">'/${r}/:id'</span>, <span class="kw">async</span> (<span class="arg">request</span>, <span class="arg">reply</span>) => {`);
        lines.push(`  <span class="var">${r}</span> = <span class="var">${r}</span>.<span class="fn">filter</span>(<span class="arg">i</span> => <span class="var">i</span>.<span class="var">id</span> !== <span class="arg">request</span>.<span class="var">params</span>.<span class="var">id</span>);`);
        lines.push(`  <span class="kw">return</span> { <span class="var">message</span>: <span class="str">'Deleted'</span> };`);
        lines.push(`});`);
        lines.push('');
      }

      lines.push(`<span class="var">fastify</span>.<span class="fn">listen</span>({ <span class="arg">port</span>: <span class="num">3000</span> });`);
    }

    return lines.join('\n');
  }
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: API Tester</h2>
    <p class="text-slate-600">
      Click each endpoint below to send a mock request and see what the API returns. Notice how each HTTP method serves a different purpose.
    </p>
  </div>

  <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-6 space-y-6">
    <!-- Endpoint buttons -->
    <div class="grid gap-3 sm:grid-cols-2">
      {#each endpoints as ep}
        <button
          onclick={() => selectEndpoint(ep)}
          class="flex items-center gap-3 rounded-lg border-2 p-3 text-left transition-all hover:shadow-md active:scale-[0.98]
            {selectedEndpoint === ep ? 'border-indigo-500 bg-white shadow-md' : 'border-indigo-200 bg-white'}"
        >
          <span class="shrink-0 rounded px-2 py-0.5 text-xs font-bold {methodColor(ep.method)}">{ep.method}</span>
          <div>
            <p class="font-mono text-sm text-slate-800">{ep.url}</p>
            <p class="text-xs text-slate-500">{ep.description}</p>
          </div>
        </button>
      {/each}
    </div>

    <!-- Request / Response display -->
    {#if selectedEndpoint}
      <div class="space-y-4">
        <!-- Request -->
        <div>
          <h4 class="mb-2 text-sm font-bold text-slate-700">Request</h4>
          <div class="rounded-xl bg-slate-800 p-4 font-mono text-sm leading-relaxed">
            <div class="flex items-center gap-2">
              <span class="rounded px-2 py-0.5 text-xs font-bold {methodColor(selectedEndpoint.method)}">{selectedEndpoint.method}</span>
              <span class="text-indigo-300">{selectedEndpoint.url}</span>
            </div>
            <div class="mt-1 text-slate-400 text-xs">Content-Type: application/json</div>
            {#if selectedEndpoint.body}
              <div class="mt-3 border-t border-slate-700 pt-3">
                <div class="text-xs text-slate-500 mb-1">Body:</div>
                <pre class="text-amber-300 whitespace-pre-wrap">{selectedEndpoint.body}</pre>
              </div>
            {/if}
          </div>
        </div>

        <!-- Response -->
        <div class="transition-all duration-500 {showResponse ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
          <h4 class="mb-2 text-sm font-bold text-slate-700">Response</h4>
          <div class="rounded-xl bg-slate-800 p-4 font-mono text-sm leading-relaxed">
            <div class="flex items-center gap-2 mb-3">
              <span class="rounded px-2 py-0.5 text-xs font-bold text-white {statusColor(selectedEndpoint.status)}">{selectedEndpoint.status}</span>
              <span class="text-slate-400">{selectedEndpoint.statusText}</span>
            </div>
            <pre class="text-green-300 whitespace-pre-wrap">{selectedEndpoint.response}</pre>
          </div>
        </div>
      </div>
    {:else}
      <p class="text-center text-sm text-slate-500 py-4">Click an endpoint above to see the request and response.</p>
    {/if}
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
    >
      I've explored the API tester
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Endpoint Designer</h2>
      <p class="text-slate-600">
        Define a resource name, pick which CRUD operations to include, and choose a framework. Watch the route handlers generate in real time.
      </p>
    </div>

    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-6 space-y-6">
      <!-- Controls -->
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">Resource Name (plural)</label>
            <input
              type="text"
              bind:value={resourceName}
              placeholder="e.g. posts, products, comments"
              class="w-full rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">Framework</label>
            <div class="flex gap-2">
              <button
                onclick={() => framework = 'express'}
                class="rounded-lg px-4 py-1.5 text-sm font-semibold border-2 transition-all {framework === 'express' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-indigo-700 border-indigo-300'}"
              >
                Express.js
              </button>
              <button
                onclick={() => framework = 'fastify'}
                class="rounded-lg px-4 py-1.5 text-sm font-semibold border-2 transition-all {framework === 'fastify' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-indigo-700 border-indigo-300'}"
              >
                Fastify
              </button>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2">CRUD Operations</label>
          <div class="space-y-2">
            <label class="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" bind:checked={enableCreate} class="rounded" />
              <span class="rounded bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">POST</span> Create
            </label>
            <label class="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" bind:checked={enableRead} class="rounded" />
              <span class="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">GET</span> Read
            </label>
            <label class="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" bind:checked={enableUpdate} class="rounded" />
              <span class="rounded bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">PUT</span> Update
            </label>
            <label class="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" bind:checked={enableDelete} class="rounded" />
              <span class="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">DELETE</span> Delete
            </label>
          </div>
        </div>
      </div>

      <!-- Generated code -->
      <div>
        <h4 class="mb-2 text-sm font-bold text-slate-700">Generated Route Handlers ({framework === 'express' ? 'Express.js' : 'Fastify'})</h4>
        <pre class="code-block"><code>{@html generatedCode}</code></pre>
      </div>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
      >
        I've designed my endpoints
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a;
    color: #e2e8f0; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
