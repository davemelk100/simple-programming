<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: (score: number) => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode ===
  let b1Answer = $state('');
  let b1Result = $state<'correct' | 'wrong' | null>(null);

  let b2Answer = $state('');
  let b2Result = $state<'correct' | 'wrong' | null>(null);

  let b3Answer = $state('');
  let b3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(b1Result === 'correct' && b2Result === 'correct' && b3Result === 'correct');

  function checkB1() {
    const a = b1Answer.trim().toLowerCase();
    b1Result = (a === 'orm' || a === 'an orm' || a === 'object-relational mapper' || a === 'object relational mapper') ? 'correct' : 'wrong';
  }

  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    b2Result = (a === 'migration' || a === 'migrations' || a === 'a migration' || a === 'database migration' || a === 'database migrations') ? 'correct' : 'wrong';
  }

  function checkB3() {
    const a = b3Answer.trim().toLowerCase();
    b3Result = (a === 'schema' || a === 'a schema' || a === 'the schema' || a === 'database schema') ? 'correct' : 'wrong';
  }

  function handleComplete() {
    const score = [b1Result, b2Result, b3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (allDone) {
      handleComplete();
    }
  });

  // === Advanced mode ===
  let a1Answer = $state('');
  let a1Result = $state<'correct' | 'wrong' | null>(null);

  let a2Answer = $state('');
  let a2Result = $state<'correct' | 'wrong' | null>(null);

  let a3Answer = $state('');
  let a3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(a1Result === 'correct' && a2Result === 'correct' && a3Result === 'correct');

  function checkA1() {
    const a = a1Answer.trim().toLowerCase();
    a1Result = (a === 'prisma migrate dev' || a === 'prisma migrate' || a === 'npx prisma migrate dev') ? 'correct' : 'wrong';
  }

  function checkA2() {
    const a = a2Answer.trim().toLowerCase();
    a2Result = (a === 'connection pooling' || a === 'connection pool' || a === 'pooling' || a === 'a connection pool') ? 'correct' : 'wrong';
  }

  function checkA3() {
    const a = a3Answer.trim().toLowerCase();
    a3Result = (a === 'index' || a === 'indexes' || a === 'indexing' || a === 'an index' || a === 'database index') ? 'correct' : 'wrong';
  }

  function handleAdvComplete() {
    const score = [a1Result, a2Result, a3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (advAllDone) {
      handleAdvComplete();
    }
  });
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Database Basics</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section. Type your answer as a word or short phrase.</p>
  </div>

  <!-- Question 1 -->
  <div class="rounded-xl border-2 {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What translates your code into database queries?</p>
    <p class="text-sm text-slate-500">Hint: It acts as a translator between your programming language and SQL.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b1Answer}
        placeholder="Your answer..."
        disabled={b1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB1(); }}
      />
      <button
        onclick={checkB1}
        disabled={b1Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b1Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! An ORM (Object-Relational Mapper) translates your code into SQL queries automatically.</p>
    {:else if b1Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about what "maps" objects in your code to relational database tables. Try again!</p>
    {/if}
  </div>

  <!-- Question 2 -->
  <div class="rounded-xl border-2 {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What updates your database structure over time?</p>
    <p class="text-sm text-slate-500">Hint: It is like version control for your database schema.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b2Answer}
        placeholder="Your answer..."
        disabled={b2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB2(); }}
      />
      <button
        onclick={checkB2}
        disabled={b2Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b2Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Migrations are numbered scripts that evolve your database schema over time, keeping all environments in sync.</p>
    {:else if b2Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about how people "migrate" from one place to another — these scripts move your schema forward. Try again!</p>
    {/if}
  </div>

  <!-- Question 3 -->
  <div class="rounded-xl border-2 {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What defines the shape of your data?</p>
    <p class="text-sm text-slate-500">Hint: It is like a blueprint that specifies which columns exist and their types.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b3Answer}
        placeholder="Your answer..."
        disabled={b3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB3(); }}
      />
      <button
        onclick={checkB3}
        disabled={b3Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b3Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! A schema defines the structure of your data — table names, column names, data types, and constraints.</p>
    {:else if b3Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about the word for a "blueprint" or "structure definition" in databases. Try again!</p>
    {/if}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You understand the fundamentals of connecting a database.</p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Database Concepts</h2>
    <p class="text-slate-600">Answer all three questions correctly. Type the command or concept name.</p>
  </div>

  <!-- Advanced Question 1 -->
  <div class="rounded-xl border-2 {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What Prisma command creates a migration?</p>
    <p class="text-sm text-slate-500">Hint: It starts with "prisma" and uses the "migrate" subcommand.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a1Answer}
        placeholder="Your answer..."
        disabled={a1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA1(); }}
      />
      <button
        onclick={checkA1}
        disabled={a1Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a1Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! "prisma migrate dev" creates a migration from your schema changes, applies it, and regenerates the client.</p>
    {:else if a1Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. The command is "prisma migrate" followed by the environment. In development, you use "dev." Try again!</p>
    {/if}
  </div>

  <!-- Advanced Question 2 -->
  <div class="rounded-xl border-2 {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What reuses database connections for performance?</p>
    <p class="text-sm text-slate-500">Hint: Think of a "pool" of pre-opened connections that your app borrows from.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a2Answer}
        placeholder="Your answer..."
        disabled={a2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA2(); }}
      />
      <button
        onclick={checkA2}
        disabled={a2Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a2Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Connection pooling keeps a set of database connections open and reuses them, avoiding the overhead of connecting on every query.</p>
    {:else if a2Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about maintaining a "pool" of ready-to-use connections. Try again!</p>
    {/if}
  </div>

  <!-- Advanced Question 3 -->
  <div class="rounded-xl border-2 {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What speeds up database lookups on a column?</p>
    <p class="text-sm text-slate-500">Hint: Like an index in a book, it helps the database find rows without scanning every one.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a3Answer}
        placeholder="Your answer..."
        disabled={a3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA3(); }}
      />
      <button
        onclick={checkA3}
        disabled={a3Result === 'correct'}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a3Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! An index is a data structure that speeds up lookups on a column, allowing the database to find rows in milliseconds instead of scanning the entire table.</p>
    {:else if a3Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about the back of a textbook — what helps you find a topic quickly? Try again!</p>
    {/if}
  </div>

  {#if advAllDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You have solid knowledge of advanced database concepts.</p>
    </div>
  {/if}

  {/if}
</div>
