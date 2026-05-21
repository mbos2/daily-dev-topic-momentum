import type {TimeRange, ApiErrorResponse, BattleArticlePage} from '@/app/lib/types';
import {getBattleArticles} from '@/app/services/battle';
import {resolveTopic} from '@/app/services/topics';
import {type NextRequest, NextResponse} from 'next/server';

const VALID_RANGES: readonly TimeRange[] = ['day', 'week', 'month'];

function error(status: number, message: string): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      error: 'BATTLE_ARTICLES_ERROR',
      message,
    },
    {
      status,
    },
  );
}

function isRange(value: string): value is TimeRange {
  return VALID_RANGES.includes(value as TimeRange);
}

export async function GET(request: NextRequest): Promise<NextResponse<BattleArticlePage | ApiErrorResponse>> {
  try {
    const topic = request.nextUrl.searchParams.get('topic');
    const range = request.nextUrl.searchParams.get('range');
    const limit = Number(request.nextUrl.searchParams.get('limit') ?? '20');
    const cursor = request.nextUrl.searchParams.get('cursor') ?? undefined;

    if (!topic) {
      throw new Error('Missing "topic"');
    }

    if (!range) {
      throw new Error('Missing "range"');
    }

    if (!isRange(range)) {
      throw new Error(`Invalid range "${range}"`);
    }

    const resolved = await resolveTopic(topic, range);

    const result = await getBattleArticles({
      topic: resolved.resolvedValue,
      range,
      limit,
      cursor,
    });

    return NextResponse.json(result);
  } catch (errorValue) {
    if (errorValue instanceof Error) {
      return error(400, errorValue.message);
    }

    return error(500, 'Unexpected error');
  }
}
