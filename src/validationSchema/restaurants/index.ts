import * as yup from 'yup';
import { inventoryValidationSchema } from 'validationSchema/inventories';
import { menuValidationSchema } from 'validationSchema/menus';
import { orderValidationSchema } from 'validationSchema/orders';
import { staffValidationSchema } from 'validationSchema/staff';

export const restaurantValidationSchema = yup.object().shape({
  name: yup.string().required(),
  owner_id: yup.string().nullable().required(),
  inventory: yup.array().of(inventoryValidationSchema),
  menu: yup.array().of(menuValidationSchema),
  order: yup.array().of(orderValidationSchema),
  staff: yup.array().of(staffValidationSchema),
});
