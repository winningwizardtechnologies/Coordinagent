import { Stack } from '@fluentui/react';
import React from 'react';
import { NavItem } from './NavItem';
import { useMatch } from 'react-router-dom';

export const MobileNav: React.FC = () => {
  const match = useMatch('/:pathname/*');
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
          zIndex: 1,
          marginTop: '25px'
        }
      }}
    >
      <NavItem
        icon='ContactCard'
        text='Contacts'
        link='/contacts'
        size='small'
        active={match?.pathname?.includes('/contacts') === true}
      />
      <NavItem
        icon='GroupedList'
        text='Tasks'
        link='/tasks'
        size='small'
        active={match?.pathname?.includes('/tasks') === true}
      />
      <NavItem
        icon='RealEstate'
        text='Deals'
        link='/deals'
        size='small'
        active={match?.pathname?.includes('/deals') === true}
      />
    </Stack>
  );
};
