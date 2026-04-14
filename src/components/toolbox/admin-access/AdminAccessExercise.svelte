<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  interface Props {
    oncomplete?: (score: number) => void;
  }
  let { oncomplete }: Props = $props();

  // === Basic mode state ===
  let c1Answer = $state('');
  let c1Result = $state<'correct' | 'wrong' | null>(null);

  let c2Answer = $state('');
  let c2Result = $state<'correct' | 'wrong' | null>(null);

  let c3Answer = $state('');
  let c3Result = $state<'correct' | 'wrong' | null>(null);

  let allDone = $derived(c1Result === 'correct' && c2Result === 'correct' && c3Result === 'correct');

  function checkC1() {
    c1Result = c1Answer.trim().toLowerCase() === 'sudo' ? 'correct' : 'wrong';
  }

  function checkC2() {
    const answer = c2Answer.trim().toLowerCase();
    c2Result = ['passwords', 'password', 'a password'].includes(answer) ? 'correct' : 'wrong';
  }

  function checkC3() {
    c3Result = c3Answer.trim().toLowerCase() === 'execute' ? 'correct' : 'wrong';
  }

  function handleComplete() {
    const score = [c1Result, c2Result, c3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (allDone) {
      handleComplete();
    }
  });

  // === Advanced mode state ===
  let adv1Answer = $state('');
  let adv1Result = $state<'correct' | 'wrong' | null>(null);

  let adv2Answer = $state('');
  let adv2Result = $state<'correct' | 'wrong' | null>(null);

  let adv3Answer = $state('');
  let adv3Result = $state<'correct' | 'wrong' | null>(null);

  let advAllDone = $derived(adv1Result === 'correct' && adv2Result === 'correct' && adv3Result === 'correct');

  function checkAdv1() {
    adv1Result = adv1Answer.trim() === '700' ? 'correct' : 'wrong';
  }

  function checkAdv2() {
    const answer = adv2Answer.trim().toLowerCase();
    adv2Result = ['least privilege', 'principle of least privilege'].includes(answer) ? 'correct' : 'wrong';
  }

  function checkAdv3() {
    adv3Result = adv3Answer.trim().toLowerCase() === 'chmod' ? 'correct' : 'wrong';
  }

  function handleAdvComplete() {
    const score = [adv1Result, adv2Result, adv3Result].filter((r) => r === 'correct').length;
    oncomplete?.(score);
  }

  $effect(() => {
    if (advAllDone) {
      handleAdvComplete();
    }
  });
</script>

{#if !advanced}
<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Admin &amp; Permissions</h2>
    <p class="text-slate-600">Test what you have learned about users, permissions, and system access!</p>
  </div>

  <!-- Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {c1Result === 'correct' ? 'border-green-300 bg-green-50' : c1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What command runs something with admin privileges?
    </p>
    <pre class="mb-3 code-block"><code>{@html `<span class="var">$</span> <span class="kw">???</span> <span class="fn">apt install</span> <span class="arg">nginx</span>
<span class="str">[???] password for user: ****</span>
<span class="str">Installing nginx...</span>`}</code></pre>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c1Answer}
        placeholder="Type the command"
        disabled={c1Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if c1Result !== 'correct'}
        <button onclick={checkC1} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">sudo</code> stands for "superuser do" and temporarily elevates your privileges.</p>
    {:else if c1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Not quite. Think about what you type before a command to run it as an administrator.</p>
    {/if}
  </div>

  <!-- Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {c2Result === 'correct' ? 'border-green-300 bg-green-50' : c2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What do SSH keys replace for server login?
    </p>
    <p class="mb-3 text-sm text-slate-500">
      Instead of typing these every time you connect to a server, SSH keys let you authenticate automatically.
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c2Answer}
        placeholder="Type the answer"
        disabled={c2Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if c2Result !== 'correct'}
        <button onclick={checkC2} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! SSH keys replace passwords -- they are more secure and more convenient for server access.</p>
    {:else if c2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Hint: what do you normally type to prove your identity when logging in?</p>
    {/if}
  </div>

  <!-- Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {c3Result === 'correct' ? 'border-green-300 bg-green-50' : c3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. In rwx permissions, what does 'x' stand for?
    </p>
    <pre class="mb-3 code-block"><code>{@html `<span class="str">-rwxr-xr--</span>  <span class="cmt">alice devs  deploy.sh</span>
<span class="cmt"> r = read</span>
<span class="cmt"> w = write</span>
<span class="cmt"> x = ???</span>`}</code></pre>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={c3Answer}
        placeholder="Type the answer"
        disabled={c3Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if c3Result !== 'correct'}
        <button onclick={checkC3} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if c3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">x</code> permission means the file can be run as a program, or a directory can be entered.</p>
    {:else if c3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Think about what you do when you run a script or program.</p>
    {/if}
  </div>

  {#if allDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All challenges complete!</p>
    </div>
  {/if}
</div>

{:else}

<div class="space-y-8">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Admin &amp; Permissions Advanced</h2>
    <p class="text-slate-600">Test your knowledge of octal permissions, security principles, and Unix commands.</p>
  </div>

  <!-- Advanced Challenge 1 -->
  <div class="rounded-xl border p-5 transition-colors {adv1Result === 'correct' ? 'border-green-300 bg-green-50' : adv1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      1. What octal value gives read+write+execute to owner only?
    </p>
    <pre class="mb-3 code-block"><code>{@html `<span class="cmt"># Octal: each digit = r(4) + w(2) + x(1)</span>
<span class="cmt"># Owner gets rwx, group gets ---, other gets ---</span>
<span class="var">$</span> <span class="fn">chmod</span> <span class="kw">???</span> <span class="arg">secret.sh</span>
<span class="cmt"># Result: -rwx------</span>`}</code></pre>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv1Answer}
        placeholder="3-digit octal"
        disabled={adv1Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv1Result !== 'correct'}
        <button onclick={checkAdv1} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv1Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">700</code> = owner gets 7 (4+2+1 = rwx), group gets 0 (---), other gets 0 (---).</p>
    {:else if adv1Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Remember: r=4, w=2, x=1. Owner needs all three (4+2+1=?). Group and other get nothing (0).</p>
    {/if}
  </div>

  <!-- Advanced Challenge 2 -->
  <div class="rounded-xl border p-5 transition-colors {adv2Result === 'correct' ? 'border-green-300 bg-green-50' : adv2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      2. What principle says users should only have the access they need?
    </p>
    <p class="mb-3 text-sm text-slate-500">
      This is the foundation of secure system design. A web server should not have access to your SSH keys.
      A deploy script should not have database admin rights. Every user and process should have the
      minimum permissions necessary.
    </p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv2Answer}
        placeholder="Type the principle"
        disabled={adv2Result === 'correct'}
        class="w-56 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv2Result !== 'correct'}
        <button onclick={checkAdv2} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv2Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! The principle of least privilege is fundamental to security -- give the minimum access required and nothing more.</p>
    {:else if adv2Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Hint: it is two words -- "___ privilege". Think about the minimum amount of access.</p>
    {/if}
  </div>

  <!-- Advanced Challenge 3 -->
  <div class="rounded-xl border p-5 transition-colors {adv3Result === 'correct' ? 'border-green-300 bg-green-50' : adv3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}">
    <p class="mb-3 font-medium text-slate-800">
      3. What command changes file permissions in Unix?
    </p>
    <pre class="mb-3 code-block"><code>{@html `<span class="cmt"># Make a script executable</span>
<span class="var">$</span> <span class="kw">???</span> <span class="arg">+x</span> <span class="arg">deploy.sh</span>

<span class="cmt"># Set specific octal permissions</span>
<span class="var">$</span> <span class="kw">???</span> <span class="num">644</span> <span class="arg">readme.txt</span>`}</code></pre>
    <div class="flex items-center gap-2">
      <input
        type="text"
        bind:value={adv3Answer}
        placeholder="Type the command"
        disabled={adv3Result === 'correct'}
        class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:opacity-50"
      />
      {#if adv3Result !== 'correct'}
        <button onclick={checkAdv3} class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 active:scale-95">
          Check
        </button>
      {/if}
    </div>
    {#if adv3Result === 'correct'}
      <p class="mt-2 text-sm font-medium text-green-600">Correct! <code class="rounded bg-slate-100 px-1 text-sm text-purple-700">chmod</code> (change mode) is the command for modifying file permissions.</p>
    {:else if adv3Result === 'wrong'}
      <p class="mt-2 text-sm text-red-600">Hint: it is short for "change mode".</p>
    {/if}
  </div>

  {#if advAllDone}
    <div>
      <p class="mb-3 text-lg font-bold text-green-600">All advanced challenges complete!</p>
    </div>
  {/if}
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
