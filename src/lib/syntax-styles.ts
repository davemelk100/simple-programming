import type { Topic } from './types';

export const syntaxStyles: Topic[] = [
  {
    slug: 'markup',
    title: 'Markup Languages',
    description: 'HTML, XML — content + structure, human-readable wrapping',
    icon: '🏷️',
    color: 'orange',
  },
  {
    slug: 'data-formats',
    title: 'Data Formats',
    description: 'JSON, XML — data serialization and interchange',
    icon: '📋',
    color: 'green',
  },
  {
    slug: 'c-style',
    title: 'C-Style Syntax',
    description: 'TypeScript, JavaScript, CSS — the brace family',
    icon: '{ }',
    color: 'blue',
  },
  {
    slug: 'whitespace',
    title: 'Whitespace-Sensitive',
    description: 'Python, YAML, Haml — indentation as structure',
    icon: '⬜',
    color: 'purple',
  },
  {
    slug: 'declarative-imperative',
    title: 'Declarative vs. Imperative',
    description: 'Two ways to tell a computer what to do',
    icon: '⚖️',
    color: 'indigo',
  },
];

export function getSyntaxStyleBySlug(slug: string): Topic | undefined {
  return syntaxStyles.find((s) => s.slug === slug);
}

export function getNextSyntaxStyle(currentSlug: string): Topic | undefined {
  const index = syntaxStyles.findIndex((s) => s.slug === currentSlug);
  if (index === -1 || index === syntaxStyles.length - 1) return undefined;
  return syntaxStyles[index + 1];
}

export function getPrevSyntaxStyle(currentSlug: string): Topic | undefined {
  const index = syntaxStyles.findIndex((s) => s.slug === currentSlug);
  if (index <= 0) return undefined;
  return syntaxStyles[index - 1];
}
