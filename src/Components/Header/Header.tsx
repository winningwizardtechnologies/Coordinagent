import {
  Icon,
  IconButton,
  Image,
  Persona,
  PersonaSize,
  Stack
} from '@fluentui/react';
import React from 'react';
import { NavItem } from './NavItem';
import { useMatch, useNavigate } from 'react-router-dom';
import { colors } from '../../Constants/colors';
import { useScreenSize } from '../../Hooks/useScreenSize';
import { useAppSelector } from '../../Hooks/useAppRedux';
import { getInitials } from '../../Utility/contactUtil';
import { NotificationsSection } from './NotificationsSection';

export const Header: React.FC = () => {
  const scSize = useScreenSize();
  const navigate = useNavigate();
  const match = useMatch('/:pathname/*');
  const account = useAppSelector((state) => state.account);
  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );

  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const notificationsRef = React.useRef<HTMLDivElement>(null);

  const unreadNotifications = React.useMemo(() => {
    return notifications.reduce((sum, notif) => {
      return notif.status === 'unread' ? sum + 1 : sum;
    }, 0);
  }, [notifications]);

  return (
    <>
      <Stack
        horizontal
        horizontalAlign={scSize.width > 850 ? 'start' : 'space-between'}
        styles={{
          root: {
            padding: scSize.width > 374 ? '20px' : '10px',
            borderBottom: '1px solid lightgray'
          }
        }}
      >
        <Stack
          verticalAlign='center'
          styles={{
            root: {
              cursor: 'pointer'
            }
          }}
          onClick={() => {
            navigate('/');
          }}
        >
          <Image
            src='../../assets/logo.png'
            alt='logo'
            width={scSize.width > 850 ? 200 : scSize.width > 374 ? 180 : 150}
            height={scSize.width > 850 ? 60 : scSize.width > 374 ? 54 : 45}
          />
        </Stack>
        {scSize.width > 850 && (
          <Stack
            horizontal
            grow
            tokens={{ childrenGap: '60px' }}
            horizontalAlign='center'
          >
            <NavItem
              icon='ContactCard'
              text='Contacts'
              link='/contacts'
              size='normal'
              active={match?.pathname?.includes('/contacts') === true}
            />
            <NavItem
              icon='GroupedList'
              text='Tasks'
              link='/tasks'
              size='normal'
              active={match?.pathname?.includes('/tasks') === true}
            />
            <NavItem
              icon='RealEstate'
              text='Deals'
              link='/deals'
              size='normal'
              active={match?.pathname?.includes('/deals') === true}
            />
          </Stack>
        )}
        <Stack
          horizontal
          tokens={{ childrenGap: scSize.width > 374 ? '20px' : '10px' }}
        >
          <Stack verticalAlign='center'>
            <div ref={notificationsRef}>
              <IconButton
                iconProps={{ iconName: 'Ringer' }}
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                }}
                styles={{
                  icon: { fontSize: '32px', color: colors.grayDark },
                  root: {
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    padding: `0px ${unreadNotifications > 0 ? '10' : '0'}px 0px ${unreadNotifications > 0 ? '5' : '0'}px`,
                    background: notificationsOpen ? '#f3f2f1' : 'default'
                  }
                }}
              >
                {unreadNotifications > 0 && (
                  <>
                    <Icon
                      iconName='FullCircleMask'
                      styles={{
                        root: {
                          marginLeft: '-21px',
                          marginTop: '-21px',
                          fontSize: '20px',
                          color: colors.green
                        }
                      }}
                    />
                    <span
                      style={{
                        marginLeft:
                          unreadNotifications > 9 ? '-16.5px' : '-13.5px',
                        marginTop: '-22px',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '800'
                      }}
                    >
                      {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </span>
                  </>
                )}
              </IconButton>
            </div>
          </Stack>
          <Stack
            horizontalAlign='center'
            verticalAlign='center'
            onClick={() => {
              console.log('Account');
            }}
          >
            {/* load correct initial from account */}
            <Persona
              size={PersonaSize.size48}
              imageInitials={getInitials(account.firstName, account.lastName)}
              styles={{ root: { cursor: 'pointer', width: '48px' } }}
              initialsColor={colors.grayDark}
            />
          </Stack>
        </Stack>
      </Stack>
      <NotificationsSection
        open={notificationsOpen}
        targetRef={notificationsRef}
        unreadCount={unreadNotifications}
        dismissAction={() => {
          setNotificationsOpen(false);
        }}
      />
    </>
  );
};
