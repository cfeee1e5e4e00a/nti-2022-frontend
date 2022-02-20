import { Outlet, useLocation } from 'react-router-dom';
import { useRealtime } from 'hooks/useRealtime';

import { RealtimeProvider } from 'contexts/realtime';
import { DashboardLayout } from 'layouts/DashboardLayout';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import 'styles/transition.css';

const LoaderTransition = () => {
  const { loaded } = useRealtime();

  return (
    <TransitionGroup className="w-full h-full">
      <CSSTransition key={String(loaded)} classNames="fade" timeout={300}>
        {loaded ? (
          <div className="w-full h-full flex-shrink flex flex-col p-8">
            <Outlet />
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <span className="loader w-20 h-20">Загрузка</span>
          </div>
        )}
      </CSSTransition>
    </TransitionGroup>
  );
};

export const Dashboard = () => {
  const location = useLocation();

  return (
    <DashboardLayout>
      <RealtimeProvider>
        <TransitionGroup className="w-full h-full">
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <LoaderTransition />
          </CSSTransition>
        </TransitionGroup>
      </RealtimeProvider>
    </DashboardLayout>
  );
};
