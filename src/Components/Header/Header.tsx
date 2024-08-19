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

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const match = useMatch('/:path');
  return (
    <Stack
      horizontal
      tokens={{ childrenGap: '20px' }}
      styles={{
        root: {
          padding: '20px',
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
        <Image src='../../assets/logo.png' alt='logo' width={200} height={60} />
      </Stack>
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
          active={match?.pathname === '/contacts'}
        />
        <NavItem
          icon='GroupedList'
          text='Tasks'
          link='/tasks'
          active={match?.pathname === '/tasks'}
        />
        <NavItem
          icon='RealEstate'
          text='Deals'
          link='/deals'
          active={match?.pathname === '/deals'}
        />
      </Stack>
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
        <Persona
          size={PersonaSize.size48}
          imageInitials='JK'
          styles={{ root: { cursor: 'pointer' } }}
          initialsColor={colors.grayDark}
        />
        {/* <Label>Account</Label> */}
      </Stack>
    </Stack>
  );
};
