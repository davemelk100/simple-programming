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

<!-- Mobile header only -->
<header class="border-b border-slate-200 bg-white shadow-sm lg:hidden">
  <div class="flex items-center justify-between px-4 py-2">
    <a
      href="/"
      class="text-xl font-bold text-slate-900 no-underline hover:text-indigo-600"
      style="font-family: 'Permanent Marker';"
    >
      Programming Is Easy
    </a>

    <div class="flex items-center gap-2">
      <button
        onclick={() => toggleAdvanced()}
        class="flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-1 text-xs font-medium transition-colors
          {advanced ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-slate-50 text-slate-600'}"
      >
        <span class="text-[10px]">{advanced ? 'Adv' : 'Basic'}</span>
        <div class="relative h-4 w-7 rounded-full transition-colors {advanced ? 'bg-indigo-500' : 'bg-slate-300'}">
          <div class="absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform {advanced ? 'translate-x-3' : 'translate-x-0.5'}"></div>
        </div>
      </button>
      {#if user}
        <button
          onclick={handleSignOut}
          disabled={signingOut}
          class="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 disabled:opacity-50"
        >
          {signingOut ? '...' : 'Sign Out'}
        </button>
      {:else}
        <a
          href="/auth/login"
          class="rounded-lg bg-indigo-600 px-2 py-1 text-xs font-medium text-white no-underline hover:bg-indigo-700"
        >
          Sign In
        </a>
      {/if}
    </div>
  </div>
</header>
