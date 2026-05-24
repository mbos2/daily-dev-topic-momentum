import {readSnapshot} from '@/app/services/history';
import {NextResponse} from 'next/server';

export async function GET(
  _: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  const {id} = await context.params;

  try {
    const snapshot = await readSnapshot(id);

    return NextResponse.json({
      snapshot,
    });
  } catch {
    return NextResponse.json(
      {
        error: 'SNAPSHOT_NOT_FOUND',
      },

      {
        status: 404,
      },
    );
  }
}
