import React from 'react';
import './TaskList.css';
import { tenantGuid, useGetTasksQuery } from '../../services/api';

interface Task {
  id: number;
  name: string;
  statusName: string;
  executorName: string;
}

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'открыта':
      return 'red';
    case 'закрыта':
      return 'green';
    case 'в работе':
      return 'orange';
    case 'выполнена':
      return 'lightgreen';
    case 'отложена':
      return 'gray';
    default:
      return '';
  }
};

const TaskList: React.FC = () => {
  const { data: tasks, error, isLoading } = useGetTasksQuery({ tenantGuid });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading tasks</div>;
  }

  return (
    <div className="taskList_container">
      <button className="taskList_button">Создать заявку</button>
      <table className="taskList_table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Статус</th>
          <th>Исполнитель</th>
        </tr>
        </thead>
        <tbody>
        { tasks?.value?.map((task: Task) => (
          <tr key={ task.id }>
            <td className="taskList_id">{ task.id }</td>
            <td className="taskList_name">{ task.name }</td>
            <td>
              <p
                className={ `taskList_status taskList_status-${ getStatusColor(task.statusName) }` }>{ task.statusName.toLowerCase() }</p>
            </td>
            <td className="taskList_executor">{ task.executorName }</td>
          </tr>
        )) }
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
