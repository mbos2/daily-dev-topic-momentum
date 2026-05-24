'use client';

import {Button, HStack, Text, VStack} from '@chakra-ui/react';

import type {BattleResponseDto} from '@/app/lib/types';

interface BattleFinalVerdictProps {
  battle: BattleResponseDto;
  onReplay: () => void;
  onCompareAgain: () => void;
}

export function BattleFinalVerdict({battle, onReplay, onCompareAgain}: BattleFinalVerdictProps) {
  const winner = battle.topics.find((topic) => topic.stats.topic === battle.winner);

  return (
    <VStack
      py={{
        base: 14,
        lg: 20,
      }}
      gap={8}>
      <Text color="#ff5a1f" fontWeight="700" letterSpacing="0.18em" textTransform="uppercase">
        Final Verdict
      </Text>

      <Text
        textAlign="center"
        fontWeight="900"
        lineHeight="0.95"
        fontSize={{
          base: '4xl',
          md: '7xl',
        }}>
        {battle.winner.toUpperCase()}
      </Text>

      <Text
        textAlign="center"
        color="#a0a8b8"
        maxW="42rem"
        fontSize={{
          base: 'lg',
          lg: '2xl',
        }}>
        achieved the strongest topic momentum with{' '}
        <Text as="span" color="#ff5a1f" fontWeight="800">
          {winner?.stats.engagement.score.toFixed(2)}
        </Text>
      </Text>

      <HStack
        pt={4}
        gap={4}
        flexDirection={{
          base: 'column',
          md: 'row',
        }}
        w="full"
        maxW="48rem">
        <Button
          flex={{
            base: 'unset',
            md: 1,
          }}
          w={{
            base: '100%',
            md: 'auto',
          }}
          h={{
            base: '3.5rem',
            md: '4.5rem',
          }}
          bg="#ff5a1f"
          color="white"
          borderRadius="1rem"
          fontSize={{
            base: '1.125rem',
            md: '1.6rem',
          }}
          onClick={onReplay}>
          Replay Battle
        </Button>

        <Button
          flex={{
            base: 'unset',
            md: 1,
          }}
          w={{
            base: '100%',
            md: 'auto',
          }}
          h={{
            base: '3.5rem',
            md: '4.5rem',
          }}
          variant="outline"
          borderColor="#252933"
          color="white"
          borderRadius="1rem"
          fontSize={{
            base: '1.125rem',
            md: '1.6rem',
          }}
          _hover={{
            color: '#ff5a1f',
          }}
          onClick={onCompareAgain}>
          Compare Again
        </Button>
      </HStack>
    </VStack>
  );
}
