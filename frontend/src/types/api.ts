import axios from 'axios';
import { IdeaFormData } from './idea';
import { CommentFormData } from './comment';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const ideaApi = {
    getIdeas: async (params?: {
        search?: string,
        status?: string,
        category?:string,
        tags?: string[],
    }) => {
        const response = await axios.get(`${API_URL}/ideas`, {params});
        return response.data;
    },

    createIdea: async (data: IdeaFormData) => {
        const response = await axios.post(`${API_URL}/ideas`, data);
        return response.data;
    },

    updateIdea: async (id: string, data: IdeaFormData) => {
        const response = await axios.put(`${API_URL}/ideas/${id}`, data);
        return response.data;
    },

    deleteIdea: async (id: string) => {
        await axios.delete(`${API_URL}/ideas/${id}`);
    },

    getIdeaById: async (id: string) => {
        const response = await axios.get(`${API_URL}/ideas/${id}`);
        return response.data;
    },
}

export const commentApi = {
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