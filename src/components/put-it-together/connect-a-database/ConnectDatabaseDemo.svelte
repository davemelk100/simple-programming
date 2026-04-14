<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Schema Designer ===
  interface Field {
    name: string;
    type: string;
  }

  const typeOptions = ['String', 'Int', 'Boolean', 'DateTime', 'Float'];

  let fields = $state<Field[]>([
    { name: 'id', type: 'Int' },
    { name: 'email', type: 'String' },
    { name: 'name', type: 'String' },
  ]);

  let newFieldName = $state('');
  let newFieldType = $state('String');

  function addField() {
    const name = newFieldName.trim().replace(/\s+/g, '_').toLowerCase();
    if (!name || fields.some(f => f.name === name)) return;
    fields = [...fields, { name, type: newFieldType }];
    newFieldName = '';
  }

  function removeField(index: number) {
    if (index === 0) return; // keep id
    fields = fields.filter((_, i) => i !== index);
  }

  function sqlType(t: string): string {
    switch (t) {
      case 'String': return 'VARCHAR(255)';
      case 'Int': return 'INTEGER';
      case 'Boolean': return 'BOOLEAN';
      case 'DateTime': return 'TIMESTAMP';
      case 'Float': return 'DECIMAL(10,2)';
      default: return 'TEXT';
    }
  }

  let generatedSQL = $derived(
    `CREATE TABLE "User" (\n` +
    fields.map((f, i) =>
      `  "${f.name}" ${sqlType(f.type)}${f.name === 'id' ? ' PRIMARY KEY GENERATED ALWAYS AS IDENTITY' : ' NOT NULL'}${i < fields.length - 1 ? ',' : ''}`
    ).join('\n') +
    `\n);`
  );

  let generatedPrisma = $derived(
    `model User {\n` +
    fields.map(f =>
      `  ${f.name.padEnd(12)} ${f.type}${f.name === 'id' ? '  @id @default(autoincrement())' : ''}`
    ).join('\n') +
    `\n}`
  );

  // === Advanced mode: Migration Builder ===
  type MigrationAction = 'add_column' | 'rename_column' | 'add_relation';

  interface MigrationStep {
    action: MigrationAction;
    details: string;
    upSQL: string;
    downSQL: string;
  }

  let migrationSteps = $state<MigrationStep[]>([]);
  let addColName = $state('');
  let addColType = $state('String');
  let renameOld = $state('');
  let renameNew = $state('');
  let relationTable = $state('');

  function addColumnMigration() {
    const name = addColName.trim().replace(/\s+/g, '_').toLowerCase();
    if (!name) return;
    migrationSteps = [...migrationSteps, {
      action: 'add_column',
      details: `Add column "${name}" (${addColType}) to User`,
      upSQL: `ALTER TABLE "User" ADD COLUMN "${name}" ${sqlType(addColType)} NOT NULL DEFAULT ${addColType === 'String' ? "''" : addColType === 'Boolean' ? 'FALSE' : '0'};`,
      downSQL: `ALTER TABLE "User" DROP COLUMN "${name}";`,
    }];
    addColName = '';
  }

  function renameColumnMigration() {
    const oldName = renameOld.trim().toLowerCase();
    const newName = renameNew.trim().toLowerCase();
    if (!oldName || !newName) return;
    migrationSteps = [...migrationSteps, {
      action: 'rename_column',
      details: `Rename column "${oldName}" to "${newName}" on User`,
      upSQL: `ALTER TABLE "User" RENAME COLUMN "${oldName}" TO "${newName}";`,
      downSQL: `ALTER TABLE "User" RENAME COLUMN "${newName}" TO "${oldName}";`,
    }];
    renameOld = '';
    renameNew = '';
  }

  function addRelationMigration() {
    const table = relationTable.trim().replace(/\s+/g, '_');
    if (!table) return;
    const fk = table.toLowerCase() + 'Id';
    migrationSteps = [...migrationSteps, {
      action: 'add_relation',
      details: `Add foreign key "${fk}" referencing "${table}"`,
      upSQL: `ALTER TABLE "User" ADD COLUMN "${fk}" INTEGER NOT NULL;\nALTER TABLE "User" ADD CONSTRAINT "fk_${table.toLowerCase()}" FOREIGN KEY ("${fk}") REFERENCES "${table}"("id");`,
      downSQL: `ALTER TABLE "User" DROP CONSTRAINT "fk_${table.toLowerCase()}";\nALTER TABLE "User" DROP COLUMN "${fk}";`,
    }];
    relationTable = '';
  }

  function clearMigrations() {
    migrationSteps = [];
  }

  let showRollback = $state(false);
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Schema Designer</h2>
    <p class="text-slate-600">
      Build a data model for a "User" table. Add fields and see the resulting SQL and ORM schema code generated side by side.
    </p>
  </div>

  <div class="rounded-xl border-2 border-green-200 bg-green-50 p-6 space-y-6">
    <!-- Current fields -->
    <div>
      <h3 class="mb-3 font-bold text-slate-800">User Table Fields</h3>
      <div class="space-y-2">
        {#each fields as field, i (field.name)}
          <div class="flex items-center gap-3 rounded-lg bg-white px-4 py-2 border border-green-200">
            <span class="font-mono text-sm text-green-700 flex-1">{field.name}</span>
            <span class="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">{field.type}</span>
            {#if i === 0}
              <span class="rounded bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-600">PRIMARY KEY</span>
            {:else}
              <button
                onclick={() => removeField(i)}
                class="text-red-400 hover:text-red-600 text-sm font-bold"
              >
                x
              </button>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Add field -->
    <div class="flex flex-wrap gap-2">
      <input
        type="text"
        bind:value={newFieldName}
        placeholder="Field name (e.g. age, bio, isActive)"
        class="flex-1 min-w-[180px] rounded-lg border-2 border-green-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') addField(); }}
      />
      <select
        bind:value={newFieldType}
        class="rounded-lg border-2 border-green-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-green-500 focus:outline-none"
      >
        {#each typeOptions as t}
          <option value={t}>{t}</option>
        {/each}
      </select>
      <button
        onclick={addField}
        class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95"
      >
        Add Field
      </button>
    </div>

    <!-- Generated code -->
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <h4 class="mb-2 text-sm font-bold text-slate-700">SQL (PostgreSQL)</h4>
        <pre class="code-block text-xs"><code>{generatedSQL}</code></pre>
      </div>
      <div>
        <h4 class="mb-2 text-sm font-bold text-slate-700">Prisma Schema</h4>
        <pre class="code-block text-xs"><code>{generatedPrisma}</code></pre>
      </div>
    </div>

    <p class="text-xs text-slate-500">
      Try adding fields like "age" (Int), "bio" (String), "isActive" (Boolean), or "createdAt" (DateTime) to see how the generated code changes.
    </p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      I've designed a schema
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Migration Builder</h2>
      <p class="text-slate-600">
        Make changes to a schema and see the migration SQL generated. Each change creates both an "up" migration (apply) and a "down" migration (rollback).
      </p>
    </div>

    <div class="rounded-xl border-2 border-green-200 bg-green-50 p-6 space-y-6">
      <!-- Migration actions -->
      <div class="grid gap-4 sm:grid-cols-3">
        <!-- Add Column -->
        <div class="space-y-2 rounded-lg border border-green-200 bg-white p-4">
          <h4 class="text-sm font-bold text-slate-700">Add Column</h4>
          <input
            type="text"
            bind:value={addColName}
            placeholder="Column name"
            class="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none"
          />
          <select
            bind:value={addColType}
            class="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 focus:border-green-500 focus:outline-none"
          >
            {#each typeOptions as t}
              <option value={t}>{t}</option>
            {/each}
          </select>
          <button
            onclick={addColumnMigration}
            class="w-full rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-700 active:scale-95"
          >
            Add Column
          </button>
        </div>

        <!-- Rename Column -->
        <div class="space-y-2 rounded-lg border border-green-200 bg-white p-4">
          <h4 class="text-sm font-bold text-slate-700">Rename Column</h4>
          <input
            type="text"
            bind:value={renameOld}
            placeholder="Current name"
            class="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none"
          />
          <input
            type="text"
            bind:value={renameNew}
            placeholder="New name"
            class="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none"
          />
          <button
            onclick={renameColumnMigration}
            class="w-full rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-700 active:scale-95"
          >
            Rename
          </button>
        </div>

        <!-- Add Relation -->
        <div class="space-y-2 rounded-lg border border-green-200 bg-white p-4">
          <h4 class="text-sm font-bold text-slate-700">Add Relation</h4>
          <input
            type="text"
            bind:value={relationTable}
            placeholder="Related table (e.g. Post)"
            class="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none"
          />
          <button
            onclick={addRelationMigration}
            class="w-full rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-700 active:scale-95"
          >
            Add FK
          </button>
        </div>
      </div>

      <!-- Migration steps list -->
      {#if migrationSteps.length > 0}
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-slate-800">Migration Steps ({migrationSteps.length})</h4>
            <div class="flex gap-2">
              <button
                onclick={() => showRollback = !showRollback}
                class="rounded-lg border border-green-300 px-3 py-1 text-xs font-semibold {showRollback ? 'bg-red-100 text-red-700 border-red-300' : 'bg-white text-green-700'} hover:opacity-80"
              >
                {showRollback ? 'Showing Rollback' : 'Show Rollback'}
              </button>
              <button
                onclick={clearMigrations}
                class="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Clear All
              </button>
            </div>
          </div>

          {#each migrationSteps as step, i (i)}
            <div class="rounded-lg border border-green-200 bg-white p-4 space-y-2">
              <div class="flex items-center gap-2">
                <span class="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-800">
                  {step.action === 'add_column' ? 'ADD' : step.action === 'rename_column' ? 'RENAME' : 'RELATION'}
                </span>
                <span class="text-sm text-slate-700">{step.details}</span>
              </div>
              <div>
                <p class="text-xs font-bold {showRollback ? 'text-red-600' : 'text-green-600'} mb-1">
                  {showRollback ? 'DOWN (Rollback):' : 'UP (Apply):'}
                </p>
                <pre class="code-block text-xs"><code>{showRollback ? step.downSQL : step.upSQL}</code></pre>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-center text-sm text-slate-500 py-4">Use the controls above to build migration steps. Each change generates both up and down SQL.</p>
      {/if}
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
      >
        I've built migrations
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a;
    color: #e2e8f0; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; color: #e2e8f0; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
