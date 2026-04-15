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


  onMount(() => {
    const toggleHandler = () => {
      mobileMenuOpen = !mobileMenuOpen;
    };
    window.addEventListener("toggle-mobile-menu", toggleHandler);
    return () => {
      window.removeEventListener("toggle-mobile-menu", toggleHandler);
    };
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

  const groupIcons: Record<string, string> = {
    "1. Concepts": `<svg class="inline h-4.5 w-4.5 mr-1.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
    "2. Syntax & Principles": `<svg class="inline h-4.5 w-4.5 mr-1.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
    "3. Languages & Tools": `<svg class="inline h-4.5 w-4.5 mr-1.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>`,
    "4. Build & Ship": `<svg class="inline h-4.5 w-4.5 mr-1.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`,
    "5. User Interface": `<svg class="inline h-4.5 w-4.5 mr-1.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
    "6. AI": `<svg class="inline h-4.5 w-4.5 mr-1.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-1.5 4.5H6.5L5 14.5m14 0H5"/></svg>`,
  };

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
    {
      label: "6. AI",
      sections: [
        {
          key: "ai-using",
          label: "Using AI",
          items: aiUsingTopics.map((t) => ({
            ...t,
            href: `/ai/${t.slug}`,
          })),
        },
        {
          key: "ai-developing",
          label: "Developing AI",
          items: aiDevelopingTopics.map((t) => ({
            ...t,
            href: `/ai/${t.slug}`,
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
  <div class="mx-auto px-6">
    <div class="flex items-center py-2">
      <a href="/" class="flex shrink-0 items-center gap-4 no-underline whitespace-nowrap">
        <img src="/logo.svg" alt="Programming Is Easy" class="h-14 -my-2" />
        <span
          class="text-2xl font-bold text-slate-800"
          style="font-family: 'Permanent Marker', sans-serif; letter-spacing: 0.08em;"
          >Programming Is Easy</span
        >
      </a>
    </div>

    <nav class="flex items-center gap-1 pt-1 pb-2">
      {#each groups as group}
        <div class="relative">
          <button
            onclick={(e) => {
              e.stopPropagation();
              handleToggle(group.label);
            }}
            style="font-family: 'Roboto', sans-serif; letter-spacing: 0.03em;"
            class="shrink-0 whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm font-medium uppercase transition-colors
              {isGroupActive(group)
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
              {openMenu === group.label ? 'bg-slate-100 text-slate-800' : ''}"
          >
            {@html groupIcons[group.label] ?? ''}{group.label}
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
            {@html groupIcons[group.label] ?? ''}{group.label}
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

  </div>
</nav>
