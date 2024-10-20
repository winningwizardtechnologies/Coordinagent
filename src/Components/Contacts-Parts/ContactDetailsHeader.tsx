import {
  ActionButton,
  Dropdown,
  Icon,
  PersonaSize,
  PrimaryButton,
  Spinner,
  Stack
} from '@fluentui/react';
import React from 'react';
import { useScreenSize } from '../../Hooks/useScreenSize';
import { colors } from '../../Constants/colors';
import { StageType } from '../../Constants/types';
import { errorStyle, stageDropdownOptions } from '../../Constants/constants';
import { ImagePersona } from '../Universal/ImagePersona';

export const ContactDetailsHeader: React.FC<{
  persona: { name: string; stage: string; image?: string };
  editMode: boolean;
  isSaving: boolean;
  formHasErrors: boolean;
  dropDownKey: StageType;
  onDropDownSelect: (option: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}> = (props) => {
  const scSize = useScreenSize();
  return (
    <Stack
      horizontal={scSize.width >= 500}
      tokens={{ childrenGap: scSize.width >= 500 ? '0px' : '20px' }}
    >
      <Stack grow verticalAlign={'center'}>
        <ImagePersona
          initialsColor={colors.golden}
          text={props.persona.name}
          secondaryText={props.persona.stage}
          size={scSize.width >= 1024 ? PersonaSize.size100 : PersonaSize.size72}
          image={props.persona.image}
        />
      </Stack>
      <Stack tokens={{ childrenGap: '15px' }} verticalAlign={'center'}>
        {!props.editMode && (
          <PrimaryButton onClick={props.onEdit}>
            <Stack horizontal verticalAlign='center'>
              <Icon
                iconName='Edit'
                styles={{
                  root: {
                    marginRight: '5px',
                    paddingTop: '2px',
                    fontSize: scSize.width >= 1024 ? '16.5px' : '14px'
                  }
                }}
              />
              <span
                style={{
                  fontSize: scSize.width >= 1024 ? '16.5px' : '14px'
                }}
              >
                Edit Contact
              </span>
            </Stack>
          </PrimaryButton>
        )}
        {props.editMode && (
          <>
            {props.formHasErrors && (
              <span
                style={{ ...errorStyle, marginTop: '0px', marginLeft: '3px' }}
              >
                Save failed due to form errors
              </span>
            )}
            <div style={{ display: 'flex' }}>
              <ActionButton
                disabled={props.isSaving}
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
                  {props.isSaving && (
                    <Spinner styles={{ root: { marginRight: '-25px' } }} />
                  )}
                  <ActionButton
                    disabled={props.isSaving}
                    iconProps={{
                      iconName: !props.isSaving ? 'Accept' : '',
                      styles: { root: { color: colors.green } }
                    }}
                    onClick={props.onSave}
                  >
                    Save
                  </ActionButton>
                </Stack>
              </div>
            </div>
          </>
        )}
        <Dropdown
          required={props.editMode}
          selectedKey={props.dropDownKey}
          disabled={!props.editMode || props.isSaving}
          onChange={(_ev, option) => {
            if (option) {
              props.onDropDownSelect(option.text);
            }
          }}
          options={stageDropdownOptions}
          calloutProps={{ directionalHintFixed: true }}
          styles={{
            root: {
              maxWidth: scSize.width <= 800 ? '100%' : '175px'
            }
          }}
        />
      </Stack>
    </Stack>
  );
};
