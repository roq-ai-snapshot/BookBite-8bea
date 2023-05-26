import { FavoriteInterface } from 'interfaces/favorite';
import { OrderItemInterface } from 'interfaces/order-item';
import { MenuInterface } from 'interfaces/menu';

export interface MenuItemInterface {
  id?: string;
  menu_id: string;
  name: string;
  price: number;
  availability: boolean;
  favorite?: FavoriteInterface[];
  order_item?: OrderItemInterface[];
  menu?: MenuInterface;
  _count?: {
    favorite?: number;
    order_item?: number;
  };
}
