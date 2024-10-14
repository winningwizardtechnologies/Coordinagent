import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CustomNotification,
  NotificationStatus
} from '../../../Constants/types';
import { mockNotifications } from '../../../Constants/mock-ui-data';

const initialState: { notifications: CustomNotification[] } = {
  notifications: mockNotifications
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    changeNotifications(state, action: PayloadAction<CustomNotification[]>) {
      state.notifications = action.payload;
    },
    changeNotificationStatus(
      state,
      action: PayloadAction<{ id: string; status: NotificationStatus }>
    ) {
      state.notifications = state.notifications.map((notif) => {
        if (notif.id === action.payload.id) {
          return {
            ...notif,
            status: action.payload.status
          };
        } else {
          return notif;
        }
      });
    }
  }
});
export default notificationsSlice.reducer;
export const { changeNotifications, changeNotificationStatus } =
  notificationsSlice.actions;
