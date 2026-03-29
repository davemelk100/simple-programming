import type { Topic } from './types';

export const toolboxTopics: Topic[] = [
  {
    slug: 'version-control',
    title: 'Version Control',
    description: 'Git, branches, commits — track every change and collaborate',
    icon: '🔀',
    color: 'orange',
  },
  {
    slug: 'command-line',
    title: 'Command Line',
    description: 'Navigate, run scripts, and control your machine with text',
    icon: '▶',
    color: 'green',
  },
  {
    slug: 'local-servers',
    title: 'Local Servers',
    description: 'IDEs, containers, configs — running code on your machine',
    icon: '🖥',
    color: 'blue',
  },
  {
    slug: 'admin-access',
    title: 'Admin & Permissions',
    description: 'Users, roles, SSH keys, and system access',
    icon: '🔑',
    color: 'purple',
  },
];

export function getToolboxBySlug(slug: string): Topic | undefined {
  return toolboxTopics.find((t) => t.slug === slug);
}

export function getNextToolbox(currentSlug: string): Topic | undefined {
  const index = toolboxTopics.findIndex((t) => t.slug === currentSlug);
  if (index === -1 || index === toolboxTopics.length - 1) return undefined;
  return toolboxTopics[index + 1];
}

export function getPrevToolbox(currentSlug: string): Topic | undefined {
  const index = toolboxTopics.findIndex((t) => t.slug === currentSlug);
  if (index <= 0) return undefined;
  return toolboxTopics[index - 1];
}
