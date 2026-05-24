'use client';

import type {PropsWithChildren} from 'react';

import {Box, Container, Grid} from '@chakra-ui/react';

import {Navbar} from './navbar';
import {Footer} from '../general/footer';

export function NavigationShell({children}: PropsWithChildren) {
  return (
    <Grid minH="100dvh" templateRows="auto 1fr auto" bg="#07080d">
      <Box width="100%" bg="#07080d">
        <Navbar />
      </Box>

      <Box width="100%" bg="#07080d">
        <Container py={8} height="100%">
          {children}
        </Container>
      </Box>

      <Box width="100%" bg="bg.canvas">
        <Container height="100%">
          <Footer />
        </Container>
      </Box>
    </Grid>
  );
}
