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
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createMenuItem } from 'apiSdk/menu-items';
import { Error } from 'components/error';
import { MenuItemInterface } from 'interfaces/menu-item';
import { menuItemValidationSchema } from 'validationSchema/menu-items';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { MenuInterface } from 'interfaces/menu';
import { getMenus } from 'apiSdk/menus';

function MenuItemCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MenuItemInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMenuItem(values);
      resetForm();
      router.push('/menu-items');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MenuItemInterface>({
    initialValues: {
      name: '',
      price: 0,
      availability: false,
      menu_id: null,
    },
    validationSchema: menuItemValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Menu Item
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="price" mb="4" isInvalid={!!formik.errors.price}>
            <FormLabel>Price</FormLabel>
            <NumberInput
              name="price"
              value={formik.values.price}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('price', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.price && <FormErrorMessage>{formik.errors.price}</FormErrorMessage>}
          </FormControl>
          <FormControl
            id="availability"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors.availability}
          >
            <FormLabel htmlFor="switch-availability">Availability</FormLabel>
            <Switch
              id="switch-availability"
              name="availability"
              onChange={formik.handleChange}
              value={formik.values.availability ? 1 : 0}
            />
            {formik.errors.availability && <FormErrorMessage>{formik.errors.availability}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<MenuInterface>
            formik={formik}
            name={'menu_id'}
            label={'Menu'}
            placeholder={'Select Menu'}
            fetcher={getMenus}
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
      </Box>
    </AppLayout>
  );
}

export default MenuItemCreatePage;
