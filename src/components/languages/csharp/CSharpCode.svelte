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
    <h2 class="mb-3 text-2xl font-bold text-slate-800">C# Syntax Basics</h2>
    <p class="text-slate-600">Here's how C# code is structured, from a simple "Hello World" to classes and loops.</p>
  </div>

  <!-- Side-by-side: What it does / Code -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">What It Does</h3>
      <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
        <p class="text-sm text-slate-600">
          Every C# program starts with a <strong>Main</strong> method inside a <strong>class</strong>. The <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">using</code> statement imports libraries, and <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">Console.WriteLine</code> prints text to the screen.
        </p>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="kw">using</span> <span class="var">System</span>;

<span class="kw">class</span> <span class="fn">Program</span>
{
    <span class="kw">static void</span> <span class="fn">Main</span>()
    {
        <span class="fn">Console</span>.<span class="fn">WriteLine</span>(<span class="str">"Hello, C#!"</span>);
    }
}`}</code></pre>
    </div>
  </div>

  <!-- Variables and types -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Variables &amp; Types</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// C# is strongly typed - every variable has a specific type</span>
<span class="fn">string</span> <span class="var">name</span> <span class="op">=</span> <span class="str">"Alice"</span>;       <span class="cmt">// text</span>
<span class="fn">int</span> <span class="var">age</span> <span class="op">=</span> <span class="num">25</span>;                 <span class="cmt">// whole number</span>
<span class="fn">double</span> <span class="var">price</span> <span class="op">=</span> <span class="num">9.99</span>;          <span class="cmt">// decimal number</span>
<span class="fn">bool</span> <span class="var">isActive</span> <span class="op">=</span> <span class="kw">true</span>;         <span class="cmt">// true or false</span>

<span class="cmt">// var lets the compiler figure out the type</span>
<span class="kw">var</span> <span class="var">greeting</span> <span class="op">=</span> <span class="str">"Hello!"</span>;      <span class="cmt">// inferred as string</span>
<span class="kw">var</span> <span class="var">count</span> <span class="op">=</span> <span class="num">42</span>;               <span class="cmt">// inferred as int</span>`}</code></pre>
  </div>

  <!-- Methods -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Methods (Functions)</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// A method that takes parameters and returns a value</span>
<span class="kw">static</span> <span class="fn">int</span> <span class="fn">Add</span>(<span class="fn">int</span> <span class="var">a</span>, <span class="fn">int</span> <span class="var">b</span>)
{
    <span class="kw">return</span> <span class="var">a</span> <span class="op">+</span> <span class="var">b</span>;
}

<span class="cmt">// A method that doesn't return anything (void)</span>
<span class="kw">static void</span> <span class="fn">Greet</span>(<span class="fn">string</span> <span class="var">name</span>)
{
    <span class="fn">Console</span>.<span class="fn">WriteLine</span>(<span class="str">$"Hello, {<span class="var">name</span>}!"</span>);
}

<span class="cmt">// Calling the methods</span>
<span class="fn">int</span> <span class="var">sum</span> <span class="op">=</span> <span class="fn">Add</span>(<span class="num">3</span>, <span class="num">5</span>);    <span class="cmt">// sum = 8</span>
<span class="fn">Greet</span>(<span class="str">"World"</span>);         <span class="cmt">// prints "Hello, World!"</span>`}</code></pre>
  </div>

  <!-- Arrays and Lists -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Arrays &amp; Lists</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Arrays - fixed size</span>
<span class="fn">int</span>[] <span class="var">scores</span> <span class="op">=</span> { <span class="num">90</span>, <span class="num">85</span>, <span class="num">92</span>, <span class="num">88</span> };
<span class="fn">Console</span>.<span class="fn">WriteLine</span>(<span class="var">scores</span>[<span class="num">0</span>]);  <span class="cmt">// 90 (first element)</span>

<span class="cmt">// Lists - dynamic size</span>
<span class="kw">var</span> <span class="var">names</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">List</span><span class="op">&lt;</span><span class="fn">string</span><span class="op">&gt;</span> { <span class="str">"Alice"</span>, <span class="str">"Bob"</span> };
<span class="var">names</span>.<span class="fn">Add</span>(<span class="str">"Charlie"</span>);           <span class="cmt">// add to the list</span>
<span class="fn">Console</span>.<span class="fn">WriteLine</span>(<span class="var">names</span>.<span class="var">Count</span>); <span class="cmt">// 3</span>`}</code></pre>
  </div>

  <!-- If/Else and Loops -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">If/Else &amp; Foreach Loops</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// If/else - making decisions</span>
<span class="fn">int</span> <span class="var">temperature</span> <span class="op">=</span> <span class="num">30</span>;

<span class="kw">if</span> (<span class="var">temperature</span> <span class="op">&gt;</span> <span class="num">25</span>)
{
    <span class="fn">Console</span>.<span class="fn">WriteLine</span>(<span class="str">"It's hot!"</span>);
}
<span class="kw">else if</span> (<span class="var">temperature</span> <span class="op">&gt;</span> <span class="num">15</span>)
{
    <span class="fn">Console</span>.<span class="fn">WriteLine</span>(<span class="str">"It's nice."</span>);
}
<span class="kw">else</span>
{
    <span class="fn">Console</span>.<span class="fn">WriteLine</span>(<span class="str">"It's cold!"</span>);
}

<span class="cmt">// Foreach - loop through a collection</span>
<span class="fn">string</span>[] <span class="var">fruits</span> <span class="op">=</span> { <span class="str">"apple"</span>, <span class="str">"banana"</span>, <span class="str">"cherry"</span> };

<span class="kw">foreach</span> (<span class="kw">var</span> <span class="var">fruit</span> <span class="kw">in</span> <span class="var">fruits</span>)
{
    <span class="fn">Console</span>.<span class="fn">WriteLine</span>(<span class="str">$"I like {<span class="var">fruit</span>}"</span>);
}`}</code></pre>
  </div>

  <!-- Classes -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Classes &amp; Objects</p>
    <pre class="code-block"><code>{@html `<span class="kw">public class</span> <span class="fn">Dog</span>
{
    <span class="kw">public</span> <span class="fn">string</span> <span class="var">Name</span> { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="fn">int</span> <span class="var">Age</span> { <span class="kw">get</span>; <span class="kw">set</span>; }

    <span class="kw">public void</span> <span class="fn">Bark</span>()
    {
        <span class="fn">Console</span>.<span class="fn">WriteLine</span>(<span class="str">$"{<span class="var">Name</span>} says: Woof!"</span>);
    }
}

<span class="cmt">// Creating and using an object</span>
<span class="kw">var</span> <span class="var">myDog</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">Dog</span> { <span class="var">Name</span> <span class="op">=</span> <span class="str">"Buddy"</span>, <span class="var">Age</span> <span class="op">=</span> <span class="num">3</span> };
<span class="var">myDog</span>.<span class="fn">Bark</span>();  <span class="cmt">// "Buddy says: Woof!"</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">C# Advanced Syntax</h2>
    <p class="text-slate-600">Modern C# features that make code more expressive, safe, and concise.</p>
  </div>

  <!-- LINQ -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">LINQ Queries</p>
    <pre class="code-block"><code>{@html `<span class="kw">using</span> <span class="var">System.Linq</span>;

<span class="kw">var</span> <span class="var">numbers</span> <span class="op">=</span> <span class="kw">new</span>[] { <span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>, <span class="num">6</span>, <span class="num">7</span>, <span class="num">8</span>, <span class="num">9</span>, <span class="num">10</span> };

<span class="cmt">// Method syntax (fluent)</span>
<span class="kw">var</span> <span class="var">evenSquares</span> <span class="op">=</span> <span class="var">numbers</span>
    .<span class="fn">Where</span>(<span class="var">n</span> <span class="op">=&gt;</span> <span class="var">n</span> <span class="op">%</span> <span class="num">2</span> <span class="op">==</span> <span class="num">0</span>)          <span class="cmt">// filter even</span>
    .<span class="fn">Select</span>(<span class="var">n</span> <span class="op">=&gt;</span> <span class="var">n</span> <span class="op">*</span> <span class="var">n</span>)              <span class="cmt">// square each</span>
    .<span class="fn">OrderByDescending</span>(<span class="var">n</span> <span class="op">=&gt;</span> <span class="var">n</span>)     <span class="cmt">// sort descending</span>
    .<span class="fn">ToList</span>();                        <span class="cmt">// [100, 64, 36, 16, 4]</span>

<span class="cmt">// Query syntax (SQL-like)</span>
<span class="kw">var</span> <span class="var">result</span> <span class="op">=</span> <span class="kw">from</span> <span class="var">n</span> <span class="kw">in</span> <span class="var">numbers</span>
             <span class="kw">where</span> <span class="var">n</span> <span class="op">&gt;</span> <span class="num">5</span>
             <span class="kw">orderby</span> <span class="var">n</span> <span class="kw">descending</span>
             <span class="kw">select</span> <span class="var">n</span> <span class="op">*</span> <span class="num">2</span>;
<span class="cmt">// result: [20, 18, 16, 14, 12]</span>`}</code></pre>
  </div>

  <!-- Async/Await -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Async/Await</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Asynchronous method that doesn't block the thread</span>
<span class="kw">async</span> <span class="fn">Task</span><span class="op">&lt;</span><span class="fn">List</span><span class="op">&lt;</span><span class="fn">User</span><span class="op">&gt;&gt;</span> <span class="fn">GetUsersAsync</span>()
{
    <span class="kw">using var</span> <span class="var">client</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">HttpClient</span>();
    <span class="kw">var</span> <span class="var">json</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">client</span>.<span class="fn">GetStringAsync</span>(<span class="str">"https://api.example.com/users"</span>);
    <span class="kw">return</span> <span class="fn">JsonSerializer</span>.<span class="fn">Deserialize</span><span class="op">&lt;</span><span class="fn">List</span><span class="op">&lt;</span><span class="fn">User</span><span class="op">&gt;&gt;</span>(<span class="var">json</span>);
}

<span class="cmt">// Running multiple tasks concurrently</span>
<span class="kw">var</span> <span class="var">usersTask</span> <span class="op">=</span> <span class="fn">GetUsersAsync</span>();
<span class="kw">var</span> <span class="var">ordersTask</span> <span class="op">=</span> <span class="fn">GetOrdersAsync</span>();
<span class="kw">await</span> <span class="fn">Task</span>.<span class="fn">WhenAll</span>(<span class="var">usersTask</span>, <span class="var">ordersTask</span>);

<span class="kw">var</span> <span class="var">users</span> <span class="op">=</span> <span class="var">usersTask</span>.<span class="var">Result</span>;
<span class="kw">var</span> <span class="var">orders</span> <span class="op">=</span> <span class="var">ordersTask</span>.<span class="var">Result</span>;`}</code></pre>
  </div>

  <!-- Pattern Matching -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Pattern Matching</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Switch expressions with patterns (C# 8+)</span>
<span class="fn">string</span> <span class="fn">GetDiscount</span>(<span class="fn">object</span> <span class="var">customer</span>) <span class="op">=&gt;</span> <span class="var">customer</span> <span class="kw">switch</span>
{
    <span class="fn">Employee</span> <span class="var">e</span> <span class="kw">when</span> <span class="var">e</span>.<span class="var">Years</span> <span class="op">&gt;</span> <span class="num">10</span> <span class="op">=&gt;</span> <span class="str">"30% off"</span>,
    <span class="fn">Employee</span>                       <span class="op">=&gt;</span> <span class="str">"20% off"</span>,
    <span class="fn">Student</span>                        <span class="op">=&gt;</span> <span class="str">"15% off"</span>,
    <span class="kw">null</span>                           <span class="op">=&gt;</span> <span class="kw">throw new</span> <span class="fn">ArgumentNullException</span>(),
    <span class="var">_</span>                              <span class="op">=&gt;</span> <span class="str">"No discount"</span>
};

<span class="cmt">// Property patterns (C# 8+)</span>
<span class="fn">decimal</span> <span class="fn">GetTax</span>(<span class="fn">Address</span> <span class="var">addr</span>) <span class="op">=&gt;</span> <span class="var">addr</span> <span class="kw">switch</span>
{
    { <span class="var">State</span>: <span class="str">"WA"</span> } <span class="op">=&gt;</span> <span class="num">0.065m</span>,
    { <span class="var">State</span>: <span class="str">"CA"</span> } <span class="op">=&gt;</span> <span class="num">0.0725m</span>,
    { <span class="var">State</span>: <span class="str">"OR"</span> } <span class="op">=&gt;</span> <span class="num">0.0m</span>,
    <span class="var">_</span>               <span class="op">=&gt;</span> <span class="num">0.05m</span>
};`}</code></pre>
  </div>

  <!-- Records -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Records &amp; Init-Only Properties</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Record - immutable data type with value equality</span>
<span class="kw">public record</span> <span class="fn">Product</span>(<span class="fn">string</span> <span class="var">Name</span>, <span class="fn">decimal</span> <span class="var">Price</span>);

<span class="kw">var</span> <span class="var">laptop</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">Product</span>(<span class="str">"Laptop"</span>, <span class="num">999.99m</span>);
<span class="kw">var</span> <span class="var">cheapLaptop</span> <span class="op">=</span> <span class="var">laptop</span> <span class="kw">with</span> { <span class="var">Price</span> <span class="op">=</span> <span class="num">799.99m</span> };

<span class="cmt">// Value equality (not reference equality)</span>
<span class="kw">var</span> <span class="var">a</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">Product</span>(<span class="str">"Laptop"</span>, <span class="num">999.99m</span>);
<span class="kw">var</span> <span class="var">b</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">Product</span>(<span class="str">"Laptop"</span>, <span class="num">999.99m</span>);
<span class="fn">Console</span>.<span class="fn">WriteLine</span>(<span class="var">a</span> <span class="op">==</span> <span class="var">b</span>);  <span class="cmt">// True!</span>

<span class="cmt">// Record struct (C# 10)</span>
<span class="kw">public record struct</span> <span class="fn">Point</span>(<span class="fn">double</span> <span class="var">X</span>, <span class="fn">double</span> <span class="var">Y</span>);`}</code></pre>
  </div>

  <!-- Generics -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Generics</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Generic class - works with any type</span>
<span class="kw">public class</span> <span class="fn">Result</span><span class="op">&lt;</span><span class="fn">T</span><span class="op">&gt;</span>
{
    <span class="kw">public</span> <span class="fn">T</span> <span class="var">Value</span> { <span class="kw">get</span>; }
    <span class="kw">public</span> <span class="fn">bool</span> <span class="var">IsSuccess</span> { <span class="kw">get</span>; }
    <span class="kw">public</span> <span class="fn">string</span><span class="op">?</span> <span class="var">Error</span> { <span class="kw">get</span>; }

    <span class="kw">public static</span> <span class="fn">Result</span><span class="op">&lt;</span><span class="fn">T</span><span class="op">&gt;</span> <span class="fn">Ok</span>(<span class="fn">T</span> <span class="var">value</span>) <span class="op">=&gt;</span>
        <span class="kw">new</span>() { <span class="var">Value</span> <span class="op">=</span> <span class="var">value</span>, <span class="var">IsSuccess</span> <span class="op">=</span> <span class="kw">true</span> };
    <span class="kw">public static</span> <span class="fn">Result</span><span class="op">&lt;</span><span class="fn">T</span><span class="op">&gt;</span> <span class="fn">Fail</span>(<span class="fn">string</span> <span class="var">error</span>) <span class="op">=&gt;</span>
        <span class="kw">new</span>() { <span class="var">Error</span> <span class="op">=</span> <span class="var">error</span>, <span class="var">IsSuccess</span> <span class="op">=</span> <span class="kw">false</span> };
}

<span class="kw">var</span> <span class="var">success</span> <span class="op">=</span> <span class="fn">Result</span><span class="op">&lt;</span><span class="fn">int</span><span class="op">&gt;</span>.<span class="fn">Ok</span>(<span class="num">42</span>);
<span class="kw">var</span> <span class="var">failure</span> <span class="op">=</span> <span class="fn">Result</span><span class="op">&lt;</span><span class="fn">int</span><span class="op">&gt;</span>.<span class="fn">Fail</span>(<span class="str">"Not found"</span>);`}</code></pre>
  </div>

  <!-- Extension Methods -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Extension Methods</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Add methods to existing types without modifying them</span>
<span class="kw">public static class</span> <span class="fn">StringExtensions</span>
{
    <span class="kw">public static</span> <span class="fn">string</span> <span class="fn">Truncate</span>(<span class="kw">this</span> <span class="fn">string</span> <span class="var">str</span>, <span class="fn">int</span> <span class="var">maxLength</span>)
    {
        <span class="kw">if</span> (<span class="var">str</span>.<span class="var">Length</span> <span class="op">&lt;=</span> <span class="var">maxLength</span>) <span class="kw">return</span> <span class="var">str</span>;
        <span class="kw">return</span> <span class="var">str</span>[..<span class="var">maxLength</span>] <span class="op">+</span> <span class="str">"..."</span>;
    }
}

<span class="cmt">// Now every string has a Truncate method!</span>
<span class="kw">var</span> <span class="var">title</span> <span class="op">=</span> <span class="str">"A Very Long Title That Needs Shortening"</span>;
<span class="fn">Console</span>.<span class="fn">WriteLine</span>(<span class="var">title</span>.<span class="fn">Truncate</span>(<span class="num">20</span>));
<span class="cmt">// Output: "A Very Long Title Th..."</span>`}</code></pre>
  </div>

  <!-- Nullable Reference Types -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Nullable Reference Types</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Enable nullable reference types (C# 8+)</span>
<span class="cmt">// #nullable enable</span>

<span class="fn">string</span> <span class="var">name</span> <span class="op">=</span> <span class="str">"Alice"</span>;     <span class="cmt">// cannot be null</span>
<span class="fn">string</span><span class="op">?</span> <span class="var">nickname</span> <span class="op">=</span> <span class="kw">null</span>;   <span class="cmt">// explicitly nullable</span>

<span class="cmt">// Compiler warns if you use nullable without checking</span>
<span class="fn">int</span> <span class="var">len1</span> <span class="op">=</span> <span class="var">name</span>.<span class="var">Length</span>;       <span class="cmt">// OK - name is never null</span>
<span class="fn">int</span> <span class="var">len2</span> <span class="op">=</span> <span class="var">nickname</span>.<span class="var">Length</span>;   <span class="cmt">// Warning! Could be null</span>

<span class="cmt">// Safe access patterns</span>
<span class="fn">int</span> <span class="var">safeLen</span> <span class="op">=</span> <span class="var">nickname</span><span class="op">?.</span><span class="var">Length</span> <span class="op">??</span> <span class="num">0</span>;  <span class="cmt">// null-conditional + null-coalescing</span>

<span class="kw">if</span> (<span class="var">nickname</span> <span class="kw">is not</span> <span class="kw">null</span>)
{
    <span class="fn">Console</span>.<span class="fn">WriteLine</span>(<span class="var">nickname</span>.<span class="var">Length</span>); <span class="cmt">// OK after null check</span>
}`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
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
