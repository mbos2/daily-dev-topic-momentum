import 'server-only';

import {dailyDevClient} from './client';
import {DailyTag, TagsResponse} from '@/app/lib/types';

export async function getTags(): Promise<readonly DailyTag[]> {
  const response = await dailyDevClient.get<TagsResponse>('/tags');
  return response.data;
}
