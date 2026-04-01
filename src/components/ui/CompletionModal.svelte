<script lang="ts">
  import type { SectionType } from "../../lib/types";

  interface Props {
    topicTitle: string;
    topicIcon: string;
    sectionType: SectionType;
    topicSlug: string;
    score?: number;
    onclose?: () => void;
  }

  let { topicTitle, topicIcon, sectionType, topicSlug, score, onclose }: Props =
    $props();

  let copied = $state(false);
  let shared = $state(false);

  const sectionMessages: Record<SectionType, { heading: string; sub: string }> =
    {
      explain: { heading: "Lesson Complete!", sub: "You learned the concept." },
      demo: { heading: "Demo Mastered!", sub: "You explored it hands-on." },
      exercise: {
        heading: "Exercise Passed!",
        sub: "You put it into practice.",
      },
      code: { heading: "Code Challenge Done!", sub: "You wrote real code." },
    };

  const sectionLabels: Record<SectionType, string> = {
    explain: "Learn",
    demo: "Try It",
    exercise: "Practice",
    code: "Code",
  };

  let message = $derived(sectionMessages[sectionType]);
  let shareText = $derived(
    `I just completed the "${sectionLabels[sectionType]}" section for ${topicTitle} on Programming Is Easy!`,
  );
  let shareUrl = $derived(
    typeof window !== "undefined"
      ? `${window.location.origin}/topics/${topicSlug}`
      : "",
  );

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(
        `${shareUrl}?completed=${sectionType}`,
      );
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {
      // Fallback: do nothing
    }
  }

  async function shareResult() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: message.heading,
          text: shareText,
          url: shareUrl,
        });
        shared = true;
      } catch {
        // User cancelled
      }
    } else {
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(tweetUrl, "_blank", "noopener,noreferrer");
      shared = true;
    }
  }

  function downloadCertificate() {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, 800, 500);

    // Border
    ctx.strokeStyle = "#0f89ec";
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, 760, 460);

    // Inner border
    ctx.strokeStyle = "#a8d2f7";
    ctx.lineWidth = 2;
    ctx.strokeRect(32, 32, 736, 436);

    // Title
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 32px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Certificate of Completion", 400, 90);

    // Divider
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(150, 110);
    ctx.lineTo(650, 110);
    ctx.stroke();

    // Icon + topic
    ctx.font = "48px sans-serif";
    ctx.fillText(topicIcon, 400, 180);

    ctx.fillStyle = "#334155";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText(topicTitle, 400, 230);

    // Section
    ctx.fillStyle = "#0f89ec";
    ctx.font = "22px sans-serif";
    ctx.fillText(`${sectionLabels[sectionType]} Section`, 400, 275);

    // Score if applicable
    if (score !== undefined) {
      ctx.fillStyle = "#16a34a";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText(`Score: ${score}%`, 400, 310);
    }

    // Message
    ctx.fillStyle = "#64748b";
    ctx.font = "18px sans-serif";
    const dateStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    ctx.fillText(
      `Completed on ${dateStr}`,
      400,
      score !== undefined ? 350 : 330,
    );

    // Site name
    ctx.fillStyle = "#94a3b8";
    ctx.font = "16px sans-serif";
    ctx.fillText("Programming Is Easy", 400, 440);

    // Download
    const link = document.createElement("a");
    link.download = `${topicSlug}-${sectionType}-certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }
</script>

<div class="rounded-2xl bg-white p-6 shadow-xl">
  <!-- Celebration animation -->
  <div class="mb-5 flex flex-col items-center gap-3">
    <div
      class="success-ring relative flex h-24 w-24 items-center justify-center"
    >
      <div
        class="ring-expand absolute inset-0 rounded-full border-4 border-green-400"
      ></div>
      <div
        class="ring-expand-delay absolute inset-0 rounded-full border-4 border-green-300"
      ></div>
      <div
        class="check-pop flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/40"
      >
        <svg
          class="check-draw h-8 w-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>

    <h2 class="text-pop text-2xl font-bold text-slate-800">
      {message.heading}
    </h2>
    <p class="text-pop-delay text-slate-500">
      {topicIcon}
      {topicTitle} &mdash; {message.sub}
    </p>
    {#if score !== undefined}
      <p class="text-pop-delay text-lg font-semibold text-green-600">
        Score: {score}%
      </p>
    {/if}
  </div>

  <!-- Share / Save actions -->
  <div class="mb-5 flex flex-col gap-2">
    <button
      onclick={copyLink}
      class="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
    >
      <svg
        class="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
        />
      </svg>
      {copied ? "Link Copied!" : "Copy Shareable Link"}
    </button>

    <button
      onclick={downloadCertificate}
      class="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
    >
      <svg
        class="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Download Certificate
    </button>

    <button
      onclick={shareResult}
      class="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
    >
      <svg
        class="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
      {shared ? "Shared!" : "Share"}
    </button>
  </div>

  <!-- Continue button -->
  <button
    onclick={onclose}
    class="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-indigo-700"
  >
    Continue
  </button>
</div>

<style>
  @keyframes ringExpand {
    0% {
      transform: scale(0.8);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
  @keyframes checkPop {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes textPop {
    0% {
      transform: scale(0) translateX(-10px);
      opacity: 0;
    }
    100% {
      transform: scale(1) translateX(0);
      opacity: 1;
    }
  }
  @keyframes drawCheck {
    0% {
      stroke-dashoffset: 30;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  .ring-expand {
    animation: ringExpand 1.2s ease-out forwards;
  }
  .ring-expand-delay {
    animation: ringExpand 1.2s ease-out 0.2s forwards;
    opacity: 0;
  }
  .check-pop {
    animation: checkPop 0.5s ease-out 0.3s both;
  }
  .check-draw path {
    stroke-dasharray: 30;
    stroke-dashoffset: 30;
    animation: drawCheck 0.4s ease-out 0.6s forwards;
  }
  .text-pop {
    animation: textPop 0.4s ease-out 0.7s both;
  }
  .text-pop-delay {
    animation: textPop 0.4s ease-out 0.9s both;
  }
</style>
