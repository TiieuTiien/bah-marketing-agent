import axios from 'axios';
import { IdeaFormData } from '../types/idea';
import { CommentFormData } from '../types/comment';
import { mockCommentApi, mockIdeaApi } from './mockApi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const USE_MOCK_API = true;

export const ideaApi = USE_MOCK_API ? mockIdeaApi : {
    getIdeas: async (params?: {
        search?: string,
        status?: string,
        category?: string,
        tags?: string[],
    }) => {
        const response = await axios.get(`${API_URL}/ideas`, { params });
        return response.data;
    },

    createIdea: async (data: IdeaFormData) => {
        const response = await axios.post(`${API_URL}/ideas`, data);
        return response.data;
    },

    updateIdea: async (ideaId: string, data: IdeaFormData) => {
        const response = await axios.put(`${API_URL}/ideas/${ideaId}`, data);
        return response.data;
    },

    deleteIdea: async (ideaId: string) => {
        await axios.delete(`${API_URL}/ideas/${ideaId}`);
    },

    getIdeaById: async (ideaId: string) => {
        const response = await axios.get(`${API_URL}/ideas/${ideaId}`);
        return response.data;
    }
}

export const commentApi = USE_MOCK_API ? mockCommentApi : {
    getComments: async (ideaId: string) => {
        const response = await axios.get(`${API_URL}/ideas/${ideaId}/comments`);
        return response.data;
    },

    createComment: async (ideaId: string, data: CommentFormData) => {
        const response = await axios.post(`${API_URL}/ideas/${ideaId}/comments`, data);
        return response.data;
    },

    updateComment: async (commentId: string, data: CommentFormData) => {
        const response = await axios.put(`${API_URL}/comments/${commentId}`, data);
        return response.data;
    },

    deleteComment: async (commentId: string) => {
        await axios.delete(`${API_URL}/comments/${commentId}`);
    },
}