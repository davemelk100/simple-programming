<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleSections = $state(0);
  onMount(() => {
    const interval = setInterval(() => {
      if (visibleSections < 4) visibleSections++;
      else clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <p class="text-slate-600">
      End-to-end (E2E) testing means <strong>simulating a real user</strong> clicking through your app. Think of it as a <strong>robot using your website</strong> -- it opens a browser, navigates pages, fills in forms, clicks buttons, and checks that everything works the way a real person would expect. If anything breaks along the way, the test fails and tells you exactly where.
    </p>
  </div>

  <div class="space-y-4 transition-all duration-700 {visibleSections >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
    <h3 class="text-lg font-bold text-slate-800">The Testing Pyramid</h3>
    <p class="text-slate-600">
      Not all tests are created equal. The <strong>testing pyramid</strong> shows how many of each type you should write:
    </p>
    <div class="flex flex-col items-center gap-2">
      <div class="flex w-32 items-center justify-center rounded-lg border-2 border-red-200 bg-red-50 py-3 text-center">
        <div>
          <p class="text-sm font-bold text-red-700">E2E</p>
          <p class="text-xs text-slate-500">Few</p>
        </div>
      </div>
      <div class="flex w-52 items-center justify-center rounded-lg border-2 border-yellow-200 bg-yellow-50 py-3 text-center">
        <div>
          <p class="text-sm font-bold text-yellow-700">Integration</p>
          <p class="text-xs text-slate-500">Some</p>
        </div>
      </div>
      <div class="flex w-72 items-center justify-center rounded-lg border-2 border-green-200 bg-green-50 py-3 text-center">
        <div>
          <p class="text-sm font-bold text-green-700">Unit</p>
          <p class="text-xs text-slate-500">Many</p>
        </div>
      </div>
    </div>
    <p class="text-sm text-slate-500 text-center">E2E tests sit at the top: slowest but highest confidence. Unit tests form the base: fastest but narrowest scope.</p>
  </div>

  <div class="space-y-4 transition-all duration-700 {visibleSections >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
    <h3 class="text-lg font-bold text-slate-800">What Do E2E Tests Check?</h3>
    <p class="text-slate-600">
      E2E tests focus on <strong>critical user flows</strong> -- the journeys that matter most to your business:
    </p>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><strong>Login flows:</strong> Can users sign in and reach their dashboard?</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><strong>Checkout processes:</strong> Can a customer add items to the cart and complete a purchase?</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><strong>Form submissions:</strong> Does the contact form actually send a message and show confirmation?</span>
      </li>
    </ul>
  </div>

  <div class="space-y-4 transition-all duration-700 {visibleSections >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
    <h3 class="text-lg font-bold text-slate-800">Popular E2E Testing Tools</h3>
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
        <h4 class="mb-1 font-bold text-purple-700">Playwright</h4>
        <p class="text-sm text-slate-600">Made by Microsoft. Tests Chrome, Firefox, and Safari. Fast, reliable, and the modern choice for most teams.</p>
      </div>
      <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
        <h4 class="mb-1 font-bold text-purple-700">Cypress</h4>
        <p class="text-sm text-slate-600">Developer-friendly with a beautiful UI. Runs inside the browser for easy debugging. Great for single-page apps.</p>
      </div>
      <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
        <h4 class="mb-1 font-bold text-purple-700">Selenium</h4>
        <p class="text-sm text-slate-600">The original browser automation tool. Supports many languages and browsers. Still widely used in enterprise.</p>
      </div>
      <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
        <h4 class="mb-1 font-bold text-purple-700">WebdriverIO</h4>
        <p class="text-sm text-slate-600">Built on WebDriver protocol. Works for both web and mobile testing. Flexible and extensible.</p>
      </div>
    </div>
  </div>

  <div class="transition-all duration-700 {visibleSections >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
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
      <p class="text-slate-600">Professional patterns and strategies for robust E2E test suites.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Page Object Model Pattern</h3>
      <p class="text-slate-600">
        The Page Object Model (POM) encapsulates page interactions into <strong>reusable classes</strong>. Instead of scattering selectors across dozens of tests, you create one class per page with methods like <code class="rounded bg-slate-100 px-1 text-purple-700">login(email, password)</code>. When the UI changes, you update one place instead of every test.
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

<span class="cmt">// In your test -- clean and readable</span>
<span class="kw">const</span> <span class="var">loginPage</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">LoginPage</span>(<span class="var">page</span>);
<span class="kw">await</span> <span class="var">loginPage</span>.<span class="fn">login</span>(<span class="str">'alice@test.com'</span>, <span class="str">'secret'</span>);`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Handling Flaky Tests</h3>
      <p class="text-slate-600">
        A <strong>flaky test</strong> passes sometimes and fails sometimes without any code change. Flaky tests erode trust in your entire test suite. Common causes and fixes:
      </p>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>Timing issues:</strong> Use auto-waiting (Playwright does this by default) instead of <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">sleep()</code>.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>Shared state:</strong> Each test should start fresh. Use isolated browser contexts.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>Animations:</strong> Disable CSS animations in test mode or wait for them to complete.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>Retries:</strong> Configure automatic retries as a safety net, but always investigate root causes.</span>
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Visual Regression Testing</h3>
      <p class="text-slate-600">
        Visual regression tests take <strong>screenshots</strong> of your pages and compare them pixel-by-pixel against a baseline. If a CSS change shifts a button or changes a color, the test catches it. Playwright's <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">toHaveScreenshot()</code> makes this easy to set up.
      </p>
      <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
        <p class="text-sm text-slate-600">First run saves the baseline screenshot. Every subsequent run compares against it. If the diff exceeds the threshold, the test fails and shows you exactly which pixels changed.</p>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">CI/CD Integration for E2E Tests</h3>
      <p class="text-slate-600">
        Run E2E tests automatically on every pull request in your CI pipeline. This catches regressions before they reach production. Key practices:
      </p>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>Install browsers:</strong> Use <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">npx playwright install --with-deps</code> in CI.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>Upload artifacts:</strong> Save screenshots and traces on failure for debugging.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>Use containers:</strong> Run tests in Docker for consistent environments.</span>
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Parallel Test Execution</h3>
      <p class="text-slate-600">
        E2E tests are slow individually, but you can run them in <strong>parallel</strong> to dramatically reduce total execution time. Playwright supports parallelism natively with workers, and CI systems can shard tests across multiple machines.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt"># GitHub Actions -- run E2E in parallel shards</span>
<span class="var">strategy</span>:
  <span class="var">matrix</span>:
    <span class="var">shard</span>: [<span class="num">1</span>/<span class="num">4</span>, <span class="num">2</span>/<span class="num">4</span>, <span class="num">3</span>/<span class="num">4</span>, <span class="num">4</span>/<span class="num">4</span>]
<span class="var">steps</span>:
  - <span class="var">run</span>: npx playwright test <span class="op">--</span>shard=\${{ matrix.shard }}`}</code></pre>
      <p class="text-sm text-slate-500">With 4 shards, a 20-minute test suite can finish in about 5 minutes.</p>
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
