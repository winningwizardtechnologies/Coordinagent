import { DefaultButton, PrimaryButton, Spinner } from '@fluentui/react';
import React from 'react';

export const LoadingButton: React.FC<{
  loading: boolean;
  content: React.JSX.Element;
  type: 'primary' | 'default';
  onClick: () => void;
  disabled: boolean;
}> = (props) => {
  return props.type === 'primary' ? (
    <PrimaryButton
      disabled={props.loading || props.disabled}
      onClick={props.onClick}
    >
      {props.loading && <Spinner />}
      {props.content}
    </PrimaryButton>
  ) : (
    <DefaultButton
      disabled={props.loading || props.disabled}
      onClick={props.onClick}
    >
      {props.loading && <Spinner />}
      {props.content}
    </DefaultButton>
  );
};
