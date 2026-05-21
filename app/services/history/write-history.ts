import 'server-only';

import {put} from './storage';
import {HISTORY_PREFIX} from './storage';
import type {BattleSnapshot} from '@/app/lib/types';

function createSnapshotPath(snapshot: BattleSnapshot): string {
  const date = new Date(snapshot.createdAt);
  const year = String(date.getUTCFullYear());
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return [HISTORY_PREFIX, year, month, day, `${snapshot.id}.json`].join('/');
}

export async function writeHistory(snapshot: BattleSnapshot): Promise<void> {
  await put(createSnapshotPath(snapshot), JSON.stringify(snapshot), {
    access: 'private',
    addRandomSuffix: false,
  });
}
