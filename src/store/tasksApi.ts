import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Определение URL API
const baseUrl = 'http://intravision-task.test01.intravision.ru/api';

// Создание API
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getTasks: builder.query<any, string>({
            query: (tenantguid) => `/${tenantguid}/Tasks`,
        }),
        // Другие эндпоинты могут быть добавлены здесь
    }),
});

// Экспорт запросов API
export const { useGetTasksQuery } = api;
