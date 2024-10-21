import {
  ActionButton,
  List,
  Persona,
  PersonaSize,
  Stack
} from '@fluentui/react';
import React from 'react';
import { colors } from '../../Constants/colors';
import { useMatch, useNavigate } from 'react-router-dom';
import { Contact } from '../../Constants/types';
import { useAppDispatch, useAppSelector } from '../../Hooks/useAppRedux';
import { getContactFullName } from '../../Utility/contactUtil';
import { changeAddContactsDialogOpen } from '../../Redux/features/contacts/contacts-slice';

const EmptyBook = require('../../../assets/emptyBook.svg');

export const ScrollableContacts: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const match = useMatch('/contacts/:id');
  const searchTerm = useAppSelector((state) => state.contacts.searchTerm);
  const filters = useAppSelector((state) => state.contacts.selectedFilters);
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const initContacts = contacts.map((contact) => {
    return {
      ...contact,
      bg: match?.params?.id === contact.id ? colors.grayLight : 'none'
    };
  });
  const [filteredContacts, setFilteredContacts] =
    React.useState<(Contact & { bg: string })[]>(initContacts);

  React.useEffect(() => {
    setFilteredContacts(
      filteredContacts.map((contact) => {
        if (contact.id === match?.params?.id) {
          return { ...contact, bg: colors.grayLight };
        } else {
          return { ...contact, bg: 'none' };
        }
      })
    );
  }, [match?.params?.id]);

  React.useEffect(() => {
    const stageFiltered =
      filters.length > 0
        ? initContacts.filter((contact) => filters.includes(contact.stage))
        : initContacts;
    const filtered = searchTerm
      ? stageFiltered.filter((contact) => {
          const fullName = getContactFullName(
            contact.firstName.toLocaleLowerCase(),
            contact.lastName?.toLocaleLowerCase()
          );
          return fullName.includes(searchTerm.toLocaleLowerCase());
        })
      : stageFiltered;
    setFilteredContacts(filtered);
  }, [searchTerm, filters]);

  React.useEffect(() => {
    setFilteredContacts(
      contacts.map((contact) => {
        return {
          ...contact,
          bg: match?.params?.id === contact.id ? colors.grayLight : 'none'
        };
      })
    );
  }, [contacts]);

  return (
    <div style={{ overflow: 'auto' }}>
      {contacts.length > 0 ? (
        <List
          items={filteredContacts}
          onRenderCell={(item) => {
            if (item) {
              return (
                <Stack
                  styles={{
                    root: {
                      borderBottom: '1px solid lightgray',
                      padding: '10px',
                      background: item.bg,
                      cursor: 'pointer'
                    }
                  }}
                  onClick={() => {
                    navigate(`/contacts/${item.id}`);
                  }}
                >
                  <Persona
                    text={getContactFullName(item.firstName, item.lastName)}
                    secondaryText={item.stage}
                    size={PersonaSize.size48}
                    initialsColor={colors.golden}
                    onRenderPrimaryText={() => {
                      return (
                        <span style={{ fontSize: '16px' }}>
                          {getContactFullName(item.firstName, item.lastName)}
                        </span>
                      );
                    }}
                  />
                </Stack>
              );
            }
            return <></>;
          }}
        />
      ) : (
        <Stack horizontalAlign='center'>
          <img
            src={EmptyBook}
            alt='Empty Contact List'
            width={100}
            height={100}
          />
          <span style={{ fontSize: '22px', fontWeight: '900' }}>
            No contacts
          </span>
          <span style={{ marginTop: '15px' }}>
            Currently, no contacts are available.
          </span>
          <ActionButton
            onClick={() => {
              dispatch(changeAddContactsDialogOpen(true));
            }}
            styles={{
              label: { color: colors.green, textDecoration: 'underline' }
            }}
          >
            Add contact
          </ActionButton>
        </Stack>
      )}
    </div>
  );
};
