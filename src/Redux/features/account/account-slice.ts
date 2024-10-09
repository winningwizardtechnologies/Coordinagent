import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../../../Constants/types';

export type AccountState = Contact;

const initialState: AccountState = {
  // will be replaced with empty stuff and fetched
  id: '999999999',
  firstName: 'Jack',
  lastName: 'Kendrick',
  email: 'jkendrik@gmail.com',
  phone: '123-456-7899',
  dob: '1970-01-01',
  address: '234, West Georgia Street, Vancouver, BC, Canada, V6U 9P8',
  stage: 'Account'
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    changeAccountDetails(state, action: PayloadAction<AccountState>) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.address = action.payload.address;
      state.dob = action.payload.dob;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.phone = action.payload.phone;
      state.stage = action.payload.stage;
    }
  }
});
export default accountSlice.reducer;
export const { changeAccountDetails } = accountSlice.actions;
