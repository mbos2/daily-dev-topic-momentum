import 'server-only';

import type {ResolvedTopicType, TimeRange} from '@/app/lib/types';
import {searchTags} from '../daily-dev/search';

interface ResolvedTopic {
  readonly resolvedType: ResolvedTopicType;
  readonly resolvedValue: string;
}

const SEARCH_ALIASES: Readonly<Record<string, string>> = {
  'c#': 'csharp',
  'c++': 'cpp',
};

export async function resolveTopic(query: string, _range: TimeRange): Promise<ResolvedTopic> {
  const normalized = query.trim().toLowerCase();
  const alias = SEARCH_ALIASES[normalized];

  if (alias !== undefined) {
    return {
      resolvedType: 'post-search',
      resolvedValue: alias,
    };
  }

  const response = await searchTags(normalized);
  const match = response.data.find((tag): boolean => tag.name.toLowerCase() === normalized);

  if (match !== undefined) {
    return {
      resolvedType: 'tag',
      resolvedValue: match.name,
    };
  }

  return {
    resolvedType: 'post-search',
    resolvedValue: normalized,
  };
}
