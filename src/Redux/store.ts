import { configureStore } from '@reduxjs/toolkit';
import contactsSlice from './features/contacts/contacts-slice';
import accountSlice from './features/account/account-slice';
import notificationsSlice from './features/notifications/notifications-slice';
export const store = configureStore({
  reducer: {
    contacts: contactsSlice,
    account: accountSlice,
    notifications: notificationsSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
