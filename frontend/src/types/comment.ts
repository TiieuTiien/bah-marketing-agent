export interface Comment {
    comment_id: string;
    idea_id: string;
    user_id: string;
    comment_text: string;
    created_at: Date;
    username?: string;
}

export interface CommentFormData {
    comment_text: string;
}