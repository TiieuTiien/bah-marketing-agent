export interface Idea {
    idea_id: number;
    user_id: number;
    username?: string;
    title: string;
    description: string;
    status: 'new' | 'in-progress' | 'completed';
    tags: string[];
    category: string;
    created_at: string;
    google_docs_url?: string;
}

export interface IdeaFormData {
    title: string;
    description: string;
    category: string;
    tags: string[];
}