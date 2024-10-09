import {
  ActionButton,
  Calendar,
  Callout,
  DirectionalHint,
  FocusTrapZone,
  Icon,
  Stack,
  TextField
} from '@fluentui/react';
import React from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { EmptyDetails } from './EmptyDetails';
import { useAppDispatch, useAppSelector } from '../../Hooks/useAppRedux';
import {
  getContactFullName,
  isEmailValid,
  maskPhoneNumber
} from '../../Utility/contactUtil';
import { useScreenSize } from '../../Hooks/useScreenSize';
import { Contact, StageType } from '../../Constants/types';
import { changeContactDetails } from '../../Redux/features/contacts/contacts-slice';
import { BackButton } from './BackButton';
import { ContactDetailsHeader } from './ContactDetailsHeader';
import { date2ymd, ymd2Date } from '../../Utility/dateUtil';
import { changeAccountDetails } from '../../Redux/features/account/account-slice';

export const ContactDetails: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const scSize = useScreenSize();
  const match = useMatch('/contacts/:id');
  const account = useAppSelector((state) => state.account);
  const contacts = useAppSelector((state) => state.contacts.contacts);

  const contact = React.useMemo(() => {
    const allContacts = [account, ...contacts];
    return (
      allContacts.find((contact) => {
        return contact.id === match?.params?.id;
      }) || ({} as Contact)
    );
  }, [account, contacts, match?.params?.id]);

  const [editMode, setEditMode] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [localContact, setLocalContact] = React.useState(contact);
  const [showCalendar, setShowCalendar] = React.useState(false);

  const emptyErrors = {
    fname: '',
    email: ''
  };
  const [errors, setErrors] = React.useState<{
    fname: string;
    email: string;
  }>({ ...emptyErrors });

  const calendarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (match?.params?.id && !contact.id) {
      navigate('/404');
    } else {
      setErrors({ ...emptyErrors });
      setEditMode(false);
      setIsSaving(false);
      setLocalContact({ ...contact });
    }
  }, [match?.params?.id]);

  const isUserAccount = contact.stage === 'Account';
  const fullname = getContactFullName(
    contact.firstName || '',
    contact.lastName,
    isUserAccount
  );

  const horizontalView = scSize.width >= 1024;
  const leftColStyle = { root: { width: horizontalView ? '45%' : '100%' } };
  const rightColStyle = {
    root: {
      width: horizontalView ? '50%' : '100%',
      marginTop: horizontalView ? '0px' : '5%'
    }
  };

  const labelRenderer = (text: string) => {
    const iconName =
      text === 'First Name' || text === 'Last Name'
        ? 'ContactInfo'
        : text === 'Email'
          ? 'Mail'
          : text === 'Phone Number'
            ? 'Phone'
            : text === 'Date of Birth'
              ? 'Calendar'
              : 'MapPin';
    const icon = (
      <div ref={calendarRef}>
        <Icon
          styles={{
            root: {
              paddingTop: '10px',
              paddingLeft: '5px'
            }
          }}
          iconName={iconName}
        />
      </div>
    );
    return (
      <Stack
        onClick={() => {
          if (editMode && text === 'Date of Birth') {
            setShowCalendar(true);
          }
        }}
        horizontal
      >
        {icon}
        <span
          style={{
            fontWeight: '600',
            padding: '7px 20px 0px 10px'
          }}
        >
          {text}
        </span>
      </Stack>
    );
  };

  return (
    <Stack
      verticalFill
      styles={{
        root: {
          border: '1px solid lightgray'
        }
      }}
    >
      {!match && <EmptyDetails />}
      {match && contact && (
        <>
          <BackButton targetRoute='/contacts' />
          <Stack
            styles={{
              root: {
                padding: scSize.width > 350 ? '25px' : '10px',
                overflowY: 'auto'
              }
            }}
          >
            <ContactDetailsHeader
              formHasErrors={errors.fname.length > 0 || errors.email.length > 0}
              persona={{
                name: fullname,
                stage: isUserAccount ? '' : contact.stage,
                image: localContact.image
              }}
              editMode={editMode}
              isSaving={isSaving}
              hideDropdown={isUserAccount}
              dropDownKey={localContact.stage}
              onEdit={() => {
                setEditMode(true);
              }}
              onCancel={() => {
                setEditMode(false);
                setLocalContact({ ...contact });
              }}
              onSave={() => {
                if (
                  !localContact.firstName ||
                  !isEmailValid(localContact.email)
                ) {
                  const clone = { ...errors };
                  if (!localContact.firstName) {
                    clone.fname = 'First name is required!';
                  } else {
                    clone.fname = '';
                  }
                  if (!isEmailValid(localContact.email)) {
                    clone.email = 'Email is not valid!';
                  } else {
                    clone.email = '';
                  }
                  setErrors({ ...clone });
                } else {
                  setErrors({ ...emptyErrors });
                  setIsSaving(true);
                  setTimeout(() => {
                    if (isUserAccount) {
                      dispatch(changeAccountDetails({ ...localContact }));
                    } else {
                      dispatch(
                        changeContactDetails({
                          contactId: contact.id,
                          details: { ...localContact }
                        })
                      );
                    }
                    setEditMode(false);
                    setIsSaving(false);
                  }, 2000);
                }
              }}
              onDropDownSelect={(option) => {
                setLocalContact({
                  ...localContact,
                  stage: option as StageType
                });
              }}
            />
            <Stack
              styles={{ root: { marginTop: '50px' } }}
              tokens={{ childrenGap: '5%' }}
            >
              <Stack
                horizontal={horizontalView}
                horizontalAlign='space-between'
              >
                <Stack.Item styles={leftColStyle}>
                  <TextField
                    onRenderLabel={() => {
                      return labelRenderer('First Name');
                    }}
                    required={editMode}
                    errorMessage={errors.fname}
                    underlined
                    readOnly={!editMode}
                    value={localContact.firstName}
                    onChange={(_ev, newValue) => {
                      if (newValue !== undefined) {
                        setLocalContact({
                          ...localContact,
                          firstName: newValue
                        });
                      }
                    }}
                  />
                </Stack.Item>
                <Stack.Item styles={rightColStyle}>
                  <TextField
                    onRenderLabel={() => {
                      return labelRenderer('Last Name');
                    }}
                    underlined
                    readOnly={!editMode}
                    value={localContact.lastName}
                    onChange={(_ev, newValue) => {
                      if (newValue !== undefined) {
                        setLocalContact({
                          ...localContact,
                          lastName: newValue
                        });
                      }
                    }}
                  />
                </Stack.Item>
              </Stack>
              <Stack
                horizontal={horizontalView}
                horizontalAlign='space-between'
              >
                <Stack.Item styles={leftColStyle}>
                  <TextField
                    errorMessage={errors.email}
                    onRenderLabel={() => {
                      return labelRenderer('Email');
                    }}
                    underlined
                    readOnly={!editMode}
                    value={localContact.email}
                    onChange={(_ev, newValue) => {
                      if (newValue !== undefined) {
                        setLocalContact({
                          ...localContact,
                          email: newValue
                        });
                      }
                    }}
                  />
                </Stack.Item>
                <Stack.Item styles={rightColStyle}>
                  <TextField
                    onRenderLabel={() => {
                      return labelRenderer('Phone Number');
                    }}
                    underlined
                    readOnly={!editMode}
                    value={localContact.phone}
                    maxLength={12}
                    onChange={(_ev, newValue) => {
                      if (newValue !== undefined) {
                        const masked = maskPhoneNumber(newValue);
                        setLocalContact({ ...contact, phone: masked });
                      }
                    }}
                    onKeyDown={(event) => {
                      if (
                        isNaN(Number(event.key)) &&
                        event.key !== 'Backspace' &&
                        event.key !== 'Tab'
                      ) {
                        event.preventDefault();
                      }
                    }}
                  />
                </Stack.Item>
              </Stack>
              <Stack
                horizontal={horizontalView}
                horizontalAlign='space-between'
              >
                <Stack.Item styles={leftColStyle}>
                  <TextField
                    onRenderLabel={() => {
                      return labelRenderer('Address');
                    }}
                    underlined
                    readOnly={!editMode}
                    value={localContact.address}
                    onChange={(_ev, newValue) => {
                      if (newValue !== undefined) {
                        setLocalContact({
                          ...localContact,
                          address: newValue
                        });
                      }
                    }}
                  />
                </Stack.Item>
                <Stack.Item styles={rightColStyle}>
                  <TextField
                    onRenderLabel={() => {
                      return labelRenderer('Date of Birth');
                    }}
                    styles={{
                      wrapper: { cursor: editMode ? 'pointer' : 'default' },
                      field: { cursor: editMode ? 'pointer' : 'default' }
                    }}
                    underlined
                    readOnly
                    value={localContact.dob}
                    onClick={() => {
                      if (editMode) {
                        setShowCalendar(true);
                      }
                    }}
                  />
                </Stack.Item>
              </Stack>
            </Stack>
          </Stack>
          {showCalendar && (
            <Callout
              target={calendarRef}
              isBeakVisible={false}
              gapSpace={0}
              directionalHint={DirectionalHint.bottomLeftEdge}
              onDismiss={() => {
                setShowCalendar(false);
              }}
            >
              <FocusTrapZone isClickableOutsideFocusTrap>
                <Stack
                  horizontal
                  styles={{
                    root: { marginLeft: '12px', marginBottom: '-10px' }
                  }}
                >
                  <ActionButton
                    iconProps={{
                      iconName: 'Clear',
                      styles: { root: { fontSize: '12px' } }
                    }}
                    onClick={() => {
                      setLocalContact({
                        ...localContact,
                        dob: ''
                      });
                      setShowCalendar(false);
                    }}
                  >
                    Clear
                  </ActionButton>
                </Stack>
                <Calendar
                  maxDate={new Date()}
                  minDate={new Date('1850-01-02')}
                  value={ymd2Date(localContact.dob)}
                  showGoToToday={false}
                  onSelectDate={(date) => {
                    const stringDate = date2ymd(date) || '';
                    if (stringDate) {
                      setLocalContact({
                        ...localContact,
                        dob: stringDate
                      });
                      setShowCalendar(false);
                    }
                  }}
                />
              </FocusTrapZone>
            </Callout>
          )}
        </>
      )}
    </Stack>
  );
};
