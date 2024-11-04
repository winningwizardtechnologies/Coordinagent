import { Icon } from '@fluentui/react';
import React from 'react';

export const privacySection = (
  <>
    <Icon
      iconName='SecurityGroup'
      styles={{
        root: {
          fontWeight: 'inherit',
          marginRight: '7px',
          fontSize: '18px'
        }
      }}
    />
    <span>Privacy Settings</span>
  </>
);

export const securitySection = (
  <>
    <Icon
      iconName='Lock'
      styles={{
        root: {
          fontWeight: 'inherit',
          marginRight: '7px',
          fontSize: '18px'
        }
      }}
    />
    <span>Data and Security</span>
  </>
);

export const paymentSection = (
  <>
    <Icon
      iconName='PaymentCard'
      styles={{
        root: {
          fontWeight: 'inherit',
          marginRight: '7px',
          fontSize: '18px'
        }
      }}
    />
    <span>Payments and Subscriptions</span>
  </>
);

export const accountSettingsSection = (
  <>
    <Icon
      iconName='PlayerSettings'
      styles={{
        root: {
          fontWeight: 'inherit',
          marginRight: '5px',
          fontSize: '18px'
        }
      }}
    />
    <span>Account Settings</span>
  </>
);

export const accountSectionHeaderStyle: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: 'bolder'
};
