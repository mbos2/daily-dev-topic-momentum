import 'server-only';

import {dailyDevClient} from './client';

import type {DailyCollectionResponse, DailyFeedPost, TimeRange} from '../../lib/types';

const FEED_PAGE_LIMIT = 50;
const MAX_FEED_PAGES = 20;

interface FeedParams {
  readonly limit?: number;
  readonly cursor?: string;
  readonly time?: TimeRange;
}

export async function getFeedByTag(tag: string, params?: FeedParams): Promise<DailyCollectionResponse<DailyFeedPost>> {
  return dailyDevClient.get<DailyCollectionResponse<DailyFeedPost>>(`/feeds/tag/${tag}`, {
    params,
  });
}

export async function getAllFeedByTag(tag: string, time: TimeRange): Promise<readonly DailyFeedPost[]> {
  const posts: DailyFeedPost[] = [];
  let cursor: string | undefined;
  let page = 0;
  let hasNextPage = true;

  while (hasNextPage && page < MAX_FEED_PAGES) {
    const response = await getFeedByTag(tag, {
      time,
      cursor,
      limit: FEED_PAGE_LIMIT,
    });

    posts.push(...response.data);
    hasNextPage = response.pagination.hasNextPage;
    cursor = response.pagination.cursor ?? undefined;
    page += 1;
  }

  return posts;
}
