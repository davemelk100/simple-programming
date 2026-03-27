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
  <div class="mx-auto flex items-center justify-between px-4 py-3">
    <a
      href="/"
      class="text-4xl font-bold text-slate-900 no-underline hover:text-indigo-600"
      style="font-family: 'Permanent Marker', cursive;"
    >
      Programming Is Easy
    </a>

    <div class="flex items-center gap-4">
      <!-- Mode toggle -->
      <button
        onclick={() => toggleAdvanced()}
        class="flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors
          {advanced ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'}"
      >
        <span class="text-xs">{advanced ? 'Advanced' : 'Basic'}</span>
        <div class="relative h-5 w-9 rounded-full transition-colors {advanced ? 'bg-indigo-500' : 'bg-slate-300'}">
          <div class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform {advanced ? 'translate-x-4' : 'translate-x-0.5'}"></div>
        </div>
      </button>

      {#if user}
        <a
          href="/progress"
          class="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 no-underline hover:bg-slate-100"
        >
          My Progress
        </a>
        <span class="hidden text-sm text-slate-500 sm:inline">{user.email}</span>
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
          class="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white no-underline hover:bg-indigo-700"
        >
          Sign In
        </a>
      {/if}
    </div>
  </div>
</header>
