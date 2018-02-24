export interface Ticket {
  id: number;
  message: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  user_id?: number;
}
