import { ActionButton, Stack } from '@fluentui/react';
import React from 'react';
import { useScreenSize } from '../../Hooks/useScreenSize';
import { colors } from '../../Constants/colors';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC<{ targetRoute: string }> = (props) => {
  const scSize = useScreenSize();
  const navigate = useNavigate();
  return (
    <Stack
      styles={{
        root: {
          padding: '10px 0px 20px 0px'
        }
      }}
    >
      {scSize.width <= 850 && (
        <Stack>
          <ActionButton
            iconProps={{
              iconName: 'Back',
              styles: { root: { color: colors.green } }
            }}
            onClick={() => {
              navigate(props.targetRoute);
            }}
          >
            Back
          </ActionButton>
        </Stack>
      )}
    </Stack>
  );
};
