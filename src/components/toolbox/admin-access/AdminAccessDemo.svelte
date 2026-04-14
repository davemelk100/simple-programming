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

  // === Basic mode: Permission Checker ===
  interface FileEntry {
    name: string;
    permissions: string;
    owner: string;
    group: string;
    description: string;
  }

  const files: FileEntry[] = [
    { name: 'report.txt', permissions: 'rw-r--r--', owner: 'alice', group: 'devs', description: 'Project report' },
    { name: 'deploy.sh', permissions: 'rwxr-x---', owner: 'alice', group: 'devs', description: 'Deploy script' },
    { name: 'secrets.env', permissions: 'rw-------', owner: 'root', group: 'root', description: 'API keys' },
    { name: 'shared-notes.md', permissions: 'rw-rw-r--', owner: 'bob', group: 'devs', description: 'Team notes' },
  ];

  type UserRole = 'owner' | 'group' | 'other';
  type Action = 'read' | 'write' | 'execute';

  interface Challenge {
    fileIndex: number;
    role: UserRole;
    roleName: string;
    action: Action;
    correct: boolean;
  }

  const challenges: Challenge[] = [
    { fileIndex: 0, role: 'other', roleName: 'Everyone', action: 'read', correct: true },
    { fileIndex: 0, role: 'other', roleName: 'Everyone', action: 'write', correct: false },
    { fileIndex: 1, role: 'group', roleName: 'Team (devs)', action: 'execute', correct: true },
    { fileIndex: 2, role: 'group', roleName: 'Team (root)', action: 'read', correct: false },
    { fileIndex: 2, role: 'owner', roleName: 'root', action: 'write', correct: true },
    { fileIndex: 3, role: 'group', roleName: 'Team (devs)', action: 'write', correct: true },
    { fileIndex: 1, role: 'other', roleName: 'Everyone', action: 'read', correct: false },
    { fileIndex: 3, role: 'other', roleName: 'Everyone', action: 'write', correct: false },
  ];

  let currentChallenge = $state(0);
  let score = $state(0);
  let feedback = $state<'correct' | 'wrong' | null>(null);
  let gameComplete = $state(false);

  function answer(allowed: boolean) {
    const challenge = challenges[currentChallenge];
    if (allowed === challenge.correct) {
      score++;
      feedback = 'correct';
    } else {
      feedback = 'wrong';
    }
    setTimeout(() => {
      feedback = null;
      if (currentChallenge < challenges.length - 1) {
        currentChallenge++;
      } else {
        gameComplete = true;
      }
    }, 1000);
  }

  function getPermSegment(perms: string, role: UserRole): string {
    if (role === 'owner') return perms.slice(0, 3);
    if (role === 'group') return perms.slice(3, 6);
    return perms.slice(6, 9);
  }

  function hasPermission(perms: string, role: UserRole, action: Action): boolean {
    const segment = getPermSegment(perms, role);
    if (action === 'read') return segment[0] === 'r';
    if (action === 'write') return segment[1] === 'w';
    return segment[2] === 'x';
  }

  function resetGame() {
    currentChallenge = 0;
    score = 0;
    feedback = null;
    gameComplete = false;
  }

  // === Advanced mode: SSH Key Workflow ===
  let sshStep = $state(0);

  const sshSteps = [
    {
      title: 'Generate a Key Pair',
      description: 'Create a new SSH key pair using Ed25519 (modern and secure).',
      command: 'ssh-keygen -t ed25519 -C "you@example.com"',
      output: `Generating public/private ed25519 key pair.
Enter file in which to save the key (~/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Your identification has been saved in ~/.ssh/id_ed25519
Your public key has been saved in ~/.ssh/id_ed25519.pub`,
      note: 'Always set a passphrase for production keys. Ed25519 keys are shorter and faster than RSA.',
    },
    {
      title: 'Examine Your Keys',
      description: 'Your private key stays secret. Your public key can be shared freely.',
      command: 'cat ~/.ssh/id_ed25519.pub',
      output: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG7x... you@example.com',
      note: 'The public key is one line. It starts with the algorithm name. Never share your private key (the file without .pub).',
    },
    {
      title: 'Add to SSH Agent',
      description: 'The SSH agent holds your decrypted key in memory so you only type your passphrase once per session.',
      command: 'eval "$(ssh-agent -s)" && ssh-add ~/.ssh/id_ed25519',
      output: `Agent pid 12345
Identity added: /home/you/.ssh/id_ed25519 (you@example.com)`,
      note: 'On macOS, you can add "AddKeysToAgent yes" to ~/.ssh/config to auto-add keys.',
    },
    {
      title: 'Add Public Key to GitHub',
      description: 'Copy your public key and add it to GitHub > Settings > SSH Keys.',
      command: 'pbcopy < ~/.ssh/id_ed25519.pub  # macOS\n# or: xclip -sel clipboard < ~/.ssh/id_ed25519.pub  # Linux',
      output: '(Key copied to clipboard)',
      note: 'Paste this into GitHub > Settings > SSH and GPG keys > New SSH key. Give it a descriptive title like "Work Laptop 2026".',
    },
    {
      title: 'Test the Connection',
      description: 'Verify that GitHub recognizes your key.',
      command: 'ssh -T git@github.com',
      output: 'Hi username! You\'ve successfully authenticated, but GitHub does not provide shell access.',
      note: 'If this works, you can now clone, push, and pull over SSH instead of HTTPS. No more typing passwords.',
    },
    {
      title: 'Add to a Server',
      description: 'Copy your public key to a remote server for passwordless login.',
      command: 'ssh-copy-id user@server.example.com',
      output: `Number of key(s) added: 1
Now try logging into the machine with: ssh user@server.example.com`,
      note: 'This appends your public key to ~/.ssh/authorized_keys on the server. You can now SSH in without a password.',
    },
  ];

  function nextSshStep() {
    if (sshStep < sshSteps.length - 1) {
      sshStep++;
    }
  }

  function prevSshStep() {
    if (sshStep > 0) {
      sshStep--;
    }
  }

  function resetSsh() {
    sshStep = 0;
  }
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Permission Checker</h2>
    <p class="text-slate-600">
      Look at the file's permissions and decide: can this user perform this action?
    </p>
  </div>

  {#if !gameComplete}
    {@const challenge = challenges[currentChallenge]}
    {@const file = files[challenge.fileIndex]}

    <!-- Progress -->
    <div class="flex items-center gap-3">
      <span class="text-sm font-medium text-slate-500">Question {currentChallenge + 1} of {challenges.length}</span>
      <div class="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
        <div
          class="h-full rounded-full bg-purple-500 transition-all duration-300"
          style="width: {(currentChallenge / challenges.length) * 100}%"
        ></div>
      </div>
      <span class="text-sm font-semibold text-purple-600">{score} correct</span>
    </div>

    <!-- File display -->
    <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
      <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">File</h3>
      <div class="rounded-lg bg-slate-900 p-4 font-mono text-sm">
        <span class="text-slate-400">-</span><span class="text-purple-300">{file.permissions.slice(0,3)}</span><span class="text-blue-300">{file.permissions.slice(3,6)}</span><span class="text-green-300">{file.permissions.slice(6,9)}</span>
        <span class="text-slate-400"> {file.owner}</span>
        <span class="text-slate-400"> {file.group}</span>
        <span class="text-yellow-300"> {file.name}</span>
      </div>
      <div class="mt-2 flex gap-4 text-xs text-slate-500">
        <span><span class="inline-block h-2 w-2 rounded-full bg-purple-400"></span> owner ({file.owner})</span>
        <span><span class="inline-block h-2 w-2 rounded-full bg-blue-400"></span> group ({file.group})</span>
        <span><span class="inline-block h-2 w-2 rounded-full bg-green-400"></span> other</span>
      </div>
    </div>

    <!-- Question -->
    <div class="rounded-xl border-2 border-slate-200 bg-white p-5 {feedback === 'correct' ? 'border-green-300 bg-green-50' : feedback === 'wrong' ? 'border-red-300 bg-red-50' : ''}">
      <p class="mb-4 text-lg font-medium text-slate-800">
        Can <strong>{challenge.roleName}</strong> <strong>{challenge.action}</strong> this file?
      </p>

      {#if feedback === null}
        <div class="flex gap-3">
          <button
            onclick={() => answer(true)}
            class="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
          >
            Yes, Allowed
          </button>
          <button
            onclick={() => answer(false)}
            class="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-red-700 active:scale-95"
          >
            No, Denied
          </button>
        </div>
      {:else if feedback === 'correct'}
        <p class="text-lg font-semibold text-green-600">Correct!</p>
      {:else}
        <p class="text-sm font-semibold text-red-600">
          Not quite. The {challenge.role} permissions are "<code class="rounded bg-slate-100 px-1 text-sm text-red-700">{getPermSegment(file.permissions, challenge.role)}</code>"
          -- {challenge.action} is {challenge.correct ? 'allowed' : 'not allowed'}.
        </p>
      {/if}
    </div>

  {:else}

    <!-- Game complete -->
    <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-6 text-center">
      <h3 class="mb-2 text-2xl font-bold text-purple-800">Permission Check Complete!</h3>
      <p class="mb-4 text-lg text-slate-600">
        You scored <strong class="text-purple-700">{score}</strong> out of <strong>{challenges.length}</strong>
      </p>
      {#if score === challenges.length}
        <p class="mb-4 text-green-600 font-semibold">Perfect score! You understand Unix permissions.</p>
      {:else if score >= challenges.length * 0.75}
        <p class="mb-4 text-purple-600 font-semibold">Great job! You have a solid understanding of permissions.</p>
      {:else}
        <p class="mb-4 text-slate-600">Keep practicing -- reading permission strings gets easier with time.</p>
      {/if}
      <div class="flex justify-center gap-3">
        <button
          onclick={resetGame}
          class="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-95"
        >
          Try again
        </button>
        <button
          onclick={oncomplete}
          class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
        >
          Done exploring
        </button>
      </div>
    </div>
  {/if}

  {#if !gameComplete}
    <div class="rounded-xl border-2 border-fuchsia-200 bg-fuchsia-50 p-5">
      <p class="text-sm text-slate-700">
        <strong>How to read permissions:</strong> The 9 characters after the file type are split into
        three groups of three: <strong>owner</strong>, <strong>group</strong>, <strong>other</strong>.
        Each group shows <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">r</code> (read),
        <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">w</code> (write),
        <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">x</code> (execute), or
        <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">-</code> (denied).
      </p>
    </div>
  {/if}
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: SSH Key Workflow</h2>
    <p class="text-slate-600">
      Walk through the complete process of generating SSH keys and setting them up for GitHub
      and server access. Click through each step to reveal the commands.
    </p>
  </div>

  <!-- Step progress -->
  <div class="flex items-center gap-2">
    {#each sshSteps as step, i}
      <button
        onclick={() => (sshStep = i)}
        class="h-3 w-3 rounded-full transition-all {i === sshStep ? 'bg-purple-600 scale-125' : i < sshStep ? 'bg-purple-400' : 'bg-slate-300'}"
        aria-label="Step {i + 1}"
      ></button>
    {/each}
    <span class="ml-2 text-sm text-slate-500">Step {sshStep + 1} of {sshSteps.length}</span>
  </div>

  <!-- Current step -->
  {#each [sshSteps[sshStep]] as step}
  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 class="mb-2 text-lg font-bold text-purple-800">
      Step {sshStep + 1}: {step.title}
    </h3>
    <p class="mb-4 text-slate-600">{step.description}</p>

    <!-- Command -->
    <div>
      <h4 class="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">Command</h4>
      <pre class="code-block"><code>{@html `<span class="var">$</span> <span class="fn">${step.command.replace(/\n/g, '</span>\n<span class="var">$</span> <span class="fn">')}</span>`}</code></pre>
    </div>

    <!-- Output -->
    <div class="mt-4">
      <h4 class="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">Output</h4>
      <div class="rounded-lg bg-slate-900 p-4 font-mono text-sm text-green-400 whitespace-pre-wrap">{step.output}</div>
    </div>

    <!-- Note -->
    <div class="mt-4 rounded-lg border border-violet-200 bg-violet-50 p-3">
      <p class="text-sm text-slate-700">{step.note}</p>
    </div>
  </div>
  {/each}

  <!-- Navigation -->
  <div class="flex gap-3">
    <button
      onclick={prevSshStep}
      disabled={sshStep === 0}
      class="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      Previous
    </button>
    {#if sshStep < sshSteps.length - 1}
      <button
        onclick={nextSshStep}
        class="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
      >
        Next step
      </button>
    {:else}
      <button
        onclick={oncomplete}
        class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
      >
        Done exploring
      </button>
    {/if}
    <button
      onclick={resetSsh}
      class="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-95"
    >
      Restart
    </button>
  </div>

  <!-- Key comparison -->
  <div class="rounded-xl border-2 border-fuchsia-200 bg-fuchsia-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Public vs Private Key</h3>
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-lg border border-green-300 bg-green-50 p-4">
        <h4 class="mb-1 font-bold text-green-800">Public Key (.pub)</h4>
        <p class="mb-2 text-sm text-slate-600">Safe to share. Goes on servers and GitHub.</p>
        <div class="rounded bg-slate-900 p-2 font-mono text-xs text-green-400 break-all">
          ssh-ed25519 AAAAC3NzaC1lZDI1...
        </div>
      </div>
      <div class="rounded-lg border border-red-300 bg-red-50 p-4">
        <h4 class="mb-1 font-bold text-red-800">Private Key</h4>
        <p class="mb-2 text-sm text-slate-600">NEVER share. Stays on your machine only.</p>
        <div class="rounded bg-slate-900 p-2 font-mono text-xs text-red-400 break-all">
          -----BEGIN OPENSSH PRIVATE KEY-----<br>
          b3BlbnNzaC1rZXktdjEAAAA...
        </div>
      </div>
    </div>
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
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
