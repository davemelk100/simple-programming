<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  interface Props {
    oncomplete?: () => void;
  }
  let { oncomplete }: Props = $props();
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">DRY in Code</h2>
    <p class="text-slate-600">See real before-and-after examples of applying the DRY principle to eliminate duplication.</p>
  </div>

  <!-- Example 1: Duplicated validation -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">1. Duplicated Validation</h3>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <p class="mb-2 text-sm font-semibold uppercase tracking-wider text-red-500">Before (WET)</p>
        <pre class="code-block"><code>{@html `<span class="cmt">// In the signup form</span>
<span class="kw">if</span> (<span class="var">email</span> <span class="op">===</span> <span class="str">""</span>) {
  <span class="fn">showError</span>(<span class="str">"Email required"</span>);
} <span class="kw">else if</span> (<span class="op">!</span><span class="var">email</span>.<span class="fn">includes</span>(<span class="str">"@"</span>)) {
  <span class="fn">showError</span>(<span class="str">"Invalid email"</span>);
}

<span class="cmt">// In the settings page</span>
<span class="kw">if</span> (<span class="var">email</span> <span class="op">===</span> <span class="str">""</span>) {
  <span class="fn">showError</span>(<span class="str">"Email required"</span>);
} <span class="kw">else if</span> (<span class="op">!</span><span class="var">email</span>.<span class="fn">includes</span>(<span class="str">"@"</span>)) {
  <span class="fn">showError</span>(<span class="str">"Invalid email"</span>);
}

<span class="cmt">// In the invite form</span>
<span class="kw">if</span> (<span class="var">email</span> <span class="op">===</span> <span class="str">""</span>) {
  <span class="fn">showError</span>(<span class="str">"Email required"</span>);
} <span class="kw">else if</span> (<span class="op">!</span><span class="var">email</span>.<span class="fn">includes</span>(<span class="str">"@"</span>)) {
  <span class="fn">showError</span>(<span class="str">"Invalid email"</span>);
}`}</code></pre>
      </div>
      <div>
        <p class="mb-2 text-sm font-semibold uppercase tracking-wider text-green-500">After (DRY)</p>
        <pre class="code-block"><code>{@html `<span class="cmt">// validation.js — single source of truth</span>
<span class="kw">function</span> <span class="fn">validateEmail</span>(<span class="arg">email</span>) {
  <span class="kw">if</span> (<span class="arg">email</span> <span class="op">===</span> <span class="str">""</span>) {
    <span class="kw">return</span> <span class="str">"Email required"</span>;
  }
  <span class="kw">if</span> (<span class="op">!</span><span class="arg">email</span>.<span class="fn">includes</span>(<span class="str">"@"</span>)) {
    <span class="kw">return</span> <span class="str">"Invalid email"</span>;
  }
  <span class="kw">return</span> <span class="var">null</span>; <span class="cmt">// valid</span>
}

<span class="cmt">// Used everywhere:</span>
<span class="kw">const</span> <span class="var">error</span> <span class="op">=</span> <span class="fn">validateEmail</span>(<span class="var">email</span>);
<span class="kw">if</span> (<span class="var">error</span>) <span class="fn">showError</span>(<span class="var">error</span>);`}</code></pre>
        <div class="mt-3 rounded-lg border border-green-200 bg-green-50 p-3">
          <p class="text-sm text-green-700">Now if you need to add a check for valid domain names, you change it in <strong>one place</strong> and every form benefits.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Example 2: Duplicated API calls -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">2. Duplicated API Calls</h3>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <p class="mb-2 text-sm font-semibold uppercase tracking-wider text-red-500">Before (WET)</p>
        <pre class="code-block"><code>{@html `<span class="cmt">// In the dashboard</span>
<span class="kw">const</span> <span class="var">res1</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">"/api/users"</span>, {
  <span class="var">headers</span>: {
    <span class="str">"Authorization"</span>: <span class="str">"Bearer "</span> <span class="op">+</span> <span class="var">token</span>,
    <span class="str">"Content-Type"</span>: <span class="str">"application/json"</span>,
  },
});
<span class="kw">const</span> <span class="var">users</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">res1</span>.<span class="fn">json</span>();

<span class="cmt">// In the admin panel</span>
<span class="kw">const</span> <span class="var">res2</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">"/api/users"</span>, {
  <span class="var">headers</span>: {
    <span class="str">"Authorization"</span>: <span class="str">"Bearer "</span> <span class="op">+</span> <span class="var">token</span>,
    <span class="str">"Content-Type"</span>: <span class="str">"application/json"</span>,
  },
});
<span class="kw">const</span> <span class="var">data</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">res2</span>.<span class="fn">json</span>();`}</code></pre>
      </div>
      <div>
        <p class="mb-2 text-sm font-semibold uppercase tracking-wider text-green-500">After (DRY)</p>
        <pre class="code-block"><code>{@html `<span class="cmt">// api.js — shared helper</span>
<span class="kw">async function</span> <span class="fn">apiFetch</span>(<span class="arg">path</span>) {
  <span class="kw">const</span> <span class="var">res</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">fetch</span>(<span class="arg">path</span>, {
    <span class="var">headers</span>: {
      <span class="str">"Authorization"</span>: <span class="str">"Bearer "</span> <span class="op">+</span> <span class="fn">getToken</span>(),
      <span class="str">"Content-Type"</span>: <span class="str">"application/json"</span>,
    },
  });
  <span class="kw">return</span> <span class="var">res</span>.<span class="fn">json</span>();
}

<span class="cmt">// Used everywhere:</span>
<span class="kw">const</span> <span class="var">users</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">apiFetch</span>(<span class="str">"/api/users"</span>);
<span class="kw">const</span> <span class="var">posts</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">apiFetch</span>(<span class="str">"/api/posts"</span>);`}</code></pre>
        <div class="mt-3 rounded-lg border border-green-200 bg-green-50 p-3">
          <p class="text-sm text-green-700">Headers, auth logic, and JSON parsing are defined once. If you switch to a different auth scheme, you update <strong>one function</strong>.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Example 3: Magic numbers -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">3. Magic Numbers</h3>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <p class="mb-2 text-sm font-semibold uppercase tracking-wider text-red-500">Before (WET)</p>
        <pre class="code-block"><code>{@html `<span class="kw">if</span> (<span class="var">password</span>.<span class="var">length</span> <span class="op">&lt;</span> <span class="num">8</span>) { ... }

<span class="cmt">// 200 lines later...</span>
<span class="var">hint</span> <span class="op">=</span> <span class="str">"Must be at least 8 chars"</span>;

<span class="cmt">// In another file...</span>
<span class="kw">if</span> (<span class="var">input</span>.<span class="var">length</span> <span class="op">&lt;</span> <span class="num">8</span>) {
  <span class="fn">reject</span>(<span class="str">"Too short"</span>);
}`}</code></pre>
      </div>
      <div>
        <p class="mb-2 text-sm font-semibold uppercase tracking-wider text-green-500">After (DRY)</p>
        <pre class="code-block"><code>{@html `<span class="cmt">// constants.js</span>
<span class="kw">const</span> <span class="var">MIN_PASSWORD_LENGTH</span> <span class="op">=</span> <span class="num">8</span>;

<span class="cmt">// Everywhere:</span>
<span class="kw">if</span> (<span class="var">pw</span>.<span class="var">length</span> <span class="op">&lt;</span> <span class="var">MIN_PASSWORD_LENGTH</span>) ...

<span class="var">hint</span> <span class="op">=</span> <span class="str">\`Must be at least \${</span><span class="var">MIN_PASSWORD_LENGTH</span><span class="str">} chars\`</span>;`}</code></pre>
        <div class="mt-3 rounded-lg border border-green-200 bg-green-50 p-3">
          <p class="text-sm text-green-700">Change the minimum once, the check and the message both update. No more mismatched magic numbers.</p>
        </div>
      </div>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
    >
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">DRY in Code (Advanced)</h2>
    <p class="text-slate-600">DRY applies beyond functions -- to configuration, UI components, databases, and system architecture. Here is where it matters most, and where to intentionally break it.</p>
  </div>

  <!-- Configuration as DRY -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">1. Configuration as DRY</h3>
    <p class="text-slate-600">Environment variables, constants files, and feature flags prevent hardcoded values from scattering across a codebase.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// .env — environment-specific values</span>
<span class="var">DATABASE_URL</span><span class="op">=</span><span class="str">postgres://localhost:5432/myapp</span>
<span class="var">REDIS_URL</span><span class="op">=</span><span class="str">redis://localhost:6379</span>
<span class="var">MAX_UPLOAD_MB</span><span class="op">=</span><span class="num">10</span>

<span class="cmt">// config.ts — typed, validated config</span>
<span class="kw">export const</span> <span class="var">config</span> <span class="op">=</span> {
  <span class="var">db</span>: <span class="var">process</span>.<span class="var">env</span>.<span class="var">DATABASE_URL</span> <span class="op">??</span> <span class="fn">throwMissing</span>(<span class="str">"DATABASE_URL"</span>),
  <span class="var">redis</span>: <span class="var">process</span>.<span class="var">env</span>.<span class="var">REDIS_URL</span> <span class="op">??</span> <span class="fn">throwMissing</span>(<span class="str">"REDIS_URL"</span>),
  <span class="var">maxUploadBytes</span>: (<span class="var">Number</span>(<span class="var">process</span>.<span class="var">env</span>.<span class="var">MAX_UPLOAD_MB</span>) <span class="op">||</span> <span class="num">10</span>) <span class="op">*</span> <span class="num">1024</span> <span class="op">*</span> <span class="num">1024</span>,
} <span class="kw">as const</span>;

<span class="cmt">// Every module imports from config — never reads env directly</span>
<span class="kw">import</span> { <span class="var">config</span> } <span class="kw">from</span> <span class="str">"./config"</span>;`}</code></pre>
  </div>

  <!-- Component / Template Reuse -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">2. Template and Component Reuse</h3>
    <p class="text-slate-600">UI frameworks apply DRY through components. Instead of duplicating the same card markup across pages, extract a reusable component.</p>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <p class="mb-2 text-sm font-semibold uppercase tracking-wider text-red-500">Before (WET)</p>
        <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- Page A --&gt;</span>
<span class="op">&lt;</span><span class="kw">div</span> <span class="var">class</span><span class="op">=</span><span class="str">"card"</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="kw">img</span> <span class="var">src</span><span class="op">=</span><span class="str">{photo}</span> <span class="op">/&gt;</span>
  <span class="op">&lt;</span><span class="kw">h3</span><span class="op">&gt;</span>{title}<span class="op">&lt;/</span><span class="kw">h3</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="kw">p</span><span class="op">&gt;</span>{description}<span class="op">&lt;/</span><span class="kw">p</span><span class="op">&gt;</span>
<span class="op">&lt;/</span><span class="kw">div</span><span class="op">&gt;</span>

<span class="cmt">&lt;!-- Page B (same markup, copied) --&gt;</span>
<span class="op">&lt;</span><span class="kw">div</span> <span class="var">class</span><span class="op">=</span><span class="str">"card"</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="kw">img</span> <span class="var">src</span><span class="op">=</span><span class="str">{photo}</span> <span class="op">/&gt;</span>
  <span class="op">&lt;</span><span class="kw">h3</span><span class="op">&gt;</span>{title}<span class="op">&lt;/</span><span class="kw">h3</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="kw">p</span><span class="op">&gt;</span>{description}<span class="op">&lt;/</span><span class="kw">p</span><span class="op">&gt;</span>
<span class="op">&lt;/</span><span class="kw">div</span><span class="op">&gt;</span>`}</code></pre>
      </div>
      <div>
        <p class="mb-2 text-sm font-semibold uppercase tracking-wider text-green-500">After (DRY)</p>
        <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- Card.svelte — reusable component --&gt;</span>
<span class="op">&lt;</span><span class="kw">script</span><span class="op">&gt;</span>
  <span class="kw">let</span> { <span class="var">photo</span>, <span class="var">title</span>, <span class="var">description</span> } <span class="op">=</span> <span class="fn">$props</span>();
<span class="op">&lt;/</span><span class="kw">script</span><span class="op">&gt;</span>

<span class="op">&lt;</span><span class="kw">div</span> <span class="var">class</span><span class="op">=</span><span class="str">"card"</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="kw">img</span> <span class="var">src</span><span class="op">=</span><span class="str">{photo}</span> <span class="op">/&gt;</span>
  <span class="op">&lt;</span><span class="kw">h3</span><span class="op">&gt;</span>{title}<span class="op">&lt;/</span><span class="kw">h3</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="kw">p</span><span class="op">&gt;</span>{description}<span class="op">&lt;/</span><span class="kw">p</span><span class="op">&gt;</span>
<span class="op">&lt;/</span><span class="kw">div</span><span class="op">&gt;</span>

<span class="cmt">&lt;!-- Used in any page --&gt;</span>
<span class="op">&lt;</span><span class="fn">Card</span> {<span class="var">photo</span>} {<span class="var">title</span>} {<span class="var">description</span>} <span class="op">/&gt;</span>`}</code></pre>
      </div>
    </div>
  </div>

  <!-- DRY in databases -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">3. DRY in Databases (Normalization)</h3>
    <p class="text-slate-600">Database normalization is DRY applied to data storage. Instead of storing a customer's address in every order row, store it once in a customers table and reference it.</p>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <p class="mb-2 text-sm font-semibold uppercase tracking-wider text-red-500">Denormalized (WET)</p>
        <pre class="code-block"><code>{@html `<span class="cmt">-- orders table</span>
<span class="var">order_id</span> | <span class="var">customer_name</span> | <span class="var">customer_email</span> | <span class="var">item</span>
<span class="num">1</span>        | <span class="str">Alice</span>          | <span class="str">a@test.com</span>     | <span class="str">Book</span>
<span class="num">2</span>        | <span class="str">Alice</span>          | <span class="str">a@test.com</span>     | <span class="str">Pen</span>
<span class="num">3</span>        | <span class="str">Alice</span>          | <span class="str">a@test.com</span>     | <span class="str">Lamp</span>
<span class="cmt">-- Alice's email is stored 3 times!</span>`}</code></pre>
      </div>
      <div>
        <p class="mb-2 text-sm font-semibold uppercase tracking-wider text-green-500">Normalized (DRY)</p>
        <pre class="code-block"><code>{@html `<span class="cmt">-- customers table</span>
<span class="var">id</span> | <span class="var">name</span>  | <span class="var">email</span>
<span class="num">1</span>  | <span class="str">Alice</span> | <span class="str">a@test.com</span>

<span class="cmt">-- orders table</span>
<span class="var">order_id</span> | <span class="var">customer_id</span> | <span class="var">item</span>
<span class="num">1</span>        | <span class="num">1</span>           | <span class="str">Book</span>
<span class="num">2</span>        | <span class="num">1</span>           | <span class="str">Pen</span>
<span class="num">3</span>        | <span class="num">1</span>           | <span class="str">Lamp</span>
<span class="cmt">-- Email stored once, referenced by ID</span>`}</code></pre>
      </div>
    </div>
  </div>

  <!-- When to break DRY -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">4. When to Intentionally Break DRY</h3>

    <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5 space-y-4">
      <div>
        <h4 class="font-semibold text-slate-800 mb-1">Test readability</h4>
        <p class="text-sm text-slate-600 mb-2">Tests should be self-contained and readable. Excessive shared setup makes tests fragile and hard to understand.</p>
        <pre class="code-block"><code>{@html `<span class="cmt">// Preferred: each test is self-documenting</span>
<span class="fn">test</span>(<span class="str">"calculates tax for US"</span>, () <span class="op">=></span> {
  <span class="kw">const</span> <span class="var">order</span> <span class="op">=</span> { <span class="var">price</span>: <span class="num">100</span>, <span class="var">country</span>: <span class="str">"US"</span> };
  <span class="fn">expect</span>(<span class="fn">calcTax</span>(<span class="var">order</span>)).<span class="fn">toBe</span>(<span class="num">8</span>);
});

<span class="fn">test</span>(<span class="str">"calculates tax for UK"</span>, () <span class="op">=></span> {
  <span class="kw">const</span> <span class="var">order</span> <span class="op">=</span> { <span class="var">price</span>: <span class="num">100</span>, <span class="var">country</span>: <span class="str">"UK"</span> };
  <span class="fn">expect</span>(<span class="fn">calcTax</span>(<span class="var">order</span>)).<span class="fn">toBe</span>(<span class="num">20</span>);
});
<span class="cmt">// Yes, "order" setup is duplicated — and that is OK</span>`}</code></pre>
      </div>

      <div>
        <h4 class="font-semibold text-slate-800 mb-1">Microservice independence</h4>
        <p class="text-sm text-slate-600">Each microservice should own its data models. Sharing a User type across services creates coupling. It is better for each service to define its own view of a User with only the fields it needs.</p>
      </div>

      <div>
        <h4 class="font-semibold text-slate-800 mb-1">The wrong abstraction</h4>
        <p class="text-sm text-slate-600 mb-2">Merging two similar functions into one with a flag parameter is often worse than the duplication it eliminates.</p>
        <pre class="code-block"><code>{@html `<span class="cmt">// Bad: forced DRY with flag parameter</span>
<span class="kw">function</span> <span class="fn">sendMessage</span>(<span class="arg">msg</span>, <span class="arg">isUrgent</span>, <span class="arg">isInternal</span>,
    <span class="arg">skipLog</span>, <span class="arg">retryCount</span>) {
  <span class="kw">if</span> (<span class="arg">isUrgent</span> <span class="op">&&</span> <span class="arg">isInternal</span>) { <span class="cmt">/* ... */</span> }
  <span class="kw">else if</span> (<span class="arg">isUrgent</span>) { <span class="cmt">/* ... */</span> }
  <span class="kw">else if</span> (<span class="arg">skipLog</span>) { <span class="cmt">/* ... */</span> }
  <span class="cmt">// Impossible to reason about</span>
}

<span class="cmt">// Better: two clear, separate functions</span>
<span class="kw">function</span> <span class="fn">sendUrgentAlert</span>(<span class="arg">msg</span>) { <span class="cmt">/* ... */</span> }
<span class="kw">function</span> <span class="fn">sendInternalNote</span>(<span class="arg">msg</span>) { <span class="cmt">/* ... */</span> }`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Real-world refactoring patterns -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">5. Common Refactoring Patterns</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span><strong>Extract Function:</strong> Pull repeated logic into a named function. The most common DRY refactor.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span><strong>Extract Constant:</strong> Replace magic numbers and repeated strings with named constants.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span><strong>Extract Component:</strong> In UI code, turn repeated markup into a reusable component with props.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span><strong>Extract Module:</strong> When multiple files import the same set of utilities, group them into a shared module.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <span><strong>Parameterize:</strong> If two functions differ only by a value, make that value a parameter instead of maintaining two functions.</span>
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
    >
      Got it
    </button>
  </div>
</div>
{/if}

<style>
  .code-block {
    background-color: #0f172a;
    color: #e2e8f0;
    border: 1px solid #334155;
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    font-size: 0.875rem;
    line-height: 1.7;
    overflow-x: auto;
  }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
