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
      subtitle: 'The Building & Security',
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
      subtitle: 'Bank Policies & Settings',
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
      subtitle: 'The Vault & Ledger',
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
      subtitle: 'The Bank Employees',
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
      subtitle: 'The ATM & Teller Window',
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

  let slide = $derived(slides[current]);
</script>

<div class="rounded-2xl border border-slate-200 bg-gradient-to-b from-sky-50/50 to-amber-50/30 p-4 shadow-sm sm:p-6 lg:p-8">
  <!-- Dot navigation + progress -->
  <div class="mb-6 flex flex-col items-center gap-4">
    <div class="flex items-center gap-4 sm:gap-6">
      {#each slides as s, i}
        <button
          onclick={() => goTo(i)}
          class="group flex flex-col items-center gap-1.5"
          aria-label="Go to {s.title}"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300
            {i === current ? `scale-110 shadow-lg ${s.tagColor}` : 'bg-slate-100 group-hover:bg-slate-200'}">
            <svg class="h-5 w-5 transition-colors duration-300 {i === current ? s.tagTextColor : 'text-slate-400 group-hover:text-slate-500'}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              {#if s.id === 'infrastructure'}
                <!-- Building -->
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 9h.01M15 9h.01M9 13h.01M15 13h.01"/>
              {:else if s.id === 'config'}
                <!-- Gear/cog -->
                <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z"/><circle cx="12" cy="12" r="3"/>
              {:else if s.id === 'database'}
                <!-- Database/cylinder -->
                <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
              {:else if s.id === 'backend'}
                <!-- Server/CPU -->
                <rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/>
              {:else}
                <!-- Monitor/screen -->
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
              {/if}
            </svg>
          </div>
          <span class="text-xs font-semibold transition-colors sm:text-sm {i === current ? s.textColor : 'text-slate-300 group-hover:text-slate-500'}">{s.title}</span>
        </button>
      {/each}
    </div>
    <div class="h-1 w-full max-w-lg overflow-hidden rounded-full bg-slate-100">
      <div class="h-full rounded-full bg-indigo-400 transition-all duration-300" style="width: {((current + 1) / slides.length) * 100}%"></div>
    </div>
  </div>


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

    <!-- Slide content -->
    <div class="mx-auto max-w-2xl overflow-hidden rounded-2xl">
      <div class="grid grid-cols-1 sm:grid-cols-2
        {entering ? 'translate-x-12 opacity-0' : sliding ? '-translate-x-12 opacity-0 transition-all duration-700 ease-in-out' : 'translate-x-0 opacity-100 transition-all duration-500 ease-out'}">

        <!-- Left: illustration -->
        <div class="flex items-center justify-center p-6 sm:p-8">
          {#key slide.id}
            {#if slide.image}
              <img
                src={slide.image}
                alt={slide.title}
                class="h-full w-full rounded-xl object-cover"
              />
            {:else if slide.video}
              <video
                src={slide.video}
                autoplay
                muted
                playsinline
                class="h-full w-full rounded-xl object-cover"
                style="opacity: {slide.videoStart ? 0 : 1}"
                onloadeddata={(e) => {
                  const vid = e.currentTarget;
                  if (slide.videoSpeed) vid.playbackRate = slide.videoSpeed;
                  if (slide.videoStart) {
                    vid.currentTime = slide.videoStart;
                    vid.addEventListener('seeked', () => { vid.style.opacity = '1'; }, { once: true });
                  }
                }}
                onended={() => { next(); }}
              ></video>
            {:else if slide.id === 'database'}
              <div class="h-48 w-48 sm:h-64 sm:w-64">
                <VaultAnimation />
              </div>
            {:else if slide.id === 'infrastructure'}
              <div class="h-48 w-48 sm:h-64 sm:w-64">
                <BankBuildingAnimation />
              </div>
            {:else}
              <LottiePlayer src={slide.lottie} class="h-48 w-48 sm:h-64 sm:w-64" />
            {/if}
          {/key}
        </div>

        <!-- Right: text content -->
        <div class="flex flex-col justify-center p-5 sm:p-8">
          <!-- Step indicator -->
          <div class="mb-3 flex items-center gap-2">
            <span class="flex h-7 w-7 items-center justify-center rounded-full {slide.tagColor} text-xs font-bold {slide.tagTextColor}">{current + 1}</span>
            <span class="text-xs font-medium text-slate-400">of {slides.length}</span>
          </div>

          <h3 class="flex items-center gap-2 text-xl font-black {slide.textColor} sm:text-2xl">
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
          <p class="mt-0.5 text-sm font-semibold text-slate-400">{slide.subtitle}</p>

          <p class="mt-3 text-sm leading-relaxed text-slate-600">{slide.description}</p>


          <!-- Tech tags -->
          <div class="mt-4 flex flex-wrap gap-2">
            {#each slide.techs as tech}
              <span class="rounded-full {slide.tagColor} px-3 py-1 text-xs font-bold {slide.tagTextColor}">{tech}</span>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
