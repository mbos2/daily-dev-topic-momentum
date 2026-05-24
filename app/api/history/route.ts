import {NextResponse} from 'next/server';

import {getHistorySnapshots, getTotalBattles} from '@/app/lib/db/read-history';

export async function GET() {
  const snapshots = await getHistorySnapshots();

  const totalBattles = await getTotalBattles();

  return NextResponse.json({
    totalBattles,

    snapshots,
  });
}
