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

  let visibleCards = $state(0);

  const languages = [
    { emoji: '\uD83D\uDC0D', title: 'Python', desc: 'The most popular whitespace-sensitive language. Indentation defines every block -- functions, loops, conditions, and classes.' },
    { emoji: '\uD83D\uDCC4', title: 'YAML', desc: 'A data serialization format where indentation creates nested structures. Used everywhere for configuration files.' },
    { emoji: '\uD83D\uDC8E', title: 'Haml', desc: 'An HTML templating language that uses indentation to represent tag nesting. No closing tags needed.' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < languages.length) {
        visibleCards++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <p class="text-slate-600">
      Some programming languages use <strong>indentation itself</strong> as part of the syntax. There are no curly braces or begin/end keywords to mark code blocks -- the spaces or tabs at the start of each line tell the language what belongs where.
    </p>
  </div>

  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 class="mb-2 text-lg font-bold text-slate-800">Think of It Like an Outline</h3>
    <p class="text-slate-600">
      Imagine writing an outline for an essay. Main points start at the left margin, sub-points are indented once, and details under those are indented further. You never need brackets to show what belongs where -- the indentation makes it obvious. Whitespace-sensitive languages work the same way. The spaces <em>are</em> the structure.
    </p>
  </div>

  <!-- Visual comparison -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Side by Side: Indentation vs. Braces</h3>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <h4 class="mb-2 text-sm font-semibold text-purple-600">Python (indentation)</h4>
        <div class="overflow-hidden rounded-xl border border-purple-300">
          <pre class="code-block !rounded-none !border-0"><code>{@html `<span class="kw">def</span> <span class="fn">check_age</span>(<span class="arg">age</span>):
<span style="background:rgba(168,85,247,0.12)">    </span><span class="kw">if</span> <span class="var">age</span> <span class="op">>=</span> <span class="num">18</span>:
<span style="background:rgba(168,85,247,0.22)">        </span><span class="fn">print</span>(<span class="str">"Adult"</span>)
<span style="background:rgba(168,85,247,0.22)">        </span><span class="kw">if</span> <span class="var">age</span> <span class="op">>=</span> <span class="num">65</span>:
<span style="background:rgba(168,85,247,0.32)">            </span><span class="fn">print</span>(<span class="str">"Senior"</span>)
<span style="background:rgba(168,85,247,0.12)">    </span><span class="kw">else</span>:
<span style="background:rgba(168,85,247,0.22)">        </span><span class="fn">print</span>(<span class="str">"Minor"</span>)`}</code></pre>
        </div>
        <p class="mt-2 text-xs text-purple-600">The colored strips show indent levels -- each level means "inside the block above"</p>
      </div>
      <div>
        <h4 class="mb-2 text-sm font-semibold text-slate-500">JavaScript (braces)</h4>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">checkAge</span>(<span class="arg">age</span>) {
    <span class="kw">if</span> (<span class="var">age</span> <span class="op">>=</span> <span class="num">18</span>) {
        <span class="var">console</span>.<span class="fn">log</span>(<span class="str">"Adult"</span>);
        <span class="kw">if</span> (<span class="var">age</span> <span class="op">>=</span> <span class="num">65</span>) {
            <span class="var">console</span>.<span class="fn">log</span>(<span class="str">"Senior"</span>);
        }
    } <span class="kw">else</span> {
        <span class="var">console</span>.<span class="fn">log</span>(<span class="str">"Minor"</span>);
    }
}`}</code></pre>
      </div>
    </div>
    <p class="mt-3 text-slate-600">
      Both do the same thing, but Python relies purely on indentation. JavaScript uses <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">{`{}`}</code> braces to mark blocks. In Python, if you get the indentation wrong, the code <em>will not run</em>.
    </p>
  </div>

  <!-- Language cards -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Languages That Use This Style</h3>
    <div class="grid gap-4 sm:grid-cols-3">
      {#each languages as card, i}
        <div
          class="rounded-xl border-2 border-purple-200 bg-white p-5 text-center shadow-sm transition-all duration-700
            {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
        >
          <div class="mb-2 text-4xl">{card.emoji}</div>
          <h4 class="mb-1 font-bold text-slate-800">{card.title}</h4>
          <p class="text-sm text-slate-600">{card.desc}</p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Key concepts -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Why Whitespace Sensitivity?</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span><strong>Forced readability:</strong> Everyone has to indent consistently, so all code looks clean</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span><strong>Less visual noise:</strong> No braces or semicolons cluttering up the code</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span><strong>What you see is what runs:</strong> The visual structure always matches the logical structure</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span><strong>Fewer lines of code:</strong> No need for lines that contain only a closing brace</li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
      I understand whitespace-sensitive languages
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Whitespace Sensitivity: Deep Dive</h2>
    <p class="text-slate-600">
      The idea that indentation defines program structure has a formal name, a contentious history, and subtle implications across many languages.
    </p>
  </div>

  <!-- Off-side rule -->
  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 class="mb-2 text-lg font-bold text-slate-800">The Off-Side Rule</h3>
    <p class="text-slate-600">
      In 1966, Peter Landin published a paper introducing the <strong>off-side rule</strong>: any non-whitespace token that appears to the left of (or "off the side" of) the first token on the previous line is taken as the start of a new declaration. This formalized the idea that indentation carries semantic meaning. Python, Haskell, F#, and YAML all implement variations of this rule. The name is a play on football's offside rule -- once you move back past the margin, you are "out of play" for the current block.
    </p>
  </div>

  <!-- Tabs vs Spaces -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Tabs vs. Spaces: The Eternal Debate</h3>
    <p class="mb-3 text-slate-600">
      In languages where whitespace is significant, consistency is mandatory. Python 3 made this official: <strong>mixing tabs and spaces for indentation raises a <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">TabError</code></strong>. Python 2 tried to interpret mixed indentation, which led to subtle bugs where code appeared correct but executed differently than expected.
    </p>
    <p class="mb-3 text-slate-600">
      <strong>PEP 8</strong>, Python's official style guide, mandates 4 spaces per indentation level. Most editors can be configured to insert spaces when you press the Tab key. YAML requires spaces (never tabs), typically 2 spaces per level.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt"># PEP 8 compliant: 4 spaces per level</span>
<span class="kw">def</span> <span class="fn">nested_example</span>():
    <span class="kw">for</span> <span class="var">i</span> <span class="kw">in</span> <span class="fn">range</span>(<span class="num">10</span>):
        <span class="kw">if</span> <span class="var">i</span> <span class="op">%</span> <span class="num">2</span> <span class="op">==</span> <span class="num">0</span>:
            <span class="kw">for</span> <span class="var">j</span> <span class="kw">in</span> <span class="fn">range</span>(<span class="var">i</span>):
                <span class="fn">print</span>(<span class="str">f"</span><span class="var">{i}</span><span class="str"> x </span><span class="var">{j}</span><span class="str"> = </span><span class="var">{i * j}</span><span class="str">"</span>)
            <span class="fn">print</span>(<span class="str">"---"</span>)  <span class="cmt"># same level as inner for</span>
        <span class="fn">print</span>(<span class="str">f"Done with </span><span class="var">{i}</span><span class="str">"</span>)  <span class="cmt"># same level as if</span>`}</code></pre>
  </div>

  <!-- YAML indentation -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">YAML: Indentation as Data Structure</h3>
    <p class="mb-3 text-slate-600">
      In YAML, indentation defines the hierarchy of keys and values. Each level of nesting is another level of indentation. YAML also supports multi-line strings with the <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">|</code> (literal block) and <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">&gt;</code> (folded block) indicators.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt"># YAML config -- indentation IS the nesting</span>
<span class="var">server</span><span class="op">:</span>
  <span class="var">host</span><span class="op">:</span> <span class="str">0.0.0.0</span>
  <span class="var">port</span><span class="op">:</span> <span class="num">8080</span>
  <span class="var">ssl</span><span class="op">:</span>
    <span class="var">enabled</span><span class="op">:</span> <span class="kw">true</span>
    <span class="var">cert</span><span class="op">:</span> <span class="str">/etc/ssl/cert.pem</span>
  <span class="var">routes</span><span class="op">:</span>
    <span class="op">-</span> <span class="var">path</span><span class="op">:</span> <span class="str">/api</span>
      <span class="var">handler</span><span class="op">:</span> <span class="str">api_handler</span>
    <span class="op">-</span> <span class="var">path</span><span class="op">:</span> <span class="str">/health</span>
      <span class="var">handler</span><span class="op">:</span> <span class="str">health_check</span>
<span class="var">database</span><span class="op">:</span>
  <span class="var">connection</span><span class="op">:</span> <span class="str">postgres://localhost/mydb</span>
  <span class="var">pool_size</span><span class="op">:</span> <span class="num">10</span>`}</code></pre>
  </div>

  <!-- Haml -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Haml: Indentation for HTML</h3>
    <p class="mb-3 text-slate-600">
      Haml uses indentation to represent HTML tag nesting. A child element is simply indented one level deeper than its parent. No closing tags are needed -- the indentation handles it. This produces much cleaner templates than raw HTML.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt">-# Haml template -- nesting via indentation</span>
<span class="op">%</span><span class="fn">html</span>
  <span class="op">%</span><span class="fn">head</span>
    <span class="op">%</span><span class="fn">title</span> My Page
  <span class="op">%</span><span class="fn">body</span>
    <span class="op">%</span><span class="fn">header</span><span class="var">.main-header</span>
      <span class="op">%</span><span class="fn">h1</span> Welcome
      <span class="op">%</span><span class="fn">nav</span>
        <span class="op">%</span><span class="fn">ul</span>
          <span class="op">%</span><span class="fn">li</span> Home
          <span class="op">%</span><span class="fn">li</span> About
    <span class="op">%</span><span class="fn">main</span>
      <span class="op">%</span><span class="fn">p</span> Hello, world!`}</code></pre>
  </div>

  <!-- Mixed indentation bugs and Makefiles -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Edge Cases and Gotchas</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span><strong>Mixed indentation bugs:</strong> Code can look perfectly aligned in one editor but fail in another if tabs and spaces are mixed. Always configure your editor to show whitespace characters.</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span><strong>Makefiles require tabs:</strong> The original <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">make</code> utility requires actual tab characters (not spaces) before recipe commands. This is one of the oldest and most notorious whitespace sensitivity rules in computing.</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span><strong>Copy-paste hazards:</strong> Pasting code from a web page or email can silently convert tabs to spaces or strip leading whitespace, breaking the code.</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span><strong>Editor configuration:</strong> The <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">.editorconfig</code> file standard exists in large part because of whitespace-sensitive languages -- it lets teams enforce consistent indentation settings across editors.</li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
      I understand whitespace sensitivity in depth
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
