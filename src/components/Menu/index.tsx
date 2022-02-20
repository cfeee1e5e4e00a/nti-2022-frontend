import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { Icon } from 'common/icon';

import { MenuItem } from './MenuItem';
import { CollectionIcon, HomeIcon, UserIcon } from '@heroicons/react/outline';

type MenuItemType = {
  displayName: string;
  icon: Icon;
  pathname: string;
};

const findCurrentPage = (pathname: string) => (location: MenuItemType) =>
  location.pathname.includes(pathname);

export const Menu = () => {
  const location = useLocation();
  const go = useNavigate();
  const auth = useAuth();

  const menuItems: MenuItemType[] = [
    {
      displayName: 'Главная',
      icon: HomeIcon,
      pathname: '/',
    },
  ];

  if (auth.role === 'doctor') {
    menuItems.push({
      displayName: 'Журнал',
      icon: CollectionIcon,
      pathname: '/journal',
    });
    menuItems.push({
      displayName: 'Пациенты',
      icon: UserIcon,
      pathname: '/patients',
    });
  }

  if (auth.role === 'patient') {
    menuItems.push({
      displayName: 'Моя карта',
      icon: UserIcon,
      pathname: `/patients/${auth.login}`,
    });
  }

  const currentPage = useMemo(
    () => menuItems.find(findCurrentPage(location.pathname)),
    [location.pathname]
  );

  const changePage = (pathname: string) => () => go(pathname);
  const signout = () => auth.signout();

  return (
    <nav className="flex flex-col bg-white rounded-r-3xl">
      <ul className="px-8 py-10 flex-grow flex flex-col items-center justify-start gap-8">
        {menuItems.map(({ displayName, icon, pathname }) => (
          <MenuItem
            displayName={displayName}
            icon={icon}
            key={displayName}
            isCurrent={displayName === currentPage?.displayName}
            onClick={changePage(pathname)}
          />
        ))}
      </ul>
      <div className="w-full px-4 py-8 flex flex-col items-center justify-center gap-4 text-xl">
        <span className="text-center">{`${auth.profile?.name} ${auth.profile?.surname}`}</span>
        {auth.role === 'doctor' && <span className="text-center">Врач</span>}
        {auth.role === 'patient' && (
          <span className="text-center">Пациент</span>
        )}
        <span className="cursor-pointer" onClick={signout}>
          ← Выйти
        </span>
      </div>
    </nav>
  );
};
