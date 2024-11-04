import { Stack } from '@fluentui/react';
import React from 'react';
import { useScreenSize } from '../../Hooks/useScreenSize';
import { AccountNav } from '../Account-Parts/AccountNav';
import { AccountView } from '../Account-Parts/AccountView';

export const Account: React.FC = () => {
  const scSize = useScreenSize();
  return (
    <>
      <Stack verticalFill>
        <Stack tokens={{ childrenGap: '20px' }} verticalFill>
          <Stack horizontal verticalFill>
            {scSize.width > 850 && (
              <Stack.Item grow={1}>
                <AccountNav />
              </Stack.Item>
            )}
            <Stack.Item grow={4}>
              <AccountView />
            </Stack.Item>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
