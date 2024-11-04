import { Icon, PrimaryButton, Stack } from '@fluentui/react';
import React from 'react';

export const PrimaryIconButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  iconName: string;
  styles?: {
    iconStyle?: Record<string, string>;
    textStyle?: Record<string, string>;
  };
}> = (props) => {
  return (
    <PrimaryButton onClick={props.onClick}>
      <Stack horizontal verticalAlign='center'>
        <Icon
          iconName={props.iconName}
          styles={{
            root: props.styles?.iconStyle
          }}
        />
        <span style={props.styles?.textStyle}>{props.children}</span>
      </Stack>
    </PrimaryButton>
  );
};
