import 'server-only';

import type {BattleTopicPost, DailyFeedPost} from '@/app/lib/types';

const COMMENT_WEIGHT = 1.5;
const UPVOTE_WEIGHT = 1.2;
const READ_TIME_WEIGHT = 0.2;
const DISCUSSION_WEIGHT = 3;

function calculateDiscussionScore(post: DailyFeedPost): number {
  return (post.numComments / Math.max(post.numUpvotes, 1)) * DISCUSSION_WEIGHT;
}

function calculateReadTimeScore(post: DailyFeedPost): number {
  return (post.readTime ?? 0) * READ_TIME_WEIGHT;
}

function calculateScore(post: DailyFeedPost): number {
  const commentScore = post.numComments * COMMENT_WEIGHT;
  const upvoteScore = post.numUpvotes * UPVOTE_WEIGHT;
  const readTimeScore = calculateReadTimeScore(post);
  const discussionScore = calculateDiscussionScore(post);

  const total = commentScore + upvoteScore + readTimeScore + discussionScore;

  return Number(total.toFixed(2));
}

export function mapArticle(post: DailyFeedPost): BattleTopicPost {
  return {
    feedPost: post,
    score: calculateScore(post),
  };
}
