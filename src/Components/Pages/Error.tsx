import React from 'react';
import { Header } from '../Header/Header';
import { MobileNav } from '../Header/MobileNav';
import { useScreenSize } from '../../Hooks/useScreenSize';
import { ErrorContent } from '../Error-Parts/ErrorContent';

export const Error: React.FC = () => {
  React.useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);
  const scSize = useScreenSize();
  return (
    <>
      <Header />
      <ErrorContent />
      {scSize.width <= 850 && <MobileNav />}
    </>
  );
};
