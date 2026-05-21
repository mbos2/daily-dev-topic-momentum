import 'server-only';

import {searchAllPosts} from '../daily-dev/search';
import {aggregateTopic} from './aggregate-topic';
import {buildStats} from './build-stats';
import {calculateOverlap} from './calculate-overlap';
import type {BattleQuery, BattleResponseDto, BattleTopic, DailyFeedPost} from '@/app/lib/types';

interface TopicFeed {
  readonly topic: string;
  readonly posts: readonly DailyFeedPost[];
}

async function fetchFeeds(query: BattleQuery): Promise<readonly TopicFeed[]> {
  const feeds: TopicFeed[] = [];

  for (const topic of query.topics) {
    const posts = await searchAllPosts({
      query: topic,
      range: query.range,
    });

    feeds.push({
      topic,
      posts,
    });
  }

  return feeds;
}

export async function runBattle(query: BattleQuery): Promise<BattleResponseDto> {
  const feeds = await fetchFeeds(query);
  const overlap = calculateOverlap(feeds.map((feed) => feed.posts.map((post) => post.id)));
  const topics: BattleTopic[] = feeds.map((feed) =>
    aggregateTopic({
      topic: feed.topic,
      posts: feed.posts,
      overlapPostIds: overlap.sharedPostIds,
    }),
  );

  const winner = topics.reduce((best, current) =>
    current.stats.engagement.score > best.stats.engagement.score ? current : best,
  );

  return {
    range: query.range,
    winner: winner.stats.topic,
    sharedPosts: overlap.overlapCount,
    topics,
    stats: buildStats(topics),
  };
}
