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

  // === Basic mode: Tag Builder ===
  interface TagElement {
    id: number;
    tag: string;
    content: string;
  }

  const availableTags = [
    { value: 'h1', label: 'h1 - Main Heading' },
    { value: 'h2', label: 'h2 - Sub Heading' },
    { value: 'p', label: 'p - Paragraph' },
    { value: 'strong', label: 'strong - Bold' },
    { value: 'em', label: 'em - Italic' },
    { value: 'a', label: 'a - Link' },
  ];

  let selectedTag = $state('h1');
  let textContent = $state('');
  let elements = $state<TagElement[]>([]);
  let nextId = $state(0);

  function addElement() {
    if (!textContent.trim()) return;
    elements.push({ id: nextId++, tag: selectedTag, content: textContent.trim() });
    textContent = '';
  }

  function removeElement(id: number) {
    elements = elements.filter((el) => el.id !== id);
  }

  let generatedMarkup = $derived(
    elements
      .map((el) => {
        if (el.tag === 'a') return `<a href="#">${el.content}</a>`;
        return `<${el.tag}>${el.content}</${el.tag}>`;
      })
      .join('\n')
  );

  let renderedHtml = $derived(
    elements
      .map((el) => {
        const escaped = el.content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        if (el.tag === 'a') return `<a href="#" style="color:#2563eb;text-decoration:underline">${escaped}</a>`;
        return `<${el.tag}>${escaped}</${el.tag}>`;
      })
      .join('')
  );

  // === Advanced mode: DOM Tree Visualizer ===
  let htmlInput = $state(`<div>
  <h1>Hello World</h1>
  <p>This is a <strong>paragraph</strong>.</p>
  <ul>
    <li>Item one</li>
    <li>Item two</li>
  </ul>
</div>`);

  interface TreeNode {
    tag: string;
    text: string;
    children: TreeNode[];
    depth: number;
  }

  function parseHtmlToTree(html: string): TreeNode[] {
    const nodes: TreeNode[] = [];
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const body = doc.body;
      if (!body) return nodes;

      function walk(el: Node, depth: number): TreeNode | null {
        if (el.nodeType === Node.ELEMENT_NODE) {
          const element = el as Element;
          const node: TreeNode = {
            tag: element.tagName.toLowerCase(),
            text: '',
            children: [],
            depth,
          };
          for (const child of Array.from(el.childNodes)) {
            const childNode = walk(child, depth + 1);
            if (childNode) node.children.push(childNode);
          }
          return node;
        } else if (el.nodeType === Node.TEXT_NODE) {
          const text = el.textContent?.trim() || '';
          if (text) {
            return { tag: '#text', text, children: [], depth };
          }
        }
        return null;
      }

      for (const child of Array.from(body.childNodes)) {
        const node = walk(child, 0);
        if (node) nodes.push(node);
      }
    } catch {
      // parsing failed, return empty
    }
    return nodes;
  }

  let treeNodes = $derived(parseHtmlToTree(htmlInput));

  const depthColors = [
    'bg-orange-500 text-white',
    'bg-amber-500 text-white',
    'bg-yellow-500 text-white',
    'bg-lime-500 text-white',
    'bg-emerald-500 text-white',
    'bg-teal-500 text-white',
    'bg-cyan-500 text-white',
  ];

  function getDepthColor(depth: number): string {
    return depthColors[depth % depthColors.length];
  }
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Tag Builder</h2>
    <p class="text-slate-600">Type some text, pick a tag, and see the markup generated alongside a live preview of how it renders.</p>
  </div>

  <!-- Input area -->
  <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
    <div class="flex flex-wrap items-end gap-3">
      <div class="flex-1">
        <label class="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500" for="tag-content">Content</label>
        <input
          id="tag-content"
          type="text"
          bind:value={textContent}
          placeholder="Type your text here..."
          onkeydown={(e) => e.key === 'Enter' && addElement()}
          class="w-full rounded-lg border border-orange-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
        />
      </div>
      <div>
        <label class="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500" for="tag-select">Tag</label>
        <select
          id="tag-select"
          bind:value={selectedTag}
          class="rounded-lg border border-orange-300 bg-white px-3 py-2 text-sm font-mono focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
        >
          {#each availableTags as tag}
            <option value={tag.value}>{tag.label}</option>
          {/each}
        </select>
      </div>
      <button
        onclick={addElement}
        class="rounded-lg bg-orange-600 px-5 py-2 text-sm font-semibold text-white shadow transition-all hover:bg-orange-700 active:scale-95"
      >
        Add
      </button>
    </div>
  </div>

  <!-- Elements list -->
  {#if elements.length > 0}
    <div class="space-y-2">
      <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500">Your elements</h3>
      {#each elements as el (el.id)}
        <div class="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2">
          <code class="rounded bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">&lt;{el.tag}&gt;</code>
          <span class="flex-1 text-sm text-slate-700">{el.content}</span>
          <code class="rounded bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">&lt;/{el.tag}&gt;</code>
          <button
            onclick={() => removeElement(el.id)}
            class="ml-2 text-sm text-slate-400 hover:text-red-500 transition-colors"
            aria-label="Remove element"
          >
            &times;
          </button>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Two-column: code + preview -->
  {#if elements.length > 0}
    <div class="grid gap-4 md:grid-cols-2">
      <div>
        <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Generated Markup</h3>
        <pre class="code-block"><code>{generatedMarkup}</code></pre>
      </div>
      <div>
        <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Live Preview</h3>
        <div class="rounded-xl border-2 border-slate-200 bg-white p-4 shadow-sm min-h-[100px]">
          {@html renderedHtml}
        </div>
      </div>
    </div>
  {:else}
    <div class="flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-400">
      Add some elements above to see the code and preview!
    </div>
  {/if}

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
    >
      I've tried this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: DOM Tree Visualizer</h2>
      <p class="text-slate-600">Type HTML markup on the left and watch the DOM tree structure appear on the right. Each node shows its tag name and any text content, with colors indicating nesting depth.</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- HTML input -->
      <div>
        <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">HTML Input</h3>
        <textarea
          bind:value={htmlInput}
          class="h-72 w-full rounded-xl border-2 border-orange-200 bg-slate-900 p-4 font-mono text-sm leading-relaxed text-slate-100 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 focus:outline-none"
          spellcheck="false"
        ></textarea>
      </div>

      <!-- Tree visualization -->
      <div>
        <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">DOM Tree</h3>
        <div class="h-72 overflow-auto rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          {#if treeNodes.length === 0}
            <div class="flex h-full items-center justify-center text-sm text-slate-400">
              Type valid HTML to see the tree
            </div>
          {:else}
            {#snippet renderNode(node: TreeNode)}
              <div style="margin-left: {node.depth * 20}px" class="mb-1">
                {#if node.tag === '#text'}
                  <span class="inline-block rounded bg-slate-200 px-2 py-0.5 text-xs text-slate-600 italic">
                    "{node.text}"
                  </span>
                {:else}
                  <span class="inline-block rounded px-2 py-0.5 text-xs font-bold {getDepthColor(node.depth)}">
                    &lt;{node.tag}&gt;
                  </span>
                  {#if node.text}
                    <span class="ml-1 text-xs text-slate-500">"{node.text}"</span>
                  {/if}
                {/if}
              </div>
              {#each node.children as child}
                {@render renderNode(child)}
              {/each}
            {/snippet}

            {#each treeNodes as node}
              {@render renderNode(node)}
            {/each}
          {/if}
        </div>
      </div>
    </div>

    <!-- Quick examples -->
    <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-orange-600">Try These Examples</h3>
      <div class="flex flex-wrap gap-2">
        <button
          onclick={() => htmlInput = '<article>\n  <h1>Title</h1>\n  <p>First paragraph.</p>\n  <p>Second paragraph with <em>emphasis</em>.</p>\n</article>'}
          class="rounded-lg border border-orange-300 bg-white px-3 py-1.5 text-xs font-semibold text-orange-700 hover:bg-orange-100 transition-colors"
        >
          Article
        </button>
        <button
          onclick={() => htmlInput = '<nav>\n  <ul>\n    <li><a href="/">Home</a></li>\n    <li><a href="/about">About</a></li>\n    <li><a href="/contact">Contact</a></li>\n  </ul>\n</nav>'}
          class="rounded-lg border border-orange-300 bg-white px-3 py-1.5 text-xs font-semibold text-orange-700 hover:bg-orange-100 transition-colors"
        >
          Navigation
        </button>
        <button
          onclick={() => htmlInput = '<table>\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Age</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Alice</td>\n      <td>25</td>\n    </tr>\n    <tr>\n      <td>Bob</td>\n      <td>30</td>\n    </tr>\n  </tbody>\n</table>'}
          class="rounded-lg border border-orange-300 bg-white px-3 py-1.5 text-xs font-semibold text-orange-700 hover:bg-orange-100 transition-colors"
        >
          Table
        </button>
        <button
          onclick={() => htmlInput = '<form>\n  <label for="name">Name:</label>\n  <input type="text" id="name" />\n  <label for="email">Email:</label>\n  <input type="email" id="email" />\n  <button type="submit">Send</button>\n</form>'}
          class="rounded-lg border border-orange-300 bg-white px-3 py-1.5 text-xs font-semibold text-orange-700 hover:bg-orange-100 transition-colors"
        >
          Form
        </button>
      </div>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
      >
        I've tried this
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
