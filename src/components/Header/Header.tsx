// components/Header/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Заменили NavLink на Link
import './Header.css';
import Logo from '../../images/logo.png';
import dataBaseIcon from '../../images/dataBaseIcon.png';
import requestIcon from '../../images/requestsIcon.png';
import teamsIcon from '../../images/peoplesIcon.png';
import clientsIcon from '../../images/clientsIcon.png';
import activesIcon from '../../images/analyticsIcon.png';
import settingsIcon from '../../images/settingsIcon.png';
import AppRouter from '../Router/Router';

interface IMenu {
    name: string;
    logo: string;
    path: string;
}

const Header: React.FC = () => {
    const menuData: IMenu[] = [
        { name: 'База данных', logo: dataBaseIcon, path: '/database' },
        { name: 'Заявки', logo: requestIcon, path: '/tasks' },
        { name: 'Сотрудники', logo: teamsIcon, path: '/teams' },
        { name: 'Клиенты', logo: clientsIcon, path: '/clients' },
        { name: 'Активы', logo: activesIcon, path: '/actives' },
        { name: 'Настройки', logo: settingsIcon, path: '/settings' },
    ];

    const renderMenu = (menuObj: IMenu) => (
        <Link to={menuObj.path} className="menu_link" key={menuObj.name}>
            <figure className={'menu_container'}>
                <img src={menuObj.logo} className={'menu_icons'} alt="main icon" />
                <figcaption className={'menu_labels'}>{menuObj.name}</figcaption>
            </figure>
        </Link>
    );

    return (
        <div>
            <div className="header">
                <Link to="/">
                    <img src={Logo} className={'menu_logo'} alt="main icon" />
                </Link>
                {menuData.map(renderMenu)}
            </div>
        </div>
    );
};

export default Header;
