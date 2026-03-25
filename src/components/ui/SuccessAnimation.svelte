<script lang="ts">
  let visible = $state(true);
</script>

{#if visible}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
    <div class="flex flex-col items-center gap-4">
      <!-- Expanding ring -->
      <div class="success-ring relative flex h-28 w-28 items-center justify-center">
        <div class="ring-expand absolute inset-0 rounded-full border-4 border-green-400"></div>
        <div class="ring-expand-delay absolute inset-0 rounded-full border-4 border-green-300"></div>

        <!-- Checkmark circle -->
        <div class="check-pop flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/40">
          <svg class="check-draw h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <p class="text-pop text-2xl font-bold text-white drop-shadow-lg">Great job!</p>

      <button
        onclick={() => (visible = false)}
        class="text-pop-delay mt-2 rounded-full bg-white/90 px-6 py-2 text-sm font-semibold text-green-700 shadow-md transition-colors hover:bg-white"
      >
        Continue
      </button>
    </div>
  </div>
{/if}

<style>
  @keyframes ringExpand {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
  }
  @keyframes checkPop {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  @keyframes textPop {
    0% { transform: scale(0) translateY(10px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }
  @keyframes drawCheck {
    0% { stroke-dashoffset: 30; }
    100% { stroke-dashoffset: 0; }
  }

  .ring-expand {
    animation: ringExpand 1.2s ease-out forwards;
  }
  .ring-expand-delay {
    animation: ringExpand 1.2s ease-out 0.2s forwards;
    opacity: 0;
  }
  .check-pop {
    animation: checkPop 0.5s ease-out 0.3s both;
  }
  .check-draw path {
    stroke-dasharray: 30;
    stroke-dashoffset: 30;
    animation: drawCheck 0.4s ease-out 0.6s forwards;
  }
  .text-pop {
    animation: textPop 0.4s ease-out 0.7s both;
  }
  .text-pop-delay {
    animation: textPop 0.4s ease-out 0.9s both;
  }
</style>
