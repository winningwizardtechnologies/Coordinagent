import { ActionButton, Stack } from '@fluentui/react';
import React from 'react';
import { colors } from '../../Constants/colors';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../Hooks/useAppRedux';

export const EmptyDetails: React.FC = () => {
  const navigate = useNavigate();
  const account = useAppSelector((state) => state.account);
  return (
    <Stack
      styles={{ root: { height: '100%' } }}
      verticalAlign='center'
      horizontalAlign='center'
      tokens={{ childrenGap: '20px' }}
    >
      <span style={{ fontSize: '18px' }}>
        Select a contact to edit/view their information
      </span>
      <ActionButton
        styles={{ root: { color: colors.green } }}
        onClick={() => {
          navigate(`/contacts/${account.id}`);
        }}
      >
        View My Account
      </ActionButton>
    </Stack>
  );
};
