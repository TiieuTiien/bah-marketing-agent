import { mockAgentLogs } from "@/mocks/mockAgentLogs";
import { mockComments } from "@/mocks/mockComments";
import { mockIdeas } from "@/mocks/mockIdeas";
import { AgentLog } from "@/types/aiagent";
import { Comment, CommentFormData } from "@/types/comment";
import { Idea, IdeaFormData } from "@/types/idea";

let mockIdeaStorage: Idea[] = [...mockIdeas];
let mockCommentStorage: Comment[] = [...mockComments];
let mockAgentLogStorage: AgentLog[] = [...mockAgentLogs];

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
            idea_id: generateId(),
            user_id: generateId(),
            title: data.title,
            description: data.description,
            status: 'new',
            tags: data.tags,
            category: data.category,
            created_at: new Date().toISOString(),
            username: 'Current User'
        }

        mockIdeaStorage.push(newIdea);
        return newIdea;
    },

    updateIdea: async (id: number, data: IdeaFormData) => {
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

    deleteIdea: async (id: number) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const ideaIndex = mockIdeaStorage.findIndex(idea => idea.idea_id === id);
        if (ideaIndex === -1) {
            throw new Error('Idea not found');
        }

        mockIdeaStorage.splice(ideaIndex, 1);
    },

    getIdeaById: async (id: number) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const idea = mockIdeaStorage.find(idea => idea.idea_id == id);
        if (!idea) {
            throw new Error('Idea not found')
        }

        return idea;
    }
}

export const mockCommentApi = {
    getComments: async (ideaId: number) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        return mockCommentStorage.filter(comment => comment.idea_id === ideaId);
    },

    createComment: async (ideaId: number, data: CommentFormData) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const newComment: Comment = {
            idea_id: ideaId,
            comment_id: generateId(),
            user_id: 1,
            comment_text: data.comment_text,
            created_at: new Date().toISOString(),
            username: 'Mock user'
        }

        mockCommentStorage.push(newComment);
        return newComment;
    },

    updateComment: async (commentId: number, data: CommentFormData) => {
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

    deleteComment: async (commentId: number) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const commentIndex = mockCommentStorage.findIndex(comment => comment.comment_id === commentId)

        if (commentIndex == -1) {
            throw new Error('Comment not found');
        }

        mockCommentStorage.splice(commentIndex, 1);
    },
}

export const mockAgentApi = {
  getAgentLogs: async (ideaId: number): Promise<AgentLog[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAgentLogStorage.filter(log => log.idea_id === ideaId);
  },

  saveAgentLog: async (
    ideaId: number,
    userPrompt: string,
    aiResponse: string
  ): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newLog: AgentLog = {
      log_id: Math.floor(Math.random() * 10000),
      idea_id: ideaId,
      user_prompt: userPrompt,
      ai_response: aiResponse,
      timestamp: new Date().toISOString()
    };
    mockAgentLogStorage.push(newLog);
  },

  clearAgentLogs: async (ideaId: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockAgentLogStorage = mockAgentLogStorage.filter(log => log.idea_id !== ideaId);
  }
};