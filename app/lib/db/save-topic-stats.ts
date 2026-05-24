import 'server-only';

import {db} from './client';

import type {BattleResponseDto, TopicStatsDto} from '@/app/lib/types';

function timestamp(): number {
  return Date.now();
}

async function findTopic(name: string): Promise<TopicStatsDto | null> {
  const statement = await db.prepare(`
    SELECT
      id,
      name,
      appereances,
      wins,
      updatedAt
    FROM topic_stats
    WHERE name = ?
    LIMIT 1
  `);

  const row = await statement.get([name]);

  if (!row) {
    return null;
  }

  return {
    id: String(row.id),
    name: String(row.name),
    appereances: Number(row.appereances),
    wins: Number(row.wins),
    updatedAt: Number(row.updatedAt),
  };
}

async function insertTopic(topic: BattleResponseDto['topics'][number], winner: string): Promise<void> {
  const statement = await db.prepare(`
    INSERT INTO topic_stats (
      id,
      name,
      appereances,
      wins,
      updatedAt
    )
    VALUES (?, ?, ?, ?, ?)
  `);

  await statement.run([crypto.randomUUID(), topic.stats.topic, 1, Number(topic.stats.topic === winner), timestamp()]);
}

async function updateTopic(
  existing: TopicStatsDto,
  topic: BattleResponseDto['topics'][number],
  winner: string,
): Promise<void> {
  const statement = await db.prepare(`
    UPDATE topic_stats
    SET
      appereances = ?,
      wins = ?,
      updatedAt = ?
    WHERE id = ?
  `);

  await statement.run([
    existing.appereances + 1,
    existing.wins + Number(topic.stats.topic === winner),
    timestamp(),
    existing.id,
  ]);
}

export async function saveTopicStats(battle: BattleResponseDto): Promise<void> {
  for (const topic of battle.topics) {
    const existing = await findTopic(topic.stats.topic);

    if (existing) {
      await updateTopic(existing, topic, battle.winner);
      continue;
    }

    await insertTopic(topic, battle.winner);
  }
}
