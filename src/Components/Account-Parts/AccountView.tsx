import { Stack } from '@fluentui/react';
import React from 'react';
import { useScreenSize } from '../../Hooks/useScreenSize';
import { useMatch, useNavigate } from 'react-router-dom';
import { AccountSettings } from './AccountSettings';
import { AccountPayments } from './AccountPayment';
import { AccountData } from './AccountData';
import { AccountPrivacy } from './AccountPrivacy';
import { AccountNav } from './AccountNav';
import { colors } from '../../Constants/colors';

export const AccountView: React.FC = () => {
  const scSize = useScreenSize();
  const match = useMatch('/account/:section');
  const navigate = useNavigate();
  React.useEffect(() => {
    if (match?.params?.section) {
      if (
        match.params.section !== 'payments-and-subscriptions' &&
        match.params.section !== 'data-and-security' &&
        match.params.section !== 'privacy-settings' &&
        match.params.section !== 'settings'
      ) {
        navigate('/404');
      }
    }
  }, [match?.params?.section]);
  return (
    <Stack
      styles={{
        root: {
          borderLeft: scSize.width > 850 ? '1px solid lightgray' : 'none',
          height: '100%',
          overflowY: 'auto'
        }
      }}
    >
      {scSize.width <= 850 && !match?.params.section ? (
        <AccountNav />
      ) : match?.params.section === 'settings' || !match?.params.section ? (
        <AccountSettings />
      ) : match.params.section === 'payments-and-subscriptions' ? (
        <AccountPayments />
      ) : match.params.section === 'data-and-security' ? (
        <AccountData />
      ) : match.params.section === 'privacy-settings' ? (
        <AccountPrivacy />
      ) : (
        <></>
      )}
    </Stack>
  );
};
