<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Database Connection Code</h2>
    <p class="text-slate-600">The essential code patterns for connecting your app to a database, from connection strings to basic CRUD operations.</p>
  </div>

  <!-- Connection String Anatomy -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Connection String Anatomy</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># The anatomy of a database connection string</span>
<span class="cmt"># protocol://username:password@host:port/database</span>

<span class="cmt"># PostgreSQL</span>
<span class="var">DATABASE_URL</span><span class="op">=</span><span class="str">"postgresql://admin:secret@localhost:5432/myapp"</span>

<span class="cmt"># MySQL</span>
<span class="var">DATABASE_URL</span><span class="op">=</span><span class="str">"mysql://admin:secret@localhost:3306/myapp"</span>

<span class="cmt"># SQLite (just a file path)</span>
<span class="var">DATABASE_URL</span><span class="op">=</span><span class="str">"file:./dev.db"</span>

<span class="cmt"># MongoDB</span>
<span class="var">DATABASE_URL</span><span class="op">=</span><span class="str">"mongodb://admin:secret@localhost:27017/myapp"</span>`}</code></pre>
    <p class="text-sm text-slate-500">Always store connection strings in environment variables (<code class="rounded bg-slate-100 px-1 text-green-700">.env</code> file), never in your source code. Add <code class="rounded bg-slate-100 px-1 text-green-700">.env</code> to your <code class="rounded bg-slate-100 px-1 text-green-700">.gitignore</code>.</p>
  </div>

  <!-- Prisma Schema -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Prisma Schema Example</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// prisma/schema.prisma</span>

<span class="cmt">// 1. Tell Prisma which database to use</span>
<span class="kw">datasource</span> <span class="var">db</span> {
  <span class="arg">provider</span> <span class="op">=</span> <span class="str">"postgresql"</span>
  <span class="arg">url</span>      <span class="op">=</span> <span class="fn">env</span>(<span class="str">"DATABASE_URL"</span>)
}

<span class="cmt">// 2. Generate the TypeScript client</span>
<span class="kw">generator</span> <span class="var">client</span> {
  <span class="arg">provider</span> <span class="op">=</span> <span class="str">"prisma-client-js"</span>
}

<span class="cmt">// 3. Define your data models</span>
<span class="kw">model</span> <span class="var">User</span> {
  <span class="var">id</span>        <span class="fn">Int</span>      <span class="arg">@id</span> <span class="arg">@default</span>(<span class="fn">autoincrement</span>())
  <span class="var">email</span>     <span class="fn">String</span>   <span class="arg">@unique</span>
  <span class="var">name</span>      <span class="fn">String</span>
  <span class="var">createdAt</span> <span class="fn">DateTime</span> <span class="arg">@default</span>(<span class="fn">now</span>())
  <span class="var">posts</span>     <span class="fn">Post</span>[]   <span class="cmt">// A user has many posts</span>
}

<span class="kw">model</span> <span class="var">Post</span> {
  <span class="var">id</span>        <span class="fn">Int</span>      <span class="arg">@id</span> <span class="arg">@default</span>(<span class="fn">autoincrement</span>())
  <span class="var">title</span>     <span class="fn">String</span>
  <span class="var">content</span>   <span class="fn">String?</span>  <span class="cmt">// ? means optional</span>
  <span class="var">published</span> <span class="fn">Boolean</span>  <span class="arg">@default</span>(<span class="num">false</span>)
  <span class="var">author</span>    <span class="fn">User</span>     <span class="arg">@relation</span>(<span class="arg">fields</span>: [<span class="var">authorId</span>], <span class="arg">references</span>: [<span class="var">id</span>])
  <span class="var">authorId</span>  <span class="fn">Int</span>
}`}</code></pre>
  </div>

  <!-- Basic CRUD -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Basic CRUD Operations</h3>
    <pre class="code-block"><code>{@html `<span class="kw">import</span> { <span class="var">PrismaClient</span> } <span class="kw">from</span> <span class="str">'@prisma/client'</span>

<span class="kw">const</span> <span class="var">prisma</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">PrismaClient</span>()

<span class="cmt">// CREATE — add a new user</span>
<span class="kw">const</span> <span class="var">user</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">prisma</span>.<span class="var">user</span>.<span class="fn">create</span>({
  <span class="arg">data</span>: { <span class="arg">email</span>: <span class="str">'alice@example.com'</span>, <span class="arg">name</span>: <span class="str">'Alice'</span> }
})

<span class="cmt">// READ — find one user by email</span>
<span class="kw">const</span> <span class="var">found</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">prisma</span>.<span class="var">user</span>.<span class="fn">findUnique</span>({
  <span class="arg">where</span>: { <span class="arg">email</span>: <span class="str">'alice@example.com'</span> }
})

<span class="cmt">// READ — find all published posts</span>
<span class="kw">const</span> <span class="var">posts</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">prisma</span>.<span class="var">post</span>.<span class="fn">findMany</span>({
  <span class="arg">where</span>: { <span class="arg">published</span>: <span class="num">true</span> }
})

<span class="cmt">// UPDATE — change a user's name</span>
<span class="kw">const</span> <span class="var">updated</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">prisma</span>.<span class="var">user</span>.<span class="fn">update</span>({
  <span class="arg">where</span>: { <span class="arg">email</span>: <span class="str">'alice@example.com'</span> },
  <span class="arg">data</span>: { <span class="arg">name</span>: <span class="str">'Alice Smith'</span> }
})

<span class="cmt">// DELETE — remove a user</span>
<span class="kw">await</span> <span class="var">prisma</span>.<span class="var">user</span>.<span class="fn">delete</span>({
  <span class="arg">where</span>: { <span class="arg">email</span>: <span class="str">'alice@example.com'</span> }
})`}</code></pre>
    <p class="text-sm text-slate-500">CRUD stands for Create, Read, Update, Delete — the four basic operations for any data. Prisma methods mirror these exactly.</p>
  </div>

  <!-- Migration Commands -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Migration Commands</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># Create and apply a migration (development)</span>
<span class="kw">npx prisma</span> <span class="var">migrate dev</span> <span class="op">--name</span> <span class="str">add-user-table</span>

<span class="cmt"># Apply pending migrations (production)</span>
<span class="kw">npx prisma</span> <span class="var">migrate deploy</span>

<span class="cmt"># Reset the database (deletes all data!)</span>
<span class="kw">npx prisma</span> <span class="var">migrate reset</span>

<span class="cmt"># Generate the Prisma client after schema changes</span>
<span class="kw">npx prisma</span> <span class="var">generate</span>

<span class="cmt"># Open Prisma Studio (visual database browser)</span>
<span class="kw">npx prisma</span> <span class="var">studio</span>`}</code></pre>
    <p class="text-sm text-slate-500">Each <code class="rounded bg-slate-100 px-1 text-green-700">migrate dev</code> creates a new SQL file in <code class="rounded bg-slate-100 px-1 text-green-700">prisma/migrations/</code>. These files are committed to Git so everyone applies the same changes.</p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      I know the essential database code
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Advanced Database Code</h2>
      <p class="text-slate-600">Relations, raw SQL, seed scripts, connection pooling configuration, indexing, and transactions.</p>
    </div>

    <!-- Prisma Relations -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Prisma Relations</h3>
      <p class="text-sm text-slate-600">Query related data with nested reads and writes.</p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Include related data (eager loading)</span>
<span class="kw">const</span> <span class="var">userWithPosts</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">prisma</span>.<span class="var">user</span>.<span class="fn">findUnique</span>({
  <span class="arg">where</span>: { <span class="arg">id</span>: <span class="num">1</span> },
  <span class="arg">include</span>: {
    <span class="arg">posts</span>: {
      <span class="arg">where</span>: { <span class="arg">published</span>: <span class="num">true</span> },
      <span class="arg">orderBy</span>: { <span class="arg">createdAt</span>: <span class="str">'desc'</span> }
    }
  }
})

<span class="cmt">// Create a user with posts in one operation</span>
<span class="kw">const</span> <span class="var">newUser</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">prisma</span>.<span class="var">user</span>.<span class="fn">create</span>({
  <span class="arg">data</span>: {
    <span class="arg">email</span>: <span class="str">'bob@example.com'</span>,
    <span class="arg">name</span>: <span class="str">'Bob'</span>,
    <span class="arg">posts</span>: {
      <span class="fn">create</span>: [
        { <span class="arg">title</span>: <span class="str">'First Post'</span>, <span class="arg">content</span>: <span class="str">'Hello!'</span> },
        { <span class="arg">title</span>: <span class="str">'Second Post'</span>, <span class="arg">published</span>: <span class="num">true</span> },
      ]
    }
  },
  <span class="arg">include</span>: { <span class="arg">posts</span>: <span class="num">true</span> }
})`}</code></pre>
    </div>

    <!-- Raw SQL -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Raw SQL Queries</h3>
      <p class="text-sm text-slate-600">When the ORM cannot express a complex query, drop down to raw SQL.</p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Raw SQL with Prisma (parameterized — safe from injection)</span>
<span class="kw">const</span> <span class="var">users</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">prisma</span>.<span class="fn">$queryRaw</span><span class="str">\`
  SELECT u.name, COUNT(p.id) as post_count
  FROM "User" u
  LEFT JOIN "Post" p ON p."authorId" = u.id
  WHERE u."createdAt" > \${thirtyDaysAgo}
  GROUP BY u.id
  ORDER BY post_count DESC
  LIMIT 10
\`</span>

<span class="cmt">// Execute raw SQL (for INSERT/UPDATE/DELETE)</span>
<span class="kw">const</span> <span class="var">count</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">prisma</span>.<span class="fn">$executeRaw</span><span class="str">\`
  UPDATE "Post" SET published = true
  WHERE "authorId" = \${userId}
  AND "createdAt" < \${cutoffDate}
\`</span>`}</code></pre>
    </div>

    <!-- Seed Script -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Seed Script</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">// prisma/seed.ts</span>
<span class="kw">import</span> { <span class="var">PrismaClient</span> } <span class="kw">from</span> <span class="str">'@prisma/client'</span>

<span class="kw">const</span> <span class="var">prisma</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">PrismaClient</span>()

<span class="kw">async function</span> <span class="fn">main</span>() {
  <span class="cmt">// Clear existing data</span>
  <span class="kw">await</span> <span class="var">prisma</span>.<span class="var">post</span>.<span class="fn">deleteMany</span>()
  <span class="kw">await</span> <span class="var">prisma</span>.<span class="var">user</span>.<span class="fn">deleteMany</span>()

  <span class="cmt">// Create sample users with posts</span>
  <span class="kw">await</span> <span class="var">prisma</span>.<span class="var">user</span>.<span class="fn">create</span>({
    <span class="arg">data</span>: {
      <span class="arg">email</span>: <span class="str">'alice@test.com'</span>,
      <span class="arg">name</span>: <span class="str">'Alice'</span>,
      <span class="arg">posts</span>: {
        <span class="fn">create</span>: [
          { <span class="arg">title</span>: <span class="str">'Getting Started'</span>, <span class="arg">published</span>: <span class="num">true</span> },
          { <span class="arg">title</span>: <span class="str">'Draft Post'</span>, <span class="arg">content</span>: <span class="str">'Work in progress'</span> },
        ]
      }
    }
  })

  <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">'Database seeded!'</span>)
}

<span class="fn">main</span>().<span class="fn">finally</span>(() <span class="op">=></span> <span class="var">prisma</span>.<span class="fn">$disconnect</span>())`}</code></pre>
      <p class="text-sm text-slate-500">Run with <code class="rounded bg-slate-100 px-1 text-green-700">npx prisma db seed</code>. Add to <code class="rounded bg-slate-100 px-1 text-green-700">package.json</code>: <code class="rounded bg-slate-100 px-1 text-green-700">"prisma": &#123; "seed": "tsx prisma/seed.ts" &#125;</code></p>
    </div>

    <!-- Connection Pooling Config -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Connection Pooling Configuration</h3>
      <pre class="code-block"><code>{@html `<span class="cmt"># Add pool parameters to your connection string</span>
<span class="var">DATABASE_URL</span><span class="op">=</span><span class="str">"postgresql://user:pass@host:5432/db?connection_limit=10&pool_timeout=30"</span>

<span class="cmt"># For serverless (e.g., Vercel), use an external pooler:</span>
<span class="cmt"># Direct connection (for migrations)</span>
<span class="var">DIRECT_URL</span><span class="op">=</span><span class="str">"postgresql://user:pass@db.host:5432/mydb"</span>
<span class="cmt"># Pooled connection (for app queries)</span>
<span class="var">DATABASE_URL</span><span class="op">=</span><span class="str">"postgresql://user:pass@pooler.host:6543/mydb?pgbouncer=true"</span>`}</code></pre>
      <pre class="code-block"><code>{@html `<span class="cmt">// prisma/schema.prisma — serverless setup</span>
<span class="kw">datasource</span> <span class="var">db</span> {
  <span class="arg">provider</span>  <span class="op">=</span> <span class="str">"postgresql"</span>
  <span class="arg">url</span>       <span class="op">=</span> <span class="fn">env</span>(<span class="str">"DATABASE_URL"</span>)       <span class="cmt">// pooled</span>
  <span class="arg">directUrl</span> <span class="op">=</span> <span class="fn">env</span>(<span class="str">"DIRECT_URL"</span>)        <span class="cmt">// for migrations</span>
}`}</code></pre>
    </div>

    <!-- Indexing -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Indexing</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">// Add indexes in your Prisma schema</span>
<span class="kw">model</span> <span class="var">Post</span> {
  <span class="var">id</span>        <span class="fn">Int</span>      <span class="arg">@id</span> <span class="arg">@default</span>(<span class="fn">autoincrement</span>())
  <span class="var">title</span>     <span class="fn">String</span>
  <span class="var">authorId</span>  <span class="fn">Int</span>
  <span class="var">published</span> <span class="fn">Boolean</span>
  <span class="var">createdAt</span> <span class="fn">DateTime</span> <span class="arg">@default</span>(<span class="fn">now</span>())

  <span class="cmt">// Single-column index</span>
  <span class="arg">@@index</span>([<span class="var">authorId</span>])

  <span class="cmt">// Compound index (queries filtering by both columns)</span>
  <span class="arg">@@index</span>([<span class="var">published</span>, <span class="var">createdAt</span>])
}

<span class="cmt">// Equivalent raw SQL:</span>
<span class="cmt">// CREATE INDEX idx_post_author ON "Post"("authorId");</span>
<span class="cmt">// CREATE INDEX idx_post_pub_date ON "Post"("published", "createdAt");</span>`}</code></pre>
    </div>

    <!-- Transactions -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Transactions</h3>
      <p class="text-sm text-slate-600">Group multiple operations so they all succeed or all fail together.</p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Transfer credits between users — must be atomic</span>
<span class="kw">const</span> <span class="var">result</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">prisma</span>.<span class="fn">$transaction</span>(<span class="kw">async</span> (<span class="var">tx</span>) <span class="op">=></span> {
  <span class="cmt">// Deduct from sender</span>
  <span class="kw">const</span> <span class="var">sender</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">tx</span>.<span class="var">user</span>.<span class="fn">update</span>({
    <span class="arg">where</span>: { <span class="arg">id</span>: <span class="var">senderId</span> },
    <span class="arg">data</span>: { <span class="arg">credits</span>: { <span class="fn">decrement</span>: <span class="var">amount</span> } }
  })

  <span class="cmt">// Verify sender has enough</span>
  <span class="kw">if</span> (<span class="var">sender</span>.<span class="var">credits</span> <span class="op"><</span> <span class="num">0</span>) {
    <span class="kw">throw new</span> <span class="fn">Error</span>(<span class="str">'Insufficient credits'</span>)
    <span class="cmt">// This rolls back BOTH operations</span>
  }

  <span class="cmt">// Add to receiver</span>
  <span class="kw">await</span> <span class="var">tx</span>.<span class="var">user</span>.<span class="fn">update</span>({
    <span class="arg">where</span>: { <span class="arg">id</span>: <span class="var">receiverId</span> },
    <span class="arg">data</span>: { <span class="arg">credits</span>: { <span class="fn">increment</span>: <span class="var">amount</span> } }
  })

  <span class="kw">return</span> <span class="var">sender</span>
})`}</code></pre>
      <p class="text-sm text-slate-500">If any operation inside <code class="rounded bg-slate-100 px-1 text-green-700">$transaction</code> throws an error, all changes are rolled back. This prevents partial updates that would leave your data in an inconsistent state.</p>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
      >
        I know the advanced database code
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a;
    color: #e2e8f0; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
