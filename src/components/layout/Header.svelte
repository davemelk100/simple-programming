<script lang="ts">
  import { onMount } from "svelte";
  import { getAdvanced, toggleAdvanced, onAdvancedChange } from "../../lib/mode";

  let user: { email?: string } | null = $state(null);
  let signingOut = $state(false);
  let advanced = $state(false);

  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  onMount(() => {
    let subscription: { unsubscribe: () => void } | undefined;

    import("../../lib/supabase").then(async ({ supabase }) => {
      const { data } = await supabase.auth.getUser();
      user = data.user;

      const { data: authData } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          user = session?.user ?? null;
        },
      );
      subscription = authData.subscription;
    });

    return () => subscription?.unsubscribe();
  });

  async function handleSignOut() {
    signingOut = true;
    const { signOut } = await import("../../lib/auth");
    await signOut();
    signingOut = false;
  }
</script>

<header class="border-b border-slate-200 bg-white shadow-sm">
  <div class="mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-3">
    <a
      href="/"
      class="text-xl font-bold text-slate-900 no-underline hover:text-indigo-600 sm:text-4xl"
      style="font-family: 'Permanent Marker';"
    >
      Programming Is Easy
    </a>

    <div class="flex items-center gap-2 sm:gap-4">
      {#if user}
        <a
          href="/progress"
          class="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 no-underline hover:bg-slate-100"
        >
          My Progress
        </a>
        <span class="hidden text-sm text-slate-500 sm:inline">{user.email}</span>
      {/if}
      <button
        onclick={() => toggleAdvanced()}
        class="flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors
          {advanced ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'}"
      >
        <span class="text-xs">{advanced ? 'Advanced' : 'Basic'}</span>
        <div class="relative h-5 w-9 rounded-full transition-colors {advanced ? 'bg-indigo-500' : 'bg-slate-300'}">
          <div class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform {advanced ? 'translate-x-4' : 'translate-x-0.5'}"></div>
        </div>
      </button>
      {#if user}
        <button
          onclick={handleSignOut}
          disabled={signingOut}
          class="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200 disabled:opacity-50"
        >
          {signingOut ? "Signing out..." : "Sign Out"}
        </button>
      {:else}
        <a
          href="/auth/login"
          class="rounded-lg bg-indigo-600 p-2 text-sm font-medium text-white no-underline hover:bg-indigo-700 sm:px-3 sm:py-1.5"
        >
          <svg class="h-5 w-5 sm:hidden" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3l3-3m0 0l-3-3m3 3H9"/></svg>
          <span class="hidden sm:inline">Sign In</span>
        </a>
      {/if}
    </div>
  </div>
  <div class="hidden items-center justify-between px-4 pb-2 sm:flex">
    <p class="text-sm text-slate-400">No jargon. No boring tutorials. Just colorful, interactive lessons that make programming click.</p>
  </div>
</header>
