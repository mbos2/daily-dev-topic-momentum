import 'server-only';

import {getHistorySnapshots, getTotalBattles} from '@/app/lib/db/read-history';

import {getTopicStats} from '@/app/lib/db/read-topic-stats';

import type {HistorySnapshotPartial} from '@/app/lib/types';

import type {MomentumPageDto, MomentumSummaryCard} from '@/app/lib/types/momentum';

function getBattleMomentum(snapshot: HistorySnapshotPartial): number {
  return snapshot.topics.reduce((total, topic) => total + topic.momentum, 0);
}

function getTotalHistoryEngagement(snapshots: readonly HistorySnapshotPartial[]): number {
  return snapshots.reduce(
    (total, snapshot) => total + snapshot.topics.reduce((sum, topic) => sum + topic.momentum, 0),
    0,
  );
}

function getAverageMomentum(snapshots: readonly HistorySnapshotPartial[]): number {
  if (snapshots.length === 0) {
    return 0;
  }

  const total = snapshots.reduce((sum, snapshot) => sum + getBattleMomentum(snapshot), 0);

  return total / snapshots.length;
}

function formatCompact(value: number): string {
  return Intl.NumberFormat('en', {
    notation: 'compact',

    maximumFractionDigits: 1,
  }).format(value);
}

function buildSummary(
  snapshots: readonly HistorySnapshotPartial[],
  favoriteTag:
    | {
        name: string;
        appereances: number;
      }
    | undefined,
): MomentumSummaryCard[] {
  if (snapshots.length === 0) {
    return [];
  }

  const highestMomentum = snapshots.slice().sort((a, b) => getBattleMomentum(b) - getBattleMomentum(a))[0];

  const totalEngagement = getTotalHistoryEngagement(snapshots);

  const averageMomentum = getAverageMomentum(snapshots);

  return [
    {
      title: 'Highest Match Momentum',

      value: getBattleMomentum(highestMomentum).toFixed(1),

      subtitle: 'Momentum',
    },

    {
      title: 'Total History Engagement',

      value: formatCompact(totalEngagement),

      subtitle: 'Interactions',
    },

    {
      title: 'Average History Momentum',

      value: averageMomentum.toFixed(1),

      subtitle: 'Archive Average',
    },

    {
      title: 'Tag With Most Battles',

      value: favoriteTag?.name ?? '-',

      subtitle: `${favoriteTag?.appereances ?? 0} battles`,
    },
  ];
}

export async function getMomentumPage(): Promise<MomentumPageDto> {
  const [snapshots, totalBattles, topics] = await Promise.all([
    getHistorySnapshots(),

    getTotalBattles(),

    getTopicStats(),
  ]);

  const featured = snapshots.slice().sort((a, b) => getBattleMomentum(b) - getBattleMomentum(a))[0];

  const favorite = topics.slice().sort((left, right) => right.appereances - left.appereances)[0];

  return {
    totalBattles,

    featuredBattle: featured,

    closestBattle: snapshots[0],

    previousBattles: snapshots,

    summary: buildSummary(snapshots, favorite),
  };
}
