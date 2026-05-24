import {NextResponse} from 'next/server';

import {getTopicStats} from '@/app/lib/db/read-topic-stats';

import {getTotalBattles} from '@/app/lib/db/read-history';

export async function GET() {
  const [topics, totalBattles] = await Promise.all([getTopicStats(), getTotalBattles()]);

  return NextResponse.json({
    totalBattles,

    topics,
  });
}
