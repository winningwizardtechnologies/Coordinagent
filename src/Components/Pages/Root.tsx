import React from 'react';
import { Header } from '../Header/Header';
import { Outlet } from 'react-router-dom';

export const Root: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
