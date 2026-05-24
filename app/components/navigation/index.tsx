'use client';

import type {PropsWithChildren} from 'react';

import {Box, Container, Grid} from '@chakra-ui/react';

import {Navbar} from './navbar';

export function NavigationShell({children}: PropsWithChildren) {
  return (
    <Grid minH="100dvh" templateRows="auto 1fr" bg="#07080d">
      <Box width="100%" bg="#07080d">
        <Navbar />
      </Box>

      <Box width="100%" bg="#07080d">
        <Container
          maxW="1400px"
          px={{
            base: 6,
            md: 8,
            lg: 12,
          }}
          height="100%">
          {children}
        </Container>
      </Box>
    </Grid>
  );
}
