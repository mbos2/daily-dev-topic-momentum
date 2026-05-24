'use client';

import {useEffect, useMemo, useState} from 'react';

import {Box, Button, HStack, Input, Spinner, Tag, Text, VStack} from '@chakra-ui/react';

import {IoCloseCircleSharp} from 'react-icons/io5';

import {getTags} from '@/app/lib/api/get-tags';

import {BattleResult} from '@/app/components/battle/battle-result';

import type {BattleResponseDto, DailyTag} from '@/app/lib/types';

const MIN_TOPICS = 2;
const FORM_SLOTS = 3;

function filterTags(tags: DailyTag[], query: string): DailyTag[] {
  const normalized = query.trim().toLowerCase();

  if (normalized.length === 0) {
    return tags;
  }

  return tags.filter((tag) => tag.name.toLowerCase().includes(normalized));
}

export function CreateBattleForm() {
  const [tags, setTags] = useState<DailyTag[]>([]);
  const [selected, setSelected] = useState<string[]>(['', '', '']);
  const [search, setSearch] = useState('');
  const [range, setRange] = useState<'day' | 'week' | 'month'>('week');
  const [loading, setLoading] = useState(false);
  const [battle, setBattle] = useState<BattleResponseDto | null>(null);

  async function replayBattle(): Promise<void> {
    await handleCompare();
  }

  function resetBattle(): void {
    setBattle(null);

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  function pickRandomTopics(tags: readonly DailyTag[]): string[] {
    const count = Math.random() < 0.5 ? 2 : 3;
    const shuffled = [...tags].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, count).map((tag) => tag.name);
  }

  async function handleRandomBattle(): Promise<void> {
    if (tags.length < 3) {
      return;
    }

    const randomTopics = pickRandomTopics(tags);

    setSelected(randomTopics);
    setLoading(true);

    try {
      const response = await fetch(`/api/battle?topics=${randomTopics.join(',')}&range=${range}`);

      if (!response.ok) {
        throw new Error('Battle failed');
      }

      const data = (await response.json()) as BattleResponseDto;

      setBattle(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function load() {
      const response = await getTags();

      setTags(response);
    }

    void load();
  }, []);

  function addTopic(value: string): void {
    setSelected((current) => {
      if (current.includes(value)) {
        return current;
      }

      const index = current.findIndex((item) => item === '');

      if (index === -1) {
        return current;
      }

      const next = [...current];
      next[index] = value;

      return next;
    });
  }

  function clearTopic(index: number): void {
    setSelected((current) => current.map((item, currentIndex) => (currentIndex === index ? '' : item)));
  }

  async function handleCompare(): Promise<void> {
    if (!canCompare) {
      return;
    }

    setLoading(true);

    try {
      const topics = selected.filter(Boolean).join(',');
      const response = await fetch(`/api/battle?topics=${topics}&range=${range}`);

      if (!response.ok) {
        throw new Error('Battle failed');
      }

      const data = (await response.json()) as BattleResponseDto;

      setBattle(data);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => filterTags(tags, search), [tags, search]);
  const selectedCount = selected.filter(Boolean).length;
  const canCompare = selectedCount >= MIN_TOPICS && selectedCount <= FORM_SLOTS;

  if (loading) {
    return (
      <VStack h="80vh" justify="center" gap={6}>
        <Spinner color="#ff4b0a" size="xl" />

        <Text color="white" fontSize="64px" fontWeight="700">
          Fetching your results
        </Text>

        <Text color="#8b8b96">Analyzing developer momentum...</Text>
      </VStack>
    );
  }

  if (battle) {
    return (
      <Box w="100%" px={0}>
        <BattleResult battle={battle} onReplay={replayBattle} onCompareAgain={resetBattle} />
      </Box>
    );
  }

  return (
    <VStack w="100%" pt="40px" pb="60px" px="30px" gap="40px" color="white">
      <VStack gap="14px">
        <Text fontSize="64px" lineHeight="1" fontWeight="700">
          Create a Topic Battle
        </Text>

        <Text color="#8f96a3" fontSize="20px">
          Select 2–3 developer topics and compare how momentum shifts over time.
        </Text>
      </VStack>

      <VStack gap="24px">
        <HStack gap="24px" flexWrap="wrap" justify="center">
          {selected.map((value, index) => (
            <Box
              key={index}
              w="22rem"
              h="8rem"
              px="2rem"
              py="1.5rem"
              display="grid"
              gridTemplateColumns="1fr auto"
              alignItems="center"
              gap="1rem"
              borderRadius="1.25rem"
              overflow="hidden"
              bg={value ? '#111319' : 'transparent'}
              border={value ? '1px solid #1b1e28' : '1px dashed #262a36'}>
              <Text
                fontSize="2rem"
                lineHeight="1.2"
                fontWeight="600"
                color={value ? '#fff' : '#8b8f99'}
                overflow="hidden"
                textOverflow="ellipsis"
                display="-webkit-box"
                css={{
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}>
                {value || '+ Pick Topic'}
              </Text>

              {value && (
                <Button
                  all="unset"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  flexShrink={0}
                  color="#aeb2bd"
                  fontSize="1.5rem"
                  onClick={() => clearTopic(index)}>
                  <IoCloseCircleSharp />
                </Button>
              )}
            </Box>
          ))}
        </HStack>

        <Box display="flex" flexDirection="column" alignItems="center" gap="1rem">
          <Text fontSize="0.875rem" color="#8f96a3" fontWeight="600" textTransform="uppercase" letterSpacing="0.12em">
            Select Period
          </Text>

          <HStack gap="0.75rem">
            {(['day', 'week', 'month'] as const).map((value) => (
              <Button
                key={value}
                all="unset"
                h="3rem"
                minW="6rem"
                px="1.5rem"
                borderRadius="999px"
                border="1px solid"
                borderColor={range === value ? '#ff5a1f' : '#232834'}
                bg={range === value ? '#21120b' : '#0e1118'}
                color={range === value ? '#ff9f76' : '#9098a8'}
                onClick={() => setRange(value)}>
                {value}
              </Button>
            ))}
          </HStack>
        </Box>
        <HStack w="full" gap={3} alignItems={'center'} justifyContent={'center'}>
          <Button
            h="76px"
            px="60px"
            borderRadius="14px"
            bg={canCompare ? '#ff4b0a' : '#2a2c34'}
            color="white"
            fontSize="28px"
            fontWeight="700"
            disabled={!canCompare}
            onClick={handleCompare}>
            Compare →
          </Button>

          <Button
            h="76px"
            px="60px"
            borderRadius="14px"
            bg={'#2a2c34'}
            color="white"
            fontSize="28px"
            fontWeight="700"
            onClick={handleRandomBattle}>
            Random Battle 🎲
          </Button>
        </HStack>
      </VStack>

      <Box w="100%" maxW="1200px">
        <HStack justify="space-between" mb="34px" align="end">
          <Box>
            <Text fontSize="42px" fontWeight="700">
              Browse Topics
            </Text>
            <Text color="#8b8f99">Click to add into selection.</Text>
          </Box>

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search developer topics..."
            w="360px"
            h="54px"
            bg="#0f1218"
            border="1px solid #1c2230"
            color="white"
          />
        </HStack>
        {filtered.length === 0 ? (
          <Box>
            <Text fontSize={'3xl'} textAlign={'center'}>
              Loading Topics <Spinner />
            </Text>
          </Box>
        ) : (
          <Box>
            {filtered.map((tag) => (
              <Tag.Root
                key={tag.name}
                display="inline-flex"
                cursor="pointer"
                m="8px"
                px="18px"
                py="10px"
                borderRadius="999px"
                bg={selected.includes(tag.name) ? '#241913' : '#0d1017'}
                border="1px solid"
                borderColor={selected.includes(tag.name) ? '#ff7d4a' : '#202636'}
                onClick={() => addTopic(tag.name)}>
                <Tag.Label color={selected.includes(tag.name) ? '#ffb28d' : '#ffffff'} fontSize="18px">
                  {tag.name}
                </Tag.Label>
              </Tag.Root>
            ))}
          </Box>
        )}
      </Box>
    </VStack>
  );
}
