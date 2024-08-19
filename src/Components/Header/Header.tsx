import {
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

export const Header: React.FC = () => {
  const scSize = useScreenSize();
  const navigate = useNavigate();
  const match = useMatch('/:path');
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
              active={match?.pathname === '/contacts'}
            />
            <NavItem
              icon='GroupedList'
              text='Tasks'
              link='/tasks'
              size='normal'
              active={match?.pathname === '/tasks'}
            />
            <NavItem
              icon='RealEstate'
              text='Deals'
              link='/deals'
              size='normal'
              active={match?.pathname === '/deals'}
            />
          </Stack>
        )}
        <Stack
          horizontal
          tokens={{ childrenGap: scSize.width > 374 ? '20px' : '10px' }}
        >
          <Stack
            verticalAlign='center'
            onClick={() => {
              console.log('notifications');
            }}
          >
            <IconButton
              iconProps={{ iconName: 'Ringer' }}
              styles={{
                icon: { fontSize: '32px', color: colors.grayDark },
                root: { width: '48px', height: '48px', borderRadius: '50%' }
              }}
            />
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
              imageInitials='JK'
              styles={{ root: { cursor: 'pointer', width: '48px' } }}
              initialsColor={colors.grayDark}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
