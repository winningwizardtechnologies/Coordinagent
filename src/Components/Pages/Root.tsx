import React from 'react';
import { Header } from '../Header/Header';
import { Outlet } from 'react-router-dom';
import { MobileNav } from '../Header/MobileNav';
import { useScreenSize } from '../../Hooks/useScreenSize';

export const Root: React.FC = () => {
  React.useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);
  const scSize = useScreenSize();
  return (
    <>
      <Header />
      <div
        style={{
          height: `calc(100vh - ${scSize.width < 375 ? '215px' : scSize.width <= 850 ? '241px' : '166px'})`
        }}
      >
        <Outlet />
      </div>
      {scSize.width <= 850 && <MobileNav />}
    </>
  );
};
