'use client';

import {useState} from 'react';
import {Box, Button, Grid, Text, VStack} from '@chakra-ui/react';
import {MomentumHistoryCard} from './momentum-history-card';
import type {HistorySnapshotPartial} from '@/app/lib/types';

interface Props {
  battles: readonly HistorySnapshotPartial[];
}

const PAGE_SIZE = 9;

export function MomentumPreviousBattles({battles}: Props) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const visibleBattles = battles.slice(0, visible);
  const hasMore = visible < battles.length;

  function loadMore() {
    setVisible((current) => current + PAGE_SIZE);
  }

  return (
    <Box>
      <Text
        color="white"
        fontWeight="900"
        letterSpacing="-0.04em"
        fontSize={{
          base: '40px',
          lg: '56px',
        }}>
        PREVIOUS BATTLES
      </Text>

      <Text
        mt={3}
        mb={{
          base: 8,
          lg: 12,
        }}
        color="#A0A7B4"
        fontSize={{
          base: '15px',
          lg: '18px',
        }}>
        Browse historical snapshots and their details.
      </Text>

      <Grid
        gap={6}
        alignItems="stretch"
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, minmax(0, 1fr))',
          lg: 'repeat(3, minmax(0, 1fr))',
        }}>
        {visibleBattles.map((battle) => (
          <MomentumHistoryCard key={battle.id} battle={battle} />
        ))}
      </Grid>

      {hasMore && (
        <VStack mt={16}>
          <Button
            onClick={loadMore}
            variant="outline"
            borderRadius="0"
            h="76px"
            minW={{
              base: '100%',
              lg: '320px',
            }}
            borderColor="#ff6b2c"
            color={'#ff6b2c'}
            _hover={{
              boxShadow: '0px 0px 5px 2px rgba(255,125,74,1)',
              bg: 'none',
            }}>
            LOAD MORE HISTORY
          </Button>
        </VStack>
      )}
    </Box>
  );
}
