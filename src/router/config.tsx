import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const DashboardPage = lazy(() => import('../pages/dashboard/page'));
const OwnerTestPage = lazy(() => import('../pages/owner-test/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/owner-test',
    element: <OwnerTestPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;