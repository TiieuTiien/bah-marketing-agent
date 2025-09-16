import axios from "axios";
import { useEffect, useState } from "react";
import { ideaApi } from "@/services/api";
import { Idea, IdeaFormData } from "@/types/idea";
import "./IdeaForm.css";

interface IdeaFormProps {
  idea?: Idea;
  onSubmit: () => void;
  onCancel: () => void;
}

const IdeaForm: React.FC<IdeaFormProps> = ({ idea, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<IdeaFormData>({
    title: "",
    description: "",
    category: "",
    tags: [],
  });
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (idea) {
      setFormData({
        title: idea.title,
        description: idea.description,
        category: idea.category,
        tags: idea.tags,
      });
    }
  }, [idea]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (idea) {
        await ideaApi.updateIdea(idea.idea_id, formData);
        alert(`Cập nhật thành công ý tưởng: ${formData.title}`);
      } else {
        await ideaApi.createIdea(1, formData);
        alert(`Đã tạo thành công ý tưởng: ${formData.title}`);
      }
      onSubmit();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error saving idea:", error.response?.data?.detail);
      }
    }
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag],
      });
      setNewTag("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="idea-form">
      <div className="form-group">
        <label htmlFor="title">Tiêu đề</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Mô tả</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Danh mục</label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => {
            setFormData({ ...formData, category: e.target.value });
          }}
          defaultValue={"Marketing"}
          required
        >
          <option value="marketing">Marketing</option>
          <option value="content">Content</option>
          <option value="event">Event</option>
        </select>
      </div>
      <div className="form-group">
        <label>Thẻ</label>
        <div className="tags-input">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Thêm thẻ"
          />
          <button type="button" onClick={handleAddTag}>
            Thêm
          </button>
        </div>
        <div className="tags-list">
          {formData.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    tags: formData.tags.filter((t) => t !== tag),
                  })
                }
              >
                x
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="button-secondary">
          Hủy
        </button>
        <button type="submit" className="button-primary">
          {idea ? "Cập nhật" : "Tạo"} ý tưởng
        </button>
      </div>
    </form>
  );
};

export default IdeaForm;
