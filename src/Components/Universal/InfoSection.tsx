import {
  DatePicker,
  Icon,
  PersonaSize,
  Stack,
  TextField,
  TooltipHostBase
} from '@fluentui/react';
import React from 'react';
import { ImagePersona } from './ImagePersona';
import { colors } from '../../Constants/colors';
import {
  getContactFullName,
  getInitials,
  maskPhoneNumber
} from '../../Utility/contactUtil';
import { useAppDispatch, useAppSelector } from '../../Hooks/useAppRedux';
import { SectionHeader } from './SectionHeader';
import { changeAccountDetails } from '../../Redux/features/account/account-slice';
import { date2ymd, ymd2Date } from '../../Utility/dateUtil';
import { useScreenSize } from '../../Hooks/useScreenSize';

export const InfoSection: React.FC = () => {
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const scSize = useScreenSize();

  const emptyErrors = {
    fname: '',
    file: ''
  };

  const accountDefaults = {
    fname: account.firstName,
    lname: account.lastName,
    phone: account.phone,
    dob: account.dob,
    address: account.address,
    file: account.image
  };

  const [editing, setEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<{
    fname: string;
    lname: string;
    phone: string;
    dob: string;
    address: string;
    file?: string;
  }>({ ...accountDefaults });
  const [errors, setErrors] = React.useState<{
    fname: string;
    file: string;
  }>({ ...emptyErrors });
  return (
    <>
      <SectionHeader
        headerTitle='Account Info'
        editProps={{
          hasError: errors.fname?.length > 0,
          editing: editing,
          loading: loading,
          onEditClick: () => {
            setEditing(true);
          },
          onCancel: () => {
            setFormData({ ...accountDefaults });
            setErrors({ ...emptyErrors });
            setEditing(false);
          },
          onSave: async () => {
            if (formData.fname) {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setEditing(false);
                dispatch(
                  changeAccountDetails({
                    ...account,
                    address: formData.address,
                    dob: formData.dob,
                    firstName: formData.fname,
                    lastName: formData.lname,
                    phone: formData.phone
                  })
                );
              }, 4000);
            } else {
              setErrors({ ...errors, fname: 'First name is required!' });
            }
          }
        }}
      />
      <Stack horizontalAlign='center'>
        <ImagePersona
          text={''}
          secondaryText={''}
          size={PersonaSize.size120}
          initialsColor={colors.golden}
          image={account.image}
          imageInitials={getInitials(account.firstName, account.lastName)}
          styles={{ details: { padding: '0px' } }}
        />
        <span
          style={{
            marginTop: '10px',
            fontSize: '18px',
            fontWeight: 'bolder'
          }}
        >
          {getContactFullName(account.firstName, account.lastName)}
        </span>
        <span style={{ marginTop: '5px', fontSize: '13px' }}>
          {account.email}
        </span>
      </Stack>
      <Stack
        horizontal={scSize.width > 850}
        tokens={{ childrenGap: scSize.width > 850 ? '0px' : '20px' }}
      >
        <Stack horizontal horizontalAlign='center' grow>
          <TextField
            readOnly={!editing || loading}
            label='First Name'
            iconProps={{ iconName: 'ContactInfo' }}
            required={editing}
            value={formData.fname}
            styles={{ root: { width: '80%' } }}
            onChange={(_ev, newValue) => {
              if (newValue && newValue?.length > 0) {
                setErrors({ ...errors, fname: '' });
              }
              setFormData({ ...formData, fname: newValue || '' });
            }}
            errorMessage={errors.fname}
          />
        </Stack>
        <Stack horizontal horizontalAlign='center' grow>
          <TextField
            readOnly={!editing || loading}
            label='Last Name'
            styles={{ root: { width: '80%' } }}
            iconProps={{ iconName: 'ContactInfo' }}
            value={formData.lname}
            width={270}
            onChange={(_ev, newValue) => {
              setFormData({ ...formData, lname: newValue || '' });
            }}
          />
        </Stack>
      </Stack>
      <Stack
        horizontal={scSize.width > 850}
        tokens={{ childrenGap: scSize.width > 850 ? '0px' : '20px' }}
      >
        <Stack horizontal horizontalAlign='center' grow>
          <TextField
            label='Phone Number'
            readOnly={!editing || loading}
            iconProps={{ iconName: 'Phone' }}
            value={formData.phone}
            maxLength={12}
            styles={{ root: { width: '80%' } }}
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
        </Stack>
        <Stack horizontal horizontalAlign='center' grow>
          <DatePicker
            textField={{ readOnly: !editing || loading }}
            calloutProps={{ hidden: !editing || loading }}
            label='Date of Birth'
            allowTextInput
            maxDate={new Date()}
            minDate={new Date('1850-01-02')}
            styles={{
              root: {
                width: '80%'
              },
              statusMessage: { display: 'none' }
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
        </Stack>
      </Stack>
      <Stack
        horizontal={scSize.width > 850}
        tokens={{ childrenGap: scSize.width > 850 ? '0px' : '20px' }}
      >
        <Stack horizontal horizontalAlign='center' grow>
          <TextField
            readOnly={!editing || loading}
            styles={{ root: { width: '80%' } }}
            label='Address'
            iconProps={{ iconName: 'MapPin' }}
            value={formData.address}
            onChange={(_ev, newValue) => {
              setFormData({ ...formData, address: newValue || '' });
            }}
          />
        </Stack>
        <Stack horizontal horizontalAlign='center' grow>
          <TextField
            label='Email'
            onRenderLabel={() => {
              return (
                <Stack horizontal verticalAlign='center'>
                  <span
                    style={{
                      padding: '5px 0px',
                      color: '#323130',
                      fontWeight: '600',
                      marginRight: '5px'
                    }}
                  >
                    Email
                  </span>{' '}
                  <TooltipHostBase content='Account email cannot be modified'>
                    <Icon
                      iconName='Info'
                      styles={{ root: { fontWeight: '600' } }}
                    />
                  </TooltipHostBase>
                </Stack>
              );
            }}
            iconProps={{ iconName: 'Mail' }}
            defaultValue={account.email}
            disabled
            styles={{ root: { width: '80%' } }}
          />
        </Stack>
      </Stack>
    </>
  );
};
