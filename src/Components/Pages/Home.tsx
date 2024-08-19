import { ActionButton, PrimaryButton, Stack } from '@fluentui/react';
import React from 'react';

export const Home: React.FC = () => {
  React.useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);
  return <>Home</>;
};
