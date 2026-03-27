<script lang="ts">
  import { onMount } from 'svelte';
  import { getUser } from '../../lib/auth';
  import { loadProgress } from '../../lib/progress';
  import { allTopics } from '../../lib/topics';
  import type { SectionType, UserProgress } from '../../lib/types';

  let user: { id: string; email?: string } | null = $state(null);
  let progress: UserProgress = $state({});
  let loading = $state(true);

  const sectionLabels: Record<SectionType, string> = {
    explain: 'Learn',
    demo: 'Try It',
    exercise: 'Practice',
    code: 'Code',
  };

  const sections: SectionType[] = ['explain', 'demo', 'exercise', 'code'];

  onMount(async () => {
    try {
      const u = await getUser();
      if (u) {
        user = u;
        progress = await loadProgress(u.id);
      }
    } catch {
      // Not logged in
    }
    loading = false;
  });

  function isCompleted(topicSlug: string, section: SectionType): boolean {
    return progress[topicSlug]?.[section]?.completed ?? false;
  }

  function completedDate(topicSlug: string, section: SectionType): string | null {
    const at = progress[topicSlug]?.[section]?.completedAt;
    if (!at) return null;
    return new Date(at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function completedCount(topicSlug: string): number {
    return sections.filter(s => isCompleted(topicSlug, s)).length;
  }

  function downloadCertificate(topicTitle: string, topicIcon: string, topicSlug: string, section: SectionType, score?: number) {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 800, 500);

    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, 760, 460);

    ctx.strokeStyle = '#c7d2fe';
    ctx.lineWidth = 2;
    ctx.strokeRect(32, 32, 736, 436);

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Completion', 400, 90);

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(150, 110);
    ctx.lineTo(650, 110);
    ctx.stroke();

    ctx.font = '48px sans-serif';
    ctx.fillText(topicIcon, 400, 180);

    ctx.fillStyle = '#334155';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(topicTitle, 400, 230);

    ctx.fillStyle = '#6366f1';
    ctx.font = '22px sans-serif';
    ctx.fillText(`${sectionLabels[section]} Section`, 400, 275);

    if (score !== undefined) {
      ctx.fillStyle = '#16a34a';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(`Score: ${score}%`, 400, 310);
    }

    ctx.fillStyle = '#64748b';
    ctx.font = '18px sans-serif';
    const dateStr = completedDate(topicSlug, section) ?? new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    ctx.fillText(`Completed on ${dateStr}`, 400, score !== undefined ? 350 : 330);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px sans-serif';
    ctx.fillText('Programming Is Easy', 400, 440);

    const link = document.createElement('a');
    link.download = `${topicSlug}-${section}-certificate.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  function copyLink(topicSlug: string, section: SectionType) {
    const url = `${window.location.origin}/topics/${topicSlug}?completed=${section}`;
    navigator.clipboard.writeText(url);
  }
</script>

{#if loading}
  <div class="flex items-center justify-center py-16">
    <p class="text-slate-500">Loading...</p>
  </div>
{:else if !user}
  <div class="mx-auto mt-12 max-w-md text-center">
    <div class="mb-4 text-5xl">&#x1F512;</div>
    <h1 class="mb-2 text-2xl font-bold text-slate-800">Sign in to see your progress</h1>
    <p class="mb-6 text-slate-500">Use a magic link to access your completions and certificates.</p>
    <a
      href="/auth/login"
      class="inline-block rounded-lg bg-indigo-600 px-6 py-2.5 font-semibold text-white no-underline hover:bg-indigo-700"
    >
      Sign In
    </a>
  </div>
{:else}
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-800">My Progress</h1>
      <p class="text-slate-500">{user.email}</p>
    </div>

    {#each allTopics as topic}
      {@const count = completedCount(topic.slug)}
      {#if count > 0}
        <div class="rounded-xl border border-slate-200 bg-white p-5">
          <div class="mb-3 flex items-center gap-3">
            <span class="text-2xl">{topic.icon}</span>
            <h2 class="text-lg font-bold text-slate-800">{topic.title}</h2>
            <span class="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
              {count}/{sections.length}
            </span>
          </div>

          <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {#each sections as section}
              {#if isCompleted(topic.slug, section)}
                <div class="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-3 py-2">
                  <div>
                    <span class="text-sm font-medium text-green-800">{sectionLabels[section]}</span>
                    {#if completedDate(topic.slug, section)}
                      <p class="text-xs text-green-600">{completedDate(topic.slug, section)}</p>
                    {/if}
                  </div>
                  <div class="flex gap-1">
                    <button
                      onclick={() => copyLink(topic.slug, section)}
                      class="rounded p-1 text-green-600 hover:bg-green-100"
                      title="Copy link"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </button>
                    <button
                      onclick={() => downloadCertificate(topic.title, topic.icon, topic.slug, section, progress[topic.slug]?.[section]?.score)}
                      class="rounded p-1 text-green-600 hover:bg-green-100"
                      title="Download certificate"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              {:else}
                <div class="flex items-center rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                  <span class="text-sm text-slate-400">{sectionLabels[section]}</span>
                </div>
              {/if}
            {/each}
          </div>
        </div>
      {/if}
    {/each}

    {#if Object.keys(progress).length === 0}
      <div class="rounded-xl border border-slate-200 bg-white py-12 text-center">
        <div class="mb-3 text-4xl">&#x1F331;</div>
        <p class="text-slate-500">No completions yet. Start learning!</p>
        <a href="/" class="mt-3 inline-block text-indigo-600 no-underline hover:underline">Browse topics</a>
      </div>
    {/if}
  </div>
{/if}
