'use client';

import {useState} from 'react';

import {Box, Button, Table, Text, VStack} from '@chakra-ui/react';

import type {BattleResponseDto} from '@/app/lib/types';
import {Link} from '../link';

const STEP = 3;

interface BattleTopArticlesProps {
  battle: BattleResponseDto;
}

export function BattleTopArticles({battle}: BattleTopArticlesProps) {
  const topics = battle.topics.filter((topic) => topic.posts?.length > 0);

  if (topics.length === 0) {
    return null;
  }

  return (
    <VStack align="stretch" gap={12}>
      {topics.map((topic) => (
        <TopicTable key={topic.stats.topic} topic={topic} />
      ))}
    </VStack>
  );
}

function TopicTable({topic}: {topic: BattleResponseDto['topics'][number]}) {
  const [visible, setVisible] = useState(STEP);

  const rows = topic.posts.slice().sort((left, right) => right.score - left.score);

  return (
    <VStack align="stretch" gap={5}>
      <Text
        fontWeight="800"
        fontSize={{
          base: '2xl',
          lg: '4xl',
        }}>
        {capitalize(topic.stats.topic)}: Top {Math.min(visible, rows.length)} Articles
      </Text>

      <Box overflowX="auto" bg="#15171d" border="1px solid #252933" borderRadius="2rem">
        <Table.Root variant="outline" minW="64rem">
          <Table.Header>
            <Table.Row borderBottom="1px solid #252933">
              <Header>Rank</Header>
              <Header>Title</Header>
              <Header>Source</Header>
              <Header numeric>Comments</Header>
              <Header numeric>Upvotes</Header>
              <Header numeric>Momentum</Header>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rows.slice(0, visible).map((post, index) => (
              <ArticleRow key={post.feedPost.id} rank={index + 1} post={post} />
            ))}
          </Table.Body>
        </Table.Root>

        {visible < rows.length && (
          <Box p={5}>
            <Button
              w="full"
              fontSize={'xl'}
              h="4rem"
              borderRadius="16px"
              bg="transparent"
              color="white"
              border="1px solid #252933"
              _hover={{
                bg: '#1b1e25',
              }}
              onClick={() => setVisible((current) => current + STEP)}>
              LOAD MORE
            </Button>
          </Box>
        )}
      </Box>
    </VStack>
  );
}

function ArticleRow({
  rank,
  post,
}: {
  rank: number;

  post: BattleResponseDto['topics'][number]['posts'][number];
}) {
  return (
    <Table.Row borderBottom="1px solid #22252d" h="7rem">
      <Table.Cell px={8} py={7} verticalAlign="middle">
        <Text color="#ff6b2c" fontWeight="700" fontSize="lg">
          {rank}
        </Text>
      </Table.Cell>

      <Table.Cell px={8} py={7} verticalAlign="middle">
        <Link href={post.feedPost.url} target="_blank" rel="noopener noreferrer">
          <Text
            color="white"
            fontWeight="700"
            fontSize="lg"
            lineHeight="1.6"
            maxW="44rem"
            _hover={{
              color: '#ff6b2c',
            }}
            transition="200ms">
            {post.feedPost.title}
          </Text>
        </Link>
      </Table.Cell>

      <Table.Cell px={8} py={7} verticalAlign="middle">
        <Link href={post.feedPost.url} target="_blank" rel="noopener noreferrer">
          <Text
            color="#9aa2b2"
            fontSize="md"
            _hover={{
              color: 'white',
            }}
            transition="200ms">
            {post.feedPost.source?.name ?? 'Unknown'}
          </Text>
        </Link>
      </Table.Cell>

      <Table.Cell px={8} py={7} textAlign="right" verticalAlign="middle">
        <Text color="white" fontWeight="700">
          {post.feedPost.numComments}
        </Text>
      </Table.Cell>

      <Table.Cell px={8} py={7} textAlign="right" verticalAlign="middle">
        <Text color="white" fontWeight="700">
          {post.feedPost.numUpvotes}
        </Text>
      </Table.Cell>

      <Table.Cell px={8} py={7} textAlign="right" verticalAlign="middle">
        <Text color="#ff6b2c" fontWeight="800" fontSize="xl">
          {post.score.toFixed(0)}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
}

function Header({
  children,
  numeric,
}: {
  children: string;

  numeric?: boolean;
}) {
  return (
    <Table.ColumnHeader
      px={8}
      py={8}
      textAlign={numeric ? 'right' : 'left'}
      color="#8d95a4"
      fontWeight="700"
      fontSize="0.72rem"
      letterSpacing="0.18em"
      textTransform="uppercase">
      {children}
    </Table.ColumnHeader>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
