import type { Topic } from './types';

export const userInterfaceTopics: Topic[] = [
  {
    slug: 'html-structure',
    title: 'HTML Structure',
    description: 'The skeleton of every web page — tags, elements, and content',
    icon: '🦴',
    color: 'blue',
  },
  {
    slug: 'css-styling',
    title: 'CSS Styling',
    description: 'Colors, layouts, fonts, and making things look good',
    icon: '🎨',
    color: 'purple',
  },
  {
    slug: 'responsive-design',
    title: 'Responsive Design',
    description: 'Making your app work on any screen size',
    icon: '📱',
    color: 'green',
  },
  {
    slug: 'component-frameworks',
    title: 'Component Frameworks',
    description: 'React, Svelte, Vue — building UIs from reusable pieces',
    icon: '🧩',
    color: 'orange',
  },
];

export function getUserInterfaceBySlug(slug: string): Topic | undefined {
  return userInterfaceTopics.find((t) => t.slug === slug);
}

export function getNextUserInterface(currentSlug: string): Topic | undefined {
  const index = userInterfaceTopics.findIndex((t) => t.slug === currentSlug);
  if (index === -1 || index === userInterfaceTopics.length - 1) return undefined;
  return userInterfaceTopics[index + 1];
}

export function getPrevUserInterface(currentSlug: string): Topic | undefined {
  const index = userInterfaceTopics.findIndex((t) => t.slug === currentSlug);
  if (index <= 0) return undefined;
  return userInterfaceTopics[index - 1];
}
