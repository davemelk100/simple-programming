<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  // === Basic mode: Login Flow Simulator ===
  interface FlowStep {
    id: number;
    title: string;
    description: string;
    visual: string;
    detail: string;
  }

  const flowSteps: FlowStep[] = [
    {
      id: 1,
      title: 'User Enters Credentials',
      description: 'The user types their email and password into a login form.',
      visual: '\uD83D\uDCDD',
      detail: 'The login form sends an HTTP POST request to your server with the email and password. The password is sent over HTTPS so it is encrypted in transit.'
    },
    {
      id: 2,
      title: 'Server Checks Credentials',
      description: 'The server looks up the user by email and verifies the password hash.',
      visual: '\uD83D\uDD0D',
      detail: 'The server finds the user record in the database, then uses bcrypt (or similar) to compare the submitted password against the stored hash. It never stores or compares plain-text passwords.'
    },
    {
      id: 3,
      title: 'Session or Token Created',
      description: 'If credentials are valid, the server creates a session or signs a JWT token.',
      visual: '\uD83C\uDF9F\uFE0F',
      detail: 'For sessions: the server generates a random session ID, stores it in a database or cache (like Redis), and sends it to the browser as an HttpOnly cookie. For JWTs: the server signs a token containing the user ID and expiration time.'
    },
    {
      id: 4,
      title: 'User Redirected to Dashboard',
      description: 'The server responds with a redirect to the authenticated area.',
      visual: '\u27A1\uFE0F',
      detail: 'The server sends an HTTP 302 redirect to /dashboard (or whatever the app\'s main page is). The browser follows the redirect, and the session cookie or token is included automatically in the new request.'
    },
    {
      id: 5,
      title: 'Protected Route Checks Session',
      description: 'Every protected page verifies the session/token before rendering.',
      visual: '\uD83D\uDEE1\uFE0F',
      detail: 'Middleware runs before the page loads. It reads the session cookie (or Authorization header), verifies the session is valid and not expired, and either allows access or redirects to the login page. This check happens on every request to a protected route.'
    },
  ];

  let activeStep = $state(0);

  function selectStep(index: number) {
    activeStep = index;
  }

  function nextStep() {
    if (activeStep < flowSteps.length - 1) {
      activeStep++;
    }
  }

  function prevStep() {
    if (activeStep > 0) {
      activeStep--;
    }
  }

  // === Advanced mode: JWT Inspector ===
  const sampleJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMyIsImVtYWlsIjoiYWxpY2VAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk4MjI0MDAsImV4cCI6MTcwOTgyNjAwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  const jwtParts = sampleJWT.split('.');

  interface JWTPart {
    name: string;
    encoded: string;
    decoded: string;
    fields: { key: string; value: string; explanation: string }[];
  }

  const jwtSections: JWTPart[] = [
    {
      name: 'Header',
      encoded: jwtParts[0],
      decoded: '{\n  "alg": "HS256",\n  "typ": "JWT"\n}',
      fields: [
        { key: 'alg', value: 'HS256', explanation: 'The signing algorithm. HS256 = HMAC with SHA-256 (symmetric key). RS256 = RSA with SHA-256 (asymmetric — public/private key pair).' },
        { key: 'typ', value: 'JWT', explanation: 'The token type. Always "JWT" for JSON Web Tokens.' },
      ]
    },
    {
      name: 'Payload',
      encoded: jwtParts[1],
      decoded: '{\n  "sub": "user_123",\n  "email": "alice@example.com",\n  "role": "admin",\n  "iat": 1709822400,\n  "exp": 1709826000\n}',
      fields: [
        { key: 'sub', value: 'user_123', explanation: '"Subject" — the unique user identifier. This is how your app knows whose token it is.' },
        { key: 'email', value: 'alice@example.com', explanation: 'A custom claim with the user\'s email. You can add any data you want, but keep it small.' },
        { key: 'role', value: 'admin', explanation: 'A custom claim for authorization. The server checks this to decide what the user can do.' },
        { key: 'iat', value: '1709822400', explanation: '"Issued At" — Unix timestamp of when the token was created (March 7, 2024 16:00 UTC).' },
        { key: 'exp', value: '1709826000', explanation: '"Expiration" — Unix timestamp after which the token is invalid (1 hour after iat). The server rejects expired tokens.' },
      ]
    },
    {
      name: 'Signature',
      encoded: jwtParts[2],
      decoded: 'HMAC-SHA256(\n  base64UrlEncode(header) + "." +\n  base64UrlEncode(payload),\n  secret\n)',
      fields: [
        { key: 'algorithm', value: 'HMAC-SHA256', explanation: 'The header and payload are concatenated with a dot, then signed with the secret key using the algorithm specified in the header.' },
        { key: 'purpose', value: 'Integrity check', explanation: 'If anyone changes a single character in the header or payload, the signature will not match. The server recomputes the signature and compares — if they differ, the token is rejected.' },
        { key: 'secret', value: '(server-side only)', explanation: 'The secret key is known only to the server. With HS256, the same key signs and verifies. With RS256, a private key signs and a public key verifies.' },
      ]
    },
  ];

  let activeJWTSection = $state(0);
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Login Flow Simulator</h2>
    <p class="text-slate-600">
      Walk through each step of a login flow. Click the steps to understand what happens behind the scenes when a user logs in.
    </p>
  </div>

  <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-6 space-y-6">
    <!-- Flow steps as clickable timeline -->
    <div class="flex flex-wrap gap-2 justify-center">
      {#each flowSteps as step, i}
        <button
          onclick={() => selectStep(i)}
          class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all
            {i === activeStep ? 'bg-orange-600 text-white shadow-md scale-105' : i < activeStep ? 'bg-orange-200 text-orange-800' : 'bg-white text-slate-600 border border-orange-200'}
            hover:opacity-90 active:scale-95"
        >
          <span class="text-lg">{step.visual}</span>
          <span class="hidden sm:inline">{step.id}</span>
        </button>
        {#if i < flowSteps.length - 1}
          <span class="self-center text-orange-300">&#8594;</span>
        {/if}
      {/each}
    </div>

    <!-- Active step detail -->
    <div class="rounded-lg border-2 border-orange-300 bg-white p-6 space-y-3">
      <div class="flex items-center gap-3">
        <span class="text-3xl">{flowSteps[activeStep].visual}</span>
        <div>
          <p class="text-xs font-bold text-orange-600">Step {flowSteps[activeStep].id} of {flowSteps.length}</p>
          <h3 class="text-lg font-bold text-slate-800">{flowSteps[activeStep].title}</h3>
        </div>
      </div>
      <p class="text-slate-700">{flowSteps[activeStep].description}</p>
      <div class="rounded-lg bg-orange-50 p-4">
        <p class="text-sm text-slate-600"><strong>Under the hood:</strong> {flowSteps[activeStep].detail}</p>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between">
      <button
        onclick={prevStep}
        disabled={activeStep === 0}
        class="rounded-lg bg-white border border-orange-300 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50 active:scale-95 disabled:opacity-30"
      >
        Previous
      </button>
      <button
        onclick={nextStep}
        disabled={activeStep === flowSteps.length - 1}
        class="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:scale-95 disabled:opacity-30"
      >
        Next Step
      </button>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
    >
      I've explored the login flow
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: JWT Inspector</h2>
      <p class="text-slate-600">
        Inspect a real JWT token. Click each part (header, payload, signature) to decode it and understand what every field means.
      </p>
    </div>

    <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-6 space-y-6">
      <!-- JWT token display -->
      <div>
        <h4 class="mb-2 text-sm font-bold text-slate-700">Encoded JWT Token</h4>
        <div class="rounded-lg bg-slate-900 p-4 font-mono text-xs leading-relaxed break-all">
          {#each jwtParts as part, i}
            <button
              onclick={() => activeJWTSection = i}
              class="transition-all hover:opacity-80 {activeJWTSection === i ? 'ring-2 ring-offset-1 rounded' : ''}
                {i === 0 ? 'text-red-400 ring-red-400' : i === 1 ? 'text-purple-400 ring-purple-400' : 'text-cyan-400 ring-cyan-400'}"
            >{part}</button>{#if i < 2}<span class="text-slate-500">.</span>{/if}
          {/each}
        </div>
        <div class="mt-2 flex gap-4 text-xs">
          <span class="text-red-500 font-semibold">Header</span>
          <span class="text-purple-500 font-semibold">Payload</span>
          <span class="text-cyan-500 font-semibold">Signature</span>
        </div>
      </div>

      <!-- Decoded section -->
      <div class="rounded-lg border-2 {activeJWTSection === 0 ? 'border-red-300' : activeJWTSection === 1 ? 'border-purple-300' : 'border-cyan-300'} bg-white p-6 space-y-4">
        <div class="flex items-center gap-2">
          <span class="rounded px-2 py-0.5 text-sm font-bold text-white
            {activeJWTSection === 0 ? 'bg-red-500' : activeJWTSection === 1 ? 'bg-purple-500' : 'bg-cyan-500'}">
            {jwtSections[activeJWTSection].name}
          </span>
          <span class="text-xs text-slate-500">(Click the colored parts above to switch)</span>
        </div>

        <!-- Decoded JSON -->
        <div>
          <p class="text-xs font-bold text-slate-500 mb-1">Decoded:</p>
          <pre class="code-block text-xs"><code>{jwtSections[activeJWTSection].decoded}</code></pre>
        </div>

        <!-- Field explanations -->
        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-500">Field Details:</p>
          {#each jwtSections[activeJWTSection].fields as field}
            <div class="rounded-lg bg-slate-50 p-3">
              <div class="flex items-center gap-2 mb-1">
                <code class="rounded bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-800">{field.key}</code>
                <span class="text-xs text-slate-500">= {field.value}</span>
              </div>
              <p class="text-sm text-slate-600">{field.explanation}</p>
            </div>
          {/each}
        </div>
      </div>

      <!-- Section selector buttons -->
      <div class="flex gap-2">
        {#each jwtSections as section, i}
          <button
            onclick={() => activeJWTSection = i}
            class="flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-all active:scale-95
              {activeJWTSection === i
                ? (i === 0 ? 'bg-red-500 text-white' : i === 1 ? 'bg-purple-500 text-white' : 'bg-cyan-500 text-white')
                : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'}"
          >
            {section.name}
          </button>
        {/each}
      </div>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
      >
        I've inspected the JWT
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; color: #e2e8f0; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
