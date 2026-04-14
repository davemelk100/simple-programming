<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);

  const cards = [
    { emoji: '\uD83C\uDD94', title: 'Authentication', desc: 'Verifying WHO someone is. Like checking an ID badge at the door — "Are you really Alice?"' },
    { emoji: '\uD83D\uDD10', title: 'Authorization', desc: 'Determining WHAT a user can do. Like checking which rooms your badge opens — "Can Alice access admin settings?"' },
    { emoji: '\uD83C\uDF10', title: 'OAuth', desc: '"Sign in with Google/GitHub." Instead of managing passwords yourself, you let a trusted provider verify the user\'s identity.' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < cards.length) {
        visibleCards++;
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
    <p class="text-slate-600">
      Almost every app needs to know who is using it. A social media app needs to know whose profile to show. An email app needs to know whose inbox to open. <strong>Authentication</strong> is the process of verifying a user's identity, and <strong>authorization</strong> is deciding what that user is allowed to do.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    {#each cards as card, i}
      <div
        class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5 text-center transition-all duration-700
          {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
      >
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
    <h3 class="mb-2 font-bold text-slate-800">Metaphor: The ID Badge</h3>
    <p class="text-sm text-slate-600">
      Think of a building with restricted areas. When you arrive, security checks your ID badge to confirm you are who you claim to be — that is <strong>authentication</strong>. Then the badge determines which rooms you can enter: regular employees can access the office, but only managers can enter the server room — that is <strong>authorization</strong>. Authentication is your ID badge; authorization is which doors your badge opens.
    </p>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Key Concepts</h3>

    <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5 space-y-4">
      <div>
        <h4 class="font-bold text-slate-800">Sessions vs. Tokens</h4>
        <p class="text-sm text-slate-600">After you log in, the server needs to remember you. There are two main approaches:</p>
        <ul class="mt-2 space-y-2 text-sm text-slate-600">
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
            <span><strong>Sessions:</strong> The server stores your login info and gives you a session ID (stored in a cookie). Each request sends the cookie, and the server looks up your session. Simple and secure, but the server must store session data.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
            <span><strong>Tokens (JWT):</strong> The server creates a signed token containing your user info and sends it to you. You send it back with each request. The server verifies the signature without storing anything. Stateless and scalable, but harder to revoke.</span>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">OAuth ("Sign in with Google")</h4>
        <p class="text-sm text-slate-600">
          OAuth lets users log in using an account they already have (Google, GitHub, Apple). Your app never sees their password — the provider verifies their identity and tells your app "yes, this is alice@gmail.com." This is safer for everyone: users do not create yet another password, and you do not have to store and protect passwords.
        </p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800">Protected Routes</h4>
        <p class="text-sm text-slate-600">
          A protected route is a page that only logged-in users can see. If someone tries to visit <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">/dashboard</code> without being logged in, they get redirected to the login page. Your server checks for a valid session or token before showing the page.
        </p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">How a Login Works (Step by Step)</h3>
    <div class="flex flex-wrap items-center gap-2 text-sm">
      <span class="rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-slate-700">User enters credentials</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-orange-100 px-3 py-1.5 font-mono text-orange-700">Server verifies</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-orange-200 px-3 py-1.5 font-mono text-orange-800">Session/token created</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-green-100 px-3 py-1.5 font-mono text-green-700">User is logged in</span>
    </div>
    <p class="text-sm text-slate-500">
      The user submits email and password, the server checks them against the database (passwords are stored as hashes, never plain text), creates a session or token, and the user is in.
    </p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
    >
      I understand authentication
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <p class="text-slate-600">JWT internals, OAuth 2.0 flows, session security, RBAC, MFA, and auth providers.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">JWT Anatomy</h3>
      <p class="text-slate-600">
        A JSON Web Token (JWT) has three parts separated by dots: <strong>header.payload.signature</strong>. Each part is Base64-encoded JSON.
      </p>
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-orange-800">Header</h4>
          <p class="text-sm text-slate-600">Specifies the signing algorithm (e.g., HS256, RS256) and token type (JWT). Tells the server how to verify the signature.</p>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-orange-800">Payload</h4>
          <p class="text-sm text-slate-600">Contains "claims" — the actual data. Standard claims include <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">sub</code> (user ID), <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">exp</code> (expiration), <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">iat</code> (issued at). You can add custom claims like <code class="rounded bg-slate-100 px-1 text-sm text-orange-700">role</code>.</p>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-orange-800">Signature</h4>
          <p class="text-sm text-slate-600">Created by signing header + payload with a secret key. If anyone tampers with the payload, the signature will not match, and the server rejects the token.</p>
        </div>
      </div>
      <p class="text-sm text-slate-500">Important: JWTs are <strong>signed, not encrypted</strong>. Anyone can decode and read the payload. Never put sensitive data (passwords, secrets) in a JWT.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Refresh Tokens</h3>
      <p class="text-slate-600">
        Access tokens are short-lived (15 minutes to 1 hour). When one expires, the user should not have to log in again. A <strong>refresh token</strong> is a long-lived token stored securely (HttpOnly cookie) that can request a new access token. This pattern limits the damage if an access token is stolen — it expires quickly — while keeping the user logged in.
      </p>
      <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
        <p class="text-sm text-slate-600"><strong>Refresh token rotation:</strong> Each time a refresh token is used, the server issues a new one and invalidates the old one. If an attacker steals and uses the old token after the legitimate user already refreshed, the server detects the reuse and revokes all tokens for that user.</p>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">OAuth 2.0 Flows</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Authorization Code Flow</h4>
          <p class="text-sm text-slate-600">The standard flow for server-rendered apps. User is redirected to the provider, logs in, and is sent back with an authorization code. Your server exchanges the code for tokens. The tokens never touch the browser.</p>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Authorization Code + PKCE</h4>
          <p class="text-sm text-slate-600">For SPAs and mobile apps that cannot keep a client secret. PKCE (Proof Key for Code Exchange) adds a code verifier/challenge pair to prevent authorization code interception attacks. This is now the recommended flow for all public clients.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Session Storage: Cookies vs. localStorage</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">HttpOnly Cookies (Recommended)</h4>
          <ul class="space-y-1 text-sm text-slate-600">
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
              <span>Cannot be accessed by JavaScript (XSS-safe)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
              <span>Sent automatically with every request</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
              <span>Needs CSRF protection (SameSite attribute)</span>
            </li>
          </ul>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">localStorage</h4>
          <ul class="space-y-1 text-sm text-slate-600">
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
              <span>Easy to use — just set and get a string</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500"></span>
              <span>Vulnerable to XSS — any script can read it</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500"></span>
              <span>Must manually attach to requests (Authorization header)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">RBAC &amp; MFA</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Role-Based Access Control (RBAC)</h4>
          <p class="text-sm text-slate-600">Assign roles (admin, editor, viewer) to users. Each role has a set of permissions. Middleware checks if the user's role has permission for the requested action. Simpler than per-user permissions at scale.</p>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Multi-Factor Authentication (MFA)</h4>
          <p class="text-sm text-slate-600">Requires something you know (password) + something you have (phone/authenticator app) or something you are (biometrics). Even if a password is stolen, the attacker cannot log in without the second factor. TOTP (time-based one-time passwords) is the most common implementation.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Auth Providers</h3>
      <p class="text-slate-600">
        Building auth from scratch is error-prone. These services handle the hard parts:
      </p>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <p class="text-sm text-slate-600"><strong>Auth0</strong> — Enterprise-grade, supports every OAuth provider and custom flows. <strong>Clerk</strong> — Developer-friendly, beautiful pre-built UI components. <strong>Supabase Auth</strong> — Integrated with Supabase database, row-level security. <strong>NextAuth/Auth.js</strong> — Open-source, framework-agnostic, self-hosted.</p>
        </div>
        <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
          <p class="text-sm text-slate-600"><strong>When to use a provider:</strong> Almost always. Auth is security-critical, and providers handle password hashing, token rotation, rate limiting, brute-force protection, and compliance. Roll your own only if you have specific requirements that no provider meets.</p>
        </div>
      </div>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
      >
        I understand authentication
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a;
    color: #e2e8f0; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
