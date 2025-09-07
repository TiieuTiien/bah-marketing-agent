import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Idea } from '@/types/idea';
import { ideaApi } from '@/types/api';
import IdeaDetails from '@/components/ideadetails/IdeaDetails';
import CommentSection from '@/components/comments/CommentSection';
import IdeaForm from '@/components/ideaform/IdeaForm';
import './DiscussionPanel.css';

const DiscussionPanel = () => {
    const { ideaId } = useParams<{ ideaId: string }>();
    const navigate = useNavigate();
    const [idea, setIdea] = useState<Idea | null>(null);
    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (ideaId) {
            loadIdea();
        }
    }, [ideaId]);

    const loadIdea = async () => {
        if (!ideaId) return;
        
        try {
            setLoading(true);
            setError(null);
            const data = await ideaApi.getIdeaById(ideaId);
            setIdea(data);
        } catch (error) {
            console.error('Failed to load idea:', error);
            setError('Không thể tải chi tiết ý tưởng. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditMode(true);
    };

    const handleDelete = async () => {
        if (!idea) return;
        
        if (!confirm('Bạn có chắc chắn muốn xóa ý tưởng này? Hành động này không thể hoàn tác.')) {
            return;
        }

        try {
            await ideaApi.deleteIdea(idea.id);
            navigate('/app/idealist');
        } catch (error) {
            console.error('Failed to delete idea:', error);
            setError('Không thể xóa ý tưởng. Vui lòng thử lại.');
        }
    };

    const handleSaveEdit = async () => {
        setIsEditMode(false);
        await loadIdea(); // Reload to get updated data
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
    };

    const handleGoBack = () => {
        navigate('/app/idealist');
    };

    if (loading) {
        return (
            <div className="discussion-panel">
                <div className="discussion-panel__loading">
                    <div className="discussion-panel__spinner"></div>
                    <p>Đang tải...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="discussion-panel">
                <div className="discussion-panel__error">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="m15 9-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="m9 9 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3>Có lỗi xảy ra</h3>
                    <p>{error}</p>
                    <button 
                        className="discussion-panel__retry-btn"
                        onClick={loadIdea}
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    if (!idea) {
        return (
            <div className="discussion-panel">
                <div className="discussion-panel__not-found">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <h3>Không tìm thấy ý tưởng</h3>
                    <p>Ý tưởng bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
                    <button 
                        className="discussion-panel__back-btn"
                        onClick={handleGoBack}
                    >
                        Quay lại danh sách
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="discussion-panel">
            <div className="discussion-panel__header">
                <button 
                    className="discussion-panel__back-button"
                    onClick={handleGoBack}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m19 12-7-7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Quay lại danh sách
                </button>
            </div>

            <div className="discussion-panel__content">
                {isEditMode ? (
                    <div className="discussion-panel__edit-form">
                        <h2>Chỉnh sửa ý tưởng</h2>
                        <IdeaForm
                            idea={idea}
                            onSubmit={handleSaveEdit}
                            onCancel={handleCancelEdit}
                        />
                    </div>
                ) : (
                    <>
                        <IdeaDetails
                            idea={idea}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                        
                        <CommentSection ideaId={parseInt(idea.id)} />
                    </>
                )}
            </div>
        </div>
    );
};

export default DiscussionPanel;
