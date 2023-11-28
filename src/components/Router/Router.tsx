import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import TaskList from '../TaskList/TaskList';
import { Layout } from '../Layout/Layout';
import DataBase from "../DataBase/DataBase";
import Teams from "../Teams/Teams";
import Clients from "../Clients/Clients";
import Actives from "../Actives/Actives";
import Settings from "../Settings/Settings";

const AppRouter: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={ <Layout/> }>
        <Route path='/tasks' index element={ <TaskList/> }/>
        <Route path='/database' element={ <DataBase/>} />
        <Route path='/teams' element={ <Teams/>} />
        <Route path='/clients' element={ <Clients/>} />
        <Route path='/actives' element={ <Actives/>} />
        <Route path='/settings' element={ <Settings/>} />
        <Route path="*" element={ "" }/>
      </Route>
    )
  );

  return <RouterProvider router={ router }/>;
};

export default AppRouter;
