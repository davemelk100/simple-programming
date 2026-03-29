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
    <h2 class="mb-3 text-2xl font-bold text-slate-800">E2E Testing in Code</h2>
    <p class="text-slate-600">Here is how real E2E tests look using <strong>Playwright</strong>. Each test launches a browser, interacts with your app, and verifies the result.</p>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Basic Navigation &amp; Assertions</h3>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">test</span>, <span class="var">expect</span> } <span class="kw">from</span> <span class="str">'@playwright/test'</span>;

<span class="fn">test</span>(<span class="str">'homepage has the correct title'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
  <span class="cmt">// Navigate to the homepage</span>
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">goto</span>(<span class="str">'/'</span>);

  <span class="cmt">// Check the page title</span>
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">page</span>).<span class="fn">toHaveTitle</span>(<span class="str">'My App'</span>);

  <span class="cmt">// Check that a heading is visible</span>
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">page</span>.<span class="fn">getByRole</span>(<span class="str">'heading'</span>, { <span class="var">name</span>: <span class="str">'Welcome'</span> })).<span class="fn">toBeVisible</span>();
});`}</code></pre>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Clicking &amp; Filling Forms</h3>
    <pre class="code-block"><code>{@html `<span class="fn">test</span>(<span class="str">'user can fill and submit a form'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">goto</span>(<span class="str">'/contact'</span>);

  <span class="cmt">// Fill in form fields</span>
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">fill</span>(<span class="str">'input[name="name"]'</span>, <span class="str">'Alice'</span>);
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">fill</span>(<span class="str">'input[name="email"]'</span>, <span class="str">'alice@example.com'</span>);
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">fill</span>(<span class="str">'textarea[name="message"]'</span>, <span class="str">'Hello!'</span>);

  <span class="cmt">// Click the submit button</span>
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">click</span>(<span class="str">'button[type="submit"]'</span>);

  <span class="cmt">// Verify success message appears</span>
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">page</span>.<span class="fn">getByText</span>(<span class="str">'Message sent!'</span>)).<span class="fn">toBeVisible</span>();
});`}</code></pre>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Login Flow Test</h3>
    <pre class="code-block"><code>{@html `<span class="fn">test</span>(<span class="str">'user can log in and see dashboard'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
  <span class="cmt">// Go to login page</span>
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">goto</span>(<span class="str">'/login'</span>);

  <span class="cmt">// Enter credentials</span>
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">fill</span>(<span class="str">'[data-testid="email"]'</span>, <span class="str">'user@example.com'</span>);
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">fill</span>(<span class="str">'[data-testid="password"]'</span>, <span class="str">'secret123'</span>);

  <span class="cmt">// Submit the form</span>
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">click</span>(<span class="str">'[data-testid="login-button"]'</span>);

  <span class="cmt">// Verify we're redirected to the dashboard</span>
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">page</span>).<span class="fn">toHaveURL</span>(<span class="str">'/dashboard'</span>);

  <span class="cmt">// Verify the user's name appears</span>
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">page</span>.<span class="fn">getByText</span>(<span class="str">'Welcome, Alice'</span>)).<span class="fn">toBeVisible</span>();
});`}</code></pre>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Taking Screenshots</h3>
    <pre class="code-block"><code>{@html `<span class="fn">test</span>(<span class="str">'capture the about page'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">goto</span>(<span class="str">'/about'</span>);

  <span class="cmt">// Save a full-page screenshot</span>
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">screenshot</span>({ <span class="var">path</span>: <span class="str">'about.png'</span>, <span class="var">fullPage</span>: <span class="kw">true</span> });

  <span class="cmt">// Screenshot a specific element</span>
  <span class="kw">const</span> <span class="var">hero</span> <span class="op">=</span> <span class="var">page</span>.<span class="fn">locator</span>(<span class="str">'.hero-section'</span>);
  <span class="kw">await</span> <span class="var">hero</span>.<span class="fn">screenshot</span>({ <span class="var">path</span>: <span class="str">'hero.png'</span> });
});`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h4 class="mb-2 font-bold text-slate-800">Key Playwright Methods</h4>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><code class="rounded bg-slate-100 px-1 text-sm text-purple-700">page.goto(url)</code> — Navigate to a URL</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><code class="rounded bg-slate-100 px-1 text-sm text-purple-700">page.click(selector)</code> — Click an element</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><code class="rounded bg-slate-100 px-1 text-sm text-purple-700">page.fill(selector, value)</code> — Type into an input</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><code class="rounded bg-slate-100 px-1 text-sm text-purple-700">expect(page).toHaveURL(url)</code> — Assert the current URL</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><code class="rounded bg-slate-100 px-1 text-sm text-purple-700">expect(locator).toBeVisible()</code> — Assert an element is visible</span>
      </li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">E2E Testing Patterns (Advanced)</h2>
    <p class="text-slate-600">Professional E2E patterns used in production codebases.</p>
  </div>

  <!-- Page Object Model -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Page Object Model</h3>
    <p class="text-sm text-slate-600">Encapsulate page interactions into reusable classes. When the UI changes, you update one place instead of dozens of tests.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// page-objects/LoginPage.ts</span>
<span class="kw">import</span> { <span class="var">type Page</span>, <span class="var">type Locator</span> } <span class="kw">from</span> <span class="str">'@playwright/test'</span>;

<span class="kw">export class</span> <span class="fn">LoginPage</span> {
  <span class="kw">private</span> <span class="var">emailInput</span>: <span class="var">Locator</span>;
  <span class="kw">private</span> <span class="var">passwordInput</span>: <span class="var">Locator</span>;
  <span class="kw">private</span> <span class="var">submitButton</span>: <span class="var">Locator</span>;

  <span class="fn">constructor</span>(<span class="kw">private</span> <span class="arg">page</span>: <span class="var">Page</span>) {
    <span class="kw">this</span>.<span class="var">emailInput</span> <span class="op">=</span> <span class="var">page</span>.<span class="fn">getByLabel</span>(<span class="str">'Email'</span>);
    <span class="kw">this</span>.<span class="var">passwordInput</span> <span class="op">=</span> <span class="var">page</span>.<span class="fn">getByLabel</span>(<span class="str">'Password'</span>);
    <span class="kw">this</span>.<span class="var">submitButton</span> <span class="op">=</span> <span class="var">page</span>.<span class="fn">getByRole</span>(<span class="str">'button'</span>, { <span class="var">name</span>: <span class="str">'Log In'</span> });
  }

  <span class="kw">async</span> <span class="fn">goto</span>() {
    <span class="kw">await</span> <span class="kw">this</span>.<span class="var">page</span>.<span class="fn">goto</span>(<span class="str">'/login'</span>);
  }

  <span class="kw">async</span> <span class="fn">login</span>(<span class="arg">email</span>: <span class="var">string</span>, <span class="arg">password</span>: <span class="var">string</span>) {
    <span class="kw">await</span> <span class="kw">this</span>.<span class="var">emailInput</span>.<span class="fn">fill</span>(<span class="var">email</span>);
    <span class="kw">await</span> <span class="kw">this</span>.<span class="var">passwordInput</span>.<span class="fn">fill</span>(<span class="var">password</span>);
    <span class="kw">await</span> <span class="kw">this</span>.<span class="var">submitButton</span>.<span class="fn">click</span>();
  }
}

<span class="cmt">// In a test — clean and readable</span>
<span class="fn">test</span>(<span class="str">'login works'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
  <span class="kw">const</span> <span class="var">loginPage</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">LoginPage</span>(<span class="var">page</span>);
  <span class="kw">await</span> <span class="var">loginPage</span>.<span class="fn">goto</span>();
  <span class="kw">await</span> <span class="var">loginPage</span>.<span class="fn">login</span>(<span class="str">'alice@test.com'</span>, <span class="str">'secret'</span>);
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">page</span>).<span class="fn">toHaveURL</span>(<span class="str">'/dashboard'</span>);
});`}</code></pre>
  </div>

  <!-- Visual Comparison -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Visual Comparison</h3>
    <p class="text-sm text-slate-600">Catch pixel-level regressions by comparing screenshots against baselines.</p>
    <pre class="code-block"><code>{@html `<span class="fn">test</span>(<span class="str">'homepage matches visual snapshot'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">goto</span>(<span class="str">'/'</span>);

  <span class="cmt">// Compare full page against baseline</span>
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">page</span>).<span class="fn">toHaveScreenshot</span>(<span class="str">'homepage.png'</span>, {
    <span class="var">maxDiffPixelRatio</span>: <span class="num">0.01</span>,  <span class="cmt">// Allow 1% pixel diff</span>
  });

  <span class="cmt">// Compare a specific component</span>
  <span class="kw">const</span> <span class="var">nav</span> <span class="op">=</span> <span class="var">page</span>.<span class="fn">locator</span>(<span class="str">'nav'</span>);
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">nav</span>).<span class="fn">toHaveScreenshot</span>(<span class="str">'navbar.png'</span>);
});`}</code></pre>
  </div>

  <!-- Accessibility Audit -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Accessibility Audit</h3>
    <p class="text-sm text-slate-600">Automatically check every page for WCAG violations using axe-core.</p>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> <span class="var">AxeBuilder</span> <span class="kw">from</span> <span class="str">'@axe-core/playwright'</span>;

<span class="fn">test</span>(<span class="str">'page has no accessibility violations'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">goto</span>(<span class="str">'/signup'</span>);

  <span class="kw">const</span> <span class="var">results</span> <span class="op">=</span> <span class="kw">await new</span> <span class="fn">AxeBuilder</span>({ <span class="var">page</span> })
    .<span class="fn">withTags</span>([<span class="str">'wcag2a'</span>, <span class="str">'wcag2aa'</span>])
    .<span class="fn">analyze</span>();

  <span class="fn">expect</span>(<span class="var">results</span>.<span class="var">violations</span>).<span class="fn">toEqual</span>([]);
});`}</code></pre>
  </div>

  <!-- Network Mocking -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Network Mocking</h3>
    <p class="text-sm text-slate-600">Intercept API calls to test various server responses without a real backend.</p>
    <pre class="code-block"><code>{@html `<span class="fn">test</span>(<span class="str">'shows products from API'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
  <span class="cmt">// Intercept the API and return mock data</span>
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">route</span>(<span class="str">'**/api/products'</span>, (<span class="arg">route</span>) <span class="op">=></span> {
    <span class="var">route</span>.<span class="fn">fulfill</span>({
      <span class="var">status</span>: <span class="num">200</span>,
      <span class="var">contentType</span>: <span class="str">'application/json'</span>,
      <span class="var">body</span>: <span class="fn">JSON</span>.<span class="fn">stringify</span>([
        { <span class="var">id</span>: <span class="num">1</span>, <span class="var">name</span>: <span class="str">'Laptop'</span>, <span class="var">price</span>: <span class="num">999</span> },
        { <span class="var">id</span>: <span class="num">2</span>, <span class="var">name</span>: <span class="str">'Phone'</span>, <span class="var">price</span>: <span class="num">699</span> },
      ]),
    });
  });

  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">goto</span>(<span class="str">'/products'</span>);
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">page</span>.<span class="fn">getByText</span>(<span class="str">'Laptop'</span>)).<span class="fn">toBeVisible</span>();
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">page</span>.<span class="fn">getByText</span>(<span class="str">'Phone'</span>)).<span class="fn">toBeVisible</span>();
});

<span class="fn">test</span>(<span class="str">'shows error state on API failure'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">route</span>(<span class="str">'**/api/products'</span>, (<span class="arg">route</span>) <span class="op">=></span> {
    <span class="var">route</span>.<span class="fn">fulfill</span>({ <span class="var">status</span>: <span class="num">500</span> });
  });

  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">goto</span>(<span class="str">'/products'</span>);
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">page</span>.<span class="fn">getByText</span>(<span class="str">'Something went wrong'</span>)).<span class="fn">toBeVisible</span>();
});`}</code></pre>
  </div>

  <!-- Parallel Execution Config -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Parallel Execution Config</h3>
    <p class="text-sm text-slate-600">Configure Playwright to run tests across multiple workers and browsers simultaneously.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// playwright.config.ts</span>
<span class="kw">import</span> { <span class="fn">defineConfig</span>, <span class="var">devices</span> } <span class="kw">from</span> <span class="str">'@playwright/test'</span>;

<span class="kw">export default</span> <span class="fn">defineConfig</span>({
  <span class="var">testDir</span>: <span class="str">'./e2e'</span>,
  <span class="var">fullyParallel</span>: <span class="kw">true</span>,       <span class="cmt">// Run tests in parallel</span>
  <span class="var">workers</span>: <span class="num">4</span>,                 <span class="cmt">// Number of parallel workers</span>
  <span class="var">retries</span>: <span class="num">2</span>,                 <span class="cmt">// Retry failed tests</span>
  <span class="var">reporter</span>: <span class="str">'html'</span>,            <span class="cmt">// Generate HTML report</span>

  <span class="var">projects</span>: [
    { <span class="var">name</span>: <span class="str">'chromium'</span>, <span class="var">use</span>: { ...<span class="var">devices</span>[<span class="str">'Desktop Chrome'</span>] } },
    { <span class="var">name</span>: <span class="str">'firefox'</span>,  <span class="var">use</span>: { ...<span class="var">devices</span>[<span class="str">'Desktop Firefox'</span>] } },
    { <span class="var">name</span>: <span class="str">'webkit'</span>,   <span class="var">use</span>: { ...<span class="var">devices</span>[<span class="str">'Desktop Safari'</span>] } },
    { <span class="var">name</span>: <span class="str">'mobile'</span>,   <span class="var">use</span>: { ...<span class="var">devices</span>[<span class="str">'iPhone 13'</span>] } },
  ],
});`}</code></pre>
  </div>

  <!-- CI Workflow -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">CI Workflow for E2E</h3>
    <p class="text-sm text-slate-600">A GitHub Actions workflow that runs Playwright tests on every pull request.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># .github/workflows/e2e.yml</span>
<span class="var">name</span>: E2E Tests
<span class="var">on</span>: [pull_request]

<span class="var">jobs</span>:
  <span class="var">e2e</span>:
    <span class="var">runs-on</span>: ubuntu-latest
    <span class="var">strategy</span>:
      <span class="var">matrix</span>:
        <span class="var">shard</span>: [<span class="num">1</span>/<span class="num">4</span>, <span class="num">2</span>/<span class="num">4</span>, <span class="num">3</span>/<span class="num">4</span>, <span class="num">4</span>/<span class="num">4</span>]
    <span class="var">steps</span>:
      - <span class="var">uses</span>: actions/checkout@v4
      - <span class="var">uses</span>: actions/setup-node@v4
      - <span class="var">run</span>: npm ci
      - <span class="var">run</span>: npx playwright install --with-deps
      - <span class="var">run</span>: npx playwright test --shard=\${{ matrix.shard }}
      - <span class="var">uses</span>: actions/upload-artifact@v4
        <span class="var">if</span>: failure()
        <span class="var">with</span>:
          <span class="var">name</span>: playwright-report-\${{ matrix.shard }}
          <span class="var">path</span>: playwright-report/`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
      Got it
    </button>
  </div>
</div>
{/if}

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
