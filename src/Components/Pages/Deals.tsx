import React from 'react';

export const Deals: React.FC = () => {
  React.useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);
  return <>Deals</>;
};
