'use client';

import {Box, Text, VStack} from '@chakra-ui/react';
const YEAR = new Date().getFullYear();
export function Footer() {
  return (
    <Box as="footer" width="100%" py={8}>
      <VStack gap={2} align="center" justify="center" textAlign="center">
        <Text color="text" fontWeight={'600'} fontSize={'1.25rem'}>
          © {YEAR} Topic Battles. All rights reserved.
        </Text>
      </VStack>
    </Box>
  );
}
