import { InventoryInterface } from 'interfaces/inventory';
import { MenuInterface } from 'interfaces/menu';
import { OrderInterface } from 'interfaces/order';
import { StaffInterface } from 'interfaces/staff';
import { UserInterface } from 'interfaces/user';

export interface RestaurantInterface {
  id?: string;
  name: string;
  owner_id: string;
  inventory?: InventoryInterface[];
  menu?: MenuInterface[];
  order?: OrderInterface[];
  staff?: StaffInterface[];
  user?: UserInterface;
  _count?: {
    inventory?: number;
    menu?: number;
    order?: number;
    staff?: number;
  };
}
