import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './Components/Pages/Root';
import { Contacts } from './Components/Pages/Contacts';
import { Tasks } from './Components/Pages/Tasks';
import { Deals } from './Components/Pages/Deals';
import { Error } from './Components/Pages/Error';
import { Home } from './Components/Pages/Home';
import { ErrorContent } from './Components/Error-Parts/ErrorContent';
import { Account } from './Components/Pages/Account';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      { path: '/account', element: <Account /> },
      { path: '/account/:section', element: <Account /> },
      { path: '/contacts', element: <Contacts /> },
      { path: '/contacts/:id', element: <Contacts /> },
      { path: '/tasks', element: <Tasks /> },
      { path: '/deals', element: <Deals /> },
      { path: '/404', element: <ErrorContent /> }
    ]
  }
]);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
