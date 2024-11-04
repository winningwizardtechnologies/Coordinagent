import React from 'react';
import { errorStyle } from '../../Constants/constants';
import { ActionButton, Spinner, Stack } from '@fluentui/react';
import { colors } from '../../Constants/colors';

export const EditAction: React.FC<{
  hasError: boolean;
  loading: boolean;
  onCancel: () => void;
  onSave: () => void;
}> = (props) => {
  return (
    <>
      <Stack>
        {props.hasError && (
          <span
            style={{
              ...errorStyle,
              marginTop: '0px',
              marginLeft: '3px'
            }}
          >
            Resolve form errors before saving!
          </span>
        )}
        <Stack horizontal horizontalAlign='center'>
          <ActionButton
            disabled={props.loading}
            iconProps={{
              iconName: 'Cancel',
              styles: { root: { color: colors.green } }
            }}
            onClick={props.onCancel}
          >
            Cancel
          </ActionButton>
          <div>
            <Stack horizontal>
              {props.loading && (
                <Spinner styles={{ root: { marginRight: '-25px' } }} />
              )}
              <ActionButton
                disabled={props.loading}
                iconProps={{
                  iconName: !props.loading ? 'Accept' : '',
                  styles: { root: { color: colors.green } }
                }}
                onClick={props.onSave}
              >
                Save
              </ActionButton>
            </Stack>
          </div>
        </Stack>
      </Stack>
    </>
  );
};
