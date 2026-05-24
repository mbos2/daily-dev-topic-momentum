export const dynamic = 'force-dynamic';
import {MomentumPage} from '@/app/components/momentum/momentum-page';
import {getMomentumPage} from '@/app/services/momentum/get-momentum-page';

export default async function Page() {
  const data = await getMomentumPage();
  return <MomentumPage data={data} />;
}
