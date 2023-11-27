import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl: string = 'http://intravision-task.test01.intravision.ru/';
export const tenantGuid: string = 'd0c8889a-3004-47b4-9a5e-4dae6d985132';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getPriorities: builder.query<any, string>({
      query: (tenantGuid) => `api/${tenantGuid}/Priorities`,
    }),
    getServices: builder.query<any, string>({
      query: (tenantGuid) => `api/${tenantGuid}/Services`,
    }),
    getStatuses: builder.query<any, string>({
      query: (tenantGuid) => `api/${tenantGuid}/Statuses`,
    }),
    getTags: builder.query<any, string>({
      query: (tenantGuid) => `api/${tenantGuid}/Tags`,
    }),
    getTasksById: builder.query<any, { tenantGuid: string; id: number }>({
      query: ({tenantGuid, id}) => `api/${tenantGuid}/Tasks/${id}`,
    }),
    updateTask: builder.mutation<any, { tenantGuid: string; dto: any }>({
      query: ({tenantGuid, dto}) => ({
        url: `api/${tenantGuid}/Tasks`,
        method: 'PUT',
        body: dto,
      }),
    }),
    createTask: builder.mutation<any, { tenantGuid: string; dto: any }>({
      query: ({tenantGuid, dto}) => ({
        url: `api/${tenantGuid}/Tasks`,
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
      query: (tenantGuid) => `api/${tenantGuid}/TaskTypes`,
    }),
    getTenants: builder.query<any, void>({
      query: () => `api/Tenants`,
    }),
    getUserGroups: builder.query<any, string>({
      query: (tenantGuid) => `api/${tenantGuid}/UserGroups`,
    }),
    getUsers: builder.query<any, string>({
      query: (tenantGuid) => `api/${tenantGuid}/Users`,
    })
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
