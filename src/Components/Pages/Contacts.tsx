import { Stack } from '@fluentui/react';
import React from 'react';
import { ContactList } from '../Contacts-Parts/ContactList';
import { ContactDetails } from '../Contacts-Parts/ContactDetails';
import { useScreenSize } from '../../Hooks/useScreenSize';
import { useMatch } from 'react-router-dom';

export const Contacts: React.FC = () => {
  React.useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);
  const scSize = useScreenSize();
  const match = useMatch('/contacts/:id');
  return (
    <>
      <Stack
        horizontalAlign='center'
        verticalFill
        styles={
          {
            // root: { marginTop: '25px' }
          }
        }
      >
        <Stack
          styles={{ root: { width: '95%' } }}
          tokens={{ childrenGap: '20px' }}
          verticalFill
        >
          <Stack horizontal verticalFill>
            {(scSize.width > 850 || !match) && (
              <Stack.Item grow={2}>
                <ContactList />
              </Stack.Item>
            )}
            {(scSize.width > 850 || match) && (
              <Stack.Item grow={5}>
                <ContactDetails />
              </Stack.Item>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
