<script lang="ts">
  import { onMount } from 'svelte';
  import { topics, oopTopics } from '../../lib/topics';
  import { syntaxStyles } from '../../lib/syntax-styles';
  import { principles } from '../../lib/principles';
  import { toolboxTopics } from '../../lib/toolbox';
  import { testingQaTopics } from '../../lib/testing-qa';
  import { putItTogetherTopics } from '../../lib/put-it-together';
  import { aiUsingTopics, aiDevelopingTopics } from '../../lib/ai';
  import { userInterfaceTopics } from '../../lib/user-interface';
  import { getAdvanced, toggleAdvanced, onAdvancedChange } from '../../lib/mode';

  interface Props {
    currentPath?: string;
  }

  let { currentPath = '' }: Props = $props();

  let user: { email?: string } | null = $state(null);
  let signingOut = $state(false);
  let advanced = $state(false);

  onMount(() => {
    advanced = getAdvanced();
    return onAdvancedChange((v) => (advanced = v));
  });

  onMount(() => {
    let subscription: { unsubscribe: () => void } | undefined;

    import('../../lib/supabase').then(async ({ supabase }) => {
      const { data } = await supabase.auth.getUser();
      user = data.user;

      const { data: authData } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          user = session?.user ?? null;
        },
      );
      subscription = authData.subscription;
    });

    return () => subscription?.unsubscribe();
  });

  async function handleSignOut() {
    signingOut = true;
    const { signOut } = await import('../../lib/auth');
    await signOut();
    signingOut = false;
  }

  const colorMap: Record<string, { hover: string; active: string }> = {
    blue: { hover: 'hover:bg-blue-50 hover:text-blue-700', active: 'bg-blue-50 text-blue-700' },
    purple: { hover: 'hover:bg-purple-50 hover:text-purple-700', active: 'bg-purple-50 text-purple-700' },
    green: { hover: 'hover:bg-green-50 hover:text-green-700', active: 'bg-green-50 text-green-700' },
    orange: { hover: 'hover:bg-orange-50 hover:text-orange-700', active: 'bg-orange-50 text-orange-700' },
    yellow: { hover: 'hover:bg-yellow-50 hover:text-yellow-700', active: 'bg-yellow-50 text-yellow-700' },
    pink: { hover: 'hover:bg-pink-50 hover:text-pink-700', active: 'bg-pink-50 text-pink-700' },
    indigo: { hover: 'hover:bg-indigo-50 hover:text-indigo-700', active: 'bg-indigo-50 text-indigo-700' },
  };

  let openMenu = $state<string | null>(null);
  let mobileMenuOpen = $state(false);

  const groups = [
    {
      label: '1. Concepts',
      sections: [
        { key: 'basics', label: 'Basics', items: topics.map(t => ({ ...t, href: `/topics/${t.slug}` })) },
        { key: 'blocks', label: 'Building Blocks', items: oopTopics.map(t => ({ ...t, href: `/topics/${t.slug}` })) },
      ],
    },
    {
      label: '2. Syntax & Principles',
      sections: [
        { key: 'syntax', label: 'Syntax Styles', items: syntaxStyles.map(t => ({ ...t, href: `/syntax-styles/${t.slug}` })) },
        { key: 'principles', label: 'Principles', items: principles.map(t => ({ ...t, href: `/principles/${t.slug}` })) },
      ],
    },
    {
      label: '3. Languages & Tools',
      sections: [
        { key: 'languages', label: 'Languages', items: [
          { slug: 'typescript', icon: '🟦', title: 'TypeScript / JavaScript', color: 'blue', href: '/languages/typescript' },
          { slug: 'python', icon: '🐍', title: 'Python', color: 'green', href: '/languages/python' },
          { slug: 'go', icon: '🐹', title: 'Go', color: 'blue', href: '/languages/go' },
          { slug: 'csharp', icon: '🟪', title: 'C#', color: 'purple', href: '/languages/csharp' },
        ] },
        { key: 'toolbox', label: 'Toolbox', items: toolboxTopics.map(t => ({ ...t, href: `/toolbox/${t.slug}` })) },
      ],
    },
    {
      label: '4. Build & Deploy',
      sections: [
        { key: 'putittogether', label: 'Put It Together', items: putItTogetherTopics.map(t => ({ ...t, href: `/put-it-together/${t.slug}` })) },
        { key: 'testingqa', label: 'Testing & QA', items: testingQaTopics.map(t => ({ ...t, href: `/testing-qa/${t.slug}` })) },
      ],
    },
    {
      label: '5. User Interface',
      sections: [
        { key: 'ui', label: 'User Interface', items: userInterfaceTopics.map(t => ({ ...t, href: `/user-interface/${t.slug}` })) },
      ],
    },
  ];

  const sections = groups.flatMap(g => g.sections);

  function isItemActive(href: string): boolean {
    return currentPath.replace(/\/$/, '') === href;
  }

  function isGroupActive(group: typeof groups[0]): boolean {
    return group.sections.some(s => s.items.some(item => isItemActive(item.href)));
  }

  function handleToggle(key: string) {
    openMenu = openMenu === key ? null : key;
  }

  function handleClose() {
    openMenu = null;
  }
</script>

<svelte:window onclick={handleClose} on:toggle-mobile-menu={() => { mobileMenuOpen = !mobileMenuOpen; }} />

<header class="hidden border-b border-slate-200 bg-white shadow-sm md:block">
  <div class="mx-auto flex items-center justify-between px-4 py-2">
    <a
      href="/"
      class="text-xl font-bold text-slate-900 no-underline hover:text-indigo-600 sm:text-2xl"
      style="font-family: 'Permanent Marker';"
    >
      Programming Is Easy
    </a>

    <div class="flex items-center gap-4">
      {#if user}
        <a
          href="/progress"
          class="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 no-underline hover:bg-slate-100"
        >
          My Progress
        </a>
        <span class="text-sm text-slate-500">{user.email}</span>
      {/if}
      <button
        onclick={() => toggleAdvanced()}
        class="flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors
          {advanced ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'}"
      >
        <span class="text-xs">{advanced ? 'Advanced' : 'Basic'}</span>
        <div class="relative h-5 w-9 rounded-full transition-colors {advanced ? 'bg-indigo-500' : 'bg-slate-300'}">
          <div class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform {advanced ? 'translate-x-4' : 'translate-x-0.5'}"></div>
        </div>
      </button>
      {#if user}
        <button
          onclick={handleSignOut}
          disabled={signingOut}
          class="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200 disabled:opacity-50"
        >
          {signingOut ? 'Signing out...' : 'Sign Out'}
        </button>
      {:else}
        <a
          href="/auth/login"
          class="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white no-underline hover:bg-indigo-700"
        >
          Sign In
        </a>
      {/if}
    </div>
  </div>
</header>

<nav class="border-b border-slate-200 bg-white {mobileMenuOpen ? '' : 'hidden md:block'}">
  <div class="mx-auto px-4 py-1.5 overflow-x-auto md:flex md:items-center">
    <div class="flex flex-col gap-1 md:flex-row md:items-center md:flex-nowrap">
      {#each groups as group}
        <div class="relative">
          <button
            onclick={(e) => { e.stopPropagation(); handleToggle(group.label); }}
            class="shrink-0 whitespace-nowrap rounded-md px-2.5 py-2 md:py-1.5 text-left text-xs font-semibold uppercase tracking-wide transition-colors
              {isGroupActive(group) ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
              {openMenu === group.label ? 'bg-slate-100 text-slate-800' : ''}"
          >
            {group.label}
            <svg class="ml-1 inline h-3 w-3 transition-transform {openMenu === group.label ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {#if openMenu === group.label}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="absolute left-0 top-full z-50 mt-1 min-w-60 rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
              onclick={(e) => e.stopPropagation()}
            >
              {#each group.sections as section}
                <div class="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">{section.label}</div>
                {#each section.items as item}
                  {@const active = isItemActive(item.href)}
                  {@const colors = colorMap[item.color]}
                  <a
                    href={item.href}
                    onclick={handleClose}
                    class="flex items-center gap-2 px-3 py-2 text-sm font-light no-underline transition-colors {active ? `${colors?.active} font-medium` : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
                    aria-current={active ? 'page' : undefined}
                  >
                    <span class="text-base">{item.icon}</span>
                    {item.title}
                  </a>
                {/each}
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</nav>
