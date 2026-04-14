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

  const conceptCards = [
    { emoji: '\uD83D\uDCC1', title: 'Files & Folders', desc: 'Every concept gets its own file. Related files live in the same folder.', color: 'border-indigo-300 bg-indigo-50' },
    { emoji: '\uD83E\uDDE9', title: 'Modules', desc: 'Each module does one job. It exports what others need and hides the rest.', color: 'border-purple-300 bg-purple-50' },
    { emoji: '\u2702\uFE0F', title: 'Separation of Concerns', desc: 'Data, logic, and presentation each live in their own space.', color: 'border-teal-300 bg-teal-50' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < conceptCards.length) {
        visibleCards++;
      } else {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      Think about organizing your room. When everything is tossed on the floor, finding your keys takes forever. But when shirts go in the closet, books go on the shelf, and keys hang by the door, you can find anything in seconds. Code organization works the same way: <strong>everything has a place, and similar things go together.</strong>
    </p>
  </div>

  <!-- Room metaphor -->
  <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-indigo-600">Think of it this way</h3>
    <p class="text-slate-600">
      A messy room with clothes, homework, and sports gear all piled on one chair is like a project where all the code lives in a single file. You might know where things are <em>today</em>, but next week? Good luck. Organized code is like having labeled drawers: you always know where to look, and adding new things is easy because the system tells you exactly where they belong.
    </p>
  </div>

  <!-- Animated concept cards -->
  <div>
    <h3 class="mb-4 text-lg font-bold text-slate-800">The Three Pillars of Organization</h3>
    <div class="grid gap-4 sm:grid-cols-3">
      {#each conceptCards as card, i}
        <div
          class="rounded-xl border-2 {card.color} p-5 text-center transition-all duration-500
            {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
        >
          <div class="mb-2 text-4xl">{card.emoji}</div>
          <h4 class="mb-1 font-bold text-slate-800">{card.title}</h4>
          <p class="text-sm text-slate-600">{card.desc}</p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Messy vs Clean structure -->
  <div>
    <h3 class="mb-4 text-lg font-bold text-slate-800">Messy vs. Clean Project Structure</h3>
    <div class="grid gap-6 lg:grid-cols-2">
      <div>
        <p class="mb-2 text-sm font-semibold text-red-500">Messy: everything in one folder</p>
        <pre class="code-block"><code>{@html `<span class="cmt">project/</span>
  <span class="str">app.js</span>
  <span class="str">helpers.js</span>
  <span class="str">stuff.js</span>
  <span class="str">login.js</span>
  <span class="str">styles.css</span>
  <span class="str">userModel.js</span>
  <span class="str">apiHelper.js</span>
  <span class="str">database.js</span>
  <span class="str">test1.js</span>
  <span class="str">moreStuff.js</span>
  <span class="cmt">  // 10 files, no structure, vague names</span>`}</code></pre>
      </div>
      <div>
        <p class="mb-2 text-sm font-semibold text-green-600">Clean: grouped by purpose</p>
        <pre class="code-block"><code>{@html `<span class="cmt">project/</span>
  <span class="fn">components/</span>
    <span class="str">LoginForm.js</span>
    <span class="str">UserProfile.js</span>
  <span class="fn">models/</span>
    <span class="str">User.js</span>
  <span class="fn">utils/</span>
    <span class="str">apiClient.js</span>
    <span class="str">formatDate.js</span>
  <span class="fn">styles/</span>
    <span class="str">main.css</span>
  <span class="fn">tests/</span>
    <span class="str">LoginForm.test.js</span>
    <span class="str">User.test.js</span>
  <span class="str">app.js</span>`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Key rules -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Key Ideas</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        <span><strong>One file, one concept.</strong> A file called <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">User.js</code> should only contain code about users, not shopping carts.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        <span><strong>Group related files in folders.</strong> All components in <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">components/</code>, all data models in <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">models/</code>, all utilities in <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">utils/</code>.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        <span><strong>Keep functions short and focused.</strong> If a function does five different things, break it into five smaller functions. Each one should have a clear name that says exactly what it does.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        <span><strong>Names should explain purpose.</strong> A folder called <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">utils/</code> is better than <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">misc/</code>. A file called <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">formatDate.js</code> is better than <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">helpers2.js</code>.</span>
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-3 text-2xl font-bold text-slate-800">The Deep Dive</h2>
      <p class="text-slate-600">
        At scale, code organization is an architectural discipline. Poor organization leads to tangled dependencies, slow builds, merge conflicts, and teams that step on each other's toes. Good organization creates clear boundaries that let code evolve independently.
      </p>
    </div>

    <!-- Single Responsibility Principle -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">The S in SOLID: Single Responsibility Principle</h3>
      <p class="mb-3 text-slate-600">
        Robert C. Martin defined it as: <em>"A module should have one, and only one, reason to change."</em> A "reason to change" means a stakeholder or business concern. If your <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">UserService</code> handles authentication, profile updates, <em>and</em> email notifications, three different business concerns can force changes to the same file.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Violates SRP: one class, three reasons to change</span>
<span class="kw">class</span> <span class="fn">UserService</span> {
  <span class="fn">authenticate</span>(<span class="arg">email</span>, <span class="arg">password</span>) { <span class="cmt">/* auth logic */</span> }
  <span class="fn">updateProfile</span>(<span class="arg">userId</span>, <span class="arg">data</span>)    { <span class="cmt">/* profile logic */</span> }
  <span class="fn">sendWelcomeEmail</span>(<span class="arg">user</span>)          { <span class="cmt">/* email logic */</span> }
}

<span class="cmt">// Follows SRP: each class has one reason to change</span>
<span class="kw">class</span> <span class="fn">AuthService</span>    { <span class="fn">authenticate</span>(<span class="arg">email</span>, <span class="arg">password</span>) { ... } }
<span class="kw">class</span> <span class="fn">ProfileService</span> { <span class="fn">updateProfile</span>(<span class="arg">userId</span>, <span class="arg">data</span>)    { ... } }
<span class="kw">class</span> <span class="fn">EmailService</span>   { <span class="fn">sendWelcomeEmail</span>(<span class="arg">user</span>)          { ... } }`}</code></pre>
    </div>

    <!-- Cohesion vs Coupling -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Cohesion vs. Coupling</h3>
      <p class="mb-3 text-slate-600">
        These two metrics define the quality of your module boundaries:
      </p>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
          <h4 class="mb-1 font-bold text-green-700">High Cohesion (good)</h4>
          <p class="text-sm text-slate-600">Everything inside a module is closely related. A <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">DateUtils</code> module that contains <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">formatDate</code>, <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">parseDate</code>, and <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">diffDays</code> is highly cohesive.</p>
        </div>
        <div class="rounded-xl border-2 border-red-200 bg-red-50 p-5">
          <h4 class="mb-1 font-bold text-red-700">High Coupling (bad)</h4>
          <p class="text-sm text-slate-600">Modules depend heavily on each other's internals. Changing one module forces changes in many others. This makes code fragile and hard to refactor.</p>
        </div>
      </div>
      <p class="mt-3 text-slate-600">The goal is <strong>high cohesion, low coupling</strong>. Each module is self-contained and communicates with others through small, well-defined interfaces.</p>
    </div>

    <!-- Feature-based vs Layer-based -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Feature-Based vs. Layer-Based Folder Structures</h3>
      <div class="grid gap-6 lg:grid-cols-2">
        <div>
          <p class="mb-2 text-sm font-semibold text-slate-500">Layer-based (by technical role)</p>
          <pre class="code-block"><code>{@html `<span class="cmt">src/</span>
  <span class="fn">controllers/</span>
    <span class="str">userController.js</span>
    <span class="str">orderController.js</span>
  <span class="fn">models/</span>
    <span class="str">userModel.js</span>
    <span class="str">orderModel.js</span>
  <span class="fn">services/</span>
    <span class="str">userService.js</span>
    <span class="str">orderService.js</span>
  <span class="fn">views/</span>
    <span class="str">userView.html</span>
    <span class="str">orderView.html</span>`}</code></pre>
        </div>
        <div>
          <p class="mb-2 text-sm font-semibold text-slate-500">Feature-based (by domain)</p>
          <pre class="code-block"><code>{@html `<span class="cmt">src/</span>
  <span class="fn">user/</span>
    <span class="str">userController.js</span>
    <span class="str">userModel.js</span>
    <span class="str">userService.js</span>
    <span class="str">userView.html</span>
  <span class="fn">order/</span>
    <span class="str">orderController.js</span>
    <span class="str">orderModel.js</span>
    <span class="str">orderService.js</span>
    <span class="str">orderView.html</span>`}</code></pre>
        </div>
      </div>
      <p class="mt-3 text-slate-600">
        Layer-based works well for small projects. Feature-based scales better because adding a new feature means adding a new folder rather than touching many folders. Most modern frameworks (Next.js, NestJS, Angular) favor feature-based organization.
      </p>
    </div>

    <!-- MVC / MVVM -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Architectural Patterns: MVC and MVVM</h3>
      <p class="mb-3 text-slate-600">
        These patterns formalize separation of concerns by defining clear layers:
      </p>
      <div class="overflow-x-auto rounded-xl border border-slate-200">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50">
              <th class="px-4 py-3 font-semibold text-slate-700">Pattern</th>
              <th class="px-4 py-3 font-semibold text-slate-700">Layers</th>
              <th class="px-4 py-3 font-semibold text-slate-700">Used In</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr>
              <td class="px-4 py-3 font-medium text-slate-800">MVC</td>
              <td class="px-4 py-3 text-slate-600">Model (data), View (UI), Controller (logic)</td>
              <td class="px-4 py-3 text-slate-600">Rails, Django, Express, Spring</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-medium text-slate-800">MVVM</td>
              <td class="px-4 py-3 text-slate-600">Model (data), View (UI), ViewModel (binding)</td>
              <td class="px-4 py-3 text-slate-600">WPF, SwiftUI, Angular, Vue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Dependency Injection -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Dependency Injection</h3>
      <p class="mb-3 text-slate-600">
        Instead of a module creating its own dependencies, they are passed in from the outside. This makes modules easier to test and swap out.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Tightly coupled: hard to test, hard to swap</span>
<span class="kw">class</span> <span class="fn">OrderService</span> {
  <span class="fn">constructor</span>() {
    <span class="kw">this</span>.<span class="var">db</span> = <span class="kw">new</span> <span class="fn">PostgresDatabase</span>();  <span class="cmt">// locked to Postgres</span>
  }
}

<span class="cmt">// Dependency injection: flexible and testable</span>
<span class="kw">class</span> <span class="fn">OrderService</span> {
  <span class="fn">constructor</span>(<span class="arg">database</span>) {
    <span class="kw">this</span>.<span class="var">db</span> = <span class="arg">database</span>;  <span class="cmt">// any database that fits the interface</span>
  }
}

<span class="cmt">// In production:</span>
<span class="kw">const</span> <span class="var">service</span> = <span class="kw">new</span> <span class="fn">OrderService</span>(<span class="kw">new</span> <span class="fn">PostgresDatabase</span>());
<span class="cmt">// In tests:</span>
<span class="kw">const</span> <span class="var">service</span> = <span class="kw">new</span> <span class="fn">OrderService</span>(<span class="kw">new</span> <span class="fn">MockDatabase</span>());`}</code></pre>
    </div>

    <!-- Barrel files, monorepo -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Barrel Files and Package Boundaries</h3>
      <p class="mb-3 text-slate-600">
        A <strong>barrel file</strong> (typically <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">index.ts</code>) re-exports the public API of a folder, hiding internal details. This creates clean import paths and enforces what is part of a module's public interface.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// user/index.ts — the barrel file</span>
<span class="kw">export</span> { <span class="fn">UserService</span> } <span class="kw">from</span> <span class="str">'./userService'</span>;
<span class="kw">export</span> { <span class="fn">UserProfile</span> } <span class="kw">from</span> <span class="str">'./UserProfile'</span>;
<span class="kw">export</span> <span class="kw">type</span> { <span class="fn">User</span> } <span class="kw">from</span> <span class="str">'./types'</span>;
<span class="cmt">// internal helpers are NOT exported</span>

<span class="cmt">// Consumers import from the barrel:</span>
<span class="kw">import</span> { <span class="fn">UserService</span>, <span class="fn">UserProfile</span> } <span class="kw">from</span> <span class="str">'./user'</span>;`}</code></pre>
    </div>

    <!-- Monorepo vs Polyrepo -->
    <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
      <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-indigo-600">Monorepo vs. Polyrepo</h3>
      <p class="text-slate-600">
        A <strong>monorepo</strong> keeps all packages in a single repository (e.g., Google, Meta). This makes cross-package refactoring easy and ensures consistent tooling. A <strong>polyrepo</strong> gives each package its own repository, providing clearer ownership boundaries and independent deployment. Most teams start with a single repo and split when a clear boundary emerges. Tools like Nx, Turborepo, and Lerna help manage monorepos at scale.
      </p>
    </div>

    <!-- Key concepts -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Single Responsibility Principle:</strong> every module has one reason to change. If you cannot describe a module's job in one sentence without using "and", it does too much.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>High cohesion, low coupling.</strong> Keep related code together (cohesion) and minimize dependencies between modules (coupling).</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Feature-based folders</strong> scale better than layer-based folders for medium-to-large projects because each feature is self-contained.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <span><strong>Dependency injection</strong> decouples modules by passing dependencies in rather than hardcoding them, making code testable and flexible.</span>
        </li>
      </ul>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
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
    color: #e2e8f0;
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
