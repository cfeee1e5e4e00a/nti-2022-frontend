import { RouteObject } from 'react-router-dom';
import { withAuth } from 'hocs/withAuth';

import { Home } from 'pages/Dashboard/Home';
import { Journal } from 'pages/Dashboard/Journal';
import { NotFoundPage } from 'pages/NotFound';
import { Dashboard as UnguardedDashboard } from 'pages/Dashboard';
import { SignInPage as UnguardedSignInPage } from 'pages/SignIn';
import { SignUpPage as UnguardedSignUpPage } from 'pages/SignUp';
import { Patients } from 'pages/Dashboard/Patients';
import { MedicalCard } from 'pages/Dashboard/Patients/MedicalCard';

const Dashboard = withAuth(UnguardedDashboard, 'auth');
const SignInPage = withAuth(UnguardedSignInPage, 'noauth');
const SignUpPage = withAuth(UnguardedSignUpPage, 'auth');

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'journal',
        element: <Journal />,
      },
      {
        path: 'patients',
        element: <Patients />,
      },
      {
        path: 'patients/signup',
        element: <SignUpPage />,
      },
      {
        path: 'patients/:login',
        element: <MedicalCard />,
      },
    ],
  },
  {
    path: 'signin',
    element: <SignInPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
