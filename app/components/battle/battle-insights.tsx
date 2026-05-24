'use client';

import {Box, Grid, HStack, Text, VStack} from '@chakra-ui/react';
import {FaArrowTrendUp} from 'react-icons/fa6';
import type {BattleResponseDto} from '@/app/lib/types';

interface Props {
  battle: BattleResponseDto;
}

interface InsightCardProps {
  title: string;
  children: React.ReactNode;
  footer?: string;
}

function InsightCard({title, children, footer}: InsightCardProps) {
  return (
    <Box
      bg="#15171d"
      border="1px solid #252933"
      borderRadius="2rem"
      p={{
        base: 8,
        lg: 9,
      }}
      minH={{
        base: 'auto',
        lg: '26.25rem',
      }}>
      <VStack
        align="stretch"
        h={{
          base: 'auto',
          lg: '100%',
        }}
        gap={{
          base: 6,
          lg: 10,
        }}>
        <Text color="#8d95a4" fontSize="14px" letterSpacing="0.18em" textTransform="uppercase">
          {title}
        </Text>

        <Box flex="1">{children}</Box>

        {footer && (
          <Text color="#8d95a4" fontSize="lg">
            {footer}
          </Text>
        )}
      </VStack>
    </Box>
  );
}

function VictoryMargin({battle}: Props) {
  const sorted = [...battle.topics].sort((a, b) => b.stats.engagement.score - a.stats.engagement.score);

  const winner = sorted[0];
  const second = sorted[1];

  const margin = winner && second ? (winner.stats.engagement.score - second.stats.engagement.score).toFixed(2) : '0.00';

  return (
    <InsightCard
      title="Victory Margin"
      footer={`${winner?.stats.topic.toUpperCase() ?? '-'} leads over ${second?.stats.topic.toUpperCase() ?? '-'}`}>
      <Box>
        <Text
          fontWeight="900"
          fontSize={{
            base: '3.125rem',
          }}>
          +{margin}
        </Text>

        <Box
          mt={{
            base: 4,
            lg: 8,
          }}
          fontSize={{
            base: '3.5rem',
            lg: '7.625rem',
          }}>
          <FaArrowTrendUp />
        </Box>
      </Box>
    </InsightCard>
  );
}

function MetricRows({
  rows,
}: {
  rows: {
    topic: string;
    value: string;
  }[];
}) {
  return (
    <VStack align="stretch" gap={0}>
      {rows.map((row, index) => (
        <HStack
          key={row.topic}
          py={5}
          justify="space-between"
          borderBottom={index !== rows.length - 1 ? '1px solid #252933' : undefined}>
          <Text fontWeight="800" textTransform="uppercase">
            {row.topic}
          </Text>

          <Text fontWeight="800">{row.value}</Text>
        </HStack>
      ))}
    </VStack>
  );
}

function ContentEfficiency({battle}: Props) {
  const rows = battle.topics.map((topic) => ({
    topic: topic.stats.topic,
    value: topic.stats.totalArticles > 0 ? (topic.stats.engagement.score / topic.stats.totalArticles).toFixed(1) : '0',
  }));

  return (
    <InsightCard title="Content Efficiency" footer="Engagement momentum generated per article.">
      <MetricRows rows={rows} />
    </InsightCard>
  );
}

function ArticleDominance({battle}: Props) {
  const total = battle.topics.reduce((sum, topic) => sum + topic.stats.totalArticles, 0);

  const rows = battle.topics.map((topic) => ({
    topic: topic.stats.topic,
    value: `${total > 0 ? ((topic.stats.totalArticles / total) * 100).toFixed(1) : '0'}%`,
  }));

  return (
    <InsightCard title="Article Dominance" footer="Share of total analyzed articles.">
      <MetricRows rows={rows} />
    </InsightCard>
  );
}

export function BattleInsights({battle}: Props) {
  return (
    <VStack width="100%" align="stretch" gap={8}>
      <Text
        fontWeight="900"
        fontSize={{
          base: '4xl',
          lg: '5xl',
        }}>
        Battle Insights
      </Text>

      <Grid
        gap={6}
        templateColumns={{
          base: '1fr',
          lg: 'repeat(3,minmax(0,1fr))',
        }}>
        <VictoryMargin battle={battle} />

        <ContentEfficiency battle={battle} />

        <ArticleDominance battle={battle} />
      </Grid>
    </VStack>
  );
}
