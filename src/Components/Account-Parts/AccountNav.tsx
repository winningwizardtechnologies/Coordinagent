import { Icon, IStyle, Stack } from '@fluentui/react';
import React from 'react';
import { CalloutSectionItem } from '../Universal/CalloutSectionItem';
import { colors } from '../../Constants/colors';
import { useMatch, useNavigate } from 'react-router-dom';
import {
  accountSettingsSection,
  paymentSection,
  privacySection,
  securitySection
} from './account-sections';
import { useScreenSize } from '../../Hooks/useScreenSize';

const isNavActive = (
  param: string | undefined,
  nav: 'account' | 'payments' | 'security' | 'privacy' | 'settings'
) => {
  if (!param || param === 'settings') {
    return nav === 'account';
  }
  if (param === 'payments-and-subscriptions') {
    return nav === 'payments';
  } else if (param === 'data-and-security') {
    return nav === 'security';
  } else if (param === 'privacy-settings') {
    return nav === 'privacy';
  } else {
    return false;
  }
};

export const AccountNav: React.FC<{ color?: string }> = (props) => {
  const scSize = useScreenSize();
  const match = useMatch('/account/:section');
  const navigate = useNavigate();
  const accountNavStyle: IStyle = {
    padding: '20px 20px'
  };
  const selectedStyle: IStyle = {
    fontWeight: 'bold',
    background: colors.green,
    color: 'white'
  };
  return (
    <Stack>
      <CalloutSectionItem
        onClick={() => {
          navigate('/account/settings');
        }}
        hoverBackground={colors.grayLighter}
        hoverColor={colors.green}
        styleOverrides={
          isNavActive(match?.params?.section, 'account') && scSize.width > 850
            ? { ...accountNavStyle, ...selectedStyle }
            : { ...accountNavStyle, color: props.color || 'black' }
        }
      >
        <Stack horizontal horizontalAlign='center' grow verticalAlign='center'>
          {accountSettingsSection}
        </Stack>
      </CalloutSectionItem>
      <CalloutSectionItem
        onClick={() => {
          navigate('/account/payments-and-subscriptions');
        }}
        hoverBackground={colors.grayLighter}
        hoverColor={colors.green}
        styleOverrides={
          isNavActive(match?.params?.section, 'payments')
            ? { ...accountNavStyle, ...selectedStyle }
            : { ...accountNavStyle, color: props.color || 'black' }
        }
      >
        <Stack horizontal horizontalAlign='center' grow verticalAlign='center'>
          {paymentSection}
        </Stack>
      </CalloutSectionItem>
      <CalloutSectionItem
        onClick={() => {
          navigate('/account/data-and-security');
        }}
        hoverBackground={colors.grayLighter}
        hoverColor={colors.green}
        styleOverrides={
          isNavActive(match?.params?.section, 'security')
            ? { ...accountNavStyle, ...selectedStyle }
            : { ...accountNavStyle, color: props.color || 'black' }
        }
      >
        <Stack horizontal horizontalAlign='center' grow verticalAlign='center'>
          {securitySection}
        </Stack>
      </CalloutSectionItem>
      <CalloutSectionItem
        onClick={() => {
          navigate('/account/privacy-settings');
        }}
        hoverBackground={colors.grayLighter}
        hoverColor={colors.green}
        styleOverrides={
          isNavActive(match?.params?.section, 'privacy')
            ? { ...accountNavStyle, ...selectedStyle }
            : { ...accountNavStyle, color: props.color || 'black' }
        }
      >
        <Stack horizontal horizontalAlign='center' grow verticalAlign='center'>
          {privacySection}
        </Stack>
      </CalloutSectionItem>
    </Stack>
  );
};
