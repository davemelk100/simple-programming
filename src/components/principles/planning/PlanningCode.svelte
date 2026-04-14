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

  // Toggle for basic mode side-by-side
  let showImplementation = $state(false);
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Code: Plan First, Code After</h2>
    <p class="text-slate-600">
      The best programmers write their plan <strong>as comments first</strong>, then fill in the code underneath. This technique is called <em>pseudocode-driven development</em>. You sketch the logic in plain English, then translate each line into real code.
    </p>
  </div>

  <!-- Toggle -->
  <div class="flex items-center gap-3">
    <span class="text-sm font-medium text-slate-600">Plan only</span>
    <button
      onclick={() => (showImplementation = !showImplementation)}
      class="relative h-7 w-12 rounded-full transition-colors {showImplementation ? 'bg-pink-500' : 'bg-slate-300'}"
      aria-label="Toggle implementation"
    >
      <span class="absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform {showImplementation ? 'translate-x-5' : ''}"></span>
    </button>
    <span class="text-sm font-medium text-slate-600">Plan + Code</span>
  </div>

  <!-- Side by side comparison -->
  <div class="grid gap-4 lg:grid-cols-2">
    <!-- Plan -->
    <div>
      <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-pink-600">The Plan (Comments)</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">// Build a function that checks if a user</span>
<span class="cmt">// can access a premium feature</span>
<span class="cmt">//</span>
<span class="cmt">// Step 1: Check if user exists</span>
<span class="cmt">//</span>
<span class="cmt">// Step 2: Check if their account is active</span>
<span class="cmt">//</span>
<span class="cmt">// Step 3: Check if they have a premium plan</span>
<span class="cmt">//</span>
<span class="cmt">// Step 4: Check if the plan hasn't expired</span>
<span class="cmt">//</span>
<span class="cmt">// Step 5: Return true if all checks pass,</span>
<span class="cmt">//         false otherwise</span>`}</code></pre>
    </div>

    <!-- Implementation -->
    <div class="{showImplementation ? 'opacity-100' : 'opacity-30'} transition-opacity duration-500">
      <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-slate-500">The Code (Implementation)</h3>
      <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">canAccessPremium</span>(<span class="arg">user</span>) {
  <span class="cmt">// Step 1: Check if user exists</span>
  <span class="kw">if</span> (<span class="op">!</span><span class="var">user</span>) <span class="kw">return</span> <span class="kw">false</span>;

  <span class="cmt">// Step 2: Check if their account is active</span>
  <span class="kw">if</span> (<span class="op">!</span><span class="var">user</span>.<span class="var">isActive</span>) <span class="kw">return</span> <span class="kw">false</span>;

  <span class="cmt">// Step 3: Check if they have premium</span>
  <span class="kw">if</span> (<span class="var">user</span>.<span class="var">plan</span> <span class="op">!==</span> <span class="str">"premium"</span>) <span class="kw">return</span> <span class="kw">false</span>;

  <span class="cmt">// Step 4: Check if plan hasn't expired</span>
  <span class="kw">const</span> <span class="var">now</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">Date</span>();
  <span class="kw">if</span> (<span class="var">user</span>.<span class="var">planExpiry</span> <span class="op"><</span> <span class="var">now</span>) <span class="kw">return</span> <span class="kw">false</span>;

  <span class="cmt">// Step 5: All checks passed</span>
  <span class="kw">return</span> <span class="kw">true</span>;
}`}</code></pre>
    </div>
  </div>

  <!-- Breaking down a complex function -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Breaking Down a Complex Function</h3>
    <p class="mb-3 text-slate-600">
      When you face a complex task, write each section as a comment first. Then implement them one at a time. Here is a function that processes an order:
    </p>
    <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">processOrder</span>(<span class="arg">cart</span>, <span class="arg">customer</span>) {
  <span class="cmt">// 1. Validate the cart is not empty</span>
  <span class="kw">if</span> (<span class="var">cart</span>.<span class="var">items</span>.<span class="var">length</span> <span class="op">===</span> <span class="num">0</span>) {
    <span class="kw">return</span> { <span class="var">error</span>: <span class="str">"Cart is empty"</span> };
  }

  <span class="cmt">// 2. Calculate the subtotal</span>
  <span class="kw">let</span> <span class="var">subtotal</span> <span class="op">=</span> <span class="num">0</span>;
  <span class="kw">for</span> (<span class="kw">const</span> <span class="var">item</span> <span class="kw">of</span> <span class="var">cart</span>.<span class="var">items</span>) {
    <span class="var">subtotal</span> <span class="op">+=</span> <span class="var">item</span>.<span class="var">price</span> <span class="op">*</span> <span class="var">item</span>.<span class="var">quantity</span>;
  }

  <span class="cmt">// 3. Apply any discount codes</span>
  <span class="kw">const</span> <span class="var">discount</span> <span class="op">=</span> <span class="fn">applyDiscount</span>(<span class="var">subtotal</span>, <span class="var">cart</span>.<span class="var">discountCode</span>);

  <span class="cmt">// 4. Calculate tax</span>
  <span class="kw">const</span> <span class="var">tax</span> <span class="op">=</span> <span class="fn">calculateTax</span>(<span class="var">subtotal</span> <span class="op">-</span> <span class="var">discount</span>, <span class="var">customer</span>.<span class="var">state</span>);

  <span class="cmt">// 5. Calculate shipping</span>
  <span class="kw">const</span> <span class="var">shipping</span> <span class="op">=</span> <span class="fn">calculateShipping</span>(<span class="var">cart</span>.<span class="var">items</span>, <span class="var">customer</span>.<span class="var">address</span>);

  <span class="cmt">// 6. Build and return the order summary</span>
  <span class="kw">return</span> {
    <span class="var">subtotal</span>,
    <span class="var">discount</span>,
    <span class="var">tax</span>,
    <span class="var">shipping</span>,
    <span class="var">total</span>: <span class="var">subtotal</span> <span class="op">-</span> <span class="var">discount</span> <span class="op">+</span> <span class="var">tax</span> <span class="op">+</span> <span class="var">shipping</span>,
  };
}`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5">
    <h3 class="mb-2 text-sm font-bold uppercase tracking-wider text-pink-600">The Pattern</h3>
    <p class="text-slate-600">
      Notice how each comment maps to exactly one step. You could have written all six comments first, then filled in the code for each one. This way you never stare at a blank screen wondering "what now?" &mdash; the plan tells you exactly what to do next.
    </p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95"
    >
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-3 text-2xl font-bold text-slate-800">Code: From Design to Implementation</h2>
      <p class="text-slate-600">
        Professional planning means designing your code's <strong>interfaces</strong>, <strong>data structures</strong>, and <strong>architecture</strong> before writing implementation details. Here are the key techniques.
      </p>
    </div>

    <!-- Pseudocode to real code -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Pseudocode to Real Code</h3>
      <p class="mb-3 text-slate-600">
        Pseudocode is structured English that looks like code but is not tied to any language. It lets you focus on logic without worrying about syntax.
      </p>
      <div class="grid gap-4 lg:grid-cols-2">
        <div>
          <h4 class="mb-2 text-sm font-bold uppercase tracking-wider text-pink-600">Pseudocode</h4>
          <pre class="code-block"><code>{@html `<span class="cmt">FUNCTION authenticate(email, password):</span>
<span class="cmt">  Find user by email</span>
<span class="cmt">  IF user not found:</span>
<span class="cmt">    RETURN "invalid credentials"</span>
<span class="cmt">  IF account is locked:</span>
<span class="cmt">    RETURN "account locked"</span>
<span class="cmt">  Hash the password</span>
<span class="cmt">  IF hash does not match stored hash:</span>
<span class="cmt">    Increment failed attempts</span>
<span class="cmt">    IF attempts >= 5: lock account</span>
<span class="cmt">    RETURN "invalid credentials"</span>
<span class="cmt">  Reset failed attempts to 0</span>
<span class="cmt">  Create session token</span>
<span class="cmt">  RETURN token</span>`}</code></pre>
        </div>
        <div>
          <h4 class="mb-2 text-sm font-bold uppercase tracking-wider text-slate-500">TypeScript</h4>
          <pre class="code-block"><code>{@html `<span class="kw">async function</span> <span class="fn">authenticate</span>(
  <span class="arg">email</span>: <span class="var">string</span>,
  <span class="arg">password</span>: <span class="var">string</span>
) {
  <span class="kw">const</span> <span class="var">user</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">findByEmail</span>(<span class="var">email</span>);
  <span class="kw">if</span> (<span class="op">!</span><span class="var">user</span>) <span class="kw">throw</span> <span class="str">"invalid credentials"</span>;
  <span class="kw">if</span> (<span class="var">user</span>.<span class="var">isLocked</span>) <span class="kw">throw</span> <span class="str">"account locked"</span>;

  <span class="kw">const</span> <span class="var">hash</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">hashPassword</span>(<span class="var">password</span>);
  <span class="kw">if</span> (<span class="var">hash</span> <span class="op">!==</span> <span class="var">user</span>.<span class="var">passwordHash</span>) {
    <span class="var">user</span>.<span class="var">failedAttempts</span><span class="op">++</span>;
    <span class="kw">if</span> (<span class="var">user</span>.<span class="var">failedAttempts</span> <span class="op">>=</span> <span class="num">5</span>)
      <span class="var">user</span>.<span class="var">isLocked</span> <span class="op">=</span> <span class="kw">true</span>;
    <span class="kw">await</span> <span class="var">user</span>.<span class="fn">save</span>();
    <span class="kw">throw</span> <span class="str">"invalid credentials"</span>;
  }

  <span class="var">user</span>.<span class="var">failedAttempts</span> <span class="op">=</span> <span class="num">0</span>;
  <span class="kw">await</span> <span class="var">user</span>.<span class="fn">save</span>();
  <span class="kw">return</span> <span class="fn">createToken</span>(<span class="var">user</span>.<span class="var">id</span>);
}`}</code></pre>
        </div>
      </div>
    </div>

    <!-- API Design -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">API Design: Routes Before Implementation</h3>
      <p class="mb-3 text-slate-600">
        Before writing any backend logic, define your API endpoints. This acts as a contract between frontend and backend teams.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// API Design Document — define routes FIRST</span>

<span class="cmt">// Products</span>
<span class="var">GET</span>    <span class="str">/api/products</span>          <span class="cmt">// List all products (paginated)</span>
<span class="var">GET</span>    <span class="str">/api/products/:id</span>      <span class="cmt">// Get a single product</span>
<span class="var">POST</span>   <span class="str">/api/products</span>          <span class="cmt">// Create a product (admin)</span>
<span class="var">PUT</span>    <span class="str">/api/products/:id</span>      <span class="cmt">// Update a product (admin)</span>
<span class="var">DELETE</span> <span class="str">/api/products/:id</span>      <span class="cmt">// Delete a product (admin)</span>

<span class="cmt">// Cart</span>
<span class="var">GET</span>    <span class="str">/api/cart</span>              <span class="cmt">// Get current user's cart</span>
<span class="var">POST</span>   <span class="str">/api/cart/items</span>        <span class="cmt">// Add item to cart</span>
<span class="var">PATCH</span>  <span class="str">/api/cart/items/:id</span>    <span class="cmt">// Update item quantity</span>
<span class="var">DELETE</span> <span class="str">/api/cart/items/:id</span>    <span class="cmt">// Remove item from cart</span>

<span class="cmt">// Orders</span>
<span class="var">POST</span>   <span class="str">/api/orders</span>            <span class="cmt">// Place order from cart</span>
<span class="var">GET</span>    <span class="str">/api/orders/:id</span>        <span class="cmt">// Get order details</span>`}</code></pre>
    </div>

    <!-- Database schema design -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Database Schema Design</h3>
      <p class="mb-3 text-slate-600">
        Define your data model before writing queries. Think about relationships, constraints, and what queries you will need to run.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Schema design — define structure BEFORE implementation</span>

<span class="kw">CREATE TABLE</span> <span class="fn">users</span> (
  <span class="var">id</span>          <span class="var">UUID</span> <span class="kw">PRIMARY KEY</span>,
  <span class="var">email</span>       <span class="var">TEXT</span> <span class="kw">UNIQUE NOT NULL</span>,
  <span class="var">password_hash</span> <span class="var">TEXT</span> <span class="kw">NOT NULL</span>,
  <span class="var">created_at</span>  <span class="var">TIMESTAMP</span> <span class="kw">DEFAULT NOW</span>()
);

<span class="kw">CREATE TABLE</span> <span class="fn">products</span> (
  <span class="var">id</span>          <span class="var">UUID</span> <span class="kw">PRIMARY KEY</span>,
  <span class="var">name</span>        <span class="var">TEXT</span> <span class="kw">NOT NULL</span>,
  <span class="var">price_cents</span> <span class="var">INTEGER</span> <span class="kw">NOT NULL</span>,  <span class="cmt">-- store money as cents!</span>
  <span class="var">stock</span>       <span class="var">INTEGER</span> <span class="kw">DEFAULT</span> <span class="num">0</span>
);

<span class="kw">CREATE TABLE</span> <span class="fn">orders</span> (
  <span class="var">id</span>          <span class="var">UUID</span> <span class="kw">PRIMARY KEY</span>,
  <span class="var">user_id</span>     <span class="var">UUID</span> <span class="kw">REFERENCES</span> <span class="fn">users</span>(<span class="var">id</span>),
  <span class="var">total_cents</span> <span class="var">INTEGER</span> <span class="kw">NOT NULL</span>,
  <span class="var">status</span>      <span class="var">TEXT</span> <span class="kw">DEFAULT</span> <span class="str">'pending'</span>
);`}</code></pre>
    </div>

    <!-- Interface-first programming -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Interface-First Programming</h3>
      <p class="mb-3 text-slate-600">
        Define your types and interfaces before writing any logic. This forces you to think about your data shapes and function contracts upfront.
      </p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Step 1: Define interfaces FIRST</span>

<span class="kw">interface</span> <span class="fn">Product</span> {
  <span class="var">id</span>: <span class="var">string</span>;
  <span class="var">name</span>: <span class="var">string</span>;
  <span class="var">priceCents</span>: <span class="var">number</span>;
  <span class="var">category</span>: <span class="var">string</span>;
  <span class="var">inStock</span>: <span class="var">boolean</span>;
}

<span class="kw">interface</span> <span class="fn">CartItem</span> {
  <span class="var">product</span>: <span class="fn">Product</span>;
  <span class="var">quantity</span>: <span class="var">number</span>;
}

<span class="kw">interface</span> <span class="fn">CartService</span> {
  <span class="fn">addItem</span>(<span class="arg">product</span>: <span class="fn">Product</span>, <span class="arg">qty</span>: <span class="var">number</span>): <span class="kw">void</span>;
  <span class="fn">removeItem</span>(<span class="arg">productId</span>: <span class="var">string</span>): <span class="kw">void</span>;
  <span class="fn">getTotal</span>(): <span class="var">number</span>;
  <span class="fn">checkout</span>(): <span class="kw">Promise</span><<span class="fn">Order</span>>;
}

<span class="cmt">// Step 2: NOW implement</span>
<span class="kw">class</span> <span class="fn">ShoppingCart</span> <span class="kw">implements</span> <span class="fn">CartService</span> {
  <span class="kw">private</span> <span class="var">items</span>: <span class="fn">CartItem</span>[] <span class="op">=</span> [];

  <span class="fn">addItem</span>(<span class="arg">product</span>: <span class="fn">Product</span>, <span class="arg">qty</span>: <span class="var">number</span>) {
    <span class="cmt">// implementation follows the contract...</span>
  }
  <span class="cmt">// ... rest of the methods</span>
}`}</code></pre>
    </div>

    <!-- Design patterns as pre-planned solutions -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Design Patterns: Pre-Planned Solutions</h3>
      <p class="mb-3 text-slate-600">
        When you recognize a common problem during the planning phase, you can reach for a known design pattern instead of inventing a solution from scratch.
      </p>

      <div class="space-y-4">
        <!-- Factory -->
        <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5">
          <h4 class="mb-2 font-bold text-pink-700">Factory Pattern &mdash; "I need to create different objects based on a condition"</h4>
          <pre class="code-block"><code>{@html `<span class="kw">function</span> <span class="fn">createNotification</span>(<span class="arg">type</span>: <span class="var">string</span>, <span class="arg">message</span>: <span class="var">string</span>) {
  <span class="kw">switch</span> (<span class="var">type</span>) {
    <span class="kw">case</span> <span class="str">"email"</span>:
      <span class="kw">return</span> <span class="kw">new</span> <span class="fn">EmailNotification</span>(<span class="var">message</span>);
    <span class="kw">case</span> <span class="str">"sms"</span>:
      <span class="kw">return</span> <span class="kw">new</span> <span class="fn">SmsNotification</span>(<span class="var">message</span>);
    <span class="kw">case</span> <span class="str">"push"</span>:
      <span class="kw">return</span> <span class="kw">new</span> <span class="fn">PushNotification</span>(<span class="var">message</span>);
  }
}`}</code></pre>
        </div>

        <!-- Observer -->
        <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5">
          <h4 class="mb-2 font-bold text-pink-700">Observer Pattern &mdash; "Multiple things need to react when something changes"</h4>
          <pre class="code-block"><code>{@html `<span class="kw">class</span> <span class="fn">EventBus</span> {
  <span class="kw">private</span> <span class="var">listeners</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">Map</span><<span class="var">string</span>, <span class="fn">Function</span>[]>();

  <span class="fn">on</span>(<span class="arg">event</span>: <span class="var">string</span>, <span class="arg">callback</span>: <span class="fn">Function</span>) {
    <span class="kw">const</span> <span class="var">list</span> <span class="op">=</span> <span class="kw">this</span>.<span class="var">listeners</span>.<span class="fn">get</span>(<span class="var">event</span>) <span class="op">??</span> [];
    <span class="var">list</span>.<span class="fn">push</span>(<span class="var">callback</span>);
    <span class="kw">this</span>.<span class="var">listeners</span>.<span class="fn">set</span>(<span class="var">event</span>, <span class="var">list</span>);
  }

  <span class="fn">emit</span>(<span class="arg">event</span>: <span class="var">string</span>, <span class="arg">data</span>: <span class="var">any</span>) {
    <span class="kw">for</span> (<span class="kw">const</span> <span class="var">cb</span> <span class="kw">of</span> <span class="kw">this</span>.<span class="var">listeners</span>.<span class="fn">get</span>(<span class="var">event</span>) <span class="op">??</span> [])
      <span class="fn">cb</span>(<span class="var">data</span>);
  }
}

<span class="cmt">// Usage: decouple components</span>
<span class="var">bus</span>.<span class="fn">on</span>(<span class="str">"order:placed"</span>, <span class="fn">sendConfirmationEmail</span>);
<span class="var">bus</span>.<span class="fn">on</span>(<span class="str">"order:placed"</span>, <span class="fn">updateInventory</span>);
<span class="var">bus</span>.<span class="fn">on</span>(<span class="str">"order:placed"</span>, <span class="fn">notifyWarehouse</span>);`}</code></pre>
        </div>

        <!-- Strategy -->
        <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5">
          <h4 class="mb-2 font-bold text-pink-700">Strategy Pattern &mdash; "I need to switch algorithms at runtime"</h4>
          <pre class="code-block"><code>{@html `<span class="kw">interface</span> <span class="fn">PricingStrategy</span> {
  <span class="fn">calculate</span>(<span class="arg">basePrice</span>: <span class="var">number</span>): <span class="var">number</span>;
}

<span class="kw">const</span> <span class="var">regularPricing</span>: <span class="fn">PricingStrategy</span> <span class="op">=</span> {
  <span class="fn">calculate</span>: (<span class="arg">price</span>) <span class="op">=></span> <span class="var">price</span>,
};

<span class="kw">const</span> <span class="var">memberPricing</span>: <span class="fn">PricingStrategy</span> <span class="op">=</span> {
  <span class="fn">calculate</span>: (<span class="arg">price</span>) <span class="op">=></span> <span class="var">price</span> <span class="op">*</span> <span class="num">0.9</span>,  <span class="cmt">// 10% off</span>
};

<span class="kw">const</span> <span class="var">salePricing</span>: <span class="fn">PricingStrategy</span> <span class="op">=</span> {
  <span class="fn">calculate</span>: (<span class="arg">price</span>) <span class="op">=></span> <span class="var">price</span> <span class="op">*</span> <span class="num">0.75</span>, <span class="cmt">// 25% off</span>
};

<span class="cmt">// Switch strategy based on context</span>
<span class="kw">function</span> <span class="fn">getPrice</span>(<span class="arg">product</span>, <span class="arg">strategy</span>: <span class="fn">PricingStrategy</span>) {
  <span class="kw">return</span> <span class="var">strategy</span>.<span class="fn">calculate</span>(<span class="var">product</span>.<span class="var">basePrice</span>);
}`}</code></pre>
        </div>
      </div>
    </div>

    <!-- Key takeaways -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Key Takeaways</h3>
      <ul class="space-y-2 text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>Pseudocode first.</strong> Write the logic in plain language, then translate to code. This separates "what to do" from "how to write it."</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>Design APIs before handlers.</strong> Define your endpoints and their request/response shapes. This becomes the contract that frontend and backend agree on.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>Define types before logic.</strong> Interfaces and types are a form of planning. They force you to think about data shapes before you write algorithms.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
          <span><strong>Recognize patterns.</strong> When you see a recurring problem during planning, apply a proven design pattern instead of inventing from scratch.</span>
        </li>
      </ul>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95"
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
