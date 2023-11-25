import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import TaskList from '../TaskList/TaskList';
import { Layout } from '../Layout/Layout';

const AppRouter: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={ <Layout/> }>
        <Route path='/tasks' index element={ <TaskList/> }/>
        <Route path="*" element={ "" }/>
      </Route>
    )
  );

  return <RouterProvider router={ router }/>;
};

export default AppRouter;
