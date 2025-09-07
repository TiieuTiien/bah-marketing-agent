import { IdeaFormData, Idea } from '@/types/idea';
import { CommentFormData, Comment } from '@/types/comment';
import { mockIdeas } from '@/mocks/mockIdeas';
import { mockComments } from '@/mocks/mockComments';

// Mock storage - trong thực tế sẽ được thay bằng API calls
let mockIdeaStorage: Idea[] = [...mockIdeas];
let mockCommentStorage: Comment[] = [...mockComments];

// Helper to generate IDs
const generateId = () => Math.floor(Math.random() * 10000);

export const mockIdeaApi = {
    getIdeas: async (params?: {
        search?: string,
        status?: string,
        category?: string,
        tags?: string[],
    }) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredIdeas = [...mockIdeaStorage];
        
        if (params?.search) {
            filteredIdeas = filteredIdeas.filter(idea => 
                idea.title.toLowerCase().includes(params.search!.toLowerCase()) ||
                idea.description.toLowerCase().includes(params.search!.toLowerCase())
            );
        }
        
        if (params?.status) {
            filteredIdeas = filteredIdeas.filter(idea => idea.status === params.status);
        }
        
        if (params?.category) {
            filteredIdeas = filteredIdeas.filter(idea => idea.category === params.category);
        }
        
        if (params?.tags && params.tags.length > 0) {
            filteredIdeas = filteredIdeas.filter(idea => 
                params.tags!.some(tag => idea.tags.includes(tag))
            );
        }
        
        return filteredIdeas;
    },

    createIdea: async (data: IdeaFormData) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const newIdea: Idea = {
            id: generateId().toString(),
            title: data.title,
            description: data.description,
            status: 'new',
            tags: data.tags,
            category: data.category,
            createdAt: new Date(),
            createdBy: 'Current User' // Mock user
        };
        
        mockIdeaStorage.push(newIdea);
        return newIdea;
    },

    updateIdea: async (id: string, data: IdeaFormData) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const ideaIndex = mockIdeaStorage.findIndex(idea => idea.id === id);
        if (ideaIndex === -1) {
            throw new Error('Idea not found');
        }
        
        const updatedIdea: Idea = {
            ...mockIdeaStorage[ideaIndex],
            title: data.title,
            description: data.description,
            category: data.category,
            tags: data.tags
        };
        
        mockIdeaStorage[ideaIndex] = updatedIdea;
        return updatedIdea;
    },

    deleteIdea: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const ideaIndex = mockIdeaStorage.findIndex(idea => idea.id === id);
        if (ideaIndex === -1) {
            throw new Error('Idea not found');
        }
        
        mockIdeaStorage.splice(ideaIndex, 1);
        
        // Also delete related comments
        mockCommentStorage = mockCommentStorage.filter(comment => 
            comment.idea_id !== parseInt(id)
        );
    },

    getIdeaById: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const idea = mockIdeaStorage.find(idea => idea.id === id);
        if (!idea) {
            throw new Error('Idea not found');
        }
        
        return idea;
    },
};

export const mockCommentApi = {
    getComments: async (ideaId: number) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return mockCommentStorage.filter(comment => comment.idea_id === ideaId);
    },

    createComment: async (ideaId: number, data: CommentFormData) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        
        const newComment: Comment = {
            comment_id: generateId(),
            idea_id: ideaId,
            user_id: 1, // Mock current user ID
            comment_text: data.comment_text,
            created_at: new Date(),
            author: 'Current User' // Mock current user name
        };
        
        mockCommentStorage.push(newComment);
        return newComment;
    },

    updateComment: async (commentId: number, data: CommentFormData) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const commentIndex = mockCommentStorage.findIndex(comment => 
            comment.comment_id === commentId
        );
        
        if (commentIndex === -1) {
            throw new Error('Comment not found');
        }
        
        const updatedComment: Comment = {
            ...mockCommentStorage[commentIndex],
            comment_text: data.comment_text
        };
        
        mockCommentStorage[commentIndex] = updatedComment;
        return updatedComment;
    },

    deleteComment: async (commentId: number) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const commentIndex = mockCommentStorage.findIndex(comment => 
            comment.comment_id === commentId
        );
        
        if (commentIndex === -1) {
            throw new Error('Comment not found');
        }
        
        mockCommentStorage.splice(commentIndex, 1);
    },
};
