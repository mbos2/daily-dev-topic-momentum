import type {BattleStats, TimeRange, TopicStats} from './index';

export interface BattleSnapshotTopic {
  stats: TopicStats;
}

export interface BattleSnapshot {
  id: string;
  createdAt: string;
  battleName: string;
  range: TimeRange;
  winner: string;
  sharedPosts: number;
  topics: BattleSnapshotTopic[];
  stats: BattleStats;
}

export interface HistorySnapshotListItem {
  id: string;
  battleName: string;
  createdAt: string;
  winner: string;
}

export interface HistoryResponseDto {
  snapshots: HistorySnapshotListItem[];
}

export interface HistorySnapshotResponseDto {
  snapshot: BattleSnapshot;
}

export interface HistorySnapshotPartial {
  id: string;
  snapshotId: string; // unique & index
  isSnapshotFileDeleted: boolean;
  period: TimeRange;
  topics: HistorySnapshotPartialTopic[];
  createdAt: number | Date;
}

export interface HistorySnapshotPartialTopic {
  topicId: string; // relation to TopicStatsDto id
  name: string; // unique & index
  momentum: number;
  winner: boolean;
  article: HistorySnapshotPartialTopicTopArticle;
}

export interface HistorySnapshotPartialTopicTopArticle {
  title: string;
  url: string;
}

export interface TopicStatsDto {
  id: string;
  name: string; // unique & index
  appereances: number;
  wins: number;
  updatedAt: number | Date; // number being timestamp
}
