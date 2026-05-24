'use client';

import {Box, Grid, HStack, Text, VStack} from '@chakra-ui/react';
import {FaAward} from 'react-icons/fa6';
import type {BattleResponseDto} from '@/app/lib/types';

interface BattleTopicCardsProps {
  battle: BattleResponseDto;
}

export function BattleTopicCards({battle}: BattleTopicCardsProps) {
  return (
    <Grid
      templateColumns={{
        base: '1fr',
        lg: battle.topics.length === 2 ? 'repeat(2,minmax(0,1fr))' : 'repeat(3,minmax(0,1fr))',
      }}
      gap={{
        base: 5,
        lg: 6,
      }}>
      {battle.topics.map((topic) => {
        const winner = topic.stats.topic === battle.winner;

        return (
          <Box
            key={topic.stats.topic}
            bg="#15171d"
            borderRadius="2rem"
            overflow="hidden"
            border="1px solid"
            borderColor={winner ? '#ff6b2c' : '#252933'}>
            <Box
              px={8}
              py={7}
              bg={winner ? '#24160f' : '#181a22'}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Text
                mt={3}
                fontSize={{
                  base: '2xl',
                  lg: '4xl',
                }}
                textTransform={'uppercase'}
                fontWeight="800"
                overflowWrap="anywhere">
                {topic.stats.topic}
              </Text>

              {winner && (
                <Text mt={3} color="#ff6b2c" fontSize={'4xl'}>
                  <FaAward />
                </Text>
              )}
            </Box>

            <VStack align="stretch" gap={0}>
              <StatRow label="Momentum" value={topic.stats.engagement.score.toFixed(2)} accent />
              <StatRow label="Articles" value={topic.stats.totalArticles} />
              <StatRow label="Comments" value={topic.stats.totalComments} />
              <StatRow label="Upvotes" value={topic.stats.totalUpvotes} />
              <StatRow label="Read Time" value={`${topic.stats.totalReadTime} min`} />
              <StatRow label="Unique" value={topic.stats.uniquePosts} />
              <StatRow label="Overlap Articles" value={topic.stats.overlapPosts} />
            </VStack>
          </Box>
        );
      })}
    </Grid>
  );
}

interface StatRowProps {
  label: string;

  value: string | number;

  accent?: boolean;
}

function StatRow({label, value, accent}: StatRowProps) {
  return (
    <HStack justify="space-between" px={8} py={5} borderTop="1px solid #22252d">
      <Text color="#8d95a4">{label}</Text>

      <Text color={accent ? '#ff6b2c' : 'white'} fontWeight="700" fontSize={accent ? 'xl' : 'md'}>
        {value}
      </Text>
    </HStack>
  );
}
