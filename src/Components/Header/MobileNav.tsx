import { Stack } from '@fluentui/react';
import React from 'react';
import { NavItem } from './NavItem';
import { useMatch } from 'react-router-dom';

export const MobileNav: React.FC = () => {
  const match = useMatch('/:path');
  return (
    <Stack
      horizontal
      horizontalAlign={'space-between'}
      styles={{
        root: {
          padding: '10px',
          borderTop: '1px solid lightgray',
          position: 'sticky',
          bottom: 0,
          zIndex: 1
        }
      }}
    >
      <NavItem
        icon='ContactCard'
        text='Contacts'
        link='/contacts'
        size='small'
        active={match?.pathname === '/contacts'}
      />
      <NavItem
        icon='GroupedList'
        text='Tasks'
        link='/tasks'
        size='small'
        active={match?.pathname === '/tasks'}
      />
      <NavItem
        icon='RealEstate'
        text='Deals'
        link='/deals'
        size='small'
        active={match?.pathname === '/deals'}
      />
    </Stack>
  );
};
