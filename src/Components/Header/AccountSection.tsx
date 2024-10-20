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
import { ImagePersona } from '../Universal/ImagePersona';

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
        </FocusTrapZone>
      </Callout>
    )
  );
};
