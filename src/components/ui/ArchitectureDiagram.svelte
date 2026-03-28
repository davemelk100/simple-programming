<script lang="ts">
  import { onMount } from 'svelte';

  let visible = $state(false);
  let pulse = $state(false);
  let animating = $state(true);
  let dataPacket = $state(-1);
  let stopped = false;

  onMount(() => {
    visible = true;
    setTimeout(() => {
      pulse = true;
      cyclePacket();
    }, 800);
  });

  function cyclePacket() {
    if (stopped) return;
    dataPacket = 0;
    const advance = () => {
      if (stopped) { dataPacket = -1; return; }
      dataPacket++;
      if (dataPacket < 5) {
        setTimeout(advance, 600);
      } else {
        setTimeout(() => { dataPacket = -1; if (!stopped) setTimeout(cyclePacket, 1500); }, 600);
      }
    };
    setTimeout(advance, 600);
  }

  function toggleAnimation() {
    if (animating) {
      stopped = true;
      animating = false;
      pulse = false;
      dataPacket = -1;
    } else {
      stopped = false;
      animating = true;
      pulse = true;
      cyclePacket();
    }
  }
</script>

<div class="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 shadow-sm sm:p-8">
  <div class="mb-8 flex items-center justify-center gap-3">
    <p class="text-xs font-semibold uppercase tracking-widest text-slate-400">How Software Fits Together</p>
    <button
      onclick={toggleAnimation}
      class="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
      aria-label="{animating ? 'Pause' : 'Play'} animation"
    >
      {animating ? '⏸ Pause' : '▶ Play'}
    </button>
  </div>

  <div class="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-4">

    <!-- Layer 1: Frontend -->
    <div class="transition-all duration-700 {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
      <div class="relative rounded-2xl border-2 border-blue-200 bg-blue-50 p-4 {dataPacket === 0 ? 'ring-2 ring-blue-400 ring-offset-2' : ''}">
        <!-- Monitor SVG -->
        <div class="mx-auto mb-3 flex justify-center">
          <svg class="h-20 w-28" viewBox="0 0 112 80" fill="none">
            <!-- Monitor body -->
            <rect x="6" y="2" width="100" height="60" rx="6" fill="#dbeafe" stroke="#93c5fd" stroke-width="2"/>
            <!-- Screen -->
            <rect x="12" y="8" width="88" height="44" rx="3" fill="#eff6ff"/>
            <!-- Screen content: nav bar -->
            <rect x="16" y="12" width="80" height="6" rx="1.5" fill="#bfdbfe"/>
            <!-- Screen content: hero block -->
            <rect x="16" y="22" width="48" height="8" rx="1.5" fill="#93c5fd"/>
            <rect x="16" y="33" width="32" height="4" rx="1" fill="#bfdbfe"/>
            <!-- Screen content: cards -->
            <rect x="16" y="41" width="24" height="8" rx="1.5" fill="#dbeafe" stroke="#93c5fd" stroke-width="0.5"/>
            <rect x="44" y="41" width="24" height="8" rx="1.5" fill="#dbeafe" stroke="#93c5fd" stroke-width="0.5"/>
            <rect x="72" y="41" width="24" height="8" rx="1.5" fill="#dbeafe" stroke="#93c5fd" stroke-width="0.5"/>
            <!-- Button -->
            <rect x="68" y="22" width="24" height="8" rx="3" fill="#3b82f6"/>
            <!-- Stand -->
            <rect x="44" y="62" width="24" height="4" rx="1" fill="#93c5fd"/>
            <rect x="36" y="66" width="40" height="3" rx="1.5" fill="#bfdbfe"/>
            <!-- Cursor -->
            <g class="{pulse ? 'animate-bounce' : ''}" style="animation-duration: 2s;">
              <path d="M78 34l-4-4v8l2-2 2 3 1.5-1-2-3z" fill="#1d4ed8"/>
            </g>
          </svg>
        </div>

        <h3 class="text-center text-sm font-black text-blue-700">Frontend</h3>
        <p class="mt-1 text-center text-xs leading-relaxed text-blue-600">
          What you <strong>see and click</strong>. Buttons, pages, animations &mdash; everything on screen.
        </p>
        <div class="mt-3 flex flex-wrap justify-center gap-1.5">
          <span class="rounded-full bg-blue-200 px-2 py-0.5 text-[10px] font-bold text-blue-800">HTML</span>
          <span class="rounded-full bg-blue-200 px-2 py-0.5 text-[10px] font-bold text-blue-800">CSS</span>
          <span class="rounded-full bg-blue-200 px-2 py-0.5 text-[10px] font-bold text-blue-800">JavaScript</span>
        </div>
      </div>
    </div>

    <!-- Layer 2: Backend -->
    <div class="transition-all duration-700 delay-100 {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
      <div class="rounded-2xl border-2 border-purple-200 bg-purple-50 p-4 {dataPacket === 1 ? 'ring-2 ring-purple-400 ring-offset-2' : ''}">
        <!-- Brain/Gears SVG -->
        <div class="mx-auto mb-3 flex justify-center">
          <svg class="h-20 w-28" viewBox="0 0 112 80" fill="none">
            <!-- Server rack -->
            <rect x="24" y="8" width="64" height="64" rx="6" fill="#f3e8ff" stroke="#c084fc" stroke-width="2"/>
            <!-- Rack slots -->
            <rect x="30" y="14" width="52" height="12" rx="2" fill="#e9d5ff"/>
            <rect x="30" y="30" width="52" height="12" rx="2" fill="#e9d5ff"/>
            <rect x="30" y="46" width="52" height="12" rx="2" fill="#e9d5ff"/>
            <!-- Lights -->
            <circle cx="38" cy="20" r="2.5" fill="#a855f7"/>
            <circle cx="46" cy="20" r="2.5" fill="#a855f7" opacity="0.5"/>
            <circle cx="38" cy="36" r="2.5" fill="#a855f7"/>
            <circle cx="46" cy="36" r="2.5" fill="#a855f7" class="{pulse ? 'animate-pulse' : ''}"/>
            <circle cx="38" cy="52" r="2.5" fill="#a855f7" opacity="0.5"/>
            <circle cx="46" cy="52" r="2.5" fill="#a855f7"/>
            <!-- Vents -->
            <line x1="60" y1="16" x2="76" y2="16" stroke="#c084fc" stroke-width="1" opacity="0.5"/>
            <line x1="60" y1="19" x2="76" y2="19" stroke="#c084fc" stroke-width="1" opacity="0.5"/>
            <line x1="60" y1="22" x2="76" y2="22" stroke="#c084fc" stroke-width="1" opacity="0.5"/>
            <line x1="60" y1="32" x2="76" y2="32" stroke="#c084fc" stroke-width="1" opacity="0.5"/>
            <line x1="60" y1="35" x2="76" y2="35" stroke="#c084fc" stroke-width="1" opacity="0.5"/>
            <line x1="60" y1="38" x2="76" y2="38" stroke="#c084fc" stroke-width="1" opacity="0.5"/>
            <!-- Power button -->
            <circle cx="56" cy="66" r="3" fill="none" stroke="#a855f7" stroke-width="1.5"/>
            <line x1="56" y1="63" x2="56" y2="66" stroke="#a855f7" stroke-width="1.5"/>
          </svg>
        </div>

        <h3 class="text-center text-sm font-black text-purple-700">Backend</h3>
        <p class="mt-1 text-center text-xs leading-relaxed text-purple-600">
          The <strong>brain</strong> behind the scenes. Processes requests, runs logic, enforces rules.
        </p>
        <div class="mt-3 flex flex-wrap justify-center gap-1.5">
          <span class="rounded-full bg-purple-200 px-2 py-0.5 text-[10px] font-bold text-purple-800">Python</span>
          <span class="rounded-full bg-purple-200 px-2 py-0.5 text-[10px] font-bold text-purple-800">Go</span>
          <span class="rounded-full bg-purple-200 px-2 py-0.5 text-[10px] font-bold text-purple-800">Node.js</span>
        </div>
      </div>
    </div>

    <!-- Layer 3: Database -->
    <div class="transition-all duration-700 delay-200 {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
      <div class="rounded-2xl border-2 border-green-200 bg-green-50 p-4 {dataPacket === 2 ? 'ring-2 ring-green-400 ring-offset-2' : ''}">
        <!-- Filing Cabinet SVG -->
        <div class="mx-auto mb-3 flex justify-center">
          <svg class="h-20 w-28" viewBox="0 0 112 80" fill="none">
            <!-- Cabinet body -->
            <rect x="26" y="6" width="60" height="68" rx="4" fill="#dcfce7" stroke="#86efac" stroke-width="2"/>
            <!-- Drawers -->
            <rect x="32" y="12" width="48" height="16" rx="2" fill="#bbf7d0" stroke="#86efac" stroke-width="1"/>
            <rect x="32" y="32" width="48" height="16" rx="2" fill="#bbf7d0" stroke="#86efac" stroke-width="1"/>
            <rect x="32" y="52" width="48" height="16" rx="2" fill="#bbf7d0" stroke="#86efac" stroke-width="1"/>
            <!-- Drawer handles -->
            <rect x="50" y="18" width="12" height="3" rx="1.5" fill="#22c55e"/>
            <rect x="50" y="38" width="12" height="3" rx="1.5" fill="#22c55e"/>
            <rect x="50" y="58" width="12" height="3" rx="1.5" fill="#22c55e"/>
            <!-- Labels on drawers -->
            <text x="56" y="27" text-anchor="middle" fill="#15803d" font-size="6" font-weight="bold">Users</text>
            <text x="56" y="47" text-anchor="middle" fill="#15803d" font-size="6" font-weight="bold">Orders</text>
            <text x="56" y="67" text-anchor="middle" fill="#15803d" font-size="6" font-weight="bold">Products</text>
          </svg>
        </div>

        <h3 class="text-center text-sm font-black text-green-700">Database</h3>
        <p class="mt-1 text-center text-xs leading-relaxed text-green-600">
          The <strong>memory</strong>. Stores users, orders, content &mdash; everything that persists.
        </p>
        <div class="mt-3 flex flex-wrap justify-center gap-1.5">
          <span class="rounded-full bg-green-200 px-2 py-0.5 text-[10px] font-bold text-green-800">SQL</span>
          <span class="rounded-full bg-green-200 px-2 py-0.5 text-[10px] font-bold text-green-800">NoSQL</span>
          <span class="rounded-full bg-green-200 px-2 py-0.5 text-[10px] font-bold text-green-800">Redis</span>
        </div>
      </div>
    </div>

    <!-- Layer 4: Config -->
    <div class="transition-all duration-700 delay-300 {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
      <div class="rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50 p-4 {dataPacket === 3 ? 'ring-2 ring-amber-400 ring-offset-2' : ''}">
        <!-- Settings/Dials SVG -->
        <div class="mx-auto mb-3 flex justify-center">
          <svg class="h-20 w-28" viewBox="0 0 112 80" fill="none">
            <!-- Clipboard -->
            <rect x="28" y="10" width="56" height="62" rx="4" fill="#fef3c7" stroke="#fbbf24" stroke-width="2"/>
            <rect x="42" y="6" width="28" height="10" rx="3" fill="#fbbf24"/>
            <circle cx="56" cy="11" r="3" fill="#fef3c7"/>
            <!-- Lines of config -->
            <rect x="36" y="24" width="20" height="3" rx="1" fill="#f59e0b"/>
            <rect x="58" y="24" width="14" height="3" rx="1" fill="#fcd34d"/>
            <rect x="36" y="32" width="14" height="3" rx="1" fill="#f59e0b"/>
            <rect x="52" y="32" width="22" height="3" rx="1" fill="#fcd34d"/>
            <rect x="36" y="40" width="24" height="3" rx="1" fill="#f59e0b"/>
            <rect x="62" y="40" width="10" height="3" rx="1" fill="#fcd34d"/>
            <rect x="36" y="48" width="16" height="3" rx="1" fill="#f59e0b"/>
            <rect x="54" y="48" width="18" height="3" rx="1" fill="#fcd34d"/>
            <!-- Toggle switches -->
            <circle cx="40" cy="60" r="4" fill="#22c55e"/>
            <circle cx="52" cy="60" r="4" fill="#22c55e"/>
            <circle cx="64" cy="60" r="4" fill="#ef4444" opacity="0.6"/>
          </svg>
        </div>

        <h3 class="text-center text-sm font-black text-amber-700">Config</h3>
        <p class="mt-1 text-center text-xs leading-relaxed text-amber-600">
          The <strong>settings dial</strong>. Passwords, feature flags, environment-specific values.
        </p>
        <div class="mt-3 flex flex-wrap justify-center gap-1.5">
          <span class="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-800">.env</span>
          <span class="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-800">JSON</span>
          <span class="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-800">YAML</span>
        </div>
      </div>
    </div>

    <!-- Layer 5: Infrastructure -->
    <div class="transition-all duration-700 delay-[400ms] {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
      <div class="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 {dataPacket === 4 ? 'ring-2 ring-slate-400 ring-offset-2' : ''}">
        <!-- Cloud/Infrastructure SVG -->
        <div class="mx-auto mb-3 flex justify-center">
          <svg class="h-20 w-28" viewBox="0 0 112 80" fill="none">
            <!-- Cloud shape -->
            <path d="M28 52c-6 0-10-4-10-10 0-5 3-9 8-10 1-8 8-14 16-14 7 0 13 4 15 10 2-1 4-2 7-2 7 0 12 5 12 12s-5 12-12 12H28z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
            <!-- Second cloud -->
            <path d="M58 56c-5 0-8-3-8-8s2-7 6-8c1-7 7-12 14-12 6 0 11 3 13 9 1-1 3-1 5-1 6 0 10 4 10 10s-4 10-10 10H58z" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5"/>
            <!-- Upload arrow -->
            <path d="M42 42v-10m0 0l-4 4m4-4l4 4" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="{pulse ? 'animate-pulse' : ''}"/>
            <!-- Download arrow -->
            <path d="M72 38v10m0 0l-4-4m4 4l4-4" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="{pulse ? 'animate-pulse' : ''}" style="animation-delay: 0.5s;"/>
            <!-- Server dots in cloud -->
            <circle cx="48" cy="30" r="2" fill="#64748b"/>
            <circle cx="56" cy="28" r="2" fill="#64748b"/>
            <circle cx="64" cy="30" r="2" fill="#64748b"/>
            <!-- Connection lines -->
            <line x1="50" y1="30" x2="54" y2="28" stroke="#94a3b8" stroke-width="1"/>
            <line x1="58" y1="28" x2="62" y2="30" stroke="#94a3b8" stroke-width="1"/>
          </svg>
        </div>

        <h3 class="text-center text-sm font-black text-slate-700 break-words hyphens-auto">Infra&shy;structure</h3>
        <p class="mt-1 text-center text-xs leading-relaxed text-slate-500">
          The <strong>foundation</strong>. Servers, networking, deployment &mdash; keeps everything running.
        </p>
        <div class="mt-3 flex flex-wrap justify-center gap-1.5">
          <span class="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">Cloud</span>
          <span class="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">CI/CD</span>
          <span class="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">DNS</span>
        </div>
      </div>
    </div>

  </div>

  <!-- Connection flow line (desktop only) -->
  <div class="mt-6 hidden lg:block">
    <div class="relative mx-auto h-8 max-w-3xl">
      <!-- Horizontal line -->
      <div class="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-blue-300 via-purple-300 to-slate-300"></div>
      <!-- Animated data packet -->
      {#if dataPacket >= 0}
        <div
          class="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-indigo-500 shadow-md shadow-indigo-300 transition-all duration-500"
          style="left: {dataPacket * 25}%"
        ></div>
      {/if}
      <!-- Dots at each layer -->
      <div class="absolute top-1/2 left-0 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-blue-400"></div>
      <div class="absolute top-1/2 left-1/4 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-purple-400"></div>
      <div class="absolute top-1/2 left-2/4 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-green-400"></div>
      <div class="absolute top-1/2 left-3/4 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-amber-400"></div>
      <div class="absolute top-1/2 left-full h-2.5 w-2.5 -translate-x-full -translate-y-1/2 rounded-full bg-slate-400"></div>
    </div>
    <p class="mt-1 text-center text-[10px] text-slate-400">Data flows between layers as users interact with the app</p>
  </div>
</div>
