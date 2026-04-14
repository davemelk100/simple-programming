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

  let visibleCards = $state(0);

  const cards = [
    { emoji: '🐛', title: 'Catch Bugs Early', desc: 'Tests find mistakes the moment you make them, not weeks later when a user complains.' },
    { emoji: '🛡️', title: 'Change Confidently', desc: 'When you modify code, tests tell you instantly if you accidentally broke something.' },
    { emoji: '📖', title: 'Document Behavior', desc: 'Tests show exactly what your code is supposed to do — like living documentation.' },
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
    <p class="text-slate-600">
      Think of testing like a <strong>spell-checker</strong> for your code. Just as a spell-checker catches typos before you send an email, tests catch bugs before anyone else sees them. You write small checks that verify your code does what you expect — and those checks run automatically every time you make a change.
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
    <h3 class="text-lg font-bold text-slate-800">What Is an Assertion?</h3>
    <p class="text-slate-600">
      An <strong>assertion</strong> is the heart of every test. It says: "I expect this result to equal that value." If the actual result matches the expected value, the test <strong class="text-green-600">passes</strong>. If not, the test <strong class="text-red-600">fails</strong> — and you know something is wrong.
    </p>

    <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
      <p class="mb-3 text-sm font-semibold text-slate-500">Example: Testing an add function</p>
      <pre class="code-block"><code>{@html `<span class="cmt">// The function we want to test</span>
<span class="kw">function</span> <span class="fn">add</span>(<span class="arg">a</span>, <span class="arg">b</span>) {
  <span class="kw">return</span> <span class="var">a</span> <span class="op">+</span> <span class="var">b</span>;
}

<span class="cmt">// The test — an assertion!</span>
<span class="fn">expect</span>(<span class="fn">add</span>(<span class="num">2</span>, <span class="num">3</span>)).<span class="fn">toBe</span>(<span class="num">5</span>);  <span class="cmt">// ✅ Passes! 2 + 3 does equal 5</span>
<span class="fn">expect</span>(<span class="fn">add</span>(<span class="num">2</span>, <span class="num">3</span>)).<span class="fn">toBe</span>(<span class="num">6</span>);  <span class="cmt">// ❌ Fails! 2 + 3 is not 6</span>`}</code></pre>
    </div>

    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><strong>Expected value:</strong> What you <em>think</em> the result should be (e.g., <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">5</code>)</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><strong>Actual value:</strong> What the function <em>actually</em> returns (e.g., <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">add(2, 3)</code> returns <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">5</code>)</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span><strong>Pass or fail:</strong> If they match, the test passes. If not, it fails and tells you what went wrong.</span>
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      I understand testing
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <p class="text-slate-600">Testing strategies, methodologies, and professional practices for building reliable software.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">The Testing Pyramid</h3>
      <p class="text-slate-600">
        The testing pyramid is a strategy for balancing different types of tests. The base is wide (many cheap, fast tests) and the top is narrow (few expensive, slow tests).
      </p>

      <div class="flex flex-col items-center gap-1">
        <div class="flex w-32 items-center justify-center rounded-t-lg bg-red-100 py-3 text-center text-sm font-bold text-red-700 border-2 border-red-300">
          E2E
        </div>
        <div class="flex w-52 items-center justify-center bg-yellow-100 py-3 text-center text-sm font-bold text-yellow-700 border-2 border-t-0 border-yellow-300">
          Integration
        </div>
        <div class="flex w-72 items-center justify-center rounded-b-lg bg-green-100 py-3 text-center text-sm font-bold text-green-700 border-2 border-t-0 border-green-300">
          Unit Tests
        </div>
        <p class="mt-2 text-xs text-slate-500">Fewer, slower, more expensive at the top. More, faster, cheaper at the base.</p>
      </div>

      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>Unit tests</strong> check a single function or module in isolation. They run in milliseconds.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>Integration tests</strong> check that multiple modules work together correctly (e.g., API + database).</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
          <span><strong>End-to-end (E2E) tests</strong> simulate real user behavior in a browser or application.</span>
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Test-Driven Development (TDD)</h3>
      <p class="text-slate-600">
        TDD flips the script: you write the test <em>first</em>, then write the code to make it pass. The cycle is called <strong>Red-Green-Refactor</strong>:
      </p>

      <div class="grid gap-3 sm:grid-cols-3">
        <div class="rounded-xl border-2 border-red-200 bg-red-50 p-4 text-center">
          <div class="mb-1 text-2xl">🔴</div>
          <h4 class="font-bold text-red-700">Red</h4>
          <p class="text-sm text-slate-600">Write a failing test that describes the behavior you want.</p>
        </div>
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4 text-center">
          <div class="mb-1 text-2xl">🟢</div>
          <h4 class="font-bold text-green-700">Green</h4>
          <p class="text-sm text-slate-600">Write the minimum code to make the test pass.</p>
        </div>
        <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4 text-center">
          <div class="mb-1 text-2xl">🔵</div>
          <h4 class="font-bold text-blue-700">Refactor</h4>
          <p class="text-sm text-slate-600">Clean up the code while keeping all tests green.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Test Doubles: Mocks, Stubs, and Spies</h3>
      <p class="text-slate-600">
        When your code depends on external systems (databases, APIs, file systems), you replace them with <strong>test doubles</strong> to keep tests fast and reliable.
      </p>

      <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5 space-y-3">
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
            <span><strong>Stub:</strong> Returns a pre-configured response. "When asked for the user, always return Alice."</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
            <span><strong>Mock:</strong> A stub that also <em>verifies</em> it was called correctly. "Was <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">sendEmail()</code> called exactly once?"</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
            <span><strong>Spy:</strong> Wraps the real function and records how it was called, without changing its behavior.</span>
          </li>
        </ul>
      </div>

      <pre class="code-block"><code>{@html `<span class="cmt">// Stub example: fake database</span>
<span class="kw">const</span> <span class="var">fakeDb</span> <span class="op">=</span> {
  <span class="fn">getUser</span>: () <span class="op">=></span> ({ <span class="var">name</span>: <span class="str">"Alice"</span>, <span class="var">age</span>: <span class="num">30</span> })
};

<span class="cmt">// Mock example: verify a function was called</span>
<span class="kw">const</span> <span class="var">mockSend</span> <span class="op">=</span> <span class="var">vi</span>.<span class="fn">fn</span>();
<span class="fn">sendWelcomeEmail</span>(<span class="var">mockSend</span>, <span class="str">"alice@test.com"</span>);
<span class="fn">expect</span>(<span class="var">mockSend</span>).<span class="fn">toHaveBeenCalledOnce</span>();

<span class="cmt">// Spy example: watch real function</span>
<span class="kw">const</span> <span class="var">spy</span> <span class="op">=</span> <span class="var">vi</span>.<span class="fn">spyOn</span>(<span class="var">console</span>, <span class="str">"log"</span>);
<span class="fn">greet</span>(<span class="str">"Alice"</span>);
<span class="fn">expect</span>(<span class="var">spy</span>).<span class="fn">toHaveBeenCalledWith</span>(<span class="str">"Hello, Alice!"</span>);`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Testing Strategies</h3>

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Boundary Values</h4>
          <p class="text-sm text-slate-600">
            Test at the edges. If a function accepts ages 0-120, test with <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">0</code>, <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">1</code>, <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">119</code>, <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">120</code>, <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">-1</code>, and <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">121</code>.
          </p>
        </div>
        <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Equivalence Classes</h4>
          <p class="text-sm text-slate-600">
            Group inputs that should behave the same. Testing <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">5</code> and <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">50</code> covers the "valid positive number" class — no need to test every number.
          </p>
        </div>
        <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Property-Based Testing</h4>
          <p class="text-sm text-slate-600">
            Instead of specific examples, describe <em>properties</em> that must hold: "sorting a list twice gives the same result as sorting once." The framework generates random inputs.
          </p>
        </div>
        <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Code Coverage</h4>
          <p class="text-sm text-slate-600">
            Measures what percentage of code is executed by tests. Useful as a guide, but 100% coverage does not mean 100% bug-free. Tests must also check <em>correct behavior</em>.
          </p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Testing in CI/CD Pipelines</h3>
      <p class="text-slate-600">
        In professional development, tests run automatically whenever code is pushed. A CI/CD pipeline ensures that no broken code reaches production:
      </p>
      <div class="flex flex-wrap items-center gap-2 text-sm">
        <span class="rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-slate-700">git push</span>
        <span class="text-slate-400">&#8594;</span>
        <span class="rounded-lg bg-yellow-100 px-3 py-1.5 font-mono text-yellow-700">Run tests</span>
        <span class="text-slate-400">&#8594;</span>
        <span class="rounded-lg bg-green-100 px-3 py-1.5 font-mono text-green-700">All pass?</span>
        <span class="text-slate-400">&#8594;</span>
        <span class="rounded-lg bg-blue-100 px-3 py-1.5 font-mono text-blue-700">Deploy</span>
      </div>
      <p class="text-sm text-slate-500">
        If any test fails, the pipeline stops and the developer is notified. This prevents regressions from reaching users.
      </p>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
      >
        I understand testing
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
