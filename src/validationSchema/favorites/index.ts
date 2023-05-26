import * as yup from 'yup';

export const favoriteValidationSchema = yup.object().shape({
  customer_id: yup.string().nullable().required(),
  menu_item_id: yup.string().nullable().required(),
});
