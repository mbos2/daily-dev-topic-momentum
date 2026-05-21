import {BattleTopicPost} from './daily-dev';
import type {EngagementBreakdown} from './engagement';
import type {TimeRange} from './range';

export interface TopicStats {
  topic: string;
  totalArticles: number;
  totalComments: number;
  totalUpvotes: number;
  totalAwards: number;
  totalReadTime: number;
  uniquePosts: number;
  overlapPosts: number;
  engagement: EngagementBreakdown;
}

export interface TopicEngagementStats {
  topic: string;
  score: number;
}

export interface TopicArticleStats {
  topic: string;
  totalArticles: number;
}

export interface TopicOverlapStats {
  topic: string;
  overlapPosts: number;
}

export interface BattleStats {
  engagement: TopicEngagementStats[];
  articles: TopicArticleStats[];
  overlap: TopicOverlapStats[];
}

export interface BattleTopic {
  stats: TopicStats;
  posts: readonly BattleTopicPost[];
}

export interface BattleResponseDto {
  range: TimeRange;
  winner: string;
  sharedPosts: number;
  topics: BattleTopic[];
  stats: BattleStats;
}

export interface BattleQuery {
  topics: [string, string] | [string, string, string];
  range: TimeRange;
}
