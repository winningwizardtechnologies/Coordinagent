import React from 'react';
import { Header } from '../Header/Header';
import { Outlet } from 'react-router-dom';
import { MobileNav } from '../Header/MobileNav';
import { useScreenSize } from '../../Hooks/useScreenSize';

export const Root: React.FC = () => {
  const scSize = useScreenSize();
  return (
    <>
      <Header />
      <div style={{ minHeight: '100vh' }}>
        <Outlet />
      </div>
      {scSize.width <= 850 && <MobileNav />}
    </>
  );
};
