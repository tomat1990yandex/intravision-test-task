import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {store} from '../../store/store';
import AppRouter from "../Router/Router";

const App: React.FC = () => (
    <Provider store={store}>
        <div className="App">
            <AppRouter/>
        </div>
    </Provider>
);

export default App;
