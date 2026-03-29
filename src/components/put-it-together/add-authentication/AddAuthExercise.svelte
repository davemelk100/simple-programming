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
    b1Result = (a === 'authentication' || a === 'auth') ? 'correct' : 'wrong';
  }

  function checkB2() {
    const a = b2Answer.trim().toLowerCase();
    b2Result = (a === 'authorization' || a === 'authorisation') ? 'correct' : 'wrong';
  }

  function checkB3() {
    const a = b3Answer.trim().toLowerCase();
    b3Result = (a === 'oauth' || a === 'oauth2' || a === 'oauth 2.0' || a === 'oauth2.0') ? 'correct' : 'wrong';
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
    const a = a1Answer.trim().toLowerCase().replace(/,/g, ' ').replace(/\s+/g, ' ');
    // Accept variations of "header payload signature"
    const hasHeader = a.includes('header');
    const hasPayload = a.includes('payload');
    const hasSignature = a.includes('signature');
    a1Result = (hasHeader && hasPayload && hasSignature) ? 'correct' : 'wrong';
  }

  function checkA2() {
    const a = a2Answer.trim().toLowerCase();
    a2Result = (a === 'samesite' || a === 'same site' || a === 'csrf token' || a === 'csrf tokens' || a === 'samesite attribute' || a === 'samesite cookie') ? 'correct' : 'wrong';
  }

  function checkA3() {
    const a = a3Answer.trim().toLowerCase();
    a3Result = (a === 'refresh token' || a === 'a refresh token' || a === 'refresh tokens') ? 'correct' : 'wrong';
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Authentication Basics</h2>
    <p class="text-slate-600">Answer all three questions correctly to complete this section. Type a single word or short phrase.</p>
  </div>

  <!-- Question 1 -->
  <div class="rounded-xl border-2 {b1Result === 'correct' ? 'border-green-300 bg-green-50' : b1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. Verifying WHO someone is called?</p>
    <p class="text-sm text-slate-500">Hint: It is like checking an ID badge at the door.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b1Answer}
        placeholder="Your answer..."
        disabled={b1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB1(); }}
      />
      <button
        onclick={checkB1}
        disabled={b1Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b1Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Authentication verifies a user's identity — confirming they are who they claim to be.</p>
    {:else if b1Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. This word means "proving your identity." It starts with "auth..." Try again!</p>
    {/if}
  </div>

  <!-- Question 2 -->
  <div class="rounded-xl border-2 {b2Result === 'correct' ? 'border-green-300 bg-green-50' : b2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What determines WHAT a user can do?</p>
    <p class="text-sm text-slate-500">Hint: It decides which rooms your badge opens.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b2Answer}
        placeholder="Your answer..."
        disabled={b2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB2(); }}
      />
      <button
        onclick={checkB2}
        disabled={b2Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b2Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! Authorization determines what actions and resources a verified user is permitted to access.</p>
    {:else if b2Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. This is about permissions and access control — what a user is "authorized" to do. Try again!</p>
    {/if}
  </div>

  <!-- Question 3 -->
  <div class="rounded-xl border-2 {b3Result === 'correct' ? 'border-green-300 bg-green-50' : b3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What lets you "Sign in with Google"?</p>
    <p class="text-sm text-slate-500">Hint: It is a protocol that lets third-party providers handle login.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={b3Answer}
        placeholder="Your answer..."
        disabled={b3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkB3(); }}
      />
      <button
        onclick={checkB3}
        disabled={b3Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if b3Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! OAuth allows users to log in using existing accounts from providers like Google, GitHub, or Apple.</p>
    {:else if b3Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about the "Open Authorization" protocol. Try again!</p>
    {/if}
  </div>

  {#if allDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You understand the fundamentals of authentication.</p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Practice: Advanced Authentication</h2>
    <p class="text-slate-600">Answer all three questions correctly. Type the answer as a word or phrase.</p>
  </div>

  <!-- Advanced Question 1 -->
  <div class="rounded-xl border-2 {a1Result === 'correct' ? 'border-green-300 bg-green-50' : a1Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">1. What are the 3 parts of a JWT?</p>
    <p class="text-sm text-slate-500">Hint: Separated by dots in the encoded token. Name all three.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a1Answer}
        placeholder="Your answer..."
        disabled={a1Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA1(); }}
      />
      <button
        onclick={checkA1}
        disabled={a1Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a1Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! A JWT consists of a header (algorithm + type), payload (claims/data), and signature (integrity check).</p>
    {:else if a1Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. List all three parts — the first tells the algorithm, the second holds the data, and the third proves it has not been tampered with. Try again!</p>
    {/if}
  </div>

  <!-- Advanced Question 2 -->
  <div class="rounded-xl border-2 {a2Result === 'correct' ? 'border-green-300 bg-green-50' : a2Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">2. What prevents CSRF attacks on auth cookies?</p>
    <p class="text-sm text-slate-500">Hint: It is a cookie attribute that controls when cookies are sent cross-site.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a2Answer}
        placeholder="Your answer..."
        disabled={a2Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA2(); }}
      />
      <button
        onclick={checkA2}
        disabled={a2Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a2Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! The SameSite cookie attribute (or CSRF tokens) prevents cross-site request forgery by ensuring cookies are only sent with same-origin requests.</p>
    {:else if a2Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. Think about a cookie attribute that controls whether the cookie is sent on requests from "the same site." Try again!</p>
    {/if}
  </div>

  <!-- Advanced Question 3 -->
  <div class="rounded-xl border-2 {a3Result === 'correct' ? 'border-green-300 bg-green-50' : a3Result === 'wrong' ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'} p-5 space-y-3">
    <p class="font-semibold text-slate-800">3. What refreshes an expired access token?</p>
    <p class="text-sm text-slate-500">Hint: It is a long-lived token that gets a new short-lived token without re-logging in.</p>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={a3Answer}
        placeholder="Your answer..."
        disabled={a3Result === 'correct'}
        class="flex-1 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none disabled:opacity-50"
        onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') checkA3(); }}
      />
      <button
        onclick={checkA3}
        disabled={a3Result === 'correct'}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-50"
      >
        Check
      </button>
    </div>
    {#if a3Result === 'correct'}
      <p class="text-sm font-semibold text-green-700">Correct! A refresh token is used to obtain a new access token when the current one expires, keeping the user logged in without re-entering credentials.</p>
    {:else if a3Result === 'wrong'}
      <p class="text-sm font-semibold text-red-700">Not quite. It is a type of token whose purpose is to "refresh" or renew the access token. Try again!</p>
    {/if}
  </div>

  {#if advAllDone}
    <div class="rounded-xl border-2 border-green-300 bg-green-50 p-5 text-center">
      <p class="text-lg font-bold text-green-700">All correct! You have strong knowledge of advanced authentication concepts.</p>
    </div>
  {/if}

  {/if}
</div>
