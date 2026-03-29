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
      videoStart: 6,
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
      videoStart: 7,
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
      videoStart: 7,
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
</script>

<div class="rounded-2xl border border-slate-200 bg-gradient-to-b from-sky-50/50 to-amber-50/30 px-4 pb-4 pt-2 shadow-sm sm:px-6 sm:pb-6 sm:pt-3 lg:px-8 lg:pb-8 lg:pt-4">
  <!-- Carousel -->
  <div>
    <!-- Title + Pagination row -->
    <div class="mb-4 flex items-center gap-3">
      <h3 class="flex items-center gap-2 text-xl sm:text-2xl {slide.textColor}" style="font-family: 'Roboto', sans-serif;">
        <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-current text-sm font-bold leading-none">{current + 1}</span>
        {slide.title}
      </h3>
      <div class="ml-auto flex items-center gap-3">
      <button
        onclick={prev}
        class="rounded-full border border-slate-200 bg-white p-1.5 text-slate-400 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
        aria-label="Previous"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <div class="flex items-center gap-2">
        <span class="flex h-8 w-8 items-center justify-center rounded-full {slide.tagColor} text-sm font-bold leading-none {slide.tagTextColor}">{current + 1}</span>
        <span class="text-sm font-medium text-slate-400">of {slides.length}</span>
      </div>
      <button
        onclick={next}
        class="rounded-full border border-slate-200 bg-white p-1.5 text-slate-400 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700 {pulsing ? 'animate-pulse ring-2 ring-indigo-300' : ''}"
        aria-label="Next"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
      <button
        onclick={togglePause}
        class="rounded-full border border-slate-200 bg-white p-1.5 text-slate-400 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
        aria-label={paused ? 'Play' : 'Pause'}
      >
        {#if paused}
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        {:else}
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
        {/if}
      </button>
      </div>
    </div>

    <!-- Slide content -->
    <div class="w-full overflow-hidden rounded-2xl
      {entering ? 'translate-x-12 opacity-0' : sliding ? '-translate-x-12 opacity-0 transition-all duration-700 ease-in-out' : 'translate-x-0 opacity-100 transition-all duration-500 ease-out'}">

      <!-- Top: text -->
      <div class="px-6 pt-6 sm:px-8 sm:pt-8">
        <p class="text-sm font-semibold uppercase text-slate-500">{slide.subtitle}</p>
        <p class="mt-2 text-sm leading-relaxed text-slate-600">{slide.description}</p>
      </div>

      <!-- Bottom: schematic | image | video -->
      <div class="grid grid-cols-1 sm:grid-cols-3 items-stretch gap-4 p-6 sm:p-8">

        <!-- 1. Schematic (far left) - newest on top, up arrows -->
        <div class="font-mono">
          <svg viewBox="0 0 400 720" class="w-full" preserveAspectRatio="xMidYMin meet">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" stroke-width="0.5" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="400" height="720" fill="url(#grid)" rx="8"/>

            {#each [
              { idx: 0, label: 'INFRASTRUCTURE', sub: 'Servers / DNS / Cloud / CI-CD', stroke: '#64748b', fill: '#f1f5f9', text: '#334155', subColor: '#94a3b8', tag: '#cbd5e1', num: 'L1' },
              { idx: 1, label: 'CONFIGURATION', sub: '.env / JSON / YAML / Secrets', stroke: '#d97706', fill: '#fffbeb', text: '#92400e', subColor: '#d97706', tag: '#fcd34d', num: 'L2' },
              { idx: 2, label: 'DATABASE', sub: 'SQL / NoSQL / Redis / Storage', stroke: '#16a34a', fill: '#f0fdf4', text: '#166534', subColor: '#16a34a', tag: '#86efac', num: 'L3' },
              { idx: 3, label: 'BACKEND', sub: 'API / Auth / Logic / Processing', stroke: '#9333ea', fill: '#faf5ff', text: '#6b21a8', subColor: '#9333ea', tag: '#d8b4fe', num: 'L4' },
              { idx: 4, label: 'FRONTEND', sub: 'HTML / CSS / JS / UI', stroke: '#2563eb', fill: '#eff6ff', text: '#1e40af', subColor: '#2563eb', tag: '#93c5fd', num: 'L5' },
            ] as layer}
              <!-- Layer box: position = (current - idx) slots from top. Newest at top. -->
              {#if layer.idx <= current}
                {@const pos = current - layer.idx}
                <g style="opacity: 1; transform: translateY({pos * 130}px); transition: all 0.7s ease-out;">
                  <rect x="20" y="20" width="360" height="70" rx="3" fill="none" stroke={layer.stroke} stroke-width="1.5" stroke-dasharray={layer.idx === current ? 'none' : '4 2'}/>
                  <rect x="20" y="20" width="360" height="70" rx="3" fill={layer.fill} opacity="0.6"/>
                  <text x="50" y="48" fill={layer.text} font-size="18" font-weight="600">{layer.label}</text>
                  <text x="50" y="70" fill={layer.subColor} font-size="14">{layer.sub}</text>
                  <text x="360" y="62" text-anchor="end" fill={layer.tag} font-size="11">{layer.num}</text>
                </g>
                <!-- Up arrow from below (skip for the bottom-most visible layer) -->
                {#if pos > 0}
                  <g style="opacity: 1; transform: translateY({pos * 130}px); transition: all 0.7s ease-out;">
                    <line x1="200" y1="20" x2="200" y2="-20" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 2"/>
                    <polygon points="195,-14 200,-24 205,-14" fill="#94a3b8"/>
                  </g>
                {/if}
              {/if}
            {/each}
          </svg>
        </div>

        <!-- 2. Video/illustration (middle) -->
        <div class="overflow-hidden rounded-lg">
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
                  if (vid.dataset.looped && slide.videoStart && vid.currentTime >= slide.videoStart) {
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

        <!-- 3. Band thumbnail (far right) -->
        <div>
        {#key slide.id}
          {#if slide.id === 'infrastructure'}
            <img src="/lottie/infra-thumb.jpg" alt="Infrastructure" class="w-full h-full object-cover rounded-lg"/>
          {:else if slide.id === 'config'}
            <img src="/lottie/config-thumb.avif" alt="Config" class="w-full h-full object-cover rounded-lg"/>
          {:else if slide.id === 'database'}
            <img src="/lottie/database-thumb.jpg" alt="Database" class="w-full h-full object-cover rounded-lg"/>
          {:else if slide.id === 'backend'}
            <img src="/lottie/backend-thumb.jpg" alt="Backend" class="w-full h-full object-cover rounded-lg"/>
          {:else if slide.id === 'frontend'}
            <img src="/lottie/frontend-thumb.avif" alt="Frontend" class="w-full h-full object-cover rounded-lg"/>
          {/if}
        {/key}
        </div>

      </div>
    </div>
  </div>

</div>
