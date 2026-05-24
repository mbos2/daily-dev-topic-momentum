import {Box, VStack} from '@chakra-ui/react';

import {MomentumArchiveSummary} from './momentum-archive-summary';
import {MomentumFeaturedBattle} from './momentum-featured-battle';
import {MomentumHero} from './momentum-hero';
import {MomentumPreviousBattles} from './momentum-previous-battles';
import {MomentumPageDto} from '@/app/lib/types/momentum';

interface Props {
  data: MomentumPageDto;
}

export function MomentumPage({data}: Props) {
  return (
    <Box width="100%">
      <VStack
        width="100%"
        align="stretch"
        gap={{
          base: 20,
          lg: 28,
        }}>
        <MomentumHero totalBattles={data.totalBattles} />
        <MomentumFeaturedBattle featured={data.featuredBattle} closest={data.closestBattle} />
        <MomentumArchiveSummary summary={data.summary} />
        <MomentumPreviousBattles battles={data.previousBattles} />
      </VStack>
    </Box>
  );
}
