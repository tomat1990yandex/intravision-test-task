import React, {useState} from 'react';
import './TaskList.css';
import CreateTaskForm from '../CreateTaskForm/CreateTaskForm';
import EditTaskForm from '../EditTaskForm/EditTaskForm';

interface ITaskListProps {
  taskData?: { value: ITask[] };
  statusData?: IStatus[] | null;
  priorityData?: IPriority[] | null;
  userData?: IUser[] | null;
  taskIsLoading: boolean;
  statusIsLoading: boolean;
  priorityIsLoading: boolean;
  userIsLoading: boolean;
  taskError?: any;
  statusError?: any;
  priorityError?: any;
  userError?: any;
}

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

const TaskList: React.FC<ITaskListProps> = ({
                                              taskData,
                                              statusData,
                                              priorityData,
                                              userData,
                                              taskIsLoading,
                                              statusIsLoading,
                                              priorityIsLoading,
                                              userIsLoading,
                                              taskError,
                                              statusError,
                                              priorityError,
                                              userError
                                            }) => {

  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [isCreateTaskForm, toggleCreateTaskForm] = useState(false);

  if (taskIsLoading || statusIsLoading || priorityIsLoading || userIsLoading) {
    return <h1>Loading...</h1>;
  }

  if (taskError || statusError || priorityError || userError) {
    return <h1>Error loading</h1>;
  }
    const handleCreateTask = (taskId: number) => {
      toggleCreateTaskForm(false);
      setSelectedTask((prevTask) => ({ ...prevTask, id: taskId } as ITask));
    }

  const handleEditTask = (task: ITask) => {
    setSelectedTask(task);
  };


  const tasks: ITask[] = taskData?.value || [];
  const statuses: IStatus[] = statusData || [];
  const priorities: IPriority[] = priorityData || [];
  const users: IUser[] = userData || [];
  const titleData: ITitleData[] = [
    {name: 'ID', style: {width: 116, paddingRight: 15}},
    {name: 'Название', style: {width: 419, textAlign: "left"}},
    {name: 'Статус', style: {width: 125, textAlign: "left"}},
    {name: 'Исполнитель', style: {textAlign: "left"}, styleChildren: {paddingLeft: 30}},
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
                style={{borderLeftColor: getPriorityColor(task.priorityName, priorities)}}
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
                style={{backgroundColor: getStatusColor(task.statusName, statuses)}}
                className={`taskList-status`}
                title={task.statusName.toLowerCase()}
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
          users={users}/>
      )}
    </div>
  );
};

export default TaskList;