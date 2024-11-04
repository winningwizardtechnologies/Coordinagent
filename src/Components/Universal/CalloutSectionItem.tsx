import { IRawStyle, Stack } from '@fluentui/react';
import React from 'react';
import { colors } from '../../Constants/colors';

export const CalloutSectionItem: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  hoverBackground: string;
  hoverColor: string;
  styleOverrides?: IRawStyle;
}> = (props) => {
  const [hovered, setHovered] = React.useState(false);
  const override = props.styleOverrides || {};
  return (
    <Stack
      verticalAlign='center'
      horizontal
      styles={{
        root: {
          borderBottom: '1px solid lightgray',
          padding: '10px 20px',
          cursor: 'pointer',
          background: hovered ? props.hoverBackground : 'unset',
          color: hovered ? props.hoverColor : 'unset',
          ...override
        }
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={props.onClick}
    >
      {props.children}
    </Stack>
  );
};
