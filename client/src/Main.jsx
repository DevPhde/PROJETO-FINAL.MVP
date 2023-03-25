import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './Index';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import RecoveryPasswordPage from './pages/recoveryPassword';
import Dashboard from './pages/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/recovery',
        element: <RecoveryPasswordPage />
      },
      {
        path:'/dashboard',
        element: <Dashboard/>

      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
)
