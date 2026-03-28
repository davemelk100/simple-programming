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
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Data Formats in Code</h2>
    <p class="text-sm text-slate-600">Here are the fundamental building blocks of JSON and XML. Each example shows what data you are storing and the format code that represents it.</p>
  </div>

  <!-- JSON: Objects -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">What it stores</h3>
      <div class="flex min-h-[5rem] items-center rounded-xl border-2 border-green-200 bg-green-50 p-4">
        <p class="text-sm text-slate-600">A <strong>person</strong> with a name, age, email, and a flag for whether they are active. An object groups related key-value pairs together.</p>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">JSON Code</h3>
      <pre class="code-block"><code>{@html `<span class="op">{</span>
  <span class="str">"name"</span><span class="op">:</span> <span class="str">"Alice"</span><span class="op">,</span>       <span class="cmt">// string</span>
  <span class="str">"age"</span><span class="op">:</span> <span class="num">28</span><span class="op">,</span>              <span class="cmt">// number</span>
  <span class="str">"email"</span><span class="op">:</span> <span class="str">"alice@example.com"</span><span class="op">,</span>
  <span class="str">"active"</span><span class="op">:</span> <span class="kw">true</span>          <span class="cmt">// boolean</span>
<span class="op">}</span>`}</code></pre>
    </div>
  </div>

  <!-- JSON: Arrays -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Arrays -- ordered lists of values</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// An array of strings</span>
<span class="op">[</span><span class="str">"apple"</span><span class="op">,</span> <span class="str">"banana"</span><span class="op">,</span> <span class="str">"cherry"</span><span class="op">]</span>

<span class="cmt">// An array of numbers</span>
<span class="op">[</span><span class="num">10</span><span class="op">,</span> <span class="num">20</span><span class="op">,</span> <span class="num">30</span><span class="op">,</span> <span class="num">40</span><span class="op">]</span>

<span class="cmt">// An array of objects (very common in APIs)</span>
<span class="op">[</span>
  <span class="op">{</span> <span class="str">"id"</span><span class="op">:</span> <span class="num">1</span><span class="op">,</span> <span class="str">"name"</span><span class="op">:</span> <span class="str">"Alice"</span> <span class="op">}</span><span class="op">,</span>
  <span class="op">{</span> <span class="str">"id"</span><span class="op">:</span> <span class="num">2</span><span class="op">,</span> <span class="str">"name"</span><span class="op">:</span> <span class="str">"Bob"</span> <span class="op">}</span>
<span class="op">]</span>`}</code></pre>
  </div>

  <!-- JSON: All value types -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">All JSON value types</p>
    <pre class="code-block"><code>{@html `<span class="op">{</span>
  <span class="str">"string"</span><span class="op">:</span>  <span class="str">"hello world"</span><span class="op">,</span>
  <span class="str">"number"</span><span class="op">:</span>  <span class="num">42</span><span class="op">,</span>
  <span class="str">"decimal"</span><span class="op">:</span> <span class="num">3.14</span><span class="op">,</span>
  <span class="str">"boolean"</span><span class="op">:</span> <span class="kw">true</span><span class="op">,</span>
  <span class="str">"nothing"</span><span class="op">:</span> <span class="kw">null</span><span class="op">,</span>
  <span class="str">"array"</span><span class="op">:</span>   <span class="op">[</span><span class="num">1</span><span class="op">,</span> <span class="num">2</span><span class="op">,</span> <span class="num">3</span><span class="op">]</span><span class="op">,</span>
  <span class="str">"object"</span><span class="op">:</span>  <span class="op">{</span> <span class="str">"nested"</span><span class="op">:</span> <span class="kw">true</span> <span class="op">}</span>
<span class="op">}</span>`}</code></pre>
  </div>

  <!-- Nesting -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Nesting -- objects inside objects</p>
    <pre class="code-block"><code>{@html `<span class="op">{</span>
  <span class="str">"user"</span><span class="op">:</span> <span class="op">{</span>
    <span class="str">"name"</span><span class="op">:</span> <span class="str">"Alice"</span><span class="op">,</span>
    <span class="str">"address"</span><span class="op">:</span> <span class="op">{</span>
      <span class="str">"street"</span><span class="op">:</span> <span class="str">"123 Main St"</span><span class="op">,</span>
      <span class="str">"city"</span><span class="op">:</span> <span class="str">"Portland"</span><span class="op">,</span>
      <span class="str">"zip"</span><span class="op">:</span> <span class="str">"97201"</span>
    <span class="op">}</span><span class="op">,</span>
    <span class="str">"hobbies"</span><span class="op">:</span> <span class="op">[</span><span class="str">"reading"</span><span class="op">,</span> <span class="str">"hiking"</span><span class="op">]</span>
  <span class="op">}</span>
<span class="op">}</span>`}</code></pre>
  </div>

  <!-- Same data in XML -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">The same person in XML</p>
    <pre class="code-block"><code>{@html `<span class="op">&lt;</span><span class="kw">person</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="kw">name</span><span class="op">&gt;</span>Alice<span class="op">&lt;/</span><span class="kw">name</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="kw">age</span><span class="op">&gt;</span>28<span class="op">&lt;/</span><span class="kw">age</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="kw">email</span><span class="op">&gt;</span>alice@example.com<span class="op">&lt;/</span><span class="kw">email</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="kw">active</span><span class="op">&gt;</span>true<span class="op">&lt;/</span><span class="kw">active</span><span class="op">&gt;</span>
  <span class="op">&lt;</span><span class="kw">hobbies</span><span class="op">&gt;</span>
    <span class="op">&lt;</span><span class="kw">hobby</span><span class="op">&gt;</span>reading<span class="op">&lt;/</span><span class="kw">hobby</span><span class="op">&gt;</span>
    <span class="op">&lt;</span><span class="kw">hobby</span><span class="op">&gt;</span>hiking<span class="op">&lt;/</span><span class="kw">hobby</span><span class="op">&gt;</span>
  <span class="op">&lt;/</span><span class="kw">hobbies</span><span class="op">&gt;</span>
<span class="op">&lt;/</span><span class="kw">person</span><span class="op">&gt;</span>`}</code></pre>
  </div>

  <!-- Visual comparison -->
  <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-green-600">JSON vs XML at a glance</h3>
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <p class="mb-1 text-sm font-semibold text-green-700">JSON</p>
        <ul class="space-y-1 text-sm text-slate-600">
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
            Uses <code class="rounded bg-slate-100 px-1 text-sm text-green-700">{"{ }"}</code> and <code class="rounded bg-slate-100 px-1 text-sm text-green-700">{"[ ]"}</code>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
            Compact and lightweight
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
            Built-in types: string, number, boolean, null
          </li>
        </ul>
      </div>
      <div>
        <p class="mb-1 text-sm font-semibold text-amber-700">XML</p>
        <ul class="space-y-1 text-sm text-slate-600">
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500"></span>
            Uses <code class="rounded bg-slate-100 px-1 text-sm text-green-700">{"<tag>...</tag>"}</code>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500"></span>
            More verbose but self-describing
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500"></span>
            Everything is text (no native types)
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Data Formats in Code (Advanced)</h2>
    <p class="text-sm text-slate-600">Advanced patterns for JSON Schema validation, XML namespaces, YAML features, TOML tables, and a decision guide for choosing the right format.</p>
  </div>

  <!-- JSON Schema -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">JSON Schema -- validating data structure</p>
    <pre class="code-block"><code>{@html `<span class="cmt">// A schema that validates a user object</span>
<span class="op">{</span>
  <span class="str">"$schema"</span><span class="op">:</span> <span class="str">"https://json-schema.org/draft/2020-12/schema"</span><span class="op">,</span>
  <span class="str">"type"</span><span class="op">:</span> <span class="str">"object"</span><span class="op">,</span>
  <span class="str">"required"</span><span class="op">:</span> <span class="op">[</span><span class="str">"name"</span><span class="op">,</span> <span class="str">"email"</span><span class="op">,</span> <span class="str">"age"</span><span class="op">]</span><span class="op">,</span>
  <span class="str">"properties"</span><span class="op">:</span> <span class="op">{</span>
    <span class="str">"name"</span><span class="op">:</span>  <span class="op">{</span> <span class="str">"type"</span><span class="op">:</span> <span class="str">"string"</span><span class="op">,</span> <span class="str">"minLength"</span><span class="op">:</span> <span class="num">1</span> <span class="op">}</span><span class="op">,</span>
    <span class="str">"email"</span><span class="op">:</span> <span class="op">{</span> <span class="str">"type"</span><span class="op">:</span> <span class="str">"string"</span><span class="op">,</span> <span class="str">"format"</span><span class="op">:</span> <span class="str">"email"</span> <span class="op">}</span><span class="op">,</span>
    <span class="str">"age"</span><span class="op">:</span>   <span class="op">{</span> <span class="str">"type"</span><span class="op">:</span> <span class="str">"integer"</span><span class="op">,</span> <span class="str">"minimum"</span><span class="op">:</span> <span class="num">0</span><span class="op">,</span> <span class="str">"maximum"</span><span class="op">:</span> <span class="num">150</span> <span class="op">}</span><span class="op">,</span>
    <span class="str">"roles"</span><span class="op">:</span> <span class="op">{</span>
      <span class="str">"type"</span><span class="op">:</span> <span class="str">"array"</span><span class="op">,</span>
      <span class="str">"items"</span><span class="op">:</span> <span class="op">{</span> <span class="str">"type"</span><span class="op">:</span> <span class="str">"string"</span><span class="op">,</span> <span class="str">"enum"</span><span class="op">:</span> <span class="op">[</span><span class="str">"admin"</span><span class="op">,</span> <span class="str">"editor"</span><span class="op">,</span> <span class="str">"viewer"</span><span class="op">]</span> <span class="op">}</span>
    <span class="op">}</span>
  <span class="op">}</span>
<span class="op">}</span>`}</code></pre>
  </div>

  <!-- Deeply nested JSON -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Deeply nested JSON -- a realistic API response</p>
    <pre class="code-block"><code>{@html `<span class="op">{</span>
  <span class="str">"status"</span><span class="op">:</span> <span class="str">"success"</span><span class="op">,</span>
  <span class="str">"data"</span><span class="op">:</span> <span class="op">{</span>
    <span class="str">"user"</span><span class="op">:</span> <span class="op">{</span>
      <span class="str">"id"</span><span class="op">:</span> <span class="num">42</span><span class="op">,</span>
      <span class="str">"profile"</span><span class="op">:</span> <span class="op">{</span>
        <span class="str">"name"</span><span class="op">:</span> <span class="str">"Alice"</span><span class="op">,</span>
        <span class="str">"avatar"</span><span class="op">:</span> <span class="kw">null</span><span class="op">,</span>
        <span class="str">"settings"</span><span class="op">:</span> <span class="op">{</span>
          <span class="str">"theme"</span><span class="op">:</span> <span class="str">"dark"</span><span class="op">,</span>
          <span class="str">"notifications"</span><span class="op">:</span> <span class="op">{</span>
            <span class="str">"email"</span><span class="op">:</span> <span class="kw">true</span><span class="op">,</span>
            <span class="str">"push"</span><span class="op">:</span> <span class="kw">false</span>
          <span class="op">}</span>
        <span class="op">}</span>
      <span class="op">}</span><span class="op">,</span>
      <span class="str">"posts"</span><span class="op">:</span> <span class="op">[</span>
        <span class="op">{</span> <span class="str">"id"</span><span class="op">:</span> <span class="num">1</span><span class="op">,</span> <span class="str">"title"</span><span class="op">:</span> <span class="str">"Hello"</span><span class="op">,</span> <span class="str">"tags"</span><span class="op">:</span> <span class="op">[</span><span class="str">"intro"</span><span class="op">]</span> <span class="op">}</span>
      <span class="op">]</span>
    <span class="op">}</span>
  <span class="op">}</span><span class="op">,</span>
  <span class="str">"meta"</span><span class="op">:</span> <span class="op">{</span> <span class="str">"requestId"</span><span class="op">:</span> <span class="str">"abc-123"</span> <span class="op">}</span>
<span class="op">}</span>`}</code></pre>
  </div>

  <!-- XML with namespaces and attributes -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">XML with namespaces and attributes</p>
    <pre class="code-block"><code>{@html `<span class="op">&lt;?</span><span class="kw">xml</span> <span class="var">version</span><span class="op">=</span><span class="str">"1.0"</span> <span class="var">encoding</span><span class="op">=</span><span class="str">"UTF-8"</span><span class="op">?&gt;</span>
<span class="op">&lt;</span><span class="kw">catalog</span>
  <span class="var">xmlns</span><span class="op">=</span><span class="str">"http://example.com/books"</span>
  <span class="var">xmlns:dc</span><span class="op">=</span><span class="str">"http://purl.org/dc/elements/1.1/"</span><span class="op">&gt;</span>

  <span class="op">&lt;</span><span class="kw">book</span> <span class="var">id</span><span class="op">=</span><span class="str">"101"</span> <span class="var">lang</span><span class="op">=</span><span class="str">"en"</span><span class="op">&gt;</span>
    <span class="op">&lt;</span><span class="kw">dc:title</span><span class="op">&gt;</span>The Art of Code<span class="op">&lt;/</span><span class="kw">dc:title</span><span class="op">&gt;</span>
    <span class="op">&lt;</span><span class="kw">dc:creator</span><span class="op">&gt;</span>Alice Smith<span class="op">&lt;/</span><span class="kw">dc:creator</span><span class="op">&gt;</span>
    <span class="op">&lt;</span><span class="kw">price</span> <span class="var">currency</span><span class="op">=</span><span class="str">"USD"</span><span class="op">&gt;</span>29.99<span class="op">&lt;/</span><span class="kw">price</span><span class="op">&gt;</span>
    <span class="op">&lt;</span><span class="kw">tags</span><span class="op">&gt;</span>
      <span class="op">&lt;</span><span class="kw">tag</span><span class="op">&gt;</span>programming<span class="op">&lt;/</span><span class="kw">tag</span><span class="op">&gt;</span>
      <span class="op">&lt;</span><span class="kw">tag</span><span class="op">&gt;</span>creativity<span class="op">&lt;/</span><span class="kw">tag</span><span class="op">&gt;</span>
    <span class="op">&lt;/</span><span class="kw">tags</span><span class="op">&gt;</span>
  <span class="op">&lt;/</span><span class="kw">book</span><span class="op">&gt;</span>

<span class="op">&lt;/</span><span class="kw">catalog</span><span class="op">&gt;</span>

<span class="cmt">&lt;!-- Namespaces prevent name collisions between
     different XML vocabularies.
     xmlns:dc refers to Dublin Core metadata. --&gt;</span>`}</code></pre>
  </div>

  <!-- YAML features -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">YAML -- anchors, aliases, and multi-line strings</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Anchors (&) and aliases (*) for reuse</span>
<span class="var">defaults</span><span class="op">:</span> <span class="op">&</span><span class="fn">defaults</span>
  <span class="var">timeout</span><span class="op">:</span> <span class="num">30</span>
  <span class="var">retries</span><span class="op">:</span> <span class="num">3</span>
  <span class="var">log_level</span><span class="op">:</span> <span class="str">"info"</span>

<span class="var">production</span><span class="op">:</span>
  <span class="op">&lt;&lt;</span><span class="op">:</span> <span class="op">*</span><span class="fn">defaults</span>           <span class="cmt"># merges all defaults</span>
  <span class="var">log_level</span><span class="op">:</span> <span class="str">"warn"</span>       <span class="cmt"># override one field</span>

<span class="var">staging</span><span class="op">:</span>
  <span class="op">&lt;&lt;</span><span class="op">:</span> <span class="op">*</span><span class="fn">defaults</span>
  <span class="var">timeout</span><span class="op">:</span> <span class="num">60</span>

<span class="cmt"># Multi-line strings</span>
<span class="var">description</span><span class="op">:</span> <span class="op">|</span>
  <span class="str">This is a multi-line string.</span>
  <span class="str">Each line break is preserved.</span>
  <span class="str">Great for long text blocks.</span>

<span class="var">folded</span><span class="op">:</span> <span class="op">&gt;</span>
  <span class="str">This text will be folded</span>
  <span class="str">into a single line with spaces.</span>
  <span class="str">Only blank lines create paragraphs.</span>`}</code></pre>
  </div>

  <!-- TOML -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">TOML -- tables and typed values</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># A typical pyproject.toml or Cargo.toml</span>
<span class="op">[</span><span class="kw">package</span><span class="op">]</span>
<span class="var">name</span> <span class="op">=</span> <span class="str">"my-app"</span>
<span class="var">version</span> <span class="op">=</span> <span class="str">"1.2.0"</span>
<span class="var">authors</span> <span class="op">=</span> <span class="op">[</span><span class="str">"Alice &lt;alice@example.com&gt;"</span><span class="op">]</span>

<span class="op">[</span><span class="kw">dependencies</span><span class="op">]</span>
<span class="var">serde</span> <span class="op">=</span> <span class="op">{</span> <span class="var">version</span> <span class="op">=</span> <span class="str">"1.0"</span><span class="op">,</span> <span class="var">features</span> <span class="op">=</span> <span class="op">[</span><span class="str">"derive"</span><span class="op">]</span> <span class="op">}</span>
<span class="var">tokio</span> <span class="op">=</span> <span class="str">"1.0"</span>

<span class="op">[</span><span class="kw">server</span><span class="op">]</span>
<span class="var">host</span> <span class="op">=</span> <span class="str">"0.0.0.0"</span>
<span class="var">port</span> <span class="op">=</span> <span class="num">8080</span>
<span class="var">debug</span> <span class="op">=</span> <span class="kw">false</span>

<span class="cmt"># TOML has native date/time support</span>
<span class="var">created</span> <span class="op">=</span> <span class="num">2024-01-15T09:30:00Z</span>`}</code></pre>
  </div>

  <!-- Decision guide -->
  <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-green-600">When to use which format</h3>
    <div class="space-y-3">
      <div class="rounded-lg bg-white p-3 border border-green-100">
        <p class="text-sm font-semibold text-green-700 mb-1">JSON -- Web APIs, data exchange</p>
        <p class="text-sm text-slate-600">Default choice for REST APIs, browser communication, and lightweight data storage. Nearly universal language support. Use when you need speed and simplicity.</p>
      </div>
      <div class="rounded-lg bg-white p-3 border border-amber-100">
        <p class="text-sm font-semibold text-amber-700 mb-1">XML -- Enterprise, documents, markup</p>
        <p class="text-sm text-slate-600">Best for complex document structures, SOAP APIs, or when you need schemas (XSD), namespaces, or XSLT transformations. Common in banking, healthcare, and government.</p>
      </div>
      <div class="rounded-lg bg-white p-3 border border-purple-100">
        <p class="text-sm font-semibold text-purple-700 mb-1">YAML -- Configuration files</p>
        <p class="text-sm text-slate-600">Ideal for human-edited config files. Used by Docker Compose, Kubernetes, GitHub Actions, Ansible. Avoid for data interchange (parsing is complex and error-prone).</p>
      </div>
      <div class="rounded-lg bg-white p-3 border border-sky-100">
        <p class="text-sm font-semibold text-sky-700 mb-1">TOML -- Simple configuration</p>
        <p class="text-sm text-slate-600">When YAML feels too complex. Clear section headers and typed values. Used by Rust (Cargo.toml), Python (pyproject.toml), and Hugo.</p>
      </div>
      <div class="rounded-lg bg-white p-3 border border-slate-200">
        <p class="text-sm font-semibold text-slate-700 mb-1">Protobuf / MessagePack -- Performance</p>
        <p class="text-sm text-slate-600">When text formats are too slow or too large. Binary formats are 3-10x smaller and faster to parse. Requires schema definitions and code generation.</p>
      </div>
    </div>
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
