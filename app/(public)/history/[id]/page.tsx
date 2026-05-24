'use client';

import {BattleResult} from '@/app/components/battle/battle-result';
import {api} from '@/app/lib/api/client';
import {BattleResponseDto} from '@/app/lib/types';
import {Box} from '@chakra-ui/react';
import {useParams} from 'next/dist/client/components/navigation';
import {useEffect, useState} from 'react';

export default function Page() {
  const [battle, setBattle] = useState<BattleResponseDto | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {id} = useParams<{
    id: string;
  }>();

  async function onReplay() {}
  async function resetBattle() {}

  useEffect(() => {
    async function loadHistorySnapshot(): Promise<void> {
      setLoading(true);

      setError(null);

      try {
        const response = await api.get(`/history/${id}`);
        setBattle(response.data.snapshot);
      } catch (error) {
        if (error instanceof Error) {
          const axiosError = error as import('axios').AxiosError<{
            error?: string;
          }>;

          setError(axiosError.response?.data?.error ?? 'UNKNOWN_ERROR');
        } else {
          setError('UNKNOWN_ERROR');
        }

        setBattle(undefined);
      } finally {
        setLoading(false);
      }
    }

    void loadHistorySnapshot();
  }, [id]);

  return (
    <Box>
      {battle ? (
        <BattleResult battle={battle} onReplay={onReplay} onCompareAgain={resetBattle} hideVerdict={true} />
      ) : (
        <Box></Box>
      )}
    </Box>
  );
}
