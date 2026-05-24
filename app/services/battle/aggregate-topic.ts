import 'server-only';

import type {BattleTopic, DailyFeedPost} from '@/app/lib/types';

const COMMENT_WEIGHT = 1.5;
const UPVOTE_WEIGHT = 1.2;
const SHARED_ARTICLE_WEIGHT = 0.2;
const READ_TIME_WEIGHT = 0.2;
const DISCUSSION_WEIGHT = 3;

interface AggregateTopicInput {
  readonly topic: string;
  readonly posts: readonly DailyFeedPost[];
  readonly overlapPostIds: ReadonlySet<string>;
}

function calculateDiscussionScore(posts: readonly DailyFeedPost[]): number {
  const comments = posts.reduce((total, post) => total + post.numComments, 0);
  const upvotes = posts.reduce((total, post) => total + post.numUpvotes, 0);

  return (comments / Math.max(upvotes, 1)) * DISCUSSION_WEIGHT;
}

function calculateReadTimeScore(posts: readonly DailyFeedPost[]): number {
  const readTime = posts.reduce((total, post) => total + (post.readTime ?? 0), 0);

  return readTime * READ_TIME_WEIGHT;
}

function calculateSharedScore(overlapCount: number): number {
  return overlapCount * SHARED_ARTICLE_WEIGHT;
}

function calculateScore(input: AggregateTopicInput): number {
  const totalComments = input.posts.reduce((total, post) => total + post.numComments, 0);
  const totalUpvotes = input.posts.reduce((total, post) => total + post.numUpvotes, 0);
  const commentScore = totalComments * COMMENT_WEIGHT;
  const upvoteScore = totalUpvotes * UPVOTE_WEIGHT;
  const sharedScore = calculateSharedScore(input.overlapPostIds.size);
  const readTimeScore = calculateReadTimeScore(input.posts);
  const discussionScore = calculateDiscussionScore(input.posts);

  return Number((commentScore + upvoteScore + sharedScore + readTimeScore + discussionScore).toFixed(2));
}

export function aggregateTopic(input: AggregateTopicInput): BattleTopic {
  const overlapPosts = input.posts.filter((post) => input.overlapPostIds.has(post.id));
  const totalComments = input.posts.reduce((total, post) => total + post.numComments, 0);
  const totalUpvotes = input.posts.reduce((total, post) => total + post.numUpvotes, 0);
  const totalReadTime = input.posts.reduce((total, post) => total + (post.readTime ?? 0), 0);

  return {
    stats: {
      topic: input.topic,
      totalArticles: input.posts.length,
      totalComments,
      totalUpvotes,
      totalAwards: 0,
      totalReadTime,
      uniquePosts: input.posts.length - overlapPosts.length,
      overlapPosts: overlapPosts.length,
      engagement: {
        comments: totalComments,
        upvotes: totalUpvotes,
        score: calculateScore(input),
      },
    },

    posts: input.posts
      .map((post) => ({
        feedPost: post,
        score: Number(
          (
            post.numComments * COMMENT_WEIGHT +
            post.numUpvotes * UPVOTE_WEIGHT +
            (post.readTime ?? 0) * READ_TIME_WEIGHT
          ).toFixed(2),
        ),
      }))
      .sort((a, b) => b.score - a.score),
  };
}
