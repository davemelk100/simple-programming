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
<header class="border-b border-slate-200 bg-white md:hidden py-4">
  <div class="flex flex-col px-4">
    <div class="flex items-center gap-2">
      <button
        onclick={() => {
          const event = new CustomEvent('toggle-mobile-menu');
          window.dispatchEvent(event);
        }}
        class="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        aria-label="Toggle menu"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <a href="/" class="no-underline">
        <img src="/logo.svg" alt="Programming Is Easy" class="h-10" />
      </a>
    </div>
    <a href="/" class="no-underline mt-2 pl-1">
      <span class="text-lg font-bold text-slate-800" style="font-family: 'Permanent Marker', cursive;">Programming Is Easy</span>
    </a>
  </div>
</header>
