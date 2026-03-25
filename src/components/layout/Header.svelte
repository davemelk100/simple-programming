<script lang="ts">
  import { supabase } from '../../lib/supabase';
  import { signOut } from '../../lib/auth';
  import { topics } from '../../lib/topics';
  import type { User } from '@supabase/supabase-js';

  let user: User | null = $state(null);
  let signingOut = $state(false);

  // Load initial user and subscribe to auth changes
  $effect(() => {
    supabase.auth.getUser().then(({ data }) => {
      user = data.user;
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      user = session?.user ?? null;
    });

    return () => subscription.unsubscribe();
  });

  async function handleSignOut() {
    signingOut = true;
    await signOut();
    signingOut = false;
  }
</script>

<header class="border-b border-slate-200 bg-white shadow-sm">
  <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
    <a href="/" class="text-xl font-bold text-slate-900 no-underline hover:text-indigo-600">
      Programming, Except Easy
    </a>

    <div class="flex items-center gap-4">
      {#if user}
        <span class="hidden text-sm text-slate-500 sm:inline">{user.email}</span>
        <button
          onclick={handleSignOut}
          disabled={signingOut}
          class="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200 disabled:opacity-50"
        >
          {signingOut ? 'Signing out...' : 'Sign Out'}
        </button>
      {:else}
        <a
          href="/auth/login"
          class="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white no-underline hover:bg-indigo-700"
        >
          Sign In
        </a>
      {/if}
    </div>
  </div>

  <nav class="border-t border-slate-100 bg-slate-50">
    <div class="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 py-2">
      {#each topics as topic}
        <a
          href={`/topics/${topic.slug}`}
          class="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 no-underline hover:bg-white hover:text-slate-900"
        >
          <span class="mr-1">{topic.icon}</span>
          {topic.title}
        </a>
      {/each}
    </div>
  </nav>
</header>
