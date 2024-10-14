import {
  ActionButton,
  Callout,
  DirectionalHint,
  FocusTrapZone,
  Icon,
  IconButton,
  List,
  Stack
} from '@fluentui/react';
import React from 'react';
import { colors } from '../../Constants/colors';
import {
  changeNotifications,
  changeNotificationStatus
} from '../../Redux/features/notifications/notifications-slice';
import { useAppDispatch, useAppSelector } from '../../Hooks/useAppRedux';
import { useNavigate } from 'react-router-dom';
import { CustomNotification } from '../../Constants/types';
import { useScreenSize } from '../../Hooks/useScreenSize';
{
  /*images*/
}
const EmptyNotifications = require('../../../assets/empty-notifications.svg');

export const NotificationsSection: React.FC<{
  open: boolean;
  targetRef: React.RefObject<HTMLDivElement>;
  unreadCount: number;
  dismissAction: () => void;
}> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const scSize = useScreenSize();

  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );

  const [currentNotifStatusHoverId, setCurrentNotifStatusHoverId] =
    React.useState<string | null>(null);
  const [listNotifications, setListNotifications] =
    React.useState<(CustomNotification & { hovered?: boolean })[]>(
      notifications
    );

  React.useEffect(() => {
    if (currentNotifStatusHoverId) {
      setListNotifications(
        notifications.map((notif) => {
          if (notif.id === currentNotifStatusHoverId) {
            return { ...notif, hovered: true };
          }
          return notif;
        })
      );
    } else {
      setListNotifications(notifications);
    }
  }, [currentNotifStatusHoverId, notifications]);

  return (
    props.open && (
      <Callout
        target={props.targetRef}
        directionalHint={DirectionalHint.bottomLeftEdge}
        directionalHintFixed={true}
        onDismiss={props.dismissAction}
        styles={{
          root: { width: scSize.width < 400 ? '300px' : '330px' }
        }}
      >
        <FocusTrapZone isClickableOutsideFocusTrap>
          <Stack
            horizontal
            horizontalAlign='space-between'
            verticalAlign='center'
            styles={{
              root: {
                borderBottom: '1px solid lightgray',
                padding: '10px 0px 10px 10px'
              }
            }}
          >
            <span style={{ fontWeight: '600', fontSize: '20px' }}>
              Notifications{props.unreadCount > 0 && `(${props.unreadCount})`}
            </span>
            <ActionButton
              disabled={notifications.every((notif) => notif.status === 'read')}
              styles={{
                root: { paddingTop: '5px' },
                rootHovered: { color: colors.green },
                rootPressed: { color: colors.greenHover }
              }}
              onClick={() => {
                dispatch(
                  changeNotifications(
                    notifications.map((notif) => {
                      if (notif.status === 'read') {
                        return notif;
                      }
                      return {
                        ...notif,
                        status: 'read'
                      };
                    })
                  )
                );
              }}
            >
              Mark all as read
            </ActionButton>
          </Stack>
          {listNotifications.length > 0 ? (
            <List
              style={{ maxHeight: '555px' }}
              items={listNotifications}
              onRenderCell={(item) => {
                if (item) {
                  return (
                    <Stack
                      horizontal
                      verticalAlign='center'
                      horizontalAlign='space-between'
                      styles={{
                        root: {
                          borderBottom: '1px solid lightgray',
                          padding: '15px 5px 15px 15px',
                          cursor: 'pointer'
                        }
                      }}
                      onMouseEnter={() => {
                        setCurrentNotifStatusHoverId(item.id);
                      }}
                      onMouseLeave={() => {
                        setCurrentNotifStatusHoverId(null);
                      }}
                      onClick={() => {
                        navigate(item.actionUrl);
                        props.dismissAction();
                        if (item.status === 'unread') {
                          dispatch(
                            changeNotificationStatus({
                              id: item.id,
                              status: 'read'
                            })
                          );
                        }
                      }}
                    >
                      <Stack
                        styles={{
                          root: { width: '275px' }
                        }}
                        tokens={{ childrenGap: '10px' }}
                      >
                        <Stack.Item styles={{ root: { width: '100%' } }}>
                          <span style={{ fontSize: '14px' }}>{item.text}</span>
                        </Stack.Item>
                        <Stack.Item>
                          <span
                            style={{
                              marginTop: '10px',
                              color: colors.grayDark,
                              fontSize: '12px'
                            }}
                          >
                            {item.date}
                          </span>
                        </Stack.Item>
                      </Stack>
                      <Stack.Item
                        styles={{
                          root: {
                            width: '35px',
                            display: 'flex',
                            justifyContent: 'center'
                          }
                        }}
                      >
                        <></>
                        {item.hovered ? (
                          <IconButton
                            onClick={(ev) => {
                              ev.stopPropagation();
                              dispatch(
                                changeNotificationStatus({
                                  id: item.id,
                                  status:
                                    item.status === 'read' ? 'unread' : 'read'
                                })
                              );
                            }}
                            styles={{
                              rootHovered: { color: colors.green },
                              rootPressed: { color: colors.greenHover }
                            }}
                            iconProps={{
                              title:
                                item.status === 'read'
                                  ? 'Mark as Unread'
                                  : 'Mark as Read',
                              iconName: item.status === 'read' ? 'Read' : 'Mail'
                            }}
                          />
                        ) : (
                          item.status === 'unread' && (
                            <>
                              <Icon
                                iconName='StatusCircleInner'
                                styles={{
                                  root: {
                                    paddingTop: '5px',
                                    color: colors.green
                                  }
                                }}
                              />
                            </>
                          )
                        )}
                      </Stack.Item>
                    </Stack>
                  );
                }
                return <></>;
              }}
            />
          ) : (
            <Stack
              styles={{
                root: {
                  borderBottom: '1px solid lightgray',
                  padding: '15px 5px 15px 15px'
                }
              }}
              horizontalAlign='center'
            >
              <img
                src={EmptyNotifications}
                alt='Empty Notifications'
                width={100}
                height={100}
              ></img>
              <span style={{ fontSize: '22px', fontWeight: '900' }}>
                No notifications
              </span>
              <span style={{ fontSize: '13.5px', marginTop: '20px' }}>
                Currently, no notifications are available.
              </span>
              <span style={{ fontSize: '13.5px', marginTop: '5px' }}>
                Check back later for updates.
              </span>
            </Stack>
          )}
        </FocusTrapZone>
      </Callout>
    )
  );
};
