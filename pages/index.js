import { Box, Heading, Grid, Button } from '@chakra-ui/react';
import Property from '../components/Property';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Banner from '../components/Banner';
import Link from 'next/link';

const Home = ({ propertiesForSale, propertiesForRent }) => (
  <Box>
    <Banner />
    <Box maxWidth='1280px' m='auto' p='10'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb='10'
      >
        <Heading as='h3' size='lg'>
          Browse Rentals
        </Heading>
        <Link href='/search?purpose=for-rent' passHref>
          <Button colorScheme='blue'>See more</Button>
        </Link>
      </Box>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={4}
      >
        {propertiesForRent?.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Grid>
    </Box>

    <Box maxWidth='1280px' m='auto' p='10'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb='10'
      >
        <Heading as='h3' size='lg'>
          Browse Listings
        </Heading>
        <Link href='/search?purpose=for-sale' passHref>
          <Button colorScheme='blue'>See more</Button>
        </Link>
      </Box>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={4}
      >
        {propertiesForSale?.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Grid>
    </Box>
  </Box>
);

export async function getStaticProps() {
  try {
    const propertyForSale = await fetchApi(
      `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
    );
    const propertyForRent = await fetchApi(
      `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
    );

    return {
      props: {
        propertiesForSale: propertyForSale?.hits || [],
        propertiesForRent: propertyForRent?.hits || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching properties:', error);
    return {
      props: {
        propertiesForSale: [],
        propertiesForRent: [],
      },
    };
  }
}

export default Home;
