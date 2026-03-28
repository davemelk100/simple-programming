<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdvanced, onAdvancedChange } from '../../../lib/mode';

  let advanced = $state(false);
  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  interface Props {
    oncomplete?: () => void;
  }
  let { oncomplete }: Props = $props();

  // === Basic mode: "Simplify This" — pick the better version ===
  interface BasicChallenge {
    title: string;
    description: string;
    complexCode: string;
    optionA: { label: string; code: string };
    optionB: { label: string; code: string };
    correctOption: 'A' | 'B';
    explanation: string;
  }

  const basicChallenges: BasicChallenge[] = [
    {
      title: 'Challenge 1: Nested Ternary',
      description: 'This code uses a nested ternary that is hard to follow. Which simplified version is better?',
      complexCode: `<span class="kw">const</span> <span class="var">label</span> <span class="op">=</span> <span class="var">score</span> <span class="op">&gt;</span> <span class="num">90</span> <span class="op">?</span> <span class="str">"A"</span> <span class="op">:</span> <span class="var">score</span> <span class="op">&gt;</span> <span class="num">80</span> <span class="op">?</span> <span class="str">"B"</span> <span class="op">:</span> <span class="var">score</span> <span class="op">&gt;</span> <span class="num">70</span> <span class="op">?</span> <span class="str">"C"</span> <span class="op">:</span> <span class="str">"F"</span><span class="op">;</span>`,
      optionA: {
        label: 'Option A',
        code: `<span class="kw">function</span> <span class="fn">getLabel</span>(<span class="arg">score</span>) {
  <span class="kw">if</span> (<span class="arg">score</span> <span class="op">&gt;</span> <span class="num">90</span>) <span class="kw">return</span> <span class="str">"A"</span><span class="op">;</span>
  <span class="kw">if</span> (<span class="arg">score</span> <span class="op">&gt;</span> <span class="num">80</span>) <span class="kw">return</span> <span class="str">"B"</span><span class="op">;</span>
  <span class="kw">if</span> (<span class="arg">score</span> <span class="op">&gt;</span> <span class="num">70</span>) <span class="kw">return</span> <span class="str">"C"</span><span class="op">;</span>
  <span class="kw">return</span> <span class="str">"F"</span><span class="op">;</span>
}`,
      },
      optionB: {
        label: 'Option B',
        code: `<span class="kw">const</span> <span class="var">label</span> <span class="op">=</span> <span class="var">score</span> <span class="op">&gt;</span> <span class="num">90</span> <span class="op">?</span> <span class="str">"A"</span>
  <span class="op">:</span> <span class="var">score</span> <span class="op">&gt;</span> <span class="num">80</span> <span class="op">?</span> <span class="str">"B"</span>
  <span class="op">:</span> <span class="var">score</span> <span class="op">&gt;</span> <span class="num">70</span> <span class="op">?</span> <span class="str">"C"</span>
  <span class="op">:</span> <span class="str">"F"</span><span class="op">;</span>`,
      },
      correctOption: 'A',
      explanation: 'Option A uses early returns with clear if-statements. Each condition is on its own line and immediately returns. Option B is still a nested ternary — just reformatted. Formatting doesn\'t fix complexity.',
    },
    {
      title: 'Challenge 2: One-Liner vs. Multi-Line',
      description: 'This clever one-liner filters and transforms an array. Which rewrite is simpler?',
      complexCode: `<span class="kw">const</span> <span class="var">result</span> <span class="op">=</span> <span class="var">users</span><span class="op">.</span><span class="fn">filter</span>(<span class="arg">u</span><span class="op">=&gt;</span><span class="arg">u</span><span class="op">.</span><span class="var">age</span><span class="op">&gt;=</span><span class="num">18</span><span class="op">&amp;&amp;</span><span class="arg">u</span><span class="op">.</span><span class="var">active</span>)<span class="op">.</span><span class="fn">map</span>(<span class="arg">u</span><span class="op">=&gt;</span>({<span class="var">name</span><span class="op">:</span><span class="arg">u</span><span class="op">.</span><span class="var">name</span>,<span class="var">email</span><span class="op">:</span><span class="arg">u</span><span class="op">.</span><span class="var">email</span>}))<span class="op">;</span>`,
      optionA: {
        label: 'Option A',
        code: `<span class="kw">const</span> <span class="var">adults</span> <span class="op">=</span> <span class="var">users</span><span class="op">.</span><span class="fn">filter</span>(<span class="arg">user</span> <span class="op">=&gt;</span> <span class="arg">user</span><span class="op">.</span><span class="var">age</span> <span class="op">&gt;=</span> <span class="num">18</span>)<span class="op">;</span>
<span class="kw">const</span> <span class="var">activeAdults</span> <span class="op">=</span> <span class="var">adults</span><span class="op">.</span><span class="fn">filter</span>(<span class="arg">user</span> <span class="op">=&gt;</span> <span class="arg">user</span><span class="op">.</span><span class="var">active</span>)<span class="op">;</span>
<span class="kw">const</span> <span class="var">contacts</span> <span class="op">=</span> <span class="var">activeAdults</span><span class="op">.</span><span class="fn">map</span>(<span class="arg">user</span> <span class="op">=&gt;</span> ({
  <span class="var">name</span><span class="op">:</span> <span class="arg">user</span><span class="op">.</span><span class="var">name</span>,
  <span class="var">email</span><span class="op">:</span> <span class="arg">user</span><span class="op">.</span><span class="var">email</span>,
}))<span class="op">;</span>`,
      },
      optionB: {
        label: 'Option B',
        code: `<span class="kw">const</span> <span class="var">result</span> <span class="op">=</span> []<span class="op">;</span>
<span class="kw">for</span> (<span class="kw">let</span> <span class="var">i</span> <span class="op">=</span> <span class="num">0</span><span class="op">;</span> <span class="var">i</span> <span class="op">&lt;</span> <span class="var">users</span><span class="op">.</span><span class="var">length</span><span class="op">;</span> <span class="var">i</span><span class="op">++</span>) {
  <span class="kw">if</span> (<span class="var">users</span>[<span class="var">i</span>]<span class="op">.</span><span class="var">age</span> <span class="op">&gt;=</span> <span class="num">18</span>) {
    <span class="kw">if</span> (<span class="var">users</span>[<span class="var">i</span>]<span class="op">.</span><span class="var">active</span>) {
      <span class="var">result</span><span class="op">.</span><span class="fn">push</span>({ <span class="var">name</span><span class="op">:</span> <span class="var">users</span>[<span class="var">i</span>]<span class="op">.</span><span class="var">name</span>, <span class="var">email</span><span class="op">:</span> <span class="var">users</span>[<span class="var">i</span>]<span class="op">.</span><span class="var">email</span> })<span class="op">;</span>
    }
  }
}`,
      },
      correctOption: 'A',
      explanation: 'Option A breaks the pipeline into named steps — each variable explains what it holds. Option B uses nested if-statements with index access, which is harder to scan. Named intermediate variables are a powerful simplicity tool.',
    },
    {
      title: 'Challenge 3: Over-Engineered Class',
      description: 'This code wraps a simple operation in a class with a factory pattern. Which is simpler?',
      complexCode: `<span class="kw">class</span> <span class="var">TemperatureConverter</span> {
  <span class="kw">constructor</span>(<span class="arg">strategy</span>) { <span class="kw">this</span><span class="op">.</span><span class="var">strategy</span> <span class="op">=</span> <span class="arg">strategy</span><span class="op">;</span> }
  <span class="fn">convert</span>(<span class="arg">val</span>) { <span class="kw">return</span> <span class="kw">this</span><span class="op">.</span><span class="var">strategy</span><span class="op">.</span><span class="fn">execute</span>(<span class="arg">val</span>)<span class="op">;</span> }
  <span class="kw">static</span> <span class="fn">create</span>(<span class="arg">type</span>) { <span class="op">...</span> }
}`,
      optionA: {
        label: 'Option A',
        code: `<span class="kw">class</span> <span class="var">TempConverter</span> {
  <span class="fn">toFahrenheit</span>(<span class="arg">c</span>) { <span class="kw">return</span> <span class="arg">c</span> <span class="op">*</span> <span class="num">9</span><span class="op">/</span><span class="num">5</span> <span class="op">+</span> <span class="num">32</span><span class="op">;</span> }
  <span class="fn">toCelsius</span>(<span class="arg">f</span>) { <span class="kw">return</span> (<span class="arg">f</span> <span class="op">-</span> <span class="num">32</span>) <span class="op">*</span> <span class="num">5</span><span class="op">/</span><span class="num">9</span><span class="op">;</span> }
}`,
      },
      optionB: {
        label: 'Option B',
        code: `<span class="kw">function</span> <span class="fn">toFahrenheit</span>(<span class="arg">celsius</span>) {
  <span class="kw">return</span> <span class="arg">celsius</span> <span class="op">*</span> <span class="num">9</span><span class="op">/</span><span class="num">5</span> <span class="op">+</span> <span class="num">32</span><span class="op">;</span>
}

<span class="kw">function</span> <span class="fn">toCelsius</span>(<span class="arg">fahrenheit</span>) {
  <span class="kw">return</span> (<span class="arg">fahrenheit</span> <span class="op">-</span> <span class="num">32</span>) <span class="op">*</span> <span class="num">5</span><span class="op">/</span><span class="num">9</span><span class="op">;</span>
}`,
      },
      correctOption: 'B',
      explanation: 'Option B uses plain functions — no class needed since there\'s no shared state. Option A still uses a class unnecessarily. When functions have no shared state, a class just adds ceremony without benefit.',
    },
  ];

  let basicAnswers = $state<(null | 'A' | 'B')[]>([null, null, null]);
  let basicResults = $state<(null | 'correct' | 'wrong')[]>([null, null, null]);
  let basicAllDone = $derived(basicResults.every((r) => r === 'correct'));

  function pickBasic(index: number, choice: 'A' | 'B') {
    basicAnswers[index] = choice;
    basicResults[index] = choice === basicChallenges[index].correctOption ? 'correct' : 'wrong';
  }

  $effect(() => {
    if (basicAllDone) oncomplete?.();
  });

  // === Advanced mode: "Complexity Meter" — rate complexity 1-5 ===
  interface AdvancedChallenge {
    title: string;
    code: string;
    actualComplexity: number;
    explanation: string;
    refactoredCode: string;
    refactoredComplexity: number;
  }

  const advancedChallenges: AdvancedChallenge[] = [
    {
      title: 'Snippet 1: Validate User Input',
      code: `<span class="kw">function</span> <span class="fn">validate</span>(<span class="arg">input</span>) {
  <span class="kw">if</span> (<span class="arg">input</span><span class="op">.</span><span class="var">name</span> <span class="op">&amp;&amp;</span> <span class="arg">input</span><span class="op">.</span><span class="var">name</span><span class="op">.</span><span class="var">length</span> <span class="op">&gt;</span> <span class="num">0</span>) {
    <span class="kw">if</span> (<span class="arg">input</span><span class="op">.</span><span class="var">email</span> <span class="op">&amp;&amp;</span> <span class="arg">input</span><span class="op">.</span><span class="var">email</span><span class="op">.</span><span class="fn">includes</span>(<span class="str">"@"</span>)) {
      <span class="kw">if</span> (<span class="arg">input</span><span class="op">.</span><span class="var">age</span> <span class="op">&amp;&amp;</span> <span class="arg">input</span><span class="op">.</span><span class="var">age</span> <span class="op">&gt;=</span> <span class="num">18</span>) {
        <span class="kw">return</span> <span class="num">true</span><span class="op">;</span>
      }
    }
  }
  <span class="kw">return</span> <span class="num">false</span><span class="op">;</span>
}`,
      actualComplexity: 4,
      explanation: 'Three if-statements plus the implicit else path at the end = cyclomatic complexity of 4. The && operators inside each condition also add branches, but the deeply nested structure is the main readability problem.',
      refactoredCode: `<span class="kw">function</span> <span class="fn">validate</span>(<span class="arg">input</span>) {
  <span class="kw">if</span> (<span class="op">!</span><span class="arg">input</span><span class="op">.</span><span class="var">name</span> <span class="op">||</span> <span class="arg">input</span><span class="op">.</span><span class="var">name</span><span class="op">.</span><span class="var">length</span> <span class="op">===</span> <span class="num">0</span>) <span class="kw">return</span> <span class="num">false</span><span class="op">;</span>
  <span class="kw">if</span> (<span class="op">!</span><span class="arg">input</span><span class="op">.</span><span class="var">email</span> <span class="op">||</span> <span class="op">!</span><span class="arg">input</span><span class="op">.</span><span class="var">email</span><span class="op">.</span><span class="fn">includes</span>(<span class="str">"@"</span>)) <span class="kw">return</span> <span class="num">false</span><span class="op">;</span>
  <span class="kw">if</span> (<span class="op">!</span><span class="arg">input</span><span class="op">.</span><span class="var">age</span> <span class="op">||</span> <span class="arg">input</span><span class="op">.</span><span class="var">age</span> <span class="op">&lt;</span> <span class="num">18</span>) <span class="kw">return</span> <span class="num">false</span><span class="op">;</span>
  <span class="kw">return</span> <span class="num">true</span><span class="op">;</span>
}`,
      refactoredComplexity: 4,
    },
    {
      title: 'Snippet 2: Process Order',
      code: `<span class="kw">function</span> <span class="fn">processOrder</span>(<span class="arg">order</span>) {
  <span class="kw">let</span> <span class="var">total</span> <span class="op">=</span> <span class="num">0</span><span class="op">;</span>
  <span class="kw">for</span> (<span class="kw">const</span> <span class="var">item</span> <span class="kw">of</span> <span class="arg">order</span><span class="op">.</span><span class="var">items</span>) {
    <span class="kw">if</span> (<span class="var">item</span><span class="op">.</span><span class="var">type</span> <span class="op">===</span> <span class="str">"physical"</span>) {
      <span class="var">total</span> <span class="op">+=</span> <span class="var">item</span><span class="op">.</span><span class="var">price</span> <span class="op">+</span> <span class="var">item</span><span class="op">.</span><span class="var">shipping</span><span class="op">;</span>
    } <span class="kw">else if</span> (<span class="var">item</span><span class="op">.</span><span class="var">type</span> <span class="op">===</span> <span class="str">"digital"</span>) {
      <span class="var">total</span> <span class="op">+=</span> <span class="var">item</span><span class="op">.</span><span class="var">price</span><span class="op">;</span>
    } <span class="kw">else if</span> (<span class="var">item</span><span class="op">.</span><span class="var">type</span> <span class="op">===</span> <span class="str">"subscription"</span>) {
      <span class="var">total</span> <span class="op">+=</span> <span class="var">item</span><span class="op">.</span><span class="var">price</span> <span class="op">*</span> <span class="var">item</span><span class="op">.</span><span class="var">months</span><span class="op">;</span>
    }
  }
  <span class="kw">if</span> (<span class="arg">order</span><span class="op">.</span><span class="var">coupon</span>) {
    <span class="var">total</span> <span class="op">*=</span> <span class="num">0.9</span><span class="op">;</span>
  }
  <span class="kw">return</span> <span class="var">total</span><span class="op">;</span>
}`,
      actualComplexity: 5,
      explanation: 'One for-loop, three if/else-if branches for item types, and one if for the coupon = cyclomatic complexity of 5. This is at the upper end of "easy to understand" and could benefit from extracting the price calculation.',
      refactoredCode: `<span class="kw">function</span> <span class="fn">itemPrice</span>(<span class="arg">item</span>) {
  <span class="kw">if</span> (<span class="arg">item</span><span class="op">.</span><span class="var">type</span> <span class="op">===</span> <span class="str">"physical"</span>)     <span class="kw">return</span> <span class="arg">item</span><span class="op">.</span><span class="var">price</span> <span class="op">+</span> <span class="arg">item</span><span class="op">.</span><span class="var">shipping</span><span class="op">;</span>
  <span class="kw">if</span> (<span class="arg">item</span><span class="op">.</span><span class="var">type</span> <span class="op">===</span> <span class="str">"subscription"</span>) <span class="kw">return</span> <span class="arg">item</span><span class="op">.</span><span class="var">price</span> <span class="op">*</span> <span class="arg">item</span><span class="op">.</span><span class="var">months</span><span class="op">;</span>
  <span class="kw">return</span> <span class="arg">item</span><span class="op">.</span><span class="var">price</span><span class="op">;</span>
}

<span class="kw">function</span> <span class="fn">processOrder</span>(<span class="arg">order</span>) {
  <span class="kw">let</span> <span class="var">total</span> <span class="op">=</span> <span class="arg">order</span><span class="op">.</span><span class="var">items</span><span class="op">.</span><span class="fn">reduce</span>((<span class="arg">sum</span>, <span class="arg">item</span>) <span class="op">=&gt;</span> <span class="arg">sum</span> <span class="op">+</span> <span class="fn">itemPrice</span>(<span class="arg">item</span>), <span class="num">0</span>)<span class="op">;</span>
  <span class="kw">return</span> <span class="arg">order</span><span class="op">.</span><span class="var">coupon</span> <span class="op">?</span> <span class="var">total</span> <span class="op">*</span> <span class="num">0.9</span> <span class="op">:</span> <span class="var">total</span><span class="op">;</span>
}`,
      refactoredComplexity: 3,
    },
    {
      title: 'Snippet 3: Permission Check',
      code: `<span class="kw">function</span> <span class="fn">canAccess</span>(<span class="arg">user</span>, <span class="arg">resource</span>) {
  <span class="kw">if</span> (<span class="arg">user</span><span class="op">.</span><span class="var">isAdmin</span>) {
    <span class="kw">return</span> <span class="num">true</span><span class="op">;</span>
  } <span class="kw">else</span> {
    <span class="kw">if</span> (<span class="arg">user</span><span class="op">.</span><span class="var">role</span> <span class="op">===</span> <span class="str">"editor"</span>) {
      <span class="kw">if</span> (<span class="arg">resource</span><span class="op">.</span><span class="var">type</span> <span class="op">===</span> <span class="str">"post"</span> <span class="op">||</span> <span class="arg">resource</span><span class="op">.</span><span class="var">type</span> <span class="op">===</span> <span class="str">"comment"</span>) {
        <span class="kw">return</span> <span class="num">true</span><span class="op">;</span>
      } <span class="kw">else</span> {
        <span class="kw">return</span> <span class="num">false</span><span class="op">;</span>
      }
    } <span class="kw">else if</span> (<span class="arg">user</span><span class="op">.</span><span class="var">role</span> <span class="op">===</span> <span class="str">"viewer"</span>) {
      <span class="kw">return</span> <span class="arg">resource</span><span class="op">.</span><span class="var">type</span> <span class="op">===</span> <span class="str">"post"</span><span class="op">;</span>
    }
  }
  <span class="kw">return</span> <span class="num">false</span><span class="op">;</span>
}`,
      actualComplexity: 5,
      explanation: 'One if for admin, one if for editor role, one if for resource type (with || adding a path), one else-if for viewer, plus the default return = cyclomatic complexity of 5. The deep nesting makes it feel more complex than it is.',
      refactoredCode: `<span class="kw">function</span> <span class="fn">canAccess</span>(<span class="arg">user</span>, <span class="arg">resource</span>) {
  <span class="kw">if</span> (<span class="arg">user</span><span class="op">.</span><span class="var">isAdmin</span>) <span class="kw">return</span> <span class="num">true</span><span class="op">;</span>

  <span class="kw">const</span> <span class="var">editorTypes</span> <span class="op">=</span> [<span class="str">"post"</span>, <span class="str">"comment"</span>]<span class="op">;</span>
  <span class="kw">if</span> (<span class="arg">user</span><span class="op">.</span><span class="var">role</span> <span class="op">===</span> <span class="str">"editor"</span>) <span class="kw">return</span> <span class="var">editorTypes</span><span class="op">.</span><span class="fn">includes</span>(<span class="arg">resource</span><span class="op">.</span><span class="var">type</span>)<span class="op">;</span>
  <span class="kw">if</span> (<span class="arg">user</span><span class="op">.</span><span class="var">role</span> <span class="op">===</span> <span class="str">"viewer"</span>) <span class="kw">return</span> <span class="arg">resource</span><span class="op">.</span><span class="var">type</span> <span class="op">===</span> <span class="str">"post"</span><span class="op">;</span>

  <span class="kw">return</span> <span class="num">false</span><span class="op">;</span>
}`,
      refactoredComplexity: 3,
    },
  ];

  let advRatings = $state<(number | null)[]>([null, null, null]);
  let advRevealed = $state<boolean[]>([false, false, false]);
  let advAllDone = $derived(advRevealed.every((r) => r));

  function rateAdvanced(index: number, rating: number) {
    advRatings[index] = rating;
  }

  function revealAdvanced(index: number) {
    advRevealed[index] = true;
  }

  $effect(() => {
    if (advAllDone) oncomplete?.();
  });
</script>

<div class="space-y-8">
  {#if !advanced}
  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Simplify This</h2>
    <p class="text-slate-600">Each example shows overly complex code. Pick the version (A or B) that is truly simpler and more readable.</p>
  </div>

  {#each basicChallenges as challenge, i}
    <div class="space-y-4 rounded-xl border p-5 transition-colors {basicResults[i] === 'correct' ? 'border-green-300 bg-green-50' : basicResults[i] === 'wrong' ? 'border-red-300 bg-red-50' : 'border-slate-200'}">
      <h3 class="font-semibold text-slate-800">{challenge.title}</h3>
      <p class="text-sm text-slate-600">{challenge.description}</p>

      <div>
        <span class="mb-1 inline-block text-xs font-bold text-slate-400">Original (complex):</span>
        <pre class="code-block"><code>{@html challenge.complexCode}</code></pre>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <button
          onclick={() => pickBasic(i, 'A')}
          disabled={basicResults[i] === 'correct'}
          class="rounded-xl border-2 p-4 text-left transition-colors {basicAnswers[i] === 'A' && basicResults[i] === 'correct' ? 'border-green-400 bg-green-50' : basicAnswers[i] === 'A' && basicResults[i] === 'wrong' ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-green-300 hover:bg-green-50'}"
        >
          <span class="mb-2 block text-sm font-bold text-slate-700">{challenge.optionA.label}</span>
          <pre class="code-block"><code>{@html challenge.optionA.code}</code></pre>
        </button>

        <button
          onclick={() => pickBasic(i, 'B')}
          disabled={basicResults[i] === 'correct'}
          class="rounded-xl border-2 p-4 text-left transition-colors {basicAnswers[i] === 'B' && basicResults[i] === 'correct' ? 'border-green-400 bg-green-50' : basicAnswers[i] === 'B' && basicResults[i] === 'wrong' ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-green-300 hover:bg-green-50'}"
        >
          <span class="mb-2 block text-sm font-bold text-slate-700">{challenge.optionB.label}</span>
          <pre class="code-block"><code>{@html challenge.optionB.code}</code></pre>
        </button>
      </div>

      {#if basicResults[i] !== null}
        <div class="rounded-lg p-3 text-sm {basicResults[i] === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
          {#if basicResults[i] === 'correct'}
            <strong>Correct!</strong> {challenge.explanation}
          {:else}
            <strong>Not quite.</strong> {challenge.explanation}
          {/if}
        </div>
      {/if}
    </div>
  {/each}

  {#if basicAllDone}
    <div class="text-center">
      <p class="mb-3 font-semibold text-green-700">All correct! You have a good eye for simplicity.</p>
    </div>
  {/if}

  {:else}

  <div>
    <h2 class="mb-2 text-2xl font-bold text-slate-800">Try It: Complexity Meter</h2>
    <p class="text-slate-600">Rate each snippet's cyclomatic complexity from 1 to 5, then see the actual score and a refactored version.</p>
  </div>

  {#each advancedChallenges as challenge, i}
    <div class="space-y-4 rounded-xl border p-5 transition-colors {advRevealed[i] ? 'border-green-300 bg-green-50' : 'border-slate-200'}">
      <h3 class="font-semibold text-slate-800">{challenge.title}</h3>
      <pre class="code-block"><code>{@html challenge.code}</code></pre>

      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-slate-600">Your rating:</span>
        {#each [1, 2, 3, 4, 5] as n}
          <button
            onclick={() => rateAdvanced(i, n)}
            disabled={advRevealed[i]}
            class="flex h-10 w-10 items-center justify-center rounded-lg border-2 text-sm font-bold transition-colors {advRatings[i] === n ? 'border-green-500 bg-green-100 text-green-700' : 'border-slate-200 text-slate-500 hover:border-green-300'}"
          >
            {n}
          </button>
        {/each}

        {#if advRatings[i] !== null && !advRevealed[i]}
          <button
            onclick={() => revealAdvanced(i)}
            class="ml-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            Reveal
          </button>
        {/if}
      </div>

      {#if advRevealed[i]}
        <div class="space-y-3 rounded-lg bg-white p-4">
          <div class="flex items-center gap-4">
            <div>
              <span class="text-xs text-slate-400">Your guess</span>
              <span class="ml-1 text-lg font-bold text-slate-700">{advRatings[i]}</span>
            </div>
            <div>
              <span class="text-xs text-slate-400">Actual</span>
              <span class="ml-1 text-lg font-bold text-green-700">{challenge.actualComplexity}</span>
            </div>
            {#if advRatings[i] === challenge.actualComplexity}
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">Exact match!</span>
            {:else if Math.abs((advRatings[i] ?? 0) - challenge.actualComplexity) <= 1}
              <span class="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">Very close!</span>
            {/if}
          </div>
          <p class="text-sm text-slate-600">{challenge.explanation}</p>

          <div>
            <span class="mb-1 block text-xs font-bold text-slate-400">Refactored (complexity: {challenge.refactoredComplexity}):</span>
            <pre class="code-block"><code>{@html challenge.refactoredCode}</code></pre>
          </div>
        </div>
      {/if}
    </div>
  {/each}

  {#if advAllDone}
    <div class="text-center">
      <p class="mb-3 font-semibold text-green-700">All snippets reviewed! You now have a feel for cyclomatic complexity.</p>
    </div>
  {/if}
  {/if}
</div>

<style>
  .code-block { background-color: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem 1.25rem; font-size: 0.875rem; line-height: 1.7; overflow-x: auto; }
  .code-block :global(.kw)  { color: #c084fc; }
  .code-block :global(.var) { color: #93c5fd; }
  .code-block :global(.str) { color: #fcd34d; }
  .code-block :global(.num) { color: #fcd34d; }
  .code-block :global(.cmt) { color: #475569; }
  .code-block :global(.fn)  { color: #93c5fd; }
  .code-block :global(.op)  { color: #94a3b8; }
  .code-block :global(.arg) { color: #fdba74; }
</style>
