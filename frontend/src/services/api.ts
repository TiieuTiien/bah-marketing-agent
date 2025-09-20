import axios from 'axios';
import { IdeaFormData } from '../types/idea';
import { CommentFormData } from '../types/comment';
import { mockCommentApi, mockIdeaApi } from './mockApi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const USE_MOCK_API = false;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export const ideaApi = USE_MOCK_API ? mockIdeaApi : {
    getIdeas: async (params?: {
        search?: string,
        status?: string,
        category?: string,
        tags?: string[],
    }) => {
        const { search, status, category, tags } = params || {};
        const queryParams: any = {};
        if (search) queryParams.search = search;
        if (status) queryParams.status = status;
        if (category) queryParams.category = category;
        if (tags && tags.length > 0) queryParams.tag = tags[0];
        const response = await apiClient.get('/ideas', { params: queryParams });
        return response.data;
    },

    createIdea: async (data: IdeaFormData) => {
        const response = await apiClient.post('/ideas', data);
        return response.data;
    },

    updateIdea: async (ideaId: number, data: IdeaFormData) => {
        const response = await apiClient.put(`/ideas/${ideaId}`, data);
        return response.data;
    },

    deleteIdea: async (ideaId: number) => {
        await apiClient.delete(`/ideas/${ideaId}`);
    },

    getIdeaById: async (ideaId: number) => {
        const response = await apiClient.get(`/ideas/${ideaId}`);
        return response.data;
    }
}

export const commentApi = USE_MOCK_API ? mockCommentApi : {
    getComments: async (ideaId: number) => {
        const response = await apiClient.get(`/ideas/${ideaId}/comments`);
        return response.data;
    },

    createComment: async (ideaId: number, data: CommentFormData) => {
        const response = await apiClient.post(`/ideas/${ideaId}/comments`, data);
        return response.data;
    },

    updateComment: async (commentId: number, data: CommentFormData) => {
        const response = await apiClient.put(`/comments/${commentId}`, data);
        return response.data;
    },

    deleteComment: async (commentId: number) => {
        await apiClient.delete(`/comments/${commentId}`);
    },
}