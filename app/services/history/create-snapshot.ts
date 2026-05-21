import "server-only";

import { randomUUID } from "node:crypto";
import type {
	BattleResponseDto,
	BattleSnapshot,
	BattleTopic,
} from "@/app/lib/types";

function createBattleName(topics: readonly string[]): string {
	return topics.join(" vs ");
}

function createSnapshotId(): string {
	return randomUUID();
}

export function createSnapshot(battle: BattleResponseDto): BattleSnapshot {
	const createdAt = new Date().toISOString();

	const topics = battle.topics.map(
		(topic: BattleTopic): string => topic.stats.topic,
	);

	const battleName = createBattleName(topics);

	return {
		id: createSnapshotId(),
		createdAt,
		battleName,
		range: battle.range,
		winner: battle.winner,
		sharedPosts: battle.sharedPosts,
		topics: battle.topics.map((topic: BattleTopic) => ({
			stats: topic.stats,
		})),
		stats: battle.stats,
	};
}
