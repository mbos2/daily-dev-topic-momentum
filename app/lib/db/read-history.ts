import 'server-only';

import {db} from './client';

import type {HistorySnapshotPartial, HistorySnapshotPartialTopic} from '@/app/lib/types';

interface HistorySnapshotRow {
  id: string;
  snapshotId: string;
  isSnapshotFileDeleted: number;
  period: HistorySnapshotPartial['period'];
  topics: string;
  createdAt: number;
}

function mapRow(row: HistorySnapshotRow): HistorySnapshotPartial {
  return {
    id: row.id,
    snapshotId: row.snapshotId,
    isSnapshotFileDeleted: Boolean(row.isSnapshotFileDeleted),
    period: row.period,
    topics: JSON.parse(row.topics) as HistorySnapshotPartialTopic[],
    createdAt: Number(row.createdAt),
  };
}

export async function getHistorySnapshots(): Promise<HistorySnapshotPartial[]> {
  const result = await db.execute(
    `
      SELECT
        id,
        snapshotId,
        isSnapshotFileDeleted,
        period,
        topics,
        createdAt
      FROM history_snapshot_partial
      ORDER BY createdAt DESC
      `,
  );

  return result.rows.map((row: HistorySnapshotRow) => mapRow(row));
}

export async function getHistorySnapshot(snapshotId: string): Promise<HistorySnapshotPartial | null> {
  const result = await db.execute(
    `
      SELECT
        id,
        snapshotId,
        isSnapshotFileDeleted,
        period,
        topics,
        createdAt
      FROM history_snapshot_partial
      WHERE snapshotId = ?
      LIMIT 1
      `,
    [snapshotId],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapRow(result.rows[0] as HistorySnapshotRow);
}

export async function getTotalBattles(): Promise<number> {
  const result = await db.execute(
    `
      SELECT COUNT(*) AS total
      FROM history_snapshot_partial
      `,
  );

  return Number(result.rows[0]?.total ?? 0);
}
