'use client';

import {Box, Flex, Text, VStack} from '@chakra-ui/react';

import Link from 'next/link';

import type {HistorySnapshotPartial} from '@/app/lib/types';

interface Props {
  battle: HistorySnapshotPartial;
}

function title(battle: HistorySnapshotPartial): string {
  return battle.topics.map((topic) => topic.name).join(' vs ');
}

function winner(battle: HistorySnapshotPartial): string {
  return battle.topics.find((topic) => topic.winner)?.name ?? '-';
}

function score(battle: HistorySnapshotPartial): string {
  return battle.topics.reduce((total, topic) => total + topic.momentum, 0).toFixed(1);
}

function delta(battle: HistorySnapshotPartial): string {
  const values = battle.topics.map((topic) => topic.momentum).sort((a, b) => b - a);

  if (values.length < 2) {
    return '+0%';
  }

  return `+${Math.abs(values[0] - values[1]).toFixed(1)}%`;
}

export function MomentumHistoryCard({battle}: Props) {
  return (
    <Link
      href={`/history/${battle.snapshotId}`}
      style={{
        display: 'block',
        height: '100%',
      }}>
      <Box
        h="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        bg="#15171D"
        borderRadius="20px"
        border="1px solid"
        borderColor="whiteAlpha.100"
        px={{
          base: 7,
          lg: 8,
        }}
        py={{
          base: 7,
          lg: 8,
        }}
        transition=".18s"
        cursor="pointer"
        _hover={{
          transform: 'translateY(-2px)',
          borderColor: '#2A3040',
        }}>
        <VStack align="stretch" gap={5} flexShrink={0}>
          <Box>
            <Text
              color="white"
              fontWeight="800"
              lineHeight="1.12"
              fontSize={{
                base: '26px',
                lg: '30px',
              }}>
              {title(battle)}
            </Text>
          </Box>

          <Box>
            <Text color="#9AA4B2" fontSize="13px">
              Winner:{' '}
              <Box as="span" color="#FF8F6A">
                {winner(battle)}
              </Box>
            </Text>
          </Box>
        </VStack>

        <Flex
          direction="column"
          justify="end"
          flex="1"
          pt={{
            base: 10,
            lg: 12,
          }}>
          <Text
            color="white"
            fontWeight="900"
            lineHeight="0.9"
            wordBreak="break-word"
            fontSize={{
              base: '56px',
              lg: '72px',
            }}>
            {score(battle)}
          </Text>

          <Flex mt={8} align="end" justify="space-between" gap={6}>
            <Text color="#8A93A5" fontSize="12px" textTransform="uppercase">
              {battle.period}
            </Text>

            <VStack align="end" gap={2}>
              <Text
                color="#FF9F82"
                fontWeight="800"
                textAlign="right"
                fontSize={{
                  base: '24px',
                  lg: '32px',
                }}>
                ▲ {delta(battle)}
              </Text>

              <Text color="white" fontWeight="800" fontSize="14px">
                CLICK FOR MORE →
              </Text>
            </VStack>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
}
