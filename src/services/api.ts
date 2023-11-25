// api.ts

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://intravision-task.test01.intravision.ru/api'}),
    endpoints: (builder) => ({
        getPriorities: builder.query<any, string>({
            query: (tenantGuid) => `/Priorities/${tenantGuid}`,
        }),
        getServices: builder.query<any, string>({
            query: (tenantGuid) => `/Services/${tenantGuid}`,
        }),
        getStatuses: builder.query<any, string>({
            query: (tenantGuid) => `/Statuses/${tenantGuid}`,
        }),
        getTags: builder.query<any, string>({
            query: (tenantGuid) => `/Tags/${tenantGuid}`,
        }),
        getTasksById: builder.query<any, { tenantGuid: string; id: number }>({
            query: ({tenantGuid, id}) => `/Tasks/${tenantGuid}/${id}`,
        }),
        updateTask: builder.mutation<any, { tenantGuid: string; dto: any }>({
            query: ({tenantGuid, dto}) => ({
                url: `/Tasks/${tenantGuid}`,
                method: 'PUT',
                body: dto,
            }),
        }),
        createTask: builder.mutation<any, { tenantGuid: string; dto: any }>({
            query: ({tenantGuid, dto}) => ({
                url: `/Tasks/${tenantGuid}`,
                method: 'POST',
                body: dto,
            }),
        }),
        getTasks: builder.query<any, { tenantGuid?: string; $expand?: string; $top?: number; $skip?: number }>({
            query: ({tenantGuid, $expand, $top, $skip}) => ({
                url: `/odata/tasks`,
                method: 'GET',
                params: {tenantGuid, $expand, $top, $skip},
            }),
        }),
        getTaskTypes: builder.query<any, string>({
            query: (tenantGuid) => `/TaskTypes/${tenantGuid}`,
        }),
        getTenants: builder.query<any, void>({
            query: () => `/Tenants`,
        }),
        getUserGroups: builder.query<any, string>({
            query: (tenantGuid) => `/UserGroups/${tenantGuid}`,
        }),
        getUsers: builder.query<any, string>({
            query: (tenantGuid) => `/Users/${tenantGuid}`,
        }),
    }),
});

export const {
    useGetPrioritiesQuery,
    useGetServicesQuery,
    useGetStatusesQuery,
    useGetTagsQuery,
    useGetTasksByIdQuery,
    useUpdateTaskMutation,
    useCreateTaskMutation,
    useGetTasksQuery,
    useGetTaskTypesQuery,
    useGetTenantsQuery,
    useGetUserGroupsQuery,
    useGetUsersQuery,
} = api;
