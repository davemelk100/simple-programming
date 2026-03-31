<script lang="ts">
  import { onMount } from 'svelte';
  import LottiePlayer from './LottiePlayer.svelte';
  import VaultAnimation from './VaultAnimation.svelte';
  import BankBuildingAnimation from './BankBuildingAnimation.svelte';

  let visible = $state(false);
  let current = $state(0);
  let pulsing = $state(true);
  let sliding = $state(false);
  let entering = $state(false);
  let paused = $state(false);
  let videoRefs: (HTMLVideoElement | null)[] = $state(new Array(5).fill(null));

  interface Slide {
    id: string;
    title: string;
    subtitle: string;
    metaphor: string;
    description: string;
    insight: string;
    techs: string[];
    color: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
    tagColor: string;
    tagTextColor: string;
    insightBg: string;
    walkthrough: string;
    lottie: string;
    video?: string;
    videoStart?: number;
    videoEnd?: number;
    videoSpeed?: number;
    image?: string;
    icon: string;
  }

  const slides: Slide[] = [
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      subtitle: 'Servers, power, network',
      metaphor: '🏗️',
      description: 'Before anything else, the building must exist. Power, security cameras, vault locks, internet wiring, and the network connecting branches. Without this foundation, there is no bank.',
      insight: 'Existence',
      techs: ['Cloud', 'CI/CD', 'DNS', 'Servers'],
      color: 'slate', bgColor: 'bg-slate-50', borderColor: 'border-slate-300', textColor: 'text-slate-700',
      tagColor: 'bg-slate-200', tagTextColor: 'text-slate-700', insightBg: 'bg-slate-100',
      icon: '🏦',
      walkthrough: 'Step 1: The building goes up. Power turns on. Security is armed. The bank exists.',
      lottie: '/lottie/infrastructure.json',
      video: '/lottie/infrastructure.mp4',
      videoEnd: 4,
    },
    {
      id: 'config',
      title: 'Configuration',
      subtitle: 'Policies, environmental variables, settings',
      metaphor: '⚙️',
      description: 'Before the doors open, the bank sets its rules. Interest rates, daily withdrawal limits, security keys, and feature toggles. These policies govern every decision the bank will ever make.',
      insight: 'Policy',
      techs: ['.env', 'JSON', 'YAML'],
      color: 'amber', bgColor: 'bg-amber-50', borderColor: 'border-amber-300', textColor: 'text-amber-700',
      tagColor: 'bg-amber-200', tagTextColor: 'text-amber-800', insightBg: 'bg-amber-100',
      icon: '⚙️',
      walkthrough: 'Step 2: Policies are written. $500 daily limit. PIN required. 2FA enabled. The rules are set.',
      lottie: '/lottie/config.json',
      video: '/lottie/config.mp4',
      videoEnd: 4,
    },
    {
      id: 'database',
      title: 'Database',
      subtitle: 'Vault, ledger, records',
      metaphor: '🗄️',
      description: 'The vault is built and the ledger is ready. Account balances, transaction history, customer records — the money and every fact about it lives here. Nothing can happen until truth has a place to be stored.',
      insight: 'Truth',
      techs: ['SQL', 'NoSQL', 'Redis'],
      color: 'green', bgColor: 'bg-green-50', borderColor: 'border-green-300', textColor: 'text-green-700',
      tagColor: 'bg-green-200', tagTextColor: 'text-green-800', insightBg: 'bg-green-100',
      icon: '🗄️',
      walkthrough: 'Step 3: The vault is stocked and the ledger opens. Your $240 is recorded. The money is real.',
      lottie: '/lottie/database.json',
      video: '/lottie/vault.mp4',
      videoStart: 1,
      videoEnd: 3,
      videoSpeed: 1,
    },
    {
      id: 'backend',
      title: 'Backend Code',
      subtitle: 'Logic, auth, processing',
      metaphor: '🧠',
      description: 'Now you hire the employees. They know how to read the ledger, follow the policies, verify identities, and make decisions. They are the brains that connect the vault to the customer.',
      insight: 'Actual control',
      techs: ['Python', 'Go', 'Node.js'],
      color: 'purple', bgColor: 'bg-purple-50', borderColor: 'border-purple-300', textColor: 'text-purple-700',
      tagColor: 'bg-purple-200', tagTextColor: 'text-purple-800', insightBg: 'bg-purple-100',
      icon: '🧠',
      walkthrough: 'Step 4: Employees are trained. They check your ID, read the ledger, follow the rules, and approve your withdrawal.',
      lottie: '/lottie/backend.json',
      video: '/lottie/backend.mp4',
      videoStart: 1,
      videoEnd: 4,
      videoPosition: 'center 60%',
    },
    {
      id: 'frontend',
      title: 'Frontend Code',
      subtitle: 'What users see',
      metaphor: '💁',
      description: 'Finally, the teller window opens. This is the only part you ever see — the counter, the forms, the friendly face. You hand over a withdrawal slip, and all four layers behind the counter work together to put cash in your hand.',
      insight: 'The illusion of control',
      techs: ['HTML', 'CSS', 'JavaScript'],
      color: 'blue', bgColor: 'bg-blue-50', borderColor: 'border-blue-300', textColor: 'text-blue-700',
      tagColor: 'bg-blue-200', tagTextColor: 'text-blue-800', insightBg: 'bg-blue-100',
      icon: '💁',
      walkthrough: 'Step 5: You tap "Withdraw $60." The ATM talks to the employees, who check the vault and the rules. Approved. Cash in hand.',
      lottie: '/lottie/frontend.json',
      video: '/lottie/frontend.mp4',
      videoStart: 2,
      videoEnd: 6,
    },
  ];

  onMount(() => {
    visible = true;
  });

  function transitionTo(i: number) {
    if (sliding) return;
    sliding = true;
    const prevIdx = current;
    current = i;
    // Pause previous video
    const prevVid = videoRefs[prevIdx];
    if (prevVid) prevVid.pause();
    // Start new video
    const newSlide = slides[i];
    const newVid = videoRefs[i];
    if (newVid) {
      if (newSlide.videoStart) newVid.currentTime = newSlide.videoStart;
      else newVid.currentTime = 0;
      delete newVid.dataset.looped;
      if (!paused) newVid.play();
    }
    pulsing = current < slides.length - 1;
    setTimeout(() => {
      sliding = false;
    }, 700);
  }


  function goTo(i: number) {
    if (i === current) return;
    transitionTo(i);
  }

  function prev() {
    transitionTo((current - 1 + slides.length) % slides.length);
  }

  function next() {
    transitionTo((current + 1) % slides.length);
  }

  function fadeOutAndNext() {
    if (!paused) next();
  }

  function togglePause() {
    paused = !paused;
    const vid = videoRefs[current];
    if (vid) {
      if (paused) vid.pause();
      else vid.play();
    }
  }

  let slide = $derived(slides[current]);
  let svgHeight = $derived(current === 0 ? 230 : 70 + current * 125 + 140);
</script>

<div class="overflow-hidden" style="width: 100vw; margin-left: calc(-50vw + 50%); margin-top: calc(-1.5rem - 1px);">
  <div>

    <!-- Video / illustration area -->
    <div class="relative min-h-[28rem] sm:min-h-[36rem] lg:min-h-[40rem] overflow-hidden">

      <!-- Video/illustration backgrounds - all rendered, cross-fade via opacity -->
      {#each slides as s, idx}
        <div class="absolute inset-0 z-0 transition-opacity duration-700 ease-in-out" style="opacity: {idx === current ? 1 : 0};">
          {#if s.image}
            <img src={s.image} alt={s.title} class="w-full h-full object-cover"/>
          {:else if s.video}
            <video
              src={s.video}
              muted
              playsinline
              class="w-full h-full object-cover"
              style="object-position: {s.videoPosition ?? 'center'};"
              bind:this={videoRefs[idx]}
              onloadeddata={(e) => {
                const vid = e.currentTarget;
                if (s.videoSpeed) vid.playbackRate = s.videoSpeed;
                if (idx === 0) {
                  if (s.videoStart) {
                    vid.currentTime = s.videoStart;
                  }
                  if (!paused) vid.play();
                }
              }}
              onended={(e) => {
                if (idx !== current) return;
                if (!paused) fadeOutAndNext();
              }}
              ontimeupdate={(e) => {
                const vid = e.currentTarget;
                if (idx !== current) return;
                if (s.videoEnd && vid.currentTime >= s.videoEnd) {
                  vid.pause();
                  if (!paused) fadeOutAndNext();
                }
              }}
            ></video>
          {:else if s.id === 'database'}
            <div class="flex w-full h-full items-center justify-center bg-slate-50 p-6">
              <VaultAnimation />
            </div>
          {:else if s.id === 'infrastructure'}
            <div class="flex w-full h-full items-center justify-center bg-slate-50 p-6">
              <BankBuildingAnimation />
            </div>
          {:else}
            <LottiePlayer src={s.lottie} class="w-full h-full" />
          {/if}
        </div>
      {/each}

      <!-- Pagination controls - top right -->
      <div class="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-md bg-white/80 px-3 py-1.5 shadow-md backdrop-blur-sm">
        <button
          onclick={prev}
          class="rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Previous"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <span class="text-sm font-bold leading-none {slide.textColor}">{current + 1}</span>
        <span class="text-xs font-medium text-slate-400">of</span>
        <span class="text-sm font-medium text-slate-400">{slides.length}</span>
        <button
          onclick={next}
          class="rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 {pulsing ? 'animate-pulse ring-2 ring-indigo-300' : ''}"
          aria-label="Next"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        <button
          onclick={togglePause}
          class="rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label={paused ? 'Play' : 'Pause'}
        >
          {#if paused}
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          {:else}
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
          {/if}
        </button>
      </div>

      <!-- Schematic - overlaid on video -->
      <div class="relative z-20 font-mono p-2 sm:p-6 sm:max-w-lg pt-4">
          <!-- Bank metaphor description -->
          <h2 class="mb-3 rounded-md bg-white/80 px-3 py-2 shadow-md backdrop-blur-sm" style="font-family: 'Roboto', sans-serif;">
            <span class="block text-lg sm:text-xl font-bold text-slate-800 mb-1">Think of every application as a bank.</span>
            <span class="block text-xs sm:text-sm leading-relaxed text-slate-600 font-light">From the building itself to the teller window you walk up to, each layer has a job. This walkthrough builds a bank from the ground up — and shows you how software works the same way.</span>
          </h2>

          <svg viewBox="0 0 400 {svgHeight}" class="w-full" preserveAspectRatio="xMidYMin meet">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" stroke-width="0.5" opacity="0.5"/>
              </pattern>
            </defs>
            <!-- grid background hidden – video is the background -->

            {#each [
              { idx: 0, label: 'INFRASTRUCTURE', icon: '🏦', subtitle: 'Servers, power, network', sub: 'The building itself', desc: 'Before anything else, the building must exist. Power, security cameras, vault locks, internet wiring, and the network connecting branches. Without this foundation, there is no bank.', stroke: '#64748b', fill: '#f1f5f9', text: '#334155', subColor: '#94a3b8', tag: '#cbd5e1', num: 'L1' },
              { idx: 1, label: 'CONFIGURATION', icon: '⚙️', subtitle: 'Policies, env vars, settings', sub: 'The rules and policies', desc: 'Before the doors open, the bank sets its rules. Interest rates, daily withdrawal limits, security keys, and feature toggles. These policies govern every decision the bank will ever make.', stroke: '#d97706', fill: '#fffbeb', text: '#92400e', subColor: '#d97706', tag: '#fcd34d', num: 'L2' },
              { idx: 2, label: 'DATABASE', icon: '🗄️', subtitle: 'Vault, ledger, records', sub: 'The vault and ledger', desc: 'The vault is built and the ledger is ready. Account balances, transaction history, customer records — the money and every fact about it lives here. Nothing can happen until truth has a place to be stored.', stroke: '#16a34a', fill: '#f0fdf4', text: '#166534', subColor: '#16a34a', tag: '#86efac', num: 'L3' },
              { idx: 3, label: 'BACKEND CODE', icon: '🧠', subtitle: 'Logic, auth, processing', sub: 'The employees and computers', desc: 'Now you hire the employees. They know how to read the ledger, follow the policies, verify identities, and make decisions. They are the brains that connect the vault to the customer.', stroke: '#9333ea', fill: '#faf5ff', text: '#6b21a8', subColor: '#9333ea', tag: '#d8b4fe', num: 'L4' },
              { idx: 4, label: 'FRONTEND CODE', icon: '💁', subtitle: 'What users see', sub: 'The teller window', desc: 'Finally, the teller window opens. This is the only part you ever see — the counter, the forms, the friendly face. You hand over a withdrawal slip, and all four layers behind the counter work together to put cash in your hand.', stroke: '#2563eb', fill: '#eff6ff', text: '#1e40af', subColor: '#2563eb', tag: '#93c5fd', num: 'L5' },
            ] as layer}
              <!-- Layer box: position = (current - idx) slots from top. Newest at top. -->
              {#if layer.idx <= current}
                {@const pos = current - layer.idx}
                {@const isActive = layer.idx === current}
                {@const boxHeight = isActive ? 180 : 110}
                {@const yOffset = pos === 0 ? 0 : 70 + pos * 125}
                <g style="opacity: {isActive ? 1 : 0.5}; transform: translateY({yOffset}px); transition: all 0.7s ease-out;">
                  <!-- Scrim background for readability over video -->
                  <rect x="0" y="20" width="400" height={boxHeight} rx="5" fill="white" opacity={isActive ? 0.9 : 0.7} style="transition: height 0.7s ease-out;"/>
                  <rect x="0" y="20" width="400" height={boxHeight} rx="5" fill={layer.fill} opacity={isActive ? 0.7 : 0.4} style="transition: height 0.7s ease-out;"/>
                  <text x="10" y="55" fill={layer.text} font-size={isActive ? 22 : 18} font-weight={isActive ? '700' : '500'}>{layer.label}</text>
                  <text x="10" y="78" fill={layer.subColor} font-size={isActive ? 15 : 13}>{layer.sub}</text>
                  <text x="10" y="100" fill={layer.subColor} font-size={isActive ? 13 : 11} >({layer.subtitle.toUpperCase()})</text>
                  {#if isActive}
                    <foreignObject x="10" y="108" width="380" height="70">
                      <p style="font-size: 12px; line-height: 1.4; color: {layer.subColor}; margin: 0; font-family: sans-serif;">{layer.desc}</p>
                    </foreignObject>
                  {/if}
                </g>
                <!-- Up arrow from below (skip for the bottom-most visible layer) -->
                {#if pos > 0}
                  <g style="opacity: 1; transform: translateY({70 + pos * 125}px); transition: all 0.7s ease-out;">
                    <line x1="200" y1="20" x2="200" y2="-20" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 2"/>
                    <polygon points="195,-14 200,-24 205,-14" fill="#94a3b8"/>
                  </g>
                {/if}
              {/if}
            {/each}
          </svg>
        </div>


      </div><!-- end video area -->
    </div><!-- end stacked container -->
</div>

<style>
  @keyframes celebrate-float {
    0% { opacity: 0; transform: translate(0, 0) scale(0.5); }
    30% { opacity: 1; transform: translate(-5px, -10px) scale(1.2); }
    100% { opacity: 0; transform: translate(-10px, -25px) scale(0.8); }
  }
  :global(.celebrate-1) {
    animation: celebrate-float 1.5s ease-out infinite;
  }
  :global(.celebrate-2) {
    animation: celebrate-float 1.5s ease-out 0.3s infinite;
  }
  :global(.celebrate-3) {
    animation: celebrate-float 1.5s ease-out 0.6s infinite;
  }
  :global(.celebrate-4) {
    animation: celebrate-float 1.5s ease-out 0.9s infinite;
  }
  :global(.celebrate-5) {
    animation: celebrate-float 1.5s ease-out 1.2s infinite;
  }
</style>
