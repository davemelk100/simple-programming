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
  let videoRef = $state<HTMLVideoElement | null>(null);

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
      videoStart: 10,
      videoEnd: 9,
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
      videoStart: 5,
      videoEnd: 10,
      videoSpeed: 1,
    },
    {
      id: 'backend',
      title: 'Backend',
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
      videoStart: 5,
      videoEnd: 10,
    },
    {
      id: 'frontend',
      title: 'Frontend',
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
      videoStart: 4,
    },
  ];

  onMount(() => {
    visible = true;
  });

  function transitionTo(i: number) {
    if (sliding) return;
    sliding = true;
    setTimeout(() => {
      current = i;
      sliding = false;
      entering = true;
      pulsing = current < slides.length - 1;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { entering = false; });
      });
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

  function togglePause() {
    paused = !paused;
    if (videoRef) {
      if (paused) videoRef.pause();
      else videoRef.play();
    }
  }

  let slide = $derived(slides[current]);
  let svgHeight = $derived(current * 150 + 140);
</script>

<div class="rounded-2xl border border-slate-200 bg-gradient-to-b from-sky-50/50 to-amber-50/30 px-6 pb-4 pt-4 shadow-sm sm:px-8 sm:pb-6 lg:px-10 lg:pb-8">
  <!-- Carousel: 2-col on sm+, stacked on mobile -->
  <div class="grid grid-cols-1 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_minmax(0,28rem)] sm:gap-6 lg:gap-8
    {entering ? 'opacity-0' : sliding ? 'opacity-0 transition-opacity duration-500 ease-in-out' : 'opacity-100 transition-opacity duration-500 ease-out'}">

    <!-- Left column: title, pagination, text -->
    <div class="flex flex-col gap-3 pt-2 sm:pt-10">
      <h3 class="flex items-center gap-2 text-xl sm:text-2xl uppercase {slide.textColor}" style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-weight: 800;">
        <span class="text-2xl leading-none">{slide.icon}</span>
        {slide.title}
      </h3>

      <div class="flex items-center gap-3">
        <button
          onclick={prev}
          class="rounded-full border border-slate-200 bg-white p-1.5 text-slate-400 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
          aria-label="Previous"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <span class="hidden sm:inline text-sm font-bold leading-none {slide.textColor}">{current + 1}</span>
        <span class="hidden sm:inline text-sm font-medium text-slate-400">of</span>
        <span class="hidden sm:inline text-sm font-medium text-slate-400">{slides.length}</span>
        <button
          onclick={togglePause}
          class="sm:hidden rounded-full border border-slate-200 bg-white p-1.5 text-slate-400 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
          aria-label={paused ? 'Play' : 'Pause'}
        >
          {#if paused}
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          {:else}
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
          {/if}
        </button>
        <button
          onclick={next}
          class="rounded-full border border-slate-200 bg-white p-1.5 text-slate-400 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700 {pulsing ? 'animate-pulse ring-2 ring-indigo-300' : ''}"
          aria-label="Next"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        <button
          onclick={togglePause}
          class="hidden sm:block rounded-full border border-slate-200 bg-white p-1.5 text-slate-400 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
          aria-label={paused ? 'Play' : 'Pause'}
        >
          {#if paused}
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          {:else}
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
          {/if}
        </button>
      </div>

      <div>
        <p class="text-sm font-semibold uppercase text-slate-500">{slide.subtitle}</p>
        <p class="mt-2 text-sm leading-relaxed text-slate-600">{slide.description}</p>
      </div>
    </div>

    <!-- Right column: video + schematic overlay -->
    <div class="relative min-h-[28rem] sm:min-h-[36rem] lg:min-h-[40rem] mt-4 sm:mt-0 rounded-lg overflow-hidden">

      <!-- Schematic - overlaid on video -->
      <div class="relative z-10 font-mono p-2 sm:p-6 sm:max-w-lg">
          <svg viewBox="0 0 400 {svgHeight}" class="w-full" preserveAspectRatio="xMidYMin meet">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" stroke-width="0.5" opacity="0.5"/>
              </pattern>
            </defs>
            <!-- grid background hidden – video is the background -->

            {#each [
              { idx: 0, label: 'INFRASTRUCTURE', sub: 'The building itself', stroke: '#64748b', fill: '#f1f5f9', text: '#334155', subColor: '#94a3b8', tag: '#cbd5e1', num: 'L1' },
              { idx: 1, label: 'CONFIGURATION', sub: 'The rules and policies', stroke: '#d97706', fill: '#fffbeb', text: '#92400e', subColor: '#d97706', tag: '#fcd34d', num: 'L2' },
              { idx: 2, label: 'DATABASE', sub: 'The vault and ledger', stroke: '#16a34a', fill: '#f0fdf4', text: '#166534', subColor: '#16a34a', tag: '#86efac', num: 'L3' },
              { idx: 3, label: 'BACKEND', sub: 'The employees and computers', stroke: '#9333ea', fill: '#faf5ff', text: '#6b21a8', subColor: '#9333ea', tag: '#d8b4fe', num: 'L4' },
              { idx: 4, label: 'FRONTEND', sub: 'The teller window', stroke: '#2563eb', fill: '#eff6ff', text: '#1e40af', subColor: '#2563eb', tag: '#93c5fd', num: 'L5' },
            ] as layer}
              <!-- Layer box: position = (current - idx) slots from top. Newest at top. -->
              {#if layer.idx <= current}
                {@const pos = current - layer.idx}
                {@const isActive = layer.idx === current}
                <g style="opacity: {isActive ? 1 : 0.5}; transform: translateY({pos * 150}px); transition: all 0.7s ease-out;">
                  <!-- Scrim background for readability over video -->
                  <rect x="10" y="20" width="380" height="90" rx="5" fill="white" opacity={isActive ? 0.9 : 0.7}/>
                  <rect x="10" y="20" width="380" height="90" rx="5" fill={layer.fill} opacity={isActive ? 0.7 : 0.4}/>
                  <text x="30" y="55" fill={layer.text} font-size={isActive ? 24 : 20} font-weight={isActive ? '700' : '500'}>{layer.label}</text>
                  <text x="30" y="82" fill={layer.subColor} font-size={isActive ? 18 : 15}>{layer.sub}</text>
                  {#if layer.idx === 4 && isActive}
                    <!-- Celebration sparkles -->
                    <text x="340" y="45" font-size="36" class="celebrate-1">🎉</text>
                    <text x="365" y="75" font-size="30" class="celebrate-2">✨</text>
                    <text x="315" y="85" font-size="28" class="celebrate-3">🎊</text>
                    <text x="355" y="55" font-size="26" class="celebrate-4">💰</text>
                    <text x="325" y="40" font-size="24" class="celebrate-5">💵</text>
                  {/if}
                </g>
                <!-- Up arrow from below (skip for the bottom-most visible layer) -->
                {#if pos > 0}
                  <g style="opacity: 1; transform: translateY({pos * 150}px); transition: all 0.7s ease-out;">
                    <line x1="200" y1="20" x2="200" y2="-20" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 2"/>
                    <polygon points="195,-14 200,-24 205,-14" fill="#94a3b8"/>
                  </g>
                {/if}
              {/if}
            {/each}
          </svg>
        </div>

        <!-- 2. Video/illustration - background on mobile, normal column on md+ -->
        <div class="absolute inset-0 z-0 h-full overflow-hidden rounded-lg">
          {#key slide.id}
            {#if slide.image}
              <img src={slide.image} alt={slide.title} class="w-full h-full object-cover rounded-lg"/>
            {:else if slide.video}
              <video
                src={slide.video}
                autoplay
                muted
                playsinline
                class="w-full h-full object-cover rounded-lg"
                style="opacity: {slide.videoStart ? 0 : 1}"
                bind:this={videoRef}
                onloadeddata={(e) => {
                  const vid = e.currentTarget;
                  if (slide.videoSpeed) vid.playbackRate = slide.videoSpeed;
                  if (slide.videoStart) {
                    vid.currentTime = slide.videoStart;
                    vid.addEventListener('seeked', () => { vid.style.opacity = '1'; }, { once: true });
                  }
                  if (paused) vid.pause();
                }}
                onended={(e) => {
                  const vid = e.currentTarget;
                  if (slide.videoStart && !vid.dataset.looped) {
                    vid.dataset.looped = 'true';
                    vid.currentTime = 0;
                    vid.play();
                  } else {
                    if (!paused) next();
                  }
                }}
                ontimeupdate={(e) => {
                  const vid = e.currentTarget;
                  if (slide.videoEnd && vid.currentTime >= slide.videoEnd) {
                    vid.pause();
                    if (!paused) next();
                  } else if (vid.dataset.looped && slide.videoStart && vid.currentTime >= slide.videoStart) {
                    vid.pause();
                    delete vid.dataset.looped;
                    if (!paused) next();
                  }
                }}
              ></video>
            {:else if slide.id === 'database'}
              <div class="flex w-full h-full items-center justify-center bg-slate-50 rounded-lg p-6">
                <VaultAnimation />
              </div>
            {:else if slide.id === 'infrastructure'}
              <div class="flex w-full h-full items-center justify-center bg-slate-50 rounded-lg p-6">
                <BankBuildingAnimation />
              </div>
            {:else}
              <LottiePlayer src={slide.lottie} class="w-full h-full" />
            {/if}
          {/key}
        </div>

      </div><!-- end right column -->
    </div><!-- end grid -->

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
