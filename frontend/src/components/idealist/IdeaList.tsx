import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import "./IdeaList.css";
import { Idea } from "@/types/idea";
import { ideaApi } from "@/types/api";
import { mockIdeas } from "@/mocks/mockIdeas";

interface IdeaListProps {
  onIdeaSelect: (idea: Idea) => void;
}

const IdeaList: React.FC<IdeaListProps> = ({ onIdeaSelect }) => {
  const [ideas, setIdeas] = useState<Idea[]>(mockIdeas);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    loadIdeas();
  }, [search, selectedCategory, selectedTags]);

  const loadIdeas = async () => {
    try {
      const data = await ideaApi.getIdeas({
        search,
        category: selectedCategory,
        tags: selectedTags,
      });
      setIdeas(data);
    } catch (error) {
      console.error("Error loading ideas:", error);
    }
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
                <Draggable key={idea.id} draggableId={idea.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`idea-card ${idea.status}`}
                      onClick={() => onIdeaSelect(idea)}
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
    </div>
  );
};

export default IdeaList;
