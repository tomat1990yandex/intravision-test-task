import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import tasksReducer from './tasksSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
