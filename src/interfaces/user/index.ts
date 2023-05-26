import { FavoriteInterface } from 'interfaces/favorite';
import { OrderInterface } from 'interfaces/order';
import { RestaurantInterface } from 'interfaces/restaurant';
import { StaffInterface } from 'interfaces/staff';

export interface UserInterface {
  id?: string;
  roq_user_id: string;
  tenant_id: string;
  favorite?: FavoriteInterface[];
  order?: OrderInterface[];
  restaurant?: RestaurantInterface[];
  staff?: StaffInterface[];

  _count?: {
    favorite?: number;
    order?: number;
    restaurant?: number;
    staff?: number;
  };
}
