import { RouteObject } from 'react-router-dom';
import { withAuth } from 'hocs/withAuth';

import { Home } from 'pages/Dashboard/Home';
import { Journal } from 'pages/Dashboard/Journal';
import { NotFoundPage } from 'pages/NotFound';
import { Dashboard as UnguardedDashboard } from 'pages/Dashboard';
import { SignInPage as UnguardedSignInPage } from 'pages/SignIn';
import { SignUpPage as UnguardedSignUpPage } from 'pages/SignUp';

const Dashboard = withAuth(UnguardedDashboard, 'auth');
const SignInPage = withAuth(UnguardedSignInPage, 'noauth');
const SignUpPage = withAuth(UnguardedSignUpPage, 'noauth');

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
    ],
  },
  {
    path: 'signin',
    element: <SignInPage />,
  },
  {
    path: 'signup',
    element: <SignUpPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
