import React, {useEffect, useState} from 'react';
import {tenantGuid, useGetTasksByIdQuery, useUpdateTaskMutation} from '../../services/api';
import TitleBar from '../TitleBar/TitleBar';
import calendarIcon from '../../images/calendarIcon.png';
import './EditTaskForm.css';
import {getStatusColor, IStatus, IUser} from '../TaskList/TaskList';
import Select from 'react-select';


interface EditTaskFormProps {
  taskId: number;
  statuses: IStatus[];
  users: IUser[];
  onClose: () => void;
}

interface TaskFormData {
  name: string;
  description: string;
  price: number;
  statusName: string;
  initiatorName: string;
  executorName: string;
  priorityName: string;
  resolutionDatePlan: string;
  tags: { id: number; name: string }[];
  lifetimeItems: {
    createdAt: string;
    userName: string;
    comment: string;
    id: string;
    newFieldValue: string;
    oldFieldValue: string;
  }[];
  statusId: string;
  executorId: string;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({taskId, onClose, statuses, users}) => {
  const [taskFormData, setTaskFormData] = useState<TaskFormData>({
    name: '',
    description: '',
    price: 0,
    statusName: '',
    initiatorName: '',
    executorName: '',
    priorityName: '',
    resolutionDatePlan: '',
    tags: [],
    lifetimeItems: [],
    statusId: '',
    executorId: '',
  });

  const {data: taskData} = useGetTasksByIdQuery({tenantGuid, id: taskId});
  const [updateTask, {isLoading}] = useUpdateTaskMutation();
  const [newComment, setNewComment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<IStatus | null>(null);
  const [selectedExecutor, setSelectedExecutor] = useState<IUser | null>(null);
  const [isStatusEditMode, setStatusEditMode] = useState(false);
  const [isExecutorEditMode, setExecutorEditMode] = useState(false);


  useEffect(() => {
    if (taskData) {
      setTaskFormData({
        name: taskData.name,
        description: taskData.description,
        price: taskData.price,
        statusName: taskData.statusName,
        initiatorName: taskData.initiatorName,
        executorName: taskData.executorName,
        priorityName: taskData.priorityName,
        resolutionDatePlan: taskData.resolutionDatePlan,
        tags: taskData.tags,
        lifetimeItems: taskData.lifetimeItems,
        statusId: taskData.statusId,
        executorId: taskData.executorId,
      });

      if (!selectedStatus) {
        const defaultStatus = statuses.find((status) => status.name === taskData.statusName);
        setSelectedStatus(defaultStatus || null);
      }

      if (!selectedExecutor) {
        const defaultExecutor = users.find((user) => user.name === taskData.executorName);
        setSelectedExecutor(defaultExecutor || null);
      }
    }
  }, [taskData, taskId, statuses, selectedStatus, users, selectedExecutor]);

  const formatDateString = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      };
      const formatter = new Intl.DateTimeFormat('ru-RU', options);
      return `${formatter.format(date)}г.`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };
  const formatDateCommentString = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const optionDate: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
      };
      const optionTime: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
      };
      const formatter = new Intl.DateTimeFormat('ru-RU', optionDate);
      const formatterTime = new Intl.DateTimeFormat('ru-RU', optionTime);
      return `${formatter.format(date)}, ${formatterTime.format(date)} прокомментировал`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };


  const handleNewCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await updateTask({
        tenantGuid,
        dto: {
          id: taskId,
          comment: newComment,
          statusId: taskFormData.statusId,
          executorId: taskFormData.executorId,
        },
      });

      if ('error' in response) {
        const errorData = response.error as { status: number; data: unknown };
        throw new Error(errorData?.data?.toString() || 'Unknown error');
      }

      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  const handleStatusChange = async (selected: IStatus | null) => {
    if (selected) {
      try {
        const response = await updateTask({
          tenantGuid,
          dto: {
            id: taskId,
            executorId: taskFormData.executorId,
            statusId: selected.id,
          },
        });

        if ('error' in response) {
          const errorData = response.error as { status: number; data: unknown };
          throw new Error(errorData?.data?.toString() || 'Unknown error');
        }
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }

    setSelectedStatus(selected);
    setStatusEditMode(false);
  };

  const renderStatusField = () => {
    if (isStatusEditMode) {
      return (
        <Select
          value={selectedStatus}
          onChange={(selected: IStatus | null) => handleStatusChange(selected)}
          options={statuses}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          onBlur={() => setStatusEditMode(false)}
        />
      );
    } else {
      return (
        <div className="editTaskForm__statusContainer editTaskForm__statusContainer_active">
          <div className="editTaskForm__statusCircle"
               style={{backgroundColor: getStatusColor(taskFormData.statusName, statuses)}}/>
          <p onClick={() => setStatusEditMode(true)}>{taskFormData.statusName}</p>
        </div>
      );
    }
  };

  const handleExecutorChange = async (selected: IUser | null) => {
    if (selected) {
      try {
        const response = await updateTask({
          tenantGuid,
          dto: {
            id: taskId,
            statusId: taskFormData.statusId,
            executorId: selected.id,
          },
        });

        if ('error' in response) {
          const errorData = response.error as { status: number; data: unknown };
          throw new Error(errorData?.data?.toString() || 'Unknown error');
        }
      } catch (error) {
        console.error('Error updating executor:', error);
      }
    }

    setSelectedExecutor(selected);
    setExecutorEditMode(false);
  };

  const renderExecutorField = () => {
    if (isExecutorEditMode) {
      return (
        <Select
          value={selectedExecutor}
          onChange={(selected: IUser | null) => handleExecutorChange(selected)}
          options={users}
          getOptionLabel={(user) => user.name}
          getOptionValue={(user) => user.id.toString()}
          onBlur={() => setExecutorEditMode(false)}
        />
      );
    } else {
      return (
        <div className="editTaskForm__statusContainer editTaskForm__statusContainer_active">
          <p onClick={() => setExecutorEditMode(true)}>{taskFormData.executorName}</p>
        </div>
      );
    }
  };

  return (
    <div className="editTaskModalContent">
      <TitleBar
        title={`№ ${taskId}`}
        description={taskFormData.name}
        onClose={onClose}
      />
      <form className="editTaskForm">
        <section className="editTaskForm__left">
          <div className="editTaskForm__main_container">
            <div className="editTaskForm__container">
              <label className="editTaskForm__label">Описание</label>
              <p className="editTaskForm_description">{taskFormData.description}</p>
            </div>
            <div className="editTaskForm__container">
              <input
                type="text"
                value={newComment}
                className="editTaskForm__comment_add-field"
                onChange={handleNewCommentChange}
                placeholder="Добавление комментариев"
              />
            </div>
          </div>
          <button
            onClick={handleAddComment}
            className="taskList-button"
            style={{padding: '9px 36px', marginLeft: 4, marginTop: 38}}
            disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </button>
          {taskFormData.lifetimeItems?.map((obj) => (
            <div key={obj.id} className="editTaskForm__outer_container">
              <div className="editTaskForm__statusCircle-large"/>
              <div className="editTaskForm__comment_container">
                <h3 className="editTaskForm__commentTitle">{obj.userName}</h3>
                <p
                  className="editTaskForm__date">{obj.createdAt ? formatDateCommentString(obj.createdAt) : 'Неверная дата'}
                </p>
                <p className="editTaskForm__comment_field" style={{padding: '8px 30px 15px 10px', marginTop: 6}}>
                  {obj.comment}
                  {obj.oldFieldValue && (
                    <span style={{color: 'red'}}>{`Старое значение: ${obj.oldFieldValue} ->`}</span>
                  )}
                  {obj.newFieldValue && (
                    <span style={{color: 'green'}}> Новое значение: {obj.newFieldValue}</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </section>
        <section className="editTaskForm__right">
          <div className="editTaskForm__container">
            {renderStatusField()}
          </div>
          <div
            className="editTaskForm__container"
            style={{marginTop: 9}}
          >
            <label className="editTaskForm__label">Заявитель</label>
            <p>{taskFormData.initiatorName}</p>
          </div>
          <div
            className="editTaskForm__container"
            style={{marginTop: 21}}
          >
            <label className="editTaskForm__label">Создана</label>
            <p>{taskFormData.initiatorName}</p>
          </div>
          <div className="editTaskForm__container">
            <label className="editTaskForm__label">Исполнитель</label>
            {renderExecutorField()}
          </div>
          <div className="editTaskForm__container">
            <label className="editTaskForm__label">Приоритет</label>
            <p>{taskFormData.priorityName}</p>
          </div>
          <div
            className="editTaskForm__container"
            style={{gap: 13}}
          >
            <label className="editTaskForm__label">Срок</label>
            <div className="editTaskForm__statusContainer">
              <img src={calendarIcon} alt="calendarIcon"/>
              <p>{taskFormData.resolutionDatePlan ? formatDateString(taskFormData.resolutionDatePlan) : 'дата не указана'}</p>
            </div>
          </div>
          <div className="editTaskForm__container">
            <label className="editTaskForm__label">Теги</label>
            <div className="editTaskForm__tags_container">
              {taskFormData.tags.map((tag: { id: number; name: string }) => (
                <p className="editTaskForm__tags" key={tag.id}>{tag.name}</p>
              ))}
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default EditTaskForm;
