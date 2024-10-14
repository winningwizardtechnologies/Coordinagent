import {
  ActionButton,
  Dropdown,
  Icon,
  Persona,
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
import { getInitials } from '../../Utility/contactUtil';

export const ContactDetailsHeader: React.FC<{
  persona: { name: string; stage: string; image?: string };
  editMode: boolean;
  isSaving: boolean;
  hideDropdown: boolean;
  formHasErrors: boolean;
  dropDownKey: StageType;
  onDropDownSelect: (option: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}> = (props) => {
  const scSize = useScreenSize();
  const [coinHovered, setCoinHovered] = React.useState(false);
  const [fileError, setFileError] = React.useState('Max File Size: 10 MB');
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    setFileError('');
    if (hiddenFileInput?.current?.value) {
      hiddenFileInput.current.value = '';
    }
  }, [props.persona]);
  return (
    <Stack
      horizontal={scSize.width >= 500}
      tokens={{ childrenGap: scSize.width >= 500 ? '0px' : '20px' }}
    >
      <Stack grow verticalAlign={'center'}>
        <Persona
          initialsColor={colors.golden}
          size={scSize.width >= 1024 ? PersonaSize.size100 : PersonaSize.size72}
          text={props.persona.name}
          imageAlt={props.persona.name}
          secondaryText={props.persona.stage}
          onRenderInitials={() => {
            if (props.persona.image) {
              // show image via url
              return <span></span>;
            } else {
              const fname = props.persona.name.split(' ')?.[0];
              const lname = props.persona.name.split(' ')?.[1];
              return coinHovered ? (
                <Icon iconName='EditPhoto' />
              ) : (
                <span>{getInitials(fname, lname)}</span>
              );
            }
          }}
          coinProps={{
            onMouseEnter: () => {
              setCoinHovered(true);
            },
            onMouseLeave: () => {
              setCoinHovered(false);
            },
            styles: {
              coin: {
                filter: `brightness(${coinHovered ? '0.75' : '1'})`,
                cursor: `${coinHovered ? 'pointer' : 'default'}`
              }
            },
            onClick: () => {
              hiddenFileInput.current?.click();
            }
          }}
        />
        {fileError && <span style={errorStyle}>{fileError}</span>}
        <input
          type='file'
          style={{ display: 'none' }}
          ref={hiddenFileInput}
          accept='image/*,image/heic'
          onChange={(ev) => {
            const newFile = ev?.target?.files?.[0];
            if (newFile) {
              if (newFile.size > 10485760) {
                setFileError('Max File Size: 10 MB');
              } else {
                setImageFile(newFile);
                setFileError('');
              }
            } else {
              setFileError('Image upload failed');
            }
          }}
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
        {!props.hideDropdown && (
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
        )}
      </Stack>
    </Stack>
  );
};
