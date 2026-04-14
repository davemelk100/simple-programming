<script lang="ts">
  import { onMount } from "svelte";
  let user: { email?: string } | null = $state(null);
  let signingOut = $state(false);

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
<header class="border-b border-slate-200 bg-white lg:hidden py-4">
  <div class="flex items-center gap-2 px-4">
    <button
      onclick={() => {
        const event = new CustomEvent("toggle-mobile-menu");
        window.dispatchEvent(event);
      }}
      class="shrink-0 rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
      aria-label="Toggle menu"
    >
      <svg
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
    <a href="/" class="flex items-center gap-3 no-underline">
      <img src="/logo.svg" alt="Programming Is Easy" class="h-10 shrink-0" />
      <span
        class="text-lg font-bold text-slate-800"
        style="font-family: 'Permanent Marker', sans-serif; letter-spacing: 0.08em;"
        >Programming Is Easy</span
      >
    </a>
  </div>
</header>
