<script lang="ts">
  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

  interface RobotObject {
    id: number;
    name: string;
    color: string;
    power: string;
    expanded: boolean;
    animating: boolean;
  }

  const robotNames = ['Bolt', 'Spark', 'Gizmo', 'Nova', 'Pixel', 'Zinc', 'Echo', 'Pulse'];
  const robotColors = ['Red', 'Blue', 'Green', 'Gold', 'Silver', 'Purple', 'Cyan', 'Orange'];
  const robotPowers = ['Laser Eyes', 'Super Speed', 'Flight', 'Shield', 'Teleport', 'Strength', 'Invisibility', 'Time Warp'];

  let objects = $state<RobotObject[]>([]);
  let nextId = $state(0);

  function pickRandom(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function createObject() {
    const robot: RobotObject = {
      id: nextId++,
      name: pickRandom(robotNames),
      color: pickRandom(robotColors),
      power: pickRandom(robotPowers),
      expanded: false,
      animating: true,
    };
    objects.push(robot);
    setTimeout(() => {
      const r = objects.find((o) => o.id === robot.id);
      if (r) r.animating = false;
    }, 50);
  }

  function toggleExpand(id: number) {
    const robot = objects.find((o) => o.id === id);
    if (robot) robot.expanded = !robot.expanded;
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Create Objects</h2>
    <p class="text-slate-600">Use the Robot class blueprint to create robot objects!</p>
  </div>

  <!-- Class Blueprint -->
  <div class="max-w-xs rounded-xl border-2 border-dashed border-blue-400 bg-blue-50 p-5 shadow-md">
    <div class="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-blue-500">Class Blueprint</div>
    <div class="text-center text-lg font-bold text-blue-700">Robot</div>
    <div class="mt-3 space-y-1">
      <div class="flex items-center gap-2 text-sm text-blue-600">
        <span class="inline-block h-2 w-2 rounded-full bg-blue-400"></span>
        <span class="font-semibold">name</span>
        <span class="text-blue-400">- string</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-blue-600">
        <span class="inline-block h-2 w-2 rounded-full bg-blue-400"></span>
        <span class="font-semibold">color</span>
        <span class="text-blue-400">- string</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-blue-600">
        <span class="inline-block h-2 w-2 rounded-full bg-blue-400"></span>
        <span class="font-semibold">power</span>
        <span class="text-blue-400">- string</span>
      </div>
    </div>
    <div class="mt-4 text-center">
      <button
        onclick={createObject}
        class="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow transition-all hover:bg-blue-700 active:scale-95"
      >
        Create Object
      </button>
    </div>
  </div>

  <!-- Created Objects -->
  <div class="flex flex-wrap justify-center gap-4">
    {#each objects as robot (robot.id)}
      <button
        onclick={() => toggleExpand(robot.id)}
        class="flex w-44 flex-col rounded-xl border-2 border-blue-300 bg-blue-100 p-3 shadow-sm transition-all duration-500 text-left hover:shadow-md hover:scale-105
          {robot.animating ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}
          {robot.expanded ? 'ring-2 ring-blue-400' : ''}"
      >
        <span class="text-[10px] font-semibold uppercase text-blue-500">Robot #{robot.id + 1}</span>
        <span class="text-sm font-bold text-blue-700">{robot.name}</span>
        {#if robot.expanded}
          <div class="mt-2 space-y-0.5 border-t border-blue-200 pt-2">
            <div class="text-xs text-blue-800"><span class="font-semibold">name:</span> "{robot.name}"</div>
            <div class="text-xs text-blue-800"><span class="font-semibold">color:</span> "{robot.color}"</div>
            <div class="text-xs text-blue-800"><span class="font-semibold">power:</span> "{robot.power}"</div>
          </div>
        {:else}
          <span class="mt-1 text-[10px] text-blue-400">Click to inspect</span>
        {/if}
      </button>
    {/each}

    {#if objects.length === 0}
      <div class="flex h-32 w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-400">
        No objects yet! Click "Create Object" above.
      </div>
    {/if}
  </div>

  {#if objects.length > 0}
    <p class="text-xs text-slate-400">Click an object card to see its properties.</p>
  {/if}

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
    >
      Done exploring
    </button>
  </div>
</div>
