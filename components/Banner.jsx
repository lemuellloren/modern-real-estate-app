import Link from "next/link";

import { Flex, Box, Text, Button, Heading } from '@chakra-ui/react';

const Banner = () => {
  return (
    <Box
      position='relative'
      bgImage="url('/images/hero-ng-main.jpg')"
      bgRepeat='no-repeat'
      bgSize='cover'
      height={{ base: '20rem', lg: '50rem' }}
      p={6}
    >
      <Box maxW='64rem' py={{ base: '2rem', lg: '8rem' }}>
        <Box mb='4' maxW='42rem'>
          <Heading
            as='h2'
            fontSize={{ base: '2xl', lg: '4xl' }}
            mb='4'
            color='white'
          >
            Find Your Perfect Home
          </Heading>
          <Text fontSize='xl' color='white'>
            Rent or Buy? Discover Your Home.
          </Text>
        </Box>

        <Flex
          gap={4}
          alignItems='center'
          pt={6}
        >
          <Link href='/search?purpose=for-rent' passHref>
            <Button
              fontSize='xl'
              bg='blue.500'
              color='white'
            >
              Explore Renting
            </Button>
          </Link>
          <Link href='/search?purpose=for-sale' passHref>
            <Button
              fontSize='xl'
              bg='black'
              color='white'
            >
              Explore Buying
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default Banner;