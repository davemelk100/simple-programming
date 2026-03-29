<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    src: string;
    loop?: boolean;
    autoplay?: boolean;
    class?: string;
  }

  let { src, loop = true, autoplay = true, class: className = '' }: Props = $props();

  let container: HTMLDivElement;
  let animation: any = $state(null);
  let failed = $state(false);

  onMount(async () => {
    try {
      const lottie = (await import('lottie-web')).default;
      animation = lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop,
        autoplay,
        path: src,
      });
    } catch {
      failed = true;
    }

    return () => animation?.destroy();
  });
</script>

<div bind:this={container} class={className}>
  {#if failed}
    <div class="flex h-full w-full items-center justify-center text-slate-300">
      <svg class="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
      </svg>
    </div>
  {/if}
</div>
