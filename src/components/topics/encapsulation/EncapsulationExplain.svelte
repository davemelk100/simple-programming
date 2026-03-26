<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

  const examples = [
    {
      name: 'BankAccount',
      icon: '🏦',
      hidden: ['balance: $5,000', 'transactionLog[]', 'accountId'],
      exposed: ['deposit(amount)', 'withdraw(amount)', 'getBalance()'],
      desc: 'The balance is hidden inside. You can only change it through deposit and withdraw -- never by reaching in directly.',
    },
    {
      name: 'Phone',
      icon: '📱',
      hidden: ['circuitBoard', 'signalProcessor', 'radioModule'],
      exposed: ['call(number)', 'sendText(msg)', 'takePicture()'],
      desc: 'You tap buttons on the screen. You never touch the circuits, radio module, or signal processor inside.',
    },
  ];

  let activeExample = $state(-1);

  onMount(() => {
    let i = 0;
    const interval = setInterval(() => {
      activeExample = i;
      i++;
      if (i >= examples.length) clearInterval(interval);
    }, 1200);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-8">
  <div>
    <p class="text-slate-600">
      Think of a <strong>TV remote</strong>. You press buttons &mdash; power, volume, channel &mdash; without knowing how the circuits inside work. That's <strong>encapsulation</strong>: hiding the complex internals and only exposing a simple interface. It protects data from being changed in unexpected ways, preventing bugs and keeping your code safe and predictable.
    </p>
  </div>

  <!-- TV Remote visual -->
  <div class="flex max-w-sm items-center gap-6">
    <div class="flex flex-col items-center gap-2">
      <div class="rounded-2xl border-2 border-green-400 bg-green-50 px-5 py-4 shadow-md">
        <div class="mb-2 text-center text-xs font-semibold text-green-600 uppercase tracking-wide">Public buttons</div>
        <div class="flex flex-col gap-1.5">
          <div class="rounded-lg bg-green-200 px-4 py-1.5 text-center text-sm font-bold text-green-800">Power</div>
          <div class="rounded-lg bg-green-200 px-4 py-1.5 text-center text-sm font-bold text-green-800">Volume</div>
          <div class="rounded-lg bg-green-200 px-4 py-1.5 text-center text-sm font-bold text-green-800">Channel</div>
        </div>
      </div>
      <span class="text-xs text-green-600 font-medium">What you see</span>
    </div>

    <svg class="h-6 w-8 shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>

    <div class="flex flex-col items-center gap-2">
      <div class="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100 px-5 py-4 shadow-inner">
        <div class="mb-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">Hidden inside</div>
        <div class="flex flex-col gap-1.5">
          <div class="rounded-lg bg-slate-200 px-4 py-1.5 text-center text-sm text-slate-500 blur-[2px]">IR transmitter</div>
          <div class="rounded-lg bg-slate-200 px-4 py-1.5 text-center text-sm text-slate-500 blur-[2px]">Circuit board</div>
          <div class="rounded-lg bg-slate-200 px-4 py-1.5 text-center text-sm text-slate-500 blur-[2px]">Signal encoder</div>
        </div>
      </div>
      <span class="text-xs text-slate-500 font-medium">What's hidden</span>
    </div>
  </div>

  <!-- Animated examples -->
    <div class="flex flex-col items-start gap-6">
      {#each examples as ex, i}
        <div
          class="w-full rounded-xl border-2 p-5 transition-all duration-700
            {i <= activeExample ? 'translate-x-0 opacity-100 border-green-300 bg-green-50' : '-translate-x-8 opacity-0 border-slate-200 bg-white'}"
        >
          <div class="mb-3 flex items-center gap-2">
            <span class="text-2xl">{ex.icon}</span>
            <h3 class="text-lg font-bold text-green-800">{ex.name}</h3>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <!-- Hidden internals -->
            <div>
              <div class="mb-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Hidden (private)</div>
              {#each ex.hidden as field}
                <div class="mb-1 flex items-center gap-1.5 rounded bg-slate-100 px-2 py-1 text-xs text-slate-500">
                  <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span class="blur-[1.5px]">{field}</span>
                </div>
              {/each}
            </div>

            <!-- Exposed interface -->
            <div>
              <div class="mb-1.5 text-xs font-semibold text-green-600 uppercase tracking-wide">Exposed (public)</div>
              {#each ex.exposed as method}
                <div class="mb-1 rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">{method}</div>
              {/each}
            </div>
          </div>

          {#if i <= activeExample}
            <p class="mt-3 text-slate-600">{ex.desc}</p>
          {/if}
        </div>
      {/each}
    </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      I've read this
    </button>
  </div>
</div>
