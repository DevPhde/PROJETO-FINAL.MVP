import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './Index';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import RecoveryPasswordPage from './pages/recoveryPassword';
import Dashboard from './pages/Dashboard'
import Login from "./pages/Login"
import { RegisterUser } from './pages/registerUser';
import RevenuesList from './pages/RevenuesList';
import ExpensesList from './pages/ExpensesList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/register',
        element: <RegisterUser/>
      },
      {
        path: '/recovery',
        element: <RecoveryPasswordPage />
      },
      {
        path:'/dashboard',
        element: <Dashboard/>

      },
      {
        path:'/dashboard/revenueslist',
        element: <RevenuesList/>

      },
      {
        path:'/dashboard/expenseslist',
        element: <ExpensesList/>

      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
)
