export interface User {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  postal_code: string;
  phone: string;
  password?: string;
}
