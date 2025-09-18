import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { Idea } from "@/types/idea";
import { ideaApi } from "@/services/api";
import { useDebounce } from "@/hooks/useDebounce";
import IdeaForm from "./ideaform/IdeaForm";
import "./IdeaList.css";

const IdeaList: React.FC = () => {
  const navigate = useNavigate();

  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 800);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [selectedIdea, setSelectedIdea] = useState<Idea | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadIdeas();
  }, [debouncedSearch, selectedCategory, selectedTags]);

  const loadIdeas = async () => {
    try {
      const data = await ideaApi.getIdeas({
        search: debouncedSearch,
        category: selectedCategory,
        tags: selectedTags,
      });
      setIdeas(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error loading ideas:", error.response?.data?.detail);
      }
      toast.error("Không thể tải ý tưởng");
    }
  };

  const handleCreateIdea = () => {
    setSelectedIdea(undefined);
    setIsFormOpen(true);
  };

  const handleEditIdea = (idea: Idea) => {
    setSelectedIdea(idea);
    setIsFormOpen(true);
  };

  const handleDeleteIdea = async (idea_id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa ý tưởng này?")) return;
    try {
      await ideaApi.deleteIdea(idea_id);
      setIdeas(ideas.filter((idea) => idea.idea_id !== idea_id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to delete idea: ", error.response?.data?.detail);
      }
      toast.error("Không thể xóa ý tưởng");
    }
  };

  const handleFormSubmit = async () => {
    setIsFormOpen(false);
    setSelectedIdea(undefined);
    await loadIdeas();
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setSelectedIdea(undefined);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(ideas);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setIdeas(items);
  };

  return (
    <div className="idea-list-container">
      <div className="idea-list-filters">
        <input
          type="text"
          placeholder="Search ideas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          <option value="marketing">Marketing</option>
          <option value="content">Content</option>
          <option value="event">Event</option>
        </select>

        <div className="tags-filter">
          {["social", "blog", "video", "design"].map((tag) => (
            <label className="tag-checkbox" key={tag}>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTags([...selectedTags, tag]);
                  } else {
                    setSelectedTags(selectedTags.filter((t) => t !== tag));
                  }
                }}
              />
              {tag}
            </label>
          ))}
        </div>
        <button className="create-idea-btn" onClick={handleCreateIdea}>
          + Tạo ý tưởng mới
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="ideas">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="ideas-list"
            >
              {ideas.map((idea, index) => (
                <Draggable
                  key={idea.idea_id}
                  draggableId={idea.idea_id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`idea-card ${idea.status}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/app/discussion/${idea.idea_id}`);
                      }}
                    >
                      <h3>{idea.title}</h3>
                      <p>{idea.description.substring(0, 100)}...</p>
                      <div className="idea-meta">
                        <span className={`idea-status ${idea.status}`}>
                          <span className={`idea-status-dot ${idea.status}`} />
                          {idea.status}
                        </span>
                        <div className="idea-tags">
                          {idea.tags.map((tag) => (
                            <span key={tag} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="idea-actions">
                          <button
                            className="edit-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditIdea(idea);
                            }}
                          >
                            Sửa
                          </button>
                          <button
                            className="delete-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteIdea(idea.idea_id);
                            }}
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <IdeaForm
              idea={selectedIdea}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaList;
