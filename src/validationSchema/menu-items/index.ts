import * as yup from 'yup';
import { favoriteValidationSchema } from 'validationSchema/favorites';
import { orderItemValidationSchema } from 'validationSchema/order-items';

export const menuItemValidationSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().integer().required(),
  availability: yup.boolean().required(),
  menu_id: yup.string().nullable().required(),
  favorite: yup.array().of(favoriteValidationSchema),
  order_item: yup.array().of(orderItemValidationSchema),
});
