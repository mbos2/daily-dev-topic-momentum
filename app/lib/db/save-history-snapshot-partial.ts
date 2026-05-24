import 'server-only';

import {randomUUID} from 'node:crypto';
import {db} from './client';
import type {
  BattleResponseDto,
  HistorySnapshotPartial,
  HistorySnapshotPartialTopic,
  TopicStatsDto,
} from '@/app/lib/types';

async function getTopic(name: string): Promise<TopicStatsDto> {
  const statement = await db.prepare(`
      SELECT *
      FROM topic_stats
      WHERE name = ?
      LIMIT 1
    `);

  const row = await statement.get([name]);

  if (!row) {
    throw new Error(`Missing topic stats: ${name}`);
  }

  return {
    id: String(row.id),
    name: String(row.name),
    appereances: Number(row.appereances),
    wins: Number(row.wins),
    updatedAt: Number(row.updatedAt),
  };
}

function createTopic(
  battle: BattleResponseDto,
  topic: BattleResponseDto['topics'][number],
  topicId: string,
): HistorySnapshotPartialTopic {
  const article = topic.posts.slice().sort((left, right) => right.score - left.score)[0];

  return {
    topicId,
    name: topic.stats.topic,
    momentum: topic.stats.engagement.score,
    winner: battle.winner === topic.stats.topic,
    article: {
      title: article?.feedPost.title ?? '',
      url: article?.feedPost.url ?? '',
    },
  };
}

export async function saveHistorySnapshotPartial(battle: BattleResponseDto, snapshotId: string): Promise<void> {
  const topics: HistorySnapshotPartialTopic[] = [];

  for (const topic of battle.topics) {
    const stats = await getTopic(topic.stats.topic);
    topics.push(createTopic(battle, topic, stats.id));
  }

  const partial: HistorySnapshotPartial = {
    id: randomUUID(),
    snapshotId,
    isSnapshotFileDeleted: false,
    period: battle.range,
    topics,
    createdAt: Date.now(),
  };

  const statement = await db.prepare(`
      INSERT INTO history_snapshot_partial (
        id,
        snapshotId,
        isSnapshotFileDeleted,
        period,
        topics,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `);

  await statement.run([
    partial.id,
    partial.snapshotId,
    Number(partial.isSnapshotFileDeleted),
    partial.period,
    JSON.stringify(partial.topics),
    Number(partial.createdAt),
  ]);
}
