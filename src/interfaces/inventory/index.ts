import { RestaurantInterface } from 'interfaces/restaurant';

export interface InventoryInterface {
  id?: string;
  restaurant_id: string;
  ingredient: string;
  quantity: number;

  restaurant?: RestaurantInterface;
  _count?: {};
}
