import React from 'react';
import { Header } from '../Header/Header';
import { MobileNav } from '../Header/MobileNav';
import { useScreenSize } from '../../Hooks/useScreenSize';

export const Error: React.FC = () => {
  const scSize = useScreenSize();
  return (
    <>
      <Header />
      <>Error 404 not found</>
      {scSize.width <= 850 && <MobileNav />}
    </>
  );
};
