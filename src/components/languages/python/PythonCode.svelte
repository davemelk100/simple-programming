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
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Python Syntax</h2>
    <p class="text-slate-600">Python's syntax is famously clean and readable. No semicolons, no curly braces -- just clear, expressive code.</p>
  </div>

  <!-- Variables: side-by-side -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">What it does</h3>
      <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
        <p class="text-slate-600">
          Create variables by simply writing a name, an equals sign, and a value. No type declarations needed -- Python figures it out automatically.
        </p>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="var">name</span> <span class="op">=</span> <span class="str">"Alice"</span>       <span class="cmt"># a string</span>
<span class="var">age</span> <span class="op">=</span> <span class="num">25</span>              <span class="cmt"># an integer</span>
<span class="var">height</span> <span class="op">=</span> <span class="num">5.7</span>          <span class="cmt"># a float</span>
<span class="var">is_student</span> <span class="op">=</span> <span class="kw">True</span>     <span class="cmt"># a boolean</span>`}</code></pre>
    </div>
  </div>

  <!-- Functions -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Functions with <code class="rounded bg-slate-100 px-1 text-sm text-green-700">def</code></h3>
    <p class="mb-3 text-slate-600">Define functions using the <code class="rounded bg-slate-100 px-1 text-sm text-green-700">def</code> keyword. The body is indented -- that's how Python knows what belongs to the function.</p>
    <pre class="code-block"><code>{@html `<span class="kw">def</span> <span class="fn">greet</span>(<span class="arg">name</span>):
    <span class="kw">return</span> <span class="str">f"Hello, </span><span class="var">{name}</span><span class="str">!"</span>

<span class="var">message</span> <span class="op">=</span> <span class="fn">greet</span>(<span class="str">"Alice"</span>)
<span class="fn">print</span>(<span class="var">message</span>)  <span class="cmt"># → Hello, Alice!</span>

<span class="cmt"># Functions can have default parameters</span>
<span class="kw">def</span> <span class="fn">power</span>(<span class="arg">base</span>, <span class="arg">exp</span><span class="op">=</span><span class="num">2</span>):
    <span class="kw">return</span> <span class="var">base</span> <span class="op">**</span> <span class="var">exp</span>

<span class="fn">print</span>(<span class="fn">power</span>(<span class="num">3</span>))      <span class="cmt"># → 9 (uses default exp=2)</span>
<span class="fn">print</span>(<span class="fn">power</span>(<span class="num">2</span>, <span class="num">10</span>))  <span class="cmt"># → 1024</span>`}</code></pre>
  </div>

  <!-- Lists and Dicts -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Lists and Dictionaries</h3>
    <p class="mb-3 text-slate-600">Python's two most important data structures. Lists hold ordered items; dictionaries hold key-value pairs.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Lists: ordered collections</span>
<span class="var">fruits</span> <span class="op">=</span> [<span class="str">"apple"</span>, <span class="str">"banana"</span>, <span class="str">"cherry"</span>]
<span class="fn">print</span>(<span class="var">fruits</span>[<span class="num">0</span>])     <span class="cmt"># → "apple"</span>
<span class="var">fruits</span>.<span class="fn">append</span>(<span class="str">"date"</span>)  <span class="cmt"># add to end</span>
<span class="fn">print</span>(<span class="fn">len</span>(<span class="var">fruits</span>))   <span class="cmt"># → 4</span>

<span class="cmt"># Dictionaries: key-value pairs</span>
<span class="var">person</span> <span class="op">=</span> {
    <span class="str">"name"</span>: <span class="str">"Alice"</span>,
    <span class="str">"age"</span>: <span class="num">25</span>,
    <span class="str">"city"</span>: <span class="str">"Portland"</span>
}
<span class="fn">print</span>(<span class="var">person</span>[<span class="str">"name"</span>])  <span class="cmt"># → "Alice"</span>
<span class="var">person</span>[<span class="str">"email"</span>] <span class="op">=</span> <span class="str">"alice@example.com"</span>  <span class="cmt"># add new key</span>`}</code></pre>
  </div>

  <!-- Control flow -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">If / Elif / Else</h3>
    <p class="mb-3 text-slate-600">Python uses <code class="rounded bg-slate-100 px-1 text-sm text-green-700">if</code>, <code class="rounded bg-slate-100 px-1 text-sm text-green-700">elif</code> (else-if), and <code class="rounded bg-slate-100 px-1 text-sm text-green-700">else</code> for branching. Note the colons and indentation -- no parentheses needed around the condition!</p>
    <pre class="code-block"><code>{@html `<span class="var">score</span> <span class="op">=</span> <span class="num">85</span>

<span class="kw">if</span> <span class="var">score</span> <span class="op">>=</span> <span class="num">90</span>:
    <span class="fn">print</span>(<span class="str">"A - Excellent!"</span>)
<span class="kw">elif</span> <span class="var">score</span> <span class="op">>=</span> <span class="num">80</span>:
    <span class="fn">print</span>(<span class="str">"B - Good job!"</span>)
<span class="kw">elif</span> <span class="var">score</span> <span class="op">>=</span> <span class="num">70</span>:
    <span class="fn">print</span>(<span class="str">"C - Not bad"</span>)
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="str">"Keep studying!"</span>)
<span class="cmt"># → "B - Good job!"</span>`}</code></pre>
  </div>

  <!-- For loops -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">For Loops</h3>
    <p class="mb-3 text-slate-600">Python's for loop iterates directly over items -- no index counter needed.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Loop over a list</span>
<span class="var">colors</span> <span class="op">=</span> [<span class="str">"red"</span>, <span class="str">"green"</span>, <span class="str">"blue"</span>]
<span class="kw">for</span> <span class="var">color</span> <span class="kw">in</span> <span class="var">colors</span>:
    <span class="fn">print</span>(<span class="str">f"I like </span><span class="var">{color}</span><span class="str">"</span>)

<span class="cmt"># Loop with range</span>
<span class="kw">for</span> <span class="var">i</span> <span class="kw">in</span> <span class="fn">range</span>(<span class="num">5</span>):
    <span class="fn">print</span>(<span class="var">i</span>)  <span class="cmt"># prints 0, 1, 2, 3, 4</span>

<span class="cmt"># Loop over a dictionary</span>
<span class="kw">for</span> <span class="var">key</span>, <span class="var">value</span> <span class="kw">in</span> <span class="var">person</span>.<span class="fn">items</span>():
    <span class="fn">print</span>(<span class="str">f"</span><span class="var">{key}</span><span class="str">: </span><span class="var">{value}</span><span class="str">"</span>)`}</code></pre>
  </div>

  <!-- F-strings -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">F-Strings</h3>
    <p class="mb-3 text-slate-600">Python's f-strings (formatted string literals) let you embed expressions directly inside strings. Just prefix the string with <code class="rounded bg-slate-100 px-1 text-sm text-green-700">f</code>.</p>
    <pre class="code-block"><code>{@html `<span class="var">name</span> <span class="op">=</span> <span class="str">"Alice"</span>
<span class="var">age</span> <span class="op">=</span> <span class="num">25</span>

<span class="cmt"># Embed variables</span>
<span class="fn">print</span>(<span class="str">f"</span><span class="var">{name}</span><span class="str"> is </span><span class="var">{age}</span><span class="str"> years old"</span>)

<span class="cmt"># Embed expressions</span>
<span class="fn">print</span>(<span class="str">f"Next year: </span><span class="var">{age + 1}</span><span class="str">"</span>)

<span class="cmt"># Format numbers</span>
<span class="var">pi</span> <span class="op">=</span> <span class="num">3.14159</span>
<span class="fn">print</span>(<span class="str">f"Pi is approximately </span><span class="var">{pi:.2f}</span><span class="str">"</span>)  <span class="cmt"># → "Pi is approximately 3.14"</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Advanced Python Syntax</h2>
    <p class="text-slate-600">Type hints, dataclasses, decorators, generators, context managers, and more.</p>
  </div>

  <!-- Type Hints -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Type Hints</h3>
    <p class="mb-3 text-slate-600">Python 3.5+ supports optional type annotations. They don't affect runtime behavior but improve editor support, documentation, and can be checked with tools like <code class="rounded bg-slate-100 px-1 text-sm text-green-700">mypy</code>.</p>
    <pre class="code-block"><code>{@html `<span class="kw">from</span> <span class="var">typing</span> <span class="kw">import</span> <span class="var">Optional</span>, <span class="var">Union</span>

<span class="kw">def</span> <span class="fn">greet</span>(<span class="arg">name</span>: <span class="fn">str</span>, <span class="arg">times</span>: <span class="fn">int</span> <span class="op">=</span> <span class="num">1</span>) <span class="op">-></span> <span class="fn">str</span>:
    <span class="kw">return</span> (<span class="str">f"Hello, </span><span class="var">{name}</span><span class="str">! "</span> <span class="op">*</span> <span class="var">times</span>).<span class="fn">strip</span>()

<span class="cmt"># Modern syntax (Python 3.10+)</span>
<span class="kw">def</span> <span class="fn">process</span>(<span class="arg">data</span>: <span class="fn">list</span>[<span class="fn">int</span>] <span class="op">|</span> <span class="kw">None</span>) <span class="op">-></span> <span class="fn">dict</span>[<span class="fn">str</span>, <span class="fn">int</span>]:
    <span class="kw">if</span> <span class="var">data</span> <span class="kw">is</span> <span class="kw">None</span>:
        <span class="kw">return</span> {}
    <span class="kw">return</span> {<span class="str">"sum"</span>: <span class="fn">sum</span>(<span class="var">data</span>), <span class="str">"count"</span>: <span class="fn">len</span>(<span class="var">data</span>)}`}</code></pre>
  </div>

  <!-- Dataclasses -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Dataclasses</h3>
    <p class="mb-3 text-slate-600">The <code class="rounded bg-slate-100 px-1 text-sm text-green-700">@dataclass</code> decorator auto-generates <code class="rounded bg-slate-100 px-1 text-sm text-green-700">__init__</code>, <code class="rounded bg-slate-100 px-1 text-sm text-green-700">__repr__</code>, <code class="rounded bg-slate-100 px-1 text-sm text-green-700">__eq__</code>, and more.</p>
    <pre class="code-block"><code>{@html `<span class="kw">from</span> <span class="var">dataclasses</span> <span class="kw">import</span> <span class="var">dataclass</span>, <span class="var">field</span>

<span class="op">@</span><span class="fn">dataclass</span>
<span class="kw">class</span> <span class="fn">Point</span>:
    <span class="var">x</span>: <span class="fn">float</span>
    <span class="var">y</span>: <span class="fn">float</span>

    <span class="kw">def</span> <span class="fn">distance_to</span>(<span class="arg">self</span>, <span class="arg">other</span>: <span class="str">"Point"</span>) <span class="op">-></span> <span class="fn">float</span>:
        <span class="kw">return</span> ((<span class="var">self</span>.<span class="var">x</span> <span class="op">-</span> <span class="var">other</span>.<span class="var">x</span>) <span class="op">**</span> <span class="num">2</span> <span class="op">+</span> (<span class="var">self</span>.<span class="var">y</span> <span class="op">-</span> <span class="var">other</span>.<span class="var">y</span>) <span class="op">**</span> <span class="num">2</span>) <span class="op">**</span> <span class="num">0.5</span>

<span class="var">a</span> <span class="op">=</span> <span class="fn">Point</span>(<span class="num">0</span>, <span class="num">0</span>)
<span class="var">b</span> <span class="op">=</span> <span class="fn">Point</span>(<span class="num">3</span>, <span class="num">4</span>)
<span class="fn">print</span>(<span class="var">a</span>.<span class="fn">distance_to</span>(<span class="var">b</span>))  <span class="cmt"># → 5.0</span>
<span class="fn">print</span>(<span class="var">a</span>)                   <span class="cmt"># → Point(x=0, y=0)</span>`}</code></pre>
  </div>

  <!-- Decorators -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Decorators</h3>
    <p class="mb-3 text-slate-600">Decorators are functions that wrap other functions, modifying their behavior. They use the <code class="rounded bg-slate-100 px-1 text-sm text-green-700">@</code> syntax.</p>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> <span class="var">time</span>
<span class="kw">from</span> <span class="var">functools</span> <span class="kw">import</span> <span class="var">wraps</span>

<span class="kw">def</span> <span class="fn">timer</span>(<span class="arg">func</span>):
    <span class="op">@</span><span class="fn">wraps</span>(<span class="var">func</span>)
    <span class="kw">def</span> <span class="fn">wrapper</span>(<span class="op">*</span><span class="arg">args</span>, <span class="op">**</span><span class="arg">kwargs</span>):
        <span class="var">start</span> <span class="op">=</span> <span class="var">time</span>.<span class="fn">time</span>()
        <span class="var">result</span> <span class="op">=</span> <span class="fn">func</span>(<span class="op">*</span><span class="var">args</span>, <span class="op">**</span><span class="var">kwargs</span>)
        <span class="fn">print</span>(<span class="str">f"</span><span class="var">{func.__name__}</span><span class="str"> took </span><span class="var">{time.time() - start:.3f}</span><span class="str">s"</span>)
        <span class="kw">return</span> <span class="var">result</span>
    <span class="kw">return</span> <span class="var">wrapper</span>

<span class="op">@</span><span class="fn">timer</span>
<span class="kw">def</span> <span class="fn">slow_add</span>(<span class="arg">a</span>, <span class="arg">b</span>):
    <span class="var">time</span>.<span class="fn">sleep</span>(<span class="num">0.1</span>)
    <span class="kw">return</span> <span class="var">a</span> <span class="op">+</span> <span class="var">b</span>

<span class="fn">slow_add</span>(<span class="num">2</span>, <span class="num">3</span>)  <span class="cmt"># → prints "slow_add took 0.100s"</span>`}</code></pre>
  </div>

  <!-- Generators -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Generators &amp; Yield</h3>
    <p class="mb-3 text-slate-600">Generators produce values lazily using <code class="rounded bg-slate-100 px-1 text-sm text-green-700">yield</code>. They're memory-efficient for large or infinite sequences.</p>
    <pre class="code-block"><code>{@html `<span class="kw">def</span> <span class="fn">fibonacci</span>():
    <span class="var">a</span>, <span class="var">b</span> <span class="op">=</span> <span class="num">0</span>, <span class="num">1</span>
    <span class="kw">while</span> <span class="kw">True</span>:
        <span class="kw">yield</span> <span class="var">a</span>
        <span class="var">a</span>, <span class="var">b</span> <span class="op">=</span> <span class="var">b</span>, <span class="var">a</span> <span class="op">+</span> <span class="var">b</span>

<span class="cmt"># Take first 10 fibonacci numbers</span>
<span class="var">fib</span> <span class="op">=</span> <span class="fn">fibonacci</span>()
<span class="var">first_ten</span> <span class="op">=</span> [<span class="fn">next</span>(<span class="var">fib</span>) <span class="kw">for</span> <span class="var">_</span> <span class="kw">in</span> <span class="fn">range</span>(<span class="num">10</span>)]
<span class="cmt"># → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]</span>`}</code></pre>
  </div>

  <!-- Context Managers -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Context Managers</h3>
    <p class="mb-3 text-slate-600">The <code class="rounded bg-slate-100 px-1 text-sm text-green-700">with</code> statement ensures resources are properly cleaned up, even if exceptions occur.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># File handling with automatic close</span>
<span class="kw">with</span> <span class="fn">open</span>(<span class="str">"data.txt"</span>, <span class="str">"r"</span>) <span class="kw">as</span> <span class="var">f</span>:
    <span class="var">content</span> <span class="op">=</span> <span class="var">f</span>.<span class="fn">read</span>()
<span class="cmt"># f is automatically closed here, even if an error occurred</span>

<span class="cmt"># Custom context manager</span>
<span class="kw">from</span> <span class="var">contextlib</span> <span class="kw">import</span> <span class="var">contextmanager</span>

<span class="op">@</span><span class="fn">contextmanager</span>
<span class="kw">def</span> <span class="fn">temp_directory</span>():
    <span class="var">path</span> <span class="op">=</span> <span class="fn">create_temp_dir</span>()
    <span class="kw">try</span>:
        <span class="kw">yield</span> <span class="var">path</span>
    <span class="kw">finally</span>:
        <span class="fn">remove_dir</span>(<span class="var">path</span>)`}</code></pre>
  </div>

  <!-- Comprehensions -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Comprehensions (List, Dict, Set)</h3>
    <p class="mb-3 text-slate-600">Concise syntax for creating collections from iterables.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># List comprehension</span>
<span class="var">squares</span> <span class="op">=</span> [<span class="var">x</span><span class="op">**</span><span class="num">2</span> <span class="kw">for</span> <span class="var">x</span> <span class="kw">in</span> <span class="fn">range</span>(<span class="num">10</span>)]
<span class="cmt"># → [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]</span>

<span class="cmt"># Dict comprehension</span>
<span class="var">word_lengths</span> <span class="op">=</span> {<span class="var">w</span>: <span class="fn">len</span>(<span class="var">w</span>) <span class="kw">for</span> <span class="var">w</span> <span class="kw">in</span> [<span class="str">"hello"</span>, <span class="str">"world"</span>, <span class="str">"python"</span>]}
<span class="cmt"># → {"hello": 5, "world": 5, "python": 6}</span>

<span class="cmt"># Set comprehension</span>
<span class="var">unique_lengths</span> <span class="op">=</span> {<span class="fn">len</span>(<span class="var">w</span>) <span class="kw">for</span> <span class="var">w</span> <span class="kw">in</span> [<span class="str">"hello"</span>, <span class="str">"world"</span>, <span class="str">"python"</span>]}
<span class="cmt"># → {5, 6}</span>`}</code></pre>
  </div>

  <!-- Unpacking and Walrus -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Unpacking &amp; Walrus Operator</h3>
    <p class="mb-3 text-slate-600">Python's unpacking syntax and the walrus operator (<code class="rounded bg-slate-100 px-1 text-sm text-green-700">:=</code>) make code concise and expressive.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Tuple unpacking</span>
<span class="var">a</span>, <span class="var">b</span>, <span class="var">c</span> <span class="op">=</span> <span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>

<span class="cmt"># Star unpacking</span>
<span class="var">first</span>, <span class="op">*</span><span class="var">rest</span> <span class="op">=</span> [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>]
<span class="cmt"># first = 1, rest = [2, 3, 4, 5]</span>

<span class="cmt"># Walrus operator (:=) -- assign and use in one expression</span>
<span class="kw">if</span> (<span class="var">n</span> <span class="op">:=</span> <span class="fn">len</span>(<span class="var">data</span>)) <span class="op">></span> <span class="num">10</span>:
    <span class="fn">print</span>(<span class="str">f"Too many items: </span><span class="var">{n}</span><span class="str">"</span>)

<span class="cmt"># Useful in while loops</span>
<span class="kw">while</span> (<span class="var">line</span> <span class="op">:=</span> <span class="var">f</span>.<span class="fn">readline</span>()) <span class="op">!=</span> <span class="str">""</span>:
    <span class="fn">process</span>(<span class="var">line</span>)`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
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
