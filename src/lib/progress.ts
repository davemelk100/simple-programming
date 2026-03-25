import { supabase } from './supabase';
import type { SectionType, UserProgress } from './types';

/**
 * Fetch all progress rows for a user and reshape into a UserProgress map.
 */
export async function loadProgress(userId: string): Promise<UserProgress> {
  const { data, error } = await supabase
    .from('progress')
    .select('topic_slug, section, completed, score, completed_at')
    .eq('user_id', userId);

  if (error) {
    console.error('Failed to load progress:', error.message);
    return {};
  }

  const progress: UserProgress = {};

  for (const row of data ?? []) {
    if (!progress[row.topic_slug]) {
      progress[row.topic_slug] = {} as Record<SectionType, any>;
    }
    progress[row.topic_slug][row.section as SectionType] = {
      completed: row.completed,
      score: row.score ?? undefined,
      completedAt: row.completed_at ?? undefined,
    };
  }

  return progress;
}

/**
 * Upsert a progress row marking a section complete.
 */
export async function markSectionComplete(
  userId: string,
  topicSlug: string,
  section: SectionType,
  score?: number,
) {
  const { error } = await supabase.from('progress').upsert(
    {
      user_id: userId,
      topic_slug: topicSlug,
      section,
      completed: true,
      score: score ?? null,
      completed_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,topic_slug,section' },
  );

  if (error) {
    console.error('Failed to save progress:', error.message);
  }

  return { error };
}

/**
 * Calculate overall completion percentage across all topics.
 * Each topic has 3 sections (explain, demo, exercise).
 */
export function getOverallCompletion(
  progress: UserProgress,
  totalTopics: number,
): number {
  const totalSections = totalTopics * 3;
  if (totalSections === 0) return 0;

  let completed = 0;

  for (const topicSlug of Object.keys(progress)) {
    const sections = progress[topicSlug];
    for (const section of Object.values(sections)) {
      if (section.completed) {
        completed++;
      }
    }
  }

  return Math.round((completed / totalSections) * 100);
}
