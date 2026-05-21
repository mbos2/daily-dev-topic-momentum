export const TIME_RANGES = ["day", "week", "month"] as const;

export type TimeRange = (typeof TIME_RANGES)[number];

export const HISTORY_PERIODS = ["yesterday", "week", "history"] as const;

export type HistoryPeriod = (typeof HISTORY_PERIODS)[number];
