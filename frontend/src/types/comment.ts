export interface Comment {
    comment_id: number;
    idea_id: number;
    user_id: number;
    comment_text: string;
    created_at: Date;
    // Optional fields for display purposes
    author?: string; // User name for display (from join with Users table)
}

export interface CommentFormData {
    comment_text: string;
}
