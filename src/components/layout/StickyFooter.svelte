<script lang="ts">
  import { onMount } from "svelte";
  import {
    getAdvanced,
    toggleAdvanced,
    onAdvancedChange,
  } from "../../lib/mode";

  let user: { email?: string } | null = $state(null);
  let signingOut = $state(false);
  let advanced = $state(false);

  onMount(() => {
    advanced = getAdvanced();
    const unsub = onAdvancedChange((v) => (advanced = v));
    return () => unsub();
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

<footer class="sticky bottom-0 z-50 border-t border-slate-200 bg-white px-4 py-2">
  <div class="mx-auto flex items-center justify-between">
    <button
      onclick={() => toggleAdvanced()}
      class="flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors
        {advanced
        ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'}"
    >
      <span class="text-xs">{advanced ? "Advanced" : "Basic"}</span>
      <div
        class="relative h-5 w-9 rounded-full transition-colors {advanced
          ? 'bg-indigo-500'
          : 'bg-slate-300'}"
      >
        <div
          class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform {advanced
            ? 'translate-x-4'
            : 'translate-x-0.5'}"
        ></div>
      </div>
    </button>
    <div class="flex items-center gap-4">
      <a
        href="/progress"
        class="text-sm font-medium text-slate-600 no-underline hover:text-slate-800"
      >
        My Progress
      </a>
      {#if user}
        <span class="text-sm text-slate-400">{user.email}</span>
        <button
          onclick={handleSignOut}
          disabled={signingOut}
          class="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200 disabled:opacity-50"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        </button>
      {/if}
    </div>
  </div>
</footer>
