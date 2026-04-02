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

  let activeStep = $state(-1);

  const testSteps = [
    { label: 'Write code', icon: '✏️', detail: 'Create a function' },
    { label: 'Write a test', icon: '🧪', detail: 'Describe what should happen' },
    { label: 'Run the test', icon: '▶️', detail: 'Does it pass or fail?' },
  ];

  onMount(() => {
    let step = 0;
    const interval = setInterval(() => {
      activeStep = step;
      step++;
      if (step >= testSteps.length) clearInterval(interval);
    }, 1200);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      Testing is how you <strong>prove your code works</strong>. Instead of running your program and checking by hand every time, you write small checks that a computer can run for you. If something breaks later, your tests catch it <strong>before your users do</strong>.
    </p>
  </div>

  <!-- Test cycle visual -->
  <div>
    <h3 class="mb-4 text-sm font-bold text-teal-600">The Testing Cycle</h3>

    <div class="flex flex-col items-center gap-3">
      {#each testSteps as step, i}
        <div class="flex items-center gap-3 rounded-xl border-2 px-6 py-4 shadow-sm transition-all duration-500
          {i <= activeStep ? 'border-teal-400 bg-teal-50 scale-105' : 'border-slate-200 bg-white opacity-40'}
          {i === activeStep ? 'step-pulse' : ''}">
          <span class="text-2xl">{step.icon}</span>
          <div>
            <div class="font-bold text-slate-800">{step.label}</div>
            <div class="text-sm text-slate-500">{step.detail}</div>
          </div>
        </div>
        {#if i < testSteps.length - 1}
          <svg class="h-6 w-6 text-teal-300 transition-opacity duration-500 {i < activeStep ? 'opacity-100' : 'opacity-30'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        {/if}
      {/each}

      <!-- Result -->
      <div class="mt-2 flex items-center gap-4">
        <div class="rounded-lg px-4 py-2 text-sm font-bold transition-all duration-500
          {activeStep >= 2 ? 'bg-green-100 text-green-700 result-pop' : 'bg-slate-100 text-slate-400'}">
          PASS
        </div>
        <span class="text-slate-400">or</span>
        <div class="rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-slate-400">
          FAIL
        </div>
      </div>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-teal-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-teal-700 active:scale-95">
      I've read this
    </button>
  </div>

  {:else}
  <div class="space-y-8">
    <div>
      <p class="text-slate-600">
        Software testing has multiple layers. <strong>Unit tests</strong> verify individual functions in isolation. <strong>Integration tests</strong> check that modules work together. <strong>End-to-end (E2E) tests</strong> simulate real user interactions. A solid test suite combines all three, following the <strong>testing pyramid</strong> &mdash; many fast unit tests at the base, fewer integration tests in the middle, and a small number of E2E tests at the top.
      </p>
    </div>

    <!-- Code example -->
    <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm">
      <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">TypeScript (Jest / Vitest)</div>
      <pre class="text-green-400">// Unit test
describe("add", () =&gt; {'{'}
  it("adds two numbers", () =&gt; {'{'}
    expect(add(2, 3)).toBe(5);
  {'}'});

  it("handles negative numbers", () =&gt; {'{'}
    expect(add(-1, 1)).toBe(0);
  {'}'});
{'}'});

// Integration test
describe("UserService", () =&gt; {'{'}
  it("creates a user and sends welcome email", async () =&gt; {'{'}
    const user = await userService.create({'{'}
      name: "Alice",
      email: "alice@example.com"
    {'}'});
    expect(user.id).toBeDefined();
    expect(mailer.sent).toContainEqual(
      expect.objectContaining({'{'} to: "alice@example.com" {'}'})
    );
  {'}'});
{'}'});

// Arrange-Act-Assert pattern
it("removes an item from the cart", () =&gt; {'{'}
  // Arrange
  const cart = new Cart();
  cart.add("apple");

  // Act
  cart.remove("apple");

  // Assert
  expect(cart.items).toHaveLength(0);
{'}'});</pre>
    </div>

    <!-- Testing pyramid -->
    <div class="flex flex-col items-center gap-1">
      <div class="rounded-lg border-2 border-teal-200 bg-teal-50 px-6 py-2 text-center text-sm">
        <div class="font-bold text-teal-700">E2E Tests</div>
        <div class="text-xs text-slate-500">Few, slow, high confidence</div>
      </div>
      <div class="rounded-lg border-2 border-teal-200 bg-teal-50 px-10 py-2 text-center text-sm">
        <div class="font-bold text-teal-700">Integration Tests</div>
        <div class="text-xs text-slate-500">Moderate count, test connections</div>
      </div>
      <div class="rounded-lg border-2 border-teal-200 bg-teal-50 px-16 py-2 text-center text-sm">
        <div class="font-bold text-teal-700">Unit Tests</div>
        <div class="text-xs text-slate-500">Many, fast, test individual pieces</div>
      </div>
    </div>

    <!-- Key concepts -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-500"></span>
          <strong>Arrange-Act-Assert</strong> &mdash; set up the test data, perform the action, then check the result. This pattern keeps tests clear and readable.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-500"></span>
          <strong>Test coverage</strong> measures what percentage of your code is exercised by tests. Aim for meaningful coverage, not 100% &mdash; test behavior, not implementation details.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-500"></span>
          <strong>Mocking</strong> replaces real dependencies (databases, APIs) with fake versions so you can test a unit in isolation.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-500"></span>
          <strong>TDD (Test-Driven Development)</strong> flips the cycle: write the test first (it fails), then write code to make it pass, then refactor.
        </li>
      </ul>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-teal-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-teal-700 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  @keyframes stepPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.4); }
    50% { box-shadow: 0 0 0 8px rgba(20, 184, 166, 0); }
  }
  @keyframes resultPop {
    0% { transform: scale(0.9); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }
  .step-pulse { animation: stepPulse 1s ease-in-out 2; }
  .result-pop { animation: resultPop 0.4s ease-out; }
</style>
