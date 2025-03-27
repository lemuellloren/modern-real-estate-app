'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Flex,
  Text,
  Avatar,
  Badge,
  Button,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import DefaultImage from '../assets/images/house.jpg';

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => (
  <Link href={`/property/${externalID}`} passHref>
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='md'
      transition='transform 0.2s ease-in-out'
      _hover={{ transform: 'scale(1.03)', boxShadow: 'lg' }}
      cursor='pointer'
    >
      <Box position='relative' width='100%' height='250px'>
        <Image
          src={coverPhoto ? coverPhoto.url : DefaultImage}
          alt='Property Image'
          layout='fill'
          objectFit='cover'
          quality={85}
        />
      </Box>

      <Box
        p={4}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        h='calc(100% - 220px)'
      >
        <Stack spacing={3} flex='1'>
          <Flex justify='space-between' align='center'>
            <Flex align='center'>
              {isVerified && (
                <Flex alignItems='center' mr='4'>
                  <GoVerified color='green' size='20px' />
                  <Badge px={2} ml={2}>
                    Verified
                  </Badge>
                </Flex>
              )}

              <Text fontWeight='bold' fontSize='lg'>
                AED {millify(price)}
                {rentFrequency && `/${rentFrequency}`}
              </Text>
            </Flex>
            <Avatar size='sm' src={agency?.logo?.url} />
          </Flex>

          <Flex align='center' fontSize='sm' color='blue.500' gap={3}>
            <Flex align='center' gap={1}>
              <FaBed /> {rooms}
            </Flex>
            <Flex align='center' gap={1}>
              <FaBath /> {baths}
            </Flex>
            <Flex align='center' gap={1}>
              <BsGridFill /> {millify(area)} sqft
            </Flex>
          </Flex>

          <Text fontSize='md' fontWeight='medium' noOfLines={2} minH='100px'>
            {title}
          </Text>
        </Stack>

        <Button
          w='full'
          bg='blue.500'
          color='white'
          _hover={{ bg: 'blue.600' }}
          size='sm'
          mt={3}
        >
          View Details
        </Button>
      </Box>
    </Box>
  </Link>
);

export default Property;
