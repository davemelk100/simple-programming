<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // =============================================
  // BASIC MODE: Fake Terminal
  // =============================================

  interface FsNode {
    type: 'file' | 'dir';
    content?: string;
    children?: Record<string, FsNode>;
  }

  const filesystem: Record<string, FsNode> = {
    home: {
      type: 'dir',
      children: {
        'readme.txt': { type: 'file', content: 'Welcome to the command line!' },
        'notes.txt': { type: 'file', content: 'Remember to practice every day.' },
        projects: {
          type: 'dir',
          children: {
            'app.js': { type: 'file', content: 'console.log("Hello, world!");' },
            'style.css': { type: 'file', content: 'body { margin: 0; }' },
            images: {
              type: 'dir',
              children: {
                'logo.png': { type: 'file', content: '[binary image data]' },
                'banner.jpg': { type: 'file', content: '[binary image data]' },
              },
            },
          },
        },
        music: {
          type: 'dir',
          children: {
            'song.mp3': { type: 'file', content: '[audio data]' },
          },
        },
      },
    },
  };

  let cwd = $state('/home');
  let inputValue = $state('');
  let history = $state<{ type: 'input' | 'output' | 'error'; text: string }[]>([
    { type: 'output', text: 'Welcome to the Fake Terminal! Try: ls, cd, pwd, mkdir, cat' },
    { type: 'output', text: 'Type "help" for a list of commands.' },
  ]);

  function getNode(path: string): FsNode | null {
    const parts = path.split('/').filter(Boolean);
    let node: FsNode = { type: 'dir', children: filesystem };
    for (const part of parts) {
      if (node.type !== 'dir' || !node.children?.[part]) return null;
      node = node.children[part];
    }
    return node;
  }

  function resolvePath(input: string): string {
    if (input.startsWith('/')) return input;
    const parts = cwd.split('/').filter(Boolean);
    for (const seg of input.split('/')) {
      if (seg === '..') {
        if (parts.length > 0) parts.pop();
      } else if (seg !== '.' && seg !== '') {
        parts.push(seg);
      }
    }
    return '/' + parts.join('/');
  }

  function runCommand(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    history.push({ type: 'input', text: `${cwd} $ ${trimmed}` });

    const [cmd, ...args] = trimmed.split(/\s+/);
    const arg = args.join(' ');

    switch (cmd) {
      case 'help':
        history.push({ type: 'output', text: 'Available commands: ls, cd <dir>, pwd, mkdir <name>, cat <file>, echo <text>, clear' });
        break;
      case 'pwd':
        history.push({ type: 'output', text: cwd });
        break;
      case 'ls': {
        const target = arg ? resolvePath(arg) : cwd;
        const node = getNode(target);
        if (!node || node.type !== 'dir') {
          history.push({ type: 'error', text: `ls: ${arg || cwd}: Not a directory` });
        } else {
          const entries = Object.entries(node.children || {});
          if (entries.length === 0) {
            history.push({ type: 'output', text: '(empty directory)' });
          } else {
            const display = entries.map(([name, n]) => n.type === 'dir' ? name + '/' : name).join('  ');
            history.push({ type: 'output', text: display });
          }
        }
        break;
      }
      case 'cd': {
        if (!arg || arg === '~') {
          cwd = '/home';
        } else {
          const target = resolvePath(arg);
          const node = getNode(target);
          if (!node || node.type !== 'dir') {
            history.push({ type: 'error', text: `cd: ${arg}: No such directory` });
          } else {
            cwd = target;
          }
        }
        break;
      }
      case 'cat': {
        if (!arg) {
          history.push({ type: 'error', text: 'cat: missing file argument' });
        } else {
          const target = resolvePath(arg);
          const node = getNode(target);
          if (!node) {
            history.push({ type: 'error', text: `cat: ${arg}: No such file` });
          } else if (node.type === 'dir') {
            history.push({ type: 'error', text: `cat: ${arg}: Is a directory` });
          } else {
            history.push({ type: 'output', text: node.content || '' });
          }
        }
        break;
      }
      case 'mkdir': {
        if (!arg) {
          history.push({ type: 'error', text: 'mkdir: missing directory name' });
        } else {
          const parentPath = cwd;
          const parentNode = getNode(parentPath);
          if (parentNode && parentNode.type === 'dir' && parentNode.children) {
            if (parentNode.children[arg]) {
              history.push({ type: 'error', text: `mkdir: ${arg}: Already exists` });
            } else {
              parentNode.children[arg] = { type: 'dir', children: {} };
              history.push({ type: 'output', text: `Created directory: ${arg}` });
            }
          }
        }
        break;
      }
      case 'echo':
        history.push({ type: 'output', text: arg || '' });
        break;
      case 'clear':
        history = [];
        break;
      default:
        history.push({ type: 'error', text: `${cmd}: command not found` });
    }
    inputValue = '';
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      runCommand(inputValue);
    }
  }

  // =============================================
  // ADVANCED MODE: Pipe Builder
  // =============================================

  interface PipeStage {
    id: number;
    command: string;
  }

  const sampleData = `alice:engineering:95000
bob:marketing:72000
charlie:engineering:105000
diana:marketing:68000
eve:engineering:88000
frank:sales:91000
grace:engineering:110000
henry:sales:76000
iris:marketing:84000
jack:engineering:97000`;

  const availableCommands = [
    { label: 'cat data.txt', value: 'cat', desc: 'Output the raw file contents' },
    { label: 'grep "engineering"', value: 'grep-eng', desc: 'Keep only lines containing "engineering"' },
    { label: 'grep "marketing"', value: 'grep-mkt', desc: 'Keep only lines containing "marketing"' },
    { label: 'sort', value: 'sort', desc: 'Sort lines alphabetically' },
    { label: 'sort -t: -k3 -n', value: 'sort-num', desc: 'Sort by 3rd field (salary) numerically' },
    { label: 'head -5', value: 'head', desc: 'Show only the first 5 lines' },
    { label: 'tail -3', value: 'tail', desc: 'Show only the last 3 lines' },
    { label: 'wc -l', value: 'wc', desc: 'Count the number of lines' },
    { label: 'cut -d: -f1', value: 'cut-name', desc: 'Extract the first field (name)' },
    { label: 'cut -d: -f3', value: 'cut-salary', desc: 'Extract the third field (salary)' },
  ];

  let pipeStages = $state<PipeStage[]>([{ id: 0, command: 'cat' }]);
  let pipeNextId = $state(1);
  let selectedCommand = $state('grep-eng');

  function addPipeStage() {
    pipeStages.push({ id: pipeNextId++, command: selectedCommand });
  }

  function removePipeStage(id: number) {
    pipeStages = pipeStages.filter((s) => s.id !== id);
  }

  function applyCommand(input: string, cmd: string): string {
    const lines = input.split('\n').filter((l) => l.length > 0);
    switch (cmd) {
      case 'cat':
        return sampleData;
      case 'grep-eng':
        return lines.filter((l) => l.includes('engineering')).join('\n');
      case 'grep-mkt':
        return lines.filter((l) => l.includes('marketing')).join('\n');
      case 'sort':
        return [...lines].sort().join('\n');
      case 'sort-num': {
        return [...lines].sort((a, b) => {
          const aParts = a.split(':');
          const bParts = b.split(':');
          return Number(aParts[2] || 0) - Number(bParts[2] || 0);
        }).join('\n');
      }
      case 'head':
        return lines.slice(0, 5).join('\n');
      case 'tail':
        return lines.slice(-3).join('\n');
      case 'wc':
        return String(lines.length);
      case 'cut-name':
        return lines.map((l) => l.split(':')[0] || l).join('\n');
      case 'cut-salary':
        return lines.map((l) => l.split(':')[2] || l).join('\n');
      default:
        return input;
    }
  }

  let pipeResults = $derived.by(() => {
    const results: string[] = [];
    let current = '';
    for (const stage of pipeStages) {
      current = applyCommand(current, stage.command);
      results.push(current);
    }
    return results;
  });

  function getCommandLabel(value: string): string {
    return availableCommands.find((c) => c.value === value)?.label ?? value;
  }

  let pipelineString = $derived(
    pipeStages.map((s) => getCommandLabel(s.command)).join(' | ')
  );
</script>

{#if !advanced}
<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Fake Terminal</h2>
    <p class="text-slate-600">Type commands below and see what happens. This is a simulated filesystem — no real files will be changed!</p>
  </div>

  <!-- Terminal Window -->
  <div class="overflow-hidden rounded-xl border-2 border-green-300 bg-slate-900 shadow-lg">
    <!-- Title bar -->
    <div class="flex items-center gap-2 bg-slate-800 px-4 py-2">
      <span class="h-3 w-3 rounded-full bg-red-500"></span>
      <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
      <span class="h-3 w-3 rounded-full bg-green-500"></span>
      <span class="ml-3 text-xs text-slate-400">terminal</span>
    </div>

    <!-- Output area -->
    <div class="max-h-72 overflow-y-auto p-4 font-mono text-sm">
      {#each history as line}
        {#if line.type === 'input'}
          <div class="text-green-400">{line.text}</div>
        {:else if line.type === 'error'}
          <div class="text-red-400">{line.text}</div>
        {:else}
          <div class="text-slate-300 whitespace-pre-wrap">{line.text}</div>
        {/if}
      {/each}

      <!-- Input line -->
      <div class="mt-1 flex items-center gap-1">
        <span class="text-green-400">{cwd} $</span>
        <input
          type="text"
          bind:value={inputValue}
          onkeydown={handleKeydown}
          class="flex-1 border-none bg-transparent text-green-300 caret-green-400 focus:outline-none"
          placeholder="Type a command..."
          autocomplete="off"
          spellcheck="false"
        />
      </div>
    </div>
  </div>

  <!-- Hint cards -->
  <div class="grid gap-2 sm:grid-cols-3">
    <div class="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
      <code class="text-sm font-bold text-green-700">ls</code>
      <p class="text-xs text-slate-500">List files</p>
    </div>
    <div class="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
      <code class="text-sm font-bold text-green-700">cd projects</code>
      <p class="text-xs text-slate-500">Enter a directory</p>
    </div>
    <div class="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
      <code class="text-sm font-bold text-green-700">cat readme.txt</code>
      <p class="text-xs text-slate-500">View file contents</p>
    </div>
    <div class="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
      <code class="text-sm font-bold text-green-700">pwd</code>
      <p class="text-xs text-slate-500">Print working directory</p>
    </div>
    <div class="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
      <code class="text-sm font-bold text-green-700">mkdir stuff</code>
      <p class="text-xs text-slate-500">Create a directory</p>
    </div>
    <div class="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
      <code class="text-sm font-bold text-green-700">cd ..</code>
      <p class="text-xs text-slate-500">Go up one level</p>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      Done exploring
    </button>
  </div>
</div>

{:else}

<!-- ADVANCED MODE: Pipe Builder -->
<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Pipe Builder</h2>
    <p class="text-slate-600">Chain commands together with pipes. Pick commands, connect them, and watch data transform at each stage.</p>
  </div>

  <!-- Sample data display -->
  <div class="rounded-xl border border-slate-300 bg-slate-900 p-4">
    <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">data.txt (employee records: name:department:salary)</div>
    <pre class="text-xs leading-relaxed text-slate-300">{sampleData}</pre>
  </div>

  <!-- Pipeline display -->
  <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
    <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Your Pipeline</div>
    <div class="mb-3 rounded-lg bg-slate-800 px-4 py-2 font-mono text-sm text-green-300 overflow-x-auto">
      $ {pipelineString}
    </div>

    <!-- Stage list -->
    <div class="space-y-2">
      {#each pipeStages as stage, i (stage.id)}
        <div class="flex items-center gap-2">
          {#if i > 0}
            <span class="text-lg font-bold text-green-600">|</span>
          {/if}
          <span class="rounded bg-green-600 px-3 py-1 text-xs font-bold text-white">{getCommandLabel(stage.command)}</span>
          {#if pipeStages.length > 1}
            <button
              onclick={() => removePipeStage(stage.id)}
              class="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600 hover:bg-red-200 transition-colors"
            >
              remove
            </button>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Add stage -->
    <div class="mt-4 flex flex-wrap items-center gap-2">
      <span class="text-sm font-semibold text-green-700">Add stage:</span>
      <select
        bind:value={selectedCommand}
        class="rounded border border-green-300 bg-white px-3 py-1.5 text-sm text-green-800 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        {#each availableCommands as cmd}
          <option value={cmd.value}>{cmd.label} — {cmd.desc}</option>
        {/each}
      </select>
      <button
        onclick={addPipeStage}
        class="rounded-full bg-green-600 px-4 py-1.5 text-sm font-semibold text-white shadow transition-all hover:bg-green-700 active:scale-95"
      >
        + Add
      </button>
    </div>
  </div>

  <!-- Stage-by-stage output -->
  <div class="space-y-3">
    <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500">Output at each stage</h3>
    {#each pipeStages as stage, i (stage.id)}
      <div class="rounded-xl border border-slate-300 bg-slate-900 p-4">
        <div class="mb-1 text-xs font-semibold text-green-400">
          Stage {i + 1}: {getCommandLabel(stage.command)}
        </div>
        <pre class="max-h-40 overflow-y-auto text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">{pipeResults[i] || '(no output)'}</pre>
      </div>
    {/each}
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      Done exploring
    </button>
  </div>
</div>
{/if}
