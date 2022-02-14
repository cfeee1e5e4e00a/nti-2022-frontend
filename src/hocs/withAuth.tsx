import { useAuth } from 'hooks/useAuth';
import { ComponentType } from 'react';

import { Navigate } from 'react-router-dom';

type RedirectStrategy = 'auth' | 'noauth';

export const withAuth = <BaseProps extends {}>(
  Component: ComponentType<BaseProps>,
  strategy: RedirectStrategy
) => {
  type Props = BaseProps;

  return ({ ...props }: Props) => {
    const auth = useAuth();

    switch (strategy) {
      case 'auth':
        return auth.authed ? (
          <Component {...props} />
        ) : (
          <Navigate to="signin" />
        );

      case 'noauth':
        return !auth.authed ? <Component {...props} /> : <Navigate to="/" />;
    }
  };
};
