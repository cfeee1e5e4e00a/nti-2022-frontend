import { DashboardLayout } from 'layouts/DashboardLayout';
import { Outlet } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};
