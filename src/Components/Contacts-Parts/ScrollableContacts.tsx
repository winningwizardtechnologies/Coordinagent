import { List, Persona, PersonaSize, Stack } from '@fluentui/react';
import React from 'react';
import { colors } from '../../Constants/colors';
import { useMatch, useNavigate } from 'react-router-dom';
import { Contact } from '../../Constants/types';
import { useAppSelector } from '../../Hooks/useAppRedux';
import { getContactFullName } from '../../Utility/contactUtil';

export const ScrollableContacts: React.FC = () => {
  const navigate = useNavigate();
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
    </div>
  );
};
