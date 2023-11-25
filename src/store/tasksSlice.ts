import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Task {
    id: number;
    name: string;
}

const initialState: Task[] = [];

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.push(action.payload);
        },
    },
});

export const { addTask } = tasksSlice.actions;
export const selectTasks = (state: RootState) => state.tasks;
export default tasksSlice.reducer;
