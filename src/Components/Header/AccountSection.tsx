import {
  Callout,
  DirectionalHint,
  FocusTrapZone,
  Persona,
  PersonaSize,
  Stack
} from '@fluentui/react';
import React from 'react';
import { useScreenSize } from '../../Hooks/useScreenSize';
import { getContactFullName, getInitials } from '../../Utility/contactUtil';
import { colors } from '../../Constants/colors';
import { useAppSelector } from '../../Hooks/useAppRedux';

export const AccountSection: React.FC<{
  open: boolean;
  targetRef: React.RefObject<HTMLDivElement>;
  dismissAction: () => void;
}> = (props) => {
  const scSize = useScreenSize();
  const account = useAppSelector((state) => state.account);
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
            horizontal
            verticalAlign='center'
            styles={{
              root: {
                borderBottom: '1px solid lightgray',
                padding: '20px'
              }
            }}
          >
            <Persona
              size={PersonaSize.size72}
              imageInitials={getInitials(account.firstName, account.lastName)}
              styles={{ root: { cursor: 'pointer', width: '48px' } }}
              initialsColor={colors.grayDark}
            />
            <Stack
              tokens={{ childrenGap: 5 }}
              styles={{
                root: {
                  marginLeft: '20px',
                  overflow: 'hidden'
                }
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '19px' }}>
                {getContactFullName(account.firstName, account.lastName)}
              </div>
              <div
                style={{
                  fontSize: '13px'
                }}
              >
                {account.email}
              </div>
            </Stack>
          </Stack>
        </FocusTrapZone>
      </Callout>
    )
  );
};
