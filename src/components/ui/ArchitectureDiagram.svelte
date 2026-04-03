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
      videoStart: 2,
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
      videoPosition: 'center top',
    },
    {
      id: 'ui',
      title: 'User Interface',
      subtitle: 'HTML, CSS, React, Svelte',
      metaphor: '💁',
      description: 'Now the customers walk in. HTML, CSS, and frameworks like React and Svelte are the face of your application — what the user actually sees and interacts with.',
      insight: 'The interface',
      techs: ['HTML', 'CSS', 'React', 'Svelte'],
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

  let fadeDuration = $state(700);

  function transitionTo(i: number, slow = false) {
    if (sliding) return;
    if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
    sliding = true;
    fadeDuration = slow ? 3000 : 700;
    const prevIdx = current;
    current = i;
    // Pause previous video (it stays on last frame during fade)
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
    pendingAdvance = false;
    setTimeout(() => {
      sliding = false;
      if (pendingAdvance) {
        pendingAdvance = false;
        fadeOutAndNext();
      }
    }, fadeDuration);
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

  let looping = $state(false);
  let showSummary = $state(false);

  let holdTimer: ReturnType<typeof setTimeout> | null = null;

  function fadeOutAndNext() {
    if (paused) return;
    if (current === slides.length - 1) {
      // After last slide, show summary diagram
      showSummary = true;
    } else {
      transitionTo((current + 1) % slides.length, true);
    }
  }

  function restartAnimation() {
    showSummary = false;
    transitionTo(0);
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
  let pendingAdvance = $state(false);

  const layers = [
    { idx: 0, label: 'CONCEPTS', href: '/topics/variables', subtitle: 'Variables, functions, logic, OOP', sub: 'The building itself', descBold: 'Before anything else, the building must exist.', descRest: 'Variables, functions, data structures, control flow, and object-oriented thinking are the concrete and steel of every application.', fill: 'bg-slate-100/70', text: 'text-slate-700', subColor: 'text-slate-400' },
    { idx: 1, label: 'SYNTAX & PRINCIPLES', href: '/syntax-styles/markup', subtitle: 'Patterns, naming, DRY, KISS', sub: 'The rules and policies', descBold: 'Before the doors open, the bank sets its rules.', descRest: 'Syntax styles, naming conventions, DRY, KISS, and planning are the policies that govern how every line of code behaves.', fill: 'bg-amber-50/70', text: 'text-amber-900', subColor: 'text-amber-600' },
    { idx: 2, label: 'LANGUAGES & TOOLS', href: '/languages/typescript', subtitle: 'TypeScript, Python, Go, C#', sub: 'The vault and ledger', descBold: 'The vault is stocked and the ledger is open.', descRest: 'Real languages — TypeScript, Python, Go, C# — plus version control, the command line, and local servers. This is where you store and manage real code.', fill: 'bg-green-50/70', text: 'text-green-800', subColor: 'text-green-600' },
    { idx: 3, label: 'BUILD & SHIP', href: '/put-it-together/choose-your-stack', subtitle: 'Stack, database, API, deploy', sub: 'The employees and computers', descBold: 'Now you hire the employees.', descRest: 'Choose a stack, scaffold a project, connect a database, add auth, build an API, and deploy. These are the brains that make your application actually work.', fill: 'bg-purple-50/70', text: 'text-purple-800', subColor: 'text-purple-500' },
    { idx: 4, label: 'USER INTERFACE', href: '/user-interface/html-structure', subtitle: 'HTML, CSS, React, Svelte', sub: 'The customer experience', descBold: 'Now the customers walk in.', descRest: 'HTML, CSS, and frameworks like React and Svelte are the face of your application — what the user actually sees and interacts with.', fill: 'bg-blue-50/70', text: 'text-blue-800', subColor: 'text-blue-500' },
  ];

  let activeLayer = $derived(!completed ? layers.find(l => l.idx === current) : null);
  let pastLayers = $derived(layers.filter(l => l.idx < current || (completed && l.idx === current)));
</script>

<div style="width: 100vw; margin-left: calc(-50vw + 50%); margin-top: calc(-1.5rem - 1px);">
  <div>

    <!-- Video / illustration area -->
    <div class="relative w-screen min-h-[32rem] sm:min-h-[36rem] lg:min-h-[40rem] overflow-hidden">

      <!-- Video/illustration backgrounds - all rendered, cross-fade via opacity -->
      {#each slides as s, idx}
        <div class="absolute inset-0 z-0 transition-opacity ease-in-out" style="opacity: {idx === current ? 1 : 0}; transition-duration: {looping ? '1500ms' : fadeDuration + 'ms'};">
          {#if s.image}
            <img src={s.image} alt={s.title} class="w-full h-full object-cover object-top"/>
          {:else if s.video}
            <video
              src={s.video}
              muted
              playsinline
              class="w-full h-full object-cover"
              style="object-position: {s.videoPosition ?? 'center top'};"
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
                if (sliding) { pendingAdvance = true; return; }
                if (!paused) fadeOutAndNext();
              }}
              ontimeupdate={(e) => {
                const vid = e.currentTarget;
                if (idx !== current) return;
                if (sliding) return;
                const hasEndPoint = s.videoEnd || s.videoEndOffset;
                const endTime = s.videoEnd ?? (s.videoEndOffset ? vid.duration - s.videoEndOffset : vid.duration);
                const timeLeft = endTime - vid.currentTime;
                if (hasEndPoint && timeLeft <= 0) {
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
      {#each layers as layer (layer.idx)}
        <div
          class="absolute inset-0 z-20 font-mono transition-opacity duration-700 {layer.idx === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}"
        >
          <div
            class="w-full md:w-[22rem] h-full px-4 py-4 sm:px-6 sm:py-6 backdrop-blur-sm {layer.fill} flex flex-col gap-3"
          >
            <div class="hidden sm:flex items-center gap-2">
              <button
                onclick={prev}
                class="rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label="Previous"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <span class="text-sm font-bold leading-none {layer.text}">{current + 1}</span>
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
            <p class="text-lg sm:text-2xl font-bold {layer.text}" style="font-family: 'Permanent Marker', cursive;"><a href={layer.href} class="no-underline {layer.text} hover:underline">{layer.label}</a></p>
            <p class="text-xs sm:text-sm font-semibold {layer.text}">({layer.sub})</p>
            <p class="text-xs sm:text-sm leading-relaxed font-bold {layer.text}" style="font-family: sans-serif;">{layer.descBold}</p>
            <p class="text-xs sm:text-sm leading-relaxed font-light {layer.text}" style="font-family: sans-serif;">{layer.descRest}</p>
            <p class="text-[10px] sm:text-xs font-light {layer.text}">({layer.subtitle.toUpperCase()})</p>
          </div>
        </div>
      {/each}




      <!-- Summary in left column after all slides -->
      <div
        class="absolute inset-0 z-20 font-mono transition-opacity duration-1000 {showSummary ? 'opacity-100' : 'opacity-0 pointer-events-none'}"
      >
        <div
          class="w-full md:w-[22rem] h-full px-4 py-4 sm:px-6 sm:py-6 backdrop-blur-sm flex flex-col gap-2 overflow-hidden"
          style="background: linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.3));"
        >
          <!-- Liquid glass blobs inside column -->
          <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div class="liquid-blob absolute rounded-full" style="width: 200px; height: 200px; top: -5%; left: -20%; background: radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%);"></div>
            <div class="liquid-blob absolute rounded-full" style="width: 250px; height: 250px; bottom: -10%; right: -30%; background: radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%); animation-delay: -3s;"></div>
            <div class="liquid-blob absolute rounded-full" style="width: 180px; height: 180px; top: 40%; left: 10%; background: radial-gradient(circle, rgba(34,197,94,0.12), transparent 70%); animation-delay: -6s;"></div>
          </div>

          <div class="relative flex items-center justify-between">
            <p class="text-sm sm:text-base font-bold text-slate-700 font-mono tracking-wide">The Full Stack</p>
            <button
              onclick={() => { showSummary = false; }}
              class="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-200/50 hover:text-slate-600"
              aria-label="Close"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Stack diagram -->
          <div class="relative flex flex-col-reverse gap-0 rounded-xl overflow-hidden" style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4);">
            {#each layers as layer}
              <div
                class="w-full py-2 sm:py-2.5 px-3 sm:px-4 border-t first:border-t-0"
                style="border-color: rgba(255,255,255,0.3); background: linear-gradient(135deg, {
                  layer.idx === 0 ? 'rgba(100,116,139,0.15), rgba(100,116,139,0.05)' :
                  layer.idx === 1 ? 'rgba(217,119,6,0.15), rgba(217,119,6,0.05)' :
                  layer.idx === 2 ? 'rgba(22,163,74,0.15), rgba(22,163,74,0.05)' :
                  layer.idx === 3 ? 'rgba(147,51,234,0.15), rgba(147,51,234,0.05)' :
                  'rgba(59,130,246,0.15), rgba(59,130,246,0.05)'
                });"
              >
                <p class="text-xs sm:text-sm font-bold font-mono {layer.text}"><a href={layer.href} class="no-underline {layer.text} hover:underline">{layer.label}</a></p>
                <p class="text-[9px] sm:text-[10px] font-light text-slate-500">{layer.subtitle}</p>
              </div>
            {/each}
          </div>

          <div class="relative flex flex-col gap-2 mt-2">
            <button
              onclick={restartAnimation}
              class="flex items-center justify-center gap-2 rounded-full px-4 py-2 text-slate-600 font-semibold text-xs shadow transition-colors hover:bg-white/60"
              style="background: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.5);"
            >
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Replay
            </button>
            <a
              href="/get-started"
              class="flex items-center justify-center gap-2 rounded-full px-4 py-2 text-white font-semibold text-xs shadow transition-colors hover:brightness-110"
              style="background: linear-gradient(135deg, rgba(99,102,241,0.8), rgba(147,51,234,0.8)); border: 1px solid rgba(255,255,255,0.3);"
            >
              Let's do this
              <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
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
  @keyframes liquid-drift {
    0% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(30px, -20px) scale(1.05); }
    50% { transform: translate(-20px, 15px) scale(0.95); }
    75% { transform: translate(15px, 25px) scale(1.03); }
    100% { transform: translate(0, 0) scale(1); }
  }
  .liquid-blob {
    animation: liquid-drift 12s ease-in-out infinite;
    filter: blur(60px);
  }
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
