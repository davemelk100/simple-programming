import type { Topic } from './types';

export const principles: Topic[] = [
  {
    slug: 'naming',
    title: 'Naming Things',
    description: 'Descriptive names make code readable and maintainable',
    icon: '🏷️',
    color: 'blue',
  },
  {
    slug: 'keep-it-simple',
    title: 'Keep It Simple',
    description: 'Simple code is easier to read, test, and maintain',
    icon: '✨',
    color: 'green',
  },
  {
    slug: 'dry',
    title: "Don't Repeat Yourself",
    description: 'Reuse code instead of copying it',
    icon: '♻️',
    color: 'orange',
  },
  {
    slug: 'testing',
    title: 'Testing Your Code',
    description: 'Catch bugs before your users do',
    icon: '🧪',
    color: 'purple',
  },
  {
    slug: 'code-organization',
    title: 'Code Organization',
    description: 'Structure and modularity for maintainable projects',
    icon: '📁',
    color: 'indigo',
  },
  {
    slug: 'planning',
    title: 'Planning & Design',
    description: 'Think before you code — requirements, architecture, and design',
    icon: '📐',
    color: 'pink',
  },
];

export function getPrincipleBySlug(slug: string): Topic | undefined {
  return principles.find((p) => p.slug === slug);
}

export function getNextPrinciple(currentSlug: string): Topic | undefined {
  const index = principles.findIndex((p) => p.slug === currentSlug);
  if (index === -1 || index === principles.length - 1) return undefined;
  return principles[index + 1];
}

export function getPrevPrinciple(currentSlug: string): Topic | undefined {
  const index = principles.findIndex((p) => p.slug === currentSlug);
  if (index <= 0) return undefined;
  return principles[index - 1];
}
