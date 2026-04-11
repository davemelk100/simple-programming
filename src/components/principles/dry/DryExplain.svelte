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

  let showAfter = $state(false);
  let animStep = $state(0);

  onMount(() => {
    const interval = setInterval(() => {
      if (animStep < 3) {
        animStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          showAfter = true;
        }, 600);
      }
    }, 700);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      The DRY principle says: <strong>every piece of knowledge should have a single, unambiguous representation in your code</strong>. If you find yourself writing the same logic in multiple places, something has gone wrong.
    </p>
  </div>

  <!-- Sticky note metaphor -->
  <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-orange-600">Think of it this way</h3>
    <p class="text-slate-600">
      Imagine you write your phone number on <strong>10 different sticky notes</strong> and hand them out. When your number changes, you have to track down all 10 notes and update each one. Miss even one, and someone has the wrong number. Wouldn't it be easier to write it in <strong>one place</strong> and have everyone look there?
    </p>
  </div>

  <!-- Animated before/after -->
  <div>
    <h3 class="mb-4 text-lg font-bold text-slate-800">See the problem</h3>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Before: duplicated code -->
      <div>
        <p class="mb-2 text-sm font-semibold text-red-600 uppercase tracking-wider">Before (copy-pasted)</p>
        <div class="space-y-2">
          {#each [0, 1, 2] as i}
            <div
              class="rounded-lg border-2 px-4 py-3 font-mono text-sm transition-all duration-500
                {animStep > i ? 'border-red-300 bg-red-50 opacity-100' : 'border-slate-200 bg-white opacity-40'}"
            >
              <span class="text-purple-600">if</span> (price &gt; <span class="text-yellow-600">100</span>) {'{'}<br />
              &nbsp;&nbsp;discount <span class="text-slate-400">=</span> price <span class="text-slate-400">*</span> <span class="text-yellow-600">0.1</span>;<br />
              &nbsp;&nbsp;total <span class="text-slate-400">=</span> price <span class="text-slate-400">-</span> discount;<br />
              {'}'}
            </div>
          {/each}
          {#if animStep >= 3}
            <p class="mt-2 text-sm font-medium text-red-600 transition-opacity duration-500">
              The same logic appears 3 times. If the discount changes to 15%, you must update all 3.
            </p>
          {/if}
        </div>
      </div>

      <!-- After: extracted function -->
      <div>
        <p class="mb-2 text-sm font-semibold text-green-600 uppercase tracking-wider">After (DRY)</p>
        <div class="space-y-2 transition-all duration-700 {showAfter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}">
          <div class="rounded-lg border-2 border-green-300 bg-green-50 px-4 py-3 font-mono text-sm">
            <span class="text-purple-600">function</span> <span class="text-blue-600">applyDiscount</span>(price) {'{'}<br />
            &nbsp;&nbsp;<span class="text-purple-600">if</span> (price &gt; <span class="text-yellow-600">100</span>) {'{'}<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-purple-600">return</span> price <span class="text-slate-400">-</span> price <span class="text-slate-400">*</span> <span class="text-yellow-600">0.1</span>;<br />
            &nbsp;&nbsp;{'}'}<br />
            &nbsp;&nbsp;<span class="text-purple-600">return</span> price;<br />
            {'}'}
          </div>
          <div class="space-y-1">
            {#each ['checkoutTotal', 'cartPreview', 'invoiceTotal'] as caller}
              <div class="rounded-lg border border-green-200 bg-white px-4 py-2 font-mono text-sm text-green-700">
                {caller} = <span class="text-blue-600">applyDiscount</span>(price);
              </div>
            {/each}
          </div>
          <p class="mt-2 text-sm font-medium text-green-600">
            One function, called 3 times. Change the discount in one place, and it updates everywhere.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Key ideas -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Key Ideas</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        If you <strong>copy-paste code</strong>, stop and ask: should this be a function instead?
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <strong>One change, one place.</strong> When logic lives in a single function, fixing a bug fixes it everywhere.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        DRY is about <strong>knowledge</strong>, not just code. If two pieces of code look the same but represent different business rules, they are not true duplication.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        The goal is a <strong>single source of truth</strong> for every piece of logic in your program.
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-3 text-2xl font-bold text-slate-800">DRY: The Full Picture</h2>
      <p class="text-slate-600">
        The DRY principle goes beyond simple code duplication. It was originally defined in <em>The Pragmatic Programmer</em> by Andy Hunt and Dave Thomas, and has since been debated, refined, and sometimes overapplied.
      </p>
    </div>

    <!-- Original definition -->
    <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-orange-600">The Original Definition</h3>
      <blockquote class="border-l-4 border-orange-400 pl-4 italic text-slate-700">
        "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system."
      </blockquote>
      <p class="mt-3 text-sm text-slate-600">
        -- <em>The Pragmatic Programmer</em>, Andrew Hunt & David Thomas (1999)
      </p>
      <p class="mt-2 text-sm text-slate-600">
        Notice: it says <strong>"knowledge"</strong>, not "code." Two code blocks can look identical but represent entirely different domain concepts -- and that is <em>not</em> a DRY violation. Conversely, the same business rule expressed in different ways across a codebase <em>is</em> a violation, even if the code looks different.
      </p>
    </div>

    <!-- WET anti-pattern -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">WET: The Anti-Pattern</h3>
      <p class="text-slate-600 mb-3">
        WET stands for <strong>"Write Everything Twice"</strong> (or "We Enjoy Typing"). It describes codebases where the same logic, configuration, or business rule appears in multiple places without a shared abstraction.
      </p>
      <div class="rounded-lg border border-red-200 bg-red-50 p-4">
        <p class="text-sm font-semibold text-red-700 mb-2">Symptoms of WET code:</p>
        <ul class="space-y-1 text-sm text-red-600">
          <li>-- Fixing a bug requires changing 5 files</li>
          <li>-- A business rule is defined in both the frontend and backend independently</li>
          <li>-- Magic numbers and strings appear in multiple locations</li>
          <li>-- Configuration values are hardcoded in several places</li>
        </ul>
      </div>
    </div>

    <!-- Rule of Three -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">The Rule of Three</h3>
      <p class="text-slate-600">
        A practical heuristic: <strong>don't abstract on the first duplication</strong>. Wait until you see the pattern a third time. This is sometimes stated as:
      </p>
      <div class="mt-3 flex gap-4">
        <div class="flex-1 rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p class="text-2xl font-bold text-slate-400">1st</p>
          <p class="text-sm text-slate-500">Write it</p>
        </div>
        <div class="flex-1 rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p class="text-2xl font-bold text-orange-400">2nd</p>
          <p class="text-sm text-slate-500">Notice the duplication</p>
        </div>
        <div class="flex-1 rounded-lg border border-green-200 bg-green-50 p-3 text-center">
          <p class="text-2xl font-bold text-green-600">3rd</p>
          <p class="text-sm text-slate-500">Now refactor</p>
        </div>
      </div>
      <p class="mt-3 text-sm text-slate-500">
        By the third occurrence, you have enough examples to see the <em>actual</em> pattern and create the right abstraction -- not a premature one.
      </p>
    </div>

    <!-- AHA: Avoid Hasty Abstractions -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">AHA: Avoid Hasty Abstractions</h3>
      <p class="text-slate-600 mb-3">
        Kent C. Dodds coined <strong>AHA programming</strong> as a counterpoint to overly zealous DRY. The argument: <strong>the wrong abstraction is far more costly than duplication</strong>.
      </p>
      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
        <p class="text-sm text-slate-700">
          "Prefer duplication over the wrong abstraction." When you merge two similar-looking code paths into a single function too early, you often end up with a function full of <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">if</code> branches to handle the differences. This is <em>worse</em> than the original duplication because it couples unrelated concerns.
        </p>
      </div>
    </div>

    <!-- When duplication is OK -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">When Duplication Is Acceptable</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <strong>Test code:</strong> Tests should be readable in isolation. Extracting shared setup into helpers can make tests harder to understand and more fragile to changes.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <strong>Microservice boundaries:</strong> Each service should own its data models independently. Sharing code across services creates coupling that defeats the purpose of microservices.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <strong>Coincidental similarity:</strong> Two functions that happen to look the same today but serve different business purposes may diverge later. Merging them creates coupling between unrelated features.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <strong>Configuration across environments:</strong> Slight differences between dev, staging, and production configs are expected and intentional.
        </li>
      </ul>
    </div>

    <!-- Single source of truth -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Single Source of Truth for Configuration</h3>
      <p class="text-slate-600 mb-3">
        One of the most impactful applications of DRY is in configuration management. Constants, feature flags, environment variables, and API endpoints should each be defined in exactly one place.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// config.ts — single source of truth</span>
<span class="kw">export const</span> <span class="var">CONFIG</span> <span class="op">=</span> {
  <span class="var">API_BASE</span>: <span class="var">process</span>.<span class="var">env</span>.<span class="var">API_URL</span> <span class="op">??</span> <span class="str">"http://localhost:3000"</span>,
  <span class="var">MAX_RETRIES</span>: <span class="num">3</span>,
  <span class="var">TIMEOUT_MS</span>: <span class="num">5000</span>,
  <span class="var">DISCOUNT_RATE</span>: <span class="num">0.1</span>,
} <span class="kw">as const</span>;

<span class="cmt">// Every file imports from here — never hardcodes values</span>
<span class="kw">import</span> { <span class="var">CONFIG</span> } <span class="kw">from</span> <span class="str">"./config"</span>;`}</code></pre>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
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
