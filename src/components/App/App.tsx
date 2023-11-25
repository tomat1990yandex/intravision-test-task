import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import {store} from "../../store/store";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";

const App: React.FC = () => (
    <Provider store={store}>
        <div className="App">
            <Header/>
            <SearchBar/>
        </div>
    </Provider>
);

export default App;
