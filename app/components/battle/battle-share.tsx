'use client';

import {IconButton, HStack, Text, VStack} from '@chakra-ui/react';

import {FaFacebookF, FaLinkedinIn} from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6';

import type {BattleResponseDto} from '@/app/lib/types';

interface BattleShareProps {
  battle: BattleResponseDto;
}

function getBattleShareUrl(): string {
  const path = window.location.pathname;

  if (path.startsWith('/history/')) {
    return window.location.href;
  }

  return `${window.location.origin}/history`;
}

function buildShareText(battle: BattleResponseDto): string {
  const leaderboard = battle.topics
    .slice()
    .sort((left, right) => right.stats.engagement.score - left.stats.engagement.score)
    .map((topic, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';

      const winner = topic.stats.topic === battle.winner ? ' 🏆 WINNER' : '';

      return [
        `${medal} ${topic.stats.topic.toUpperCase()}${winner}`,
        `Momentum: ${topic.stats.engagement.score.toFixed(2)}`,
        `Articles: ${topic.stats.totalArticles}`,
        `Comments: ${topic.stats.totalComments}`,
        `Upvotes: ${topic.stats.totalUpvotes}`,
        `Read Time: ${topic.stats.totalReadTime}m`,
      ].join('\n');
    })
    .join('\n\n');

  const articles = battle.topics
    .map((topic) => {
      const article = topic.posts.slice().sort((left, right) => right.score - left.score)[0];

      if (!article) {
        return [`🔥 Top article — ${topic.stats.topic.toUpperCase()}`, 'No article available'].join('\n');
      }

      return [`🔥 Top article — ${topic.stats.topic.toUpperCase()}`, article.feedPost.title, article.feedPost.url].join(
        '\n',
      );
    })
    .join('\n\n');

  return [
    '⚔️ daily.dev Topic Battle',
    '',
    `Period: ${battle.range.toUpperCase()}`,
    '',
    leaderboard,
    '',
    `Top articles of the ${battle.range}`,
    articles,
    '',
    'See more stats',
    getBattleShareUrl(),
  ].join('\n');
}

function open(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}

function shareToX(battle: BattleResponseDto): void {
  open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(buildShareText(battle))}`);
}

function shareToLinkedin(battle: BattleResponseDto): void {
  const text = encodeURIComponent(buildShareText(battle));

  open(`https://www.linkedin.com/feed/?shareActive=true&text=${text}`);
}

function shareToFacebook(battle: BattleResponseDto): void {
  const quote = encodeURIComponent(buildShareText(battle));

  const url = encodeURIComponent(getBattleShareUrl());

  open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`);
}

export function BattleShare({battle}: BattleShareProps) {
  return (
    <VStack mt={10} gap={4}>
      <Text color="#8d95a4" fontSize="xs" letterSpacing="0.18em" textTransform="uppercase">
        Share Momentum
      </Text>

      <HStack gap={4}>
        <IconButton
          aria-label="linkedin"
          rounded="full"
          size="lg"
          bg="#15171d"
          border="1px solid"
          borderColor="#252933"
          onClick={() => shareToLinkedin(battle)}>
          <FaLinkedinIn />
        </IconButton>

        <IconButton
          aria-label="twitter"
          rounded="full"
          size="lg"
          bg="#15171d"
          border="1px solid"
          borderColor="#252933"
          onClick={() => shareToX(battle)}>
          <FaXTwitter />
        </IconButton>

        <IconButton
          aria-label="facebook"
          rounded="full"
          size="lg"
          bg="#15171d"
          border="1px solid"
          borderColor="#252933"
          onClick={() => shareToFacebook(battle)}>
          <FaFacebookF />
        </IconButton>
      </HStack>
    </VStack>
  );
}
