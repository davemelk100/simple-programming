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
      title: 'Config',
      subtitle: 'Policies, env vars, settings',
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
      videoSpeed: 0.5,
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
  <div class="relative">
    <!-- Prev / Next arrows -->
    <button
      onclick={prev}
      class="absolute left-0 top-1/2 z-10 -translate-x-1 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2 text-slate-400 shadow-md transition-colors hover:bg-slate-50 hover:text-slate-700 sm:-translate-x-4"
      aria-label="Previous"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
    </button>
    <button
      onclick={next}
      class="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1 rounded-full border border-slate-200 bg-white p-2 text-slate-400 shadow-md transition-colors hover:bg-slate-50 hover:text-slate-700 sm:translate-x-4 {pulsing ? 'animate-pulse ring-2 ring-indigo-300' : ''}"
      aria-label="Next"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
    </button>
    <button
      onclick={togglePause}
      class="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full border border-slate-200 bg-white p-2 text-slate-400 shadow-md transition-colors hover:bg-slate-50 hover:text-slate-700"
      aria-label={paused ? 'Play' : 'Pause'}
    >
      {#if paused}
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      {:else}
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
      {/if}
    </button>

    <!-- Slide content -->
    <div class="mx-auto max-w-4xl overflow-hidden rounded-2xl
      {entering ? 'translate-x-12 opacity-0' : sliding ? '-translate-x-12 opacity-0 transition-all duration-700 ease-in-out' : 'translate-x-0 opacity-100 transition-all duration-500 ease-out'}">

      <!-- Top: text -->
      <div class="px-6 pt-6 sm:px-8 sm:pt-8">
        <div class="mb-2 flex items-center gap-2">
          <span class="flex h-7 w-7 items-center justify-center rounded-full {slide.tagColor} text-xs font-bold {slide.tagTextColor}">{current + 1}</span>
          <span class="text-xs font-medium text-slate-400">of {slides.length}</span>
        </div>
        <h3 class="flex items-center gap-2 text-xl sm:text-2xl {slide.textColor}" style="font-family: 'Roboto', sans-serif;">
          <svg class="h-6 w-6 shrink-0 sm:h-7 sm:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            {#if slide.id === 'infrastructure'}
              <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 9h.01M15 9h.01M9 13h.01M15 13h.01"/>
            {:else if slide.id === 'config'}
              <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z"/><circle cx="12" cy="12" r="3"/>
            {:else if slide.id === 'database'}
              <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
            {:else if slide.id === 'backend'}
              <rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/>
            {:else}
              <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
            {/if}
          </svg>
          {slide.title}
        </h3>
        <p class="mt-3 text-sm font-semibold uppercase text-slate-500">{slide.subtitle}</p>
        <p class="mt-2 text-sm leading-relaxed text-slate-600">{slide.description}</p>
      </div>

      <!-- Bottom: two images side by side -->
      <div class="grid grid-cols-2 items-stretch gap-4 p-6 sm:p-8">
        <!-- Band thumbnail -->
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

        <!-- Video/illustration -->
        <div class="overflow-hidden rounded-lg">
          {#key slide.id}
            {#if slide.image}
              <img
                src={slide.image}
                alt={slide.title}
                class="w-full h-full object-cover rounded-lg"
              />
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
              <div class="flex w-full items-center justify-center bg-slate-50 rounded-lg p-6">
                <VaultAnimation />
              </div>
            {:else if slide.id === 'infrastructure'}
              <div class="flex w-full items-center justify-center bg-slate-50 rounded-lg p-6">
                <BankBuildingAnimation />
              </div>
            {:else}
              <LottiePlayer src={slide.lottie} class="w-full h-64 sm:h-72" />
            {/if}
          {/key}
        </div>
      </div>
    </div>
  </div>

</div>
