import type { Topic } from './types';

export const topics: Topic[] = [
  {
    slug: 'variables',
    title: 'Labeled Storage',
    description: 'Variables are like labeled boxes that hold values',
    icon: '\u{1F4E6}',
    color: 'blue',
  },
  {
    slug: 'functions',
    title: 'Input \u2192 Output Machines',
    description: 'Functions take something in and give something back',
    icon: '\u2699\uFE0F',
    color: 'purple',
  },
  {
    slug: 'data-structures',
    title: 'Organizing Information',
    description: 'Arrays and objects help you group related data',
    icon: '\u{1F5C2}\uFE0F',
    color: 'green',
  },
  {
    slug: 'control-flow',
    title: 'Making Decisions',
    description: 'If/else and loops let your code choose and repeat',
    icon: '\u{1F500}',
    color: 'orange',
  },
  {
    slug: 'logic',
    title: 'True or False',
    description: 'Boolean logic is how computers make decisions',
    icon: '\u{1F4A1}',
    color: 'yellow',
  },
  {
    slug: 'state',
    title: 'Things That Change',
    description: 'State tracks how values evolve over time',
    icon: '\u{1F504}',
    color: 'pink',
  },
  {
    slug: 'composition',
    title: 'Building Bigger Things',
    description: 'Combine small pieces into powerful systems',
    icon: '\u{1F9E9}',
    color: 'indigo',
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getNextTopic(currentSlug: string): Topic | undefined {
  const index = topics.findIndex((t) => t.slug === currentSlug);
  if (index === -1 || index === topics.length - 1) return undefined;
  return topics[index + 1];
}

export function getPrevTopic(currentSlug: string): Topic | undefined {
  const index = topics.findIndex((t) => t.slug === currentSlug);
  if (index <= 0) return undefined;
  return topics[index - 1];
}
