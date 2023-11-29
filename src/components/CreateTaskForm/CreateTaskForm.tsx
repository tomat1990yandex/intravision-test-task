import React, {useState} from 'react';
import './CreateTaskForm.css'
import {tenantGuid, useCreateTaskMutation} from '../../services/api';
import TitleBar from "../TitleBar/TitleBar";

interface CreateTaskFormProps {
  onClose: () => void;
  handleCreateTask: (taskId: number) => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({handleCreateTask, onClose}) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [createTask, {isLoading}] = useCreateTaskMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName) {
      console.error('Task name is required');
      return;
    }

    try {
      const response = await createTask({
        tenantGuid,
        dto: {
          name: taskName,
          description: taskDescription,
          statusId: 14177
        },
      });

      if ('data' in response) {
        handleCreateTask(response.data);
      }

      if ('error' in response) {
        const errorData = response.error as { status: number; data: unknown };
        throw new Error(errorData?.data?.toString() || 'Unknown error');
      }

      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };
  const handleTaskNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskName(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescription(e.target.value);
  };

  return (
    <div className="editTaskModalContent">
      <TitleBar title={'Новая заявка'} description={''} onClose={onClose} />
      <form onSubmit={handleSubmit} className="createTaskForm">
        <div className="createTaskForm-container">
          <label className="createTaskForm-label">Название</label>
          <textarea
            className="createTaskForm-textarea"
            rows={5}
            value={taskName}
            onChange={handleTaskNameChange}
          />
        </div>
        <div className="createTaskForm-container">
          <label className="createTaskForm-label">Описание</label>
          <textarea
            className="createTaskForm-textarea"
            rows={9}
            value={taskDescription}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="createTaskForm-button-container">
          <button className="taskList-button" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskForm;
