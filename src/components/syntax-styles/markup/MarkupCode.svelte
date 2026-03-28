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
    <h2 class="mb-3 text-xl font-bold text-slate-800">Markup Languages in Code</h2>
    <p class="text-sm text-slate-600">Here is how HTML structures a web page, from the very first line to common tags you will use every day.</p>
  </div>

  <!-- Side-by-side: what it does / code -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">What it does</h3>
      <div class="rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm text-slate-600 space-y-2">
        <p>Every HTML document starts with a <strong>doctype</strong> declaration, then wraps everything in an <code class="rounded bg-slate-100 px-1 text-orange-700">&lt;html&gt;</code> tag.</p>
        <p>The <code class="rounded bg-slate-100 px-1 text-orange-700">&lt;head&gt;</code> contains metadata (title, character set). The <code class="rounded bg-slate-100 px-1 text-orange-700">&lt;body&gt;</code> contains everything visible.</p>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="kw">&lt;!DOCTYPE html&gt;</span>
<span class="kw">&lt;html&gt;</span>
  <span class="kw">&lt;head&gt;</span>
    <span class="kw">&lt;title&gt;</span>My Page<span class="kw">&lt;/title&gt;</span>
  <span class="kw">&lt;/head&gt;</span>
  <span class="kw">&lt;body&gt;</span>
    <span class="cmt">&lt;!-- visible content here --&gt;</span>
  <span class="kw">&lt;/body&gt;</span>
<span class="kw">&lt;/html&gt;</span>`}</code></pre>
    </div>
  </div>

  <!-- Headings -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Headings (h1 through h6)</p>
    <pre class="code-block"><code>{@html `<span class="kw">&lt;h1&gt;</span>Main Title<span class="kw">&lt;/h1&gt;</span>        <span class="cmt">&lt;!-- biggest heading --&gt;</span>
<span class="kw">&lt;h2&gt;</span>Section Title<span class="kw">&lt;/h2&gt;</span>    <span class="cmt">&lt;!-- sub-heading --&gt;</span>
<span class="kw">&lt;h3&gt;</span>Subsection<span class="kw">&lt;/h3&gt;</span>       <span class="cmt">&lt;!-- smaller still --&gt;</span>`}</code></pre>
  </div>

  <!-- Paragraphs and text -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Paragraphs and text formatting</p>
    <pre class="code-block"><code>{@html `<span class="kw">&lt;p&gt;</span>This is a paragraph of text.<span class="kw">&lt;/p&gt;</span>

<span class="kw">&lt;p&gt;</span>You can make text <span class="kw">&lt;strong&gt;</span>bold<span class="kw">&lt;/strong&gt;</span> or <span class="kw">&lt;em&gt;</span>italic<span class="kw">&lt;/em&gt;</span>.<span class="kw">&lt;/p&gt;</span>

<span class="kw">&lt;p&gt;</span>Use <span class="kw">&lt;br&gt;</span> for a line break.<span class="kw">&lt;/p&gt;</span>`}</code></pre>
  </div>

  <!-- Links -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Links</p>
    <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- The href attribute says where to go --&gt;</span>
<span class="kw">&lt;a</span> <span class="arg">href</span>=<span class="str">"https://example.com"</span><span class="kw">&gt;</span>Visit Example<span class="kw">&lt;/a&gt;</span>

<span class="cmt">&lt;!-- Link to another page on the same site --&gt;</span>
<span class="kw">&lt;a</span> <span class="arg">href</span>=<span class="str">"/about"</span><span class="kw">&gt;</span>About Us<span class="kw">&lt;/a&gt;</span>`}</code></pre>
  </div>

  <!-- Images -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Images</p>
    <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- Images are self-closing — no content inside --&gt;</span>
<span class="kw">&lt;img</span> <span class="arg">src</span>=<span class="str">"cat.jpg"</span> <span class="arg">alt</span>=<span class="str">"A cute cat"</span><span class="kw">&gt;</span>

<span class="cmt">&lt;!-- alt describes the image for screen readers --&gt;</span>
<span class="kw">&lt;img</span> <span class="arg">src</span>=<span class="str">"logo.png"</span> <span class="arg">alt</span>=<span class="str">"Company logo"</span> <span class="arg">width</span>=<span class="str">"200"</span><span class="kw">&gt;</span>`}</code></pre>
  </div>

  <!-- Lists -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Lists</p>
    <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- Unordered (bulleted) list --&gt;</span>
<span class="kw">&lt;ul&gt;</span>
  <span class="kw">&lt;li&gt;</span>Apples<span class="kw">&lt;/li&gt;</span>
  <span class="kw">&lt;li&gt;</span>Bananas<span class="kw">&lt;/li&gt;</span>
  <span class="kw">&lt;li&gt;</span>Cherries<span class="kw">&lt;/li&gt;</span>
<span class="kw">&lt;/ul&gt;</span>

<span class="cmt">&lt;!-- Ordered (numbered) list --&gt;</span>
<span class="kw">&lt;ol&gt;</span>
  <span class="kw">&lt;li&gt;</span>First step<span class="kw">&lt;/li&gt;</span>
  <span class="kw">&lt;li&gt;</span>Second step<span class="kw">&lt;/li&gt;</span>
  <span class="kw">&lt;li&gt;</span>Third step<span class="kw">&lt;/li&gt;</span>
<span class="kw">&lt;/ol&gt;</span>`}</code></pre>
  </div>

  <!-- Quick reference -->
  <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-orange-600">Quick Reference</h3>
    <div class="grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-orange-700">&lt;h1&gt;</code> - <span class="text-slate-600">Heading</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-orange-700">&lt;p&gt;</code> - <span class="text-slate-600">Paragraph</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-orange-700">&lt;a&gt;</code> - <span class="text-slate-600">Link</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-orange-700">&lt;img&gt;</code> - <span class="text-slate-600">Image</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-orange-700">&lt;ul&gt;</code> - <span class="text-slate-600">Bulleted list</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-orange-700">&lt;ol&gt;</code> - <span class="text-slate-600">Numbered list</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-orange-700">&lt;div&gt;</code> - <span class="text-slate-600">Container</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-orange-700">&lt;span&gt;</code> - <span class="text-slate-600">Inline container</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-orange-700">&lt;br&gt;</code> - <span class="text-slate-600">Line break</span></div>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Markup Languages in Code (Advanced)</h2>
    <p class="text-sm text-slate-600">Semantic HTML5 structure, ARIA for accessibility, XML namespaces, SVG markup, data attributes, and microdata.</p>
  </div>

  <!-- Semantic HTML5 document -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Semantic HTML5 page structure</p>
    <pre class="code-block"><code>{@html `<span class="kw">&lt;!DOCTYPE html&gt;</span>
<span class="kw">&lt;html</span> <span class="arg">lang</span>=<span class="str">"en"</span><span class="kw">&gt;</span>
<span class="kw">&lt;head&gt;</span>
  <span class="kw">&lt;meta</span> <span class="arg">charset</span>=<span class="str">"UTF-8"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;meta</span> <span class="arg">name</span>=<span class="str">"viewport"</span> <span class="arg">content</span>=<span class="str">"width=device-width, initial-scale=1.0"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;title&gt;</span>Semantic Page<span class="kw">&lt;/title&gt;</span>
<span class="kw">&lt;/head&gt;</span>
<span class="kw">&lt;body&gt;</span>
  <span class="kw">&lt;header&gt;</span>
    <span class="kw">&lt;h1&gt;</span>Site Title<span class="kw">&lt;/h1&gt;</span>
    <span class="kw">&lt;nav</span> <span class="arg">aria-label</span>=<span class="str">"Primary"</span><span class="kw">&gt;</span>
      <span class="kw">&lt;ul&gt;</span>
        <span class="kw">&lt;li&gt;&lt;a</span> <span class="arg">href</span>=<span class="str">"/"</span><span class="kw">&gt;</span>Home<span class="kw">&lt;/a&gt;&lt;/li&gt;</span>
        <span class="kw">&lt;li&gt;&lt;a</span> <span class="arg">href</span>=<span class="str">"/blog"</span><span class="kw">&gt;</span>Blog<span class="kw">&lt;/a&gt;&lt;/li&gt;</span>
      <span class="kw">&lt;/ul&gt;</span>
    <span class="kw">&lt;/nav&gt;</span>
  <span class="kw">&lt;/header&gt;</span>

  <span class="kw">&lt;main&gt;</span>
    <span class="kw">&lt;article&gt;</span>
      <span class="kw">&lt;header&gt;</span>
        <span class="kw">&lt;h2&gt;</span>Article Title<span class="kw">&lt;/h2&gt;</span>
        <span class="kw">&lt;time</span> <span class="arg">datetime</span>=<span class="str">"2026-03-28"</span><span class="kw">&gt;</span>March 28, 2026<span class="kw">&lt;/time&gt;</span>
      <span class="kw">&lt;/header&gt;</span>
      <span class="kw">&lt;section&gt;</span>
        <span class="kw">&lt;h3&gt;</span>Introduction<span class="kw">&lt;/h3&gt;</span>
        <span class="kw">&lt;p&gt;</span>Content goes here...<span class="kw">&lt;/p&gt;</span>
      <span class="kw">&lt;/section&gt;</span>
      <span class="kw">&lt;section&gt;</span>
        <span class="kw">&lt;h3&gt;</span>Details<span class="kw">&lt;/h3&gt;</span>
        <span class="kw">&lt;figure&gt;</span>
          <span class="kw">&lt;img</span> <span class="arg">src</span>=<span class="str">"chart.png"</span> <span class="arg">alt</span>=<span class="str">"Sales chart"</span> <span class="kw">/&gt;</span>
          <span class="kw">&lt;figcaption&gt;</span>Q1 sales data<span class="kw">&lt;/figcaption&gt;</span>
        <span class="kw">&lt;/figure&gt;</span>
      <span class="kw">&lt;/section&gt;</span>
    <span class="kw">&lt;/article&gt;</span>

    <span class="kw">&lt;aside&gt;</span>
      <span class="kw">&lt;h2&gt;</span>Related<span class="kw">&lt;/h2&gt;</span>
      <span class="kw">&lt;ul&gt;</span>
        <span class="kw">&lt;li&gt;&lt;a</span> <span class="arg">href</span>=<span class="str">"#"</span><span class="kw">&gt;</span>Related post 1<span class="kw">&lt;/a&gt;&lt;/li&gt;</span>
      <span class="kw">&lt;/ul&gt;</span>
    <span class="kw">&lt;/aside&gt;</span>
  <span class="kw">&lt;/main&gt;</span>

  <span class="kw">&lt;footer&gt;</span>
    <span class="kw">&lt;p&gt;</span>&amp;copy; 2026 My Site<span class="kw">&lt;/p&gt;</span>
  <span class="kw">&lt;/footer&gt;</span>
<span class="kw">&lt;/body&gt;</span>
<span class="kw">&lt;/html&gt;</span>`}</code></pre>
  </div>

  <!-- ARIA attributes -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">ARIA attributes for accessibility</p>
    <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- ARIA roles, labels, and states --&gt;</span>
<span class="kw">&lt;button</span>
  <span class="arg">aria-label</span>=<span class="str">"Close dialog"</span>
  <span class="arg">aria-pressed</span>=<span class="str">"false"</span>
<span class="kw">&gt;</span>&times;<span class="kw">&lt;/button&gt;</span>

<span class="kw">&lt;div</span> <span class="arg">role</span>=<span class="str">"alert"</span> <span class="arg">aria-live</span>=<span class="str">"polite"</span><span class="kw">&gt;</span>
  Form submitted successfully!
<span class="kw">&lt;/div&gt;</span>

<span class="kw">&lt;nav</span> <span class="arg">aria-label</span>=<span class="str">"Breadcrumb"</span><span class="kw">&gt;</span>
  <span class="kw">&lt;ol&gt;</span>
    <span class="kw">&lt;li&gt;&lt;a</span> <span class="arg">href</span>=<span class="str">"/"</span><span class="kw">&gt;</span>Home<span class="kw">&lt;/a&gt;&lt;/li&gt;</span>
    <span class="kw">&lt;li</span> <span class="arg">aria-current</span>=<span class="str">"page"</span><span class="kw">&gt;</span>Settings<span class="kw">&lt;/li&gt;</span>
  <span class="kw">&lt;/ol&gt;</span>
<span class="kw">&lt;/nav&gt;</span>

<span class="cmt">&lt;!-- Accessible form --&gt;</span>
<span class="kw">&lt;label</span> <span class="arg">for</span>=<span class="str">"email"</span><span class="kw">&gt;</span>Email<span class="kw">&lt;/label&gt;</span>
<span class="kw">&lt;input</span>
  <span class="arg">id</span>=<span class="str">"email"</span>
  <span class="arg">type</span>=<span class="str">"email"</span>
  <span class="arg">aria-describedby</span>=<span class="str">"email-help"</span>
  <span class="arg">required</span>
<span class="kw">/&gt;</span>
<span class="kw">&lt;span</span> <span class="arg">id</span>=<span class="str">"email-help"</span><span class="kw">&gt;</span>We will never share your email.<span class="kw">&lt;/span&gt;</span>`}</code></pre>
  </div>

  <!-- XML with namespaces -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">XML with namespaces</p>
    <pre class="code-block"><code>{@html `<span class="cmt">&lt;?xml version="1.0" encoding="UTF-8"?&gt;</span>
<span class="kw">&lt;feed</span> <span class="arg">xmlns</span>=<span class="str">"http://www.w3.org/2005/Atom"</span><span class="kw">&gt;</span>
  <span class="kw">&lt;title&gt;</span>My Blog<span class="kw">&lt;/title&gt;</span>
  <span class="kw">&lt;link</span> <span class="arg">href</span>=<span class="str">"https://example.com"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;updated&gt;</span>2026-03-28T12:00:00Z<span class="kw">&lt;/updated&gt;</span>

  <span class="kw">&lt;entry&gt;</span>
    <span class="kw">&lt;title&gt;</span>First Post<span class="kw">&lt;/title&gt;</span>
    <span class="kw">&lt;link</span> <span class="arg">href</span>=<span class="str">"https://example.com/post-1"</span> <span class="kw">/&gt;</span>
    <span class="kw">&lt;id&gt;</span>urn:uuid:1234-5678<span class="kw">&lt;/id&gt;</span>
    <span class="kw">&lt;summary&gt;</span>An introduction to markup.<span class="kw">&lt;/summary&gt;</span>
  <span class="kw">&lt;/entry&gt;</span>
<span class="kw">&lt;/feed&gt;</span>`}</code></pre>
  </div>

  <!-- SVG as XML markup -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">SVG — XML-based vector graphics</p>
    <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- SVG is valid XML embedded in HTML --&gt;</span>
<span class="kw">&lt;svg</span>
  <span class="arg">xmlns</span>=<span class="str">"http://www.w3.org/2000/svg"</span>
  <span class="arg">viewBox</span>=<span class="str">"0 0 100 100"</span>
  <span class="arg">width</span>=<span class="str">"200"</span>
  <span class="arg">height</span>=<span class="str">"200"</span>
<span class="kw">&gt;</span>
  <span class="cmt">&lt;!-- Circle --&gt;</span>
  <span class="kw">&lt;circle</span>
    <span class="arg">cx</span>=<span class="str">"50"</span> <span class="arg">cy</span>=<span class="str">"50"</span> <span class="arg">r</span>=<span class="str">"40"</span>
    <span class="arg">fill</span>=<span class="str">"#f97316"</span>
    <span class="arg">stroke</span>=<span class="str">"#c2410c"</span>
    <span class="arg">stroke-width</span>=<span class="str">"2"</span>
  <span class="kw">/&gt;</span>

  <span class="cmt">&lt;!-- Text inside SVG --&gt;</span>
  <span class="kw">&lt;text</span>
    <span class="arg">x</span>=<span class="str">"50"</span> <span class="arg">y</span>=<span class="str">"55"</span>
    <span class="arg">text-anchor</span>=<span class="str">"middle"</span>
    <span class="arg">fill</span>=<span class="str">"white"</span>
    <span class="arg">font-size</span>=<span class="str">"14"</span>
  <span class="kw">&gt;</span>SVG<span class="kw">&lt;/text&gt;</span>

  <span class="cmt">&lt;!-- Path for complex shapes --&gt;</span>
  <span class="kw">&lt;path</span>
    <span class="arg">d</span>=<span class="str">"M10 80 Q 50 10 90 80"</span>
    <span class="arg">fill</span>=<span class="str">"none"</span>
    <span class="arg">stroke</span>=<span class="str">"#ea580c"</span>
    <span class="arg">stroke-width</span>=<span class="str">"3"</span>
  <span class="kw">/&gt;</span>
<span class="kw">&lt;/svg&gt;</span>`}</code></pre>
  </div>

  <!-- Data attributes -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Custom data attributes</p>
    <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- data-* attributes store custom data on elements --&gt;</span>
<span class="kw">&lt;button</span>
  <span class="arg">data-action</span>=<span class="str">"delete"</span>
  <span class="arg">data-item-id</span>=<span class="str">"42"</span>
  <span class="arg">data-confirm</span>=<span class="str">"Are you sure?"</span>
<span class="kw">&gt;</span>
  Delete Item
<span class="kw">&lt;/button&gt;</span>

<span class="cmt">&lt;!-- Access in JavaScript via dataset --&gt;</span>
<span class="cmt">&lt;!-- button.dataset.action    → "delete"    --&gt;</span>
<span class="cmt">&lt;!-- button.dataset.itemId    → "42"        --&gt;</span>
<span class="cmt">&lt;!-- button.dataset.confirm   → "Are you sure?" --&gt;</span>

<span class="cmt">&lt;!-- CSS can target data attributes --&gt;</span>
<span class="cmt">&lt;!-- [data-action="delete"] { color: red; } --&gt;</span>`}</code></pre>
  </div>

  <!-- Microdata -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Microdata (structured data for search engines)</p>
    <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- Schema.org microdata helps search engines --&gt;</span>
<span class="kw">&lt;div</span> <span class="arg">itemscope</span> <span class="arg">itemtype</span>=<span class="str">"https://schema.org/Person"</span><span class="kw">&gt;</span>
  <span class="kw">&lt;h2</span> <span class="arg">itemprop</span>=<span class="str">"name"</span><span class="kw">&gt;</span>Alice Johnson<span class="kw">&lt;/h2&gt;</span>
  <span class="kw">&lt;p</span> <span class="arg">itemprop</span>=<span class="str">"jobTitle"</span><span class="kw">&gt;</span>Software Engineer<span class="kw">&lt;/p&gt;</span>
  <span class="kw">&lt;a</span> <span class="arg">itemprop</span>=<span class="str">"url"</span>
     <span class="arg">href</span>=<span class="str">"https://alice.dev"</span><span class="kw">&gt;</span>
    alice.dev
  <span class="kw">&lt;/a&gt;</span>
  <span class="kw">&lt;span</span> <span class="arg">itemprop</span>=<span class="str">"email"</span><span class="kw">&gt;</span>
    alice@example.com
  <span class="kw">&lt;/span&gt;</span>
<span class="kw">&lt;/div&gt;</span>`}</code></pre>
  </div>

  <!-- Key concepts -->
  <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-orange-600">Advanced Markup Patterns</h3>
    <ul class="space-y-2 text-sm text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <strong>Semantic HTML5</strong> elements (header, nav, main, article, section, aside, footer) convey meaning to browsers, screen readers, and search engines.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <strong>ARIA attributes</strong> provide accessibility hints when native HTML semantics are not enough — use them sparingly, as native elements are preferred.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <strong>SVG</strong> is an XML-based markup language for vector graphics, embeddable directly in HTML5 documents.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
        <strong>Data attributes</strong> (data-*) store custom metadata on elements, accessible via JavaScript's dataset API and targetable in CSS.
      </li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95">
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
