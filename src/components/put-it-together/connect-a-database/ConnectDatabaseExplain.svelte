<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);

  const cards = [
    { emoji: '\uD83D\uDD17', title: 'Connection Strings', desc: 'A URL that tells your app where the database lives, what credentials to use, and which database to connect to.' },
    { emoji: '\uD83D\uDDE3\uFE0F', title: 'ORMs', desc: 'An ORM translates your code into SQL so you can work with database records as regular objects instead of writing raw queries.' },
    { emoji: '\uD83D\uDCD0', title: 'Schemas', desc: 'A schema defines the shape of your data — what tables exist, what columns they have, and what types those columns hold.' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < cards.length) {
        visibleCards++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">How Apps Talk to Databases</h2>
    <p class="text-slate-600">
      Your app stores data — users, posts, orders, messages. That data lives in a <strong>database</strong>, a specialized program designed to store and retrieve information reliably. But your app and your database speak different languages. Your app is written in JavaScript, Python, or Go; your database speaks <strong>SQL</strong>. Connecting them requires a few key pieces.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    {#each cards as card, i}
      <div
        class="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center transition-all duration-700
          {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
      >
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>

    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5 space-y-4">
      <div>
        <h4 class="font-bold text-slate-800">Connection String</h4>
        <p class="text-sm text-slate-600">A connection string is like a postal address for your database. It contains the host, port, username, password, and database name all in one URL. For example: <code class="rounded bg-slate-100 px-1 text-sm text-green-700">postgresql://user:password@localhost:5432/mydb</code>. Your app uses this to know exactly where to send queries.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">ORM (Object-Relational Mapper)</h4>
        <p class="text-sm text-slate-600">An ORM is like a <strong>translator</strong> between your code and the database. Instead of writing SQL by hand, you write normal code like <code class="rounded bg-slate-100 px-1 text-sm text-green-700">User.create(&#123; name: "Alice" &#125;)</code> and the ORM converts it to <code class="rounded bg-slate-100 px-1 text-sm text-green-700">INSERT INTO users (name) VALUES ('Alice')</code> behind the scenes. Popular ORMs include Prisma, Drizzle, and SQLAlchemy.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Schema</h4>
        <p class="text-sm text-slate-600">A schema defines the <strong>shape of your data</strong>. It says "a User has a name (text), an email (text), and an age (number)." Think of it as a blueprint — the database enforces this shape, rejecting data that does not fit. Schemas prevent chaos by keeping your data consistent.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Migrations</h4>
        <p class="text-sm text-slate-600">Migrations are scripts that <strong>update your database structure over time</strong>. When you add a new column or rename a table, you write a migration. Each one is numbered and runs in order, so every developer's database stays in sync. Think of it like version control for your database schema.</p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Seed Data</h4>
        <p class="text-sm text-slate-600">Seed data is <strong>starting data for development</strong>. Instead of manually creating test users every time you reset your database, a seed script fills it with sample data automatically. This makes it easy for new developers to get started quickly.</p>
      </div>
    </div>
  </div>

  <div class="rounded-xl border-2 border-green-200 bg-green-50 p-5">
    <h3 class="mb-2 font-bold text-slate-800">Metaphor: The ORM Translator</h3>
    <p class="text-sm text-slate-600">
      Imagine you are visiting a country where you do not speak the language. You hire a translator who listens to what you say in English, converts it to the local language, and relays the response back. An ORM does the same thing: you speak JavaScript (or Python), the ORM translates to SQL, sends the query to the database, and hands you back the results as normal objects in your language.
    </p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      I understand database connections
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Connect a Database (Advanced)</h2>
      <p class="text-slate-600">Connection pooling, ORM trade-offs, migration strategies, and performance optimization.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Connection Pooling</h3>
      <p class="text-slate-600">
        Opening a database connection is expensive — it involves TCP handshakes, authentication, and memory allocation. A <strong>connection pool</strong> maintains a set of pre-opened connections that your app reuses. Instead of connecting and disconnecting for every query, your code borrows a connection from the pool, uses it, and returns it. This dramatically improves performance under load.
      </p>
      <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
        <p class="text-sm text-slate-600">
          Typical pool settings: <code class="rounded bg-slate-100 px-1 text-sm text-green-700">min: 2</code> (always keep 2 connections ready), <code class="rounded bg-slate-100 px-1 text-sm text-green-700">max: 10</code> (never open more than 10), <code class="rounded bg-slate-100 px-1 text-sm text-green-700">idleTimeout: 30s</code> (close idle connections after 30 seconds). For serverless environments, tools like <strong>PgBouncer</strong> or <strong>Prisma Accelerate</strong> provide external connection pooling.
        </p>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">ORM vs. Raw SQL Trade-offs</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">ORM Advantages</h4>
          <ul class="space-y-1 text-sm text-slate-600">
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
              <span>Type safety and autocompletion in your editor</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
              <span>Database-agnostic — switch from Postgres to MySQL with minimal changes</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
              <span>Built-in protection against SQL injection</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
              <span>Automatic migration generation</span>
            </li>
          </ul>
        </div>
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Raw SQL Advantages</h4>
          <ul class="space-y-1 text-sm text-slate-600">
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
              <span>Full control over query performance and optimization</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
              <span>Access to database-specific features (CTEs, window functions, JSON operators)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
              <span>No ORM overhead — faster for complex queries</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
              <span>Easier to debug — you see exactly what runs</span>
            </li>
          </ul>
        </div>
      </div>
      <p class="text-sm text-slate-500">Many teams use a hybrid approach: ORM for standard CRUD, raw SQL for complex reporting queries. Libraries like Prisma support <code class="rounded bg-slate-100 px-1 text-green-700">$queryRaw</code> for exactly this purpose.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Popular ORMs by Language</h3>
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">JavaScript / TypeScript</h4>
          <p class="text-sm text-slate-600"><strong>Prisma</strong> — schema-first, excellent type safety, auto-generated client. <strong>Drizzle</strong> — lightweight, SQL-like syntax, great performance. <strong>Knex</strong> — query builder (not a full ORM) for more control.</p>
        </div>
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Python</h4>
          <p class="text-sm text-slate-600"><strong>SQLAlchemy</strong> — the gold standard, supports both ORM and raw SQL patterns. <strong>Django ORM</strong> — built into Django, tightly integrated. <strong>Tortoise ORM</strong> — async-first for modern Python.</p>
        </div>
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Go / C# / Others</h4>
          <p class="text-sm text-slate-600"><strong>GORM</strong> (Go) — convention-based, most popular in the Go ecosystem. <strong>Entity Framework</strong> (C#) — Microsoft's ORM with LINQ integration. <strong>Hibernate</strong> (Java) — enterprise standard.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Migration Strategies</h3>
      <p class="text-slate-600">
        Migrations come in pairs: an <strong>up</strong> migration (apply the change) and a <strong>down</strong> migration (reverse it). This allows you to roll back safely if something goes wrong.
      </p>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Forward-Only</h4>
          <p class="text-sm text-slate-600">Some teams only write "up" migrations and fix problems by creating new migrations. Simpler and avoids the risk of buggy rollback scripts. Used in many production environments.</p>
        </div>
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Up/Down Pairs</h4>
          <p class="text-sm text-slate-600">Every migration has a corresponding rollback. More work upfront, but lets you undo changes cleanly. Useful during development and required by some compliance standards.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Database Branching &amp; Read Replicas</h3>
      <p class="text-slate-600">
        <strong>Database branching</strong> (offered by Neon, PlanetScale, and others) lets you create isolated copies of your database for each feature branch — just like Git branches for your schema and data. This means every developer and every PR can have its own database without conflicts.
      </p>
      <p class="text-slate-600">
        <strong>Read replicas</strong> are copies of your database that handle read queries (SELECT), reducing load on the primary database which handles writes (INSERT, UPDATE, DELETE). Most ORMs support routing read queries to replicas automatically.
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Indexing for Performance</h3>
      <p class="text-slate-600">
        An <strong>index</strong> is like an index in a book — instead of scanning every page (row) to find what you need, the database jumps directly to the right location. Without an index, a query on a table with a million rows scans all million rows. With an index on the searched column, it finds the result in milliseconds.
      </p>
      <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
        <p class="text-sm text-slate-600">
          <strong>When to index:</strong> Columns used in WHERE clauses, JOIN conditions, and ORDER BY. <strong>When not to index:</strong> Small tables, columns that are rarely queried, or columns with very low cardinality (like a boolean). Every index speeds up reads but slightly slows down writes, because the index must be updated too.
        </p>
      </div>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
      >
        I understand database connections
      </button>
    </div>
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
