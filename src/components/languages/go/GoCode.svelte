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
<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Go Code Basics</h2>
    <p class="text-slate-600">
      Go is famously simple. Here's everything you need to write your first Go programs.
    </p>
  </div>

  <!-- Hello World side-by-side -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">What it does</h3>
      <div class="rounded-xl border-2 border-sky-200 bg-sky-50 p-5">
        <ul class="space-y-2">
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
            <span class="text-slate-600">Every Go file starts with a <strong>package</strong> declaration</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
            <span class="text-slate-600"><strong>import</strong> brings in packages from the standard library</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
            <span class="text-slate-600"><strong>func main()</strong> is the entry point of your program</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
            <span class="text-slate-600"><strong>fmt.Println</strong> prints a line to the console</span>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="kw">package</span> <span class="var">main</span>

<span class="kw">import</span> <span class="str">"fmt"</span>

<span class="kw">func</span> <span class="fn">main</span>() {
    <span class="fn">fmt.Println</span>(<span class="str">"Hello, World!"</span>)
}`}</code></pre>
    </div>
  </div>

  <!-- Variables -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Variables</h3>
    <p class="mb-2 text-sm text-slate-600">Go has two ways to declare variables. The short form <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">:=</code> is used most often inside functions.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Short variable declaration (most common)</span>
<span class="var">name</span> <span class="op">:=</span> <span class="str">"Gopher"</span>         <span class="cmt">// type inferred as string</span>
<span class="var">age</span> <span class="op">:=</span> <span class="num">10</span>                <span class="cmt">// type inferred as int</span>
<span class="var">pi</span> <span class="op">:=</span> <span class="num">3.14</span>              <span class="cmt">// type inferred as float64</span>
<span class="var">active</span> <span class="op">:=</span> <span class="kw">true</span>           <span class="cmt">// type inferred as bool</span>

<span class="cmt">// Explicit declaration with var</span>
<span class="kw">var</span> <span class="var">count</span> <span class="var">int</span> <span class="op">=</span> <span class="num">0</span>        <span class="cmt">// explicit type</span>
<span class="kw">var</span> <span class="var">message</span> <span class="var">string</span>        <span class="cmt">// zero value: "" (empty string)</span>
<span class="kw">var</span> <span class="var">score</span> <span class="var">int</span>             <span class="cmt">// zero value: 0</span>`}</code></pre>
  </div>

  <!-- Functions -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Functions</h3>
    <p class="mb-2 text-sm text-slate-600">Go functions declare parameter types after the name and return types after the parameter list.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Function with parameters and return type</span>
<span class="kw">func</span> <span class="fn">add</span>(<span class="arg">a</span> <span class="var">int</span>, <span class="arg">b</span> <span class="var">int</span>) <span class="var">int</span> {
    <span class="kw">return</span> <span class="var">a</span> <span class="op">+</span> <span class="var">b</span>
}

<span class="cmt">// Multiple return values (very common in Go)</span>
<span class="kw">func</span> <span class="fn">divide</span>(<span class="arg">a</span>, <span class="arg">b</span> <span class="var">float64</span>) (<span class="var">float64</span>, <span class="var">error</span>) {
    <span class="kw">if</span> <span class="var">b</span> <span class="op">==</span> <span class="num">0</span> {
        <span class="kw">return</span> <span class="num">0</span>, <span class="fn">fmt.Errorf</span>(<span class="str">"cannot divide by zero"</span>)
    }
    <span class="kw">return</span> <span class="var">a</span> <span class="op">/</span> <span class="var">b</span>, <span class="kw">nil</span>
}

<span class="cmt">// Calling it</span>
<span class="var">result</span>, <span class="var">err</span> <span class="op">:=</span> <span class="fn">divide</span>(<span class="num">10</span>, <span class="num">3</span>)`}</code></pre>
  </div>

  <!-- Slices and Maps -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Slices &amp; Maps</h3>
    <p class="mb-2 text-sm text-slate-600">Slices are Go's dynamic arrays. Maps are key-value pairs (like dictionaries or objects).</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Slices (dynamic arrays)</span>
<span class="var">fruits</span> <span class="op">:=</span> []<span class="var">string</span>{<span class="str">"apple"</span>, <span class="str">"banana"</span>, <span class="str">"cherry"</span>}
<span class="var">fruits</span> <span class="op">=</span> <span class="fn">append</span>(<span class="var">fruits</span>, <span class="str">"date"</span>)  <span class="cmt">// add an element</span>
<span class="fn">fmt.Println</span>(<span class="var">fruits</span>[<span class="num">0</span>])            <span class="cmt">// "apple"</span>
<span class="fn">fmt.Println</span>(<span class="fn">len</span>(<span class="var">fruits</span>))          <span class="cmt">// 4</span>

<span class="cmt">// Maps (key-value pairs)</span>
<span class="var">ages</span> <span class="op">:=</span> <span class="kw">map</span>[<span class="var">string</span>]<span class="var">int</span>{
    <span class="str">"Alice"</span>: <span class="num">30</span>,
    <span class="str">"Bob"</span>:   <span class="num">25</span>,
}
<span class="var">ages</span>[<span class="str">"Charlie"</span>] <span class="op">=</span> <span class="num">35</span>             <span class="cmt">// add entry</span>
<span class="fn">fmt.Println</span>(<span class="var">ages</span>[<span class="str">"Alice"</span>])        <span class="cmt">// 30</span>`}</code></pre>
  </div>

  <!-- Control Flow -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Control Flow</h3>
    <p class="mb-2 text-sm text-slate-600">Go has only one loop keyword: <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">for</code>. It does the job of for, while, and foreach.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// If/else (no parentheses around condition)</span>
<span class="kw">if</span> <span class="var">age</span> <span class="op">>=</span> <span class="num">18</span> {
    <span class="fn">fmt.Println</span>(<span class="str">"adult"</span>)
} <span class="kw">else</span> {
    <span class="fn">fmt.Println</span>(<span class="str">"minor"</span>)
}

<span class="cmt">// Classic for loop</span>
<span class="kw">for</span> <span class="var">i</span> <span class="op">:=</span> <span class="num">0</span>; <span class="var">i</span> <span class="op"><</span> <span class="num">5</span>; <span class="var">i</span><span class="op">++</span> {
    <span class="fn">fmt.Println</span>(<span class="var">i</span>)
}

<span class="cmt">// For-range (iterate over a slice)</span>
<span class="kw">for</span> <span class="var">i</span>, <span class="var">fruit</span> <span class="op">:=</span> <span class="kw">range</span> <span class="var">fruits</span> {
    <span class="fn">fmt.Printf</span>(<span class="str">"%d: %s\\n"</span>, <span class="var">i</span>, <span class="var">fruit</span>)
}

<span class="cmt">// While-style loop (just "for" with a condition)</span>
<span class="kw">for</span> <span class="var">count</span> <span class="op"><</span> <span class="num">10</span> {
    <span class="var">count</span><span class="op">++</span>
}`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-cyan-200 bg-cyan-50 p-5">
    <p class="text-sm text-slate-700">
      Notice the simplicity: no semicolons at end of lines, no parentheses around
      <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">if</code> conditions, and
      just one loop keyword. Go is designed so there's usually <strong>one obvious way</strong>
      to write something.
    </p>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Go Code: Advanced</h2>
    <p class="text-slate-600">Goroutines, interfaces, error handling patterns, and more.</p>
  </div>

  <!-- Goroutines & Channels -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Goroutines &amp; Channels</h3>
    <p class="mb-2 text-sm text-slate-600">Goroutines are lightweight concurrent functions. Channels are typed pipes that connect them.</p>
    <pre class="code-block"><code>{@html `<span class="kw">package</span> <span class="var">main</span>

<span class="kw">import</span> (
    <span class="str">"fmt"</span>
    <span class="str">"time"</span>
)

<span class="kw">func</span> <span class="fn">fetch</span>(<span class="arg">url</span> <span class="var">string</span>, <span class="arg">ch</span> <span class="kw">chan</span><span class="op"><-</span> <span class="var">string</span>) {
    <span class="fn">time.Sleep</span>(<span class="num">100</span> <span class="op">*</span> <span class="var">time.Millisecond</span>)
    <span class="var">ch</span> <span class="op"><-</span> <span class="fn">fmt.Sprintf</span>(<span class="str">"fetched %s"</span>, <span class="var">url</span>)
}

<span class="kw">func</span> <span class="fn">main</span>() {
    <span class="var">ch</span> <span class="op">:=</span> <span class="fn">make</span>(<span class="kw">chan</span> <span class="var">string</span>, <span class="num">3</span>) <span class="cmt">// buffered channel</span>

    <span class="var">urls</span> <span class="op">:=</span> []<span class="var">string</span>{<span class="str">"google.com"</span>, <span class="str">"github.com"</span>, <span class="str">"go.dev"</span>}
    <span class="kw">for</span> _, <span class="var">url</span> <span class="op">:=</span> <span class="kw">range</span> <span class="var">urls</span> {
        <span class="kw">go</span> <span class="fn">fetch</span>(<span class="var">url</span>, <span class="var">ch</span>) <span class="cmt">// launch 3 goroutines</span>
    }

    <span class="cmt">// Collect results (order may vary!)</span>
    <span class="kw">for</span> <span class="var">i</span> <span class="op">:=</span> <span class="num">0</span>; <span class="var">i</span> <span class="op"><</span> <span class="fn">len</span>(<span class="var">urls</span>); <span class="var">i</span><span class="op">++</span> {
        <span class="fn">fmt.Println</span>(<span class="op"><-</span><span class="var">ch</span>)
    }
}`}</code></pre>
  </div>

  <!-- Interfaces -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Interfaces</h3>
    <p class="mb-2 text-sm text-slate-600">Interfaces are satisfied implicitly. If your type has the right methods, it implements the interface automatically.</p>
    <pre class="code-block"><code>{@html `<span class="kw">type</span> <span class="var">Shape</span> <span class="kw">interface</span> {
    <span class="fn">Area</span>() <span class="var">float64</span>
    <span class="fn">Perimeter</span>() <span class="var">float64</span>
}

<span class="kw">type</span> <span class="var">Circle</span> <span class="kw">struct</span> {
    <span class="var">Radius</span> <span class="var">float64</span>
}

<span class="cmt">// Circle implicitly implements Shape</span>
<span class="kw">func</span> (<span class="arg">c</span> <span class="var">Circle</span>) <span class="fn">Area</span>() <span class="var">float64</span> {
    <span class="kw">return</span> <span class="var">math.Pi</span> <span class="op">*</span> <span class="var">c</span>.<span class="var">Radius</span> <span class="op">*</span> <span class="var">c</span>.<span class="var">Radius</span>
}

<span class="kw">func</span> (<span class="arg">c</span> <span class="var">Circle</span>) <span class="fn">Perimeter</span>() <span class="var">float64</span> {
    <span class="kw">return</span> <span class="num">2</span> <span class="op">*</span> <span class="var">math.Pi</span> <span class="op">*</span> <span class="var">c</span>.<span class="var">Radius</span>
}

<span class="cmt">// Works with any Shape</span>
<span class="kw">func</span> <span class="fn">printInfo</span>(<span class="arg">s</span> <span class="var">Shape</span>) {
    <span class="fn">fmt.Printf</span>(<span class="str">"Area: %.2f, Perimeter: %.2f\\n"</span>, <span class="var">s</span>.<span class="fn">Area</span>(), <span class="var">s</span>.<span class="fn">Perimeter</span>())
}`}</code></pre>
  </div>

  <!-- Struct Methods -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Struct Methods</h3>
    <p class="mb-2 text-sm text-slate-600">Methods are functions with a <strong>receiver</strong>. Use pointer receivers to mutate the struct.</p>
    <pre class="code-block"><code>{@html `<span class="kw">type</span> <span class="var">Counter</span> <span class="kw">struct</span> {
    <span class="var">value</span> <span class="var">int</span>
}

<span class="cmt">// Value receiver (reads only)</span>
<span class="kw">func</span> (<span class="arg">c</span> <span class="var">Counter</span>) <span class="fn">Value</span>() <span class="var">int</span> {
    <span class="kw">return</span> <span class="var">c</span>.<span class="var">value</span>
}

<span class="cmt">// Pointer receiver (can modify the struct)</span>
<span class="kw">func</span> (<span class="arg">c</span> <span class="op">*</span><span class="var">Counter</span>) <span class="fn">Increment</span>() {
    <span class="var">c</span>.<span class="var">value</span><span class="op">++</span>
}

<span class="var">counter</span> <span class="op">:=</span> <span class="op">&</span><span class="var">Counter</span>{<span class="var">value</span>: <span class="num">0</span>}
<span class="var">counter</span>.<span class="fn">Increment</span>()
<span class="fn">fmt.Println</span>(<span class="var">counter</span>.<span class="fn">Value</span>()) <span class="cmt">// 1</span>`}</code></pre>
  </div>

  <!-- Error Handling Patterns -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Error Handling Patterns</h3>
    <p class="mb-2 text-sm text-slate-600">Go uses explicit error returns instead of exceptions. Here are the common patterns.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Pattern 1: Simple error check</span>
<span class="var">data</span>, <span class="var">err</span> <span class="op">:=</span> <span class="fn">os.ReadFile</span>(<span class="str">"config.json"</span>)
<span class="kw">if</span> <span class="var">err</span> <span class="op">!=</span> <span class="kw">nil</span> {
    <span class="kw">return</span> <span class="fn">fmt.Errorf</span>(<span class="str">"read config: %w"</span>, <span class="var">err</span>) <span class="cmt">// wrap error</span>
}

<span class="cmt">// Pattern 2: Custom error types</span>
<span class="kw">type</span> <span class="var">NotFoundError</span> <span class="kw">struct</span> {
    <span class="var">Name</span> <span class="var">string</span>
}
<span class="kw">func</span> (<span class="arg">e</span> <span class="op">*</span><span class="var">NotFoundError</span>) <span class="fn">Error</span>() <span class="var">string</span> {
    <span class="kw">return</span> <span class="var">e</span>.<span class="var">Name</span> <span class="op">+</span> <span class="str">" not found"</span>
}

<span class="cmt">// Pattern 3: errors.Is / errors.As</span>
<span class="kw">if</span> <span class="fn">errors.Is</span>(<span class="var">err</span>, <span class="var">os.ErrNotExist</span>) {
    <span class="cmt">// file does not exist</span>
}
<span class="kw">var</span> <span class="var">nfe</span> <span class="op">*</span><span class="var">NotFoundError</span>
<span class="kw">if</span> <span class="fn">errors.As</span>(<span class="var">err</span>, <span class="op">&</span><span class="var">nfe</span>) {
    <span class="fn">fmt.Println</span>(<span class="var">nfe</span>.<span class="var">Name</span>)
}`}</code></pre>
  </div>

  <!-- Defer, Panic, Recover -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Defer, Panic, Recover</h3>
    <p class="mb-2 text-sm text-slate-600"><code class="rounded bg-slate-100 px-1 text-sm text-blue-700">defer</code> schedules a call for when the function returns. <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">panic</code>/<code class="rounded bg-slate-100 px-1 text-sm text-blue-700">recover</code> handle truly exceptional situations.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// defer: runs when surrounding function returns</span>
<span class="kw">func</span> <span class="fn">readFile</span>(<span class="arg">path</span> <span class="var">string</span>) (<span class="var">string</span>, <span class="var">error</span>) {
    <span class="var">f</span>, <span class="var">err</span> <span class="op">:=</span> <span class="fn">os.Open</span>(<span class="var">path</span>)
    <span class="kw">if</span> <span class="var">err</span> <span class="op">!=</span> <span class="kw">nil</span> {
        <span class="kw">return</span> <span class="str">""</span>, <span class="var">err</span>
    }
    <span class="kw">defer</span> <span class="var">f</span>.<span class="fn">Close</span>() <span class="cmt">// always closes, even on error</span>

    <span class="var">data</span>, <span class="var">err</span> <span class="op">:=</span> <span class="fn">io.ReadAll</span>(<span class="var">f</span>)
    <span class="kw">return</span> <span class="fn">string</span>(<span class="var">data</span>), <span class="var">err</span>
}

<span class="cmt">// panic + recover (use sparingly!)</span>
<span class="kw">func</span> <span class="fn">safeDiv</span>(<span class="arg">a</span>, <span class="arg">b</span> <span class="var">int</span>) (<span class="var">result</span> <span class="var">int</span>, <span class="var">err</span> <span class="var">error</span>) {
    <span class="kw">defer</span> <span class="kw">func</span>() {
        <span class="kw">if</span> <span class="var">r</span> <span class="op">:=</span> <span class="fn">recover</span>(); <span class="var">r</span> <span class="op">!=</span> <span class="kw">nil</span> {
            <span class="var">err</span> <span class="op">=</span> <span class="fn">fmt.Errorf</span>(<span class="str">"panic: %v"</span>, <span class="var">r</span>)
        }
    }()
    <span class="kw">return</span> <span class="var">a</span> <span class="op">/</span> <span class="var">b</span>, <span class="kw">nil</span>
}`}</code></pre>
  </div>

  <!-- Generics -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Generics (Go 1.18+)</h3>
    <p class="mb-2 text-sm text-slate-600">Type parameters let you write functions and types that work with multiple types.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Generic function with type constraint</span>
<span class="kw">func</span> <span class="fn">Filter</span>[<span class="var">T</span> <span class="var">any</span>](<span class="arg">items</span> []<span class="var">T</span>, <span class="arg">predicate</span> <span class="kw">func</span>(<span class="var">T</span>) <span class="var">bool</span>) []<span class="var">T</span> {
    <span class="kw">var</span> <span class="var">result</span> []<span class="var">T</span>
    <span class="kw">for</span> _, <span class="var">item</span> <span class="op">:=</span> <span class="kw">range</span> <span class="var">items</span> {
        <span class="kw">if</span> <span class="fn">predicate</span>(<span class="var">item</span>) {
            <span class="var">result</span> <span class="op">=</span> <span class="fn">append</span>(<span class="var">result</span>, <span class="var">item</span>)
        }
    }
    <span class="kw">return</span> <span class="var">result</span>
}

<span class="cmt">// Usage</span>
<span class="var">nums</span> <span class="op">:=</span> []<span class="var">int</span>{<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>}
<span class="var">evens</span> <span class="op">:=</span> <span class="fn">Filter</span>(<span class="var">nums</span>, <span class="kw">func</span>(<span class="arg">n</span> <span class="var">int</span>) <span class="var">bool</span> {
    <span class="kw">return</span> <span class="var">n</span><span class="op">%</span><span class="num">2</span> <span class="op">==</span> <span class="num">0</span>
}) <span class="cmt">// [2, 4]</span>

<span class="var">words</span> <span class="op">:=</span> []<span class="var">string</span>{<span class="str">"go"</span>, <span class="str">"rust"</span>, <span class="str">"python"</span>}
<span class="var">short</span> <span class="op">:=</span> <span class="fn">Filter</span>(<span class="var">words</span>, <span class="kw">func</span>(<span class="arg">s</span> <span class="var">string</span>) <span class="var">bool</span> {
    <span class="kw">return</span> <span class="fn">len</span>(<span class="var">s</span>) <span class="op"><=</span> <span class="num">3</span>
}) <span class="cmt">// ["go"]</span>`}</code></pre>
  </div>

  <!-- Slices Package -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">The slices Package (Go 1.21+)</h3>
    <p class="mb-2 text-sm text-slate-600">Modern Go provides generic helper functions for common slice operations.</p>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> <span class="str">"slices"</span>

<span class="var">nums</span> <span class="op">:=</span> []<span class="var">int</span>{<span class="num">3</span>, <span class="num">1</span>, <span class="num">4</span>, <span class="num">1</span>, <span class="num">5</span>}

<span class="fn">slices.Sort</span>(<span class="var">nums</span>)                <span class="cmt">// [1, 1, 3, 4, 5]</span>
<span class="fn">slices.Contains</span>(<span class="var">nums</span>, <span class="num">4</span>)        <span class="cmt">// true</span>
<span class="fn">slices.Index</span>(<span class="var">nums</span>, <span class="num">5</span>)           <span class="cmt">// 4</span>
<span class="fn">slices.Reverse</span>(<span class="var">nums</span>)             <span class="cmt">// [5, 4, 3, 1, 1]</span>
<span class="fn">slices.Compact</span>(<span class="var">nums</span>)             <span class="cmt">// remove consecutive dupes</span>

<span class="var">max</span> <span class="op">:=</span> <span class="fn">slices.Max</span>(<span class="var">nums</span>)          <span class="cmt">// 5</span>
<span class="var">min</span> <span class="op">:=</span> <span class="fn">slices.Min</span>(<span class="var">nums</span>)          <span class="cmt">// 1</span>`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-cyan-200 bg-cyan-50 p-5">
    <p class="text-sm text-slate-700">
      Go's advanced features remain true to its simplicity philosophy. Generics were debated
      for over a decade before being added, and the implementation is intentionally more
      constrained than in languages like Java or C++. The standard library's
      <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">slices</code> and
      <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">maps</code> packages
      showcase what generics enable while keeping code readable.
    </p>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95">
      Got it
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
