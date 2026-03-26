<script lang="ts">
  interface Props {
    oncomplete?: (score?: number) => void;
  }

  let { oncomplete }: Props = $props();

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
</script>

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
