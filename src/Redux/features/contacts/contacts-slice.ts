import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../../../Constants/types';
import { mockContacts } from '../../../Constants/mock-ui-data';

export type ContactsState = {
  selectedFilters: string[];
  addContactsDialogOpen: boolean;
  searchTerm: string;
  contacts: Contact[];
};

const initialState: ContactsState = {
  selectedFilters: [],
  addContactsDialogOpen: false,
  searchTerm: '',
  contacts: mockContacts
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    changeSelectedFilters(state, action: PayloadAction<string[]>) {
      state.selectedFilters = action.payload;
    },
    changeSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    changeAddContactsDialogOpen(state, action: PayloadAction<boolean>) {
      state.addContactsDialogOpen = action.payload;
    },
    changeContacts(state, action: PayloadAction<Contact[]>) {
      state.contacts = action.payload;
    },
    changeContactDetails(
      state,
      action: PayloadAction<{ details: Contact; contactId: string }>
    ) {
      state.contacts = state.contacts.map((contact) => {
        if (contact.id === action.payload.contactId) {
          return action.payload.details;
        }
        return contact;
      });
    },
    addContact(state, action: PayloadAction<Contact>) {
      state.contacts = [...state.contacts, action.payload];
    }
  }
});
export default contactsSlice.reducer;
export const {
  changeSelectedFilters,
  changeSearchTerm,
  changeAddContactsDialogOpen,
  changeContacts,
  changeContactDetails,
  addContact
} = contactsSlice.actions;
