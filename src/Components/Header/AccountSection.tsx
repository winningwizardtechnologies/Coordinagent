import {
  Callout,
  DirectionalHint,
  FocusTrapZone,
  Icon,
  PersonaSize,
  Stack,
  Toggle
} from '@fluentui/react';
import React from 'react';
import { useScreenSize } from '../../Hooks/useScreenSize';
import { getContactFullName, getInitials } from '../../Utility/contactUtil';
import { colors } from '../../Constants/colors';
import { useAppDispatch, useAppSelector } from '../../Hooks/useAppRedux';
import { ImagePersona } from '../Universal/ImagePersona';
import { SectionItem } from '../Universal/SectionItem';
import { changeAccountDetails } from '../../Redux/features/account/account-slice';

export const AccountSection: React.FC<{
  open: boolean;
  targetRef: React.RefObject<HTMLDivElement>;
  dismissAction: () => void;
}> = (props) => {
  const scSize = useScreenSize();
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  return (
    props.open && (
      <Callout
        isBeakVisible={false}
        gapSpace={5}
        target={props.targetRef}
        directionalHint={DirectionalHint.bottomLeftEdge}
        directionalHintFixed={true}
        onDismiss={props.dismissAction}
        styles={{
          root: { width: scSize.width < 400 ? '300px' : '330px' }
        }}
      >
        <FocusTrapZone isClickableOutsideFocusTrap>
          <Stack
            verticalAlign='center'
            styles={{
              root: {
                borderBottom: '1px solid lightgray',
                padding: '20px'
              }
            }}
          >
            <ImagePersona
              text={getContactFullName(account.firstName, account.lastName)}
              secondaryText={account.email}
              size={PersonaSize.size72}
              initialsColor={colors.grayDark}
              imageInitials={getInitials(account.firstName, account.lastName)}
              styles={{
                primaryText: {
                  fontWeight: '700',
                  marginBottom: '3px'
                },
                secondaryText: { fontSize: '13.5px' }
              }}
            />
          </Stack>
          <Stack
            verticalAlign='center'
            horizontalAlign='space-between'
            horizontal
            styles={{
              root: {
                borderBottom: '1px solid lightgray',
                padding: '5px 20px'
              }
            }}
          >
            <span style={{ marginRight: '8px' }}>
              Dark Theme: {account.theme === 'dark' ? 'On' : 'Off'}
            </span>
            <Toggle
              styles={{ root: { marginTop: '7px' } }}
              onChange={() => {
                const newValue = account.theme === 'dark' ? 'light' : 'dark';
                dispatch(changeAccountDetails({ ...account, theme: newValue }));
              }}
              checked={account.theme === 'dark'}
            />
          </Stack>
          <SectionItem
            onClick={() => {
              window.open('/account', '_blank', 'rel=noopener noreferrer');
            }}
            hoverBackground={colors.grayLighter}
            hoverColor={colors.green}
          >
            <span>Manage Account</span>
            <Icon
              iconName='OpenInNewWindow'
              styles={{ root: { marginLeft: '8px', fontSize: '18px' } }}
            />
          </SectionItem>
          <SectionItem
            onClick={() => {}}
            hoverBackground={colors.grayLighter}
            hoverColor={colors.green}
          >
            <span>Sign Out</span>
            <Icon iconName='SignOut' styles={{ root: { marginLeft: '8px' } }} />
          </SectionItem>
        </FocusTrapZone>
      </Callout>
    )
  );
};
