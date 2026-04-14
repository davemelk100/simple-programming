<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();
</script>

{#if !advanced}
<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Essential Commands</h2>
    <p class="text-sm text-slate-600">The most common commands you'll use every day, organized by what they do.</p>
  </div>

  <!-- Navigation -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Navigation — Moving Around</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Print your current location</span>
<span class="cmd">pwd</span>
<span class="out">/Users/alice/projects</span>

<span class="cmt"># List files in current directory</span>
<span class="cmd">ls</span>
<span class="out">app.js  style.css  images/  README.md</span>

<span class="cmt"># List with details (permissions, size, date)</span>
<span class="cmd">ls -la</span>
<span class="out">drwxr-xr-x  4 alice  staff  128 Mar 15 10:30 images/</span>
<span class="out">-rw-r--r--  1 alice  staff  420 Mar 15 09:15 app.js</span>

<span class="cmt"># Change directory</span>
<span class="cmd">cd</span> <span class="arg">images</span>         <span class="cmt"># go into images/</span>
<span class="cmd">cd</span> <span class="arg">..</span>             <span class="cmt"># go up one level</span>
<span class="cmd">cd</span> <span class="arg">~</span>              <span class="cmt"># go to home directory</span>
<span class="cmd">cd</span> <span class="arg">/usr/local/bin</span>  <span class="cmt"># go to absolute path</span>`}</code></pre>
  </div>

  <!-- Creating & Deleting -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Files &amp; Directories — Creating, Copying, Moving</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Create an empty file</span>
<span class="cmd">touch</span> <span class="arg">notes.txt</span>

<span class="cmt"># Create a directory</span>
<span class="cmd">mkdir</span> <span class="arg">my-project</span>

<span class="cmt"># Create nested directories at once</span>
<span class="cmd">mkdir -p</span> <span class="arg">src/components/header</span>

<span class="cmt"># Copy a file</span>
<span class="cmd">cp</span> <span class="arg">notes.txt backup.txt</span>

<span class="cmt"># Copy a directory (recursive)</span>
<span class="cmd">cp -r</span> <span class="arg">my-project my-project-backup</span>

<span class="cmt"># Move or rename a file</span>
<span class="cmd">mv</span> <span class="arg">old-name.txt new-name.txt</span>

<span class="cmt"># Move a file into a directory</span>
<span class="cmd">mv</span> <span class="arg">notes.txt my-project/</span>

<span class="cmt"># Delete a file</span>
<span class="cmd">rm</span> <span class="arg">notes.txt</span>

<span class="cmt"># Delete a directory and everything inside</span>
<span class="cmd">rm -r</span> <span class="arg">my-project</span>`}</code></pre>
  </div>

  <!-- Viewing Content -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Viewing — Reading File Contents</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Display entire file contents</span>
<span class="cmd">cat</span> <span class="arg">notes.txt</span>
<span class="out">Remember to practice every day.</span>

<span class="cmt"># Print text to the terminal</span>
<span class="cmd">echo</span> <span class="str">"Hello, world!"</span>
<span class="out">Hello, world!</span>

<span class="cmt"># Show the first 10 lines of a file</span>
<span class="cmd">head</span> <span class="arg">long-file.txt</span>

<span class="cmt"># Show the last 10 lines</span>
<span class="cmd">tail</span> <span class="arg">long-file.txt</span>

<span class="cmt"># Scroll through a long file</span>
<span class="cmd">less</span> <span class="arg">long-file.txt</span>
<span class="cmt"># (press q to quit, space for next page)</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      Got it
    </button>
  </div>
</div>

{:else}

<div class="space-y-6">
  <div>
    <h2 class="mb-3 text-xl font-bold text-slate-800">Advanced Commands &amp; Techniques</h2>
    <p class="text-sm text-slate-600">Pipes, text processing, file permissions, networking, and shell scripting.</p>
  </div>

  <!-- Pipes and Redirection -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Pipes &amp; Redirection</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Pipe: feed output of one command into another</span>
<span class="cmd">cat</span> <span class="arg">server.log</span> | <span class="cmd">grep</span> <span class="str">"ERROR"</span> | <span class="cmd">wc -l</span>
<span class="out">42</span>

<span class="cmt"># Write output to a file (overwrite)</span>
<span class="cmd">ls -la</span> > <span class="arg">file-list.txt</span>

<span class="cmt"># Append output to a file</span>
<span class="cmd">echo</span> <span class="str">"new entry"</span> >> <span class="arg">log.txt</span>

<span class="cmt"># Use a file as input</span>
<span class="cmd">sort</span> < <span class="arg">unsorted.txt</span> > <span class="arg">sorted.txt</span>

<span class="cmt"># Redirect stderr separately</span>
<span class="cmd">npm build</span> > <span class="arg">output.log</span> 2> <span class="arg">errors.log</span>

<span class="cmt"># Discard output entirely</span>
<span class="cmd">command</span> > /dev/null 2>&1`}</code></pre>
  </div>

  <!-- grep, sed, awk -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Text Processing — grep, sed, awk</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># grep — search for patterns</span>
<span class="cmd">grep</span> <span class="str">"error"</span> <span class="arg">log.txt</span>          <span class="cmt"># find lines with "error"</span>
<span class="cmd">grep -i</span> <span class="str">"error"</span> <span class="arg">log.txt</span>       <span class="cmt"># case-insensitive</span>
<span class="cmd">grep -r</span> <span class="str">"TODO"</span> <span class="arg">src/</span>          <span class="cmt"># search recursively in directory</span>
<span class="cmd">grep -c</span> <span class="str">"error"</span> <span class="arg">log.txt</span>       <span class="cmt"># count matching lines</span>
<span class="cmd">grep -n</span> <span class="str">"error"</span> <span class="arg">log.txt</span>       <span class="cmt"># show line numbers</span>

<span class="cmt"># sed — stream editor (find & replace)</span>
<span class="cmd">sed</span> <span class="str">'s/old/new/g'</span> <span class="arg">file.txt</span>    <span class="cmt"># replace all "old" with "new"</span>
<span class="cmd">sed -i</span> <span class="str">'s/old/new/g'</span> <span class="arg">file.txt</span> <span class="cmt"># edit file in-place</span>
<span class="cmd">sed</span> <span class="str">'3d'</span> <span class="arg">file.txt</span>              <span class="cmt"># delete line 3</span>

<span class="cmt"># awk — column-based text processing</span>
<span class="cmd">awk</span> <span class="str">'{print $1}'</span> <span class="arg">file.txt</span>     <span class="cmt"># print first column</span>
<span class="cmd">awk -F:</span> <span class="str">'{print $1, $3}'</span> <span class="arg">data</span>  <span class="cmt"># use : as delimiter</span>
<span class="cmd">awk</span> <span class="str">'$3 > 100 {print}'</span> <span class="arg">data</span>   <span class="cmt"># filter by condition</span>`}</code></pre>
  </div>

  <!-- find, chmod -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">find &amp; File Permissions</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># find — locate files by name, type, date, etc.</span>
<span class="cmd">find</span> <span class="arg">.</span> -name <span class="str">"*.js"</span>            <span class="cmt"># all .js files in current tree</span>
<span class="cmd">find</span> <span class="arg">.</span> -type d -name <span class="str">"node_modules"</span>  <span class="cmt"># find directories</span>
<span class="cmd">find</span> <span class="arg">.</span> -name <span class="str">"*.log"</span> -delete   <span class="cmt"># find and delete</span>
<span class="cmd">find</span> <span class="arg">.</span> -size +10M               <span class="cmt"># files larger than 10MB</span>

<span class="cmt"># chmod — change file permissions</span>
<span class="cmd">chmod</span> <span class="num">755</span> <span class="arg">script.sh</span>   <span class="cmt"># rwx for owner, rx for group/others</span>
<span class="cmd">chmod +x</span> <span class="arg">script.sh</span>    <span class="cmt"># make executable</span>
<span class="cmd">chmod -R</span> <span class="num">644</span> <span class="arg">docs/</span>   <span class="cmt"># apply recursively</span>`}</code></pre>
  </div>

  <!-- curl, ssh -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Networking — curl &amp; ssh</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># curl — transfer data from URLs</span>
<span class="cmd">curl</span> <span class="arg">https://api.example.com/data</span>
<span class="cmd">curl -o</span> <span class="arg">file.zip https://example.com/file.zip</span>  <span class="cmt"># download</span>
<span class="cmd">curl -X POST</span> -d <span class="str">'{"name":"Alice"}'</span> \\
  -H <span class="str">"Content-Type: application/json"</span> \\
  <span class="arg">https://api.example.com/users</span>

<span class="cmt"># ssh — connect to remote machines</span>
<span class="cmd">ssh</span> <span class="arg">alice@server.example.com</span>
<span class="cmd">ssh -i</span> <span class="arg">~/.ssh/my-key.pem user@host</span>  <span class="cmt"># with key file</span>

<span class="cmt"># scp — copy files over SSH</span>
<span class="cmd">scp</span> <span class="arg">file.txt alice@server:/home/alice/</span>`}</code></pre>
  </div>

  <!-- Environment Variables -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Environment Variables</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># Set a variable (current session only)</span>
<span class="cmd">export</span> <span class="var">API_KEY</span>=<span class="str">"sk-abc123"</span>

<span class="cmt"># Read a variable</span>
<span class="cmd">echo</span> <span class="var">$API_KEY</span>

<span class="cmt"># Set for a single command only</span>
<span class="var">NODE_ENV</span>=<span class="str">production</span> <span class="cmd">node</span> <span class="arg">server.js</span>

<span class="cmt"># View all environment variables</span>
<span class="cmd">env</span>
<span class="cmd">printenv</span>

<span class="cmt"># Unset a variable</span>
<span class="cmd">unset</span> <span class="var">API_KEY</span>`}</code></pre>
  </div>

  <!-- Shell Scripting -->
  <div>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Shell Scripting — Variables, Loops, Conditionals</p>
    <pre class="code-block"><code>{@html `<span class="cmt">#!/bin/bash</span>

<span class="cmt"># Variables (no spaces around =)</span>
<span class="var">NAME</span>=<span class="str">"Alice"</span>
<span class="var">COUNT</span>=<span class="num">0</span>

<span class="cmt"># Conditionals</span>
<span class="kw">if</span> [ -f <span class="str">"config.json"</span> ]; <span class="kw">then</span>
  <span class="cmd">echo</span> <span class="str">"Config exists"</span>
<span class="kw">elif</span> [ -d <span class="str">"config/"</span> ]; <span class="kw">then</span>
  <span class="cmd">echo</span> <span class="str">"Config is a directory"</span>
<span class="kw">else</span>
  <span class="cmd">echo</span> <span class="str">"No config found"</span>
<span class="kw">fi</span>

<span class="cmt"># For loop</span>
<span class="kw">for</span> <span class="var">file</span> <span class="kw">in</span> *.txt; <span class="kw">do</span>
  <span class="cmd">echo</span> <span class="str">"Processing <span class="var">$file</span>"</span>
  <span class="cmd">wc -l</span> <span class="str">"<span class="var">$file</span>"</span>
<span class="kw">done</span>

<span class="cmt"># While loop</span>
<span class="kw">while</span> <span class="cmd">read</span> <span class="var">line</span>; <span class="kw">do</span>
  <span class="cmd">echo</span> <span class="str">"Line: <span class="var">$line</span>"</span>
<span class="kw">done</span> < <span class="arg">input.txt</span>

<span class="cmt"># Command substitution</span>
<span class="var">TODAY</span>=$(<span class="cmd">date</span> +%Y-%m-%d)
<span class="cmd">echo</span> <span class="str">"Backup created on <span class="var">$TODAY</span>"</span>`}</code></pre>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
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
  .code-block :global(.cmd) { color: #86efac; }
  .code-block :global(.arg) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.var) { color: #c4b5fd; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.out) { color: #94a3b8; }
</style>
