<script lang="ts">
  interface Props {
    percentage: number;
    label?: string;
  }

  let { percentage, label = '' }: Props = $props();

  let clampedPct = $derived(Math.max(0, Math.min(100, percentage)));
</script>

<div class="w-full">
  {#if label}
    <div class="mb-1 flex items-center justify-between text-sm">
      <span class="font-medium text-slate-700">{label}</span>
      <span class="font-semibold text-slate-600">{clampedPct}%</span>
    </div>
  {/if}

  <div class="h-3 w-full overflow-hidden rounded-full bg-slate-200">
    <div
      class="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-700 ease-out"
      style="width: {clampedPct}%"
    ></div>
  </div>
</div>
