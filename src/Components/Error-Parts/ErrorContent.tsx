import React from 'react';
import { useScreenSize } from '../../Hooks/useScreenSize';

export const ErrorContent: React.FC = () => {
  const scSize = useScreenSize();
  return (
    <div
      style={{
        height: `calc(100vh - ${scSize.width < 375 ? '215px' : scSize.width <= 850 ? '241px' : '166px'})`
      }}
    >
      Error 404 not found
    </div>
  );
};
