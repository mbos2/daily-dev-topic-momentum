import 'server-only';

import {mapArticle} from './map-article';
import type {BattleTopic, BattleTopicPost, DailyFeedPost} from '@/app/lib/types';

const SHARED_SCORE_MULTIPLIER = 0.2;

interface AggregateTopicInput {
  readonly topic: string;
  readonly posts: readonly DailyFeedPost[];
  readonly overlapPostIds: ReadonlySet<string>;
}

function engagement(comments: number, upvotes: number): number {
  return comments * 1.5 + upvotes * 1.2;
}

export function aggregateTopic(input: AggregateTopicInput): BattleTopic {
  const uniquePosts = input.posts.filter((post) => !input.overlapPostIds.has(post.id));
  const overlapPosts = input.posts.filter((post) => input.overlapPostIds.has(post.id));
  const totalComments = uniquePosts.reduce((sum, post) => sum + post.numComments, 0);
  const totalUpvotes = uniquePosts.reduce((sum, post) => sum + post.numUpvotes, 0);
  const totalReadTime = uniquePosts.reduce((sum, post) => sum + (post.readTime ?? 0), 0);
  const uniqueScore = engagement(totalComments, totalUpvotes);
  const overlapScore =
    engagement(
      overlapPosts.reduce((sum, post) => sum + post.numComments, 0),
      overlapPosts.reduce((sum, post) => sum + post.numUpvotes, 0),
    ) * SHARED_SCORE_MULTIPLIER;
  const battlePosts: BattleTopicPost[] = input.posts.map(mapArticle).sort((a, b) => b.score - a.score);

  return {
    stats: {
      topic: input.topic,
      totalArticles: input.posts.length,
      totalComments,
      totalUpvotes,
      totalAwards: 0,
      totalReadTime,
      uniquePosts: uniquePosts.length,
      overlapPosts: overlapPosts.length,
      engagement: {
        comments: totalComments,
        upvotes: totalUpvotes,
        total: Number((uniqueScore + overlapScore).toFixed(2)),
      },
    },
    posts: battlePosts,
  };
}
