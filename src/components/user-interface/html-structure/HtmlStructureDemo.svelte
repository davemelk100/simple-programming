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

  // === Basic mode: Click to add elements ===
  interface PageElement {
    id: number;
    type: 'heading' | 'paragraph' | 'image' | 'list';
    content: string;
  }

  let elements = $state<PageElement[]>([]);
  let nextId = $state(0);

  const presets: { type: PageElement['type']; label: string; icon: string; content: string }[] = [
    { type: 'heading', label: 'Heading', icon: 'H1', content: 'My Page Title' },
    { type: 'paragraph', label: 'Paragraph', icon: 'P', content: 'This is a paragraph of text describing something interesting on the page.' },
    { type: 'image', label: 'Image', icon: 'IMG', content: 'placeholder' },
    { type: 'list', label: 'List', icon: 'UL', content: 'Apples,Bananas,Cherries' },
  ];

  function addElement(type: PageElement['type'], content: string) {
    elements.push({ id: nextId++, type, content });
  }

  function removeElement(id: number) {
    elements = elements.filter((el) => el.id !== id);
  }

  function clearAll() {
    elements = [];
  }

  let generatedHtml = $derived(
    elements
      .map((el) => {
        switch (el.type) {
          case 'heading': return `<h1>${el.content}</h1>`;
          case 'paragraph': return `<p>${el.content}</p>`;
          case 'image': return `<img src="photo.jpg" alt="A photo">`;
          case 'list': {
            const items = el.content.split(',').map((i) => `  <li>${i.trim()}</li>`).join('\n');
            return `<ul>\n${items}\n</ul>`;
          }
          default: return '';
        }
      })
      .join('\n')
  );

  let renderedHtml = $derived(
    elements
      .map((el) => {
        const escaped = el.content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        switch (el.type) {
          case 'heading': return `<h1 style="font-size:1.5rem;font-weight:bold;margin:0.5rem 0">${escaped}</h1>`;
          case 'paragraph': return `<p style="margin:0.5rem 0">${escaped}</p>`;
          case 'image': return `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:80px;background:#e2e8f0;border-radius:0.5rem;color:#64748b;font-size:0.75rem;margin:0.5rem 0">[image: photo.jpg]</div>`;
          case 'list': {
            const items = escaped.split(',').map((i) => `<li>${i.trim()}</li>`).join('');
            return `<ul style="list-style:disc;padding-left:1.5rem;margin:0.5rem 0">${items}</ul>`;
          }
          default: return '';
        }
      })
      .join('')
  );

  // === Advanced mode: Full HTML editor with live preview ===
  let htmlSource = $state(`<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <header>
    <h1>Welcome</h1>
    <nav>
      <a href="/">Home</a> |
      <a href="/about">About</a>
    </nav>
  </header>
  <main>
    <section>
      <h2>Articles</h2>
      <article>
        <h3>First Post</h3>
        <p>Some content here.</p>
      </article>
    </section>
    <aside>
      <h2>Sidebar</h2>
      <ul>
        <li>Link 1</li>
        <li>Link 2</li>
      </ul>
    </aside>
  </main>
  <footer>
    <p>&copy; 2026 My Site</p>
  </footer>
</body>
</html>`);

  let iframeRef = $state<HTMLIFrameElement | null>(null);

  $effect(() => {
    if (iframeRef && htmlSource) {
      const doc = iframeRef.contentDocument;
      if (doc) {
        doc.open();
        doc.write(htmlSource);
        doc.close();
      }
    }
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Build a Page</h2>
    <p class="text-slate-600">Click the buttons to add HTML elements. Watch the code and live preview update as you build your page.</p>
  </div>

  <!-- Add element buttons -->
  <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">Add Elements</h3>
    <div class="flex flex-wrap gap-3">
      {#each presets as preset}
        <button
          onclick={() => addElement(preset.type, preset.content)}
          class="flex items-center gap-2 rounded-lg border border-blue-300 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition-all hover:bg-blue-100 active:scale-95"
        >
          <span class="flex h-7 w-7 items-center justify-center rounded bg-blue-200 text-xs font-bold text-blue-800">{preset.icon}</span>
          {preset.label}
        </button>
      {/each}
      {#if elements.length > 0}
        <button
          onclick={clearAll}
          class="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-500 shadow-sm transition-all hover:bg-red-50 hover:text-red-600 active:scale-95"
        >
          Clear all
        </button>
      {/if}
    </div>
  </div>

  <!-- Elements list -->
  {#if elements.length > 0}
    <div class="space-y-2">
      <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500">Your elements</h3>
      {#each elements as el (el.id)}
        <div class="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2">
          <code class="rounded bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
            {el.type === 'heading' ? '<h1>' : el.type === 'paragraph' ? '<p>' : el.type === 'image' ? '<img>' : '<ul>'}
          </code>
          <span class="flex-1 truncate text-sm text-slate-700">
            {el.type === 'image' ? 'photo.jpg' : el.content}
          </span>
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
        <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Generated HTML</h3>
        <pre class="code-block"><code>{generatedHtml}</code></pre>
      </div>
      <div>
        <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Live Preview</h3>
        <div class="rounded-xl border-2 border-slate-200 bg-white p-4 shadow-sm min-h-[120px]">
          {@html renderedHtml}
        </div>
      </div>
    </div>
  {:else}
    <div class="flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-400">
      Click the buttons above to start building your page!
    </div>
  {/if}

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      Done exploring
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Live HTML Editor</h2>
      <p class="text-slate-600">Edit the HTML source on the left and watch the rendered output update in real time on the right. Experiment with semantic elements, nesting, and page structure.</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- HTML source editor -->
      <div>
        <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">HTML Source</h3>
        <textarea
          bind:value={htmlSource}
          class="h-96 w-full rounded-xl border-2 border-blue-200 bg-slate-900 p-4 font-mono text-sm leading-relaxed text-slate-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          spellcheck="false"
        ></textarea>
      </div>

      <!-- Live preview -->
      <div>
        <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Live Preview</h3>
        <iframe
          bind:this={iframeRef}
          title="HTML Preview"
          class="h-96 w-full rounded-xl border-2 border-blue-200 bg-white"
          sandbox="allow-same-origin"
        ></iframe>
      </div>
    </div>

    <!-- Quick examples -->
    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">Try These Templates</h3>
      <div class="flex flex-wrap gap-2">
        <button
          onclick={() => htmlSource = '<!DOCTYPE html>\n<html>\n<head><title>Blog</title></head>\n<body>\n  <header><h1>My Blog</h1></header>\n  <main>\n    <article>\n      <h2>First Post</h2>\n      <p>Published <time datetime="2026-04-01">April 1, 2026</time></p>\n      <p>This is the content of the first post.</p>\n    </article>\n    <article>\n      <h2>Second Post</h2>\n      <p>Another great article.</p>\n    </article>\n  </main>\n  <footer><p>&copy; 2026</p></footer>\n</body>\n</html>'}
          class="rounded-lg border border-blue-300 bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
        >
          Blog layout
        </button>
        <button
          onclick={() => htmlSource = '<!DOCTYPE html>\n<html>\n<head><title>Form</title></head>\n<body>\n  <h1>Contact Us</h1>\n  <form>\n    <div>\n      <label for="name">Name:</label><br>\n      <input type="text" id="name" placeholder="Your name">\n    </div>\n    <div>\n      <label for="email">Email:</label><br>\n      <input type="email" id="email" placeholder="you@example.com">\n    </div>\n    <div>\n      <label for="msg">Message:</label><br>\n      <textarea id="msg" rows="4" cols="30"></textarea>\n    </div>\n    <button type="submit">Send</button>\n  </form>\n</body>\n</html>'}
          class="rounded-lg border border-blue-300 bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
        >
          Contact form
        </button>
        <button
          onclick={() => htmlSource = '<!DOCTYPE html>\n<html>\n<head><title>Table</title></head>\n<body>\n  <h1>Student Grades</h1>\n  <table border="1" cellpadding="8">\n    <thead>\n      <tr>\n        <th>Name</th>\n        <th>Subject</th>\n        <th>Grade</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Alice</td>\n        <td>Math</td>\n        <td>A</td>\n      </tr>\n      <tr>\n        <td>Bob</td>\n        <td>Science</td>\n        <td>B+</td>\n      </tr>\n      <tr>\n        <td>Carol</td>\n        <td>English</td>\n        <td>A-</td>\n      </tr>\n    </tbody>\n  </table>\n</body>\n</html>'}
          class="rounded-lg border border-blue-300 bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
        >
          Data table
        </button>
      </div>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
      >
        Done exploring
      </button>
    </div>
  </div>
  {/if}
</div>

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
</style>
