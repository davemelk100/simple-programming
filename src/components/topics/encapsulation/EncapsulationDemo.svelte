<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  // --- Basic mode state ---
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

  // --- Advanced mode state ---
  let advBalance = $state(1000);
  let advAccountNumber = $state('ACCT-' + Math.random().toString(36).substring(2, 8).toUpperCase());
  let advInterestRate = $state(0.025);
  let advDepositAmount = $state('');
  let advWithdrawAmount = $state('');
  let advMessage = $state('');
  let advMessageType = $state<'success' | 'error' | ''>('');
  let advAnimating = $state(false);
  let advTransactionLog = $state<{ time: string; type: string; detail: string }[]>([]);
  let advShowDirectAccess = $state(false);
  let advDirectField = $state('balance');
  let advDirectValue = $state('');
  let advShowSubclass = $state(false);

  function advLogTransaction(type: string, detail: string) {
    const now = new Date();
    const time = now.toLocaleTimeString();
    advTransactionLog = [...advTransactionLog, { time, type, detail }];
  }

  function advValidateAmount(amount: number): string | null {
    if (isNaN(amount) || amount <= 0) return 'Invalid amount: must be a positive number.';
    if (amount > 1_000_000) return 'Invalid amount: exceeds single-transaction limit.';
    return null;
  }

  function advDeposit() {
    const amount = parseFloat(advDepositAmount);
    const error = advValidateAmount(amount);
    if (error) {
      advMessage = `_validateAmount() -> ${error}`;
      advMessageType = 'error';
      advLogTransaction('ERROR', `deposit rejected: ${error}`);
      return;
    }
    advAnimating = true;
    setTimeout(() => {
      advBalance += amount;
      advLogTransaction('DEPOSIT', `+$${amount.toFixed(2)} -> balance: $${advBalance.toFixed(2)}`);
      advMessage = `deposit($${amount.toFixed(2)}) succeeded. _logTransaction() recorded the operation.`;
      advMessageType = 'success';
      advDepositAmount = '';
      advAnimating = false;
    }, 400);
  }

  function advWithdraw() {
    const amount = parseFloat(advWithdrawAmount);
    const error = advValidateAmount(amount);
    if (error) {
      advMessage = `_validateAmount() -> ${error}`;
      advMessageType = 'error';
      advLogTransaction('ERROR', `withdraw rejected: ${error}`);
      return;
    }
    if (amount > advBalance) {
      advMessage = `Insufficient funds! _validateAmount() passed but balance check failed.`;
      advMessageType = 'error';
      advLogTransaction('ERROR', `withdraw $${amount.toFixed(2)} denied: insufficient funds`);
      return;
    }
    advAnimating = true;
    setTimeout(() => {
      advBalance -= amount;
      advLogTransaction('WITHDRAW', `-$${amount.toFixed(2)} -> balance: $${advBalance.toFixed(2)}`);
      advMessage = `withdraw($${amount.toFixed(2)}) succeeded. _logTransaction() recorded the operation.`;
      advMessageType = 'success';
      advWithdrawAmount = '';
      advAnimating = false;
    }, 400);
  }

  function advApplyInterest() {
    const interest = advBalance * advInterestRate;
    advBalance += interest;
    advLogTransaction('INTEREST', `+$${interest.toFixed(2)} at rate ${(advInterestRate * 100).toFixed(1)}% -> balance: $${advBalance.toFixed(2)}`);
    advMessage = `applyInterest() used private _interestRate (${(advInterestRate * 100).toFixed(1)}%) to add $${interest.toFixed(2)}.`;
    advMessageType = 'success';
  }

  function advTryDirectAccess() {
    advShowDirectAccess = true;
    advMessage = `Access denied! "${advDirectField}" is private. TypeScript compiler error: Property '${advDirectField}' is private and only accessible within class 'BankAccount'.`;
    advMessageType = 'error';
    advLogTransaction('ACCESS_DENIED', `attempted direct access to private "${advDirectField}"`);
    advDirectValue = '';
    setTimeout(() => {
      advShowDirectAccess = false;
    }, 3000);
  }

  function advToggleSubclass() {
    advShowSubclass = !advShowSubclass;
  }

  function advClearLog() {
    advTransactionLog = [];
  }
</script>

{#if !advanced}
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

{:else}

<!-- ============ ADVANCED MODE ============ -->
<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Advanced: TypeScript Access Modifiers</h2>
    <p class="text-slate-600">Explore <code class="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono">private</code>, <code class="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono">protected</code>, and <code class="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono">public</code> modifiers with multiple hidden properties and helper methods.</p>
  </div>

  <div class="grid gap-6 lg:grid-cols-2">
    <!-- Left column: Class definition -->
    <div class="rounded-2xl border-2 border-slate-300 bg-slate-50 p-5 shadow-lg">
      <h3 class="mb-3 text-sm font-bold text-slate-700 uppercase tracking-wide">Class Definition</h3>
      <pre class="overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs leading-relaxed text-slate-100"><code><span class="text-purple-400">class</span> <span class="text-yellow-300">BankAccount</span> {'{'}{'\n'}  <span class="text-red-400">private</span> <span class="text-blue-300">_balance</span>: number;{'\n'}  <span class="text-red-400">private</span> <span class="text-blue-300">_accountNumber</span>: string;{'\n'}  <span class="text-red-400">private</span> <span class="text-blue-300">_interestRate</span>: number;{'\n'}  <span class="text-red-400">private</span> <span class="text-blue-300">_transactionLog</span>: Log[];{'\n'}{'\n'}  <span class="text-red-400">private</span> <span class="text-green-300">_validateAmount</span>(amt: number): string | null;{'\n'}  <span class="text-red-400">private</span> <span class="text-green-300">_logTransaction</span>(type: string, detail: string): void;{'\n'}{'\n'}  <span class="text-green-400">public</span>  <span class="text-green-300">deposit</span>(amount: number): void;{'\n'}  <span class="text-green-400">public</span>  <span class="text-green-300">withdraw</span>(amount: number): void;{'\n'}  <span class="text-green-400">public</span>  <span class="text-green-300">applyInterest</span>(): void;{'\n'}  <span class="text-green-400">public</span>  <span class="text-green-300">getBalance</span>(): number;{'\n'}{'}'}</code></pre>

      <!-- Subclass toggle -->
      <div class="mt-4">
        <button
          onclick={advToggleSubclass}
          class="rounded-lg bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-200 transition-colors"
        >
          {advShowSubclass ? 'Hide' : 'Show'} protected in subclass
        </button>
      </div>

      {#if advShowSubclass}
        <div class="mt-3">
          <pre class="overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs leading-relaxed text-slate-100"><code><span class="text-purple-400">class</span> <span class="text-yellow-300">SavingsAccount</span> <span class="text-purple-400">extends</span> <span class="text-yellow-300">BankAccount</span> {'{'}{'\n'}  <span class="text-orange-400">protected</span> <span class="text-blue-300">_minBalance</span>: number = 100;{'\n'}{'\n'}  <span class="text-green-400">public</span> <span class="text-green-300">withdraw</span>(amount: number): void {'{'}{'\n'}    <span class="text-slate-400">// Can access protected _minBalance</span>{'\n'}    <span class="text-purple-400">if</span> (<span class="text-purple-400">this</span>._balance - amount {'<'} <span class="text-purple-400">this</span>._minBalance) {'{'}{'\n'}      <span class="text-purple-400">throw</span> <span class="text-orange-300">"Below min balance!"</span>;{'\n'}    {'}'}{'\n'}    <span class="text-purple-400">super</span>.withdraw(amount);{'\n'}  {'}'}{'\n'}{'}'}{'\n'}{'\n'}<span class="text-slate-400">// Outside the class:</span>{'\n'}<span class="text-slate-400">// savings._minBalance  // ERROR: protected</span>{'\n'}<span class="text-slate-400">// savings._balance     // ERROR: private</span>{'\n'}<span class="text-slate-400">// savings.withdraw(50) // OK: public</span></code></pre>
          <div class="mt-2 rounded-lg bg-purple-50 border border-purple-200 p-3 text-xs text-purple-800">
            <strong>protected</strong> members are accessible within the class and its subclasses, but not from outside. <strong>private</strong> members are only accessible within the declaring class -- not even subclasses can reach them.
          </div>
        </div>
      {/if}
    </div>

    <!-- Right column: Interactive demo -->
    <div class="rounded-2xl border-2 border-green-400 bg-green-50 p-5 shadow-lg">
      <h3 class="mb-3 text-sm font-bold text-green-700 uppercase tracking-wide">Interactive Instance</h3>

      <!-- Private properties display -->
      <div class="mb-4 space-y-2 rounded-xl border border-green-200 bg-white p-4">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Private properties</div>
        <div class="flex items-center justify-between">
          <span class="font-mono text-xs text-red-500">private _balance</span>
          <span class="font-mono text-sm font-bold transition-all duration-300 {advAnimating ? 'scale-110 text-green-500' : 'text-green-700'}">${advBalance.toFixed(2)}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="font-mono text-xs text-red-500">private _accountNumber</span>
          <span class="font-mono text-sm text-slate-700">{advAccountNumber}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="font-mono text-xs text-red-500">private _interestRate</span>
          <span class="font-mono text-sm text-slate-700">{(advInterestRate * 100).toFixed(1)}%</span>
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
            bind:value={advDepositAmount}
            placeholder="amount"
            class="w-24 rounded-lg border border-green-300 px-2 py-1.5 text-sm text-center focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <span class="shrink-0 text-xs font-mono text-green-700">)</span>
          <button
            onclick={advDeposit}
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
            bind:value={advWithdrawAmount}
            placeholder="amount"
            class="w-24 rounded-lg border border-green-300 px-2 py-1.5 text-sm text-center focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <span class="shrink-0 text-xs font-mono text-green-700">)</span>
          <button
            onclick={advWithdraw}
            class="rounded-lg bg-green-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 transition-all"
          >
            Run
          </button>
        </div>

        <!-- Apply Interest -->
        <div class="flex items-center gap-2">
          <span class="shrink-0 text-xs font-mono text-green-700">applyInterest()</span>
          <button
            onclick={advApplyInterest}
            class="rounded-lg bg-green-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 transition-all"
          >
            Run
          </button>
        </div>
      </div>

      <!-- Direct access attempt -->
      <div class="mt-4 border-t border-green-200 pt-4">
        <div class="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">Try accessing private members directly</div>
        <div class="flex items-center gap-2 flex-wrap">
          <span class="shrink-0 text-xs font-mono text-red-500">account.</span>
          <select
            bind:value={advDirectField}
            class="rounded-lg border border-red-300 px-2 py-1.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
          >
            <option value="balance">_balance</option>
            <option value="accountNumber">_accountNumber</option>
            <option value="interestRate">_interestRate</option>
            <option value="transactionLog">_transactionLog</option>
            <option value="_validateAmount">_validateAmount()</option>
            <option value="_logTransaction">_logTransaction()</option>
          </select>
          <span class="shrink-0 text-xs font-mono text-red-500">=</span>
          <input
            type="text"
            bind:value={advDirectValue}
            placeholder="value"
            class="w-20 rounded-lg border border-red-300 px-2 py-1.5 text-sm text-center focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
          />
          <button
            onclick={advTryDirectAccess}
            class="rounded-lg bg-red-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-red-600 active:scale-95 transition-all {advShowDirectAccess ? 'animate-shake' : ''}"
          >
            Set
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Message -->
  {#if advMessage}
    <div class="rounded-lg p-3 text-sm font-medium transition-all
      {advMessageType === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}">
      <code class="font-mono text-xs">{advMessage}</code>
    </div>
  {/if}

  <!-- Transaction Log -->
  <div class="rounded-2xl border-2 border-amber-300 bg-amber-50 p-5 shadow-lg">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-bold text-amber-800 uppercase tracking-wide">Private Transaction Log <span class="text-xs font-normal normal-case text-amber-600">(shown for learning -- normally inaccessible)</span></h3>
      {#if advTransactionLog.length > 0}
        <button
          onclick={advClearLog}
          class="rounded-lg bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 hover:bg-amber-200 transition-colors"
        >
          Clear
        </button>
      {/if}
    </div>
    {#if advTransactionLog.length === 0}
      <p class="text-sm text-amber-600 italic">No transactions yet. Use the public methods above to generate entries.</p>
    {:else}
      <div class="max-h-48 overflow-y-auto space-y-1">
        {#each advTransactionLog as entry}
          <div class="flex items-start gap-3 rounded-lg bg-white px-3 py-2 text-xs border border-amber-200">
            <span class="shrink-0 font-mono text-amber-500">{entry.time}</span>
            <span class="shrink-0 font-bold {entry.type === 'ERROR' || entry.type === 'ACCESS_DENIED' ? 'text-red-600' : entry.type === 'DEPOSIT' ? 'text-green-600' : entry.type === 'WITHDRAW' ? 'text-orange-600' : 'text-blue-600'}">{entry.type}</span>
            <span class="text-slate-700">{entry.detail}</span>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
    >
      Done exploring
    </button>
  </div>
</div>
{/if}

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
