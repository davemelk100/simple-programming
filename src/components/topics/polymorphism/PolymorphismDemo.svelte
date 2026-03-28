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

  interface Shape {
    name: string;
    type: 'circle' | 'square' | 'triangle';
    color: string;
    params: Record<string, number>;
    area: () => number;
    formula: string;
  }

  const shapes: Shape[] = [
    {
      name: 'Circle',
      type: 'circle',
      color: 'orange',
      params: { radius: 5 },
      area: () => Math.round(Math.PI * 5 * 5 * 100) / 100,
      formula: 'pi x r x r = pi x 5 x 5',
    },
    {
      name: 'Square',
      type: 'square',
      color: 'orange',
      params: { side: 8 },
      area: () => 8 * 8,
      formula: 'side x side = 8 x 8',
    },
    {
      name: 'Triangle',
      type: 'triangle',
      color: 'orange',
      params: { base: 6, height: 10 },
      area: () => (6 * 10) / 2,
      formula: '(base x height) / 2 = (6 x 10) / 2',
    },
  ];

  let selectedShape = $state<number | null>(null);
  let showAllResults = $state(false);
  let animatingAll = $state(false);
  let allAnimatedIndex = $state(-1);

  function selectShape(index: number) {
    selectedShape = index;
    showAllResults = false;
    animatingAll = false;
    allAnimatedIndex = -1;
  }

  function calculateAll() {
    animatingAll = true;
    showAllResults = false;
    selectedShape = null;
    allAnimatedIndex = -1;

    let i = 0;
    const interval = setInterval(() => {
      allAnimatedIndex = i;
      i++;
      if (i >= shapes.length) {
        clearInterval(interval);
        showAllResults = true;
      }
    }, 600);
  }

  // --- Advanced mode state ---

  interface AdvShape {
    name: string;
    kind: string;
    params: Record<string, number>;
    area: () => number;
    perimeter: () => number;
    areaFormula: string;
    perimFormula: string;
    code: string;
  }

  const advShapes: AdvShape[] = [
    {
      name: 'Circle',
      kind: 'circle',
      params: { radius: 5 },
      area: () => Math.round(Math.PI * 25 * 100) / 100,
      perimeter: () => Math.round(2 * Math.PI * 5 * 100) / 100,
      areaFormula: 'pi * r^2 = pi * 25',
      perimFormula: '2 * pi * r = 2 * pi * 5',
      code: `class Circle implements Shape {\n  constructor(private radius: number) {}\n\n  get name() { return "Circle"; }\n  area() { return Math.PI * this.radius ** 2; }\n  perimeter() { return 2 * Math.PI * this.radius; }\n}`,
    },
    {
      name: 'Square',
      kind: 'square',
      params: { side: 8 },
      area: () => 64,
      perimeter: () => 32,
      areaFormula: 'side^2 = 8^2',
      perimFormula: '4 * side = 4 * 8',
      code: `class Square implements Shape {\n  constructor(private side: number) {}\n\n  get name() { return "Square"; }\n  area() { return this.side ** 2; }\n  perimeter() { return 4 * this.side; }\n}`,
    },
    {
      name: 'Triangle',
      kind: 'triangle',
      params: { base: 6, height: 10, sideA: 6, sideB: 8, sideC: 10 },
      area: () => 30,
      perimeter: () => 24,
      areaFormula: '(base * height) / 2 = (6 * 10) / 2',
      perimFormula: 'a + b + c = 6 + 8 + 10',
      code: `class Triangle implements Shape {\n  constructor(\n    private base: number,\n    private height: number,\n    private sides: [number, number, number]\n  ) {}\n\n  get name() { return "Triangle"; }\n  area() { return (this.base * this.height) / 2; }\n  perimeter() { return this.sides.reduce((a, b) => a + b, 0); }\n}`,
    },
    {
      name: 'Pentagon',
      kind: 'pentagon',
      params: { side: 6 },
      area: () => Math.round((Math.sqrt(25 + 10 * Math.sqrt(5)) / 4) * 36 * 100) / 100,
      perimeter: () => 30,
      areaFormula: '(sqrt(25+10*sqrt(5))/4) * s^2',
      perimFormula: '5 * side = 5 * 6',
      code: `class Pentagon implements Shape {\n  constructor(private side: number) {}\n\n  get name() { return "Pentagon"; }\n  area() {\n    return (Math.sqrt(25 + 10 * Math.sqrt(5)) / 4)\n           * this.side ** 2;\n  }\n  perimeter() { return 5 * this.side; }\n}`,
    },
    {
      name: 'Ellipse',
      kind: 'ellipse',
      params: { a: 7, b: 4 },
      area: () => Math.round(Math.PI * 7 * 4 * 100) / 100,
      perimeter: () => Math.round(Math.PI * (3 * (7 + 4) - Math.sqrt((3 * 7 + 4) * (7 + 3 * 4))) * 100) / 100,
      areaFormula: 'pi * a * b = pi * 7 * 4',
      perimFormula: 'pi * (3(a+b) - sqrt((3a+b)(a+3b)))',
      code: `class Ellipse implements Shape {\n  constructor(private a: number, private b: number) {}\n\n  get name() { return "Ellipse"; }\n  area() { return Math.PI * this.a * this.b; }\n  perimeter() { // Ramanujan approximation\n    return Math.PI * (3 * (this.a + this.b)\n      - Math.sqrt((3*this.a+this.b)*(this.a+3*this.b)));\n  }\n}`,
    },
  ];

  let advSelected = $state<number | null>(null);

  function selectAdvShape(index: number) {
    advSelected = index;
  }

  // Container<T> tabs
  const containerTabs = [
    {
      label: 'Container<number>',
      code: `const nums = new Container<number>();\nnums.add(42);\nnums.add(7);\nnums.getAll(); // [42, 7]\nnums.first(); // 42`,
      result: 'Container<number> { items: [42, 7] }',
      explanation: 'T is bound to number -- only numbers can be added.',
    },
    {
      label: 'Container<string>',
      code: `const words = new Container<string>();\nwords.add("hello");\nwords.add("world");\nwords.getAll(); // ["hello", "world"]\nwords.map(s => s.toUpperCase()); // ["HELLO", "WORLD"]`,
      result: 'Container<string> { items: ["hello", "world"] }',
      explanation: 'T is bound to string -- .map() knows each item is a string.',
    },
    {
      label: 'Container<Shape>',
      code: `const shapes = new Container<Shape>();\nshapes.add(new Circle(5));\nshapes.add(new Square(8));\nshapes.map(s => s.area()); // [78.54, 64]\n// Polymorphism + Generics combined!`,
      result: 'Container<Shape> { items: [Circle, Square] }',
      explanation: 'T is bound to Shape -- each item has .area() and .perimeter(). Generics + polymorphism together.',
    },
  ];

  let activeContainer = $state(0);
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Polymorphism in Action</h2>
    <p class="max-w-lg text-slate-600">
      Click any shape to call <code class="rounded bg-orange-100 px-1.5 py-0.5 text-orange-700">.area()</code> on it,
      or press the button to call it on <strong>all</strong> of them at once.
    </p>
  </div>

  <!-- Shapes row -->
  <div class="flex items-end justify-center gap-8">
    {#each shapes as shape, i}
      <button
        onclick={() => selectShape(i)}
        class="group flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105"
      >
        <!-- Shape visual -->
        {#if shape.type === 'circle'}
          <div class="flex h-20 w-20 items-center justify-center rounded-full border-2 shadow-md transition-all duration-300
            {selectedShape === i || allAnimatedIndex >= i ? 'border-orange-500 bg-orange-200 scale-110 shape-pulse' : 'border-orange-300 bg-orange-50 group-hover:border-orange-400'}">
            <span class="text-xs font-bold text-orange-700">r=5</span>
          </div>
        {:else if shape.type === 'square'}
          <div class="flex h-20 w-20 items-center justify-center rounded border-2 shadow-md transition-all duration-300
            {selectedShape === i || allAnimatedIndex >= i ? 'border-orange-500 bg-orange-200 scale-110 shape-pulse' : 'border-orange-300 bg-orange-50 group-hover:border-orange-400'}">
            <span class="text-xs font-bold text-orange-700">s=8</span>
          </div>
        {:else}
          <svg viewBox="0 0 80 70" class="h-20 w-20 transition-all duration-300
            {selectedShape === i || allAnimatedIndex >= i ? 'scale-110 shape-pulse' : 'group-hover:scale-105'}">
            <polygon points="40,5 75,65 5,65"
              fill="{selectedShape === i || allAnimatedIndex >= i ? '#fed7aa' : '#fff7ed'}"
              stroke="{selectedShape === i || allAnimatedIndex >= i ? '#ea580c' : '#fdba74'}"
              stroke-width="2" />
            <text x="40" y="48" text-anchor="middle" fill="#c2410c" font-size="10" font-weight="bold">b=6,h=10</text>
          </svg>
        {/if}
        <span class="text-sm font-semibold text-orange-700">{shape.name}</span>
      </button>
    {/each}
  </div>

  <!-- Calculate All button -->
  <div>
    <button
      onclick={calculateAll}
      class="rounded-full border-2 border-orange-400 bg-orange-100 px-6 py-3 font-bold text-orange-700 shadow-md transition-all hover:bg-orange-200 active:scale-95"
    >
      Calculate Area on All Shapes
    </button>
  </div>

  <!-- Result display -->
  {#if selectedShape !== null}
    <div class="max-w-sm rounded-xl border-2 border-orange-300 bg-orange-50 p-5 shadow-md animate-pop">
      <p class="mb-1 text-sm font-semibold text-orange-600">{shapes[selectedShape].name}.area()</p>
      <p class="mb-2 text-xs text-slate-500">{shapes[selectedShape].formula}</p>
      <p class="text-2xl font-bold text-orange-700">{shapes[selectedShape].area()}</p>
    </div>
  {/if}

  {#if animatingAll}
    <div class="flex flex-wrap items-start justify-center gap-4">
      {#each shapes as shape, i}
        <div class="flex w-44 flex-col items-center gap-1 rounded-xl border p-4 transition-all duration-500
          {allAnimatedIndex >= i ? 'border-orange-300 bg-orange-50 opacity-100 translate-y-0' : 'border-slate-200 bg-white opacity-0 translate-y-4'}">
          <p class="text-sm font-semibold text-orange-600">{shape.name}.area()</p>
          <p class="text-xs text-slate-500">{shape.formula}</p>
          <p class="text-xl font-bold text-orange-700">{allAnimatedIndex >= i ? shape.area() : '...'}</p>
        </div>
      {/each}
    </div>

    {#if showAllResults}
      <p class="text-sm text-slate-500">
        Same method call, three different calculations. That's polymorphism!
      </p>
    {/if}
  {/if}

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
    >
      Done exploring
    </button>
  </div>

  {:else}

  <!-- ADVANCED MODE -->
  <div>
    <h2 class="mb-3 text-2xl font-bold text-slate-800">Advanced Polymorphism Lab</h2>
    <p class="max-w-xl text-slate-600">
      Explore interface contracts, method resolution, type narrowing, and generic containers interactively.
    </p>
  </div>

  <!-- Interface / Contract Visualization -->
  <div class="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-orange-600">Shape Interface Contract</h3>
    <div class="mb-4 rounded-lg bg-slate-800 p-4 font-mono text-sm">
      <pre class="text-green-400">interface Shape {'{'}
  name: string;
  area(): number;
  perimeter(): number;
{'}'}</pre>
    </div>
    <p class="text-sm text-slate-500">Every shape below implements this contract. Click one to see which implementation gets called.</p>
  </div>

  <!-- Advanced shapes row -->
  <div class="flex flex-wrap items-end justify-center gap-6">
    {#each advShapes as shape, i}
      <button
        onclick={() => selectAdvShape(i)}
        class="group flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105"
      >
        {#if shape.kind === 'circle'}
          <div class="flex h-20 w-20 items-center justify-center rounded-full border-2 shadow-md transition-all duration-300
            {advSelected === i ? 'border-orange-500 bg-orange-200 scale-110 shape-pulse' : 'border-orange-300 bg-orange-50 group-hover:border-orange-400'}">
            <span class="text-xs font-bold text-orange-700">r={shape.params.radius}</span>
          </div>
        {:else if shape.kind === 'square'}
          <div class="flex h-20 w-20 items-center justify-center rounded border-2 shadow-md transition-all duration-300
            {advSelected === i ? 'border-orange-500 bg-orange-200 scale-110 shape-pulse' : 'border-orange-300 bg-orange-50 group-hover:border-orange-400'}">
            <span class="text-xs font-bold text-orange-700">s={shape.params.side}</span>
          </div>
        {:else if shape.kind === 'triangle'}
          <svg viewBox="0 0 80 70" class="h-20 w-20 transition-all duration-300
            {advSelected === i ? 'scale-110 shape-pulse' : 'group-hover:scale-105'}">
            <polygon points="40,5 75,65 5,65"
              fill="{advSelected === i ? '#fed7aa' : '#fff7ed'}"
              stroke="{advSelected === i ? '#ea580c' : '#fdba74'}"
              stroke-width="2" />
            <text x="40" y="48" text-anchor="middle" fill="#c2410c" font-size="9" font-weight="bold">b={shape.params.base}</text>
          </svg>
        {:else if shape.kind === 'pentagon'}
          <svg viewBox="0 0 80 80" class="h-20 w-20 transition-all duration-300
            {advSelected === i ? 'scale-110 shape-pulse' : 'group-hover:scale-105'}">
            <polygon points="40,5 76,30 62,72 18,72 4,30"
              fill="{advSelected === i ? '#fed7aa' : '#fff7ed'}"
              stroke="{advSelected === i ? '#ea580c' : '#fdba74'}"
              stroke-width="2" />
            <text x="40" y="50" text-anchor="middle" fill="#c2410c" font-size="9" font-weight="bold">s={shape.params.side}</text>
          </svg>
        {:else if shape.kind === 'ellipse'}
          <svg viewBox="0 0 90 60" class="h-20 w-24 transition-all duration-300
            {advSelected === i ? 'scale-110 shape-pulse' : 'group-hover:scale-105'}">
            <ellipse cx="45" cy="30" rx="40" ry="25"
              fill="{advSelected === i ? '#fed7aa' : '#fff7ed'}"
              stroke="{advSelected === i ? '#ea580c' : '#fdba74'}"
              stroke-width="2" />
            <text x="45" y="33" text-anchor="middle" fill="#c2410c" font-size="9" font-weight="bold">a={shape.params.a},b={shape.params.b}</text>
          </svg>
        {/if}
        <span class="text-sm font-semibold text-orange-700">{shape.name}</span>
      </button>
    {/each}
  </div>

  <!-- Method resolution visualization -->
  {#if advSelected !== null}
    <div class="animate-pop space-y-4">
      <div class="rounded-xl border-2 border-orange-300 bg-white p-5 shadow-md">
        <h4 class="mb-3 text-sm font-bold uppercase tracking-wider text-orange-600">Method Resolution</h4>
        <div class="flex items-center gap-3 text-sm">
          <code class="rounded bg-slate-100 px-2 py-1 text-slate-700">shape.area()</code>
          <svg class="h-4 w-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          <code class="rounded bg-orange-100 px-2 py-1 font-bold text-orange-700">{advShapes[advSelected].name}.area()</code>
          <svg class="h-4 w-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          <span class="rounded bg-green-100 px-2 py-1 font-bold text-green-700">{advShapes[advSelected].area()}</span>
        </div>
        <div class="mt-2 flex items-center gap-3 text-sm">
          <code class="rounded bg-slate-100 px-2 py-1 text-slate-700">shape.perimeter()</code>
          <svg class="h-4 w-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          <code class="rounded bg-orange-100 px-2 py-1 font-bold text-orange-700">{advShapes[advSelected].name}.perimeter()</code>
          <svg class="h-4 w-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          <span class="rounded bg-green-100 px-2 py-1 font-bold text-green-700">{advShapes[advSelected].perimeter()}</span>
        </div>
        <p class="mt-3 text-xs text-slate-500">Formula (area): <code>{advShapes[advSelected].areaFormula}</code></p>
        <p class="text-xs text-slate-500">Formula (perimeter): <code>{advShapes[advSelected].perimFormula}</code></p>
      </div>

      <!-- TypeScript class code for selected shape -->
      <div class="rounded-xl bg-slate-800 p-4 font-mono text-sm">
        <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{advShapes[advSelected].name} Implementation</div>
        <pre class="text-green-400">{advShapes[advSelected].code}</pre>
      </div>
    </div>
  {/if}

  <!-- instanceof / Type Narrowing demo -->
  <div class="rounded-xl border-2 border-orange-200 bg-white p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-orange-600">instanceof Type Narrowing</h3>
    <p class="mb-3 text-sm text-slate-600">Click a shape above, then see how <code class="rounded bg-orange-100 px-1 py-0.5 text-orange-700">instanceof</code> narrows the type at runtime:</p>
    {#if advSelected !== null}
      <div class="space-y-1 rounded-lg bg-slate-800 p-4 font-mono text-sm">
        {#each advShapes as shape, i}
          <div class="flex items-center gap-2">
            <span class="text-slate-400">shape instanceof {shape.name}?</span>
            {#if i === advSelected}
              <span class="font-bold text-green-400">true</span>
              <span class="text-slate-500">// type narrowed to {shape.name}</span>
            {:else}
              <span class="text-red-400">false</span>
            {/if}
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-sm italic text-slate-400">Select a shape above to see type narrowing in action.</p>
    {/if}
  </div>

  <!-- Generic / Parameterized Polymorphism: Container<T> -->
  <div class="rounded-xl border-2 border-orange-200 bg-white p-5">
    <h3 class="mb-3 text-sm font-bold uppercase tracking-wider text-orange-600">Generic Polymorphism: Container&lt;T&gt;</h3>
    <p class="mb-3 text-sm text-slate-600">A single <code class="rounded bg-orange-100 px-1 py-0.5 text-orange-700">Container&lt;T&gt;</code> works with any type. Click a tab to see it in action.</p>

    <div class="mb-3 flex gap-2">
      {#each containerTabs as tab, i}
        <button
          onclick={() => (activeContainer = i)}
          class="rounded-full px-4 py-1.5 text-sm font-semibold transition-all
            {activeContainer === i ? 'bg-orange-600 text-white shadow-md' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}"
        >
          {tab.label}
        </button>
      {/each}
    </div>

    <div class="rounded-lg bg-slate-800 p-4 font-mono text-sm">
      <pre class="text-green-400">{containerTabs[activeContainer].code}</pre>
    </div>
    <div class="mt-3 rounded-lg border border-orange-200 bg-orange-50 p-3">
      <p class="text-sm text-slate-600"><strong>Result:</strong> <code class="text-orange-700">{containerTabs[activeContainer].result}</code></p>
      <p class="mt-1 text-xs text-slate-500">{containerTabs[activeContainer].explanation}</p>
    </div>
  </div>

  <div>
    <button
      onclick={oncomplete}
      class="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
    >
      Done exploring
    </button>
  </div>

  {/if}
</div>

<style>
  @keyframes popIn {
    0% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  .animate-pop {
    animation: popIn 0.4s ease-out;
  }
  .shape-pulse {
    animation: pulse 0.6s ease-in-out;
  }
</style>
