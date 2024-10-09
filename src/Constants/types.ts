export type StageType =
  | 'Hot Lead'
  | 'New Lead'
  | 'Warm Lead'
  | 'Cold Lead'
  | 'Seller'
  | 'Past Buyer'
  | 'Past Seller'
  | 'Property Maintenance'
  | 'Account';

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  stage: StageType;
  image?: string;
};
