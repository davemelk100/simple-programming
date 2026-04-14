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
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Code Organization in Practice</h2>
    <p class="text-slate-600">Let's see what well-organized code actually looks like, from project structure to import patterns to clean module boundaries.</p>
  </div>

  <!-- Messy vs Clean structure -->
  <div>
    <h3 class="mb-4 text-lg font-bold text-slate-800">Messy vs. Clean Project Structure</h3>
    <div class="grid gap-6 lg:grid-cols-2">
      <div>
        <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">Messy: flat, vague names</p>
        <pre class="code-block"><code>{@html `<span class="cmt">my-app/</span>
  <span class="str">app.js</span>
  <span class="str">stuff.js</span>
  <span class="str">helpers.js</span>
  <span class="str">data.js</span>
  <span class="str">more-helpers.js</span>
  <span class="str">page1.html</span>
  <span class="str">page2.html</span>
  <span class="str">styles.css</span>
  <span class="str">old-styles.css</span>
  <span class="str">test.js</span>
  <span class="str">test2.js</span>
  <span class="str">fix.js</span>
  <span class="cmt">  // Which file does what?</span>
  <span class="cmt">  // Where do you add new code?</span>
  <span class="cmt">  // What can you safely delete?</span>`}</code></pre>
      </div>
      <div>
        <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Clean: grouped, descriptive</p>
        <pre class="code-block"><code>{@html `<span class="cmt">my-app/</span>
  <span class="fn">src/</span>
    <span class="fn">components/</span>
      <span class="str">Header.js</span>
      <span class="str">ProductCard.js</span>
      <span class="str">ShoppingCart.js</span>
    <span class="fn">models/</span>
      <span class="str">Product.js</span>
      <span class="str">User.js</span>
    <span class="fn">utils/</span>
      <span class="str">formatPrice.js</span>
      <span class="str">apiClient.js</span>
    <span class="fn">styles/</span>
      <span class="str">global.css</span>
      <span class="str">components.css</span>
  <span class="fn">tests/</span>
    <span class="str">ProductCard.test.js</span>
    <span class="str">formatPrice.test.js</span>
  <span class="str">app.js</span>`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Import / Export patterns -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Import and Export: How Modules Talk</h3>
    <p class="mb-3 text-slate-600">
      Each file <strong>exports</strong> the things it wants to share, and other files <strong>import</strong> just what they need. This keeps dependencies clear and explicit.
    </p>
    <div class="space-y-4">
      <div>
        <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">utils/formatPrice.js — exports one function</p>
        <pre class="code-block"><code>{@html `<span class="kw">export</span> <span class="kw">function</span> <span class="fn">formatPrice</span>(<span class="arg">cents</span>) {
  <span class="kw">return</span> <span class="str">"$"</span> + (<span class="arg">cents</span> / <span class="num">100</span>).<span class="fn">toFixed</span>(<span class="num">2</span>);
}

<span class="cmt">// That's it. One file, one job.</span>`}</code></pre>
      </div>
      <div>
        <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">components/ProductCard.js — imports what it needs</p>
        <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="fn">formatPrice</span> } <span class="kw">from</span> <span class="str">"../utils/formatPrice.js"</span>;

<span class="kw">export</span> <span class="kw">function</span> <span class="fn">ProductCard</span>(<span class="arg">product</span>) {
  <span class="kw">return</span> <span class="str">\`
    &lt;div class="card"&gt;
      &lt;h3&gt;\${<span class="arg">product</span>.<span class="var">name</span>}&lt;/h3&gt;
      &lt;p&gt;\${<span class="fn">formatPrice</span>(<span class="arg">product</span>.<span class="var">priceInCents</span>)}&lt;/p&gt;
    &lt;/div&gt;
  \`</span>;
}`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Module with clear boundaries -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">A Module with Clear Boundaries</h3>
    <p class="mb-3 text-slate-600">
      A good module has a public API (what it exports) and private internals (everything else). The outside world only interacts with the public API.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt">// models/User.js</span>

<span class="cmt">// Private: only used inside this file</span>
<span class="kw">function</span> <span class="fn">hashPassword</span>(<span class="arg">password</span>) {
  <span class="cmt">// ... hashing logic ...</span>
  <span class="kw">return</span> <span class="var">hashedPassword</span>;
}

<span class="cmt">// Private: only used inside this file</span>
<span class="kw">function</span> <span class="fn">validateEmail</span>(<span class="arg">email</span>) {
  <span class="kw">return</span> <span class="arg">email</span>.<span class="fn">includes</span>(<span class="str">"@"</span>);
}

<span class="cmt">// Public: exported for others to use</span>
<span class="kw">export</span> <span class="kw">function</span> <span class="fn">createUser</span>(<span class="arg">name</span>, <span class="arg">email</span>, <span class="arg">password</span>) {
  <span class="kw">if</span> (!<span class="fn">validateEmail</span>(<span class="arg">email</span>)) {
    <span class="kw">throw</span> <span class="kw">new</span> <span class="fn">Error</span>(<span class="str">"Invalid email"</span>);
  }
  <span class="kw">return</span> {
    <span class="var">name</span>,
    <span class="var">email</span>,
    <span class="var">passwordHash</span>: <span class="fn">hashPassword</span>(<span class="arg">password</span>),
    <span class="var">createdAt</span>: <span class="kw">new</span> <span class="fn">Date</span>(),
  };
}

<span class="cmt">// Public: exported for others to use</span>
<span class="kw">export</span> <span class="kw">function</span> <span class="fn">getUserDisplayName</span>(<span class="arg">user</span>) {
  <span class="kw">return</span> <span class="arg">user</span>.<span class="var">name</span> || <span class="arg">user</span>.<span class="var">email</span>;
}`}</code></pre>
    <div class="mt-3 rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
      <p class="text-sm text-slate-600">
        Notice how <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">hashPassword</code> and <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">validateEmail</code> are <strong>not exported</strong>. They are implementation details. Other files only see <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">createUser</code> and <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">getUserDisplayName</code>. If you need to change how passwords are hashed, you change one file and nothing else breaks.
      </p>
    </div>
  </div>

  <!-- File tree key -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Quick Reference: Folder Naming Conventions</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        <span><code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">components/</code> — UI pieces (buttons, forms, cards)</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        <span><code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">models/</code> — data shapes and business logic</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        <span><code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">utils/</code> or <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">helpers/</code> — reusable utility functions</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        <span><code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">services/</code> — external integrations (API calls, email, payments)</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        <span><code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">tests/</code> — test files, often mirroring the <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">src/</code> structure</span>
      </li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Code Organization in Practice (Advanced)</h2>
    <p class="text-slate-600">Real-world project structures, barrel files, dependency inversion, and how production codebases are organized.</p>
  </div>

  <!-- Feature-based vs Layer-based side by side -->
  <div>
    <h3 class="mb-4 text-lg font-bold text-slate-800">Feature-Based vs. Layer-Based: Side by Side</h3>
    <div class="grid gap-6 lg:grid-cols-2">
      <div>
        <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Layer-based (grouped by technical role)</p>
        <pre class="code-block"><code>{@html `<span class="cmt">src/</span>
  <span class="fn">controllers/</span>
    <span class="str">authController.ts</span>
    <span class="str">userController.ts</span>
    <span class="str">orderController.ts</span>
    <span class="str">productController.ts</span>
  <span class="fn">services/</span>
    <span class="str">authService.ts</span>
    <span class="str">userService.ts</span>
    <span class="str">orderService.ts</span>
    <span class="str">productService.ts</span>
  <span class="fn">models/</span>
    <span class="str">User.ts</span>
    <span class="str">Order.ts</span>
    <span class="str">Product.ts</span>
  <span class="fn">repositories/</span>
    <span class="str">userRepo.ts</span>
    <span class="str">orderRepo.ts</span>
    <span class="str">productRepo.ts</span>

<span class="cmt">  // Adding a "review" feature means</span>
<span class="cmt">  // touching 4 different folders</span>`}</code></pre>
      </div>
      <div>
        <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Feature-based (grouped by domain)</p>
        <pre class="code-block"><code>{@html `<span class="cmt">src/</span>
  <span class="fn">auth/</span>
    <span class="str">authController.ts</span>
    <span class="str">authService.ts</span>
    <span class="str">authMiddleware.ts</span>
    <span class="str">index.ts</span>
  <span class="fn">user/</span>
    <span class="str">userController.ts</span>
    <span class="str">userService.ts</span>
    <span class="str">User.ts</span>
    <span class="str">index.ts</span>
  <span class="fn">order/</span>
    <span class="str">orderController.ts</span>
    <span class="str">orderService.ts</span>
    <span class="str">Order.ts</span>
    <span class="str">index.ts</span>

<span class="cmt">  // Adding a "review" feature means</span>
<span class="cmt">  // adding one new folder</span>`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Barrel files -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Barrel Files: Controlling the Public API</h3>
    <p class="mb-3 text-slate-600">
      Each feature folder has an <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">index.ts</code> that re-exports only the public interface. Internal implementation details stay hidden.
    </p>
    <div class="space-y-4">
      <div>
        <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">user/index.ts — the barrel file</p>
        <pre class="code-block"><code>{@html `<span class="cmt">// Public API of the user module</span>
<span class="kw">export</span> { <span class="fn">UserController</span> } <span class="kw">from</span> <span class="str">'./userController'</span>;
<span class="kw">export</span> { <span class="fn">UserService</span> } <span class="kw">from</span> <span class="str">'./userService'</span>;
<span class="kw">export</span> <span class="kw">type</span> { <span class="fn">User</span>, <span class="fn">CreateUserDTO</span> } <span class="kw">from</span> <span class="str">'./types'</span>;

<span class="cmt">// NOT exported: userRepository, hashPassword, etc.</span>
<span class="cmt">// These are internal implementation details</span>`}</code></pre>
      </div>
      <div>
        <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Consumers import from the barrel</p>
        <pre class="code-block"><code>{@html `<span class="cmt">// Clean import — no knowledge of internal file structure</span>
<span class="kw">import</span> { <span class="fn">UserService</span> } <span class="kw">from</span> <span class="str">'../user'</span>;

<span class="cmt">// NOT this — reaching into internals creates coupling</span>
<span class="cmt">// import { UserService } from '../user/userService';</span>`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Dependency Inversion -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Dependency Inversion in Practice</h3>
    <p class="mb-3 text-slate-600">
      High-level modules define interfaces. Low-level modules implement them. This inverts the traditional dependency direction and makes the system flexible.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt">// 1. Define the interface (what we need, not how)</span>
<span class="kw">interface</span> <span class="fn">UserRepository</span> {
  <span class="fn">findById</span>(<span class="arg">id</span>: <span class="fn">string</span>): <span class="fn">Promise</span>&lt;<span class="fn">User</span> | <span class="kw">null</span>&gt;;
  <span class="fn">save</span>(<span class="arg">user</span>: <span class="fn">User</span>): <span class="fn">Promise</span>&lt;<span class="fn">void</span>&gt;;
}

<span class="cmt">// 2. High-level module depends on the interface</span>
<span class="kw">class</span> <span class="fn">UserService</span> {
  <span class="fn">constructor</span>(<span class="kw">private</span> <span class="arg">repo</span>: <span class="fn">UserRepository</span>) {}

  <span class="kw">async</span> <span class="fn">getUser</span>(<span class="arg">id</span>: <span class="fn">string</span>) {
    <span class="kw">return</span> <span class="kw">this</span>.<span class="var">repo</span>.<span class="fn">findById</span>(<span class="arg">id</span>);
  }
}

<span class="cmt">// 3. Low-level modules implement the interface</span>
<span class="kw">class</span> <span class="fn">PostgresUserRepo</span> <span class="kw">implements</span> <span class="fn">UserRepository</span> {
  <span class="kw">async</span> <span class="fn">findById</span>(<span class="arg">id</span>: <span class="fn">string</span>) { <span class="cmt">/* SQL query */</span> }
  <span class="kw">async</span> <span class="fn">save</span>(<span class="arg">user</span>: <span class="fn">User</span>)      { <span class="cmt">/* SQL insert */</span> }
}

<span class="kw">class</span> <span class="fn">InMemoryUserRepo</span> <span class="kw">implements</span> <span class="fn">UserRepository</span> {
  <span class="kw">private</span> <span class="var">users</span> = <span class="kw">new</span> <span class="fn">Map</span>&lt;<span class="fn">string</span>, <span class="fn">User</span>&gt;();
  <span class="kw">async</span> <span class="fn">findById</span>(<span class="arg">id</span>: <span class="fn">string</span>) { <span class="kw">return</span> <span class="kw">this</span>.<span class="var">users</span>.<span class="fn">get</span>(<span class="arg">id</span>); }
  <span class="kw">async</span> <span class="fn">save</span>(<span class="arg">user</span>: <span class="fn">User</span>)      { <span class="kw">this</span>.<span class="var">users</span>.<span class="fn">set</span>(<span class="arg">user</span>.<span class="var">id</span>, <span class="arg">user</span>); }
}

<span class="cmt">// 4. Swap implementations without changing UserService</span>
<span class="kw">const</span> <span class="var">prodService</span> = <span class="kw">new</span> <span class="fn">UserService</span>(<span class="kw">new</span> <span class="fn">PostgresUserRepo</span>());
<span class="kw">const</span> <span class="var">testService</span> = <span class="kw">new</span> <span class="fn">UserService</span>(<span class="kw">new</span> <span class="fn">InMemoryUserRepo</span>());`}</code></pre>
  </div>

  <!-- Real project: React app -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Real-World Structure: React Application</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">my-react-app/</span>
  <span class="fn">src/</span>
    <span class="fn">features/</span>
      <span class="fn">auth/</span>
        <span class="str">LoginPage.tsx</span>
        <span class="str">SignupPage.tsx</span>
        <span class="str">authSlice.ts</span>      <span class="cmt">// state management</span>
        <span class="str">authApi.ts</span>         <span class="cmt">// API calls</span>
        <span class="str">useAuth.ts</span>         <span class="cmt">// custom hook</span>
        <span class="str">auth.test.ts</span>
      <span class="fn">dashboard/</span>
        <span class="str">DashboardPage.tsx</span>
        <span class="str">StatsCard.tsx</span>
        <span class="str">useDashboard.ts</span>
    <span class="fn">components/</span>           <span class="cmt">// shared UI components</span>
      <span class="str">Button.tsx</span>
      <span class="str">Modal.tsx</span>
      <span class="str">Input.tsx</span>
    <span class="fn">hooks/</span>                <span class="cmt">// shared hooks</span>
      <span class="str">useLocalStorage.ts</span>
      <span class="str">useDebounce.ts</span>
    <span class="fn">lib/</span>                  <span class="cmt">// shared utilities</span>
      <span class="str">apiClient.ts</span>
      <span class="str">formatters.ts</span>
    <span class="str">App.tsx</span>
    <span class="str">main.tsx</span>`}</code></pre>
  </div>

  <!-- Real project: Express API -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Real-World Structure: Express API</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">my-api/</span>
  <span class="fn">src/</span>
    <span class="fn">modules/</span>
      <span class="fn">user/</span>
        <span class="str">user.controller.ts</span>  <span class="cmt">// HTTP handlers</span>
        <span class="str">user.service.ts</span>     <span class="cmt">// business logic</span>
        <span class="str">user.repository.ts</span>  <span class="cmt">// database access</span>
        <span class="str">user.model.ts</span>       <span class="cmt">// data schema</span>
        <span class="str">user.routes.ts</span>      <span class="cmt">// route definitions</span>
        <span class="str">user.test.ts</span>
        <span class="str">index.ts</span>            <span class="cmt">// barrel file</span>
      <span class="fn">order/</span>
        <span class="cmt">// same structure...</span>
    <span class="fn">middleware/</span>
      <span class="str">auth.ts</span>
      <span class="str">errorHandler.ts</span>
      <span class="str">rateLimiter.ts</span>
    <span class="fn">config/</span>
      <span class="str">database.ts</span>
      <span class="str">env.ts</span>
    <span class="str">app.ts</span>                <span class="cmt">// wires everything</span>
    <span class="str">server.ts</span>             <span class="cmt">// starts listening</span>`}</code></pre>
  </div>

  <!-- Real project: Full-stack monorepo -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Real-World Structure: Full-Stack Monorepo</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">my-monorepo/</span>
  <span class="fn">packages/</span>
    <span class="fn">web/</span>                  <span class="cmt">// React frontend</span>
      <span class="fn">src/</span>
      <span class="str">package.json</span>
      <span class="str">tsconfig.json</span>
    <span class="fn">api/</span>                  <span class="cmt">// Express backend</span>
      <span class="fn">src/</span>
      <span class="str">package.json</span>
      <span class="str">tsconfig.json</span>
    <span class="fn">shared/</span>               <span class="cmt">// shared types & utils</span>
      <span class="fn">src/</span>
        <span class="str">types.ts</span>          <span class="cmt">// shared TypeScript types</span>
        <span class="str">validation.ts</span>     <span class="cmt">// shared validators</span>
        <span class="str">constants.ts</span>
      <span class="str">package.json</span>
  <span class="str">package.json</span>            <span class="cmt">// workspace root</span>
  <span class="str">turbo.json</span>              <span class="cmt">// build orchestration</span>

<span class="cmt">  // Both web and api import from shared</span>
<span class="cmt">  // import { User } from "@myapp/shared";</span>`}</code></pre>
  </div>

  <!-- Key takeaways -->
  <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-indigo-600">Key Takeaways</h3>
    <ul class="space-y-2 text-sm text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        <span>Feature-based folders keep related code together and scale better than layer-based folders.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        <span>Barrel files (<code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">index.ts</code>) define what a module exposes, hiding internal details.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        <span>Dependency inversion lets you swap implementations (database, API, mock) without changing business logic.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
        <span>Monorepos with a shared package let frontend and backend share types and validation logic.</span>
      </li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{/if}

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
