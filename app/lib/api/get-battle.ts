import type {BattleResponseDto, TimeRange} from '@/app/lib/types';

import {api} from './client';

interface GetBattleInput {
  readonly topics: readonly string[];
  readonly range: TimeRange;
}

export async function getBattle(input: GetBattleInput): Promise<BattleResponseDto> {
  const response = await api.get<BattleResponseDto>('/battle', {
    params: {
      topics: input.topics.join(','),
      range: input.range,
    },
  });

  return response.data;
}
