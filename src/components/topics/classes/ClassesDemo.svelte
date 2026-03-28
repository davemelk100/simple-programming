<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);

  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

  // --- Basic mode state ---
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

  // --- Advanced mode state ---
  interface AdvRobot {
    id: number;
    name: string;
    color: string;
    power: string;
    level: number;
    hp: number;
    maxHp: number;
    expanded: boolean;
    animating: boolean;
    log: string[];
  }

  let advRobots = $state<AdvRobot[]>([]);
  let advNextId = $state(0);
  let advTotalCreated = $state(0);
  let advInputName = $state('');
  let advInputColor = $state('Blue');
  let advInputPower = $state('Laser Eyes');

  const advColorOptions = ['Red', 'Blue', 'Green', 'Gold', 'Silver', 'Purple', 'Cyan', 'Orange'];
  const advPowerOptions = ['Laser Eyes', 'Super Speed', 'Flight', 'Shield', 'Teleport', 'Strength', 'Invisibility', 'Time Warp'];

  function advCreateRobot() {
    const name = advInputName.trim() || `Robot-${advNextId}`;
    const robot: AdvRobot = {
      id: advNextId++,
      name,
      color: advInputColor,
      power: advInputPower,
      level: 1,
      hp: 100,
      maxHp: 100,
      expanded: false,
      animating: true,
      log: [`Created ${name} with ${advInputPower}`],
    };
    advRobots.push(robot);
    advTotalCreated++;
    advInputName = '';
    setTimeout(() => {
      const r = advRobots.find((o) => o.id === robot.id);
      if (r) r.animating = false;
    }, 50);
  }

  function advGreet(id: number) {
    const r = advRobots.find((o) => o.id === id);
    if (r) r.log = [...r.log, `${r.name} says: "Hello, I am ${r.name}!"`];
  }

  function advAttack(id: number) {
    const r = advRobots.find((o) => o.id === id);
    if (!r) return;
    const dmg = Math.floor(Math.random() * 20) + 5 + r.level * 3;
    r.log = [...r.log, `${r.name} attacks with ${r.power} for ${dmg} damage!`];
  }

  function advLevelUp(id: number) {
    const r = advRobots.find((o) => o.id === id);
    if (!r) return;
    r.level++;
    const oldMax = r.maxHp;
    r.maxHp = 100 + (r.level - 1) * 25;
    r.hp = r.maxHp;
    r.log = [...r.log, `${r.name} leveled up to ${r.level}! HP: ${oldMax} → ${r.maxHp}`];
  }

  function advSetHp(id: number, value: number) {
    const r = advRobots.find((o) => o.id === id);
    if (!r) return;
    const clamped = Math.max(0, Math.min(r.maxHp, value));
    if (value !== clamped) {
      r.log = [...r.log, `HP clamped to ${clamped} (must be 0–${r.maxHp})`];
    }
    r.hp = clamped;
  }

  function advToggleExpand(id: number) {
    const r = advRobots.find((o) => o.id === id);
    if (r) r.expanded = !r.expanded;
  }

  const advCodePreview = `class Robot {
  // Static property
  static count: number = 0;

  // Instance properties
  name: string;
  color: string;
  power: string;
  private _level: number = 1;
  private _hp: number = 100;

  // Constructor with typed params
  constructor(
    name: string,
    color: string,
    power: string
  ) {
    this.name = name;
    this.color = color;
    this.power = power;
    Robot.count++;
  }

  // Getter with computed value
  get maxHp(): number {
    return 100 + (this._level - 1) * 25;
  }

  // Getter / Setter with validation
  get hp(): number { return this._hp; }
  set hp(value: number) {
    this._hp = Math.max(0,
      Math.min(this.maxHp, value));
  }

  // Methods
  greet(): string {
    return \`Hello, I am \${this.name}!\`;
  }

  attack(): number {
    return Math.floor(Math.random() * 20)
      + 5 + this._level * 3;
  }

  levelUp(): void {
    this._level++;
    this._hp = this.maxHp;
  }

  // Static method
  static getCount(): number {
    return Robot.count;
  }
}`;
</script>

{#if !advanced}
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
      <div class="flex h-32 w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-500">
        No objects yet! Click "Create Object" above.
      </div>
    {/if}
  </div>

  {#if objects.length > 0}
    <p class="text-xs text-slate-500">Click an object card to see its properties.</p>
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

{:else}

<!-- Advanced Mode -->
<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Classes in Depth</h2>
    <p class="text-slate-600">Create Robot instances with typed constructors, call methods, and explore static members, getters, and setters.</p>
  </div>

  <div class="flex flex-col gap-6 lg:flex-row">
    <!-- Left: Code Preview -->
    <div class="flex-1 overflow-auto rounded-xl border border-slate-300 bg-slate-900 p-4 shadow-inner">
      <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">TypeScript Class Definition</div>
      <pre class="whitespace-pre text-xs leading-relaxed text-green-300">{advCodePreview}</pre>
    </div>

    <!-- Right: Interactive Panel -->
    <div class="flex-1 space-y-4">
      <!-- Constructor Form -->
      <div class="rounded-xl border-2 border-dashed border-blue-400 bg-blue-50 p-5 shadow-md">
        <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-500">Constructor</div>
        <div class="text-sm font-mono text-blue-700 mb-3">new Robot(name, color, power)</div>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <label for="adv-name" class="w-14 text-xs font-semibold text-blue-600">name:</label>
            <input
              id="adv-name"
              type="text"
              bind:value={advInputName}
              placeholder="e.g. Bolt"
              class="flex-1 rounded border border-blue-300 bg-white px-2 py-1 text-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div class="flex items-center gap-2">
            <label for="adv-color" class="w-14 text-xs font-semibold text-blue-600">color:</label>
            <select
              id="adv-color"
              bind:value={advInputColor}
              class="flex-1 rounded border border-blue-300 bg-white px-2 py-1 text-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {#each advColorOptions as c}
                <option value={c}>{c}</option>
              {/each}
            </select>
          </div>
          <div class="flex items-center gap-2">
            <label for="adv-power" class="w-14 text-xs font-semibold text-blue-600">power:</label>
            <select
              id="adv-power"
              bind:value={advInputPower}
              class="flex-1 rounded border border-blue-300 bg-white px-2 py-1 text-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {#each advPowerOptions as p}
                <option value={p}>{p}</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="mt-4 text-center">
          <button
            onclick={advCreateRobot}
            class="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow transition-all hover:bg-blue-700 active:scale-95"
          >
            new Robot(...)
          </button>
        </div>
      </div>

      <!-- Static property -->
      <div class="rounded-lg border border-purple-300 bg-purple-50 px-4 py-3">
        <span class="text-xs font-semibold uppercase tracking-wider text-purple-500">Static Property</span>
        <div class="mt-1 flex items-center gap-2 text-sm">
          <span class="font-mono text-purple-700">Robot.count</span>
          <span class="text-purple-400">=</span>
          <span class="font-bold text-purple-800">{advTotalCreated}</span>
        </div>
        <div class="mt-1 text-xs text-purple-500">
          Robot.getCount() returns <span class="font-bold">{advTotalCreated}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Robot Instances -->
  <div class="flex flex-wrap gap-4">
    {#each advRobots as robot (robot.id)}
      <div
        class="w-72 rounded-xl border-2 border-blue-300 bg-blue-100 p-4 shadow-sm transition-all duration-500
          {robot.animating ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}
          {robot.expanded ? 'ring-2 ring-blue-400' : ''}"
      >
        <button
          onclick={() => advToggleExpand(robot.id)}
          class="flex w-full items-center justify-between text-left"
        >
          <div>
            <span class="text-[10px] font-semibold uppercase text-blue-500">Robot #{robot.id + 1}</span>
            <span class="ml-2 text-sm font-bold text-blue-700">{robot.name}</span>
          </div>
          <span class="text-xs text-blue-400">{robot.expanded ? 'collapse' : 'expand'}</span>
        </button>

        {#if robot.expanded}
          <div class="mt-3 space-y-2 border-t border-blue-200 pt-3">
            <!-- Properties -->
            <div class="space-y-0.5">
              <div class="text-xs text-blue-800"><span class="font-semibold">name:</span> "{robot.name}"</div>
              <div class="text-xs text-blue-800"><span class="font-semibold">color:</span> "{robot.color}"</div>
              <div class="text-xs text-blue-800"><span class="font-semibold">power:</span> "{robot.power}"</div>
              <div class="text-xs text-blue-800"><span class="font-semibold">level:</span> {robot.level}</div>
            </div>

            <!-- Getter display -->
            <div class="rounded-md border border-emerald-300 bg-emerald-50 px-2 py-1">
              <div class="text-[10px] font-semibold uppercase text-emerald-500">Getters / Setters</div>
              <div class="text-xs text-emerald-800">
                <span class="font-semibold">hp:</span> {robot.hp} / {robot.maxHp}
              </div>
              <div class="mt-1 flex items-center gap-1">
                <label for="hp-{robot.id}" class="text-[10px] text-emerald-600">set hp =</label>
                <input
                  id="hp-{robot.id}"
                  type="number"
                  value={robot.hp}
                  onchange={(e) => advSetHp(robot.id, Number((e.target as HTMLInputElement).value))}
                  class="w-16 rounded border border-emerald-300 bg-white px-1 py-0.5 text-xs text-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
                <span class="text-[10px] text-emerald-400">(validated 0-{robot.maxHp})</span>
              </div>
            </div>

            <!-- Method buttons -->
            <div class="flex flex-wrap gap-1">
              <button
                onclick={() => advGreet(robot.id)}
                class="rounded-full bg-blue-500 px-3 py-1 text-[11px] font-semibold text-white transition-all hover:bg-blue-600 active:scale-95"
              >
                .greet()
              </button>
              <button
                onclick={() => advAttack(robot.id)}
                class="rounded-full bg-red-500 px-3 py-1 text-[11px] font-semibold text-white transition-all hover:bg-red-600 active:scale-95"
              >
                .attack()
              </button>
              <button
                onclick={() => advLevelUp(robot.id)}
                class="rounded-full bg-amber-500 px-3 py-1 text-[11px] font-semibold text-white transition-all hover:bg-amber-600 active:scale-95"
              >
                .levelUp()
              </button>
            </div>

            <!-- Log output -->
            {#if robot.log.length > 0}
              <div class="max-h-28 overflow-y-auto rounded-md border border-slate-300 bg-slate-800 p-2">
                {#each robot.log as entry}
                  <div class="font-mono text-[11px] leading-relaxed text-green-300">&gt; {entry}</div>
                {/each}
              </div>
            {/if}
          </div>
        {/if}
      </div>
    {/each}

    {#if advRobots.length === 0}
      <div class="flex h-32 w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-500">
        No instances yet! Use the constructor above to create a Robot.
      </div>
    {/if}
  </div>

  {#if advRobots.length > 0}
    <p class="text-xs text-slate-500">Expand a robot card to inspect properties, call methods, and test getters/setters.</p>
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
{/if}
