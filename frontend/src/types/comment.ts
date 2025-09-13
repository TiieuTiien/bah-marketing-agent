export interface Comment {
    comment_id: number;
    idea_id: number;
    user_id: number;
    comment_text: string;
    created_at: string;
    username?: string;
}

export interface CommentFormData {
    comment_text: string;
}