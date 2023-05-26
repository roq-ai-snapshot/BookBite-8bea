import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getFavoriteById, updateFavoriteById } from 'apiSdk/favorites';
import { Error } from 'components/error';
import { favoriteValidationSchema } from 'validationSchema/favorites';
import { FavoriteInterface } from 'interfaces/favorite';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { UserInterface } from 'interfaces/user';
import { MenuItemInterface } from 'interfaces/menu-item';
import { getUsers } from 'apiSdk/users';
import { getMenuItems } from 'apiSdk/menu-items';

function FavoriteEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<FavoriteInterface>(() => `/favorites/${id}`, getFavoriteById);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: FavoriteInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateFavoriteById(id, values);
      mutate(updated);
      resetForm();
      router.push('/favorites');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<FavoriteInterface>({
    initialValues: data,
    validationSchema: favoriteValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Favorite
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'customer_id'}
              label={'Customer'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <AsyncSelect<MenuItemInterface>
              formik={formik}
              name={'menu_item_id'}
              label={'Menu Item'}
              placeholder={'Select Menu Item'}
              fetcher={getMenuItems}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default FavoriteEditPage;
