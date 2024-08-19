import React from 'react';

export const Contacts: React.FC = () => {
  React.useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);
  return <>Contacts</>;
};
