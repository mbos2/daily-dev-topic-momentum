'use client';

import {Box, Container, HStack, Icon, Text} from '@chakra-ui/react';
import {Link} from '../link';
import {FaGithub} from 'react-icons/fa';

export function Navbar() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={12}
      py={4}
      bg="bg.canvas"
      borderBottomWidth="0.5px"
      borderBottomColor="#e9cbc2ff">
      <Container maxW="1400px">
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <HStack align="start" gap={12}>
            <Box>
              <Text fontWeight="bold" fontSize="2xl" color="text.primary">
                Topic Momentum
              </Text>
            </Box>

            <HStack gap={2} whiteSpace="nowrap">
              <Link href="/momentum" fontSize={'md'}>
                Momentum
              </Link>

              <Box color="text.primary" fontSize={'lg'}>
                |
              </Box>

              <Link
                href="/compare"
                variant="button"
                fontSize={'lg'}
                bg={'#FF8833'}
                _hover={{
                  boxShadow: '0px 0px 3px 3px rgba(255, 181, 128, 0.6)',
                }}>
                Compare
              </Link>
            </HStack>
          </HStack>

          <Box pt="2">
            <Icon size="lg" color="tomato">
              <FaGithub />
            </Icon>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
