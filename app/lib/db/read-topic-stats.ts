import 'server-only';

import {db} from './client';

import type {TopicStatsDto} from '@/app/lib/types';

interface TopicStatsRow {
  id: string;
  name: string;
  appereances: number;
  wins: number;
  updatedAt: number;
}

function mapRow(row: TopicStatsRow): TopicStatsDto {
  return {
    id: String(row.id),
    name: String(row.name),
    appereances: Number(row.appereances),
    wins: Number(row.wins),
    updatedAt: Number(row.updatedAt),
  };
}

export async function getTopicStats(): Promise<TopicStatsDto[]> {
  const result = await db.execute(
    `
      SELECT
        id,
        name,
        appereances,
        wins,
        updatedAt
      FROM topic_stats
      ORDER BY wins DESC
      `,
  );

  return result.rows.map((row: TopicStatsRow) => mapRow(row));
}

export async function getTopicById(id: string): Promise<TopicStatsDto | null> {
  const result = await db.execute(
    `
      SELECT
        id,
        name,
        appereances,
        wins,
        updatedAt
      FROM topic_stats
      WHERE id = ?
      LIMIT 1
      `,
    [id],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapRow(result.rows[0] as TopicStatsRow);
}

export async function getFavoriteBattleTag(): Promise<TopicStatsDto | null> {
  const result = await db.execute(
    `
      SELECT
        id,
        name,
        appereances,
        wins,
        updatedAt
      FROM topic_stats
      ORDER BY appereances DESC
      LIMIT 1
      `,
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapRow(result.rows[0] as TopicStatsRow);
}
