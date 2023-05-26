import { UserInterface } from 'interfaces/user';
import { MenuItemInterface } from 'interfaces/menu-item';

export interface FavoriteInterface {
  id?: string;
  customer_id: string;
  menu_item_id: string;

  user?: UserInterface;
  menu_item?: MenuItemInterface;
  _count?: {};
}
