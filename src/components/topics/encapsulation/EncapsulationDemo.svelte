<script lang="ts">
  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

  let balance = $state(1000);
  let depositAmount = $state('');
  let withdrawAmount = $state('');
  let message = $state('');
  let messageType = $state<'success' | 'error' | ''>('');
  let showDirectAccess = $state(false);
  let directValue = $state('');
  let balanceRevealed = $state(false);
  let animating = $state(false);

  function deposit() {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      message = 'Please enter a valid positive amount.';
      messageType = 'error';
      return;
    }
    animating = true;
    setTimeout(() => {
      balance += amount;
      message = `Deposited $${amount.toFixed(2)}. Balance updated through deposit().`;
      messageType = 'success';
      depositAmount = '';
      animating = false;
    }, 400);
  }

  function withdraw() {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      message = 'Please enter a valid positive amount.';
      messageType = 'error';
      return;
    }
    if (amount > balance) {
      message = `Cannot withdraw $${amount.toFixed(2)} -- insufficient funds! The method protects you.`;
      messageType = 'error';
      return;
    }
    animating = true;
    setTimeout(() => {
      balance -= amount;
      message = `Withdrew $${amount.toFixed(2)}. Balance updated through withdraw().`;
      messageType = 'success';
      withdrawAmount = '';
      animating = false;
    }, 400);
  }

  function tryDirectAccess() {
    showDirectAccess = true;
    message = 'Access denied! "balance" is private. You cannot set it directly -- use deposit() or withdraw() instead.';
    messageType = 'error';
    directValue = '';
    setTimeout(() => {
      showDirectAccess = false;
    }, 3000);
  }

  function toggleReveal() {
    balanceRevealed = !balanceRevealed;
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: BankAccount</h2>
    <p class="text-slate-600">The balance is hidden. You can only interact through public methods.</p>
  </div>

  <!-- Account display -->
  <div class="max-w-sm rounded-2xl border-2 border-green-400 bg-green-50 p-6 shadow-lg">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-lg font-bold text-green-800">BankAccount</h3>
      <button
        onclick={toggleReveal}
        class="rounded-lg bg-green-100 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-200 transition-colors"
      >
        {balanceRevealed ? 'Hide' : 'Peek at'} balance
      </button>
    </div>

    <!-- Balance display -->
    <div class="mb-5 flex items-center justify-center gap-3 rounded-xl border border-green-200 bg-white p-4">
      <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <div class="text-center">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Private balance</div>
        <div class="text-2xl font-bold transition-all duration-300 {animating ? 'scale-110 text-green-500' : 'text-green-700'}">
          {#if balanceRevealed}
            ${balance.toFixed(2)}
          {:else}
            <span class="blur-md select-none">${balance.toFixed(2)}</span>
          {/if}
        </div>
      </div>
    </div>

    <!-- Public methods -->
    <div class="space-y-3">
      <div class="text-xs font-semibold text-green-600 uppercase tracking-wide">Public methods</div>

      <!-- Deposit -->
      <div class="flex items-center gap-2">
        <span class="shrink-0 text-xs font-mono text-green-700">deposit(</span>
        <input
          type="number"
          bind:value={depositAmount}
          placeholder="amount"
          class="w-24 rounded-lg border border-green-300 px-2 py-1.5 text-sm text-center focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
        <span class="shrink-0 text-xs font-mono text-green-700">)</span>
        <button
          onclick={deposit}
          class="rounded-lg bg-green-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 transition-all"
        >
          Run
        </button>
      </div>

      <!-- Withdraw -->
      <div class="flex items-center gap-2">
        <span class="shrink-0 text-xs font-mono text-green-700">withdraw(</span>
        <input
          type="number"
          bind:value={withdrawAmount}
          placeholder="amount"
          class="w-24 rounded-lg border border-green-300 px-2 py-1.5 text-sm text-center focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
        <span class="shrink-0 text-xs font-mono text-green-700">)</span>
        <button
          onclick={withdraw}
          class="rounded-lg bg-green-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 transition-all"
        >
          Run
        </button>
      </div>
    </div>

    <!-- Direct access attempt -->
    <div class="mt-4 border-t border-green-200 pt-4">
      <div class="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">Try setting balance directly</div>
      <div class="flex items-center gap-2">
        <span class="shrink-0 text-xs font-mono text-red-500">balance =</span>
        <input
          type="number"
          bind:value={directValue}
          placeholder="9999"
          class="w-24 rounded-lg border border-red-300 px-2 py-1.5 text-sm text-center focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
        />
        <button
          onclick={tryDirectAccess}
          class="rounded-lg bg-red-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-red-600 active:scale-95 transition-all {showDirectAccess ? 'animate-shake' : ''}"
        >
          Set
        </button>
      </div>
    </div>
  </div>

  <!-- Message -->
  {#if message}
    <div class="max-w-sm rounded-lg p-3 text-sm font-medium transition-all
      {messageType === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}">
      {message}
    </div>
  {/if}

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      Done exploring
    </button>
  </div>
</div>

<style>
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-4px); }
    40% { transform: translateX(4px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
  .animate-shake {
    animation: shake 0.4s ease-in-out;
  }
</style>
