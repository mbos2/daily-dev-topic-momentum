import type {DailyTag} from '@/app/lib/types';
import {api} from './client';

export async function getTags(): Promise<DailyTag[]> {
  const response = await api.get<DailyTag[]>('/tags');

  return response.data;
}
