import React from 'react';
import { Header } from '../Header/Header';
import { MobileNav } from '../Header/MobileNav';
import { useScreenSize } from '../../Hooks/useScreenSize';

export const Error: React.FC = () => {
  React.useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);
  const scSize = useScreenSize();
  return (
    <>
      <Header />
      <div
        style={{
          minHeight: `calc(100vh - ${scSize.width <= 850 ? '196px' : '121px'})`
        }}
      >
        Error 404 not found
      </div>
      {scSize.width <= 850 && <MobileNav />}
    </>
  );
};
