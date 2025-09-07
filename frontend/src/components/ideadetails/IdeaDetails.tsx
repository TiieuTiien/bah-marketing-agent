import { Idea } from '@/types/idea';
import './IdeaDetails.css';

interface IdeaDetailsProps {
    idea: Idea;
    onEdit?: () => void;
    onDelete?: () => void;
}

const IdeaDetails = ({ idea, onEdit, onDelete }: IdeaDetailsProps) => {
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new':
                return '#3b82f6'; // blue
            case 'in-progress':
                return '#f59e0b'; // yellow
            case 'completed':
                return '#10b981'; // green
            default:
                return '#6b7280'; // gray
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'new':
                return 'Mới';
            case 'in-progress':
                return 'Đang thực hiện';
            case 'completed':
                return 'Hoàn thành';
            default:
                return status;
        }
    };

    return (
        <div className="idea-details">
            <div className="idea-details__header">
                <div className="idea-details__title-section">
                    <h2 className="idea-details__title">{idea.title}</h2>
                    <span 
                        className="idea-details__status"
                        style={{ backgroundColor: getStatusColor(idea.status) }}
                    >
                        {getStatusText(idea.status)}
                    </span>
                </div>
                
                <div className="idea-details__actions">
                    {onEdit && (
                        <button 
                            className="idea-details__action-btn idea-details__action-btn--edit"
                            onClick={onEdit}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Chỉnh sửa
                        </button>
                    )}
                    {onDelete && (
                        <button 
                            className="idea-details__action-btn idea-details__action-btn--delete"
                            onClick={onDelete}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m3 6 3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Xóa
                        </button>
                    )}
                </div>
            </div>

            <div className="idea-details__meta">
                <div className="idea-details__meta-item">
                    <span className="idea-details__meta-label">Danh mục:</span>
                    <span className="idea-details__meta-value">{idea.category}</span>
                </div>
                <div className="idea-details__meta-item">
                    <span className="idea-details__meta-label">Tạo bởi:</span>
                    <span className="idea-details__meta-value">{idea.createdBy}</span>
                </div>
                <div className="idea-details__meta-item">
                    <span className="idea-details__meta-label">Ngày tạo:</span>
                    <span className="idea-details__meta-value">{formatDate(idea.createdAt)}</span>
                </div>
            </div>

            <div className="idea-details__description">
                <h3>Mô tả</h3>
                <p>{idea.description}</p>
            </div>

            {idea.tags && idea.tags.length > 0 && (
                <div className="idea-details__tags">
                    <h3>Tags</h3>
                    <div className="idea-details__tags-list">
                        {idea.tags.map((tag: string, index: number) => (
                            <span key={index} className="idea-details__tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {idea.googleDocUrl && (
                <div className="idea-details__document">
                    <h3>Tài liệu liên quan</h3>
                    <a 
                        href={idea.googleDocUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="idea-details__doc-link"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Xem tài liệu Google Docs
                    </a>
                </div>
            )}
        </div>
    );
};

export default IdeaDetails;
