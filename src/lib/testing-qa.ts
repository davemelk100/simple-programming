import type { Topic } from './types';

export const testingQaTopics: Topic[] = [
  {
    slug: 'unit-testing',
    title: 'Unit Testing',
    description: 'Test individual functions and components in isolation',
    icon: '🧩',
    color: 'green',
  },
  {
    slug: 'integration-testing',
    title: 'Integration Testing',
    description: 'Test how multiple parts work together',
    icon: '🔗',
    color: 'blue',
  },
  {
    slug: 'end-to-end-testing',
    title: 'End-to-End Testing',
    description: 'Simulate real user flows through the entire app',
    icon: '🎭',
    color: 'purple',
  },
  {
    slug: 'debugging',
    title: 'Debugging',
    description: 'Find and fix bugs systematically',
    icon: '🐛',
    color: 'orange',
  },
  {
    slug: 'code-review',
    title: 'Code Review',
    description: 'Review code for quality, bugs, and best practices',
    icon: '👀',
    color: 'indigo',
  },
];

export function getTestingQaBySlug(slug: string): Topic | undefined {
  return testingQaTopics.find((t) => t.slug === slug);
}

export function getNextTestingQa(currentSlug: string): Topic | undefined {
  const index = testingQaTopics.findIndex((t) => t.slug === currentSlug);
  if (index === -1 || index === testingQaTopics.length - 1) return undefined;
  return testingQaTopics[index + 1];
}

export function getPrevTestingQa(currentSlug: string): Topic | undefined {
  const index = testingQaTopics.findIndex((t) => t.slug === currentSlug);
  if (index <= 0) return undefined;
  return testingQaTopics[index - 1];
}
