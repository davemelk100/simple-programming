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
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Whitespace Syntax in Practice</h2>
    <p class="text-slate-600">See how Python, YAML, and Haml use indentation to express structure. Compare the indentation-based approach to the equivalent braces-based version.</p>
  </div>

  <!-- Side-by-side comparison -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Side by Side: Braces vs. Indentation</h3>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <h4 class="mb-2 text-sm font-semibold text-slate-500">Braces version (JavaScript)</h4>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">classify</span>(<span class="arg">score</span>) {
    <span class="kw">if</span> (<span class="var">score</span> <span class="op">>=</span> <span class="num">90</span>) {
        <span class="kw">return</span> <span class="str">"A"</span>;
    } <span class="kw">else if</span> (<span class="var">score</span> <span class="op">>=</span> <span class="num">80</span>) {
        <span class="kw">return</span> <span class="str">"B"</span>;
    } <span class="kw">else if</span> (<span class="var">score</span> <span class="op">>=</span> <span class="num">70</span>) {
        <span class="kw">return</span> <span class="str">"C"</span>;
    } <span class="kw">else</span> {
        <span class="kw">return</span> <span class="str">"F"</span>;
    }
}`}</code></pre>
      </div>
      <div>
        <h4 class="mb-2 text-sm font-semibold text-purple-600">Indentation version (Python)</h4>
        <pre class="code-block"><code>{@html `<span class="kw">def</span> <span class="fn">classify</span>(<span class="arg">score</span>):
    <span class="kw">if</span> <span class="var">score</span> <span class="op">>=</span> <span class="num">90</span>:
        <span class="kw">return</span> <span class="str">"A"</span>
    <span class="kw">elif</span> <span class="var">score</span> <span class="op">>=</span> <span class="num">80</span>:
        <span class="kw">return</span> <span class="str">"B"</span>
    <span class="kw">elif</span> <span class="var">score</span> <span class="op">>=</span> <span class="num">70</span>:
        <span class="kw">return</span> <span class="str">"C"</span>
    <span class="kw">else</span>:
        <span class="kw">return</span> <span class="str">"F"</span>`}</code></pre>
      </div>
    </div>
    <p class="mt-3 text-sm text-slate-600">
      The Python version has fewer lines and no visual clutter from braces or semicolons. The structure is communicated entirely through indentation levels.
    </p>
  </div>

  <!-- Python function -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Python: A Complete Function</h3>
    <p class="mb-3 text-slate-600">Notice how every block after a colon is indented exactly one level deeper. The <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">def</code>, <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">for</code>, <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">if</code>, and <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">else</code> blocks are all defined by indentation.</p>
    <pre class="code-block"><code>{@html `<span class="kw">def</span> <span class="fn">find_longest_words</span>(<span class="arg">sentences</span>):
    <span class="str">"""Find the longest word in each sentence."""</span>
    <span class="var">results</span> <span class="op">=</span> []

    <span class="kw">for</span> <span class="var">sentence</span> <span class="kw">in</span> <span class="var">sentences</span>:
        <span class="var">words</span> <span class="op">=</span> <span class="var">sentence</span>.<span class="fn">split</span>()
        <span class="var">longest</span> <span class="op">=</span> <span class="str">""</span>

        <span class="kw">for</span> <span class="var">word</span> <span class="kw">in</span> <span class="var">words</span>:
            <span class="kw">if</span> <span class="fn">len</span>(<span class="var">word</span>) <span class="op">></span> <span class="fn">len</span>(<span class="var">longest</span>):
                <span class="var">longest</span> <span class="op">=</span> <span class="var">word</span>

        <span class="var">results</span>.<span class="fn">append</span>(<span class="var">longest</span>)

    <span class="kw">return</span> <span class="var">results</span>

<span class="cmt"># Usage</span>
<span class="var">data</span> <span class="op">=</span> [<span class="str">"the quick brown fox"</span>, <span class="str">"jumps over lazily"</span>]
<span class="fn">print</span>(<span class="fn">find_longest_words</span>(<span class="var">data</span>))
<span class="cmt"># → ["brown", "lazily"]</span>`}</code></pre>
  </div>

  <!-- YAML config file -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">YAML: A Configuration File</h3>
    <p class="mb-3 text-slate-600">YAML uses indentation to represent nested objects and lists. Each level of indentation creates a deeper level of nesting in the data structure.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Docker Compose configuration</span>
<span class="var">version</span><span class="op">:</span> <span class="str">"3.8"</span>

<span class="var">services</span><span class="op">:</span>
  <span class="var">web</span><span class="op">:</span>
    <span class="var">image</span><span class="op">:</span> <span class="str">nginx:latest</span>
    <span class="var">ports</span><span class="op">:</span>
      <span class="op">-</span> <span class="str">"80:80"</span>
      <span class="op">-</span> <span class="str">"443:443"</span>
    <span class="var">volumes</span><span class="op">:</span>
      <span class="op">-</span> <span class="str">./html:/usr/share/nginx/html</span>
    <span class="var">environment</span><span class="op">:</span>
      <span class="var">NGINX_HOST</span><span class="op">:</span> <span class="str">example.com</span>
      <span class="var">NGINX_PORT</span><span class="op">:</span> <span class="num">80</span>

  <span class="var">database</span><span class="op">:</span>
    <span class="var">image</span><span class="op">:</span> <span class="str">postgres:15</span>
    <span class="var">environment</span><span class="op">:</span>
      <span class="var">POSTGRES_DB</span><span class="op">:</span> <span class="str">myapp</span>
      <span class="var">POSTGRES_PASSWORD</span><span class="op">:</span> <span class="str">secret</span>
    <span class="var">volumes</span><span class="op">:</span>
      <span class="op">-</span> <span class="str">db_data:/var/lib/postgresql/data</span>`}</code></pre>
  </div>

  <!-- Haml template -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Haml: An HTML Template</h3>
    <p class="mb-3 text-slate-600">Haml replaces HTML's opening and closing tags with indentation-based nesting. A child element is indented one level deeper than its parent. No closing tags needed.</p>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <h4 class="mb-2 text-sm font-semibold text-purple-600">Haml</h4>
        <pre class="code-block"><code>{@html `<span class="op">%</span><span class="fn">section</span><span class="var">.hero</span>
  <span class="op">%</span><span class="fn">h1</span> Welcome to My Site
  <span class="op">%</span><span class="fn">p</span><span class="var">.lead</span>
    This is a paragraph with
    multiple lines of text.
  <span class="op">%</span><span class="fn">a</span><span class="op">{</span><span class="var">href</span><span class="op">:</span> <span class="str">"/start"</span><span class="op">}</span>
    Get Started`}</code></pre>
      </div>
      <div>
        <h4 class="mb-2 text-sm font-semibold text-slate-500">Equivalent HTML</h4>
        <pre class="code-block"><code>{@html `<span class="op">&lt;</span><span class="fn">section</span> <span class="var">class</span><span class="op">=</span><span class="str">"hero"</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="fn">h1</span><span class="op">&gt;</span>Welcome to My Site<span class="op">&lt;/</span><span class="fn">h1</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="fn">p</span> <span class="var">class</span><span class="op">=</span><span class="str">"lead"</span><span class="op">&gt;</span>
    This is a paragraph with
    multiple lines of text.
  <span class="op">&lt;/</span><span class="fn">p</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="fn">a</span> <span class="var">href</span><span class="op">=</span><span class="str">"/start"</span><span class="op">&gt;</span>
    Get Started
  <span class="op">&lt;/</span><span class="fn">a</span><span class="op">&gt;</span>
<span class="op">&lt;/</span><span class="fn">section</span><span class="op">&gt;</span>`}</code></pre>
      </div>
    </div>
  </div>

  <!-- Key takeaways -->
  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 class="mb-2 text-lg font-bold text-slate-800">Key Takeaway</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>In Python, every colon (<code class="rounded bg-slate-100 px-1 text-sm text-purple-700">:</code>) starts a new indented block</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>In YAML, indentation means "this is a property of the thing above"</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>In Haml, indentation means "this is a child element of the tag above"</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>All three trade braces/closing tags for mandatory consistent indentation</li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Advanced Whitespace Syntax</h2>
    <p class="text-slate-600">Deeper patterns, edge cases, and other whitespace-sensitive languages beyond the basics.</p>
  </div>

  <!-- Python context managers -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Python: Nested Context Managers</h3>
    <p class="mb-3 text-slate-600">Deep nesting in Python can lead to very wide code. Python 3.10 introduced parenthesized context managers to help. Notice how the indentation levels stack up with each nested <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">with</code> block.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Before Python 3.10: deep nesting</span>
<span class="kw">with</span> <span class="fn">open</span>(<span class="str">"input.txt"</span>) <span class="kw">as</span> <span class="var">infile</span>:
    <span class="kw">with</span> <span class="fn">open</span>(<span class="str">"output.txt"</span>, <span class="str">"w"</span>) <span class="kw">as</span> <span class="var">outfile</span>:
        <span class="kw">with</span> <span class="fn">open</span>(<span class="str">"log.txt"</span>, <span class="str">"a"</span>) <span class="kw">as</span> <span class="var">logfile</span>:
            <span class="kw">for</span> <span class="var">line</span> <span class="kw">in</span> <span class="var">infile</span>:
                <span class="var">processed</span> <span class="op">=</span> <span class="var">line</span>.<span class="fn">strip</span>().<span class="fn">upper</span>()
                <span class="var">outfile</span>.<span class="fn">write</span>(<span class="var">processed</span> <span class="op">+</span> <span class="str">"\\n"</span>)
                <span class="var">logfile</span>.<span class="fn">write</span>(<span class="str">f"Processed: </span><span class="var">{line.strip()}</span><span class="str">\\n"</span>)

<span class="cmt"># Python 3.10+: parenthesized context managers</span>
<span class="kw">with</span> (
    <span class="fn">open</span>(<span class="str">"input.txt"</span>) <span class="kw">as</span> <span class="var">infile</span>,
    <span class="fn">open</span>(<span class="str">"output.txt"</span>, <span class="str">"w"</span>) <span class="kw">as</span> <span class="var">outfile</span>,
    <span class="fn">open</span>(<span class="str">"log.txt"</span>, <span class="str">"a"</span>) <span class="kw">as</span> <span class="var">logfile</span>,
):
    <span class="kw">for</span> <span class="var">line</span> <span class="kw">in</span> <span class="var">infile</span>:
        <span class="var">processed</span> <span class="op">=</span> <span class="var">line</span>.<span class="fn">strip</span>().<span class="fn">upper</span>()
        <span class="var">outfile</span>.<span class="fn">write</span>(<span class="var">processed</span> <span class="op">+</span> <span class="str">"\\n"</span>)`}</code></pre>
  </div>

  <!-- YAML advanced features -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">YAML: Anchors, Multi-Line, and Flow Style</h3>
    <p class="mb-3 text-slate-600">YAML has advanced features for reducing duplication (anchors/aliases), handling multi-line text, and an inline "flow" style that bypasses indentation for compact data.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Anchors and aliases: define once, reuse</span>
<span class="var">defaults</span><span class="op">:</span> <span class="op">&amp;</span><span class="var">default_settings</span>
  <span class="var">timeout</span><span class="op">:</span> <span class="num">30</span>
  <span class="var">retries</span><span class="op">:</span> <span class="num">3</span>
  <span class="var">log_level</span><span class="op">:</span> <span class="str">info</span>

<span class="var">production</span><span class="op">:</span>
  <span class="op">&lt;&lt;</span><span class="op">:</span> <span class="op">*</span><span class="var">default_settings</span>
  <span class="var">log_level</span><span class="op">:</span> <span class="str">warning</span>     <span class="cmt"># overrides the anchor value</span>

<span class="cmt"># Multi-line strings</span>
<span class="var">literal_block</span><span class="op">:</span> <span class="op">|</span>        <span class="cmt"># preserves newlines</span>
  <span class="str">Line one stays on its own line.</span>
  <span class="str">Line two also stays separate.</span>
  <span class="str">Each newline is kept as-is.</span>

<span class="var">folded_block</span><span class="op">:</span> <span class="op">&gt;</span>         <span class="cmt"># folds newlines into spaces</span>
  <span class="str">This long paragraph will</span>
  <span class="str">be joined into a single</span>
  <span class="str">line with spaces.</span>

<span class="cmt"># Flow style: inline, no indentation needed</span>
<span class="var">flow_list</span><span class="op">:</span> <span class="op">[</span><span class="str">one</span>, <span class="str">two</span>, <span class="str">three</span><span class="op">]</span>
<span class="var">flow_map</span><span class="op">:</span> <span class="op">{</span><span class="var">name</span><span class="op">:</span> <span class="str">Alice</span>, <span class="var">age</span><span class="op">:</span> <span class="num">30</span><span class="op">}</span>`}</code></pre>
  </div>

  <!-- Makefile tabs -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Makefiles: Where Only Tabs Will Do</h3>
    <p class="mb-3 text-slate-600">
      The <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">make</code> build tool has one of the oldest whitespace rules in computing: recipe lines <strong>must</strong> start with a literal tab character. Spaces will cause a cryptic error. This decision dates back to 1976, and its creator Stuart Feldman later said he kept it because early adopters already depended on it.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Makefile -- recipe lines MUST use tabs, not spaces</span>
<span class="var">build</span><span class="op">:</span> <span class="var">main.o</span> <span class="var">utils.o</span>
<span class="str">&#9;</span><span class="fn">gcc</span> <span class="op">-</span><span class="var">o</span> <span class="var">app</span> <span class="var">main.o</span> <span class="var">utils.o</span>

<span class="var">main.o</span><span class="op">:</span> <span class="var">main.c</span>
<span class="str">&#9;</span><span class="fn">gcc</span> <span class="op">-</span><span class="var">c</span> <span class="var">main.c</span>

<span class="var">clean</span><span class="op">:</span>
<span class="str">&#9;</span><span class="fn">rm</span> <span class="op">-</span><span class="var">f</span> <span class="op">*</span>.<span class="var">o</span> <span class="var">app</span>
<span class="cmt"># ↑ Each indented line MUST be a real tab character</span>`}</code></pre>
  </div>

  <!-- CoffeeScript -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">CoffeeScript: JavaScript with Indentation</h3>
    <p class="mb-3 text-slate-600">CoffeeScript (popular around 2011-2015) brought Python-style significant whitespace to JavaScript. It compiled to JS and proved that many developers preferred the cleaner look. Its ideas influenced modern JavaScript features like arrow functions and destructuring.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># CoffeeScript -- compiles to JavaScript</span>
<span class="var">greet</span> <span class="op">=</span> (<span class="arg">name</span>) <span class="op">-></span>
  <span class="kw">if</span> <span class="var">name</span><span class="op">?</span>
    <span class="fn">console</span>.<span class="fn">log</span> <span class="str">"Hello, #{name}!"</span>
  <span class="kw">else</span>
    <span class="fn">console</span>.<span class="fn">log</span> <span class="str">"Hello, stranger!"</span>

<span class="var">numbers</span> <span class="op">=</span> [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>]
<span class="var">evens</span> <span class="op">=</span> (<span class="var">n</span> <span class="kw">for</span> <span class="var">n</span> <span class="kw">in</span> <span class="var">numbers</span> <span class="kw">when</span> <span class="var">n</span> <span class="op">%</span> <span class="num">2</span> <span class="op">is</span> <span class="num">0</span>)
<span class="cmt"># No braces, no semicolons, no var/let/const</span>`}</code></pre>
  </div>

  <!-- Haskell layout rule -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Haskell: The Layout Rule</h3>
    <p class="mb-3 text-slate-600">
      Haskell implements the off-side rule for <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">where</code>, <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">let</code>, <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">do</code>, and <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">of</code> blocks. You can optionally use braces and semicolons instead, but almost nobody does. The layout rule makes Haskell code look clean and mathematical.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt">-- Haskell: layout rule in action</span>
<span class="fn">fibonacci</span> <span class="op">::</span> <span class="fn">Int</span> <span class="op">-></span> <span class="fn">Int</span>
<span class="fn">fibonacci</span> <span class="var">n</span>
  <span class="op">|</span> <span class="var">n</span> <span class="op">&lt;=</span> <span class="num">0</span>    <span class="op">=</span> <span class="num">0</span>
  <span class="op">|</span> <span class="var">n</span> <span class="op">==</span> <span class="num">1</span>    <span class="op">=</span> <span class="num">1</span>
  <span class="op">|</span> <span class="var">otherwise</span> <span class="op">=</span> <span class="fn">fibonacci</span> (<span class="var">n</span> <span class="op">-</span> <span class="num">1</span>) <span class="op">+</span> <span class="fn">fibonacci</span> (<span class="var">n</span> <span class="op">-</span> <span class="num">2</span>)

<span class="fn">main</span> <span class="op">::</span> <span class="fn">IO</span> ()
<span class="fn">main</span> <span class="op">=</span> <span class="kw">do</span>
  <span class="kw">let</span> <span class="var">results</span> <span class="op">=</span> <span class="fn">map</span> <span class="fn">fibonacci</span> [<span class="num">0</span>..<span class="num">10</span>]
  <span class="fn">putStrLn</span> (<span class="fn">show</span> <span class="var">results</span>)
  <span class="cmt">-- The do block and let bindings use indentation</span>`}</code></pre>
  </div>

  <!-- Edge cases -->
  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-slate-800">Edge Cases and Gotchas</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span><strong>Python empty blocks:</strong> Use <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">pass</code> as a placeholder -- you cannot have an empty indented block</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span><strong>YAML gotcha:</strong> A key followed by a value on the same line (<code class="rounded bg-slate-100 px-1 text-sm text-purple-700">key: value</code>) is different from a key with an indented block below it. Mixing these up causes silent data structure changes</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span><strong>Line continuation:</strong> Python allows implicit continuation inside parentheses, brackets, and braces -- this is the standard way to break long lines without using backslashes</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span><strong>Trailing whitespace:</strong> Invisible spaces at the end of a line can occasionally cause issues in YAML and diff views. Most editors can be configured to strip trailing whitespace on save</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span><strong>Significant whitespace in Markdown:</strong> Two trailing spaces at the end of a line create a line break -- another example of whitespace carrying meaning that is invisible to the eye</li>
    </ul>
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
