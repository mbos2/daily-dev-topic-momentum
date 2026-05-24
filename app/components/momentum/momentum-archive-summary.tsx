import type {MomentumSummaryCard} from '@/app/lib/types/momentum';
import {Box, Grid, Text, VStack} from '@chakra-ui/react';

interface Props {
  summary: readonly MomentumSummaryCard[];
}

interface SummaryCardProps {
  card: MomentumSummaryCard;
}

function SummaryCard({card}: SummaryCardProps) {
  return (
    <Box
      bg="#11141B"
      border="1px solid"
      borderColor="whiteAlpha.100"
      borderRadius="20px"
      minH={{
        base: '170px',
        lg: '190px',
      }}
      px={8}
      py={10}>
      <VStack h="100%" justify="center" gap={5}>
        <Text
          color="#B2BAC9"
          fontWeight="700"
          fontSize="11px"
          textTransform="uppercase"
          letterSpacing="0.18em"
          textAlign="center">
          {card.title}
        </Text>

        <Text
          color="#FF8F6A"
          fontWeight="900"
          lineHeight="1"
          textAlign="center"
          fontSize={{
            base: '44px',
            lg: '52px',
          }}>
          {card.value}
        </Text>

        <Text
          color="white"
          fontWeight="700"
          textAlign="center"
          fontSize={{
            base: '14px',
            lg: '16px',
          }}>
          {card.subtitle}
        </Text>
      </VStack>
    </Box>
  );
}

export function MomentumArchiveSummary({summary}: Props) {
  return (
    <Box width="100%">
      <Text
        color="white"
        mb={{
          base: 8,
          lg: 10,
        }}
        fontWeight="900"
        letterSpacing="-0.04em"
        fontSize={{
          base: '40px',
          lg: '56px',
        }}>
        ARCHIVE SUMMARY
      </Text>

      <Grid
        width="100%"
        gap={6}
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2,minmax(0,1fr))',
          lg: 'repeat(4,minmax(0,1fr))',
        }}>
        {summary.map((card) => (
          <SummaryCard key={card.title} card={card} />
        ))}
      </Grid>
    </Box>
  );
}
