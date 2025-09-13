import { Idea } from "@/types/idea";
import { FaEdit, FaLink, FaTrash } from "react-icons/fa";
import "./IdeaDetails.css";

interface IdeaDetailsProps {
  idea: Idea;
  onEdit?: () => void;
  onDelete?: () => void;
}

function IdeaDetails({ idea, onEdit, onDelete }: IdeaDetailsProps) {
  const formatDate = (dateStr: string): string => {
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "#3b82f6";
      case "in-progress":
        return "#f59e0b";
      case "completed":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status: string): import("react").ReactNode => {
    switch (status) {
      case "new":
        return "Mới";
      case "in-progress":
        return "Đang thực hiện";
      case "completed":
        return "Hoàn thành";
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
              <FaEdit />
              Chỉnh sửa
            </button>
          )}
          {onDelete && (
            <button
              className="idea-details__action-btn idea-details__action-btn--delete"
              onClick={onDelete}
            >
              <FaTrash />
              Xóa
            </button>
          )}
        </div>
      </div>

      <div className="idea-details__meta">
        <div className="idea-details__meta-item">
          <span className="idea-details_meta-label">Danh mục:</span>
          <span className="idea-details__meta-value">{idea.category}</span>
        </div>
        <div className="idea-details__meta-item">
          <span className="idea-details_meta-label">Tạo bởi:</span>
          <span className="idea-details__meta-value">{idea.username}</span>
        </div>
        <div className="idea-details__meta-item">
          <span className="idea-details_meta-label">Ngày tạo:</span>
          <span className="idea-details__meta-value">
            {formatDate(idea.created_at)}
          </span>
        </div>
      </div>

      <div className="idea-details__description">
        <h3>Mô tả</h3>
        <p>{idea.description}</p>
      </div>

      {idea.tags && idea.tags.length > 0 && (
        <div className="idea-details__tags">
          <h3>Thẻ</h3>
          <div className="idea-details__tags-list">
            {idea.tags.map((tag: string, index: number) => (
              <span key={index} className="idea-details__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {idea.google_docs_url && (
        <div className="idea-details__document">
          <h3>Tài liệu liên quan</h3>
          <a
            href={idea.google_docs_url}
            target="_blank"
            rel="noopener noreferrer"
            className="idea-details__doc-link"
          >
            <FaLink />
            Xem tài liệu Google Docs
          </a>
        </div>
      )}
    </div>
  );
}

export default IdeaDetails;
