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

  // === Basic Mode: Organize files into folders ===
  interface FileItem {
    name: string;
    folder: string; // correct folder
  }

  const files: FileItem[] = [
    { name: 'LoginForm.js', folder: 'components' },
    { name: 'UserProfile.js', folder: 'components' },
    { name: 'userModel.js', folder: 'models' },
    { name: 'orderModel.js', folder: 'models' },
    { name: 'apiClient.js', folder: 'utils' },
    { name: 'formatDate.js', folder: 'utils' },
    { name: 'main.css', folder: 'styles' },
    { name: 'theme.css', folder: 'styles' },
    { name: 'LoginForm.test.js', folder: 'tests' },
    { name: 'userModel.test.js', folder: 'tests' },
  ];

  const folders = ['components', 'models', 'utils', 'styles', 'tests'] as const;

  const folderDescriptions: Record<string, string> = {
    components: 'UI elements users interact with',
    models: 'Data structures and schemas',
    utils: 'Helper functions and API tools',
    styles: 'CSS and visual styling',
    tests: 'Test files that verify code works',
  };

  const folderColors: Record<string, string> = {
    components: 'border-blue-300 bg-blue-50',
    models: 'border-purple-300 bg-purple-50',
    utils: 'border-amber-300 bg-amber-50',
    styles: 'border-pink-300 bg-pink-50',
    tests: 'border-green-300 bg-green-50',
  };

  const folderBadgeColors: Record<string, string> = {
    components: 'bg-blue-100 text-blue-700',
    models: 'bg-purple-100 text-purple-700',
    utils: 'bg-amber-100 text-amber-700',
    styles: 'bg-pink-100 text-pink-700',
    tests: 'bg-green-100 text-green-700',
  };

  // Track assignments: file index -> chosen folder
  let assignments = $state<Record<number, string>>({});
  let selectedFile = $state<number | null>(null);
  let showResult = $state(false);

  let correctCount = $derived(
    files.filter((f, i) => assignments[i] === f.folder).length
  );
  let allAssigned = $derived(Object.keys(assignments).length === files.length);
  let allCorrect = $derived(correctCount === files.length);

  function selectFile(index: number) {
    if (showResult) return;
    selectedFile = index;
  }

  function assignToFolder(folder: string) {
    if (selectedFile === null || showResult) return;
    assignments = { ...assignments, [selectedFile]: folder };
    selectedFile = null;
  }

  function checkAnswers() {
    showResult = true;
  }

  function resetBasic() {
    assignments = {};
    selectedFile = null;
    showResult = false;
  }

  // === Advanced Mode: Identify sections to extract from a god file ===
  interface GodFileSection {
    id: string;
    label: string;
    code: string;
    concern: string;
    shouldExtract: boolean;
  }

  const godFileSections: GodFileSection[] = [
    {
      id: 'db',
      label: 'Database connection setup',
      code: 'const db = new Database(config.dbUrl);\ndb.connect();\ndb.migrate();',
      concern: 'database.js',
      shouldExtract: true,
    },
    {
      id: 'auth',
      label: 'Authentication logic',
      code: 'function login(email, pw) { ... }\nfunction logout(session) { ... }\nfunction hashPassword(pw) { ... }',
      concern: 'authService.js',
      shouldExtract: true,
    },
    {
      id: 'validate',
      label: 'Input validation helpers',
      code: 'function validateEmail(e) { ... }\nfunction validateAge(a) { ... }\nfunction sanitizeInput(s) { ... }',
      concern: 'validation.js',
      shouldExtract: true,
    },
    {
      id: 'email',
      label: 'Email sending functions',
      code: 'function sendWelcome(user) { ... }\nfunction sendReset(email) { ... }\nfunction formatTemplate(t, data) { ... }',
      concern: 'emailService.js',
      shouldExtract: true,
    },
    {
      id: 'routes',
      label: 'Route definitions',
      code: 'app.get("/users", listUsers);\napp.post("/login", handleLogin);\napp.get("/orders", listOrders);',
      concern: 'routes.js',
      shouldExtract: true,
    },
    {
      id: 'logging',
      label: 'Logging configuration',
      code: 'const logger = createLogger({ level: "info" });\nlogger.addTransport(new FileTransport("app.log"));',
      concern: 'logger.js',
      shouldExtract: true,
    },
  ];

  let advSelections = $state<Record<string, boolean>>({});
  let advShowResult = $state(false);

  let advCorrectCount = $derived(
    godFileSections.filter((s) => {
      const selected = advSelections[s.id] ?? false;
      return selected === s.shouldExtract;
    }).length
  );
  let advAllCorrect = $derived(advCorrectCount === godFileSections.length);
  let advAllChecked = $derived(
    godFileSections.filter((s) => advSelections[s.id]).length > 0
  );

  function toggleSection(id: string) {
    if (advShowResult) return;
    advSelections = { ...advSelections, [id]: !advSelections[id] };
  }

  function checkAdvanced() {
    advShowResult = true;
  }

  function resetAdvanced() {
    advSelections = {};
    advShowResult = false;
  }
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Organize This Project</h2>
    <p class="text-slate-600">
      These 10 files are all dumped in one flat folder. Click a file, then click the folder where it belongs. Sort all files to see the clean project structure.
    </p>
  </div>

  <!-- Unassigned files -->
  <div>
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Unsorted Files</h3>
    <div class="flex flex-wrap gap-2">
      {#each files as file, i}
        {#if assignments[i] === undefined}
          <button
            onclick={() => selectFile(i)}
            class="rounded-lg border-2 px-3 py-2 text-sm font-mono transition-all
              {selectedFile === i
                ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50'}"
          >
            {file.name}
          </button>
        {/if}
      {/each}
      {#if allAssigned && !showResult}
        <p class="text-sm text-green-600 font-medium">All files assigned!</p>
      {/if}
    </div>
    {#if selectedFile !== null}
      <p class="mt-2 text-sm text-indigo-600">
        Selected: <strong>{files[selectedFile].name}</strong> — now click a folder below
      </p>
    {/if}
  </div>

  <!-- Folders -->
  <div>
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Folders</h3>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each folders as folder}
        <button
          onclick={() => assignToFolder(folder)}
          disabled={selectedFile === null || showResult}
          class="rounded-xl border-2 {folderColors[folder]} p-4 text-left transition-all
            {selectedFile !== null && !showResult ? 'hover:scale-[1.02] hover:shadow-md cursor-pointer' : 'cursor-default'}"
        >
          <div class="mb-1 text-sm font-bold text-slate-800">{folder}/</div>
          <p class="text-xs text-slate-500">{folderDescriptions[folder]}</p>
          <!-- Show assigned files -->
          {#if Object.entries(assignments).some(([, f]) => f === folder)}
            <div class="mt-2 flex flex-wrap gap-1">
              {#each Object.entries(assignments).filter(([, f]) => f === folder) as [idx]}
                <span class="rounded px-1.5 py-0.5 text-xs font-mono {folderBadgeColors[folder]}
                  {showResult
                    ? files[Number(idx)].folder === folder
                      ? 'ring-2 ring-green-400'
                      : 'ring-2 ring-red-400'
                    : ''}">
                  {files[Number(idx)].name}
                </span>
              {/each}
            </div>
          {/if}
        </button>
      {/each}
    </div>
  </div>

  <!-- Check / Result -->
  {#if allAssigned && !showResult}
    <div>
      <button
        onclick={checkAnswers}
        class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
      >
        Check My Organization
      </button>
    </div>
  {/if}

  {#if showResult}
    <div class="rounded-xl border-2 {allCorrect ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'} p-5">
      <p class="font-bold {allCorrect ? 'text-green-700' : 'text-amber-700'}">
        {allCorrect
          ? 'Perfect! You organized every file correctly.'
          : `${correctCount} of ${files.length} files in the right folder. Look for the red-outlined files and think about which folder fits better.`}
      </p>
      {#if allCorrect}
        <div class="mt-4">
          <p class="mb-2 text-sm font-semibold text-slate-600">Your clean project tree:</p>
          <pre class="code-block"><code>{@html `<span class="cmt">project/</span>
  <span class="fn">components/</span>
    <span class="str">LoginForm.js</span>
    <span class="str">UserProfile.js</span>
  <span class="fn">models/</span>
    <span class="str">userModel.js</span>
    <span class="str">orderModel.js</span>
  <span class="fn">utils/</span>
    <span class="str">apiClient.js</span>
    <span class="str">formatDate.js</span>
  <span class="fn">styles/</span>
    <span class="str">main.css</span>
    <span class="str">theme.css</span>
  <span class="fn">tests/</span>
    <span class="str">LoginForm.test.js</span>
    <span class="str">userModel.test.js</span>`}</code></pre>
        </div>
      {/if}
    </div>

    <div class="flex gap-3">
      {#if !allCorrect}
        <button
          onclick={resetBasic}
          class="rounded-full border-2 border-indigo-200 px-6 py-3 font-semibold text-indigo-700 transition-all hover:bg-indigo-50 active:scale-95"
        >
          Try Again
        </button>
      {/if}
      <button
        onclick={oncomplete}
        class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
      >
        {allCorrect ? 'Continue' : 'Skip for now'}
      </button>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Split This God File</h2>
    <p class="text-slate-600">
      The file below — <code class="rounded bg-slate-100 px-1 text-sm text-indigo-700">app.js</code> — contains 6 different sections handling completely separate concerns. This is sometimes called a <strong>"god file"</strong> because it tries to do everything. Select the sections that should be extracted into their own modules.
    </p>
  </div>

  <div class="rounded-xl border-2 border-slate-200 bg-slate-50 p-5">
    <div class="mb-3 flex items-center gap-2">
      <span class="font-mono text-sm font-bold text-slate-700">app.js</span>
      <span class="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">~350 lines</span>
      <span class="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">6 concerns</span>
    </div>

    <div class="space-y-3">
      {#each godFileSections as section}
        <button
          onclick={() => toggleSection(section.id)}
          class="w-full rounded-lg border-2 p-4 text-left transition-all
            {advShowResult
              ? (advSelections[section.id] && section.shouldExtract)
                ? 'border-green-400 bg-green-50'
                : (advSelections[section.id] && !section.shouldExtract)
                  ? 'border-red-400 bg-red-50'
                  : (!advSelections[section.id] && section.shouldExtract)
                    ? 'border-amber-400 bg-amber-50'
                    : 'border-green-400 bg-green-50'
              : advSelections[section.id]
                ? 'border-indigo-400 bg-indigo-50'
                : 'border-slate-200 bg-white hover:border-indigo-200'}"
        >
          <div class="mb-1 flex items-center gap-2">
            <div class="flex h-5 w-5 items-center justify-center rounded border-2 {advSelections[section.id] ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'}">
              {#if advSelections[section.id]}
                <svg class="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              {/if}
            </div>
            <span class="font-bold text-slate-800">{section.label}</span>
            {#if advShowResult && section.shouldExtract}
              <span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-mono text-slate-600">
                → {section.concern}
              </span>
            {/if}
          </div>
          <pre class="mt-2 rounded bg-slate-900 p-2 text-xs leading-relaxed text-slate-300 overflow-x-auto"><code>{section.code}</code></pre>
        </button>
      {/each}
    </div>
  </div>

  {#if !advShowResult}
    <div>
      <button
        onclick={checkAdvanced}
        disabled={!advAllChecked}
        class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Check My Selections
      </button>
    </div>
  {/if}

  {#if advShowResult}
    <div class="rounded-xl border-2 {advAllCorrect ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'} p-5">
      <p class="font-bold {advAllCorrect ? 'text-green-700' : 'text-amber-700'}">
        {advAllCorrect
          ? 'Excellent! You correctly identified all sections that should be extracted.'
          : `${advCorrectCount} of ${godFileSections.length} correct. Every section in this god file handles a distinct concern and should be its own module.`}
      </p>
      {#if advAllCorrect}
        <div class="mt-3">
          <p class="mb-2 text-sm text-slate-600">After refactoring, your project would look like:</p>
          <pre class="code-block"><code>{@html `<span class="cmt">src/</span>
  <span class="str">app.js</span>           <span class="cmt">// just wires everything together</span>
  <span class="str">database.js</span>      <span class="cmt">// connection setup</span>
  <span class="str">authService.js</span>   <span class="cmt">// login, logout, hashing</span>
  <span class="str">validation.js</span>    <span class="cmt">// input validators</span>
  <span class="str">emailService.js</span>  <span class="cmt">// email sending</span>
  <span class="str">routes.js</span>        <span class="cmt">// route definitions</span>
  <span class="str">logger.js</span>        <span class="cmt">// logging config</span>`}</code></pre>
        </div>
      {/if}
    </div>

    <div class="flex gap-3">
      {#if !advAllCorrect}
        <button
          onclick={resetAdvanced}
          class="rounded-full border-2 border-indigo-200 px-6 py-3 font-semibold text-indigo-700 transition-all hover:bg-indigo-50 active:scale-95"
        >
          Try Again
        </button>
      {/if}
      <button
        onclick={oncomplete}
        class="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
      >
        {advAllCorrect ? 'Continue' : 'Skip for now'}
      </button>
    </div>
  {/if}

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
