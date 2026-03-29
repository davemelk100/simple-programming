import type { Topic } from './types';

export const putItTogetherTopics: Topic[] = [
  {
    slug: 'choose-your-stack',
    title: 'Choose Your Stack',
    description: 'Pick a framework, database, and hosting platform',
    icon: '🧭',
    color: 'blue',
  },
  {
    slug: 'scaffold-the-project',
    title: 'Scaffold the Project',
    description: 'CLI tools, folder structure, and initial setup',
    icon: '🏗',
    color: 'purple',
  },
  {
    slug: 'connect-a-database',
    title: 'Connect a Database',
    description: 'ORMs, schemas, migrations, and seed data',
    icon: '🔌',
    color: 'green',
  },
  {
    slug: 'add-authentication',
    title: 'Add Authentication',
    description: 'Users, sessions, OAuth, and protected routes',
    icon: '🔐',
    color: 'orange',
  },
  {
    slug: 'build-an-api',
    title: 'Build an API',
    description: 'REST endpoints, middleware, and data flow',
    icon: '🔗',
    color: 'indigo',
  },
  {
    slug: 'deploy-and-ship',
    title: 'Deploy & Ship',
    description: 'CI/CD, hosting, domains, and going live',
    icon: '🚀',
    color: 'pink',
  },
];

export function getPutItTogetherBySlug(slug: string): Topic | undefined {
  return putItTogetherTopics.find((t) => t.slug === slug);
}

export function getNextPutItTogether(currentSlug: string): Topic | undefined {
  const index = putItTogetherTopics.findIndex((t) => t.slug === currentSlug);
  if (index === -1 || index === putItTogetherTopics.length - 1) return undefined;
  return putItTogetherTopics[index + 1];
}

export function getPrevPutItTogether(currentSlug: string): Topic | undefined {
  const index = putItTogetherTopics.findIndex((t) => t.slug === currentSlug);
  if (index <= 0) return undefined;
  return putItTogetherTopics[index - 1];
}
