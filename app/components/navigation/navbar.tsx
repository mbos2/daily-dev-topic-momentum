'use client';

import {
  Box,
  Container,
  HStack,
  Icon,
  Text,
  Drawer,
  Button,
  CloseButton,
  Portal,
  VStack,
  Separator,
} from '@chakra-ui/react';
import {Link} from '../link';
import {FaGithub} from 'react-icons/fa';
import {MdMenuOpen} from 'react-icons/md';

export function Navbar() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{base: 0, md: 12}}
      py={4}
      bg="bg.canvas"
      borderBottomWidth="0.5px"
      borderBottomColor="#e9cbc2ff">
      <Container maxW="1400px">
        <Box display="flex" alignItems="flex-start" justifyContent={'space-between'}>
          <HStack align="start" gap={12}>
            <Box>
              <Text fontWeight="bold" fontSize="2xl" color="text.primary">
                Topic Momentum
              </Text>
            </Box>

            <HStack gap={2} whiteSpace="nowrap" display={{base: 'none', md: 'flex'}}>
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

          <Drawer.Root closeOnInteractOutside={false} modal={false} preventScroll={true} size={'full'}>
            <Drawer.Trigger asChild display={{base: 'block', md: 'none'}}>
              <Button variant="outline" size="lg" color={'white'}>
                <MdMenuOpen />
              </Button>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Positioner pointerEvents="none">
                <Drawer.Content>
                  <Drawer.Header color={'#FF8833'}>
                    <Drawer.Title>Momentum Menu</Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body>
                    <Separator color={'white'} />
                    <VStack mt={8} gap={8} alignItems={'flex-start'} justifyContent={'left'}>
                      <Link href="/momentum" fontSize={'xl'} textDecor={'underline'}>
                        Momentum
                      </Link>
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
                    </VStack>
                  </Drawer.Body>
                  <Drawer.Footer alignItems={'flex-start'}>
                    <Link
                      href="https://github.com/mbos2/daily-dev-topic-pulse"
                      variant="button"
                      fontSize={'lg'}
                      bg={'#deb293ff'}
                      _hover={{
                        boxShadow: '0px 0px 3px 3px rgba(255, 181, 128, 0.6)',
                      }}>
                      <Box display={'flex'} gap={4} alignItems={'center'} justifyItems={'center'}>
                        <Box>Find this project on </Box>
                        <Box>
                          <FaGithub />
                        </Box>
                      </Box>
                    </Link>
                  </Drawer.Footer>
                  <Drawer.CloseTrigger asChild color={'white'}>
                    <CloseButton size="lg" />
                  </Drawer.CloseTrigger>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>

          <Box display={{base: 'none', md: 'flex'}}>
            <Link
              href="https://github.com/mbos2/daily-dev-topic-pulse"
              variant="button"
              fontSize={'lg'}
              bg={'#eb9456ff'}
              _hover={{
                boxShadow: '0px 0px 3px 3px rgba(255, 181, 128, 0.6)',
              }}>
              <Box display={'flex'} gap={2} alignItems={'center'} justifyItems={'center'}>
                <Box>GITHUB</Box>
                <Box>
                  <FaGithub />
                </Box>
              </Box>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
