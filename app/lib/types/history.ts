import type { BattleStats, TimeRange, TopicStats } from "./index";

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
