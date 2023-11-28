import {Outlet} from 'react-router-dom';
import React from 'react';
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";

const Layout: React.FC = () => (
  <>
    <Header/>
    <div className="main_container">
      <SearchBar/>
      <Outlet/>
    </div>
  </>
);

export { Layout };
