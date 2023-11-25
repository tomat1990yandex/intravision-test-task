import {Outlet} from 'react-router-dom';
import React from 'react';
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";

function Layout() {
    return (
        <>
            <Header />
            <SearchBar />
            <Outlet />
        </>
    );
}

export { Layout };
