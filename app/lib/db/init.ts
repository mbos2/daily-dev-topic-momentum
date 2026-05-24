import 'server-only';

import {db} from './client';

let initialized = false;

export async function initializeDatabase(): Promise<void> {
  if (initialized) {
    return;
  }

  await db.batch([
    `
    CREATE TABLE IF NOT EXISTS topic_stats (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      appereances INTEGER NOT NULL,
      wins INTEGER NOT NULL,
      updatedAt INTEGER NOT NULL
    )
    `,

    `
    CREATE INDEX IF NOT EXISTS idx_topic_stats_name
    ON topic_stats(name)
    `,

    `
    CREATE TABLE IF NOT EXISTS history_snapshot_partial (
      id TEXT PRIMARY KEY,
      snapshotId TEXT NOT NULL UNIQUE,
      isSnapshotFileDeleted INTEGER NOT NULL,
      period TEXT NOT NULL,
      topics JSON NOT NULL,
      createdAt INTEGER NOT NULL
    )
    `,

    `
    CREATE INDEX IF NOT EXISTS idx_history_snapshot_snapshot_id
    ON history_snapshot_partial(snapshotId)
    `,
  ]);

  initialized = true;
}
