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
    <h2 class="mb-3 text-xl font-bold text-slate-800">HTML Structure in Code</h2>
    <p class="text-sm text-slate-600">Here is how a real HTML page is structured, from the doctype to common elements you will use every day.</p>
  </div>

  <!-- Basic page structure -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">What it does</h3>
      <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-slate-600 space-y-2">
        <p>Every HTML document starts with a <strong>doctype</strong>, then wraps everything in <code class="rounded bg-slate-100 px-1 text-blue-700">&lt;html&gt;</code>.</p>
        <p>The <code class="rounded bg-slate-100 px-1 text-blue-700">&lt;head&gt;</code> holds metadata. The <code class="rounded bg-slate-100 px-1 text-blue-700">&lt;body&gt;</code> holds visible content.</p>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- Every HTML page starts like this --&gt;</span>
<span class="kw">&lt;!DOCTYPE html&gt;</span>
<span class="kw">&lt;html&gt;</span>
  <span class="kw">&lt;head&gt;</span>
    <span class="kw">&lt;title&gt;</span>My Page<span class="kw">&lt;/title&gt;</span>
  <span class="kw">&lt;/head&gt;</span>
  <span class="kw">&lt;body&gt;</span>
    <span class="kw">&lt;h1&gt;</span>Hello, world!<span class="kw">&lt;/h1&gt;</span>
    <span class="kw">&lt;p&gt;</span>Welcome to my site.<span class="kw">&lt;/p&gt;</span>
  <span class="kw">&lt;/body&gt;</span>
<span class="kw">&lt;/html&gt;</span>`}</code></pre>
    </div>
  </div>

  <!-- Nesting example -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Nesting elements</p>
    <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- Elements inside elements — proper nesting --&gt;</span>
<span class="kw">&lt;div&gt;</span>
  <span class="kw">&lt;h2&gt;</span>Section Title<span class="kw">&lt;/h2&gt;</span>
  <span class="kw">&lt;p&gt;</span>A paragraph with <span class="kw">&lt;strong&gt;</span>bold<span class="kw">&lt;/strong&gt;</span> text.<span class="kw">&lt;/p&gt;</span>
  <span class="kw">&lt;ul&gt;</span>
    <span class="kw">&lt;li&gt;</span>First item<span class="kw">&lt;/li&gt;</span>
    <span class="kw">&lt;li&gt;</span>Second item<span class="kw">&lt;/li&gt;</span>
  <span class="kw">&lt;/ul&gt;</span>
<span class="kw">&lt;/div&gt;</span>`}</code></pre>
  </div>

  <!-- Form example -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">A simple form</p>
    <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- Forms collect user input --&gt;</span>
<span class="kw">&lt;form&gt;</span>
  <span class="kw">&lt;label</span> <span class="arg">for</span>=<span class="str">"name"</span><span class="kw">&gt;</span>Name:<span class="kw">&lt;/label&gt;</span>
  <span class="kw">&lt;input</span> <span class="arg">type</span>=<span class="str">"text"</span> <span class="arg">id</span>=<span class="str">"name"</span> <span class="arg">placeholder</span>=<span class="str">"Your name"</span><span class="kw">&gt;</span>

  <span class="kw">&lt;label</span> <span class="arg">for</span>=<span class="str">"email"</span><span class="kw">&gt;</span>Email:<span class="kw">&lt;/label&gt;</span>
  <span class="kw">&lt;input</span> <span class="arg">type</span>=<span class="str">"email"</span> <span class="arg">id</span>=<span class="str">"email"</span> <span class="arg">placeholder</span>=<span class="str">"you@example.com"</span><span class="kw">&gt;</span>

  <span class="kw">&lt;button</span> <span class="arg">type</span>=<span class="str">"submit"</span><span class="kw">&gt;</span>Send<span class="kw">&lt;/button&gt;</span>
<span class="kw">&lt;/form&gt;</span>`}</code></pre>
  </div>

  <!-- Semantic layout -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Semantic page layout</p>
    <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- Semantic tags describe the purpose of each section --&gt;</span>
<span class="kw">&lt;header&gt;</span>
  <span class="kw">&lt;h1&gt;</span>My Website<span class="kw">&lt;/h1&gt;</span>
  <span class="kw">&lt;nav&gt;</span>
    <span class="kw">&lt;a</span> <span class="arg">href</span>=<span class="str">"/"</span><span class="kw">&gt;</span>Home<span class="kw">&lt;/a&gt;</span>
    <span class="kw">&lt;a</span> <span class="arg">href</span>=<span class="str">"/about"</span><span class="kw">&gt;</span>About<span class="kw">&lt;/a&gt;</span>
  <span class="kw">&lt;/nav&gt;</span>
<span class="kw">&lt;/header&gt;</span>

<span class="kw">&lt;main&gt;</span>
  <span class="kw">&lt;article&gt;</span>
    <span class="kw">&lt;h2&gt;</span>Blog Post Title<span class="kw">&lt;/h2&gt;</span>
    <span class="kw">&lt;p&gt;</span>The content of the post.<span class="kw">&lt;/p&gt;</span>
  <span class="kw">&lt;/article&gt;</span>
<span class="kw">&lt;/main&gt;</span>

<span class="kw">&lt;footer&gt;</span>
  <span class="kw">&lt;p&gt;</span>&amp;copy; 2026 My Website<span class="kw">&lt;/p&gt;</span>
<span class="kw">&lt;/footer&gt;</span>`}</code></pre>
  </div>

  <!-- Quick reference -->
  <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">Quick Reference</h3>
    <div class="grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-blue-700">&lt;html&gt;</code> - <span class="text-slate-600">Root element</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-blue-700">&lt;head&gt;</code> - <span class="text-slate-600">Metadata</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-blue-700">&lt;body&gt;</code> - <span class="text-slate-600">Visible content</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-blue-700">&lt;header&gt;</code> - <span class="text-slate-600">Page header</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-blue-700">&lt;main&gt;</code> - <span class="text-slate-600">Primary content</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-blue-700">&lt;footer&gt;</code> - <span class="text-slate-600">Page footer</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-blue-700">&lt;nav&gt;</code> - <span class="text-slate-600">Navigation</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-blue-700">&lt;article&gt;</code> - <span class="text-slate-600">Article</span></div>
      <div class="rounded bg-white px-3 py-2 shadow-sm"><code class="text-blue-700">&lt;section&gt;</code> - <span class="text-slate-600">Section</span></div>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
      I've read this
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">HTML Structure in Code (Advanced)</h2>
    <p class="text-sm text-slate-600">Semantic HTML5 document structure, accessible forms with ARIA, and complex page layouts with sectioning elements.</p>
  </div>

  <!-- Full semantic HTML5 document -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Complete semantic HTML5 page</p>
    <pre class="code-block"><code>{@html `<span class="kw">&lt;!DOCTYPE html&gt;</span>
<span class="kw">&lt;html</span> <span class="arg">lang</span>=<span class="str">"en"</span><span class="kw">&gt;</span>
<span class="kw">&lt;head&gt;</span>
  <span class="kw">&lt;meta</span> <span class="arg">charset</span>=<span class="str">"UTF-8"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;meta</span> <span class="arg">name</span>=<span class="str">"viewport"</span> <span class="arg">content</span>=<span class="str">"width=device-width, initial-scale=1.0"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;meta</span> <span class="arg">name</span>=<span class="str">"description"</span> <span class="arg">content</span>=<span class="str">"A well-structured page"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;title&gt;</span>Semantic Page<span class="kw">&lt;/title&gt;</span>
  <span class="kw">&lt;link</span> <span class="arg">rel</span>=<span class="str">"stylesheet"</span> <span class="arg">href</span>=<span class="str">"styles.css"</span> <span class="kw">/&gt;</span>
<span class="kw">&lt;/head&gt;</span>
<span class="kw">&lt;body&gt;</span>
  <span class="kw">&lt;header&gt;</span>
    <span class="kw">&lt;h1&gt;</span>Site Title<span class="kw">&lt;/h1&gt;</span>
    <span class="kw">&lt;nav</span> <span class="arg">aria-label</span>=<span class="str">"Primary"</span><span class="kw">&gt;</span>
      <span class="kw">&lt;ul&gt;</span>
        <span class="kw">&lt;li&gt;&lt;a</span> <span class="arg">href</span>=<span class="str">"/"</span><span class="kw">&gt;</span>Home<span class="kw">&lt;/a&gt;&lt;/li&gt;</span>
        <span class="kw">&lt;li&gt;&lt;a</span> <span class="arg">href</span>=<span class="str">"/blog"</span><span class="kw">&gt;</span>Blog<span class="kw">&lt;/a&gt;&lt;/li&gt;</span>
        <span class="kw">&lt;li&gt;&lt;a</span> <span class="arg">href</span>=<span class="str">"/contact"</span><span class="kw">&gt;</span>Contact<span class="kw">&lt;/a&gt;&lt;/li&gt;</span>
      <span class="kw">&lt;/ul&gt;</span>
    <span class="kw">&lt;/nav&gt;</span>
  <span class="kw">&lt;/header&gt;</span>

  <span class="kw">&lt;main&gt;</span>
    <span class="kw">&lt;article&gt;</span>
      <span class="kw">&lt;header&gt;</span>
        <span class="kw">&lt;h2&gt;</span>Article Title<span class="kw">&lt;/h2&gt;</span>
        <span class="kw">&lt;time</span> <span class="arg">datetime</span>=<span class="str">"2026-04-01"</span><span class="kw">&gt;</span>April 1, 2026<span class="kw">&lt;/time&gt;</span>
      <span class="kw">&lt;/header&gt;</span>
      <span class="kw">&lt;section&gt;</span>
        <span class="kw">&lt;h3&gt;</span>Introduction<span class="kw">&lt;/h3&gt;</span>
        <span class="kw">&lt;p&gt;</span>Opening paragraph...<span class="kw">&lt;/p&gt;</span>
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
      <span class="kw">&lt;h2&gt;</span>Related Links<span class="kw">&lt;/h2&gt;</span>
      <span class="kw">&lt;ul&gt;</span>
        <span class="kw">&lt;li&gt;&lt;a</span> <span class="arg">href</span>=<span class="str">"#"</span><span class="kw">&gt;</span>Related post<span class="kw">&lt;/a&gt;&lt;/li&gt;</span>
      <span class="kw">&lt;/ul&gt;</span>
    <span class="kw">&lt;/aside&gt;</span>
  <span class="kw">&lt;/main&gt;</span>

  <span class="kw">&lt;footer&gt;</span>
    <span class="kw">&lt;p&gt;</span>&amp;copy; 2026 My Site<span class="kw">&lt;/p&gt;</span>
  <span class="kw">&lt;/footer&gt;</span>
<span class="kw">&lt;/body&gt;</span>
<span class="kw">&lt;/html&gt;</span>`}</code></pre>
  </div>

  <!-- Accessible form -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Accessible form with ARIA</p>
    <pre class="code-block"><code>{@html `<span class="kw">&lt;form</span> <span class="arg">aria-labelledby</span>=<span class="str">"form-title"</span><span class="kw">&gt;</span>
  <span class="kw">&lt;h2</span> <span class="arg">id</span>=<span class="str">"form-title"</span><span class="kw">&gt;</span>Contact Us<span class="kw">&lt;/h2&gt;</span>

  <span class="kw">&lt;fieldset&gt;</span>
    <span class="kw">&lt;legend&gt;</span>Personal Info<span class="kw">&lt;/legend&gt;</span>

    <span class="kw">&lt;label</span> <span class="arg">for</span>=<span class="str">"full-name"</span><span class="kw">&gt;</span>Full Name<span class="kw">&lt;/label&gt;</span>
    <span class="kw">&lt;input</span>
      <span class="arg">id</span>=<span class="str">"full-name"</span>
      <span class="arg">type</span>=<span class="str">"text"</span>
      <span class="arg">required</span>
      <span class="arg">aria-required</span>=<span class="str">"true"</span>
    <span class="kw">/&gt;</span>

    <span class="kw">&lt;label</span> <span class="arg">for</span>=<span class="str">"user-email"</span><span class="kw">&gt;</span>Email<span class="kw">&lt;/label&gt;</span>
    <span class="kw">&lt;input</span>
      <span class="arg">id</span>=<span class="str">"user-email"</span>
      <span class="arg">type</span>=<span class="str">"email"</span>
      <span class="arg">required</span>
      <span class="arg">aria-describedby</span>=<span class="str">"email-hint"</span>
    <span class="kw">/&gt;</span>
    <span class="kw">&lt;span</span> <span class="arg">id</span>=<span class="str">"email-hint"</span><span class="kw">&gt;</span>We will not share your email.<span class="kw">&lt;/span&gt;</span>
  <span class="kw">&lt;/fieldset&gt;</span>

  <span class="kw">&lt;fieldset&gt;</span>
    <span class="kw">&lt;legend&gt;</span>Message<span class="kw">&lt;/legend&gt;</span>

    <span class="kw">&lt;label</span> <span class="arg">for</span>=<span class="str">"subject"</span><span class="kw">&gt;</span>Subject<span class="kw">&lt;/label&gt;</span>
    <span class="kw">&lt;select</span> <span class="arg">id</span>=<span class="str">"subject"</span><span class="kw">&gt;</span>
      <span class="kw">&lt;option</span> <span class="arg">value</span>=<span class="str">""</span><span class="kw">&gt;</span>Choose...<span class="kw">&lt;/option&gt;</span>
      <span class="kw">&lt;option</span> <span class="arg">value</span>=<span class="str">"support"</span><span class="kw">&gt;</span>Support<span class="kw">&lt;/option&gt;</span>
      <span class="kw">&lt;option</span> <span class="arg">value</span>=<span class="str">"feedback"</span><span class="kw">&gt;</span>Feedback<span class="kw">&lt;/option&gt;</span>
    <span class="kw">&lt;/select&gt;</span>

    <span class="kw">&lt;label</span> <span class="arg">for</span>=<span class="str">"msg"</span><span class="kw">&gt;</span>Your message<span class="kw">&lt;/label&gt;</span>
    <span class="kw">&lt;textarea</span> <span class="arg">id</span>=<span class="str">"msg"</span> <span class="arg">rows</span>=<span class="str">"5"</span><span class="kw">&gt;&lt;/textarea&gt;</span>
  <span class="kw">&lt;/fieldset&gt;</span>

  <span class="kw">&lt;button</span> <span class="arg">type</span>=<span class="str">"submit"</span><span class="kw">&gt;</span>Send<span class="kw">&lt;/button&gt;</span>
<span class="kw">&lt;/form&gt;</span>`}</code></pre>
  </div>

  <!-- Complex semantic layout -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Dashboard layout with sectioning</p>
    <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- A dashboard layout using semantic elements --&gt;</span>
<span class="kw">&lt;body&gt;</span>
  <span class="kw">&lt;header&gt;</span>
    <span class="kw">&lt;h1&gt;</span>Dashboard<span class="kw">&lt;/h1&gt;</span>
    <span class="kw">&lt;nav</span> <span class="arg">aria-label</span>=<span class="str">"Main"</span><span class="kw">&gt;</span>
      <span class="kw">&lt;a</span> <span class="arg">href</span>=<span class="str">"/overview"</span><span class="kw">&gt;</span>Overview<span class="kw">&lt;/a&gt;</span>
      <span class="kw">&lt;a</span> <span class="arg">href</span>=<span class="str">"/reports"</span><span class="kw">&gt;</span>Reports<span class="kw">&lt;/a&gt;</span>
      <span class="kw">&lt;a</span> <span class="arg">href</span>=<span class="str">"/settings"</span><span class="kw">&gt;</span>Settings<span class="kw">&lt;/a&gt;</span>
    <span class="kw">&lt;/nav&gt;</span>
  <span class="kw">&lt;/header&gt;</span>

  <span class="kw">&lt;main&gt;</span>
    <span class="cmt">&lt;!-- Stats section --&gt;</span>
    <span class="kw">&lt;section</span> <span class="arg">aria-labelledby</span>=<span class="str">"stats-heading"</span><span class="kw">&gt;</span>
      <span class="kw">&lt;h2</span> <span class="arg">id</span>=<span class="str">"stats-heading"</span><span class="kw">&gt;</span>Key Metrics<span class="kw">&lt;/h2&gt;</span>
      <span class="kw">&lt;div&gt;</span>
        <span class="kw">&lt;article&gt;</span>
          <span class="kw">&lt;h3&gt;</span>Users<span class="kw">&lt;/h3&gt;</span>
          <span class="kw">&lt;p&gt;</span>1,234<span class="kw">&lt;/p&gt;</span>
        <span class="kw">&lt;/article&gt;</span>
        <span class="kw">&lt;article&gt;</span>
          <span class="kw">&lt;h3&gt;</span>Revenue<span class="kw">&lt;/h3&gt;</span>
          <span class="kw">&lt;p&gt;</span>$56,789<span class="kw">&lt;/p&gt;</span>
        <span class="kw">&lt;/article&gt;</span>
      <span class="kw">&lt;/div&gt;</span>
    <span class="kw">&lt;/section&gt;</span>

    <span class="cmt">&lt;!-- Recent activity --&gt;</span>
    <span class="kw">&lt;section</span> <span class="arg">aria-labelledby</span>=<span class="str">"activity-heading"</span><span class="kw">&gt;</span>
      <span class="kw">&lt;h2</span> <span class="arg">id</span>=<span class="str">"activity-heading"</span><span class="kw">&gt;</span>Recent Activity<span class="kw">&lt;/h2&gt;</span>
      <span class="kw">&lt;ol&gt;</span>
        <span class="kw">&lt;li&gt;</span>User signed up<span class="kw">&lt;/li&gt;</span>
        <span class="kw">&lt;li&gt;</span>Report generated<span class="kw">&lt;/li&gt;</span>
        <span class="kw">&lt;li&gt;</span>Settings updated<span class="kw">&lt;/li&gt;</span>
      <span class="kw">&lt;/ol&gt;</span>
    <span class="kw">&lt;/section&gt;</span>
  <span class="kw">&lt;/main&gt;</span>

  <span class="kw">&lt;aside&gt;</span>
    <span class="kw">&lt;h2&gt;</span>Notifications<span class="kw">&lt;/h2&gt;</span>
    <span class="kw">&lt;ul&gt;</span>
      <span class="kw">&lt;li&gt;</span>Server update at midnight<span class="kw">&lt;/li&gt;</span>
      <span class="kw">&lt;li&gt;</span>New feature released<span class="kw">&lt;/li&gt;</span>
    <span class="kw">&lt;/ul&gt;</span>
  <span class="kw">&lt;/aside&gt;</span>

  <span class="kw">&lt;footer&gt;</span>
    <span class="kw">&lt;p&gt;</span>&amp;copy; 2026 Dashboard Inc.<span class="kw">&lt;/p&gt;</span>
  <span class="kw">&lt;/footer&gt;</span>
<span class="kw">&lt;/body&gt;</span>`}</code></pre>
  </div>

  <!-- Key patterns -->
  <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">Advanced Structure Patterns</h3>
    <ul class="space-y-2 text-sm text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        Use <strong>aria-labelledby</strong> to connect headings to their sections for screen readers.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <strong>fieldset</strong> and <strong>legend</strong> group related form controls with a visible label.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <strong>figure</strong> and <strong>figcaption</strong> associate images with their captions semantically.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        The <strong>time</strong> element with a <strong>datetime</strong> attribute makes dates machine-readable.
      </li>
    </ul>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
      I've read this
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
