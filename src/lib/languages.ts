import type { Topic } from './types';

export const languages: Topic[] = [
  {
    slug: 'typescript',
    title: 'TypeScript / JavaScript',
    description: 'The language of the web — runs everywhere',
    icon: '🟦',
    color: 'blue',
  },
  {
    slug: 'python',
    title: 'Python',
    description: 'Simple, readable, and incredibly versatile',
    icon: '🐍',
    color: 'green',
  },
  {
    slug: 'go',
    title: 'Go',
    description: 'Fast, simple, and built for concurrency',
    icon: '🐹',
    color: 'blue',
  },
  {
    slug: 'csharp',
    title: 'C#',
    description: 'Powerful and elegant — from games to enterprise',
    icon: '🟪',
    color: 'purple',
  },
];

export function getLanguageBySlug(slug: string): Topic | undefined {
  return languages.find((l) => l.slug === slug);
}

export function getNextLanguage(currentSlug: string): Topic | undefined {
  const index = languages.findIndex((l) => l.slug === currentSlug);
  if (index === -1 || index === languages.length - 1) return undefined;
  return languages[index + 1];
}

export function getPrevLanguage(currentSlug: string): Topic | undefined {
  const index = languages.findIndex((l) => l.slug === currentSlug);
  if (index <= 0) return undefined;
  return languages[index - 1];
}
