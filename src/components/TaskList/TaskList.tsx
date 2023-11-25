import React from 'react';
import { tenantGuid, useGetTasksQuery } from "../../services/api";

// Определение типа данных для задачи
interface Task {
    id: number;
    name: string;
    statusName: string;
    executorName: string;
    // Другие поля задачи
}

const TaskList: React.FC = () => {
    // Запрос данных о задачах
    const { data: tasks, error, isLoading } = useGetTasksQuery({ tenantGuid });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading tasks</div>;
    }

    return (
        <div>
            <h2>Task List</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Статус</th>
                    <th>Исполнитель</th>
                </tr>
                </thead>
                <tbody>
                {tasks?.value?.map((task: Task) => (
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.name}</td>
                        <td>{task.statusName}</td>
                        <td>{task.executorName}</td>
                        {/* Добавьте другие поля задачи, если необходимо */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
