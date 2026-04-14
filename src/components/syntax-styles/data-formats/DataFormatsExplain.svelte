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

  const formats = [
    {
      icon: '{ }',
      title: 'JSON',
      desc: 'Lightweight key-value pairs. The web\'s favorite data format.',
      color: 'bg-green-100 border-green-400',
      textColor: 'text-green-700',
    },
    {
      icon: '< />',
      title: 'XML',
      desc: 'Verbose but powerful. The enterprise and document standard.',
      color: 'bg-amber-100 border-amber-400',
      textColor: 'text-amber-700',
    },
    {
      icon: '- :',
      title: 'YAML',
      desc: 'Human-friendly indentation. Popular for config files.',
      color: 'bg-purple-100 border-purple-400',
      textColor: 'text-purple-700',
    },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < formats.length) {
        visibleCards++;
      } else {
        clearInterval(interval);
      }
    }, 700);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      When two systems need to exchange information -- a browser talking to a server, or one app sending data to another -- they need a shared language. <strong>Data serialization</strong> is the process of converting structured information into a text format that both humans can read and computers can parse.
    </p>
  </div>

  <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-green-600">Think of it like a recipe card</h3>
    <p class="text-slate-600">
      Imagine you want to share a recipe with someone across the world. You could describe it however you like, but if you both agree on a standard format -- title at the top, ingredients listed, steps numbered -- then anyone can follow it. Data formats work the same way: they provide a <strong>consistent structure</strong> so any program can read the data correctly.
    </p>
  </div>

  <div class="flex flex-wrap items-start justify-evenly gap-6">
    {#each formats as card, i}
      <div
        class="flex flex-col items-center gap-2 transition-all duration-700
          {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}"
      >
        <div class="relative flex h-32 w-40 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-dashed {card.color} shadow-md transition-transform duration-300 hover:scale-105">
          <span class="font-mono text-2xl font-bold {card.textColor}">{card.icon}</span>
          <span class="mt-1 text-sm font-bold {card.textColor}">{card.title}</span>
        </div>
        <p class="w-40 text-center text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">A Person in JSON</h3>
    <p class="mb-3 text-sm text-slate-600">Here is how you might represent a person's information in JSON -- the most common format on the web:</p>
    <pre class="code-block"><code>{@html `<span class="op">{</span>
  <span class="str">"name"</span><span class="op">:</span> <span class="str">"Alice"</span><span class="op">,</span>
  <span class="str">"age"</span><span class="op">:</span> <span class="num">28</span><span class="op">,</span>
  <span class="str">"hobbies"</span><span class="op">:</span> <span class="op">[</span><span class="str">"reading"</span><span class="op">,</span> <span class="str">"hiking"</span><span class="op">,</span> <span class="str">"coding"</span><span class="op">]</span>
<span class="op">}</span>`}</code></pre>
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Why These Formats?</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
        <strong>JSON</strong> is lightweight and easy to read. It uses curly braces for objects and square brackets for arrays. Almost every programming language can parse it, and it is the default choice for web APIs.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
        <strong>XML</strong> is more verbose but extremely powerful. It uses opening and closing tags (like HTML) and supports attributes, namespaces, and schemas. It is the standard in enterprise systems, banking, and document formats like DOCX and SVG.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
        <strong>YAML</strong> uses indentation instead of braces or tags, making it very human-readable. It is the go-to choice for configuration files (Docker, Kubernetes, GitHub Actions).
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Data Serialization: Deep Dive</h2>
      <p class="text-slate-600">
        Beyond basic structure, data formats have rich ecosystems for validation, typing, streaming, and optimization. Understanding these details is essential for building robust data pipelines and APIs.
      </p>
    </div>

    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
      <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-green-600">Content Types and Headers</h3>
      <p class="text-slate-600">
        When sending data over HTTP, the <code class="rounded bg-slate-100 px-1 text-sm text-green-700">Content-Type</code> header tells the receiver what format to expect. JSON uses <code class="rounded bg-slate-100 px-1 text-sm text-green-700">application/json</code>, XML uses <code class="rounded bg-slate-100 px-1 text-sm text-green-700">application/xml</code> or <code class="rounded bg-slate-100 px-1 text-sm text-green-700">text/xml</code>, and YAML uses <code class="rounded bg-slate-100 px-1 text-sm text-green-700">application/yaml</code>. Getting this right ensures parsers on both ends know how to handle the payload.
      </p>
    </div>

    <div>
      <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">JSON with nested objects and arrays</p>
      <pre class="code-block"><code>{@html `<span class="op">{</span>
  <span class="str">"company"</span><span class="op">:</span> <span class="str">"Acme Corp"</span><span class="op">,</span>
  <span class="str">"employees"</span><span class="op">:</span> <span class="op">[</span>
    <span class="op">{</span>
      <span class="str">"name"</span><span class="op">:</span> <span class="str">"Alice"</span><span class="op">,</span>
      <span class="str">"role"</span><span class="op">:</span> <span class="str">"Engineer"</span><span class="op">,</span>
      <span class="str">"skills"</span><span class="op">:</span> <span class="op">[</span><span class="str">"TypeScript"</span><span class="op">,</span> <span class="str">"Python"</span><span class="op">,</span> <span class="str">"SQL"</span><span class="op">]</span><span class="op">,</span>
      <span class="str">"address"</span><span class="op">:</span> <span class="op">{</span>
        <span class="str">"city"</span><span class="op">:</span> <span class="str">"Portland"</span><span class="op">,</span>
        <span class="str">"state"</span><span class="op">:</span> <span class="str">"OR"</span>
      <span class="op">}</span>
    <span class="op">}</span><span class="op">,</span>
    <span class="op">{</span>
      <span class="str">"name"</span><span class="op">:</span> <span class="str">"Bob"</span><span class="op">,</span>
      <span class="str">"role"</span><span class="op">:</span> <span class="str">"Designer"</span><span class="op">,</span>
      <span class="str">"skills"</span><span class="op">:</span> <span class="op">[</span><span class="str">"Figma"</span><span class="op">,</span> <span class="str">"CSS"</span><span class="op">]</span><span class="op">,</span>
      <span class="str">"address"</span><span class="op">:</span> <span class="op">{</span>
        <span class="str">"city"</span><span class="op">:</span> <span class="str">"Seattle"</span><span class="op">,</span>
        <span class="str">"state"</span><span class="op">:</span> <span class="str">"WA"</span>
      <span class="op">}</span>
    <span class="op">}</span>
  <span class="op">]</span>
<span class="op">}</span>`}</code></pre>
    </div>

    <div>
      <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">XML with attributes vs elements</p>
      <pre class="code-block"><code>{@html `<span class="op">&lt;</span><span class="kw">company</span> <span class="var">name</span><span class="op">=</span><span class="str">"Acme Corp"</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="kw">employee</span> <span class="var">role</span><span class="op">=</span><span class="str">"Engineer"</span><span class="op">&gt;</span>
    <span class="op">&lt;</span><span class="kw">name</span><span class="op">&gt;</span>Alice<span class="op">&lt;/</span><span class="kw">name</span><span class="op">&gt;</span>
    <span class="op">&lt;</span><span class="kw">skills</span><span class="op">&gt;</span>
      <span class="op">&lt;</span><span class="kw">skill</span><span class="op">&gt;</span>TypeScript<span class="op">&lt;/</span><span class="kw">skill</span><span class="op">&gt;</span>
      <span class="op">&lt;</span><span class="kw">skill</span><span class="op">&gt;</span>Python<span class="op">&lt;/</span><span class="kw">skill</span><span class="op">&gt;</span>
    <span class="op">&lt;/</span><span class="kw">skills</span><span class="op">&gt;</span>
    <span class="op">&lt;</span><span class="kw">address</span> <span class="var">city</span><span class="op">=</span><span class="str">"Portland"</span> <span class="var">state</span><span class="op">=</span><span class="str">"OR"</span> <span class="op">/&gt;</span>
  <span class="op">&lt;/</span><span class="kw">employee</span><span class="op">&gt;</span>
<span class="op">&lt;/</span><span class="kw">company</span><span class="op">&gt;</span>

<span class="cmt">&lt;!-- Attributes vs Elements:
  - Attributes: simple values on the tag (role="Engineer")
  - Elements: nested content (&lt;name&gt;Alice&lt;/name&gt;)
  - Rule of thumb: metadata as attributes, data as elements --&gt;</span>`}</code></pre>
    </div>

    <div class="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
      <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-amber-600">JSON Schema and XML Schema (XSD)</h3>
      <p class="text-slate-600 mb-3">
        Both formats support <strong>schema validation</strong> -- a way to define rules about what the data must look like. JSON Schema uses JSON itself to describe constraints (required fields, types, ranges). XML Schema (XSD) uses XML to define the structure with strict type definitions, element ordering, and cardinality rules.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// JSON Schema example</span>
<span class="op">{</span>
  <span class="str">"type"</span><span class="op">:</span> <span class="str">"object"</span><span class="op">,</span>
  <span class="str">"required"</span><span class="op">:</span> <span class="op">[</span><span class="str">"name"</span><span class="op">,</span> <span class="str">"age"</span><span class="op">]</span><span class="op">,</span>
  <span class="str">"properties"</span><span class="op">:</span> <span class="op">{</span>
    <span class="str">"name"</span><span class="op">:</span> <span class="op">{</span> <span class="str">"type"</span><span class="op">:</span> <span class="str">"string"</span><span class="op">,</span> <span class="str">"minLength"</span><span class="op">:</span> <span class="num">1</span> <span class="op">}</span><span class="op">,</span>
    <span class="str">"age"</span><span class="op">:</span>  <span class="op">{</span> <span class="str">"type"</span><span class="op">:</span> <span class="str">"integer"</span><span class="op">,</span> <span class="str">"minimum"</span><span class="op">:</span> <span class="num">0</span> <span class="op">}</span>
  <span class="op">}</span>
<span class="op">}</span>`}</code></pre>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Parsing Strategies</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>DOM parsing (XML)</strong> -- loads the entire document into memory as a tree. Easy to navigate, but expensive for large files.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>SAX parsing (XML)</strong> -- reads the document as a stream of events (start tag, text, end tag). Uses minimal memory but is harder to program.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>Streaming JSON</strong> -- libraries like <code class="rounded bg-slate-100 px-1 text-sm text-green-700">json-stream</code> or <code class="rounded bg-slate-100 px-1 text-sm text-green-700">ijson</code> parse JSON incrementally for large datasets without loading everything into memory.
        </li>
      </ul>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Beyond Text Formats</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>YAML</strong> is technically a superset of JSON -- valid JSON is valid YAML. It adds features like anchors, aliases, and multi-line strings, making it ideal for configuration.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>TOML</strong> is designed for config files with a clear, minimal syntax. It uses sections (tables) and is the default for Rust's Cargo.toml and Python's pyproject.toml.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <strong>Protocol Buffers (Protobuf)</strong> is Google's binary serialization format. It is far smaller and faster than text formats, but not human-readable. Requires a schema (.proto file) and code generation.
        </li>
      </ul>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
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
