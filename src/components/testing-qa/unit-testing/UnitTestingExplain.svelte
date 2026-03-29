<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);

  const whyCards = [
    { emoji: '\u26A1', title: 'Fast Feedback', desc: 'Unit tests run in milliseconds. You know immediately if something broke, right inside your editor.' },
    { emoji: '\uD83D\uDEE1\uFE0F', title: 'Catch Regressions', desc: 'When you change code, tests tell you if you accidentally broke something that used to work.' },
    { emoji: '\uD83D\uDCDD', title: 'Document Behavior', desc: 'Tests describe what your code should do. They are living documentation that never goes stale.' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < whyCards.length) {
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">What Is a Unit Test?</h2>
    <p class="text-slate-600">
      A unit test checks <strong>one small piece of code</strong> in isolation -- a single function, a method, or a component. Think of it like <strong>testing each LEGO brick</strong> before you build the set. You make sure each brick is the right shape and color <em>before</em> snapping them together. If a brick is cracked, you want to know now, not after you have built the whole castle.
    </p>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Anatomy of a Test</h3>
    <p class="text-slate-600">
      Every testing framework uses a similar structure: <strong>describe</strong> groups related tests, <strong>it</strong> (or <strong>test</strong>) defines a single test case, and <strong>expect</strong> checks that a value matches what you predicted.
    </p>
    <pre class="code-block"><code>{@html `<span class="fn">describe</span>(<span class="str">'add'</span>, () => {
  <span class="fn">it</span>(<span class="str">'adds two numbers'</span>, () => {
    <span class="kw">const</span> <span class="var">result</span> = <span class="fn">add</span>(<span class="num">2</span>, <span class="num">3</span>);
    <span class="fn">expect</span>(<span class="var">result</span>).<span class="fn">toBe</span>(<span class="num">5</span>);
  });
});`}</code></pre>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">The AAA Pattern</h3>
    <p class="text-slate-600">
      Most unit tests follow three steps, known as <strong>Arrange, Act, Assert</strong>:
    </p>
    <div class="grid gap-4 sm:grid-cols-3">
      <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center">
        <div class="mb-2 text-3xl font-bold text-green-600">A</div>
        <h4 class="mb-1 font-bold text-slate-800">Arrange</h4>
        <p class="text-sm text-slate-600">Set up the data and conditions your test needs. Create objects, define inputs, configure state.</p>
      </div>
      <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center">
        <div class="mb-2 text-3xl font-bold text-green-600">A</div>
        <h4 class="mb-1 font-bold text-slate-800">Act</h4>
        <p class="text-sm text-slate-600">Call the function or trigger the behavior you are testing. This is the one action under test.</p>
      </div>
      <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center">
        <div class="mb-2 text-3xl font-bold text-green-600">A</div>
        <h4 class="mb-1 font-bold text-slate-800">Assert</h4>
        <p class="text-sm text-slate-600">Check that the result matches what you expected. If it does not, the test fails.</p>
      </div>
    </div>
    <pre class="code-block"><code>{@html `<span class="fn">it</span>(<span class="str">'calculates total price'</span>, () => {
  <span class="cmt">// Arrange</span>
  <span class="kw">const</span> <span class="var">items</span> = [{ <span class="var">price</span>: <span class="num">10</span> }, { <span class="var">price</span>: <span class="num">20</span> }];

  <span class="cmt">// Act</span>
  <span class="kw">const</span> <span class="var">total</span> = <span class="fn">calculateTotal</span>(<span class="var">items</span>);

  <span class="cmt">// Assert</span>
  <span class="fn">expect</span>(<span class="var">total</span>).<span class="fn">toBe</span>(<span class="num">30</span>);
});`}</code></pre>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    {#each whyCards as card, i}
      <div
        class="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center transition-all duration-700
          {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
      >
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      I understand unit testing
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Unit Testing (Advanced)</h2>
      <p class="text-slate-600">Test doubles, coverage strategies, mutation testing, and techniques for testing complex code.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Test Doubles: Mocks, Stubs, and Spies</h3>
      <p class="text-slate-600">
        Real code depends on databases, APIs, and other modules. In a unit test you replace those dependencies with <strong>test doubles</strong> so you can test in isolation:
      </p>
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Stub</h4>
          <p class="text-sm text-slate-600">Returns a fixed value. You control what the dependency "says" without running real logic. Example: a stub that always returns <code class="rounded bg-slate-100 px-1 text-green-700">{ status: 200 }</code>.</p>
        </div>
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Mock</h4>
          <p class="text-sm text-slate-600">A fake that also records how it was called. You can assert it was called with the right arguments, the right number of times.</p>
        </div>
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Spy</h4>
          <p class="text-sm text-slate-600">Wraps the real function but records calls. The real code still runs, but you can inspect how it was used.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Dependency Injection for Testability</h3>
      <p class="text-slate-600">
        If a function creates its own dependencies internally, you cannot replace them in tests. <strong>Dependency injection</strong> means passing dependencies in as parameters, making them easy to swap with test doubles.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Hard to test - creates its own dependency</span>
<span class="kw">function</span> <span class="fn">getUser</span>(<span class="arg">id</span>) {
  <span class="kw">const</span> <span class="var">db</span> = <span class="kw">new</span> <span class="fn">Database</span>();  <span class="cmt">// tightly coupled</span>
  <span class="kw">return</span> <span class="var">db</span>.<span class="fn">find</span>(<span class="arg">id</span>);
}

<span class="cmt">// Easy to test - dependency is injected</span>
<span class="kw">function</span> <span class="fn">getUser</span>(<span class="arg">id</span>, <span class="arg">db</span>) {
  <span class="kw">return</span> <span class="arg">db</span>.<span class="fn">find</span>(<span class="arg">id</span>);  <span class="cmt">// pass a mock in tests!</span>
}`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Code Coverage and Its Limits</h3>
      <p class="text-slate-600">
        Coverage tools measure what percentage of your code is executed during tests. Common metrics include <strong>line coverage</strong>, <strong>branch coverage</strong> (if/else paths), and <strong>function coverage</strong>.
      </p>
      <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
        <p class="mb-2 text-sm font-semibold text-slate-500">Coverage is useful but misleading at 100%</p>
        <ul class="space-y-1.5 text-sm text-slate-600">
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
            <span>High coverage means most code paths are exercised by tests.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
            <span>But it does not mean your assertions are meaningful. A test can execute a line without checking the result.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
            <span>Aim for 70-90% coverage on critical paths rather than chasing 100% everywhere.</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Mutation Testing</h3>
      <p class="text-slate-600">
        Mutation testing flips your logic to see if tests catch it. A tool changes <code class="rounded bg-slate-100 px-1 text-green-700">+</code> to <code class="rounded bg-slate-100 px-1 text-green-700">-</code>, <code class="rounded bg-slate-100 px-1 text-green-700">===</code> to <code class="rounded bg-slate-100 px-1 text-green-700">!==</code>, or removes a line entirely. If your tests still pass after a mutation, they are not thorough enough. Tools like <strong>Stryker</strong> automate this process.
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Property-Based Testing</h3>
      <p class="text-slate-600">
        Instead of testing specific examples, property-based testing generates <strong>hundreds of random inputs</strong> and checks that a property always holds. For instance: "sorting an array and sorting it again should give the same result" or "reversing a string twice returns the original."
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Using fast-check for property-based tests</span>
<span class="kw">import</span> <span class="var">fc</span> <span class="kw">from</span> <span class="str">'fast-check'</span>;

<span class="fn">it</span>(<span class="str">'reverse of reverse is the original'</span>, () => {
  <span class="var">fc</span>.<span class="fn">assert</span>(
    <span class="var">fc</span>.<span class="fn">property</span>(<span class="var">fc</span>.<span class="fn">string</span>(), (<span class="arg">s</span>) => {
      <span class="fn">expect</span>(<span class="fn">reverse</span>(<span class="fn">reverse</span>(<span class="arg">s</span>))).<span class="fn">toBe</span>(<span class="arg">s</span>);
    })
  );
});`}</code></pre>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Testing Pure vs. Impure Functions</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-green-700">Pure Functions (Easy)</h4>
          <p class="text-sm text-slate-600">Same input always gives same output, no side effects. Just call the function and assert the return value. Testing heaven.</p>
        </div>
        <div class="rounded-xl border-2 border-yellow-200 bg-yellow-50 p-4">
          <h4 class="mb-1 font-bold text-yellow-700">Impure Functions (Harder)</h4>
          <p class="text-sm text-slate-600">Reads/writes files, calls APIs, uses Date.now(). You need mocks, stubs, or dependency injection to control the side effects.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Testing Async Code</h3>
      <p class="text-slate-600">
        Async functions need special handling. Return the promise or use <code class="rounded bg-slate-100 px-1 text-green-700">async/await</code> in your test. For timers, use fake timers to avoid waiting in real time.
      </p>
      <pre class="code-block"><code>{@html `<span class="fn">it</span>(<span class="str">'fetches user data'</span>, <span class="kw">async</span> () => {
  <span class="kw">const</span> <span class="var">user</span> = <span class="kw">await</span> <span class="fn">fetchUser</span>(<span class="num">1</span>);
  <span class="fn">expect</span>(<span class="var">user</span>.<span class="var">name</span>).<span class="fn">toBe</span>(<span class="str">'Alice'</span>);
});

<span class="cmt">// Fake timers for setTimeout/setInterval</span>
<span class="fn">beforeEach</span>(() => { <span class="var">vi</span>.<span class="fn">useFakeTimers</span>(); });
<span class="fn">afterEach</span>(() => { <span class="var">vi</span>.<span class="fn">useRealTimers</span>(); });`}</code></pre>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
      >
        I understand unit testing
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw) { color: #c084fc; } .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; } .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; } .code-block :global(.fn) { color: #93c5fd; }
  .code-block :global(.op) { color: #94a3b8; } .code-block :global(.arg) { color: #fdba74; }
</style>
