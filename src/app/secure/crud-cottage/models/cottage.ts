export interface Cottage {
  id: number;
  name: string;
  capacity: number;
  description: string;
  created_at?: string;
  updated_at?: string;
  cottage_status_id?: number;
  base_price: number;
}
