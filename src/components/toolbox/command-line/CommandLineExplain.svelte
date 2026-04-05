<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleSections = $state(0);

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleSections < 4) {
        visibleSections++;
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
    <h2 class="mb-3 text-2xl font-bold text-slate-800">The Command Line</h2>
    <p class="text-slate-600">
      The command line is like <strong>texting your computer</strong> instead of clicking buttons. Instead of navigating menus and dragging files around, you type short commands and press Enter. Your computer reads your message, does the work, and texts you back with the result.
    </p>
  </div>

  <!-- Anatomy of a command -->
  <div class="transition-all duration-700 {visibleSections >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
    <h3 class="mb-3 text-lg font-bold text-slate-800">Anatomy of a Command</h3>
    <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm">
      <div class="flex flex-wrap items-center gap-1 text-lg">
        <span class="rounded bg-green-700 px-2 py-1 text-green-200">ls</span>
        <span class="rounded bg-amber-700 px-2 py-1 text-amber-200">-la</span>
        <span class="rounded bg-sky-700 px-2 py-1 text-sky-200">Documents/</span>
      </div>
      <div class="mt-3 space-y-1">
        <div class="flex items-center gap-2 text-sm">
          <span class="inline-block h-2 w-2 rounded-full bg-green-400"></span>
          <span class="text-green-300 font-semibold">Command</span>
          <span class="text-slate-400">— what to do (list files)</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <span class="inline-block h-2 w-2 rounded-full bg-amber-400"></span>
          <span class="text-amber-300 font-semibold">Flags</span>
          <span class="text-slate-400">— how to do it (-l = long format, -a = show hidden)</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <span class="inline-block h-2 w-2 rounded-full bg-sky-400"></span>
          <span class="text-sky-300 font-semibold">Arguments</span>
          <span class="text-slate-400">— what to do it to (the Documents folder)</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Terminal vs Shell -->
  <div class="transition-all duration-700 {visibleSections >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
    <h3 class="mb-3 text-lg font-bold text-slate-800">Terminal vs Shell</h3>
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
        <div class="mb-1 text-sm font-bold text-green-700">Terminal</div>
        <p class="text-sm text-slate-600">The <strong>window</strong> where you type. Think of it as the texting app itself — it displays text and accepts your keyboard input.</p>
      </div>
      <div class="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4">
        <div class="mb-1 text-sm font-bold text-emerald-700">Shell</div>
        <p class="text-sm text-slate-600">The <strong>program</strong> running inside the terminal that interprets your commands. Popular shells include <strong>bash</strong> and <strong>zsh</strong>.</p>
      </div>
    </div>
  </div>

  <!-- Why developers prefer it -->
  <div class="transition-all duration-700 {visibleSections >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
    <h3 class="mb-3 text-lg font-bold text-slate-800">Why Developers Love It</h3>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg bg-green-50 p-3">
        <span class="mt-0.5 text-lg">&#9889;</span>
        <div><strong class="text-green-800">Speed</strong><span class="text-sm text-slate-600"> — Typing a command is often faster than navigating through menus and clicking buttons.</span></div>
      </div>
      <div class="flex items-start gap-3 rounded-lg bg-green-50 p-3">
        <span class="mt-0.5 text-lg">&#128257;</span>
        <div><strong class="text-green-800">Scriptable</strong><span class="text-sm text-slate-600"> — You can save a series of commands in a file and run them again and again automatically.</span></div>
      </div>
      <div class="flex items-start gap-3 rounded-lg bg-green-50 p-3">
        <span class="mt-0.5 text-lg">&#127760;</span>
        <div><strong class="text-green-800">Remote access</strong><span class="text-sm text-slate-600"> — You can control a computer on the other side of the world through the command line via SSH.</span></div>
      </div>
      <div class="flex items-start gap-3 rounded-lg bg-green-50 p-3">
        <span class="mt-0.5 text-lg">&#128170;</span>
        <div><strong class="text-green-800">Power</strong><span class="text-sm text-slate-600"> — Some operations are only available through the command line, or are much easier to express as commands.</span></div>
      </div>
    </div>
  </div>

  <!-- Key concepts -->
  <div class="transition-all duration-700 {visibleSections >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
    <h3 class="mb-3 text-lg font-bold text-slate-800">Key Concepts</h3>
    <div class="grid gap-3 sm:grid-cols-2">
      <div class="rounded-lg border border-slate-200 bg-white p-3">
        <span class="text-sm font-bold text-green-700">Directory</span>
        <p class="text-xs text-slate-500">A folder. Directories can contain files and other directories, forming a tree structure.</p>
      </div>
      <div class="rounded-lg border border-slate-200 bg-white p-3">
        <span class="text-sm font-bold text-green-700">Path</span>
        <p class="text-xs text-slate-500">The address of a file or directory. Like <code class="rounded bg-slate-100 px-1 text-xs text-green-700">/Users/alice/Documents/report.txt</code></p>
      </div>
      <div class="rounded-lg border border-slate-200 bg-white p-3">
        <span class="text-sm font-bold text-green-700">Flags / Options</span>
        <p class="text-xs text-slate-500">Modifiers that change how a command behaves. Usually start with <code class="rounded bg-slate-100 px-1 text-xs text-green-700">-</code> or <code class="rounded bg-slate-100 px-1 text-xs text-green-700">--</code></p>
      </div>
      <div class="rounded-lg border border-slate-200 bg-white p-3">
        <span class="text-sm font-bold text-green-700">Output</span>
        <p class="text-xs text-slate-500">The text a command prints back to you. This is how the computer "replies" to your command.</p>
      </div>
    </div>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
      I've read this
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-3 text-2xl font-bold text-slate-800">Command Line: Deep Dive</h2>
      <p class="text-slate-600">
        Beyond basic commands, the shell is a powerful programming environment. Understanding streams, pipes, process management, and configuration turns you from a command-line user into a command-line <strong>power user</strong>.
      </p>
    </div>

    <!-- stdin / stdout / stderr -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Standard Streams</h3>
      <p class="mb-3 text-sm text-slate-600">Every program has three built-in communication channels:</p>
      <div class="space-y-2">
        <div class="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-3">
          <div class="w-20 shrink-0 rounded bg-green-600 px-2 py-1 text-center text-xs font-bold text-white">stdin</div>
          <div class="text-sm text-slate-600">Standard input — data flowing <strong>into</strong> a program (keyboard by default, or piped from another command).</div>
        </div>
        <div class="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <div class="w-20 shrink-0 rounded bg-emerald-600 px-2 py-1 text-center text-xs font-bold text-white">stdout</div>
          <div class="text-sm text-slate-600">Standard output — normal results flowing <strong>out</strong> of a program (displayed in terminal by default).</div>
        </div>
        <div class="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-3">
          <div class="w-20 shrink-0 rounded bg-red-600 px-2 py-1 text-center text-xs font-bold text-white">stderr</div>
          <div class="text-sm text-slate-600">Standard error — error messages, kept separate from normal output so you can handle them differently.</div>
        </div>
      </div>
    </div>

    <!-- Pipes and Redirection -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Pipes &amp; Redirection</h3>
      <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm leading-relaxed">
        <div class="text-slate-400"># Pipe: send stdout of one command to stdin of the next</div>
        <div class="text-green-300">cat access.log | grep "404" | wc -l</div>
        <div class="mt-3 text-slate-400"># Redirect stdout to a file (overwrite)</div>
        <div class="text-green-300">echo "hello" &gt; output.txt</div>
        <div class="mt-3 text-slate-400"># Redirect stdout to a file (append)</div>
        <div class="text-green-300">echo "world" &gt;&gt; output.txt</div>
        <div class="mt-3 text-slate-400"># Redirect stderr to a file</div>
        <div class="text-green-300">command 2&gt; errors.log</div>
        <div class="mt-3 text-slate-400"># Redirect both stdout and stderr</div>
        <div class="text-green-300">command &gt; output.txt 2&gt;&amp;1</div>
        <div class="mt-3 text-slate-400"># Use a file as stdin</div>
        <div class="text-green-300">sort &lt; unsorted.txt</div>
      </div>
    </div>

    <!-- Environment Variables & PATH -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Environment Variables &amp; PATH</h3>
      <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm leading-relaxed">
        <div class="text-slate-400"># Set an environment variable</div>
        <div class="text-green-300">export API_KEY="abc123"</div>
        <div class="mt-3 text-slate-400"># Read it in a command</div>
        <div class="text-green-300">echo $API_KEY</div>
        <div class="mt-3 text-slate-400"># PATH tells the shell where to find programs</div>
        <div class="text-green-300">echo $PATH</div>
        <div class="text-slate-500"># /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin</div>
        <div class="mt-3 text-slate-400"># Add a directory to PATH</div>
        <div class="text-green-300">export PATH="$HOME/bin:$PATH"</div>
      </div>
      <p class="mt-2 text-sm text-slate-500">When you type a command like <code class="rounded bg-slate-100 px-1 text-sm text-green-700">git</code>, the shell searches each directory in <code class="rounded bg-slate-100 px-1 text-sm text-green-700">PATH</code> left to right until it finds a matching executable.</p>
    </div>

    <!-- Shell Config & Aliases -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Shell Config Files &amp; Aliases</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <div class="mb-1 text-sm font-bold text-green-700">.bashrc / .zshrc</div>
          <p class="text-xs text-slate-600">Runs every time you open a new terminal. Put your aliases, PATH changes, and custom settings here.</p>
        </div>
        <div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <div class="mb-1 text-sm font-bold text-green-700">.bash_profile / .zprofile</div>
          <p class="text-xs text-slate-600">Runs only for <strong>login</strong> shells. Used for one-time setup like environment variables.</p>
        </div>
      </div>
      <div class="mt-3 rounded-xl bg-slate-800 p-5 font-mono text-sm leading-relaxed">
        <div class="text-slate-400"># Aliases — shortcuts for long commands</div>
        <div class="text-green-300">alias ll="ls -la"</div>
        <div class="text-green-300">alias gs="git status"</div>
        <div class="text-green-300">alias ..="cd .."</div>
        <div class="mt-3 text-slate-400"># Shell functions for more complex shortcuts</div>
        <div class="text-green-300">mkcd() {'{'} mkdir -p "$1" && cd "$1"; {'}'}</div>
      </div>
    </div>

    <!-- Process Management & Job Control -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Process Management &amp; Job Control</h3>
      <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm leading-relaxed">
        <div class="text-slate-400"># Run a command in the background</div>
        <div class="text-green-300">long-running-task &amp;</div>
        <div class="mt-3 text-slate-400"># Suspend current process (Ctrl+Z), then resume in background</div>
        <div class="text-green-300">bg</div>
        <div class="mt-3 text-slate-400"># Bring a background job to the foreground</div>
        <div class="text-green-300">fg</div>
        <div class="mt-3 text-slate-400"># List running jobs</div>
        <div class="text-green-300">jobs</div>
        <div class="mt-3 text-slate-400"># Kill a process by PID</div>
        <div class="text-green-300">kill 12345</div>
        <div class="mt-3 text-slate-400"># List all processes</div>
        <div class="text-green-300">ps aux | grep node</div>
      </div>
    </div>

    <!-- Shell Scripting Basics -->
    <div>
      <h3 class="mb-3 text-lg font-bold text-slate-800">Shell Scripting Basics</h3>
      <div class="rounded-xl bg-slate-800 p-5 font-mono text-sm leading-relaxed">
        <div class="text-slate-400">#!/bin/bash</div>
        <div class="mt-2 text-slate-400"># Variables</div>
        <div class="text-green-300">NAME="World"</div>
        <div class="text-green-300">echo "Hello, $NAME!"</div>
        <div class="mt-2 text-slate-400"># Conditionals</div>
        <div class="text-green-300">if [ -f "config.txt" ]; then</div>
        <div class="text-green-300">  echo "Config found"</div>
        <div class="text-green-300">else</div>
        <div class="text-green-300">  echo "No config"</div>
        <div class="text-green-300">fi</div>
        <div class="mt-2 text-slate-400"># Loops</div>
        <div class="text-green-300">for file in *.txt; do</div>
        <div class="text-green-300">  echo "Processing $file"</div>
        <div class="text-green-300">done</div>
      </div>
    </div>

    <div>
      <button onclick={oncomplete} class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95">
        I've read this
      </button>
    </div>
  </div>
  {/if}
</div>
