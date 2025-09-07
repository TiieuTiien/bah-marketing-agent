import { useState, useEffect } from 'react';
import { Comment, CommentFormData } from '@/types/comment';
import { commentApi } from '@/types/api';
import './CommentSection.css';

interface CommentSectionProps {
    ideaId: number;
}

interface CommentItemProps {
    comment: Comment;
    onEdit: (comment: Comment) => void;
    onDelete: (commentId: number) => void;
}

const CommentItem = ({ comment, onEdit, onDelete }: CommentItemProps) => {
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    };

    return (
        <div className="comment-item">
            <div className="comment-item__avatar">
                <div className="comment-item__avatar-circle">
                    {comment.author ? comment.author.charAt(0).toUpperCase() : 'U'}
                </div>
            </div>
            
            <div className="comment-item__content">
                <div className="comment-item__header">
                    <span className="comment-item__author">{comment.author || 'Anonymous'}</span>
                    <span className="comment-item__date">{formatDate(comment.created_at)}</span>
                </div>
                
                <div className="comment-item__text">
                    {comment.comment_text}
                </div>
                
                <div className="comment-item__actions">
                    <button 
                        className="comment-item__action"
                        onClick={() => onEdit(comment)}
                    >
                        Sửa
                    </button>
                    
                    <button 
                        className="comment-item__action comment-item__action--delete"
                        onClick={() => onDelete(comment.comment_id)}
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
};

const CommentSection = ({ ideaId }: CommentSectionProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [editingComment, setEditingComment] = useState<Comment | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadComments();
    }, [ideaId]);

    const loadComments = async () => {
        try {
            setLoading(true);
            const data = await commentApi.getComments(ideaId);
            setComments(data);
        } catch (error) {
            console.error('Failed to load comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const commentData: CommentFormData = {
                comment_text: newComment
            };

            if (editingComment) {
                await commentApi.updateComment(editingComment.comment_id, commentData);
            } else {
                await commentApi.createComment(ideaId, commentData);
            }

            setNewComment('');
            setEditingComment(null);
            await loadComments();
        } catch (error) {
            console.error('Failed to submit comment:', error);
        }
    };

    const handleEdit = (comment: Comment) => {
        setEditingComment(comment);
        setNewComment(comment.comment_text);
    };

    const handleDelete = async (commentId: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa bình luận này?')) return;

        try {
            await commentApi.deleteComment(commentId);
            await loadComments();
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    const cancelEdit = () => {
        setEditingComment(null);
        setNewComment('');
    };

    return (
        <div className="comment-section">
            <div className="comment-section__header">
                <h3>Thảo luận ({comments.length})</h3>
            </div>

            <form className="comment-section__form" onSubmit={handleSubmitComment}>
                <div className="comment-section__form-header">
                    {editingComment && (
                        <span className="comment-section__form-mode">
                            Chỉnh sửa bình luận
                        </span>
                    )}
                </div>
                
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Viết bình luận..."
                    className="comment-section__textarea"
                    rows={3}
                />
                
                <div className="comment-section__form-actions">
                    {editingComment && (
                        <button 
                            type="button" 
                            className="comment-section__btn comment-section__btn--cancel"
                            onClick={cancelEdit}
                        >
                            Hủy
                        </button>
                    )}
                    <button 
                        type="submit" 
                        className="comment-section__btn comment-section__btn--submit"
                        disabled={!newComment.trim()}
                    >
                        {editingComment ? 'Cập nhật' : 'Gửi'}
                    </button>
                </div>
            </form>

            <div className="comment-section__list">
                {loading ? (
                    <div className="comment-section__loading">
                        Đang tải bình luận...
                    </div>
                ) : comments.length === 0 ? (
                    <div className="comment-section__empty">
                        Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
                    </div>
                ) : (
                    comments.map((comment) => (
                        <CommentItem
                            key={comment.comment_id}
                            comment={comment}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentSection;
