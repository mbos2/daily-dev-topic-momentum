'use client';

import {Box, Flex, Grid, Spacer, Text, VStack} from '@chakra-ui/react';

import Link from 'next/link';

import type {HistorySnapshotPartial} from '@/app/lib/types';

interface Props {
  featured?: HistorySnapshotPartial;
  closest?: HistorySnapshotPartial;
}

function getBattleTitle(battle: HistorySnapshotPartial): string {
  return battle.topics.map((topic) => topic.name).join(' vs ');
}

function getMomentum(battle: HistorySnapshotPartial): number {
  return battle.topics.reduce((total, topic) => total + topic.momentum, 0);
}

function getDelta(battle: HistorySnapshotPartial): string {
  const values = battle.topics.map((topic) => topic.momentum).sort((a, b) => b - a);

  if (values.length < 2) {
    return '0%';
  }

  return `${Math.abs(values[0] - values[1]).toFixed(1)}%`;
}

function EmptyCard({title}: {title: string}) {
  return (
    <Box h="100%" borderRadius="24px" border="1px solid" borderColor="whiteAlpha.100" p={10}>
      <Text color="#6E7686">{title}</Text>
    </Box>
  );
}

function FeaturedCard({battle}: {battle: HistorySnapshotPartial}) {
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
        bg="linear-gradient(135deg,#1B1C22,#22232A)"
        borderRadius="24px"
        p={{
          base: 8,
          lg: 12,
        }}>
        <Flex justify="space-between">
          <Text color="#FF8F6A" fontSize="12px" letterSpacing="0.18em" textTransform="uppercase" fontWeight="700">
            Battle of the Day
          </Text>

          <Box px={3} py={1} bg="whiteAlpha.100" borderRadius="6px">
            <Text color="white" fontSize="11px">
              HIGH VOLUME
            </Text>
          </Box>
        </Flex>

        <Text
          mt={14}
          color="white"
          fontWeight="900"
          lineHeight="0.95"
          fontSize={{
            base: '42px',
            lg: '64px',
          }}>
          {getBattleTitle(battle)}
        </Text>

        <Spacer />

        <VStack align="start">
          <Text color="#B8C0CF" fontSize="12px">
            MOMENTUM SCORE
          </Text>

          <Text
            color="white"
            lineHeight="1"
            fontWeight="900"
            fontSize={{
              base: '52px',
              lg: '68px',
            }}>
            {getMomentum(battle).toFixed(1)}
          </Text>
        </VStack>
      </Box>
    </Link>
  );
}

function ClosestCard({battle}: {battle: HistorySnapshotPartial}) {
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
        borderRadius="24px"
        border="1px solid"
        borderColor="whiteAlpha.100"
        p={{
          base: 8,
          lg: 12,
        }}>
        <Text color="#2F73FF" fontWeight="700" letterSpacing="0.18em" fontSize="12px">
          CLOSEST BATTLE
        </Text>

        <Text
          mt={14}
          color="white"
          lineHeight="1"
          fontWeight="900"
          fontSize={{
            base: '40px',
            lg: '56px',
          }}>
          {getBattleTitle(battle)}
        </Text>

        <Text mt={6} color="#A0A7B4">
          A historic transition point for developer preference.
        </Text>

        <Spacer />

        <Grid templateColumns="1fr 1fr" gap={8}>
          <Box>
            <Text color="#A0A7B4" fontSize="12px">
              Victory Delta
            </Text>

            <Text mt={2} color="#FF8F6A" fontWeight="900" fontSize="36px">
              {getDelta(battle)}
            </Text>
          </Box>

          <Box>
            <Text color="#A0A7B4" fontSize="12px">
              Period
            </Text>

            <Text mt={2} color="white" fontWeight="900" fontSize="36px">
              {battle.period}
            </Text>
          </Box>
        </Grid>
      </Box>
    </Link>
  );
}

export function MomentumFeaturedBattle({featured, closest}: Props) {
  return (
    <Grid
      gap={6}
      alignItems="stretch"
      templateColumns={{
        base: '1fr',
        lg: '1.35fr 1fr',
      }}>
      {featured ? <FeaturedCard battle={featured} /> : <EmptyCard title="Battle of the Day" />}

      {closest ? <ClosestCard battle={closest} /> : <EmptyCard title="Closest Battle" />}
    </Grid>
  );
}
