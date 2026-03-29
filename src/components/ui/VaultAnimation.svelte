<script lang="ts">
  import { onMount } from 'svelte';

  let mounted = $state(false);
  let doorOpen = $state(false);

  onMount(() => {
    mounted = true;
    // Animate door opening after mount
    setTimeout(() => { doorOpen = true; }, 600);
    // Loop: close and reopen
    const interval = setInterval(() => {
      doorOpen = false;
      setTimeout(() => { doorOpen = true; }, 800);
    }, 5000);
    return () => clearInterval(interval);
  });
</script>

<svg viewBox="0 0 300 260" fill="none" class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
  <!-- Vault room background -->
  <rect x="20" y="20" width="260" height="220" rx="12" fill="#f0fdf4"/>

  <!-- Vault interior (visible when door opens) -->
  <rect x="50" y="40" width="200" height="170" rx="8" fill="#dcfce7" stroke="#86efac" stroke-width="1"/>

  <!-- Shelves inside vault -->
  <line x1="60" y1="90" x2="240" y2="90" stroke="#bbf7d0" stroke-width="2"/>
  <line x1="60" y1="140" x2="240" y2="140" stroke="#bbf7d0" stroke-width="2"/>
  <line x1="60" y1="185" x2="240" y2="185" stroke="#bbf7d0" stroke-width="2"/>

  <!-- Money stacks - top shelf -->
  <g class="transition-all duration-700 {doorOpen ? 'opacity-100' : 'opacity-0'}">
    <!-- Stack 1 -->
    <rect x="70" y="62" width="40" height="8" rx="2" fill="#22c55e"/>
    <rect x="70" y="56" width="40" height="8" rx="2" fill="#16a34a"/>
    <rect x="70" y="50" width="40" height="8" rx="2" fill="#22c55e"/>
    <text x="90" y="57" text-anchor="middle" fill="white" font-size="5" font-weight="bold">$$$</text>
    <!-- Stack 2 -->
    <rect x="125" y="62" width="40" height="8" rx="2" fill="#22c55e"/>
    <rect x="125" y="56" width="40" height="8" rx="2" fill="#16a34a"/>
    <rect x="125" y="50" width="40" height="8" rx="2" fill="#22c55e"/>
    <text x="145" y="57" text-anchor="middle" fill="white" font-size="5" font-weight="bold">$$$</text>
    <!-- Stack 3 -->
    <rect x="180" y="65" width="40" height="8" rx="2" fill="#22c55e"/>
    <rect x="180" y="59" width="40" height="8" rx="2" fill="#16a34a"/>
    <text x="200" y="66" text-anchor="middle" fill="white" font-size="5" font-weight="bold">$$$</text>
  </g>

  <!-- Gold bars - middle shelf -->
  <g class="transition-all duration-700 delay-100 {doorOpen ? 'opacity-100' : 'opacity-0'}">
    <rect x="75" y="108" width="30" height="14" rx="2" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
    <rect x="110" y="108" width="30" height="14" rx="2" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
    <rect x="145" y="108" width="30" height="14" rx="2" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
    <rect x="180" y="108" width="30" height="14" rx="2" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
    <!-- Gold bar shine -->
    <rect x="80" y="110" width="8" height="2" rx="1" fill="#fde68a" opacity="0.7"/>
    <rect x="115" y="110" width="8" height="2" rx="1" fill="#fde68a" opacity="0.7"/>
    <rect x="150" y="110" width="8" height="2" rx="1" fill="#fde68a" opacity="0.7"/>
    <rect x="185" y="110" width="8" height="2" rx="1" fill="#fde68a" opacity="0.7"/>
  </g>

  <!-- Coin stacks - middle shelf -->
  <g class="transition-all duration-700 delay-200 {doorOpen ? 'opacity-100' : 'opacity-0'}">
    {#each [80, 110, 145, 185] as cx}
      <ellipse cx={cx} cy="133" rx="8" ry="3" fill="#fbbf24"/>
      <ellipse cx={cx} cy="130" rx="8" ry="3" fill="#fcd34d"/>
      <ellipse cx={cx} cy="127" rx="8" ry="3" fill="#fbbf24"/>
    {/each}
  </g>

  <!-- Ledger books - bottom shelf -->
  <g class="transition-all duration-700 delay-300 {doorOpen ? 'opacity-100' : 'opacity-0'}">
    <rect x="70" y="150" width="16" height="28" rx="2" fill="#15803d"/>
    <rect x="72" y="152" width="12" height="24" rx="1" fill="#22c55e"/>
    <rect x="92" y="155" width="16" height="25" rx="2" fill="#1e40af"/>
    <rect x="94" y="157" width="12" height="21" rx="1" fill="#3b82f6"/>
    <rect x="114" y="152" width="16" height="28" rx="2" fill="#7c2d12"/>
    <rect x="116" y="154" width="12" height="24" rx="1" fill="#b45309"/>
    <!-- Labels -->
    <text x="78" y="168" text-anchor="middle" fill="white" font-size="4" transform="rotate(-90,78,168)">ACCTS</text>
    <text x="100" y="171" text-anchor="middle" fill="white" font-size="4" transform="rotate(-90,100,171)">TXNS</text>
    <text x="122" y="170" text-anchor="middle" fill="white" font-size="4" transform="rotate(-90,122,170)">LOANS</text>
  </g>

  <!-- Vault door -->
  <g class="transition-all duration-700 ease-in-out" style="transform-origin: 50px 130px; transform: perspective(400px) rotateY({doorOpen ? -65 : 0}deg);">
    <!-- Door body -->
    <rect x="40" y="35" width="220" height="185" rx="10" fill="#86efac" stroke="#22c55e" stroke-width="3"/>
    <!-- Door inner border -->
    <rect x="55" y="50" width="190" height="155" rx="6" fill="#bbf7d0" stroke="#22c55e" stroke-width="1.5"/>

    <!-- Combination lock -->
    <circle cx="150" cy="125" r="40" fill="#f0fdf4" stroke="#22c55e" stroke-width="3"/>
    <circle cx="150" cy="125" r="28" fill="white" stroke="#16a34a" stroke-width="2"/>
    <circle cx="150" cy="125" r="6" fill="#22c55e"/>
    <!-- Dial marks -->
    {#each Array(12) as _, i}
      <line
        x1={150 + Math.cos(i * 30 * Math.PI / 180) * 22}
        y1={125 + Math.sin(i * 30 * Math.PI / 180) * 22}
        x2={150 + Math.cos(i * 30 * Math.PI / 180) * 26}
        y2={125 + Math.sin(i * 30 * Math.PI / 180) * 26}
        stroke="#22c55e" stroke-width="2" stroke-linecap="round"
      />
    {/each}
    <!-- Dial pointer -->
    <line x1="150" y1="125" x2="150" y2="101" stroke="#15803d" stroke-width="2.5" stroke-linecap="round"/>

    <!-- Handle bars -->
    <rect x="195" y="100" width="30" height="8" rx="4" fill="#22c55e"/>
    <rect x="195" y="115" width="30" height="8" rx="4" fill="#22c55e"/>
    <rect x="195" y="130" width="30" height="8" rx="4" fill="#22c55e"/>

    <!-- Locking bolts -->
    <circle cx="65" cy="70" r="6" fill="#22c55e" stroke="#16a34a" stroke-width="1"/>
    <circle cx="65" cy="180" r="6" fill="#22c55e" stroke="#16a34a" stroke-width="1"/>
    <circle cx="235" cy="70" r="6" fill="#22c55e" stroke="#16a34a" stroke-width="1"/>
    <circle cx="235" cy="180" r="6" fill="#22c55e" stroke="#16a34a" stroke-width="1"/>

    <!-- "VAULT" text -->
    <text x="150" y="78" text-anchor="middle" fill="#15803d" font-size="14" font-weight="bold" letter-spacing="6">VAULT</text>
  </g>

  <!-- Hinges (always visible on left side) -->
  <rect x="36" y="55" width="8" height="20" rx="3" fill="#16a34a"/>
  <rect x="36" y="170" width="8" height="20" rx="3" fill="#16a34a"/>

  <!-- Floor shadow -->
  <ellipse cx="150" cy="230" rx="110" ry="8" fill="#86efac" opacity="0.3"/>
</svg>
