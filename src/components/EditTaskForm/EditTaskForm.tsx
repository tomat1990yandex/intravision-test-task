import React, { useState, useEffect } from 'react';
import {
  tenantGuid,
  useGetTasksByIdQuery,
  useUpdateTaskMutation
} from '../../services/api';
import TitleBar from '../TitleBar/TitleBar';
import './EditTaskForm.css';

interface EditTaskFormProps {
  taskId: number;
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
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ taskId, onClose }) => {
  const [taskFormData, setTaskFormData] = useState<TaskFormData>({
    name: '',
    description: '',
    price: 0,
    statusName: '',
    initiatorName: '',
    executorName: '',
    priorityName: '',
    resolutionDatePlan: '',
    tags: []
  });

  const { data: taskData } = useGetTasksByIdQuery({ tenantGuid, id: taskId });
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

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
        tags: taskData.tags
      });
    }
  }, [taskData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await updateTask({
        tenantGuid,
        dto: {
          id: taskId,
          ...taskFormData
        }
      });

      if ('error' in response) {
        const errorData = response.error as { status: number; data: unknown };
        throw new Error(errorData?.data?.toString() || 'Unknown error');
      }

      onClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="editTaskModalContent">
      <TitleBar
        title={`№${taskId}`}
        description={taskFormData.name}
        onClose={onClose}
      />
      <form onSubmit={handleSubmit} className="task_form_edit">
        <section className="task_form_left">
          <div className="formContainer">
            <label className="formLabel">Описание</label>
            <p>{taskFormData.description}</p>
          </div>
          <button type="submit" className="submitButton" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </button>
          <div className="formContainer">
            <label className="formLabel">Статус</label>
            <p>{taskFormData.statusName}</p>
          </div>
        </section>
        <section className="task_form_right">
          <div className="formContainer">
            <label className="formLabel">Статус</label>
            <p>{taskFormData.statusName}</p>
          </div>
          <div className="formContainer">
            <label className="formLabel">Заявитель</label>
            <p>{taskFormData.initiatorName}</p>
          </div>
          <div className="formContainer">
            <label className="formLabel">Создана</label>
            <p>{taskFormData.executorName}</p>
          </div>
          <div className="formContainer">
            <label className="formLabel">Приоритет</label>
            <p>{taskFormData.priorityName}</p>
          </div>
          <div className="formContainer">
            <label className="formLabel">Срок</label>
            <p>{taskFormData.resolutionDatePlan}</p>
          </div>
          <div className="formContainer">
            <label className="formLabel">Теги</label>
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
