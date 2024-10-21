import { Stack } from '@fluentui/react';
import React from 'react';
import { colors } from '../../Constants/colors';

export const SectionItem: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  hoverBackground: string;
  hoverColor: string;
}> = (props) => {
  const [hovered, setHovered] = React.useState(false);
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
          color: hovered ? props.hoverColor : 'unset'
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
