import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequestType, LoginResponseType, PostType } from '../../types/interfaces';


// Define the API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1/' }), // Replace '/api' with your API base URL
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseType, LoginRequestType>({
      query: (credentials) => ({
        url: 'auth/login', 
        method: 'POST',
        body: credentials,
      }),
    }),
    getPosts: builder.mutation<PostType[], void>({
      query: () => ({
        url: 'post/posts',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      })
    }),

    getPost: builder.query<PostType, number>({
      query: (id) => ({
        url: `/posts/${id}`, 
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      })
    }),

  }),
});

// Export the auto-generated hook for the `login` mutation
export const { useLoginMutation, useGetPostsMutation } = apiSlice;
