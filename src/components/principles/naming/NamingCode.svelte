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
</script>

{#if !advanced}
<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Naming in Code</h2>
    <p class="text-sm text-slate-600">See the difference good naming makes. Each "Before" shows unclear code; the "After" shows the same logic with descriptive names.</p>
  </div>

  <!-- Transformation 1: Variables -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Variables</p>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <div class="mb-1 text-xs font-bold text-red-500">Before</div>
        <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">x</span> = <span class="num">29</span>;
<span class="kw">let</span> <span class="var">s</span> = <span class="str">"active"</span>;
<span class="kw">let</span> <span class="var">arr</span> = [<span class="str">"alice"</span>, <span class="str">"bob"</span>];
<span class="kw">let</span> <span class="var">d</span> = <span class="kw">new</span> <span class="fn">Date</span>();`}</code></pre>
      </div>
      <div>
        <div class="mb-1 text-xs font-bold text-green-600">After</div>
        <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">userAge</span> = <span class="num">29</span>;
<span class="kw">let</span> <span class="var">accountStatus</span> = <span class="str">"active"</span>;
<span class="kw">let</span> <span class="var">teamMembers</span> = [<span class="str">"alice"</span>, <span class="str">"bob"</span>];
<span class="kw">let</span> <span class="var">registrationDate</span> = <span class="kw">new</span> <span class="fn">Date</span>();`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Transformation 2: Functions -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Functions</p>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <div class="mb-1 text-xs font-bold text-red-500">Before</div>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">doStuff</span>(<span class="arg">a</span>, <span class="arg">b</span>) {
  <span class="kw">return</span> <span class="arg">a</span> <span class="op">*</span> <span class="arg">b</span> <span class="op">*</span> <span class="num">0.08</span>;
}

<span class="kw">function</span> <span class="fn">proc</span>(<span class="arg">d</span>) {
  <span class="kw">return</span> <span class="arg">d</span>.<span class="fn">filter</span>(<span class="arg">i</span> <span class="op">=></span> <span class="arg">i</span>.<span class="var">a</span>);
}`}</code></pre>
      </div>
      <div>
        <div class="mb-1 text-xs font-bold text-green-600">After</div>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">calculateSalesTax</span>(<span class="arg">price</span>, <span class="arg">quantity</span>) {
  <span class="kw">return</span> <span class="arg">price</span> <span class="op">*</span> <span class="arg">quantity</span> <span class="op">*</span> <span class="num">0.08</span>;
}

<span class="kw">function</span> <span class="fn">getActiveUsers</span>(<span class="arg">users</span>) {
  <span class="kw">return</span> <span class="arg">users</span>.<span class="fn">filter</span>(<span class="arg">user</span> <span class="op">=></span> <span class="arg">user</span>.<span class="var">isActive</span>);
}`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Transformation 3: Booleans -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Booleans</p>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <div class="mb-1 text-xs font-bold text-red-500">Before</div>
        <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">flag</span> = <span class="kw">true</span>;
<span class="kw">let</span> <span class="var">check</span> = <span class="kw">false</span>;
<span class="kw">let</span> <span class="var">ok</span> = <span class="var">items</span>.<span class="var">length</span> <span class="op">></span> <span class="num">0</span>;`}</code></pre>
      </div>
      <div>
        <div class="mb-1 text-xs font-bold text-green-600">After</div>
        <pre class="code-block"><code>{@html `<span class="kw">let</span> <span class="var">isLoggedIn</span> = <span class="kw">true</span>;
<span class="kw">let</span> <span class="var">hasVerifiedEmail</span> = <span class="kw">false</span>;
<span class="kw">let</span> <span class="var">hasItems</span> = <span class="var">items</span>.<span class="var">length</span> <span class="op">></span> <span class="num">0</span>;`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Full example with good naming -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">A complete function with good naming</p>
    <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">calculateOrderTotal</span>(<span class="arg">cartItems</span>) {
  <span class="kw">let</span> <span class="var">subtotal</span> = <span class="num">0</span>;

  <span class="kw">for</span> (<span class="kw">const</span> <span class="var">item</span> <span class="kw">of</span> <span class="arg">cartItems</span>) {
    <span class="kw">const</span> <span class="var">itemTotal</span> = <span class="var">item</span>.<span class="var">price</span> <span class="op">*</span> <span class="var">item</span>.<span class="var">quantity</span>;
    <span class="var">subtotal</span> <span class="op">+=</span> <span class="var">itemTotal</span>;
  }

  <span class="kw">const</span> <span class="var">taxRate</span> = <span class="num">0.08</span>;
  <span class="kw">const</span> <span class="var">taxAmount</span> = <span class="var">subtotal</span> <span class="op">*</span> <span class="var">taxRate</span>;
  <span class="kw">const</span> <span class="var">orderTotal</span> = <span class="var">subtotal</span> <span class="op">+</span> <span class="var">taxAmount</span>;

  <span class="kw">return</span> <span class="var">orderTotal</span>;
}`}</code></pre>
    <p class="mt-2 text-sm text-slate-500">Notice how you can read this function almost like English. Each variable name tells you exactly what it holds, and the function name tells you exactly what it does.</p>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Naming in Code (Advanced)</h2>
    <p class="text-sm text-slate-600">Conventions across languages, naming patterns for common scenarios, and antipatterns to avoid.</p>
  </div>

  <!-- Conventions by language -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">JavaScript / TypeScript</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Variables & functions: camelCase</span>
<span class="kw">const</span> <span class="var">userName</span> = <span class="str">"Alice"</span>;
<span class="kw">function</span> <span class="fn">getUserProfile</span>() { ... }

<span class="cmt">// Classes & components: PascalCase</span>
<span class="kw">class</span> <span class="fn">UserAccount</span> { ... }
<span class="kw">function</span> <span class="fn">NavBar</span>() { ... }  <span class="cmt">// React component</span>

<span class="cmt">// Constants: UPPER_SNAKE_CASE</span>
<span class="kw">const</span> <span class="var">MAX_RETRIES</span> = <span class="num">3</span>;

<span class="cmt">// Private by convention: leading underscore</span>
<span class="kw">const</span> <span class="var">_internalCache</span> = <span class="kw">new</span> <span class="fn">Map</span>();`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Python</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Variables & functions: snake_case</span>
<span class="var">user_name</span> = <span class="str">"Alice"</span>
<span class="kw">def</span> <span class="fn">get_user_profile</span>(): ...

<span class="cmt"># Classes: PascalCase</span>
<span class="kw">class</span> <span class="fn">UserAccount</span>: ...

<span class="cmt"># Constants: UPPER_SNAKE_CASE</span>
<span class="var">MAX_RETRIES</span> = <span class="num">3</span>

<span class="cmt"># Private by convention: leading underscore</span>
<span class="var">_internal_cache</span> = {}
<span class="cmt"># Name-mangled: double underscore</span>
<span class="var">__truly_private</span> = <span class="num">42</span>`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Go</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Exported (public): PascalCase</span>
<span class="kw">func</span> <span class="fn">GetUserProfile</span>() { ... }
<span class="kw">type</span> <span class="fn">UserAccount</span> <span class="kw">struct</span> { ... }

<span class="cmt">// Unexported (private): camelCase</span>
<span class="kw">func</span> <span class="fn">getUserProfile</span>() { ... }
<span class="kw">var</span> <span class="var">internalCache</span> <span class="op">=</span> <span class="fn">make</span>(<span class="kw">map</span>[<span class="fn">string</span>]<span class="fn">int</span>)

<span class="cmt">// Acronyms stay uppercase: URL, ID, HTTP</span>
<span class="kw">type</span> <span class="fn">HTTPClient</span> <span class="kw">struct</span> { ... }
<span class="kw">var</span> <span class="var">userID</span> <span class="fn">string</span>`}</code></pre>
  </div>

  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">C#</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Public methods & properties: PascalCase</span>
<span class="kw">public</span> <span class="fn">string</span> <span class="fn">GetUserProfile</span>() { ... }
<span class="kw">public</span> <span class="fn">string</span> <span class="var">UserName</span> { <span class="kw">get</span>; <span class="kw">set</span>; }

<span class="cmt">// Local variables & parameters: camelCase</span>
<span class="kw">var</span> <span class="var">userName</span> = <span class="str">"Alice"</span>;

<span class="cmt">// Private fields: _camelCase (underscore prefix)</span>
<span class="kw">private</span> <span class="fn">readonly</span> <span class="fn">string</span> <span class="var">_connectionString</span>;

<span class="cmt">// Interfaces: prefix with I</span>
<span class="kw">public</span> <span class="kw">interface</span> <span class="fn">IUserRepository</span> { ... }`}</code></pre>
  </div>

  <!-- Naming patterns for common scenarios -->
  <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">Naming Patterns for Common Scenarios</h3>
    <div class="space-y-3 text-sm">
      <div class="flex items-start gap-3">
        <div class="w-36 shrink-0 rounded bg-blue-600 px-2 py-1 text-center text-xs font-bold text-white">Getters</div>
        <div class="text-slate-600"><code class="rounded bg-white px-1 text-blue-700">getUserName()</code>, <code class="rounded bg-white px-1 text-blue-700">getOrderTotal()</code> — retrieve a value without side effects</div>
      </div>
      <div class="flex items-start gap-3">
        <div class="w-36 shrink-0 rounded bg-blue-600 px-2 py-1 text-center text-xs font-bold text-white">Setters</div>
        <div class="text-slate-600"><code class="rounded bg-white px-1 text-blue-700">setUserName()</code>, <code class="rounded bg-white px-1 text-blue-700">updateEmail()</code> — modify a value</div>
      </div>
      <div class="flex items-start gap-3">
        <div class="w-36 shrink-0 rounded bg-blue-600 px-2 py-1 text-center text-xs font-bold text-white">Predicates</div>
        <div class="text-slate-600"><code class="rounded bg-white px-1 text-blue-700">isValid()</code>, <code class="rounded bg-white px-1 text-blue-700">hasAccess()</code>, <code class="rounded bg-white px-1 text-blue-700">canDelete()</code> — return true or false</div>
      </div>
      <div class="flex items-start gap-3">
        <div class="w-36 shrink-0 rounded bg-blue-600 px-2 py-1 text-center text-xs font-bold text-white">Factories</div>
        <div class="text-slate-600"><code class="rounded bg-white px-1 text-blue-700">createUser()</code>, <code class="rounded bg-white px-1 text-blue-700">buildQuery()</code>, <code class="rounded bg-white px-1 text-blue-700">makeConnection()</code> — construct and return new objects</div>
      </div>
      <div class="flex items-start gap-3">
        <div class="w-36 shrink-0 rounded bg-blue-600 px-2 py-1 text-center text-xs font-bold text-white">Event handlers</div>
        <div class="text-slate-600"><code class="rounded bg-white px-1 text-blue-700">handleClick()</code>, <code class="rounded bg-white px-1 text-blue-700">onSubmit()</code>, <code class="rounded bg-white px-1 text-blue-700">handleUserLogin()</code> — respond to events</div>
      </div>
      <div class="flex items-start gap-3">
        <div class="w-36 shrink-0 rounded bg-blue-600 px-2 py-1 text-center text-xs font-bold text-white">Converters</div>
        <div class="text-slate-600"><code class="rounded bg-white px-1 text-blue-700">toJSON()</code>, <code class="rounded bg-white px-1 text-blue-700">toString()</code>, <code class="rounded bg-white px-1 text-blue-700">fromDTO()</code>, <code class="rounded bg-white px-1 text-blue-700">parseDate()</code> — transform data between formats</div>
      </div>
    </div>
  </div>

  <!-- Antipatterns -->
  <div class="rounded-xl border-2 border-red-200 bg-red-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-red-600">Naming Antipatterns to Avoid</h3>
    <div class="space-y-3 text-sm text-slate-700">
      <div>
        <strong class="text-red-700">Generic names:</strong> <code class="rounded bg-white px-1 text-red-600">data</code>, <code class="rounded bg-white px-1 text-red-600">info</code>, <code class="rounded bg-white px-1 text-red-600">temp</code>, <code class="rounded bg-white px-1 text-red-600">result</code>, <code class="rounded bg-white px-1 text-red-600">value</code> — these tell you nothing about what the variable actually holds.
      </div>
      <div>
        <strong class="text-red-700">Misleading names:</strong> naming a list <code class="rounded bg-white px-1 text-red-600">userList</code> when it is actually a Map, or <code class="rounded bg-white px-1 text-red-600">count</code> when it stores a boolean. The name should match the reality.
      </div>
      <div>
        <strong class="text-red-700">Unnecessary context:</strong> In a <code class="rounded bg-white px-1 text-red-600">User</code> class, naming a property <code class="rounded bg-white px-1 text-red-600">userName</code> is redundant. Just call it <code class="rounded bg-white px-1 text-green-700">name</code> since the class already provides context.
      </div>
      <div>
        <strong class="text-red-700">Number suffixes:</strong> <code class="rounded bg-white px-1 text-red-600">user1</code>, <code class="rounded bg-white px-1 text-red-600">user2</code>, <code class="rounded bg-white px-1 text-red-600">data2</code> — this usually means you need better names like <code class="rounded bg-white px-1 text-green-700">sender</code> and <code class="rounded bg-white px-1 text-green-700">receiver</code>.
      </div>
      <div>
        <strong class="text-red-700">Encoding types in names:</strong> <code class="rounded bg-white px-1 text-red-600">strName</code>, <code class="rounded bg-white px-1 text-red-600">iAge</code>, <code class="rounded bg-white px-1 text-red-600">arrItems</code> — modern languages and IDEs make this unnecessary. Let the type system do its job.
      </div>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
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
