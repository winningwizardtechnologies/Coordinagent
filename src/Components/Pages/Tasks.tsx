import React from 'react';

export const Tasks: React.FC = () => {
  React.useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);
  return <>Tasks</>;
};
