<script lang="ts">
  import { signInWithMagicLink } from '../../lib/auth';

  let email = $state('');
  let loading = $state(false);
  let success = $state(false);
  let errorMessage = $state('');

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    loading = true;
    errorMessage = '';
    success = false;

    const { error } = await signInWithMagicLink(email);

    loading = false;

    if (error) {
      errorMessage = error.message;
    } else {
      success = true;
    }
  }
</script>

<div class="mx-auto mt-16 w-full max-w-md">
  <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
    <h1 class="mb-2 text-center text-2xl font-bold text-slate-900">Welcome Back</h1>
    <p class="mb-8 text-center text-sm text-slate-500">
      Sign in with a magic link sent to your email.
    </p>

    {#if success}
      <div class="rounded-lg bg-green-50 p-4 text-center text-sm text-green-800">
        Check your email for a login link!
      </div>
    {:else}
      <form onsubmit={handleSubmit} class="flex flex-col gap-4">
        <div>
          <label for="email" class="mb-1 block text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            bind:value={email}
            required
            placeholder="you@example.com"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {#if errorMessage}
          <div class="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {errorMessage}
          </div>
        {/if}

        <button
          type="submit"
          disabled={loading || !email}
          class="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>
      </form>
    {/if}
  </div>
</div>
