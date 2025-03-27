import { useEffect, useState } from "react";
import {
  Grid,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import Image from "next/image";

import { filterData, getFilterValues } from "../utils/filterData";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import noresult from "../assets/images/noresult.svg";

export default function SearchFilters() {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query: query });
  };

  useEffect(() => {
    if (searchTerm !== "") {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(
          `${baseUrl}/auto-complete?query=${searchTerm}`
        );
        setLoading(false);
        setLocationData(data?.hits);
      };

      fetchData();
    }
  }, [searchTerm]);

  return (
    <Box maxW="1280px" mx="auto" p="4">
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={4}
      >
        {filters?.map((filter) => (
          <Box key={filter.queryName} w="full">
            <Select
              onChange={(e) =>
                searchProperties({ [filter.queryName]: e.target.value })
              }
              placeholder={filter.placeholder}
              w="full"
            >
              {filter?.items?.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
        ))}
 
      </Grid>
      <Box w="full" mt={4}>
          <Button
            onClick={() => setShowLocations(!showLocations)}
            border="1px"
            borderColor="gray.200"
            w="full"
          >
            Search Location
          </Button>
          {showLocations && (
            <Box mt={2} w="full">
              <Input
                placeholder="Type Here"
                value={searchTerm}
                w="full"
                focusBorderColor="gray.300"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm !== "" && (
                <Icon
                  as={MdCancel}
                  pos="absolute"
                  cursor="pointer"
                  right="5"
                  top="5"
                  zIndex="100"
                  onClick={() => setSearchTerm("")}
                />
              )}
              {loading && <Spinner margin="auto" marginTop="3" />}
              <Box height="300px" overflow="auto">
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties({
                        locationExternalIDs: location.externalID,
                      });
                      setShowLocations(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <Text
                      cursor="pointer"
                      bg="gray.200"
                      p="2"
                      borderBottom="1px"
                      borderColor="gray.100"
                    >
                      {location.name}
                    </Text>
                  </Box>
                ))}
                {!loading && !locationData?.length && (
                  <Box textAlign="center" mt={5} mb={5}>
                    <Image src={noresult} alt="No Result" />
                    <Text fontSize="xl" mt={3}>
                      Waiting to search!
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>
    </Box>
  );
}
