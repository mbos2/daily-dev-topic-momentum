import {Box, Flex, Heading, Text, VStack} from '@chakra-ui/react';

interface MomentumHeroProps {
  totalBattles: number;
}

export function MomentumHero({totalBattles}: MomentumHeroProps) {
  return (
    <Box
      pt={{
        base: 8,
        lg: 16,
      }}
      pb={{
        base: 12,
        lg: 20,
      }}>
      <Flex
        direction={{
          base: 'column',
          lg: 'row',
        }}
        gap={{
          base: 10,
          lg: 0,
        }}
        justify="space-between">
        <VStack align="start" gap={6} flex="1">
          <Heading
            color="white"
            fontWeight="900"
            letterSpacing="-0.05em"
            lineHeight="0.92"
            fontSize={{
              base: '48px',
              md: '72px',
            }}>
            MOMENTUM ARCHIVE
          </Heading>

          <Text
            maxW="560px"
            color="#A0A7B4"
            fontSize={{
              base: '16px',
              lg: '18px',
            }}
            lineHeight="1.8">
            A curated historical record of developer sentiment shifts, technological victories, and industry-defining
            showdowns.
          </Text>
        </VStack>

        <VStack
          align={{
            base: 'start',
            lg: 'end',
          }}
          gap={1}
          minW={{
            lg: '220px',
          }}>
          <Text color="#FF7A45" fontSize="11px" letterSpacing="0.22em" textTransform="uppercase" fontWeight="700">
            Total Verified Data
          </Text>

          <Text
            color="white"
            lineHeight="1"
            fontWeight="900"
            fontSize={{
              base: '72px',
              lg: '88px',
            }}>
            {totalBattles}
          </Text>

          <Text
            color="#B8C0CF"
            fontSize={{
              base: '18px',
              lg: '22px',
            }}>
            Battles Resolved
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}
