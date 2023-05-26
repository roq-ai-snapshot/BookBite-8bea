import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getFavorites } from 'apiSdk/favorites';
import { FavoriteInterface } from 'interfaces/favorite';
import { Error } from 'components/error';

function FavoriteListPage() {
  const { data, error, isLoading } = useSWR<FavoriteInterface[]>(
    () => '/favorites',
    () =>
      getFavorites({
        relations: ['user', 'menu_item'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Favorite
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Favorite ID</Th>
                  <Th>Customer</Th>
                  <Th>Menu Item</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.user?.roq_user_id}</Td>
                    <Td>{record.menu_item?.name}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default FavoriteListPage;
