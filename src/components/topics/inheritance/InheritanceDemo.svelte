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

  interface ClassDef {
    name: string;
    inherited: { label: string; value: string }[];
    own: { label: string; value: string }[];
  }

  let parentProps = $state([
    { label: 'name', value: '"..."' },
    { label: 'sound', value: '"..."' },
  ]);

  let parentMethods = $state([
    { label: 'speak()', value: 'prints sound' },
    { label: 'move()', value: 'changes position' },
  ]);

  const children: ClassDef[] = [
    {
      name: 'Dog',
      inherited: [
        { label: 'name', value: '"Buddy"' },
        { label: 'sound', value: '"Woof!"' },
      ],
      own: [
        { label: 'fetch()', value: 'retrieves a ball' },
      ],
    },
    {
      name: 'Cat',
      inherited: [
        { label: 'name', value: '"Whiskers"' },
        { label: 'sound', value: '"Meow!"' },
      ],
      own: [
        { label: 'purr()', value: 'vibrates softly' },
      ],
    },
    {
      name: 'Bird',
      inherited: [
        { label: 'name', value: '"Tweety"' },
        { label: 'sound', value: '"Tweet!"' },
      ],
      own: [
        { label: 'fly()', value: 'takes to the sky' },
      ],
    },
  ];

  let selected = $state<string | null>(null);

  let selectedChild = $derived(children.find((c) => c.name === selected) ?? null);

  // --- Advanced mode state ---

  interface AdvMember {
    name: string;
    visibility: 'public' | 'protected' | 'abstract';
    kind: 'property' | 'method';
    value: string;
    overridden?: boolean;
    callsSuper?: boolean;
  }

  interface AdvClass {
    name: string;
    level: 'base' | 'middle' | 'leaf';
    members: AdvMember[];
  }

  const advClasses: AdvClass[] = [
    {
      name: 'Animal',
      level: 'base',
      members: [
        { name: 'name', visibility: 'public', kind: 'property', value: 'string' },
        { name: '_energy', visibility: 'protected', kind: 'property', value: 'number = 100' },
        { name: 'speak()', visibility: 'abstract', kind: 'method', value: 'must be implemented by subclass' },
        { name: 'move()', visibility: 'public', kind: 'method', value: 'reduces _energy by 10' },
      ],
    },
    {
      name: 'Mammal',
      level: 'middle',
      members: [
        { name: '_bodyTemp', visibility: 'protected', kind: 'property', value: 'number = 37' },
        { name: 'speak()', visibility: 'abstract', kind: 'method', value: 'still abstract -- delegates to children' },
        { name: 'nurse()', visibility: 'public', kind: 'method', value: 'feeds young, uses _energy' },
      ],
    },
    {
      name: 'Dog',
      level: 'leaf',
      members: [
        { name: 'breed', visibility: 'public', kind: 'property', value: 'string' },
        { name: 'speak()', visibility: 'public', kind: 'method', value: 'super.move() then "Woof!"', overridden: true, callsSuper: true },
        { name: 'fetch()', visibility: 'public', kind: 'method', value: 'retrieves item, uses _energy' },
      ],
    },
  ];

  const advCodeSnippets: Record<string, string> = {
    Animal: `abstract class Animal {
  public name: string;
  protected _energy = 100;

  constructor(name: string) {
    this.name = name;
  }

  abstract speak(): string;

  move(): string {
    this._energy -= 10;
    return \`\${this.name} moves (energy: \${this._energy})\`;
  }
}`,
    Mammal: `abstract class Mammal extends Animal {
  protected _bodyTemp = 37;

  abstract speak(): string; // still abstract

  nurse(): string {
    this._energy -= 20;
    return \`\${this.name} nurses young (energy: \${this._energy})\`;
  }
}`,
    Dog: `class Dog extends Mammal {
  public breed: string;

  constructor(name: string, breed: string) {
    super(name);          // calls Animal constructor
    this.breed = breed;
  }

  speak(): string {       // implements abstract method
    const moved = super.move(); // calls inherited move()
    return \`\${moved} then says "Woof!"\`;
  }

  fetch(item: string): string {
    this._energy -= 15;   // accesses protected member
    return \`\${this.name} fetches \${item}\`;
  }
}`,
  };

  let advSelected = $state<string>('Animal');
  let advHighlight = $state<'inherited' | 'overridden' | 'protected' | 'abstract' | null>(null);

  function advAllMembers(className: string): (AdvMember & { source: string })[] {
    const idx = advClasses.findIndex((c) => c.name === className);
    const result: (AdvMember & { source: string })[] = [];
    // Collect from ancestors first
    for (let i = 0; i <= idx; i++) {
      for (const m of advClasses[i].members) {
        // Check if a later class overrides this member
        const overriddenLater = advClasses.slice(i + 1, idx + 1).some(
          (c) => c.members.some((cm) => cm.name === m.name)
        );
        if (!overriddenLater) {
          result.push({ ...m, source: advClasses[i].name });
        }
      }
    }
    return result;
  }

  let advResolvedMembers = $derived(advAllMembers(advSelected));
</script>

{#if !advanced}
<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Explore: Inheritance Tree</h2>
    <p class="text-slate-600">Click each child class to see what it inherits and what it adds.</p>
  </div>

  <!-- Parent class box -->
  <div class="flex flex-col items-center">
    <div class="w-64 rounded-xl border-2 border-purple-400 bg-purple-100 p-4 shadow-md">
      <div class="mb-2 text-center">
        <span class="text-xs font-semibold uppercase tracking-wider text-purple-500">parent class</span>
        <div class="text-lg font-bold text-purple-700">Animal</div>
      </div>
      <div class="space-y-1">
        {#each parentProps as prop}
          <div class="flex justify-between rounded bg-purple-50 px-2 py-1 text-xs">
            <span class="font-medium text-purple-700">{prop.label}</span>
            <span class="text-purple-500">{prop.value}</span>
          </div>
        {/each}
        {#each parentMethods as method}
          <div class="flex justify-between rounded bg-purple-50 px-2 py-1 text-xs">
            <span class="font-medium text-purple-700">{method.label}</span>
            <span class="text-purple-400">{method.value}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Connector -->
    <div class="flex items-center justify-center">
      <div class="h-8 w-0.5 bg-purple-300"></div>
    </div>
    <div class="h-0.5 w-64 bg-purple-300"></div>

    <!-- Child boxes -->
    <div class="mt-2 flex flex-wrap justify-center gap-4">
      {#each children as child}
        <div class="flex flex-col items-center gap-1">
          <div class="h-4 w-0.5 bg-purple-300"></div>
          <button
            onclick={() => selected = selected === child.name ? null : child.name}
            class="w-28 rounded-lg border-2 p-3 text-center shadow-sm transition-all hover:scale-105 active:scale-95
              {selected === child.name
                ? 'border-purple-500 bg-purple-200 ring-2 ring-purple-300'
                : 'border-purple-300 bg-purple-50 hover:bg-purple-100'}"
          >
            <span class="text-xs text-purple-400">child</span>
            <div class="text-sm font-bold text-purple-700">{child.name}</div>
          </button>
        </div>
      {/each}
    </div>
  </div>

  <!-- Selected child detail -->
  {#if selectedChild}
    <div class="max-w-md rounded-xl border border-purple-200 bg-white p-5 shadow-sm transition-all">
      <h3 class="mb-3 text-lg font-bold text-purple-700">{selectedChild.name}</h3>

      <div class="mb-3">
        <p class="mb-1 text-xs font-semibold uppercase tracking-wider text-green-600">Inherited from Animal</p>
        <div class="space-y-1">
          {#each selectedChild.inherited as prop}
            <div class="flex justify-between rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-sm">
              <span class="font-medium text-green-700">{prop.label}</span>
              <span class="text-green-600">{prop.value}</span>
            </div>
          {/each}
          {#each parentMethods as method}
            <div class="flex justify-between rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-sm">
              <span class="font-medium text-green-700">{method.label}</span>
              <span class="text-green-500">{method.value}</span>
            </div>
          {/each}
        </div>
      </div>

      <div>
        <p class="mb-1 text-xs font-semibold uppercase tracking-wider text-purple-600">Own (new) methods</p>
        <div class="space-y-1">
          {#each selectedChild.own as prop}
            <div class="flex justify-between rounded-lg border border-purple-200 bg-purple-50 px-3 py-1.5 text-sm">
              <span class="font-medium text-purple-700">{prop.label}</span>
              <span class="text-purple-500">{prop.value}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {:else}
    <div class="flex h-24 max-w-md items-center justify-center rounded-xl border-2 border-dashed border-purple-200 text-sm text-purple-400">
      Click a child class above to explore
    </div>
  {/if}

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      Done exploring
    </button>
  </div>
</div>

{:else}

<!-- ========== ADVANCED MODE ========== -->
<div class="space-y-6">
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Explore: Multi-Level Inheritance</h2>
    <p class="text-slate-600">
      Click each class in the chain to inspect inherited, overridden, protected, and abstract members.
    </p>
  </div>

  <!-- Hierarchy chain: Animal -> Mammal -> Dog -->
  <div class="flex flex-col items-center gap-0">
    {#each advClasses as cls, i}
      <button
        onclick={() => advSelected = cls.name}
        class="w-56 rounded-xl border-2 p-3 text-center shadow-sm transition-all hover:scale-105 active:scale-95
          {advSelected === cls.name
            ? 'border-purple-500 bg-purple-200 ring-2 ring-purple-300'
            : 'border-purple-300 bg-purple-50 hover:bg-purple-100'}"
      >
        <span class="text-xs font-semibold uppercase tracking-wider text-purple-400">
          {cls.level === 'base' ? 'abstract base' : cls.level === 'middle' ? 'abstract middle' : 'concrete leaf'}
        </span>
        <div class="text-lg font-bold text-purple-700">{cls.name}</div>
      </button>
      {#if i < advClasses.length - 1}
        <div class="flex flex-col items-center">
          <div class="h-5 w-0.5 bg-purple-300"></div>
          <span class="text-xs text-purple-400">extends</span>
          <div class="h-5 w-0.5 bg-purple-300"></div>
        </div>
      {/if}
    {/each}
  </div>

  <!-- Filter buttons -->
  <div class="flex flex-wrap justify-center gap-2">
    <button
      onclick={() => advHighlight = advHighlight === 'inherited' ? null : 'inherited'}
      class="rounded-full border px-3 py-1 text-xs font-semibold transition-all
        {advHighlight === 'inherited'
          ? 'border-green-500 bg-green-100 text-green-700'
          : 'border-slate-300 bg-white text-slate-500 hover:bg-slate-50'}"
    >
      Inherited
    </button>
    <button
      onclick={() => advHighlight = advHighlight === 'overridden' ? null : 'overridden'}
      class="rounded-full border px-3 py-1 text-xs font-semibold transition-all
        {advHighlight === 'overridden'
          ? 'border-amber-500 bg-amber-100 text-amber-700'
          : 'border-slate-300 bg-white text-slate-500 hover:bg-slate-50'}"
    >
      Overridden
    </button>
    <button
      onclick={() => advHighlight = advHighlight === 'protected' ? null : 'protected'}
      class="rounded-full border px-3 py-1 text-xs font-semibold transition-all
        {advHighlight === 'protected'
          ? 'border-rose-500 bg-rose-100 text-rose-700'
          : 'border-slate-300 bg-white text-slate-500 hover:bg-slate-50'}"
    >
      Protected
    </button>
    <button
      onclick={() => advHighlight = advHighlight === 'abstract' ? null : 'abstract'}
      class="rounded-full border px-3 py-1 text-xs font-semibold transition-all
        {advHighlight === 'abstract'
          ? 'border-sky-500 bg-sky-100 text-sky-700'
          : 'border-slate-300 bg-white text-slate-500 hover:bg-slate-50'}"
    >
      Abstract
    </button>
  </div>

  <!-- Two-column layout: members + code -->
  <div class="grid gap-6 lg:grid-cols-2">
    <!-- Resolved members panel -->
    <div class="rounded-xl border border-purple-200 bg-white p-5 shadow-sm">
      <h3 class="mb-3 text-lg font-bold text-purple-700">
        {advSelected} — Resolved Members
      </h3>
      <div class="space-y-1.5">
        {#each advResolvedMembers as member}
          {@const isInherited = member.source !== advSelected}
          {@const isOverridden = member.overridden ?? false}
          {@const isProtected = member.visibility === 'protected'}
          {@const isAbstract = member.visibility === 'abstract'}
          {@const dimmed =
            (advHighlight === 'inherited' && !isInherited) ||
            (advHighlight === 'overridden' && !isOverridden) ||
            (advHighlight === 'protected' && !isProtected) ||
            (advHighlight === 'abstract' && !isAbstract)}
          <div
            class="flex items-start justify-between rounded-lg border px-3 py-2 text-sm transition-opacity
              {dimmed ? 'opacity-25' : ''}
              {isAbstract
                ? 'border-sky-200 bg-sky-50'
                : isOverridden
                  ? 'border-amber-200 bg-amber-50'
                  : isInherited
                    ? 'border-green-200 bg-green-50'
                    : 'border-purple-200 bg-purple-50'}"
          >
            <div class="flex flex-col">
              <span class="font-medium {isAbstract ? 'text-sky-700' : isOverridden ? 'text-amber-700' : isInherited ? 'text-green-700' : 'text-purple-700'}">
                {member.name}
              </span>
              <span class="text-xs text-slate-400">
                {#if isOverridden && member.callsSuper}overrides + calls super &middot; {/if}
                {#if isAbstract}abstract &middot; {/if}
                {#if isProtected}protected &middot; {/if}
                from {member.source}
              </span>
            </div>
            <span class="ml-2 shrink-0 text-xs text-slate-500">{member.value}</span>
          </div>
        {/each}
      </div>

      <!-- Legend -->
      <div class="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
        <span class="flex items-center gap-1"><span class="inline-block h-2.5 w-2.5 rounded bg-green-300"></span> Inherited</span>
        <span class="flex items-center gap-1"><span class="inline-block h-2.5 w-2.5 rounded bg-amber-300"></span> Overridden</span>
        <span class="flex items-center gap-1"><span class="inline-block h-2.5 w-2.5 rounded bg-sky-300"></span> Abstract</span>
        <span class="flex items-center gap-1"><span class="inline-block h-2.5 w-2.5 rounded bg-rose-300"></span> Protected</span>
        <span class="flex items-center gap-1"><span class="inline-block h-2.5 w-2.5 rounded bg-purple-300"></span> Own</span>
      </div>
    </div>

    <!-- Code panel -->
    <div class="rounded-xl border border-slate-200 bg-slate-900 p-5 shadow-sm">
      <h3 class="mb-3 text-sm font-bold text-slate-400">TypeScript — {advSelected}</h3>
      <pre class="overflow-x-auto text-xs leading-relaxed text-slate-200"><code>{advCodeSnippets[advSelected]}</code></pre>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
    >
      Done exploring
    </button>
  </div>
</div>

{/if}
