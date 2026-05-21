import {NextResponse} from 'next/server';
import {resolveTopic} from '@/app/services/topics/resolve-topic';
import type {TimeRange, TopicResolveResultDto} from '@/app/lib/types';
import type {NextRequest} from 'next/server';

const VALID_RANGES: readonly TimeRange[] = ['day', 'week', 'month'];

function isTimeRange(value: string): value is TimeRange {
  return VALID_RANGES.includes(value as TimeRange);
}

function jsonError(status: number, message: string): NextResponse {
  return NextResponse.json(
    {
      error: true,
      message,
    },
    {
      status,
    },
  );
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const query = request.nextUrl.searchParams.get('q');

  if (!query) {
    return jsonError(400, 'Missing query parameter "q"');
  }

  const range = request.nextUrl.searchParams.get('range');

  if (!range) {
    return jsonError(400, 'Missing query parameter "range"');
  }

  if (!isTimeRange(range)) {
    return jsonError(400, 'Invalid range. Allowed: day, week, month');
  }

  try {
    const result: TopicResolveResultDto = await resolveTopic(query, range);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return jsonError(422, error.message);
    }

    return jsonError(500, 'Unexpected error');
  }
}
