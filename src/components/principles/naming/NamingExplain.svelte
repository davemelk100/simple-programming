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

  // Animated cards for basic mode
  let visibleCards = $state(0);

  const namingPairs = [
    { bad: 'x', good: 'userAge', desc: 'A person\'s age', badColor: 'border-red-300 bg-red-50', goodColor: 'border-green-300 bg-green-50' },
    { bad: 'fn1', good: 'calculateTotal', desc: 'A function that calculates a total', badColor: 'border-red-300 bg-red-50', goodColor: 'border-green-300 bg-green-50' },
    { bad: 'd', good: 'deliveryDate', desc: 'When an order will be delivered', badColor: 'border-red-300 bg-red-50', goodColor: 'border-green-300 bg-green-50' },
    { bad: 'tmp', good: 'searchQuery', desc: 'What the user typed in the search bar', badColor: 'border-red-300 bg-red-50', goodColor: 'border-green-300 bg-green-50' },
    { bad: 'arr', good: 'activeUsers', desc: 'A list of users currently online', badColor: 'border-red-300 bg-red-50', goodColor: 'border-green-300 bg-green-50' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < namingPairs.length) {
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
    <p class="text-slate-600">
      There is a saying in programming: <strong>"Code is read far more often than it is written."</strong> Every time you name a variable, function, or file, you are leaving a message for the next person who reads your code. That person might be a teammate, a collaborator, or future-you six months from now. Good names make code feel like reading a story. Bad names make it feel like deciphering a secret code.
    </p>
  </div>

  <!-- Attic metaphor -->
  <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">Think of it this way</h3>
    <p class="text-slate-600">
      Naming is like labeling boxes in your attic. If you write <strong>"stuff"</strong> on every box, good luck finding your holiday decorations next December. But if you write <strong>"Holiday Lights"</strong> and <strong>"Winter Clothes"</strong>, you can find exactly what you need in seconds. Variable names work the same way — they should tell you what is inside without having to open the box.
    </p>
  </div>

  <!-- Animated bad vs good cards -->
  <div>
    <h3 class="mb-4 text-lg font-bold text-slate-800">Bad Names vs. Good Names</h3>
    <div class="space-y-3">
      {#each namingPairs as pair, i}
        <div
          class="grid grid-cols-[1fr_auto_1fr] items-center gap-4 transition-all duration-500
            {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
        >
          <!-- Bad name -->
          <div class="rounded-lg border-2 {pair.badColor} p-3 text-center">
            <div class="text-xs font-semibold uppercase text-red-400">Bad</div>
            <code class="text-lg font-bold text-red-600">{pair.bad}</code>
          </div>

          <!-- Arrow -->
          <div class="text-2xl text-slate-400">&#8594;</div>

          <!-- Good name -->
          <div class="rounded-lg border-2 {pair.goodColor} p-3 text-center">
            <div class="text-xs font-semibold uppercase text-green-500">Good</div>
            <code class="text-lg font-bold text-green-700">{pair.good}</code>
          </div>
        </div>
      {/each}
    </div>
    <p class="mt-3 text-sm text-slate-500">Each good name tells you exactly what the value represents, with no guessing needed.</p>
  </div>

  <!-- Key rules -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Three Golden Rules</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <span><strong>Be descriptive.</strong> A name should explain what the value represents. <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">totalPrice</code> is better than <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">tp</code>.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <span><strong>Be consistent.</strong> If you call it <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">user</code> in one place, do not call it <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">person</code>, <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">account</code>, or <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">client</code> in another when referring to the same thing.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <span><strong>Don't abbreviate.</strong> Saving a few keystrokes now costs minutes of confusion later. Write <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">emailAddress</code> instead of <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">emlAddr</code>.</span>
      </li>
    </ul>
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
      <h2 class="mb-3 text-2xl font-bold text-slate-800">Naming: The Deep Dive</h2>
      <p class="text-slate-600">
        Phil Karlton famously said: <em>"There are only two hard things in Computer Science: cache invalidation and naming things."</em> Naming well requires balancing brevity with clarity, following conventions your team and language expect, and thinking about the <strong>domain</strong> your code represents.
      </p>
    </div>

    <!-- Naming conventions across languages -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Naming Conventions by Language</h3>
      <div class="overflow-x-auto rounded-xl border border-slate-200">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50">
              <th class="px-4 py-3 font-semibold text-slate-700">Convention</th>
              <th class="px-4 py-3 font-semibold text-slate-700">Example</th>
              <th class="px-4 py-3 font-semibold text-slate-700">Used In</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr>
              <td class="px-4 py-3 font-medium text-slate-800">camelCase</td>
              <td class="px-4 py-3"><code class="rounded bg-slate-100 px-1 text-sm text-blue-700">getUserName</code></td>
              <td class="px-4 py-3 text-slate-600">JavaScript, TypeScript, Java (variables, functions)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-medium text-slate-800">PascalCase</td>
              <td class="px-4 py-3"><code class="rounded bg-slate-100 px-1 text-sm text-blue-700">UserAccount</code></td>
              <td class="px-4 py-3 text-slate-600">Classes in most languages, C# methods, React components</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-medium text-slate-800">snake_case</td>
              <td class="px-4 py-3"><code class="rounded bg-slate-100 px-1 text-sm text-blue-700">get_user_name</code></td>
              <td class="px-4 py-3 text-slate-600">Python, Ruby, Rust, C (variables, functions)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-medium text-slate-800">UPPER_SNAKE_CASE</td>
              <td class="px-4 py-3"><code class="rounded bg-slate-100 px-1 text-sm text-blue-700">MAX_RETRIES</code></td>
              <td class="px-4 py-3 text-slate-600">Constants in most languages</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-medium text-slate-800">kebab-case</td>
              <td class="px-4 py-3"><code class="rounded bg-slate-100 px-1 text-sm text-blue-700">user-profile</code></td>
              <td class="px-4 py-3 text-slate-600">CSS classes, HTML attributes, URLs, file names</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Hungarian notation -->
    <div class="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
      <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-amber-700">Historical Note: Hungarian Notation</h3>
      <p class="text-slate-600">
        In the 1980s and 90s, it was common to prefix variable names with their type: <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">strName</code>, <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">iCount</code>, <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">bIsActive</code>. This was called <strong>Hungarian notation</strong>. It fell out of favor because modern IDEs show types on hover, and type systems (like TypeScript) catch type errors at compile time. Encoding the type in the name just adds noise and creates a maintenance burden when types change.
      </p>
    </div>

    <!-- Domain-driven naming and special patterns -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Naming Patterns That Communicate Intent</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">// Booleans: use is, has, can, should prefixes</span>
<span class="kw">let</span> <span class="var">isActive</span> = <span class="kw">true</span>;
<span class="kw">let</span> <span class="var">hasPermission</span> = <span class="fn">checkAccess</span>(<span class="var">user</span>);
<span class="kw">let</span> <span class="var">canEdit</span> = <span class="var">user</span>.<span class="var">role</span> === <span class="str">"admin"</span>;
<span class="kw">let</span> <span class="var">shouldRefresh</span> = <span class="var">cacheAge</span> > <span class="num">3600</span>;

<span class="cmt">// Functions: use verbs — they DO things</span>
<span class="kw">function</span> <span class="fn">fetchUserProfile</span>(<span class="arg">userId</span>) { ... }
<span class="kw">function</span> <span class="fn">calculateShippingCost</span>(<span class="arg">order</span>) { ... }
<span class="kw">function</span> <span class="fn">validateEmail</span>(<span class="arg">input</span>) { ... }
<span class="kw">function</span> <span class="fn">formatCurrency</span>(<span class="arg">amount</span>) { ... }

<span class="cmt">// Constants: UPPER_SNAKE_CASE for true constants</span>
<span class="kw">const</span> <span class="var">MAX_LOGIN_ATTEMPTS</span> = <span class="num">5</span>;
<span class="kw">const</span> <span class="var">API_BASE_URL</span> = <span class="str">"https://api.example.com"</span>;
<span class="kw">const</span> <span class="var">DEFAULT_TIMEOUT_MS</span> = <span class="num">30000</span>;`}</code></pre>
    </div>

    <!-- Domain-driven naming -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Domain-Driven Naming</h3>
      <p class="mb-3 text-slate-600">
        The best names come from your <strong>problem domain</strong>, not from implementation details. If you are building an e-commerce app, use words like <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">cart</code>, <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">order</code>, <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">lineItem</code>, and <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">shippingAddress</code> rather than generic terms like <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">data</code>, <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">info</code>, or <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">obj</code>.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Generic (hard to understand)</span>
<span class="kw">const</span> <span class="var">data</span> = <span class="fn">getData</span>();
<span class="kw">const</span> <span class="var">result</span> = <span class="fn">process</span>(<span class="var">data</span>);

<span class="cmt">// Domain-driven (tells a clear story)</span>
<span class="kw">const</span> <span class="var">orderHistory</span> = <span class="fn">fetchOrderHistory</span>(<span class="var">customerId</span>);
<span class="kw">const</span> <span class="var">monthlyReport</span> = <span class="fn">generateSalesReport</span>(<span class="var">orderHistory</span>);`}</code></pre>
    </div>

    <!-- Key concepts -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <span><strong>Follow your language's conventions.</strong> JavaScript uses camelCase for variables, PascalCase for classes. Python uses snake_case. Going against convention makes your code harder for others to read.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <span><strong>Name booleans as questions.</strong> If you can read it as a yes/no question, you have a good boolean name: "is active?", "has permission?", "can edit?".</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <span><strong>Name functions as actions.</strong> Functions do things, so their names should be verbs: <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">sendEmail</code>, <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">calculateTax</code>, <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">validateInput</code>.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <span><strong>Scope determines length.</strong> A loop counter can be <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">i</code> because its scope is tiny. A module-level variable should be descriptive because its scope is wide.</span>
        </li>
      </ul>
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
