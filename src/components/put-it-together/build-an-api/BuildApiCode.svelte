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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Code: Building a REST API</h2>
    <p class="text-slate-600">Real Express.js code for building CRUD routes, understanding request/response anatomy, and calling APIs from the frontend.</p>
  </div>

  <!-- Express CRUD -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Express.js CRUD Routes</h3>
    <p class="text-sm text-slate-600">Express is the most popular Node.js framework for building APIs. Here is a complete CRUD setup for a "todos" resource:</p>
    <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">express</span> = <span class="fn">require</span>(<span class="str">'express'</span>);
<span class="kw">const</span> <span class="var">app</span> = <span class="fn">express</span>();

<span class="cmt">// Middleware: parse JSON request bodies</span>
<span class="var">app</span>.<span class="fn">use</span>(<span class="var">express</span>.<span class="fn">json</span>());

<span class="cmt">// In-memory data store (use a real database in production)</span>
<span class="kw">let</span> <span class="var">todos</span> = [
  { <span class="var">id</span>: <span class="num">1</span>, <span class="var">title</span>: <span class="str">'Learn APIs'</span>, <span class="var">done</span>: <span class="num">false</span> },
  { <span class="var">id</span>: <span class="num">2</span>, <span class="var">title</span>: <span class="str">'Build a project'</span>, <span class="var">done</span>: <span class="num">false</span> },
];

<span class="cmt">// READ all todos</span>
<span class="var">app</span>.<span class="fn">get</span>(<span class="str">'/api/todos'</span>, (<span class="arg">req</span>, <span class="arg">res</span>) => {
  <span class="var">res</span>.<span class="fn">json</span>(<span class="var">todos</span>);
});

<span class="cmt">// READ one todo by ID</span>
<span class="var">app</span>.<span class="fn">get</span>(<span class="str">'/api/todos/:id'</span>, (<span class="arg">req</span>, <span class="arg">res</span>) => {
  <span class="kw">const</span> <span class="var">todo</span> = <span class="var">todos</span>.<span class="fn">find</span>(<span class="arg">t</span> => <span class="var">t</span>.<span class="var">id</span> === <span class="fn">Number</span>(<span class="arg">req</span>.<span class="var">params</span>.<span class="var">id</span>));
  <span class="kw">if</span> (!<span class="var">todo</span>) <span class="kw">return</span> <span class="var">res</span>.<span class="fn">status</span>(<span class="num">404</span>).<span class="fn">json</span>({ <span class="var">error</span>: <span class="str">'Not found'</span> });
  <span class="var">res</span>.<span class="fn">json</span>(<span class="var">todo</span>);
});

<span class="cmt">// CREATE a new todo</span>
<span class="var">app</span>.<span class="fn">post</span>(<span class="str">'/api/todos'</span>, (<span class="arg">req</span>, <span class="arg">res</span>) => {
  <span class="kw">const</span> <span class="var">newTodo</span> = {
    <span class="var">id</span>: <span class="var">todos</span>.<span class="var">length</span> + <span class="num">1</span>,
    <span class="var">title</span>: <span class="arg">req</span>.<span class="var">body</span>.<span class="var">title</span>,
    <span class="var">done</span>: <span class="num">false</span>,
  };
  <span class="var">todos</span>.<span class="fn">push</span>(<span class="var">newTodo</span>);
  <span class="var">res</span>.<span class="fn">status</span>(<span class="num">201</span>).<span class="fn">json</span>(<span class="var">newTodo</span>);
});

<span class="cmt">// UPDATE a todo</span>
<span class="var">app</span>.<span class="fn">put</span>(<span class="str">'/api/todos/:id'</span>, (<span class="arg">req</span>, <span class="arg">res</span>) => {
  <span class="kw">const</span> <span class="var">todo</span> = <span class="var">todos</span>.<span class="fn">find</span>(<span class="arg">t</span> => <span class="var">t</span>.<span class="var">id</span> === <span class="fn">Number</span>(<span class="arg">req</span>.<span class="var">params</span>.<span class="var">id</span>));
  <span class="kw">if</span> (!<span class="var">todo</span>) <span class="kw">return</span> <span class="var">res</span>.<span class="fn">status</span>(<span class="num">404</span>).<span class="fn">json</span>({ <span class="var">error</span>: <span class="str">'Not found'</span> });
  <span class="var">todo</span>.<span class="var">title</span> = <span class="arg">req</span>.<span class="var">body</span>.<span class="var">title</span> ?? <span class="var">todo</span>.<span class="var">title</span>;
  <span class="var">todo</span>.<span class="var">done</span> = <span class="arg">req</span>.<span class="var">body</span>.<span class="var">done</span> ?? <span class="var">todo</span>.<span class="var">done</span>;
  <span class="var">res</span>.<span class="fn">json</span>(<span class="var">todo</span>);
});

<span class="cmt">// DELETE a todo</span>
<span class="var">app</span>.<span class="fn">delete</span>(<span class="str">'/api/todos/:id'</span>, (<span class="arg">req</span>, <span class="arg">res</span>) => {
  <span class="var">todos</span> = <span class="var">todos</span>.<span class="fn">filter</span>(<span class="arg">t</span> => <span class="var">t</span>.<span class="var">id</span> !== <span class="fn">Number</span>(<span class="arg">req</span>.<span class="var">params</span>.<span class="var">id</span>));
  <span class="var">res</span>.<span class="fn">json</span>({ <span class="var">message</span>: <span class="str">'Deleted'</span> });
});

<span class="var">app</span>.<span class="fn">listen</span>(<span class="num">3000</span>, () => <span class="var">console</span>.<span class="fn">log</span>(<span class="str">'API running on port 3000'</span>));`}</code></pre>
  </div>

  <!-- Request/Response Anatomy -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Request &amp; Response Anatomy</h3>
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
        <h4 class="mb-2 font-bold text-slate-800">Request</h4>
        <ul class="space-y-1 text-sm text-slate-600">
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
            <span><strong>Method:</strong> GET, POST, PUT, DELETE</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
            <span><strong>URL:</strong> The resource path (e.g., /api/todos/1)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
            <span><strong>Headers:</strong> Metadata (Content-Type, Authorization)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
            <span><strong>Body:</strong> Data payload (JSON for POST/PUT)</span>
          </li>
        </ul>
      </div>
      <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
        <h4 class="mb-2 font-bold text-slate-800">Response</h4>
        <ul class="space-y-1 text-sm text-slate-600">
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
            <span><strong>Status Code:</strong> 200, 201, 404, 500, etc.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
            <span><strong>Headers:</strong> Content-Type, cache info, CORS</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
            <span><strong>Body:</strong> The JSON data you asked for</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Status Codes Cheat Sheet -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Status Codes Cheat Sheet</h3>
    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
      <div class="grid gap-2 sm:grid-cols-2">
        <div class="flex items-center gap-2 text-sm">
          <span class="rounded bg-green-600 px-2 py-0.5 text-xs font-bold text-white">200</span>
          <span class="text-slate-600">OK &mdash; request succeeded</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <span class="rounded bg-green-600 px-2 py-0.5 text-xs font-bold text-white">201</span>
          <span class="text-slate-600">Created &mdash; new resource made</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <span class="rounded bg-amber-600 px-2 py-0.5 text-xs font-bold text-white">400</span>
          <span class="text-slate-600">Bad Request &mdash; invalid input</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <span class="rounded bg-amber-600 px-2 py-0.5 text-xs font-bold text-white">401</span>
          <span class="text-slate-600">Unauthorized &mdash; not logged in</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <span class="rounded bg-amber-600 px-2 py-0.5 text-xs font-bold text-white">403</span>
          <span class="text-slate-600">Forbidden &mdash; no permission</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <span class="rounded bg-amber-600 px-2 py-0.5 text-xs font-bold text-white">404</span>
          <span class="text-slate-600">Not Found &mdash; does not exist</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <span class="rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">500</span>
          <span class="text-slate-600">Server Error &mdash; something crashed</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <span class="rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">503</span>
          <span class="text-slate-600">Unavailable &mdash; server overloaded</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Fetch from Frontend -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Calling the API from Frontend</h3>
    <p class="text-sm text-slate-600">Use the built-in <code class="rounded bg-slate-100 px-1 text-indigo-700">fetch()</code> function to call your API from any frontend JavaScript code:</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// GET all todos</span>
<span class="kw">const</span> <span class="var">response</span> = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">'/api/todos'</span>);
<span class="kw">const</span> <span class="var">todos</span> = <span class="kw">await</span> <span class="var">response</span>.<span class="fn">json</span>();

<span class="cmt">// POST a new todo</span>
<span class="kw">const</span> <span class="var">response</span> = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">'/api/todos'</span>, {
  <span class="var">method</span>: <span class="str">'POST'</span>,
  <span class="var">headers</span>: { <span class="str">'Content-Type'</span>: <span class="str">'application/json'</span> },
  <span class="var">body</span>: <span class="var">JSON</span>.<span class="fn">stringify</span>({ <span class="var">title</span>: <span class="str">'Ship my app'</span> }),
});
<span class="kw">const</span> <span class="var">newTodo</span> = <span class="kw">await</span> <span class="var">response</span>.<span class="fn">json</span>();

<span class="cmt">// DELETE a todo</span>
<span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">'/api/todos/1'</span>, { <span class="var">method</span>: <span class="str">'DELETE'</span> });`}</code></pre>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
    >
      I know how to build an API
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Code: Advanced API Patterns</h2>
      <p class="text-slate-600">Middleware, error handling, input validation, pagination, OpenAPI specs, and CORS configuration.</p>
    </div>

    <!-- Middleware Pattern -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Middleware Pattern</h3>
      <p class="text-sm text-slate-600">Middleware functions run before your route handler. They can log, authenticate, validate, or transform the request.</p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Logger middleware</span>
<span class="kw">function</span> <span class="fn">logger</span>(<span class="arg">req</span>, <span class="arg">res</span>, <span class="arg">next</span>) {
  <span class="var">console</span>.<span class="fn">log</span>(<span class="str">\`\${req.method} \${req.url}\`</span>);
  <span class="fn">next</span>();  <span class="cmt">// pass to the next middleware or route</span>
}

<span class="cmt">// Auth middleware</span>
<span class="kw">function</span> <span class="fn">requireAuth</span>(<span class="arg">req</span>, <span class="arg">res</span>, <span class="arg">next</span>) {
  <span class="kw">const</span> <span class="var">token</span> = <span class="arg">req</span>.<span class="var">headers</span>.<span class="var">authorization</span>?.<span class="fn">split</span>(<span class="str">' '</span>)[<span class="num">1</span>];
  <span class="kw">if</span> (!<span class="var">token</span>) <span class="kw">return</span> <span class="var">res</span>.<span class="fn">status</span>(<span class="num">401</span>).<span class="fn">json</span>({ <span class="var">error</span>: <span class="str">'No token provided'</span> });
  <span class="kw">try</span> {
    <span class="arg">req</span>.<span class="var">user</span> = <span class="fn">verifyToken</span>(<span class="var">token</span>);
    <span class="fn">next</span>();
  } <span class="kw">catch</span> {
    <span class="var">res</span>.<span class="fn">status</span>(<span class="num">401</span>).<span class="fn">json</span>({ <span class="var">error</span>: <span class="str">'Invalid token'</span> });
  }
}

<span class="cmt">// Apply middleware</span>
<span class="var">app</span>.<span class="fn">use</span>(<span class="fn">logger</span>);                          <span class="cmt">// all routes</span>
<span class="var">app</span>.<span class="fn">use</span>(<span class="str">'/api/admin'</span>, <span class="fn">requireAuth</span>);       <span class="cmt">// only /api/admin routes</span>`}</code></pre>
    </div>

    <!-- Error Handling Middleware -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Error Handling Middleware</h3>
      <p class="text-sm text-slate-600">A centralized error handler catches all errors and returns consistent responses:</p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Custom error class</span>
<span class="kw">class</span> <span class="fn">AppError</span> <span class="kw">extends</span> <span class="fn">Error</span> {
  <span class="fn">constructor</span>(<span class="arg">statusCode</span>, <span class="arg">message</span>) {
    <span class="kw">super</span>(<span class="arg">message</span>);
    <span class="kw">this</span>.<span class="var">statusCode</span> = <span class="arg">statusCode</span>;
  }
}

<span class="cmt">// In your routes, throw errors</span>
<span class="var">app</span>.<span class="fn">get</span>(<span class="str">'/api/todos/:id'</span>, (<span class="arg">req</span>, <span class="arg">res</span>, <span class="arg">next</span>) => {
  <span class="kw">const</span> <span class="var">todo</span> = <span class="var">todos</span>.<span class="fn">find</span>(<span class="arg">t</span> => <span class="var">t</span>.<span class="var">id</span> === <span class="fn">Number</span>(<span class="arg">req</span>.<span class="var">params</span>.<span class="var">id</span>));
  <span class="kw">if</span> (!<span class="var">todo</span>) <span class="kw">throw</span> <span class="kw">new</span> <span class="fn">AppError</span>(<span class="num">404</span>, <span class="str">'Todo not found'</span>);
  <span class="var">res</span>.<span class="fn">json</span>(<span class="var">todo</span>);
});

<span class="cmt">// Error handler (must have 4 parameters)</span>
<span class="var">app</span>.<span class="fn">use</span>((<span class="arg">err</span>, <span class="arg">req</span>, <span class="arg">res</span>, <span class="arg">next</span>) => {
  <span class="kw">const</span> <span class="var">status</span> = <span class="arg">err</span>.<span class="var">statusCode</span> || <span class="num">500</span>;
  <span class="var">res</span>.<span class="fn">status</span>(<span class="var">status</span>).<span class="fn">json</span>({
    <span class="var">error</span>: { <span class="var">status</span>, <span class="var">message</span>: <span class="arg">err</span>.<span class="var">message</span> }
  });
});`}</code></pre>
    </div>

    <!-- Input Validation with Zod -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Input Validation (Zod)</h3>
      <p class="text-sm text-slate-600">Never trust user input. Validate every request body with a schema library like Zod:</p>
      <pre class="code-block"><code>{@html `<span class="kw">const</span> { <span class="var">z</span> } = <span class="fn">require</span>(<span class="str">'zod'</span>);

<span class="kw">const</span> <span class="var">createTodoSchema</span> = <span class="var">z</span>.<span class="fn">object</span>({
  <span class="var">title</span>: <span class="var">z</span>.<span class="fn">string</span>().<span class="fn">min</span>(<span class="num">1</span>).<span class="fn">max</span>(<span class="num">200</span>),
  <span class="var">done</span>:  <span class="var">z</span>.<span class="fn">boolean</span>().<span class="fn">optional</span>().<span class="fn">default</span>(<span class="num">false</span>),
});

<span class="var">app</span>.<span class="fn">post</span>(<span class="str">'/api/todos'</span>, (<span class="arg">req</span>, <span class="arg">res</span>) => {
  <span class="kw">const</span> <span class="var">result</span> = <span class="var">createTodoSchema</span>.<span class="fn">safeParse</span>(<span class="arg">req</span>.<span class="var">body</span>);
  <span class="kw">if</span> (!<span class="var">result</span>.<span class="var">success</span>) {
    <span class="kw">return</span> <span class="var">res</span>.<span class="fn">status</span>(<span class="num">422</span>).<span class="fn">json</span>({
      <span class="var">error</span>: <span class="str">'Validation failed'</span>,
      <span class="var">issues</span>: <span class="var">result</span>.<span class="var">error</span>.<span class="var">issues</span>,
    });
  }
  <span class="cmt">// result.data is typed and validated</span>
  <span class="kw">const</span> <span class="var">newTodo</span> = { <span class="var">id</span>: <span class="fn">nextId</span>++, ...<span class="var">result</span>.<span class="var">data</span> };
  <span class="var">todos</span>.<span class="fn">push</span>(<span class="var">newTodo</span>);
  <span class="var">res</span>.<span class="fn">status</span>(<span class="num">201</span>).<span class="fn">json</span>(<span class="var">newTodo</span>);
});`}</code></pre>
    </div>

    <!-- Pagination Helper -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Pagination Helper</h3>
      <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">paginate</span>(<span class="arg">items</span>, <span class="arg">page</span> = <span class="num">1</span>, <span class="arg">limit</span> = <span class="num">20</span>) {
  <span class="kw">const</span> <span class="var">start</span> = (<span class="arg">page</span> - <span class="num">1</span>) * <span class="arg">limit</span>;
  <span class="kw">const</span> <span class="var">end</span> = <span class="var">start</span> + <span class="arg">limit</span>;
  <span class="kw">return</span> {
    <span class="var">data</span>: <span class="arg">items</span>.<span class="fn">slice</span>(<span class="var">start</span>, <span class="var">end</span>),
    <span class="var">meta</span>: {
      <span class="var">total</span>: <span class="arg">items</span>.<span class="var">length</span>,
      <span class="var">page</span>: <span class="arg">page</span>,
      <span class="var">limit</span>: <span class="arg">limit</span>,
      <span class="var">totalPages</span>: <span class="var">Math</span>.<span class="fn">ceil</span>(<span class="arg">items</span>.<span class="var">length</span> / <span class="arg">limit</span>),
    },
  };
}

<span class="var">app</span>.<span class="fn">get</span>(<span class="str">'/api/todos'</span>, (<span class="arg">req</span>, <span class="arg">res</span>) => {
  <span class="kw">const</span> <span class="var">page</span> = <span class="fn">Number</span>(<span class="arg">req</span>.<span class="var">query</span>.<span class="var">page</span>) || <span class="num">1</span>;
  <span class="kw">const</span> <span class="var">limit</span> = <span class="fn">Number</span>(<span class="arg">req</span>.<span class="var">query</span>.<span class="var">limit</span>) || <span class="num">20</span>;
  <span class="var">res</span>.<span class="fn">json</span>(<span class="fn">paginate</span>(<span class="var">todos</span>, <span class="var">page</span>, <span class="var">limit</span>));
});`}</code></pre>
    </div>

    <!-- OpenAPI Spec -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">OpenAPI Spec Example</h3>
      <p class="text-sm text-slate-600">An OpenAPI spec describes your API in a machine-readable format for docs and client generation:</p>
      <pre class="code-block"><code>{@html `<span class="cmt"># openapi.yaml</span>
<span class="var">openapi</span>: <span class="str">'3.0.0'</span>
<span class="var">info</span>:
  <span class="var">title</span>: <span class="str">Todo API</span>
  <span class="var">version</span>: <span class="str">'1.0.0'</span>
<span class="var">paths</span>:
  <span class="str">/api/todos</span>:
    <span class="fn">get</span>:
      <span class="var">summary</span>: <span class="str">List all todos</span>
      <span class="var">parameters</span>:
        - <span class="var">name</span>: <span class="str">page</span>
          <span class="var">in</span>: <span class="str">query</span>
          <span class="var">schema</span>: { <span class="var">type</span>: <span class="str">integer</span> }
      <span class="var">responses</span>:
        <span class="str">'200'</span>:
          <span class="var">description</span>: <span class="str">A list of todos</span>
    <span class="fn">post</span>:
      <span class="var">summary</span>: <span class="str">Create a todo</span>
      <span class="var">requestBody</span>:
        <span class="var">required</span>: <span class="num">true</span>
        <span class="var">content</span>:
          <span class="str">application/json</span>:
            <span class="var">schema</span>:
              <span class="var">type</span>: <span class="str">object</span>
              <span class="var">properties</span>:
                <span class="var">title</span>: { <span class="var">type</span>: <span class="str">string</span> }`}</code></pre>
    </div>

    <!-- CORS Configuration -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">CORS Configuration</h3>
      <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">cors</span> = <span class="fn">require</span>(<span class="str">'cors'</span>);

<span class="cmt">// Allow all origins (development only!)</span>
<span class="var">app</span>.<span class="fn">use</span>(<span class="fn">cors</span>());

<span class="cmt">// Production: allow specific origins</span>
<span class="var">app</span>.<span class="fn">use</span>(<span class="fn">cors</span>({
  <span class="var">origin</span>: [<span class="str">'https://myapp.com'</span>, <span class="str">'https://staging.myapp.com'</span>],
  <span class="var">methods</span>: [<span class="str">'GET'</span>, <span class="str">'POST'</span>, <span class="str">'PUT'</span>, <span class="str">'DELETE'</span>],
  <span class="var">credentials</span>: <span class="num">true</span>,  <span class="cmt">// allow cookies</span>
}));`}</code></pre>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
      >
        I know the advanced API patterns
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
