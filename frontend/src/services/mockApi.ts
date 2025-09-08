import { mockComments } from "@/mocks/mockComments";
import { mockIdeas } from "@/mocks/mockIdeas";
import { Comment, CommentFormData } from "@/types/comment";
import { Idea, IdeaFormData } from "@/types/idea";

let mockIdeaStorage: Idea[] = [...mockIdeas];
let mockCommentStorage: Comment[] = [...mockComments];

const generateId = () => Math.floor(Math.random() * 10000);

export const mockIdeaApi = {
    getIdeas: async (params?: {
        search?: string,
        status?: string,
        category?: string,
        tags?: string[],
    }) => {
        await new Promise(resolve => setTimeout(resolve, 500))

        let filteredIdeas = [...mockIdeaStorage];

        if (params?.search) {
            filteredIdeas = filteredIdeas.filter(idea => idea.title.toLowerCase().includes(params.search!.toLowerCase())) || filteredIdeas.filter(idea => idea.description.toLowerCase().includes(params.search!.toLowerCase()));
        }

        if (params?.status) {
            filteredIdeas = filteredIdeas.filter(idea => idea.status === params.status);
        }

        if (params?.category) {
            filteredIdeas = filteredIdeas.filter(idea => idea.category === params.category);
        }

        if (params?.tags && params.tags.length > 0) {
            filteredIdeas = filteredIdeas.filter(idea => params.tags!.some(tag => idea.tags.includes(tag)))
        }

        return filteredIdeas;
    },

    createIdea: async (data: IdeaFormData) => {
        await new Promise(resolve => setTimeout(resolve, 500))

        const newIdea: Idea = {
            idea_id: generateId().toString(),
            title: data.title,
            description: data.description,
            status: 'new',
            tags: data.tags,
            category: data.category,
            createdAt: new Date(),
            createdBy: 'Current User'
        }

        mockIdeaStorage.push(newIdea);
        return newIdea;
    },

    updateIdea: async (id: string, data: IdeaFormData) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const ideaIndex = mockIdeaStorage.findIndex(idea => idea.idea_id === id);
        if (ideaIndex === -1) {
            throw new Error('Idea not found');
        }

        const updatedIdea: Idea = {
            ...mockIdeaStorage[ideaIndex],
            title: data.title,
            description: data.description,
            category: data.category,
            tags: data.tags
        }

        mockIdeaStorage[ideaIndex] = updatedIdea;
        return updatedIdea;
    },

    deleteIdea: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const ideaIndex = mockIdeaStorage.findIndex(idea => idea.idea_id === id);
        if (ideaIndex === -1) {
            throw new Error('Idea not found');
        }

        mockIdeaStorage.splice(ideaIndex, 1);
    },

    getIdeaById: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const idea = mockIdeaStorage.find(idea => idea.idea_id == id);
        if (!idea) {
            throw new Error('Idea not found')
        }

        return idea;
    }
}

export const mockCommentApi = {
    getComments: async (ideaId: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        return mockCommentStorage.filter(comment => comment.idea_id === ideaId);
    },

    createComment: async (ideaId: string, data: CommentFormData) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const newComment: Comment = {
            idea_id: ideaId,
            comment_id: generateId().toString(),
            user_id: '1',
            comment_text: data.comment_text,
            created_at: new Date(),
            username: 'Mock user'
        }

        mockCommentStorage.push(newComment);
        return newComment;
    },

    updateComment: async (commentId: string, data: CommentFormData) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const commentIndex = mockCommentStorage.findIndex(comment => comment.comment_id === commentId)

        if (commentIndex == -1) {
            throw new Error('Comment not found');
        }

        const updatedComment: Comment = {
            ...mockCommentStorage[commentIndex],
            comment_text: data.comment_text,
        }

        mockCommentStorage[commentIndex] = updatedComment;
        return updatedComment;
    },

    deleteComment: async (commentId: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const commentIndex = mockCommentStorage.findIndex(comment => comment.comment_id === commentId)

        if (commentIndex == -1) {
            throw new Error('Comment not found');
        }

        mockCommentStorage.splice(commentIndex, 1);
    },
}
