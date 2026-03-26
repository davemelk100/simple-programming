<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    open: boolean;
    onclose?: () => void;
    children: Snippet;
  }

  let { open, onclose, children }: Props = $props();

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onclose?.();
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) onclose?.();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    onclick={handleBackdropClick}
    role="dialog"
    aria-modal="true"
  >
    <div class="mx-4 w-full max-w-md">
      {@render children()}
    </div>
  </div>
{/if}
