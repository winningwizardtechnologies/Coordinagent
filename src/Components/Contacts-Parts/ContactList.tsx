import { Icon, PrimaryButton, SearchBox, Stack } from '@fluentui/react';
import React from 'react';
import { FilterContacts } from './FilterContacts';
import { ScrollableContacts } from './ScrollableContacts';
import {
  changeAddContactsDialogOpen,
  changeSearchTerm
} from '../../Redux/features/contacts/contacts-slice';
import { useAppDispatch } from '../../Hooks/useAppRedux';
import { AddContactsDialog } from './AddContactsDialog';

export const ContactList: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Stack
        styles={{
          root: {
            // border: '1px solid lightgray',
            paddingTop: '25px',
            height: '100%'
          }
        }}
      >
        <Stack
          styles={{ root: { margin: '20px' } }}
          tokens={{ childrenGap: '10px' }}
          horizontal
          horizontalAlign='space-between'
        >
          <Stack.Item grow={4}>
            <SearchBox
              placeholder='Search Contact Name'
              onChange={(_ev, newValue) => {
                dispatch(changeSearchTerm(newValue || ''));
              }}
            />
          </Stack.Item>
          <Stack.Item>
            <PrimaryButton
              onClick={() => {
                dispatch(changeAddContactsDialogOpen(true));
              }}
            >
              <Icon
                iconName='AddTo'
                styles={{ root: { fontSize: '16.5px', marginRight: '3px' } }}
              />
              Add
            </PrimaryButton>
          </Stack.Item>
        </Stack>
        <Stack styles={{ root: { margin: '0px 20px' } }}>
          <FilterContacts />
        </Stack>
        <Stack
          styles={{ root: { margin: '20px', height: 'calc(100% - 144px)' } }}
        >
          <ScrollableContacts />
        </Stack>
      </Stack>
      <AddContactsDialog />
    </>
  );
};
