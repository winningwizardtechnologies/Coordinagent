import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/useAppRedux';
import {
  DatePicker,
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  Dropdown,
  Icon,
  Label,
  Stack,
  TextField
} from '@fluentui/react';
import {
  addContact,
  changeAddContactsDialogOpen
} from '../../Redux/features/contacts/contacts-slice';
import { LoadingButton } from '../Universal/LoadingButton';
import { useScreenSize } from '../../Hooks/useScreenSize';
import { errorStyle, stageDropdownOptions } from '../../Constants/constants';
import { StageType } from '../../Constants/types';
import { date2ymd, ymd2Date } from '../../Utility/dateUtil';
import { isEmailValid, maskPhoneNumber } from '../../Utility/contactUtil';
import { useNavigate } from 'react-router-dom';

export const AddContactsDialog: React.FC = () => {
  const dialogOpen = useAppSelector(
    (state) => state.contacts.addContactsDialogOpen
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const scSize = useScreenSize();

  const emptyForm = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
    stage: '' as StageType,
    dob: '',
    address: ''
  };

  const emptyErrors = {
    fname: '',
    stage: '',
    email: '',
    file: ''
  };

  const [addLoading, setAddLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<{
    fname: string;
    lname: string;
    email: string;
    phone: string;
    stage: StageType;
    dob: string;
    address: string;
    file?: File;
  }>(emptyForm);
  const [errors, setErrors] = React.useState<{
    fname: string;
    stage: string;
    email: string;
    file: string;
  }>({ ...emptyErrors });

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const isFormValid = () => {
    const errorsClone = { ...errors };
    let isValid = true;
    if (!formData.fname) {
      errorsClone.fname = 'First name is required!';
      isValid = false;
    }
    if (!formData.stage) {
      errorsClone.stage = 'Stage is required!';
      isValid = false;
    }
    if (!isEmailValid(formData.email)) {
      errorsClone.email = 'Email is not valid!';
      isValid = false;
    }
    setErrors(errorsClone);
    return isValid;
  };
  const hideDialog = () => {
    if (!addLoading) {
      dispatch(changeAddContactsDialogOpen(false));
      setFormData(emptyForm);
      setErrors({ ...emptyErrors });
    }
  };
  const handleAdd = () => {
    if (isFormValid()) {
      setAddLoading(true);
      setTimeout(() => {
        setAddLoading(false);
        dispatch(
          addContact({
            // needs to be sent back from server
            id: '1010',
            address: formData.address,
            dob: formData.dob,
            email: formData.email,
            firstName: formData.fname,
            lastName: formData.lname,
            phone: formData.phone,
            stage: formData.stage
            // image: 'file name'
          })
        );
        hideDialog();
        setFormData(emptyForm);
        setErrors({ ...emptyErrors });
        navigate(`/contacts/1010`);
      }, 3000);
    }
  };
  return (
    <Dialog
      hidden={!dialogOpen}
      onDismiss={hideDialog}
      dialogContentProps={{
        type: DialogType.normal,
        title: 'Add Contact',
        showCloseButton: false
      }}
      modalProps={{
        isBlocking: addLoading,
        styles: {
          scrollableContent: {
            width: scSize.width > 800 ? '600px' : '90vw'
          },
          main: {
            maxWidth: 'none !important'
          }
        }
      }}
    >
      <form
        noValidate
        autoComplete='off'
        onSubmit={(ev) => {
          ev.preventDefault();
          handleAdd();
        }}
      >
        <Stack horizontal={scSize.width > 800} tokens={{ childrenGap: '10px' }}>
          <Stack.Item grow>
            <TextField
              label='First Name'
              iconProps={{ iconName: 'ContactInfo' }}
              required
              value={formData.fname}
              onChange={(_ev, newValue) => {
                if (newValue && newValue?.length > 0) {
                  setErrors({ ...errors, fname: '' });
                }
                setFormData({ ...formData, fname: newValue || '' });
              }}
              errorMessage={errors.fname}
            />
          </Stack.Item>
          <Stack.Item grow>
            <TextField
              label='Last Name'
              iconProps={{ iconName: 'ContactInfo' }}
              value={formData.lname}
              onChange={(_ev, newValue) => {
                setFormData({ ...formData, lname: newValue || '' });
              }}
            />
          </Stack.Item>
        </Stack>
        <Stack horizontal={scSize.width > 800} tokens={{ childrenGap: '10px' }}>
          <Stack.Item grow>
            <TextField
              label='Email'
              iconProps={{ iconName: 'Mail' }}
              value={formData.email}
              onChange={(_ev, newValue) => {
                if (isEmailValid(newValue || '')) {
                  setErrors({ ...errors, email: '' });
                }
                setFormData({ ...formData, email: newValue || '' });
              }}
              errorMessage={errors.email}
            />
          </Stack.Item>
          <Stack.Item grow>
            <TextField
              label='Phone Number'
              iconProps={{ iconName: 'Phone' }}
              value={formData.phone}
              maxLength={12}
              onKeyDown={(event) => {
                if (
                  isNaN(Number(event.key)) &&
                  event.key !== 'Backspace' &&
                  event.key !== 'Tab'
                ) {
                  event.preventDefault();
                }
              }}
              onChange={(_ev, newValue) => {
                if (newValue !== undefined) {
                  const masked = maskPhoneNumber(newValue);
                  setFormData({ ...formData, phone: masked });
                }
              }}
            />
          </Stack.Item>
        </Stack>
        <Stack horizontal={scSize.width > 800} tokens={{ childrenGap: '10px' }}>
          <Stack.Item grow>
            <Dropdown
              required
              label='Stage'
              selectedKey={formData.stage}
              onChange={(_ev, option) => {
                if (option) {
                  setFormData({ ...formData, stage: option.text as StageType });
                  setErrors({ ...errors, stage: '' });
                }
              }}
              options={stageDropdownOptions}
              calloutProps={{ directionalHintFixed: true }}
              styles={{
                root: {
                  width: scSize.width <= 800 ? '100%' : '271px'
                }
              }}
              errorMessage={errors.stage}
            />
          </Stack.Item>
          <Stack.Item grow>
            <DatePicker
              label='Date of Birth'
              allowTextInput
              maxDate={new Date()}
              minDate={new Date('1850-01-02')}
              styles={{
                root: {
                  width: scSize.width <= 800 ? '100%' : '271px'
                }
              }}
              formatDate={(date) => {
                if (date) {
                  return date2ymd(date) || '';
                }
                return '';
              }}
              value={formData.dob ? ymd2Date(formData.dob) : undefined}
              onSelectDate={(date) => {
                if (date) {
                  setFormData({ ...formData, dob: date2ymd(date) || '' });
                }
              }}
              showGoToToday={false}
              today={new Date('1-01-01')}
            />
          </Stack.Item>
        </Stack>
        <Stack horizontal={scSize.width > 800} tokens={{ childrenGap: '10px' }}>
          <Stack.Item grow>
            <TextField
              label='Address'
              iconProps={{ iconName: 'MapPin' }}
              value={formData.address}
              onChange={(_ev, newValue) => {
                setFormData({ ...formData, address: newValue || '' });
              }}
            />
          </Stack.Item>
          <Stack.Item>
            <Stack>
              <Label>Photo</Label>
              <DefaultButton
                onClick={() => {
                  hiddenFileInput.current?.click();
                }}
                styles={{
                  root: {
                    borderColor: !errors.file
                      ? 'rgb(138,136,134)'
                      : 'rgb(164, 38, 44)'
                  }
                }}
              >
                <span style={{ marginRight: '10px' }}>Upload</span>
                <Icon style={{ marginRight: '-10px' }} iconName='Upload' />
              </DefaultButton>
              <input
                type='file'
                style={{ display: 'none' }}
                ref={hiddenFileInput}
                accept='image/*,image/heic'
                onChange={(ev) => {
                  const newFile = ev?.target?.files?.[0];
                  if (newFile) {
                    if (newFile.size > 10485760) {
                      setFormData({ ...formData, file: undefined });
                      setErrors({ ...errors, file: 'Max File Size: 10 MB' });
                    } else {
                      setFormData({ ...formData, file: newFile });
                      setErrors({ ...errors, file: '' });
                    }
                  } else {
                    setFormData({ ...formData, file: undefined });
                    setErrors({ ...errors, file: 'Image upload failed' });
                  }
                }}
              />
            </Stack>
            <Stack>
              {!errors.file && (
                <span
                  style={{
                    marginTop: '5px',
                    fontWeight: '400',
                    fontSize: '12px'
                  }}
                >
                  {formData?.file?.name}
                </span>
              )}
              {errors.file && <span style={errorStyle}>{errors.file}</span>}
            </Stack>
          </Stack.Item>
        </Stack>
        <DialogFooter>
          <LoadingButton
            type='default'
            onClick={hideDialog}
            content={<span style={{ marginLeft: '5px' }}>Cancel</span>}
            loading={false}
            disabled={addLoading}
          />
          <LoadingButton
            type='primary'
            onClick={handleAdd}
            content={<span style={{ marginLeft: '5px' }}>Add</span>}
            loading={addLoading}
            disabled={Object.values(errors).reduce((acc, val) => {
              if (acc) {
                return acc;
              }
              return val.length > 0;
            }, false)}
          />
        </DialogFooter>
        <input type='submit' hidden />
      </form>
    </Dialog>
  );
};
