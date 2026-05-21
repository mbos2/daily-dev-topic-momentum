import 'server-only';
import type {BattleStats, BattleTopic} from '@/app/lib/types';

export function buildStats(topics: readonly BattleTopic[]): BattleStats {
  return {
    engagement: topics.map((topic) => ({
      topic: topic.stats.topic,
      score: topic.stats.engagement.score,
    })),

    articles: topics.map((topic) => ({
      topic: topic.stats.topic,
      totalArticles: topic.stats.totalArticles,
    })),

    overlap: topics.map((topic) => ({
      topic: topic.stats.topic,
      overlapPosts: topic.stats.overlapPosts,
    })),
  };
}
