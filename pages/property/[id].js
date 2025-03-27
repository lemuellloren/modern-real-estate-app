import millify from 'millify';
import { Box, Flex, Grid, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

import { baseUrl, fetchApi } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => (
  <Box maxWidth='1280px' m='auto' p='10'>
    {photos && <ImageScrollbar data={photos} alt={title} />}
    <Box w='full' py='6'>
      <Flex paddingTop='2' alignItems='center'>
        <Box paddingRight='3' color='green.400'>
          {isVerified && <GoVerified />}
        </Box>
        <Text fontWeight='bold' fontSize='lg'>
          AED {price} {rentFrequency && `/${rentFrequency}`}
        </Text>
        <Avatar size='sm' src={agency?.logo?.url} ml='auto' />
      </Flex>
      <Flex
        alignItems='center'
        p='1'
        justifyContent='space-between'
        w='250px'
        color='blue.400'
      >
        {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{' '}
        <BsGridFill />
      </Flex>
    </Box>

    <Box marginTop='2'>
      <Text fontSize='lg' marginBottom='2' fontWeight='bold'>
        {title}
      </Text>
      <Box
        lineHeight='2'
        color='gray.600'
        p='6'
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Box>

    <Flex
      flexWrap='wrap'
      justifyContent='space-between'
      borderBottom='1px'
      borderColor='gray.100'
      p='3'
    >
      <Text>Type</Text>
      <Text fontWeight='bold'>{type}</Text>
    </Flex>
    <Flex
      flexWrap='wrap'
      justifyContent='space-between'
      borderBottom='1px'
      borderColor='gray.100'
      p='3'
    >
      <Text>Purpose</Text>
      <Text fontWeight='bold'>{purpose}</Text>
    </Flex>
    {furnishingStatus && (
      <Flex
        flexWrap='wrap'
        justifyContent='space-between'
        borderBottom='1px'
        borderColor='gray.100'
        p='3'
      >
        <Text>Furnishing Status</Text>
        <Text fontWeight='bold'>{furnishingStatus}</Text>
      </Flex>
    )}

    <Box>
      {amenities.length > 0 && (
        <Text fontSize='2xl' fontWeight='black' marginTop='5'>
          Facilities:
        </Text>
      )}
      <Grid
        templateColumns={{
          base: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={4}
        mt={2}
      >
        {amenities?.map((item) =>
          item?.amenities?.map((amenity) => (
            <Flex
              key={amenity.text}
              align='center'
              justify='center'
              p='2'
              bg='gray.200'
              borderRadius='5'
              textAlign='center'
              fontWeight='bold'
              color='blue.400'
              fontSize='lg'
            >
              {amenity.text}
            </Flex>
          ))
        )}
      </Grid>
    </Box>
  </Box>
);

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}
