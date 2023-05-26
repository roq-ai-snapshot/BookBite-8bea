import * as yup from 'yup';

export const inventoryValidationSchema = yup.object().shape({
  ingredient: yup.string().required(),
  quantity: yup.number().integer().required(),
  restaurant_id: yup.string().nullable().required(),
});
