import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import Logo from '../../images/logo.png';
import dataBaseIcon from '../../images/dataBaseIcon.png';
import requestIcon from '../../images/requestsIcon.png';
import teamsIcon from '../../images/peoplesIcon.png';
import clientsIcon from '../../images/clientsIcon.png';
import activesIcon from '../../images/analyticsIcon.png';
import settingsIcon from '../../images/settingsIcon.png';

interface IMenu {
  name: string;
  logo: string;
  path: string;
  style?: React.CSSProperties;
}

const Header: React.FC = () => {
  const menuData: IMenu[] = [
    {name: 'База данных', logo: dataBaseIcon, path: '/database', style: {gap: 6, marginTop: 3, paddingLeft: 1}},
    {name: 'Заявки', logo: requestIcon, path: '/tasks', style: {gap: 5}},
    {name: 'Сотрудники', logo: teamsIcon, path: '/teams', style: {gap: 7, marginTop: 3}},
    {name: 'Клиенты', logo: clientsIcon, path: '/clients', style: {gap: 5, paddingBottom: 5}},
    {name: 'Активы', logo: activesIcon, path: '/actives', style: {gap: 6, paddingBottom: 4}},
    {name: 'Настройки', logo: settingsIcon, path: '/settings', style: {gap: 5, paddingBottom: 3}},
  ];

  const renderMenu = (menuObj: IMenu) => (
    <Link to={menuObj.path} key={menuObj.name}>
      <figure style={menuObj.style} className={'menu_container'}>
        <img src={menuObj.logo} alt="main icon"/>
        <figcaption className={'menu_labels'}>{menuObj.name}</figcaption>
      </figure>
    </Link>
  );

  return (
    <div className="header">
      <Link to="/">
        <img src={Logo} className={'menu_logo'} alt="main icon"/>
      </Link>
      {menuData.map(renderMenu)}
    </div>
  );
};

export default Header;
