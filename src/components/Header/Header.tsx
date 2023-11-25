import React from 'react';
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
    logo: string; // Предполагая, что 'logo' - это путь к изображению
}

const Header: React.FC = () => {
    const menuData: IMenu[] = [
        {
            name: 'База данных',
            logo: dataBaseIcon,
        },
        {
            name: 'Заявки',
            logo: requestIcon,
        },
        {
            name: 'Сотрудники',
            logo: teamsIcon,
        },
        {
            name: 'Клиенты',
            logo: clientsIcon,
        },
        {
            name: 'Активы',
            logo: activesIcon,
        },
        {
            name: 'Настройки',
            logo: settingsIcon,
        },
    ];

    const renderMenu = (menuObj: IMenu) => (
        <figure className={'menu_container'} key={menuObj.name}>
            <img src={menuObj.logo} className={'menu_icons'} alt="main icon"/>
            <figcaption className={'menu_labels'}>{menuObj.name}</figcaption>
        </figure>
    );

    return (
        <div className="header">
            <img src={Logo} className={'menu_logo'} alt="main icon"/>
            {menuData.map(renderMenu)}
        </div>
    );
};

export default Header;
