<script lang="ts">
  import { onMount } from 'svelte';

  let mounted = $state(false);
  let lightsOn = $state(false);
  let flagWave = $state(0);

  onMount(() => {
    mounted = true;
    setTimeout(() => { lightsOn = true; }, 800);

    const flagInterval = setInterval(() => {
      flagWave = (flagWave + 1) % 3;
    }, 600);

    return () => clearInterval(flagInterval);
  });
</script>

<svg viewBox="0 0 300 300" fill="none" class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
  <!-- Sky gradient -->
  <rect x="0" y="0" width="300" height="210" fill="#eff6ff"/>

  <!-- Clouds -->
  <g class="transition-transform duration-[3000ms]" style="transform: translateX({mounted ? 6 : 0}px)">
    <ellipse cx="60" cy="40" rx="24" ry="10" fill="white" opacity="0.7"/>
    <ellipse cx="48" cy="38" rx="16" ry="8" fill="white" opacity="0.6"/>
    <ellipse cx="75" cy="38" rx="14" ry="7" fill="white" opacity="0.5"/>
  </g>
  <g class="transition-transform duration-[4000ms]" style="transform: translateX({mounted ? -4 : 0}px)">
    <ellipse cx="230" cy="55" rx="20" ry="8" fill="white" opacity="0.5"/>
    <ellipse cx="245" cy="53" rx="14" ry="6" fill="white" opacity="0.4"/>
  </g>

  <!-- Ground / sidewalk -->
  <rect x="0" y="248" width="300" height="52" fill="#d1d5db"/>
  <rect x="0" y="248" width="300" height="6" fill="#9ca3af"/>
  <!-- Sidewalk lines -->
  <line x1="0" y1="270" x2="300" y2="270" stroke="#e5e7eb" stroke-width="1"/>

  <!-- Bank building base -->
  <rect x="40" y="115" width="220" height="133" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>

  <!-- Foundation -->
  <rect x="35" y="242" width="230" height="8" rx="2" fill="#94a3b8"/>

  <!-- Pediment / triangular roof -->
  <path d="M30 118 L150 45 L270 118Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" stroke-linejoin="round"/>
  <!-- Pediment inner triangle decoration -->
  <path d="M60 116 L150 62 L240 116Z" fill="none" stroke="#cbd5e1" stroke-width="1.5"/>

  <!-- Roof top detail -->
  <rect x="135" y="42" width="30" height="6" rx="2" fill="#94a3b8"/>

  <!-- Flag pole -->
  <line x1="150" y1="10" x2="150" y2="42" stroke="#64748b" stroke-width="2.5"/>
  <circle cx="150" cy="10" r="2.5" fill="#fbbf24"/>
  <!-- Flag waving -->
  <g>
    {#if flagWave === 0}
      <path d="M152 12 L172 16 L170 22 L152 20Z" fill="#1e40af"/>
      <path d="M152 20 L170 22 L168 28 L152 26Z" fill="#dc2626"/>
    {:else if flagWave === 1}
      <path d="M152 12 L174 14 L172 21 L152 20Z" fill="#1e40af"/>
      <path d="M152 20 L172 21 L170 27 L152 26Z" fill="#dc2626"/>
    {:else}
      <path d="M152 12 L173 17 L170 22 L152 20Z" fill="#1e40af"/>
      <path d="M152 20 L170 22 L167 28 L152 26Z" fill="#dc2626"/>
    {/if}
  </g>

  <!-- Columns -->
  {#each [65, 110, 155, 200, 245] as x}
    <!-- Column base -->
    <rect x={x - 8} y="235" width="16" height="7" rx="1" fill="#cbd5e1"/>
    <!-- Column shaft -->
    <rect x={x - 5} y="118" width="10" height="117" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1"/>
    <!-- Column capital -->
    <rect x={x - 8} y="114" width="16" height="6" rx="1" fill="#cbd5e1"/>
    <!-- Column fluting lines -->
    <line x1={x - 2} y1="120" x2={x - 2} y2="234" stroke="#cbd5e1" stroke-width="0.5"/>
    <line x1={x + 2} y1="120" x2={x + 2} y2="234" stroke="#cbd5e1" stroke-width="0.5"/>
  {/each}

  <!-- Bank name -->
  <text x="150" y="102" text-anchor="middle" fill="#475569" font-size="10" font-weight="bold" letter-spacing="3">FIRST NATIONAL</text>
  <text x="150" y="112" text-anchor="middle" fill="#64748b" font-size="7" letter-spacing="5">BANK</text>

  <!-- Windows row 1 -->
  {#each [80, 130, 180, 230] as x}
    <rect x={x - 10} y="130" width="20" height="28" rx="2" fill={lightsOn ? '#fef3c7' : '#e2e8f0'} stroke="#94a3b8" stroke-width="1" class="transition-colors duration-500"/>
    <!-- Window cross -->
    <line x1={x} y1="130" x2={x} y2="158" stroke="#94a3b8" stroke-width="0.75"/>
    <line x1={x - 10} y1="144" x2={x + 10} y2="144" stroke="#94a3b8" stroke-width="0.75"/>
    <!-- Warm glow -->
    {#if lightsOn}
      <rect x={x - 8} y="132" width="7" height="10" rx="1" fill="#fbbf24" opacity="0.15"/>
    {/if}
  {/each}

  <!-- Windows row 2 -->
  {#each [80, 130] as x}
    <rect x={x - 10} y="172" width="20" height="28" rx="2" fill={lightsOn ? '#fef3c7' : '#e2e8f0'} stroke="#94a3b8" stroke-width="1" class="transition-colors duration-500"/>
    <line x1={x} y1="172" x2={x} y2="200" stroke="#94a3b8" stroke-width="0.75"/>
    <line x1={x - 10} y1="186" x2={x + 10} y2="186" stroke="#94a3b8" stroke-width="0.75"/>
    {#if lightsOn}
      <rect x={x - 8} y="174" width="7" height="10" rx="1" fill="#fbbf24" opacity="0.15"/>
    {/if}
  {/each}

  <!-- Main entrance doors -->
  <rect x="170" y="168" width="60" height="74" rx="4" fill="#475569" stroke="#334155" stroke-width="2"/>
  <!-- Door panels -->
  <rect x="173" y="171" width="25" height="68" rx="2" fill="#334155"/>
  <rect x="202" y="171" width="25" height="68" rx="2" fill="#334155"/>
  <!-- Door handles -->
  <circle cx="196" cy="208" r="2.5" fill="#fbbf24"/>
  <circle cx="204" cy="208" r="2.5" fill="#fbbf24"/>
  <!-- Door arch -->
  <path d="M170 168 Q200 150 230 168" fill="none" stroke="#334155" stroke-width="2"/>
  <!-- Entrance light -->
  <rect x="192" y="156" width="16" height="8" rx="3" fill={lightsOn ? '#fbbf24' : '#94a3b8'} opacity={lightsOn ? 0.8 : 0.5} class="transition-all duration-500"/>

  <!-- Steps -->
  <rect x="160" y="242" width="80" height="6" rx="1" fill="#cbd5e1"/>
  <rect x="155" y="248" width="90" height="5" rx="1" fill="#d1d5db" stroke="#9ca3af" stroke-width="0.5"/>
  <rect x="150" y="253" width="100" height="5" rx="1" fill="#e5e7eb" stroke="#9ca3af" stroke-width="0.5"/>

  <!-- Security camera -->
  <circle cx="52" cy="122" r="4" fill="#64748b"/>
  <rect x="44" y="119" width="6" height="4" rx="1" fill="#64748b"/>
  <line x1="44" y1="121" x2="38" y2="118" stroke="#64748b" stroke-width="1.5"/>
  <!-- Camera blink -->
  <circle cx="52" cy="122" r="1.5" fill={lightsOn ? '#ef4444' : '#94a3b8'} class={lightsOn ? 'animate-pulse' : ''}/>

  <!-- Power lines coming in -->
  <line x1="0" y1="85" x2="38" y2="105" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/>
  <line x1="0" y1="90" x2="38" y2="110" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/>
  <!-- Power pole -->
  <line x1="0" y1="60" x2="0" y2="248" stroke="#78716c" stroke-width="3"/>
  <line x1="-8" y1="80" x2="8" y2="80" stroke="#78716c" stroke-width="2"/>

  <!-- WiFi / network signal -->
  <g class="transition-opacity duration-300" opacity={lightsOn ? 1 : 0.3}>
    <path d="M270 85c-6-6-16-6-22 0" stroke="#3b82f6" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M267 80c-4-5-12-5-16 0" stroke="#3b82f6" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.6"/>
    <path d="M264 75c-3-3-7-3-10 0" stroke="#3b82f6" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.3"/>
    <circle cx="259" cy="89" r="2.5" fill="#3b82f6"/>
  </g>

  <!-- ATM on side of building -->
  <rect x="44" y="195" width="22" height="40" rx="3" fill="#60a5fa" stroke="#3b82f6" stroke-width="1"/>
  <rect x="47" y="199" width="16" height="10" rx="1.5" fill="#1e3a5f"/>
  <rect x="47" y="213" width="16" height="3" rx="1" fill="#bfdbfe"/>
  <rect x="47" y="220" width="16" height="3" rx="1" fill="#93c5fd"/>
  <text x="55" y="206" text-anchor="middle" fill="#60a5fa" font-size="3.5">ATM</text>

  <!-- Decorative bushes -->
  <ellipse cx="155" cy="258" rx="12" ry="8" fill="#22c55e" opacity="0.6"/>
  <ellipse cx="245" cy="258" rx="12" ry="8" fill="#22c55e" opacity="0.6"/>
  <ellipse cx="160" cy="256" rx="8" ry="6" fill="#16a34a" opacity="0.5"/>
  <ellipse cx="250" cy="256" rx="8" ry="6" fill="#16a34a" opacity="0.5"/>
</svg>
