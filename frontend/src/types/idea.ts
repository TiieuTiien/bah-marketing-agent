export interface Idea {
    idea_id: string;
    title: string;
    description: string;
    status: 'new' | 'in-progress' | 'completed';
    tags: string[];
    category: string;
    createdAt: Date;
    createdBy: string;
    googleDocUrl?: string;
}

export interface IdeaFormData {
    title: string;
    description: string;
    category: string;
    tags: string[];
}