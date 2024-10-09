import { Dropdown, Icon, Stack } from '@fluentui/react';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/useAppRedux';
import { changeSelectedFilters } from '../../Redux/features/contacts/contacts-slice';
import { stageDropdownOptions } from '../../Constants/constants';

export const FilterContacts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedFilters } = useAppSelector((state) => state.contacts);
  return (
    <Dropdown
      selectedKeys={selectedFilters}
      onChange={(_ev, option) => {
        if (option?.text) {
          if (selectedFilters.includes(option.text)) {
            dispatch(
              changeSelectedFilters(
                selectedFilters.filter((selection) => selection !== option.text)
              )
            );
          } else {
            dispatch(changeSelectedFilters([...selectedFilters, option.text]));
          }
        }
      }}
      multiSelect
      options={stageDropdownOptions}
      onRenderOption={(option) => {
        return <span style={{ paddingLeft: '3px' }}>{option?.text}</span>;
      }}
      calloutProps={{ directionalHintFixed: true }}
      onRenderPlaceholder={() => {
        return (
          <Stack horizontal verticalAlign='center'>
            <Icon
              styles={{ root: { marginRight: '10px' } }}
              iconName='Filter'
              aria-hidden='true'
            />
            <span>Filter Contacts</span>
          </Stack>
        );
      }}
      onRenderTitle={(options) => {
        const maxCharTolerance = 23;
        const processResult = options
          ? options.reduce(
              (acc, option, idx) => {
                const sumAfterAdd = acc.charSum + option.text.length;
                if (acc.charSum > maxCharTolerance) {
                  return acc;
                } else if (sumAfterAdd > maxCharTolerance) {
                  return { charSum: sumAfterAdd, lastIdx: acc.lastIdx };
                } else {
                  return { charSum: sumAfterAdd, lastIdx: idx };
                }
              },
              { charSum: 0, lastIdx: 0 }
            )
          : { charSum: 0, lastIdx: 0 };
        return (
          <Stack horizontal verticalAlign='center'>
            <Icon
              styles={{ root: { marginRight: '10px' } }}
              iconName='Filter'
              aria-hidden='true'
            />
            {options &&
              options.map((option, index) => {
                if (index === 0) {
                  return <span key={option.key}>{option.text}</span>;
                } else if (index <= processResult.lastIdx) {
                  return <span key={option.key}>, {option.text}</span>;
                } else if (index === processResult.lastIdx + 1) {
                  return <span key={option.key}>, ...</span>;
                } else {
                  return <></>;
                }
              })}
          </Stack>
        );
      }}
      styles={{
        dropdown: { width: '225px' }
      }}
    />
  );
};
