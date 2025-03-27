import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Grid, Box, Text, Icon, Flex } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';

import Property from '../components/Property';
import SearchFilters from '../components/SearchFilters';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import noResult from '../assets/images/noresult.svg';

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Box maxWidth='1280px' m='auto' p='10'>
      <Flex
        onClick={() => setSearchFilters(!searchFilters)}
        cursor='pointer'
        bg='gray.100'
        borderBottom='1px'
        borderColor='gray.200'
        p='2'
        fontWeight='black'
        fontSize='lg'
        justifyContent='center'
        alignItems='center'
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft='2' w='7' as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}

      <Text fontSize='2xl' p='4' fontWeight='bold'>
        Properties {router.query.purpose}
      </Text>

      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={4}
        p={4}
      >
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Grid>

      {properties.length === 0 && (
        <Flex
          justifyContent='center'
          alignItems='center'
          flexDir='column'
          mt='5'
          mb='5'
        >
          <Image src={noResult} alt='No Result' />
          <Text fontSize='xl' mt='3'>
            No Result Found.
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits || [],
    },
  };
}

export default Search;
