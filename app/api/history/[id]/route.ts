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

  return NextResponse.json(await readSnapshot(id));
}
