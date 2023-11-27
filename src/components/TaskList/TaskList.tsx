import React, {useState} from 'react';
import './TaskList.css';
import {tenantGuid, useGetPrioritiesQuery, useGetStatusesQuery, useGetTasksQuery,} from '../../services/api';
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

export const getStatusColor = (status: string, statuses: IStatus[]): string => {
  const statusObject = statuses.find((s) => s.name.toLowerCase() === status.toLowerCase());
  return statusObject ? statusObject.rgb : '';
};


export const getPriorityColor = (priority: string, priorities: IPriority[]): string => {
  const priorityObject = priorities.find((p) => p.name.toLowerCase() === priority.toLowerCase());
  return priorityObject ? priorityObject.rgb : '';
};

const TaskList: React.FC = () => {
  const {
    data: taskData,
    error: taskError,
    isLoading: taskIsLoading,
    refetch: taskRefetch
  } = useGetTasksQuery({tenantGuid});
  const {data: statusData, error: statusError, isLoading: statusIsLoading} = useGetStatusesQuery(tenantGuid);
  const {data: priorityData, error: priorityError, isLoading: priorityIsLoading} = useGetPrioritiesQuery(tenantGuid);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [isCreateTaskForm, toggleCreateTaskForm] = useState(false);

  const handleCreateTask = (taskId: number) => {
    taskRefetch();
    toggleCreateTaskForm(false);
    setSelectedTask({id: taskId, name: 'New Task', statusName: 'Открыта', executorName: '', priorityName: ''});
  }

  const handleEditTask = (task: ITask) => {
    setSelectedTask(task);
  };

  if (taskIsLoading || statusIsLoading || priorityIsLoading) {
    return <div>Loading...</div>;
  }

  if (taskError || statusError || priorityError) {
    return <div>Error loading tasks</div>;
  }

  const tasks: ITask[] | undefined = taskData?.value;
  const statuses: IStatus[] = statusData || [];
  const priorities: IPriority[] = priorityData || [];

  return (
    <div className="taskList_container">
      <div className="taskList_button_container">
        <button
          className="taskList_button"
          onClick={() => toggleCreateTaskForm(true)}
        >
          Создать заявку
        </button>
      </div>
      <table className="taskList_table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Статус</th>
          <th>Исполнитель</th>
          <th>Приоритет</th>
        </tr>
        </thead>
        <tbody>
        {tasks?.map((task: ITask) => (
          <tr
            key={task.id}
            onClick={() => handleEditTask(task)}
            className="taskList_row"
          >
            <td className="taskList_id">
              <p
                style={{ borderLeftColor: getPriorityColor(task.priorityName, priorities) }}
              className={`taskList_priority-bar`}
              >
                {task.id}
              </p>
            </td>
            <td className="taskList_name">{task.name}</td>
            <td>
              <p
                style={{backgroundColor: getStatusColor(task.statusName, statuses)}}
                className={`taskList_status`}
              >
                {task.statusName.toLowerCase()}
              </p>
            </td>
            <td className="taskList_executor">{task.executorName}</td>
            <td>{task.priorityName}</td>
          </tr>
        ))}
        </tbody>
      </table>
      {isCreateTaskForm && (
        <CreateTaskForm
          handleCreateTask={handleCreateTask}
          onClose={() => {
            toggleCreateTaskForm(false);
          }}
        />
      )}
      {selectedTask && (
        <EditTaskForm taskId={selectedTask.id} onClose={() => setSelectedTask(null)} statuses={statuses}/>
      )}
    </div>
  );
};

export default TaskList;
