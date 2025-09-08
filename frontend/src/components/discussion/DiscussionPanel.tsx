import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ideaApi } from "@/services/api";
import { Idea } from "@/types/idea";
import { FaBackward, FaTimes } from "react-icons/fa";
import IdeaDetails from "../ideadetails/IdeaDetails";
import IdeaForm from "../ideaform/IdeaForm";
import "./DiscussionPanel.css";

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
      console.error("Failed to load idea:", error);
      setError("Không thể tải chi tiết ý tưởng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleDelete = async () => {
    if (!idea) return;
    if (
      !confirm(
        "Bạn có chắc muốn xóa ý tưởng này? Hành động này không thể hoàn tác."
      )
    ) {
      return;
    }

    try {
      await ideaApi.deleteIdea(idea.idea_id);
      navigate("/app/idealist", { replace: true });
    } catch (error) {
      console.error("Failed to delete idea:", error);
      setError("Không thể xóa ý tưởng. Vui lòng thử lại.");
    }
  };
  const handleSaveEdit = async () => {
    setIsEditMode(false);
    await loadIdea();
  };

  const handleCancelEdit = async () => {
    setIsEditMode(false);
  };

  const handleGoBack = () => {
    navigate("/app/idealist", { replace: true });
  };

  if (loading) {
    return (
      <div className="discussion-panel">
        <div className="discussion-panel__loading">
          <div className="discussion-panel__spiner" />
          <p>Đang tải</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="discussion-panel">
        <div className="discussion-panel__error">
          <FaTimes />
          <h3>Có lỗi xảy ra</h3>
          <p>{error}</p>
          <button className="discussion-panel__retry-btn" onClick={loadIdea}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!idea && !loading) {
    return (
      <div className="discussion-panel">
        <div className="discussion-panel__not-found">
          <FaTimes />
          <h3>Không tìm thấy ý tưởng</h3>
          <p>Ý tưởng bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
          <button className="discussion-panel__back-btn" onClick={handleGoBack}>
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="discussion-panel">
        <div className="discussion-panel__header">
          <button
            className="discussion-panel__back-button"
            onClick={handleGoBack}
          >
            <FaBackward /> Quay lại danh sách
          </button>
        </div>
        <div className="discussion-panel__content">
          {isEditMode ? (
            <div className="discussion-panel__edit-form">
              <h2>Chỉnh sửa ý tưởng</h2>
              <IdeaForm
                idea={idea!}
                onSubmit={handleSaveEdit}
                onCancel={handleCancelEdit}
              />
            </div>
          ) : (
            <>
              <IdeaDetails
                idea={idea!}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DiscussionPanel;
