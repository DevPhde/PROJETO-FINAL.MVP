import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './Index';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import RecoveryPasswordPage from './pages/recoveryPassword';
import RegisterUser from './pages/registerUser'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/registerUser',
        element: <RegisterUser />
      },
      {
        path: '/recovery',
        element: <RecoveryPasswordPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
)
