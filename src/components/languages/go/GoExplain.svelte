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

  // Staggered card animation
  let cardsVisible = $state([false, false, false]);
  onMount(() => {
    const timers = [
      setTimeout(() => (cardsVisible[0] = true), 200),
      setTimeout(() => (cardsVisible[1] = true), 450),
      setTimeout(() => (cardsVisible[2] = true), 700),
    ];
    return () => timers.forEach(clearTimeout);
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <p class="text-slate-600">
      Go (often called <strong>Golang</strong>) is a programming language created at
      <strong>Google</strong> in 2009 by Robert Griesemer, Rob Pike, and Ken Thompson. It was
      designed with one clear philosophy: <strong>simplicity and speed</strong>.
    </p>
  </div>

  <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-sky-800">Why Go?</h3>
    <p class="mb-4 text-slate-600">
      Google engineers were frustrated with slow compile times and complex code. They wanted a
      language that was <strong>fast to compile</strong>, <strong>easy to read</strong>, and
      <strong>great at running many tasks at once</strong>. Go was their answer.
    </p>
    <ul class="space-y-2">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        <span class="text-slate-600"><strong>Fast compilation</strong> -- Go compiles in seconds, even for large projects</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        <span class="text-slate-600"><strong>Built-in concurrency</strong> -- goroutines make running parallel tasks effortless</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        <span class="text-slate-600"><strong>Single binary deployment</strong> -- compile once, run anywhere with no dependencies</span>
      </li>
    </ul>
  </div>

  <!-- Animated use-case cards -->
  <div>
    <h3 class="mb-4 text-lg font-bold text-slate-800">Where is Go used?</h3>
    <div class="grid gap-4 sm:grid-cols-3">
      <div
        class="rounded-xl border-2 border-sky-200 bg-white p-5 text-center shadow-sm transition-all duration-500
          {cardsVisible[0] ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
      >
        <div class="mb-2 text-4xl">&#9729;&#65039;</div>
        <h4 class="mb-1 font-bold text-slate-800">Cloud Infrastructure</h4>
        <p class="text-sm text-slate-600">Docker, Kubernetes, and Terraform are all written in Go. It dominates the cloud-native world.</p>
      </div>
      <div
        class="rounded-xl border-2 border-sky-200 bg-white p-5 text-center shadow-sm transition-all duration-500
          {cardsVisible[1] ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
      >
        <div class="mb-2 text-4xl">&#127760;</div>
        <h4 class="mb-1 font-bold text-slate-800">APIs &amp; Microservices</h4>
        <p class="text-sm text-slate-600">Go's speed and small memory footprint make it ideal for building high-performance web services.</p>
      </div>
      <div
        class="rounded-xl border-2 border-sky-200 bg-white p-5 text-center shadow-sm transition-all duration-500
          {cardsVisible[2] ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
      >
        <div class="mb-2 text-4xl">&#128187;</div>
        <h4 class="mb-1 font-bold text-slate-800">CLI Tools</h4>
        <p class="text-sm text-slate-600">Single binary output means users just download and run. No runtime installation needed.</p>
      </div>
    </div>
  </div>

  <div class="rounded-xl border-2 border-cyan-200 bg-cyan-50 p-5">
    <p class="text-slate-700">
      Go's motto is <em>"less is more."</em> It intentionally leaves out features like
      class inheritance and operator overloading to keep codebases clean and readable.
      If a junior developer can understand your code on day one, Go considers that a win.
    </p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95"
    >
      Got it!
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Go: Under the Hood</h2>
    <p class="text-slate-600">
      Go makes deliberate, opinionated design choices. Understanding them helps you write
      idiomatic Go and appreciate why the language works the way it does.
    </p>
  </div>

  <!-- Type System -->
  <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-sky-800">Type System</h3>
    <p class="mb-3 text-slate-600">
      Go is <strong>statically typed</strong> -- types are checked at compile time. Originally Go
      had no generics, which was its most controversial design decision. Go 1.18 (2022) added
      <strong>type parameters</strong>, allowing generic functions and types.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Before generics: separate function per type</span>
<span class="kw">func</span> <span class="fn">MaxInt</span>(<span class="arg">a</span>, <span class="arg">b</span> <span class="var">int</span>) <span class="var">int</span> { ... }
<span class="kw">func</span> <span class="fn">MaxFloat</span>(<span class="arg">a</span>, <span class="arg">b</span> <span class="var">float64</span>) <span class="var">float64</span> { ... }

<span class="cmt">// With generics (Go 1.18+)</span>
<span class="kw">func</span> <span class="fn">Max</span>[<span class="var">T</span> <span class="var">constraints.Ordered</span>](<span class="arg">a</span>, <span class="arg">b</span> <span class="var">T</span>) <span class="var">T</span> {
    <span class="kw">if</span> <span class="var">a</span> <span class="op">></span> <span class="var">b</span> {
        <span class="kw">return</span> <span class="var">a</span>
    }
    <span class="kw">return</span> <span class="var">b</span>
}`}</code></pre>
  </div>

  <!-- Goroutines & Channels -->
  <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-sky-800">Goroutines &amp; Channels</h3>
    <p class="mb-3 text-slate-600">
      Goroutines are <strong>lightweight threads</strong> managed by the Go runtime, not the OS.
      You can spawn millions of them. Channels let goroutines communicate safely without shared
      memory. This follows Go's mantra: <em>"Don't communicate by sharing memory; share memory
      by communicating."</em>
    </p>
    <pre class="code-block"><code>{@html `<span class="var">ch</span> <span class="op">:=</span> <span class="fn">make</span>(<span class="kw">chan</span> <span class="var">string</span>)

<span class="kw">go</span> <span class="kw">func</span>() {
    <span class="var">ch</span> <span class="op"><-</span> <span class="str">"hello from goroutine"</span>
}()

<span class="var">msg</span> <span class="op">:=</span> <span class="op"><-</span><span class="var">ch</span>
<span class="fn">fmt.Println</span>(<span class="var">msg</span>) <span class="cmt">// "hello from goroutine"</span>`}</code></pre>
  </div>

  <!-- Interfaces -->
  <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-sky-800">Interfaces: Implicit Implementation</h3>
    <p class="mb-3 text-slate-600">
      In Go, a type implements an interface <strong>automatically</strong> if it has the right
      methods. There is no <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">implements</code>
      keyword. This enables powerful decoupling -- a type from one package can satisfy an
      interface from another without knowing it exists.
    </p>
    <pre class="code-block"><code>{@html `<span class="kw">type</span> <span class="var">Writer</span> <span class="kw">interface</span> {
    <span class="fn">Write</span>(<span class="arg">p</span> []<span class="var">byte</span>) (<span class="var">n</span> <span class="var">int</span>, <span class="var">err</span> <span class="var">error</span>)
}

<span class="cmt">// os.File implements Writer -- no declaration needed</span>
<span class="cmt">// bytes.Buffer implements Writer too</span>
<span class="cmt">// Your custom type can implement it as well</span>`}</code></pre>
  </div>

  <!-- Error Handling -->
  <div class="rounded-xl border-2 border-cyan-200 bg-cyan-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-cyan-800">Error Handling: No Exceptions</h3>
    <p class="mb-3 text-slate-600">
      Go does not have exceptions or try/catch. Instead, functions return errors as values.
      This makes error handling <strong>explicit</strong> -- you always know what can fail
      and must decide how to handle it.
    </p>
    <pre class="code-block"><code>{@html `<span class="var">file</span>, <span class="var">err</span> <span class="op">:=</span> <span class="fn">os.Open</span>(<span class="str">"data.json"</span>)
<span class="kw">if</span> <span class="var">err</span> <span class="op">!=</span> <span class="kw">nil</span> {
    <span class="kw">return</span> <span class="fn">fmt.Errorf</span>(<span class="str">"open data: %w"</span>, <span class="var">err</span>)
}
<span class="kw">defer</span> <span class="var">file</span>.<span class="fn">Close</span>()`}</code></pre>
  </div>

  <!-- Composition over Inheritance -->
  <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-sky-800">Composition over Inheritance</h3>
    <p class="mb-3 text-slate-600">
      Go has no classes and no inheritance. Instead, you compose types by
      <strong>embedding</strong> one struct inside another. This promotes flat, readable
      hierarchies.
    </p>
    <pre class="code-block"><code>{@html `<span class="kw">type</span> <span class="var">Animal</span> <span class="kw">struct</span> {
    <span class="var">Name</span> <span class="var">string</span>
}

<span class="kw">type</span> <span class="var">Dog</span> <span class="kw">struct</span> {
    <span class="var">Animal</span>        <span class="cmt">// embedded -- Dog "has an" Animal</span>
    <span class="var">Breed</span> <span class="var">string</span>
}

<span class="var">d</span> <span class="op">:=</span> <span class="var">Dog</span>{<span class="var">Animal</span>{<span class="str">"Rex"</span>}, <span class="str">"Labrador"</span>}
<span class="fn">fmt.Println</span>(<span class="var">d</span>.<span class="var">Name</span>) <span class="cmt">// "Rex" -- promoted from Animal</span>`}</code></pre>
  </div>

  <!-- Go Toolchain -->
  <div class="rounded-xl border-2 border-cyan-200 bg-cyan-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-cyan-800">The Go Toolchain</h3>
    <p class="mb-3 text-slate-600">
      Go ships with a batteries-included toolchain. No need for third-party build tools,
      formatters, or test frameworks.
    </p>
    <ul class="space-y-2">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        <span class="text-slate-600"><code class="rounded bg-slate-100 px-1 text-sm text-blue-700">go build</code> -- compile your program into a single binary</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        <span class="text-slate-600"><code class="rounded bg-slate-100 px-1 text-sm text-blue-700">go test</code> -- run tests with built-in test framework</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        <span class="text-slate-600"><code class="rounded bg-slate-100 px-1 text-sm text-blue-700">go fmt</code> -- auto-format code (one true style, no debates)</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        <span class="text-slate-600"><code class="rounded bg-slate-100 px-1 text-sm text-blue-700">go vet</code> -- static analysis for common mistakes</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
        <span class="text-slate-600"><code class="rounded bg-slate-100 px-1 text-sm text-blue-700">go mod</code> -- dependency management with modules</span>
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95"
    >
      Got it!
    </button>
  </div>
</div>

{/if}

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
