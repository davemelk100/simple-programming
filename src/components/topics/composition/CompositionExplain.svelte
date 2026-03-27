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

  const pipeline = [
    { input: '"hello"', fn: 'uppercase', output: '"HELLO"' },
    { input: '"HELLO"', fn: 'add "!"', output: '"HELLO!"' },
  ];

  onMount(() => {
    let step = 0;
    const interval = setInterval(() => {
      activeStep = step;
      step++;
      if (step >= pipeline.length) clearInterval(interval);
    }, 1500);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      The real power of programming comes from <strong>combining</strong> small pieces. Each piece does one thing well, and you connect them into a <strong>pipeline</strong> — plugging the output of one function into the input of the next. Small, simple functions become powerful when chained together!
    </p>
  </div>

  <!-- Pipeline visual -->
  <div class="">
    <h3 class="mb-4 text-sm font-bold text-indigo-600">A Pipeline in Action</h3>

    <div class="flex flex-col items-center gap-2">
      <!-- Initial value -->
      <div class="rounded-lg bg-indigo-100 px-6 py-3 text-lg font-bold text-indigo-700 shadow-sm">
        "hello"
      </div>

      {#each pipeline as step, i}
        <!-- Arrow down -->
        <div class="flex flex-col items-center transition-all duration-500
          {i <= activeStep ? 'opacity-100' : 'opacity-30'}">
          <svg class="h-6 w-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>

          <!-- Function block -->
          <div class="my-1 rounded-xl border-2 border-indigo-400 bg-indigo-50 px-6 py-3 text-center shadow-md
            {i === activeStep ? 'pipeline-pulse' : ''}">
            <span class="text-xs text-indigo-400">function</span>
            <div class="text-sm font-bold text-indigo-700">{step.fn}</div>
          </div>

          <svg class="h-6 w-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>

          <!-- Output -->
          <div class="rounded-lg px-6 py-3 text-lg font-bold shadow-sm transition-all duration-500
            {i <= activeStep ? 'bg-green-100 text-green-700 scale-105' : 'bg-slate-100 text-slate-500'}
            {i === activeStep ? 'output-pop' : ''}">
            {step.output}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
      I've read this
    </button>
  </div>

  {:else}
  <div class="space-y-8">
    <div>
      <p class="text-slate-600">
        Function composition is about building complex behavior from simple, reusable pieces. The <strong>pipe</strong> and <strong>compose</strong> patterns chain functions together, the <strong>middleware pattern</strong> processes data through layers, and <strong>dependency injection</strong> makes components loosely coupled and testable.
      </p>
    </div>

    <!-- Code example -->
    <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm">
      <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">TypeScript</div>
      <pre class="text-green-400">// pipe - left to right composition
const pipe = &lt;T&gt;(...fns: ((x: T) =&gt; T)[]) =&gt;
  (input: T): T =&gt; fns.reduce((val, fn) =&gt; fn(val), input);

// compose - right to left (mathematical order)
const compose = &lt;T&gt;(...fns: ((x: T) =&gt; T)[]) =&gt;
  (input: T): T =&gt; fns.reduceRight((val, fn) =&gt; fn(val), input);

// Usage
const trim = (s: string) =&gt; s.trim();
const lower = (s: string) =&gt; s.toLowerCase();
const slugify = (s: string) =&gt; s.replace(/\s+/g, "-");

const toSlug = pipe(trim, lower, slugify);
toSlug("  Hello World  "); // "hello-world"

// Middleware pattern (Express-style)
type Next = () =&gt; void;
type Middleware = (req: Request, next: Next) =&gt; void;

const logger: Middleware = (req, next) =&gt; {'{'}
  console.log(`${'{'}req.method{'}'} ${'{'}req.url{'}'}`);
  next(); // pass control to next middleware
{'}'};

// Dependency injection
class UserService {'{'}
  constructor(private db: Database, private mailer: Mailer) {'{'}{'}'}

  async createUser(data: UserData) {'{'}
    const user = await this.db.insert(data);
    await this.mailer.sendWelcome(user.email);
    return user;
  {'}'}
{'}'}</pre>
    </div>

    <!-- Pipe vs Compose illustration -->
    <div class="grid grid-cols-2 gap-4">
      <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
        <h4 class="mb-2 text-sm font-bold text-indigo-700">pipe (left &rarr; right)</h4>
        <div class="flex items-center gap-1 text-xs">
          <span class="rounded bg-indigo-200 px-2 py-1 font-bold text-indigo-700">trim</span>
          <span class="text-indigo-400">&rarr;</span>
          <span class="rounded bg-indigo-200 px-2 py-1 font-bold text-indigo-700">lower</span>
          <span class="text-indigo-400">&rarr;</span>
          <span class="rounded bg-indigo-200 px-2 py-1 font-bold text-indigo-700">slugify</span>
        </div>
        <p class="mt-2 text-xs text-slate-500">Data flows in reading order. Most intuitive.</p>
      </div>
      <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
        <h4 class="mb-2 text-sm font-bold text-indigo-700">compose (right &rarr; left)</h4>
        <div class="flex items-center gap-1 text-xs">
          <span class="rounded bg-indigo-200 px-2 py-1 font-bold text-indigo-700">slugify</span>
          <span class="text-indigo-400">&larr;</span>
          <span class="rounded bg-indigo-200 px-2 py-1 font-bold text-indigo-700">lower</span>
          <span class="text-indigo-400">&larr;</span>
          <span class="rounded bg-indigo-200 px-2 py-1 font-bold text-indigo-700">trim</span>
        </div>
        <p class="mt-2 text-xs text-slate-500">Matches math notation f(g(x)). Used in FP libraries.</p>
      </div>
    </div>

    <!-- Key concepts list -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <strong>Function composition</strong> combines small, single-purpose functions into complex transformations. Each function should do one thing well.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <strong>Middleware</strong> is a chain of functions where each can process a request and pass control to the next. Used in Express, Redux, and many frameworks.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <strong>Dependency injection</strong> passes dependencies (database, API client, etc.) into a class or function instead of hardcoding them. This makes code testable and flexible.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"></span>
          <strong>Point-free style</strong> defines functions without mentioning their arguments: <code class="text-sm">const process = pipe(trim, lower)</code> instead of <code class="text-sm">(x) =&gt; lower(trim(x))</code>.
        </li>
      </ul>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  @keyframes pipelinePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
    50% { box-shadow: 0 0 0 8px rgba(99, 102, 241, 0); }
  }
  @keyframes outputPop {
    0% { transform: scale(0.9); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1.05); }
  }
  .pipeline-pulse { animation: pipelinePulse 1s ease-in-out 2; }
  .output-pop { animation: outputPop 0.4s ease-out; }
</style>
