import { DropdownMenuItemType, IDropdownOption } from '@fluentui/react';

export const stageDropdownOptions: IDropdownOption[] = [
  { text: 'Leads', key: 'Leads', itemType: DropdownMenuItemType.Header },
  { text: 'New Lead', key: 'New Lead' },
  { text: 'Hot Lead', key: 'Hot Lead' },
  { text: 'Warm Lead', key: 'Warm Lead' },
  { text: 'Cold Lead', key: 'Cold Lead' },
  { text: '-', key: 'divider1', itemType: DropdownMenuItemType.Divider },
  { text: 'Selling', key: 'Selling', itemType: DropdownMenuItemType.Header },
  { text: 'Seller', key: 'Seller' },
  { text: '-', key: 'divider2', itemType: DropdownMenuItemType.Divider },
  {
    text: 'Past Deals',
    key: 'Past Deals',
    itemType: DropdownMenuItemType.Header
  },
  { text: 'Past Buyer', key: 'Past Buyer' },
  { text: 'Past Seller', key: 'Past Seller' },
  { text: '-', key: 'divider3', itemType: DropdownMenuItemType.Divider },
  {
    text: 'Maintenance Support',
    key: 'Maintenance Support',
    itemType: DropdownMenuItemType.Header
  },
  { text: 'Property Maintenance', key: 'Property Maintenance' }
];

export const errorStyle = {
  marginTop: '5px',
  fontWeight: '400',
  fontSize: '12px',
  color: 'rgb(164, 38, 44)',
  WebkitFontSmoothing: 'antialiased',
  fontFamily:
    '"Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif'
};
