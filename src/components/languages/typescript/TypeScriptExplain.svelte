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

  const useCases = [
    {
      icon: '\uD83C\uDF10',
      title: 'Web',
      desc: 'Build interactive websites and web apps that run in every browser.',
      color: 'bg-blue-100 border-blue-400',
      textColor: 'text-blue-700',
    },
    {
      icon: '\uD83D\uDDA5\uFE0F',
      title: 'Server',
      desc: 'Power backends and APIs with Node.js, Deno, or Bun.',
      color: 'bg-green-100 border-green-400',
      textColor: 'text-green-700',
    },
    {
      icon: '\uD83D\uDCF1',
      title: 'Mobile',
      desc: 'Create mobile apps with React Native, Expo, or Ionic.',
      color: 'bg-purple-100 border-purple-400',
      textColor: 'text-purple-700',
    },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < useCases.length) {
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
      JavaScript is <strong>the language of the web</strong>. Every website you visit uses it. TypeScript is a superset of JavaScript that adds optional types, helping you catch mistakes before your code even runs. Together they are the most widely used programming languages in the world.
    </p>
  </div>

  <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">Where does it run?</h3>
    <p class="text-slate-600">
      JavaScript was born inside web <strong>browsers</strong> (Chrome, Firefox, Safari), but today it also runs on <strong>servers</strong> thanks to Node.js, Deno, and Bun. You can even build <strong>mobile apps</strong> and <strong>desktop apps</strong> with it. One language, everywhere.
    </p>
  </div>

  <div class="flex flex-wrap items-start justify-evenly gap-6">
    {#each useCases as card, i}
      <div
        class="flex flex-col items-center gap-2 transition-all duration-700
          {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}"
      >
        <div class="relative flex h-32 w-40 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-dashed {card.color} shadow-md transition-transform duration-300 hover:scale-105">
          <span class="text-4xl">{card.icon}</span>
          <span class="mt-1 text-sm font-bold {card.textColor}">{card.title}</span>
        </div>
        <p class="w-40 text-center text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">What is it used for?</h3>
    <ul class="space-y-2 text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <strong>Websites and web apps</strong> -- from simple pages to complex apps like Gmail, Figma, and Notion.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <strong>Servers and APIs</strong> -- Node.js lets JavaScript handle millions of requests on the backend.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <strong>Mobile apps</strong> -- React Native and similar tools turn JavaScript into native iOS and Android apps.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <strong>Games, tools, and more</strong> -- browser games, VS Code extensions, CLI tools, even robots!
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">The Typed Superset of JavaScript</h2>
      <p class="text-slate-600">
        TypeScript adds a powerful <strong>static type system</strong> on top of JavaScript. Every valid JavaScript program is also valid TypeScript, but TypeScript lets you describe the <em>shapes</em> of your data so the compiler can catch bugs before runtime.
      </p>
    </div>

    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
      <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">Structural Typing</h3>
      <p class="text-slate-600">
        TypeScript uses <strong>structural typing</strong> (also called "duck typing"). Two types are compatible if their <em>shapes</em> match -- it doesn't matter what the type is named. If an object has all the required properties, it satisfies the type.
      </p>
    </div>

    <div>
      <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Type annotations, interfaces, and generics</p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Type annotations</span>
<span class="kw">let</span> <span class="var">name</span>: <span class="fn">string</span> = <span class="str">"Alice"</span>;
<span class="kw">let</span> <span class="var">age</span>: <span class="fn">number</span> = <span class="num">30</span>;
<span class="kw">let</span> <span class="var">active</span>: <span class="fn">boolean</span> = <span class="kw">true</span>;

<span class="cmt">// Interfaces describe object shapes</span>
<span class="kw">interface</span> <span class="fn">User</span> {
  <span class="var">name</span>: <span class="fn">string</span>;
  <span class="var">age</span>: <span class="fn">number</span>;
  <span class="var">email</span><span class="op">?</span>: <span class="fn">string</span>;  <span class="cmt">// optional property</span>
}

<span class="kw">const</span> <span class="var">user</span>: <span class="fn">User</span> = { <span class="var">name</span>: <span class="str">"Alice"</span>, <span class="var">age</span>: <span class="num">30</span> };

<span class="cmt">// Generics -- reusable type parameters</span>
<span class="kw">function</span> <span class="fn">first</span>&lt;<span class="fn">T</span>&gt;(<span class="arg">items</span>: <span class="fn">T</span>[]): <span class="fn">T</span> <span class="op">|</span> <span class="fn">undefined</span> {
  <span class="kw">return</span> <span class="var">items</span>[<span class="num">0</span>];
}

<span class="kw">const</span> <span class="var">n</span> = <span class="fn">first</span>([<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>]);     <span class="cmt">// n: number | undefined</span>
<span class="kw">const</span> <span class="var">s</span> = <span class="fn">first</span>([<span class="str">"a"</span>, <span class="str">"b"</span>]);   <span class="cmt">// s: string | undefined</span>`}</code></pre>
    </div>

    <div>
      <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Type inference</p>
      <pre class="code-block"><code>{@html `<span class="cmt">// TypeScript infers types when you don't annotate</span>
<span class="kw">let</span> <span class="var">count</span> = <span class="num">0</span>;              <span class="cmt">// inferred as number</span>
<span class="kw">let</span> <span class="var">items</span> = [<span class="str">"a"</span>, <span class="str">"b"</span>];    <span class="cmt">// inferred as string[]</span>
<span class="kw">const</span> <span class="var">PI</span> = <span class="num">3.14</span>;            <span class="cmt">// inferred as literal 3.14</span>

<span class="cmt">// The compiler catches type errors at build time</span>
<span class="var">count</span> = <span class="str">"hello"</span>;  <span class="cmt">// Error: Type 'string' is not assignable to 'number'</span>`}</code></pre>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <strong>Compilation</strong>: TypeScript compiles to plain JavaScript. The types are erased at runtime -- they exist only for developer tooling and error checking.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <strong>Structural typing</strong>: Compatibility is determined by shape, not by name. An object with the right properties satisfies any matching interface.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <strong>Generics</strong>: Let you write functions and types that work with any data type while preserving type safety.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          <strong>Gradual adoption</strong>: You can add TypeScript to an existing JavaScript project incrementally -- every JS file is already valid TS.
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
