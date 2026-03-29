<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();
</script>

<div class="space-y-8">
  {#if !advanced}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Authentication Code Patterns</h2>
    <p class="text-slate-600">The essential code for login forms, API routes, session management, and OAuth setup.</p>
  </div>

  <!-- Login Form -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Login Form</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">&lt;!-- A simple login form (React/Next.js example) --&gt;</span>
<span class="kw">export default function</span> <span class="fn">LoginPage</span>() {
  <span class="kw">async function</span> <span class="fn">handleSubmit</span>(<span class="var">e</span>: <span class="fn">FormEvent</span>) {
    <span class="var">e</span>.<span class="fn">preventDefault</span>()
    <span class="kw">const</span> <span class="var">form</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">FormData</span>(<span class="var">e</span>.<span class="var">target</span>)

    <span class="kw">const</span> <span class="var">res</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">'/api/login'</span>, {
      <span class="arg">method</span>: <span class="str">'POST'</span>,
      <span class="arg">headers</span>: { <span class="str">'Content-Type'</span>: <span class="str">'application/json'</span> },
      <span class="arg">body</span>: <span class="fn">JSON</span>.<span class="fn">stringify</span>({
        <span class="arg">email</span>: <span class="var">form</span>.<span class="fn">get</span>(<span class="str">'email'</span>),
        <span class="arg">password</span>: <span class="var">form</span>.<span class="fn">get</span>(<span class="str">'password'</span>),
      }),
    })

    <span class="kw">if</span> (<span class="var">res</span>.<span class="var">ok</span>) {
      <span class="var">window</span>.<span class="var">location</span>.<span class="var">href</span> <span class="op">=</span> <span class="str">'/dashboard'</span>
    }
  }

  <span class="kw">return</span> (
    <span class="op">&lt;</span><span class="var">form</span> <span class="arg">onSubmit</span><span class="op">=</span>{<span class="var">handleSubmit</span>}<span class="op">&gt;</span>
      <span class="op">&lt;</span><span class="var">input</span> <span class="arg">name</span><span class="op">=</span><span class="str">"email"</span>    <span class="arg">type</span><span class="op">=</span><span class="str">"email"</span>    <span class="arg">required</span> <span class="op">/&gt;</span>
      <span class="op">&lt;</span><span class="var">input</span> <span class="arg">name</span><span class="op">=</span><span class="str">"password"</span> <span class="arg">type</span><span class="op">=</span><span class="str">"password"</span> <span class="arg">required</span> <span class="op">/&gt;</span>
      <span class="op">&lt;</span><span class="var">button</span> <span class="arg">type</span><span class="op">=</span><span class="str">"submit"</span><span class="op">&gt;</span>Log In<span class="op">&lt;/</span><span class="var">button</span><span class="op">&gt;</span>
    <span class="op">&lt;/</span><span class="var">form</span><span class="op">&gt;</span>
  )
}`}</code></pre>
  </div>

  <!-- API Route -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">API Route: Verify &amp; Create Session</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// app/api/login/route.ts (Next.js App Router)</span>
<span class="kw">import</span> { <span class="var">compare</span> } <span class="kw">from</span> <span class="str">'bcrypt'</span>
<span class="kw">import</span> { <span class="var">cookies</span> } <span class="kw">from</span> <span class="str">'next/headers'</span>
<span class="kw">import</span> { <span class="var">prisma</span> } <span class="kw">from</span> <span class="str">'@/lib/db'</span>
<span class="kw">import</span> { <span class="var">createSession</span> } <span class="kw">from</span> <span class="str">'@/lib/session'</span>

<span class="kw">export async function</span> <span class="fn">POST</span>(<span class="var">request</span>: <span class="fn">Request</span>) {
  <span class="kw">const</span> { <span class="var">email</span>, <span class="var">password</span> } <span class="op">=</span> <span class="kw">await</span> <span class="var">request</span>.<span class="fn">json</span>()

  <span class="cmt">// 1. Find the user by email</span>
  <span class="kw">const</span> <span class="var">user</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">prisma</span>.<span class="var">user</span>.<span class="fn">findUnique</span>({
    <span class="arg">where</span>: { <span class="var">email</span> }
  })

  <span class="kw">if</span> (!<span class="var">user</span>) {
    <span class="kw">return</span> <span class="fn">Response</span>.<span class="fn">json</span>(
      { <span class="arg">error</span>: <span class="str">'Invalid credentials'</span> },
      { <span class="arg">status</span>: <span class="num">401</span> }
    )
  }

  <span class="cmt">// 2. Compare password against stored hash</span>
  <span class="kw">const</span> <span class="var">valid</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">compare</span>(<span class="var">password</span>, <span class="var">user</span>.<span class="var">passwordHash</span>)

  <span class="kw">if</span> (!<span class="var">valid</span>) {
    <span class="kw">return</span> <span class="fn">Response</span>.<span class="fn">json</span>(
      { <span class="arg">error</span>: <span class="str">'Invalid credentials'</span> },
      { <span class="arg">status</span>: <span class="num">401</span> }
    )
  }

  <span class="cmt">// 3. Create a session</span>
  <span class="kw">const</span> <span class="var">session</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">createSession</span>(<span class="var">user</span>.<span class="var">id</span>)

  <span class="cmt">// 4. Set session cookie</span>
  <span class="var">cookies</span>().<span class="fn">set</span>(<span class="str">'session'</span>, <span class="var">session</span>.<span class="var">id</span>, {
    <span class="arg">httpOnly</span>: <span class="num">true</span>,     <span class="cmt">// JavaScript cannot access</span>
    <span class="arg">secure</span>: <span class="num">true</span>,       <span class="cmt">// HTTPS only</span>
    <span class="arg">sameSite</span>: <span class="str">'lax'</span>,   <span class="cmt">// CSRF protection</span>
    <span class="arg">maxAge</span>: <span class="num">60</span> <span class="op">*</span> <span class="num">60</span> <span class="op">*</span> <span class="num">24</span> <span class="op">*</span> <span class="num">7</span>, <span class="cmt">// 7 days</span>
  })

  <span class="kw">return</span> <span class="fn">Response</span>.<span class="fn">json</span>({ <span class="arg">success</span>: <span class="num">true</span> })
}`}</code></pre>
    <p class="text-sm text-slate-500">Notice the error message says "Invalid credentials" for both wrong email and wrong password. This prevents attackers from discovering which emails exist in your system.</p>
  </div>

  <!-- Protecting a Route -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Protecting a Route with Middleware</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// middleware.ts (Next.js)</span>
<span class="kw">import</span> { <span class="var">NextResponse</span> } <span class="kw">from</span> <span class="str">'next/server'</span>
<span class="kw">import type</span> { <span class="fn">NextRequest</span> } <span class="kw">from</span> <span class="str">'next/server'</span>
<span class="kw">import</span> { <span class="var">verifySession</span> } <span class="kw">from</span> <span class="str">'@/lib/session'</span>

<span class="cmt">// Routes that require login</span>
<span class="kw">const</span> <span class="var">protectedRoutes</span> <span class="op">=</span> [<span class="str">'/dashboard'</span>, <span class="str">'/settings'</span>, <span class="str">'/profile'</span>]

<span class="kw">export async function</span> <span class="fn">middleware</span>(<span class="var">request</span>: <span class="fn">NextRequest</span>) {
  <span class="kw">const</span> <span class="var">path</span> <span class="op">=</span> <span class="var">request</span>.<span class="var">nextUrl</span>.<span class="var">pathname</span>

  <span class="cmt">// Check if this route needs protection</span>
  <span class="kw">if</span> (<span class="var">protectedRoutes</span>.<span class="fn">some</span>(<span class="var">r</span> <span class="op">=></span> <span class="var">path</span>.<span class="fn">startsWith</span>(<span class="var">r</span>))) {
    <span class="kw">const</span> <span class="var">sessionId</span> <span class="op">=</span> <span class="var">request</span>.<span class="var">cookies</span>.<span class="fn">get</span>(<span class="str">'session'</span>)

    <span class="kw">if</span> (!<span class="var">sessionId</span> <span class="op">||</span> !<span class="kw">await</span> <span class="fn">verifySession</span>(<span class="var">sessionId</span>.<span class="var">value</span>)) {
      <span class="cmt">// Not logged in — redirect to login</span>
      <span class="kw">return</span> <span class="var">NextResponse</span>.<span class="fn">redirect</span>(
        <span class="kw">new</span> <span class="fn">URL</span>(<span class="str">'/login'</span>, <span class="var">request</span>.<span class="var">url</span>)
      )
    }
  }

  <span class="kw">return</span> <span class="var">NextResponse</span>.<span class="fn">next</span>()
}`}</code></pre>
  </div>

  <!-- OAuth Redirect -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">OAuth Redirect Setup</h3>
    <pre class="code-block"><code>{@html `<span class="cmt">// "Sign in with Google" button handler</span>
<span class="kw">function</span> <span class="fn">signInWithGoogle</span>() {
  <span class="kw">const</span> <span class="var">params</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">URLSearchParams</span>({
    <span class="arg">client_id</span>: <span class="var">process</span>.<span class="var">env</span>.<span class="var">GOOGLE_CLIENT_ID</span>,
    <span class="arg">redirect_uri</span>: <span class="str">'http://localhost:3000/api/auth/callback'</span>,
    <span class="arg">response_type</span>: <span class="str">'code'</span>,
    <span class="arg">scope</span>: <span class="str">'openid email profile'</span>,
  })

  <span class="cmt">// Redirect user to Google's login page</span>
  <span class="var">window</span>.<span class="var">location</span>.<span class="var">href</span> <span class="op">=</span>
    <span class="str">'https://accounts.google.com/o/oauth2/v2/auth?'</span>
    <span class="op">+</span> <span class="var">params</span>.<span class="fn">toString</span>()
}

<span class="cmt">// After login, Google redirects back to your callback:</span>
<span class="cmt">// /api/auth/callback?code=AUTHORIZATION_CODE</span>
<span class="cmt">// Your server exchanges the code for tokens</span>`}</code></pre>
    <p class="text-sm text-slate-500">In practice, use a library like NextAuth or Auth.js to handle OAuth. The redirect flow involves many security details (state parameter, PKCE, token exchange) that libraries handle correctly.</p>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
    >
      I know the essential auth code
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Advanced Authentication Code</h2>
      <p class="text-slate-600">JWT creation and verification, refresh token rotation, middleware auth guards, and auth provider setup.</p>
    </div>

    <!-- JWT Creation/Verification -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">JWT Creation &amp; Verification</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">// lib/jwt.ts</span>
<span class="kw">import</span> { <span class="var">SignJWT</span>, <span class="var">jwtVerify</span> } <span class="kw">from</span> <span class="str">'jose'</span>

<span class="kw">const</span> <span class="var">secret</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">TextEncoder</span>().<span class="fn">encode</span>(
  <span class="var">process</span>.<span class="var">env</span>.<span class="var">JWT_SECRET</span>  <span class="cmt">// at least 32 characters</span>
)

<span class="cmt">// Create an access token</span>
<span class="kw">export async function</span> <span class="fn">createAccessToken</span>(<span class="var">userId</span>: <span class="fn">string</span>, <span class="var">role</span>: <span class="fn">string</span>) {
  <span class="kw">return new</span> <span class="fn">SignJWT</span>({ <span class="arg">sub</span>: <span class="var">userId</span>, <span class="arg">role</span> })
    .<span class="fn">setProtectedHeader</span>({ <span class="arg">alg</span>: <span class="str">'HS256'</span> })
    .<span class="fn">setIssuedAt</span>()
    .<span class="fn">setExpirationTime</span>(<span class="str">'15m'</span>)  <span class="cmt">// short-lived!</span>
    .<span class="fn">sign</span>(<span class="var">secret</span>)
}

<span class="cmt">// Verify and decode a token</span>
<span class="kw">export async function</span> <span class="fn">verifyToken</span>(<span class="var">token</span>: <span class="fn">string</span>) {
  <span class="kw">try</span> {
    <span class="kw">const</span> { <span class="var">payload</span> } <span class="op">=</span> <span class="kw">await</span> <span class="fn">jwtVerify</span>(<span class="var">token</span>, <span class="var">secret</span>)
    <span class="kw">return</span> <span class="var">payload</span>  <span class="cmt">// { sub, role, iat, exp }</span>
  } <span class="kw">catch</span> {
    <span class="kw">return null</span>  <span class="cmt">// expired or tampered</span>
  }
}`}</code></pre>
    </div>

    <!-- Refresh Token Rotation -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Refresh Token Rotation</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">// app/api/auth/refresh/route.ts</span>
<span class="kw">import</span> { <span class="var">prisma</span> } <span class="kw">from</span> <span class="str">'@/lib/db'</span>
<span class="kw">import</span> { <span class="var">createAccessToken</span> } <span class="kw">from</span> <span class="str">'@/lib/jwt'</span>
<span class="kw">import</span> { <span class="var">randomBytes</span> } <span class="kw">from</span> <span class="str">'crypto'</span>

<span class="kw">export async function</span> <span class="fn">POST</span>(<span class="var">request</span>: <span class="fn">Request</span>) {
  <span class="kw">const</span> <span class="var">refreshToken</span> <span class="op">=</span> <span class="var">request</span>.<span class="var">cookies</span>.<span class="fn">get</span>(<span class="str">'refresh_token'</span>)
  <span class="kw">if</span> (!<span class="var">refreshToken</span>) <span class="kw">return</span> <span class="kw">new</span> <span class="fn">Response</span>(<span class="str">'Unauthorized'</span>, { <span class="arg">status</span>: <span class="num">401</span> })

  <span class="cmt">// 1. Find the token in the database</span>
  <span class="kw">const</span> <span class="var">stored</span> <span class="op">=</span> <span class="kw">await</span> <span class="var">prisma</span>.<span class="var">refreshToken</span>.<span class="fn">findUnique</span>({
    <span class="arg">where</span>: { <span class="arg">token</span>: <span class="var">refreshToken</span>.<span class="var">value</span> },
    <span class="arg">include</span>: { <span class="arg">user</span>: <span class="num">true</span> }
  })

  <span class="cmt">// 2. Check if token exists and is not expired</span>
  <span class="kw">if</span> (!<span class="var">stored</span> <span class="op">||</span> <span class="var">stored</span>.<span class="var">expiresAt</span> <span class="op">&lt;</span> <span class="kw">new</span> <span class="fn">Date</span>()) {
    <span class="cmt">// Token reuse detected — revoke ALL tokens for this user</span>
    <span class="kw">if</span> (<span class="var">stored</span>?.<span class="var">used</span>) {
      <span class="kw">await</span> <span class="var">prisma</span>.<span class="var">refreshToken</span>.<span class="fn">deleteMany</span>({
        <span class="arg">where</span>: { <span class="arg">userId</span>: <span class="var">stored</span>.<span class="var">userId</span> }
      })
    }
    <span class="kw">return</span> <span class="kw">new</span> <span class="fn">Response</span>(<span class="str">'Unauthorized'</span>, { <span class="arg">status</span>: <span class="num">401</span> })
  }

  <span class="cmt">// 3. Mark old token as used (for reuse detection)</span>
  <span class="kw">await</span> <span class="var">prisma</span>.<span class="var">refreshToken</span>.<span class="fn">update</span>({
    <span class="arg">where</span>: { <span class="arg">id</span>: <span class="var">stored</span>.<span class="var">id</span> },
    <span class="arg">data</span>: { <span class="arg">used</span>: <span class="num">true</span> }
  })

  <span class="cmt">// 4. Issue new tokens (rotation)</span>
  <span class="kw">const</span> <span class="var">newRefresh</span> <span class="op">=</span> <span class="fn">randomBytes</span>(<span class="num">64</span>).<span class="fn">toString</span>(<span class="str">'hex'</span>)
  <span class="kw">await</span> <span class="var">prisma</span>.<span class="var">refreshToken</span>.<span class="fn">create</span>({
    <span class="arg">data</span>: {
      <span class="arg">token</span>: <span class="var">newRefresh</span>,
      <span class="arg">userId</span>: <span class="var">stored</span>.<span class="var">userId</span>,
      <span class="arg">expiresAt</span>: <span class="kw">new</span> <span class="fn">Date</span>(<span class="var">Date</span>.<span class="fn">now</span>() <span class="op">+</span> <span class="num">30</span> <span class="op">*</span> <span class="num">24</span> <span class="op">*</span> <span class="num">60</span> <span class="op">*</span> <span class="num">60</span> <span class="op">*</span> <span class="num">1000</span>)
    }
  })

  <span class="kw">const</span> <span class="var">accessToken</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">createAccessToken</span>(
    <span class="var">stored</span>.<span class="var">user</span>.<span class="var">id</span>, <span class="var">stored</span>.<span class="var">user</span>.<span class="var">role</span>
  )

  <span class="cmt">// 5. Return new access token + set new refresh cookie</span>
  <span class="kw">return</span> <span class="fn">Response</span>.<span class="fn">json</span>({ <span class="arg">accessToken</span> })
  <span class="cmt">// + set refresh_token cookie (HttpOnly, Secure)</span>
}`}</code></pre>
    </div>

    <!-- Middleware Auth Guard -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Middleware Auth Guard with RBAC</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">// lib/auth-guard.ts</span>
<span class="kw">import</span> { <span class="var">verifyToken</span> } <span class="kw">from</span> <span class="str">'@/lib/jwt'</span>
<span class="kw">import type</span> { <span class="fn">NextRequest</span> } <span class="kw">from</span> <span class="str">'next/server'</span>

<span class="kw">type</span> <span class="fn">Role</span> <span class="op">=</span> <span class="str">'admin'</span> <span class="op">|</span> <span class="str">'editor'</span> <span class="op">|</span> <span class="str">'viewer'</span>

<span class="kw">const</span> <span class="var">roleHierarchy</span>: <span class="fn">Record</span><span class="op">&lt;</span><span class="fn">Role</span>, <span class="fn">Role</span>[]<span class="op">&gt;</span> <span class="op">=</span> {
  <span class="arg">admin</span>:  [<span class="str">'admin'</span>, <span class="str">'editor'</span>, <span class="str">'viewer'</span>],
  <span class="arg">editor</span>: [<span class="str">'editor'</span>, <span class="str">'viewer'</span>],
  <span class="arg">viewer</span>: [<span class="str">'viewer'</span>],
}

<span class="kw">export async function</span> <span class="fn">requireRole</span>(
  <span class="var">request</span>: <span class="fn">NextRequest</span>,
  <span class="var">requiredRole</span>: <span class="fn">Role</span>
) {
  <span class="kw">const</span> <span class="var">authHeader</span> <span class="op">=</span> <span class="var">request</span>.<span class="var">headers</span>.<span class="fn">get</span>(<span class="str">'Authorization'</span>)
  <span class="kw">if</span> (!<span class="var">authHeader</span>?.<span class="fn">startsWith</span>(<span class="str">'Bearer '</span>)) <span class="kw">return null</span>

  <span class="kw">const</span> <span class="var">token</span> <span class="op">=</span> <span class="var">authHeader</span>.<span class="fn">slice</span>(<span class="num">7</span>)
  <span class="kw">const</span> <span class="var">payload</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">verifyToken</span>(<span class="var">token</span>)
  <span class="kw">if</span> (!<span class="var">payload</span>) <span class="kw">return null</span>

  <span class="kw">const</span> <span class="var">userRole</span> <span class="op">=</span> <span class="var">payload</span>.<span class="var">role</span> <span class="kw">as</span> <span class="fn">Role</span>
  <span class="kw">const</span> <span class="var">allowed</span> <span class="op">=</span> <span class="var">roleHierarchy</span>[<span class="var">userRole</span>]

  <span class="kw">if</span> (!<span class="var">allowed</span>?.<span class="fn">includes</span>(<span class="var">requiredRole</span>)) <span class="kw">return null</span>

  <span class="kw">return</span> <span class="var">payload</span>  <span class="cmt">// { sub, role, iat, exp }</span>
}`}</code></pre>
    </div>

    <!-- Supabase Auth -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Supabase Auth Setup</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">// lib/supabase.ts</span>
<span class="kw">import</span> { <span class="var">createClient</span> } <span class="kw">from</span> <span class="str">'@supabase/supabase-js'</span>

<span class="kw">export const</span> <span class="var">supabase</span> <span class="op">=</span> <span class="fn">createClient</span>(
  <span class="var">process</span>.<span class="var">env</span>.<span class="var">SUPABASE_URL</span>,
  <span class="var">process</span>.<span class="var">env</span>.<span class="var">SUPABASE_ANON_KEY</span>
)

<span class="cmt">// Sign up</span>
<span class="kw">const</span> { <span class="var">data</span>, <span class="var">error</span> } <span class="op">=</span> <span class="kw">await</span> <span class="var">supabase</span>.<span class="var">auth</span>.<span class="fn">signUp</span>({
  <span class="arg">email</span>: <span class="str">'alice@example.com'</span>,
  <span class="arg">password</span>: <span class="str">'securePassword123'</span>,
})

<span class="cmt">// Sign in</span>
<span class="kw">const</span> { <span class="var">data</span>, <span class="var">error</span> } <span class="op">=</span> <span class="kw">await</span> <span class="var">supabase</span>.<span class="var">auth</span>.<span class="fn">signInWithPassword</span>({
  <span class="arg">email</span>: <span class="str">'alice@example.com'</span>,
  <span class="arg">password</span>: <span class="str">'securePassword123'</span>,
})

<span class="cmt">// OAuth (Google)</span>
<span class="kw">const</span> { <span class="var">data</span>, <span class="var">error</span> } <span class="op">=</span> <span class="kw">await</span> <span class="var">supabase</span>.<span class="var">auth</span>.<span class="fn">signInWithOAuth</span>({
  <span class="arg">provider</span>: <span class="str">'google'</span>,
})

<span class="cmt">// Get current user</span>
<span class="kw">const</span> { <span class="var">data</span>: { <span class="var">user</span> } } <span class="op">=</span> <span class="kw">await</span> <span class="var">supabase</span>.<span class="var">auth</span>.<span class="fn">getUser</span>()

<span class="cmt">// Sign out</span>
<span class="kw">await</span> <span class="var">supabase</span>.<span class="var">auth</span>.<span class="fn">signOut</span>()`}</code></pre>
    </div>

    <!-- NextAuth Config -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">NextAuth / Auth.js Config</h3>
      <pre class="code-block"><code>{@html `<span class="cmt">// auth.ts (Auth.js v5)</span>
<span class="kw">import</span> <span class="var">NextAuth</span> <span class="kw">from</span> <span class="str">'next-auth'</span>
<span class="kw">import</span> <span class="var">Google</span> <span class="kw">from</span> <span class="str">'next-auth/providers/google'</span>
<span class="kw">import</span> <span class="var">GitHub</span> <span class="kw">from</span> <span class="str">'next-auth/providers/github'</span>
<span class="kw">import</span> <span class="var">Credentials</span> <span class="kw">from</span> <span class="str">'next-auth/providers/credentials'</span>
<span class="kw">import</span> { <span class="var">PrismaAdapter</span> } <span class="kw">from</span> <span class="str">'@auth/prisma-adapter'</span>
<span class="kw">import</span> { <span class="var">prisma</span> } <span class="kw">from</span> <span class="str">'@/lib/db'</span>

<span class="kw">export const</span> { <span class="var">handlers</span>, <span class="var">auth</span>, <span class="var">signIn</span>, <span class="var">signOut</span> } <span class="op">=</span> <span class="fn">NextAuth</span>({
  <span class="arg">adapter</span>: <span class="fn">PrismaAdapter</span>(<span class="var">prisma</span>),
  <span class="arg">providers</span>: [
    <span class="fn">Google</span>({
      <span class="arg">clientId</span>: <span class="var">process</span>.<span class="var">env</span>.<span class="var">GOOGLE_CLIENT_ID</span>,
      <span class="arg">clientSecret</span>: <span class="var">process</span>.<span class="var">env</span>.<span class="var">GOOGLE_CLIENT_SECRET</span>,
    }),
    <span class="fn">GitHub</span>({
      <span class="arg">clientId</span>: <span class="var">process</span>.<span class="var">env</span>.<span class="var">GITHUB_CLIENT_ID</span>,
      <span class="arg">clientSecret</span>: <span class="var">process</span>.<span class="var">env</span>.<span class="var">GITHUB_CLIENT_SECRET</span>,
    }),
  ],
  <span class="arg">callbacks</span>: {
    <span class="kw">async</span> <span class="fn">session</span>({ <span class="var">session</span>, <span class="var">user</span> }) {
      <span class="var">session</span>.<span class="var">user</span>.<span class="var">role</span> <span class="op">=</span> <span class="var">user</span>.<span class="var">role</span>  <span class="cmt">// Add role to session</span>
      <span class="kw">return</span> <span class="var">session</span>
    },
  },
})

<span class="cmt">// In a Server Component or API route:</span>
<span class="kw">const</span> <span class="var">session</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">auth</span>()
<span class="kw">if</span> (!<span class="var">session</span>) <span class="fn">redirect</span>(<span class="str">'/login'</span>)`}</code></pre>
      <p class="text-sm text-slate-500">Auth.js (NextAuth v5) handles sessions, JWT, OAuth redirects, CSRF protection, and database storage automatically. The PrismaAdapter syncs user/account/session data to your database.</p>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
      >
        I know the advanced auth code
      </button>
    </div>
  </div>
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
