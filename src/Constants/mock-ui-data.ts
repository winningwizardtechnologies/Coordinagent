import { Contact, CustomNotification } from './types';

export const mockContacts: Contact[] = [
  {
    id: '1',
    firstName: 'Simon',
    lastName: 'Burski',
    email: 'sburski@gmail.com',
    phone: '236-666-7854',
    dob: '1999-01-01',
    address: '123-Water Street, Vancouver, BC, Canada, V5Y 2V1',
    stage: 'New Lead'
  },
  {
    id: '2',
    firstName: 'Berlinda',
    lastName: 'Doanne',
    email: 'bdoanne@gmail.com',
    phone: '236-666-7811',
    dob: '1999-01-03',
    address: '124-Water Street, Vancouver, BC, Canada, V5Y 2V1',
    stage: 'Hot Lead'
  },
  {
    id: '3',
    firstName: 'Jason',
    lastName: 'Cheung',
    email: 'jcheung@gmail.com',
    phone: '236-666-7899',
    dob: '1999-01-04',
    address: '125-Water Street, Vancouver, BC, Canada, V5Y 2V1',
    stage: 'Past Seller'
  },
  {
    id: '4',
    firstName: 'Brian',
    lastName: 'Adams',
    email: 'badams@gmail.com',
    phone: '236-666-7822',
    dob: '1999-01-05',
    address: '126-Water Street, Vancouver, BC, Canada, V5Y 2V1',
    stage: 'Warm Lead'
  },
  {
    id: '5',
    firstName: 'Leslie',
    lastName: 'Garland',
    email: 'lgarland@gmail.com',
    phone: '236-666-7866',
    dob: '1999-01-02',
    address: '127-Water Street, Vancouver, BC, Canada, V5Y 2V1',
    stage: 'Past Seller'
  },
  {
    id: '6',
    firstName: 'Mathew',
    lastName: 'Pereminsky',
    email: 'mpereminsky@gmail.com',
    phone: '236-666-7855',
    dob: '1999-01-11',
    address: '128-Water Street, Vancouver, BC, Canada, V5Y 2V1',
    stage: 'Past Buyer'
  },
  {
    id: '7',
    firstName: 'Peter',
    lastName: 'Parker',
    email: 'pparker@gmail.com',
    phone: '236-666-7461',
    dob: '1999-01-12',
    address: '129-Water Street, Vancouver, BC, Canada, V5Y 2V1',
    stage: 'Property Maintenance'
  },
  {
    id: '8',
    firstName: 'Adam',
    lastName: 'Better',
    email: 'abetter@gmail.com',
    phone: '236-666-7879',
    dob: '1999-01-01',
    address: '133-Water Street, Vancouver, BC, Canada, V5Y 2V1',
    stage: 'Cold Lead'
  },
  {
    id: '9',
    firstName: 'Scott',
    lastName: 'Sever',
    email: 'ssever@gmail.com',
    phone: '236-666-7809',
    dob: '1999-11-12',
    address: '123-Water Street, Vancouver, BC, Canada, V5Y 2V1',
    stage: 'Warm Lead'
  },
  {
    id: '10',
    firstName: 'Jennifer',
    lastName: 'Aniston',
    email: 'janiston@gmail.com',
    phone: '236-666-7801',
    dob: '1999-09-09',
    address: '123-Water Street, Vancouver, BC, Canada, V5Y 2V1',
    stage: 'Hot Lead'
  }
];

export const mockNotifications: CustomNotification[] = [
  {
    id: '1',
    date: '1 day ago',
    status: 'unread',
    text: 'Follow up with new hot lead Jenson Guo',
    actionUrl: '/'
  },
  {
    id: '2',
    date: '1 day ago',
    status: 'read',
    text: 'Follow up with new hot lead Hetal',
    actionUrl: '/'
  },
  {
    id: '3',
    date: '1 day ago',
    status: 'read',
    text: 'Follow up with new hot lead Jason',
    actionUrl: '/'
  },
  {
    id: '4',
    date: '1 day ago',
    status: 'unread',
    text: 'Follow up with new hot lead Andrea',
    actionUrl: '/'
  },
  {
    id: '5',
    date: '1 day ago',
    status: 'read',
    text: 'Follow up with new hot lead Mark',
    actionUrl: '/'
  },
  {
    id: '6',
    date: '1 day ago',
    status: 'read',
    text: 'Follow up with new hot lead Anthony',
    actionUrl: '/'
  },
  {
    id: '7',
    date: '1 day ago',
    status: 'read',
    text: 'Follow up with new hot lead Timothy',
    actionUrl: '/'
  },
  {
    id: '8',
    date: '1 day ago',
    status: 'unread',
    text: 'Follow up with new hot lead Tile',
    actionUrl: '/'
  },
  {
    id: '9',
    date: '1 day ago',
    status: 'unread',
    text: 'Follow up with new hot lead Will',
    actionUrl: '/'
  },
  {
    id: '10',
    date: '1 day ago',
    status: 'unread',
    text: 'Follow up with new hot lead Tara',
    actionUrl: '/'
  },
  {
    id: '11',
    date: '1 day ago',
    status: 'unread',
    text: 'Follow up with new hot lead Raymond who actually has a huge text to deal with not sure what we gonna do hahahahahha hah',
    actionUrl: '/'
  },
  {
    id: '12',
    date: '1 day ago',
    status: 'unread',
    text: 'Follow up with new hot lead Jacob',
    actionUrl: '/'
  },
  {
    id: '13',
    date: '1 day ago',
    status: 'unread',
    text: 'Follow up with new hot lead Jeff',
    actionUrl: '/'
  },
  {
    id: '14',
    date: '1 day ago',
    status: 'unread',
    text: 'Follow up with new hot lead John',
    actionUrl: '/'
  },
  {
    id: '15',
    date: '1 day ago',
    status: 'read',
    text: 'Follow up with new hot lead Brian',
    actionUrl: '/'
  },
  {
    id: '16',
    date: '1 day ago',
    status: 'read',
    text: 'Follow up with new hot lead Jordan',
    actionUrl: '/'
  },
  {
    id: '17',
    date: '1 day ago',
    status: 'read',
    text: 'Follow up with new hot lead Jamey',
    actionUrl: '/'
  }
];
