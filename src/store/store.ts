import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

// Определение типа данных RootState
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        // Другие редукторы, если есть
    },
});

export type AppDispatch = typeof store.dispatch;
