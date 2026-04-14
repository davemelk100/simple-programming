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

{#if !advanced}
<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Admin &amp; Permissions Commands</h2>
    <p class="text-slate-600">
      The essential commands for managing users, permissions, and access on Unix/Linux/Mac systems.
    </p>
  </div>

  <!-- whoami and groups -->
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Who are you?</h3>
      <div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
        <ul class="space-y-2">
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
            <span class="text-slate-600"><strong>whoami</strong> -- shows your current username</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
            <span class="text-slate-600"><strong>groups</strong> -- shows which groups you belong to</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500"></span>
            <span class="text-slate-600"><strong>id</strong> -- shows your user ID, group ID, and all groups</span>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-semibold text-slate-500">Examples</h3>
      <pre class="code-block"><code>{@html `<span class="var">$</span> <span class="fn">whoami</span>
<span class="str">alice</span>

<span class="var">$</span> <span class="fn">groups</span>
<span class="str">alice sudo docker devs</span>

<span class="var">$</span> <span class="fn">id</span>
<span class="str">uid=1000(alice) gid=1000(alice)</span>
<span class="str">groups=27(sudo),999(docker)</span>`}</code></pre>
    </div>
  </div>

  <!-- chmod -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">chmod -- Change Permissions</h3>
    <p class="mb-2 text-sm text-slate-600">Controls who can read, write, and execute a file.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Make a script executable</span>
<span class="var">$</span> <span class="fn">chmod</span> <span class="arg">+x</span> <span class="arg">deploy.sh</span>

<span class="cmt"># Remove write permission for others</span>
<span class="var">$</span> <span class="fn">chmod</span> <span class="arg">o-w</span> <span class="arg">shared-file.txt</span>

<span class="cmt"># Set exact permissions with octal notation</span>
<span class="var">$</span> <span class="fn">chmod</span> <span class="num">755</span> <span class="arg">deploy.sh</span>    <span class="cmt"># rwxr-xr-x</span>
<span class="var">$</span> <span class="fn">chmod</span> <span class="num">644</span> <span class="arg">readme.txt</span>   <span class="cmt"># rw-r--r--</span>
<span class="var">$</span> <span class="fn">chmod</span> <span class="num">600</span> <span class="arg">secrets.env</span>  <span class="cmt"># rw------- (private!)</span>`}</code></pre>
  </div>

  <!-- Permission string reference -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Reading Permission Strings</h3>
    <p class="mb-2 text-sm text-slate-600">When you run <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">ls -la</code>, each file shows its permissions:</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># ls -la output breakdown</span>
<span class="str">-rwxr-xr--</span>  <span class="cmt">1 alice devs  4096 Mar 15 config.sh</span>
<span class="op">│</span><span class="var">│││</span><span class="arg">│││</span><span class="str">│││</span>
<span class="op">│</span><span class="var">│││</span><span class="arg">│││</span><span class="str">││└─</span> other: no execute
<span class="op">│</span><span class="var">│││</span><span class="arg">│││</span><span class="str">│└──</span> other: no write
<span class="op">│</span><span class="var">│││</span><span class="arg">│││</span><span class="str">└───</span> other: read
<span class="op">│</span><span class="var">│││</span><span class="arg">││└────</span> group: execute
<span class="op">│</span><span class="var">│││</span><span class="arg">│└─────</span> group: no write
<span class="op">│</span><span class="var">│││</span><span class="arg">└──────</span> group: read
<span class="op">│</span><span class="var">││└───────</span> owner: execute
<span class="op">│</span><span class="var">│└────────</span> owner: write
<span class="op">│</span><span class="var">└─────────</span> owner: read
<span class="op">└──────────</span> file type (- = file, d = directory)`}</code></pre>
  </div>

  <!-- chown -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">chown -- Change Ownership</h3>
    <p class="mb-2 text-sm text-slate-600">Changes who owns a file or which group it belongs to.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Change owner</span>
<span class="var">$</span> <span class="kw">sudo</span> <span class="fn">chown</span> <span class="arg">alice</span> <span class="arg">project.zip</span>

<span class="cmt"># Change owner and group</span>
<span class="var">$</span> <span class="kw">sudo</span> <span class="fn">chown</span> <span class="arg">alice:devs</span> <span class="arg">deploy.sh</span>

<span class="cmt"># Change ownership of entire directory</span>
<span class="var">$</span> <span class="kw">sudo</span> <span class="fn">chown</span> <span class="arg">-R alice:devs</span> <span class="arg">./project/</span>`}</code></pre>
  </div>

  <!-- sudo -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">sudo -- Run as Admin</h3>
    <p class="mb-2 text-sm text-slate-600">Temporarily elevates your privileges to run a single command as root.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Install software (requires admin)</span>
<span class="var">$</span> <span class="kw">sudo</span> <span class="fn">apt install</span> <span class="arg">nginx</span>

<span class="cmt"># Edit a system config file</span>
<span class="var">$</span> <span class="kw">sudo</span> <span class="fn">nano</span> <span class="arg">/etc/hosts</span>

<span class="cmt"># Restart a system service</span>
<span class="var">$</span> <span class="kw">sudo</span> <span class="fn">systemctl restart</span> <span class="arg">nginx</span>

<span class="cmt"># Check who you are when using sudo</span>
<span class="var">$</span> <span class="kw">sudo</span> <span class="fn">whoami</span>
<span class="str">root</span>`}</code></pre>
  </div>

  <!-- SSH commands -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">SSH -- Secure Remote Access</h3>
    <p class="mb-2 text-sm text-slate-600">Connect to remote servers and manage SSH keys.</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Generate a new SSH key</span>
<span class="var">$</span> <span class="fn">ssh-keygen</span> <span class="arg">-t ed25519 -C "you@email.com"</span>

<span class="cmt"># Connect to a remote server</span>
<span class="var">$</span> <span class="fn">ssh</span> <span class="arg">alice@server.example.com</span>

<span class="cmt"># Connect on a specific port</span>
<span class="var">$</span> <span class="fn">ssh</span> <span class="arg">-p 2222 alice@server.example.com</span>

<span class="cmt"># Copy your public key to a server</span>
<span class="var">$</span> <span class="fn">ssh-copy-id</span> <span class="arg">alice@server.example.com</span>

<span class="cmt"># Copy files to/from a server</span>
<span class="var">$</span> <span class="fn">scp</span> <span class="arg">file.txt alice@server:~/uploads/</span>
<span class="var">$</span> <span class="fn">scp</span> <span class="arg">alice@server:~/data.csv ./local/</span>`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-fuchsia-200 bg-fuchsia-50 p-5">
    <p class="text-sm text-slate-700">
      <strong>Quick reference:</strong>
      <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">chmod</code> changes permissions,
      <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">chown</code> changes ownership,
      <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">sudo</code> runs as admin,
      <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">ssh</code> connects to servers,
      <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">ssh-keygen</code> creates keys.
      These five commands handle 90% of permission tasks.
    </p>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Admin &amp; Permissions: Advanced</h2>
    <p class="text-slate-600">SSH config, GPG signing, IAM policies, Kubernetes RBAC, secrets management, and sudoers.</p>
  </div>

  <!-- SSH Config -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">SSH Config File</h3>
    <p class="mb-2 text-sm text-slate-600">
      Instead of typing long SSH commands, configure hosts in <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">~/.ssh/config</code>.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt"># ~/.ssh/config</span>

<span class="cmt"># Short alias for your production server</span>
<span class="kw">Host</span> <span class="var">prod</span>
    <span class="kw">HostName</span> <span class="str">203.0.113.50</span>
    <span class="kw">User</span> <span class="str">deploy</span>
    <span class="kw">Port</span> <span class="num">2222</span>
    <span class="kw">IdentityFile</span> <span class="str">~/.ssh/prod_ed25519</span>
    <span class="kw">ForwardAgent</span> <span class="str">yes</span>

<span class="cmt"># Jump through a bastion host</span>
<span class="kw">Host</span> <span class="var">internal-db</span>
    <span class="kw">HostName</span> <span class="str">10.0.1.50</span>
    <span class="kw">User</span> <span class="str">admin</span>
    <span class="kw">ProxyJump</span> <span class="str">bastion.example.com</span>

<span class="cmt"># Wildcard: all company servers</span>
<span class="kw">Host</span> <span class="var">*.company.internal</span>
    <span class="kw">User</span> <span class="str">alice</span>
    <span class="kw">IdentityFile</span> <span class="str">~/.ssh/company_ed25519</span>

<span class="cmt"># Now just type: ssh prod</span>
<span class="cmt"># Instead of: ssh -p 2222 -i ~/.ssh/prod_ed25519 deploy@203.0.113.50</span>`}</code></pre>
  </div>

  <!-- GPG Signing -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">GPG Commit Signing</h3>
    <p class="mb-2 text-sm text-slate-600">
      GPG keys prove that commits actually came from you, not someone impersonating your email.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Generate a GPG key</span>
<span class="var">$</span> <span class="fn">gpg</span> <span class="arg">--full-generate-key</span>

<span class="cmt"># List your keys (find the key ID)</span>
<span class="var">$</span> <span class="fn">gpg</span> <span class="arg">--list-secret-keys --keyid-format=long</span>
<span class="str">sec   ed25519/3AA5C34371567BD2 2026-01-15</span>
<span class="str">uid           Alice Developer &lt;alice@example.com&gt;</span>

<span class="cmt"># Tell Git to use your GPG key</span>
<span class="var">$</span> <span class="fn">git config</span> <span class="arg">--global user.signingkey</span> <span class="str">3AA5C34371567BD2</span>
<span class="var">$</span> <span class="fn">git config</span> <span class="arg">--global commit.gpgsign</span> <span class="str">true</span>

<span class="cmt"># Signed commits show "Verified" on GitHub</span>
<span class="var">$</span> <span class="fn">git log</span> <span class="arg">--show-signature -1</span>
<span class="str">gpg: Good signature from "Alice Developer"</span>`}</code></pre>
  </div>

  <!-- AWS IAM Policy -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">AWS IAM Policies</h3>
    <p class="mb-2 text-sm text-slate-600">
      IAM policies are JSON documents that define what actions are allowed on which resources.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt">// Deploy role: can update Lambda + read S3</span>
{
  <span class="str">"Version"</span>: <span class="str">"2012-10-17"</span>,
  <span class="str">"Statement"</span>: [
    {
      <span class="str">"Sid"</span>: <span class="str">"UpdateLambda"</span>,
      <span class="str">"Effect"</span>: <span class="str">"Allow"</span>,
      <span class="str">"Action"</span>: [
        <span class="str">"lambda:UpdateFunctionCode"</span>,
        <span class="str">"lambda:UpdateFunctionConfiguration"</span>
      ],
      <span class="str">"Resource"</span>: <span class="str">"arn:aws:lambda:us-east-1:123456:function:my-api"</span>
    },
    {
      <span class="str">"Sid"</span>: <span class="str">"ReadArtifacts"</span>,
      <span class="str">"Effect"</span>: <span class="str">"Allow"</span>,
      <span class="str">"Action"</span>: [<span class="str">"s3:GetObject"</span>],
      <span class="str">"Resource"</span>: <span class="str">"arn:aws:s3:::deploy-artifacts/*"</span>
    },
    {
      <span class="str">"Sid"</span>: <span class="str">"DenyDeleteBucket"</span>,
      <span class="str">"Effect"</span>: <span class="str">"Deny"</span>,
      <span class="str">"Action"</span>: [<span class="str">"s3:DeleteBucket"</span>],
      <span class="str">"Resource"</span>: <span class="str">"*"</span>
    }
  ]
}`}</code></pre>
  </div>

  <!-- Kubernetes RBAC -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Kubernetes RBAC</h3>
    <p class="mb-2 text-sm text-slate-600">
      Kubernetes uses Roles and RoleBindings to control who can do what in a cluster.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Role: what actions are allowed</span>
<span class="kw">apiVersion</span>: <span class="str">rbac.authorization.k8s.io/v1</span>
<span class="kw">kind</span>: <span class="str">Role</span>
<span class="kw">metadata</span>:
  <span class="kw">namespace</span>: <span class="str">production</span>
  <span class="kw">name</span>: <span class="str">pod-reader</span>
<span class="kw">rules</span>:
- <span class="kw">apiGroups</span>: [<span class="str">""</span>]
  <span class="kw">resources</span>: [<span class="str">"pods"</span>, <span class="str">"pods/log"</span>]
  <span class="kw">verbs</span>: [<span class="str">"get"</span>, <span class="str">"list"</span>, <span class="str">"watch"</span>]

<span class="cmt">---</span>
<span class="cmt"># RoleBinding: who gets the role</span>
<span class="kw">apiVersion</span>: <span class="str">rbac.authorization.k8s.io/v1</span>
<span class="kw">kind</span>: <span class="str">RoleBinding</span>
<span class="kw">metadata</span>:
  <span class="kw">namespace</span>: <span class="str">production</span>
  <span class="kw">name</span>: <span class="str">read-pods</span>
<span class="kw">subjects</span>:
- <span class="kw">kind</span>: <span class="str">User</span>
  <span class="kw">name</span>: <span class="str">alice</span>
<span class="kw">roleRef</span>:
  <span class="kw">kind</span>: <span class="str">Role</span>
  <span class="kw">name</span>: <span class="str">pod-reader</span>`}</code></pre>
  </div>

  <!-- Secrets Management -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">Secrets Management: .env vs Vault</h3>
    <p class="mb-2 text-sm text-slate-600">
      Hardcoding secrets is a security risk. Here are progressively better approaches.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt"># BAD: hardcoded in source code</span>
<span class="var">DB_PASSWORD</span> <span class="op">=</span> <span class="str">"hunter2"</span>  <span class="cmt"># DO NOT DO THIS</span>

<span class="cmt"># BETTER: .env file (add to .gitignore!)</span>
<span class="cmt"># .env</span>
<span class="var">DB_PASSWORD</span><span class="op">=</span><span class="str">s3cur3_p@ss</span>
<span class="var">API_KEY</span><span class="op">=</span><span class="str">sk-abc123...</span>

<span class="cmt"># GOOD: environment variables in CI/CD</span>
<span class="cmt"># Set in GitHub Actions, GitLab CI, etc.</span>
<span class="var">$</span> <span class="fn">echo</span> <span class="var">$DB_PASSWORD</span>  <span class="cmt"># set by deployment platform</span>

<span class="cmt"># BEST: secrets manager with rotation</span>
<span class="cmt"># HashiCorp Vault</span>
<span class="var">$</span> <span class="fn">vault kv get</span> <span class="arg">secret/myapp/database</span>
<span class="str">Key         Value</span>
<span class="str">---         -----</span>
<span class="str">password    auto-rotated-9fk2...</span>

<span class="cmt"># AWS Secrets Manager</span>
<span class="var">$</span> <span class="fn">aws secretsmanager get-secret-value</span> \\
    <span class="arg">--secret-id</span> <span class="str">prod/myapp/db-creds</span>`}</code></pre>
  </div>

  <!-- Sudoers -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">The sudoers File</h3>
    <p class="mb-2 text-sm text-slate-600">
      Controls which users can use sudo and what commands they can run. Always edit with <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">visudo</code> to prevent syntax errors that could lock you out.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt"># /etc/sudoers (edit with: sudo visudo)</span>

<span class="cmt"># alice can run ANY command as root</span>
<span class="var">alice</span>   <span class="arg">ALL=(ALL:ALL) ALL</span>

<span class="cmt"># deploy user can only restart nginx (no password)</span>
<span class="var">deploy</span>  <span class="arg">ALL=(root) NOPASSWD:</span> <span class="str">/usr/bin/systemctl restart nginx</span>

<span class="cmt"># devs group can run docker without password</span>
<span class="var">%devs</span>   <span class="arg">ALL=(root) NOPASSWD:</span> <span class="str">/usr/bin/docker *</span>

<span class="cmt"># Audit: log all sudo commands</span>
<span class="kw">Defaults</span>  <span class="str">logfile="/var/log/sudo.log"</span>
<span class="kw">Defaults</span>  <span class="str">log_input, log_output</span>`}</code></pre>
  </div>

  <!-- SSH Agent Forwarding -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">SSH Agent Forwarding</h3>
    <p class="mb-2 text-sm text-slate-600">
      Use your local SSH key on remote servers without copying it. Essential for bastion/jump host setups.
    </p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Enable agent forwarding for a connection</span>
<span class="var">$</span> <span class="fn">ssh</span> <span class="arg">-A alice@bastion.example.com</span>

<span class="cmt"># From bastion, you can now SSH further</span>
<span class="cmt"># using your LOCAL key (never copied to bastion)</span>
<span class="var">bastion$</span> <span class="fn">ssh</span> <span class="arg">alice@internal-server</span>

<span class="cmt"># Or configure permanently in ~/.ssh/config</span>
<span class="kw">Host</span> <span class="var">bastion</span>
    <span class="kw">HostName</span> <span class="str">bastion.example.com</span>
    <span class="kw">ForwardAgent</span> <span class="str">yes</span>

<span class="cmt"># Security note: only forward to servers you trust.</span>
<span class="cmt"># A compromised bastion could use your forwarded key.</span>`}</code></pre>
  </div>

  <div class="rounded-xl border-2 border-fuchsia-200 bg-fuchsia-50 p-5">
    <p class="text-sm text-slate-700">
      <strong>Security layers stack:</strong> SSH config simplifies access,
      GPG proves commit authorship, IAM policies restrict cloud resources,
      Kubernetes RBAC controls cluster access, secrets managers handle credentials,
      and sudoers limits root commands. Each layer reduces risk independently --
      if one fails, the others still protect you.
    </p>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95">
      Got it
    </button>
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
