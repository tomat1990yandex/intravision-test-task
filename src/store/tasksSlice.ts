import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// Определение типа данных для задачи
interface Task {
    id: number;
    name: string;
    // Другие поля задачи
}

// Определение начального состояния
const initialState: Task[] = [];

// Создание слайса для задач
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // Добавление задачи
        addTask: (state, action: PayloadAction<Task>) => {
            state.push(action.payload);
        },
        // Другие редюсеры могут быть добавлены здесь
    },
});

// Экспорт экшенов
export const { addTask } = tasksSlice.actions;

// Селектор для получения задач из состояния
export const selectTasks = (state: RootState) => state.tasks;

// Экспорт редюсера
export default tasksSlice.reducer;
