<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Code Review in Practice</h2>
    <p class="text-slate-600">Real examples of common issues found in code review, with before and after fixes.</p>
  </div>

  <!-- Common Issues -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Spotting Common Issues</h3>
    <p class="text-sm text-slate-600">Here is a code snippet with several issues a reviewer would flag. The highlighted comments show what to look for:</p>
    <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">calc</span>(<span class="arg">d</span>, <span class="arg">t</span>) {             <span class="cmt">// Issue: unclear names</span>
  <span class="kw">var</span> <span class="var">x</span> <span class="op">=</span> <span class="var">d</span> <span class="op">*</span> <span class="var">t</span>;                  <span class="cmt">// Issue: "var" instead of "const"</span>
  <span class="kw">var</span> <span class="var">y</span> <span class="op">=</span> <span class="var">x</span> <span class="op">*</span> <span class="num">0.0825</span>;             <span class="cmt">// Issue: magic number</span>
  <span class="var">console</span>.<span class="fn">log</span>(<span class="var">x</span>);                 <span class="cmt">// Issue: debug log left in</span>
  <span class="kw">return</span> <span class="var">x</span> <span class="op">+</span> <span class="var">y</span>;
}`}</code></pre>
  </div>

  <!-- Before / After: Naming -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Before / After: Variable Naming</h3>
    <p class="text-sm text-slate-600">Good names make code self-documenting. A reviewer should not need to guess what a variable holds.</p>

    <div class="grid gap-4 lg:grid-cols-2">
      <div class="space-y-2">
        <p class="text-xs font-bold uppercase tracking-wider text-red-600">Before (unclear)</p>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">p</span>(<span class="arg">a</span>, <span class="arg">b</span>) {
  <span class="kw">const</span> <span class="var">c</span> <span class="op">=</span> <span class="var">a</span>.<span class="fn">filter</span>(<span class="arg">x</span> <span class="op">=></span> <span class="var">x</span>.<span class="var">s</span> <span class="op">></span> <span class="var">b</span>);
  <span class="kw">return</span> <span class="var">c</span>.<span class="fn">map</span>(<span class="arg">x</span> <span class="op">=></span> <span class="var">x</span>.<span class="var">n</span>);
}`}</code></pre>
      </div>
      <div class="space-y-2">
        <p class="text-xs font-bold uppercase tracking-wider text-green-600">After (clear)</p>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">getTopScorerNames</span>(<span class="arg">players</span>, <span class="arg">minScore</span>) {
  <span class="kw">const</span> <span class="var">topPlayers</span> <span class="op">=</span> <span class="var">players</span>.<span class="fn">filter</span>(
    <span class="arg">player</span> <span class="op">=></span> <span class="var">player</span>.<span class="var">score</span> <span class="op">></span> <span class="var">minScore</span>
  );
  <span class="kw">return</span> <span class="var">topPlayers</span>.<span class="fn">map</span>(<span class="arg">player</span> <span class="op">=></span> <span class="var">player</span>.<span class="var">name</span>);
}`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Before / After: Error Handling -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Before / After: Error Handling</h3>
    <p class="text-sm text-slate-600">Missing error handling is one of the most common review findings. Always consider what happens when things go wrong.</p>

    <div class="grid gap-4 lg:grid-cols-2">
      <div class="space-y-2">
        <p class="text-xs font-bold uppercase tracking-wider text-red-600">Before (no error handling)</p>
        <pre class="code-block"><code>{@html `<span class="kw">async function</span> <span class="fn">getUser</span>(<span class="arg">id</span>) {
  <span class="kw">const</span> <span class="var">res</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">\`/api/users/\${id}\`</span>);
  <span class="kw">const</span> <span class="var">data</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">res</span>.<span class="fn">json</span>();
  <span class="kw">return</span> <span class="var">data</span>.<span class="var">name</span>;
}`}</code></pre>
      </div>
      <div class="space-y-2">
        <p class="text-xs font-bold uppercase tracking-wider text-green-600">After (handles errors)</p>
        <pre class="code-block"><code>{@html `<span class="kw">async function</span> <span class="fn">getUser</span>(<span class="arg">id</span>) {
  <span class="kw">const</span> <span class="var">res</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">\`/api/users/\${id}\`</span>);
  <span class="kw">if</span> (<span class="op">!</span><span class="var">res</span>.<span class="var">ok</span>) {
    <span class="kw">throw new</span> <span class="fn">Error</span>(<span class="str">\`User \${id} not found\`</span>);
  }
  <span class="kw">const</span> <span class="var">data</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">res</span>.<span class="fn">json</span>();
  <span class="kw">return</span> <span class="var">data</span>.<span class="var">name</span> <span class="op">??</span> <span class="str">"Unknown"</span>;
}`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Before / After: Magic Numbers -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Before / After: Magic Numbers</h3>
    <p class="text-sm text-slate-600">Unexplained numbers in code are confusing. Extract them to named constants so future readers understand the intent.</p>

    <div class="grid gap-4 lg:grid-cols-2">
      <div class="space-y-2">
        <p class="text-xs font-bold uppercase tracking-wider text-red-600">Before (magic numbers)</p>
        <pre class="code-block"><code>{@html `<span class="kw">if</span> (<span class="var">password</span>.<span class="var">length</span> <span class="op"><</span> <span class="num">8</span>) <span class="kw">return</span> <span class="kw">false</span>;
<span class="kw">if</span> (<span class="var">retries</span> <span class="op">></span> <span class="num">3</span>) <span class="fn">lockAccount</span>();
<span class="kw">if</span> (<span class="var">age</span> <span class="op">>=</span> <span class="num">21</span>) <span class="fn">allowPurchase</span>();`}</code></pre>
      </div>
      <div class="space-y-2">
        <p class="text-xs font-bold uppercase tracking-wider text-green-600">After (named constants)</p>
        <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">MIN_PASSWORD_LENGTH</span> <span class="op">=</span> <span class="num">8</span>;
<span class="kw">const</span> <span class="var">MAX_LOGIN_RETRIES</span> <span class="op">=</span> <span class="num">3</span>;
<span class="kw">const</span> <span class="var">LEGAL_DRINKING_AGE</span> <span class="op">=</span> <span class="num">21</span>;

<span class="kw">if</span> (<span class="var">password</span>.<span class="var">length</span> <span class="op"><</span> <span class="var">MIN_PASSWORD_LENGTH</span>) <span class="kw">return</span> <span class="kw">false</span>;
<span class="kw">if</span> (<span class="var">retries</span> <span class="op">></span> <span class="var">MAX_LOGIN_RETRIES</span>) <span class="fn">lockAccount</span>();
<span class="kw">if</span> (<span class="var">age</span> <span class="op">>=</span> <span class="var">LEGAL_DRINKING_AGE</span>) <span class="fn">allowPurchase</span>();`}</code></pre>
      </div>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Code Review Tooling (Advanced)</h2>
    <p class="text-slate-600">Set up automated code quality tools: ESLint, Prettier, GitHub Actions, pre-commit hooks, and custom lint rules.</p>
  </div>

  <!-- ESLint + Prettier -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Setting Up ESLint + Prettier</h3>
    <p class="text-sm text-slate-600">ESLint catches code quality issues. Prettier handles formatting. Together they automate what reviewers should never waste time on.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// eslint.config.js (flat config, ESLint 9+)</span>
<span class="kw">import</span> <span class="var">prettier</span> <span class="kw">from</span> <span class="str">"eslint-plugin-prettier"</span>;

<span class="kw">export default</span> [
  {
    <span class="var">plugins</span>: { <span class="var">prettier</span> },
    <span class="var">rules</span>: {
      <span class="cmt">// Code quality rules</span>
      <span class="str">"no-unused-vars"</span>: <span class="str">"error"</span>,
      <span class="str">"eqeqeq"</span>: [<span class="str">"error"</span>, <span class="str">"always"</span>],
      <span class="str">"no-console"</span>: [<span class="str">"warn"</span>, { <span class="var">allow</span>: [<span class="str">"warn"</span>, <span class="str">"error"</span>] }],
      <span class="str">"consistent-return"</span>: <span class="str">"error"</span>,

      <span class="cmt">// Formatting via Prettier</span>
      <span class="str">"prettier/prettier"</span>: <span class="str">"error"</span>,
    },
  },
];`}</code></pre>
    <pre class="code-block"><code>{@html `<span class="cmt">// .prettierrc</span>
{
  <span class="str">"semi"</span>: <span class="kw">true</span>,
  <span class="str">"singleQuote"</span>: <span class="kw">true</span>,
  <span class="str">"tabWidth"</span>: <span class="num">2</span>,
  <span class="str">"trailingComma"</span>: <span class="str">"all"</span>,
  <span class="str">"printWidth"</span>: <span class="num">100</span>
}`}</code></pre>
  </div>

  <!-- GitHub Actions -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">GitHub Actions for Automated Review</h3>
    <p class="text-sm text-slate-600">Run lint, type checks, and tests on every pull request. Combined with branch protection, no code merges without passing:</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># .github/workflows/review.yml</span>
<span class="var">name</span>: <span class="str">Code Review Checks</span>
<span class="var">on</span>: [<span class="str">pull_request</span>]

<span class="var">jobs</span>:
  <span class="var">lint-and-test</span>:
    <span class="var">runs-on</span>: <span class="str">ubuntu-latest</span>
    <span class="var">steps</span>:
      - <span class="var">uses</span>: <span class="str">actions/checkout@v4</span>
      - <span class="var">uses</span>: <span class="str">actions/setup-node@v4</span>
        <span class="var">with</span>:
          <span class="var">node-version</span>: <span class="num">20</span>
          <span class="var">cache</span>: <span class="str">npm</span>

      - <span class="var">run</span>: <span class="str">npm ci</span>
      - <span class="var">name</span>: <span class="str">Lint</span>
        <span class="var">run</span>: <span class="str">npx eslint . --max-warnings 0</span>
      - <span class="var">name</span>: <span class="str">Type Check</span>
        <span class="var">run</span>: <span class="str">npx tsc --noEmit</span>
      - <span class="var">name</span>: <span class="str">Test</span>
        <span class="var">run</span>: <span class="str">npm test -- --coverage</span>`}</code></pre>
  </div>

  <!-- Pre-commit Hooks -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Pre-commit Hooks with Husky</h3>
    <p class="text-sm text-slate-600">Catch issues before they even reach the PR. Husky runs scripts on <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">git commit</code> so problems are fixed locally:</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Install husky + lint-staged</span>
<span class="var">npm</span> <span class="fn">install</span> <span class="op">--save-dev</span> <span class="str">husky</span> <span class="str">lint-staged</span>
<span class="var">npx</span> <span class="fn">husky</span> <span class="str">init</span>`}</code></pre>
    <pre class="code-block"><code>{@html `<span class="cmt">// package.json</span>
{
  <span class="str">"lint-staged"</span>: {
    <span class="str">"*.{ts,tsx,js,jsx}"</span>: [
      <span class="str">"eslint --fix"</span>,
      <span class="str">"prettier --write"</span>
    ],
    <span class="str">"*.{css,scss}"</span>: [
      <span class="str">"prettier --write"</span>
    ]
  }
}`}</code></pre>
    <pre class="code-block"><code>{@html `<span class="cmt"># .husky/pre-commit</span>
<span class="var">npx</span> <span class="fn">lint-staged</span>`}</code></pre>
    <p class="text-sm text-slate-500">Now every commit automatically formats and lints only the files you changed. Reviewers never see formatting issues.</p>
  </div>

  <!-- Custom Lint Rules -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Custom Lint Rules</h3>
    <p class="text-sm text-slate-600">When your team has project-specific conventions, write a custom ESLint rule to enforce them automatically:</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// eslint-rules/no-direct-db-access.js</span>
<span class="kw">export default</span> {
  <span class="var">meta</span>: {
    <span class="var">type</span>: <span class="str">"problem"</span>,
    <span class="var">docs</span>: {
      <span class="var">description</span>: <span class="str">"Disallow direct database calls outside the data layer"</span>,
    },
    <span class="var">messages</span>: {
      <span class="var">noDirectDb</span>: <span class="str">"Use the repository pattern. Import from 'src/data/' instead of calling db directly."</span>,
    },
  },
  <span class="fn">create</span>(<span class="arg">context</span>) {
    <span class="kw">return</span> {
      <span class="fn">CallExpression</span>(<span class="arg">node</span>) {
        <span class="kw">const</span> <span class="var">filePath</span> <span class="op">=</span> <span class="var">context</span>.<span class="fn">getFilename</span>();
        <span class="kw">if</span> (<span class="var">filePath</span>.<span class="fn">includes</span>(<span class="str">"/data/"</span>)) <span class="kw">return</span>;

        <span class="kw">if</span> (
          <span class="var">node</span>.<span class="var">callee</span>.<span class="var">type</span> <span class="op">===</span> <span class="str">"MemberExpression"</span> <span class="op">&&</span>
          <span class="var">node</span>.<span class="var">callee</span>.<span class="var">object</span>.<span class="var">name</span> <span class="op">===</span> <span class="str">"db"</span>
        ) {
          <span class="var">context</span>.<span class="fn">report</span>({ <span class="var">node</span>, <span class="var">messageId</span>: <span class="str">"noDirectDb"</span> });
        }
      },
    };
  },
};`}</code></pre>
    <p class="text-sm text-slate-500">Custom rules let you codify team knowledge so it is enforced automatically, even for new developers who have not read all the docs.</p>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      Got it
    </button>
  </div>
</div>
{/if}

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
