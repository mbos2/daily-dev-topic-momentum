import type {HistorySnapshotPartial} from './history';

export interface MomentumSummaryCard {
  title: string;
  value: string;
  subtitle: string;
}

export interface MomentumPageDto {
  totalBattles: number;
  featuredBattle: HistorySnapshotPartial;
  closestBattle: HistorySnapshotPartial;
  previousBattles: HistorySnapshotPartial[];
  summary: readonly MomentumSummaryCard[];
}
