import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import TaskList from '../TaskList/TaskList';
import {Layout} from '../Layout/Layout';
import DataBase from "../DataBase/DataBase";
import Teams from "../Teams/Teams";
import Clients from "../Clients/Clients";
import Actives from "../Actives/Actives";
import Settings from "../Settings/Settings";
import {
  tenantGuid,
  useGetPrioritiesQuery,
  useGetStatusesQuery,
  useGetTasksQuery,
  useGetUsersQuery
} from "../../services/api";

const AppRouter: React.FC = () => {
  const {
    data: taskData,
    error: taskError,
    isLoading: taskIsLoading,
  } = useGetTasksQuery({tenantGuid});
  const {
    data: statusData,
    error: statusError,
    isLoading: statusIsLoading,
  } = useGetStatusesQuery(tenantGuid);
  const {
    data: priorityData,
    error: priorityError,
    isLoading: priorityIsLoading,
  } = useGetPrioritiesQuery(tenantGuid);
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUsersQuery(tenantGuid);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route path='/tasks' index element={
          <TaskList
            taskData={taskData}
            taskError={taskError}
            taskIsLoading={taskIsLoading}
            statusData={statusData}
            statusError={statusError}
            statusIsLoading={statusIsLoading}
            priorityData={priorityData}
            priorityError={priorityError}
            priorityIsLoading={priorityIsLoading}
            userData={userData}
            userError={userError}
            userIsLoading={userIsLoading}
          />}/>
        <Route path='/database' element={<DataBase/>}/>
        <Route path='/teams' element={<Teams/>}/>
        <Route path='/clients' element={<Clients/>}/>
        <Route path='/actives' element={<Actives/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path="*" element={""}/>
      </Route>
    )
  );

  return <RouterProvider router={router}/>;
};

export default AppRouter;
