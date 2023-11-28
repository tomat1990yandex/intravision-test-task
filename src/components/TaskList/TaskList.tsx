import React, { useState } from 'react';
import './TaskList.css';
import {
  tenantGuid,
  useGetPrioritiesQuery,
  useGetStatusesQuery,
  useGetTasksQuery,
  useGetUsersQuery,
} from '../../services/api';
import CreateTaskForm from '../CreateTaskForm/CreateTaskForm';
import EditTaskForm from '../EditTaskForm/EditTaskForm';

export interface ITask {
  id: number;
  name: string;
  statusName: string;
  executorName: string;
  priorityName: string;
}

export interface IStatus {
  id: number;
  name: string;
  rgb: string;
}

export interface IPriority {
  id: number;
  name: string;
  rgb: string;
}

export interface IUser {
  id: number;
  name: string;
}

interface ITitleData {
  name: string;
  style?: React.CSSProperties;
  styleChildren?: React.CSSProperties;
}

export const getStatusColor = (status: string, statuses: IStatus[]): string => {
  const statusObject = statuses.find((s) => s.name.toLowerCase() === status.toLowerCase());
  return statusObject ? statusObject.rgb : '';
};

export const getPriorityColor = (priority: string, priorities: IPriority[]): string => {
  const priorityObject = priorities.find((p) => p.name.toLowerCase() === priority.toLowerCase());
  return priorityObject ? priorityObject.rgb : '';
};

const TaskList: React.FC = () => {
  const { data: taskData, error: taskError, isLoading: taskIsLoading } = useGetTasksQuery({ tenantGuid });
  const { data: statusData, error: statusError, isLoading: statusIsLoading } = useGetStatusesQuery(tenantGuid);
  const { data: priorityData, error: priorityError, isLoading: priorityIsLoading } = useGetPrioritiesQuery(tenantGuid);
  const { data: userData, error: userError, isLoading: userIsLoading } = useGetUsersQuery(tenantGuid);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [isCreateTaskForm, toggleCreateTaskForm] = useState(false);

  const handleCreateTask = (taskId: number) => {
    console.log(taskId)
    toggleCreateTaskForm(false);
    setSelectedTask(taskData.find((task: ITask) => task.id === taskId));
  }

  const handleEditTask = (task: ITask) => {
    setSelectedTask(task);
  };

  if (taskIsLoading || statusIsLoading || priorityIsLoading || userIsLoading) {
    return <h1>Loading...</h1>;
  }

  if (taskError || statusError || priorityError || userError) {
    return <h1>Error loading</h1>;
  }

  const tasks: ITask[] | undefined = taskData?.value;
  const statuses: IStatus[] = statusData || [];
  const priorities: IPriority[] = priorityData || [];
  const users: IUser[] = userData || [];
  const titleData: ITitleData[] = [
    { name: 'ID', style: { width: 116, paddingRight: 15 } },
    { name: 'Название', style: { width: 419, textAlign: "left" } },
    { name: 'Статус', style: { width: 125, textAlign: "left" } },
    { name: 'Исполнитель', style: { textAlign: "left" }, styleChildren: { paddingLeft: 30 } },
  ];

  const renderTitleData = (titleDataObj: ITitleData) => (
    <th key={titleDataObj.name} className="taskList__table-title-container" style={titleDataObj.style}>
      <p className="taskList__table-title" style={titleDataObj.styleChildren}>{titleDataObj.name}</p>
    </th>
  );

  const formatId = (id: number): string => {
    const idString = id.toString();
    return idString.replace(/(\d{2})(\d+)/, '$1 $2');
  };

  return (
    <div className="taskList-container">
      <div className="taskList-button-container">
        <button
          className="taskList-button"
          onClick={() => {
            toggleCreateTaskForm(true)
            setSelectedTask(null)
          }}
        >
          Создать заявку
        </button>
      </div>
      <table className="taskList-table">
        <thead>
        <tr>
          {titleData.map(renderTitleData)}
        </tr>
        </thead>
        <tbody>
        {tasks?.map((task: ITask) => (
          <tr
            key={task.id}
            onClick={() => handleEditTask(task)}
            className="taskList-row"
          >
            <td className="taskList-id">
              <p
                style={{ borderLeftColor: getPriorityColor(task.priorityName, priorities) }}
                className={`taskList-priority-bar`}
              >
                {formatId(task.id)}
              </p>
            </td>
            <td>
              <p className="taskList-name">
                {task.name}
              </p>
            </td>
            <td>
              <p
                style={{ backgroundColor: getStatusColor(task.statusName, statuses) }}
                className={`taskList-status`}
              >
                {task.statusName.toLowerCase()}
              </p>
            </td>
            <td>
              <p className="taskList-executor">
                {task.executorName}
              </p>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {isCreateTaskForm && (
        <CreateTaskForm
          handleCreateTask={handleCreateTask}
          onClose={() => {
            toggleCreateTaskForm(false)
          }}
        />
      )}
      {selectedTask && (
        <EditTaskForm
          taskId={selectedTask.id}
          onClose={() => {
            toggleCreateTaskForm(false)
            setSelectedTask(null)
          }}
          statuses={statuses}
          users={users} />
      )}
    </div>
  );
};

export default TaskList;