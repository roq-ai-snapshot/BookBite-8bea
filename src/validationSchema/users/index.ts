import * as yup from 'yup';
import { favoriteValidationSchema } from 'validationSchema/favorites';
import { orderValidationSchema } from 'validationSchema/orders';
import { restaurantValidationSchema } from 'validationSchema/restaurants';
import { staffValidationSchema } from 'validationSchema/staff';

export const userValidationSchema = yup.object().shape({
  roq_user_id: yup.string().required(),
  tenant_id: yup.string().required(),
  favorite: yup.array().of(favoriteValidationSchema),
  order: yup.array().of(orderValidationSchema),
  restaurant: yup.array().of(restaurantValidationSchema),
  staff: yup.array().of(staffValidationSchema),
});
