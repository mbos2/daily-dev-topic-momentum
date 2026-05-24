import {NextRequest, NextResponse} from 'next/server';

import {runBattle} from '@/app/services/battle/run-battle';
import {createSnapshot, writeHistory} from '@/app/services/history';
import {saveHistorySnapshotPartial} from '@/app/lib/db/save-history-snapshot-partial';

import type {ApiErrorResponse, BattleQuery, BattleResponseDto, TimeRange} from '@/app/lib/types';

const VALID_RANGES = ['day', 'week', 'month'] as const;

function errorResponse(status: number, message: string): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      error: 'BATTLE_REQUEST_ERROR',
      message,
    },
    {
      status,
    },
  );
}

function isRange(value: string): value is TimeRange {
  return VALID_RANGES.includes(value as (typeof VALID_RANGES)[number]);
}

function parseTopics(value: string): BattleQuery['topics'] {
  const topics = value
    .split(',')
    .map((topic) => topic.trim())
    .filter(Boolean);

  if (topics.length < 2 || topics.length > 3) {
    throw new Error('Battle supports 2 or 3 topics');
  }

  return topics as BattleQuery['topics'];
}

export async function GET(request: NextRequest): Promise<NextResponse<BattleResponseDto | ApiErrorResponse>> {
  try {
    const topics = request.nextUrl.searchParams.get('topics');
    const range = request.nextUrl.searchParams.get('range');

    if (!topics) {
      return errorResponse(400, 'Missing topics');
    }

    if (!range) {
      return errorResponse(400, 'Missing range');
    }

    if (!isRange(range)) {
      return errorResponse(400, 'Invalid range');
    }

    const battle = await runBattle({
      topics: parseTopics(topics),
      range,
    });

    const snapshot = createSnapshot(battle);

    await writeHistory(snapshot);
    await saveHistorySnapshotPartial(battle, snapshot.id);

    return NextResponse.json(battle);
  } catch (error) {
    console.error(error);
    return errorResponse(500, String(error));
  }
}
