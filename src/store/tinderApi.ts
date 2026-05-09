import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/url";
import { User, ConnectionRequest } from "../types";

export const tinderApi = createApi({
  reducerPath: "tinderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      // Any global header setups go here
      return headers;
    },
    credentials: "include", // Essential for cross-origin cookies on login/logout requests
  }),
  tagTypes: ["Feed", "Connections", "Requests", "Profile"],
  endpoints: (builder) => ({
    
    // Auth Operations
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Profile", "Feed", "Connections", "Requests"],
    }),
    
    signup: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/signup",
        method: "POST",
        body: formData,
      }),
    }),
    
    logout: builder.mutation<any, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    // Password Recovery
    forgotPassword: builder.mutation<any, { email: string }>({
      query: (body) => ({
        url: "/forgotpassword",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<any, { token: string; body: any }>({
      query: ({ token, body }) => ({
        url: `/resetpassword/${token}`,
        method: "PATCH",
        body,
      }),
    }),

    // Profile Settings
    getProfile: builder.query<{ data: User }, void>({
      query: () => "/profile/view",
      providesTags: ["Profile"],
    }),
    
    editProfile: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/profile/edit",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

    // Match Discovery Feed
    getFeed: builder.query<User[], void>({
      query: () => "/user/feed",
      providesTags: ["Feed"],
    }),

    // Network & Invitations
    getConnections: builder.query<{ data: User[] }, void>({
      query: () => "/user/connections",
      providesTags: ["Connections"],
    }),
    
    getRequests: builder.query<{ data: ConnectionRequest[] }, void>({
      query: () => "/user/requests",
      providesTags: ["Requests"],
    }),

    // Swipe Interactions and Connection Request Reviews
    sendConnectionRequest: builder.mutation<any, { status: "ignored" | "interested"; userId: string }>({
      query: ({ status, userId }) => ({
        url: `/request/send/${status}/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["Feed"],
    }),
    
    reviewConnectionRequest: builder.mutation<any, { status: "accepted" | "rejected"; requestId: string }>({
      query: ({ status, requestId }) => ({
        url: `/request/review/${status}/${requestId}`,
        method: "POST",
      }),
      invalidatesTags: ["Requests", "Connections"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useEditProfileMutation,
  useGetFeedQuery,
  useGetConnectionsQuery,
  useGetRequestsQuery,
  useSendConnectionRequestMutation,
  useReviewConnectionRequestMutation,
} = tinderApi;
