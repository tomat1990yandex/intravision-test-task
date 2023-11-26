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

    try {
      const response = await createTask({
        tenantGuid,
        dto: { name: taskName, description: taskDescription },
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



  return (
    <div className="createTaskModalContent">
      <TitleBar title={'Новая заявка'} description={''} onClose={onClose}/>
      <form onSubmit={handleSubmit} className="taskList_form">
        <div className="taskList_form_container">
          <label className="taskList_form_label">Название</label>
          <textarea
            className="taskList_form_textarea"
            rows={6}
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div className="taskList_form_container">
          <label className="taskList_form_label">Описание</label>
          <textarea
            className="taskList_form_textarea"
            rows={9}
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="taskList_button" disabled={isLoading}>
          {isLoading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
