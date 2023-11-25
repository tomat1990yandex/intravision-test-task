import React from 'react';
import './SearchBar.css'
import searchIcon from "../../images/searchIcon.png"

const SearchBar: React.FC = () => {
    return (
        <div className={'searchBar'}>
            <div className={'search_container'}>
                <input type="text" className={'search_field'}/>
                <img src={searchIcon} className={'search_icon'} alt="searchIcon"/>
            </div>
        </div>
    );
};

export default SearchBar;
