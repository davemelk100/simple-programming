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
      videoStart: 6,
      videoSpeed: 0.8,
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
      videoStart: 6,
      videoSpeed: 0.8,
    },
  ];

  onMount(() => {
    visible = true;
    // Ensure first video starts playing
    const firstVid = videoRefs[0];
    if (firstVid) {
      const firstSlide = slides[0];
      if (firstSlide.videoStart) firstVid.currentTime = firstSlide.videoStart;
      firstVid.play().catch(() => {});
    } else {
      // Video ref may not be ready yet, retry shortly
      setTimeout(() => {
        const vid = videoRefs[0];
        if (vid) {
          const firstSlide = slides[0];
          if (firstSlide.videoStart) vid.currentTime = firstSlide.videoStart;
          vid.play().catch(() => {});
        }
      }, 500);
    }
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
      if (newSlide.videoSpeed) newVid.playbackRate = newSlide.videoSpeed;
      else newVid.playbackRate = 1;
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

  const layers = [
    { idx: 0, label: 'INFRASTRUCTURE', subtitle: 'Servers, power, network', sub: 'The building itself', desc: 'Before anything else, the building must exist. Power, security cameras, vault locks, internet wiring, and the network connecting branches. Without this foundation, there is no bank.', fill: 'bg-slate-100/70', text: 'text-slate-700', subColor: 'text-slate-400' },
    { idx: 1, label: 'CONFIGURATION', subtitle: 'Policies, env vars, settings', sub: 'The rules and policies', desc: 'Before the doors open, the bank sets its rules. Interest rates, daily withdrawal limits, security keys, and feature toggles. These policies govern every decision the bank will ever make.', fill: 'bg-amber-50/70', text: 'text-amber-900', subColor: 'text-amber-600' },
    { idx: 2, label: 'DATABASE', subtitle: 'Vault, ledger, records', sub: 'The vault and ledger', desc: 'The vault is built and the ledger is ready. Account balances, transaction history, customer records — the money and every fact about it lives here. Nothing can happen until truth has a place to be stored.', fill: 'bg-green-50/70', text: 'text-green-800', subColor: 'text-green-600' },
    { idx: 3, label: 'BACKEND CODE', subtitle: 'Logic, auth, processing', sub: 'The employees and computers', desc: 'Now you hire the employees. They know how to read the ledger, follow the policies, verify identities, and make decisions. They are the brains that connect the vault to the customer.', fill: 'bg-purple-50/70', text: 'text-purple-800', subColor: 'text-purple-500' },
    { idx: 4, label: 'FRONTEND CODE', subtitle: 'What users see', sub: 'The teller window', desc: 'Finally, the teller window opens. This is the only part you ever see — the counter, the forms, the friendly face. You hand over a withdrawal slip, and all four layers behind the counter work together to put cash in your hand.', fill: 'bg-blue-50/70', text: 'text-blue-800', subColor: 'text-blue-500' },
  ];
</script>

<div class="overflow-hidden" style="width: 100vw; margin-left: calc(-50vw + 50%); margin-top: calc(-1.5rem - 1px);">
  <div>

    <!-- Video / illustration area -->
    <div class="relative min-h-[32rem] sm:min-h-[36rem] lg:min-h-[40rem] overflow-hidden">

      <!-- Video/illustration backgrounds - all rendered, cross-fade via opacity -->
      {#each slides as s, idx}
        <div class="absolute inset-0 z-0 transition-opacity duration-700 ease-in-out" style="opacity: {idx === current ? 1 : 0}; top: 5rem;">
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

      <!-- Schematic - overlaid on video -->
      <div class="relative z-20 font-mono">
          <!-- Bank metaphor description + pagination inline -->
          <div class="mb-0 bg-white/60 px-3 py-1.5 sm:px-4 sm:py-2 shadow-md backdrop-blur-sm flex items-center justify-between">
            <h2 class="text-base sm:text-xl font-bold text-slate-800 m-0" style="font-family: 'Permanent Marker';">Think of every application as a bank.</h2>
            <div class="hidden sm:flex items-center gap-2 rounded-md bg-white/80 px-3 py-1.5 shadow-md backdrop-blur-sm">
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
          </div>

          <!-- Active band at top -->
          {#each layers as layer}
            {#if layer.idx === current}
              <div
                class="w-full px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-sm transition-all duration-700 ease-out {layer.fill}"
              >
                <div class="flex flex-col lg:flex-row lg:items-baseline lg:gap-3">
                  <p class="text-sm sm:text-base font-bold font-mono shrink-0 {layer.text}">{layer.label}</p>
                  <p class="text-xs sm:text-sm shrink-0 {layer.subColor}">{layer.sub}</p>
                  <p class="text-[10px] sm:text-xs shrink-0 {layer.subColor}">({layer.subtitle.toUpperCase()})</p>
                </div>
                <p class="mt-1 text-xs sm:text-sm leading-relaxed {layer.subColor}" style="font-family: sans-serif;">{layer.desc}</p>
              </div>
            {/if}
          {/each}
        </div>

      <!-- Past bands anchored to bottom -->
      <div class="absolute bottom-0 left-0 right-0 z-20">
        {#each layers as layer}
          {#if layer.idx < current}
            <div
              class="w-full px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-sm transition-all duration-700 ease-out opacity-50 {layer.fill}"
            >
              <div class="flex items-baseline gap-3">
                <p class="text-xs sm:text-sm font-bold font-mono shrink-0 {layer.text}">{layer.label}</p>
                <p class="text-[10px] sm:text-xs shrink-0 {layer.subColor}">{layer.sub}</p>
              </div>
            </div>
          {/if}
        {/each}
      </div>


      </div><!-- end video area -->

    <!-- Pagination controls - mobile (below video) -->
    <div class="flex sm:hidden items-center justify-center gap-2 bg-white/90 px-3 py-2 backdrop-blur-sm">
      <button
        onclick={prev}
        class="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        aria-label="Previous"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <span class="text-sm font-bold leading-none {slide.textColor}">{current + 1}</span>
      <span class="text-xs font-medium text-slate-400">of</span>
      <span class="text-sm font-medium text-slate-400">{slides.length}</span>
      <button
        onclick={next}
        class="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 {pulsing ? 'animate-pulse ring-2 ring-indigo-300' : ''}"
        aria-label="Next"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
      <button
        onclick={togglePause}
        class="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        aria-label={paused ? 'Play' : 'Pause'}
      >
        {#if paused}
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        {:else}
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
        {/if}
      </button>
    </div>

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
