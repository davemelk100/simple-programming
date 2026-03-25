export interface Topic {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export type SectionType = 'explain' | 'demo' | 'exercise';

export interface SectionProgress {
  completed: boolean;
  score?: number;
  completedAt?: string;
}

/** Maps topic slug -> section type -> progress */
export type UserProgress = Record<string, Record<SectionType, SectionProgress>>;
