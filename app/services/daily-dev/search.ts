import 'server-only';

import {dailyDevClient} from './client';
import type {DailyCollectionResponse, DailyFeedPost, DailyTag, TimeRange} from '@/app/lib/types';

interface SearchPostsInput {
  readonly query: string;
  readonly range: TimeRange;
  readonly limit?: number;
  readonly cursor?: string;
}

interface SearchTagsResponse {
  readonly data: readonly DailyTag[];
}

const DEFAULT_LIMIT = 50;

export async function searchTags(query: string): Promise<SearchTagsResponse> {
  return dailyDevClient.get<SearchTagsResponse>('/search/tags', {
    params: {
      q: query,
    },
  });
}

export async function searchPosts(input: SearchPostsInput): Promise<DailyCollectionResponse<DailyFeedPost>> {
  const params: {
    q: string;
    time: TimeRange;
    limit: number;
    cursor?: string;
  } = {
    q: input.query,
    time: input.range,
    limit: input.limit ?? DEFAULT_LIMIT,
  };

  if (input.cursor !== undefined) {
    params.cursor = input.cursor;
  }

  return dailyDevClient.get<DailyCollectionResponse<DailyFeedPost>>('/search/posts', {
    params,
  });
}

export async function searchAllPosts(
  input: Omit<SearchPostsInput, 'cursor' | 'limit'>,
): Promise<readonly DailyFeedPost[]> {
  const posts: DailyFeedPost[] = [];

  let cursor: string | undefined;

  for (;;) {
    try {
      const response = await searchPosts({
        query: input.query,
        range: input.range,
        limit: DEFAULT_LIMIT,
        cursor,
      });

      posts.push(...response.data);

      if (!response.pagination.hasNextPage) {
        break;
      }

      cursor = response.pagination.cursor ?? undefined;

      if (cursor === undefined) {
        break;
      }
    } catch {
      break;
    }
  }

  return posts;
}
