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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Code: Deploying Your App</h2>
    <p class="text-slate-600">Real configuration files and commands for deploying to popular platforms, setting up build scripts, and configuring custom domains.</p>
  </div>

  <!-- Package.json build scripts -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Build Scripts (package.json)</h3>
    <p class="text-sm text-slate-600">Your <code class="rounded bg-slate-100 px-1 text-pink-700">package.json</code> defines the scripts that build and run your project:</p>
    <pre class="code-block"><code>{@html `{
  <span class="str">"name"</span>: <span class="str">"my-app"</span>,
  <span class="str">"scripts"</span>: {
    <span class="str">"dev"</span>: <span class="str">"vite"</span>,               <span class="cmt">// local development server</span>
    <span class="str">"build"</span>: <span class="str">"vite build"</span>,       <span class="cmt">// production build</span>
    <span class="str">"preview"</span>: <span class="str">"vite preview"</span>,   <span class="cmt">// preview the build locally</span>
    <span class="str">"lint"</span>: <span class="str">"eslint src/"</span>,       <span class="cmt">// check code quality</span>
    <span class="str">"test"</span>: <span class="str">"vitest"</span>             <span class="cmt">// run tests</span>
  }
}`}</code></pre>
    <p class="text-sm text-slate-500">Hosting platforms look for the <code class="rounded bg-slate-100 px-1 text-pink-700">build</code> script to know how to compile your project. The output goes to a <code class="rounded bg-slate-100 px-1 text-pink-700">dist/</code> folder.</p>
  </div>

  <!-- Vercel -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Deploying to Vercel</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># Install the Vercel CLI</span>
<span class="kw">npm</span> <span class="fn">install</span> <span class="op">-g</span> <span class="var">vercel</span>

<span class="cmt"># Deploy from your project directory</span>
<span class="kw">vercel</span>

<span class="cmt"># Deploy to production</span>
<span class="kw">vercel</span> <span class="op">--prod</span>

<span class="cmt"># Or just push to GitHub — Vercel auto-deploys!</span>
<span class="kw">git push</span> <span class="var">origin</span> <span class="var">main</span>`}</code></pre>
    <p class="text-sm text-slate-500">Vercel automatically detects your framework (Next.js, Astro, SvelteKit, etc.) and configures the build settings for you.</p>
  </div>

  <!-- Netlify -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Deploying to Netlify</h3>
    <pre class="code-block"><code>{@html `<span class="cmt"># Install the Netlify CLI</span>
<span class="kw">npm</span> <span class="fn">install</span> <span class="op">-g</span> <span class="var">netlify-cli</span>

<span class="cmt"># Link your project to a Netlify site</span>
<span class="kw">netlify</span> <span class="fn">init</span>

<span class="cmt"># Deploy a preview</span>
<span class="kw">netlify</span> <span class="fn">deploy</span>

<span class="cmt"># Deploy to production</span>
<span class="kw">netlify</span> <span class="fn">deploy</span> <span class="op">--prod</span>`}</code></pre>

    <p class="text-sm text-slate-600 mt-2">Or configure with a <code class="rounded bg-slate-100 px-1 text-pink-700">netlify.toml</code> file:</p>
    <pre class="code-block"><code>{@html `<span class="cmt"># netlify.toml</span>
[<span class="var">build</span>]
  <span class="var">command</span> = <span class="str">"npm run build"</span>
  <span class="var">publish</span> = <span class="str">"dist"</span>

[[<span class="var">redirects</span>]]
  <span class="var">from</span> = <span class="str">"/*"</span>
  <span class="var">to</span> = <span class="str">"/index.html"</span>
  <span class="var">status</span> = <span class="num">200</span>`}</code></pre>
  </div>

  <!-- Environment Variables -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Environment Variables</h3>
    <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5 space-y-3">
      <p class="text-sm text-slate-600">
        Secrets like API keys should <strong>never</strong> be in your code. Set them in your hosting platform's dashboard instead.
      </p>
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-lg border border-slate-200 bg-white p-3">
          <span class="text-sm font-bold text-pink-700">Local (.env file)</span>
          <pre class="mt-1 rounded bg-slate-800 p-2 text-xs text-green-300">DATABASE_URL=postgres://localhost:5432/mydb
API_KEY=sk_test_abc123</pre>
          <p class="mt-1 text-xs text-slate-500">Add <code class="text-pink-700">.env</code> to <code class="text-pink-700">.gitignore</code> so it never gets committed!</p>
        </div>
        <div class="rounded-lg border border-slate-200 bg-white p-3">
          <span class="text-sm font-bold text-pink-700">Production (hosting dashboard)</span>
          <p class="mt-1 text-xs text-slate-500">Set the same variable names in your hosting platform's settings panel. Each environment (dev, staging, prod) can have different values.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Custom Domain -->
  <div class="space-y-2">
    <h3 class="text-lg font-bold text-slate-800">Custom Domain Setup</h3>
    <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5 space-y-2">
      <p class="text-sm text-slate-600">To point your domain to your hosting provider:</p>
      <ol class="space-y-2 text-sm text-slate-600">
        <li class="flex items-start gap-2">
          <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-600 text-xs font-bold text-white">1</span>
          <span>Buy a domain from a registrar (Namecheap, Google Domains, Cloudflare)</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-600 text-xs font-bold text-white">2</span>
          <span>Add the domain in your hosting platform's settings</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-600 text-xs font-bold text-white">3</span>
          <span>Update DNS records: set an <strong>A record</strong> (points to an IP) or <strong>CNAME</strong> (points to a hostname)</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-600 text-xs font-bold text-white">4</span>
          <span>Wait for DNS propagation (can take up to 48 hours, usually minutes)</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-600 text-xs font-bold text-white">5</span>
          <span>SSL certificate is usually auto-provisioned (free via Let's Encrypt)</span>
        </li>
      </ol>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95"
    >
      I know how to deploy
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Code: Advanced Deployment</h2>
      <p class="text-slate-600">GitHub Actions, Docker, nginx, Terraform, and monitoring configuration for production systems.</p>
    </div>

    <!-- GitHub Actions -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">GitHub Actions Workflow</h3>
      <p class="text-sm text-slate-600">A complete CI/CD pipeline that runs on every push to main:</p>
      <pre class="code-block"><code>{@html `<span class="cmt"># .github/workflows/deploy.yml</span>
<span class="var">name</span>: <span class="str">Deploy</span>

<span class="kw">on</span>:
  <span class="var">push</span>:
    <span class="var">branches</span>: [<span class="str">main</span>]

<span class="kw">jobs</span>:
  <span class="var">build-and-deploy</span>:
    <span class="var">runs-on</span>: <span class="str">ubuntu-latest</span>
    <span class="var">steps</span>:
      - <span class="var">name</span>: <span class="str">Checkout</span>
        <span class="kw">uses</span>: <span class="str">actions/checkout@v4</span>

      - <span class="var">name</span>: <span class="str">Setup Node.js</span>
        <span class="kw">uses</span>: <span class="str">actions/setup-node@v4</span>
        <span class="kw">with</span>:
          <span class="var">node-version</span>: <span class="num">20</span>
          <span class="var">cache</span>: <span class="str">'npm'</span>

      - <span class="var">name</span>: <span class="str">Install dependencies</span>
        <span class="kw">run</span>: <span class="str">npm ci</span>

      - <span class="var">name</span>: <span class="str">Lint</span>
        <span class="kw">run</span>: <span class="str">npm run lint</span>

      - <span class="var">name</span>: <span class="str">Test</span>
        <span class="kw">run</span>: <span class="str">npm test</span>

      - <span class="var">name</span>: <span class="str">Build</span>
        <span class="kw">run</span>: <span class="str">npm run build</span>

      - <span class="var">name</span>: <span class="str">Deploy to Vercel</span>
        <span class="kw">run</span>: <span class="str">npx vercel --prod --token=\${{ secrets.VERCEL_TOKEN }}</span>`}</code></pre>
    </div>

    <!-- Dockerfile -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Dockerfile for Production</h3>
      <p class="text-sm text-slate-600">A multi-stage Dockerfile that builds your app and serves it with a minimal runtime:</p>
      <pre class="code-block"><code>{@html `<span class="cmt"># Stage 1: Build</span>
<span class="kw">FROM</span> <span class="var">node</span>:<span class="num">20</span>-<span class="var">alpine</span> <span class="kw">AS</span> <span class="var">builder</span>
<span class="kw">WORKDIR</span> <span class="str">/app</span>
<span class="kw">COPY</span> <span class="var">package*.json</span> <span class="str">./</span>
<span class="kw">RUN</span> <span class="fn">npm ci</span>
<span class="kw">COPY</span> <span class="var">.</span> <span class="str">.</span>
<span class="kw">RUN</span> <span class="fn">npm run build</span>

<span class="cmt"># Stage 2: Serve</span>
<span class="kw">FROM</span> <span class="var">node</span>:<span class="num">20</span>-<span class="var">alpine</span>
<span class="kw">WORKDIR</span> <span class="str">/app</span>
<span class="kw">COPY</span> <span class="op">--from=</span><span class="var">builder</span> <span class="str">/app/dist</span> <span class="str">./dist</span>
<span class="kw">COPY</span> <span class="op">--from=</span><span class="var">builder</span> <span class="str">/app/package*.json</span> <span class="str">./</span>
<span class="kw">RUN</span> <span class="fn">npm ci</span> <span class="op">--production</span>
<span class="kw">EXPOSE</span> <span class="num">3000</span>
<span class="kw">CMD</span> [<span class="str">"node"</span>, <span class="str">"dist/server.js"</span>]`}</code></pre>
      <p class="text-sm text-slate-500">Multi-stage builds keep the final image small by excluding dev dependencies and source code.</p>
    </div>

    <!-- Nginx Config -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Nginx Configuration</h3>
      <p class="text-sm text-slate-600">A production nginx config for serving a static site with caching and compression:</p>
      <pre class="code-block"><code>{@html `<span class="kw">server</span> {
  <span class="var">listen</span> <span class="num">80</span>;
  <span class="var">server_name</span> <span class="str">myapp.com</span>;
  <span class="var">root</span> <span class="str">/var/www/myapp/dist</span>;
  <span class="var">index</span> <span class="str">index.html</span>;

  <span class="cmt"># Enable gzip compression</span>
  <span class="var">gzip</span> <span class="num">on</span>;
  <span class="var">gzip_types</span> <span class="str">text/css application/javascript application/json</span>;

  <span class="cmt"># Cache static assets for 1 year</span>
  <span class="kw">location</span> <span class="str">/assets/</span> {
    <span class="var">expires</span> <span class="num">1y</span>;
    <span class="var">add_header</span> <span class="str">Cache-Control</span> <span class="str">"public, immutable"</span>;
  }

  <span class="cmt"># SPA fallback: serve index.html for all routes</span>
  <span class="kw">location</span> <span class="str">/</span> {
    <span class="var">try_files</span> <span class="var">$uri</span> <span class="var">$uri/</span> <span class="str">/index.html</span>;
  }

  <span class="cmt"># Redirect HTTP to HTTPS</span>
  <span class="kw">if</span> (<span class="var">$scheme</span> != <span class="str">"https"</span>) {
    <span class="kw">return</span> <span class="num">301</span> <span class="str">https://$host$request_uri</span>;
  }
}`}</code></pre>
    </div>

    <!-- Terraform -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Terraform (Infrastructure as Code)</h3>
      <p class="text-sm text-slate-600">Define your cloud infrastructure in code so it can be versioned, reviewed, and reproduced:</p>
      <pre class="code-block"><code>{@html `<span class="cmt"># main.tf — provision an AWS S3 bucket for static hosting</span>
<span class="kw">resource</span> <span class="str">"aws_s3_bucket"</span> <span class="str">"website"</span> {
  <span class="var">bucket</span> = <span class="str">"my-app-production"</span>
}

<span class="kw">resource</span> <span class="str">"aws_s3_bucket_website_configuration"</span> <span class="str">"website"</span> {
  <span class="var">bucket</span> = <span class="var">aws_s3_bucket</span>.<span class="var">website</span>.<span class="var">id</span>
  <span class="kw">index_document</span> {
    <span class="var">suffix</span> = <span class="str">"index.html"</span>
  }
  <span class="kw">error_document</span> {
    <span class="var">key</span> = <span class="str">"index.html"</span>
  }
}

<span class="kw">resource</span> <span class="str">"aws_cloudfront_distribution"</span> <span class="str">"cdn"</span> {
  <span class="kw">origin</span> {
    <span class="var">domain_name</span> = <span class="var">aws_s3_bucket</span>.<span class="var">website</span>.<span class="var">bucket_regional_domain_name</span>
    <span class="var">origin_id</span>   = <span class="str">"S3Origin"</span>
  }
  <span class="var">enabled</span>             = <span class="num">true</span>
  <span class="var">default_root_object</span> = <span class="str">"index.html"</span>
}`}</code></pre>
    </div>

    <!-- Monitoring -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-slate-800">Monitoring &amp; Health Checks</h3>
      <p class="text-sm text-slate-600">Add a health check endpoint and integrate error tracking:</p>
      <pre class="code-block"><code>{@html `<span class="cmt">// Health check endpoint</span>
<span class="var">app</span>.<span class="fn">get</span>(<span class="str">'/health'</span>, (<span class="arg">req</span>, <span class="arg">res</span>) => {
  <span class="var">res</span>.<span class="fn">json</span>({
    <span class="var">status</span>: <span class="str">'healthy'</span>,
    <span class="var">uptime</span>: <span class="var">process</span>.<span class="fn">uptime</span>(),
    <span class="var">timestamp</span>: <span class="kw">new</span> <span class="fn">Date</span>().<span class="fn">toISOString</span>(),
    <span class="var">version</span>: <span class="var">process</span>.<span class="var">env</span>.<span class="var">npm_package_version</span>,
  });
});

<span class="cmt">// Sentry error tracking (Node.js)</span>
<span class="kw">const</span> <span class="var">Sentry</span> = <span class="fn">require</span>(<span class="str">'@sentry/node'</span>);
<span class="var">Sentry</span>.<span class="fn">init</span>({
  <span class="var">dsn</span>: <span class="var">process</span>.<span class="var">env</span>.<span class="var">SENTRY_DSN</span>,
  <span class="var">environment</span>: <span class="var">process</span>.<span class="var">env</span>.<span class="var">NODE_ENV</span>,
  <span class="var">tracesSampleRate</span>: <span class="num">0.1</span>,  <span class="cmt">// sample 10% of transactions</span>
});

<span class="cmt">// Use Sentry middleware (must be first)</span>
<span class="var">app</span>.<span class="fn">use</span>(<span class="var">Sentry</span>.<span class="var">Handlers</span>.<span class="fn">requestHandler</span>());

<span class="cmt">// Your routes go here...</span>

<span class="cmt">// Sentry error handler (must be before other error handlers)</span>
<span class="var">app</span>.<span class="fn">use</span>(<span class="var">Sentry</span>.<span class="var">Handlers</span>.<span class="fn">errorHandler</span>());`}</code></pre>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95"
      >
        I know the advanced deploy patterns
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
