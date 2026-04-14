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

  let visibleExamples = $state(0);

  const examples = [
    {
      tag: 'h1',
      content: 'Hello',
      label: 'Heading',
      desc: 'The h1 tag wraps text to make it a top-level heading.',
      color: 'border-orange-400 bg-orange-50',
      tagColor: 'bg-orange-200 text-orange-800',
      rendered: 'text-2xl font-bold',
    },
    {
      tag: 'p',
      content: 'Some text here',
      label: 'Paragraph',
      desc: 'The p tag wraps text into a paragraph block.',
      color: 'border-amber-400 bg-amber-50',
      tagColor: 'bg-amber-200 text-amber-800',
      rendered: 'text-base',
    },
    {
      tag: 'ul/li',
      content: 'Item',
      label: 'List',
      desc: 'The ul and li tags wrap items into a bulleted list.',
      color: 'border-yellow-400 bg-yellow-50',
      tagColor: 'bg-yellow-200 text-yellow-800',
      rendered: 'list-disc list-inside',
    },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleExamples < examples.length) {
        visibleExamples++;
      } else {
        clearInterval(interval);
      }
    }, 900);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <p class="text-slate-600">
      Imagine you are wrapping gifts. The present inside is your <strong>content</strong> — text, images, data. The wrapping paper and label on the outside is the <strong>tag</strong>. Tags tell the computer <em>what kind of thing</em> the content is. A heading? A paragraph? A link? You wrap content in tags to give it meaning and structure.
    </p>
  </div>

  <!-- Gift box metaphor -->
  <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-orange-600">The Gift Box Metaphor</h3>
    <div class="flex items-center justify-center gap-4">
      <div class="relative flex h-28 w-44 flex-col items-center justify-center rounded-xl border-2 border-dashed border-orange-400 bg-white shadow-md">
        <div class="absolute -top-3 rounded-full border border-orange-400 bg-orange-100 px-3 py-0.5 text-xs font-bold text-orange-700 shadow-sm">
          &lt;tag&gt;
        </div>
        <span class="text-lg font-semibold text-slate-700">Your content</span>
        <div class="absolute -bottom-3 rounded-full border border-orange-400 bg-orange-100 px-3 py-0.5 text-xs font-bold text-orange-700 shadow-sm">
          &lt;/tag&gt;
        </div>
      </div>
      <div class="text-sm text-slate-600">
        <p>The <strong>opening tag</strong> starts the wrapping.</p>
        <p>The <strong>content</strong> goes inside.</p>
        <p>The <strong>closing tag</strong> finishes it.</p>
      </div>
    </div>
  </div>

  <!-- Animated examples -->
  <div>
    <h3 class="mb-4 text-lg font-bold text-slate-800">See How Tags Wrap Content</h3>
    <div class="space-y-4">
      {#each examples as ex, i}
        <div
          class="flex items-center gap-4 rounded-xl border-2 p-4 transition-all duration-700
            {ex.color}
            {i < visibleExamples ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
        >
          <!-- Code view -->
          <div class="flex-1">
            <div class="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">{ex.label}</div>
            <div class="font-mono text-sm">
              <span class={ex.tagColor + ' rounded px-1 py-0.5 text-xs font-bold'}>&lt;{ex.tag}&gt;</span>
              <span class="mx-1 text-slate-700">{ex.content}</span>
              <span class={ex.tagColor + ' rounded px-1 py-0.5 text-xs font-bold'}>&lt;/{ex.tag}&gt;</span>
            </div>
            <p class="mt-1 text-xs text-slate-500">{ex.desc}</p>
          </div>
          <!-- Rendered preview -->
          <div class="w-40 rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm">
            <div class="text-[10px] font-semibold uppercase text-slate-400 mb-1">Rendered</div>
            {#if ex.tag === 'ul/li'}
              <ul class={ex.rendered + ' text-slate-700 text-sm text-left'}>
                <li>{ex.content}</li>
              </ul>
            {:else}
              <div class={ex.rendered + ' text-slate-700'}>{ex.content}</div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- HTML vs XML -->
  <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-orange-600">Two Flavors of Markup</h3>
    <div class="grid gap-4 md:grid-cols-2">
      <div class="rounded-lg bg-white p-4 shadow-sm">
        <h4 class="mb-2 font-bold text-orange-700">HTML</h4>
        <p class="text-sm text-slate-600">
          <strong>HyperText Markup Language</strong> is used to build web pages. Every website you visit is made of HTML. It tells the browser what each piece of content is — headings, paragraphs, images, links, and more.
        </p>
      </div>
      <div class="rounded-lg bg-white p-4 shadow-sm">
        <h4 class="mb-2 font-bold text-orange-700">XML</h4>
        <p class="text-sm text-slate-600">
          <strong>eXtensible Markup Language</strong> is used to store and transport structured data. You can invent your own tag names. It is used in configuration files, data feeds, and document formats like SVG.
        </p>
      </div>
    </div>
  </div>

  <!-- Key concepts -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Key Ideas</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        Tags come in pairs: an <strong>opening tag</strong> and a <strong>closing tag</strong> (with a slash).
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        The content between the tags is what gets displayed or structured.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        Tags can be <strong>nested</strong> — tags inside tags, like boxes inside boxes.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        Markup languages describe <strong>structure</strong>, not appearance. CSS handles how things look.
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-3 text-2xl font-bold text-slate-800">Deep Dive</h2>
      <p class="text-slate-600">
        Markup languages structure documents using a tree of nested elements. Understanding the DOM, semantic HTML5, XML namespaces, and the differences between HTML5 and XHTML gives you deeper control over how documents are parsed and interpreted.
      </p>
    </div>

    <!-- DOM tree structure -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">The DOM Tree</h3>
      <p class="mb-3 text-slate-600">
        When a browser parses HTML, it builds a <strong>Document Object Model (DOM)</strong> — a tree structure where every element, attribute, and piece of text becomes a node. JavaScript interacts with this tree to dynamically modify the page.
      </p>
      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
        <div class="flex flex-col items-center gap-1 font-mono text-sm">
          <div class="rounded bg-orange-600 px-3 py-1 text-white font-bold">document</div>
          <div class="h-4 w-px bg-orange-400"></div>
          <div class="rounded bg-orange-500 px-3 py-1 text-white">&lt;html&gt;</div>
          <div class="flex gap-12">
            <div class="flex flex-col items-center gap-1">
              <div class="h-4 w-px bg-orange-400"></div>
              <div class="rounded bg-orange-400 px-3 py-1 text-white">&lt;head&gt;</div>
              <div class="h-4 w-px bg-orange-300"></div>
              <div class="rounded bg-orange-200 px-3 py-1 text-orange-800">&lt;title&gt;</div>
            </div>
            <div class="flex flex-col items-center gap-1">
              <div class="h-4 w-px bg-orange-400"></div>
              <div class="rounded bg-orange-400 px-3 py-1 text-white">&lt;body&gt;</div>
              <div class="flex gap-6">
                <div class="flex flex-col items-center gap-1">
                  <div class="h-4 w-px bg-orange-300"></div>
                  <div class="rounded bg-orange-200 px-3 py-1 text-orange-800">&lt;header&gt;</div>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <div class="h-4 w-px bg-orange-300"></div>
                  <div class="rounded bg-orange-200 px-3 py-1 text-orange-800">&lt;main&gt;</div>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <div class="h-4 w-px bg-orange-300"></div>
                  <div class="rounded bg-orange-200 px-3 py-1 text-orange-800">&lt;footer&gt;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Semantic HTML5 code block -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Semantic HTML5 Structure</h3>
      <p class="mb-3 text-slate-600">
        Semantic elements describe the <strong>purpose</strong> of their content, not just its appearance. This improves accessibility, SEO, and code readability. The <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">&lt;nav&gt;</code>, <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">&lt;article&gt;</code>, <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">&lt;section&gt;</code>, and <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">&lt;aside&gt;</code> elements replaced generic <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">&lt;div&gt;</code> wrappers.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- Semantic HTML5 document --&gt;</span>
<span class="kw">&lt;!DOCTYPE html&gt;</span>
<span class="kw">&lt;html</span> <span class="arg">lang</span>=<span class="str">"en"</span><span class="kw">&gt;</span>
<span class="kw">&lt;head&gt;</span>
  <span class="kw">&lt;meta</span> <span class="arg">charset</span>=<span class="str">"UTF-8"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;meta</span> <span class="arg">name</span>=<span class="str">"viewport"</span> <span class="arg">content</span>=<span class="str">"width=device-width"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;title&gt;</span>My Page<span class="kw">&lt;/title&gt;</span>
<span class="kw">&lt;/head&gt;</span>
<span class="kw">&lt;body&gt;</span>
  <span class="kw">&lt;header&gt;</span>
    <span class="kw">&lt;nav</span> <span class="arg">aria-label</span>=<span class="str">"Main"</span><span class="kw">&gt;</span>
      <span class="kw">&lt;a</span> <span class="arg">href</span>=<span class="str">"/"</span><span class="kw">&gt;</span>Home<span class="kw">&lt;/a&gt;</span>
      <span class="kw">&lt;a</span> <span class="arg">href</span>=<span class="str">"/about"</span><span class="kw">&gt;</span>About<span class="kw">&lt;/a&gt;</span>
    <span class="kw">&lt;/nav&gt;</span>
  <span class="kw">&lt;/header&gt;</span>
  <span class="kw">&lt;main&gt;</span>
    <span class="kw">&lt;article&gt;</span>
      <span class="kw">&lt;h1&gt;</span>Article Title<span class="kw">&lt;/h1&gt;</span>
      <span class="kw">&lt;p&gt;</span>Content goes here.<span class="kw">&lt;/p&gt;</span>
    <span class="kw">&lt;/article&gt;</span>
    <span class="kw">&lt;aside&gt;</span>Related links<span class="kw">&lt;/aside&gt;</span>
  <span class="kw">&lt;/main&gt;</span>
  <span class="kw">&lt;footer&gt;</span>&copy; 2026<span class="kw">&lt;/footer&gt;</span>
<span class="kw">&lt;/body&gt;</span>
<span class="kw">&lt;/html&gt;</span>`}</code></pre>
    </div>

    <!-- Attributes vs content -->
    <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-orange-600">Attributes vs. Content</h3>
      <p class="mb-3 text-sm text-slate-600">
        Tags can carry <strong>attributes</strong> — key-value pairs inside the opening tag that provide metadata. Content sits between the opening and closing tags.
      </p>
      <div class="flex items-center gap-2 rounded-lg bg-white p-3 font-mono text-sm">
        <span class="text-purple-600">&lt;a</span>
        <span class="text-orange-600">href</span><span class="text-slate-500">=</span><span class="text-yellow-600">"https://example.com"</span>
        <span class="text-orange-600">target</span><span class="text-slate-500">=</span><span class="text-yellow-600">"_blank"</span><span class="text-purple-600">&gt;</span>
        <span class="text-slate-700">Click here</span>
        <span class="text-purple-600">&lt;/a&gt;</span>
      </div>
      <div class="mt-2 flex gap-4 text-xs text-slate-500">
        <span><span class="inline-block h-2 w-2 rounded-full bg-orange-500"></span> Attributes (metadata)</span>
        <span><span class="inline-block h-2 w-2 rounded-full bg-slate-500"></span> Content (visible text)</span>
      </div>
    </div>

    <!-- Self-closing tags -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Self-Closing Tags</h3>
      <p class="mb-3 text-slate-600">
        Some elements have no content and are <strong>self-closing</strong>. In HTML5, the trailing slash is optional. In XML/XHTML, it is required.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- HTML5: trailing slash optional --&gt;</span>
<span class="kw">&lt;img</span> <span class="arg">src</span>=<span class="str">"photo.jpg"</span> <span class="arg">alt</span>=<span class="str">"A photo"</span><span class="kw">&gt;</span>
<span class="kw">&lt;br&gt;</span>
<span class="kw">&lt;input</span> <span class="arg">type</span>=<span class="str">"text"</span><span class="kw">&gt;</span>

<span class="cmt">&lt;!-- XHTML/XML: trailing slash required --&gt;</span>
<span class="kw">&lt;img</span> <span class="arg">src</span>=<span class="str">"photo.jpg"</span> <span class="arg">alt</span>=<span class="str">"A photo"</span> <span class="kw">/&gt;</span>
<span class="kw">&lt;br /&gt;</span>
<span class="kw">&lt;input</span> <span class="arg">type</span>=<span class="str">"text"</span> <span class="kw">/&gt;</span>`}</code></pre>
    </div>

    <!-- XML with namespaces -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">XML Namespaces</h3>
      <p class="mb-3 text-slate-600">
        XML allows you to define your own tags, which can cause naming conflicts when combining documents. <strong>Namespaces</strong> solve this by prefixing tags with a unique identifier. The <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">xmlns</code> attribute declares a namespace URI.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- XML with namespaces --&gt;</span>
<span class="kw">&lt;catalog</span>
  <span class="arg">xmlns:book</span>=<span class="str">"http://example.com/books"</span>
  <span class="arg">xmlns:cd</span>=<span class="str">"http://example.com/cds"</span><span class="kw">&gt;</span>

  <span class="kw">&lt;book:item&gt;</span>
    <span class="kw">&lt;book:title&gt;</span>The Great Gatsby<span class="kw">&lt;/book:title&gt;</span>
    <span class="kw">&lt;book:author&gt;</span>F. Scott Fitzgerald<span class="kw">&lt;/book:author&gt;</span>
    <span class="kw">&lt;book:year&gt;</span>1925<span class="kw">&lt;/book:year&gt;</span>
  <span class="kw">&lt;/book:item&gt;</span>

  <span class="kw">&lt;cd:item&gt;</span>
    <span class="kw">&lt;cd:title&gt;</span>Abbey Road<span class="kw">&lt;/cd:title&gt;</span>
    <span class="kw">&lt;cd:artist&gt;</span>The Beatles<span class="kw">&lt;/cd:artist&gt;</span>
  <span class="kw">&lt;/cd:item&gt;</span>

<span class="kw">&lt;/catalog&gt;</span>`}</code></pre>
    </div>

    <!-- XHTML vs HTML5 -->
    <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-orange-600">XHTML vs. HTML5</h3>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-lg bg-white p-4 shadow-sm">
          <h4 class="mb-2 font-bold text-orange-700">XHTML (Strict XML rules)</h4>
          <ul class="space-y-1 text-sm text-slate-600">
            <li>All tags must be closed</li>
            <li>All tags must be lowercase</li>
            <li>Attributes must be quoted</li>
            <li>Documents must be well-formed XML</li>
            <li>A single error halts parsing</li>
          </ul>
        </div>
        <div class="rounded-lg bg-white p-4 shadow-sm">
          <h4 class="mb-2 font-bold text-orange-700">HTML5 (Lenient parsing)</h4>
          <ul class="space-y-1 text-sm text-slate-600">
            <li>Some tags can be unclosed (p, li)</li>
            <li>Tag names are case-insensitive</li>
            <li>Some attributes need no quotes</li>
            <li>Error-tolerant parsing (browsers fix mistakes)</li>
            <li>Adds semantic elements, APIs, multimedia</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- DTDs/Schemas -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">DTDs and Schemas</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          A <strong>DTD (Document Type Definition)</strong> defines the legal structure and elements of an XML document. The <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">&lt;!DOCTYPE&gt;</code> declaration references it.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          <strong>XML Schema (XSD)</strong> is a more powerful alternative to DTDs, written in XML itself, supporting data types, inheritance, and namespaces.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
          HTML5 uses a simplified <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">&lt;!DOCTYPE html&gt;</code> — no longer referencing a DTD URL.
        </li>
      </ul>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
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
