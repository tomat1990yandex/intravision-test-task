import React, {useState, useEffect} from 'react';
import {
  tenantGuid,
  useGetTasksByIdQuery,
  useUpdateTaskMutation
} from '../../services/api';
import TitleBar from '../TitleBar/TitleBar';
import calendarIcon from '../../images/calendarIcon.png';
import './EditTaskForm.css';
import {getStatusColor, IStatus} from '../TaskList/TaskList';

interface EditTaskFormProps {
  taskId: number;
  statuses: IStatus[];
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
  lifetimeItems: { createdAt: string; userName: string; comment: string; id: string }[];
  statusId: string;
  executorId: string;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({taskId, onClose, statuses}) => {
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
    }
  }, [taskData, taskId]);

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear().toString();

    return `${day}.${month}.${year} г.`;
  };

  const handleNewCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await updateTask({
        tenantGuid,
        dto: {
          id: taskId,
          ...taskFormData,
        },
      });

      if ('error' in response) {
        const errorData = response.error as { status: number; data: unknown };
        throw new Error(errorData?.data?.toString() || 'Unknown error');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await updateTask({
        tenantGuid,
        dto: {
          id: taskId,
          ...taskFormData,
          lifetimeItems: [
            ...taskFormData.lifetimeItems,
            {
              createdAt: new Date().toISOString(),
              userName: tenantGuid,
              comment: newComment,
              lifetimeType: 10,
              fieldName: '',
              oldFieldValue: '',
              newFieldValue: '',
              id: Math.floor(10000 + Math.random() * 90000)
            },
          ],
        },
      });

      if ('error' in response) {
        const errorData = response.error as { status: number; data: unknown };
        throw new Error(errorData?.data?.toString() || 'Unknown error');
      }

      setNewComment(''); // Очистите поле ввода после успешного добавления комментария
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };


  return (
    <div className="editTaskModalContent">
      <TitleBar
        title={`№ ${taskId}`}
        description={taskFormData.name}
        onClose={onClose}
      />
      <form onSubmit={handleSubmit} className="editTaskForm">
        <section className="editTaskForm__left">
          <div className="editTaskForm__container">
            <label className="editTaskForm__label">Описание</label>
            <p>{taskFormData.description}</p>
          </div>
          <div className="editTaskForm__container">
            <label className="editTaskForm__label">Новый комментарий</label>
            <input
              type="text"
              value={newComment}
              onChange={handleNewCommentChange}
              placeholder="Введите новый комментарий"
            />
            <button type="button" onClick={handleAddComment}>
              Добавить комментарий
            </button>
          </div>
          <button type="submit" className="editTaskForm__submitButton" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </button>
          {taskFormData.lifetimeItems?.map((obj) => (
            <div key={obj.id} className="editTaskForm__container">
              <div className="editTaskForm__statusCircle editTaskForm__statusCircle-large"
                   style={{backgroundColor: '#f5f5f5', width: 20}}/>
              <div>
                <h3 className="editTaskForm__commentTitle">{obj.userName}</h3>
                <h4>{obj.createdAt}</h4>
                <p>{obj.comment}</p>
              </div>
            </div>
          ))}
        </section>
        <section className="editTaskForm__right">
          <div className="editTaskForm__container">
            <label className="editTaskForm__label">Статус</label>
            <div className="editTaskForm__statusContainer">
              <div className="editTaskForm__statusCircle"
                   style={{ backgroundColor: getStatusColor(taskFormData.statusName, statuses) }}/>
              <p>{taskFormData.statusName}</p>
            </div>
          </div>
          <div className="editTaskForm__container">
            <label className="editTaskForm__label">Заявитель</label>
            <p>{taskFormData.initiatorName}</p>
          </div>
          <div className="editTaskForm__container">
            <label className="editTaskForm__label">Создана</label>
            <p>{taskFormData.executorName}</p>
          </div>
          <div className="editTaskForm__container">
            <label className="editTaskForm__label">Приоритет</label>
            <p>{taskFormData.priorityName}</p>
          </div>
          <div className="editTaskForm__container">
            <label className="editTaskForm__label">Срок</label>
            <div className="editTaskForm__statusContainer">
              <img src={calendarIcon} alt="calendarIcon"/>
              <p>{formatDateString(taskFormData.resolutionDatePlan)}</p>
            </div>
          </div>
          <div className="editTaskForm__container">
            <label className="editTaskForm__label">Теги</label>
            {taskFormData.tags.map((tag: { id: number; name: string }) => (
              <p key={tag.id}>{tag.name}</p>
            ))}
          </div>
        </section>
      </form>
    </div>
  );
};

export default EditTaskForm;
