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

  // === Basic mode state ===
  let userName = $state('');

  let basicGreeting = $derived(
    userName.trim() ? `Hello, ${userName.trim()}! Welcome to TypeScript.` : 'Hello, World! Welcome to TypeScript.'
  );

  let basicCode = $derived(
    userName.trim()
      ? `const name = "${userName.trim()}";\nconsole.log(\`Hello, \${name}! Welcome to TypeScript.\`);`
      : `const name = "World";\nconsole.log(\`Hello, \${name}! Welcome to TypeScript.\`);`
  );

  // === Advanced mode state ===
  let ifaceName = $state('name');
  let ifaceAge = $state('25');
  let objName = $state('Alice');
  let objAge = $state('25');

  let ageIsValid = $derived(!isNaN(Number(objAge)) && objAge.trim() !== '');

  let advCode = $derived(() => {
    const nameField = ifaceName.trim() || 'name';
    const ageField = ifaceAge.trim() || 'age';
    return `interface Person {\n  ${nameField}: string;\n  ${ageField}: number;\n}\n\nconst person: Person = {\n  ${nameField}: "${objName.trim() || 'Alice'}",\n  ${ageField}: ${ageIsValid ? objAge.trim() : `"${objAge.trim()}"  // Type error!`},\n};`;
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Hello TypeScript</h2>
    <p class="text-slate-600">
      Type your name below and watch the greeting update in real time. On the left you see what the program <strong>outputs</strong>; on the right, the <strong>code</strong> that produces it.
    </p>
  </div>

  <div>
    <label for="basic-name" class="mb-1 block text-sm font-semibold text-slate-700">Your name</label>
    <input
      id="basic-name"
      type="text"
      bind:value={userName}
      placeholder="Type your name..."
      class="w-full max-w-xs rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
    />
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <!-- Result panel -->
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Result</h3>
      <div class="flex min-h-[5rem] items-center rounded-xl border-2 border-green-200 bg-green-50 p-5">
        <p class="text-lg font-medium text-green-800">{basicGreeting}</p>
      </div>
    </div>

    <!-- Code panel -->
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code</h3>
      <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">name</span> = <span class="str">"${userName.trim() || 'World'}"</span>;
<span class="fn">console</span>.<span class="fn">log</span>(<span class="str">\`Hello, \${<span class="var">name</span>}! Welcome to TypeScript.\`</span>);`}</code></pre>
    </div>
  </div>

  <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">What's happening?</h3>
    <ul class="space-y-1 text-sm text-slate-600">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <code class="rounded bg-white px-1 text-sm text-blue-700">const name</code> creates a variable to store text.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        <code class="rounded bg-white px-1 text-sm text-blue-700">console.log()</code> prints a message to the screen.
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
        The backtick string <code class="rounded bg-white px-1 text-sm text-blue-700">{"`${...}`"}</code> lets you embed variables inside text.
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      I've tried this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Type Explorer</h2>
      <p class="text-slate-600">
        Define an interface by naming its fields, then create an object that matches it. If you enter a non-numeric value for <code class="rounded bg-slate-100 px-1 text-sm text-blue-700">number</code> fields, you'll see a type error in real time -- just like the TypeScript compiler would report.
      </p>
    </div>

    <!-- Interface definition -->
    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">1. Define your interface</h3>
      <div class="grid gap-3 sm:grid-cols-2">
        <div>
          <label for="field-name" class="mb-1 block text-xs font-semibold text-slate-500">String field name</label>
          <input
            id="field-name"
            type="text"
            bind:value={ifaceName}
            placeholder="name"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <div>
          <label for="field-age" class="mb-1 block text-xs font-semibold text-slate-500">Number field name</label>
          <input
            id="field-age"
            type="text"
            bind:value={ifaceAge}
            placeholder="age"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>
      </div>
    </div>

    <!-- Object creation -->
    <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-purple-600">2. Create an object</h3>
      <div class="grid gap-3 sm:grid-cols-2">
        <div>
          <label for="obj-name" class="mb-1 block text-xs font-semibold text-slate-500">{ifaceName.trim() || 'name'} (string)</label>
          <input
            id="obj-name"
            type="text"
            bind:value={objName}
            placeholder="Alice"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <div>
          <label for="obj-age" class="mb-1 block text-xs font-semibold text-slate-500">{ifaceAge.trim() || 'age'} (number)</label>
          <input
            id="obj-age"
            type="text"
            bind:value={objAge}
            placeholder="25"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-colors focus:outline-none
              {ageIsValid ? 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' : 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'}"
          />
          {#if !ageIsValid}
            <p class="mt-1 text-xs font-medium text-red-600">Type error: expected <code class="text-xs">number</code>, got <code class="text-xs">string</code></p>
          {/if}
        </div>
      </div>
    </div>

    <!-- Live code preview -->
    <div>
      <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Generated TypeScript</p>
      <pre class="code-block"><code>{@html (() => {
        const nf = ifaceName.trim() || 'name';
        const af = ifaceAge.trim() || 'age';
        const nv = objName.trim() || 'Alice';
        const av = objAge.trim();
        const ageValid = !isNaN(Number(av)) && av !== '';
        const ageVal = ageValid
          ? `<span class="num">${av}</span>`
          : `<span class="str">"${av}"</span>  <span class="cmt">// Error: Type 'string' is not assignable to type 'number'</span>`;
        return `<span class="kw">interface</span> <span class="fn">Person</span> {
  <span class="var">${nf}</span>: <span class="fn">string</span>;
  <span class="var">${af}</span>: <span class="fn">number</span>;
}

<span class="kw">const</span> <span class="var">person</span>: <span class="fn">Person</span> = {
  <span class="var">${nf}</span>: <span class="str">"${nv}"</span>,
  <span class="var">${af}</span>: ${ageVal},
};`;
      })()}</code></pre>
    </div>

    <div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
      <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">How it works</h3>
      <ul class="space-y-1 text-sm text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          An <code class="rounded bg-white px-1 text-sm text-blue-700">interface</code> defines the shape an object must match.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          TypeScript checks that every property value matches its declared type.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
          Errors appear at compile time, before the code ever runs.
        </li>
      </ul>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95">
        I've tried this
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
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
