import React, {useState} from 'react';
import './TaskList.css';
import {
  tenantGuid,
  useCreateTaskMutation,
  useGetTasksQuery,
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

const getPriorityColor = (priority: string): string => {
  switch (priority.toLowerCase()) {
    case 'очень низкий':
      return 'lower';
    case 'низкий':
      return 'low';
    case 'средний':
      return 'middle';
    case 'высокий':
      return 'high';
    case 'критический':
      return 'critical';
    default:
      return '';
  }
};

const TaskList: React.FC = () => {
  const {data, error, isLoading, refetch} = useGetTasksQuery({tenantGuid});
  const [createTask] = useCreateTaskMutation();
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [isCreateTaskFormOpen, toggleCreateTaskForm] = useState(false);

  const [newTaskName, setNewTaskName] = useState('');

  const handleCreateTask = async () => {
    try {
      await createTask({tenantGuid, dto: {name: newTaskName}});
      refetch();
      toggleCreateTaskForm(false);
      setNewTaskName('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = (task: ITask) => {
    console.log(task);
    setSelectedTask(task);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading tasks</div>;
  }

  const tasks: ITask[] | undefined = data?.value;

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
                className={`taskList_priority-bar 
                  taskList_priority-bar-${getPriorityColor(task.priorityName)}`}
              >
                {task.id}
              </p>
            </td>
            <td className="taskList_name">{task.name}</td>
            <td>
              <p
                className={`taskList_status 
                  taskList_status-${getStatusColor(task.statusName)}`}
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
      {isCreateTaskFormOpen && (
        <CreateTaskForm
          onClose={() => {
            toggleCreateTaskForm(false);
            setNewTaskName('');
          }}
        />
      )}
      {selectedTask && (
        <EditTaskForm taskId={selectedTask.id} onClose={() => setSelectedTask(null)}/>
      )}
    </div>
  );
};

export default TaskList;
