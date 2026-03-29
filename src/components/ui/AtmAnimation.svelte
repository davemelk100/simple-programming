<script lang="ts">
  import { onMount } from 'svelte';

  let phase = $state(0);
  // 0 = idle, 1 = card inserted, 2 = typing PIN, 3 = cash dispensing, 4 = taking cash

  onMount(() => {
    runCycle();
    const interval = setInterval(runCycle, 8000);
    return () => clearInterval(interval);
  });

  function runCycle() {
    phase = 0;
    setTimeout(() => { phase = 1; }, 500);
    setTimeout(() => { phase = 2; }, 1500);
    setTimeout(() => { phase = 3; }, 3000);
    setTimeout(() => { phase = 4; }, 4500);
    setTimeout(() => { phase = 0; }, 6500);
  }
</script>

<svg viewBox="0 0 300 300" fill="none" class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
  <!-- Floor -->
  <rect x="0" y="265" width="300" height="35" rx="4" fill="#e2e8f0"/>

  <!-- ATM Machine -->
  <rect x="150" y="60" width="100" height="205" rx="8" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
  <!-- ATM top -->
  <rect x="150" y="55" width="100" height="16" rx="6" fill="#94a3b8"/>
  <!-- Screen -->
  <rect x="162" y="80" width="76" height="50" rx="4" fill="#1e293b"/>
  <!-- Screen content -->
  {#if phase === 0}
    <text x="200" y="100" text-anchor="middle" fill="#60a5fa" font-size="7" font-weight="bold">WELCOME</text>
    <text x="200" y="114" text-anchor="middle" fill="#94a3b8" font-size="5">INSERT CARD</text>
  {:else if phase === 1}
    <text x="200" y="100" text-anchor="middle" fill="#60a5fa" font-size="7" font-weight="bold">CARD READ</text>
    <text x="200" y="114" text-anchor="middle" fill="#94a3b8" font-size="5">ENTER PIN</text>
  {:else if phase === 2}
    <text x="200" y="100" text-anchor="middle" fill="#60a5fa" font-size="7" font-weight="bold">ENTER PIN</text>
    <text x="200" y="114" text-anchor="middle" fill="#fbbf24" font-size="8">● ● ● ●</text>
  {:else if phase === 3}
    <text x="200" y="100" text-anchor="middle" fill="#22c55e" font-size="7" font-weight="bold">APPROVED</text>
    <text x="200" y="114" text-anchor="middle" fill="#94a3b8" font-size="5">DISPENSING...</text>
  {:else}
    <text x="200" y="100" text-anchor="middle" fill="#22c55e" font-size="7" font-weight="bold">TAKE CASH</text>
    <text x="200" y="114" text-anchor="middle" fill="#22c55e" font-size="9">$60.00</text>
  {/if}
  <!-- Screen glow -->
  <rect x="162" y="80" width="76" height="50" rx="4" fill="#60a5fa" opacity="0.05"/>

  <!-- Keypad -->
  {#each [0,1,2] as row}
    {#each [0,1,2] as col}
      <rect x={168 + col * 22} y={142 + row * 16} width="16" height="11" rx="2.5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="0.75"/>
    {/each}
  {/each}
  <!-- Green enter button -->
  <rect x="168" y="190" width="66" height="11" rx="2.5" fill="#86efac" stroke="#22c55e" stroke-width="0.75"/>

  <!-- Card slot -->
  <rect x="178" y="210" width="44" height="6" rx="3" fill="#64748b"/>

  <!-- Card inserting animation -->
  {#if phase === 1}
    <rect x="182" y="206" width="36" height="10" rx="2" fill="#3b82f6" class="animate-pulse">
      <animate attributeName="y" values="200;212" dur="0.4s" fill="freeze"/>
    </rect>
    <rect x="190" y="208" width="12" height="3" rx="1" fill="#fbbf24">
      <animate attributeName="y" values="202;214" dur="0.4s" fill="freeze"/>
    </rect>
  {/if}

  <!-- Cash slot -->
  <rect x="168" y="230" width="64" height="8" rx="3" fill="#475569"/>
  <rect x="172" y="232" width="56" height="4" rx="2" fill="#334155"/>

  <!-- Cash dispensing -->
  {#if phase >= 3}
    <g class="transition-all duration-500">
      <rect x="176" y={phase >= 4 ? 220 : 232} width="48" height="22" rx="2" fill="#22c55e"
        class="transition-all duration-500"
        opacity={phase >= 4 ? 0.9 : 0.7}
      />
      <rect x="178" y={phase >= 4 ? 222 : 234} width="44" height="18" rx="1" fill="#16a34a"
        class="transition-all duration-500"
      />
      <text x="200" y={phase >= 4 ? 234 : 246} text-anchor="middle" fill="white" font-size="7" font-weight="bold"
        class="transition-all duration-500"
      >$60</text>
    </g>
  {/if}

  <!-- Receipt printer -->
  <rect x="230" y="195" width="12" height="4" rx="1" fill="#94a3b8"/>
  {#if phase >= 4}
    <rect x="231" y="185" width="10" height="14" rx="1" fill="white" stroke="#cbd5e1" stroke-width="0.5">
      <animate attributeName="y" values="195;182" dur="0.3s" fill="freeze"/>
    </rect>
    <line x1="233" y1="188" x2="239" y2="188" stroke="#cbd5e1" stroke-width="0.5"/>
    <line x1="233" y1="191" x2="238" y2="191" stroke="#cbd5e1" stroke-width="0.5"/>
  {/if}

  <!-- Person -->
  <!-- Shadow -->
  <ellipse cx="90" cy="268" rx="35" ry="5" fill="#94a3b8" opacity="0.2"/>

  <!-- Legs -->
  <rect x="75" y="220" width="12" height="48" rx="4" fill="#1e3a5f"/>
  <rect x="95" y="220" width="12" height="48" rx="4" fill="#1e3a5f"/>
  <!-- Shoes -->
  <rect x="72" y="258" width="18" height="8" rx="3" fill="#334155"/>
  <rect x="92" y="258" width="18" height="8" rx="3" fill="#334155"/>

  <!-- Body / torso -->
  <rect x="65" y="140" width="52" height="88" rx="10" fill="#3b82f6"/>
  <!-- Shirt collar -->
  <path d="M80 144l11-6 11 6" fill="#2563eb" stroke="#2563eb" stroke-width="1"/>

  <!-- Left arm (at side) -->
  <rect x="55" y="150" width="14" height="60" rx="5" fill="#3b82f6"/>
  <!-- Left hand -->
  <circle cx="62" cy="215" r="7" fill="#f5d0b0"/>

  <!-- Right arm (reaching toward ATM) -->
  <g class="transition-all duration-500" style="transform-origin: 117px 155px;">
    {#if phase === 2}
      <!-- Pressing keypad -->
      <rect x="117" y="150" width="14" height="44" rx="5" fill="#3b82f6" transform="rotate(25, 117, 150)"/>
      <circle cx="148" cy="175" r="7" fill="#f5d0b0"/>
      <!-- Finger pressing -->
      <circle cx="152" cy="170" r="3" fill="#f5d0b0"/>
    {:else if phase >= 3 && phase <= 4}
      <!-- Reaching for cash -->
      <rect x="117" y="150" width="14" height="52" rx="5" fill="#3b82f6" transform="rotate(30, 117, 150)"/>
      <circle cx="155" cy="185" r="7" fill="#f5d0b0"/>
    {:else}
      <!-- Arm at rest-ish, slightly forward -->
      <rect x="110" y="150" width="14" height="50" rx="5" fill="#3b82f6" transform="rotate(10, 115, 150)"/>
      <circle cx="130" cy="200" r="7" fill="#f5d0b0"/>
    {/if}
  </g>

  <!-- Neck -->
  <rect x="83" y="122" width="16" height="22" rx="6" fill="#f5d0b0"/>

  <!-- Head -->
  <circle cx="91" cy="108" r="26" fill="#f5d0b0"/>
  <!-- Hair -->
  <path d="M65 100c0-18 14-32 26-32s26 12 26 28c0 4-2 6-4 6h-44c-2 0-4-2-4-4z" fill="#44403c"/>
  <!-- Eyes -->
  <circle cx="82" cy="108" r="2.5" fill="#1e293b"/>
  <circle cx="100" cy="108" r="2.5" fill="#1e293b"/>
  <!-- Eye whites -->
  <circle cx="82.5" cy="107.5" r="0.8" fill="white"/>
  <circle cx="100.5" cy="107.5" r="0.8" fill="white"/>
  <!-- Eyebrows -->
  <line x1="78" y1="102" x2="86" y2="101" stroke="#44403c" stroke-width="2" stroke-linecap="round"/>
  <line x1="96" y1="101" x2="104" y2="102" stroke="#44403c" stroke-width="2" stroke-linecap="round"/>
  <!-- Smile -->
  {#if phase >= 3}
    <path d="M84 116c3 4 10 4 14 0" stroke="#b45309" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  {:else}
    <path d="M86 116c2 2 8 2 10 0" stroke="#b45309" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  {/if}

  <!-- Wallet in back pocket hint -->
  <rect x="58" y="210" width="14" height="10" rx="2" fill="#78350f"/>

  <!-- Status indicator on ATM -->
  <circle cx="240" cy="68" r="3" fill={phase >= 3 ? '#22c55e' : phase >= 1 ? '#fbbf24' : '#94a3b8'} class={phase >= 1 && phase < 3 ? 'animate-pulse' : ''}/>
</svg>
