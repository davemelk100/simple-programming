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
      if (visibleSections < 4) {
        visibleSections++;
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
      Unit testing means <strong>testing one small piece of code at a time</strong>, in complete isolation. Think of it like <strong>checking each ingredient before baking a cake</strong>. You taste the sugar to make sure it is not salt, you check that the eggs are fresh, and you confirm the flour is not expired -- all <em>before</em> mixing them together. If something is wrong, you want to catch it early, not after the cake is in the oven.
    </p>
  </div>

  <!-- The Testing Flow: Arrange, Act, Assert -->
  <div class="transition-all duration-700 {visibleSections >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
    <h3 class="mb-3 text-lg font-bold text-slate-800">The Testing Flow: Arrange, Act, Assert</h3>
    <p class="mb-3 text-sm text-slate-600">Every good unit test follows three clear steps:</p>
    <div class="grid gap-4 sm:grid-cols-3">
      <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center">
        <div class="mb-2 text-3xl font-bold text-green-600">1</div>
        <h4 class="mb-1 font-bold text-slate-800">Arrange</h4>
        <p class="text-sm text-slate-600">Set up the data and conditions your test needs. Create inputs, prepare objects, configure the starting state.</p>
      </div>
      <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center">
        <div class="mb-2 text-3xl font-bold text-green-600">2</div>
        <h4 class="mb-1 font-bold text-slate-800">Act</h4>
        <p class="text-sm text-slate-600">Call the function being tested. This is the single action you are verifying. One act per test.</p>
      </div>
      <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center">
        <div class="mb-2 text-3xl font-bold text-green-600">3</div>
        <h4 class="mb-1 font-bold text-slate-800">Assert</h4>
        <p class="text-sm text-slate-600">Check that the result matches what you expected. If it does not match, the test fails and tells you what went wrong.</p>
      </div>
    </div>
  </div>

  <!-- Why Unit Tests Matter -->
  <div class="transition-all duration-700 {visibleSections >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
    <h3 class="mb-3 text-lg font-bold text-slate-800">Why Unit Tests Matter</h3>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg bg-green-50 p-3">
        <span class="mt-0.5 text-lg">&#128027;</span>
        <div><strong class="text-green-800">Catch bugs early</strong><span class="text-sm text-slate-600"> -- Find problems in seconds, not after your users discover them in production.</span></div>
      </div>
      <div class="flex items-start gap-3 rounded-lg bg-green-50 p-3">
        <span class="mt-0.5 text-lg">&#128260;</span>
        <div><strong class="text-green-800">Safe refactoring</strong><span class="text-sm text-slate-600"> -- Change your code with confidence. If tests still pass, you know nothing broke.</span></div>
      </div>
      <div class="flex items-start gap-3 rounded-lg bg-green-50 p-3">
        <span class="mt-0.5 text-lg">&#128214;</span>
        <div><strong class="text-green-800">Living documentation</strong><span class="text-sm text-slate-600"> -- Tests describe what your code should do. They never go out of date like comments can.</span></div>
      </div>
    </div>
  </div>

  <!-- Key Concepts -->
  <div class="transition-all duration-700 {visibleSections >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
    <h3 class="mb-3 text-lg font-bold text-slate-800">Key Concepts</h3>
    <div class="grid gap-3 sm:grid-cols-2">
      <div class="rounded-lg border border-slate-200 bg-white p-3">
        <span class="text-sm font-bold text-green-700">Test Case</span>
        <p class="text-xs text-slate-500">A single scenario that checks one specific behavior. "When I add 2 and 3, I expect 5" is one test case.</p>
      </div>
      <div class="rounded-lg border border-slate-200 bg-white p-3">
        <span class="text-sm font-bold text-green-700">Expected vs Actual</span>
        <p class="text-xs text-slate-500">The <strong>expected</strong> value is what you predict. The <strong>actual</strong> value is what the code returns. A test passes when they match.</p>
      </div>
      <div class="rounded-lg border border-slate-200 bg-white p-3">
        <span class="text-sm font-bold text-green-700">Test Runner</span>
        <p class="text-xs text-slate-500">A tool that finds your test files, runs them, and reports results. Popular runners include Jest, Vitest, and Mocha.</p>
      </div>
      <div class="rounded-lg border border-slate-200 bg-white p-3">
        <span class="text-sm font-bold text-green-700">Assertion</span>
        <p class="text-xs text-slate-500">A statement that checks a condition. If the assertion is false, the test fails. Example: <code class="rounded bg-slate-100 px-1 text-xs text-green-700">expect(result).toBe(5)</code></p>
      </div>
    </div>
  </div>

  <!-- Code example -->
  <div class="transition-all duration-700 {visibleSections >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
    <h3 class="mb-3 text-lg font-bold text-slate-800">Putting It Together</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// A simple unit test following Arrange-Act-Assert</span>
<span class="fn">it</span>(<span class="str">'calculates the total price'</span>, () => {
  <span class="cmt">// Arrange: set up the inputs</span>
  <span class="kw">const</span> <span class="var">items</span> = [{ <span class="var">price</span>: <span class="num">10</span> }, { <span class="var">price</span>: <span class="num">20</span> }];

  <span class="cmt">// Act: call the function</span>
  <span class="kw">const</span> <span class="var">total</span> = <span class="fn">calculateTotal</span>(<span class="var">items</span>);

  <span class="cmt">// Assert: check the result</span>
  <span class="fn">expect</span>(<span class="var">total</span>).<span class="fn">toBe</span>(<span class="num">30</span>);
});`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Unit Testing (Advanced)</h2>
      <p class="text-slate-600">Test doubles, coverage strategies, edge cases, and the TDD workflow.</p>
    </div>

    <!-- Test Doubles -->
    <div class="transition-all duration-700 {visibleSections >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
      <h3 class="mb-3 text-lg font-bold text-slate-800">Test Doubles: Mocks, Stubs, Spies, and Fakes</h3>
      <p class="mb-3 text-sm text-slate-600">Real code depends on databases, APIs, and other modules. In a unit test, you replace those dependencies with <strong>test doubles</strong> so you can test in isolation:</p>
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Stub</h4>
          <p class="text-sm text-slate-600">Returns a fixed, predetermined value. You control what the dependency "says" without running real logic. Example: a stub that always returns <code class="rounded bg-slate-100 px-1 text-green-700">{'{ status: 200 }'}</code>.</p>
        </div>
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Mock</h4>
          <p class="text-sm text-slate-600">A programmable fake that also records how it was called. You can assert it was called with the right arguments, the right number of times, in the right order.</p>
        </div>
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Spy</h4>
          <p class="text-sm text-slate-600">Wraps the real function but <strong>records calls</strong> without changing behavior. The real code still runs, but you can inspect how it was used afterward.</p>
        </div>
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Fake</h4>
          <p class="text-sm text-slate-600">A simplified working implementation. Example: an in-memory database instead of a real one. It works, but takes shortcuts not suitable for production.</p>
        </div>
      </div>
    </div>

    <!-- Test Coverage -->
    <div class="transition-all duration-700 {visibleSections >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
      <h3 class="mb-3 text-lg font-bold text-slate-800">Test Coverage and Its Limitations</h3>
      <p class="mb-3 text-sm text-slate-600">Coverage tools measure what percentage of your code is executed during tests. Common metrics include <strong>line coverage</strong>, <strong>branch coverage</strong>, and <strong>function coverage</strong>.</p>
      <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
        <p class="mb-2 text-sm font-semibold text-slate-500">Coverage is useful but can be misleading</p>
        <ul class="space-y-1.5 text-sm text-slate-600">
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
            <span>High coverage means most code paths run during tests -- that is good.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
            <span>But executing a line does not mean you checked the result. A test with no assertions gives 100% coverage and catches zero bugs.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
            <span>Aim for 70-90% on critical paths rather than chasing 100% everywhere.</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Edge Cases and Boundary Values -->
    <div class="transition-all duration-700 {visibleSections >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
      <h3 class="mb-3 text-lg font-bold text-slate-800">Edge Cases and Boundary Values</h3>
      <p class="mb-3 text-sm text-slate-600">Bugs love to hide at the boundaries. Always test these scenarios:</p>
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-lg border border-slate-200 bg-white p-3">
          <span class="text-sm font-bold text-green-700">Empty inputs</span>
          <p class="text-xs text-slate-500">Empty strings, empty arrays, null, undefined. What happens when there is nothing?</p>
        </div>
        <div class="rounded-lg border border-slate-200 bg-white p-3">
          <span class="text-sm font-bold text-green-700">Zero and negative</span>
          <p class="text-xs text-slate-500">Does your math function handle zero? Negative numbers? Very large numbers?</p>
        </div>
        <div class="rounded-lg border border-slate-200 bg-white p-3">
          <span class="text-sm font-bold text-green-700">Off-by-one</span>
          <p class="text-xs text-slate-500">First element, last element, one-past-the-end. The classic source of bugs in loops and indexing.</p>
        </div>
        <div class="rounded-lg border border-slate-200 bg-white p-3">
          <span class="text-sm font-bold text-green-700">Type mismatches</span>
          <p class="text-xs text-slate-500">What if someone passes a string where a number is expected? Does the function fail gracefully?</p>
        </div>
      </div>
    </div>

    <!-- TDD -->
    <div class="transition-all duration-700 {visibleSections >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
      <h3 class="mb-3 text-lg font-bold text-slate-800">TDD: Test-Driven Development</h3>
      <p class="mb-3 text-sm text-slate-600">TDD flips the usual workflow: you write the test <strong>before</strong> writing the code. It follows a three-step cycle:</p>
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-xl border-2 border-red-200 bg-red-50 p-5 text-center">
          <div class="mb-2 text-2xl font-bold text-red-600">Red</div>
          <p class="text-sm text-slate-600">Write a test for behavior that does not exist yet. Run it -- it <strong>fails</strong>. This proves the test can detect the missing feature.</p>
        </div>
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center">
          <div class="mb-2 text-2xl font-bold text-green-600">Green</div>
          <p class="text-sm text-slate-600">Write the <strong>simplest code possible</strong> to make the test pass. Do not optimize or clean up yet -- just make it work.</p>
        </div>
        <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5 text-center">
          <div class="mb-2 text-2xl font-bold text-blue-600">Refactor</div>
          <p class="text-sm text-slate-600">Clean up the code while keeping all tests passing. Improve structure, remove duplication, rename for clarity.</p>
        </div>
      </div>
      <p class="mt-3 text-sm text-slate-500">Repeat this cycle for each new piece of functionality. TDD leads to well-tested, well-designed code because you build testability in from the start.</p>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a;
    color: #e2e8f0; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw) { color: #c084fc; } .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; } .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; } .code-block :global(.fn) { color: #93c5fd; }
  .code-block :global(.op) { color: #94a3b8; } .code-block :global(.arg) { color: #fdba74; }
</style>
