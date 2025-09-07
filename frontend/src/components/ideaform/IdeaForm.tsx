import { ideaApi } from "@/types/api";
import { Idea, IdeaFormData } from "@/types/idea";
import * as React from "react";
import { useEffect, useState } from "react";
import './IdeaForm.css';

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
        await ideaApi.updateIdea(idea.id, formData);
      } else {
        await ideaApi.createIdea(formData);
      }
    } catch (error) {
      console.error("Error saving idea:", error);
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
        <label htmlFor="title">Title</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
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
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        >
          <option value="">Select Category</option>
          <option value="marketing">Marketing</option>
          <option value="content">Content</option>
          <option value="event">Event</option>
        </select>
      </div>
      <div className="form-group">
        <label>Tags</label>
        <div className="tags-input">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
          />
          <button type="button" onClick={handleAddTag}></button>
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
          Cancel
        </button>
        <button type="submit" className="button-primary">
          {idea ? "Update" : "Create"} Idea
        </button>
      </div>
    </form>
  );
};

export default IdeaForm;