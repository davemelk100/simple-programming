<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';
  let advanced = $state(false);
  onMount(() => { advanced = getAdvanced(); return onAdvancedChange((v) => (advanced = v)); });
  interface Props { oncomplete?: () => void; }
  let { oncomplete }: Props = $props();

  let visibleCards = $state(0);

  const cards = [
    { emoji: '\uD83D\uDEE0\uFE0F', title: 'Build', desc: 'Your code is compiled and optimized into a production-ready bundle. Think of it as editing a manuscript into a polished book.' },
    { emoji: '\uD83C\uDFE0', title: 'Host', desc: 'The built files are uploaded to a server where anyone on the internet can access them. This is where your app "lives."' },
    { emoji: '\uD83C\uDF10', title: 'Domain', desc: 'A custom URL (like myapp.com) points visitors to your server. DNS is the phonebook that maps names to server addresses.' },
    { emoji: '\uD83D\uDD12', title: 'SSL', desc: 'The lock icon in your browser means your site uses HTTPS. SSL encrypts data between the user and your server.' },
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
    <h2 class="mb-2 text-2xl font-bold text-slate-800">What Does "Deploy" Mean?</h2>
    <p class="text-slate-600">
      Think of coding like <strong>writing a book</strong>. You spend weeks drafting, editing, and polishing your manuscript. But nobody can read it until you <strong>publish and distribute</strong> it. <strong>Deploying</strong> is the publishing step for software &mdash; it takes the code on your laptop and puts it on a server where the whole world can use it.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-2">
    {#each cards as card, i}
      <div
        class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5 text-center transition-all duration-700
          {i < visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
      >
        <div class="mb-2 text-4xl">{card.emoji}</div>
        <h3 class="mb-1 font-bold text-slate-800">{card.title}</h3>
        <p class="text-sm text-slate-600">{card.desc}</p>
      </div>
    {/each}
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">CI/CD: Automatic Publishing</h3>
    <p class="text-slate-600">
      <strong>CI/CD</strong> stands for Continuous Integration / Continuous Deployment. It means that every time you push code to your repository, an automated system builds it, runs tests, and deploys it &mdash; without you lifting a finger. It is like having an automatic publishing pipeline: every time you finish a chapter, the system formats the book, checks for typos, and ships it to bookstores.
    </p>

    <div class="flex flex-wrap items-center gap-2 text-sm">
      <span class="rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-slate-700">Push code</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-pink-100 px-3 py-1.5 font-mono text-pink-700">Build</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-pink-100 px-3 py-1.5 font-mono text-pink-700">Test</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-pink-200 px-3 py-1.5 font-mono text-pink-800">Deploy</span>
      <span class="text-slate-400">&#8594;</span>
      <span class="rounded-lg bg-green-100 px-3 py-1.5 font-mono text-green-700">Live!</span>
    </div>
    <p class="text-sm text-slate-500">
      This entire pipeline runs automatically every time you push to the main branch. If any step fails, the deploy is stopped and you get notified.
    </p>
  </div>

  <div class="space-y-4">
    <h3 class="text-lg font-bold text-slate-800">Where Can You Deploy?</h3>
    <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-5 space-y-3">
      <div class="flex items-start gap-3">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
        <div>
          <strong class="text-slate-800">Static hosting</strong> (Netlify, Vercel, GitHub Pages)
          <span class="text-sm text-slate-500"> &mdash; Perfect for frontends, blogs, and static sites. Free tiers available.</span>
        </div>
      </div>
      <div class="flex items-start gap-3">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
        <div>
          <strong class="text-slate-800">Platform as a Service</strong> (Railway, Render, Fly.io)
          <span class="text-sm text-slate-500"> &mdash; Handles servers for you. Great for APIs and backends.</span>
        </div>
      </div>
      <div class="flex items-start gap-3">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500"></span>
        <div>
          <strong class="text-slate-800">Cloud providers</strong> (AWS, Google Cloud, Azure)
          <span class="text-sm text-slate-500"> &mdash; Maximum flexibility and scale. More complex to set up.</span>
        </div>
      </div>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95"
    >
      I understand deployment
    </button>
  </div>

  {:else}

  <div class="space-y-8">
    <div>
      <h2 class="mb-2 text-2xl font-bold text-slate-800">Deploy &amp; Ship (Advanced)</h2>
      <p class="text-slate-600">Build pipelines, deployment strategies, CDN edge caching, monitoring, feature flags, and database migrations.</p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Build Pipelines</h3>
      <p class="text-slate-600">
        A build pipeline is a series of automated steps that transform your source code into a deployable artifact. Each step must pass before the next begins. Typical stages include: <strong>checkout</strong> (pull code), <strong>install</strong> (dependencies), <strong>lint</strong> (code quality), <strong>test</strong> (automated tests), <strong>build</strong> (compile/bundle), and <strong>deploy</strong> (push to production).
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Preview Deployments</h3>
      <p class="text-slate-600">
        Modern platforms like Vercel and Netlify create a unique, temporary URL for every pull request. Reviewers can see exactly how the changes look and behave before merging &mdash; no need to run the code locally. These preview deployments are isolated and automatically cleaned up when the PR is merged or closed.
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Deployment Strategies</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Blue/Green</h4>
          <p class="text-sm text-slate-600">Run two identical environments. "Blue" serves live traffic while "Green" gets the new version. Once Green is verified, traffic switches instantly. If something goes wrong, switch back to Blue.</p>
        </div>
        <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Canary</h4>
          <p class="text-sm text-slate-600">Roll out the new version to a small percentage of users (e.g., 5%). Monitor for errors. If stable, gradually increase to 100%. If issues arise, roll back immediately.</p>
        </div>
        <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Rolling</h4>
          <p class="text-sm text-slate-600">Update servers one at a time. Always some servers running the old version and some the new. No downtime, but two versions coexist temporarily.</p>
        </div>
        <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Rollbacks</h4>
          <p class="text-sm text-slate-600">Every deploy should be reversible. Keep the previous build artifact ready. If the new deploy has issues, redeploy the old version in seconds.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">CDN Edge Caching</h3>
      <p class="text-slate-600">
        A <strong>CDN</strong> (Content Delivery Network) copies your static assets to servers around the world. When a user in Tokyo loads your site, they get files from a nearby edge server instead of your origin server in New York. This dramatically reduces latency. CDNs also absorb traffic spikes and provide DDoS protection.
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Environment Variables in Production</h3>
      <p class="text-slate-600">
        Secrets like API keys, database URLs, and tokens should <strong>never</strong> be committed to Git. Instead, set them as environment variables in your hosting dashboard or CI/CD system. Different environments (development, staging, production) use different values for the same variable names.
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Monitoring &amp; Alerting</h3>
      <p class="text-slate-600">
        Once deployed, you need visibility into how your app is performing:
      </p>
      <div class="grid gap-3 sm:grid-cols-3">
        <div class="rounded-lg border border-slate-200 bg-white p-3">
          <span class="text-sm font-bold text-pink-700">Uptime</span>
          <p class="text-xs text-slate-500">Is your site reachable? Tools like Pingdom or UptimeRobot check every minute and alert you if it goes down.</p>
        </div>
        <div class="rounded-lg border border-slate-200 bg-white p-3">
          <span class="text-sm font-bold text-pink-700">Error Tracking</span>
          <p class="text-xs text-slate-500">Sentry, Bugsnag, or Datadog capture JavaScript errors in production with full stack traces and user context.</p>
        </div>
        <div class="rounded-lg border border-slate-200 bg-white p-3">
          <span class="text-sm font-bold text-pink-700">Performance</span>
          <p class="text-xs text-slate-500">Track page load times, API latency, and Core Web Vitals. Slow responses lose users.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-800">Feature Flags &amp; Database Migrations</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Feature Flags</h4>
          <p class="text-sm text-slate-600">Wrap new features in conditional checks. Enable them for specific users, percentages, or environments without redeploying. Tools: LaunchDarkly, Unleash, or simple env vars.</p>
        </div>
        <div class="rounded-xl border-2 border-pink-200 bg-pink-50 p-4">
          <h4 class="mb-1 font-bold text-slate-800">Database Migrations in CI</h4>
          <p class="text-sm text-slate-600">Schema changes (adding columns, renaming tables) run as versioned migration scripts in your CI/CD pipeline &mdash; before the new code deploys. Always write "up" and "down" migrations so you can roll back.</p>
        </div>
      </div>
    </div>

    <div>
      <button
        onclick={oncomplete}
        class="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-pink-700 active:scale-95"
      >
        I understand deployment
      </button>
    </div>
  </div>
  {/if}
</div>
