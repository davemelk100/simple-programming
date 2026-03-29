<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);

  const cards = [
    { emoji: '🛒', title: 'Full Journey', desc: 'E2E tests walk through the entire app like a real user — open, click, type, submit, verify.' },
    { emoji: '🕵️', title: 'Secret Shopper', desc: 'Think of a secret shopper who tests the whole store: walk in, browse, pick items, checkout, leave.' },
    { emoji: '🛡️', title: 'Confidence', desc: 'If the critical flows work end-to-end, you know your app works for real users.' },
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">What Is End-to-End Testing?</h2>
    <p class="text-slate-600">
      End-to-end (E2E) testing means <strong>simulating a real user</strong> clicking through your app from start to finish. Instead of testing a single function, you test an entire flow: open the browser, navigate to a page, fill in a form, click a button, and verify what happens next.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    {#each cards as card, i}
      <div
        class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5 text-center transition-all duration-700
          {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
      >
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">The Secret Shopper Metaphor</h3>
    <p class="text-slate-600">
      Imagine a <strong>secret shopper</strong> hired to evaluate a store. They don't just check one shelf — they test the <em>entire experience</em>: walk in the front door, browse products, pick items, go to checkout, pay, and leave. If any part of that journey breaks, the shopper reports it. E2E tests do exactly this for your app.
    </p>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Popular E2E Testing Tools</h3>
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
        <h4 class="mb-1 font-bold text-purple-700">Playwright</h4>
        <p class="text-sm text-slate-600">Made by Microsoft. Tests Chrome, Firefox, and Safari. Fast, reliable, and supports multiple languages. The modern choice for most teams.</p>
      </div>
      <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
        <h4 class="mb-1 font-bold text-purple-700">Cypress</h4>
        <p class="text-sm text-slate-600">Developer-friendly with a beautiful UI. Runs inside the browser for easy debugging. Great for single-page apps and smaller projects.</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">What Should You E2E Test?</h3>
    <p class="text-slate-600">
      E2E tests are <strong>slow and expensive</strong> compared to unit tests, so you can't test everything. Focus on <strong>critical user flows</strong> — the paths that matter most to your business:
    </p>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><strong>Login/Signup:</strong> If users can't sign in, nothing else matters.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><strong>Checkout/Payment:</strong> A broken checkout means lost revenue.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><strong>Core workflows:</strong> Whatever your app's main purpose is (posting, searching, uploading, etc.).</span>
      </li>
    </ul>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Why E2E Is Slow but Valuable</h3>
    <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
      <p class="text-sm text-slate-600 mb-3">
        E2E tests launch a real browser, load your entire app, and interact with it. This means they're <strong>10-100x slower</strong> than unit tests. But they catch problems that no other test type can — like a button that renders but doesn't actually submit the form, or a redirect that goes to the wrong page.
      </p>
      <div class="flex items-center gap-4 text-sm">
        <div class="rounded-lg bg-green-100 px-3 py-1.5 text-green-700">Unit: ~5ms</div>
        <span class="text-slate-400">vs</span>
        <div class="rounded-lg bg-yellow-100 px-3 py-1.5 text-yellow-700">Integration: ~200ms</div>
        <span class="text-slate-400">vs</span>
        <div class="rounded-lg bg-red-100 px-3 py-1.5 text-red-700">E2E: ~5-30s</div>
      </div>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      I understand E2E testing
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">End-to-End Testing (Advanced)</h2>
      <p class="text-slate-600">Deep dive into E2E strategies, patterns, and professional practices.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Playwright vs Cypress</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr class="border-b-2 border-purple-200">
              <th class="py-2 pr-4 text-left text-slate-700">Feature</th>
              <th class="py-2 px-4 text-left text-purple-700">Playwright</th>
              <th class="py-2 px-4 text-left text-purple-700">Cypress</th>
            </tr>
          </thead>
          <tbody class="text-slate-600">
            <tr class="border-b border-slate-100">
              <td class="py-2 pr-4 font-semibold">Browsers</td>
              <td class="py-2 px-4">Chrome, Firefox, Safari, Edge</td>
              <td class="py-2 px-4">Chrome, Firefox, Edge (no Safari)</td>
            </tr>
            <tr class="border-b border-slate-100">
              <td class="py-2 pr-4 font-semibold">Multi-tab</td>
              <td class="py-2 px-4">Yes</td>
              <td class="py-2 px-4">No</td>
            </tr>
            <tr class="border-b border-slate-100">
              <td class="py-2 pr-4 font-semibold">Language</td>
              <td class="py-2 px-4">JS, TS, Python, C#, Java</td>
              <td class="py-2 px-4">JS, TS only</td>
            </tr>
            <tr class="border-b border-slate-100">
              <td class="py-2 pr-4 font-semibold">Speed</td>
              <td class="py-2 px-4">Very fast (headless by default)</td>
              <td class="py-2 px-4">Moderate (runs in browser)</td>
            </tr>
            <tr class="border-b border-slate-100">
              <td class="py-2 pr-4 font-semibold">Debugging</td>
              <td class="py-2 px-4">Trace viewer, screenshots</td>
              <td class="py-2 px-4">Time-travel UI (excellent)</td>
            </tr>
            <tr>
              <td class="py-2 pr-4 font-semibold">Parallelism</td>
              <td class="py-2 px-4">Built-in, per-worker</td>
              <td class="py-2 px-4">Requires paid dashboard</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Visual Regression Testing</h3>
      <p class="text-slate-600">
        Visual regression tests take <strong>screenshots</strong> of your pages and compare them pixel-by-pixel against a baseline. If a CSS change shifts a button 2 pixels or changes a color, the test catches it. Tools like Playwright's <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">toHaveScreenshot()</code> make this easy.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Visual regression with Playwright</span>
<span class="kw">await</span> <span class="fn">expect</span>(<span class="var">page</span>).<span class="fn">toHaveScreenshot</span>(<span class="str">'homepage.png'</span>);
<span class="cmt">// First run: saves baseline screenshot</span>
<span class="cmt">// Later runs: compares against baseline, fails on diff</span>`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Accessibility Testing with axe</h3>
      <p class="text-slate-600">
        Integrate accessibility audits directly into E2E tests. The <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">@axe-core/playwright</code> package scans pages for WCAG violations — missing alt text, poor contrast, missing labels, and more.
      </p>
      <pre class="code-block"><code>{@html `<span class="kw">import</span> <span class="var">AxeBuilder</span> <span class="kw">from</span> <span class="str">'@axe-core/playwright'</span>;

<span class="fn">test</span>(<span class="str">'homepage has no a11y violations'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">goto</span>(<span class="str">'/'</span>);
  <span class="kw">const</span> <span class="var">results</span> <span class="op">=</span> <span class="kw">await new</span> <span class="fn">AxeBuilder</span>({ <span class="var">page</span> }).<span class="fn">analyze</span>();
  <span class="fn">expect</span>(<span class="var">results</span>.<span class="var">violations</span>).<span class="fn">toEqual</span>([]);
});`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Mobile Viewport Testing</h3>
      <p class="text-slate-600">
        Test how your app looks and behaves on different screen sizes by configuring device emulation. Playwright has built-in device descriptors.
      </p>
      <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">devices</span> } <span class="kw">from</span> <span class="str">'@playwright/test'</span>;

<span class="cmt">// In playwright.config.ts</span>
<span class="var">projects</span>: [
  { <span class="var">name</span>: <span class="str">'Desktop Chrome'</span>, <span class="var">use</span>: { ...<span class="var">devices</span>[<span class="str">'Desktop Chrome'</span>] } },
  { <span class="var">name</span>: <span class="str">'Mobile Safari'</span>, <span class="var">use</span>: { ...<span class="var">devices</span>[<span class="str">'iPhone 13'</span>] } },
  { <span class="var">name</span>: <span class="str">'Tablet'</span>, <span class="var">use</span>: { ...<span class="var">devices</span>[<span class="str">'iPad Mini'</span>] } },
]`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Network Interception</h3>
      <p class="text-slate-600">
        Intercept and mock API responses to test edge cases (errors, slow responses, empty data) without needing a real backend.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Mock an API response</span>
<span class="kw">await</span> <span class="var">page</span>.<span class="fn">route</span>(<span class="str">'**/api/users'</span>, (<span class="arg">route</span>) <span class="op">=></span> {
  <span class="var">route</span>.<span class="fn">fulfill</span>({
    <span class="var">status</span>: <span class="num">200</span>,
    <span class="var">body</span>: <span class="fn">JSON</span>.<span class="fn">stringify</span>([{ <span class="var">name</span>: <span class="str">'Alice'</span> }])
  });
});

<span class="cmt">// Test error state</span>
<span class="kw">await</span> <span class="var">page</span>.<span class="fn">route</span>(<span class="str">'**/api/users'</span>, (<span class="arg">route</span>) <span class="op">=></span> {
  <span class="var">route</span>.<span class="fn">fulfill</span>({ <span class="var">status</span>: <span class="num">500</span> });
});`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Dealing with Flaky Tests</h3>
      <p class="text-slate-600">
        Flaky tests pass sometimes and fail sometimes without any code change. They erode trust in your test suite. Common causes and fixes:
      </p>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>Timing issues:</strong> Use Playwright's auto-waiting instead of <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">sleep()</code>. Wait for specific elements, not arbitrary time.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>Shared state:</strong> Each test should start with a clean slate. Use test isolation (fresh browser context).</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>Animation/transitions:</strong> Disable CSS animations in test mode or wait for them to complete.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>Retries:</strong> Configure automatic retries as a safety net, but always investigate root causes.</span>
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Page Object Model (POM)</h3>
      <p class="text-slate-600">
        The Page Object Model is a design pattern that organizes your E2E selectors and actions into reusable classes. Instead of scattering <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">page.click('#login-btn')</code> everywhere, you create a <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">LoginPage</code> object with methods like <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">login(email, password)</code>.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// page-objects/LoginPage.ts</span>
<span class="kw">class</span> <span class="fn">LoginPage</span> {
  <span class="fn">constructor</span>(<span class="kw">private</span> <span class="arg">page</span>: <span class="var">Page</span>) {}

  <span class="kw">async</span> <span class="fn">login</span>(<span class="arg">email</span>: <span class="var">string</span>, <span class="arg">password</span>: <span class="var">string</span>) {
    <span class="kw">await</span> <span class="kw">this</span>.<span class="var">page</span>.<span class="fn">fill</span>(<span class="str">'[data-testid="email"]'</span>, <span class="var">email</span>);
    <span class="kw">await</span> <span class="kw">this</span>.<span class="var">page</span>.<span class="fn">fill</span>(<span class="str">'[data-testid="password"]'</span>, <span class="var">password</span>);
    <span class="kw">await</span> <span class="kw">this</span>.<span class="var">page</span>.<span class="fn">click</span>(<span class="str">'[data-testid="submit"]'</span>);
  }
}

<span class="cmt">// In your test — clean and readable</span>
<span class="kw">const</span> <span class="var">loginPage</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">LoginPage</span>(<span class="var">page</span>);
<span class="kw">await</span> <span class="var">loginPage</span>.<span class="fn">login</span>(<span class="str">'alice@test.com'</span>, <span class="str">'secret'</span>);`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">CI Integration &amp; Parallelization</h3>
      <p class="text-slate-600">
        Run E2E tests in your CI pipeline on every pull request. Use parallelization (sharding) to split tests across multiple machines and cut run time dramatically.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt"># GitHub Actions — run E2E in parallel shards</span>
<span class="var">strategy</span>:
  <span class="var">matrix</span>:
    <span class="var">shard</span>: [<span class="num">1</span>/<span class="num">4</span>, <span class="num">2</span>/<span class="num">4</span>, <span class="num">3</span>/<span class="num">4</span>, <span class="num">4</span>/<span class="num">4</span>]
<span class="var">steps</span>:
  - <span class="var">run</span>: npx playwright test <span class="op">--</span>shard=\${{ matrix.shard }}`}</code></pre>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
      >
        I understand E2E testing
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
