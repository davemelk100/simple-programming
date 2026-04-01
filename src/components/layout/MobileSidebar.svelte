<script lang="ts">
  import Sidebar from './Sidebar.svelte';

  interface Props {
    currentPath?: string;
  }

  let { currentPath = '' }: Props = $props();

  let open = $state(false);

  function close() {
    open = false;
  }
</script>

<!-- Toggle button -->
<button
  onclick={() => (open = !open)}
  class="fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-all hover:bg-indigo-700 active:scale-95 md:hidden"
  aria-label="Toggle navigation"
>
  {#if open}
    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  {:else}
    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  {/if}
</button>

<!-- Backdrop -->
{#if open}
  <button
    class="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
    onclick={close}
    aria-label="Close navigation"
    tabindex="-1"
  ></button>
{/if}

<!-- Drawer -->
<div
  class="fixed top-0 left-0 z-40 h-full transform transition-transform duration-300 ease-in-out md:hidden
    {open ? 'translate-x-0' : '-translate-x-full'}"
>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="h-full overflow-y-auto" onclick={(e) => {
    const target = e.target as HTMLElement;
    if (target.closest('a')) close();
  }}>
    <Sidebar {currentPath} />
  </div>
</div>
