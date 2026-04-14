<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });
</script>

{#if !advanced}
<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Encapsulation in Code</h2>
    <p class="text-sm text-slate-600">See how the visual concepts of locked boxes and public buttons translate to real JavaScript code.</p>
  </div>

  <!-- Mapping 1: Locked box → private fields -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual: Locked Box</h3>
      <div class="flex flex-col gap-2 rounded-lg border border-green-200 bg-green-50 p-4">
        <div class="flex items-center gap-2">
          <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span class="text-sm font-bold text-green-800">BankAccount</span>
        </div>
        <div class="ml-7 space-y-1">
          <div class="rounded bg-slate-100 px-2 py-1 text-xs text-slate-500 blur-[1.5px]">balance: 1000</div>
          <div class="rounded bg-slate-100 px-2 py-1 text-xs text-slate-500 blur-[1.5px]">owner: "Alice"</div>
        </div>
        <div class="ml-7 mt-1 text-xs text-green-600 font-medium">Data locked inside the box</div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code: Private Fields (#)</h3>
      <pre class="code-block"><code>{@html `<span class="keyword">class</span> <span class="variable">BankAccount</span> <span class="punctuation">{</span>
  <span class="comment">// Private fields -- hidden from outside</span>
  <span class="keyword">#</span><span class="variable">balance</span>;
  <span class="keyword">#</span><span class="variable">owner</span>;

  <span class="keyword">constructor</span>(<span class="variable">owner</span>, <span class="variable">initial</span>) <span class="punctuation">{</span>
    <span class="keyword">this</span>.<span class="keyword">#</span><span class="variable">balance</span> = <span class="variable">initial</span>;
    <span class="keyword">this</span>.<span class="keyword">#</span><span class="variable">owner</span> = <span class="variable">owner</span>;
  <span class="punctuation">}</span>
<span class="punctuation">}</span>`}</code></pre>
    </div>
  </div>

  <!-- Mapping 2: Buttons on box → public methods -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual: Buttons on the Box</h3>
      <div class="flex flex-col gap-2 rounded-lg border border-green-200 bg-green-50 p-4">
        <div class="text-xs font-semibold text-green-600 uppercase tracking-wide">Public interface</div>
        <div class="flex flex-col gap-1.5">
          <div class="rounded-lg bg-green-200 px-3 py-1.5 text-sm font-bold text-green-800 text-center">deposit(amount)</div>
          <div class="rounded-lg bg-green-200 px-3 py-1.5 text-sm font-bold text-green-800 text-center">withdraw(amount)</div>
          <div class="rounded-lg bg-green-200 px-3 py-1.5 text-sm font-bold text-green-800 text-center">getBalance()</div>
        </div>
        <div class="text-xs text-green-600 font-medium">These buttons are the only way in</div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code: Public Methods</h3>
      <pre class="code-block"><code>{@html `<span class="comment">// Public methods -- the safe interface</span>
<span class="keyword">deposit</span>(<span class="variable">amount</span>) <span class="punctuation">{</span>
  <span class="keyword">if</span> (<span class="variable">amount</span> > <span class="string">0</span>) <span class="punctuation">{</span>
    <span class="keyword">this</span>.<span class="keyword">#</span><span class="variable">balance</span> += <span class="variable">amount</span>;
  <span class="punctuation">}</span>
<span class="punctuation">}</span>

<span class="keyword">withdraw</span>(<span class="variable">amount</span>) <span class="punctuation">{</span>
  <span class="keyword">if</span> (<span class="variable">amount</span> > <span class="string">0</span> && <span class="variable">amount</span> &lt;= <span class="keyword">this</span>.<span class="keyword">#</span><span class="variable">balance</span>) <span class="punctuation">{</span>
    <span class="keyword">this</span>.<span class="keyword">#</span><span class="variable">balance</span> -= <span class="variable">amount</span>;
  <span class="punctuation">}</span>
<span class="punctuation">}</span>

<span class="keyword">getBalance</span>() <span class="punctuation">{</span>
  <span class="keyword">return</span> <span class="keyword">this</span>.<span class="keyword">#</span><span class="variable">balance</span>;
<span class="punctuation">}</span>`}</code></pre>
    </div>
  </div>

  <!-- Mapping 3: Reaching inside → accessing private field error -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Visual: Trying to Reach Inside</h3>
      <div class="flex flex-col items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4">
        <div class="flex items-center gap-3">
          <div class="rounded-xl border-2 border-green-400 bg-green-50 px-4 py-3">
            <svg class="mx-auto h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div class="text-2xl text-red-400">
            <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <div class="rounded bg-red-100 px-3 py-2 text-sm font-bold text-red-600">Blocked!</div>
        </div>
        <div class="text-xs text-red-500 font-medium">Cannot reach past the lock</div>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Code: Private Access Error</h3>
      <pre class="code-block"><code>{@html `<span class="keyword">const</span> <span class="variable">acct</span> = <span class="keyword">new</span> <span class="variable">BankAccount</span>(<span class="string">"Alice"</span>, <span class="string">1000</span>);

<span class="comment">// This works -- public method</span>
<span class="variable">acct</span>.<span class="variable">deposit</span>(<span class="string">500</span>);
<span class="variable">acct</span>.<span class="variable">getBalance</span>();  <span class="comment">// 1500</span>

<span class="comment">// This FAILS -- private field!</span>
<span class="variable">acct</span>.<span class="keyword">#</span><span class="variable">balance</span> = <span class="string">999999</span>;
<span class="comment">// SyntaxError: Private field</span>
<span class="comment">// '#balance' must be declared</span>
<span class="comment">// in an enclosing class</span>`}</code></pre>
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
    <h2 class="mb-3 text-xl font-bold text-slate-800">Encapsulation in Code (Advanced)</h2>
    <p class="text-sm text-slate-600">TypeScript access modifiers, private class fields, readonly patterns, and information hiding with interfaces.</p>
  </div>

  <!-- TypeScript access modifiers -->
  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-500">TypeScript: private, protected, public</h3>
    <pre class="code-block"><code>{@html `<span class="keyword">class</span> <span class="variable">BankAccount</span> <span class="punctuation">{</span>
  <span class="keyword">private</span> <span class="variable">balance</span>: <span class="variable">number</span>;
  <span class="keyword">protected</span> <span class="variable">owner</span>: <span class="variable">string</span>;
  <span class="keyword">public</span> <span class="variable">id</span>: <span class="variable">string</span>;

  <span class="keyword">constructor</span>(<span class="variable">owner</span>: <span class="variable">string</span>, <span class="variable">initial</span>: <span class="variable">number</span>) <span class="punctuation">{</span>
    <span class="keyword">this</span>.<span class="variable">balance</span> = <span class="variable">initial</span>;
    <span class="keyword">this</span>.<span class="variable">owner</span> = <span class="variable">owner</span>;
    <span class="keyword">this</span>.<span class="variable">id</span> = <span class="variable">crypto</span>.<span class="variable">randomUUID</span>();
  <span class="punctuation">}</span>
<span class="punctuation">}</span>

<span class="keyword">class</span> <span class="variable">SavingsAccount</span> <span class="keyword">extends</span> <span class="variable">BankAccount</span> <span class="punctuation">{</span>
  <span class="variable">showOwner</span>() <span class="punctuation">{</span>
    <span class="keyword">return</span> <span class="keyword">this</span>.<span class="variable">owner</span>;    <span class="comment">// OK -- protected</span>
  <span class="punctuation">}</span>
  <span class="variable">showBalance</span>() <span class="punctuation">{</span>
    <span class="keyword">return</span> <span class="keyword">this</span>.<span class="variable">balance</span>;  <span class="comment">// ERROR -- private</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span>`}</code></pre>
  </div>

  <!-- Private class fields (#) -->
  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-500">Private Class Fields (# syntax)</h3>
    <pre class="code-block"><code>{@html `<span class="keyword">class</span> <span class="variable">Wallet</span> <span class="punctuation">{</span>
  <span class="keyword">#</span><span class="variable">funds</span>: <span class="variable">number</span> = <span class="string">0</span>;
  <span class="keyword">#</span><span class="variable">history</span>: <span class="variable">string</span>[] = [];

  <span class="variable">deposit</span>(<span class="variable">amount</span>: <span class="variable">number</span>) <span class="punctuation">{</span>
    <span class="keyword">if</span> (<span class="variable">amount</span> &lt;= <span class="string">0</span>) <span class="keyword">throw</span> <span class="keyword">new</span> <span class="variable">Error</span>(<span class="string">"Invalid"</span>);
    <span class="keyword">this</span>.<span class="keyword">#</span><span class="variable">funds</span> += <span class="variable">amount</span>;
    <span class="keyword">this</span>.<span class="keyword">#</span><span class="variable">history</span>.<span class="variable">push</span>(<span class="string">\`+\${amount}\`</span>);
  <span class="punctuation">}</span>

  <span class="keyword">get</span> <span class="variable">balance</span>() <span class="punctuation">{</span> <span class="keyword">return</span> <span class="keyword">this</span>.<span class="keyword">#</span><span class="variable">funds</span>; <span class="punctuation">}</span>
<span class="punctuation">}</span>

<span class="keyword">const</span> <span class="variable">w</span> = <span class="keyword">new</span> <span class="variable">Wallet</span>();
<span class="variable">w</span>.<span class="variable">deposit</span>(<span class="string">100</span>);
<span class="variable">w</span>.<span class="variable">balance</span>;      <span class="comment">// 100</span>
<span class="variable">w</span>.<span class="keyword">#</span><span class="variable">funds</span>;       <span class="comment">// SyntaxError at runtime</span>`}</code></pre>
  </div>

  <!-- Readonly properties and immutable patterns -->
  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-500">Readonly Properties and Immutable Patterns</h3>
    <pre class="code-block"><code>{@html `<span class="keyword">class</span> <span class="variable">Config</span> <span class="punctuation">{</span>
  <span class="keyword">readonly</span> <span class="variable">apiUrl</span>: <span class="variable">string</span>;
  <span class="keyword">readonly</span> <span class="variable">maxRetries</span>: <span class="variable">number</span>;

  <span class="keyword">constructor</span>(<span class="variable">url</span>: <span class="variable">string</span>, <span class="variable">retries</span>: <span class="variable">number</span>) <span class="punctuation">{</span>
    <span class="keyword">this</span>.<span class="variable">apiUrl</span> = <span class="variable">url</span>;
    <span class="keyword">this</span>.<span class="variable">maxRetries</span> = <span class="variable">retries</span>;
  <span class="punctuation">}</span>
<span class="punctuation">}</span>

<span class="keyword">const</span> <span class="variable">cfg</span> = <span class="keyword">new</span> <span class="variable">Config</span>(<span class="string">"/api"</span>, <span class="string">3</span>);
<span class="variable">cfg</span>.<span class="variable">apiUrl</span>;      <span class="comment">// "/api"</span>
<span class="variable">cfg</span>.<span class="variable">apiUrl</span> = <span class="string">"x"</span>; <span class="comment">// ERROR -- readonly</span>

<span class="comment">// Immutable return pattern</span>
<span class="keyword">class</span> <span class="variable">Registry</span> <span class="punctuation">{</span>
  <span class="keyword">private</span> <span class="variable">items</span>: <span class="variable">string</span>[] = [];

  <span class="variable">add</span>(<span class="variable">item</span>: <span class="variable">string</span>) <span class="punctuation">{</span> <span class="keyword">this</span>.<span class="variable">items</span>.<span class="variable">push</span>(<span class="variable">item</span>); <span class="punctuation">}</span>

  <span class="variable">getAll</span>(): <span class="keyword">readonly</span> <span class="variable">string</span>[] <span class="punctuation">{</span>
    <span class="keyword">return</span> <span class="punctuation">[</span>...<span class="keyword">this</span>.<span class="variable">items</span><span class="punctuation">]</span>; <span class="comment">// defensive copy</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span>`}</code></pre>
  </div>

  <!-- Information hiding with interfaces -->
  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-500">Information Hiding with Interfaces</h3>
    <pre class="code-block"><code>{@html `<span class="comment">// Interface exposes only what consumers need</span>
<span class="keyword">interface</span> <span class="variable">Logger</span> <span class="punctuation">{</span>
  <span class="variable">log</span>(<span class="variable">msg</span>: <span class="variable">string</span>): <span class="keyword">void</span>;
  <span class="variable">getLogs</span>(): <span class="keyword">readonly</span> <span class="variable">string</span>[];
<span class="punctuation">}</span>

<span class="comment">// Implementation hides all internal details</span>
<span class="keyword">class</span> <span class="variable">FileLogger</span> <span class="keyword">implements</span> <span class="variable">Logger</span> <span class="punctuation">{</span>
  <span class="keyword">#</span><span class="variable">buffer</span>: <span class="variable">string</span>[] = [];
  <span class="keyword">#</span><span class="variable">maxSize</span> = <span class="string">1000</span>;

  <span class="variable">log</span>(<span class="variable">msg</span>: <span class="variable">string</span>) <span class="punctuation">{</span>
    <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="keyword">#</span><span class="variable">buffer</span>.<span class="variable">length</span> >= <span class="keyword">this</span>.<span class="keyword">#</span><span class="variable">maxSize</span>) <span class="punctuation">{</span>
      <span class="keyword">this</span>.<span class="keyword">#</span><span class="variable">flush</span>();
    <span class="punctuation">}</span>
    <span class="keyword">this</span>.<span class="keyword">#</span><span class="variable">buffer</span>.<span class="variable">push</span>(<span class="variable">msg</span>);
  <span class="punctuation">}</span>

  <span class="variable">getLogs</span>() <span class="punctuation">{</span> <span class="keyword">return</span> <span class="punctuation">[</span>...<span class="keyword">this</span>.<span class="keyword">#</span><span class="variable">buffer</span><span class="punctuation">]</span>; <span class="punctuation">}</span>

  <span class="keyword">#</span><span class="variable">flush</span>() <span class="punctuation">{</span> <span class="keyword">this</span>.<span class="keyword">#</span><span class="variable">buffer</span> = []; <span class="punctuation">}</span>
<span class="punctuation">}</span>

<span class="comment">// Consumers only see the Logger interface</span>
<span class="keyword">function</span> <span class="variable">processData</span>(<span class="variable">logger</span>: <span class="variable">Logger</span>) <span class="punctuation">{</span>
  <span class="variable">logger</span>.<span class="variable">log</span>(<span class="string">"Processing..."</span>);
  <span class="comment">// logger.#buffer -- impossible!</span>
  <span class="comment">// logger.#flush() -- impossible!</span>
<span class="punctuation">}</span>`}</code></pre>
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
    color: #e2e8f0;
    border: 1px solid #334155;
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    font-size: 0.875rem;
    line-height: 1.7;
    overflow-x: auto;
  }
  .code-block :global(.keyword)     { color: #93c5fd; }
  .code-block :global(.variable)    { color: #67e8f9; }
  .code-block :global(.string)      { color: #86efac; }
  .code-block :global(.comment)     { color: #475569; }
  .code-block :global(.punctuation) { color: #fcd34d; }
</style>
