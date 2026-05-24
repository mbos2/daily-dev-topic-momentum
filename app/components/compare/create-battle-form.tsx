'use client';

import {useEffect, useMemo, useState} from 'react';
import {Box, Button, HStack, Input, Spinner, Stack, Tag, Text, VStack} from '@chakra-ui/react';
import {IoCloseCircleSharp} from 'react-icons/io5';
import {getTags} from '@/app/lib/api/get-tags';
import {BattleResult} from '@/app/components/battle/battle-result';
import type {BattleResponseDto, DailyTag} from '@/app/lib/types';
import {getBattle} from '@/app/lib/api/get-battle';
import {Tooltip} from '../general/tooltip';

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
      const data = await getBattle({
        topics: randomTopics,
        range,
      });

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
      const data = await getBattle({
        topics: selected.filter(Boolean),
        range,
      });

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

        <Text
          color="white"
          fontWeight="700"
          textAlign="center"
          fontSize={{
            base: '2rem',
            md: '64px',
          }}>
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
    <VStack
      w="100%"
      maxW="100%"
      pt={{
        base: 8,
        lg: 10,
      }}
      pb={{
        base: 12,
        lg: 16,
      }}
      px={{
        base: 4,
        md: 8,
      }}
      gap={10}>
      <VStack gap={4} maxW="100%" align="center">
        <Text
          color={'#ff7d4a'}
          fontWeight={'600'}
          fontSize={{
            base: '2rem',
            md: '4rem',
            lg: '5rem',
          }}
          lineHeight="0.9"
          maxW="100%"
          textAlign="center"
          wordBreak="break-word">
          Create a Topic Battle
        </Text>

        <Text
          color="#8f96a3"
          fontSize={{
            base: '1rem',
            md: '1.25rem',
          }}
          textAlign="center"
          maxW="34rem">
          Select 2 - 3 developer topics and compare how momentum shifts over time.
        </Text>
      </VStack>

      <VStack gap="24px">
        <Stack
          direction={{
            base: 'column',
            md: 'row',
          }}
          width="100%"
          gap={3}
          align="center"
          justify="center">
          {selected.map((value, index) => (
            <Box
              key={index}
              w={{
                base: '100%',
                xl: '22rem',
              }}
              maxW="100%"
              minH={{
                base: '6rem',
                lg: '8rem',
              }}
              h="auto"
              px={{
                base: '1.25rem',
                lg: '2rem',
              }}
              py={{
                base: '1rem',
                lg: '1.5rem',
              }}
              display="grid"
              gridTemplateColumns="1fr auto"
              alignItems="center"
              gap="1rem"
              borderRadius="1.25rem"
              overflow="hidden"
              bg={value ? '#111319' : 'transparent'}
              border={value ? '1px solid #1b1e28' : '1px dashed #262a36'}>
              <Text
                fontSize={{
                  base: '1.75rem',
                  lg: '1.2rem',
                }}
                textAlign={'center'}
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
                {!value && 'Choose topic bellow'}
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
        </Stack>

        <Box display="flex" flexDirection="column" alignItems="center" gap="1rem">
          <Text fontSize="0.875rem" color="#8f96a3" fontWeight="600" textTransform="uppercase" letterSpacing="0.12em">
            Select Period
          </Text>

          <HStack gap="0.75rem" flexWrap="wrap" justify="center">
            {(['day', 'week', 'month'] as const).map((value) => (
              <Button
                key={value}
                all="unset"
                h="3rem"
                minW={{
                  base: '5rem',
                  md: '6rem',
                }}
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
        <Stack
          display={'flex'}
          direction={{
            base: 'column',
            md: 'row',
          }}
          w="100%"
          gap={3}
          alignItems={'center'}
          justifyContent={'center'}>
          <Tooltip content={'Choose at least 2 topics to compare'} showArrow positioning={{placement: 'bottom'}}>
            <Button
              h={{
                base: '3rem',
                md: '4.75rem',
              }}
              w={{
                base: '12rem',
                md: 'auto',
              }}
              px={{
                base: 6,
                md: 15,
              }}
              fontSize={{
                base: '1.25rem',
                md: '1.75rem',
              }}
              borderRadius="14px"
              bg={canCompare ? '#ff4b0a' : '#2a2c34'}
              color="white"
              fontWeight="700"
              disabled={!canCompare}
              onClick={handleCompare}>
              Compare →
            </Button>
          </Tooltip>

          <Button
            h={{
              base: '3rem',
              md: '4.75rem',
            }}
            w={{
              base: '12rem',
              md: 'auto',
            }}
            px={{
              base: 6,
              md: 15,
            }}
            fontSize={{
              base: '1.25rem',
              md: '1.45rem',
            }}
            borderRadius="14px"
            bg={'#2a2c34'}
            color="white"
            fontWeight="700"
            onClick={handleRandomBattle}>
            Random Battle 🎲
          </Button>
        </Stack>
      </VStack>

      <Box w="100%" maxW="1200px">
        <Stack
          direction={{
            base: 'column',
            lg: 'row',
          }}
          justify="space-between"
          mb="34px"
          align={{
            base: 'stretch',
            lg: 'end',
          }}
          gap={4}>
          <Box>
            <Text
              fontSize={{
                base: '2rem',
                lg: '42px',
              }}
              fontWeight="700"
              color={'#ff7d4a'}>
              Browse Topics
            </Text>
            <Text color="rgba(139, 143, 153, 1)">Click to add into selection.</Text>
          </Box>

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search developer topics..."
            w={{
              base: '100%',
              lg: '360px',
            }}
            h="54px"
            bg="#0f1218"
            border="1px solid #1c2230"
            color="white"
          />
        </Stack>
        {filtered.length === 0 ? (
          <Box>
            <Text fontSize={'3xl'} textAlign={'center'}>
              Loading Topics <Spinner />
            </Text>
          </Box>
        ) : (
          <Box display="flex" flexWrap="wrap" gap="0.75rem">
            {filtered.map((tag) => (
              <Tag.Root key={tag.name} asChild>
                <Box
                  as="button"
                  cursor="pointer"
                  px="1.125rem"
                  h="3rem"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="5px"
                  bg="#07080d"
                  border="1px solid"
                  borderColor={selected.includes(tag.name) ? '#ff7d4a' : '#202636'}
                  boxShadow={selected.includes(tag.name) ? '0px 0px 5px 2px rgba(255,125,74,1)' : ''}
                  flexShrink={0}
                  onClick={() => addTopic(tag.name)}>
                  <Tag.Label
                    color={selected.includes(tag.name) ? '#f0cbbaff' : '#ff7d4a'}
                    fontSize="1.125rem"
                    lineHeight="1">
                    {tag.name}
                  </Tag.Label>
                </Box>
              </Tag.Root>
            ))}
          </Box>
        )}
      </Box>
    </VStack>
  );
}
