import React from 'react';
import { ChoiceGroup, Stack } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../Hooks/useAppRedux';
import {
  changeAccountDetails,
  ThemeType
} from '../../Redux/features/account/account-slice';
import { SectionHeader } from '../Universal/SectionHeader';
import { InfoSection } from '../Universal/InfoSection';
import { BackButton } from '../Contacts-Parts/BackButton';

export const AccountSettings: React.FC = () => {
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  return (
    <div style={{ padding: '3% 5%' }}>
      <BackButton targetRoute='/account' />
      <Stack tokens={{ childrenGap: '20px' }}>
        <InfoSection />
      </Stack>
      <Stack styles={{ root: { marginTop: '5%', marginBottom: '5%' } }}>
        <SectionHeader headerTitle='Theme' />
        <ChoiceGroup
          styles={{ root: { marginTop: '25px' } }}
          onChange={(_ev, option) => {
            if (option) {
              dispatch(
                changeAccountDetails({
                  ...account,
                  theme: option.key as ThemeType
                })
              );
            }
          }}
          selectedKey={account.theme}
          options={[
            {
              key: 'light',
              text: 'Light',
              iconProps: { iconName: 'Sunny' },
              styles: { root: { marginRight: '10px' } }
            },
            { key: 'dark', text: 'Dark', iconProps: { iconName: 'ClearNight' } }
          ]}
        />
      </Stack>
    </div>
  );
};
