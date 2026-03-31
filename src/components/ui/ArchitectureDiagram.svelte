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
      id: 'concepts',
      title: 'Concepts',
      subtitle: 'Variables, functions, logic, OOP',
      metaphor: '🏗️',
      description: 'Before anything else, the building must exist. Variables, functions, data structures, control flow, and object-oriented thinking are the concrete and steel of every application.',
      insight: 'Foundation',
      techs: ['Variables', 'Functions', 'OOP'],
      color: 'slate', bgColor: 'bg-slate-50', borderColor: 'border-slate-300', textColor: 'text-slate-700',
      tagColor: 'bg-slate-200', tagTextColor: 'text-slate-700', insightBg: 'bg-slate-100',
      icon: '🏦',
      walkthrough: 'Step 1: The building goes up. The foundation is laid.',
      lottie: '/lottie/infrastructure.json',
      video: '/lottie/infrastructure.mp4',
      videoEnd: 4,
      noSlowdown: true,
    },
    {
      id: 'syntax',
      title: 'Syntax & Principles',
      subtitle: 'Patterns, naming, DRY, KISS',
      metaphor: '⚙️',
      description: 'Before the doors open, the bank sets its rules. Syntax styles, naming conventions, DRY, KISS, and planning are the policies that govern how every line of code behaves.',
      insight: 'Policy',
      techs: ['Markup', 'C-style', 'DRY', 'KISS'],
      color: 'amber', bgColor: 'bg-amber-50', borderColor: 'border-amber-300', textColor: 'text-amber-700',
      tagColor: 'bg-amber-200', tagTextColor: 'text-amber-800', insightBg: 'bg-amber-100',
      icon: '⚙️',
      walkthrough: 'Step 2: The rules are written. The policies are set.',
      lottie: '/lottie/config.json',
      video: '/lottie/config.mp4',
      videoEndOffset: 1,
    },
    {
      id: 'languages',
      title: 'Languages & Tools',
      subtitle: 'TypeScript, Python, Go, C#',
      metaphor: '🗄️',
      description: 'The vault is stocked and the ledger is open. Real languages — TypeScript, Python, Go, C# — plus version control, the command line, and local servers. This is where you store and manage real code.',
      insight: 'Execution',
      techs: ['TypeScript', 'Python', 'Go', 'C#'],
      color: 'green', bgColor: 'bg-green-50', borderColor: 'border-green-300', textColor: 'text-green-700',
      tagColor: 'bg-green-200', tagTextColor: 'text-green-800', insightBg: 'bg-green-100',
      icon: '🗄️',
      walkthrough: 'Step 3: The vault opens. The tools are ready.',
      lottie: '/lottie/database.json',
      video: '/lottie/vault.mp4',
    },
    {
      id: 'build',
      title: 'Build & Ship',
      subtitle: 'Stack, database, API, deploy',
      metaphor: '🧠',
      description: 'Now you hire the employees. Choose a stack, scaffold a project, connect a database, add auth, build an API, and deploy. These are the brains that make your application actually work.',
      insight: 'Creation',
      techs: ['APIs', 'Databases', 'Auth', 'Deploy'],
      color: 'purple', bgColor: 'bg-purple-50', borderColor: 'border-purple-300', textColor: 'text-purple-700',
      tagColor: 'bg-purple-200', tagTextColor: 'text-purple-800', insightBg: 'bg-purple-100',
      icon: '🧠',
      walkthrough: 'Step 4: The employees are trained. The bank is open for business.',
      lottie: '/lottie/backend.json',
      video: '/lottie/buildship.mp4',
      videoStart: 4,
      videoSpeed: 0.8,
      videoPosition: 'center 60%',
    },
    {
      id: 'ai',
      title: 'AI',
      subtitle: 'LLMs, copilots, agents',
      metaphor: '💁',
      description: 'Finally, the teller window opens — but now it\'s intelligent. LLMs, copilots, chatbots, and agentic AI are changing how we build and interact with software.',
      insight: 'The future',
      techs: ['LLMs', 'Copilots', 'Agents'],
      color: 'blue', bgColor: 'bg-blue-50', borderColor: 'border-blue-300', textColor: 'text-blue-700',
      tagColor: 'bg-blue-200', tagTextColor: 'text-blue-800', insightBg: 'bg-blue-100',
      icon: '💁',
      walkthrough: 'Step 5: The ATM gets smart.',
      lottie: '/lottie/frontend.json',
      video: '/lottie/atm.mp4',
      videoSpeed: 0.8,
      videoEndOffset: 4,
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

  let completed = $state(false);

  function fadeOutAndNext() {
    if (paused) return;
    if (current === slides.length - 1) {
      // Last slide finished — show all bands at bottom, wait 4 seconds, restart
      completed = true;
      setTimeout(() => {
        completed = false;
        transitionTo(0);
      }, 4000);
    } else {
      next();
    }
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
    { idx: 0, label: 'CONCEPTS', subtitle: 'Variables, functions, logic, OOP', sub: 'The building itself', descBold: 'Before anything else, the building must exist.', descRest: 'Variables, functions, data structures, control flow, and object-oriented thinking are the concrete and steel of every application.', fill: 'bg-slate-100/70', text: 'text-slate-700', subColor: 'text-slate-400' },
    { idx: 1, label: 'SYNTAX & PRINCIPLES', subtitle: 'Patterns, naming, DRY, KISS', sub: 'The rules and policies', descBold: 'Before the doors open, the bank sets its rules.', descRest: 'Syntax styles, naming conventions, DRY, KISS, and planning are the policies that govern how every line of code behaves.', fill: 'bg-amber-50/70', text: 'text-amber-900', subColor: 'text-amber-600' },
    { idx: 2, label: 'LANGUAGES & TOOLS', subtitle: 'TypeScript, Python, Go, C#', sub: 'The vault and ledger', descBold: 'The vault is stocked and the ledger is open.', descRest: 'Real languages — TypeScript, Python, Go, C# — plus version control, the command line, and local servers. This is where you store and manage real code.', fill: 'bg-green-50/70', text: 'text-green-800', subColor: 'text-green-600' },
    { idx: 3, label: 'BUILD & SHIP', subtitle: 'Stack, database, API, deploy', sub: 'The employees and computers', descBold: 'Now you hire the employees.', descRest: 'Choose a stack, scaffold a project, connect a database, add auth, build an API, and deploy. These are the brains that make your application actually work.', fill: 'bg-purple-50/70', text: 'text-purple-800', subColor: 'text-purple-500' },
    { idx: 4, label: 'AI', subtitle: 'LLMs, copilots, agents', sub: 'The ATM', descBold: 'Finally, the teller window opens — but now it\'s intelligent.', descRest: 'LLMs, copilots, chatbots, and agentic AI are changing how we build and interact with software.', fill: 'bg-blue-50/70', text: 'text-blue-800', subColor: 'text-blue-500' },
  ];
</script>

<div class="overflow-hidden" style="width: 100vw; margin-left: calc(-50vw + 50%); margin-top: calc(-1.5rem - 1px);">
  <div>

    <!-- Video / illustration area -->
    <div class="relative min-h-[32rem] sm:min-h-[36rem] lg:min-h-[40rem] overflow-hidden">

      <!-- Video/illustration backgrounds - all rendered, cross-fade via opacity -->
      {#each slides as s, idx}
        <div class="absolute inset-0 z-0 transition-opacity duration-700 ease-in-out" style="opacity: {idx === current ? 1 : 0}; top: 9rem;">
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
                const hasEndPoint = s.videoEnd || s.videoEndOffset;
                const endTime = s.videoEnd ?? (s.videoEndOffset ? vid.duration - s.videoEndOffset : vid.duration);
                const timeLeft = endTime - vid.currentTime;
                if (hasEndPoint && timeLeft <= 0) {
                  vid.pause();
                  if (!paused) fadeOutAndNext();
                } else if (hasEndPoint && !s.noSlowdown && timeLeft <= 2 && timeLeft > 0) {
                  vid.playbackRate = 0.4;
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
            <h2 class="text-base sm:text-xl font-bold text-slate-800 m-0" style="font-family: 'Permanent Marker';">Think of an app like a bank.</h2>
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
            {#if layer.idx === current && !completed}
              <div
                class="w-full px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-sm transition-all duration-700 ease-out {layer.fill}"
              >
                <p class="mb-1 text-xs sm:text-sm leading-relaxed {layer.subColor}" style="font-family: sans-serif;"><span class="font-bold">{layer.descBold}</span> {layer.descRest}</p>
                <div class="flex flex-col lg:flex-row lg:items-baseline lg:gap-3">
                  <p class="text-sm sm:text-base font-bold font-mono shrink-0 {layer.text}">{layer.idx + 1}. {layer.label}</p>
                  <p class="text-xs sm:text-sm shrink-0 {layer.subColor}">{layer.sub}</p>
                  <p class="text-[10px] sm:text-xs shrink-0 {layer.subColor}">({layer.subtitle.toUpperCase()})</p>
                </div>
              </div>
            {/if}
          {/each}
        </div>

      <!-- Past bands anchored to bottom -->
      <div class="absolute bottom-0 left-0 right-0 z-20">
        {#each layers as layer}
          {#if layer.idx < current || (completed && layer.idx === current)}
            <div
              class="w-full px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-sm transition-all duration-700 ease-out opacity-50 {layer.fill}"
            >
              <div class="flex items-baseline gap-3">
                <p class="text-xs sm:text-sm font-bold font-mono shrink-0 {layer.text}">{layer.idx + 1}. {layer.label}</p>
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
