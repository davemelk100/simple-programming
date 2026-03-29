import type { Topic } from './types';

export const aiTopics: Topic[] = [
  {
    slug: 'what-is-an-llm',
    title: 'What Is an LLM?',
    description: 'Large language models — how they work, what they can do, and why they matter',
    icon: '\u{1F9E0}',
    color: 'purple',
  },
  {
    slug: 'generative-ai',
    title: 'Generative AI',
    description: 'AI that creates text, images, code, and audio from scratch',
    icon: '\u{1F3A8}',
    color: 'blue',
  },
  {
    slug: 'agentic-ai',
    title: 'Agentic AI',
    description: 'Autonomous agents that plan, use tools, and reason through multi-step tasks',
    icon: '\u{1F916}',
    color: 'green',
  },
  {
    slug: 'copilots',
    title: 'Copilots',
    description: 'AI coding assistants that help you write, review, and debug code',
    icon: '\u{1F468}\u{200D}\u{2708}\u{FE0F}',
    color: 'orange',
  },
  {
    slug: 'chatbots',
    title: 'Chatbots',
    description: 'Conversational AI interfaces for questions, tasks, and support',
    icon: '\u{1F4AC}',
    color: 'pink',
  },
  {
    slug: 'ai-fine-tuning',
    title: 'AI Fine-Tuning',
    description: 'Customizing AI models for specific tasks, domains, and behaviors',
    icon: '\u{1F3AF}',
    color: 'indigo',
  },
];

export function getAiBySlug(slug: string): Topic | undefined {
  return aiTopics.find((t) => t.slug === slug);
}

export function getNextAi(currentSlug: string): Topic | undefined {
  const index = aiTopics.findIndex((t) => t.slug === currentSlug);
  if (index === -1 || index === aiTopics.length - 1) return undefined;
  return aiTopics[index + 1];
}

export function getPrevAi(currentSlug: string): Topic | undefined {
  const index = aiTopics.findIndex((t) => t.slug === currentSlug);
  if (index <= 0) return undefined;
  return aiTopics[index - 1];
}
