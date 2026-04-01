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

  let visibleLayers = $state(0);

  const layers = [
    { tag: 'html', label: 'The whole page', color: 'border-blue-400 bg-blue-50', tagColor: 'bg-blue-200 text-blue-800' },
    { tag: 'body', label: 'Visible content', color: 'border-sky-400 bg-sky-50', tagColor: 'bg-sky-200 text-sky-800' },
    { tag: 'div', label: 'A section', color: 'border-cyan-400 bg-cyan-50', tagColor: 'bg-cyan-200 text-cyan-800' },
    { tag: 'p', label: 'A paragraph', color: 'border-teal-400 bg-teal-50', tagColor: 'bg-teal-200 text-teal-800' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleLayers < layers.length) {
        visibleLayers++;
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
    <h2 class="mb-3 text-2xl font-bold text-slate-800">What Is HTML Structure?</h2>
    <p class="text-slate-600">
      HTML is the <strong>skeleton</strong> of every web page. Think of a building: before you paint the walls or hang curtains, you need a <strong>frame</strong> — steel beams, floors, and rooms. HTML provides that frame for the web. It tells the browser <em>what</em> each piece of content is and <em>how</em> things are organized.
    </p>
  </div>

  <!-- Building frame metaphor -->
  <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">The Building Frame Metaphor</h3>
    <div class="grid gap-4 md:grid-cols-2">
      <div class="rounded-lg bg-white p-4 shadow-sm">
        <h4 class="mb-2 font-bold text-blue-700">A Building</h4>
        <ul class="space-y-1 text-sm text-slate-600">
          <li>Steel frame = overall structure</li>
          <li>Floors = major sections</li>
          <li>Rooms = smaller containers</li>
          <li>Doors &amp; windows = connections</li>
        </ul>
      </div>
      <div class="rounded-lg bg-white p-4 shadow-sm">
        <h4 class="mb-2 font-bold text-blue-700">An HTML Page</h4>
        <ul class="space-y-1 text-sm text-slate-600">
          <li><code class="rounded bg-slate-100 px-1 text-blue-700">&lt;html&gt;</code> = the whole building</li>
          <li><code class="rounded bg-slate-100 px-1 text-blue-700">&lt;head&gt;</code> / <code class="rounded bg-slate-100 px-1 text-blue-700">&lt;body&gt;</code> = major floors</li>
          <li><code class="rounded bg-slate-100 px-1 text-blue-700">&lt;div&gt;</code> / <code class="rounded bg-slate-100 px-1 text-blue-700">&lt;section&gt;</code> = rooms</li>
          <li><code class="rounded bg-slate-100 px-1 text-blue-700">&lt;a&gt;</code> = doors to other pages</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Tags and elements -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Tags, Elements, and Nesting</h3>
    <p class="mb-3 text-slate-600">
      A <strong>tag</strong> is a label wrapped in angle brackets, like <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">&lt;p&gt;</code>. Tags come in pairs: an <strong>opening tag</strong> and a <strong>closing tag</strong> (with a forward slash). Everything between them is an <strong>element</strong>. Elements can be <strong>nested</strong> inside each other, like boxes within boxes.
    </p>
    <div class="flex items-center justify-center gap-4 rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
      <div class="relative flex h-28 w-52 flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-400 bg-white shadow-md">
        <div class="absolute -top-3 rounded-full border border-blue-400 bg-blue-100 px-3 py-0.5 text-xs font-bold text-blue-700 shadow-sm">
          &lt;p&gt;
        </div>
        <span class="text-lg font-semibold text-slate-700">Hello, world!</span>
        <div class="absolute -bottom-3 rounded-full border border-blue-400 bg-blue-100 px-3 py-0.5 text-xs font-bold text-blue-700 shadow-sm">
          &lt;/p&gt;
        </div>
      </div>
      <div class="text-sm text-slate-600">
        <p>The <strong>opening tag</strong> starts the element.</p>
        <p>The <strong>content</strong> goes inside.</p>
        <p>The <strong>closing tag</strong> ends it.</p>
      </div>
    </div>
  </div>

  <!-- Nested boxes visual -->
  <div>
    <h3 class="mb-4 text-lg font-bold text-slate-800">Nesting: Boxes Inside Boxes</h3>
    <div class="space-y-0">
      {#each layers as layer, i}
        <div
          class="rounded-xl border-2 p-4 transition-all duration-700
            {layer.color}
            {i < visibleLayers ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
          style="margin-left: {i * 24}px;"
        >
          <div class="flex items-center gap-2">
            <span class={layer.tagColor + ' rounded px-2 py-0.5 text-xs font-bold'}>&lt;{layer.tag}&gt;</span>
            <span class="text-sm text-slate-600">{layer.label}</span>
          </div>
        </div>
      {/each}
    </div>
    <p class="mt-3 text-sm text-slate-500">Each element sits inside the one above it, forming a tree of nested containers.</p>
  </div>

  <!-- Head vs Body -->
  <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">Head vs. Body</h3>
    <div class="grid gap-4 md:grid-cols-2">
      <div class="rounded-lg bg-white p-4 shadow-sm">
        <h4 class="mb-2 font-bold text-blue-700">&lt;head&gt;</h4>
        <p class="text-sm text-slate-600">
          The <strong>invisible</strong> part. It holds the page title, character encoding, links to stylesheets, and other metadata. Nothing in the head is displayed on the page itself.
        </p>
      </div>
      <div class="rounded-lg bg-white p-4 shadow-sm">
        <h4 class="mb-2 font-bold text-blue-700">&lt;body&gt;</h4>
        <p class="text-sm text-slate-600">
          The <strong>visible</strong> part. Everything the user sees — headings, paragraphs, images, links, buttons — lives inside the body.
        </p>
      </div>
    </div>
  </div>

  <!-- Key ideas -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Key Ideas</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        HTML stands for <strong>HyperText Markup Language</strong>. It structures content, not its appearance.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        Tags come in pairs: <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">&lt;tag&gt;</code> and <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">&lt;/tag&gt;</code>.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <strong>Nesting</strong> means placing elements inside other elements, creating a tree structure.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        Every HTML page has a <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">&lt;head&gt;</code> (metadata) and a <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">&lt;body&gt;</code> (visible content).
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-3 text-2xl font-bold text-slate-800">HTML Structure: Deep Dive</h2>
      <p class="text-slate-600">
        Beyond the basics, HTML structure involves the Document Object Model (DOM), semantic elements, content models, and how browsers parse and error-correct your markup into a living tree of nodes.
      </p>
    </div>

    <!-- DOM tree -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">The DOM Tree</h3>
      <p class="mb-3 text-slate-600">
        When the browser reads your HTML, it builds a <strong>Document Object Model (DOM)</strong> — a tree where every tag becomes a <strong>node</strong>. JavaScript reads and modifies this tree to make pages interactive. Understanding the DOM is essential for front-end development.
      </p>
      <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
        <div class="flex flex-col items-center gap-1 font-mono text-sm">
          <div class="rounded bg-blue-600 px-3 py-1 text-white font-bold">document</div>
          <div class="h-4 w-px bg-blue-400"></div>
          <div class="rounded bg-blue-500 px-3 py-1 text-white">&lt;html&gt;</div>
          <div class="flex gap-12">
            <div class="flex flex-col items-center gap-1">
              <div class="h-4 w-px bg-blue-400"></div>
              <div class="rounded bg-blue-400 px-3 py-1 text-white">&lt;head&gt;</div>
              <div class="h-4 w-px bg-blue-300"></div>
              <div class="rounded bg-blue-200 px-3 py-1 text-blue-800">&lt;title&gt;</div>
              <div class="h-4 w-px bg-blue-300"></div>
              <div class="rounded bg-blue-200 px-3 py-1 text-blue-800">&lt;meta&gt;</div>
            </div>
            <div class="flex flex-col items-center gap-1">
              <div class="h-4 w-px bg-blue-400"></div>
              <div class="rounded bg-blue-400 px-3 py-1 text-white">&lt;body&gt;</div>
              <div class="flex gap-6">
                <div class="flex flex-col items-center gap-1">
                  <div class="h-4 w-px bg-blue-300"></div>
                  <div class="rounded bg-blue-200 px-3 py-1 text-blue-800">&lt;header&gt;</div>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <div class="h-4 w-px bg-blue-300"></div>
                  <div class="rounded bg-blue-200 px-3 py-1 text-blue-800">&lt;main&gt;</div>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <div class="h-4 w-px bg-blue-300"></div>
                  <div class="rounded bg-blue-200 px-3 py-1 text-blue-800">&lt;footer&gt;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content models -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Content Models</h3>
      <p class="mb-3 text-slate-600">
        HTML5 defines <strong>content categories</strong> that determine which elements can be nested inside others. This replaces the older "block vs. inline" distinction with a richer model.
      </p>
      <div class="grid gap-3 md:grid-cols-2">
        <div class="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
          <h4 class="mb-1 font-bold text-blue-700">Flow content</h4>
          <p class="text-sm text-slate-600">Most elements used in the body: div, p, h1-h6, ul, table, form, section, article, and more.</p>
        </div>
        <div class="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
          <h4 class="mb-1 font-bold text-blue-700">Phrasing content</h4>
          <p class="text-sm text-slate-600">Inline-level elements: span, a, strong, em, code, img, input. These can appear inside paragraphs.</p>
        </div>
        <div class="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
          <h4 class="mb-1 font-bold text-blue-700">Sectioning content</h4>
          <p class="text-sm text-slate-600">Elements that define the outline: article, aside, nav, section. Each creates a new scope for headings.</p>
        </div>
        <div class="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
          <h4 class="mb-1 font-bold text-blue-700">Metadata content</h4>
          <p class="text-sm text-slate-600">Elements in the head: title, meta, link, style, script. They configure the document but are not displayed.</p>
        </div>
      </div>
    </div>

    <!-- Semantic elements -->
    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">Semantic vs. Non-Semantic Elements</h3>
      <p class="mb-3 text-sm text-slate-600">
        Semantic elements describe their <strong>purpose</strong>, improving accessibility and SEO. Non-semantic elements like <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">&lt;div&gt;</code> and <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">&lt;span&gt;</code> carry no inherent meaning.
      </p>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-lg bg-white p-4 shadow-sm">
          <h4 class="mb-2 font-bold text-blue-700">Semantic</h4>
          <ul class="space-y-1 text-sm text-slate-600">
            <li><code class="text-blue-700">&lt;header&gt;</code> — introductory content</li>
            <li><code class="text-blue-700">&lt;nav&gt;</code> — navigation links</li>
            <li><code class="text-blue-700">&lt;main&gt;</code> — primary content</li>
            <li><code class="text-blue-700">&lt;article&gt;</code> — self-contained content</li>
            <li><code class="text-blue-700">&lt;footer&gt;</code> — closing content</li>
          </ul>
        </div>
        <div class="rounded-lg bg-white p-4 shadow-sm">
          <h4 class="mb-2 font-bold text-blue-700">Non-Semantic</h4>
          <ul class="space-y-1 text-sm text-slate-600">
            <li><code class="text-blue-700">&lt;div&gt;</code> — generic block container</li>
            <li><code class="text-blue-700">&lt;span&gt;</code> — generic inline container</li>
            <li>They work fine, but convey no meaning to assistive technology or search engines.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Browser error correction -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Browser Error Correction</h3>
      <p class="text-slate-600">
        Unlike XML, HTML parsers are <strong>error-tolerant</strong>. If you forget a closing tag or nest things incorrectly, the browser will guess what you meant and build the DOM anyway. This makes HTML forgiving for beginners, but can lead to subtle bugs in complex pages.
      </p>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          Missing <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">&lt;/p&gt;</code> tags are auto-closed when the browser encounters the next block element.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          The <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">&lt;html&gt;</code>, <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">&lt;head&gt;</code>, and <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">&lt;body&gt;</code> tags are technically optional — the browser will infer them.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          Use a <strong>validator</strong> (like the W3C Markup Validation Service) to catch structural mistakes before they cause layout issues.
        </li>
      </ul>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
      >
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>
