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

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Code Examples: Clever vs. Simple</h2>
    <p class="text-slate-600">Side-by-side comparisons showing why clear code beats clever code every time.</p>
  </div>

  <!-- Example 1: Nested Ternary vs If/Else -->
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-slate-800">1. Nested Ternary vs. If/Else</h3>
    <p class="text-sm text-slate-600">Ternaries are great for simple conditions, but nesting them creates a puzzle.</p>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <span class="mb-1 inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">Clever</span>
        <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">msg</span> <span class="op">=</span> <span class="var">status</span> <span class="op">===</span> <span class="str">"ok"</span>
  <span class="op">?</span> <span class="var">count</span> <span class="op">&gt;</span> <span class="num">1</span>
    <span class="op">?</span> <span class="str">\`\${<span class="var">count</span>} items ready\`</span>
    <span class="op">:</span> <span class="str">"1 item ready"</span>
  <span class="op">:</span> <span class="var">status</span> <span class="op">===</span> <span class="str">"loading"</span>
    <span class="op">?</span> <span class="str">"Loading..."</span>
    <span class="op">:</span> <span class="str">"Error occurred"</span><span class="op">;</span>`}</code></pre>
      </div>
      <div>
        <span class="mb-1 inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-600">Simple</span>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">getMessage</span>(<span class="arg">status</span>, <span class="arg">count</span>) {
  <span class="kw">if</span> (<span class="arg">status</span> <span class="op">===</span> <span class="str">"loading"</span>) {
    <span class="kw">return</span> <span class="str">"Loading..."</span><span class="op">;</span>
  }
  <span class="kw">if</span> (<span class="arg">status</span> <span class="op">!==</span> <span class="str">"ok"</span>) {
    <span class="kw">return</span> <span class="str">"Error occurred"</span><span class="op">;</span>
  }
  <span class="kw">if</span> (<span class="arg">count</span> <span class="op">&gt;</span> <span class="num">1</span>) {
    <span class="kw">return</span> <span class="str">\`\${<span class="arg">count</span>} items ready\`</span><span class="op">;</span>
  }
  <span class="kw">return</span> <span class="str">"1 item ready"</span><span class="op">;</span>
}`}</code></pre>
      </div>
    </div>
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
      <p class="text-sm text-slate-600"><strong>Why it's better:</strong> Each condition is on its own line with a clear return. You can read it top-to-bottom without mentally tracking nested branches. The function also gives this logic a name.</p>
    </div>
  </div>

  <!-- Example 2: Chained One-Liner vs Step-by-Step -->
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-slate-800">2. Chained One-Liner vs. Step-by-Step</h3>
    <p class="text-sm text-slate-600">Method chaining is powerful, but cramming everything into one expression hides intent.</p>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <span class="mb-1 inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">Clever</span>
        <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">result</span> <span class="op">=</span> <span class="var">data</span>
  <span class="op">.</span><span class="fn">split</span>(<span class="str">"\\n"</span>)
  <span class="op">.</span><span class="fn">map</span>(<span class="arg">l</span><span class="op">=&gt;</span><span class="arg">l</span><span class="op">.</span><span class="fn">trim</span>())
  <span class="op">.</span><span class="fn">filter</span>(<span class="arg">l</span><span class="op">=&gt;</span><span class="arg">l</span><span class="op">&amp;&amp;</span><span class="op">!</span><span class="arg">l</span><span class="op">.</span><span class="fn">startsWith</span>(<span class="str">"#"</span>))
  <span class="op">.</span><span class="fn">map</span>(<span class="arg">l</span><span class="op">=&gt;</span><span class="arg">l</span><span class="op">.</span><span class="fn">split</span>(<span class="str">","</span>))
  <span class="op">.</span><span class="fn">map</span>(([<span class="arg">k</span>,<span class="arg">v</span>])<span class="op">=&gt;</span>({<span class="var">key</span><span class="op">:</span><span class="arg">k</span>,<span class="var">val</span><span class="op">:</span><span class="fn">Number</span>(<span class="arg">v</span>)}))<span class="op">;</span>`}</code></pre>
      </div>
      <div>
        <span class="mb-1 inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-600">Simple</span>
        <pre class="code-block"><code>{@html `<span class="cmt">// Split text into lines</span>
<span class="kw">const</span> <span class="var">lines</span> <span class="op">=</span> <span class="var">data</span><span class="op">.</span><span class="fn">split</span>(<span class="str">"\\n"</span>)<span class="op">;</span>

<span class="cmt">// Remove empty lines and comments</span>
<span class="kw">const</span> <span class="var">contentLines</span> <span class="op">=</span> <span class="var">lines</span>
  <span class="op">.</span><span class="fn">map</span>(<span class="arg">line</span> <span class="op">=&gt;</span> <span class="arg">line</span><span class="op">.</span><span class="fn">trim</span>())
  <span class="op">.</span><span class="fn">filter</span>(<span class="arg">line</span> <span class="op">=&gt;</span> <span class="arg">line</span> <span class="op">&amp;&amp;</span> <span class="op">!</span><span class="arg">line</span><span class="op">.</span><span class="fn">startsWith</span>(<span class="str">"#"</span>))<span class="op">;</span>

<span class="cmt">// Parse each line into key-value pairs</span>
<span class="kw">const</span> <span class="var">entries</span> <span class="op">=</span> <span class="var">contentLines</span><span class="op">.</span><span class="fn">map</span>(<span class="arg">line</span> <span class="op">=&gt;</span> {
  <span class="kw">const</span> [<span class="var">key</span>, <span class="var">rawValue</span>] <span class="op">=</span> <span class="arg">line</span><span class="op">.</span><span class="fn">split</span>(<span class="str">","</span>)<span class="op">;</span>
  <span class="kw">return</span> { <span class="var">key</span>, <span class="var">val</span><span class="op">:</span> <span class="fn">Number</span>(<span class="var">rawValue</span>) }<span class="op">;</span>
})<span class="op">;</span>`}</code></pre>
      </div>
    </div>
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
      <p class="text-sm text-slate-600"><strong>Why it's better:</strong> Named intermediate variables (<code class="rounded bg-slate-100 px-1 text-sm text-green-700">lines</code>, <code class="rounded bg-slate-100 px-1 text-sm text-green-700">contentLines</code>, <code class="rounded bg-slate-100 px-1 text-sm text-green-700">entries</code>) describe each step. Comments explain <em>why</em>, not just what. Debugging is easier because you can inspect each stage.</p>
    </div>
  </div>

  <!-- Example 3: Over-Abstracted vs Direct -->
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-slate-800">3. Over-Abstracted vs. Direct</h3>
    <p class="text-sm text-slate-600">Abstraction is good when it reduces repetition. But abstracting a one-off operation just adds indirection.</p>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <span class="mb-1 inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">Clever</span>
        <pre class="code-block"><code>{@html `<span class="kw">class</span> <span class="var">EmailValidator</span> {
  <span class="kw">constructor</span>(<span class="arg">rules</span>) {
    <span class="kw">this</span><span class="op">.</span><span class="var">rules</span> <span class="op">=</span> <span class="arg">rules</span><span class="op">;</span>
  }
  <span class="fn">validate</span>(<span class="arg">email</span>) {
    <span class="kw">return</span> <span class="kw">this</span><span class="op">.</span><span class="var">rules</span><span class="op">.</span><span class="fn">every</span>(
      <span class="arg">rule</span> <span class="op">=&gt;</span> <span class="arg">rule</span>(<span class="arg">email</span>)
    )<span class="op">;</span>
  }
}

<span class="kw">const</span> <span class="var">validator</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">EmailValidator</span>([
  <span class="arg">e</span> <span class="op">=&gt;</span> <span class="arg">e</span><span class="op">.</span><span class="fn">includes</span>(<span class="str">"@"</span>),
  <span class="arg">e</span> <span class="op">=&gt;</span> <span class="arg">e</span><span class="op">.</span><span class="var">length</span> <span class="op">&gt;</span> <span class="num">5</span>,
])<span class="op">;</span>
<span class="var">validator</span><span class="op">.</span><span class="fn">validate</span>(<span class="var">email</span>)<span class="op">;</span>`}</code></pre>
      </div>
      <div>
        <span class="mb-1 inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-600">Simple</span>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">isValidEmail</span>(<span class="arg">email</span>) {
  <span class="kw">if</span> (<span class="op">!</span><span class="arg">email</span><span class="op">.</span><span class="fn">includes</span>(<span class="str">"@"</span>)) {
    <span class="kw">return</span> <span class="num">false</span><span class="op">;</span>
  }
  <span class="kw">if</span> (<span class="arg">email</span><span class="op">.</span><span class="var">length</span> <span class="op">&lt;=</span> <span class="num">5</span>) {
    <span class="kw">return</span> <span class="num">false</span><span class="op">;</span>
  }
  <span class="kw">return</span> <span class="num">true</span><span class="op">;</span>
}`}</code></pre>
      </div>
    </div>
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
      <p class="text-sm text-slate-600"><strong>Why it's better:</strong> A plain function with early returns is immediately clear. The class-with-rules pattern is useful when you have many interchangeable validators, but for two simple checks it's over-engineering.</p>
    </div>
  </div>

  <!-- Full Example: Simple Well-Commented Function -->
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-slate-800">Putting It Together: A Simple, Well-Written Function</h3>
    <p class="text-sm text-slate-600">Here is what "keep it simple" looks like in practice — a real function with clear naming, flat structure, and helpful comments.</p>
    <pre class="code-block"><code>{@html `<span class="cmt">/**
 * Calculate the total price of a shopping cart.
 * Applies a discount if the customer has a coupon code.
 */</span>
<span class="kw">function</span> <span class="fn">calculateTotal</span>(<span class="arg">items</span>, <span class="arg">couponCode</span>) {
  <span class="cmt">// Sum up the price of each item times its quantity</span>
  <span class="kw">let</span> <span class="var">subtotal</span> <span class="op">=</span> <span class="num">0</span><span class="op">;</span>
  <span class="kw">for</span> (<span class="kw">const</span> <span class="var">item</span> <span class="kw">of</span> <span class="arg">items</span>) {
    <span class="var">subtotal</span> <span class="op">+=</span> <span class="var">item</span><span class="op">.</span><span class="var">price</span> <span class="op">*</span> <span class="var">item</span><span class="op">.</span><span class="var">quantity</span><span class="op">;</span>
  }

  <span class="cmt">// Apply discount if coupon is valid</span>
  <span class="kw">const</span> <span class="var">discount</span> <span class="op">=</span> <span class="fn">getDiscount</span>(<span class="arg">couponCode</span>)<span class="op">;</span>
  <span class="kw">const</span> <span class="var">total</span> <span class="op">=</span> <span class="var">subtotal</span> <span class="op">*</span> (<span class="num">1</span> <span class="op">-</span> <span class="var">discount</span>)<span class="op">;</span>

  <span class="cmt">// Never charge less than zero</span>
  <span class="kw">return</span> <span class="fn">Math.max</span>(<span class="num">0</span>, <span class="var">total</span>)<span class="op">;</span>
}`}</code></pre>
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
      <ul class="space-y-2">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <span class="text-sm text-slate-600"><strong>Descriptive names:</strong> <code class="rounded bg-slate-100 px-1 text-sm text-green-700">subtotal</code>, <code class="rounded bg-slate-100 px-1 text-sm text-green-700">discount</code>, <code class="rounded bg-slate-100 px-1 text-sm text-green-700">total</code> — you know what each value represents.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <span class="text-sm text-slate-600"><strong>Flat structure:</strong> No nesting beyond the single for-loop. Each step is sequential.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <span class="text-sm text-slate-600"><strong>Comments explain why:</strong> "Never charge less than zero" tells intent, not just mechanics.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
          <span class="text-sm text-slate-600"><strong>Delegates complexity:</strong> <code class="rounded bg-slate-100 px-1 text-sm text-green-700">getDiscount()</code> handles coupon logic elsewhere, keeping this function focused.</span>
        </li>
      </ul>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Refactoring Patterns for Simplicity</h2>
    <p class="text-slate-600">Practical refactoring techniques that reduce complexity while preserving behavior.</p>
  </div>

  <!-- Pattern 1: Extract Function -->
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-slate-800">1. Extract Function</h3>
    <p class="text-sm text-slate-600">When a block of code does something that can be named, pull it into its own function. This makes the calling code read like a high-level summary.</p>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <span class="mb-1 inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">Before</span>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">renderInvoice</span>(<span class="arg">order</span>) {
  <span class="cmt">// Calculate tax</span>
  <span class="kw">let</span> <span class="var">tax</span> <span class="op">=</span> <span class="num">0</span><span class="op">;</span>
  <span class="kw">for</span> (<span class="kw">const</span> <span class="var">item</span> <span class="kw">of</span> <span class="arg">order</span><span class="op">.</span><span class="var">items</span>) {
    <span class="kw">if</span> (<span class="var">item</span><span class="op">.</span><span class="var">taxable</span>) {
      <span class="var">tax</span> <span class="op">+=</span> <span class="var">item</span><span class="op">.</span><span class="var">price</span> <span class="op">*</span> <span class="num">0.08</span><span class="op">;</span>
    }
  }
  <span class="cmt">// Calculate shipping</span>
  <span class="kw">let</span> <span class="var">shipping</span> <span class="op">=</span> <span class="num">0</span><span class="op">;</span>
  <span class="kw">for</span> (<span class="kw">const</span> <span class="var">item</span> <span class="kw">of</span> <span class="arg">order</span><span class="op">.</span><span class="var">items</span>) {
    <span class="var">shipping</span> <span class="op">+=</span> <span class="var">item</span><span class="op">.</span><span class="var">weight</span> <span class="op">*</span> <span class="num">0.5</span><span class="op">;</span>
  }
  <span class="cmt">// Format output</span>
  <span class="kw">return</span> <span class="str">\`Tax: \$\${<span class="var">tax</span>} Ship: \$\${<span class="var">shipping</span>}\`</span><span class="op">;</span>
}`}</code></pre>
      </div>
      <div>
        <span class="mb-1 inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-600">After</span>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">calculateTax</span>(<span class="arg">items</span>) {
  <span class="kw">return</span> <span class="arg">items</span>
    <span class="op">.</span><span class="fn">filter</span>(<span class="arg">item</span> <span class="op">=&gt;</span> <span class="arg">item</span><span class="op">.</span><span class="var">taxable</span>)
    <span class="op">.</span><span class="fn">reduce</span>((<span class="arg">sum</span>, <span class="arg">item</span>) <span class="op">=&gt;</span> <span class="arg">sum</span> <span class="op">+</span> <span class="arg">item</span><span class="op">.</span><span class="var">price</span> <span class="op">*</span> <span class="num">0.08</span>, <span class="num">0</span>)<span class="op">;</span>
}

<span class="kw">function</span> <span class="fn">calculateShipping</span>(<span class="arg">items</span>) {
  <span class="kw">return</span> <span class="arg">items</span><span class="op">.</span><span class="fn">reduce</span>((<span class="arg">sum</span>, <span class="arg">item</span>) <span class="op">=&gt;</span>
    <span class="arg">sum</span> <span class="op">+</span> <span class="arg">item</span><span class="op">.</span><span class="var">weight</span> <span class="op">*</span> <span class="num">0.5</span>, <span class="num">0</span>)<span class="op">;</span>
}

<span class="kw">function</span> <span class="fn">renderInvoice</span>(<span class="arg">order</span>) {
  <span class="kw">const</span> <span class="var">tax</span> <span class="op">=</span> <span class="fn">calculateTax</span>(<span class="arg">order</span><span class="op">.</span><span class="var">items</span>)<span class="op">;</span>
  <span class="kw">const</span> <span class="var">shipping</span> <span class="op">=</span> <span class="fn">calculateShipping</span>(<span class="arg">order</span><span class="op">.</span><span class="var">items</span>)<span class="op">;</span>
  <span class="kw">return</span> <span class="str">\`Tax: \$\${<span class="var">tax</span>} Ship: \$\${<span class="var">shipping</span>}\`</span><span class="op">;</span>
}`}</code></pre>
      </div>
    </div>
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
      <p class="text-sm text-slate-600"><strong>Result:</strong> <code class="rounded bg-slate-100 px-1 text-sm text-green-700">renderInvoice</code> now reads like a summary: calculate tax, calculate shipping, format. Each extracted function is independently testable.</p>
    </div>
  </div>

  <!-- Pattern 2: Early Returns to Reduce Nesting -->
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-slate-800">2. Early Returns to Reduce Nesting</h3>
    <p class="text-sm text-slate-600">Guard clauses at the top of a function handle edge cases early, keeping the main logic flat.</p>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <span class="mb-1 inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">Before</span>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">processPayment</span>(<span class="arg">user</span>, <span class="arg">amount</span>) {
  <span class="kw">if</span> (<span class="arg">user</span>) {
    <span class="kw">if</span> (<span class="arg">user</span><span class="op">.</span><span class="var">verified</span>) {
      <span class="kw">if</span> (<span class="arg">amount</span> <span class="op">&gt;</span> <span class="num">0</span>) {
        <span class="kw">if</span> (<span class="arg">user</span><span class="op">.</span><span class="var">balance</span> <span class="op">&gt;=</span> <span class="arg">amount</span>) {
          <span class="arg">user</span><span class="op">.</span><span class="var">balance</span> <span class="op">-=</span> <span class="arg">amount</span><span class="op">;</span>
          <span class="kw">return</span> { <span class="var">success</span><span class="op">:</span> <span class="num">true</span> }<span class="op">;</span>
        } <span class="kw">else</span> {
          <span class="kw">return</span> { <span class="var">error</span><span class="op">:</span> <span class="str">"Low balance"</span> }<span class="op">;</span>
        }
      } <span class="kw">else</span> {
        <span class="kw">return</span> { <span class="var">error</span><span class="op">:</span> <span class="str">"Bad amount"</span> }<span class="op">;</span>
      }
    } <span class="kw">else</span> {
      <span class="kw">return</span> { <span class="var">error</span><span class="op">:</span> <span class="str">"Not verified"</span> }<span class="op">;</span>
    }
  } <span class="kw">else</span> {
    <span class="kw">return</span> { <span class="var">error</span><span class="op">:</span> <span class="str">"No user"</span> }<span class="op">;</span>
  }
}`}</code></pre>
      </div>
      <div>
        <span class="mb-1 inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-600">After</span>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">processPayment</span>(<span class="arg">user</span>, <span class="arg">amount</span>) {
  <span class="kw">if</span> (<span class="op">!</span><span class="arg">user</span>)            <span class="kw">return</span> { <span class="var">error</span><span class="op">:</span> <span class="str">"No user"</span> }<span class="op">;</span>
  <span class="kw">if</span> (<span class="op">!</span><span class="arg">user</span><span class="op">.</span><span class="var">verified</span>)   <span class="kw">return</span> { <span class="var">error</span><span class="op">:</span> <span class="str">"Not verified"</span> }<span class="op">;</span>
  <span class="kw">if</span> (<span class="arg">amount</span> <span class="op">&lt;=</span> <span class="num">0</span>)     <span class="kw">return</span> { <span class="var">error</span><span class="op">:</span> <span class="str">"Bad amount"</span> }<span class="op">;</span>
  <span class="kw">if</span> (<span class="arg">user</span><span class="op">.</span><span class="var">balance</span> <span class="op">&lt;</span> <span class="arg">amount</span>)
    <span class="kw">return</span> { <span class="var">error</span><span class="op">:</span> <span class="str">"Low balance"</span> }<span class="op">;</span>

  <span class="cmt">// Happy path — all checks passed</span>
  <span class="arg">user</span><span class="op">.</span><span class="var">balance</span> <span class="op">-=</span> <span class="arg">amount</span><span class="op">;</span>
  <span class="kw">return</span> { <span class="var">success</span><span class="op">:</span> <span class="num">true</span> }<span class="op">;</span>
}`}</code></pre>
      </div>
    </div>
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
      <p class="text-sm text-slate-600"><strong>Result:</strong> Nesting drops from 5 levels to 1. Each guard clause is a simple check at the top. The "happy path" is at the end, completely un-nested, making it easy to see what the function actually does.</p>
    </div>
  </div>

  <!-- Pattern 3: Simplify Boolean Expressions -->
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-slate-800">3. Simplify Boolean Expressions</h3>
    <p class="text-sm text-slate-600">Complex boolean logic can often be simplified by extracting named variables or using De Morgan's laws.</p>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <span class="mb-1 inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">Before</span>
        <pre class="code-block"><code>{@html `<span class="kw">if</span> (<span class="op">!</span>(<span class="var">user</span><span class="op">.</span><span class="var">age</span> <span class="op">&lt;</span> <span class="num">18</span>) <span class="op">&amp;&amp;</span>
    <span class="op">!</span>(<span class="var">user</span><span class="op">.</span><span class="var">banned</span>) <span class="op">&amp;&amp;</span>
    (<span class="var">user</span><span class="op">.</span><span class="var">role</span> <span class="op">===</span> <span class="str">"admin"</span> <span class="op">||</span>
     <span class="var">user</span><span class="op">.</span><span class="var">role</span> <span class="op">===</span> <span class="str">"mod"</span>) <span class="op">&amp;&amp;</span>
    <span class="var">user</span><span class="op">.</span><span class="var">verified</span> <span class="op">===</span> <span class="num">true</span>) {
  <span class="fn">grantAccess</span>()<span class="op">;</span>
}`}</code></pre>
      </div>
      <div>
        <span class="mb-1 inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-600">After</span>
        <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">isAdult</span> <span class="op">=</span> <span class="var">user</span><span class="op">.</span><span class="var">age</span> <span class="op">&gt;=</span> <span class="num">18</span><span class="op">;</span>
<span class="kw">const</span> <span class="var">isNotBanned</span> <span class="op">=</span> <span class="op">!</span><span class="var">user</span><span class="op">.</span><span class="var">banned</span><span class="op">;</span>
<span class="kw">const</span> <span class="var">hasPrivilegedRole</span> <span class="op">=</span>
  <span class="var">user</span><span class="op">.</span><span class="var">role</span> <span class="op">===</span> <span class="str">"admin"</span> <span class="op">||</span> <span class="var">user</span><span class="op">.</span><span class="var">role</span> <span class="op">===</span> <span class="str">"mod"</span><span class="op">;</span>

<span class="kw">if</span> (<span class="var">isAdult</span> <span class="op">&amp;&amp;</span> <span class="var">isNotBanned</span> <span class="op">&amp;&amp;</span> <span class="var">hasPrivilegedRole</span> <span class="op">&amp;&amp;</span> <span class="var">user</span><span class="op">.</span><span class="var">verified</span>) {
  <span class="fn">grantAccess</span>()<span class="op">;</span>
}`}</code></pre>
      </div>
    </div>
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
      <p class="text-sm text-slate-600"><strong>Result:</strong> Each condition has a name that explains its purpose. The <code class="rounded bg-slate-100 px-1 text-sm text-green-700">if</code> statement reads like English: "if is adult and is not banned and has privileged role and is verified." Also note: <code class="rounded bg-slate-100 px-1 text-sm text-green-700">!age &lt; 18</code> became <code class="rounded bg-slate-100 px-1 text-sm text-green-700">age &gt;= 18</code>, and <code class="rounded bg-slate-100 px-1 text-sm text-green-700">=== true</code> was dropped.</p>
    </div>
  </div>

  <!-- Pattern 4: Replace Conditional with Polymorphism -->
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-slate-800">4. Replace Conditional with Lookup / Polymorphism</h3>
    <p class="text-sm text-slate-600">When a switch or if/else chain maps inputs to outputs, a lookup object is often clearer.</p>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <span class="mb-1 inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">Before</span>
        <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">getIcon</span>(<span class="arg">fileType</span>) {
  <span class="kw">if</span> (<span class="arg">fileType</span> <span class="op">===</span> <span class="str">"pdf"</span>)  <span class="kw">return</span> <span class="str">"doc-icon"</span><span class="op">;</span>
  <span class="kw">if</span> (<span class="arg">fileType</span> <span class="op">===</span> <span class="str">"png"</span>)  <span class="kw">return</span> <span class="str">"img-icon"</span><span class="op">;</span>
  <span class="kw">if</span> (<span class="arg">fileType</span> <span class="op">===</span> <span class="str">"jpg"</span>)  <span class="kw">return</span> <span class="str">"img-icon"</span><span class="op">;</span>
  <span class="kw">if</span> (<span class="arg">fileType</span> <span class="op">===</span> <span class="str">"mp4"</span>)  <span class="kw">return</span> <span class="str">"vid-icon"</span><span class="op">;</span>
  <span class="kw">if</span> (<span class="arg">fileType</span> <span class="op">===</span> <span class="str">"mp3"</span>)  <span class="kw">return</span> <span class="str">"aud-icon"</span><span class="op">;</span>
  <span class="kw">return</span> <span class="str">"file-icon"</span><span class="op">;</span>
}`}</code></pre>
      </div>
      <div>
        <span class="mb-1 inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-600">After</span>
        <pre class="code-block"><code>{@html `<span class="kw">const</span> <span class="var">FILE_ICONS</span> <span class="op">=</span> {
  <span class="var">pdf</span><span class="op">:</span> <span class="str">"doc-icon"</span>,
  <span class="var">png</span><span class="op">:</span> <span class="str">"img-icon"</span>,
  <span class="var">jpg</span><span class="op">:</span> <span class="str">"img-icon"</span>,
  <span class="var">mp4</span><span class="op">:</span> <span class="str">"vid-icon"</span>,
  <span class="var">mp3</span><span class="op">:</span> <span class="str">"aud-icon"</span>,
}<span class="op">;</span>

<span class="kw">function</span> <span class="fn">getIcon</span>(<span class="arg">fileType</span>) {
  <span class="kw">return</span> <span class="var">FILE_ICONS</span>[<span class="arg">fileType</span>] <span class="op">??</span> <span class="str">"file-icon"</span><span class="op">;</span>
}`}</code></pre>
      </div>
    </div>
    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
      <p class="text-sm text-slate-600"><strong>Result:</strong> The data (which type maps to which icon) is separated from the logic (look it up, default if missing). Adding a new file type is now a one-line change to the object, not a new branch in the function.</p>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      I've read this
    </button>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
