import { Icon, Label, Stack } from '@fluentui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../Constants/colors';

type NavItemProps = {
  icon: string;
  text: string;
  link: string;
  active: boolean;
};
export const NavItem: React.FC<NavItemProps> = ({
  icon,
  text,
  link,
  active
}) => {
  const navigate = useNavigate();
  return (
    <Stack
      horizontalAlign='center'
      verticalAlign='center'
      className='navItem'
      styles={{
        root: {
          borderBottom: active ? `1.5px solid ${colors.green}` : 'none'
        }
      }}
      onClick={() => {
        navigate(link);
      }}
    >
      <Icon
        iconName={icon}
        styles={{
          root: {
            fontSize: '32px',
            color: active ? colors.green : colors.grayDark,
            fontWeight: active ? 'bold' : 'normal'
          }
        }}
      />
      <Label
        styles={{
          root: {
            cursor: 'inherit',
            color: active ? colors.green : colors.grayDark,
            fontWeight: active ? 'bold' : 'normal'
          }
        }}
      >
        {text}
      </Label>
    </Stack>
  );
};
