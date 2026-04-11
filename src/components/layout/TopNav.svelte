<script lang="ts">
  import { onMount } from "svelte";
  import { topics, oopTopics } from "../../lib/topics";
  import { syntaxStyles } from "../../lib/syntax-styles";
  import { principles } from "../../lib/principles";
  import { toolboxTopics } from "../../lib/toolbox";
  import { testingQaTopics } from "../../lib/testing-qa";
  import { putItTogetherTopics } from "../../lib/put-it-together";
  import { aiUsingTopics, aiDevelopingTopics } from "../../lib/ai";
  import { userInterfaceTopics } from "../../lib/user-interface";

  interface Props {
    currentPath?: string;
  }

  let { currentPath = "" }: Props = $props();

  let user: { email?: string } | null = $state(null);

  onMount(() => {
    const toggleHandler = () => {
      mobileMenuOpen = !mobileMenuOpen;
    };
    window.addEventListener("toggle-mobile-menu", toggleHandler);
    return () => {
      window.removeEventListener("toggle-mobile-menu", toggleHandler);
    };
  });

  onMount(() => {
    let subscription: { unsubscribe: () => void } | undefined;

    import("../../lib/supabase").then(async ({ supabase }) => {
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

  const colorMap: Record<string, { hover: string; active: string }> = {
    blue: {
      hover: "hover:bg-blue-50 hover:text-blue-700",
      active: "bg-blue-50 text-blue-700",
    },
    purple: {
      hover: "hover:bg-purple-50 hover:text-purple-700",
      active: "bg-purple-50 text-purple-700",
    },
    green: {
      hover: "hover:bg-green-50 hover:text-green-700",
      active: "bg-green-50 text-green-700",
    },
    orange: {
      hover: "hover:bg-orange-50 hover:text-orange-700",
      active: "bg-orange-50 text-orange-700",
    },
    yellow: {
      hover: "hover:bg-yellow-50 hover:text-yellow-700",
      active: "bg-yellow-50 text-yellow-700",
    },
    pink: {
      hover: "hover:bg-pink-50 hover:text-pink-700",
      active: "bg-pink-50 text-pink-700",
    },
    indigo: {
      hover: "hover:bg-indigo-50 hover:text-indigo-700",
      active: "bg-indigo-50 text-indigo-700",
    },
  };

  let openMenu = $state<string | null>(null);
  let mobileMenuOpen = $state(false);

  const groups = [
    {
      label: "1. Concepts",
      sections: [
        {
          key: "basics",
          label: "Basics",
          items: topics.map((t) => ({ ...t, href: `/topics/${t.slug}` })),
        },
        {
          key: "blocks",
          label: "Building Blocks",
          items: oopTopics.map((t) => ({ ...t, href: `/topics/${t.slug}` })),
        },
      ],
    },
    {
      label: "2. Syntax & Principles",
      sections: [
        {
          key: "syntax",
          label: "Syntax Styles",
          items: syntaxStyles.map((t) => ({
            ...t,
            href: `/syntax-styles/${t.slug}`,
          })),
        },
        {
          key: "principles",
          label: "Principles",
          items: principles.map((t) => ({
            ...t,
            href: `/principles/${t.slug}`,
          })),
        },
      ],
    },
    {
      label: "3. Languages & Tools",
      sections: [
        {
          key: "languages",
          label: "Languages",
          items: [
            {
              slug: "typescript",
              icon: "🟦",
              title: "TypeScript / JavaScript",
              color: "blue",
              href: "/languages/typescript",
            },
            {
              slug: "python",
              icon: "🐍",
              title: "Python",
              color: "green",
              href: "/languages/python",
            },
            {
              slug: "go",
              icon: "🐹",
              title: "Go",
              color: "blue",
              href: "/languages/go",
            },
            {
              slug: "csharp",
              icon: "🟪",
              title: "C#",
              color: "purple",
              href: "/languages/csharp",
            },
          ],
        },
        {
          key: "toolbox",
          label: "Toolbox",
          items: toolboxTopics.map((t) => ({
            ...t,
            href: `/toolbox/${t.slug}`,
          })),
        },
      ],
    },
    {
      label: "4. Build & Ship",
      sections: [
        {
          key: "putittogether",
          label: "Put It Together",
          items: putItTogetherTopics.map((t) => ({
            ...t,
            href: `/put-it-together/${t.slug}`,
          })),
        },
        {
          key: "testingqa",
          label: "Testing & QA",
          items: testingQaTopics.map((t) => ({
            ...t,
            href: `/testing-qa/${t.slug}`,
          })),
        },
      ],
    },
    {
      label: "5. User Interface",
      sections: [
        {
          key: "ui",
          label: "User Interface",
          items: userInterfaceTopics.map((t) => ({
            ...t,
            href: `/user-interface/${t.slug}`,
          })),
        },
      ],
    },
  ];

  const sections = groups.flatMap((g) => g.sections);

  function isItemActive(href: string): boolean {
    return currentPath.replace(/\/$/, "") === href;
  }

  function isGroupActive(group: (typeof groups)[0]): boolean {
    return group.sections.some((s) =>
      s.items.some((item) => isItemActive(item.href)),
    );
  }

  function handleToggle(key: string) {
    openMenu = openMenu === key ? null : key;
  }

  function handleClose() {
    openMenu = null;
  }
</script>

<svelte:window onclick={handleClose} />

<!-- Desktop: logo + nav in one sticky row -->
<header
  class="sticky top-0 hidden bg-white lg:block py-5"
  style="z-index: 9999;"
>
  <div class="mx-auto flex items-center justify-between px-6">
    <a href="/" class="flex shrink-0 items-center gap-4 no-underline">
      <img src="/logo.svg" alt="Programming Is Easy" class="h-14 -my-2" />
      <span
        class="text-2xl font-bold text-slate-800"
        style="font-family: 'Permanent Marker', sans-serif; letter-spacing: 0.08em;"
        >Programming Is Easy</span
      >
    </a>

    <nav class="flex items-center gap-1">
      {#each groups as group}
        <div class="relative">
          <button
            onclick={(e) => {
              e.stopPropagation();
              handleToggle(group.label);
            }}
            style="font-family: 'Roboto', sans-serif; letter-spacing: 0.03em;"
            class="shrink-0 whitespace-nowrap rounded-md px-1.5 py-1 text-xs font-medium uppercase transition-colors
              {isGroupActive(group)
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
              {openMenu === group.label ? 'bg-slate-100 text-slate-800' : ''}"
          >
            {group.label}
            <svg
              class="ml-0.5 inline h-2.5 w-2.5 transition-transform {openMenu ===
              group.label
                ? 'rotate-180'
                : ''}"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {#if openMenu === group.label}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="absolute left-0 top-full mt-1 min-w-60 rounded-lg border border-slate-200 shadow-lg bg-white py-1"
              style="z-index: 99999;"
              onclick={(e) => e.stopPropagation()}
            >
              {#each group.sections as section}
                <div
                  class="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-widest text-slate-400"
                >
                  {section.label}
                </div>
                {#each section.items as item}
                  {@const active = isItemActive(item.href)}
                  {@const colors = colorMap[item.color]}
                  <a
                    href={item.href}
                    onclick={handleClose}
                    class="flex items-center gap-2 px-3 py-2 text-sm font-light no-underline transition-colors {active
                      ? `${colors?.active} font-medium`
                      : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
                    aria-current={active ? "page" : undefined}
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
    </nav>

    {#if !user}
      <a
        href="/auth/login"
        class="shrink-0 rounded-lg bg-indigo-600 p-2 text-white no-underline hover:bg-indigo-700"
        aria-label="Sign In"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
      </a>
    {/if}
  </div>
</header>

<!-- Mobile nav (unchanged) -->
<nav
  class="sticky top-0 bg-white {mobileMenuOpen ? '' : 'hidden'} lg:hidden"
  style="z-index: 9999;"
>
  <div class="px-4">
    <div class="flex flex-col gap-1">
      {#each groups as group}
        <div class="relative">
          <button
            onclick={(e) => {
              e.stopPropagation();
              handleToggle(group.label);
            }}
            style="font-family: 'Roboto', sans-serif; letter-spacing: 0.05em;"
            class="w-full shrink-0 whitespace-nowrap rounded-md px-2.5 py-2 text-left text-sm font-medium uppercase tracking-wide transition-colors
              {isGroupActive(group)
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
              {openMenu === group.label ? 'bg-slate-100 text-slate-800' : ''}"
          >
            {group.label}
            <svg
              class="ml-1 inline h-3 w-3 transition-transform {openMenu ===
              group.label
                ? 'rotate-180'
                : ''}"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {#if openMenu === group.label}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="bg-white py-1"
              style="z-index: 99999;"
              onclick={(e) => e.stopPropagation()}
            >
              {#each group.sections as section}
                <div
                  class="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-widest text-slate-400"
                >
                  {section.label}
                </div>
                {#each section.items as item}
                  {@const active = isItemActive(item.href)}
                  {@const colors = colorMap[item.color]}
                  <a
                    href={item.href}
                    onclick={handleClose}
                    class="flex items-center gap-2 px-3 py-2 text-sm font-light no-underline transition-colors {active
                      ? `${colors?.active} font-medium`
                      : `text-slate-600 ${colors?.hover ?? 'hover:bg-slate-50'}`}"
                    aria-current={active ? "page" : undefined}
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

    {#if !user}
      <div class="flex items-center gap-3 pt-3 mt-2 border-t border-slate-200">
        <a
          href="/auth/login"
          class="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-medium text-white no-underline hover:bg-indigo-700"
        >
          Sign In
        </a>
      </div>
    {/if}
  </div>
</nav>
