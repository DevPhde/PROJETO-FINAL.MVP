import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './Index';
import ErrorPage from './pages/ErrorPage';
import RecoveryPasswordPage from './pages/recoveryPassword';
import Dashboard from './pages/Dashboard'
import Login from "./pages/Login"
import { RegisterUser } from './pages/registerUser';
import RevenuesList from './pages/RevenuesList';
import ExpensesList from './pages/ExpensesList';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Index />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: '/',
//         element: <Login />
//       },
//       {
//         path: '/register',
//         element: <RegisterUser/>
//       },
//       {
//         path: '/recovery',
//         element: <RecoveryPasswordPage />
//       },
//       {
//         path:'/dashboard',
//         element: <Dashboard/>

//       },
//       {
//         path:'/dashboard/revenueslist',
//         element: <RevenuesList/>

//       },
//       {
//         path:'/dashboard/expenseslist',
//         element: <ExpensesList/>

//       }
//     ]
//   }
// ])


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Login />} />
          <Route path="register" element={<RegisterUser />} />
          <Route path="recovery" element={<RecoveryPasswordPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/revenueslist" element={<RevenuesList />} />
          <Route path="dashboard/expenseslist" element={<ExpensesList />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
// ReactDOM.createRoot(document.getElementById('root')).render(
//   // <React.StrictMode>
//     <RouterProvider router={router} />
//   // </React.StrictMode>
// )
