import axios from 'axios';
import { IdeaFormData } from '../types/idea';
import { CommentFormData } from '../types/comment';
import { mockCommentApi, mockIdeaApi } from './mockApi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const USE_MOCK_API = false;

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
        const response = await axios.get(`${API_URL}/ideas`, { params: queryParams });
        return response.data;
    },

    createIdea: async (user_id: number, data: IdeaFormData) => {
        const response = await axios.post(`${API_URL}/ideas?user_id=${user_id}`, data);
        return response.data;
    },

    updateIdea: async (ideaId: number, data: IdeaFormData) => {
        const response = await axios.put(`${API_URL}/ideas/${ideaId}`, data);
        return response.data;
    },

    deleteIdea: async (ideaId: number) => {
        await axios.delete(`${API_URL}/ideas/${ideaId}`);
    },

    getIdeaById: async (ideaId: number) => {
        const response = await axios.get(`${API_URL}/ideas/${ideaId}`);
        return response.data;
    }
}

export const commentApi = USE_MOCK_API ? mockCommentApi : {
    getComments: async (ideaId: number) => {
        const response = await axios.get(`${API_URL}/ideas/${ideaId}/comments`);
        return response.data;
    },

    createComment: async (ideaId: number, data: CommentFormData) => {
        const response = await axios.post(`${API_URL}/ideas/${ideaId}/comments`, data);
        return response.data;
    },

    updateComment: async (commentId: number, data: CommentFormData) => {
        const response = await axios.put(`${API_URL}/comments/${commentId}`, data);
        return response.data;
    },

    deleteComment: async (commentId: number) => {
        await axios.delete(`${API_URL}/comments/${commentId}`);
    },
}