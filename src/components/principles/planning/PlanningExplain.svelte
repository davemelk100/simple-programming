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

  // Animated cards for basic mode
  let visibleCards = $state(0);

  const planningSteps = [
    { emoji: '\u{1F50D}', title: 'Understand the Problem', desc: 'Read, ask questions, and make sure you know exactly what you are building before touching any code.' },
    { emoji: '\u{1F5FA}\u{FE0F}', title: 'Plan Your Approach', desc: 'Sketch out the steps. Decide what pieces you need and how they fit together.' },
    { emoji: '\u{1FAAA}', title: 'Build in Steps', desc: 'Start with the simplest version that works. Add features one at a time, testing as you go.' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < planningSteps.length) {
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
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Why Planning Matters</h2>
    <p class="text-slate-600">
      Imagine building a house. You would never show up to an empty lot with a pile of bricks and just start stacking. You need a blueprint first: where do the walls go? How many rooms? Where is the plumbing? Software works the same way. <strong>Thinking before coding</strong> is the single most important habit that separates beginners from professionals.
    </p>
  </div>

  <!-- Famous quote -->
  <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5">
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-pink-600">A Famous Truth</h3>
    <p class="text-lg font-medium italic text-slate-700">
      "Weeks of coding can save you hours of planning."
    </p>
    <p class="mt-2 text-sm text-slate-500">
      This tongue-in-cheek saying means: if you skip planning, you will waste far more time writing code that does not solve the right problem, needs to be rewritten, or breaks in unexpected ways.
    </p>
  </div>

  <!-- Animated cards -->
  <div>
    <h3 class="mb-4 text-lg font-bold text-slate-800">The Three Steps of Planning</h3>
    <div class="space-y-4">
      {#each planningSteps as step, i}
        <div
          class="flex items-start gap-4 rounded-xl border-2 border-pink-100 bg-white p-5 shadow-sm transition-all duration-500
            {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
        >
          <span class="text-3xl">{step.emoji}</span>
          <div>
            <h4 class="font-bold text-slate-800">{step.title}</h4>
            <p class="text-slate-600">{step.desc}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Key ideas -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Key Ideas</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
        <span><strong>Write down what you are building before you code.</strong> Even a few sentences on paper can save hours of confusion. What are the inputs? What are the outputs? What should happen when something goes wrong?</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
        <span><strong>Break big problems into small ones.</strong> A "build a website" task is overwhelming. "Create a navigation bar" is something you can actually start on. Divide and conquer.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
        <span><strong>Start with the simplest version that works (MVP).</strong> MVP stands for <em>Minimum Viable Product</em>. Get a basic version running first, then improve it. A to-do app that can only add items is more useful than a half-built app that tries to do everything.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
        <span><strong>It is okay to change the plan.</strong> Planning does not mean predicting the future perfectly. It means having a direction so you are not wandering in circles.</span>
      </li>
    </ul>
  </div>

  <!-- Simple example -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Example: Planning a Calculator App</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// Step 1: Write down what it should do</span>
<span class="cmt">//   - Accept two numbers</span>
<span class="cmt">//   - Support add, subtract, multiply, divide</span>
<span class="cmt">//   - Show the result</span>
<span class="cmt">//   - Handle division by zero</span>

<span class="cmt">// Step 2: Plan the pieces</span>
<span class="cmt">//   - A function for each operation</span>
<span class="cmt">//   - An input section for the numbers</span>
<span class="cmt">//   - A display for the result</span>

<span class="cmt">// Step 3: Build the simplest version first</span>
<span class="kw">function</span> <span class="fn">add</span>(<span class="arg">a</span>, <span class="arg">b</span>) {
  <span class="kw">return</span> <span class="var">a</span> <span class="op">+</span> <span class="var">b</span>;
}

<span class="cmt">// Step 4: Add more features one at a time</span>
<span class="kw">function</span> <span class="fn">divide</span>(<span class="arg">a</span>, <span class="arg">b</span>) {
  <span class="kw">if</span> (<span class="var">b</span> <span class="op">===</span> <span class="num">0</span>) <span class="kw">return</span> <span class="str">"Cannot divide by zero"</span>;
  <span class="kw">return</span> <span class="var">a</span> <span class="op">/</span> <span class="var">b</span>;
}`}</code></pre>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-3 text-2xl font-bold text-slate-800">Planning &amp; Design: The Deep Dive</h2>
      <p class="text-slate-600">
        At a professional level, planning goes far beyond writing a to-do list. It involves <strong>requirements engineering</strong>, <strong>architectural decisions</strong>, <strong>prototyping</strong>, and choosing the right <strong>development methodology</strong>. Poor planning is the number one cause of failed software projects.
      </p>
    </div>

    <!-- Requirements engineering -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Requirements Engineering</h3>
      <p class="mb-3 text-slate-600">
        Requirements are divided into two categories. Understanding this distinction is fundamental to building the right system.
      </p>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5">
          <h4 class="mb-2 font-bold text-pink-700">Functional Requirements</h4>
          <p class="mb-2 text-sm text-slate-600">What the system <strong>does</strong> &mdash; its features and behaviors.</p>
          <ul class="space-y-1 text-sm text-slate-600">
            <li>&bull; Users can create an account</li>
            <li>&bull; The system sends email notifications</li>
            <li>&bull; Search returns results sorted by relevance</li>
            <li>&bull; Users can export data as CSV</li>
          </ul>
        </div>
        <div class="rounded-xl border-2 border-slate-200 bg-slate-50 p-5">
          <h4 class="mb-2 font-bold text-slate-700">Non-Functional Requirements</h4>
          <p class="mb-2 text-sm text-slate-600">How the system <strong>behaves</strong> &mdash; its qualities and constraints.</p>
          <ul class="space-y-1 text-sm text-slate-600">
            <li>&bull; Page loads in under 2 seconds</li>
            <li>&bull; Supports 10,000 concurrent users</li>
            <li>&bull; Data is encrypted at rest and in transit</li>
            <li>&bull; Works on mobile, tablet, and desktop</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- ADRs -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Architectural Decision Records (ADRs)</h3>
      <p class="mb-3 text-slate-600">
        An ADR is a short document that captures a significant architectural decision along with its context and consequences. Teams use ADRs to record <em>why</em> a decision was made so that future developers do not reverse it without understanding the reasoning.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt"># ADR-0012: Use PostgreSQL for the primary database</span>

<span class="str">## Status: Accepted</span>

<span class="str">## Context</span>
<span class="var">We need a database that supports complex queries,</span>
<span class="var">ACID transactions, and JSON columns for flexible data.</span>
<span class="var">The team has strong PostgreSQL experience.</span>

<span class="str">## Decision</span>
<span class="var">Use PostgreSQL 16 as the primary data store.</span>

<span class="str">## Consequences</span>
<span class="kw">+ Mature, well-documented, strong ecosystem</span>
<span class="kw">+ Team already has expertise</span>
<span class="kw">+ Native JSON support for semi-structured data</span>
<span class="op">- Requires more operational overhead than SQLite</span>
<span class="op">- Vertical scaling has limits vs. NoSQL for writes</span>`}</code></pre>
    </div>

    <!-- Design Patterns -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Design Patterns as Reusable Solutions</h3>
      <p class="mb-3 text-slate-600">
        Design patterns are <strong>pre-planned solutions</strong> to recurring problems. Instead of inventing from scratch, you recognize the pattern and apply a proven approach.
      </p>
      <div class="overflow-x-auto rounded-xl border border-slate-200">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50">
              <th class="px-4 py-3 font-semibold text-slate-700">Pattern</th>
              <th class="px-4 py-3 font-semibold text-slate-700">Problem It Solves</th>
              <th class="px-4 py-3 font-semibold text-slate-700">Example</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr>
              <td class="px-4 py-3 font-medium text-slate-800">Factory</td>
              <td class="px-4 py-3 text-slate-600">Creating objects without specifying their exact class</td>
              <td class="px-4 py-3 text-slate-600"><code class="rounded bg-slate-100 px-1 text-sm text-pink-700">createPayment("stripe")</code></td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-medium text-slate-800">Observer</td>
              <td class="px-4 py-3 text-slate-600">Notifying multiple parts of the system when something changes</td>
              <td class="px-4 py-3 text-slate-600">Event listeners, pub/sub systems</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-medium text-slate-800">Strategy</td>
              <td class="px-4 py-3 text-slate-600">Switching between algorithms at runtime</td>
              <td class="px-4 py-3 text-slate-600">Different sorting or pricing strategies</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Prototyping -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Prototyping and Proof of Concept</h3>
      <p class="text-slate-600">
        A <strong>prototype</strong> is a quick, throwaway version built to test an idea. A <strong>proof of concept (PoC)</strong> proves that a technical approach is feasible. Both are planning tools: you invest a small amount of time upfront to avoid investing a large amount of time in the wrong direction. The key rule is that prototypes are meant to be discarded, not shipped. If you ship a prototype, you are building on a foundation that was never meant to bear weight.
      </p>
    </div>

    <!-- Agile vs Waterfall -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Agile vs. Waterfall</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5">
          <h4 class="mb-2 font-bold text-pink-700">Agile / Iterative</h4>
          <ul class="space-y-1 text-sm text-slate-600">
            <li>&bull; Work in short cycles (1-4 week sprints)</li>
            <li>&bull; Deliver working software each cycle</li>
            <li>&bull; Adapt the plan based on feedback</li>
            <li>&bull; Requirements can evolve over time</li>
            <li>&bull; Best for uncertain or changing requirements</li>
          </ul>
        </div>
        <div class="rounded-xl border-2 border-slate-200 bg-slate-50 p-5">
          <h4 class="mb-2 font-bold text-slate-700">Waterfall / Sequential</h4>
          <ul class="space-y-1 text-sm text-slate-600">
            <li>&bull; Phases: Requirements, Design, Build, Test, Deploy</li>
            <li>&bull; Each phase completes before the next begins</li>
            <li>&bull; Detailed upfront specification</li>
            <li>&bull; Changes are expensive once building starts</li>
            <li>&bull; Best for well-understood, stable requirements</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Technical debt -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Technical Debt</h3>
      <p class="mb-3 text-slate-600">
        Technical debt is the cost of shortcuts taken during development. Like financial debt, it accumulates interest: the longer you wait to pay it off, the more expensive it becomes. Sometimes taking on debt is a conscious, strategic decision (shipping an MVP to meet a deadline), but <strong>unplanned</strong> debt from poor planning is always harmful.
      </p>
      <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5">
        <h4 class="mb-2 text-sm font-bold uppercase tracking-wider text-pink-600">When to Accept Technical Debt</h4>
        <ul class="space-y-1 text-sm text-slate-600">
          <li>&bull; You need to validate a business idea quickly (PoC)</li>
          <li>&bull; A hard deadline is immovable and the tradeoff is understood</li>
          <li>&bull; You have a clear plan and timeline to pay it back</li>
          <li>&bull; The debt is isolated and will not contaminate other parts of the system</li>
        </ul>
      </div>
    </div>

    <!-- Estimation -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Estimation Techniques</h3>
      <p class="mb-3 text-slate-600">
        Estimation is notoriously difficult in software. Some techniques that help:
      </p>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>T-Shirt Sizing (S, M, L, XL).</strong> Quick relative sizing. Do not try to estimate hours &mdash; estimate complexity relative to other tasks.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>Planning Poker.</strong> Each team member independently estimates, then the group discusses differences. This surfaces hidden assumptions.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>Spike and estimate.</strong> If you have no idea how long something will take, do a short time-boxed investigation (a "spike") first, then estimate based on what you learned.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>Multiply by pi.</strong> A tongue-in-cheek rule: take your initial estimate and multiply by 3.14. It is surprisingly accurate because developers consistently underestimate.</span>
        </li>
      </ul>
    </div>

    <!-- Key concepts -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>Functional requirements</strong> describe what the system does. <strong>Non-functional requirements</strong> describe how well it does it.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>Record your decisions.</strong> ADRs ensure that future developers (including future you) understand why the system is built the way it is.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>Prototype to learn, not to ship.</strong> Prototypes answer questions; production code answers users.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>Iterate.</strong> The best plans evolve. Ship early, get feedback, and adjust.</span>
        </li>
      </ul>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95"
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
