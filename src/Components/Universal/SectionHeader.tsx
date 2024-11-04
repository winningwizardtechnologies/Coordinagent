import { Stack } from '@fluentui/react';
import React from 'react';
import { accountSectionHeaderStyle } from '../Account-Parts/account-sections';
import { PrimaryIconButton } from './PrimaryIconButton';
import { EditAction } from './EditAction';

export const SectionHeader: React.FC<{
  editProps?: {
    buttonText?: string;
    buttonIconName?: string;
    editing: boolean;
    hasError: boolean;
    loading: boolean;
    onEditClick: () => void;
    onCancel: () => void;
    onSave: () => Promise<void>;
  };
  headerTitle: string;
}> = (props) => {
  return (
    <Stack horizontal horizontalAlign='space-between'>
      <span style={accountSectionHeaderStyle}>{props.headerTitle}</span>
      {props.editProps && (
        <>
          {!props.editProps.editing && (
            <PrimaryIconButton
              onClick={props.editProps.onEditClick}
              iconName={props.editProps.buttonIconName || 'Edit'}
              styles={{ iconStyle: { marginRight: '4px' } }}
            >
              {props.editProps.buttonText || 'Edit'}
            </PrimaryIconButton>
          )}
          {props.editProps.editing && (
            <EditAction
              hasError={props.editProps.hasError}
              loading={props.editProps.loading}
              onCancel={props.editProps.onCancel}
              onSave={async () => {
                await props.editProps?.onSave();
              }}
            />
          )}
        </>
      )}
    </Stack>
  );
};
