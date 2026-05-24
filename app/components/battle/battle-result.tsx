'use client';

import {Stack} from '@chakra-ui/react';

import type {BattleResponseDto} from '@/app/lib/types';
import {BattleHero} from './battle-hero';
import {BattleTopicCards} from './battle-topic-cards';
import {BattleInsights} from './battle-insights';
import {BattleTopArticles} from './battle-top-articles';
import {BattleSharedArticles} from './battle-shared-articles';
import {BattleFinalVerdict} from './battle-final-verdict';

interface BattleResultProps {
  battle: BattleResponseDto;
  onReplay: () => void;
  onCompareAgain: () => void;
  hideVerdict?: boolean;
}

export function BattleResult({battle, hideVerdict, onReplay, onCompareAgain}: BattleResultProps) {
  console.log(battle);
  function handleReplay(): void {
    onReplay();
  }

  function handleCompareAgain(): void {
    onCompareAgain();
  }

  return (
    <Stack
      width="full"
      gap={{
        base: 10,
        lg: 16,
      }}
      px={{
        base: 4,
        md: 8,
        lg: 10,
      }}
      py={{
        base: 8,
        lg: 10,
      }}
      color="white"
      bg="#090b11">
      <BattleHero battle={battle} />
      <BattleTopicCards battle={battle} />
      <BattleInsights battle={battle} />
      {/* {hasPosts && <BattleTopArticles battle={battle} />} */}
      {<BattleTopArticles battle={battle} />}
      <BattleSharedArticles battle={battle} />
      {!hideVerdict && (
        <BattleFinalVerdict battle={battle} onReplay={handleReplay} onCompareAgain={handleCompareAgain} />
      )}
    </Stack>
  );
}
