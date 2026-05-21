import 'server-only';

import type {BattleTopicPost, DailyFeedPost} from '@/app/lib/types';

function calculateScore(post: DailyFeedPost): number {
  const total = post.numComments * 1.5 + post.numUpvotes * 1.2;

  return Number(total.toFixed(2));
}

export function mapArticle(post: DailyFeedPost): BattleTopicPost {
  return {
    feedPost: post,
    score: calculateScore(post),
  };
}
