'use client';

import {Box, HStack, Text, VStack} from '@chakra-ui/react';
import type {BattleResponseDto} from '@/app/lib/types';

interface BattleSharedArticlesProps {
  battle: BattleResponseDto;
}

export function BattleSharedArticles({battle}: BattleSharedArticlesProps) {
  return (
    <Box
      bg="linear-gradient(90deg,#16181d 0%,#191b20 100%)"
      border="1px solid #242933"
      borderRadius="2rem"
      overflow="hidden"
      px={{
        base: 6,
        lg: 10,
      }}
      py={{
        base: 7,
        lg: 8,
      }}>
      <HStack justify="space-between" align="center" flexWrap="wrap" gap={8}>
        <VStack align="start" gap={3} maxW="60rem">
          <Text
            fontWeight="800"
            fontSize={{
              base: '2xl',
              lg: '3xl',
            }}>
            Shared Articles
          </Text>

          <Text color="#9aa2b2" fontSize="2xl">
            Articles that appeared across multiple selected topics during this battle period.
          </Text>

          <Text color="#9aa2b2" fontSize="xl">
            Shared content contributes to overall momentum and highlights cross-topic relevance.
          </Text>
        </VStack>

        <HStack gap={8}>
          <HStack gap={-3}>
            {battle.topics.map((topic, index) => (
              <Box
                key={topic.stats.topic}
                w="3.75rem"
                h="3.75rem"
                borderRadius="full"
                border="2px solid"
                borderColor={index === 0 ? '#ff5a1f' : '#6d7380'}
                bg="#16181d"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontWeight="700">
                {topic.stats.topic.charAt(0).toUpperCase()}
              </Box>
            ))}
          </HStack>

          <VStack align="start" gap={0}>
            <Text
              fontWeight="900"
              fontSize={{
                base: '4xl',
                lg: '5xl',
              }}>
              {battle.sharedPosts}
            </Text>

            <Text color="#9aa2b2" textTransform="uppercase" letterSpacing="0.15em" fontSize="xs">
              Shared Articles
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </Box>
  );
}
