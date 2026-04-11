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

  // Staggered card animation
  let cardsVisible = $state([false, false, false, false]);
  onMount(() => {
    const timers = [
      setTimeout(() => (cardsVisible[0] = true), 200),
      setTimeout(() => (cardsVisible[1] = true), 450),
      setTimeout(() => (cardsVisible[2] = true), 700),
      setTimeout(() => (cardsVisible[3] = true), 950),
    ];
    return () => timers.forEach(clearTimeout);
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <p class="text-slate-600">
      Every computer system controls <strong>who can do what</strong>. Understanding permissions
      is essential for working on real servers, deploying applications, and keeping systems secure.
    </p>
  </div>

  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-purple-800">The Building Metaphor</h3>
    <p class="mb-4 text-slate-600">
      Think of a computer system like a <strong>building with many rooms</strong>. Not everyone
      gets the same keys. A regular employee can enter their office, but they cannot walk into
      the server room or the CEO's safe.
    </p>
    <ul class="space-y-2">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span class="text-slate-600"><strong>Regular users</strong> -- can enter their own room (read/write their own files)</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span class="text-slate-600"><strong>Team members</strong> -- can access shared spaces (group permissions)</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span class="text-slate-600"><strong>Admins (root)</strong> -- have the master key to every room</span>
      </li>
    </ul>
  </div>

  <!-- Permission cards -->
  <div>
    <h3 class="mb-4 text-lg font-bold text-slate-800">The Three Permissions</h3>
    <p class="mb-4 text-slate-600">
      Every file and folder on a Unix/Linux/Mac system has three basic permissions:
    </p>
    <div class="grid gap-4 sm:grid-cols-3">
      <div
        class="rounded-xl border-2 border-purple-200 bg-white p-5 text-center shadow-sm transition-all duration-500
          {cardsVisible[0] ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
      >
        <div class="mb-2 text-4xl">r</div>
        <h4 class="mb-1 font-bold text-slate-800">Read</h4>
        <p class="text-sm text-slate-600">View the contents of a file or list files in a directory. Like being able to look inside a room.</p>
      </div>
      <div
        class="rounded-xl border-2 border-purple-200 bg-white p-5 text-center shadow-sm transition-all duration-500
          {cardsVisible[1] ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
      >
        <div class="mb-2 text-4xl">w</div>
        <h4 class="mb-1 font-bold text-slate-800">Write</h4>
        <p class="text-sm text-slate-600">Modify or delete a file. Add or remove files from a directory. Like rearranging furniture in a room.</p>
      </div>
      <div
        class="rounded-xl border-2 border-purple-200 bg-white p-5 text-center shadow-sm transition-all duration-500
          {cardsVisible[2] ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
      >
        <div class="mb-2 text-4xl">x</div>
        <h4 class="mb-1 font-bold text-slate-800">Execute</h4>
        <p class="text-sm text-slate-600">Run a file as a program, or enter a directory. Like having the key to walk through a door.</p>
      </div>
    </div>
  </div>

  <!-- Why "Permission Denied" -->
  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-purple-800">Why "Permission Denied" Happens</h3>
    <p class="mb-3 text-slate-600">
      When you see <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">Permission denied</code>,
      it means you are trying to do something your user account is not authorized to do. Common causes:
    </p>
    <ul class="space-y-2">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span class="text-slate-600">Trying to edit a system file that belongs to <strong>root</strong></span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span class="text-slate-600">Running a script that does not have <strong>execute</strong> permission</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span class="text-slate-600">Accessing another user's private files</span>
      </li>
    </ul>
  </div>

  <!-- sudo -->
  <div class="rounded-xl border-2 border-violet-200 bg-violet-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-violet-800">sudo: Asking the Building Manager</h3>
    <p class="mb-3 text-slate-600">
      <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">sudo</code> stands for
      <strong>"superuser do"</strong>. It temporarily gives you admin powers to run a single command.
      Think of it as asking the building manager to unlock a door for you -- just this once.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Without sudo: Permission denied!</span>
<span class="var">$</span> <span class="fn">apt install</span> <span class="arg">nginx</span>
<span class="str">Error: Permission denied</span>

<span class="cmt"># With sudo: runs as admin</span>
<span class="var">$</span> <span class="kw">sudo</span> <span class="fn">apt install</span> <span class="arg">nginx</span>
<span class="str">[sudo] password for user: ****</span>
<span class="str">Installing nginx...</span>`}</code></pre>
  </div>

  <!-- SSH Keys -->
  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-purple-800">SSH Keys: Your Digital ID Card</h3>
    <p class="mb-3 text-slate-600">
      SSH keys let you securely log into remote servers <strong>without typing a password</strong>
      every time. They work like a digital ID badge:
    </p>
    <ul class="space-y-2">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span class="text-slate-600"><strong>Private key</strong> -- stays on your computer (like your actual ID card). Never share this.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span class="text-slate-600"><strong>Public key</strong> -- goes on the server (like giving a copy to building security). Safe to share.</span>
      </li>
    </ul>
    <p class="mt-3 text-sm text-slate-500">
      When you connect, the server checks if your private key matches the public key on file.
      If it matches, you are in -- no password needed.
    </p>
  </div>

  <div
    class="rounded-xl border-2 border-fuchsia-200 bg-fuchsia-50 p-5 transition-all duration-500
      {cardsVisible[3] ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
  >
    <p class="text-slate-700">
      The golden rule of permissions: <strong>give the minimum access needed</strong>.
      A web server does not need to read your personal documents. A deploy script does not need
      root access to everything. This principle -- called "least privilege" -- is the foundation
      of system security.
    </p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      Got it!
    </button>
  </div>
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Admin &amp; Permissions: Deep Dive</h2>
    <p class="text-slate-600">
      The Unix permission model, SSH internals, IAM roles, RBAC, and the principle of
      least privilege -- the security concepts that underpin real-world infrastructure.
    </p>
  </div>

  <!-- Unix Permission Model -->
  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-purple-800">Unix Permission Model (rwx &amp; Octal)</h3>
    <p class="mb-3 text-slate-600">
      Every file has permissions for three scopes: <strong>owner</strong> (u), <strong>group</strong> (g),
      and <strong>other</strong> (o). Each scope gets a combination of read, write, and execute bits.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Permission string breakdown</span>
<span class="str">-rwxr-xr--</span>  <span class="cmt">1 alice  devs  4096  config.sh</span>
<span class="var"> |||</span><span class="arg">|||</span><span class="op">|||</span>
<span class="var"> |||</span><span class="arg">|||</span><span class="op">||+--</span> other: read only (<span class="num">4</span>)
<span class="var"> |||</span><span class="arg">|||</span><span class="op">|+---</span> other: no write
<span class="var"> |||</span><span class="arg">|||</span><span class="op">+----</span> other: no execute
<span class="var"> |||</span><span class="arg">||+-----</span> group: execute (<span class="num">1</span>)
<span class="var"> |||</span><span class="arg">|+------</span> group: no write
<span class="var"> |||</span><span class="arg">+-------</span> group: read (<span class="num">4</span>)
<span class="var"> ||+--------</span> owner: execute (<span class="num">1</span>)
<span class="var"> |+---------</span> owner: write (<span class="num">2</span>)
<span class="var"> +----------</span> owner: read (<span class="num">4</span>)

<span class="cmt"># Octal notation: each digit = r(4) + w(2) + x(1)</span>
<span class="kw">chmod</span> <span class="num">754</span> <span class="arg">config.sh</span>  <span class="cmt"># rwxr-xr--</span>
<span class="cmt"># 7 = 4+2+1 (rwx) owner</span>
<span class="cmt"># 5 = 4+0+1 (r-x) group</span>
<span class="cmt"># 4 = 4+0+0 (r--) other</span>`}</code></pre>
  </div>

  <!-- User / Group / Other -->
  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-purple-800">User, Group, and Other</h3>
    <p class="mb-3 text-slate-600">
      Linux maps every process and file to a <strong>user ID (UID)</strong> and one or more
      <strong>group IDs (GID)</strong>. The kernel checks these at every file access:
    </p>
    <ul class="space-y-2">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span class="text-slate-600">If your UID matches the file's owner, the <strong>user</strong> bits apply</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span class="text-slate-600">Else if your GID matches the file's group, the <strong>group</strong> bits apply</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span class="text-slate-600">Otherwise, the <strong>other</strong> bits apply</span>
      </li>
    </ul>
    <pre class="code-block"><code>{@html `<span class="cmt"># Check your user and groups</span>
<span class="var">$</span> <span class="fn">id</span>
<span class="str">uid=1000(alice) gid=1000(alice) groups=1000(alice),27(sudo),999(docker)</span>

<span class="cmt"># Change file owner and group</span>
<span class="var">$</span> <span class="kw">sudo</span> <span class="fn">chown</span> <span class="arg">alice:devs</span> <span class="arg">deploy.sh</span>

<span class="cmt"># Add user to a group</span>
<span class="var">$</span> <span class="kw">sudo</span> <span class="fn">usermod</span> <span class="arg">-aG docker alice</span>`}</code></pre>
  </div>

  <!-- ACLs -->
  <div class="rounded-xl border-2 border-violet-200 bg-violet-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-violet-800">Access Control Lists (ACLs)</h3>
    <p class="mb-3 text-slate-600">
      Standard Unix permissions only support one owner and one group per file. <strong>ACLs</strong>
      extend this by allowing fine-grained rules for specific users and groups.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Grant bob read access to a file (beyond standard rwx)</span>
<span class="var">$</span> <span class="fn">setfacl</span> <span class="arg">-m u:bob:r</span> <span class="arg">secret.conf</span>

<span class="cmt"># View ACLs</span>
<span class="var">$</span> <span class="fn">getfacl</span> <span class="arg">secret.conf</span>
<span class="str"># file: secret.conf</span>
<span class="str"># owner: alice</span>
<span class="str"># group: devs</span>
<span class="str">user::rw-</span>
<span class="str">user:bob:r--</span>
<span class="str">group::r--</span>
<span class="str">other::---</span>`}</code></pre>
  </div>

  <!-- SSH Keys Deep Dive -->
  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-purple-800">SSH Key Generation &amp; Agent Forwarding</h3>
    <p class="mb-3 text-slate-600">
      SSH uses asymmetric cryptography. The private key never leaves your machine. Agent forwarding
      lets you use your local key on remote servers without copying it.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Generate an Ed25519 key (modern, recommended)</span>
<span class="var">$</span> <span class="fn">ssh-keygen</span> <span class="arg">-t ed25519 -C "alice@company.com"</span>
<span class="str">Generating public/private ed25519 key pair.</span>
<span class="str">Enter file: ~/.ssh/id_ed25519</span>

<span class="cmt"># Add key to SSH agent (avoids typing passphrase repeatedly)</span>
<span class="var">$</span> <span class="fn">eval</span> <span class="str">"$(ssh-agent -s)"</span>
<span class="var">$</span> <span class="fn">ssh-add</span> <span class="arg">~/.ssh/id_ed25519</span>

<span class="cmt"># Copy public key to a server</span>
<span class="var">$</span> <span class="fn">ssh-copy-id</span> <span class="arg">alice@server.example.com</span>

<span class="cmt"># Agent forwarding: use your local key on remote servers</span>
<span class="var">$</span> <span class="fn">ssh</span> <span class="arg">-A alice@jumpbox.example.com</span>
<span class="cmt"># Now from jumpbox, you can SSH to other servers</span>
<span class="cmt"># using your local key (it never leaves your machine)</span>`}</code></pre>
  </div>

  <!-- IAM Roles -->
  <div class="rounded-xl border-2 border-violet-200 bg-violet-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-violet-800">IAM Roles (AWS/GCP)</h3>
    <p class="mb-3 text-slate-600">
      Cloud platforms use <strong>Identity and Access Management (IAM)</strong> to control who
      can access which cloud resources. Instead of Unix-style file permissions, IAM uses
      <strong>policies</strong> attached to <strong>roles</strong>.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt">// AWS IAM Policy: allow reading S3 bucket only</span>
{
  <span class="str">"Version"</span>: <span class="str">"2012-10-17"</span>,
  <span class="str">"Statement"</span>: [{
    <span class="str">"Effect"</span>: <span class="str">"Allow"</span>,
    <span class="str">"Action"</span>: [
      <span class="str">"s3:GetObject"</span>,
      <span class="str">"s3:ListBucket"</span>
    ],
    <span class="str">"Resource"</span>: [
      <span class="str">"arn:aws:s3:::my-app-data"</span>,
      <span class="str">"arn:aws:s3:::my-app-data/*"</span>
    ]
  }]
}`}</code></pre>
  </div>

  <!-- RBAC -->
  <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-purple-800">Role-Based Access Control (RBAC)</h3>
    <p class="mb-3 text-slate-600">
      RBAC assigns permissions to <strong>roles</strong> rather than individual users. Users are
      then assigned roles. This scales much better than per-user permissions.
    </p>
    <ul class="space-y-2">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span class="text-slate-600"><strong>Viewer</strong> -- read-only access to resources</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span class="text-slate-600"><strong>Editor</strong> -- read and modify, but cannot delete or manage access</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
        <span class="text-slate-600"><strong>Admin</strong> -- full control, including managing other users' access</span>
      </li>
    </ul>
    <p class="mt-3 text-sm text-slate-500">
      Kubernetes, AWS, GCP, GitHub, and most SaaS platforms all implement RBAC.
    </p>
  </div>

  <!-- Principle of Least Privilege & Secrets Management -->
  <div class="rounded-xl border-2 border-fuchsia-200 bg-fuchsia-50 p-5">
    <h3 class="mb-3 text-lg font-bold text-fuchsia-800">Least Privilege &amp; Secrets Management</h3>
    <p class="mb-3 text-slate-600">
      The <strong>principle of least privilege</strong>: every user, process, and service should
      have only the minimum permissions necessary to do its job. Combined with proper secrets
      management, this dramatically reduces the blast radius of a security breach.
    </p>
    <ul class="space-y-2">
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-fuchsia-500"></span>
        <span class="text-slate-600"><strong>HashiCorp Vault</strong> -- centralized secrets storage with audit logging and automatic rotation</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-fuchsia-500"></span>
        <span class="text-slate-600"><strong>AWS Secrets Manager / GCP Secret Manager</strong> -- cloud-native secrets with IAM integration</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-fuchsia-500"></span>
        <span class="text-slate-600"><strong>OAuth/OIDC for service accounts</strong> -- short-lived tokens instead of permanent credentials</span>
      </li>
    </ul>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      Got it!
    </button>
  </div>
</div>

{/if}

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
