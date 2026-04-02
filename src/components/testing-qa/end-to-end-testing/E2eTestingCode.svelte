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
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Code: Playwright Test Examples</h2>
    <p class="text-slate-600">Real E2E tests using <strong>Playwright</strong>. Each test launches a browser, interacts with your app, and verifies the result.</p>
  </div>

  <!-- Navigation and clicking -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Navigation and Clicking</h3>
    <p class="text-sm text-slate-600">Navigate to pages, click links and buttons, and verify the URL changes.</p>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">test</span>, <span class="var">expect</span> } <span class="kw">from</span> <span class="str">'@playwright/test'</span>;

<span class="fn">test</span>(<span class="str">'navigate to about page'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
  <span class="cmt">// Go to the homepage</span>
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">goto</span>(<span class="str">'/'</span>);

  <span class="cmt">// Click the "About" link in the navigation</span>
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">click</span>(<span class="str">'a[href="/about"]'</span>);

  <span class="cmt">// Verify we landed on the about page</span>
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">page</span>).<span class="fn">toHaveURL</span>(<span class="str">'/about'</span>);
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">page</span>).<span class="fn">toHaveTitle</span>(<span class="str">'About Us'</span>);

  <span class="cmt">// Verify content is visible</span>
  <span class="kw">await</span> <span class="fn">expect</span>(
    <span class="var">page</span>.<span class="fn">getByRole</span>(<span class="str">'heading'</span>, { <span class="var">name</span>: <span class="str">'About Us'</span> })
  ).<span class="fn">toBeVisible</span>();
});`}</code></pre>
  </div>

  <!-- Form filling and submission -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Form Filling and Submission</h3>
    <p class="text-sm text-slate-600">Fill in form fields, submit the form, and verify the result.</p>
    <pre class="code-block"><code>{@html `<span class="fn">test</span>(<span class="str">'submit a contact form'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">goto</span>(<span class="str">'/contact'</span>);

  <span class="cmt">// Fill in form fields</span>
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">fill</span>(<span class="str">'input[name="name"]'</span>, <span class="str">'Alice'</span>);
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">fill</span>(<span class="str">'input[name="email"]'</span>, <span class="str">'alice@example.com'</span>);
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">fill</span>(<span class="str">'textarea[name="message"]'</span>, <span class="str">'Hello!'</span>);

  <span class="cmt">// Submit the form</span>
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">click</span>(<span class="str">'button[type="submit"]'</span>);

  <span class="cmt">// Verify success message</span>
  <span class="kw">await</span> <span class="fn">expect</span>(
    <span class="var">page</span>.<span class="fn">getByText</span>(<span class="str">'Message sent!'</span>)
  ).<span class="fn">toBeVisible</span>();
});`}</code></pre>
  </div>

  <!-- Assertions on page content -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Assertions on Page Content</h3>
    <p class="text-sm text-slate-600">Check that text, elements, and page state are what you expect.</p>
    <pre class="code-block"><code>{@html `<span class="fn">test</span>(<span class="str">'dashboard shows user data'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">goto</span>(<span class="str">'/dashboard'</span>);

  <span class="cmt">// Check text content</span>
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">page</span>.<span class="fn">getByText</span>(<span class="str">'Welcome back'</span>)).<span class="fn">toBeVisible</span>();

  <span class="cmt">// Check an element has specific text</span>
  <span class="kw">const</span> <span class="var">stats</span> <span class="op">=</span> <span class="var">page</span>.<span class="fn">locator</span>(<span class="str">'[data-testid="stats"]'</span>);
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">stats</span>).<span class="fn">toContainText</span>(<span class="str">'3 projects'</span>);

  <span class="cmt">// Check element count</span>
  <span class="kw">const</span> <span class="var">cards</span> <span class="op">=</span> <span class="var">page</span>.<span class="fn">locator</span>(<span class="str">'.project-card'</span>);
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">cards</span>).<span class="fn">toHaveCount</span>(<span class="num">3</span>);

  <span class="cmt">// Check that an element is hidden</span>
  <span class="kw">await</span> <span class="fn">expect</span>(
    <span class="var">page</span>.<span class="fn">locator</span>(<span class="str">'.error-banner'</span>)
  ).<span class="fn">toBeHidden</span>();
});`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h4 class="mb-2 font-bold text-slate-800">Key Playwright Methods</h4>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><code class="rounded bg-slate-100 px-1 text-sm text-purple-700">page.goto(url)</code> -- Navigate to a URL</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><code class="rounded bg-slate-100 px-1 text-sm text-purple-700">page.click(selector)</code> -- Click an element</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><code class="rounded bg-slate-100 px-1 text-sm text-purple-700">page.fill(selector, value)</code> -- Type into an input</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><code class="rounded bg-slate-100 px-1 text-sm text-purple-700">expect(locator).toBeVisible()</code> -- Assert an element is visible</span>
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      I've studied the code examples
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-3 text-2xl font-bold text-slate-800">Code: Advanced E2E Patterns</h2>
      <p class="text-slate-600">Professional E2E patterns used in production codebases.</p>
    </div>

    <!-- Page Object Model -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Page Object Model Implementation</h3>
      <p class="text-sm text-slate-600">Encapsulate page interactions into reusable classes. When the UI changes, you update one place instead of every test.</p>
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

<span class="cmt">// In your test -- clean and readable</span>
<span class="fn">test</span>(<span class="str">'login works'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
  <span class="kw">const</span> <span class="var">loginPage</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">LoginPage</span>(<span class="var">page</span>);
  <span class="kw">await</span> <span class="var">loginPage</span>.<span class="fn">goto</span>();
  <span class="kw">await</span> <span class="var">loginPage</span>.<span class="fn">login</span>(<span class="str">'alice@test.com'</span>, <span class="str">'secret'</span>);
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">page</span>).<span class="fn">toHaveURL</span>(<span class="str">'/dashboard'</span>);
});`}</code></pre>
    </div>

    <!-- Network request interception -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Network Request Interception</h3>
      <p class="text-sm text-slate-600">Intercept and mock API calls to test edge cases without a real backend.</p>
      <pre class="code-block"><code>{@html `<span class="fn">test</span>(<span class="str">'shows products from mocked API'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
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

<span class="fn">test</span>(<span class="str">'shows error on API failure'</span>, <span class="kw">async</span> ({ <span class="arg">page</span> }) <span class="op">=></span> {
  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">route</span>(<span class="str">'**/api/products'</span>, (<span class="arg">route</span>) <span class="op">=></span> {
    <span class="var">route</span>.<span class="fn">fulfill</span>({ <span class="var">status</span>: <span class="num">500</span> });
  });

  <span class="kw">await</span> <span class="var">page</span>.<span class="fn">goto</span>(<span class="str">'/products'</span>);
  <span class="kw">await</span> <span class="fn">expect</span>(<span class="var">page</span>.<span class="fn">getByText</span>(<span class="str">'Something went wrong'</span>)).<span class="fn">toBeVisible</span>();
});`}</code></pre>
    </div>

    <!-- Visual comparison tests -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Visual Comparison Tests</h3>
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
});

<span class="cmt">// First run: saves baseline screenshots</span>
<span class="cmt">// Later runs: compares against baseline, fails on diff</span>
<span class="cmt">// Run \`npx playwright test --update-snapshots\` to update</span>`}</code></pre>
    </div>

    <!-- Test fixtures and hooks -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Test Fixtures and Hooks</h3>
      <p class="text-sm text-slate-600">Use fixtures to share setup logic across tests. Hooks run before/after each test.</p>
      <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">test</span> <span class="kw">as</span> <span class="var">base</span>, <span class="var">expect</span> } <span class="kw">from</span> <span class="str">'@playwright/test'</span>;
<span class="kw">import</span> { <span class="fn">LoginPage</span> } <span class="kw">from</span> <span class="str">'./page-objects/LoginPage'</span>;

<span class="cmt">// Create a custom fixture that provides a logged-in page</span>
<span class="kw">const</span> <span class="var">test</span> <span class="op">=</span> <span class="var">base</span>.<span class="fn">extend</span>&lt;{
  <span class="var">loggedInPage</span>: <span class="var">Page</span>;
}&gt;({
  <span class="var">loggedInPage</span>: <span class="kw">async</span> ({ <span class="arg">page</span> }, <span class="arg">use</span>) <span class="op">=></span> {
    <span class="cmt">// Setup: log in before test</span>
    <span class="kw">const</span> <span class="var">loginPage</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">LoginPage</span>(<span class="var">page</span>);
    <span class="kw">await</span> <span class="var">loginPage</span>.<span class="fn">goto</span>();
    <span class="kw">await</span> <span class="var">loginPage</span>.<span class="fn">login</span>(<span class="str">'test@test.com'</span>, <span class="str">'password'</span>);

    <span class="cmt">// Give the logged-in page to the test</span>
    <span class="kw">await</span> <span class="fn">use</span>(<span class="var">page</span>);

    <span class="cmt">// Teardown: runs after test (optional)</span>
  },
});

<span class="cmt">// Tests that need login use loggedInPage fixture</span>
<span class="fn">test</span>(<span class="str">'can view profile'</span>, <span class="kw">async</span> ({ <span class="arg">loggedInPage</span> }) <span class="op">=></span> {
  <span class="kw">await</span> <span class="var">loggedInPage</span>.<span class="fn">goto</span>(<span class="str">'/profile'</span>);
  <span class="kw">await</span> <span class="fn">expect</span>(
    <span class="var">loggedInPage</span>.<span class="fn">getByText</span>(<span class="str">'My Profile'</span>)
  ).<span class="fn">toBeVisible</span>();
});

<span class="fn">test</span>(<span class="str">'can edit settings'</span>, <span class="kw">async</span> ({ <span class="arg">loggedInPage</span> }) <span class="op">=></span> {
  <span class="kw">await</span> <span class="var">loggedInPage</span>.<span class="fn">goto</span>(<span class="str">'/settings'</span>);
  <span class="kw">await</span> <span class="fn">expect</span>(
    <span class="var">loggedInPage</span>.<span class="fn">getByText</span>(<span class="str">'Account Settings'</span>)
  ).<span class="fn">toBeVisible</span>();
});`}</code></pre>
    </div>

    <!-- Config -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Parallel Execution Config</h3>
      <p class="text-sm text-slate-600">Configure Playwright to run tests across multiple workers and browsers.</p>
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

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
      >
        I've studied the advanced examples
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
