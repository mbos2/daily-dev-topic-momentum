'use client';

import {Box, HStack, Text, VStack} from '@chakra-ui/react';

import type {BattleResponseDto} from '@/app/lib/types';
import {BattleShare} from './battle-share';
interface BattleHeroProps {
  battle: BattleResponseDto;
}

export function BattleHero({battle}: BattleHeroProps) {
  const scores = [...battle.stats.engagement].sort((left, right) => right.score - left.score);

  return (
    <VStack gap={0} align="stretch">
      <Box
        position="relative"
        overflow="hidden"
        borderRadius="2rem"
        bg="#131315"
        border="1px solid #242424"
        px={{
          base: 6,
          lg: 12,
        }}
        pt={{
          base: 12,
          lg: 20,
        }}
        pb={{
          base: 20,
          lg: 24,
        }}>
        <Text
          position="absolute"
          top="8%"
          left="50%"
          transform="translateX(-50%)"
          fontWeight="800"
          fontSize={{
            base: '5rem',
            lg: '14rem',
          }}
          opacity={0.04}
          fontStyle={'italic'}
          whiteSpace="nowrap">
          <i>VICTORY</i>
        </Text>

        <VStack align="center" gap={4} position="relative">
          <Text color="#ff6b2c" letterSpacing="0.18em" textTransform="uppercase">
            Winner
          </Text>

          <Text
            fontWeight="800"
            lineHeight="0.9"
            textAlign="center"
            fontSize={{
              base: '2rem',
              lg: '4rem',
            }}>
            {battle.winner.toUpperCase()}
          </Text>

          <Text color="#8d95a4" textAlign="center" fontSize={'2xl'}>
            Highest engagement momentum for time range: {battle.range}
          </Text>
          <HStack
            mt="2rem"
            mx={{
              base: 4,
              lg: 12,
            }}
            bg="#17181c"
            border="1px solid #414141ff"
            borderRadius="1.5rem"
            overflow="hidden"
            w={'50%'}
            flexWrap={{
              base: 'wrap',
              lg: 'nowrap',
            }}>
            {scores.map((item, index) => (
              <Box
                key={item.topic}
                borderRight={index < scores.length - 1 ? '1px solid' : 'none'}
                flex="1"
                px={6}
                py={5}
                textAlign={'center'}
                bg={item.topic === battle.winner ? '#17181c' : 'transparent'}>
                <Text color="#8d95a4" fontSize="lg">
                  {item.topic.toUpperCase()}
                </Text>

                <Text
                  mt={2}
                  fontSize={item.topic === battle.winner ? '2xl' : 'lg'}
                  fontWeight="700"
                  color={item.topic === battle.winner ? '#ff6b2c' : 'white'}>
                  {item.score.toFixed(2)}
                </Text>
              </Box>
            ))}
          </HStack>
          <BattleShare battle={battle} />
          <Text color="#8d95a4" fontSize="xs" textAlign="center" maxW="26rem">
            Battle summary is copied automatically for easy paste into social posts.
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
}
